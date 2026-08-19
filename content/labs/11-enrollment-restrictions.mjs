export default {
  id: "enrollment-restrictions",
  moduleId: "m2",
  title: "Enrollment restrictions, device limits and corporate identifiers",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Automatic enrollment now lets anything in. Contoso wants Windows and Android corporate devices managed, personally owned Windows blocked from full enrollment, and a hard limit on how many devices one person can bring. You will build those restrictions, then flip a device from Personal to Corporate using a corporate identifier — which is also how you fix the ownership problem that stopped `GRP-DEV-WIN-CORP` populating in lab 6.",

  objectives: [
    "Create platform restrictions that allow, block and version-gate each platform",
    "Set a device limit restriction and understand how it differs from the Entra device quota",
    "Import corporate device identifiers to mark devices as company-owned",
    "Change a device's ownership and watch a dynamic group repopulate",
    "Map enrollment error codes to the restriction that caused them"
  ],

  keyConcepts: ["Platform restrictions", "Device limit restriction", "Corporate device identifiers", "Device ownership", "Restriction priority"],

  skills: [{ id: "g1.t2.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 Pro" }
    ],
    personas: ["alex.wilber", "joni.sherman"],
    labs: ["enrollment-settings", "groups-for-devices"]
  },

  exercises: [
    {
      id: "e1",
      title: "Platform restrictions",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create a corporate platform restriction",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then **Device platform restrictions**.",
              nav: ["Devices", "Enrollment", "Device platform restrictions"]
            },
            {
              text: "Note the built-in default restriction first.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "**All Users** is a built-in restriction at the lowest priority that allows every platform. You cannot delete it and you cannot change its priority. Any restriction you create sits above it and wins for the users it targets — which means a restriction that appears to do nothing is usually one that was never assigned to a group."
                }
              ]
            },
            {
              text: "Select **Create restriction** > **Windows restriction**, then configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-Corporate-Only" },
                    { label: "Windows (MDM)", value: "Allow" },
                    { label: "Allow personally owned devices", value: "Block" },
                    { label: "Minimum OS version", value: "10.0.22000", note: "Windows 11 baseline. Below this, enrollment is refused." },
                    { label: "Maximum OS version", value: "Leave blank" }
                  ]
                }
              ]
            },
            {
              text: "On **Assignments**, assign it to `GRP-USR-FINANCE` and `GRP-USR-IT`, then create it."
            },
            {
              text: "Create a second restriction for the BYOD population:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-BYOD-AppProtectionOnly" },
                    { label: "Windows (MDM)", value: "Block", note: "These users get app protection policies instead of device enrollment." },
                    { label: "Assignment", value: "GRP-USR-BYOD" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Blocking MDM enrollment does not cut these users off. Lab 36 gives them app protection policies, which secure corporate data inside apps on an unmanaged device — the intended answer for personally owned hardware."
                }
              ]
            },
            {
              text: "Check the priority order in the list. Drag `WIN-Corporate-Only` above `WIN-BYOD-AppProtectionOnly` if it is not already.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "A user who is in both groups gets the restriction with the **lowest priority number**, and only that one. Restrictions do not merge. Joni is in `GRP-USR-BYOD` and `GRP-USR-SALES`; if you later assign a corporate restriction to Sales, priority decides which applies."
                }
              ]
            }
          ],
          result: {
            text: "Enrollment is gated by platform, ownership and OS version, with an explicit priority order.",
            verify: [
              { text: "Two restrictions exist above **All Users**." },
              { text: "You can state which restriction applies to a user in both groups." }
            ]
          }
        },
        {
          id: "t2",
          title: "Set a device limit",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, then **Enrollment**, then **Device limit restrictions**.",
              nav: ["Devices", "Enrollment", "Device limit restrictions"]
            },
            {
              text: "Select **Create restriction** and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "LIMIT-Standard-3" },
                    { label: "Device limit", value: "3" },
                    { label: "Assignment", value: "GRP-USR-FINANCE" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This limit is enforced by Intune and returns `0x80180026` when exceeded. Microsoft Entra ID has a *separate* per-user device quota under **Devices** > **Device settings**, which returns `0x801c03f2`. Raising one does not raise the other, and confusing them costs a lot of time because both present as a device that will not enroll."
                }
              ]
            }
          ],
          result: {
            text: "Finance users may enroll at most three devices each.",
            verify: [
              { text: "**Device limit restrictions** lists the new restriction assigned to Finance." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Corporate device identifiers",
      intro:
        "A device enrolled by hand through Settings is marked **Personal** by default. Corporate identifiers are how you tell Intune that a device is company property before it ever enrolls.",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Import an identifier and change ownership",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, get the serial number that Intune will match against:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-CimInstance -ClassName Win32_BIOS | Select-Object SerialNumber"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Hyper-V generates a serial number for each virtual machine, so this works in the lab exactly as it would on physical hardware. Record the value."
                }
              ]
            },
            {
              text: "Create a CSV file with no header row, containing the identifier and an optional description:",
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  caption: "corporate-identifiers.csv — no header row",
                  code: "1234-5678-9012-3456-7890-1234-56,Finance laptop - Alex Wilber"
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "No header row. A header line is treated as a device identifier, fails to match anything, and the import reports success — so the file looks accepted and nothing works."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, then **Corporate device identifiers**.",
              nav: ["Devices", "Enrollment", "Corporate device identifiers"]
            },
            {
              text: "Select **Add identifiers**, choose **Upload CSV file**, set the identifier type to **Serial number**, and upload your file."
            },
            {
              text: "The device is already enrolled, so the identifier will not retroactively change it. Change ownership directly:",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Properties"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Next to **Device ownership**, select **Corporate**." },
                    { text: "Select **Save**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Corporate identifiers apply at enrollment time. For a device that is already enrolled you change ownership by hand; for everything you buy in future, importing the serial numbers before deployment means ownership is correct from the first enrollment."
                }
              ]
            }
          ],
          result: {
            text: "The device is marked as corporate-owned and future devices with imported serials will enroll as corporate automatically.",
            verify: [
              { text: "**Corporate device identifiers** lists your serial number." },
              { text: "`MD102-VM2-Alex` shows **Ownership: Corporate** in **All devices**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Watch the dynamic group repopulate",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, open `GRP-DEV-WIN-CORP` and select **Members**.",
              nav: ["Groups", "GRP-DEV-WIN-CORP", "Members"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "In lab 6 this group was empty because the rule requires `device.deviceOwnership -eq \"Company\"` and the device was Personal. Changing ownership changes the directory attribute, and the rule re-evaluates. Allow several minutes."
                }
              ]
            },
            {
              text: "Refresh until `MD102-VM2-Alex` appears.",
              parts: [
                {
                  kind: "verify",
                  text: "The device is now a member. This is the whole chain working end to end: ownership on the Intune object drives the directory attribute, which drives dynamic group membership, which drives every policy assignment for the rest of this course."
                }
              ]
            },
            {
              text: "Note the ownership values as they appear in each place:",
              parts: [
                {
                  kind: "table",
                  headers: ["Surface", "Corporate shows as", "Personal shows as"],
                  rows: [
                    ["Intune portal device list", "Corporate", "Personal"],
                    ["Microsoft Entra device attribute", "`Company`", "`Personal`"],
                    ["Dynamic membership rule literal", "`\"Company\"`", "`\"Personal\"`"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "Ownership drives group membership, and you have seen the full chain operate.",
            verify: [
              { text: "`GRP-DEV-WIN-CORP` contains the device." },
              { text: "You can explain why the rule literal differs from the portal label." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A user cannot enroll a device and receives `0x80180014`.",
      rootCause:
        "A platform restriction is blocking the attempt: the platform is blocked, personally owned devices are blocked, or the OS version is outside the configured minimum or maximum.",
      diagnostic: {
        lang: "text",
        code: "Devices > Enrollment > Device platform restrictions\nCheck which restriction applies to that user, and its priority relative to others."
      },
      resolution:
        "Either relax the restriction, or make the device corporate by importing its serial number under **Corporate device identifiers** before enrollment.",
      errorCodes: ["0x80180014"]
    },
    {
      symptom: "Enrollment fails with `0x80180026` for a user who owns only two devices.",
      rootCause:
        "Stale device records count toward the limit. Devices that were wiped or rebuilt without being retired in Intune still occupy a slot.",
      diagnostic: {
        lang: "powershell",
        code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\nGet-MgDeviceManagementManagedDevice -All |\n    Where-Object UserPrincipalName -eq \"alex.wilber@<tenant>.onmicrosoft.com\" |\n    Select-Object DeviceName, LastSyncDateTime, ManagementState"
      },
      resolution:
        "Retire the stale records, or raise the device limit restriction. Lab 15 covers automatic cleanup rules so this stops recurring.",
      errorCodes: ["0x80180026", "0x801c03f2"]
    }
  ],

  quiz: [
    {
      question:
        "A user belongs to two groups, each assigned a different Windows enrollment restriction. One allows personally owned devices and one blocks them. What happens?",
      options: [
        "The restriction with the lowest priority number applies, and only that one",
        "The two restrictions merge and the most restrictive setting wins",
        "Enrollment is blocked because the restrictions conflict",
        "The built-in All Users restriction applies instead"
      ],
      correctIndex: 0,
      rationale:
        "Enrollment restrictions do not merge. Intune evaluates priority and applies a single restriction — the one with the lowest priority number. This is different from compliance and configuration policy, where the most restrictive setting generally wins.",
      examTip:
        "Enrollment restrictions: priority decides, one winner. Configuration profiles: conflicts leave the setting unapplied. Compliance: most restrictive wins. Keep those three straight.",
      skills: ["g1.t2.s1"]
    },
    {
      question:
        "You import a CSV of serial numbers under Corporate device identifiers. Devices already enrolled still show as Personal. Why?",
      options: [
        "Corporate identifiers are evaluated at enrollment time and do not change existing records",
        "Serial numbers are only supported for iOS and Android",
        "The CSV requires a header row that was missing",
        "The devices must be added to a dynamic group before ownership updates"
      ],
      correctIndex: 0,
      rationale:
        "The identifier list is consulted when a device enrolls, to decide ownership at that moment. Devices already enrolled keep whatever ownership they were given, and must be changed individually in the device's properties.",
      examTip:
        "Import identifiers before deployment. And remember the CSV takes no header row — a header is parsed as a device identifier and silently matches nothing.",
      skills: ["g1.t2.s1"]
    }
  ]
};
