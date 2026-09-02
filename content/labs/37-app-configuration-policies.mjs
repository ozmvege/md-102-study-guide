export default {
  id: "app-configuration-policies",
  moduleId: "m6",
  title: "App configuration policies for managed devices and managed apps",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Deploying Outlook is not the same as configuring it. App configuration policies push settings into an application so users are not asked to type a server name or an account they should not have to know. There are two kinds, and the distinction is the whole exam bullet: managed devices, which needs enrollment, and managed apps, which does not.",

  objectives: [
    "Create an app configuration policy for managed devices",
    "Create an app configuration policy for managed apps on unenrolled devices",
    "Use configuration tokens to pre-populate account details",
    "Choose the correct policy type for a given scenario"
  ],

  keyConcepts: ["Managed devices policy", "Managed apps policy", "Configuration keys", "Configuration tokens", "OMA-URI equivalence"],

  skills: [{ id: "g4.t2.s3", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["diego.siciliani", "joni.sherman"],
    labs: ["app-protection-policies"]
  },

  exercises: [
    {
      id: "e1",
      title: "Choose the right policy type",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Compare the two types",
          steps: [
            {
              text: "Both are created under **Apps** > **App configuration policies**, and they behave very differently.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Managed devices", "Managed apps"],
                  rows: [
                    ["Device must be enrolled", "**Yes**", "**No**"],
                    ["Delivered by", "The MDM channel to the device", "The Intune App SDK inside the application"],
                    ["Targets", "Devices or users, and a specific app", "Users only"],
                    ["Settings available", "Everything the app exposes through its managed configuration schema", "The subset the app reads through the SDK"],
                    ["Works alongside", "Configuration profiles", "App protection policies"],
                    ["Typical use", "A corporate phone or fully managed device", "BYOD, where the device is not enrolled"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The names are chosen badly and the exam exploits it. **Managed devices** means the *device* is managed — enrollment required. **Managed apps** means only the *app* is managed — no enrollment. If a scenario says the device is not enrolled, only the managed apps type can possibly apply."
                }
              ]
            }
          ],
          result: {
            text: "You can pick the correct app configuration policy type from a scenario.",
            verify: [{ text: "You can state which type works on an unenrolled device." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Build both policies",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Configure Outlook on managed devices",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **App configuration policies**, then **Add** > **Managed devices**.",
              nav: ["Apps", "App configuration policies", "Add", "Managed devices"]
            },
            {
              text: "Configure the basics:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "CFG-Outlook-ManagedDevices" },
                    { label: "Platform", value: "Android Enterprise" },
                    { label: "Profile type", value: "All Profile Types" },
                    { label: "Targeted app", value: "Microsoft Outlook" }
                  ]
                }
              ]
            },
            {
              text: "On **Settings**, choose **Use configuration designer** and set:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Account setup — Email address", value: "{{mail}}" },
                    { label: "Account setup — Username", value: "{{userprincipalname}}" },
                    { label: "Allow only work or school accounts", value: "Yes" },
                    { label: "Focused inbox", value: "Enabled" },
                    { label: "Save contacts to native contacts app", value: "Disabled" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The double-brace values are **configuration tokens**, resolved per user when the policy reaches the device. `{{userprincipalname}}`, `{{mail}}`, `{{partialupn}}`, `{{deviceid}}` and `{{serialnumber}}` are the common ones. They let one policy serve every user — without them you would need a policy per person."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-FIELD` and create the policy."
            },
            {
              text: "On the Android emulator, remove and reinstall Outlook, then open it.",
              parts: [
                {
                  kind: "verify",
                  text: "Outlook opens with Diego's account already populated — he only supplies the password. The token resolved to his real address."
                }
              ]
            }
          ],
          result: {
            text: "Outlook is pre-configured on enrolled devices with per-user account details.",
            verify: [
              { text: "The account is pre-populated on first launch." },
              { text: "The policy uses configuration tokens rather than a hard-coded address." }
            ]
          }
        },
        {
          id: "t2",
          title: "Configure Edge for unenrolled devices",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **App configuration policies**, then **Add** > **Managed apps**.",
              nav: ["Apps", "App configuration policies", "Add", "Managed apps"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "CFG-Edge-ManagedApps" },
                    { label: "Public apps", value: "Microsoft Edge (Android and iOS)" }
                  ]
                }
              ]
            },
            {
              text: "On **Settings**, add key and value pairs, then work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "com.microsoft.intune.mam.managedbrowser.homepage", value: "https://intranet.contoso.com" },
                    { label: "com.microsoft.intune.mam.managedbrowser.AllowListURLs", value: "contoso.com|sharepoint.com|office.com" },
                    { label: "com.microsoft.intune.mam.managedbrowser.defaultHTTPS", value: "true" },
                    { label: "com.microsoft.intune.mam.managedbrowser.disableShare", value: "true" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `CFG-Edge-ManagedApps` and select Microsoft Edge, then select **Next**." },
                    { text: "On the **Settings** tab, enter the four configuration keys and values above, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-USR-BYOD`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "These keys are published by the application vendor. There is no picker and no validation — a mistyped key is accepted and silently ignored. Copy them from the vendor's documentation rather than typing from memory, and test the result on a device."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-BYOD` and create the policy.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This policy reaches Joni's unenrolled device because it travels inside the app through the Intune App SDK, the same channel app protection uses. That is why managed apps policies pair naturally with app protection policies and why both target user groups only."
                }
              ]
            }
          ],
          result: {
            text: "Edge is configured on devices Intune does not manage.",
            verify: [
              { text: "`CFG-Edge-ManagedApps` is assigned to a user group." },
              { text: "You can explain why it works without enrollment." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An app configuration policy for managed devices has no effect.",
      rootCause:
        "The device is not enrolled, the targeted app was installed from outside Intune, or the policy platform does not match the device's enrollment scenario.",
      diagnostic: {
        lang: "text",
        code: "Apps > App configuration policies > open the policy > Device status\nCheck whether the device is listed and what state it reports."
      },
      resolution:
        "For unenrolled devices use a **Managed apps** policy instead. For enrolled devices confirm the app was deployed through Intune — a sideloaded copy does not receive managed configuration."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Joni's personally owned device is blocked from enrollment but has app protection policies. You need to set the home page in Microsoft Edge on that device. Which policy type do you use?",
      options: [
        "An app configuration policy of type Managed apps",
        "An app configuration policy of type Managed devices",
        "A device configuration profile",
        "A settings catalog profile targeting Edge"
      ],
      correctIndex: 0,
      rationale:
        "Managed apps policies are delivered through the Intune App SDK inside the application and require no enrollment. Managed devices policies travel over the MDM channel and therefore need an enrolled device.",
      examTip:
        "Read the names literally: managed *devices* needs a managed device; managed *apps* only needs a managed app. Unenrolled always means the latter.",
      skills: ["g4.t2.s3"]
    },
    {
      id: "q2",
      question:
        "In an app configuration policy, what does the value {{userprincipalname}} do?",
      options: [
        "It is a configuration token resolved to each user's UPN when the policy is applied",
        "It is a placeholder that must be replaced before saving the policy",
        "It refers to the administrator who created the policy",
        "It is a PowerShell variable evaluated on the device"
      ],
      correctIndex: 0,
      rationale:
        "Configuration tokens are substituted per user at delivery, letting one policy serve an entire population. Common tokens include `{{mail}}`, `{{partialupn}}`, `{{deviceid}}` and `{{serialnumber}}`.",
      examTip:
        "Any question showing double-brace values in an app configuration policy is testing whether you recognise tokens. They are resolved by Intune, not by the app or by PowerShell.",
      skills: ["g4.t2.s3"]
    }
  ]
};
