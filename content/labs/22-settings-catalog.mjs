export default {
  id: "settings-catalog",
  moduleId: "m4",
  title: "The settings catalog: profiles, assignment and conflicts",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 50,

  scenario:
    "The settings catalog is where nearly all Windows configuration now happens. It exposes the underlying configuration service providers directly, which makes it powerful and makes it easy to build two profiles that contradict each other. You will configure OneDrive Known Folder Move — the setting that decides whether a user's files survive a device rebuild — then deliberately create a conflict so you know what one looks like in the reporting.",

  objectives: [
    "Create a settings catalog profile and target it correctly",
    "Configure OneDrive Known Folder Move end to end",
    "Read per-setting deployment status in the profile report",
    "Recognise a configuration conflict and know how Intune resolves it",
    "Use include and exclude assignments together"
  ],

  keyConcepts: ["Settings catalog", "Configuration service provider", "Known Folder Move", "Conflict", "Include and exclude assignment"],

  skills: [{ id: "g2.t2.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["groups-for-devices", "enrollment-settings"]
  },

  exercises: [
    {
      id: "e1",
      title: "Build a settings catalog profile",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Configure OneDrive Known Folder Move",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Set the platform and profile type:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Platform", value: "Windows 10 and later" },
                    { label: "Profile type", value: "Settings catalog" },
                    { label: "Name", value: "WIN-OneDrive-KFM" }
                  ]
                }
              ]
            },
            {
              text: "Select **Add settings**, search for `Known Folder`, open the **OneDrive** category, and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Silently move Windows known folders to OneDrive", value: "Enabled" },
                    { label: "Tenant ID", value: "Your tenant GUID", note: "Copy it from Entra admin center > Overview. The setting silently does nothing if this is wrong." },
                    { label: "Show notification to users after folders have been redirected", value: "Enabled" },
                    { label: "Silently sign in users to the OneDrive sync app with their Windows credentials", value: "Enabled" },
                    { label: "Prevent users from redirecting their Windows known folders back to their PC", value: "Enabled" },
                    { label: "Use OneDrive Files On-Demand", value: "Enabled" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `WIN-OneDrive-KFM`, then select **Next**." },
                    { text: "On the **Configuration settings** tab, select **Add settings**, add and configure the six settings above, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign the profile to `GRP-DEV-WIN-CORP`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The tenant ID is a GUID, not your tenant name. This is the most common reason Known Folder Move appears to deploy successfully and never actually redirects anything — the profile reports Succeeded because the setting was written, and the setting does nothing because it points at a tenant that is not yours."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "OneDrive settings can be targeted at users or devices. Targeting the device group means every user of a corporate machine gets the behaviour, which is usually what an organisation wants."
                }
              ]
            }
          ],
          result: {
            text: "Corporate devices silently redirect Desktop, Documents and Pictures into OneDrive.",
            verify: [
              { text: "`WIN-OneDrive-KFM` appears under **Configuration**." },
              { text: "The tenant ID setting contains a GUID." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify from the device and the report",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, force a policy sync:",
              nav: ["Settings", "Accounts", "Access work or school", "Info", "Sync"],
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Configuration changes reach a device on its own schedule — roughly every eight hours, sooner after enrollment. **Sync** requests an immediate check-in and is the single most useful button on a managed Windows device."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, confirm the setting arrived in the registry (run in an elevated Administrator PowerShell session):",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ItemProperty \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\OneDrive\" -ErrorAction SilentlyContinue |\n    Select-Object KFMSilentOptIn, KFMBlockOptOut, FilesOnDemandEnabled, SilentAccountConfig"
                },
                {
                  kind: "verify",
                  text: "**KFMSilentOptIn** contains your tenant GUID and the other values are `1`."
                }
              ]
            },
            {
              text: "Back in the portal, open the profile and select the **Device status** and **Per setting status** views.",
              nav: ["Devices", "Configuration", "WIN-OneDrive-KFM"],
              parts: [
                {
                  kind: "verify",
                  text: "**Per setting status** shows each individual setting as **Succeeded**, **Error**, **Conflict** or **Not applicable**. This is the view that tells you *which* setting failed rather than just that the profile did."
                }
              ]
            }
          ],
          result: {
            text: "The profile is applied and you can read its status per setting.",
            verify: [
              { text: "The registry on the device carries the policy values." },
              { text: "**Per setting status** reports success." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Conflicts and assignment logic",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a conflict on purpose",
          checkpoint: true,
          steps: [
            {
              text: "Create a second settings catalog profile named `WIN-OneDrive-Conflict`."
            },
            {
              text: "Add the same **Use OneDrive Files On-Demand** setting, but set it to **Disabled**."
            },
            {
              text: "Assign it to `GRP-DEV-WIN-CORP` as well — the same group as the first profile — and create it."
            },
            {
              text: "Sync the device, wait a few minutes, then check the per setting status on both profiles.",
              parts: [
                {
                  kind: "verify",
                  text: "**Use OneDrive Files On-Demand** reports **Conflict** on both profiles."
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Intune does not pick a winner. When two profiles set the same configuration service provider node to different values, the setting is reported as **Conflict** and **neither value is applied** — the device keeps whatever it had. This is different from compliance policy, where the most restrictive setting wins, and different from enrollment restrictions, where priority decides."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, confirm on the device that the setting did not change (run in an elevated Administrator PowerShell session):",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ItemProperty \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\OneDrive\" |\n    Select-Object FilesOnDemandEnabled"
                }
              ]
            },
            {
              text: "Delete `WIN-OneDrive-Conflict`, sync again, and confirm the setting resolves back to **Succeeded**."
            }
          ],
          result: {
            text: "You can recognise a conflict and know that it leaves the setting unapplied.",
            verify: [
              { text: "You observed **Conflict** in the per setting status." },
              { text: "Deleting the second profile resolved it." }
            ]
          }
        },
        {
          id: "t2",
          title: "Use exclude assignments",
          checkpoint: true,
          steps: [
            {
              text: "Open `WIN-OneDrive-KFM` and select **Properties**, then edit **Assignments**."
            },
            {
              text: "In the **Assignments** section, select **Add groups** under **Excluded groups** to add an exclusion, then select **Review + save**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Included groups", value: "GRP-DEV-WIN-CORP" },
                    { label: "Excluded groups", value: "GRP-DEV-SHARED", note: "Shared devices should not redirect one user's folders into their OneDrive." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Exclusion always beats inclusion. A device in both groups receives nothing. This makes exclusion an effective emergency brake — adding a device to an excluded group is the fastest way to stop a bad profile reaching it without deleting the profile for everyone."
                }
              ]
            },
            {
              text: "Select **Review + save**, then **Save**, and note the one rule that catches people out:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "You cannot mix user groups and device groups between include and exclude on the same profile. Including a user group and excluding a device group is rejected, because Intune cannot evaluate the two against each other. Keep an assignment entirely user-based or entirely device-based."
                }
              ]
            }
          ],
          result: {
            text: "The profile reaches corporate devices except shared ones.",
            verify: [
              { text: "The assignment shows both an included and an excluded group." },
              { text: "You can state which wins when a device is in both." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A settings catalog profile reports Succeeded but the configured behaviour never appears on the device.",
      rootCause:
        "The setting was written correctly but its value is wrong — most commonly a OneDrive tenant ID containing the tenant name instead of the GUID. Intune reports whether the setting was applied, not whether the value is meaningful.",
      diagnostic: {
        lang: "powershell",
        code: "Get-ItemProperty \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\OneDrive\" | Format-List\nGet-WinEvent -LogName \"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin\" -MaxEvents 30 |\n    Where-Object Id -eq 814"
      },
      resolution:
        "Compare the value written on the device with what the setting expects. Succeeded means delivered, never correct — event 814 names the CSP path when delivery itself fails."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Two settings catalog profiles assigned to the same device group set the same setting to different values. What happens on the device?",
      options: [
        "The setting reports Conflict and neither value is applied",
        "The most restrictive value is applied",
        "The profile created most recently wins",
        "The profile with the lowest priority number wins"
      ],
      correctIndex: 0,
      rationale:
        "Device configuration conflicts are not resolved by Intune. The setting is reported as Conflict and left unapplied, so the device keeps its previous value.",
      examTip:
        "Three different resolution models to keep straight: configuration conflicts leave the setting unapplied, compliance takes the most restrictive value, and enrollment restrictions are decided by priority.",
      skills: ["g2.t2.s1"]
    },
    {
      id: "q2",
      question:
        "A device belongs to a group included on a configuration profile and also to a group excluded from it. What does the device receive?",
      options: [
        "Nothing — exclusion takes precedence over inclusion",
        "The profile, because inclusion is evaluated first",
        "The profile, but with conflicting settings omitted",
        "The assignment is rejected as invalid"
      ],
      correctIndex: 0,
      rationale:
        "Exclusion always wins. This makes an exclusion group a reliable emergency brake for stopping a profile reaching specific devices without removing it from everyone.",
      examTip:
        "You also cannot mix user and device groups across include and exclude on the same assignment — Intune rejects it.",
      skills: ["g2.t2.s1"]
    }
  ]
};
