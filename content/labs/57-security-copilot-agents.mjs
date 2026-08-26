export default {
  id: "security-copilot-agents",
  moduleId: "m10",
  title: "Security Copilot agents in Intune",
  access: "walkthrough-license",
  accessReason:
    "Microsoft Security Copilot *is* now included with Microsoft 365 E5 — that changed in the April to June 2026 rollout, and study material written before then says otherwise. The catch is how the capacity is granted: 400 Security Compute Units per month for every 1,000 **paid** E5 seats, capped at 10,000. A 25-seat trial is not a paid allocation of that size, so a trial tenant receives no usable SCU grant and the agents cannot actually be run here. The objectives were added in the July 2026 outline revision, so this lab covers what the agents do, what they produce and how you are expected to act on their output.",
  difficulty: "intermediate",
  estimatedMinutes: 30,

  scenario:
    "The newest exam domain includes three objectives about Security Copilot agents in Intune: investigating threats they identify, analysing device performance with them, and reviewing and responding to their recommendations. The framing throughout is that the agent proposes and the administrator decides — which is exactly what the exam tests.",

  objectives: [
    "Describe what Security Copilot agents in Intune do and what they require",
    "Explain how an agent-identified threat is investigated",
    "Describe agent-driven device performance analysis",
    "State the correct posture towards an agent recommendation"
  ],

  keyConcepts: ["Security Copilot", "Security Compute Units", "Agent recommendations", "Human in the loop", "Prompt evidence", "Vulnerability remediation agent"],

  skills: [
    { id: "g5.t1.s2", depth: "primary" },
    { id: "g5.t1.s3", depth: "primary" },
    { id: "g5.t1.s4", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "SECURITY-COPILOT"],
    roles: ["Intune Administrator", "Security Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-security"],
    labs: ["defender-for-endpoint", "endpoint-analytics"]
  },

  exercises: [
    {
      id: "e1",
      title: "What the agents are",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Understand the requirements and the model",
          checkpoint: true,
          steps: [
            {
              text: "Security Copilot is a separate product that surfaces inside Intune, not a feature of Intune.",
              parts: [
                {
                  kind: "table",
                  headers: ["Requirement", "Detail"],
                  rows: [
                    ["Licence", "Microsoft Security Copilot, billed by provisioned **Security Compute Units** — hourly, not per user"],
                    ["Not included in", "Microsoft 365 E5, Intune Plan 2, or the Intune Suite"],
                    ["Data sources", "Intune, Defender for Endpoint, Defender XDR, Entra ID"],
                    ["Where it appears", "Embedded in the Intune admin center, and in the standalone Security Copilot portal"],
                    ["Permissions", "The agent acts within the permissions of the administrator using it"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The agent operates inside **your** permissions. It cannot see or do anything the signed-in administrator could not — so an operator scoped by scope tags gets agent output scoped the same way. This matters for the exam: agents do not bypass RBAC, and delegating to an agent does not delegate authority."
                }
              ]
            },
            {
              text: "Note the recurring design principle across all three exam objectives:",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Every objective is phrased around the administrator retaining the decision — *investigate* threats identified, *analyse* performance, *review and respond to* recommendations. The agent surfaces, correlates and proposes. It does not act. Any exam answer implying an agent autonomously changes configuration is wrong, and any answer implying you should apply a recommendation without evaluating it is also wrong."
                }
              ]
            }
          ],
          result: {
            text: "You can state what Security Copilot requires and where the decision authority sits.",
            verify: [
              { text: "You can name the billing unit." },
              { text: "You can state whether an agent can exceed the administrator's permissions." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "The three objectives",
      estimatedMinutes: 18,
      tasks: [
        {
          id: "t1",
          title: "Investigate threats identified by an agent",
          steps: [
            {
              text: "The value is correlation. An agent joins signals that sit in separate portals and would otherwise be separate investigations.",
              parts: [
                {
                  kind: "table",
                  headers: ["Step", "What happens"],
                  rows: [
                    ["Surface", "The agent flags a device or pattern — an unusual configuration change, a device deviating from its peers, a policy weakening protection"],
                    ["Explain", "It produces a natural-language summary of what it found and why it considers it significant"],
                    ["Evidence", "It links the underlying data — the device, the policy, the Defender alert, the sign-in"],
                    ["**Verify**", "**You** follow the evidence and confirm it independently"],
                    ["Act", "You take the action, using the ordinary Intune and Defender controls from earlier modules"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Always follow the evidence links rather than accepting the summary. The summary is a hypothesis built from correlated data; the evidence is the data. An investigation that stops at the summary is an investigation you cannot defend."
                }
              ]
            }
          ],
          result: {
            text: "You can describe the investigation flow and where verification sits in it.",
            verify: [{ text: "You can name the step that remains the administrator's." }]
          }
        },
        {
          id: "t2",
          title: "Analyse device performance and respond to recommendations",
          checkpoint: true,
          steps: [
            {
              text: "For performance, the agent works over the Endpoint Analytics data from lab 54:",
              parts: [
                {
                  kind: "table",
                  headers: ["Question you ask", "What the agent does"],
                  rows: [
                    ["Why is this device slow?", "Correlates startup, resource, reliability and configuration data into one explanation"],
                    ["Which devices are degrading?", "Identifies devices trending worse against their own history or their peers"],
                    ["What would improve the score most?", "Ranks contributing factors by measured impact"],
                    ["Is this device unusual?", "Compares against similar devices to separate a fault from normal variation"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This is the same data you read manually in lab 54. The agent's contribution is the correlation and the ranking — turning several reports you would read separately into one prioritised answer. Knowing that the underlying data is Endpoint Analytics is worth more than knowing the prompt."
                }
              ]
            },
            {
              text: "For recommendations, adopt this posture:",
              parts: [
                {
                  kind: "table",
                  headers: ["Step", "What you do"],
                  rows: [
                    ["Read the reasoning", "Understand *why* the change is proposed, not just what it is"],
                    ["Check the evidence", "Follow the links and confirm the data supports the conclusion"],
                    ["Assess the impact", "Which devices and users does this affect, and what could it break?"],
                    ["**Pilot**", "Apply to a pilot group first, exactly as with any other change"],
                    ["Verify", "Confirm the intended effect and the absence of unintended ones"],
                    ["Record", "Note why the change was made, so it is explicable in six months"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "An agent recommendation is a well-informed suggestion from something that cannot see your business context. It does not know that one policy exists because of a regulator, or that a machine behaves oddly because it drives a laboratory instrument. Treat it exactly as you would a recommendation from a competent colleague who has read all your telemetry and none of your history."
                }
              ]
            },
            {
              text: "Note the related capability the exam may reference:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Microsoft also ships more specialised agents in this family, such as a vulnerability remediation agent that proposes fixes for findings from Defender Vulnerability Management. The same principle governs all of them: the agent proposes a change and an administrator approves it."
                }
              ]
            }
          ],
          result: {
            text: "You can describe agent-driven performance analysis and the correct response to a recommendation.",
            verify: [
              { text: "You can name the data source behind performance analysis." },
              { text: "You can list the steps before applying a recommendation." }
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
        "A Security Copilot agent in Intune recommends tightening a configuration policy across all devices. What is the appropriate response?",
      options: [
        "Review the reasoning and evidence, assess the impact, then pilot the change before deploying it broadly",
        "Apply the recommendation immediately, since it is based on tenant telemetry",
        "Dismiss it, because agent recommendations are advisory only",
        "Forward it to Microsoft support for validation"
      ],
      correctIndex: 0,
      rationale:
        "Agents surface and propose; administrators decide. A recommendation is evaluated on its reasoning and evidence, assessed for impact, and then piloted like any other change — the agent has no knowledge of business context, regulatory constraints or local exceptions.",
      examTip:
        "Every Security Copilot objective is phrased around the administrator retaining the decision. Answers describing autonomous action, or uncritical application, are both wrong.",
      skills: ["g5.t1.s4"]
    },
    {
      id: "q2",
      question:
        "What licensing is required to use Security Copilot agents in Intune?",
      options: [
        "Microsoft Security Copilot, billed by provisioned Security Compute Units, purchased separately",
        "Microsoft 365 E5, which includes Security Copilot",
        "Microsoft Intune Suite",
        "Microsoft Defender for Endpoint Plan 2"
      ],
      correctIndex: 0,
      rationale:
        "Security Copilot is a separate product billed by provisioned Security Compute Units on an hourly basis. It is not included in Microsoft 365 E5, the Intune Suite, or Defender for Endpoint.",
      examTip:
        "SCU-based hourly billing rather than per-user licensing is the distinguishing detail, and it is why Security Copilot cannot be trialled from inside a tenant the way Intune add-ons can.",
      skills: ["g5.t1.s2", "g5.t1.s3"]
    }
  ]
};
