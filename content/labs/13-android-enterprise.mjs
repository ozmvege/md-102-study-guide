export default {
  id: "android-enterprise",
  moduleId: "m2",
  title: "Android Enterprise: work profile, fully managed and dedicated",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 60,

  scenario:
    "Android is the platform where enrollment choices matter most, because the enrollment method determines what you can manage for the life of the device and cannot be changed afterwards. Contoso needs a work profile on a field engineer's personal phone, and a locked-down kiosk on shop-floor hardware. You will connect Intune to Managed Google Play, build enrollment profiles for each scenario, and enrol the emulator into a work profile.",

  objectives: [
    "Connect Intune to Managed Google Play",
    "Distinguish the four Android Enterprise enrollment scenarios and their management scope",
    "Create enrollment profiles for corporate-owned devices",
    "Enrol the Android emulator with a personally owned work profile",
    "Verify the work and personal boundary from the device"
  ],

  keyConcepts: ["Managed Google Play", "Work profile", "Fully managed", "Dedicated device", "Corporate-owned work profile", "Enrollment token"],

  skills: [{ id: "g1.t2.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android", os: "Android 14 with Google Play" }
    ],
    personas: ["diego.siciliani", "lee.gu"],
    labs: ["enrollment-restrictions"]
  },

  exercises: [
    {
      id: "e1",
      title: "Connect Managed Google Play",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Bind the tenant to Managed Google Play",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then the **Android** tab, then **Managed Google Play**.",
              nav: ["Devices", "Enrollment", "Android", "Managed Google Play"]
            },
            {
              text: "Tick **I agree** to grant Microsoft permission to send user and device information to Google, then select **Launch Google to connect now**."
            },
            {
              text: "Sign in with a Google account and complete the binding.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Use a Google account created for this purpose, not a personal Gmail you care about, and **not** an account already tied to another Managed Google Play binding. One Google account binds to one Intune tenant, permanently — unbinding requires Google support involvement and there is no self-service undo."
                }
              ]
            },
            {
              text: "Enter an organisation name when Google asks, confirm, and return to Intune.",
              parts: [
                {
                  kind: "verify",
                  text: "The **Managed Google Play** page shows the binding as connected, with the Google account and organisation name displayed. No Android enrollment of any kind works until this is done."
                }
              ]
            }
          ],
          result: {
            text: "The tenant is bound to Managed Google Play.",
            verify: [
              { text: "The connection status shows the bound organisation." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Understand the four scenarios",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Compare enrollment scenarios",
          steps: [
            {
              text: "The choice is made once, at enrollment, and cannot be changed without a factory reset.",
              parts: [
                {
                  kind: "table",
                  headers: ["Scenario", "Ownership", "What is managed", "Typical use"],
                  rows: [
                    ["Personally owned work profile", "Personal", "Only the work profile container; personal apps and data are invisible to IT", "BYOD"],
                    ["Corporate-owned work profile", "Corporate", "Whole device, but personal use is permitted in a separate profile", "Company phone with allowed personal use"],
                    ["Fully managed", "Corporate", "Entire device, single profile, no personal container", "Company phone, work only"],
                    ["Dedicated device", "Corporate", "Entire device, locked to selected apps, usually no user affinity", "Kiosk, shop floor, scanner"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "On a personally owned work profile the organisation cannot see personal apps, cannot read personal data, and cannot wipe the whole device — only the work profile. That limitation is the feature: it is what makes users willing to enrol a phone they paid for, and it is a frequent exam question phrased as *what can the administrator see*."
                }
              ]
            }
          ],
          result: {
            text: "You can pick an Android enrollment scenario from an ownership and management requirement.",
            verify: [{ text: "You can state what an administrator cannot do on a personally owned work profile." }]
          }
        },
        {
          id: "t2",
          title: "Create corporate-owned enrollment profiles",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Enrollment**, **Android**, then **Corporate-owned dedicated devices**.",
              nav: ["Devices", "Enrollment", "Android", "Corporate-owned dedicated devices"]
            },
            {
              text: "Select **Create profile** and configure through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "AND-Dedicated-Kiosk" },
                    { label: "Token type", value: "Corporate-owned dedicated device" },
                    { label: "Token expiration date", value: "A date within 90 days" },
                    { label: "Wi-Fi", value: "Not configured" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `AND-Dedicated-Kiosk` and an optional description, then select **Next**." },
                    { text: "On the **Settings** tab, configure the **Token type**, **Token expiration date**, and set Wi-Fi to **Not configured**, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                }
              ]
            },
            {
              text: "Once created, open the profile and select **Token** to view the enrollment token, QR code and enrollment URL:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "A dedicated device is enrolled by factory-resetting it and tapping the welcome screen six times to open the QR reader, then scanning this code. There is no user sign-in, which is why these devices normally have no user affinity and can only receive device-targeted policy."
                }
              ]
            },
            {
              text: "Repeat under **Corporate-owned, fully managed user devices** to create a profile named `AND-FullyManaged`.",
              nav: ["Devices", "Enrollment", "Android", "Corporate-owned, fully managed user devices"]
            }
          ],
          result: {
            text: "Enrollment profiles and tokens exist for dedicated and fully managed devices.",
            verify: [
              { text: "`AND-Dedicated-Kiosk` shows a token and a QR code." },
              { text: "Fully managed enrollment is enabled." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Enrol the emulator into a work profile",
      estimatedMinutes: 40,
      tasks: [
        {
          id: "t1",
          title: "Enable personally owned work profile enrollment",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Enrollment**, **Android**, then **Personally-owned devices with work profile**.",
              nav: ["Devices", "Enrollment", "Android", "Personally-owned devices with work profile"]
            },
            {
              text: "Confirm the setting **Use default Play Store app version for enrollment** and that the enrollment type is enabled."
            },
            {
              text: "Check your enrollment restrictions do not block Android. From lab 11, restrictions are assigned to Finance, IT and BYOD groups — Diego is in `GRP-USR-FIELD`, so only the built-in **All Users** restriction applies to him, which allows everything.",
              parts: [
                {
                  kind: "verify",
                  text: "Under **Device platform restrictions**, no restriction assigned to Diego blocks Android work profile enrollment."
                }
              ]
            }
          ],
          result: {
            text: "Personally owned work profile enrollment is permitted for the field group.",
            verify: [{ text: "Android work profile enrollment is enabled in the tenant." }]
          }
        },
        {
          id: "t2",
          title: "Enrol from the Android emulator",
          checkpoint: true,
          steps: [
            {
              text: "Start the `MD102-Android` emulator from Android Studio's **Device Manager**."
            },
            {
              text: "Open the **Play Store**, sign in with a Google account, then search for and install **Intune Company Portal**.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "If the Play Store is absent, the emulator was created from a **Google APIs** image rather than a **Google Play** image. There is no fix — delete the virtual device and recreate it as described in lab 2. Work profile provisioning cannot happen without the Play Store."
                }
              ]
            },
            {
              text: "Open **Company Portal** and sign in as `diego.siciliani@<tenant>.onmicrosoft.com`."
            },
            {
              text: "Work through the enrollment flow:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Tap **Begin**, then read the list of what the organisation can and cannot see." },
                    { text: "Tap **Continue**, then **Accept and continue** to create the work profile." },
                    { text: "Wait while Android provisions the work profile. This takes several minutes on an emulator." },
                    { text: "When prompted, tap **Continue** to finish setup." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Read the privacy screen properly rather than tapping past it. It lists exactly what an administrator can and cannot see, and that list is examinable — the organisation sees work app inventory, device model and serial, but not personal apps, call history, browsing or photos."
                }
              ]
            },
            {
              text: "Once complete, look at the app drawer.",
              parts: [
                {
                  kind: "verify",
                  text: "Applications appear in two sections, with work applications marked by a blue briefcase badge. A second, badged copy of Company Portal exists inside the work profile."
                }
              ]
            }
          ],
          result: {
            text: "The emulator is enrolled with a personally owned work profile and the boundary is visible on the device.",
            verify: [
              { text: "The app drawer separates personal and work applications." },
              { text: "The device appears in **All devices** with ownership **Personal**." }
            ]
          }
        },
        {
          id: "t3",
          title: "Confirm the boundary from the portal",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, open the device under **Devices** > **All devices**.",
              nav: ["Devices", "All devices"]
            },
            {
              text: "Check what Intune reports:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Ownership", value: "Personal" },
                    { label: "Management name", value: "Android work profile device" },
                    { label: "Primary user", value: "Diego Siciliani" }
                  ]
                }
              ]
            },
            {
              text: "Select **Discovered apps**.",
              parts: [
                {
                  kind: "verify",
                  text: "Only applications inside the work profile are listed. Personal applications installed on the emulator do not appear — this is the privacy boundary working, not a reporting delay."
                }
              ]
            },
            {
              text: "Look at the available remote actions on the device.",
              parts: [
                {
                  kind: "verify",
                  text: "**Retire** is available; a full **Wipe** is not offered for a personally owned work profile. Retiring removes the work profile and leaves the personal side untouched."
                }
              ]
            }
          ],
          result: {
            text: "The privacy boundary is demonstrable from both the device and the portal.",
            verify: [
              { text: "Discovered apps lists work applications only." },
              { text: "You can explain why full wipe is unavailable for this device." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Company Portal reports that the device cannot be enrolled, or work profile provisioning stalls.",
      rootCause:
        "The emulator image lacks Google Play, the Managed Google Play binding is missing, or an enrollment restriction blocks Android personally owned devices.",
      diagnostic: {
        lang: "text",
        code: "Intune admin center > Devices > Enrollment > Android > Managed Google Play (check binding)\nDevices > Enrollment > Device platform restrictions (check which applies to the user)"
      },
      resolution:
        "Confirm the Managed Google Play binding first — nothing Android works without it. Then confirm the platform restriction applying to that user permits Android personally owned devices. If the Play Store is missing from the emulator, recreate the virtual device from a Google Play image.",
      errorCodes: ["0x80180014"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A field engineer enrolls their personal Android phone with a work profile. Which action can the Intune administrator perform?",
      options: [
        "Retire the device, removing the work profile and leaving personal data intact",
        "Perform a full factory wipe of the entire device",
        "View the list of personal applications installed outside the work profile",
        "Read the device's call history and messages"
      ],
      correctIndex: 0,
      rationale:
        "On a personally owned work profile, management is confined to the work container. Retire removes the work profile only. Full wipe, personal app inventory and personal data are all outside the administrator's reach by design.",
      examTip:
        "Personally owned work profile questions almost always test the limits of administrative visibility. The safe answer is that anything personal is invisible and only the work container can be removed.",
      skills: ["g1.t2.s4"]
    },
    {
      id: "q2",
      question:
        "Contoso is deploying shop-floor scanners that must run one application, have no user sign-in, and be locked down. Which Android Enterprise scenario applies?",
      options: [
        "Corporate-owned dedicated device",
        "Corporate-owned fully managed device",
        "Corporate-owned work profile",
        "Personally owned work profile"
      ],
      correctIndex: 0,
      rationale:
        "Dedicated devices are for unattended, single-purpose hardware with no user affinity, enrolled with a token or QR code and typically locked to a small set of applications. Fully managed still assumes a signed-in user.",
      examTip:
        "The phrases *no user sign-in*, *kiosk* and *single purpose* point at dedicated. A named user with a company phone points at fully managed.",
      skills: ["g1.t2.s4"]
    }
  ]
};
