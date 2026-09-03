export default {
  id: "autopatch-and-hotpatch",
  moduleId: "m8",
  title: "Windows Autopatch, expedited updates and Hotpatch",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 50,

  scenario:
    "Update rings are yours to run. Windows Autopatch hands the running of them to Microsoft: it builds the rings, staggers the deployment, watches the telemetry and halts a rollout that is going wrong. It is included in Microsoft 365 E5, which surprises people. Alongside it, expedited updates push a zero-day fix past every deferral, and Hotpatch applies security updates without a restart at all.",

  objectives: [
    "Register devices with Windows Autopatch and explain its prerequisites",
    "Describe Autopatch groups and how they differ from update rings",
    "Deploy an expedited quality update",
    "Explain Hotpatch and its requirements",
    "Choose between managing rings yourself and delegating to Autopatch"
  ],

  keyConcepts: ["Windows Autopatch", "Autopatch groups", "Device registration", "Expedited quality update", "Hotpatch", "Baseline quality update"],

  skills: [
    { id: "g3.t2.s3", depth: "primary" },
    { id: "g3.t2.s2", depth: "partial" }
  ],

  requires: {
    licenses: ["M365-E5", "AUTOPATCH"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "pilot.user02"],
    labs: ["update-rings"]
  },

  exercises: [
    {
      id: "e1",
      title: "Windows Autopatch",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Check prerequisites and register devices",
          checkpoint: true,
          steps: [
            {
              text: "Confirm your entitlement first. Autopatch is included with **Windows 10/11 Enterprise E3 or E5**, which Microsoft 365 E5 contains.",
              parts: [
                {
                  kind: "table",
                  headers: ["Prerequisite", "Requirement"],
                  rows: [
                    ["Licence", "Windows Enterprise E3 or E5, or Microsoft 365 E3/E5/F3, or Business Premium"],
                    ["Identity", "Microsoft Entra ID P1 or P2"],
                    ["Management", "Intune must be the MDM authority; devices must already be enrolled"],
                    ["Ownership", "Devices must be **corporate-owned**. BYOD is blocked at registration."],
                    ["Recent activity", "Devices must have communicated with Intune in the last 28 days"],
                    ["Diagnostic data", "Required level as a minimum; Optional for Windows 11 to get the full deployment protections"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Corporate-owned** is the prerequisite that catches lab tenants. A device enrolled by hand through Settings defaults to Personal ownership, and Autopatch refuses it. Lab 11 changed `MD102-VM2-Alex` to Corporate; Autopilot devices are Corporate automatically. Check ownership before assuming registration is broken."
                }
              ]
            },
            {
              text: "Select **Devices**, **Windows updates**, then under the **Windows Autopatch** section, select **Devices**.",
              nav: ["Devices", "Windows updates", "Windows Autopatch", "Devices"]
            },
            {
              text: "Register devices by adding a group under **Device registration**, using `GRP-DEV-WIN-CORP`.",
              parts: [
                {
                  kind: "verify",
                  text: "Devices move through **Registration pending** to **Registered**. Any that fail appear under **Not registered** with a reason — most commonly ownership or the 28-day activity requirement."
                }
              ]
            }
          ],
          result: {
            text: "Corporate devices are registered with Windows Autopatch.",
            verify: [
              { text: "At least one device shows as **Registered**." },
              { text: "You can name the ownership requirement." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand Autopatch groups",
          checkpoint: true,
          steps: [
            {
              text: "Under **Devices** > **Windows updates** > **Windows Autopatch**, select **Autopatch groups** and review the default group.",
              nav: ["Devices", "Windows updates", "Windows Autopatch", "Autopatch groups"],
              parts: [
                {
                  kind: "table",
                  headers: ["Deployment ring", "Share of devices", "Purpose"],
                  rows: [
                    ["Test", "A handful you nominate", "Validation before anything else sees it"],
                    ["First", "~1%", "Earliest real users"],
                    ["Fast", "~9%", "Broader validation"],
                    ["Broad", "~90%", "Everyone else"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Autopatch distributes registered devices across these rings automatically and staggers deployment between them. The difference from lab 46 is who watches: Autopatch monitors deployment health and will **halt a rollout automatically** if failure rates exceed its thresholds. With your own update rings, that judgement is yours to make and yours to miss."
                }
              ]
            },
            {
              text: "Compare the two approaches so you can justify a choice:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Your own update rings", "Windows Autopatch"],
                  rows: [
                    ["Ring design", "You define groups and deferrals", "Managed for you, customisable"],
                    ["Deployment cadence", "Your deferrals", "Progressive rollout across rings"],
                    ["Health monitoring", "You watch reports", "**Automatic, with rollout halting**"],
                    ["Effort", "Ongoing", "Registration, then largely hands-off"],
                    ["Control", "Complete", "Delegated within Autopatch's model"],
                    ["Best for", "Specific regulatory or timing requirements", "Most organisations"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can explain Autopatch groups and justify choosing Autopatch over self-managed rings.",
            verify: [
              { text: "You can name the four default deployment rings." },
              { text: "You can state the capability Autopatch adds that self-managed rings lack." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Expedited updates and Hotpatch",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Deploy an expedited quality update",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Windows updates**, then **Quality updates**, then **Create profile**.",
              nav: ["Devices", "Windows updates", "Quality updates", "Create profile"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "EXP-ZeroDay-Response" },
                    { label: "Select a security update to expedite", value: "The most recent cumulative update offered" },
                    { label: "Number of days after the update is installed to restart", value: "1", note: "0 forces an immediate restart, 1 gives the user a day, 2 is the maximum." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "An expedited update **overrides every deferral, deadline and pause** in the device's update ring. That is the entire point — it exists for the day a zero-day is being actively exploited and the normal ring cadence is too slow. It is not a routine tool; using it routinely destroys the staged validation your rings exist to provide."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-PILOT` and create the profile.",
              parts: [
                {
                  kind: "verify",
                  text: "The profile appears under **Quality updates** with a device status view showing progress per device."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Expedited updates are delivered through a separate faster channel that bypasses the normal scan cycle, so a device can install one within hours rather than waiting for its next check. This mechanism is why the override works."
                }
              ]
            }
          ],
          result: {
            text: "A security update can be pushed past every ring control.",
            verify: [
              { text: "An expedited update profile exists and is assigned." },
              { text: "You can state what an expedited update overrides." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand Hotpatch",
          checkpoint: true,
          steps: [
            {
              text: "Hotpatch applies security updates to running processes in memory, so no restart is needed.",
              parts: [
                {
                  kind: "table",
                  headers: ["Requirement", "Detail"],
                  rows: [
                    ["Edition", "Windows 11 Enterprise or Education"],
                    ["Version", "24H2 or later on supported hardware"],
                    ["Management", "Windows Autopatch, with the device registered"],
                    ["Cadence", "Quarterly baseline updates that **do** require a restart, with hotpatch updates in the intervening months that do not"],
                    ["Fallback", "A device that cannot hotpatch receives the normal cumulative update instead"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The cadence is the examinable part. Hotpatch does not eliminate restarts — it reduces them from twelve a year to four. Every quarter a **baseline** update establishes a new starting point and requires a restart; the two months following it are hotpatched in memory. A scenario describing eight restart-free months a year is describing Hotpatch."
                }
              ]
            },
            {
              text: "Where it is configured: navigate to **Devices** > **Windows updates**, select the **Quality updates** tab, then select **Create profile**.",
              nav: ["Devices", "Windows updates", "Quality updates", "Create profile"],
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Policy type", value: "Windows quality update policy" },
                    { label: "When available, apply without restarting the device (hotpatch)", value: "Allow" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Your lab virtual machines will very likely not qualify — hotpatch has specific edition, build and hardware requirements. Configure the policy so you have seen where the setting lives, and expect the devices to fall back to normal cumulative updates."
                }
              ]
            }
          ],
          result: {
            text: "You can state Hotpatch's requirements and its restart cadence.",
            verify: [
              { text: "You can explain how many restarts a hotpatched device needs per year and why." },
              { text: "You can name the management prerequisite for Hotpatch." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Devices fail Windows Autopatch registration and appear under Not registered.",
      rootCause:
        "Most commonly the device is marked as Personal rather than Corporate, or it has not communicated with Intune in the last 28 days. Both are hard prerequisites.",
      diagnostic: {
        lang: "text",
        code: "Devices > Windows updates > Devices > Not registered\nRead the reason column, then check Devices > All devices > the device > Ownership."
      },
      resolution:
        "Change ownership to Corporate, or import the serial number under **Corporate device identifiers** before enrollment. Confirm the device has checked in recently — a device that has been off for a month cannot register until it does."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A critical security update must reach all devices today, but your update rings have deferrals of 3 and 7 days and one ring is paused. What should you use?",
      options: [
        "An expedited quality update, which overrides deferrals, deadlines and pauses",
        "Reduce the deferral on both rings to 0 days",
        "Resume the paused ring and force a device sync",
        "Create a new update ring with no deferral and reassign all devices"
      ],
      correctIndex: 0,
      rationale:
        "Expedited quality updates are delivered through a separate accelerated channel that overrides deferrals, deadlines and pauses. Every other option is slower and leaves the paused ring's devices unprotected.",
      examTip:
        "Expedited is the emergency control and should stay exceptional. Reserve it for actively exploited vulnerabilities, not for impatience.",
      skills: ["g3.t2.s2"]
    },
    {
      id: "q2",
      question:
        "Which statement about Windows Hotpatch is correct?",
      options: [
        "Quarterly baseline updates require a restart; the two months following each baseline are patched without one",
        "All security updates are applied without a restart, eliminating them entirely",
        "It requires Windows 11 Pro and any Intune update ring",
        "It applies to feature updates as well as quality updates"
      ],
      correctIndex: 0,
      rationale:
        "Hotpatch reduces restarts from monthly to quarterly. Each quarter a baseline update establishes a new starting point and needs a restart; the intervening two months are hotpatched in memory. It requires Enterprise or Education editions and Windows Autopatch.",
      examTip:
        "The quarterly baseline is the detail that distinguishes a correct answer from a plausible one. Hotpatch reduces restarts, it does not remove them.",
      skills: ["g3.t2.s3"]
    }
  ]
};
