export default {
  id: "attack-surface-reduction",
  moduleId: "m7",
  title: "Attack surface reduction rules",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 45,

  scenario:
    "Attack surface reduction rules block the behaviours attackers rely on — Office spawning processes, scripts running downloaded executables, credential theft from LSASS. They are among the highest-value controls available and among the easiest to deploy badly, because a rule set to Block on day one will stop a line-of-business application that legitimately does something suspicious. The discipline is audit first, always.",

  objectives: [
    "Create an attack surface reduction policy",
    "Deploy rules in Audit mode and read the resulting events",
    "Promote rules from Audit to Block based on evidence",
    "Configure per-rule exclusions",
    "Explain how ASR relates to Zero Trust"
  ],

  keyConcepts: ["ASR rules", "Audit mode", "Block mode", "Event ID 1121 and 1122", "Per-rule exclusions", "Zero Trust"],

  skills: [{ id: "g3.t1.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "MDE-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11" }
    ],
    personas: ["alex.wilber"],
    labs: ["antivirus-policies"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy in audit mode",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the ASR policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **Attack surface reduction**, then **Create Policy**, platform **Windows**, profile **Attack Surface Reduction Rules**.",
              nav: ["Endpoint security", "Attack surface reduction", "Create Policy"]
            },
            {
              text: "Name it `ASR-Windows-Audit`, then set these high-value rules to **Audit**:",
              parts: [
                {
                  kind: "table",
                  headers: ["Rule", "Blocks", "Risk of breaking something"],
                  rows: [
                    ["Block credential stealing from the Windows local security authority subsystem", "Tools reading LSASS memory", "Low — but some legacy backup and monitoring agents do this"],
                    ["Block all Office applications from creating child processes", "Macro-launched processes", "Medium — some Office add-ins legitimately spawn processes"],
                    ["Block Office applications from injecting code into other processes", "Injection-based attacks", "Low"],
                    ["Block execution of potentially obfuscated scripts", "Obfuscated PowerShell and JavaScript", "Medium — some vendor installers ship obfuscated scripts"],
                    ["Block JavaScript or VBScript from launching downloaded executable content", "Script-driven droppers", "Low"],
                    ["Block executable content from email client and webmail", "Attachments running directly", "Low"],
                    ["Block persistence through WMI event subscription", "A common persistence technique", "Low"],
                    ["Use advanced protection against ransomware", "Ransomware-like file behaviour", "Low"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Set every rule to **Audit**, not Block. Audit logs what *would* have been blocked and changes nothing. Deploying straight to Block is the single most common way an ASR rollout is reversed within a day, because the rule that breaks your finance team's macro-driven workbook is not the one you expected."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-PILOT` and create the policy.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "ASR rules require Microsoft Defender Antivirus to be the active engine with real-time protection on. On a device where Defender is passive because a third-party product is installed, ASR rules do not evaluate at all — and report nothing."
                }
              ]
            }
          ],
          result: {
            text: "Eight high-value ASR rules are auditing on a pilot ring.",
            verify: [
              { text: "`ASR-Windows-Audit` is assigned with every rule in Audit mode." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read the audit events",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy and confirm the rules arrived:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "$p = Get-MpPreference\nfor ($i = 0; $i -lt $p.AttackSurfaceReductionRules_Ids.Count; $i++) {\n    [pscustomobject]@{\n        RuleId = $p.AttackSurfaceReductionRules_Ids[$i]\n        Action = switch ($p.AttackSurfaceReductionRules_Actions[$i]) {\n            0 { \"Disabled\" }\n            1 { \"Block\" }\n            2 { \"Audit\" }\n            6 { \"Warn\" }\n        }\n    }\n} | Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "Eight rule identifiers are listed, all reporting **Audit**."
                }
              ]
            },
            {
              text: "Learn the two event IDs that matter:",
              parts: [
                {
                  kind: "table",
                  headers: ["Event ID", "Meaning"],
                  rows: [
                    ["1121", "A rule **blocked** an operation"],
                    ["1122", "A rule **audited** an operation — it would have blocked"],
                    ["1125", "A rule audited an operation in warn mode"],
                    ["1126", "A user dismissed a warn-mode prompt"]
                  ]
                },
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Read ASR events from the Defender operational log",
                  code: "Get-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" -MaxEvents 200 -ErrorAction SilentlyContinue |\n    Where-Object Id -in 1121,1122,1125,1126 |\n    Select-Object TimeCreated, Id,\n        @{n='Detail'; e={ ($_.Message -split \"`n\")[0] }} |\n    Format-Table -Wrap"
                }
              ]
            },
            {
              text: "Generate an audit event so you can see one. Open a document and run a macro, or simply run:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "# A deliberately obfuscated-looking command to trip the script rule\n$c = [Convert]::FromBase64String(\"V3JpdGUtT3V0cHV0ICdBU1IgdGVzdCc=\")\n[System.Text.Encoding]::UTF8.GetString($c) | Invoke-Expression"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Central reporting is better than per-device event logs at scale. **Endpoint security** > **Attack surface reduction** > **Monitor**, and the Defender portal's advanced hunting, aggregate these events across the estate — which is how you find the one application that trips a rule for forty users."
                }
              ]
            }
          ],
          result: {
            text: "Rules are auditing and you can find the evidence they produce.",
            verify: [
              { text: "`Get-MpPreference` reports the rules in Audit mode." },
              { text: "You can locate event 1122 in the Defender operational log." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Promote to block and add exclusions",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Move rules to Block based on evidence",
          checkpoint: true,
          steps: [
            {
              text: "Review the audit events over a realistic period — a week in production, a few minutes here — and decide per rule.",
              parts: [
                {
                  kind: "table",
                  headers: ["Audit evidence", "Action"],
                  rows: [
                    ["No events at all", "Promote to **Block**. Nothing legitimate is tripping it."],
                    ["Events only from known-bad activity", "Promote to **Block**."],
                    ["Events from a legitimate business application", "Add a **per-rule exclusion** for that application, then promote to Block."],
                    ["Many events from many applications", "Leave in Audit and investigate. The rule may not suit your estate."]
                  ]
                }
              ]
            },
            {
              text: "Edit `ASR-Windows-Audit` and change the low-risk rules to **Block**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Block credential stealing from LSASS", value: "Block" },
                    { label: "Block Office applications from injecting code into other processes", value: "Block" },
                    { label: "Block JavaScript or VBScript from launching downloaded executable content", value: "Block" },
                    { label: "Block persistence through WMI event subscription", value: "Block" },
                    { label: "Block all Office applications from creating child processes", value: "Audit", note: "Keep auditing until you are sure no add-in depends on it." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Warn** is a fourth mode worth knowing. It blocks the operation but lets the user override it for that session, and records event 1126 when they do. It is a useful halfway house when you are fairly confident but not certain, and it gives you a list of the people who needed the override."
                }
              ]
            },
            {
              text: "Add an exclusion for a legitimate application:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "ASR Only Exclusions", value: "C:\\Program Files\\ContosoERP\\erp.exe" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**ASR Only Exclusions** apply to attack surface reduction rules and nothing else. They are separate from Defender Antivirus exclusions, which is a genuine advantage: you can permit one application to do one suspicious thing without excluding it from antivirus scanning entirely."
                }
              ]
            },
            {
              text: "Save and confirm on the device after a sync that the promoted rules now report **Block**."
            }
          ],
          result: {
            text: "Rules are enforced where evidence supports it, with narrow exclusions where it does not.",
            verify: [
              { text: "At least four rules report Block on the client." },
              { text: "An ASR-only exclusion is configured for a named executable." }
            ]
          }
        },
        {
          id: "t2",
          title: "Place ASR within Zero Trust",
          steps: [
            {
              text: "The exam objective mentions Zero Trust explicitly. ASR contributes to one principle in particular.",
              parts: [
                {
                  kind: "table",
                  headers: ["Zero Trust principle", "How ASR serves it"],
                  rows: [
                    ["Verify explicitly", "Compliance and Conditional Access, from labs 29 and 31"],
                    ["Use least privilege access", "RBAC, scope tags, local group membership, from labs 7, 8 and 28"],
                    ["**Assume breach**", "**ASR, EDR and App Control** — reduce what an attacker can do *after* they get in"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "ASR is an assume-breach control. It does not stop an attacker arriving; it removes the techniques they would use once they have. That framing is how the exam relates ASR to Zero Trust, and it is also the argument that gets ASR approved when someone asks why antivirus is not enough."
                }
              ]
            }
          ],
          result: {
            text: "You can explain ASR's role in a Zero Trust posture.",
            verify: [{ text: "You can name which Zero Trust principle ASR primarily serves." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "ASR rules are deployed but no events appear and nothing is blocked.",
      rootCause:
        "Microsoft Defender Antivirus is not the active engine — it is in passive mode because a third-party product is installed — or real-time protection is disabled. ASR rules do not evaluate under either condition.",
      diagnostic: {
        lang: "powershell",
        code: "Get-MpComputerStatus | Select-Object AMRunningMode, RealTimeProtectionEnabled\n(Get-MpPreference).AttackSurfaceReductionRules_Ids.Count"
      },
      resolution:
        "ASR requires Defender Antivirus in active mode with real-time protection on. Remove the third-party product or accept that ASR is unavailable on those devices."
    }
  ],

  quiz: [
    {
      question:
        "You are deploying attack surface reduction rules to 500 devices. What should you do first?",
      options: [
        "Deploy the rules in Audit mode and review events 1122 before enabling Block",
        "Deploy the rules in Block mode to a pilot group",
        "Configure ASR-only exclusions for all line-of-business applications",
        "Enable Warn mode so users can report problems"
      ],
      correctIndex: 0,
      rationale:
        "Audit mode records what each rule would have blocked without affecting anyone, which is the evidence you need before enforcing. Blocking first — even on a pilot — breaks work before you know which rules are safe.",
      examTip:
        "Audit, review, exclude, then block. Event 1122 is audit and 1121 is block; knowing which is which is frequently the question.",
      skills: ["g3.t1.s4"]
    },
    {
      question:
        "A line-of-business application is repeatedly audited by the rule blocking Office applications from creating child processes. You need the rule enforced but this application to keep working. What should you configure?",
      options: [
        "An ASR-only exclusion for that application",
        "A Microsoft Defender Antivirus path exclusion",
        "Set the rule to Warn mode",
        "Remove the rule from the policy"
      ],
      correctIndex: 0,
      rationale:
        "ASR-only exclusions exempt a specific file or path from attack surface reduction rules while leaving antivirus scanning fully in place. An antivirus exclusion would stop the file being scanned at all, which is a much larger concession.",
      examTip:
        "The two exclusion types are deliberately separate. Choosing the antivirus one to solve an ASR problem removes far more protection than the scenario asked for.",
      skills: ["g3.t1.s4"]
    }
  ]
};
