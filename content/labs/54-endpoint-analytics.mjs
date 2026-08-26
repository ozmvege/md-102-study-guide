export default {
  id: "endpoint-analytics",
  moduleId: "m10",
  title: "Endpoint Analytics: startup, reliability and user experience",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Compliance tells you whether a device meets policy. It says nothing about whether the device is any good to use. Endpoint Analytics measures the experience — how long a device takes to become usable after a restart, which applications crash, which hardware is failing — and turns *the laptops are slow* into a number you can act on and defend to a budget holder.",

  objectives: [
    "Enable Endpoint Analytics and understand its data source",
    "Interpret the Endpoint analytics score and its components",
    "Analyse startup performance and identify what is slowing boot",
    "Read application reliability and resource performance",
    "Explain what Advanced Analytics adds and what it costs"
  ],

  keyConcepts: ["Endpoint analytics score", "Startup performance", "Boot and sign-in phases", "Application reliability", "Work from anywhere", "Advanced Analytics"],

  skills: [
    { id: "g5.t2.s2", depth: "primary" },
    { id: "g5.t2.s4", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["proactive-remediations"]
  },

  exercises: [
    {
      id: "e1",
      title: "Enable and interpret",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Turn on Endpoint Analytics",
          checkpoint: true,
          steps: [
            {
              text: "Select **Reports**, then **Endpoint analytics**, then **Settings**.",
              nav: ["Reports", "Endpoint analytics", "Settings"]
            },
            {
              text: "Configure data collection:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Intune data collection policy", value: "All devices, or a pilot group" },
                    { label: "Baseline", value: "All organizations (median)", note: "Compares you against the median of all tenants. You can also baseline against your own past scores." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Endpoint Analytics needs Windows diagnostic data at the **Required** level as a minimum, and **Optional** for the fullest signal. If your configuration profiles set diagnostic data to Off — which a hardening baseline might — Endpoint Analytics reports nothing and looks broken. Check that first if data never appears."
                }
              ]
            },
            {
              text: "Wait for data. This is not instantaneous.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Devices need to restart and be used before there is anything to measure, and the first score typically appears after a few days. In this lab you may see partial data or none — the interpretation below matters more than the numbers your two virtual machines produce."
                }
              ]
            }
          ],
          result: {
            text: "Endpoint Analytics is collecting data from your devices.",
            verify: [
              { text: "The data collection policy is enabled." },
              { text: "You can name the diagnostic data level required." }
            ]
          }
        },
        {
          id: "t2",
          title: "Interpret the score",
          checkpoint: true,
          steps: [
            {
              text: "Open the **Overview** and read the score's structure:",
              parts: [
                {
                  kind: "table",
                  headers: ["Component", "Measures", "Improved by"],
                  rows: [
                    ["**Startup performance**", "Time from power-on to a usable desktop", "Faster storage, fewer startup applications, fewer Group Policy objects"],
                    ["**Application reliability**", "How often applications crash or stop responding", "Updating or replacing the offending applications"],
                    ["**Work from anywhere**", "Cloud identity, cloud management, cloud provisioning and Windows 11 readiness", "Entra join rather than hybrid, Autopilot, Windows 11"],
                    ["**Resource performance**", "CPU and memory pressure relative to the hardware", "Hardware refresh, or reducing what runs at startup"],
                    ["**Battery health**", "Battery capacity and runtime on portable devices", "Battery or device replacement"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Work from anywhere** is the one you can improve with configuration rather than money, and it is largely a scorecard for the work in modules 2 and 3. Entra joined beats hybrid, Autopilot beats manual provisioning, and Windows 11 beats Windows 10. If a scenario asks how to raise the score without buying hardware, this is the component to point at."
                }
              ]
            },
            {
              text: "Note where proactive remediations appear:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The remediations you built in lab 53 live under **Reports** > **Endpoint analytics** > **Remediations**. They are considered part of Endpoint Analytics because their purpose is improving the measured experience — detect a condition that degrades it, and fix it automatically."
                }
              ]
            }
          ],
          result: {
            text: "You can explain each score component and what improves it.",
            verify: [
              { text: "You can name the component improved by configuration rather than hardware." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Diagnose a slow device",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Read startup performance",
          checkpoint: true,
          steps: [
            {
              text: "Select **Reports** > **Endpoint analytics** > **Startup performance**, then the **Device performance** tab.",
              nav: ["Reports", "Endpoint analytics", "Startup performance", "Device performance"],
              parts: [
                {
                  kind: "table",
                  headers: ["Metric", "Meaning"],
                  rows: [
                    ["Boot score", "Time from power-on to the sign-in screen"],
                    ["Sign-in score", "Time from credentials entered to a responsive desktop"],
                    ["Group policy time", "How much of sign-in was spent processing policy"],
                    ["Total startup time", "Boot plus sign-in — what the user actually experiences"],
                    ["Restart frequency", "How often the device restarts, and why"]
                  ]
                }
              ]
            },
            {
              text: "Open the **Startup processes** tab.",
              parts: [
                {
                  kind: "verify",
                  text: "Processes are ranked by their contribution to startup time across the estate. This is the actionable list — it names the software that is costing every user thirty seconds a morning."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This report turns a vague complaint into a business case. *Devices are slow* is arguable; *this agent adds 40 seconds to every sign-in across 200 devices, which is 2.2 hours a day* is not. That framing is what gets the offending software removed."
                }
              ]
            },
            {
              text: "Check **Application reliability** and **Resource performance**.",
              nav: ["Reports", "Endpoint analytics", "Application reliability"],
              parts: [
                {
                  kind: "verify",
                  text: "Applications are ranked by crashes per device. Resource performance shows CPU and memory pressure, distinguishing an under-specified machine from one running something pathological."
                }
              ]
            },
            {
              text: "Note what Advanced Analytics adds, and what it costs:",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "Intune Plan 1", "Advanced Analytics"],
                  rows: [
                    ["Endpoint analytics score and components", "Yes", "Yes"],
                    ["Startup, reliability and resource performance", "Yes", "Yes"],
                    ["Proactive remediations", "Yes", "Yes"],
                    ["**Anomaly detection**", "No", "Yes — surfaces devices behaving unlike their peers"],
                    ["**Device timeline**", "No", "Yes — an event history per device for root-cause analysis"],
                    ["**Multi-device query**", "No", "Yes — the KQL from lab 51 across many devices at once"],
                    ["**Enhanced device scopes and reporting**", "No", "Yes"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The exam still draws this line between Plan 1 and Advanced Analytics, so learn the boundary — but note that **Microsoft 365 E5 has included Advanced Analytics since July 2026**, so you hold both sides of this table. Lab 59 uses anomaly detection, the device timeline and multi-device query for real. The exam objective for Advanced Analytics names anomaly detection, proactive insights and risk-based recommendations specifically."
                }
              ]
            }
          ],
          result: {
            text: "You can identify what is degrading experience on a device and quantify it.",
            verify: [
              { text: "You located the startup processes ranking." },
              { text: "You can name three capabilities that require Advanced Analytics." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Endpoint Analytics shows no data after several days.",
      rootCause:
        "Windows diagnostic data is set below the required level, the data collection policy does not target the devices, or the devices have not restarted since it was enabled.",
      diagnostic: {
        lang: "powershell",
        code: "Get-ItemProperty \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection\" -ErrorAction SilentlyContinue |\n    Select-Object AllowTelemetry"
      },
      resolution:
        "`AllowTelemetry` must be at least `1` (Required); `3` (Optional) gives the fullest signal. A hardening profile that sets it to `0` silently disables Endpoint Analytics — this is a genuine trade-off between telemetry minimisation and operational visibility."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Contoso wants to improve its Endpoint analytics score without purchasing new hardware. Which score component is most improvable through configuration?",
      options: [
        "Work from anywhere",
        "Battery health",
        "Resource performance",
        "Application reliability"
      ],
      correctIndex: 0,
      rationale:
        "Work from anywhere measures cloud identity, cloud management, cloud provisioning and Windows 11 readiness — all of which are configuration and deployment choices. Battery health and resource performance are largely hardware, and application reliability depends on the software itself.",
      examTip:
        "Work from anywhere is effectively a scorecard for how modern your deployment is. Entra join, Autopilot and Windows 11 all raise it directly.",
      skills: ["g5.t2.s4"]
    },
    {
      id: "q2",
      question:
        "Which Endpoint Analytics capability requires Intune Advanced Analytics rather than Plan 1?",
      options: [
        "Anomaly detection and the device timeline",
        "Startup performance scores",
        "Proactive remediations",
        "Application reliability reporting"
      ],
      correctIndex: 0,
      rationale:
        "Anomaly detection, the per-device timeline and multi-device query belong to Advanced Analytics. The core score, startup performance, application reliability and proactive remediations are Plan 1 capabilities.",
      examTip:
        "The exam objective for Advanced Analytics names anomaly detection, proactive insights and risk-based policy recommendations — those three phrases are the tell. The plan boundary is still examined even though Microsoft 365 E5 now grants both sides of it.",
      skills: ["g5.t2.s2"]
    }
  ]
};
