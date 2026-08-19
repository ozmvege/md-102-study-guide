export default {
  id: "endpoint-privilege-management",
  moduleId: "m11",
  title: "Endpoint Privilege Management",
  access: "walkthrough-license",
  accessReason:
    "Endpoint Privilege Management is part of the Microsoft Intune Suite and is not included in Microsoft 365 E5. A free 90-day trial for up to 250 users can be started from Tenant administration > Intune add-ons if you decide you want to run it — the last exercise explains exactly when that is worth spending. Until then this lab covers the configuration surfaces, the elevation types and the decision criteria, all of which are examined.",
  difficulty: "advanced",
  estimatedMinutes: 40,

  scenario:
    "Autopilot correctly made every user a standard user in lab 17. Then the engineering team needed to install a driver, and the answer *raise a ticket every time* is not one anyone accepts for long. Endpoint Privilege Management lets a specific application run elevated for a specific user without that user being a local administrator — which is the only way to hold the line on least privilege in practice.",

  objectives: [
    "Explain what EPM solves and why local administrator rights are the alternative",
    "Describe the elevation settings policy and elevation rules policy",
    "Distinguish automatic, user-confirmed and support-approved elevation",
    "Interpret elevation reporting",
    "Decide when starting the Intune Suite trial is worthwhile"
  ],

  keyConcepts: ["Endpoint Privilege Management", "Elevation settings policy", "Elevation rules policy", "Automatic elevation", "User-confirmed", "Support approved", "Elevation report"],

  skills: [{ id: "g2.t3.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "INTUNE-SUITE"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["johanna.lorenz", "helpdesk.operator"],
    labs: ["whfb-laps-local-groups"]
  },

  exercises: [
    {
      id: "e1",
      title: "The problem and the two policies",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Understand what EPM replaces",
          steps: [
            {
              text: "Without EPM there are three options, and all of them are bad.",
              parts: [
                {
                  kind: "table",
                  headers: ["Approach", "Consequence"],
                  rows: [
                    ["Make users local administrators", "Any malware they run inherits full control of the device"],
                    ["Add them temporarily through a local group policy", "Nobody removes it; the estate drifts to fully privileged"],
                    ["Require a ticket for every elevation", "Help desk load, user frustration, and shadow workarounds"],
                    ["**Endpoint Privilege Management**", "One application elevates, for one user, under a rule you wrote, with an audit trail"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The key property is that elevation is scoped to the **application**, not to the user. A user granted elevation for a driver installer is not a local administrator and cannot elevate anything else. This is what makes least privilege survivable — it is the answer to the objection that standard users cannot get their work done."
                }
              ]
            },
            {
              text: "EPM is configured with two policies that must both exist:",
              parts: [
                {
                  kind: "table",
                  headers: ["Policy", "Controls", "Path"],
                  rows: [
                    ["**Elevation settings policy**", "Whether EPM is on, the default behaviour, and reporting scope", "Endpoint security > Endpoint Privilege Management > Policies"],
                    ["**Elevation rules policy**", "The individual rules: which file, validated how, elevated in what way", "The same blade, a different policy type"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Rules without a settings policy do nothing, because the client component is not enabled. This is the equivalent of the two-part LAPS configuration from lab 28 — a rules policy deploying successfully while nothing elevates is almost always a missing settings policy."
                }
              ]
            }
          ],
          result: {
            text: "You can explain what EPM solves and name both required policies.",
            verify: [
              { text: "You can state what elevation is scoped to." },
              { text: "You can name both policy types." }
            ]
          }
        },
        {
          id: "t2",
          title: "Learn the elevation types",
          checkpoint: true,
          steps: [
            {
              text: "The elevation settings policy sets a default behaviour and each rule can override it.",
              parts: [
                {
                  kind: "table",
                  headers: ["Elevation type", "User experience", "Use for"],
                  rows: [
                    ["**Automatic**", "The application elevates silently, with no prompt", "Trusted, signed, frequently needed applications — a known driver installer"],
                    ["**User confirmed**", "The user confirms, optionally re-authenticating or giving a business reason", "**The usual choice.** Deliberate, audited, no help desk involvement"],
                    ["**Support approved**", "The request goes to an approver and the user waits", "High-risk elevations that genuinely warrant a second person"],
                    ["**Deny**", "Elevation is refused outright", "Explicitly blocking something users keep trying to elevate"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**User confirmed** with a business-justification prompt is the default answer in most scenarios. It keeps the user working, creates a record of who elevated what and why, and adds no help desk load. **Automatic** removes the audit prompt and should be reserved for applications you have deliberately vetted. **Support approved** is the only type that involves another person, and it is examined as the answer for high-risk cases."
                }
              ]
            },
            {
              text: "Each rule identifies a file, and how strictly it is validated:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "File name", value: "The executable, for example `driverinstall.exe`" },
                    { label: "File path", value: "Optional, to constrain where it may run from" },
                    { label: "Signature source", value: "Publisher certificate, file hash, or both" },
                    { label: "Certificate file", value: "Uploaded to validate the publisher" },
                    { label: "File hash", value: "SHA-256 of the exact binary" },
                    { label: "Child process behaviour", value: "Allow all, require rule, deny all" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "**Child process behaviour** is the setting attackers care about. An installer permitted to elevate can spawn a command prompt, and if child processes inherit elevation, the user now has an elevated shell — full local administrator by another route. Set it to **Deny all** or **Require rule** unless the application genuinely needs to launch something else."
                }
              ]
            }
          ],
          result: {
            text: "You can choose an elevation type and describe how a rule identifies an application.",
            verify: [
              { text: "You can name the elevation type suited to most cases and say why." },
              { text: "You can explain the risk in allowing all child processes." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Reporting, and deciding on the trial",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Understand elevation reporting",
          steps: [
            {
              text: "Reporting lives under **Endpoint security** > **Endpoint Privilege Management** > **Reports**.",
              parts: [
                {
                  kind: "table",
                  headers: ["Report", "Answers"],
                  rows: [
                    ["Elevation report", "Every elevation: which file, which user, which device, which rule, when"],
                    ["**Managed elevations**", "Elevations that matched one of your rules — the intended path"],
                    ["**Unmanaged elevations**", "Elevations that happened outside your rules — **the interesting one**"],
                    ["Elevation requests", "Pending and completed support-approved requests"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Unmanaged elevations** is the report that drives the rollout. It shows what users are actually elevating that you have not written a rule for — which is your backlog of rules to write, and occasionally your evidence that someone still holds local administrator rights they should not."
                }
              ]
            },
            {
              text: "Note the recommended rollout, which mirrors the audit-first pattern from ASR and App Control:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Deploy the elevation settings policy with the default set to **Deny**, and reporting on." },
                    { text: "Collect unmanaged elevation data for a few weeks to learn what people genuinely need." },
                    { text: "Write rules for the legitimate cases, mostly user-confirmed." },
                    { text: "Remove local administrator rights, using the local group membership policy from lab 28." },
                    { text: "Keep watching unmanaged elevations for what you missed." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Step 4 is the point of the whole exercise. EPM has no value while users are still local administrators — they simply never trigger a rule. The sequence matters: collect evidence, write rules, *then* remove the rights."
                }
              ]
            }
          ],
          result: {
            text: "You can describe the reports and the correct rollout sequence.",
            verify: [
              { text: "You can name the report that shows what rules you are missing." },
              { text: "You can explain why removing admin rights comes after writing rules." }
            ]
          }
        },
        {
          id: "t2",
          title: "Decide whether to start the trial",
          checkpoint: true,
          steps: [
            {
              text: "You can run everything above for real, free, for 90 days. Whether you should depends on what you want from it.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Detail"],
                  rows: [
                    ["Duration", "90 days, then a 30-day grace period"],
                    ["Users", "Up to 250"],
                    ["Limit", "One trial per capability per tenant — **you get one attempt**"],
                    ["Path", "Tenant administration > Intune add-ons > All add-ons"],
                    ["Requires", "Global Administrator or Billing Administrator"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The clock runs whether you use it or not, and there is no second trial. If you start it now and sit the exam in two months, it will still be active — that is fine. If you start it now and study for six months, it will have expired long before you needed it, and you cannot get it back."
                }
              ]
            },
            {
              text: "Use this to decide:",
              parts: [
                {
                  kind: "table",
                  headers: ["Situation", "Recommendation"],
                  rows: [
                    ["Exam booked within 90 days and you want hands-on Suite experience", "**Start it**, and work through labs 58 and 59 for real"],
                    ["Exam date not yet fixed", "**Wait.** Read these two labs now and start the trial when you book"],
                    ["You are evaluating the Suite for your organisation", "Start it, and use the EPM unmanaged elevation report as evidence for the business case"],
                    ["You only need the exam objectives", "**Skip it.** These two labs cover what the exam asks"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You have made a deliberate decision about the trial rather than starting it by accident.",
            verify: [
              { text: "You can state the trial duration and the one-attempt limit." },
              { text: "You have decided whether to start it, and why." }
            ]
          }
        }
      ]
    }
  ],

  quiz: [
    {
      question:
        "Contoso removes local administrator rights from all users. Engineers must still install a specific approved driver utility. Which Endpoint Privilege Management elevation type best balances productivity and audit?",
      options: [
        "User confirmed, with a business justification prompt",
        "Automatic elevation with no prompt",
        "Support approved elevation requiring help desk authorisation",
        "Deny, and handle each case through a ticket"
      ],
      correctIndex: 0,
      rationale:
        "User confirmed lets the engineer work immediately while recording who elevated what and why. Automatic removes the audit prompt entirely, and support approved adds help desk load that a routine, approved utility does not warrant.",
      examTip:
        "User confirmed is the default answer for routine elevation. Reserve automatic for vetted applications and support approved for genuinely high-risk actions.",
      skills: ["g2.t3.s1"]
    },
    {
      question:
        "An Endpoint Privilege Management elevation rules policy is deployed but no applications elevate. What is the most likely cause?",
      options: [
        "No elevation settings policy is deployed, so the client component is not enabled",
        "The rules use file hash validation instead of certificate validation",
        "The users are still local administrators",
        "Child process behaviour is set to Deny all"
      ],
      correctIndex: 0,
      rationale:
        "EPM requires both policies. The elevation settings policy enables the client component and sets default behaviour; rules alone deploy successfully and do nothing without it.",
      examTip:
        "This two-part pattern recurs across Intune — LAPS needs a directory setting plus a policy, EPM needs settings plus rules. When a policy deploys and nothing happens, look for the missing half.",
      skills: ["g2.t3.s1"]
    }
  ]
};
