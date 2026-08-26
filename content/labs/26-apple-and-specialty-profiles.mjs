export default {
  id: "apple-and-specialty-profiles",
  moduleId: "m4",
  title: "Apple and specialty device configuration profiles",
  access: "walkthrough-device",
  accessReason:
    "Configuring these profiles requires no special licence — you can build every one of them in your tenant right now — but verifying them requires a Mac, an iPhone or iPad, a Teams Room, a HoloLens 2 or a Zebra handheld, none of which this lab has. Build the profiles as you read; the exercises stop short of asking you to confirm behaviour on hardware you do not own.",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Contoso is adding Macs for designers, iPads for the sales floor, a Teams Room in the boardroom and Zebra scanners in the warehouse. Each has its own profile types and its own quirks, and the exam has a dedicated objective for specialty devices that most candidates never look at because they have never touched the hardware.",

  objectives: [
    "Create configuration profiles for macOS and iOS/iPadOS",
    "Explain how Apple settings are delivered and what a custom profile is for",
    "Describe the profile types available for Teams Rooms, HoloLens 2 and Zebra devices",
    "Identify which specialty device needs which enrollment and profile combination"
  ],

  keyConcepts: ["Settings catalog for Apple", "Custom configuration profile", "mobileconfig", "Teams Rooms", "HoloLens 2", "Zebra OEMConfig"],

  skills: [
    { id: "g2.t2.s3", depth: "primary" },
    { id: "g2.t2.s4", depth: "primary" },
    { id: "g2.t2.s5", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["miriam.graham"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "macOS and iOS configuration",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create a macOS settings catalog profile",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Configuration**, then **Create** > **New Policy**, with platform **macOS** and profile type **Settings catalog**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Name it `MAC-Baseline` and add settings from these categories:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Login Window > Disable console access", value: "Enabled" },
                    { label: "Restrictions > Allow Screen Capture", value: "Disabled" },
                    { label: "Restrictions > Allow AirDrop", value: "Disabled" },
                    { label: "Software Update > Automatically install macOS updates", value: "Enabled" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The macOS settings catalog is built from Apple's declarative device management payloads. It has grown to cover most of what used to require a hand-written property list, and it is now the preferred way to configure Apple devices."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-APPLE` and create the profile."
            },
            {
              text: "Note the escape hatch for anything the catalog does not cover:",
              parts: [
                {
                  kind: "table",
                  headers: ["Profile type", "Use when"],
                  rows: [
                    ["Settings catalog", "The setting exists in the catalog — the default choice"],
                    ["Templates > Device restrictions", "Older curated restriction sets, still present for compatibility"],
                    ["Templates > Custom", "You have a `.mobileconfig` property list produced by Apple Configurator or a vendor"],
                    ["Templates > Preference file", "You need to set a specific application's preference domain directly"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "A **custom** profile uploads a `.mobileconfig` file — an Apple property list containing one or more payloads. Intune delivers it without understanding it, so there is no per-setting reporting: the whole file either applies or does not. Reach for it only when the catalog genuinely lacks the setting."
                }
              ]
            }
          ],
          result: {
            text: "A macOS baseline profile exists and you know when to use each Apple profile type.",
            verify: [
              { text: "`MAC-Baseline` exists under **Configuration**." },
              { text: "You can state the reporting limitation of a custom profile." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create an iOS device features profile",
          checkpoint: true,
          steps: [
            {
              text: "Create a profile with platform **iOS/iPadOS** and profile type **Templates** > **Device restrictions**, named `IOS-Restrictions`."
            },
            {
              text: "Configure a representative set:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Block screenshots and screen recording", value: "Yes" },
                    { label: "Block sending diagnostic data to Apple", value: "Yes" },
                    { label: "Block untrusted TLS certificates", value: "Yes" },
                    { label: "Block AirDrop", value: "Yes", note: "Requires a supervised device." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Many iOS restrictions are marked **supervised only** in the portal. On an unsupervised, personally enrolled device those settings are delivered and silently ignored — the profile reports success and nothing changes. Supervision comes only from Automated Device Enrollment or Apple Configurator, as covered in lab 14. This is the single most common Apple configuration surprise."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-APPLE` and create the profile."
            }
          ],
          result: {
            text: "An iOS restrictions profile exists and you know which settings need supervision.",
            verify: [
              { text: "`IOS-Restrictions` exists." },
              { text: "You can explain why a supervised-only setting appears to succeed on an unsupervised device." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Specialty devices",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Map each specialty device to its management path",
          steps: [
            {
              text: "This objective covers three device families that behave nothing like a laptop.",
              parts: [
                {
                  kind: "table",
                  headers: ["Device", "Platform in Intune", "Enrollment", "Profile types"],
                  rows: [
                    ["Microsoft Teams Rooms on Windows", "Windows 10 and later", "Autopilot self-deploying, or manual join", "Settings catalog, plus the Teams Rooms Pro management portal for the meeting experience"],
                    ["Microsoft Teams Rooms on Android", "Android Enterprise, dedicated", "Dedicated device enrollment with a QR code", "Device restrictions for the dedicated scenario"],
                    ["HoloLens 2", "Windows 10 and later (Holographic)", "Autopilot self-deploying, or manual Entra join", "Settings catalog, kiosk profile, Windows Defender profiles"],
                    ["Zebra handhelds", "Android Enterprise, dedicated or fully managed", "Dedicated or fully managed enrollment", "**OEMConfig** for Zebra-specific hardware settings"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**OEMConfig** is the one genuinely new concept here. Android hardware vendors expose settings that are not part of standard Android — barcode scanner behaviour, ruggedised hardware buttons, cradle charging. The vendor publishes an app to Managed Google Play describing those settings, Intune reads its schema, and you configure them through an OEMConfig profile. It is how you manage vendor-specific hardware without a vendor-specific management tool."
                }
              ]
            },
            {
              text: "Note the recurring pattern across all three:",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Specialty devices are almost always shared, unattended and have **no primary user**. That means self-deploying or dedicated enrollment, device-targeted assignments only, and a kiosk or single-app configuration. If an exam question describes a meeting room, a scanner or a headset, expect those three properties to be the point."
                }
              ]
            },
            {
              text: "Note where Teams Rooms configuration actually lives:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Intune manages the Teams Rooms *device* — compliance, updates, security. The meeting experience itself, the room account, and the Teams application configuration are managed in the **Teams Rooms Pro management portal**, which is a separate surface. Knowing the split is more examinable than any individual setting."
                }
              ]
            }
          ],
          result: {
            text: "You can place each specialty device on the right enrollment and profile path.",
            verify: [
              { text: "You can explain what OEMConfig is and why it exists." },
              { text: "You can name the enrollment type shared by most specialty devices." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An iOS restrictions profile reports success but the restrictions have no effect on the device.",
      rootCause:
        "The settings are supervised-only and the device is not supervised. Unsupervised devices accept the profile and ignore those payloads.",
      diagnostic: {
        lang: "text",
        code: "Devices > All devices > open the device > check Supervised\nDevices > Configuration > open the profile > look for the supervised-only marker on each setting"
      },
      resolution:
        "Supervision requires Automated Device Enrollment through Apple Business Manager, or Apple Configurator. A personally enrolled device cannot be supervised after the fact — it must be wiped and re-enrolled through ADE."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso deploys Zebra handheld scanners and needs to configure the barcode scanner's trigger behaviour, which is not a standard Android setting. What should you use?",
      options: [
        "An OEMConfig profile, using the schema published by Zebra in Managed Google Play",
        "A custom OMA-URI configuration profile",
        "A device restrictions profile for fully managed devices",
        "A settings catalog profile for Android Enterprise"
      ],
      correctIndex: 0,
      rationale:
        "OEMConfig exists precisely for vendor-specific hardware settings that standard Android management does not expose. The vendor publishes a schema app to Managed Google Play, and Intune renders its settings for configuration.",
      examTip:
        "Vendor-specific Android hardware equals OEMConfig. OMA-URI is the equivalent escape hatch on Windows, and .mobileconfig on Apple.",
      skills: ["g2.t2.s5"]
    },
    {
      id: "q2",
      question:
        "Which profile type should you use on macOS when the setting you need is not present in the settings catalog and comes as an Apple property list from a vendor?",
      options: [
        "Templates > Custom, uploading the .mobileconfig file",
        "Templates > Preference file",
        "Settings catalog with a custom row added",
        "An OMA-URI custom profile"
      ],
      correctIndex: 0,
      rationale:
        "A custom profile uploads a `.mobileconfig` property list containing vendor payloads. Preference files set a specific application's preference domain and OMA-URI is a Windows mechanism, not an Apple one.",
      examTip:
        "Custom profiles have no per-setting reporting — the whole file applies or fails as one unit. That trade-off is why they are a last resort.",
      skills: ["g2.t2.s4"]
    }
  ]
};
