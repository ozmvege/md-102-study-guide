export default {
  id: "windows-365-cloud-pc",
  moduleId: "m3",
  title: "Windows 365 Cloud PCs",
  access: "walkthrough-license",
  accessReason:
    "Windows 365 is a separate subscription and is not part of Microsoft 365 E5. Provisioning a Cloud PC requires Windows 365 Enterprise licences, which are sold per user and only trialled through a sales-arranged promotional licence. The provisioning policy, network connection and image management surfaces are all examined, so this lab covers them as configuration paths and decision criteria you can read in your own tenant without being able to provision.",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Contoso is opening a development office abroad and does not want to ship laptops. Windows 365 gives each user a persistent Cloud PC, managed by Intune exactly like a physical device. The provisioning policy decides who gets one and what it looks like; the network connection decides where it lives; the image decides what it starts from. Those three objects are what the exam asks about.",

  objectives: [
    "Describe the difference between Windows 365 Enterprise and Business",
    "Explain what a provisioning policy controls and how Cloud PCs are assigned",
    "Compare Microsoft hosted network with Azure network connection",
    "Describe gallery images versus custom images",
    "Name the Intune roles that govern Cloud PC administration"
  ],

  keyConcepts: ["Cloud PC", "Provisioning policy", "Azure network connection", "Microsoft hosted network", "Gallery image", "Custom image", "Windows 365 Enterprise"],

  skills: [{ id: "g2.t1.s7", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "WINDOWS-365"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["pradeep.gupta"],
    labs: ["deployment-method-decision"]
  },

  exercises: [
    {
      id: "e1",
      title: "Editions and the three objects",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Choose an edition",
          steps: [
            {
              text: "The edition decides whether Intune is in the picture at all.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Windows 365 Business", "Windows 365 Enterprise"],
                  rows: [
                    ["Managed by Intune", "No", "**Yes**"],
                    ["Maximum seats", "300", "Unlimited"],
                    ["Requires Microsoft Entra ID and Intune licences", "No", "Yes"],
                    ["Custom images", "No", "Yes"],
                    ["Own network (Azure virtual network)", "No", "Yes"],
                    ["Provisioning policies", "No — provisioned per user in the admin centre", "Yes"],
                    ["Typical customer", "Small business with no IT department", "Any organisation already using Intune"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Only **Enterprise** is examinable in an MD-102 context, because only Enterprise Cloud PCs appear in Intune and receive Intune policy. Any question mentioning provisioning policies, custom images or configuration profiles is describing Enterprise."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **Windows 365**. Note where Cloud PCs live in the portal:",
              nav: ["Devices", "Windows 365"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The blade is visible even without licences, so you can inspect its structure. Provisioning policies, Azure network connections, custom images and user settings are all here."
                }
              ]
            }
          ],
          result: {
            text: "You can identify which Windows 365 edition a scenario describes.",
            verify: [{ text: "You can state which edition is managed by Intune." }]
          }
        },
        {
          id: "t2",
          title: "Understand the provisioning policy",
          checkpoint: true,
          steps: [
            {
              text: "The path is **Devices** > **Windows 365** > **Provisioning policies** > **Create policy**.",
              nav: ["Devices", "Windows 365", "Provisioning policies", "Create policy"]
            },
            {
              text: "A provisioning policy carries these settings:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Join type", value: "Microsoft Entra join, or Hybrid Microsoft Entra join", note: "Hybrid requires an Azure network connection with line of sight to a domain controller." },
                    { label: "Network", value: "Microsoft hosted network, or Azure network connection" },
                    { label: "Image", value: "Gallery image, or a custom image you uploaded" },
                    { label: "Language and region", value: "Applied to the provisioned Cloud PC" },
                    { label: "Naming template", value: "For example CPC-%USERNAME:5%-%RAND:5%" },
                    { label: "Assignments", value: "A user group whose members hold Windows 365 licences" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Assignment is to a **user** group, and each member must hold a Windows 365 licence. A user in the group without a licence gets no Cloud PC and no obvious error — the same failure shape as group-based licensing running out of seats."
                }
              ]
            },
            {
              text: "Note what happens when a policy changes:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Changing the image on an existing provisioning policy does **not** rebuild existing Cloud PCs. It affects new provisioning only. To move an existing Cloud PC to a new image you reprovision it, which discards everything on the local disk."
                }
              ]
            }
          ],
          result: {
            text: "You can describe what a provisioning policy controls and how it is targeted.",
            verify: [
              { text: "You can name what a Cloud PC assignment targets." },
              { text: "You can state what happens to existing Cloud PCs when the image changes." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Network connections and images",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Choose a network",
          steps: [
            {
              text: "The network decision is usually the first real design decision in a Windows 365 deployment.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Microsoft hosted network", "Azure network connection"],
                  rows: [
                    ["Azure subscription needed", "No", "Yes"],
                    ["Cloud PC can reach on-premises resources", "No", "Yes, over the virtual network"],
                    ["Hybrid Microsoft Entra join", "Not supported", "Supported"],
                    ["Control over IP addressing and routing", "None", "Full"],
                    ["Setup effort", "None", "Virtual network, subnet, DNS, and a health check that must pass"],
                    ["Typical use", "Cloud-only organisations", "Anything needing on-premises access or hybrid join"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "An Azure network connection runs a periodic **health check** covering DNS resolution, domain join if configured, endpoint connectivity and subnet capacity. A failing health check blocks provisioning entirely, and the check results are the first place to look when Cloud PCs stop being created."
                }
              ]
            }
          ],
          result: {
            text: "You can select a network type from a connectivity requirement.",
            verify: [{ text: "You can name the network type required for hybrid join." }]
          }
        },
        {
          id: "t2",
          title: "Understand image management and Cloud PC roles",
          checkpoint: true,
          steps: [
            {
              text: "Images come from two places:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Gallery image", "Custom image"],
                  rows: [
                    ["Source", "Microsoft's curated list", "An Azure managed image you build and upload"],
                    ["Includes Microsoft 365 Apps", "Optionally, in the with-Office variants", "Whatever you put in it"],
                    ["Maintenance", "Microsoft updates them", "Yours to rebuild and re-upload"],
                    ["Requires an Azure subscription", "No", "Yes, to hold the managed image"],
                    ["Best for", "Standard desktops configured entirely by Intune", "Line-of-business software that cannot be deployed by Intune"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Prefer gallery images plus Intune configuration. A custom image is a maintenance commitment: every patch cycle it drifts further from current, and rebuilding it is manual. Reach for one only when something genuinely cannot be installed by policy."
                }
              ]
            },
            {
              text: "Note the roles that govern Cloud PC administration, which are Intune RBAC roles from lab 7:",
              parts: [
                {
                  kind: "table",
                  headers: ["Role", "Grants"],
                  rows: [
                    ["Windows 365 Administrator", "Full Cloud PC management including provisioning policies, images and network connections"],
                    ["Cloud PC Administrator", "Read and write across the Cloud PC service"],
                    ["Cloud PC Reader", "Read-only view of Cloud PCs and provisioning policies"]
                  ]
                }
              ]
            },
            {
              text: "Note the remote actions unique to Cloud PCs, which sit alongside the standard ones from lab 50:",
              parts: [
                {
                  kind: "table",
                  headers: ["Action", "Effect"],
                  rows: [
                    ["Reprovision", "Rebuilds the Cloud PC from the policy image. **All local data is lost.**"],
                    ["Resize", "Moves the Cloud PC to a different size, keeping the disk"],
                    ["Restore", "Rolls back to a previous restore point"],
                    ["Place under review", "Preserves a snapshot for investigation while keeping the user working"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can describe image options, Cloud PC roles and the remote actions specific to Windows 365.",
            verify: [
              { text: "You can name the remote action that destroys local data." },
              { text: "You can name the role that permits provisioning-policy management." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Users are in the assigned group but no Cloud PCs are provisioned.",
      rootCause:
        "Either the users hold no Windows 365 licence, or the Azure network connection health check is failing, which blocks provisioning entirely.",
      diagnostic: {
        lang: "text",
        code: "Devices > Windows 365 > Azure network connection > select the connection > review the health check results\nDevices > Windows 365 > All Cloud PCs > check provisioning status per user"
      },
      resolution:
        "Assign Windows 365 licences to the group members, then resolve any failing health check item — most often DNS resolution or insufficient free addresses in the subnet."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso needs Cloud PCs that can reach an on-premises file server and be hybrid Microsoft Entra joined. Which network configuration is required?",
      options: [
        "An Azure network connection using a virtual network with line of sight to a domain controller",
        "The Microsoft hosted network with a site-to-site VPN",
        "The Microsoft hosted network, which supports hybrid join by default",
        "An Azure network connection is optional; hybrid join works on either network"
      ],
      correctIndex: 0,
      rationale:
        "The Microsoft hosted network provides no route to on-premises resources and does not support hybrid Microsoft Entra join. Both requirements force an Azure network connection.",
      examTip:
        "On-premises access or hybrid join always means Azure network connection. Cloud-only with no on-premises dependency means Microsoft hosted network.",
      skills: ["g2.t1.s7"]
    },
    {
      id: "q2",
      question:
        "You update the image on an existing Windows 365 provisioning policy. What happens to Cloud PCs already provisioned by that policy?",
      options: [
        "Nothing — the new image applies only to newly provisioned Cloud PCs",
        "They are rebuilt automatically on the new image at the next restart",
        "They are placed under review until an administrator approves the change",
        "They are resized to match the new image requirements"
      ],
      correctIndex: 0,
      rationale:
        "Provisioning policy image changes affect new provisioning only. Moving an existing Cloud PC to a new image requires a reprovision, which destroys everything on the local disk.",
      examTip:
        "Reprovision is destructive. Any question offering it as a routine maintenance action is testing whether you know that.",
      skills: ["g2.t1.s7"]
    }
  ]
};
