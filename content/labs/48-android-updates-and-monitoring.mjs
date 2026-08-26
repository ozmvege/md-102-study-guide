export default {
  id: "android-updates-and-monitoring",
  moduleId: "m8",
  title: "Android update management and update reporting",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Android updates work nothing like Windows. There is no ring model — on fully managed devices you control *when* the device may install what the manufacturer offers, and on work profile devices you control almost nothing. Meanwhile you need to answer the question every manager eventually asks: are we actually patched? Intune's update reporting answers it, once you know which report to open.",

  objectives: [
    "Configure Android system update behaviour on fully managed devices",
    "Explain firmware-over-the-air deployments and their vendor dependency",
    "Read Windows update compliance reports",
    "Use the Windows Update for Business reports workbook",
    "Identify devices that are behind and why"
  ],

  keyConcepts: ["Android system update policy", "Postpone updates", "FOTA", "Zebra LifeGuard", "Windows Update for Business reports", "Update compliance"],

  skills: [
    { id: "g3.t2.s5", depth: "primary" },
    { id: "g3.t2.s7", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["lee.gu", "adele.vance"],
    labs: ["update-rings", "android-configuration-profiles"]
  },

  exercises: [
    {
      id: "e1",
      title: "Android update control",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Configure system updates on fully managed devices",
          checkpoint: true,
          steps: [
            {
              text: "Open the fully managed device restrictions profile from lab 25, `AND-FM-Restrictions`, or create one if you skipped it.",
              nav: ["Devices", "Configuration"]
            },
            {
              text: "Find the **System update** section and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "System update", value: "Postpone" },
                    { label: "Freeze periods", value: "Optional — for example a retail freeze over a peak trading period" }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Option", "Behaviour"],
                  rows: [
                    ["Device Default", "The manufacturer's normal behaviour, usually prompting the user"],
                    ["**Postpone**", "Delays updates by up to 30 days, then installs regardless"],
                    ["**Windowed**", "Installs only within a daily maintenance window you define"],
                    ["**Automatic**", "Installs as soon as available, restarting the device"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "There is no ring model and no deferral by release date. **Postpone** delays by up to 30 days and no further — after that the update installs whatever you do. Android update control decides *when in the day or month* an update may install, not *which* update. If a scenario asks about staging Android updates like Windows rings, the answer is that you cannot."
                }
              ]
            },
            {
              text: "Save the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "These settings exist only for **fully managed** and **dedicated** devices. On a personally owned work profile the organisation does not own the device, so the operating system update is entirely the user's business. The setting is simply absent from that profile type."
                }
              ]
            }
          ],
          result: {
            text: "Corporate-owned Android devices install system updates on your schedule rather than the user's.",
            verify: [
              { text: "The fully managed profile has a system update mode configured." },
              { text: "You can explain why the setting is missing from work profile policies." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand firmware-over-the-air",
          steps: [
            {
              text: "FOTA delivers manufacturer firmware, which is different from an Android system update.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "System update policy", "FOTA deployment"],
                  rows: [
                    ["Delivers", "The Android OS update the device is already offered", "Manufacturer firmware, including OS images the device would not otherwise get"],
                    ["Configured in", "A device restrictions profile", "A dedicated FOTA policy, per vendor"],
                    ["Vendor support required", "No", "**Yes** — the manufacturer must participate"],
                    ["Example", "Any fully managed Android device", "Zebra LifeGuard for Zebra handhelds"],
                    ["Licence", "Intune Plan 1", "Intune Plan 2 — included with Microsoft 365 E5 since July 2026"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "FOTA is part of Intune Plan 2, which Microsoft 365 E5 has included since July 2026 — so the licence is not the obstacle. The **manufacturer** is: FOTA only works where the vendor participates, Zebra LifeGuard being the common example, and you need that vendor's hardware to see it work. Know that it exists, that it depends on manufacturer participation rather than licensing, and that it is how ruggedised estates get firmware without physically handling each unit."
                }
              ]
            }
          ],
          result: {
            text: "You can distinguish an Android system update policy from a FOTA deployment.",
            verify: [{ text: "You can state what FOTA requires that a system update policy does not." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Update reporting",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Read the built-in update reports",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Windows updates**, then the **Monitor** tab.",
              nav: ["Devices", "Windows updates", "Monitor"],
              parts: [
                {
                  kind: "table",
                  headers: ["Report", "Answers"],
                  rows: [
                    ["Windows Expedited update report", "Did the emergency update actually land, and where did it fail?"],
                    ["Windows driver update report", "Which driver updates are pending approval or failing"],
                    ["Feature update failures report", "Which devices could not take a feature update, with the failure reason"],
                    ["Windows update rings report", "Per-ring deployment state and device counts"]
                  ]
                }
              ]
            },
            {
              text: "Open **Reports** > **Windows updates** for the fuller picture.",
              nav: ["Reports", "Windows updates"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "The richer reports — **Windows Update for Business reports** — need a Log Analytics workspace, which needs an Azure subscription. Without one you get the built-in Intune reports, which are enough to answer *is this device patched* but not enough to answer *what is our compliance trend over ninety days*. Know the distinction and know why the richer reports are missing from a tenant like this one."
                }
              ]
            },
            {
              text: "Check a single device's update state directly, which needs no extra infrastructure:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Run on MD102-VM1-Adele",
                  code: "Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5 HotFixID, Description, InstalledOn\n(Get-CimInstance Win32_OperatingSystem).Version\nGet-ComputerInfo -Property OsBuildNumber, WindowsVersion"
                }
              ]
            },
            {
              text: "Pull the same information across the estate from Graph:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\n\nGet-MgDeviceManagementManagedDevice -All |\n    Where-Object OperatingSystem -eq \"Windows\" |\n    Select-Object DeviceName, OsVersion, LastSyncDateTime, ComplianceState |\n    Sort-Object OsVersion |\n    Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "You can see every Windows device's build. Devices well behind the others are the ones to investigate, and a stale `LastSyncDateTime` usually explains why."
                }
              ]
            }
          ],
          result: {
            text: "You can determine which devices are behind on updates and why.",
            verify: [
              { text: "You located the update reports under **Devices** > **Windows updates** > **Monitor**." },
              { text: "You can state what Windows Update for Business reports additionally require." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A Windows device has not installed updates for weeks and appears in no failure report.",
      rootCause:
        "The device is not checking in. Update reporting only covers devices that communicate — a device that has been offline produces no failures because it has attempted nothing.",
      diagnostic: {
        lang: "powershell",
        code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\nGet-MgDeviceManagementManagedDevice -All |\n    Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-14) } |\n    Select-Object DeviceName, UserPrincipalName, LastSyncDateTime, OsVersion"
      },
      resolution:
        "Absence from a failure report is not evidence of health. Track last sync time alongside update state, and treat a stale device as unpatched until it proves otherwise."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "How does Android update management on fully managed devices differ from Windows update rings?",
      options: [
        "Android has no ring model; you control when updates may install, with postponement capped at 30 days",
        "Android uses the same deferral model with a maximum of 30 days",
        "Android updates can be staged across rings using deployment groups",
        "Android updates are managed entirely through Managed Google Play"
      ],
      correctIndex: 0,
      rationale:
        "Android system update policy offers Device Default, Postpone, Windowed and Automatic. Postponement is capped at 30 days, after which the update installs regardless. There is no per-release deferral and no ring staging.",
      examTip:
        "The absence of a ring model is the point. And remember these settings exist only for corporate-owned devices — a personally owned work profile has none of them.",
      skills: ["g3.t2.s5"]
    }
  ]
};
