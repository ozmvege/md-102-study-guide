export default {
  id: "tenant-health-and-alerts",
  moduleId: "m10",
  title: "Tenant health, service communications and alert rules",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Two hundred enrollments failed overnight. You need to know whether that is your configuration or a Microsoft outage, and you need to have known about it before the help desk did. Tenant status carries service health and the message center; alert rules push notifications when something drifts. Both exist, both are off by default, and almost nobody configures them until after the first bad morning.",

  objectives: [
    "Read tenant status, service health and the message center",
    "Establish an operational baseline you can compare against",
    "Configure alert rules for compliance drift and enrollment failures",
    "Route notifications to the right people",
    "Distinguish a service incident from a configuration problem"
  ],

  keyConcepts: ["Tenant status", "Service health", "Message center", "Alert rules", "Notification recipients", "Operational baseline"],

  skills: [
    { id: "g5.t2.s5", depth: "primary" },
    { id: "g5.t2.s6", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-intune", "helpdesk.operator"],
    labs: ["intune-reporting"]
  },

  exercises: [
    {
      id: "e1",
      title: "Tenant health and service communications",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Record an operational baseline",
          checkpoint: true,
          steps: [
            {
              text: "Select **Tenant administration**, then **Tenant status**.",
              nav: ["Tenant administration", "Tenant status"]
            },
            {
              text: "Record today's values. These are your baseline — the numbers that make an anomaly obvious later.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Total licensed users", value: "Record the number" },
                    { label: "Total Intune licenses", value: "Record the number" },
                    { label: "Total enrolled devices", value: "Record the number" },
                    { label: "MDM authority", value: "Microsoft Intune" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "An operational baseline is the examinable idea here, and it is genuinely useful. *Fifteen enrollment failures today* means nothing on its own. *Fifteen, when the normal figure is two* is an incident. Without a recorded baseline every number is unfalsifiable, and you end up either ignoring real problems or chasing normal variation."
                }
              ]
            },
            {
              text: "Select the **Service health and message center** tab.",
              parts: [
                {
                  kind: "table",
                  headers: ["Section", "Tells you"],
                  rows: [
                    ["Service health", "Whether Intune itself is degraded right now, and which capability is affected"],
                    ["Message center", "Upcoming changes, deprecations and required actions, usually with a deadline"],
                    ["Connector status", "Whether Defender, Managed Google Play or Apple integrations are failing"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Check service health **before** troubleshooting anything that broke suddenly and affects many devices. A service incident and a configuration mistake present identically from the help desk's side, and half an hour spent on a Microsoft outage is half an hour wasted."
                }
              ]
            },
            {
              text: "Read the message center and find one item with a required action.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Message center posts are how Microsoft announces breaking changes — a deprecated authentication method, a retired setting, an endpoint being removed. They carry deadlines. Nobody reading the message center is a slow-motion outage, and it is why the alert rules in the next exercise are worth configuring."
                }
              ]
            }
          ],
          result: {
            text: "You have a recorded baseline and know where service communications live.",
            verify: [
              { text: "You recorded device and licence counts with today's date." },
              { text: "You can explain why a baseline makes an anomaly detectable." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Alert rules",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create alert rules",
          checkpoint: true,
          steps: [
            {
              text: "Select **Tenant administration**, then **Alerts**, then **Alert rules**.",
              nav: ["Tenant administration", "Alerts", "Alert rules"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Several rules exist by default and are **disabled**. They will not notify anyone until you enable them and add recipients — which is why the first anyone hears about a problem is usually a user."
                }
              ]
            },
            {
              text: "Enable and configure the rules that matter:",
              parts: [
                {
                  kind: "table",
                  headers: ["Alert rule", "Fires when", "Why it matters"],
                  rows: [
                    ["Device enrollment failure", "Enrollment failures exceed a threshold", "Catches a broken restriction or an expired token before the help desk does"],
                    ["Apple MDM push certificate expiry", "The certificate is approaching expiry", "Prevents the whole-Apple-estate failure from lab 14"],
                    ["Apple VPP token expiry", "The token is approaching expiry", "Same category of failure"],
                    ["Managed Google Play app sync failure", "Android app synchronisation fails", "Android app deployment stops silently otherwise"],
                    ["Device compliance drift", "Compliant devices become non-compliant above a threshold", "A policy change that broke compliance shows up immediately"],
                    ["Configuration policy conflict", "Profiles conflict on devices", "Catches the silent conflicts from lab 22"]
                  ]
                }
              ]
            },
            {
              text: "Open the enrollment failure rule and configure it:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Status", value: "Enabled" },
                    { label: "Condition threshold", value: "Set above your recorded baseline", note: "Set from the baseline, not from a round number. A threshold below normal variation trains people to ignore the alert." },
                    { label: "Severity", value: "Critical" },
                    { label: "Email notification", value: "Enabled" },
                    { label: "Notification recipients", value: "admin-intune, helpdesk.operator" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Set the threshold from your baseline. A rule that fires on normal variation gets muted within a week, and a muted rule is worse than no rule because everyone believes it is watching. This is the practical reason the baseline exercise came first."
                }
              ]
            },
            {
              text: "Repeat for the compliance drift rule, then configure notification recipients under **Alerts** > **Notifications**.",
              nav: ["Tenant administration", "Alerts", "Notifications"],
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Send certificate and token expiry alerts to a shared mailbox or distribution list, never to one person's address. Those alerts fire once a year and the failure mode is that the only recipient has left the organisation — which is exactly how an Apple estate falls out of management."
                }
              ]
            },
            {
              text: "Confirm the rules are active under **Alerts** > **Active alerts**.",
              parts: [
                {
                  kind: "verify",
                  text: "Your enabled rules are listed with their thresholds and recipients."
                }
              ]
            }
          ],
          result: {
            text: "You will be told about drift, failures and expiries rather than discovering them.",
            verify: [
              { text: "At least two alert rules are enabled with recipients." },
              { text: "Thresholds are derived from your recorded baseline." },
              { text: "Expiry alerts go to a shared address, not an individual." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A large number of devices failed enrollment overnight and nothing in the configuration has changed.",
      rootCause: "Possibly a service incident rather than a configuration problem — or an expired certificate or token, which fails all at once by nature.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Tenant status > Service health and message center\nDevices > Enrollment > Apple > check push certificate and token expiry dates."
      },
      resolution:
        "Check service health before changing anything. If the service is healthy, check the certificate and token expiry dates — a simultaneous, estate-wide failure is far more often an expiry than a configuration error."
    }
  ],

  quiz: [
    {
      question:
        "Why should an alert rule threshold be based on a recorded operational baseline rather than an arbitrary number?",
      options: [
        "A threshold set below normal variation produces constant false alerts, which trains people to ignore the rule",
        "Intune requires a baseline before an alert rule can be enabled",
        "Baselines determine how long alert history is retained",
        "Alert rules cannot be created without historical reporting enabled"
      ],
      correctIndex: 0,
      rationale:
        "Alerting is only useful if firing means something. A threshold below normal variation fires constantly, gets muted, and leaves everyone believing they are monitored when they are not. The baseline is what makes a threshold meaningful.",
      examTip:
        "*Establishing operational baselines* is named in the exam objective alongside monitoring tenant health. The two go together for exactly this reason.",
      skills: ["g5.t2.s6"]
    },
    {
      question:
        "Every iOS and macOS device stops checking in on the same morning. Where should you look first?",
      options: [
        "Tenant status service health, and the Apple MDM push certificate expiry date",
        "The compliance policy assignments for Apple devices",
        "The Conditional Access sign-in logs",
        "The device configuration profile status for iOS"
      ],
      correctIndex: 0,
      rationale:
        "A simultaneous, platform-wide failure is characteristic of a service incident or an expired credential, not of a policy change. The Apple MDM push certificate expires annually and takes the whole Apple estate with it.",
      examTip:
        "Simultaneous and platform-wide points at infrastructure — service health, certificates and tokens. Gradual and partial points at policy.",
      skills: ["g5.t2.s5"]
    }
  ]
};
