export default {
  id: "android-configuration-profiles",
  moduleId: "m4",
  title: "Android configuration profiles",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Diego's work profile is enrolled but unconfigured. Android configuration profiles differ from Windows in one important way: the profile type you can create depends entirely on how the device was enrolled. A work profile device and a fully managed device expose different settings, and choosing the wrong profile type produces a policy that reports success and applies nothing.",

  objectives: [
    "Create a device restrictions profile for an Android Enterprise work profile",
    "Configure a device password policy for the work container",
    "Distinguish work profile settings from fully managed settings",
    "Verify configuration on the emulator"
  ],

  keyConcepts: ["Device restrictions", "Work profile settings", "Fully managed settings", "Work profile password", "Cross-profile data sharing"],

  skills: [{ id: "g2.t2.s2", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["diego.siciliani"],
    labs: ["android-enterprise"]
  },

  exercises: [
    {
      id: "e1",
      title: "Configure the work profile",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a device restrictions profile",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Choose the platform and profile carefully:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Platform", value: "Android Enterprise" },
                    { label: "Profile type", value: "Personally-Owned Work Profile > Device restrictions" },
                    { label: "Name", value: "AND-WP-Restrictions" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The profile type list is grouped by enrollment scenario: **Personally-Owned Work Profile**, **Fully Managed, Dedicated, and Corporate-Owned Work Profile**. A profile created under the wrong heading targets devices that do not exist in that state, reports as not applicable, and looks like nothing happened. Match the profile type to how the device was actually enrolled."
                }
              ]
            },
            {
              text: "Under **Work profile settings**, configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Copy and paste between work and personal profiles", value: "Block" },
                    { label: "Data sharing between work and personal profiles", value: "Apps in work profile can handle sharing request from personal profile" },
                    { label: "Work profile notifications while device locked", value: "Block", note: "Stops corporate content appearing on the lock screen." },
                    { label: "Contact sharing via Bluetooth", value: "Block" },
                    { label: "Screen capture", value: "Block" }
                  ]
                }
              ]
            },
            {
              text: "Under **Work profile password**, configure the container passcode:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Required password type", value: "Numeric complex" },
                    { label: "Minimum password length", value: "6" },
                    { label: "Number of sign-in failures before wiping device", value: "10", note: "Wipes the work profile, not the device — this is a personally owned phone." },
                    { label: "Maximum minutes of inactivity until work profile locks", value: "5" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Two separate passwords exist on a work profile device: the device unlock code, which belongs to the user, and the work profile challenge, which you control. Setting **Work profile password** governs only the container. There is a separate **Device password** section for the device itself, which you should leave alone on personally owned hardware."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-ANDROID-WP` and create the profile."
            }
          ],
          result: {
            text: "The work container is restricted and requires its own passcode.",
            verify: [
              { text: "`AND-WP-Restrictions` is assigned to the work profile device group." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify on the emulator",
          checkpoint: true,
          steps: [
            {
              text: "On the Android emulator, open the badged **Company Portal** inside the work profile and tap **Check settings** or **Sync**."
            },
            {
              text: "Wait for the policy to arrive, then test each restriction:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open a work application and attempt to copy text, then paste into a personal application. It should be blocked." },
                    { text: "Attempt a screenshot inside a work application. It should be refused." },
                    { text: "Lock the device and confirm work notifications no longer show content." }
                  ]
                }
              ]
            },
            {
              text: "Confirm you are prompted to set a work profile passcode.",
              parts: [
                {
                  kind: "verify",
                  text: "Android prompts for a separate work profile challenge meeting the complexity you configured. Set one — later labs assume the container is unlocked."
                }
              ]
            },
            {
              text: "Check the profile's device status in the portal.",
              nav: ["Devices", "Configuration", "AND-WP-Restrictions", "Device status"],
              parts: [
                {
                  kind: "verify",
                  text: "The emulator reports **Succeeded**. A status of **Not applicable** means the profile type does not match the enrollment scenario."
                }
              ]
            }
          ],
          result: {
            text: "Configuration is enforced inside the work container and verified on the device.",
            verify: [
              { text: "Copy and paste across the boundary is blocked." },
              { text: "A work profile passcode is required." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Compare with fully managed",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create a fully managed restrictions profile",
          checkpoint: true,
          steps: [
            {
              text: "Create a second profile with platform **Android Enterprise** and profile type **Fully Managed, Dedicated, and Corporate-Owned Work Profile** > **Device restrictions**. Name it `AND-FM-Restrictions`."
            },
            {
              text: "Note the settings that exist here and not on a work profile:",
              parts: [
                {
                  kind: "table",
                  headers: ["Setting area", "Work profile", "Fully managed"],
                  rows: [
                    ["Work container restrictions", "Yes", "Not applicable — no container"],
                    ["Whole-device password policy", "No", "Yes"],
                    ["Factory reset protection", "No", "Yes"],
                    ["Block adding or removing accounts", "Work accounts only", "All accounts"],
                    ["Kiosk and single-app mode", "No", "Yes, on dedicated devices"],
                    ["System update policy", "No", "Yes"],
                    ["Block camera or screen capture device-wide", "Work profile only", "Whole device"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The difference is ownership, not capability tiers. On a personally owned device the organisation has no right to control the whole handset, so those settings do not exist rather than being hidden. That is the answer to *why can I not set a device password on a work profile device*."
                }
              ]
            },
            {
              text: "Configure a whole-device password policy and factory reset protection, assign to `GRP-DEV-ANDROID-FM`, and create the profile."
            }
          ],
          result: {
            text: "You can see which settings each Android enrollment scenario exposes.",
            verify: [
              { text: "Both profiles exist, targeting different enrollment scenarios." },
              { text: "You can name one setting available on fully managed and not on a work profile." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An Android configuration profile reports Not applicable for every targeted device.",
      rootCause:
        "The profile type does not match the enrollment scenario. A Personally-Owned Work Profile profile cannot apply to a fully managed device, and vice versa.",
      diagnostic: {
        lang: "text",
        code: "Devices > All devices > open the device > check the Management name and Ownership\nDevices > Configuration > open the profile > check the profile type"
      },
      resolution:
        "Recreate the profile under the profile-type heading matching how the devices were enrolled. Enrollment scenario cannot be changed without a factory reset, so the profile has to move rather than the devices."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You need to enforce a device unlock passcode on personally owned Android devices enrolled with a work profile. Which is true?",
      options: [
        "You can enforce a work profile passcode but not a device unlock passcode, because the device is personally owned",
        "You can enforce both by using a Fully Managed device restrictions profile",
        "You can enforce a device passcode using a compliance policy instead",
        "Device passcode settings apply once the device is marked as Corporate"
      ],
      correctIndex: 0,
      rationale:
        "A personally owned work profile confines management to the work container. The work profile challenge is configurable; the user's own device unlock code is not, because the organisation does not own the handset.",
      examTip:
        "Ownership determines the boundary. Any question asking what can be enforced on a personally owned work profile is asking where that boundary sits.",
      skills: ["g2.t2.s2"]
    }
  ]
};
