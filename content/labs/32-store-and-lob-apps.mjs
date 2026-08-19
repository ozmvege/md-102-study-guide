export default {
  id: "store-and-lob-apps",
  moduleId: "m6",
  title: "Store apps, line-of-business apps and assignment intent",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Contoso needs software on devices. Before packaging anything complicated, get the fundamentals right: the four app types Intune can deliver without packaging, and the three assignment intents that decide whether an app is forced, offered or removed. Intent is where most application problems begin, because Available and Required look similar in the portal and behave nothing alike.",

  objectives: [
    "Add a Microsoft Store app and assign it as required",
    "Add a line-of-business app from an installer file",
    "Explain the difference between Required, Available and Uninstall",
    "Predict what a user sees in Company Portal for each intent",
    "Read app installation status per device and per user"
  ],

  keyConcepts: ["Microsoft Store app", "Line-of-business app", "Required", "Available for enrolled devices", "Uninstall", "Company Portal"],

  skills: [
    { id: "g4.t1.s1", depth: "primary" },
    { id: "g4.t1.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "pradeep.gupta"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy a Microsoft Store app",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Add and assign a store app",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Apps**, **All apps**, then **Add**.",
              nav: ["Apps", "All apps", "Add"]
            },
            {
              text: "Choose the app type and understand the list:",
              parts: [
                {
                  kind: "table",
                  headers: ["App type", "Source", "Packaging needed"],
                  rows: [
                    ["Microsoft Store app (new)", "The Microsoft Store, searched from within Intune", "None"],
                    ["Line-of-business app", "An `.msi`, `.appx` or `.msix` file you upload", "None"],
                    ["Windows app (Win32)", "An `.intunewin` package you build", "Yes — lab 33"],
                    ["Microsoft 365 Apps", "The Microsoft 365 Apps installer, configured in the portal", "None — lab 34"],
                    ["Web link", "A URL that appears as an icon", "None"]
                  ]
                }
              ]
            },
            {
              text: "Select **Microsoft Store app (new)**, then **Search the Microsoft Store app (new)**, and find **Windows Terminal** or another small free app."
            },
            {
              text: "Configure the app information, leaving the pre-populated values, and set:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Install behavior", value: "System", note: "System installs once for the machine. User installs per-user and requires the user to be signed in." },
                    { label: "Show this as a featured app in the Company Portal", value: "Yes" }
                  ]
                }
              ]
            },
            {
              text: "On **Assignments**, add the app under **Required** for `GRP-DEV-WIN-CORP`, then create it.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Note which group type each intent accepts. **Required** and **Uninstall** work with device groups and user groups. **Available for enrolled devices** only works with **user** groups — an app cannot be *offered* to a device, because only a person can choose to install something."
                }
              ]
            }
          ],
          result: {
            text: "A store app is deployed as required to corporate Windows devices.",
            verify: [
              { text: "The app appears in **All apps** with a Required assignment." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify installation and read the report",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, sync policy and wait. Required apps install without user action.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-AppxPackage -AllUsers | Where-Object Name -like \"*Terminal*\" |\n    Select-Object Name, Version, Status"
                }
              ]
            },
            {
              text: "In the portal, open the app and select **Device install status**, then **User install status**.",
              nav: ["Apps", "All apps", "Device install status"],
              parts: [
                {
                  kind: "verify",
                  text: "The device shows **Installed**. If it shows **Pending** the device has not checked in yet; if it shows **Failed** open the row for the error code."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Device install status** and **User install status** answer different questions. A system-context app appears under device status; a user-context app appears under user status. An app that looks like it has deployed nowhere is often reporting under the view you are not looking at."
                }
              ]
            }
          ],
          result: {
            text: "The app installed and you can read its status.",
            verify: [
              { text: "The app is present on the device." },
              { text: "**Device install status** reports Installed." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Line-of-business apps and assignment intent",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Add a line-of-business app",
          checkpoint: true,
          steps: [
            {
              text: "Obtain a small `.msi` installer. Any free MSI works — the 7-Zip MSI is a common choice.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The line-of-business app type accepts a single `.msi`, `.appx` or `.msix` and nothing else. If your software is an `.exe`, or needs a transform, a switch or more than one file, it must be packaged as a Win32 app instead — which is lab 33."
                }
              ]
            },
            {
              text: "Select **Apps** > **All apps** > **Add** > **Line-of-business app**, upload the MSI, and complete the app information."
            },
            {
              text: "On **Assignments**, use **Available for enrolled devices** and select `GRP-USR-PILOT`.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the difference to internalise. **Required** installs the app whether the user wants it or not. **Available** publishes it to Company Portal for the user to install if they choose. Assigning something as Available and then wondering why it did not install is one of the most common support tickets an endpoint administrator receives."
                }
              ]
            },
            {
              text: "Create the app."
            }
          ],
          result: {
            text: "A line-of-business app is published for self-service installation.",
            verify: [
              { text: "The app has an **Available for enrolled devices** assignment to a user group." }
            ]
          }
        },
        {
          id: "t2",
          title: "Compare the three intents from the user's side",
          checkpoint: true,
          steps: [
            {
              text: "Study the intents before testing them:",
              parts: [
                {
                  kind: "table",
                  headers: ["Intent", "Group types", "Behaviour", "Visible in Company Portal"],
                  rows: [
                    ["Required", "User or device", "Installs automatically, and reinstalls if removed", "Yes, shown as installed"],
                    ["Available for enrolled devices", "**User only**", "Offered; the user chooses", "Yes, with an Install button"],
                    ["Uninstall", "User or device", "Removes the app if present", "No"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "**Uninstall** beats **Required**. If a user is in one group that requires an app and another that uninstalls it, the app is removed. That makes an uninstall assignment an effective way to claw back software, and an effective way to accidentally strip an application from people who need it."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, open **Company Portal** and sign in as Adele.",
              parts: [
                {
                  kind: "verify",
                  text: "The store app appears as already installed. The line-of-business app appears with an **Install** button, because Adele is in the pilot group and the intent is Available."
                }
              ]
            },
            {
              text: "Install it from Company Portal and confirm it appears in the portal's device install status."
            },
            {
              text: "Now test the uninstall intent. Edit the line-of-business app's assignments, remove the Available assignment, and add an **Uninstall** assignment for `GRP-USR-PILOT`.",
              parts: [
                {
                  kind: "verify",
                  text: "After the next sync the application is removed from the device. Confirm with `Get-Package` or by looking in Installed apps."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Removing an assignment does **not** uninstall an app — it just stops managing it. To actually remove software you must assign the Uninstall intent. That distinction appears on the exam and surprises people in production."
                }
              ]
            }
          ],
          result: {
            text: "You have driven all three intents and seen what each does on a real device.",
            verify: [
              { text: "A required app installed with no user action." },
              { text: "An available app appeared in Company Portal and installed on request." },
              { text: "An uninstall assignment removed the app." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An application assigned to a group never installs and reports no error.",
      rootCause:
        "The intent is **Available** rather than **Required**, so the app is waiting for the user to install it from Company Portal. Alternatively, an Available assignment was made to a device group, which is not supported and silently reaches nobody.",
      diagnostic: {
        lang: "text",
        code: "Apps > All apps > open the app > Properties > Assignments\nCheck the intent and whether the group is a user group or a device group."
      },
      resolution:
        "Change the intent to **Required** for automatic installation, or confirm that Available assignments target user groups only."
    }
  ],

  quiz: [
    {
      question:
        "A user is in a group with an application assigned as Required and another group with the same application assigned as Uninstall. What happens on their device?",
      options: [
        "The application is uninstalled — Uninstall takes precedence over Required",
        "The application is installed — Required takes precedence",
        "The assignment is reported as a conflict and nothing happens",
        "The most recently created assignment wins"
      ],
      correctIndex: 0,
      rationale:
        "Uninstall has the highest precedence of the assignment intents. This makes it a reliable way to remove software, and a common cause of applications disappearing from users who are unexpectedly members of a broader group.",
      examTip:
        "Precedence order: Uninstall beats Required, and Required beats Available. Also remember that simply removing an assignment does not uninstall anything.",
      skills: ["g4.t1.s2"]
    },
    {
      question:
        "You want to publish an optional application that users can install themselves from Company Portal. Which assignment must you use, and to what kind of group?",
      options: [
        "Available for enrolled devices, assigned to a user group",
        "Available for enrolled devices, assigned to a device group",
        "Required, assigned to a user group",
        "Required, assigned to a device group"
      ],
      correctIndex: 0,
      rationale:
        "Available publishes the app for self-service and is supported only for user groups, because a device cannot choose to install something. Required installs without user interaction.",
      examTip:
        "Available is user-groups-only. Required and Uninstall accept both user and device groups.",
      skills: ["g4.t1.s1"]
    }
  ]
};
