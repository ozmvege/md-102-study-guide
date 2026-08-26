export default {
  id: "windows-enrollment-paths",
  moduleId: "m2",
  title: "Every Windows enrollment path",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 50,

  scenario:
    "There is more than one way to get a Windows device under management, and the exam expects you to pick the right one from a scenario rather than reciting the one you happen to use. You will join a device during the out-of-box experience, build a bulk provisioning package for devices that arrive pre-imaged, and understand where Group Policy enrollment fits for an existing domain estate.",

  objectives: [
    "Join a device to Microsoft Entra ID during the out-of-box experience",
    "Create a bulk enrollment provisioning package with Windows Configuration Designer",
    "Describe Group Policy based automatic enrollment for hybrid joined devices",
    "Choose the correct enrollment path for a given scenario"
  ],

  keyConcepts: ["Out-of-box experience", "Provisioning package", "Windows Configuration Designer", "Bulk enrollment", "Group Policy enrollment"],

  skills: [
    { id: "g1.t1.s2", depth: "primary" },
    { id: "g1.t2.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "vm", id: "vm1-adele", os: "Windows 11 Pro" },
      { kind: "host", id: "Windows Configuration Designer" }
    ],
    personas: ["adele.vance"],
    labs: ["enrollment-restrictions"]
  },

  exercises: [
    {
      id: "e1",
      title: "Choose the path",
      estimatedMinutes: 8,
      tasks: [
        {
          id: "t1",
          title: "Match scenario to enrollment method",
          steps: [
            {
              text: "Read the table. The exam presents these as scenarios and expects one answer.",
              parts: [
                {
                  kind: "table",
                  headers: ["Scenario", "Method", "Result"],
                  rows: [
                    ["New device, out of the box, user present", "Entra join at the out-of-box experience", "Entra joined, auto-enrolled"],
                    ["New device, out of the box, zero touch wanted", "Windows Autopilot", "Entra joined, auto-enrolled, configured before first sign-in"],
                    ["Devices already imaged, no per-device user", "Bulk enrollment provisioning package", "Entra joined, enrolled with a device enrollment token"],
                    ["User's own device, corporate data only", "Add work or school account", "Entra registered"],
                    ["Existing domain-joined estate", "Group Policy automatic enrollment", "Hybrid Entra joined, auto-enrolled"],
                    ["Device already Entra joined but unmanaged", "Enroll only in device management", "Enrolled without changing join state"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Bulk enrollment uses a **device enrollment token** rather than a user's credentials, so the resulting device has no primary user. That makes it right for shared and kiosk hardware and wrong for anything where per-user targeting matters — user-targeted policies never reach a device with no user."
                }
              ]
            }
          ],
          result: {
            text: "You can pick an enrollment method from a requirement.",
            verify: [{ text: "You can name the method that produces a device with no primary user." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Join during the out-of-box experience",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Reset VM1 and join it as Adele",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, remove the registration from lab 5 so you start clean.",
              nav: ["Settings", "Accounts", "Access work or school"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select Joni's work account entry and select **Disconnect**." },
                    { text: "Confirm, then restart the machine." }
                  ]
                }
              ]
            },
            {
              text: "Reset the device so it returns to the out-of-box experience.",
              nav: ["Settings", "System", "Recovery", "Reset this PC"],
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Option", value: "Remove everything" },
                    { label: "Reinstall method", value: "Local reinstall" },
                    { label: "Clean data", value: "No", note: "Faster, and this is a lab." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This takes fifteen to twenty minutes. It is also a good moment to appreciate why lab 2 asked you to checkpoint VM3 instead of resetting it — reverting a checkpoint takes seconds."
                }
              ]
            },
            {
              text: "At the out-of-box experience, work through region and keyboard, connect to the network, and when asked how to set up the device choose **Set up for work or school**."
            },
            {
              text: "Sign in as `adele.vance@<tenant>.onmicrosoft.com` and complete the flow.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Choosing **Set up for work or school** and signing in with a work account performs a Microsoft Entra *join*, not a registration. This is the same code path Autopilot drives — Autopilot simply pre-answers these screens for you."
                }
              ]
            },
            {
              text: "Once at the desktop, confirm both the join and the enrollment:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "dsregcmd /status | Select-String \"AzureAdJoined|MdmUrl|AzureAdPrt\""
                },
                {
                  kind: "verify",
                  text: "`AzureAdJoined : YES`, an **MdmUrl** is present, and `AzureAdPrt : YES`. Automatic enrollment from lab 10 did the second part without you asking."
                }
              ]
            }
          ],
          result: {
            text: "A device joined and enrolled in one pass at first boot.",
            verify: [
              { text: "`MD102-VM1-Adele` appears in **All devices** managed by Intune." },
              { text: "The primary user is Adele Vance." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Bulk enrollment with a provisioning package",
      estimatedMinutes: 22,
      tasks: [
        {
          id: "t1",
          title: "Build the package",
          checkpoint: true,
          steps: [
            {
              text: "Install **Windows Configuration Designer** from the Microsoft Store on your host, then open it."
            },
            {
              text: "Select **Provision desktop devices**."
            },
            {
              text: "Work through the wizard:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Contoso-Bulk-Enroll" },
                    { label: "Project folder", value: "Any local path" },
                    { label: "Device name", value: "CONTOSO-%RAND:4%", note: "%RAND:4% appends four random digits, keeping names unique." },
                    { label: "Configure network", value: "Off", note: "The Default Switch already provides connectivity." },
                    { label: "Account management", value: "Enroll in Microsoft Entra ID" }
                  ]
                }
              ]
            },
            {
              text: "When prompted, select **Get Bulk Token** and sign in as `admin-intune@<tenant>.onmicrosoft.com`.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "The bulk token has a maximum lifetime of **180 days** and is baked into the package. When it expires the package stops working and every device it touches fails to enroll — with an error that says nothing about tokens. Record the expiry date with the package."
                }
              ]
            },
            {
              text: "Skip the application and certificate steps, then select **Create**.",
              parts: [
                {
                  kind: "verify",
                  text: "A `.ppkg` file is produced in the project folder."
                }
              ]
            }
          ],
          result: {
            text: "A provisioning package exists that joins and enrolls a device without user credentials.",
            verify: [
              { text: "The `.ppkg` file exists." },
              { text: "You have recorded the bulk token expiry date." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand how it is applied, and its consequence",
          steps: [
            {
              text: "A package is applied in one of two ways:",
              parts: [
                {
                  kind: "table",
                  headers: ["When", "How"],
                  rows: [
                    ["At the out-of-box experience", "Insert a USB drive containing the package, then press the Windows key five times to open the provisioning prompt"],
                    ["On a running device", "Settings > Accounts > Access work or school > Add or remove a provisioning package"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "You do not need to apply it in this lab — VM3 is reserved for Autopilot and applying a package to it would consume the clean checkpoint. Understanding what the package produces matters more than watching it run."
                }
              ]
            },
            {
              text: "Note the consequence that makes this method a deliberate choice rather than a shortcut:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Devices enrolled by a bulk package have **no primary user**. Every user-targeted policy, every user-assigned application and every app protection policy will pass them by. Only device-targeted assignments reach them. That is correct for a shared kiosk and wrong for a staff laptop, and it is the most common reason a bulk-enrolled device appears to receive no configuration."
                }
              ]
            }
          ],
          result: {
            text: "You can explain what bulk enrollment produces and what it costs.",
            verify: [
              { text: "You can state which assignments never reach a device with no primary user." }
            ]
          }
        },
        {
          id: "t3",
          title: "Group Policy enrollment for hybrid estates",
          steps: [
            {
              text: "This cannot be practised without an on-premises domain, but its shape is examinable.",
              parts: [
                {
                  kind: "table",
                  headers: ["Step", "Detail"],
                  rows: [
                    ["Prerequisite", "Devices are hybrid Microsoft Entra joined through Microsoft Entra Connect"],
                    ["Policy path", "Computer Configuration > Administrative Templates > Windows Components > MDM"],
                    ["Setting", "**Enable automatic MDM enrollment using default Azure AD credentials**"],
                    ["Credential type", "User credential, or device credential for devices with no signed-in user"],
                    ["Trigger", "A scheduled task runs after the device is hybrid joined"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The exam framing is usually: an organisation with an existing domain wants Intune management without touching every device. The answer is hybrid join plus this Group Policy setting — not Autopilot, which is for new or reset hardware."
                }
              ]
            }
          ],
          result: {
            text: "You can describe how an existing domain estate is brought into Intune.",
            verify: [{ text: "You can name the Group Policy setting that triggers automatic enrollment." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A provisioning package that worked last quarter now fails on every device.",
      rootCause: "The bulk enrollment token embedded in the package has expired. Tokens last at most 180 days.",
      diagnostic: {
        lang: "text",
        code: "Windows Configuration Designer > open the project > Account Management > review the token expiry."
      },
      resolution:
        "Rebuild the package with a fresh bulk token and redistribute it. There is no way to refresh the token inside an existing package."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso has 400 Windows devices already joined to an on-premises Active Directory domain. They must be managed by Intune without visiting each device or reimaging. What should you implement?",
      options: [
        "Hybrid Microsoft Entra join with Group Policy automatic MDM enrollment",
        "Windows Autopilot user-driven deployment",
        "A bulk enrollment provisioning package on a USB drive",
        "Ask each user to add a work or school account"
      ],
      correctIndex: 0,
      rationale:
        "Hybrid join keeps the existing domain membership and gives the devices a Microsoft Entra identity, and the Group Policy setting then enrolls them into Intune automatically. Autopilot applies to new or reset devices, and both remaining options require touching each device.",
      examTip:
        "Existing domain-joined estate plus no reimaging equals hybrid join plus Group Policy enrollment. Autopilot only ever answers questions about new or reset hardware.",
      skills: ["g1.t2.s2"]
    },
    {
      id: "q2",
      question:
        "Devices enrolled using a bulk enrollment provisioning package do not receive an application assigned to a user group. Device-targeted policies apply correctly. Why?",
      options: [
        "Bulk enrolled devices have no primary user, so user-targeted assignments never apply",
        "Provisioning packages block application installation",
        "The bulk token does not include application permissions",
        "Applications must be assigned before the package is created"
      ],
      correctIndex: 0,
      rationale:
        "A bulk package enrolls with a device enrollment token rather than a user's credentials, so the resulting device object has no primary user and nothing user-targeted resolves against it.",
      examTip:
        "No primary user is the defining characteristic of bulk enrollment, and the reason it suits shared and kiosk devices specifically.",
      skills: ["g1.t2.s2"]
    }
  ]
};
