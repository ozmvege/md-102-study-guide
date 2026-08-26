export default {
  id: "enrollment-settings",
  moduleId: "m2",
  title: "Automatic enrollment, enrollment settings and Company Portal branding",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "A device that joins Microsoft Entra ID does not automatically become managed by Intune. Automatic enrollment is the setting that connects those two events, and without it you get exactly what lab 5 produced: a joined device with no management. You will turn it on, brand the enrollment experience so users can tell it is legitimate, and understand why the MDM user scope is the single most consequential toggle in this blade.",

  objectives: [
    "Configure automatic MDM enrollment for Windows and understand MDM versus MAM user scope",
    "Apply organisation branding so the sign-in and Company Portal experience is recognisable",
    "Confirm a joined device enrolls into Intune without further action",
    "Read the enrollment status of a device from both the client and the portal"
  ],

  keyConcepts: ["Automatic enrollment", "MDM user scope", "MAM user scope", "Company branding", "Company Portal", "MDM enrollment URL"],

  skills: [
    { id: "g1.t2.s1", depth: "primary" },
    { id: "g1.t2.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 Pro" }
    ],
    personas: ["alex.wilber"],
    labs: ["device-identity"]
  },

  exercises: [
    {
      id: "e1",
      title: "Enable automatic enrollment",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Configure the MDM user scope",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then on the **Windows** tab select **Automatic Enrollment**.",
              nav: ["Devices", "Enrollment", "Windows", "Automatic Enrollment"]
            },
            {
              text: "Set the scopes:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "MDM user scope", value: "All", note: "In production you would scope this to a group during a phased rollout." },
                    { label: "MAM user scope", value: "None", note: "Set deliberately. See the note below." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "These two scopes do different things and overlap badly. **MDM user scope** enrolls the whole device into management when the user joins or adds a work account. **MAM user scope** applies application management to Windows without enrolling the device. If a user is in both scopes on a personal device, Windows applies MAM and the device is *not* MDM-enrolled — which looks exactly like automatic enrollment being broken."
                }
              ]
            },
            {
              text: "Leave the three URLs at their defaults and select **Save**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The **MDM terms of use URL**, **MDM discovery URL** and **MDM compliance URL** are pre-populated for Intune. You would only change them if a third-party MDM were the authority, which is a scenario the exam occasionally uses to test whether you know these exist."
                }
              ]
            }
          ],
          result: {
            text: "Windows devices joining Microsoft Entra ID will now enroll into Intune automatically.",
            verify: [
              { text: "**MDM user scope** is set to **All**." },
              { text: "**MAM user scope** is set to **None**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Review the remaining enrollment settings",
          checkpoint: true,
          steps: [
            {
              text: "Still under **Devices** > **Enrollment**, open **Enrollment notifications** and note that you can send a branded message when a device enrolls.",
              nav: ["Devices", "Enrollment", "Enrollment notifications"]
            },
            {
              text: "Open **Device categories**. Create one so you can see how it changes the enrollment experience:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Shared workstation" },
                    { label: "Description", value: "Multi-user devices in retail locations" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "When device categories exist, users are prompted to pick one during enrollment, and the choice can drive dynamic group membership through `device.deviceCategory`. It is a cheap way to let users self-classify hardware you cannot pre-register."
                }
              ]
            }
          ],
          result: {
            text: "You know what else lives in the enrollment blade beyond the automatic enrollment toggle.",
            verify: [
              { text: "A device category exists." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Brand the experience",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Configure company branding and Company Portal",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Company branding**, then **Default sign-in experience**, then **Edit**.",
              nav: ["Company branding", "Default sign-in experience", "Edit"]
            },
            {
              text: "Set a sign-in page background colour and a banner logo. Any image will do — the point is that it is visibly yours.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Branding is a security control, not decoration. Users are being asked to hand over corporate credentials during enrollment; a generic Microsoft page is indistinguishable from a phishing page, whereas a branded one gives them something to check."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Customization**, then **Edit**.",
              nav: ["Tenant administration", "Customization", "Edit"]
            },
            {
              text: "Configure the Company Portal:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Organization name", value: "Contoso" },
                    { label: "Support contact name", value: "Contoso Service Desk" },
                    { label: "Support email address", value: "helpdesk.operator@<tenant>.onmicrosoft.com" },
                    { label: "Show in Company Portal — Privacy statement", value: "Configured", note: "Users are told what the organisation can and cannot see on their device." },
                    { label: "Device ownership notification", value: "Show" }
                  ]
                }
              ]
            },
            {
              text: "Select **Review + save**."
            }
          ],
          result: {
            text: "The sign-in page and Company Portal identify the organisation and provide a support route.",
            verify: [
              { text: "The tenant sign-in page shows your branding in a private browser window." },
              { text: "**Customization** shows your support contact details." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Prove automatic enrollment works",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Enroll the joined device",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM2-Alex** and sign in as `alex.wilber@<tenant>.onmicrosoft.com`."
            },
            {
              text: "The device joined Microsoft Entra ID in lab 5, before automatic enrollment existed. Trigger enrollment now:",
              nav: ["Settings", "Accounts", "Access work or school"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select the work account entry, then select **Info**." },
                    { text: "If a **Connect** or **Enroll only in device management** option appears, use it." },
                    { text: "Otherwise sign out and back in — automatic enrollment is evaluated at sign-in." }
                  ]
                }
              ]
            },
            {
              text: "Confirm enrollment from the client:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "dsregcmd /status"
                },
                {
                  kind: "verify",
                  text: "Under **Device State**, `AzureAdJoined : YES`. Under **Tenant Details**, an **MdmUrl** is present. An empty MdmUrl means the device is joined but unmanaged."
                }
              ]
            },
            {
              text: "Check the management registry keys, which is where enrollment actually records itself:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ChildItem \"HKLM:\\SOFTWARE\\Microsoft\\Enrollments\" |\n    ForEach-Object { Get-ItemProperty $_.PSPath } |\n    Where-Object { $_.UPN } |\n    Select-Object UPN, ProviderID, EnrollmentState |\n    Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "A row shows `ProviderID` of `MS DM Server` and `EnrollmentState` of `1`.",
                  expected: "UPN                              ProviderID   EnrollmentState\n---                              ----------   ---------------\nalex.wilber@contoso.onmicros...  MS DM Server               1"
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices** > **All devices** and confirm the device appears.",
              nav: ["Devices", "All devices"],
              parts: [
                {
                  kind: "verify",
                  text: "`MD102-VM2-Alex` is listed with **Managed by** of **Intune** and an **Ownership** of **Personal** — ownership is corrected in lab 11."
                }
              ]
            }
          ],
          result: {
            text: "A Microsoft Entra joined device is now managed by Intune without any manual enrollment step.",
            verify: [
              { text: "The device appears in **All devices** managed by Intune." },
              { text: "`dsregcmd /status` shows an **MdmUrl**." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A Microsoft Entra joined Windows device never appears in Intune.",
      rootCause:
        "Automatic enrollment is off, the user is outside the MDM user scope, or the user is in the MAM user scope — in which case Windows applies app management instead of enrolling the device.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status   # Tenant Details > MdmUrl should be populated\nGet-ChildItem \"HKLM:\\SOFTWARE\\Microsoft\\Enrollments\""
      },
      resolution:
        "Set **MDM user scope** to **All** or to a group containing the user, and set **MAM user scope** to **None** for devices you intend to fully manage. Then sign out and back in — the scope is evaluated at sign-in.",
      errorCodes: ["0x80180018"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Users report that their Microsoft Entra joined Windows devices are not enrolling into Intune, although they can sign in and access corporate resources. Automatic enrollment shows MDM user scope set to All. What should you check next?",
      options: [
        "Whether the users are also in the MAM user scope",
        "Whether the devices have a device category assigned",
        "Whether the MDM discovery URL has been customised",
        "Whether the users have a Microsoft Entra ID P2 licence"
      ],
      correctIndex: 0,
      rationale:
        "When a user falls in both the MDM and MAM user scopes, Windows applies application management rather than enrolling the device into MDM. The device stays joined and functional but never becomes managed, which matches the symptom exactly.",
      examTip:
        "MDM scope enrolls the device; MAM scope manages apps without enrolling. Overlapping them is a classic exam distractor and a real-world misconfiguration.",
      skills: ["g1.t2.s2"]
    }
  ]
};
