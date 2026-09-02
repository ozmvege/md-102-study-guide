export default {
  id: "endpoint-privilege-management",
  moduleId: "m11",
  title: "Endpoint Privilege Management",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 55,

  scenario:
    "Autopilot correctly made every user a standard user in lab 17. Then the engineering team needed to install a driver, and the answer *raise a ticket every time* is not one anyone accepts for long. Endpoint Privilege Management lets a specific application run elevated for a specific user without that user being a local administrator — which is the only way to hold the line on least privilege in practice. Since the July 2026 packaging change it is included with Microsoft 365 E5, so this is a lab you can actually run.",

  objectives: [
    "Explain what EPM solves and why local administrator rights are the alternative",
    "Create the elevation settings policy and an elevation rules policy",
    "Distinguish automatic, user-confirmed and support-approved elevation",
    "Elevate an application as a standard user and see it recorded",
    "Read the managed and unmanaged elevation reports and use them to drive a rollout"
  ],

  keyConcepts: ["Endpoint Privilege Management", "Elevation settings policy", "Elevation rules policy", "Automatic elevation", "User-confirmed", "Support approved", "Elevation report", "Child process behaviour"],

  skills: [{ id: "g2.t3.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "INTUNE-EPM"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["johanna.lorenz", "adele.vance"],
    labs: ["whfb-laps-local-groups"]
  },

  exercises: [
    {
      id: "e1",
      title: "The problem and the two policies",
      estimatedMinutes: 12,
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
                    ["Add them temporarily to the local group", "Nobody removes it; the estate drifts back to fully privileged"],
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
              text: "EPM is configured with two policies, and both must exist:",
              parts: [
                {
                  kind: "table",
                  headers: ["Policy", "Controls"],
                  rows: [
                    ["**Elevation settings policy**", "Whether EPM is on for the device, the default behaviour when no rule matches, and reporting scope"],
                    ["**Elevation rules policy**", "The individual rules: which file, validated how, elevated in what way"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Rules without a settings policy do nothing, because the client component is never enabled. This is the same two-part shape as Windows LAPS in lab 28, which needed a directory setting alongside its policy. When an EPM rules policy deploys successfully and nothing elevates, a missing settings policy is the first thing to check."
                }
              ]
            }
          ],
          result: {
            text: "You can explain what EPM solves and name both required policies.",
            verify: [
              { text: "You can state what elevation is scoped to." },
              { text: "You can name both policy types and what each controls." }
            ]
          }
        },
        {
          id: "t2",
          title: "Learn the elevation types",
          checkpoint: true,
          steps: [
            {
              text: "The settings policy sets a default behaviour, and each rule can override it.",
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
            }
          ],
          result: {
            text: "You can choose an elevation type from a requirement.",
            verify: [{ text: "You can name the elevation type suited to most cases, and say why." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Deploy the policies",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the elevation settings policy",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Endpoint security**, then **Endpoint Privilege Management**, then the **Policies** tab, then **Create Policy**.",
              nav: ["Endpoint security", "Endpoint Privilege Management", "Policies", "Create Policy"]
            },
            {
              text: "Choose the platform and profile:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Platform", value: "Windows" },
                    { label: "Profile", value: "Elevation settings policy" },
                    { label: "Name", value: "EPM-Settings-Corporate" }
                  ]
                }
              ]
            },
            {
              text: "Configure the settings:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Endpoint Privilege Management", value: "Enabled" },
                    { label: "Default elevation response", value: "Deny all requests", note: "Start denied. Elevation happens only where you have written a rule, which is the point." },
                    { label: "Send elevation data for reporting", value: "Diagnostic data and all endpoint elevations", note: "This is what populates the unmanaged elevations report that drives your rollout." },
                    { label: "Validate rules for all elevation requests", value: "Not configured" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Send elevation data for reporting** set to *all endpoint elevations* is the setting that makes EPM useful before you have written a single rule. It records every elevation happening on the device, including ones no rule covers — which is exactly the list of rules you still need to write."
                }
              ]
            },
            {
              text: "On **Assignments**, assign to `GRP-DEV-WIN-CORP`, then create the policy."
            }
          ],
          result: {
            text: "The EPM client component is enabled and reporting, with elevation denied by default.",
            verify: [
              { text: "`EPM-Settings-Corporate` is assigned to corporate Windows devices." },
              { text: "The default elevation response is **Deny all requests**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create an elevation rule",
          checkpoint: true,
          steps: [
            {
              text: "You need a file to write a rule against. On **MD102-VM1-Adele**, pick something that genuinely requires elevation — the registry editor is a convenient, obviously-privileged example:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Collect the details a rule needs",
                  code: "$file = \"C:\\Windows\\regedit.exe\"\nGet-FileHash -Path $file -Algorithm SHA256 | Select-Object Hash\n(Get-Item $file).VersionInfo | Select-Object FileDescription, ProductVersion, CompanyName"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Record the SHA-256 hash. A rule can match on file name alone, but a hash or a publisher certificate is what stops someone dropping their own `regedit.exe` into a writable folder and having your rule elevate it for them."
                }
              ]
            },
            {
              text: "Back in the portal under **Endpoint Privilege Management** > **Policies**, open the policy dialog and choose the profile:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Platform", value: "Windows" },
                    { label: "Profile", value: "Elevation rules policy" }
                  ]
                }
              ]
            },
            {
              text: "Add a rule and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Rule name", value: "Registry Editor — user confirmed" },
                    { label: "Description", value: "Permits engineering to edit the registry without local administrator rights" },
                    { label: "Elevation type", value: "User confirmed" },
                    { label: "Validation", value: "Business justification", note: "The user must type a reason, which is recorded against the elevation." },
                    { label: "File name", value: "regedit.exe" },
                    { label: "File path", value: "C:\\Windows", note: "Constrains where the file may run from." },
                    { label: "Signature source", value: "File hash" },
                    { label: "File hash", value: "The SHA-256 you collected above" },
                    { label: "Child process behavior", value: "Deny all", note: "See the warning below — this is the setting that matters most." }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `EPM-Rules-Engineering`, then select **Next**." },
                    { text: "On the **Execution rules** tab, select **Add rule**, configure the elevation rule fields above, select **Save**, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-USR-ENGINEERING`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "**Child process behaviour** is the setting attackers care about. An application permitted to elevate can spawn other processes, and if those inherit elevation the user has an elevated shell — full local administrator by another route. Set it to **Deny all**, or **Require rule** where the application genuinely must launch something else. Allowing all child processes converts a narrow, audited grant into a general one."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Note the asymmetry: the settings policy targets **devices**, because it enables a client component. The rules policy targets **users**, because elevation is a permission granted to a person. Getting these the wrong way round produces a policy that deploys and does nothing."
                }
              ]
            }
          ],
          result: {
            text: "A narrowly scoped elevation rule is deployed to the engineering group.",
            verify: [
              { text: "`EPM-Rules-Engineering` is assigned to a user group." },
              { text: "The rule validates by file hash and denies child processes." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Elevate, and read the reports",
      estimatedMinutes: 18,
      tasks: [
        {
          id: "t1",
          title: "Elevate as a standard user",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, sign in as `johanna.lorenz@<tenant>.onmicrosoft.com` and sync policy.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Johanna must be a standard user for this to prove anything. Confirm with `net localgroup Administrators` — if she is a member, the elevation will succeed for the wrong reason and the rule is never exercised."
                }
              ]
            },
            {
              text: "Confirm the EPM client component arrived:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-Service EpmService -ErrorAction SilentlyContinue | Select-Object Name, Status, StartType\nGet-ChildItem \"C:\\Program Files\\Microsoft EPM Agent\" -ErrorAction SilentlyContinue | Select-Object -First 3 Name"
                },
                {
                  kind: "verify",
                  text: "The EPM agent is present and its service is running. If it is absent, the settings policy has not reached the device — check the device status on `EPM-Settings-Corporate` before going further."
                }
              ]
            },
            {
              text: "Now use the rule. Right-click `regedit.exe` in `C:\\Windows` and select **Run with elevated access**.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Run with elevated access** is a new context-menu entry added by the EPM agent. It is distinct from **Run as administrator**, which still demands administrator credentials Johanna does not have. If the entry is missing, the agent is not installed."
                }
              ]
            },
            {
              text: "Enter a business justification when prompted and confirm.",
              parts: [
                {
                  kind: "verify",
                  text: "Registry Editor opens with full privileges, without Johanna supplying any administrator credentials and without her being a local administrator."
                }
              ]
            },
            {
              text: "Prove the boundary holds. Try to elevate something the rule does not cover — `cmd.exe`, for example.",
              parts: [
                {
                  kind: "verify",
                  text: "Elevation is refused, because the settings policy default is **Deny all requests** and no rule matches. This is the difference between EPM and local administrator rights, demonstrated on a real device."
                }
              ]
            }
          ],
          result: {
            text: "A standard user elevated one specific application and nothing else.",
            verify: [
              { text: "Registry Editor ran elevated with no administrator credentials." },
              { text: "An application with no matching rule was refused." },
              { text: "Johanna is still not a member of the local Administrators group." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read the elevation reports",
          checkpoint: true,
          steps: [
            {
              text: "In the portal, select **Endpoint security**, **Endpoint Privilege Management**, then the **Reports** tab.",
              nav: ["Endpoint security", "Endpoint Privilege Management", "Reports"],
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
                }
              ]
            },
            {
              text: "Open **Managed elevations** and find your test.",
              parts: [
                {
                  kind: "verify",
                  text: "The elevation is listed with Johanna's account, the device, the file, the rule that matched and the business justification she typed. That justification string is the audit trail local administrator rights never gave you."
                }
              ]
            },
            {
              text: "Open **Unmanaged elevations**.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This is the report that drives a real rollout. It shows what users are elevating that you have not written a rule for — which is your backlog. It is also occasionally your evidence that someone still holds local administrator rights they should not, because those elevations appear here having bypassed EPM entirely."
                }
              ]
            },
            {
              text: "Note the rollout sequence, which mirrors the audit-first pattern from attack surface reduction and App Control:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Deploy the settings policy with the default set to **Deny** and reporting on — as you did in exercise 2." },
                    { text: "Collect unmanaged elevation data for a few weeks to learn what people genuinely need." },
                    { text: "Write rules for the legitimate cases, mostly user-confirmed." },
                    { text: "Remove local administrator rights, using the local group membership policy from lab 28." },
                    { text: "Keep watching unmanaged elevations for what you missed." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Step 4 is the point of the whole exercise. EPM has no value while users are still local administrators — they never trigger a rule, and the reports stay empty of anything useful. The sequence matters: collect evidence, write rules, *then* remove the rights."
                }
              ]
            }
          ],
          result: {
            text: "Every elevation is recorded, and you know which report tells you what rules you are still missing.",
            verify: [
              { text: "Your test elevation appears under **Managed elevations** with its justification." },
              { text: "You can name the report that reveals missing rules." },
              { text: "You can state why removing administrator rights comes after writing rules." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "An elevation rules policy is deployed but no applications elevate, and the Run with elevated access menu entry is missing.",
      rootCause:
        "No elevation settings policy is deployed to the device, so the EPM client component was never installed. Rules alone deploy successfully and do nothing.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Service EpmService -ErrorAction SilentlyContinue | Select-Object Name, Status\nGet-ChildItem \"C:\\Program Files\\Microsoft EPM Agent\" -ErrorAction SilentlyContinue"
      },
      resolution:
        "Deploy an elevation settings policy to the **device** group with Endpoint Privilege Management set to Enabled, then sync. The agent installs on the next check-in."
    },
    {
      symptom: "Elevation succeeds for a user who should not have it, and the elevation does not appear in the managed elevations report.",
      rootCause:
        "The user is already a local administrator, so Windows elevated through the normal path and EPM was never consulted.",
      diagnostic: {
        lang: "powershell",
        code: "net localgroup Administrators\nwhoami /groups | Select-String \"S-1-5-32-544\""
      },
      resolution:
        "Remove the user from the local Administrators group using the Local Users and Groups policy from lab 28. Until administrator rights are gone, EPM rules are never exercised."
    }
  ],

  quiz: [
    {
      id: "q1",
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
      id: "q2",
      question:
        "An Endpoint Privilege Management elevation rules policy is deployed but no applications elevate. What is the most likely cause?",
      options: [
        "No elevation settings policy is deployed, so the client component is not enabled",
        "The rules use file hash validation instead of certificate validation",
        "The rules policy was assigned to a user group rather than a device group",
        "Child process behaviour is set to Deny all"
      ],
      correctIndex: 0,
      rationale:
        "EPM requires both policies. The elevation settings policy enables the client component and sets default behaviour; rules alone deploy successfully and do nothing without it. Rules policies are correctly assigned to user groups.",
      examTip:
        "This two-part pattern recurs across Intune — LAPS needs a directory setting plus a policy, EPM needs settings plus rules. When a policy deploys and nothing happens, look for the missing half.",
      skills: ["g2.t3.s1"]
    },
    {
      id: "q3",
      question:
        "You create an EPM rule permitting an installer to elevate, and set child process behaviour to Allow all. What risk does this introduce?",
      options: [
        "The elevated application can spawn a command prompt that inherits elevation, giving the user full local administrator access",
        "The rule will apply to every application on the device",
        "The elevation will not be recorded in the managed elevations report",
        "The rule will be ignored because child process behaviour must be configured"
      ],
      correctIndex: 0,
      rationale:
        "Child processes inheriting elevation turns a narrow, audited grant into a general one. Anything the elevated application can launch — including a shell — runs with the same privileges.",
      examTip:
        "Deny all is the safe default, with Require rule where an application genuinely needs to launch something else. This setting is what keeps EPM scoped to the application rather than to the session.",
      skills: ["g2.t3.s1"]
    }
  ]
};
