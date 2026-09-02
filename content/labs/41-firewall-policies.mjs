export default {
  id: "firewall-policies",
  moduleId: "m7",
  title: "Firewall policies and rules",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "The Windows firewall is on by default and configured by almost nobody. Contoso needs it enforced across all three network profiles, with inbound connections blocked unless explicitly allowed, and a small set of rules for line-of-business software. Firewall configuration in Intune is split across two policy types, and knowing which one holds which settings saves a lot of hunting.",

  objectives: [
    "Create a Microsoft Defender Firewall profile covering all three network profiles",
    "Create firewall rules and understand rule merging",
    "Explain the difference between the firewall profile and the rules profile",
    "Verify firewall state and rules from the client"
  ],

  keyConcepts: ["Defender Firewall profile", "Firewall rules profile", "Domain, Private, Public profiles", "Rule merging", "Stealth mode"],

  skills: [{ id: "g3.t1.s3", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
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
      title: "Configure the firewall",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the firewall profile",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **Firewall**, then **Create Policy**, platform **Windows**, profile **Microsoft Defender Firewall**.",
              nav: ["Endpoint security", "Firewall", "Create Policy"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "There are two separate profile types here and they are not interchangeable. **Microsoft Defender Firewall** carries the firewall's *behaviour* — whether it is on, default actions, logging, stealth mode. **Microsoft Defender Firewall Rules** carries individual allow and block rules. Looking for rules in the first profile is a common wasted five minutes."
                }
              ]
            },
            {
              text: "Name it `FW-Windows-Corporate`, then configure each of the three network profiles identically:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Domain network — Firewall enabled", value: "Allowed" },
                    { label: "Domain network — Default inbound action for traffic", value: "Block" },
                    { label: "Domain network — Default outbound action for traffic", value: "Allow" },
                    { label: "Private network — Firewall enabled", value: "Allowed" },
                    { label: "Private network — Default inbound action for traffic", value: "Block" },
                    { label: "Public network — Firewall enabled", value: "Allowed" },
                    { label: "Public network — Default inbound action for traffic", value: "Block" },
                    { label: "Public network — Stealth mode required", value: "True", note: "The device does not respond to unsolicited probes, so it is harder to find on a hostile network." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Configure all three profiles even if you think only one applies. Windows chooses the network profile itself based on how it classifies the connection, and a laptop on hotel Wi-Fi is on **Public** whether you planned for it or not. Leaving a profile unconfigured leaves it at whatever the device had."
                }
              ]
            },
            {
              text: "Configure rule merging through the wizard tabs (which decides whether locally created rules survive):",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Policy rules from group policy not merged", value: "True" },
                    { label: "Local policy rules not merged", value: "True", note: "Rules created on the device by a local administrator are ignored." },
                    { label: "Global port rules from group policy not merged", value: "True" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `FW-Windows-Corporate`, then select **Next**." },
                    { text: "On the **Configuration settings** tab, configure the network profile settings and rule merging settings above, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Disabling local rule merging means only rules you deploy apply. Without it, a local administrator or an application installer can add a rule that punches a hole in your configuration, and nothing in the portal will tell you. Turning merging off is the difference between a firewall policy and a firewall suggestion."
                }
              ]
            }
          ],
          result: {
            text: "The firewall is enforced on all three network profiles with inbound blocked by default.",
            verify: [
              { text: "All three network profiles are configured, not just Domain." },
              { text: "Local rule merging is disabled." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify from the client",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy, then check firewall state:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-NetFirewallProfile |\n    Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction,\n        AllowLocalFirewallRules, AllowLocalIPsecRules"
                },
                {
                  kind: "verify",
                  text: "All three profiles report `Enabled: True`, `DefaultInboundAction: Block` and `AllowLocalFirewallRules: False`.",
                  expected: "Name    Enabled DefaultInboundAction DefaultOutboundAction AllowLocalFirewallRules\n----    ------- -------------------- --------------------- -----------------------\nDomain     True                Block                 Allow                   False\nPrivate    True                Block                 Allow                   False\nPublic     True                Block                 Allow                   False"
                }
              ]
            }
          ],
          result: {
            text: "The client reports the firewall configuration you deployed.",
            verify: [
              { text: "All three profiles are enabled with inbound blocked." },
              { text: "Local firewall rules are not permitted." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Firewall rules",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create a rules policy",
          checkpoint: true,
          steps: [
            {
              text: "Create a second policy: **Endpoint security** > **Firewall** > **Create Policy**, platform **Windows**, profile **Microsoft Defender Firewall Rules**.",
              nav: ["Endpoint security", "Firewall", "Create Policy"]
            },
            {
              text: "Name it `FW-Rules-LineOfBusiness`, add a rule, and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Allow ContosoERP inbound" },
                    { label: "Direction", value: "In" },
                    { label: "Action", value: "Allowed" },
                    { label: "Network types", value: "Domain, Private", note: "Deliberately not Public. A line-of-business port has no business being open on hotel Wi-Fi." },
                    { label: "Protocol", value: "6", note: "TCP. Protocol is entered as its IANA number, not by name." },
                    { label: "Local port ranges", value: "8443" },
                    { label: "File path", value: "C:\\Program Files\\ContosoERP\\erp.exe", note: "Scoping to the executable means only that program can use the port." }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `FW-Rules-LineOfBusiness`, then select **Next**." },
                    { text: "On the **Configuration settings** tab, select **Add**, configure the inbound rule fields above, select **Save**, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Scope every rule as tightly as it will go: a specific program, a specific port, and only the network profiles where it makes sense. A rule that allows a port on all profiles for any program is a hole with a name."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Each rules policy can hold up to 150 rules. A large ruleset should be split by purpose across several policies — it is easier to review, easier to assign to different populations, and easier to remove when an application is retired."
                }
              ]
            },
            {
              text: "After a sync, on **MD102-VM1-Adele** open PowerShell and confirm the rule:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-NetFirewallRule -DisplayName \"*ContosoERP*\" |\n    Select-Object DisplayName, Enabled, Direction, Action, Profile"
                }
              ]
            }
          ],
          result: {
            text: "A narrowly scoped firewall rule is deployed and visible on the device.",
            verify: [
              { text: "The rule appears in `Get-NetFirewallRule` with the expected profile scope." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A deployed firewall rule does not appear on the device, or an application still cannot connect.",
      rootCause:
        "The rule was placed in a Microsoft Defender Firewall profile rather than a Firewall Rules profile, the network profile scope excludes the network the device is actually on, or local rule merging is disabled and the application installer's own rule was ignored.",
      diagnostic: {
        lang: "powershell",
        code: "Get-NetConnectionProfile | Select-Object InterfaceAlias, NetworkCategory\nGet-NetFirewallRule -DisplayName \"*Contoso*\" | Select-Object DisplayName, Enabled, Profile"
      },
      resolution:
        "Confirm which network profile the device is currently on — a device classified as Public will not use a rule scoped to Domain and Private. Then confirm the rule lives in a **Firewall Rules** policy."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You deploy a firewall policy blocking inbound connections by default. A line-of-business application's installer creates a local firewall rule to open its port, and the application works. What setting would have prevented that?",
      options: [
        "Setting local policy rules not merged to True",
        "Setting the default inbound action to Block on all profiles",
        "Enabling stealth mode on the Public profile",
        "Assigning the policy to a device group rather than a user group"
      ],
      correctIndex: 0,
      rationale:
        "By default, locally created firewall rules merge with policy-deployed rules. Disabling merging means only rules you deploy apply, so an installer cannot open a port behind your back.",
      examTip:
        "Rule merging is the setting that turns firewall policy from advisory into authoritative. Any scenario where an unexpected rule exists on a managed device points at it.",
      skills: ["g3.t1.s3"]
    }
  ]
};
