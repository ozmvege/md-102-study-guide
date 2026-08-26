export default {
  id: "scope-tags-and-aus",
  moduleId: "m1",
  title: "Scope tags, administrative units and scoped administration",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Contoso's regional IT teams must each manage only their own devices and policies. A role restricts *what actions* an administrator can take; a scope tag restricts *which objects* those actions can touch. You will tag a set of objects, scope an operator to that tag, and then prove from the operator's own session that everything untagged has become invisible — which is the behaviour people find surprising and the exam likes to test.",

  objectives: [
    "Explain the difference between a role, a scope group and a scope tag",
    "Create scope tags and apply them to devices and policies",
    "Scope a role assignment so an operator sees only tagged objects",
    "Create an administrative unit and scope a Microsoft Entra role to it",
    "Predict what a scoped administrator sees when an object carries no tag"
  ],

  keyConcepts: ["Scope tag", "Default scope tag", "Scoped administration", "Administrative unit", "Multi-admin environments"],

  skills: [{ id: "g1.t3.s2", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "portal", id: "Microsoft Entra admin center" }
    ],
    personas: ["helpdesk.operator", "alex.wilber", "henrietta.mueller"],
    labs: ["intune-rbac"]
  },

  exercises: [
    {
      id: "e1",
      title: "Create and apply scope tags",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create a scope tag for Finance",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then **Scope (Tags)**.",
              nav: ["Tenant administration", "Roles", "Scope (Tags)"]
            },
            {
              text: "Select **Create** and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "TAG-FINANCE" },
                    { label: "Description", value: "Finance department devices, policies and applications" }
                  ]
                }
              ]
            },
            {
              text: "On **Assignments**, select `GRP-USR-FINANCE`.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Assigning a group here automatically applies the tag to devices belonging to those users as they enrol. You can also tag objects individually, which is what the next task does."
                }
              ]
            },
            {
              text: "Select **Create**, then repeat to create a second tag named `TAG-IT` assigned to `GRP-USR-IT`."
            },
            {
              text: "Note the tag that already exists:",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Every object you have created so far carries the **Default** scope tag, because Intune applies it automatically to anything created without an explicit tag. An operator scoped only to `TAG-FINANCE` will therefore not see any of it. That is the single most confusing behaviour in this feature, and the reason scoped administration is usually rolled out by tagging everything first."
                }
              ]
            }
          ],
          result: {
            text: "Two scope tags exist, each associated with a department group.",
            verify: [
              { text: "**Scope (Tags)** lists `TAG-FINANCE`, `TAG-IT` and **Default**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Tag a device and a policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, then **All devices**, then open `MD102-VM2-Alex`.",
              nav: ["Devices", "All devices"]
            },
            {
              text: "Select **Properties**, then next to **Scope tags** select **Edit**. Add `TAG-FINANCE`, then select **Review + save**.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Leave **Default** applied as well. An object can carry several tags, and removing Default while you are still learning is how you make an object invisible to yourself."
                }
              ]
            },
            {
              text: "Now tag a policy. Any configuration profile will do — if you have none yet, come back to this after lab 22.",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the profile and select **Properties**." },
                    { text: "Next to **Scope tags** select **Edit** and add `TAG-FINANCE`." },
                    { text: "Select **Review + save**." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "At least one device carries the Finance scope tag.",
            verify: [
              { text: "`MD102-VM2-Alex` shows `TAG-FINANCE` under **Properties** > **Scope tags**." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Scope an operator and prove the restriction",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create a scoped role assignment",
          checkpoint: true,
          steps: [
            {
              text: "Select **Tenant administration**, **Roles**, **All roles**, then **Help Desk Operator**, then **Assignments**.",
              nav: ["Tenant administration", "Roles", "All roles", "Help Desk Operator", "Assignments"]
            },
            {
              text: "Delete the unrestricted **Help Desk — all devices** assignment you created in lab 7, then select **Create assignment**."
            },
            {
              text: "Configure the scoped assignment:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Help Desk — Finance only" },
                    { label: "Admin Groups", value: "GRP-ADM-HELPDESK", note: "Who holds the role." },
                    { label: "Scope Groups", value: "GRP-USR-FINANCE", note: "Which users and devices they may act on." },
                    { label: "Scope tags", value: "TAG-FINANCE", note: "Which tagged objects are visible. Remove Default." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Remove the **Default** tag from this assignment. Leaving it means the operator can see every object that carries Default — which is almost everything — and the restriction you just built achieves nothing."
                }
              ]
            },
            {
              text: "Select **Create**."
            }
          ],
          result: {
            text: "The help desk role is limited to Finance objects by both scope group and scope tag.",
            verify: [
              { text: "The assignment lists `TAG-FINANCE` and does **not** list **Default**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify from the operator's session",
          checkpoint: true,
          steps: [
            {
              text: "In a private browser window, sign in to `https://intune.microsoft.com` as `helpdesk.operator@<tenant>.onmicrosoft.com`."
            },
            {
              text: "Select **Devices**, then **All devices**.",
              parts: [
                {
                  kind: "verify",
                  text: "Only `MD102-VM2-Alex` is visible. `MD102-VM1-Adele` has disappeared, because it carries no `TAG-FINANCE`."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Objects outside scope are not shown as denied — they simply do not appear. A scoped operator has no way to tell the difference between an object that does not exist and one they cannot see, which is exactly the intent."
                }
              ]
            },
            {
              text: "Select **Devices**, then **Configuration**.",
              parts: [
                {
                  kind: "verify",
                  text: "Only profiles tagged `TAG-FINANCE` appear. Untagged and Default-tagged profiles are hidden."
                }
              ]
            },
            {
              text: "Sign back in as `admin-intune` and compare the same two blades. Everything is visible again."
            }
          ],
          result: {
            text: "Scoped administration demonstrably restricts visibility, not just actions.",
            verify: [
              { text: "The operator sees one device; the administrator sees all of them." },
              { text: "You can explain why removing the **Default** tag from the assignment was necessary." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Administrative units",
      intro:
        "Scope tags restrict Intune. Administrative units restrict Microsoft Entra ID. They solve the same problem in two different services, and the exam expects you to know which is which.",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Create an administrative unit and scope a directory role to it",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Roles and admins**, then **Administrative units**, then **Add**.",
              nav: ["Roles and admins", "Administrative units", "Add"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "AU-FINANCE" },
                    { label: "Description", value: "Finance department users and devices" },
                    { label: "Membership type", value: "Assigned", note: "Dynamic administrative units are also available with Entra ID P1 or P2." }
                  ]
                }
              ]
            },
            {
              text: "Select **Next: Assign roles**, then add `helpdesk.operator` to the **Password Administrator** role.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This is the classic administrative unit scenario: a regional help desk that may reset passwords, but only for users in its own region. The same directory role assigned tenant-wide would let them reset anyone's password, including an administrator's."
                }
              ]
            },
            {
              text: "Create the unit, then open it and add `alex.wilber` and `henrietta.mueller` as members.",
              nav: ["Administrative units", "AU-FINANCE", "Users", "Add member"]
            },
            {
              text: "Compare the two mechanisms:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Scope tag", "Administrative unit"],
                  rows: [
                    ["Service", "Microsoft Intune", "Microsoft Entra ID"],
                    ["Restricts", "Intune objects: devices, policies, apps, profiles", "Directory objects: users, groups, devices"],
                    ["Applied to", "The object, and to the role assignment", "A container the objects are placed into"],
                    ["Typical use", "Regional IT managing their own device estate", "Regional help desk resetting their own users' passwords"],
                    ["Licence", "Included with Intune", "Microsoft Entra ID P1 or P2"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "An administrative unit scopes a Microsoft Entra role to a subset of users.",
            verify: [
              { text: "`AU-FINANCE` exists with two members and a scoped Password Administrator assignment." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Report scope tags and what carries them",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "DeviceManagementRBAC.Read.All","DeviceManagementManagedDevices.Read.All"

$tags = Get-MgDeviceManagementRoleScopeTag -All
$tags | Select-Object Id, DisplayName, Description | Format-Table -AutoSize

Write-Host ""
Write-Host "Devices without a non-default scope tag:" -ForegroundColor Yellow
Get-MgDeviceManagementManagedDevice -All -Property DeviceName,RoleScopeTagIds |
    Where-Object { @($_.RoleScopeTagIds | Where-Object { $_ -ne "0" }).Count -eq 0 } |
    Select-Object DeviceName |
    Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom: "A scoped operator can still see every device in the tenant.",
      rootCause:
        "The role assignment still includes the **Default** scope tag. Almost every object carries Default, so including it in an assignment effectively removes the scoping.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Roles > Help Desk Operator > Assignments\nOpen the assignment and review Scope tags."
      },
      resolution:
        "Remove **Default** from the role assignment and confirm the objects the operator should see carry the intended tag."
    },
    {
      symptom: "A scoped operator sees the correct devices but cannot see any configuration profiles.",
      rootCause: "The profiles carry only the Default tag. Scope tags must be applied to policies as well as devices.",
      diagnostic: {
        lang: "text",
        code: "Devices > Configuration > open a profile > Properties > Scope tags"
      },
      resolution:
        "Add the operator's scope tag to the profiles they need. Tagging devices alone is a half-finished configuration and produces exactly this symptom."
    }
  ],

  quiz: [
    {
      question:
        "You scope a Help Desk Operator assignment to the tag `TAG-FINANCE` but leave the **Default** tag also selected. What is the result?",
      options: [
        "The operator can see every object carrying the Default tag, which is nearly the whole tenant",
        "The operator sees only objects carrying both tags",
        "The assignment is rejected because two tags cannot be combined",
        "Default is ignored whenever a specific tag is present"
      ],
      correctIndex: 0,
      rationale:
        "Scope tags on an assignment are additive, not intersecting. Because Intune applies Default automatically to objects created without an explicit tag, including it grants visibility of essentially everything.",
      examTip:
        "Scope tags combine with OR, not AND. Removing Default is a required step whenever you scope an operator, not an optional tidy-up.",
      skills: ["g1.t3.s2"]
    },
    {
      question:
        "A regional help desk must reset passwords only for users in its own region. Which feature achieves this?",
      options: [
        "A Microsoft Entra administrative unit containing those users, with a scoped Password Administrator assignment",
        "An Intune scope tag applied to those users",
        "An Intune custom role with password reset permission",
        "A dynamic security group with a Conditional Access policy"
      ],
      correctIndex: 0,
      rationale:
        "Password reset is a Microsoft Entra directory permission, so it is scoped with administrative units. Intune scope tags restrict Intune objects and have no bearing on directory role permissions.",
      examTip:
        "Decide which service owns the object first. Directory objects mean administrative units; Intune objects mean scope tags.",
      skills: ["g1.t3.s2"]
    }
  ]
};
