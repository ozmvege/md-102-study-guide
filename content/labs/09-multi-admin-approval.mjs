export default {
  id: "multi-admin-approval",
  moduleId: "m1",
  title: "Multi-admin approval and access policies",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "A single administrator can deploy a script to every device in the organisation. That is a great deal of trust to place in one person and one afternoon. Multi-admin approval requires a second administrator to approve certain changes before they take effect, which turns an accidental or malicious tenant-wide deployment into a request somebody has to agree with. You will enable it, feel the friction from both sides, and understand the one configuration that can lock your whole tenant out of making changes.",

  objectives: [
    "Create an access policy requiring approval for a protected resource",
    "Submit a change as a requester and see it held pending approval",
    "Approve and reject requests as a second administrator",
    "Explain which resources multi-admin approval can protect",
    "Avoid the self-lockout that a badly scoped approver group creates"
  ],

  keyConcepts: ["Multi-admin approval", "Access policy", "Approver group", "Pending approval", "Protected resources"],

  skills: [{ id: "g1.t3.s3", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-intune", "helpdesk.operator", "patti.fernandez"],
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
              text: "Multi-admin approval covers a deliberately small set of high-blast-radius operations.",
              parts: [
                {
                  kind: "table",
                  headers: ["Protected resource", "What requires approval"],
                  rows: [
                    ["Apps", "Creating, editing or deleting an application, and changing its assignments"],
                    ["Scripts", "Creating, editing or deleting PowerShell scripts and remediation scripts"],
                    ["Device remote actions", "Wipe, retire and delete on managed devices"],
                    ["Compliance policies", "Creating, editing or deleting compliance policy"],
                    ["Configuration profiles", "Creating, editing or deleting device configuration"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The list of protected resources has grown over time. Check the current list in the portal rather than assuming — a resource that was unprotected when you last looked may now be covered."
                }
              ]
            },
            {
              text: "Plan the approver group before enabling anything.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "The approver group must contain at least one account that is **not** the account making requests, and that account must be able to sign in. If you name a group whose only member is you, every change you make waits for your own approval — which works, but is theatre. If you name a group with no usable members at all, nobody can approve anything and the protected resource becomes read-only for the entire tenant until an administrator edits the access policy."
                }
              ]
            }
          ],
          result: {
            text: "You know which operations approval covers and who will approve.",
            verify: [{ text: "You can name the failure that an empty approver group causes." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Create an access policy",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Require approval for script changes",
          checkpoint: true,
          steps: [
            {
              text: "Prepare an approver group first. In the **Microsoft Entra admin center**, create a security group named `GRP-ADM-APPROVERS` and add `patti.fernandez`.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Patti holds no Intune role yet. Assign her the **Read Only Operator** Intune role as well, using the flow from lab 7 — an approver needs to be able to open the console to see what they are approving."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Multi Admin Approval**, then **Access policies**.",
              nav: ["Tenant administration", "Multi Admin Approval", "Access policies"]
            },
            {
              text: "Select **Create**, then configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Profile name", value: "Approval required — Scripts" },
                    { label: "Description", value: "A second administrator must approve any script change" },
                    { label: "Profile type", value: "Scripts" },
                    { label: "Approvers", value: "GRP-ADM-APPROVERS" }
                  ]
                }
              ]
            },
            {
              text: "Select **Create**, then confirm the policy is listed and enabled.",
              parts: [
                {
                  kind: "verify",
                  text: "**Access policies** lists **Approval required — Scripts** with the approver group shown."
                }
              ]
            }
          ],
          result: {
            text: "Script changes now require a second administrator's approval.",
            verify: [
              { text: "The access policy exists for the **Scripts** resource." },
              { text: "`GRP-ADM-APPROVERS` has at least one member who can sign in to Intune." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Request, approve and reject",
      estimatedMinutes: 15,
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
              text: "Assign it to `GRP-USR-PILOT` and complete the wizard."
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
                  text: "The request is listed as **Pending approval** with your justification."
                }
              ]
            }
          ],
          result: {
            text: "A protected change is queued rather than applied.",
            verify: [
              { text: "**My requests** shows the request as pending." },
              { text: "The script is absent from **Platform scripts**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Approve as the second administrator, then reject one",
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
              text: "Open the pending request and review what it will change.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "The approver sees the full payload of the change, not just its name. This is the point of the feature — approval is meaningless if the approver cannot see what they are agreeing to."
                }
              ]
            },
            {
              text: "Select **Approve**, enter a note, and confirm."
            },
            {
              text: "Sign back in as `admin-intune` and confirm the script now exists under **Platform scripts**.",
              parts: [
                {
                  kind: "verify",
                  text: "**MAA test script** is listed and assigned to `GRP-USR-PILOT`."
                }
              ]
            },
            {
              text: "Now exercise the rejection path: delete the script, supply a justification, and this time have Patti **Reject** the request.",
              parts: [
                {
                  kind: "verify",
                  text: "The script remains in place and **My requests** shows the request as rejected with the approver's note. A rejected request makes no change at all."
                }
              ]
            }
          ],
          result: {
            text: "You have driven the approval workflow from both sides and seen both outcomes.",
            verify: [
              { text: "An approved request applied its change." },
              { text: "A rejected request left the tenant unchanged and recorded the reason." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Nobody can change a protected resource, and every request sits pending forever.",
      rootCause:
        "The approver group has no members who can sign in to Intune, or its only member is the same account submitting requests and has since been disabled.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > Access policies\nOpen the policy and check the approver group membership in Entra ID."
      },
      resolution:
        "An Intune Administrator can edit or delete the access policy itself — that operation is not protected by the policy. Add a usable approver, then resubmit. Always name a group with at least two members."
    },
    {
      symptom: "An administrator says approval is not being requested for configuration profile changes.",
      rootCause: "An access policy exists for one resource type only. Each protected resource needs its own access policy.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Multi Admin Approval > Access policies"
      },
      resolution:
        "Create an additional access policy with the profile type set to the resource you want to protect. Policies do not cascade across resource types."
    }
  ],

  quiz: [
    {
      question:
        "You enable multi-admin approval for Apps and name an approver group containing only your own administrator account. What happens when you submit an app change?",
      options: [
        "The request is created and you can approve it yourself",
        "The request is rejected automatically because a requester cannot approve their own change",
        "The change applies immediately because you are in the approver group",
        "The access policy fails to save"
      ],
      correctIndex: 0,
      rationale:
        "Multi-admin approval does not prevent self-approval. The request is created and the same account can approve it, which satisfies the mechanism while defeating its purpose — which is why the approver group should always contain other people.",
      examTip:
        "Know that the control is procedural rather than technical: it enforces a second look, not a second person. Name at least two approvers in any real deployment.",
      skills: ["g1.t3.s3"]
    }
  ]
};
