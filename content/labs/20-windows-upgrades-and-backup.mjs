export default {
  id: "windows-upgrades-and-backup",
  moduleId: "m3",
  title: "Windows 11 edition upgrades and Windows Backup",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Adele's laptop runs Windows 11 Pro, but Contoso's Microsoft 365 E5 licences entitle every user to Enterprise — and several settings you will deploy in later modules only exist on Enterprise. Subscription activation steps the edition up on sign-in, with no key, no media and no reboot. You will watch that happen, then configure Windows Backup so a device rebuild restores a user's settings instead of starting from nothing.",

  objectives: [
    "Explain how subscription activation upgrades Windows 11 Pro to Enterprise",
    "Verify an edition step-up from the client",
    "Configure a Windows Backup policy in Intune",
    "Describe what Windows Backup restores during Autopilot and what it does not"
  ],

  keyConcepts: ["Subscription activation", "Windows 11 Enterprise E5", "ClipSVC", "Windows Backup", "Restore during OOBE"],

  skills: [
    { id: "g2.t1.s6", depth: "primary" },
    { id: "g2.t1.s8", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "WIN-ENT-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "vm", id: "vm1-adele", os: "Windows 11 Pro" },
      { kind: "portal", id: "Microsoft Intune admin center" }
    ],
    personas: ["adele.vance"],
    labs: ["windows-enrollment-paths"]
  },

  exercises: [
    {
      id: "e1",
      title: "Subscription activation",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Confirm the current edition and licence entitlement",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, signed in as Adele, open **Windows PowerShell** and check the edition:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ComputerInfo -Property WindowsProductName, WindowsEditionId, OsName"
                },
                {
                  kind: "verify",
                  text: "**WindowsEditionId** reads `Professional`."
                }
              ]
            },
            {
              text: "Inspect the licensing state:",
              parts: [
                {
                  kind: "code",
                  lang: "cmd",
                  code: "slmgr /dli"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Subscription activation is driven by the **Client License Service (ClipSVC)**. It reads the user's Windows 11 Enterprise E5 entitlement from Microsoft Entra ID at sign-in and steps the edition up in place — no product key, no installation media, and no reboot. If the service is stopped, nothing happens and there is no error."
                }
              ]
            },
            {
              text: "Confirm the entitlement is actually present on the account:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Run from your host with an active Graph session",
                  code: "Connect-MgGraph -Scopes \"User.Read.All\"\n(Get-MgUserLicenseDetail -UserId \"adele.vance@<tenant>.onmicrosoft.com\").ServicePlans |\n    Where-Object ServicePlanName -like \"*WIN10*\" -or $_.ServicePlanName -like \"*WINDOWS*\" |\n    Select-Object ServicePlanName, ProvisioningStatus"
                },
                {
                  kind: "verify",
                  text: "A Windows service plan is listed with a provisioning status of **Success**. Without it there is no entitlement and the step-up will never occur."
                }
              ]
            }
          ],
          result: {
            text: "You know the starting edition and can prove the entitlement exists.",
            verify: [
              { text: "The device reports **Professional**." },
              { text: "Adele holds a Windows service plan in a successful state." }
            ]
          }
        },
        {
          id: "t2",
          title: "Trigger and verify the step-up",
          checkpoint: true,
          steps: [
            {
              text: "Sign out of Windows completely, then sign back in as Adele.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Locking and unlocking is not enough. The entitlement is evaluated at interactive sign-in, which is also why a device that has been powered off for months upgrades the first time someone actually signs in."
                }
              ]
            },
            {
              text: "Give it a few minutes, then check the edition again:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ComputerInfo -Property WindowsProductName, WindowsEditionId"
                },
                {
                  kind: "verify",
                  text: "**WindowsEditionId** now reads `Enterprise`. The device did not restart and no key was entered."
                }
              ]
            },
            {
              text: "If nothing changed, check the service that performs the upgrade:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-Service ClipSVC | Select-Object Name, Status, StartType\nGet-WinEvent -LogName \"Microsoft-Windows-AAD/Operational\" -MaxEvents 20 |\n    Select-Object TimeCreated, Id, LevelDisplayName"
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Subscription activation needs three things: the device joined to Microsoft Entra ID, the user holding a Windows Enterprise entitlement, and ClipSVC running. All three are silent when they fail, so check all three rather than looking for an error message."
                }
              ]
            }
          ],
          result: {
            text: "The device stepped from Pro to Enterprise without reinstallation.",
            verify: [
              { text: "**WindowsEditionId** is `Enterprise`." },
              { text: "No restart or product key was required." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Windows Backup",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create a Windows Backup policy",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Choose the platform and profile:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Platform", value: "Windows 10 and later" },
                    { label: "Profile type", value: "Settings catalog" },
                    { label: "Name", value: "WIN-Backup-Corporate" }
                  ]
                }
              ]
            },
            {
              text: "In the settings picker, search for `Windows Backup` and add the settings from the **Windows Backup** category. Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enable Windows Backup", value: "Enabled" },
                    { label: "Back up Windows settings", value: "Enabled", note: "Accessibility, personalisation, language and other Windows preferences." },
                    { label: "Back up installed apps list", value: "Enabled", note: "The list, not the applications themselves." },
                    { label: "Back up credentials", value: "Enabled", note: "Saved Wi-Fi networks and stored passwords." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Windows Backup restores *settings and a list of apps*, not files and not the applications themselves. User files are OneDrive's job through Known Folder Move, and applications are redeployed by Intune. Confusing these is a common exam trap: a question asking how a user's documents survive a rebuild is asking about OneDrive, not Windows Backup."
                }
              ]
            },
            {
              text: "Assign the profile to `GRP-DEV-WIN-CORP` and create it."
            }
          ],
          result: {
            text: "Corporate Windows devices back up settings, credentials and their application list.",
            verify: [
              { text: "`WIN-Backup-Corporate` appears under **Configuration** with an assignment." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand the restore path",
          steps: [
            {
              text: "Restore happens during the out-of-box experience, after the user signs in.",
              parts: [
                {
                  kind: "table",
                  headers: ["Restored", "Not restored"],
                  rows: [
                    ["Windows settings and personalisation", "User files — use OneDrive Known Folder Move"],
                    ["Accessibility preferences", "Application binaries — Intune redeploys them"],
                    ["Saved Wi-Fi networks and credentials", "Local accounts and their profiles"],
                    ["A list of previously installed apps, pinned for reinstall", "Anything from a device the user was not the primary user of"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Restore is offered during a user-driven Autopilot deployment when the same user signs in to a new or reset device. It does not apply to self-deploying or to devices with no primary user, because there is no user whose backup could be restored."
                }
              ]
            },
            {
              text: "Note the full picture Contoso needs for a clean rebuild story:",
              parts: [
                {
                  kind: "table",
                  headers: ["What survives a rebuild", "Mechanism", "Configured in"],
                  rows: [
                    ["Documents, Desktop, Pictures", "OneDrive Known Folder Move", "Lab 22, settings catalog"],
                    ["Windows settings and preferences", "Windows Backup", "This lab"],
                    ["Applications", "Intune assignment", "Module 6"],
                    ["BitLocker recovery key", "Escrow to Microsoft Entra ID", "Lab 43"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can describe exactly which parts of a user's environment survive a rebuild and by what mechanism.",
            verify: [
              { text: "You can name the feature responsible for restoring user documents." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A Microsoft Entra joined device stays on Windows 11 Pro despite the user holding Microsoft 365 E5.",
      rootCause:
        "One of the three prerequisites is missing: the device is not Entra joined, the user's Windows Enterprise service plan is not provisioned, or ClipSVC is stopped or disabled.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status | Select-String \"AzureAdJoined\"\nGet-Service ClipSVC | Select-Object Status, StartType\nslmgr /dli"
      },
      resolution:
        "Confirm the join, confirm the entitlement in the Microsoft 365 admin center, start ClipSVC, then sign out and back in. The step-up is evaluated at interactive sign-in only."
    }
  ],

  quiz: [
    {
      question:
        "A user's Windows 11 Pro device is Microsoft Entra joined and the user holds Microsoft 365 E5. Which additional step is required to upgrade the device to Enterprise?",
      options: [
        "None — sign out and back in, and subscription activation steps the edition up",
        "Enter a Windows 11 Enterprise product key",
        "Reinstall Windows using Enterprise media",
        "Deploy a Windows 11 feature update policy targeting Enterprise"
      ],
      correctIndex: 0,
      rationale:
        "Subscription activation upgrades the edition in place using the user's entitlement, with no key, no media and no restart. It is evaluated at interactive sign-in.",
      examTip:
        "Remember the three prerequisites — Entra joined, Windows Enterprise entitlement, ClipSVC running — and that all three fail silently.",
      skills: ["g2.t1.s6"]
    },
    {
      question:
        "A user's device is reset and redeployed with Autopilot. Windows Backup is enabled. Which of the following is restored?",
      options: [
        "Windows settings, saved credentials and a list of previously installed apps",
        "The user's documents and desktop files",
        "The applications themselves, reinstalled from the backup",
        "Local user accounts and their profiles"
      ],
      correctIndex: 0,
      rationale:
        "Windows Backup covers settings, credentials and an app list that is pinned for reinstall. Files are OneDrive's responsibility and applications are redeployed by Intune.",
      examTip:
        "Windows Backup restores the shape of the environment, not its contents. Files mean OneDrive Known Folder Move.",
      skills: ["g2.t1.s8"]
    }
  ]
};
