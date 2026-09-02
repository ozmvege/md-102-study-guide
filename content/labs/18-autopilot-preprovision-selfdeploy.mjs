export default {
  id: "autopilot-preprovision-selfdeploy",
  moduleId: "m3",
  title: "Autopilot pre-provisioning and self-deploying mode",
  access: "walkthrough-device",
  accessReason:
    "Both modes require TPM 2.0 with device attestation, because the device must prove its own identity to the Autopilot service with no user signed in. A Hyper-V virtual TPM cannot reliably complete attestation against the service, so these deployments fail on lab hardware for reasons that have nothing to do with your configuration. The profile settings themselves are shown in full, and you can build and inspect them in your tenant — only the deployment itself cannot be run.",
  difficulty: "advanced",
  estimatedMinutes: 35,

  scenario:
    "Two Autopilot modes exist for cases where user-driven is wrong. Pre-provisioning lets IT or an OEM absorb the slow part of a deployment before the device is shipped, so the user waits minutes rather than an hour. Self-deploying provisions a device with no user at all, which is what a meeting-room display or a shop-floor kiosk needs. You will configure both profiles and understand exactly what each produces.",

  objectives: [
    "Create a deployment profile that permits pre-provisioning",
    "Describe the technician phase and the user phase and who completes each",
    "Create a self-deploying profile and state what it does not produce",
    "Explain why both modes require TPM attestation"
  ],

  keyConcepts: ["Pre-provisioning", "Technician phase", "User phase", "Self-deploying", "TPM attestation", "White glove"],

  skills: [
    { id: "g2.t1.s2", depth: "primary" },
    { id: "g2.t1.s4", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["kiosk.device"],
    labs: ["autopilot-user-driven"]
  },

  exercises: [
    {
      id: "e1",
      title: "Pre-provisioning",
      estimatedMinutes: 18,
      tasks: [
        {
          id: "t1",
          title: "Enable pre-provisioning on a deployment profile",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Enrollment**, **Windows**, **Deployment Profiles**, then **Create profile** > **Windows PC**.",
              nav: ["Devices", "Enrollment", "Windows", "Deployment Profiles", "Create profile"]
            },
            {
              text: "Configure the profile:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "AP-PreProvisioned-Corporate" },
                    { label: "Deployment mode", value: "User-Driven" },
                    { label: "Join to Microsoft Entra ID as", value: "Microsoft Entra joined" },
                    { label: "Allow pre-provisioned deployment", value: "Yes", note: "This single setting is what enables the technician phase. Pre-provisioning is not a separate deployment mode." },
                    { label: "User account type", value: "Standard" },
                    { label: "Apply device name template", value: "Yes, CTS-PRE-%RAND:5%" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Pre-provisioning is user-driven mode with one extra switch. That trips people up in exam questions: asked to *choose a deployment mode* for pre-provisioning, the answer is **user-driven**, with pre-provisioning enabled on it."
                }
              ]
            },
            {
              text: "Assign it to a group and create it. Do not assign it to `GRP-DEV-AUTOPILOT` — that group already carries the user-driven profile from lab 17, and a device can only have one profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "If two deployment profiles target the same device through different groups, the resulting profile is unpredictable. Keep Autopilot group membership mutually exclusive."
                }
              ]
            }
          ],
          result: {
            text: "A profile exists that supports the technician phase.",
            verify: [
              { text: "**Allow pre-provisioned deployment** is **Yes** on the new profile." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand the two phases",
          steps: [
            {
              text: "Pre-provisioning splits a deployment in two.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Technician phase", "User phase"],
                  rows: [
                    ["Performed by", "IT or the OEM, before shipping", "The end user, on receipt"],
                    ["Triggered by", "Pressing the Windows key five times at the out-of-box experience, then selecting **Windows Autopilot provisioning**", "Normal sign-in at the out-of-box experience"],
                    ["What is applied", "Device-targeted apps, certificates, configuration; the device joins Microsoft Entra ID and enrolls", "User-targeted apps and policies"],
                    ["Result", "A green success screen; the device is resealed and shipped", "The user signs in and reaches the desktop in minutes"],
                    ["If it fails", "A red screen with a log-collection option; the technician can retry", "The Enrollment Status Page reports the failure"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The value is entirely about *where the waiting happens*. A 4 GB engineering application installed in a warehouse on a wired connection costs the business nothing; the same install over a new starter's home broadband on their first morning costs an hour of their day and a support call."
                }
              ]
            }
          ],
          result: {
            text: "You can describe both phases and who performs each.",
            verify: [{ text: "You can state the key sequence that starts the technician phase." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Self-deploying mode",
      estimatedMinutes: 17,
      tasks: [
        {
          id: "t1",
          title: "Create a self-deploying profile",
          checkpoint: true,
          steps: [
            {
              text: "Create another profile under **Deployment Profiles** and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "AP-SelfDeploying-Kiosk" },
                    { label: "Deployment mode", value: "Self-Deploying (preview or GA depending on your tenant)" },
                    { label: "Join to Microsoft Entra ID as", value: "Microsoft Entra joined", note: "Self-deploying does not support hybrid join. The option is greyed out." },
                    { label: "Language, region, keyboard", value: "Set explicitly — there is no user to choose", note: "Leaving these as User select stalls a device with no user." },
                    { label: "Automatically configure keyboard", value: "Yes" },
                    { label: "Apply device name template", value: "Yes, KIOSK-%RAND:6%" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `AP-SelfDeploying-Kiosk`, then select **Next**." },
                    { text: "On the **Out-of-box experience (OOBE)** tab, configure the fields listed above, then select **Next**." },
                    { text: "On the **Assignments** tab, assign the profile to `GRP-DEV-AUTOPILOT-KIOSK`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                }
              ]
            },
            {
              text: "Note what self-deploying produces and, more importantly, what it does not:",
              parts: [
                {
                  kind: "table",
                  headers: ["Produces", "Does not produce"],
                  rows: [
                    ["A Microsoft Entra joined, Intune enrolled device", "A primary user"],
                    ["Device-targeted configuration and applications", "Any user-targeted policy or application"],
                    ["A device object with corporate ownership", "An entry in a user's My Devices"],
                    ["A device ready for kiosk or shared-device configuration", "Anything that depends on user affinity"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "No primary user is the defining property and the source of most confusion. Administrators deploy a kiosk this way, assign an application to a user group, and then cannot understand why nothing installs. Everything targeting a self-deployed device must be assigned to a **device** group."
                }
              ]
            },
            {
              text: "Understand why the lab hardware cannot run this:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "With no user to authenticate, the device must prove its own identity. It does that with a TPM attestation certificate validated against the manufacturer's endorsement key. A Hyper-V virtual TPM has no manufacturer chain the Autopilot service will accept, so self-deploying and pre-provisioning both fail on virtual machines. The profile is still valid — only the hardware is not."
                }
              ]
            }
          ],
          result: {
            text: "A self-deploying profile exists and you can state its consequences.",
            verify: [
              { text: "The profile shows **Microsoft Entra joined** with hybrid join unavailable." },
              { text: "You can explain which assignments never reach a self-deployed device." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A pre-provisioning technician phase fails on a red screen mentioning TPM attestation.",
      rootCause:
        "The device's TPM cannot complete attestation. Common causes are a virtual TPM, a TPM 1.2 chip, or firmware that needs an update to supply a valid endorsement key certificate.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Tpm | Select-Object TpmPresent, TpmReady, ManufacturerIdTxt, ManufacturerVersion"
      },
      resolution:
        "Confirm the device has a physical TPM 2.0 and update the firmware. If attestation cannot be satisfied, use user-driven mode instead — it has no attestation requirement."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You want IT to install a large application before shipping laptops, so users wait only a few minutes at first sign-in. Which deployment mode should the Autopilot profile use?",
      options: [
        "User-driven, with Allow pre-provisioned deployment set to Yes",
        "Self-deploying",
        "Pre-provisioning, selected as the deployment mode",
        "User-driven, with the Enrollment Status Page disabled"
      ],
      correctIndex: 0,
      rationale:
        "Pre-provisioning is not a deployment mode in its own right. It is user-driven mode with **Allow pre-provisioned deployment** enabled, which unlocks the technician phase at the out-of-box experience.",
      examTip:
        "The three deployment modes are user-driven, pre-provisioning and self-deploying as concepts, but in the profile only user-driven and self-deploying are selectable — pre-provisioning is a toggle on user-driven.",
      skills: ["g2.t1.s2"]
    },
    {
      id: "q2",
      question:
        "A meeting-room device provisioned with self-deploying mode does not receive an application assigned to a user group. Why?",
      options: [
        "Self-deploying assigns no primary user, so user-targeted assignments never resolve",
        "Self-deploying blocks application installation during provisioning",
        "The application must be assigned before the profile is created",
        "Self-deploying supports only Microsoft Store applications"
      ],
      correctIndex: 0,
      rationale:
        "Self-deploying provisions with no user present and therefore no primary user. Only device-targeted assignments reach the device.",
      examTip:
        "Bulk enrollment and self-deploying share this property. Whenever a question mentions a shared or kiosk device receiving nothing, check whether the assignment was user-targeted.",
      skills: ["g2.t1.s4"]
    }
  ]
};
