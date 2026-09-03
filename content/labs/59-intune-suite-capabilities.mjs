export default {
  id: "intune-suite-capabilities",
  moduleId: "m11",
  title: "Remote Help, Enterprise App Catalog, Advanced Analytics and Tunnel for MAM",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 55,

  scenario:
    "Four capabilities that each remove friction you have already met in this course: helping a user you cannot see, packaging applications you would rather not package, finding the device that is quietly degrading, and giving unmanaged devices access to internal services. All four arrived in Microsoft 365 E5 with the July 2026 packaging change, so three of them you will configure and use here. The fourth, Tunnel for MAM, is licensed but needs a Linux gateway you would have to host — so it stays a walkthrough within an otherwise hands-on lab.",

  objectives: [
    "Configure and use Microsoft Intune Remote Help",
    "Deploy an application from the Enterprise App Catalog and compare it with hand packaging",
    "Use Advanced Analytics: multi-device query, anomaly detection and the device timeline",
    "Describe Microsoft Tunnel for Mobile Application Management and what hosting it requires"
  ],

  keyConcepts: ["Remote Help", "Enterprise App Catalog", "Advanced Analytics", "Anomaly detection", "Device timeline", "Multi-device query", "Tunnel for MAM"],

  skills: [
    { id: "g2.t3.s2", depth: "primary" },
    { id: "g2.t3.s3", depth: "primary" },
    { id: "g2.t3.s5", depth: "primary" },
    { id: "g2.t3.s6", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "INTUNE-REMOTE-HELP", "INTUNE-ENTERPRISE-APP-MGMT", "INTUNE-ADV-ANALYTICS", "INTUNE-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "helpdesk.operator"],
    labs: ["endpoint-privilege-management", "win32-packaging", "endpoint-analytics"]
  },

  exercises: [
    {
      id: "e1",
      title: "Remote Help",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Enable Remote Help and deploy the app",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Remote Help**.",
              nav: ["Tenant administration", "Remote Help"]
            },
            {
              text: "On the **Settings** tab, configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enable Remote Help", value: "Yes" },
                    { label: "Allow Remote Help to unenrolled devices", value: "Yes", note: "Useful precisely when a user most needs help — before enrollment has succeeded." },
                    { label: "Disable chat", value: "No" }
                  ]
                }
              ]
            },
            {
              text: "Deploy the Remote Help application to devices. Select **Apps** > **All apps** > **Add** > **Windows app (Win32)**, or use the Enterprise App Catalog entry you will meet in the next exercise.",
              nav: ["Apps", "All apps", "Add"],
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Remote Help is itself in the Enterprise App Catalog, so the quickest route is **Add** > **Enterprise App Catalog app** and search for it. That saves packaging it by hand and is a neat demonstration of why the catalogue exists."
                }
              ]
            },
            {
              text: "Assign the app as **Required** to `GRP-DEV-WIN-CORP`."
            },
            {
              text: "Confirm the permissions model, because this is what makes Remote Help enterprise-grade:",
              parts: [
                {
                  kind: "table",
                  headers: ["Permission", "Grants"],
                  rows: [
                    ["Remote Help app — Take full control", "Full remote control of the session"],
                    ["Remote Help app — View screen", "View only, no input"],
                    ["Remote Help app — Elevation", "The ability to approve a UAC prompt during the session"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "These are Intune RBAC permissions from lab 7, so a Help Desk Operator can be granted view-only while a senior engineer gets full control. Elevation is deliberately separate — approving a UAC prompt on someone else's device is a bigger grant than seeing their screen."
                }
              ]
            }
          ],
          result: {
            text: "Remote Help is enabled and the application is deploying to corporate devices.",
            verify: [
              { text: "**Remote Help** shows as enabled under **Tenant administration**." },
              { text: "The Remote Help app is assigned as Required." }
            ]
          }
        },
        {
          id: "t2",
          title: "Run a session",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, sync policy and wait for the Remote Help application to install, then open it and sign in as Adele."
            },
            {
              text: "From your admin machine, open Remote Help and sign in as `admin-intune@<tenant>.onmicrosoft.com`, then request a session with Adele's device.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Watch what both sides are shown before the session starts. The helper sees the verified organisational identity of the person they are connecting to, and the user sees the helper's verified identity — not a name someone typed. That mutual verification is the defence against the support-desk impersonation call, and it is what distinguishes Remote Help from a generic remote-control tool."
                }
              ]
            },
            {
              text: "Accept on Adele's side, then request full control and accept again.",
              parts: [
                {
                  kind: "verify",
                  text: "The session connects. Note that full control required a **second** explicit consent — viewing and controlling are separate grants."
                }
              ]
            },
            {
              text: "End the session, then check the audit trail under **Tenant administration** > **Remote Help** > **Monitor**.",
              nav: ["Tenant administration", "Remote Help", "Monitor"],
              parts: [
                {
                  kind: "verify",
                  text: "The session is logged with both participants, the device and the duration."
                }
              ]
            }
          ],
          result: {
            text: "You have run an audited remote session with verified identity on both sides.",
            verify: [
              { text: "A session completed and appears in the Remote Help monitor." },
              { text: "Full control required a separate consent from view-only." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Enterprise App Catalog",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Deploy a catalogue app and compare it with lab 33",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **All apps**, **Add**, then app type **Enterprise App Catalog app**.",
              nav: ["Apps", "All apps", "Add"]
            },
            {
              text: "Select **Search the Enterprise App Catalog**, find a common application — 7-Zip, Notepad++ or Google Chrome are all present — and select it."
            },
            {
              text: "Work through the wizard and pay attention to what you are *not* asked for:",
              parts: [
                {
                  kind: "table",
                  headers: ["Step", "Lab 33 — hand packaged", "Enterprise App Catalog"],
                  rows: [
                    ["Obtain the installer", "You download it", "Microsoft hosts it"],
                    ["Package it", "You run IntuneWinAppUtil", "Already packaged"],
                    ["Install and uninstall commands", "You determine them", "**Supplied**"],
                    ["Detection rules", "**You write them**", "**Supplied and validated**"],
                    ["Requirement rules", "You set them", "Supplied, and editable"],
                    ["Updates", "You repackage each version", "New versions appear in the catalogue with supersedence"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The detection rules are the real value. Lab 33 showed that `0x87D1041C` — a correct installation reported as failed — is the most common Win32 problem, and it comes almost entirely from writing detection rules by hand. Catalogue applications arrive with rules Microsoft has already validated, which removes that whole class of failure along with the repackaging treadmill."
                }
              ]
            },
            {
              text: "Assign as **Available for enrolled devices** to `GRP-USR-PILOT`, then create the app."
            },
            {
              text: "In **Apps** > **All apps**, select the created application from the list, select **Properties**, and inspect its **Detection rules**.",
              nav: ["Apps", "All apps", "Properties"],
              parts: [
                {
                  kind: "verify",
                  text: "Detection rules are pre-populated and correct for the packaged version. Compare with the rule you wrote by hand in lab 33 — and with the one you deliberately broke to produce `0x87D1041C`."
                }
              ]
            },
            {
              text: "Note where the catalogue does not help:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The catalogue covers widely used third-party software. Your own line-of-business application will never be in it, so lab 33's packaging skills remain necessary — the catalogue removes the tedious 80 percent, not the difficult 20 percent."
                }
              ]
            }
          ],
          result: {
            text: "An application is deployed with supplied, validated detection rules.",
            verify: [
              { text: "A catalogue app exists with pre-populated detection rules." },
              { text: "You can state which Win32 error class the catalogue eliminates." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Advanced Analytics",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Use multi-device query, anomaly detection and the device timeline",
          checkpoint: true,
          steps: [
            {
              text: "Lab 51 ran a KQL query against a single device. Now run one across many. Select **Reports**, **Endpoint analytics**, then **Device query**.",
              nav: ["Reports", "Endpoint analytics", "Device query"]
            },
            {
              text: "Run a query across your whole estate:",
              parts: [
                {
                  kind: "code",
                  lang: "kusto",
                  caption: "Which devices have a given application, and at what version?",
                  code: "Application\n| where displayName contains \"7-Zip\"\n| project deviceName, displayName, version, publisher\n| sort by version asc"
                },
                {
                  kind: "verify",
                  text: "Results return for every device that matches, not just one. This is the vulnerability-response scenario from lab 51 answered properly — that lab could only ask one device at a time."
                }
              ]
            },
            {
              text: "Open **Reports** > **Endpoint analytics** > **Anomalies**.",
              nav: ["Reports", "Endpoint analytics", "Anomalies"],
              parts: [
                {
                  kind: "table",
                  headers: ["Column", "Meaning"],
                  rows: [
                    ["Anomaly", "What is behaving unusually — a crash pattern, a startup regression, a driver fault"],
                    ["Devices impacted", "How many, and which"],
                    ["Anomaly details", "The correlated signals behind the detection"],
                    ["First detected", "When the behaviour diverged from the baseline"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "With two virtual machines you will likely see nothing here, and that is the correct result — anomaly detection compares devices against their peers and needs a population to compare within. The mechanism is what matters: it finds the device you would not have thought to look at."
                }
              ]
            },
            {
              text: "Under **Devices** > **All devices**, select a device from the list, then select **Device timeline** under **Monitor**.",
              nav: ["Devices", "All devices", "Device timeline"],
              parts: [
                {
                  kind: "verify",
                  text: "A chronological history appears: policy applications, application installs, restarts, crashes and driver events."
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The timeline is the capability that changes daily work. Endpoint Analytics in lab 54 told you a device was slow; the timeline tells you it became slow on the fourteenth, two hours after a configuration profile applied. That is the difference between a symptom and a cause, and it is why the exam objective names it alongside anomaly detection."
                }
              ]
            }
          ],
          result: {
            text: "You can query the estate, spot outliers and reconstruct what happened to a device.",
            verify: [
              { text: "A multi-device query returned results from more than one device." },
              { text: "The device timeline shows a chronological event history." }
            ]
          }
        }
      ]
    },

    {
      id: "e4",
      title: "Microsoft Tunnel for Mobile Application Management",
      intro:
        "The licence is included, but this is the one capability in the module you cannot simply switch on — it needs infrastructure you would have to host.",
      estimatedMinutes: 8,
      tasks: [
        {
          id: "t1",
          title: "Understand what Tunnel for MAM requires",
          checkpoint: true,
          steps: [
            {
              text: "Lab 27 configured per-app VPN for enrolled devices. Tunnel for MAM extends that to devices that are not enrolled at all.",
              parts: [
                {
                  kind: "table",
                  headers: ["Component", "Role", "Who provides it"],
                  rows: [
                    ["Tunnel Gateway", "A Linux container terminating the VPN", "**You host it** — on-premises or in a cloud"],
                    ["Server configuration", "IP ranges, DNS servers, split-tunnelling rules", "You configure it in Intune"],
                    ["Site", "A logical grouping of gateway servers", "You define it in Intune"],
                    ["App configuration policy", "Points Microsoft Edge or a managed app at the tunnel", "Intune, as in lab 37"],
                    ["App protection policy", "Protects the corporate data reached through it", "Intune, as in lab 36"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The scenario is Joni from lab 36 — a personally owned, unenrolled device that must reach an internal line-of-business web application. A device-wide VPN would require enrollment. Tunnel for MAM puts the tunnel inside the managed application instead, so only that application reaches the internal network and personal traffic never does."
                }
              ]
            },
            {
              text: "Understand why this exercise stops here:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Tunnel Gateway is infrastructure **you** run: a Linux host, a container runtime, a TLS certificate to renew, and patching. Unlike the other three capabilities in this lab, the licence being included is not the end of the work — there is nothing to click until a gateway exists. That is also why *monitoring tunnel connections and server health* appears in the exam objective."
                }
              ]
            },
            {
              text: "Note the configuration path so you recognise it: in the **Microsoft Intune admin center**, select **Tenant administration**, then **Microsoft Tunnel Gateway**.",
              nav: ["Tenant administration", "Microsoft Tunnel Gateway"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Create a **Server configuration** defining IP ranges, DNS and split tunnelling." },
                    { text: "Create a **Site** and associate the server configuration with it." },
                    { text: "Install the Tunnel Gateway software on a supported Linux server using the generated script." },
                    { text: "Create an **app configuration policy** pointing the managed app at the tunnel." },
                    { text: "Monitor server health and connection counts under the same blade." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can describe Tunnel for MAM's components and state what it requires beyond a licence.",
            verify: [
              { text: "You can name the component you must host yourself." },
              { text: "You can explain why a device-wide VPN is not the answer for unenrolled devices." }
            ]
          }
        },
        {
          id: "t2",
          title: "Place the whole module in context",
          steps: [
            {
              text: "Review all six formerly-Suite capabilities against the problem each one removes.",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "Removes", "Friction first met in"],
                  rows: [
                    ["Endpoint Privilege Management", "Standard users blocked from occasional elevation", "Lab 28, removing admin rights"],
                    ["Remote Help", "Supporting a user you cannot see", "Lab 38, troubleshooting"],
                    ["Enterprise App Catalog", "Packaging and detection-rule effort", "Lab 33, `0x87D1041C`"],
                    ["Cloud PKI", "Running a certification authority", "Lab 27, where you now use it"],
                    ["Tunnel for MAM", "Unenrolled devices reaching internal services", "Lab 36, BYOD app protection"],
                    ["Advanced Analytics", "Finding the cause rather than the symptom", "Lab 54, Endpoint Analytics"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Every one extends something you had already built and hit a wall with. That is not a coincidence — these capabilities are positioned as the answer to the friction a Plan 1 deployment reaches. Being able to name the friction each removes is better exam preparation than memorising configuration paths, because that is how the scenario questions are framed."
                }
              ]
            }
          ],
          result: {
            text: "You can pair each capability with the problem it solves.",
            verify: [{ text: "You can name the lab where each capability's need first became obvious." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Remote Help sessions cannot be started and the option is greyed out for a help desk operator.",
      rootCause:
        "The operator's Intune role does not include the Remote Help app permissions, or Remote Help is not enabled at tenant level.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Remote Help > Settings — confirm Enable Remote Help is Yes\nSigned in as the operator: Tenant administration > Roles > My permissions — look for Remote Help app"
      },
      resolution:
        "Grant the appropriate Remote Help app permission on the operator's role — view screen, take full control and elevation are separate grants, so a role can permit viewing without control."
    },
    {
      symptom: "Multi-device query returns results for only one device, or the Device query blade under Endpoint analytics is missing.",
      rootCause:
        "Advanced Analytics has not finished provisioning, or the data collection policy from lab 54 does not target the devices you are querying.",
      diagnostic: {
        lang: "text",
        code: "Reports > Endpoint analytics > Settings — confirm the data collection policy scope\nTenant administration > Intune add-ons — confirm Advanced Analytics shows as Active"
      },
      resolution:
        "Confirm Advanced Analytics is active on the tenant and that the devices are in scope for Endpoint Analytics data collection. Devices excluded from data collection cannot be queried across."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A user on a personally owned, unenrolled device needs access to an internal line-of-business web application. Which capability provides this without enrolling the device?",
      options: [
        "Microsoft Tunnel for Mobile Application Management",
        "A device-wide VPN profile",
        "Microsoft Cloud PKI",
        "Remote Help"
      ],
      correctIndex: 0,
      rationale:
        "Tunnel for MAM places the VPN inside the managed application, so an unenrolled device can reach internal resources through that application only. A device-wide VPN profile requires enrollment.",
      examTip:
        "Unenrolled plus internal resource access equals Tunnel for MAM. Remember that the licence alone is not enough — you must also host the Tunnel Gateway yourself.",
      skills: ["g2.t3.s5"]
    },
    {
      id: "q2",
      question:
        "Which Intune Advanced Analytics capability helps determine the root cause of a device that recently began performing poorly?",
      options: [
        "Device timeline, showing a chronological history of events on that device",
        "Anomaly detection",
        "Multi-device query",
        "The Endpoint analytics score"
      ],
      correctIndex: 0,
      rationale:
        "Device timeline shows policy changes, application installs, restarts and crashes in order, letting you correlate the onset of a problem with what changed. Anomaly detection identifies that a device is unusual; the timeline explains when and why.",
      examTip:
        "Anomaly detection finds the device; device timeline finds the cause; multi-device query answers a specific question across many devices.",
      skills: ["g2.t3.s6"]
    },
    {
      id: "q3",
      question:
        "What is the principal advantage of deploying an application from the Enterprise App Catalog rather than packaging it as a Win32 app by hand?",
      options: [
        "Install commands and validated detection rules are supplied, removing the most common cause of 0x87D1041C",
        "Catalogue applications install without requiring the Intune Management Extension",
        "Catalogue applications bypass assignment intents and install on all devices",
        "Catalogue applications do not require a licence to deploy"
      ],
      correctIndex: 0,
      rationale:
        "The catalogue supplies packaging, install and uninstall commands, requirement rules and — most valuably — detection rules Microsoft has validated. Hand-written detection rules are the dominant cause of an application installing correctly but reporting as failed.",
      examTip:
        "The catalogue covers common third-party software only. Your own line-of-business applications still need the packaging skills from lab 33.",
      skills: ["g2.t3.s2"]
    }
  ]
};
