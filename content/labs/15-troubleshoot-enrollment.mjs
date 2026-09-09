export default {
  id: "troubleshoot-enrollment",
  moduleId: "m2",
  title: "Troubleshoot enrollment failures",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 45,

  scenario:
    "Enrollment failures are the most common support call an endpoint administrator takes, and the error codes are deliberately unhelpful — a licensing problem and a restriction problem both present as *this device cannot be enrolled*. You will deliberately break enrollment three different ways, diagnose each from the client, and build the mental index that turns a hex code into a one-minute fix. You will also configure the cleanup rules that stop stale records causing failures months later.",

  objectives: [
    "Provoke and diagnose licensing, restriction and device-limit enrollment failures",
    "Collect MDM diagnostics from a Windows client and read the report",
    "Locate enrollment events in the Windows event log",
    "Configure device cleanup rules to remove stale records automatically",
    "Map the high-yield enrollment error codes to their causes"
  ],

  keyConcepts: ["MdmDiagnosticsTool", "MDM Diagnostics Report", "Event ID 813 and 814", "Device cleanup rules", "Enrollment error codes"],

  skills: [{ id: "g1.t2.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11 Pro" }
    ],
    personas: ["staging.user01", "adele.vance"],
    labs: ["enrollment-restrictions", "android-enterprise"]
  },

  exercises: [
    {
      id: "e1",
      title: "Recognise the three enrollment failures by code",
      intro:
        "Enrollment failures on Windows present almost identically to the end user — 'Something went wrong' or a silent failure where the device joins Entra ID but never becomes managed. On the MD-102 exam and in production, you must diagnose them by their hex error code rather than the on-screen wording.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Map the failure codes to their root causes",
          checkpoint: true,
          steps: [
            {
              text: "Study the three core enrollment error codes that Microsoft Intune generates:",
              parts: [
                {
                  kind: "table",
                  headers: ["Error Code", "Win32 Symbol", "Root Cause", "Where to Fix"],
                  rows: [
                    ["0x80180018", "MENROLL_E_LICENSE", "The user attempting enrollment has no Intune licence assigned, or group-based licensing is still pending.", "Entra admin center > Groups > GRP-LIC-M365-E5 (assign M365 E5 licence)"],
                    ["0x80180014", "MENROLL_E_PLATFORM_BLOCKED", "An enrollment restriction blocked the device: wrong OS version, platform blocked, or personal devices blocked.", "Intune admin center > Devices > Enrollment > Device platform restrictions"],
                    ["0x80180026", "MENROLL_E_DEVICECAPREACHED", "The user has reached the maximum number of enrolled devices allowed by the restriction policy.", "Intune admin center > Devices > Enrollment > Device limit restrictions"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Notice that **0x80180018** and **0x80180014** produce the same generic client message on Windows: *Something went wrong*. On standard manual OOBE joins without an Autopilot blocking ESP, Windows actually allows the user to log in as an Entra-joined user and fails MDM silently in the background, recording the error in Event ID 76. Only the hex code in the event log or diagnostic report reveals the true cause."
                }
              ]
            },
            {
              text: "Review the licensing trap: why licensing failures look like device failures.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Group-based licensing evaluates asynchronously. When a user is added to a licensed group, it can take several minutes to issue a seat. If the user attempts enrollment immediately, Intune rejects the request with **0x80180018**. Conversely, when a license is revoked, token caching can cause the device to still be recognized until the token cache expires."
                }
              ]
            }
          ],
          result: {
            text: "You can identify the three major enrollment error codes and their remediation points.",
            verify: [
              { text: "You can explain the root cause of 0x80180018 without looking it up." },
              { text: "You can state which error code indicates a platform restriction block." }
            ]
          }
        },
        {
          id: "t2",
          title: "Contrast platform restrictions against device limits",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, review where each restriction is governed:",
              nav: ["Devices", "Enrollment"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **Device platform restrictions** and inspect **WIN-Corporate-Only** from lab 11. Note that blocking personal Windows devices or setting a minimum OS version causes `0x80180014`." },
                    { text: "Select **Device limit restrictions** and inspect the default limit (typically 5 or 15 devices per user). Exceeding this limit causes `0x80180026`." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The Intune device limit restriction (`0x80180026`) is separate from the Microsoft Entra device quota (`0x801c03f2`, *DSREG_E_DEVICE_MAXIMUM_REACHED* under Entra > Devices > Device settings). Entra limits how many devices a user can join; Intune limits how many can be MDM-managed."
                }
              ]
            }
          ],
          result: {
            text: "You can distinguish between platform restrictions, device limits, and Entra join quotas.",
            verify: [
              { text: "You know the difference between 0x80180014 and 0x80180026." },
              { text: "You can state the difference between an Intune device limit and an Entra device quota." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Collect and read client diagnostics",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Generate an MDM diagnostics report",
          checkpoint: true,
          steps: [
            {
              text: "Switch to **MD102-VM1-Adele** (which is enrolled and managed by Intune from lab 12). Open an elevated command prompt and generate the HTML report:",
              parts: [
                {
                  kind: "code",
                  lang: "cmd",
                  caption: "Produces MDMDiagReport.html and supporting files",
                  code: "mkdir C:\\Temp\\MDMDiag\nmdmdiagnosticstool.exe -area \"DeviceEnrollment;DeviceProvisioning;Autopilot\" -zip C:\\Temp\\MDMDiag\\report.zip"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The `-area` switch selects which categories to collect. `DeviceEnrollment` is the one that matters here; `Autopilot` becomes relevant in module 3. Running the tool with no arguments produces a smaller default report."
                }
              ]
            },
            {
              text: "Extract the zip and open `MDMDiagReport.html` in a browser."
            },
            {
              text: "Find these sections:",
              parts: [
                {
                  kind: "table",
                  headers: ["Section", "Tells you"],
                  rows: [
                    ["Device Info", "Device name, OS build, and whether the device is Entra joined"],
                    ["Enrolled Info", "The MDM enrollment record, its provider and its state"],
                    ["Managed Policies", "Every configuration setting Intune has applied and its current value"],
                    ["Managed Apps", "Applications delivered through MDM and their install state"]
                  ]
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, inspect the registry directly in an elevated Administrator PowerShell session (which is faster when you only need enrollment state):",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ChildItem \"HKLM:\\SOFTWARE\\Microsoft\\Enrollments\" |\n    ForEach-Object { Get-ItemProperty $_.PSPath } |\n    Where-Object { $_.UPN } |\n    Select-Object UPN, ProviderID, EnrollmentState, EnrollmentType"
                },
                {
                  kind: "verify",
                  text: "`EnrollmentState` of `1` means enrolled. Any other value, or no row at all, means the device is not managed regardless of what the join state says."
                }
              ]
            }
          ],
          result: {
            text: "You can collect and navigate a client-side diagnostics report.",
            verify: [
              { text: "`MDMDiagReport.html` opens and shows the enrolled state." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read enrollment events in the event log",
          checkpoint: true,
          steps: [
            {
              text: "Open **Event Viewer** and navigate to the MDM provider log.",
              nav: ["Applications and Services Logs", "Microsoft", "Windows", "DeviceManagement-Enterprise-Diagnostics-Provider", "Admin"]
            },
            {
              text: "Or query it from PowerShell on **MD102-VM1-Adele** (which is faster) to inspect policy events on a healthy enrolled client:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-WinEvent -LogName \"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin\" -MaxEvents 40 |\n    Select-Object TimeCreated, Id, LevelDisplayName,\n        @{n='Message'; e={ $_.Message -replace \"`r`n\", ' ' }} |\n    Format-Table -Wrap"
                }
              ]
            },
            {
              text: "Learn the two event IDs that matter:",
              parts: [
                {
                  kind: "table",
                  headers: ["Event ID", "Meaning"],
                  rows: [
                    ["813", "A policy or setting was applied successfully"],
                    ["814", "A policy or setting failed to apply — the message carries the CSP path and the result code"],
                    ["76", "Enrollment failed; the message carries the enrollment error code"],
                    ["71 and 72", "Enrollment session started and completed"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Event 814 is the one that earns its keep. It names the exact configuration service provider path that failed, which turns *a profile is not applying* into *this specific setting is unsupported on this edition*."
                }
              ]
            }
          ],
          result: {
            text: "You can find and interpret enrollment and policy events on a client.",
            verify: [
              { text: "The provider log on VM1 shows successful enrollment and policy events (71, 72, 813)." },
              { text: "You can state what event 814 tells you that event 76 does not." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Stop stale records causing future failures",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Configure device cleanup rules",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, then **Device onboarding** or **Device cleanup rules** depending on your portal version, then **Device cleanup rules**.",
              nav: ["Devices", "Device cleanup rules"]
            },
            {
              text: "Enable the rule:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Delete devices based on last check-in date", value: "Yes" },
                    { label: "Delete devices that haven't checked in for this many days", value: "90", note: "Minimum is 30. Choose a figure longer than your longest expected absence — a laptop in a drawer over a summer break should not be deleted." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "This deletes the Intune record only. It does not wipe the device, and it does not remove the Microsoft Entra device object — those are cleaned separately under **Devices** > **Device settings** in Entra. A device deleted here that later checks in will re-enrol as a new record."
                }
              ]
            },
            {
              text: "Select **Save**, then explain why this prevents a future support call:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Stale records count toward the device limit restriction from lab 11. A user who has rebuilt their laptop three times without retiring the old records hits `0x80180026` on a device limit of three, having only one physical machine. Cleanup rules make that self-correcting."
                }
              ]
            }
          ],
          result: {
            text: "Stale device records are removed automatically.",
            verify: [
              { text: "A cleanup rule is enabled with a threshold of 90 days or fewer." },
              { text: "You can explain which error code stale records eventually cause." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Find stale and unhealthy devices",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

$cutoff = (Get-Date).AddDays(-30)

Get-MgDeviceManagementManagedDevice -All |
    Select-Object DeviceName, UserPrincipalName, OperatingSystem,
        LastSyncDateTime, ComplianceState, ManagementState |
    Where-Object { $_.LastSyncDateTime -lt $cutoff } |
    Sort-Object LastSyncDateTime |
    Format-Table -AutoSize

Write-Host ""
Write-Host "Devices per user (device limit restrictions count these):" -ForegroundColor Yellow
Get-MgDeviceManagementManagedDevice -All |
    Where-Object UserPrincipalName |
    Group-Object UserPrincipalName |
    Where-Object Count -gt 1 |
    Select-Object Name, Count |
    Sort-Object Count -Descending |
    Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom: "A device is Microsoft Entra joined but never appears in Intune, and no error is shown to the user.",
      rootCause:
        "Automatic enrollment did not run. Either the MDM user scope excludes the user, the user is in the MAM scope instead, or the enrollment attempt failed silently and is only recorded in the event log.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status | Select-String \"MdmUrl\"\nGet-WinEvent -LogName \"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin\" -MaxEvents 20 |\n    Where-Object Id -in 71,72,76"
      },
      resolution:
        "An empty **MdmUrl** means the device was never told to enrol — fix the MDM user scope. An MdmUrl with event 76 means enrollment was attempted and refused; read the code in the event message and treat it as a licensing or restriction problem.",
      errorCodes: ["0x80180018", "0x80180014"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A user with a valid Microsoft 365 E5 licence cannot enrol a Windows 11 device. The client reports `0x80180014`. What is the cause?",
      options: [
        "An enrollment restriction is blocking the platform, ownership type or OS version",
        "The user has no Intune licence assigned",
        "The user has reached their device limit",
        "The Microsoft Entra device quota has been exceeded"
      ],
      correctIndex: 0,
      rationale:
        "`0x80180014` is `MENROLL_E_PLATFORM_BLOCKED` and always points at an enrollment restriction. A missing licence produces `0x80180018` and a device limit produces `0x80180026`.",
      examTip:
        "Learn the three enrollment codes as a set: 18 is licence, 14 is restriction, 26 is device limit. Scenario questions frequently give you the code and expect the cause immediately.",
      skills: ["g1.t2.s4"]
    },
    {
      id: "q2",
      question:
        "A user reports `0x80180026` when enrolling a new laptop. They physically own one device. What is the most likely explanation?",
      options: [
        "Stale Intune device records from previous rebuilds still count toward the device limit",
        "The Microsoft Entra ID licence has lapsed",
        "The device serial number is not in Corporate device identifiers",
        "The enrollment restriction blocks personally owned devices"
      ],
      correctIndex: 0,
      rationale:
        "The device limit restriction counts enrolled records, not physical hardware. Rebuilding a machine without retiring the old record leaves the slot occupied, so a user with one laptop can genuinely exhaust a limit of three.",
      examTip:
        "Device cleanup rules exist precisely to prevent this. If a question mentions repeated rebuilds or reimaging, stale records are almost always the answer.",
      skills: ["g1.t2.s4"]
    }
  ]
};
