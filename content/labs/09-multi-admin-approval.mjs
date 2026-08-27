export default {
  id: "multi-admin-approval",
  moduleId: "m1",
  title: "Multi-admin approval and access policies",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "A single administrator can deploy a script to every device in the organisation. That is a great deal of trust to place in one person and one afternoon. Multi-admin approval requires a second administrator to approve certain changes before they take effect, which turns an accidental or malicious tenant-wide deployment into a request somebody has to agree with. The first thing it protects is itself: creating the access policy is a change somebody else has to approve, so you cannot enable it alone. You will build the approver, bootstrap the first policy through its own approval, feel the friction from both sides, and understand the configurations that can lock your whole tenant out of making changes.",

  objectives: [
    "Explain which resources multi-admin approval can protect, and which one is protected automatically",
    "Give an approver group the role assignments and permissions approval actually requires",
    "Create an access policy and bootstrap it through its own approval",
    "Submit a change as a requester and see it held pending approval",
    "Approve, complete and reject requests as a second administrator",
    "Avoid the self-lockout that a badly scoped approver group or a Role policy creates"
  ],

  keyConcepts: [
    "Multi-admin approval",
    "Access policy",
    "Approver group",
    "Business justification",
    "Needs approval",
    "Complete",
    "Protected resources"
  ],

  skills: [{ id: "g1.t3.s3", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-intune", "admin-breakglass", "patti.fernandez"],
    labs: ["intune-rbac"]
  },

  exercises: [
    {
      id: "e1",
      title: "Understand what can be protected",
      estimatedMinutes: 8,
      tasks: [
        {
          id: "t1",
          title: "Review the protected resources and plan the approver group",
          steps: [
            {
              text: "Multi-admin approval covers a deliberately small set of high-blast-radius operations. Each of these is a *profile type* you select when you create an access policy, and each needs its own policy — protection does not cascade.",
              parts: [
                {
                  kind: "table",
                  headers: ["Profile type", "What requires approval"],
                  rows: [
                    ["Apps", "App deployments — create, edit, delete and assign. App protection policies are **not** covered."],
                    ["Compliance policies", "Creating and managing compliance policies"],
                    ["Configuration policies", "Creating and managing settings catalog policies"],
                    ["Device actions", "Wipe, retire and delete on managed devices"],
                    ["Role-based access control", "Changes to roles, including role permissions, admin groups and member group assignments"],
                    ["Scripts", "Deploying PowerShell scripts to Windows devices"],
                    ["Tenant Configuration", "Creating, editing and deleting device categories"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "There is an eighth protected resource you will not find in that list: **access policies themselves**. Intune protects them automatically, which is exactly why **Access policy** is missing from the *Profile type* dropdown — you cannot create a policy to protect it, and you cannot turn it off. Every access policy you create, edit or delete is a request a second administrator has to approve. Exercise 2 is where you meet this, and it surprises almost everybody the first time."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The list of protected resources has grown over time. Check the *Profile type* dropdown in the portal rather than assuming — a resource that was unprotected when you last looked may now be covered."
                }
              ]
            },
            {
              text: "An approver is not simply a person you trust. Intune imposes five separate requirements, and missing any one of them produces silence rather than an error.",
              parts: [
                {
                  kind: "table",
                  headers: ["Requirement", "What happens when you miss it"],
                  rows: [
                    ["The approver group is a **security group**", "Microsoft 365 groups, distribution lists and mail-enabled security groups silently fail to resolve. No error — just no approvers."],
                    ["The group is directly assigned to an Intune role as a *member group*", "If the group is not on a role assignment, Intune periodically strips its members and approvals stop working. Permissions the members hold individually or through other groups do not count."],
                    ["Members are direct members of that group", "Nested group membership behaves unreliably."],
                    ["The approver holds *Read* on the resource being approved", "An approver who cannot read scripts cannot approve a script request. Approving a device delete needs `ManagedDevices/Read`."],
                    ["The approver is not the requester", "An administrator can never approve their own request."]
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "The self-approval rule has no exceptions. A Global Administrator cannot approve their own request, and neither can an Intune Administrator, even when they are a member of the approver group. If the only member of your approver group is the account you make changes with, every request you submit sits at **Needs approval** until it expires after three days, and the protected resource is effectively read-only for the whole tenant. Name at least two approvers, and make sure one of them is not you."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Administrators taking part in the approval workflow need an Intune licence unless the tenant has **Allow access to unlicensed admins** turned on. Tenants created after July 2021 have unlicensed admin access on by default, which is what the unlicensed admin personas in this lab depend on. If you have to enable that setting by hand, note that it is **irreversible**."
                }
              ]
            }
          ],
          result: {
            text: "You know which operations approval covers, that access policies protect themselves, and what an approver actually needs.",
            verify: [
              { text: "You can name the resource that is protected without appearing in the *Profile type* list." },
              { text: "You can name the failure that a Microsoft 365 group used as an approver group causes." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Build the approver, then create the access policy",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Give the approver group the permissions approval requires",
          checkpoint: true,
          steps: [
            {
              text: "Do this **before** you create any access policy. Once the first policy is submitted you need a working approver to release it, and building one afterwards is harder than building one now.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "This is the ordering mistake that strands the lab. Create the policy first and you have a pending request nobody in your tenant is permitted to approve."
                }
              ]
            },
            {
              text: "In the **Microsoft Entra admin center**, create a **security group** named `GRP-ADM-APPROVERS` and add `patti.fernandez` as a direct member."
            },
            {
              text: "In the **Microsoft Intune admin center**, assign the built-in **Read Only Operator** role to the group, using the flow from lab 7. Assign it to `GRP-ADM-APPROVERS` as the *member group* — not to Patti directly.",
              nav: ["Tenant administration", "Roles", "All roles"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "This assignment does two jobs. It gives Patti the *Read* permissions she needs to see what she is approving, and it satisfies the rule that the approver group must itself be on a role assignment or Intune will strip its members."
                }
              ]
            },
            {
              text: "**Read Only Operator** cannot approve an access policy, so create a custom role for that. Select **Tenant administration**, then **Roles**, then **All roles**, then **Create**.",
              nav: ["Tenant administration", "Roles", "All roles", "Create"],
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "MAA Approver" },
                    { label: "Description", value: "Approve or reject multi-admin approval requests" }
                  ]
                }
              ]
            },
            {
              text: "On *Permissions*, find the **Multi Admin Approval** category and enable exactly these two:",
              parts: [
                {
                  kind: "table",
                  headers: ["Permission", "Why"],
                  rows: [
                    ["Approval for Multi Admin Approval", "Approve or reject approval requests for multi-admin approval configuration. This is the permission that releases an access policy request."],
                    ["Read access policy", "See the access policy the request is asking to create"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The other three permissions in this category — *Create access policy*, *Update access policy* and *Delete access policy* — belong to whoever manages policies, not to whoever approves them. Leave them off."
                }
              ]
            },
            {
              text: "Finish the wizard, then assign **MAA Approver** to `GRP-ADM-APPROVERS` as the member group, exactly as you did for **Read Only Operator**.",
              parts: [
                {
                  kind: "verify",
                  text: "`GRP-ADM-APPROVERS` appears as a member group on two role assignments: **Read Only Operator** and **MAA Approver**."
                }
              ]
            }
          ],
          result: {
            text: "The approver group can read what it approves and is permitted to approve access policies.",
            verify: [
              { text: "`GRP-ADM-APPROVERS` is a security group with `patti.fernandez` as a direct member." },
              { text: "The custom role grants *Approval for Multi Admin Approval*." },
              { text: "Both roles are assigned to the group, not to the user." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create the access policy and bootstrap it through its own approval",
          checkpoint: true,
          steps: [
            {
              text: "Signed in as `admin-intune`, select **Tenant administration**, then **Multi Admin Approval**, then **Access policies**, then **Create**.",
              nav: ["Tenant administration", "Multi Admin Approval", "Access policies", "Create"]
            },
            {
              text: "On *Basics*, configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Approval required — Scripts" },
                    { label: "Description", value: "A second administrator must approve any script change" },
                    { label: "Profile type", value: "Scripts" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Each policy carries a single profile type. Protecting a second resource means a second policy."
                }
              ]
            },
            {
              text: "On *Approvers*, select **Add groups** and choose `GRP-ADM-APPROVERS`.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "One group, included. Configurations that exclude groups are not supported here."
                }
              ]
            },
            {
              text: "On *Exclusions*, add nothing and continue.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "This page excludes enterprise applications from enforcement, and every entry is a hole in the control. Exclusions apply only to app-auth calls made through Microsoft Graph — delegated calls are always enforced — and they are capped at 50 applications per policy. If a service principal you excluded is compromised, it can change the protected resource with no approval at all."
                }
              ]
            },
            {
              text: "On *Review + submit for approval*, enter a justification and select **Submit for approval**. Note that the button does not say *Create*.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Business justification", value: "Setup — requiring a second administrator for script changes" }
                  ]
                },
                {
                  kind: "verify",
                  text: "**Access policies** does **not** list a new policy. Instead a request appears under **My requests** showing *Name* **Approval required — Scripts - Create**, *Resource type* **Access policy**, and a status of **Needs approval** (some views label this **Needs review**)."
                }
              ]
            },
            {
              text: "Read that result carefully, because it looks like a failure and is not one.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Nothing is wrong. Creating an access policy is itself a protected change, so what you produced is a pending request rather than a live policy — and until it is approved and completed, **script changes are not yet protected**. This is the automatic protection from exercise 1 doing its job on the very first policy."
                }
              ]
            },
            {
              text: "In a private browser window, sign in as `patti.fernandez@<tenant>.onmicrosoft.com`, select **Tenant administration**, then **Multi Admin Approval**, then **Received requests**, open the request through its *Business justification* link, enter **Approver notes** and select **Approve request**.",
              nav: ["Tenant administration", "Multi Admin Approval", "Received requests"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Patti can do this only because of the custom role in task 1. Without *Approval for Multi Admin Approval* she can see the request and not act on it. The same requests are also reachable from **All requests** and from **Tenant administration** > **Admin tasks**."
                }
              ]
            },
            {
              text: "Sign back in as `admin-intune`, open the request under **My requests**, and select **Complete**.",
              nav: ["Tenant administration", "Multi Admin Approval", "My requests"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Approval is not application. The request sits at **Approved** until the original requester returns and selects **Complete**, which is what actually applies the change. Approve a request, walk away, and nothing happens."
                },
                {
                  kind: "verify",
                  text: "The request status reaches **Completed**, and **Access policies** now lists **Approval required — Scripts** with `GRP-ADM-APPROVERS` shown as the approver group."
                }
              ]
            }
          ],
          result: {
            text: "Script changes now require a second administrator's approval — and you have already used the approval workflow once to get here.",
            verify: [
              { text: "The access policy exists for the **Scripts** profile type." },
              { text: "The bootstrap request shows **Completed** in **My requests**." },
              { text: "`GRP-ADM-APPROVERS` has a member who can sign in to Intune and approve." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Request, approve and reject",
      estimatedMinutes: 17,
      tasks: [
        {
          id: "t1",
          title: "Submit a change as the requester",
          checkpoint: true,
          steps: [
            {
              text: "Signed in as `admin-intune`, select **Devices**, then **Scripts and remediations**, then **Platform scripts**, then **Add** > **Windows 10 and later**.",
              nav: ["Devices", "Scripts and remediations", "Platform scripts", "Add"]
            },
            {
              text: "Create a trivial script so the approval flow is the only thing under test:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "MAA test script" },
                    { label: "Script file", value: "A .ps1 file containing a single Write-Output line" },
                    { label: "Run this script using the logged on credentials", value: "No" }
                  ]
                },
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Save this as maa-test.ps1 and upload it",
                  code: "Write-Output \"Multi-admin approval test. This script does nothing.\""
                }
              ]
            },
            {
              text: "Assign it to `GRP-USR-PILOT` and continue to the end of the wizard."
            },
            {
              text: "At the final step you are asked for a business justification rather than being allowed to save.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Business justification", value: "Testing the multi-admin approval workflow" }
                  ]
                },
                {
                  kind: "verify",
                  text: "The request is submitted and the script does **not** appear in the platform scripts list. It is held until approved."
                }
              ]
            },
            {
              text: "Check the request status under **Tenant administration** > **Multi Admin Approval** > **My requests**.",
              nav: ["Tenant administration", "Multi Admin Approval", "My requests"],
              parts: [
                {
                  kind: "verify",
                  text: "The request is listed as **Needs approval** with your justification, the operation **Create**, and the time you submitted it."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Intune notifies nobody. If a request matters, tell an approver out of band — and remember it **expires after three days** and has to be resubmitted. You can withdraw it yourself with **Cancel request** while it is still pending, and while it is pending you cannot submit another request against the same object."
                }
              ]
            }
          ],
          result: {
            text: "A protected change is queued rather than applied.",
            verify: [
              { text: "**My requests** shows the request as **Needs approval**." },
              { text: "The script is absent from **Platform scripts**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Approve and complete, then reject one",
          checkpoint: true,
          steps: [
            {
              text: "In a private browser window, sign in as `patti.fernandez@<tenant>.onmicrosoft.com`."
            },
            {
              text: "Select **Tenant administration**, **Multi Admin Approval**, then **Received requests**.",
              nav: ["Tenant administration", "Multi Admin Approval", "Received requests"]
            },
            {
              text: "Select the *Business justification* link to open the request and review what it will change.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "The approver sees the full payload of the change, not just its name. This is the point of the feature — approval is meaningless if the approver cannot see what they are agreeing to."
                }
              ]
            },
            {
              text: "Enter **Approver notes** and select **Approve request**."
            },
            {
              text: "Sign back in as `admin-intune`, open the request under **My requests**, select **Complete**, and confirm the script now exists under **Platform scripts**.",
              parts: [
                {
                  kind: "verify",
                  text: "The request reads **Completed**, and **MAA test script** is listed and assigned to `GRP-USR-PILOT`."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "If the script is still missing after **Complete**, check the portal notifications. Intune reports there whether applying the approved change succeeded or failed."
                }
              ]
            },
            {
              text: "Now exercise the rejection path: delete the script, supply a justification, and this time have Patti **Reject request** with a note explaining why.",
              parts: [
                {
                  kind: "verify",
                  text: "The script remains in place and **My requests** shows the request as **Rejected** with the approver's note. A rejected request makes no change at all, and there is nothing to complete."
                }
              ]
            }
          ],
          result: {
            text: "You have driven the approval workflow from both sides and seen both outcomes.",
            verify: [
              { text: "An approved request applied its change only after **Complete**." },
              { text: "A rejected request left the tenant unchanged and recorded the reason." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom:
        "You created an access policy but **Access policies** is empty, and a request with resource type **Access policy** is sitting at **Needs approval**.",
      rootCause:
        "Working as intended. Access policies are protected automatically, so creating one is itself a change a second administrator has to approve. Nothing is enforced until that request is approved and the requester selects **Complete**.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > My requests\nLook for Name '[policy name] - Create', Resource type 'Access policy', Status 'Needs approval'."
      },
      resolution:
        "Have a different administrator who holds the *Approval for Multi Admin Approval* permission approve it from **Received requests**, then sign back in as the requester and select **Complete**. A Global Administrator can do this without extra setup; a **Read Only Operator** cannot, because that role does not include the permission. If nobody suitable exists yet, select **Cancel request**, grant the permission through a custom role, and resubmit — the request expires after three days regardless."
    },
    {
      symptom: "Nobody can change a protected resource, and every request sits pending forever.",
      rootCause:
        "The approver group has no usable members. Common causes: it is a Microsoft 365 group or distribution list rather than a security group, it is not assigned to any Intune role so Intune stripped its members, its members are nested rather than direct, or its only member is the same account submitting the requests — and no administrator can approve their own request.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > Access policies\nOpen the policy, note the approver group, then check in Entra ID:\n  - group type is Security\n  - members are direct, not nested\nTenant administration > Roles > All roles\n  - the group appears as a member group on a role assignment"
      },
      resolution:
        "Fix the group, then resubmit. Editing or deleting the access policy is itself a protected change needing approval, so repair the group rather than reaching for the policy. Always name a security group with at least two direct members, and assign it to an Intune role."
    },
    {
      symptom:
        "After creating an access policy for **Role-based access control**, no RBAC change can be made — including the role assignments multi-admin approval itself depends on.",
      rootCause:
        "The Role profile type protects every role-related change: role permissions, admin groups and member group assignments. If the approver group's role assignment is not already correct, you cannot fix it, because fixing it needs an approval the broken configuration cannot produce.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > Access policies\nLook for a policy whose profile type is Role-based access control."
      },
      resolution:
        "Delete the access policy configured for the Role profile type, wait 3-5 minutes for the change to propagate, then complete the RBAC assignments under **Tenant administration** > **Roles** and add the approver group to a role assignment. Re-create the Role policy afterwards if you want it. Avoid the deadlock entirely by configuring every other access policy and verifying RBAC assignments before you enable a Role policy."
    },
    {
      symptom: "An administrator says approval is not being requested for configuration profile changes.",
      rootCause: "An access policy exists for one profile type only. Each protected resource needs its own access policy.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > Access policies"
      },
      resolution:
        "Create an additional access policy with the profile type set to the resource you want to protect. Policies do not cascade across resource types. Remember that creating that policy is itself a change requiring approval."
    },
    {
      symptom: "A Graph script or third-party tool that used to work now fails against a protected resource.",
      rootCause:
        "Multi-admin approval is enforced on application-authenticated Graph calls as well as interactive admin actions, so automation that writes to a protected resource is intercepted the same way a portal click is.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > My requests\nCheck whether the automation's calls are appearing as pending requests."
      },
      resolution:
        "Update the automation to submit a business justification and handle the approval workflow. Excluding the application on the policy's *Exclusions* page is possible but removes the protection for that app, and works only for app-auth calls — delegated calls are always enforced."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You enable multi-admin approval for Apps and name an approver group containing only your own administrator account. What happens when you submit an app change?",
      options: [
        "The request sits at Needs approval until it expires, because nobody may approve their own request",
        "The request is created and you can approve it yourself",
        "The change applies immediately because you are in the approver group",
        "The access policy fails to save"
      ],
      correctIndex: 0,
      rationale:
        "An administrator can never approve their own request, whatever role they hold and whether or not they are in the approver group. The request is created, appears on **All requests** where you can see but not action it, and expires after three days — leaving Apps effectively read-only for the tenant. The approver group has to contain somebody else.",
      examTip:
        "The control is technical, not merely procedural: Intune enforces the second person rather than just recommending one. Name at least two approvers, and never make the requesting account the only approver.",
      skills: ["g1.t3.s3"]
    },
    {
      id: "q2",
      question:
        "You are the first administrator to configure multi-admin approval in a tenant. You create an access policy for Scripts and select Submit for approval. What is the immediate result?",
      options: [
        "A pending request with resource type Access policy — the policy is not active and scripts are not yet protected",
        "The policy is created and active, because the first policy has nothing to be approved by",
        "The policy is created but disabled until you enable it",
        "An error, because no access policy protects access policies yet"
      ],
      correctIndex: 0,
      rationale:
        "Access policies are protected automatically, which is why **Access policy** is not offered as a profile type. That protection applies to the very first policy too: creating it produces a request a different administrator holding *Approval for Multi Admin Approval* must approve, after which the requester selects **Complete** to apply it. Until then nothing is enforced.",
      examTip:
        "Remember the three-step shape of every protected change: submit with a justification, somebody else approves, the requester completes. Approval alone does not apply the change.",
      skills: ["g1.t3.s3"]
    },
    {
      id: "q3",
      question:
        "Patti is a direct member of the approver group named on your Scripts access policy, and the group is assigned the Read Only Operator role. She can see a pending access policy request but cannot approve it. Why?",
      options: [
        "Approving an access policy request needs the Approval for Multi Admin Approval permission, which Read Only Operator does not include",
        "Read Only Operator cannot be used as an approver role for any request type",
        "Her membership is nested rather than direct",
        "Access policy requests can only be approved by a Global Administrator"
      ],
      correctIndex: 0,
      rationale:
        "Approving a change to a protected resource needs *Read* on that resource, but approving a change to an access policy needs the separate *Approval for Multi Admin Approval* permission in the **Multi Admin Approval** category. Read Only Operator grants the reads and not that permission, so Patti can approve script requests but not access policy requests until a custom role supplies it.",
      examTip:
        "Distinguish the three MAA roles: the access policy manager creates policies, the approver approves requests, and the requestor submits and completes changes. They need different permissions.",
      skills: ["g1.t3.s3"]
    }
  ]
};
