export default {
  id: "admx-and-gpo-analytics",
  moduleId: "m4",
  title: "ADMX templates and Group Policy analytics",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Contoso has twenty years of Group Policy and nobody willing to guess which of it still matters. Group Policy analytics imports a GPO backup, tells you what percentage of its settings have a modern equivalent, and can migrate the supported ones straight into a settings catalog profile. You will run that analysis, migrate the result, and import a third-party ADMX template for software that Group Policy managed and the settings catalog does not know about.",

  objectives: [
    "Import a Group Policy backup and read the analytics report",
    "Interpret the migration readiness percentage",
    "Migrate supported settings into a settings catalog profile",
    "Import a custom ADMX and ADML pair and configure a setting from it",
    "Explain what happens to settings with no modern equivalent"
  ],

  keyConcepts: ["Group Policy analytics", "MDM support percentage", "ADMX ingestion", "ADML", "Migration readiness"],

  skills: [{ id: "g2.t2.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: [],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Analyse a Group Policy Object",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Produce a GPO export to import",
          checkpoint: true,
          steps: [
            {
              text: "Group Policy analytics needs an XML export of a GPO. You have no domain, so create a representative one on **MD102-VM1-Adele** from its local policy:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Produces an XML report of local policy settings",
                  code: "gpresult /X C:\\Temp\\localpolicy.xml /f"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "In a real migration you would use `Backup-GPO` on a domain controller, or right-click a GPO in the Group Policy Management Console and choose **Save Report** as XML. The analytics engine accepts the XML either way."
                }
              ]
            },
            {
              text: "If the local export is too sparse to be interesting, write a small synthetic GPO XML instead. The analytics engine only needs valid structure:",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "A more useful option: Microsoft publishes the security baseline GPO backups in the **Microsoft Security Compliance Toolkit**. Downloading a Windows 11 baseline gives you a realistic, several-hundred-setting GPO to analyse, and it is free."
                }
              ]
            }
          ],
          result: {
            text: "You have a GPO XML export ready to import.",
            verify: [{ text: "An XML file exists that you can upload." }]
          }
        },
        {
          id: "t2",
          title: "Import and read the analytics report",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Group Policy analytics**, then **Import**.",
              nav: ["Devices", "Group Policy analytics", "Import"]
            },
            {
              text: "Upload the XML file and wait for processing, then open the imported policy."
            },
            {
              text: "Read what the report tells you:",
              parts: [
                {
                  kind: "table",
                  headers: ["Column", "Meaning"],
                  rows: [
                    ["MDM support", "The percentage of settings in this GPO that have a modern configuration service provider equivalent"],
                    ["Targeted in Microsoft Entra ID", "Whether the GPO's scope maps to groups that exist in your tenant"],
                    ["Setting name", "The original Group Policy setting"],
                    ["MDM support (per setting)", "Supported, Not supported, or Deprecated"],
                    ["CSP name and CSP mapping", "The configuration service provider node the setting maps to"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "A percentage well below 100 is normal and is not a failure. It usually means the GPO contains settings that are deprecated, that apply to server roles, or that were only ever meaningful on a domain-joined device. The report's real value is separating *still relevant and migratable* from *nobody has needed this since 2012*."
                }
              ]
            },
            {
              text: "Filter the setting list by **MDM support: Not supported** and consider what to do with each.",
              parts: [
                {
                  kind: "table",
                  headers: ["Situation", "Modern answer"],
                  rows: [
                    ["Setting is deprecated", "Drop it"],
                    ["Setting has a settings catalog equivalent under a different name", "Configure it directly in the catalog"],
                    ["Setting belongs to third-party software", "Import that vendor's ADMX — exercise 2"],
                    ["Setting genuinely has no equivalent", "A custom OMA-URI profile, or a PowerShell script from module 10"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can read a migration readiness report and classify its unsupported settings.",
            verify: [
              { text: "The imported policy shows an MDM support percentage." },
              { text: "You can name three options for a setting with no CSP equivalent." }
            ]
          }
        },
        {
          id: "t3",
          title: "Migrate the supported settings",
          checkpoint: true,
          steps: [
            {
              text: "With the imported policy open, select **Migrate**.",
              nav: ["Devices", "Group Policy analytics", "Migrate"]
            },
            {
              text: "Review the settings offered. Only those with a CSP mapping appear.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Deselect anything you do not actively want. Migration is a chance to drop accumulated policy, not to carry all of it forward — a GPO that nobody has reviewed in a decade should not become a settings catalog profile nobody reviews for another decade."
                }
              ]
            },
            {
              text: "Name the resulting profile `WIN-Migrated-From-GPO`, assign it to `GRP-USR-PILOT` rather than all corporate devices, and complete the migration.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Assign a migrated profile to a pilot group first, always. Group Policy and MDM apply settings through different mechanisms and a setting that behaved one way under Group Policy can behave differently as a CSP. Prove it on a handful of devices before it reaches the estate."
                }
              ]
            },
            {
              text: "Open the resulting profile under **Devices** > **Configuration**.",
              parts: [
                {
                  kind: "verify",
                  text: "It is an ordinary settings catalog profile. Migration is a one-time conversion — there is no ongoing link to the original GPO, and changing the GPO later changes nothing here."
                }
              ]
            }
          ],
          result: {
            text: "Supported Group Policy settings now exist as a settings catalog profile scoped to a pilot group.",
            verify: [
              { text: "`WIN-Migrated-From-GPO` exists under **Configuration**." },
              { text: "It is assigned to a pilot group rather than all devices." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Import a custom ADMX template",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Ingest an ADMX and ADML pair",
          checkpoint: true,
          steps: [
            {
              text: "Download a third-party administrative template. Google Chrome's is a good example because it is freely available and widely deployed.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "An ADMX file defines the settings; an ADML file supplies the display names and descriptions for one language. You need both, and the ADML must be the one matching the ADMX version — mismatched pairs import and then show blank setting names."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then the **Import ADMX** tab, then **Import**.",
              nav: ["Devices", "Configuration", "Import ADMX", "Import"]
            },
            {
              text: "Upload the files:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "ADMX file", value: "chrome.admx" },
                    { label: "ADML file", value: "chrome.adml (en-US)" }
                  ]
                }
              ]
            },
            {
              text: "Wait for the status to change from **Pending** to **Available**.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "If the ADMX depends on another ADMX — a `parentCategory` reference to something like `windows.admx` — the import fails until the dependency is imported first. The error names the missing file, so read it rather than assuming the template is unsupported."
                }
              ]
            }
          ],
          result: {
            text: "A third-party administrative template is available for policy authoring.",
            verify: [
              { text: "The imported ADMX shows a status of **Available**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Configure a setting from the imported template",
          checkpoint: true,
          steps: [
            {
              text: "Create a new profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, profile type **Templates** > **Imported Administrative templates**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Name it `WIN-Chrome-Policy`, then browse the imported settings tree and configure something recognisable, such as the browser home page or disabling the built-in password manager."
            },
            {
              text: "Assign it to `GRP-USR-PILOT` and create the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Imported ADMX settings appear under **Imported Administrative templates**, not in the settings catalog. That separation is worth remembering — searching the settings catalog for a Chrome setting returns nothing and looks like the import failed."
                }
              ]
            }
          ],
          result: {
            text: "A third-party application is configured through Intune using its own administrative template.",
            verify: [
              { text: "`WIN-Chrome-Policy` exists and carries at least one configured setting." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An ADMX import fails or remains in a pending state.",
      rootCause:
        "A missing dependency — the ADMX references a parent category defined in another ADMX that has not been imported — or a mismatched ADML that does not correspond to the ADMX version.",
      diagnostic: {
        lang: "text",
        code: "Devices > Configuration > Import ADMX\nOpen the failed import and read the status message; it names the missing file."
      },
      resolution:
        "Import the dependency first, then retry. Ensure the ADML comes from the same download as the ADMX — a mismatched pair imports but shows blank setting names."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Group Policy analytics reports that a GPO has 62 percent MDM support. What does this mean?",
      options: [
        "62 percent of the settings in that GPO have a configuration service provider equivalent and can be migrated",
        "62 percent of targeted devices support MDM management",
        "The migration will succeed on 62 percent of devices",
        "62 percent of the settings are already applied through Intune"
      ],
      correctIndex: 0,
      rationale:
        "The percentage describes setting coverage, not devices. The remainder are deprecated, apply to scenarios with no modern equivalent, or belong to software whose ADMX has not been imported.",
      examTip:
        "A low percentage is normal for an old GPO and is not an error. The report's purpose is triage — deciding what to migrate, what to replace, and what to abandon.",
      skills: ["g2.t2.s1"]
    },
    {
      id: "q2",
      question:
        "You imported a third-party ADMX successfully but cannot find its settings in the settings catalog. Why?",
      options: [
        "Imported ADMX settings appear under the Imported Administrative templates profile type, not the settings catalog",
        "The ADML file was not imported",
        "Imported ADMX settings require a custom OMA-URI profile",
        "The import must finish replicating for 24 hours before settings appear"
      ],
      correctIndex: 0,
      rationale:
        "Ingested administrative templates are exposed through their own profile type. The settings catalog contains Microsoft's own configuration service providers only.",
      examTip:
        "Three distinct places configure Windows: settings catalog for built-in CSPs, Administrative templates for the Microsoft ADMX-backed set, and Imported Administrative templates for third-party ADMX.",
      skills: ["g2.t2.s1"]
    }
  ]
};
