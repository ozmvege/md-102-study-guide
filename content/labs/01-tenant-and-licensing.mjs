export default {
  id: "tenant-and-licensing",
  moduleId: "m0",
  title: "Set up the tenant and the 20/5 licence budget",
  access: "hands-on",
  difficulty: "foundational",
  estimatedMinutes: 45,
  nonExam: true,

  scenario:
    "You are the incoming endpoint administrator at Contoso. A Microsoft 365 E5 trial has been signed up for and nothing has been done with it. Before a single device is enrolled you need to know exactly what the subscription entitles you to, how many seats you can spend, and how those seats will be assigned. Getting this wrong is the single most common way a lab tenant becomes unusable halfway through: seats run out, group-based licensing silently stops assigning, and every subsequent enrollment fails with an error that points at the device rather than the licence.",

  objectives: [
    "Confirm which capabilities your Microsoft 365 E5 subscription includes and which it does not",
    "Read tenant status in the Microsoft Intune admin center and interpret the licence counts",
    "Create the group-based licensing group that every persona in this course will use",
    "Establish the 20 active plus 5 reserve seat budget and understand why the reserve exists",
    "Confirm that administrator accounts do not need to consume a licence"
  ],

  keyConcepts: [
    "Group-based licensing",
    "Unlicensed admin access",
    "MDM authority",
    "Tenant status",
    "Seat reserve"
  ],

  skills: [],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Global Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft 365 admin center" },
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "portal", id: "Microsoft Entra admin center" }
    ],
    personas: [],
    labs: ["before-you-begin"]
  },

  exercises: [
    {
      id: "e1",
      title: "Confirm what the subscription actually gives you",
      intro:
        "About a quarter of the MD-102 objectives cover capabilities that are *not* in Microsoft 365 E5. Knowing which is which now saves you from designing a lab around a feature you cannot switch on.",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Review your subscription and seat count",
          checkpoint: true,
          steps: [
            {
              text: "Open a browser and sign in to the **Microsoft 365 admin center** at `https://admin.microsoft.com` as your Global Administrator."
            },
            {
              text: "In the left navigation select **Billing**, then select **Your products**.",
              nav: ["Billing", "Your products"]
            },
            {
              text: "Locate your **Microsoft 365 E5** subscription and record the following:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Licences purchased", value: "25", note: "A standard trial. If yours differs, use your real number as the pool and keep a 5-seat reserve." },
                    { label: "Licences assigned", value: "0 or 1", note: "1 if the signup account was licensed automatically." },
                    { label: "Expires or renews on", value: "Record this date" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Write the expiry date somewhere you will see it. A trial that lapses mid-course takes your Conditional Access policies, compliance state and enrolled devices with it, and there is no way to get the tenant back to where it was."
                }
              ]
            },
            {
              text: "Select the **Microsoft 365 E5** subscription to open its details, then review the list of included services."
            }
          ],
          result: {
            text: "You know your seat pool and your expiry date.",
            verify: [
              { text: "**Your products** lists an active **Microsoft 365 E5** subscription." },
              { text: "You have recorded the total number of licences and the renewal date." }
            ]
          }
        },
        {
          id: "t2",
          title: "Separate what is included from what is not",
          checkpoint: true,
          steps: [
            {
              text: "Read the table below. It is the licence boundary this entire course is built around, and several MD-102 objectives sit on the wrong side of it."
            },
            {
              text: "Included with Microsoft 365 E5 — everything here you can do hands-on:",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "Comes from", "What it unlocks in this course"],
                  rows: [
                    ["Microsoft Intune Plan 1", "M365 E5", "Enrollment, configuration, compliance, apps, endpoint security, update rings"],
                    ["Microsoft Intune Plan 2", "M365 E5 (since July 2026)", "Tunnel for MAM, firmware over-the-air updates, specialty and shared device management"],
                    ["Remote Help", "M365 E5 (since July 2026)", "Audited remote assistance with verified identity on both sides"],
                    ["Advanced Analytics", "M365 E5 (since July 2026)", "Anomaly detection, device timeline, multi-device query"],
                    ["Endpoint Privilege Management", "M365 E5 (since July 2026)", "Application-scoped elevation for standard users"],
                    ["Microsoft Cloud PKI", "M365 E5 (since July 2026)", "A hosted certification authority — no on-premises PKI, NDES or connector"],
                    ["Enterprise App Management", "M365 E5 (since July 2026)", "Prepackaged Win32 apps with supplied detection rules"],
                    ["Microsoft Entra ID P2", "M365 E5", "Conditional Access, dynamic groups, PIM, administrative units"],
                    ["Defender for Endpoint Plan 2", "M365 E5", "EDR, device risk feeding compliance, incident triage"],
                    ["Windows 11 Enterprise E5", "M365 E5", "Subscription activation from Pro to Enterprise"],
                    ["Windows Autopatch", "Windows Enterprise E3 or E5", "Autopatch groups and release management"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The six capabilities marked *since July 2026* used to be paid add-ons, together costing more than the Intune Suite. Microsoft moved them into Microsoft 365 E3 and E5 in a packaging change that completed on **1 August 2026**, with no customer action required. Almost every study guide, blog post and exam-prep video written before then will tell you these need the Intune Suite. They do not, and you will use all six in this course."
                }
              ]
            },
            {
              text: "Not included — these are still examined, so this course covers them as walkthroughs rather than pretending you can run them:",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "Needs", "Why it is out of reach", "How this course handles it"],
                  rows: [
                    ["Windows 365 Cloud PC", "Windows 365 subscription", "A separate per-user subscription; the July 2026 Intune packaging change did not touch it", "Walkthrough — lab 21"],
                    ["Security Copilot agents in Intune", "Paid E5 seats, or purchased capacity", "Included with E5 since mid-2026, but as 400 SCU per month per 1,000 *paid* seats — a 25-seat trial earns no usable capacity", "Walkthrough — lab 57"],
                    ["Apple Business Manager, VPP", "Apple organisation and hardware", "Needs a D-U-N-S number and hardware bought through Apple or a reseller", "Walkthrough — labs 14, 26, 49"],
                    ["Microsoft Tunnel Gateway", "A Linux host you run", "The licence is included; the gateway is infrastructure you must host yourself", "Configuration path only — lab 59"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Only four things in this whole course are out of reach, and only two of them are licensing. Everything else — including every capability that used to require the Intune Suite — you will configure and use for real. That is a recent change and a genuinely large one. Note the shape of the Security Copilot row in particular: it is *licensed* to you and still not *usable* here, because the entitlement is monthly capacity scaled to paid seats rather than a per-user right. Exam questions about entitlement and questions about capacity are not the same question."
                }
              ]
            }
          ],
          result: {
            text: "You can state which examined capabilities you can practise and which you will study without a tenant.",
            verify: [
              { text: "You can name the two examined capabilities that Microsoft 365 E5 genuinely does not license." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Read tenant status in the Intune admin center",
      estimatedMinutes: 8,
      tasks: [
        {
          id: "t1",
          title: "Inspect tenant status and the MDM authority",
          checkpoint: true,
          steps: [
            {
              text: "Sign in to the **Microsoft Intune admin center** at `https://intune.microsoft.com`."
            },
            {
              text: "Select **Tenant administration**, then select **Tenant status**.",
              nav: ["Tenant administration", "Tenant status"]
            },
            {
              text: "On the **Tenant details** tab, record these three values:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "MDM authority", value: "Microsoft Intune" },
                    { label: "Total licensed users", value: "Record the current number" },
                    { label: "Total Intune licenses", value: "Record the current number" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "In tenants created in recent years the MDM authority is already set to **Microsoft Intune** and there is nothing to configure. Older guidance tells you to set it manually; if yours already reads **Microsoft Intune**, that step is done. The exam still expects you to know the MDM authority determines which service manages enrolled devices, and that it used to be a one-way choice between Intune and Configuration Manager."
                }
              ]
            },
            {
              text: "Select the **Connector status** tab and note which connectors are configured. All of them will be empty at this point — you will configure the Defender for Endpoint and Managed Google Play connectors in later modules."
            },
            {
              text: "Select the **Service health and message center** tab. This is where Intune service incidents and change notices appear, and it is an examined surface in the operations domain — you will come back to it in lab 55."
            }
          ],
          result: {
            text: "You can read tenant status and know where service health and connector state live.",
            verify: [
              { text: "**MDM authority** displays **Microsoft Intune**." },
              { text: "You have recorded **Total Intune licenses** for comparison later." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Create the licensing group and turn on group-based licensing",
      intro:
        "Every persona in this course receives its Microsoft 365 E5 licence through one group. Assigning licences to users individually works for three accounts and becomes unmanageable at twenty — and group-based licensing is how it is done in production, so it is how you should learn it.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create the licensing security group",
          checkpoint: true,
          steps: [
            {
              text: "Sign in to the **Microsoft Entra admin center** at `https://entra.microsoft.com`."
            },
            {
              text: "Select **Groups**, then select **All groups**, then select **New group**.",
              nav: ["Groups", "All groups", "New group"]
            },
            {
              text: "Configure the group as follows:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Group type", value: "Security" },
                    { label: "Group name", value: "GRP-LIC-M365-E5" },
                    { label: "Group description", value: "Group-based licensing for Microsoft 365 E5. Membership grants a seat." },
                    { label: "Microsoft Entra roles can be assigned to the group", value: "No" },
                    { label: "Membership type", value: "Assigned" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Use **Assigned** membership, not **Dynamic User**. A dynamic rule that accidentally matches every user in the tenant will try to assign 25 licences at once, exhaust the pool, and leave you diagnosing enrollment failures that have nothing to do with enrollment."
                }
              ]
            },
            {
              text: "Leave **Owners** and **Members** empty for now. Lab 3 creates the personas and adds them.",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **Create**." },
                    { text: "Wait for the notification confirming the group was created." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "The licensing group exists and is empty.",
            verify: [
              { text: "**All groups** lists `GRP-LIC-M365-E5` with a membership type of **Assigned**." },
              { text: "The group has **0** members." }
            ]
          }
        },
        {
          id: "t2",
          title: "Assign the Microsoft 365 E5 licence to the group",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Billing**, then select **Licenses**, then select **All products**.",
              nav: ["Billing", "Licenses", "All products"]
            },
            {
              text: "Select **Microsoft 365 E5**, then select **Assign**."
            },
            {
              text: "Under **Users and groups**, select `GRP-LIC-M365-E5`, then choose **Select**."
            },
            {
              text: "Select **Assignment options** and review the individual service plans. Leave every service enabled.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Assignment options are how you would grant, for example, Intune without Exchange Online. Turning services off here is a legitimate production technique and an exam-relevant one, but for this course you want the full stack enabled."
                }
              ]
            },
            {
              text: "Select **Assign** to save the group licence assignment."
            }
          ],
          result: {
            text: "Any account added to the group will now receive a Microsoft 365 E5 seat automatically.",
            verify: [
              { text: "**Microsoft 365 E5** shows `GRP-LIC-M365-E5` under its licensed groups." },
              { text: "The group's **License** blade shows Microsoft 365 E5 with no assignment errors." }
            ]
          }
        }
      ]
    },

    {
      id: "e4",
      title: "Set the seat budget and confirm admins are free",
      estimatedMinutes: 12,
      tasks: [
        {
          id: "t1",
          title: "Confirm unlicensed administrator access",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, select **Roles**, then select **Administrator Licensing**.",
              nav: ["Tenant administration", "Roles", "Administrator Licensing"]
            },
            {
              text: "Check whether **Allow access to unlicensed admins** is already enabled.",
              parts: [
                {
                  kind: "table",
                  headers: ["Tenant created", "What you should see", "Action"],
                  rows: [
                    ["After July 2021", "Unlicensed admin access already permitted", "None. This is the default."],
                    ["Before July 2021", "The setting is off", "Select **Yes** to enable it"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Enabling **Allow access to unlicensed admins** cannot be undone. On a lab tenant that is fine and it is what buys you back three E5 seats. Understand that it is one-way before you select **Yes**."
                }
              ]
            },
            {
              text: "Note what this does and does not do. It removes the Intune licence requirement for administrators; it does not remove licence requirements for anything else. An admin who needs Conditional Access still needs Microsoft Entra ID P1 or P2 from somewhere."
            }
          ],
          result: {
            text: "Administrator accounts in this course will not consume a Microsoft 365 E5 seat.",
            verify: [
              { text: "Unlicensed admin access is permitted in **Administrator Licensing**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Commit to the 20 active plus 5 reserve budget",
          checkpoint: true,
          steps: [
            {
              text: "Read the budget you are about to spend. Lab 3 creates exactly these identities.",
              parts: [
                {
                  kind: "table",
                  headers: ["Category", "Seats", "Licensed"],
                  rows: [
                    ["Administrators (break-glass, Intune, Security)", "3 accounts", "No — unlicensed admin access"],
                    ["Corporate Windows personas", "6", "Yes"],
                    ["Mobile and BYOD personas", "4", "Yes"],
                    ["Executive and delegated-admin personas", "4", "Yes"],
                    ["Test, pilot, shared and staging identities", "6", "Yes"],
                    ["**Total licensed**", "**20**", "Yes"],
                    ["**Safety reserve, never assigned**", "**5**", "No"]
                  ]
                }
              ]
            },
            {
              text: "Understand why the reserve exists, because this is the failure it prevents.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Group-based licensing assigns seats asynchronously. If the pool is exhausted at the moment an account lands in `GRP-LIC-M365-E5`, the assignment fails quietly — the user object looks normal, and the only symptom appears much later when that user tries to enroll a device and gets `0x80180018`. Five unassigned seats mean the pool can absorb a mistake without producing a failure that looks like something else entirely."
                }
              ]
            },
            {
              text: "Return to **Billing**, then **Licenses** in the Microsoft 365 admin center and confirm at least 5 seats remain unassigned. You will re-check this after lab 3 creates the personas.",
              nav: ["Billing", "Licenses"]
            }
          ],
          result: {
            text: "You have a written seat budget and understand the failure the reserve prevents.",
            verify: [
              { text: "At least **5** Microsoft 365 E5 seats are unassigned." },
              { text: "You can explain what `0x80180018` means without looking it up." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Report your licence pool and remaining seats",
      lang: "powershell",
      note:
        "Run this before and after lab 3. If **Remaining** ever drops below 5, stop and remove an account rather than pressing on — a pool at zero produces enrollment failures that look like device problems.",
      code: `# Requires: Install-Module Microsoft.Graph -Scope CurrentUser
Connect-MgGraph -Scopes "Organization.Read.All","User.Read.All"

$skus = Get-MgSubscribedSku
foreach ($sku in $skus) {
    $total    = $sku.PrepaidUnits.Enabled
    $used     = $sku.ConsumedUnits
    $remaining = $total - $used

    [pscustomobject]@{
        Sku       = $sku.SkuPartNumber
        Total     = $total
        Assigned  = $used
        Remaining = $remaining
        Status    = if ($remaining -lt 5) { "BELOW RESERVE" } else { "OK" }
    }
}

Disconnect-MgGraph`
    }
  ],

  troubleshooting: [
    {
      symptom:
        "A persona was added to `GRP-LIC-M365-E5` but the account still shows **Unlicensed** in the Microsoft 365 admin center hours later.",
      rootCause:
        "Either the licence pool was exhausted when the membership was evaluated, or the user has no **Usage location** set. Group-based licensing cannot assign a seat to an account with no usage location, and it fails without a prompt.",
      diagnostic: {
        lang: "powershell",
        code: `Get-MgUser -UserId "alex.wilber@<tenant>.onmicrosoft.com" -Property UsageLocation,AssignedLicenses,LicenseAssignmentStates |
    Select-Object -ExpandProperty LicenseAssignmentStates`
      },
      resolution:
        "Set the **Usage location** on the user, then check the group's **Licenses** blade for assignment errors. The lab 3 provisioning script sets usage location on creation precisely to avoid this.",
      errorCodes: ["0x80180018"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You assign Microsoft 365 E5 to a security group. A new user is added to the group but remains unlicensed. Every other member of the group is licensed correctly and 8 seats are free. What is the most likely cause?",
      options: [
        "The user has no usage location set",
        "The group membership type is Assigned rather than Dynamic",
        "The MDM authority has not been set to Microsoft Intune",
        "The user needs to sign in once before the licence applies"
      ],
      correctIndex: 0,
      rationale:
        "Group-based licensing cannot assign a seat to an account with no usage location, because licence availability is determined per country. Seats being free rules out an exhausted pool, and membership type has no bearing on whether an individual member gets licensed.",
      examTip:
        "When a licensing question tells you seats are available, the answer is almost always usage location or a service-plan conflict — not the pool.",
      skills: []
    },
    {
      id: "q2",
      question:
        "Your tenant was created in 2024. You want your Intune administrators to manage the service without consuming Microsoft 365 E5 seats. What must you do?",
      options: [
        "Nothing — unlicensed admin access is enabled by default for tenants created after July 2021",
        "Enable Allow access to unlicensed admins under Administrator Licensing",
        "Assign each administrator an Intune device-only licence",
        "Add the administrators to a group excluded from group-based licensing"
      ],
      correctIndex: 0,
      rationale:
        "Unlicensed admin access is on by default for tenants created after July 2021. Only older tenants need the setting enabled manually, and that change cannot be reversed.",
      examTip:
        "Remember the July 2021 cutoff and that enabling the setting is one-way. Device-only licences are for unattended kiosk and dedicated devices, not for administrators.",
      skills: []
    }
  ]
};
