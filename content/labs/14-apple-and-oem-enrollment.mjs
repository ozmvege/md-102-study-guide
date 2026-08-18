export default {
  id: "apple-and-oem-enrollment",
  moduleId: "m2",
  title: "Apple enrollment, Apple Business Manager and OEM zero-touch",
  access: "walkthrough-device",
  accessReason:
    "These paths need Apple hardware and an Apple Business Manager organisation with a D-U-N-S number, or Samsung Knox and Google Zero Touch enrolments tied to hardware bought through an authorised reseller. None of that can be reproduced with virtual machines and an emulator. The exam covers all of it, so this lab gives you the exact configuration paths, the decision criteria and the prerequisites rather than asking you to click through something you do not have.",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Contoso is adding Macs for the design team, iPhones for executives, and Samsung handsets for the warehouse. Each platform has a personal enrollment path and a corporate zero-touch path, and the difference between them decides whether a device can be supervised, wiped, or locked to your tenant. You will not enrol any of these, but you must be able to choose the right method and name its prerequisites.",

  objectives: [
    "Configure the Apple MDM push certificate that all Apple management depends on",
    "Distinguish Apple personal enrollment from automated device enrollment",
    "Describe the Apple Business Manager token workflow and its renewal trap",
    "Explain what supervision unlocks on iOS and iPadOS",
    "Describe Samsung Knox Mobile Enrollment and Google Zero Touch and when each applies"
  ],

  keyConcepts: ["Apple MDM push certificate", "Apple Business Manager", "Automated Device Enrollment", "Supervision", "Knox Mobile Enrollment", "Google Zero Touch"],

  skills: [
    { id: "g1.t2.s3", depth: "primary" },
    { id: "g1.t2.s5", depth: "primary" },
    { id: "g1.t2.s6", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "APPLE-BUSINESS-MANAGER"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["miriam.graham"],
    labs: ["enrollment-restrictions"]
  },

  exercises: [
    {
      id: "e1",
      title: "The Apple MDM push certificate",
      intro:
        "Nothing Apple works without this certificate. It is also the single most common cause of an entire Apple estate falling out of management at once, so it is worth understanding even if you never touch a Mac.",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Walk the certificate workflow",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, the path is **Devices** > **Enrollment** > **Apple** > **Apple MDM push certificate**.",
              nav: ["Devices", "Enrollment", "Apple", "Apple MDM push certificate"]
            },
            {
              text: "The workflow has four steps and must be done in order:",
              parts: [
                {
                  kind: "table",
                  headers: ["Step", "Action", "Produces"],
                  rows: [
                    ["1", "Grant Microsoft permission to send device information to Apple", "Consent"],
                    ["2", "Download the Intune certificate signing request", "A `.csr` file"],
                    ["3", "Upload the CSR to the Apple Push Certificates Portal", "A `.pem` certificate"],
                    ["4", "Upload the `.pem` to Intune along with the Apple ID used", "An active push certificate"]
                  ]
                }
              ]
            },
            {
              text: "Understand the two traps, both of which cost organisations their entire Apple estate.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "**The certificate expires every 12 months.** When it lapses, every enrolled Apple device stops communicating with Intune and must be **re-enrolled by hand** — there is no remote recovery. Renewal is only possible with the *same Apple ID* that created it, so a certificate created under a departed employee's personal Apple ID becomes unrenewable. Always use a shared organisational Apple ID and record it with the expiry date."
                }
              ]
            }
          ],
          result: {
            text: "You can describe the push certificate workflow and both of its failure modes.",
            verify: [
              { text: "You can state what happens to enrolled devices when the certificate expires." },
              { text: "You can state why the Apple ID used must be an organisational one." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Personal versus automated device enrollment",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Compare the two Apple enrollment paths",
          steps: [
            {
              text: "The choice determines what management is possible for the life of the device.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Personal (BYOD) enrollment", "Automated Device Enrollment"],
                  rows: [
                    ["Started by", "User installs Company Portal and signs in", "Device is registered in Apple Business Manager before it is switched on"],
                    ["Hardware source", "Any device", "Bought from Apple or an authorised reseller"],
                    ["Supervised", "No", "Yes"],
                    ["User can remove management", "Yes, at any time", "No, if the profile is set as non-removable"],
                    ["Enrollment can be mandatory at setup", "No", "Yes, and it can be locked so setup cannot continue without it"],
                    ["Typical use", "Executive's own iPhone", "Corporate-issued Mac or iPad"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Supervision** is the capability gate on iOS and iPadOS, and it is only available through Automated Device Enrollment or Apple Configurator. Supervised devices can use single-app mode, restrict which applications may be installed, block AirDrop, and prevent the user from removing management. A personally enrolled device can do none of that — so a scenario demanding kiosk mode or a non-removable profile is telling you it needs ADE."
                }
              ]
            },
            {
              text: "For personal enrollment, note the two variants on iOS:",
              parts: [
                {
                  kind: "table",
                  headers: ["Variant", "Behaviour"],
                  rows: [
                    ["Device enrollment", "Full device MDM, user can remove it; the older BYOD model"],
                    ["Account driven user enrollment", "A managed Apple Account creates a cryptographically separate managed partition; IT can only see and wipe managed data. The modern BYOD answer, closest in spirit to an Android work profile."]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can choose an Apple enrollment path from a management requirement.",
            verify: [
              { text: "You can name the enrollment method required for supervision." },
              { text: "You can name the iOS enrollment type that keeps personal data cryptographically separate." }
            ]
          }
        },
        {
          id: "t2",
          title: "Walk the Apple Business Manager token workflow",
          checkpoint: true,
          steps: [
            {
              text: "The path in Intune is **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**.",
              nav: ["Devices", "Enrollment", "Apple", "Enrollment program tokens"]
            },
            {
              text: "The sequence:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Download the Intune public key certificate." },
                    { text: "In Apple Business Manager, create an MDM server and upload that public key." },
                    { text: "Download the server token from Apple Business Manager." },
                    { text: "Upload the token to Intune along with the Apple ID." },
                    { text: "In Apple Business Manager, assign purchased device serial numbers to the Intune MDM server." },
                    { text: "In Intune, create an enrollment profile and assign it to those serial numbers." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The enrollment program token also expires annually and is also tied to the Apple ID that created it. Two independent annual expiries — the push certificate and the token — is why mature Apple estates keep a shared calendar for both."
                }
              ]
            },
            {
              text: "Note what an ADE enrollment profile controls:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "User affinity", value: "Enroll with or without user affinity", note: "Without affinity means shared device; no user-targeted policy applies." },
                    { label: "Authentication method", value: "Setup Assistant, Company Portal, or Setup Assistant with modern authentication" },
                    { label: "Locked enrollment", value: "Prevents the user removing the management profile", note: "Requires supervision." },
                    { label: "Setup Assistant screens", value: "Which first-run screens to skip" }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can describe the full Apple Business Manager integration and what its profile controls.",
            verify: [
              { text: "You can list the two artefacts that expire annually." },
              { text: "You can explain what locked enrollment requires." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Android OEM zero-touch",
      estimatedMinutes: 11,
      tasks: [
        {
          id: "t1",
          title: "Compare Knox Mobile Enrollment and Google Zero Touch",
          steps: [
            {
              text: "Both solve the same problem as Apple's Automated Device Enrollment: a device that enrolls itself on first power-on, without anybody touching it.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Samsung Knox Mobile Enrollment", "Google Zero Touch"],
                  rows: [
                    ["Applies to", "Samsung devices only", "Supported Android devices from many manufacturers"],
                    ["Device source", "An authorised Samsung reseller", "An authorised Zero Touch reseller"],
                    ["Registration", "Reseller uploads IMEI or serial to the Knox portal", "Reseller uploads device identifiers to the Zero Touch portal"],
                    ["Configuration", "An MDM profile in the Knox portal points at Intune", "A configuration in the Zero Touch console points at Intune"],
                    ["Result", "Device enrolls at first boot, management non-removable", "Device enrolls at first boot, management non-removable"],
                    ["Prerequisite in Intune", "Managed Google Play binding plus a corporate enrollment profile", "The same"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The prerequisite the exam tests is the same for both: the device must have been **purchased through a reseller enrolled in the programme**. Hardware bought retail cannot be added to Knox Mobile Enrollment or Zero Touch afterwards. If a scenario mentions devices already bought from a high-street shop, zero-touch is not the answer — the QR code or token method from lab 13 is."
                }
              ]
            },
            {
              text: "Place all the corporate zero-touch methods side by side:",
              parts: [
                {
                  kind: "table",
                  headers: ["Platform", "Zero-touch method", "Requires purchase channel"],
                  rows: [
                    ["Windows", "Windows Autopilot", "No — a hardware hash can be captured from any device"],
                    ["iOS, iPadOS, macOS", "Apple Business Manager Automated Device Enrollment", "Yes"],
                    ["Android (Samsung)", "Knox Mobile Enrollment", "Yes"],
                    ["Android (multi-vendor)", "Google Zero Touch", "Yes"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Windows Autopilot is the odd one out and that is worth remembering: you can register any Windows device by collecting its hardware hash yourself, which is exactly what lab 17 does on a virtual machine. Apple and Android zero-touch both depend on the reseller."
                }
              ]
            }
          ],
          result: {
            text: "You can select the correct zero-touch method per platform and state its purchase-channel prerequisite.",
            verify: [
              { text: "You can name the only zero-touch method that does not require a specific purchase channel." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Every iOS and macOS device stops checking in with Intune on the same day.",
      rootCause: "The Apple MDM push certificate expired. All Apple management traffic depends on it.",
      diagnostic: {
        lang: "text",
        code: "Devices > Enrollment > Apple > Apple MDM push certificate\nCheck the expiration date and the Apple ID shown."
      },
      resolution:
        "Renew the certificate using the **same Apple ID** that created it. If that account is unavailable, a new certificate must be created and every Apple device must be re-enrolled by hand — there is no remote path back."
    }
  ],

  quiz: [
    {
      question:
        "Contoso must deploy iPads that run a single application in kiosk mode and from which users cannot remove management. Which enrollment method is required?",
      options: [
        "Automated Device Enrollment through Apple Business Manager",
        "Personal device enrollment using the Company Portal",
        "Account driven user enrollment with a managed Apple Account",
        "Apple Configurator with manual pairing"
      ],
      correctIndex: 0,
      rationale:
        "Single-app mode and a non-removable management profile both require supervision, and supervision comes only from Automated Device Enrollment or Apple Configurator. Neither personal enrollment path can supervise a device.",
      examTip:
        "Map the requirement to supervision first. Kiosk mode, locked enrollment and application allow-lists all mean supervision, which means ADE.",
      skills: ["g1.t2.s3", "g1.t2.s5"]
    },
    {
      question:
        "Contoso bought 200 Samsung handsets from a high-street retailer and wants them to enrol automatically at first power-on with non-removable management. What should you tell them?",
      options: [
        "Knox Mobile Enrollment is unavailable because the devices were not bought through an enrolled reseller; use dedicated device enrollment with a QR code instead",
        "Register the IMEI numbers in the Knox portal manually to enable zero-touch",
        "Use Google Zero Touch, which works with any retail Android device",
        "Import the serial numbers as corporate device identifiers to enable zero-touch"
      ],
      correctIndex: 0,
      rationale:
        "Both Knox Mobile Enrollment and Google Zero Touch require devices to be registered by a participating reseller at the point of sale. Retail hardware cannot be added afterwards, so the practical path is factory reset plus QR code enrollment against a corporate enrollment profile.",
      examTip:
        "Corporate device identifiers mark ownership; they do not enable zero-touch. Only the reseller-registered programmes do that on Apple and Android.",
      skills: ["g1.t2.s6"]
    }
  ]
};
