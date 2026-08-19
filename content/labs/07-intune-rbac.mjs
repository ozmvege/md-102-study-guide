export default {
  id: "intune-rbac",
  moduleId: "m1",
  title: "Intune role-based access control and custom roles",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Your help desk needs to wipe lost phones and reset passcodes. It does not need to edit Conditional Access, change compliance policy or delete configuration profiles. Intune has its own role-based access control system, separate from Microsoft Entra directory roles, and the exam expects you to know which one governs what. You will assign a built-in role, build a custom role from individual permissions, and prove the restriction actually holds by signing in as the restricted operator.",

  objectives: [
    "Distinguish Microsoft Entra directory roles from Intune RBAC roles",
    "Assign a built-in Intune role to a group",
    "Create a custom Intune role with a specific permission set",
    "Verify a role restriction from the operator's own sign-in",
    "Describe how Windows 365 roles fit the same model"
  ],

  keyConcepts: ["Intune RBAC", "Built-in roles", "Custom roles", "Role assignment", "Permissions", "Help Desk Operator"],

  skills: [{ id: "g1.t3.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["helpdesk.operator"],
    labs: ["personas-and-groups"]
  },

  exercises: [
    {
      id: "e1",
      title: "Two role systems, one portal",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Separate Entra roles from Intune roles",
          steps: [
            {
              text: "This distinction produces more confusion than any other topic in this module, and the exam tests it directly.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Microsoft Entra directory role", "Intune RBAC role"],
                  rows: [
                    ["Managed in", "Microsoft Entra admin center", "Intune admin center > Tenant administration > Roles"],
                    ["Scope of power", "The whole directory: identity, licences, all workloads", "Intune only"],
                    ["Examples", "Global Administrator, Intune Administrator, Security Administrator", "Help Desk Operator, Policy and Profile Manager, Application Manager"],
                    ["Can be scoped by scope tag", "No", "Yes"],
                    ["Can be scoped to a group of users or devices", "Administrative units only", "Yes, through scope groups"],
                    ["Custom roles", "Yes, with Entra ID P1 or P2", "Yes, included with Intune"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The Entra **Intune Administrator** role grants full control of Intune and overrides anything you configure in Intune RBAC. If you assign someone that directory role and then carefully restrict them with an Intune role, the directory role wins. Restricted operators must **not** hold a broad directory role."
                }
              ]
            },
            {
              text: "Review the built-in Intune roles you are most likely to be asked about:",
              parts: [
                {
                  kind: "table",
                  headers: ["Built-in role", "Typical use"],
                  rows: [
                    ["Help Desk Operator", "Remote actions and user support; can view most things, change few"],
                    ["Policy and Profile Manager", "Create and assign configuration, compliance and Autopilot profiles"],
                    ["Application Manager", "Publish and assign applications, manage app protection policy"],
                    ["Endpoint Security Manager", "Security baselines, antivirus, firewall, disk encryption, EDR policy"],
                    ["Read Only Operator", "View everything, change nothing"],
                    ["School Administrator", "Intune for Education"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can say which system governs a given permission.",
            verify: [{ text: "You can explain why an Intune RBAC restriction fails if the user is also an Entra Intune Administrator." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Assign a built-in role",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Give the help desk group the Help Desk Operator role",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then **All roles**.",
              nav: ["Tenant administration", "Roles", "All roles"]
            },
            {
              text: "Select **Help Desk Operator**, then select **Assignments**, then select **Create assignment**."
            },
            {
              text: "On **Basics**, name the assignment:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Help Desk — all devices" },
                    { label: "Description", value: "Remote actions and user support across the estate" }
                  ]
                }
              ]
            },
            {
              text: "On **Admin Groups**, select `GRP-ADM-HELPDESK`. This is *who receives the role*.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Admin Groups and Scope Groups are the two halves people mix up. **Admin Groups** is who holds the permissions. **Scope Groups** is which users and devices they may exercise those permissions over. Swap them and you have given the help desk power over the help desk and nobody else."
                }
              ]
            },
            {
              text: "On **Scope Groups**, choose **All devices** and **All users** for now. Lab 8 narrows this with scope tags."
            },
            {
              text: "On **Scope tags**, leave **Default** selected, then select **Create**."
            }
          ],
          result: {
            text: "Members of the help desk group hold the Help Desk Operator role.",
            verify: [
              { text: "**Help Desk Operator** > **Assignments** lists your new assignment." },
              { text: "`helpdesk.operator` is a member of `GRP-ADM-HELPDESK`." }
            ]
          }
        },
        {
          id: "t2",
          title: "Prove the restriction from the operator's seat",
          checkpoint: true,
          steps: [
            {
              text: "Open a private browser window and sign in to `https://intune.microsoft.com` as `helpdesk.operator@<tenant>.onmicrosoft.com`.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Use a private window rather than signing out. You will be switching between the administrator and the operator repeatedly, and a second browser profile saves a great deal of time across this course."
                }
              ]
            },
            {
              text: "Check your own effective permissions first:",
              nav: ["Tenant administration", "Roles", "My permissions"],
              parts: [
                {
                  kind: "verify",
                  text: "**My permissions** lists Help Desk Operator and shows the granted actions. This blade is the fastest way to answer *why can this person not do X*."
                }
              ]
            },
            {
              text: "Now test the boundary. Open **Devices** and select a device.",
              parts: [
                {
                  kind: "verify",
                  text: "Remote actions such as **Sync**, **Restart** and **Retire** are available."
                }
              ]
            },
            {
              text: "Attempt something the role should not permit: open **Devices** > **Configuration** and try to create a profile.",
              parts: [
                {
                  kind: "verify",
                  text: "The create action is unavailable or denied. Help Desk Operator can read configuration but not author it."
                }
              ]
            }
          ],
          result: {
            text: "The role restricts what it should, proven from the operator's own session rather than assumed.",
            verify: [
              { text: "The operator can perform remote actions." },
              { text: "The operator cannot create a configuration profile." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Build a custom role",
      intro:
        "Built-in roles rarely match a real team exactly. Custom roles let you compose exactly the permission set you want.",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create an application-only custom role",
          checkpoint: true,
          steps: [
            {
              text: "Sign back in as `admin-intune`. Select **Tenant administration**, **Roles**, **All roles**, then select **Create**.",
              nav: ["Tenant administration", "Roles", "All roles", "Create"]
            },
            {
              text: "On **Basics**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "App Deployment Operator" },
                    { label: "Description", value: "May publish and assign applications and read device inventory. No configuration or security rights." }
                  ]
                }
              ]
            },
            {
              text: "On **Permissions**, grant only the following. Leave every other category at **No**.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Mobile apps — Create", value: "Yes" },
                    { label: "Mobile apps — Read", value: "Yes" },
                    { label: "Mobile apps — Update", value: "Yes" },
                    { label: "Mobile apps — Assign", value: "Yes" },
                    { label: "Mobile apps — Delete", value: "No", note: "Deliberate. Publishing is recoverable; deleting an assigned app uninstalls it from every targeted device." },
                    { label: "Managed devices — Read", value: "Yes", note: "Needed to see whether a deployment actually landed." },
                    { label: "Organization — Read", value: "Yes", note: "Required for the console to render at all." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Organization — Read** is the permission people forget. Without it the admin center loads with almost nothing visible, and it looks as though the whole role is broken rather than missing one entry."
                }
              ]
            },
            {
              text: "On **Scope tags**, leave **Default**, then select **Create**."
            },
            {
              text: "Assign the new role to `GRP-ADM-HELPDESK` using the same **Create assignment** flow as before, so you can test it with the operator account."
            }
          ],
          result: {
            text: "A custom role exists granting application management without configuration or deletion rights.",
            verify: [
              { text: "**All roles** lists **App Deployment Operator** with a type of **Custom**." },
              { text: "The role has an assignment naming `GRP-ADM-HELPDESK`." }
            ]
          }
        },
        {
          id: "t2",
          title: "Note how Windows 365 roles fit the same model",
          steps: [
            {
              text: "The exam objective covers roles for Intune *and Windows 365*. You cannot provision Cloud PCs on Microsoft 365 E5, but you should recognise the roles.",
              parts: [
                {
                  kind: "table",
                  headers: ["Windows 365 role", "Grants"],
                  rows: [
                    ["Windows 365 Administrator", "Full Cloud PC management: provisioning policies, images, network connections"],
                    ["Cloud PC Administrator", "Read and write across the Cloud PC service"],
                    ["Cloud PC Reader", "Read-only view of Cloud PCs and provisioning policies"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "These are Intune RBAC roles, administered in the same **Tenant administration** > **Roles** blade, and they are scoped by the same scope tags. Lab 21 walks through Cloud PC provisioning itself."
                }
              ]
            }
          ],
          result: {
            text: "You can place Windows 365 roles within the Intune RBAC model.",
            verify: [{ text: "You can name the role that permits provisioning-policy management." }]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Export Intune role assignments",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "DeviceManagementRBAC.Read.All"

$roles = Get-MgDeviceManagementRoleDefinition -All

foreach ($role in $roles) {
    $assignments = Get-MgDeviceManagementRoleDefinitionRoleAssignment -RoleDefinitionId $role.Id -All
    if (-not $assignments) { continue }

    foreach ($a in $assignments) {
        [pscustomobject]@{
            Role       = $role.DisplayName
            BuiltIn    = $role.IsBuiltIn
            Assignment = $a.DisplayName
        }
    }
} | Sort-Object Role | Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom: "An operator with a restricted Intune role can still do everything in the console.",
      rootCause:
        "The account also holds a Microsoft Entra directory role — usually Intune Administrator or Global Administrator — which supersedes Intune RBAC entirely.",
      diagnostic: {
        lang: "text",
        code: "Entra admin center > Users > select the user > Assigned roles\nIntune admin center > Tenant administration > Roles > My permissions (signed in as that user)"
      },
      resolution:
        "Remove the directory role from the account. Intune RBAC can only restrict people who are not already privileged at the directory level."
    },
    {
      symptom: "A custom role is assigned but the operator sees an almost empty admin center.",
      rootCause: "The role is missing **Organization — Read**, which the console needs to render tenant context.",
      diagnostic: {
        lang: "text",
        code: "Signed in as the operator:\nTenant administration > Roles > My permissions"
      },
      resolution: "Edit the custom role and set **Organization — Read** to **Yes**. Permission changes take a few minutes to reach an existing session."
    }
  ],

  quiz: [
    {
      question:
        "You create a custom Intune role granting only application permissions and assign it to a help desk group. One member reports they can also edit compliance policies. What is the most likely explanation?",
      options: [
        "That member holds the Microsoft Entra Intune Administrator role, which supersedes Intune RBAC",
        "Custom roles always inherit the permissions of the Help Desk Operator built-in role",
        "The role assignment scope group includes All devices",
        "Compliance policy permissions cannot be removed from a custom role"
      ],
      correctIndex: 0,
      rationale:
        "Microsoft Entra directory roles grant service-wide permissions that Intune RBAC cannot reduce. Restricting an account with Intune RBAC only works if that account holds no broad directory role.",
      examTip:
        "When a restriction does not hold, check directory role membership before re-reading the Intune role. Scope groups limit which objects can be acted upon, never which actions exist.",
      skills: ["g1.t3.s1"]
    },
    {
      question:
        "In an Intune role assignment, what does the Scope Groups setting control?",
      options: [
        "Which users and devices the assigned administrators may manage",
        "Which administrators receive the role",
        "Which scope tags the role can read",
        "Which Microsoft Entra directory roles are inherited"
      ],
      correctIndex: 0,
      rationale:
        "Admin Groups defines who holds the role; Scope Groups defines the set of users and devices they may act on. Confusing the two is the most common misconfiguration in Intune RBAC.",
      examTip:
        "Read it as a sentence: members of the *Admin Group* may perform the role's actions against members of the *Scope Group*.",
      skills: ["g1.t3.s1"]
    }
  ]
};
