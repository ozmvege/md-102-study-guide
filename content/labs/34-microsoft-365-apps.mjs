export default {
  id: "microsoft-365-apps",
  moduleId: "m6",
  title: "Deploy and manage Microsoft 365 Apps",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 50,

  scenario:
    "Microsoft 365 Apps is the one application every device needs and the one with its own deployment machinery. Intune builds the configuration for you, the Office Deployment Tool does the same job with an XML file, and the Microsoft 365 Apps admin center manages update channels and policies after deployment. The exam expects you to know which tool owns which decision.",

  objectives: [
    "Deploy Microsoft 365 Apps through Intune with a chosen update channel",
    "Describe the Office Deployment Tool and its configuration XML",
    "Configure Office application policies through the Microsoft 365 Apps admin center",
    "Explain how Microsoft 365 Apps fits into an Autopilot deployment"
  ],

  keyConcepts: ["Microsoft 365 Apps app type", "Update channel", "Office Deployment Tool", "configuration.xml", "Microsoft 365 Apps admin center", "Cloud policy"],

  skills: [
    { id: "g4.t1.s4", depth: "primary" },
    { id: "g4.t1.s5", depth: "primary" },
    { id: "g4.t1.s6", depth: "primary" },
    { id: "g4.t1.s7", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "portal", id: "Microsoft 365 Apps admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["store-and-lob-apps"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy through Intune",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the Microsoft 365 Apps deployment",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **All apps**, **Add**, then app type **Microsoft 365 Apps** > **Windows 10 and later**.",
              nav: ["Apps", "All apps", "Add"]
            },
            {
              text: "On **Configure app suite**, choose the applications. Deselect anything Contoso does not use — every extra application is download size and attack surface.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Select Office apps", value: "Word, Excel, PowerPoint, Outlook, OneNote, Teams" },
                    { label: "Skype for Business", value: "Deselected" },
                    { label: "Access, Publisher", value: "Deselected unless required" }
                  ]
                }
              ]
            },
            {
              text: "Configure the suite properties. The update channel is the important decision here:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Architecture", value: "64-bit" },
                    { label: "Update channel", value: "Monthly Enterprise Channel" },
                    { label: "Remove other versions", value: "Yes", note: "Removes older MSI-based Office installations, which otherwise coexist badly." },
                    { label: "Version to install", value: "Latest" },
                    { label: "Use shared computer activation", value: "No", note: "Yes only for multi-session or shared devices where several users sign in." },
                    { label: "Accept the Microsoft Software License Terms", value: "Yes" },
                    { label: "Languages", value: "Match operating system" }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Update channel", "Feature updates", "Suits"],
                  rows: [
                    ["Current Channel", "As soon as released", "Users who want features early; pilot rings"],
                    ["Monthly Enterprise Channel", "Once a month, predictable date", "**The usual production choice**"],
                    ["Semi-Annual Enterprise Channel", "Twice a year", "Regulated environments needing long validation"],
                    ["Semi-Annual Enterprise Channel (Preview)", "Twice a year, four months early", "Validating the semi-annual release before it ships"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Monthly Enterprise Channel is the default answer in most exam scenarios: monthly, on a predictable second-Tuesday cadence, with security updates every month regardless. Current Channel ships features continuously and is harder to validate; Semi-Annual is for environments that need a long soak."
                }
              ]
            },
            {
              text: "Assign as **Required** to `GRP-DEV-WIN-CORP` and create the app."
            },
            {
              text: "Sync **MD102-VM1-Adele** and confirm installation:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\Office\\ClickToRun\\Configuration\" -ErrorAction SilentlyContinue |\n    Select-Object ProductReleaseIds, VersionToReport, CDNBaseUrl, AudienceData"
                },
                {
                  kind: "verify",
                  text: "The configuration key exists and reports the channel you selected. Installation takes a while — Microsoft 365 Apps is a large download."
                }
              ]
            }
          ],
          result: {
            text: "Microsoft 365 Apps is deployed with a defined update channel.",
            verify: [
              { text: "The app reports **Installed** in **Device install status**." },
              { text: "The ClickToRun configuration shows the chosen channel." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand the Office Deployment Tool alternative",
          steps: [
            {
              text: "The Office Deployment Tool does the same job with an XML file instead of a portal wizard.",
              parts: [
                {
                  kind: "code",
                  lang: "xml",
                  caption: "configuration.xml — the equivalent of the portal settings above",
                  code: `<Configuration>
  <Add OfficeClientEdition="64" Channel="MonthlyEnterprise">
    <Product ID="O365ProPlusRetail">
      <Language ID="MatchOS" />
      <ExcludeApp ID="Groove" />
      <ExcludeApp ID="Lync" />
    </Product>
  </Add>
  <RemoveMSI />
  <Display Level="None" AcceptEULA="TRUE" />
  <Property Name="SharedComputerLicensing" Value="0" />
</Configuration>`
                },
                {
                  kind: "table",
                  headers: ["", "Intune app type", "Office Deployment Tool"],
                  rows: [
                    ["Configuration", "Portal wizard, or XML pasted into the portal", "`configuration.xml` you author"],
                    ["Delivery", "Intune assignment", "Run `setup.exe /configure configuration.xml`, often wrapped as a Win32 app"],
                    ["Best for", "Standard deployments", "Complex requirements the wizard cannot express, or an existing scripted build"],
                    ["During Autopilot", "Assign it and let the Enrollment Status Page track it", "Package as a Win32 app so the ESP can block on it"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The portal wizard has an **XML data** option that accepts a `configuration.xml` directly. That gives you the tool's flexibility with Intune's delivery and reporting, and it is usually the right compromise when the wizard falls short."
                }
              ]
            },
            {
              text: "Note the Autopilot consideration:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Microsoft 365 Apps is a multi-gigabyte download. Making it a blocking application on the Enrollment Status Page adds a long wait to every deployment and is a common cause of the `0x800705B4` timeout from lab 17. Deploy it as required but non-blocking unless the user genuinely cannot start work without it."
                }
              ]
            }
          ],
          result: {
            text: "You can choose between the Intune app type and the Office Deployment Tool.",
            verify: [{ text: "You can name the portal option that accepts a configuration.xml directly." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Policies and the Microsoft 365 Apps admin center",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a cloud policy for Office applications",
          checkpoint: true,
          steps: [
            {
              text: "Open the **Microsoft 365 Apps admin center** at `https://config.office.com` and sign in as `admin-intune`."
            },
            {
              text: "Select **Customization**, then **Policy Management**, then **Create**.",
              nav: ["Customization", "Policy Management", "Create"]
            },
            {
              text: "Configure a policy configuration:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Contoso Office baseline" },
                    { label: "Scope", value: "GRP-USR-IT", note: "Assigned to a user group. Policies follow the user across devices." },
                    { label: "Policy: Block macros from running in Office files from the Internet", value: "Enabled" },
                    { label: "Policy: VBA Macro Notification Settings", value: "Disable all except digitally signed macros" },
                    { label: "Policy: Use OneDrive as the default save location", value: "Enabled" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Cloud policy is user-based and applies wherever the user signs in to Microsoft 365 Apps, including devices Intune does not manage. That is its advantage over an ADMX profile, which applies to a managed device regardless of who uses it. Both mechanisms exist and the exam distinguishes them."
                }
              ]
            },
            {
              text: "Create the policy, then review the other surfaces this portal owns:",
              parts: [
                {
                  kind: "table",
                  headers: ["Area", "Purpose"],
                  rows: [
                    ["Inventory", "Which Office versions and add-ins are installed across the estate"],
                    ["Servicing profile", "Automated update management for Microsoft 365 Apps, independent of Windows Update"],
                    ["Health", "Add-in and macro reliability signals, and which builds are failing"],
                    ["Security update status", "Which devices are behind on Office security updates"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Servicing profile** is worth knowing about: it manages Microsoft 365 Apps updates centrally with its own rings and pause controls, separately from Windows Update for Business. An exam scenario about controlling Office updates specifically points here rather than at update rings."
                }
              ]
            }
          ],
          result: {
            text: "Office application behaviour is governed by cloud policy and you know what the admin center manages.",
            verify: [
              { text: "A policy configuration exists and is scoped to a user group." },
              { text: "You can name the feature that manages Office updates independently of Windows Update." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Microsoft 365 Apps deploys but users still have an old MSI-based Office installation alongside it.",
      rootCause: "**Remove other versions** was left at No, so the Click-to-Run installation coexisted with the older MSI build.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Package -Provider Programs | Where-Object Name -like \"*Office*\" | Select-Object Name, Version"
      },
      resolution:
        "Set **Remove other versions** to **Yes** on the app configuration and redeploy. Coexisting Office versions produce file association conflicts and unpredictable add-in behaviour."
    }
  ],

  quiz: [
    {
      question:
        "Contoso wants Microsoft 365 Apps feature updates on a predictable monthly schedule with security updates every month. Which update channel should you configure?",
      options: [
        "Monthly Enterprise Channel",
        "Current Channel",
        "Semi-Annual Enterprise Channel",
        "Semi-Annual Enterprise Channel (Preview)"
      ],
      correctIndex: 0,
      rationale:
        "Monthly Enterprise Channel delivers feature updates once a month on a predictable date, with security updates every month. Current Channel ships features continuously, and the semi-annual channels ship features only twice a year.",
      examTip:
        "Monthly Enterprise Channel is the standard production answer. Reach for Semi-Annual only when a scenario stresses long validation cycles or regulatory change control.",
      skills: ["g4.t1.s4"]
    },
    {
      question:
        "You need an Office macro policy to follow users onto devices that Intune does not manage. Which tool should you use?",
      options: [
        "Cloud policy in the Microsoft 365 Apps admin center",
        "An administrative template configuration profile in Intune",
        "A settings catalog profile in Intune",
        "An app configuration policy in Intune"
      ],
      correctIndex: 0,
      rationale:
        "Cloud policy is user-based and applies wherever the user signs in to Microsoft 365 Apps, including unmanaged devices. Intune configuration profiles apply to managed devices only.",
      examTip:
        "User follows the policy means cloud policy. Device receives the policy means an Intune configuration profile.",
      skills: ["g4.t1.s5", "g4.t1.s7"]
    }
  ]
};
