export default {
  id: "app-control-for-business",
  moduleId: "m7",
  title: "App Control for Business",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 40,

  scenario:
    "Antivirus decides what is bad. App Control decides what is good, and blocks everything else. It is the strongest application control Windows offers and the one most likely to break a business if deployed carelessly, so the workflow mirrors attack surface reduction: audit first, learn what actually runs, then enforce.",

  objectives: [
    "Create an App Control for Business policy in audit mode",
    "Explain managed installer and Intelligent Security Graph trust",
    "Read App Control audit events",
    "Move a policy to enforcement safely",
    "Recognise the feature under both its old and new names"
  ],

  keyConcepts: ["App Control for Business", "WDAC", "Managed installer", "Intelligent Security Graph", "Audit mode", "Code integrity events"],

  skills: [{ id: "g3.t1.s8", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["attack-surface-reduction"]
  },

  exercises: [
    {
      id: "e1",
      title: "Understand the trust model",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Learn what App Control trusts and why",
          steps: [
            {
              text: "First, the naming. **App Control for Business** is the current name for what was called **Windows Defender Application Control (WDAC)**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Documentation, the portal and older exam material all use both names for the same feature. The MD-102 objective uses App Control for Business. Do not go looking for a separate WDAC feature — there is not one."
                }
              ]
            },
            {
              text: "App Control blocks everything that is not explicitly trusted. Intune's built-in policy offers three sources of trust:",
              parts: [
                {
                  kind: "table",
                  headers: ["Trust source", "Trusts", "Why it matters"],
                  rows: [
                    ["Windows components and Store apps", "Everything signed by Microsoft and everything from the Microsoft Store", "The mandatory base. Without it Windows itself cannot run."],
                    ["**Managed installer**", "Anything installed by a nominated installer — in practice, the Intune Management Extension", "**The key setting.** Every application you deploy through Intune becomes trusted automatically."],
                    ["**Intelligent Security Graph**", "Anything Microsoft's reputation service considers to have good reputation", "Lets well-known third-party software run without you cataloguing it"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Managed installer** is what makes App Control practical in an Intune estate. It means every Win32 app you deploy through Intune is automatically trusted, so your deployment pipeline becomes your allow-list. Without it you would have to build and maintain a signed catalogue of every binary in the organisation, which is why App Control had a reputation for being unmanageable."
                }
              ]
            },
            {
              text: "Understand what App Control adds over ASR:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Attack surface reduction", "App Control for Business"],
                  rows: [
                    ["Model", "Block specific known-bad behaviours", "Block everything not explicitly trusted"],
                    ["Default outcome for unknown software", "Runs", "**Blocked**"],
                    ["Effort to deploy", "Moderate — audit and exclude", "High — audit, then curate trust"],
                    ["Protection against novel malware", "Partial", "Strong"],
                    ["Risk of breaking the business", "Moderate", "**High if rushed**"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can explain the App Control trust model and why managed installer matters.",
            verify: [
              { text: "You can name the setting that makes Intune-deployed apps trusted automatically." },
              { text: "You can state App Control's former name." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Deploy in audit mode and read the evidence",
      estimatedMinutes: 28,
      tasks: [
        {
          id: "t1",
          title: "Create the policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **App Control for Business**, then **Create Policy**, platform **Windows**, profile **App Control for Business**.",
              nav: ["Endpoint security", "App Control for Business", "Create Policy"]
            },
            {
              text: "Name it `AC-Windows-Audit`, then configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Configure App Control for Business", value: "Configure" },
                    { label: "Enable App Control for Business", value: "Audit only", note: "Audit logs what would be blocked and blocks nothing." },
                    { label: "Trust apps with good reputation", value: "Enable", note: "Intelligent Security Graph." },
                    { label: "Trust apps from managed installers", value: "Enable", note: "Intune-deployed applications." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Choosing **Enforce** here on a first deployment will block software your users need, on every targeted device, immediately — and because App Control blocks by default, the failure is total rather than partial. Audit only. There is no scenario in which enforcing first is the right call."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-PILOT` and create the policy."
            },
            {
              text: "On **MD102-VM1-Adele**, sync policy and confirm it applied:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-CimInstance -ClassName Win32_DeviceGuard `\n    -Namespace root\\Microsoft\\Windows\\DeviceGuard |\n    Select-Object CodeIntegrityPolicyEnforcementStatus,\n        UsermodeCodeIntegrityPolicyEnforcementStatus"
                },
                {
                  kind: "verify",
                  text: "Enforcement status reports audit mode. A value of `1` is audit and `2` is enforced.",
                  expected: "CodeIntegrityPolicyEnforcementStatus         : 1\nUsermodeCodeIntegrityPolicyEnforcementStatus : 1"
                }
              ]
            }
          ],
          result: {
            text: "App Control is auditing on a pilot ring with managed installer and reputation trust enabled.",
            verify: [
              { text: "The policy is in **Audit only** mode." },
              { text: "The device reports enforcement status 1." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read code integrity events and plan enforcement",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, open PowerShell and check the code integrity log for audit events:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-WinEvent -LogName \"Microsoft-Windows-CodeIntegrity/Operational\" -MaxEvents 100 -ErrorAction SilentlyContinue |\n    Where-Object Id -in 3076,3077 |\n    Select-Object TimeCreated, Id,\n        @{n='File'; e={ ($_.Message -split \"`n\" | Select-String \"File Name\") -join '' }} |\n    Format-Table -Wrap"
                },
                {
                  kind: "table",
                  headers: ["Event ID", "Meaning"],
                  rows: [
                    ["3076", "Audit — this file **would have been blocked**"],
                    ["3077", "Enforcement — this file **was blocked**"],
                    ["3089", "Signing information for a file in a 3076 or 3077 event"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Event 3076 is the whole point of audit mode. Every 3076 is a piece of software that will stop working the moment you enforce. Collect them for a realistic period — weeks, not hours — and make sure month-end and quarter-end processes have run before you decide the list is complete."
                }
              ]
            },
            {
              text: "Run something not deployed by Intune to generate an audit event — any small utility downloaded directly, or a script compiled to an executable — then re-run the query above.",
              parts: [
                {
                  kind: "verify",
                  text: "An event 3076 appears naming the file. Under enforcement, that file would not have run."
                }
              ]
            },
            {
              text: "Plan the move to enforcement:",
              parts: [
                {
                  kind: "table",
                  headers: ["Audit finding", "Action before enforcing"],
                  rows: [
                    ["Software you deploy through Intune appears in 3076", "Confirm **Trust apps from managed installers** is enabled — it should already be trusted"],
                    ["Well-known third-party software appears", "Confirm **Trust apps with good reputation** is enabled"],
                    ["Genuinely required software still appears", "Deploy it through Intune so managed installer covers it, or add a supplemental policy"],
                    ["Nothing you recognise appears", "Investigate — this is what App Control is for"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The cleanest answer to *this application is blocked* is usually **deploy it through Intune**. Managed installer then trusts it automatically, and you gain deployment tracking at the same time. Building supplemental signing policies is a last resort, not a first response."
                }
              ]
            }
          ],
          result: {
            text: "You can read audit evidence and know what to fix before enforcing.",
            verify: [
              { text: "You located at least one event 3076." },
              { text: "You can state the preferred way to make a blocked application trusted." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "After enabling App Control in enforce mode, applications deployed through Intune are blocked.",
      rootCause: "**Trust apps from managed installers** was not enabled, so the Intune Management Extension is not recognised as a managed installer.",
      diagnostic: {
        lang: "powershell",
        code: "Get-WinEvent -LogName \"Microsoft-Windows-CodeIntegrity/Operational\" -MaxEvents 50 |\n    Where-Object Id -eq 3077 |\n    Select-Object TimeCreated, Message | Format-Table -Wrap"
      },
      resolution:
        "Return the policy to **Audit only**, enable managed installer trust, and confirm audit events stop appearing for Intune-deployed software before enforcing again. Note that managed installer trust applies from the moment it is enabled — software installed before that is not retroactively trusted and may need reinstalling."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Which App Control for Business setting causes applications deployed through Intune to be trusted automatically?",
      options: [
        "Trust apps from managed installers",
        "Trust apps with good reputation",
        "Trust Windows components and Store apps",
        "Enable App Control for Business in audit mode"
      ],
      correctIndex: 0,
      rationale:
        "Managed installer trust designates the Intune Management Extension as an authorised installer, so anything it installs is trusted. This is what makes App Control manageable without maintaining a signed catalogue of every binary.",
      examTip:
        "Intelligent Security Graph covers well-known third-party software by reputation; managed installer covers your own deployments. Most estates need both.",
      skills: ["g3.t1.s8"]
    },
    {
      id: "q2",
      question:
        "Which event ID indicates that App Control for Business would have blocked a file, but did not because the policy is in audit mode?",
      options: [
        "3076",
        "3077",
        "1121",
        "1122"
      ],
      correctIndex: 0,
      rationale:
        "Event 3076 in the CodeIntegrity operational log is the audit event, and 3077 is the enforcement block. Events 1121 and 1122 belong to attack surface reduction in the Defender operational log.",
      examTip:
        "Two audit-and-block pairs to keep apart: ASR uses 1122 and 1121 in the Defender log; App Control uses 3076 and 3077 in the CodeIntegrity log.",
      skills: ["g3.t1.s8"]
    }
  ]
};
