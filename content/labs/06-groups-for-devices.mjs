export default {
  id: "groups-for-devices",
  moduleId: "m1",
  title: "Device groups and dynamic membership rules",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Everything in Intune is assigned to a group. Get your group design wrong and you spend the rest of the deployment fighting it: policies that apply to half a population, filters bolted on to compensate, and nobody able to say with confidence which devices receive what. You will build the dynamic device groups this course targets, learn the rule syntax properly, and see the two behaviours that surprise people — evaluation delay, and what happens when a device matches nothing.",

  objectives: [
    "Choose between assigned and dynamic membership for a given targeting requirement",
    "Write dynamic membership rules using device properties and the correct operators",
    "Build device groups for platform, ownership and Autopilot registration",
    "Explain why a user group and a device group are not interchangeable in Intune",
    "Diagnose a rule that matches nothing"
  ],

  keyConcepts: ["Dynamic membership rule", "deviceOwnership", "deviceOSType", "devicePhysicalIds", "ZTDId", "Rule processing state"],

  skills: [{ id: "g1.t1.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Entra admin center" }],
    personas: ["adele.vance", "alex.wilber"],
    labs: ["device-identity"]
  },

  exercises: [
    {
      id: "e1",
      title: "Assigned or dynamic",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Understand the trade-off",
          steps: [
            {
              text: "Dynamic membership requires Microsoft Entra ID P1 or P2, which Microsoft 365 E5 includes. Choosing between the two is a design decision, not a licensing one.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Assigned", "Dynamic"],
                  rows: [
                    ["Membership", "You add and remove members by hand", "Evaluated from a rule against object attributes"],
                    ["Best for", "Pilot rings, exception groups, anything with no attribute in common", "Platform, ownership, department, anything attribute-driven"],
                    ["Latency", "Immediate", "Minutes, and up to 24 hours after a rule change in a large tenant"],
                    ["Failure mode", "Someone forgets to add a device", "A rule silently matches nothing and the policy appears to do nothing"],
                    ["Can mix users and devices", "Technically yes, and you should not", "No — a rule targets one object type"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "A dynamic group is either a *user* group or a *device* group, chosen at creation and not changeable afterwards. Several Intune policy types accept only one kind. If a policy looks assigned but reaches nobody, the first thing to check is whether you targeted a user group with a device-only policy."
                }
              ]
            }
          ],
          result: {
            text: "You can justify assigned versus dynamic for a given requirement.",
            verify: [{ text: "You can name one case where assigned membership is the better choice." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Write dynamic device rules",
      intro:
        "Lab 3 created several of these with a script. Now build one by hand so the syntax and the rule builder are familiar.",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create a dynamic group with the rule builder",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Groups**, then **All groups**, then **New group**.",
              nav: ["Groups", "All groups", "New group"]
            },
            {
              text: "Configure the group:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Group type", value: "Security" },
                    { label: "Group name", value: "GRP-DEV-WIN-11" },
                    { label: "Membership type", value: "Dynamic Device", note: "Not Dynamic User. The option list differs, and so does the set of properties available to the rule." }
                  ]
                }
              ]
            },
            {
              text: "Under **Dynamic device members**, select **Edit dynamic query**, then build this rule:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Property", value: "deviceOSType" },
                    { label: "Operator", value: "Equals" },
                    { label: "Value", value: "Windows" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **And**, then add a second expression." },
                    { text: "Property `deviceOSVersion`, operator **Starts With**, value `10.0.2`." }
                  ]
                }
              ]
            },
            {
              text: "Switch to the **Rule syntax** tab and read what the builder produced:",
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  code: "(device.deviceOSType -eq \"Windows\") and (device.deviceOSVersion -startsWith \"10.0.2\")",
                  copyable: true
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The syntax view is worth learning because the exam shows rules as text, not as the builder. Note the `device.` prefix, the dash-prefixed operators (`-eq`, `-ne`, `-startsWith`, `-contains`, `-any`, `-all`), and that string values are double-quoted."
                }
              ]
            },
            {
              text: "Select **Save**, then **Create**."
            }
          ],
          result: {
            text: "A dynamic device group exists with a rule you wrote by hand.",
            verify: [
              { text: "`GRP-DEV-WIN-11` exists with a membership type of **Dynamic Device**." },
              { text: "The rule syntax matches the expression above." }
            ]
          }
        },
        {
          id: "t2",
          title: "Learn the rules that matter for this course",
          checkpoint: true,
          steps: [
            {
              text: "Review the rules lab 3 created and what each one is for. You will assign policy to these repeatedly.",
              parts: [
                {
                  kind: "table",
                  headers: ["Group", "Rule", "Used by"],
                  rows: [
                    ["`GRP-DEV-WIN-CORP`", "`device.deviceOSType -eq \"Windows\"` and `device.deviceOwnership -eq \"Company\"`", "Configuration profiles, compliance, BitLocker, update rings"],
                    ["`GRP-DEV-WIN-PERSONAL`", "`device.deviceOwnership -eq \"Personal\"`", "Excluded from corporate configuration"],
                    ["`GRP-DEV-ANDROID-WP`", "`device.deviceOSType -eq \"AndroidForWork\"`", "Work profile configuration"],
                    ["`GRP-DEV-AUTOPILOT`", "`device.devicePhysicalIds -any (_ -startsWith \"[ZTDId]\")`", "Autopilot deployment profile assignment"]
                  ]
                }
              ]
            },
            {
              text: "Study the Autopilot rule closely — it is the one people copy incorrectly.",
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  code: "(device.devicePhysicalIds -any (_ -startsWith \"[ZTDId]\"))",
                  caption: "Matches any device with an Autopilot Zero Touch Deployment identifier",
                  copyable: true
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "`devicePhysicalIds` is a multi-valued property, which is why it needs the `-any` operator and the `_` placeholder for the current element. Writing `device.devicePhysicalIds -startsWith \"[ZTDId]\"` without `-any` is a syntax error the portal will reject. Memorise this rule — it appears on the exam and in every real Autopilot deployment."
                }
              ]
            },
            {
              text: "Note the ownership value that catches people out:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "`deviceOwnership` for corporate devices is the string `Company`, not `Corporate`. The Intune portal displays the word *Corporate* in device lists, and the directory attribute says `Company`. A rule written with `Corporate` is valid syntax that matches nothing."
                }
              ]
            }
          ],
          result: {
            text: "You can read and write the device rules this course depends on.",
            verify: [
              { text: "You can explain why the Autopilot rule needs `-any`." },
              { text: "You know which literal value means a corporate-owned device." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Watch a rule populate, and diagnose one that does not",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Confirm your joined device lands in the right group",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-DEV-WIN-11**, then select **Members**.",
              nav: ["Groups", "All groups", "GRP-DEV-WIN-11", "Members"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "It may be empty. Rule evaluation runs asynchronously and a newly created rule can take several minutes, occasionally much longer, before it first populates. Empty immediately after creation means nothing."
                }
              ]
            },
            {
              text: "In **Groups** > **All groups**, select **GRP-DEV-WIN-11**, then select **Dynamic membership rules** and check the processing state, which is the field that tells you whether evaluation is even running:",
              nav: ["Groups", "All groups", "GRP-DEV-WIN-11", "Dynamic membership rules"],
              parts: [
                {
                  kind: "verify",
                  text: "**Dynamic membership rule processing status** reads **Evaluation completed** or **Update in progress**. If it reads **Processing paused**, the rule is not being evaluated at all and no amount of waiting will help."
                }
              ]
            },
            {
              text: "Wait, then refresh **Members** until `MD102-VM2-Alex` appears."
            },
            {
              text: "Check `GRP-DEV-WIN-CORP` as well.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Alex's device probably will **not** appear here yet, and that is correct. `deviceOwnership` is only set to `Company` once a device is enrolled as corporate — either through Autopilot, a corporate identifier, or an enrollment profile. A device joined manually through Settings defaults to **Personal**. Lab 11 fixes this deliberately, and this is exactly the surprise that makes people think dynamic groups are broken."
                }
              ]
            }
          ],
          result: {
            text: "You have seen a rule populate and understand why a correct-looking rule can still match nothing.",
            verify: [
              { text: "`GRP-DEV-WIN-11` contains `MD102-VM2-Alex`." },
              { text: "You can explain why the same device is not yet in `GRP-DEV-WIN-CORP`." }
            ]
          }
        },
        {
          id: "t2",
          title: "Validate rules before you rely on them",
          checkpoint: true,
          steps: [
            {
              text: "In **Groups** > **All groups**, select **GRP-DEV-WIN-CORP**, select **Dynamic membership rules**, then select **Validate Rules**.",
              nav: ["Groups", "All groups", "GRP-DEV-WIN-CORP", "Dynamic membership rules", "Validate Rules"]
            },
            {
              text: "Add `MD102-VM2-Alex` as a device to validate against, then select **Validate**.",
              parts: [
                {
                  kind: "verify",
                  text: "The result shows **Not a member**, and expanding the row shows which clause failed — the ownership test."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Validate Rules** answers the question *why is this object not in this group* directly, instead of leaving you to guess. Reach for it before rewriting a rule you think is broken."
                }
              ]
            }
          ],
          result: {
            text: "You can prove why a specific device does or does not match a rule.",
            verify: [
              { text: "Validation reports the specific clause that excluded the device." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "List dynamic groups and their rules",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "Group.Read.All"

Get-MgGroup -All |
    Where-Object { $_.GroupTypes -contains "DynamicMembership" } |
    Select-Object DisplayName,
        @{n='State'; e={$_.MembershipRuleProcessingState}},
        @{n='Rule';  e={$_.MembershipRule}} |
    Sort-Object DisplayName |
    Format-List`
    }
  ],

  troubleshooting: [
    {
      symptom: "A dynamic device group stays empty although devices clearly match the rule.",
      rootCause:
        "Most often the rule tests `deviceOwnership -eq \"Corporate\"`, which never matches — the directory value is `Company`. Second most often, rule processing is paused, or the group was created as Dynamic User rather than Dynamic Device.",
      diagnostic: {
        lang: "powershell",
        code: "Get-MgGroup -Filter \"displayName eq 'GRP-DEV-WIN-CORP'\" |\n    Select-Object DisplayName, GroupTypes, MembershipRuleProcessingState, MembershipRule |\n    Format-List"
      },
      resolution:
        "Correct the literal to `Company`, confirm **MembershipRuleProcessingState** is `On`, and use **Validate Rules** against a known device to see which clause fails. A group created as Dynamic User cannot be converted — recreate it."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You need a dynamic device group containing every device registered with Windows Autopilot. Which membership rule is correct?",
      options: [
        "`(device.devicePhysicalIds -any (_ -startsWith \"[ZTDId]\"))`",
        "`(device.devicePhysicalIds -startsWith \"[ZTDId]\")`",
        "`(device.deviceOwnership -eq \"Autopilot\")`",
        "`(device.enrollmentProfileName -eq \"Autopilot\")`"
      ],
      correctIndex: 0,
      rationale:
        "`devicePhysicalIds` is multi-valued, so it requires the `-any` operator with the `_` placeholder representing each element. Without `-any` the expression is rejected as invalid syntax.",
      examTip:
        "This exact rule appears in Microsoft's Autopilot documentation and on the exam. Learn it verbatim, including the square brackets around ZTDId.",
      skills: ["g1.t1.s4"]
    },
    {
      id: "q2",
      question:
        "A dynamic device group uses the rule `(device.deviceOwnership -eq \"Corporate\")`. The group has no members despite many corporate devices being enrolled. What is wrong?",
      options: [
        "The correct attribute value is `Company`, not `Corporate`",
        "Dynamic device groups require Microsoft Entra ID P2",
        "The rule must use `-contains` rather than `-eq`",
        "Device ownership can only be evaluated in a Dynamic User group"
      ],
      correctIndex: 0,
      rationale:
        "The Intune portal displays corporate devices as *Corporate*, but the directory attribute value is the string `Company`. The rule is syntactically valid, so it saves and evaluates successfully — it simply matches nothing.",
      examTip:
        "Valid syntax with zero members almost always means a wrong literal value rather than a wrong operator. Use Validate Rules against a known-good device to confirm.",
      skills: ["g1.t1.s4"]
    }
  ]
};
