export default {
  id: "apple-update-policies",
  moduleId: "m8",
  title: "iOS, iPadOS and macOS update policies",
  access: "walkthrough-device",
  accessReason:
    "You can build these policies in your tenant — they need no special licence — but there is no Apple hardware here to receive them, so the exercises stop at configuration rather than verification. Build them as you read; the settings and the supervision constraints are what the exam asks about.",
  difficulty: "intermediate",
  estimatedMinutes: 30,

  scenario:
    "Apple updates are managed through the settings catalog using Apple's declarative device management, and the amount of control you get depends entirely on whether the device is supervised. On a supervised corporate iPad you can enforce a version by a deadline; on a personally enrolled iPhone you can suggest and little else.",

  objectives: [
    "Create an update policy for iOS and iPadOS through the settings catalog",
    "Create a macOS software update policy",
    "Explain how supervision limits what can be enforced",
    "Describe declarative device management for Apple updates"
  ],

  keyConcepts: ["Declarative device management", "Enforced software update", "Deferral", "Supervision", "Update deadline"],

  skills: [{ id: "g3.t2.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["miriam.graham"],
    labs: ["apple-and-specialty-profiles", "update-rings"]
  },

  exercises: [
    {
      id: "e1",
      title: "Build the policies",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create an iOS and iPadOS update policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Configuration**, then **Create** > **New Policy**, platform **iOS/iPadOS**, profile type **Settings catalog**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Apple update management moved to the settings catalog and Apple's declarative device management framework. Older guidance points at **Devices** > **Update policies for iOS/iPadOS**, which still exists but is the legacy surface. The exam objective names the Settings Catalog explicitly."
                }
              ]
            },
            {
              text: "Name it `IOS-Updates-Corporate`, then search the settings picker for `Software Update` and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enforced Software Update — Target OS Version", value: "The version you require, for example 18.1" },
                    { label: "Enforced Software Update — Target Local Date Time", value: "The deadline by which it must be installed" },
                    { label: "Software Update — Automatic Actions: Download", value: "Allowed" },
                    { label: "Software Update — Automatic Actions: Install OS Updates", value: "Allowed" },
                    { label: "Software Update — Enforced Delay: Major OS Updates (days)", value: "30", note: "Delays major releases so you can validate them." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Enforced software update** — specifying a target version and a deadline — requires a **supervised** device. On an unsupervised, personally enrolled device the setting is delivered and ignored, exactly as with the supervised-only restrictions in lab 26. Supervision comes only from Automated Device Enrollment or Apple Configurator."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-APPLE` and create the profile."
            }
          ],
          result: {
            text: "An iOS update policy exists with an enforced target version and deadline.",
            verify: [
              { text: "`IOS-Updates-Corporate` exists with software update settings." },
              { text: "You can state what enforcement requires." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create a macOS update policy",
          checkpoint: true,
          steps: [
            {
              text: "Create a settings catalog profile with platform **macOS**, named `MAC-Updates-Corporate`."
            },
            {
              text: "Search for `Software Update` and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Automatically Check For Updates", value: "Enabled" },
                    { label: "Automatically Download Updates", value: "Enabled" },
                    { label: "Automatically Install macOS Updates", value: "Enabled" },
                    { label: "Automatically Install App Store App Updates", value: "Enabled" },
                    { label: "Enforced Software Update — Target OS Version", value: "The macOS version you require" },
                    { label: "Enforced Software Update — Target Local Date Time", value: "The deadline" },
                    { label: "Enforced Software Update — Delay Major Software Update (days)", value: "30" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "macOS separates several update types that Windows treats as one: system updates, App Store application updates, and critical security responses, each configurable independently. Being able to enable rapid security responses without also enabling major version upgrades is a genuine advantage of the Apple model."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-APPLE` and create the profile."
            }
          ],
          result: {
            text: "A macOS update policy exists with an enforced version and deadline.",
            verify: [
              { text: "`MAC-Updates-Corporate` exists with automatic install and an enforced target." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Compare the three platforms",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Place all three update models side by side",
          steps: [
            {
              text: "You have now configured update management on every platform this course covers. The models are genuinely different and the exam expects you to know which is which.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Windows", "Android (corporate)", "Apple"],
                  rows: [
                    ["Staged rollout", "**Yes** — update rings with per-release deferrals", "No", "No"],
                    ["Enforce a specific version", "Feature update policy", "No", "**Yes** — enforced software update, supervised only"],
                    ["Deadline for installation", "Yes, with a grace period", "Postpone up to 30 days", "Yes, a target date and time"],
                    ["Emergency override", "Expedited quality update", "No", "No"],
                    ["Restart-free patching", "Hotpatch, with Autopatch", "No", "Rapid Security Responses"],
                    ["Pause a rollout", "Yes, up to 35 days", "Freeze periods", "Delay major updates"],
                    ["Managed service option", "Windows Autopatch", "No", "No"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Windows is the only platform with a genuine ring model, and the only one with an emergency override. Apple is the only one where you can name a target version and a deadline. Android gives you timing control and nothing else. Those three sentences answer most cross-platform update questions."
                }
              ]
            }
          ],
          result: {
            text: "You can choose the right update mechanism for any platform in a scenario.",
            verify: [
              { text: "You can name the only platform with staged rings." },
              { text: "You can name the platform where a target version can be enforced by deadline." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An enforced software update policy is deployed to iPads but they remain on an older version past the deadline.",
      rootCause: "The devices are not supervised. Enforced software update is a supervised-only capability and is silently ignored otherwise.",
      diagnostic: {
        lang: "text",
        code: "Devices > All devices > open the device > check the Supervised property\nDevices > Configuration > open the profile > Device status"
      },
      resolution:
        "Supervision requires Automated Device Enrollment through Apple Business Manager, or Apple Configurator. An already personally enrolled device must be wiped and re-enrolled through ADE — it cannot be supervised in place."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You configure an enforced software update policy specifying iOS 18.1 by a deadline. Corporate iPads enrolled through Apple Business Manager comply, but personally enrolled iPhones do not. Why?",
      options: [
        "Enforced software update requires a supervised device, and personally enrolled devices are not supervised",
        "The policy must be assigned to a device group rather than a user group",
        "iPhones require a separate update policy platform",
        "The deadline must be at least 30 days in the future"
      ],
      correctIndex: 0,
      rationale:
        "Enforced software update is supervised-only. Devices enrolled through Automated Device Enrollment are supervised and comply; personally enrolled devices accept the profile and ignore the payload.",
      examTip:
        "Supervision keeps recurring across Apple management — restrictions, kiosk mode, non-removable profiles and enforced updates all depend on it. Establish whether a device is supervised before analysing anything else.",
      skills: ["g3.t2.s4"]
    }
  ]
};
