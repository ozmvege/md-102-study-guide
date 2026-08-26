export default {
  id: "deployment-method-decision",
  moduleId: "m3",
  title: "Choose a provisioning method: Autopilot profiles or device preparation",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 30,

  scenario:
    "There are now two ways to provision a Windows device with Intune: classic Windows Autopilot deployment profiles, and the newer Windows Autopilot device preparation policies. They look similar in the portal and behave very differently. Two exam objectives are dedicated to choosing between them and to choosing among the deployment modes, so this lab is deliberately a decision lab — you build nothing, and you finish able to justify a choice in one sentence.",

  objectives: [
    "Choose between Autopilot deployment profiles and device preparation policies",
    "Choose among user-driven, pre-provisioning and self-deploying modes",
    "State the prerequisites each method imposes",
    "Predict which method a scenario is describing"
  ],

  keyConcepts: ["Autopilot deployment profile", "Device preparation policy", "User-driven", "Pre-provisioning", "Self-deploying", "Hardware hash"],

  skills: [
    { id: "g2.t1.s1", depth: "primary" },
    { id: "g2.t1.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: [],
    labs: ["windows-enrollment-paths"]
  },

  exercises: [
    {
      id: "e1",
      title: "Profiles or device preparation",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Compare the two provisioning models",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, open **Devices** > **Enrollment** > **Windows** and note that both appear side by side: **Deployment Profiles** and **Device preparation policies**.",
              nav: ["Devices", "Enrollment", "Windows"]
            },
            {
              text: "Read the comparison. The row that decides most real deployments is the first one.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Autopilot deployment profile", "Device preparation policy"],
                  rows: [
                    ["Device must be registered in advance", "**Yes** — a hardware hash must be uploaded before the device is switched on", "**No** — any device can be used"],
                    ["Identifies devices by", "Hardware hash held in the Autopilot service", "Membership of a device group at enrollment time"],
                    ["Device group", "Assigned automatically from the Autopilot registration", "You create it, and its **owner** must be the Intune Provisioning Client service principal"],
                    ["User assignment", "Profile assigned to a device group", "Policy assigned to a **user** group"],
                    ["Deployment modes", "User-driven, pre-provisioning, self-deploying", "User-driven only"],
                    ["Hybrid join support", "Yes, for user-driven", "No — Microsoft Entra join only"],
                    ["App installation during setup", "Enrollment Status Page blocks on apps you nominate", "Up to 10 apps and 10 scripts, tracked with clearer reporting"],
                    ["Best for", "Hardware from an OEM that registers devices for you", "Existing hardware, reused devices, or anything you cannot get a hash for"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Device preparation exists because collecting hardware hashes is the part of Autopilot that fails in practice — reused hardware, devices bought retail, machines already imaged. If a scenario stresses that devices are *not registered* or *cannot be registered*, it is describing device preparation. If it stresses that the OEM registers devices on Contoso's behalf, it is describing a classic deployment profile."
                }
              ]
            },
            {
              text: "Note the one prerequisite of device preparation people miss:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The device group you target with a device preparation policy must have **Intune Provisioning Client** added as a group **owner**. Without it, the service cannot add the device to the group during provisioning, and the deployment fails at a point that gives no useful clue. Lab 19 does this step explicitly."
                }
              ]
            }
          ],
          result: {
            text: "You can choose between the two provisioning models from a scenario.",
            verify: [
              { text: "You can state the one thing device preparation does not require." },
              { text: "You can name the service principal that must own the device group." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Choose a deployment mode",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Compare the three Autopilot modes",
          checkpoint: true,
          steps: [
            {
              text: "Deployment modes apply to classic Autopilot deployment profiles. Device preparation supports user-driven only.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "User-driven", "Pre-provisioning", "Self-deploying"],
                  rows: [
                    ["Who completes setup", "The end user", "IT or the OEM does the heavy part, the user finishes", "Nobody — no user interaction at all"],
                    ["User signs in during provisioning", "Yes", "Not for the technical phase", "No"],
                    ["Primary user assigned", "Yes", "Yes, when the user completes it", "**No**"],
                    ["Requires TPM 2.0 with attestation", "No", "Yes", "Yes"],
                    ["Join type", "Entra join or hybrid join", "Entra join or hybrid join", "Entra join only"],
                    ["Time the user waits", "Full provisioning", "Only the user phase", "Not applicable"],
                    ["Typical use", "Ship the device straight to the employee", "IT preloads apps, then ships a nearly ready device", "Kiosks, digital signage, shared meeting-room devices"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Self-deploying assigns **no primary user**. Every user-targeted policy and user-assigned application passes the device by, exactly as with bulk enrollment in lab 12. That is why it suits kiosks and why it is the wrong answer for a staff laptop, however attractive zero-touch sounds."
                }
              ]
            },
            {
              text: "Note the hardware requirement that rules two modes out:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Pre-provisioning and self-deploying both require **TPM 2.0 with device attestation**, because the device must prove its identity with no user present. Your Generation 2 virtual machines have a vTPM, but Hyper-V vTPM attestation against the Autopilot service is unreliable — lab 18 covers both modes as a walkthrough for that reason, while user-driven in lab 17 works fully."
                }
              ]
            },
            {
              text: "Test yourself against these scenarios before moving on:",
              parts: [
                {
                  kind: "table",
                  headers: ["Scenario", "Answer"],
                  rows: [
                    ["Laptops shipped from the OEM directly to home workers", "Autopilot deployment profile, user-driven"],
                    ["Meeting room displays that must never show a sign-in prompt", "Autopilot deployment profile, self-deploying"],
                    ["IT wants to preload a 4 GB application before shipping", "Autopilot deployment profile, pre-provisioning"],
                    ["200 reused laptops with no hardware hashes available", "Device preparation policy"],
                    ["New devices that must be hybrid Entra joined", "Autopilot deployment profile, user-driven"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can pick a deployment mode and justify it in one sentence.",
            verify: [
              { text: "You can name the mode that assigns no primary user." },
              { text: "You can name the two modes that require TPM attestation." },
              { text: "You can name the only mode that supports hybrid join under device preparation." }
            ]
          }
        }
      ]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso has 200 laptops returned from a closed office. They were previously domain joined, no hardware hashes were ever collected, and the vendor is out of business. They must be redeployed as Microsoft Entra joined, Intune managed devices. What should you use?",
      options: [
        "A Windows Autopilot device preparation policy",
        "A Windows Autopilot deployment profile in user-driven mode",
        "A Windows Autopilot deployment profile in self-deploying mode",
        "A bulk enrollment provisioning package"
      ],
      correctIndex: 0,
      rationale:
        "Device preparation does not require devices to be registered in advance, which is exactly the constraint here. Every classic Autopilot mode depends on a hardware hash being uploaded before the device is switched on.",
      examTip:
        "No hardware hash, or hardware that cannot be registered, always points at device preparation. It is the answer to the problem that made classic Autopilot painful.",
      skills: ["g2.t1.s1"]
    },
    {
      id: "q2",
      question:
        "Which Autopilot deployment mode should be used for shared meeting-room devices that must provision with no user interaction and no assigned user?",
      options: [
        "Self-deploying",
        "User-driven",
        "Pre-provisioning",
        "Device preparation"
      ],
      correctIndex: 0,
      rationale:
        "Self-deploying mode provisions with no user present and assigns no primary user, which is what shared and kiosk hardware needs. It requires TPM 2.0 with attestation and supports Microsoft Entra join only.",
      examTip:
        "*No user interaction* plus *shared device* is the self-deploying signature. Remember it assigns no primary user, so only device-targeted assignments will ever reach it.",
      skills: ["g2.t1.s2"]
    }
  ]
};
