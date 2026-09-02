export default {
  id: "troubleshoot-app-deployment",
  moduleId: "m6",
  title: "Monitor and troubleshoot application deployment",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 40,

  scenario:
    "An application shows as failed on nineteen devices and installed on two hundred. Your job is to find out why in minutes rather than hours. Intune's app reporting tells you where to look, the Intune Management Extension logs tell you what actually happened, and the error codes tell you which of the two you should be reading.",

  objectives: [
    "Read app installation reports at tenant, app and device level",
    "Locate and interpret the Intune Management Extension logs",
    "Map common app error codes to their causes",
    "Use the Troubleshooting blade to diagnose a specific user"
  ],

  keyConcepts: ["App install status", "IntuneManagementExtension.log", "AppWorkload.log", "IMECache", "Troubleshooting blade", "0x87D1041C"],

  skills: [{ id: "g4.t1.s9", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "pradeep.gupta"],
    labs: ["win32-packaging"]
  },

  exercises: [
    {
      id: "e1",
      title: "Read the reporting",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Work down from tenant to device",
          checkpoint: true,
          steps: [
            {
              text: "Start at the top. Select **Apps**, then **Monitor**, then **App install status**.",
              nav: ["Apps", "Monitor", "App install status"],
              parts: [
                {
                  kind: "verify",
                  text: "Every application is listed with counts of installed, failed, pending and not applicable. This tells you which application has a problem, not why."
                }
              ]
            },
            {
              text: "Open a failing application and select **Device install status**.",
              parts: [
                {
                  kind: "table",
                  headers: ["Status", "Meaning", "Where to look next"],
                  rows: [
                    ["Installed", "Installed and detected", "Nothing to do"],
                    ["Failed", "The install ran and failed, or detection failed after it", "The error code, then the device logs"],
                    ["Pending", "Not yet attempted, or download in progress", "Device check-in time — an offline device sits here forever"],
                    ["Not applicable", "A requirement rule excluded the device", "The requirement rules, not the installer"],
                    ["Unknown", "No status reported", "Whether the device has checked in at all"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Not applicable** is not a failure and is the most misread status in Intune. It means a requirement rule excluded the device deliberately — wrong architecture, OS below the minimum, insufficient disk. Chasing it as a failure wastes time; check the requirement rules instead."
                }
              ]
            },
            {
              text: "Select a failed device row and read the **Status details** for the underlying error code."
            }
          ],
          result: {
            text: "You can work from a tenant-wide count to a specific device and error.",
            verify: [
              { text: "You can name what **Not applicable** actually indicates." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Read the client logs",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Navigate the Intune Management Extension logs",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, list the log directory:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ChildItem \"C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\" |\n    Select-Object Name, Length, LastWriteTime | Sort-Object LastWriteTime -Descending"
                },
                {
                  kind: "table",
                  headers: ["Log", "Answers"],
                  rows: [
                    ["`IntuneManagementExtension.log`", "Did the device receive the app policy? Did it download? What exit code did the installer return?"],
                    ["`AppWorkload.log`", "How did each detection rule evaluate? This is where `0x87D1041C` is explained."],
                    ["`AgentExecutor.log`", "What did a PowerShell script or remediation actually output?"],
                    ["`ClientHealth.log`", "Is the Intune Management Extension itself healthy?"]
                  ]
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, trace one application end to end in PowerShell:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "$logs = \"C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\"\nSelect-String -Path \"$logs\\IntuneManagementExtension.log\" -Pattern \"7-Zip\" -Context 0,3 |\n    Select-Object -Last 20"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Install **CMTrace**, or use **Support Center** from the Microsoft Endpoint Manager tools. These logs are written in the Configuration Manager log format and are close to unreadable in Notepad — CMTrace colour-codes errors and follows the file live."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, check the staging cache in PowerShell (which explains failures that look like a bad installer):",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ChildItem \"C:\\Windows\\IMECache\" -Recurse -ErrorAction SilentlyContinue |\n    Select-Object FullName, Length | Select-Object -First 20"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Win32 content is downloaded and extracted to `C:\\Windows\\IMECache` before it runs. A device with insufficient free space fails here with a download or extraction error rather than an install error — which is why the disk space requirement rule from lab 33 is worth setting."
                }
              ]
            }
          ],
          result: {
            text: "You can find the log that answers a given question rather than reading all of them.",
            verify: [
              { text: "You can name the log that explains a detection failure." },
              { text: "You know where Win32 content is staged before installation." }
            ]
          }
        },
        {
          id: "t2",
          title: "Use the Troubleshooting blade",
          checkpoint: true,
          steps: [
            {
              text: "Select **Troubleshooting + support**, then **Troubleshoot**, and select a user.",
              nav: ["Troubleshooting + support", "Troubleshoot"]
            },
            {
              text: "Review what it consolidates for that user:",
              parts: [
                {
                  kind: "table",
                  headers: ["Section", "Shows"],
                  rows: [
                    ["Account status", "Licences, group membership, and whether enrollment is even permitted"],
                    ["Devices", "Every device, its compliance and its last check-in"],
                    ["App protection status", "Which app protection policies apply and when they were last evaluated"],
                    ["Compliance policies", "Which policies target the user's devices and their result"],
                    ["Configuration policies", "Which profiles apply and whether they succeeded"],
                    ["App installation status", "Every app targeted at the user and its state"],
                    ["Enrollment failures", "Why an enrollment attempt was refused, with the error code"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the blade to open first on any *it does not work for this user* call. It answers licensing, group membership, compliance, policy and app state on one page, which is exactly the set of things that usually turn out to be the cause. The Help Desk Operator role from lab 7 grants access to it."
                }
              ]
            },
            {
              text: "Map the codes you have met so far to what they mean:",
              parts: [
                {
                  kind: "table",
                  headers: ["Code", "Cause", "Fix"],
                  rows: [
                    ["`0x87D1041C`", "Install succeeded, detection rule disagreed", "Correct the detection rule"],
                    ["`0x80070005`", "Access denied, usually user context writing to a machine location", "Set install behaviour to System"],
                    ["`0x80070002`", "File not found inside the package", "Repackage with the correct source folder"],
                    ["`0x8007064C`", "Another installation already running", "Express the ordering as a dependency"],
                    ["`0x800705B4`", "Enrollment Status Page timed out on a blocking app", "Reduce the blocking app list"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can diagnose a single user's application problem from one blade.",
            verify: [
              { text: "The Troubleshooting blade shows app installation status for a chosen user." },
              { text: "You can map each of the five common codes to a cause." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An application reports Pending on many devices for days.",
      rootCause:
        "Those devices have not checked in. Pending means the assignment exists and the device has not yet acted on it — it is a connectivity or check-in problem, not an application problem.",
      diagnostic: {
        lang: "powershell",
        code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\nGet-MgDeviceManagementManagedDevice -All |\n    Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-7) } |\n    Select-Object DeviceName, UserPrincipalName, LastSyncDateTime"
      },
      resolution:
        "Investigate why the devices are not checking in rather than the application. Devices offline beyond the cleanup threshold from lab 15 will eventually be removed automatically."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "An application reports Not applicable for 40 devices. What does this indicate?",
      options: [
        "A requirement rule excluded those devices, so installation was never attempted",
        "The installation failed and was rolled back",
        "The devices have not checked in recently",
        "The detection rule could not be evaluated"
      ],
      correctIndex: 0,
      rationale:
        "Not applicable means a requirement rule — architecture, minimum operating system, disk space — excluded the device deliberately. Nothing was attempted and nothing failed.",
      examTip:
        "Not applicable points at requirement rules; Failed points at the installer or the detection rule; Pending points at device check-in. Three statuses, three completely different investigations.",
      skills: ["g4.t1.s9"]
    },
    {
      id: "q2",
      question:
        "Which log file explains why a Win32 application's detection rule evaluated as not detected?",
      options: [
        "AppWorkload.log",
        "IntuneManagementExtension.log",
        "AgentExecutor.log",
        "ClientHealth.log"
      ],
      correctIndex: 0,
      rationale:
        "`AppWorkload.log` records per-application workload detail including detection rule evaluation. `IntuneManagementExtension.log` covers policy retrieval, download and installer exit codes, and `AgentExecutor.log` covers script execution.",
      examTip:
        "All four live in `C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs`. Knowing which one answers which question is what turns a two-hour investigation into a ten-minute one.",
      skills: ["g4.t1.s9"]
    }
  ]
};
