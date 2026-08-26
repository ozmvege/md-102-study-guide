export default {
  id: "conditional-access",
  moduleId: "m5",
  title: "Conditional Access: require a compliant device",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 50,

  scenario:
    "Everything so far has been preparation for this. Compliance is an opinion until Conditional Access acts on it. You will build the policy that turns non-compliance into a refused sign-in — carefully, in report-only mode first, with the break-glass account excluded, because this is the single easiest way to lock an entire organisation out of its own tenant. Then you will watch it block a real device and let it back in.",

  objectives: [
    "Build a Conditional Access policy requiring a compliant device",
    "Use report-only mode to see the effect before enforcing it",
    "Exclude the emergency access account and explain why",
    "Observe a real block and a real recovery",
    "Read the sign-in logs to prove which policy acted"
  ],

  keyConcepts: ["Conditional Access", "Grant control", "Report-only mode", "Break-glass exclusion", "What If tool", "Sign-in logs"],

  skills: [{ id: "g1.t3.s5", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Global Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Entra admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11" }
    ],
    personas: ["alex.wilber", "admin-breakglass"],
    labs: ["compliance-policies"]
  },

  exercises: [
    {
      id: "e1",
      title: "Build the policy in report-only mode",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create the policy without enforcing it",
          checkpoint: true,
          steps: [
            {
              text: "Sign in to the **Microsoft Entra admin center** as a Global Administrator, then select **Protection**, **Conditional Access**, **Policies**, then **New policy**.",
              nav: ["Protection", "Conditional Access", "Policies", "New policy"]
            },
            {
              text: "Name it `CA-Require-Compliant-Device`."
            },
            {
              text: "Under **Users**, configure both halves carefully:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Include", value: "Select users and groups > GRP-USR-FINANCE", note: "Start narrow. Do not select All users on a first policy." },
                    { label: "Exclude", value: "admin-breakglass, admin-intune" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "The exclusion is not optional and it is not a formality. A policy requiring a compliant device, applied to all users, on a tenant where no device is yet compliant, locks out every administrator including you. The emergency access account from lab 4 exists for precisely this failure, and it only helps if it is excluded from the policy *before* the policy is enabled."
                }
              ]
            },
            {
              text: "Under **Target resources**, select **Cloud apps** > **Include** > **Select apps**, and choose **Office 365**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Selecting **All cloud apps** on a learning tenant includes the Microsoft Entra admin portal itself, which turns a small mistake into a large one. **Office 365** is a realistic target and leaves you a way back in."
                }
              ]
            },
            {
              text: "Under **Grant**, select **Grant access**, then tick **Require device to be marked as compliant**. Leave **Require all the selected controls** selected."
            },
            {
              text: "Set **Enable policy** to **Report-only**, then create the policy.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Report-only evaluates the policy on every sign-in and records what *would* have happened, without affecting anyone. It is the only safe way to introduce a Conditional Access policy, and skipping it is how organisations discover at 9am that their entire field sales team cannot reach email."
                }
              ]
            }
          ],
          result: {
            text: "A compliance-requiring policy exists and is evaluating without enforcing.",
            verify: [
              { text: "The policy state reads **Report-only**." },
              { text: "The emergency account is in the exclusion list." }
            ]
          }
        },
        {
          id: "t2",
          title: "Predict the impact before enforcing",
          checkpoint: true,
          steps: [
            {
              text: "Use the **What If** tool: **Protection** > **Conditional Access** > **Policies** > **What If**.",
              nav: ["Protection", "Conditional Access", "Policies", "What If"]
            },
            {
              text: "Run a simulation:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "User", value: "alex.wilber@<tenant>.onmicrosoft.com" },
                    { label: "Cloud apps", value: "Office 365" },
                    { label: "Device platform", value: "Windows" }
                  ]
                },
                {
                  kind: "verify",
                  text: "The result lists `CA-Require-Compliant-Device` under policies that **would apply**, with the grant control that would be required."
                }
              ]
            },
            {
              text: "Now sign in as Alex on **MD102-VM2-Alex** and open Office 365, then check the sign-in logs.",
              nav: ["Monitoring and health", "Sign-in logs"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the most recent sign-in for Alex." },
                    { text: "Select the **Report-only** tab." },
                    { text: "Find `CA-Require-Compliant-Device` and read its result." }
                  ]
                },
                {
                  kind: "verify",
                  text: "The policy reports **Failure** in report-only, because the device is non-compliant from lab 29 — BitLocker is not yet enabled. Alex was not actually blocked. This is exactly the information you want before enforcing."
                }
              ]
            }
          ],
          result: {
            text: "You know the policy would block a real user before it does.",
            verify: [
              { text: "The What If tool shows the policy applying to Alex." },
              { text: "The sign-in log's report-only tab shows a failure result." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Enforce it and watch it work",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Turn the policy on",
          checkpoint: true,
          steps: [
            {
              text: "Before enabling, confirm your escape route. Open a private browser window and sign in as `admin-breakglass@<tenant>.onmicrosoft.com` to prove the account works.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Do this every time, not just this once. Testing the emergency account *after* you need it is not testing it."
                }
              ]
            },
            {
              text: "Open the policy, set **Enable policy** to **On**, and save."
            },
            {
              text: "On **MD102-VM2-Alex**, sign out of Office 365 entirely, clear the browser session, and sign in again as Alex.",
              parts: [
                {
                  kind: "verify",
                  text: "Access is refused with a message stating the device does not meet the organisation's requirements. This is a real Conditional Access block, caused by a real compliance failure, on a real device."
                }
              ]
            },
            {
              text: "Confirm which policy acted:",
              nav: ["Monitoring and health", "Sign-in logs"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the failed sign-in." },
                    { text: "Select the **Conditional Access** tab." },
                    { text: "Read the policy name and its **Result**." }
                  ]
                },
                {
                  kind: "verify",
                  text: "`CA-Require-Compliant-Device` shows **Failure**, and the **Device info** tab shows the device as non-compliant. The sign-in log is the authoritative answer to *why was I blocked*, and it names the policy."
                }
              ]
            }
          ],
          result: {
            text: "A non-compliant device is refused access to corporate resources.",
            verify: [
              { text: "Alex is blocked from Office 365 on the non-compliant device." },
              { text: "The sign-in log names the policy that blocked it." }
            ]
          }
        },
        {
          id: "t2",
          title: "Restore access and understand the loop",
          checkpoint: true,
          steps: [
            {
              text: "You have two ways back in. Both are worth doing once.",
              parts: [
                {
                  kind: "table",
                  headers: ["Approach", "How", "When you would use it"],
                  rows: [
                    ["Fix the device", "Make the device compliant — enable BitLocker, or temporarily relax the failing rule in `CMP-Windows-Corporate`", "The correct answer in production"],
                    ["Bypass the policy", "Sign in as the break-glass account and set the policy to report-only", "When the policy itself is wrong and people are locked out"]
                  ]
                }
              ]
            },
            {
              text: "Take the first route. Edit `CMP-Windows-Corporate` and set **Require BitLocker** to **Not configured**, then sync the device."
            },
            {
              text: "Wait for compliance to re-evaluate, then confirm.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Device compliance"],
              parts: [
                {
                  kind: "verify",
                  text: "The device reports **Compliant**."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Compliance state does not reach Conditional Access instantly. The device must check in, Intune must record the state, and the directory must receive it. Allow up to fifteen minutes and re-sign-in rather than assuming the policy is broken."
                }
              ]
            },
            {
              text: "Sign in as Alex again.",
              parts: [
                {
                  kind: "verify",
                  text: "Access is granted. The sign-in log now shows `CA-Require-Compliant-Device` with a result of **Success**."
                }
              ]
            },
            {
              text: "Restore the BitLocker requirement in the compliance policy so lab 43 has something to satisfy.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Leave the Conditional Access policy enabled from here on. Every subsequent module now operates in a tenant where a device must be healthy to reach corporate resources, which is both realistic and a useful forcing function — if something stops working later, compliance is the first thing to check."
                }
              ]
            }
          ],
          result: {
            text: "You have driven the full loop: block, diagnose, remediate, restore.",
            verify: [
              { text: "A compliant device is granted access by the same policy that blocked it." },
              { text: "You can name the two ways to recover from a Conditional Access block." }
            ]
          }
        },
        {
          id: "t3",
          title: "Note where app protection joins this",
          steps: [
            {
              text: "The same grant screen carries the control used for unmanaged devices.",
              parts: [
                {
                  kind: "table",
                  headers: ["Grant control", "Requires", "Applies to"],
                  rows: [
                    ["Require device to be marked as compliant", "Intune enrollment and a passing compliance policy", "Managed devices"],
                    ["Require Microsoft Entra hybrid joined device", "Hybrid join", "Domain-joined estates"],
                    ["Require app protection policy", "An app protection policy applied to the app in use", "**Unmanaged, personally owned devices**"],
                    ["Require multifactor authentication", "MFA registration", "Any device"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Require app protection policy** is how BYOD users like Joni get access without enrolling their device. It checks that corporate data is protected inside the app rather than that the whole device is managed. Lab 36 builds the app protection policies; the Conditional Access side is this control, and pairing them is examined explicitly."
                }
              ]
            }
          ],
          result: {
            text: "You can pick the right grant control for managed and unmanaged devices.",
            verify: [{ text: "You can name the grant control used for unmanaged BYOD access." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A device is compliant in Intune but Conditional Access still blocks it.",
      rootCause:
        "The compliance state has not yet reached Microsoft Entra ID, the user's token predates the state change, or the device the user is signing in from is not the device that is compliant — a common case when a browser session runs on a different machine.",
      diagnostic: {
        lang: "text",
        code: "Entra admin center > Monitoring and health > Sign-in logs > open the sign-in\nCheck the Device info tab: is it the device you expect, and is it marked compliant?"
      },
      resolution:
        "Sign out fully to force a new token, and confirm from the sign-in log's **Device info** tab that the device identifier matches the compliant device. A browser on an unmanaged machine will never satisfy the control regardless of what other devices the user owns."
    },
    {
      symptom: "Every administrator is locked out after enabling a Conditional Access policy.",
      rootCause: "The policy targets all users with a control nobody can currently satisfy, and no account was excluded.",
      diagnostic: {
        lang: "text",
        code: "Sign in as the break-glass account.\nProtection > Conditional Access > Policies > open the policy > Assignments > Users > Exclude"
      },
      resolution:
        "Sign in with the emergency access account, set the policy to **Report-only**, add the exclusion, and re-enable. This is the entire justification for lab 4."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You are about to enable a Conditional Access policy requiring compliant devices for all users. What must you do first?",
      options: [
        "Exclude the emergency access account and test the policy in report-only mode",
        "Set the tenant to mark devices with no compliance policy as compliant",
        "Assign the policy to a device group rather than a user group",
        "Disable security defaults in Microsoft Entra ID"
      ],
      correctIndex: 0,
      rationale:
        "Excluding a permanently assigned, cloud-only emergency account guarantees a way back in, and report-only mode shows the real impact before anyone is affected. Both are standard practice for every Conditional Access change.",
      examTip:
        "Conditional Access policies are assigned to users, groups and workload identities — never to device groups. Device state is a condition or a grant control, not a target.",
      skills: ["g1.t3.s5"]
    },
    {
      id: "q2",
      question:
        "Joni uses a personally owned Windows device that is deliberately blocked from MDM enrollment. She must still reach corporate email with data protection. Which Conditional Access grant control applies?",
      options: [
        "Require app protection policy",
        "Require device to be marked as compliant",
        "Require Microsoft Entra hybrid joined device",
        "Require multifactor authentication"
      ],
      correctIndex: 0,
      rationale:
        "Requiring compliance or hybrid join would demand enrollment, which is exactly what the enrollment restriction prevents. **Require app protection policy** verifies corporate data is protected inside the application on an unmanaged device.",
      examTip:
        "Personally owned and unenrolled always points at app protection, both in the Intune policy and in the matching Conditional Access grant control.",
      skills: ["g1.t3.s5"]
    }
  ]
};
