export default {
  id: "mobile-apps-and-quiet-time",
  moduleId: "m6",
  title: "Mobile app stores and Quiet Time policies",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Diego's phone needs Outlook and the Contoso field app. Android apps come from Managed Google Play, which is already connected; Apple apps come from the App Store or through the Volume Purchase Program, which needs an Apple Business Manager account you do not have. While you are here, Quiet Time policies stop Outlook notifying field engineers at three in the morning — a small feature with its own exam bullet.",

  objectives: [
    "Deploy an application from Managed Google Play",
    "Describe Apple Volume Purchase Program token management",
    "Configure a Quiet Time policy for Outlook",
    "Explain the difference between device-based and user-based VPP licensing"
  ],

  keyConcepts: ["Managed Google Play", "Volume Purchase Program", "VPP token", "Device-based licensing", "Quiet Time policy"],

  skills: [
    { id: "g4.t1.s3", depth: "primary" },
    { id: "g4.t1.s8", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["diego.siciliani", "miriam.graham"],
    labs: ["android-enterprise", "store-and-lob-apps"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy from Managed Google Play",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Approve and assign an Android app",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **All apps**, **Add**, then app type **Managed Google Play app**.",
              nav: ["Apps", "All apps", "Add"]
            },
            {
              text: "The Managed Google Play storefront opens inside Intune, using the binding from lab 13. Search for **Microsoft Outlook** and select **Approve**.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Approval settings", value: "Keep approved when app requests new permissions", note: "The alternative revokes approval when permissions change, which silently stops updates until someone re-approves." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Choosing **Revoke app approval when this app requests new permissions** means an application update requesting a new permission stops deploying until an administrator notices and re-approves. It is more cautious and it is how estates end up months behind on app updates. Pick deliberately."
                }
              ]
            },
            {
              text: "Select **Sync** to bring approved apps into Intune, then find Outlook under **All apps**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Approving in the storefront does not deploy anything. The app then has to be assigned in Intune like any other. Synchronisation between Google and Intune can take several minutes."
                }
              ]
            },
            {
              text: "Assign it as **Required** to `GRP-USR-FIELD`, then confirm on the emulator.",
              parts: [
                {
                  kind: "verify",
                  text: "Outlook appears in the work profile with the briefcase badge, installed automatically without Diego doing anything."
                }
              ]
            }
          ],
          result: {
            text: "An application is deployed to the work profile from Managed Google Play.",
            verify: [
              { text: "Outlook is installed inside the Android work profile." },
              { text: "The app reports **Installed** in **Device install status**." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Apple VPP and Quiet Time",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Understand Volume Purchase Program licensing",
          steps: [
            {
              text: "Apple applications are bought in Apple Business Manager and delivered through a VPP token uploaded to Intune. You have no Apple Business Manager account, so this is reference — but the licensing model is examined.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Device licensing", "User licensing"],
                  rows: [
                    ["Licence assigned to", "The device", "The user's Apple Account"],
                    ["User needs an Apple Account", "**No**", "Yes"],
                    ["User must accept an invitation", "No", "Yes"],
                    ["Works on shared or kiosk devices", "**Yes**", "No"],
                    ["Licence reclaimed when", "The device is retired", "The user is unassigned"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Device licensing** is the answer for shared, kiosk or unattended Apple hardware, because it needs no Apple Account and no user acceptance. User licensing follows a person across their devices. A scenario describing shared iPads in a store is asking for device licensing."
                }
              ]
            },
            {
              text: "Note the token lifecycle, which repeats the pattern from lab 14:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "A VPP token expires **annually** and is tied to the Apple ID that created it. That is now the third annually expiring Apple artefact alongside the MDM push certificate and the enrollment program token. Mature Apple estates track all three on one calendar, and the exam expects you to know they all expire."
                }
              ]
            }
          ],
          result: {
            text: "You can choose a VPP licensing mode and name the token lifecycle.",
            verify: [
              { text: "You can name the licensing mode suited to shared devices." },
              { text: "You can list the three Apple artefacts that expire annually." }
            ]
          }
        },
        {
          id: "t2",
          title: "Configure a Quiet Time policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, then **Quiet time**, then **Policies**, then **Create policy** > **Set Quiet Time**.",
              nav: ["Apps", "Quiet time", "Policies", "Create policy"]
            },
            {
              text: "Configure a schedule that suppresses Outlook notifications outside working hours:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "QT-Field-OutOfHours" },
                    { label: "Setting type", value: "Daily", note: "Daily sets a nightly window. Weekend sets whole days off." },
                    { label: "Quiet time start", value: "19:00" },
                    { label: "Quiet time end", value: "07:00" },
                    { label: "Allow user to change setting", value: "No" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Quiet Time suppresses **Outlook mobile notifications** on iOS and Android. It does not stop mail arriving, does not affect other applications, and is not a security control — it exists for right-to-disconnect obligations and for not waking people up. Knowing what it does not do is the examinable part."
                }
              ]
            },
            {
              text: "Assign the policy to `GRP-USR-FIELD` and create it.",
              parts: [
                {
                  kind: "verify",
                  text: "The policy appears under **Quiet time** > **Policies** with its assignment. Diego's Outlook will stop notifying between 19:00 and 07:00."
                }
              ]
            }
          ],
          result: {
            text: "Field engineers stop receiving Outlook notifications overnight.",
            verify: [
              { text: "`QT-Field-OutOfHours` is assigned to a user group." },
              { text: "You can state which application Quiet Time affects." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An approved Managed Google Play application does not appear in Intune.",
      rootCause: "Approval happens in the Google storefront, and Intune only sees it after a synchronisation, which is not instant.",
      diagnostic: {
        lang: "text",
        code: "Apps > All apps > Add > Managed Google Play app > Sync\nDevices > Enrollment > Android > Managed Google Play — confirm the binding is healthy."
      },
      resolution:
        "Trigger a manual sync and wait several minutes. If the app still does not appear, confirm the Managed Google Play binding is still connected — an unbound tenant shows an empty storefront rather than an error."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso deploys shared iPads in retail stores. Users do not have individual Apple Accounts. Which VPP licensing mode should be used?",
      options: [
        "Device licensing",
        "User licensing",
        "Either, since both work without an Apple Account",
        "Neither — shared devices cannot use VPP applications"
      ],
      correctIndex: 0,
      rationale:
        "Device licensing assigns the licence to the hardware, requiring no Apple Account and no invitation acceptance. User licensing requires each user to have an Apple Account and accept an invitation, which shared-device users do not have.",
      examTip:
        "Shared, kiosk or unattended Apple hardware always means device licensing. A named user across several devices means user licensing.",
      skills: ["g4.t1.s8"]
    },
    {
      id: "q2",
      question:
        "What does a Quiet Time policy control?",
      options: [
        "Outlook mobile notifications on iOS and Android during a configured schedule",
        "All notifications from all managed applications",
        "Whether applications may sync data outside working hours",
        "Device screen time limits for managed devices"
      ],
      correctIndex: 0,
      rationale:
        "Quiet Time suppresses Outlook mobile notifications on a schedule. Mail still arrives and other applications are unaffected — it is a working-hours feature, not a data or security control.",
      examTip:
        "The scope is deliberately narrow: Outlook mobile, notifications only. Any answer implying it blocks sync or affects other apps is wrong.",
      skills: ["g4.t1.s3"]
    }
  ]
};
