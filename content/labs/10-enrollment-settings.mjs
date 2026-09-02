export default {
  id: "enrollment-settings",
  moduleId: "m2",
  title: "Automatic enrollment, enrollment settings and Company Portal branding",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "A device that joins Microsoft Entra ID does not automatically become managed by Intune. Automatic enrollment is the setting that connects those two events, and without it you get exactly what lab 5 produced: a joined device with no management. You will turn it on, brand the enrollment experience so users can tell it is legitimate, and understand why the MDM user scope is the single most consequential toggle in this blade — and why it takes a Global Administrator to move it.",

  objectives: [
    "Configure automatic MDM enrollment for Windows and understand the MDM user scope against the WIP (formerly MAM) user scope",
    "Apply organisation branding so the sign-in and Company Portal experience is recognisable",
    "Confirm a joined device enrolls into Intune without further action",
    "Read the enrollment status of a device from both the client and the portal"
  ],

  keyConcepts: ["Automatic enrollment", "MDM user scope", "WIP user scope", "Mobility (MDM and MAM)", "Company branding", "Company Portal", "MDM enrollment URL"],

  skills: [
    { id: "g1.t2.s1", depth: "primary" },
    { id: "g1.t2.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Global Administrator", "Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 Pro" }
    ],
    personas: ["alex.wilber", "helpdesk.operator"],
    labs: ["device-identity", "intune-rbac"]
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
              text: "Sign in to the **Microsoft Intune admin center** as the **Global Administrator** for your trial tenant — the signup account you first used in lab 0. This one page needs it.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Automatic enrollment is shown inside Intune but is not an Intune setting. The page writes the **Mobility (MDM and MAM)** application configuration in Microsoft Entra ID, and only **Global Administrator** may change that — **Intune Administrator** is not enough. Signed in as `admin-intune` you can open this blade and read every field, and **Save** fails or the controls are greyed out. It looks like a bug and it is a permission."
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Use the tenant's own Global Administrator, **not** `admin-breakglass`. The emergency account is not a spare Global Administrator to reach for whenever a page needs one — lab 4 gives it a passphrase stored outside the tenant precisely so that using it is inconvenient, and makes its sign-ins discoverable so that one appearing means something. Spend it on a settings page and every future sign-in is noise you have trained yourself to ignore. Break-glass is for when normal administrative access has failed, which is not the case here."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This is a deliberate exception to the rule from lab 4 that you work as `admin-intune`, and it is the only task in this lab that needs one. Sign back in as `admin-intune` as soon as the page is saved."
                }
              ]
            },
            {
              text: "Select **Devices**, then **Enrollment**, then on the **Windows** tab select **Automatic Enrollment**.",
              nav: ["Devices", "Enrollment", "Windows", "Automatic Enrollment"]
            },
            {
              text: "Set the scopes. The blade holds two, one above the MDM URLs and one below them:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "MDM user scope", value: "All", note: "The first setting on the page. In production you would scope this to a group during a phased rollout." },
                    { label: "Windows Information Protection (WIP) user scope", value: "None", note: "Further down, under the MDM URLs. This is the setting older documentation and exam material call the MAM user scope — the portal renamed it and there is no field labelled MAM here any more. Leave it at None." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "These two scopes do different things and overlap badly. **MDM user scope** enrolls the whole device into management when the user joins or adds a work account. The **WIP user scope** — the MAM user scope under its old name — applies application management to Windows without enrolling the device. If a user is in both scopes on a personal device, Windows applies app management and the device is *not* MDM-enrolled, which looks exactly like automatic enrollment being broken."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The blade shows an information banner reading that creating new WIP without enrollment policies is no longer supported, and Windows Information Protection is deprecated. The scope setting is still there and still capable of intercepting your enrollments, which is the only reason this lab makes you look at it. Answer **MAM user scope** if the exam asks — the concept did not change with the label."
                }
              ]
            },
            {
              text: "Leave everything between the two scopes alone — the three MDM URLs and the **Disable MDM enrollment when adding work or school account on Windows** toggle — then select **Save**.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Disable MDM enrollment when adding work or school account on Windows", value: "No", note: "The default. Set it to Yes and you block the automatic enrollment you have just turned on." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The **MDM terms of use URL**, **MDM discovery URL** and **MDM compliance URL** are pre-populated for Intune, and **Restore default MDM URLs** puts them back if you edit one by accident. You would only change them if a third-party MDM were the authority, which is a scenario the exam occasionally uses to test whether you know these exist. The WIP URLs below them are in the same position for app management and stay untouched."
                }
              ]
            }
          ],
          result: {
            text: "Windows devices joining Microsoft Entra ID will now enroll into Intune automatically.",
            verify: [
              { text: "**MDM user scope** is set to **All**." },
              { text: "**Windows Information Protection (WIP) user scope** — the MAM user scope — is set to **None**." },
              { text: "**Save** succeeded rather than erroring, which confirms you were signed in as a Global Administrator — and that you did not need `admin-breakglass` to do it." }
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
              text: "Leave the enrollment blade for the last part of this task. In the **Devices** menu, expand **Manage devices**, select **Device categories**, then select **Create**.",
              nav: ["Devices", "Manage devices", "Device categories", "Create"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Device categories are not inside **Devices** > **Enrollment**, so no amount of looking around **Enrollment notifications** or the platform tabs will turn them up. They used to live under *Device enrollment*, which is where older documentation and a good deal of exam material still puts them, and the portal has since moved them into **Manage devices** with the other device-wide lists. Only the location changed."
                }
              ]
            },
            {
              text: "Fill in *Basics*, then select **Next**, leave the scope tags at **Default**, select **Next** again and select **Create**:",
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
                  text: "The name is the value the rest of the tenant keys off, so it is worth settling now. A dynamic group rule of `device.deviceCategory -eq \"Shared workstation\"` and an assignment filter on the same property both match the literal string, and renaming the category later silently breaks every rule that quoted the old name."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Where the user is asked for a category depends on the platform, and Windows is the awkward one. On iOS/iPadOS, macOS and Android the prompt appears in the Company Portal app; Windows users are never prompted during enrollment and choose at `portal.manage.microsoft.com` under **My devices**. Do not expect `MD102-VM2-Alex` to ask for one when it enrolls in exercise 3 — an administrator sets the category on **Devices** > **All devices** > the device > **Properties** instead. The **Customization** profile from the next exercise is also where that prompt can be suppressed entirely."
                }
              ]
            }
          ],
          result: {
            text: "You know what else lives in the enrollment blade beyond the automatic enrollment toggle, and where one setting people go looking for there actually lives.",
            verify: [
              { text: "**Devices** > **Manage devices** > **Device categories** lists **Shared workstation**." }
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
            },
            {
              text: "Lab 7 left one check unfinished for want of a device. Finish it now: open a private window, sign in as `helpdesk.operator@<tenant>.onmicrosoft.com`, then open **Devices** > **All devices** and select `MD102-VM2-Alex`.",
              nav: ["Devices", "All devices"],
              parts: [
                {
                  kind: "verify",
                  text: "The operator sees the device, and remote actions such as **Sync**, **Restart** and **Retire** are offered. That completes the Help Desk Operator proof from lab 7: read widely, act where the role allows, author nothing."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The same blade that was legitimately empty in lab 7 now has a row in it, and not one permission changed in between. Worth remembering the next time an operator reports they cannot see a device: the role is only one of the two things that has to be true."
                }
              ]
            }
          ],
          result: {
            text: "A Microsoft Entra joined device is now managed by Intune without any manual enrollment step.",
            verify: [
              { text: "The device appears in **All devices** managed by Intune." },
              { text: "`dsregcmd /status` shows an **MdmUrl**." },
              { text: "`helpdesk.operator` can run remote actions on the device, closing the lab 7 check." }
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
        "Automatic enrollment is off, the user is outside the MDM user scope, or the user is inside the WIP (MAM) user scope — in which case Windows applies app management instead of enrolling the device. A fourth possibility is that the change was never saved: only a Global Administrator can write this page, and an Intune Administrator's Save does not take.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status   # Tenant Details > MdmUrl should be populated\nGet-ChildItem \"HKLM:\\SOFTWARE\\Microsoft\\Enrollments\""
      },
      resolution:
        "Signed in as a Global Administrator, set **MDM user scope** to **All** or to a group containing the user, and set the **Windows Information Protection (WIP) user scope** to **None** for devices you intend to fully manage. Save, then have the user sign out and back in — the scope is evaluated at sign-in.",
      errorCodes: ["0x80180018"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Users report that their Microsoft Entra joined Windows devices are not enrolling into Intune, although they can sign in and access corporate resources. Automatic enrollment shows MDM user scope set to All. What should you check next?",
      options: [
        "Whether the users are also in the WIP (MAM) user scope",
        "Whether the devices have a device category assigned",
        "Whether the MDM discovery URL has been customised",
        "Whether the users have a Microsoft Entra ID P2 licence"
      ],
      correctIndex: 0,
      rationale:
        "When a user falls in both the MDM and the WIP user scopes, Windows applies application management rather than enrolling the device into MDM. The device stays joined and functional but never becomes managed, which matches the symptom exactly. The portal labels that second scope **Windows Information Protection (WIP) user scope**; documentation and exam questions still call it the MAM user scope.",
      examTip:
        "MDM scope enrolls the device; MAM scope manages apps without enrolling. Overlapping them is a classic exam distractor and a real-world misconfiguration.",
      skills: ["g1.t2.s2"]
    }
  ]
};
