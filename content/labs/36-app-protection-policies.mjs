export default {
  id: "app-protection-policies",
  moduleId: "m6",
  title: "App protection policies and selective wipe",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 50,

  scenario:
    "Joni's personal laptop is deliberately blocked from enrollment, and Diego's phone is enrolled but personally owned. Both need corporate mail, and neither should let corporate data leak into a personal account. App protection policies secure the data inside the application rather than the device around it — the only workable answer for hardware the organisation does not own.",

  objectives: [
    "Create app protection policies for Android and Windows",
    "Configure data relocation and access requirements",
    "Pair app protection with a Conditional Access grant control",
    "Perform a selective wipe and understand what it removes",
    "Distinguish MAM without enrollment from MAM on managed devices"
  ],

  keyConcepts: ["App protection policy", "MAM-WE", "Data relocation", "Selective wipe", "App protection Conditional Access", "Managed apps"],

  skills: [
    { id: "g4.t2.s1", depth: "primary" },
    { id: "g4.t2.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["joni.sherman", "diego.siciliani", "isaiah.langer"],
    labs: ["mobile-apps-and-quiet-time", "conditional-access"]
  },

  exercises: [
    {
      id: "e1",
      title: "Create an Android app protection policy",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Configure data protection and access",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **App protection policies**, then **Create policy** > **Android**.",
              nav: ["Apps", "App protection policies", "Create policy"]
            },
            {
              text: "Name it `APP-Android-Corporate`, then on **Apps** set:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Target policy to", value: "All app types", note: "Covers apps on unenrolled devices and on enrolled ones." },
                    { label: "Public apps", value: "Microsoft Outlook, Microsoft Teams, Microsoft Edge, OneDrive" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "App protection only works with applications built against the Intune App SDK or wrapped with the App Wrapping Tool. Microsoft's own apps are all supported; an arbitrary third-party app is not, and adding it achieves nothing. This is the first thing to check when a policy appears to have no effect."
                }
              ]
            },
            {
              text: "On **Data protection**, configure the relocation rules that stop leakage:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Backup org data to Android backup services", value: "Block" },
                    { label: "Send org data to other apps", value: "Policy managed apps", note: "Corporate data can only move to other protected apps." },
                    { label: "Save copies of org data", value: "Block" },
                    { label: "Allow user to save copies to selected services", value: "OneDrive for Business, SharePoint" },
                    { label: "Restrict cut, copy, and paste between other apps", value: "Policy managed apps" },
                    { label: "Screen capture and Google Assistant", value: "Block" },
                    { label: "Encrypt org data", value: "Require" }
                  ]
                }
              ]
            },
            {
              text: "On **Access requirements**, configure the gate the user meets:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "PIN for access", value: "Require" },
                    { label: "PIN type", value: "Numeric" },
                    { label: "Minimum PIN length", value: "6" },
                    { label: "Recheck the access requirements after (minutes of inactivity)", value: "30" },
                    { label: "Work or school account credentials for access", value: "Require" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This app PIN is separate from both the device unlock code and the Android work profile challenge. On a personally owned device with a work profile, a user can end up with three. Consider whether you need the app PIN when the work profile already has one — the settings are independent and stack."
                }
              ]
            },
            {
              text: "On **Conditional launch**, set what happens when conditions are not met:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Max PIN attempts", value: "5 — Reset PIN" },
                    { label: "Offline grace period", value: "720 minutes — Block access" },
                    { label: "Offline grace period", value: "90 days — Wipe data", note: "A device that has not checked in for 90 days loses its corporate data." },
                    { label: "Jailbroken/rooted devices", value: "Block access" },
                    { label: "Min OS version", value: "13.0 — Block access" }
                  ]
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-BYOD` and `GRP-USR-FIELD`, then create the policy."
            }
          ],
          result: {
            text: "Corporate data inside managed apps is encrypted, PIN-protected and cannot move to personal apps.",
            verify: [
              { text: "`APP-Android-Corporate` targets Outlook, Teams, Edge and OneDrive." },
              { text: "Conditional launch includes a wipe action for long-offline devices." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify on the device",
          checkpoint: true,
          steps: [
            {
              text: "On the Android emulator, open **Outlook** in the work profile and sign in as Diego.",
              parts: [
                {
                  kind: "verify",
                  text: "Outlook prompts to set an app PIN meeting your complexity rules, separate from the work profile challenge."
                }
              ]
            },
            {
              text: "Test the data boundary:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open an email and try to copy text into a personal application. It is blocked." },
                    { text: "Try to save an attachment to local storage. Only OneDrive for Business and SharePoint are offered." },
                    { text: "Try a screenshot inside Outlook. It is refused." }
                  ]
                }
              ]
            },
            {
              text: "Check the reporting.",
              nav: ["Apps", "Monitor", "App protection status"],
              parts: [
                {
                  kind: "verify",
                  text: "Diego appears with a policy status of **Protected** and the checked-in time. **Flagged users** on the same page lists devices failing conditional launch."
                }
              ]
            }
          ],
          result: {
            text: "Data protection is enforced inside the applications and visible in reporting.",
            verify: [
              { text: "An app PIN is required to open Outlook." },
              { text: "Corporate data cannot be pasted into personal apps." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Conditional Access and selective wipe",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Require app protection through Conditional Access",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, create a new Conditional Access policy named `CA-Require-App-Protection`.",
              nav: ["Protection", "Conditional Access", "Policies", "New policy"]
            },
            {
              text: "Configure it:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Users — Include", value: "GRP-USR-BYOD" },
                    { label: "Users — Exclude", value: "admin-breakglass, admin-intune" },
                    { label: "Target resources", value: "Office 365" },
                    { label: "Conditions — Device platforms", value: "Android, iOS, Windows" },
                    { label: "Conditions — Client apps", value: "Mobile apps and desktop clients" },
                    { label: "Grant", value: "Require app protection policy" },
                    { label: "For multiple controls", value: "Require one of the selected controls" },
                    { label: "Enable policy", value: "Report-only" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the pairing the exam asks about. `CA-Require-Compliant-Device` from lab 31 demands enrollment, which BYOD users cannot provide. **Require app protection policy** verifies instead that the app itself is protected, which lets an unmanaged device reach corporate data safely. Together they cover both populations."
                }
              ]
            },
            {
              text: "Create the policy in report-only mode, then review the sign-in logs after Joni or Diego signs in.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Set **For multiple controls** to *Require one of the selected controls* if you combine app protection with compliance in one policy — otherwise a device must satisfy both, which no device can, and everyone is blocked."
                }
              ]
            }
          ],
          result: {
            text: "Unmanaged devices are gated on app protection rather than enrollment.",
            verify: [
              { text: "The policy uses the **Require app protection policy** grant control." },
              { text: "It is in report-only mode with the emergency account excluded." }
            ]
          }
        },
        {
          id: "t2",
          title: "Perform a selective wipe",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **App selective wipe**, then **Create wipe request**.",
              nav: ["Apps", "App selective wipe", "Create wipe request"]
            },
            {
              text: "Select `diego.siciliani@<tenant>.onmicrosoft.com`, choose the device, and create the request."
            },
            {
              text: "Understand precisely what this does before running it:",
              parts: [
                {
                  kind: "table",
                  headers: ["Action", "Removes", "Leaves"],
                  rows: [
                    ["**App selective wipe**", "Corporate data inside managed apps", "The device, personal data, and the apps themselves"],
                    ["**Retire** (lab 50)", "Management, policies, company apps, work profile", "The device and all personal data"],
                    ["**Wipe** (lab 50)", "Everything — factory reset", "Nothing"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Selective wipe is the least destructive of the three and the right answer for a departing employee's personal phone. It removes corporate data from within managed applications and touches nothing else — the user keeps their photos, their apps and their device."
                }
              ]
            },
            {
              text: "On the emulator, open Outlook after the wipe reaches the device.",
              parts: [
                {
                  kind: "verify",
                  text: "Corporate mail is gone and Outlook prompts to sign in again. The app itself is still installed and Diego's personal content is untouched."
                }
              ]
            },
            {
              text: "Check the wipe status in the portal.",
              parts: [
                {
                  kind: "verify",
                  text: "**App selective wipe** shows the request as **Succeeded**. Requests remain pending until the app next contacts the service, so a device that is switched off shows pending indefinitely."
                }
              ]
            }
          ],
          result: {
            text: "Corporate data is removed from a personally owned device without touching anything personal.",
            verify: [
              { text: "The wipe request reports success." },
              { text: "You can state the difference between selective wipe, retire and wipe." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An app protection policy is assigned but no PIN prompt appears and data can be copied freely.",
      rootCause:
        "The application is not Intune App SDK enabled, the user is not in an assigned group, or the app was signed into with a personal account rather than the work account.",
      diagnostic: {
        lang: "text",
        code: "Apps > Monitor > App protection status\nFilter by the user and check the policy status and the last check-in."
      },
      resolution:
        "Confirm the app appears in Microsoft's list of protected apps, confirm group membership, and ensure the user signed into the app with their work account — app protection is bound to the corporate identity, not the app."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "An employee leaves and returns their corporate laptop, but their personal phone had corporate mail through Outlook with an app protection policy. What action removes corporate data without affecting their personal content?",
      options: [
        "App selective wipe",
        "Retire",
        "Wipe",
        "Delete the device record from Intune"
      ],
      correctIndex: 0,
      rationale:
        "Selective wipe removes corporate data from within managed applications and leaves the device, its personal data and the apps themselves intact. Retire removes management, and wipe factory-resets the device.",
      examTip:
        "Three levels of removal: selective wipe touches data in apps, retire removes management, wipe destroys everything. Match the level to what the scenario says the organisation owns.",
      skills: ["g4.t2.s1"]
    },
    {
      id: "q2",
      question:
        "You create a Conditional Access policy combining Require device to be marked as compliant and Require app protection policy, and set it to require all selected controls. What is the effect on a BYOD user with an unenrolled but app-protected device?",
      options: [
        "They are blocked, because an unenrolled device cannot satisfy the compliance control",
        "They are granted access, because app protection is satisfied",
        "They are prompted to enrol the device",
        "The policy does not apply to unenrolled devices"
      ],
      correctIndex: 0,
      rationale:
        "Requiring all selected controls means every control must be satisfied. An unenrolled device can never be marked compliant, so the user is blocked regardless of app protection.",
      examTip:
        "When combining grant controls, *Require one of the selected controls* is what lets managed and unmanaged devices coexist under one policy. Requiring all of them is a common lockout.",
      skills: ["g4.t2.s2"]
    }
  ]
};
