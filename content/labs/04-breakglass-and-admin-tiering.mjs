export default {
  id: "breakglass-and-admin-tiering",
  moduleId: "m1",
  title: "Break-glass access and administrator tiering",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,
  nonExam: true,

  scenario:
    "In lab 31 you will build a Conditional Access policy that requires a compliant device. If you get it slightly wrong — and almost everyone does the first time — you lock every administrator, including yourself, out of a tenant you cannot then fix. The break-glass account is the reason that is an inconvenience rather than the end of your lab. Build it now, before you build anything that can lock you out, and separate your day-to-day administration from the Global Administrator role while you are here.",

  objectives: [
    "Create a cloud-only emergency access account that survives a Conditional Access mistake",
    "Explain why a break-glass account is excluded from policy rather than exempted by role",
    "Assign the Intune Administrator and Security Administrator roles to separate accounts",
    "Set up an alert so use of the emergency account is never silent"
  ],

  keyConcepts: ["Emergency access account", "Conditional Access exclusion", "Least privilege", "Directory roles", "Sign-in logs"],

  skills: [],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Global Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Entra admin center" }],
    personas: ["admin-breakglass", "admin-intune", "admin-security"],
    labs: ["personas-and-groups"]
  },

  exercises: [
    {
      id: "e1",
      title: "Harden the emergency access account",
      intro:
        "The account already exists from lab 3. What matters now is the properties that make it survive an outage of your own making.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Assign Global Administrator permanently",
          checkpoint: true,
          steps: [
            {
              text: "Sign in to the **Microsoft Entra admin center** at `https://entra.microsoft.com`."
            },
            {
              text: "Select **Roles and admins**, then select **Roles and admins** again, then select **Global Administrator**.",
              nav: ["Roles and admins", "Roles and admins", "Global Administrator"]
            },
            {
              text: "Select **Add assignments**, choose `admin-breakglass@<tenant>.onmicrosoft.com`, then select **Next**."
            },
            {
              text: "Configure the assignment:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Assignment type", value: "Active" },
                    { label: "Permanently assigned", value: "Selected" },
                    { label: "Justification", value: "Emergency access account" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the one account that must **not** use Privileged Identity Management eligibility. If activation requires multi-factor authentication and the thing that is broken is your Conditional Access or MFA configuration, an eligible-only account cannot be activated — which is precisely the situation it exists for."
                }
              ]
            },
            {
              text: "Select **Assign**."
            }
          ],
          result: {
            text: "The emergency account holds Global Administrator permanently and unconditionally.",
            verify: [
              { text: "**Global Administrator** lists `admin-breakglass` with an assignment type of **Active**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Record the credentials properly",
          checkpoint: true,
          steps: [
            {
              text: "Reset the account's password to a long random passphrase — at least 32 characters."
            },
            {
              text: "Store it somewhere that does not depend on this tenant.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Storing the break-glass password in a OneDrive document or a Teams message inside the tenant it unlocks is a circular dependency. In production this is a sealed envelope in a safe. For this lab, a password manager or an offline note is fine — just not inside the tenant."
                }
              ]
            },
            {
              text: "Confirm the account is cloud-only and has no manager, no licence and no group memberships beyond what lab 3 created.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MgUser -UserId \"admin-breakglass@<tenant>.onmicrosoft.com\" `\n    -Property DisplayName,OnPremisesSyncEnabled,AssignedLicenses,AccountEnabled |\n    Select-Object DisplayName, OnPremisesSyncEnabled, AccountEnabled,\n        @{n='Licences';e={$_.AssignedLicenses.Count}}"
                },
                {
                  kind: "verify",
                  text: "**OnPremisesSyncEnabled** is empty or `False`, **AccountEnabled** is `True`, and **Licences** is `0`. An emergency account that depends on directory synchronisation fails exactly when synchronisation does."
                }
              ]
            }
          ],
          result: {
            text: "The emergency account is cloud-only, unlicensed, enabled and its password is stored outside the tenant.",
            verify: [
              { text: "You can state where the password is without opening anything in this tenant." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Separate administrative duties",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Assign scoped administrator roles",
          checkpoint: true,
          steps: [
            {
              text: "In **Roles and admins**, assign each account the narrowest role that does its job:",
              parts: [
                {
                  kind: "table",
                  headers: ["Account", "Entra role", "Why not Global Administrator"],
                  rows: [
                    ["`admin-intune`", "Intune Administrator", "Full Intune control without the ability to change identity, billing or other administrators"],
                    ["`admin-security`", "Security Administrator", "Defender, security baselines and incident response without device configuration rights"],
                    ["`admin-breakglass`", "Global Administrator", "The only account that needs everything, used only when something is broken"]
                  ]
                }
              ]
            },
            {
              text: "For each of the two working accounts, select the role, select **Add assignments**, choose the account, and assign it as **Active**."
            },
            {
              text: "Sign out and sign back in as `admin-intune@<tenant>.onmicrosoft.com`, then open the **Microsoft Intune admin center**.",
              parts: [
                {
                  kind: "verify",
                  text: "You can open **Devices**, **Apps** and **Endpoint security**. Attempting to open **Billing** in the Microsoft 365 admin center is denied — which is the separation working."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Use `admin-intune` for the rest of this course. Working as Global Administrator by default hides permission problems until they appear somewhere much more expensive."
                }
              ]
            }
          ],
          result: {
            text: "Day-to-day work happens under a role that cannot change identity or billing.",
            verify: [
              { text: "`admin-intune` can manage Intune but cannot manage subscriptions." },
              { text: "`admin-security` can open **Endpoint security** and the Defender portal." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Make emergency access visible",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Alert on break-glass sign-in",
          checkpoint: true,
          steps: [
            {
              text: "An emergency account that can be used without anyone noticing is a back door. Confirm you can see its sign-ins."
            },
            {
              text: "In the **Microsoft Entra admin center**, select **Monitoring and health**, then select **Sign-in logs**.",
              nav: ["Monitoring and health", "Sign-in logs"]
            },
            {
              text: "Add a filter on **User** for `admin-breakglass` and confirm the sign-in you performed earlier appears."
            },
            {
              text: "Note where the production answer lives, even though this lab stops short of building it:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "In production you would stream sign-in logs to a Log Analytics workspace and raise an alert rule on any successful authentication by the emergency account. That needs an Azure subscription, which this lab does not assume. Lab 56 covers the alerting surfaces that *are* available in Intune itself."
                }
              ]
            }
          ],
          result: {
            text: "Emergency account activity is discoverable in the sign-in logs.",
            verify: [
              { text: "Filtering **Sign-in logs** by the break-glass account returns your test sign-in." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Audit privileged role assignments",
      lang: "powershell",
      note: "Run this occasionally. Privileged role membership that grows quietly is how a tiering model stops meaning anything.",
      code: `Connect-MgGraph -Scopes "RoleManagement.Read.Directory","User.Read.All"

$roles = Get-MgRoleManagementDirectoryRoleDefinition -All |
         Where-Object { $_.DisplayName -in @(
             "Global Administrator",
             "Intune Administrator",
             "Security Administrator",
             "Privileged Role Administrator"
         )}

# Collected into a variable first: foreach is a statement, and a statement
# cannot be piped. "foreach (...) { } | Sort-Object" is a parse error.
$rows = foreach ($role in $roles) {
    $assignments = Get-MgRoleManagementDirectoryRoleAssignment \`
        -Filter "roleDefinitionId eq '$($role.Id)'" -All

    foreach ($a in $assignments) {
        $principal = Get-MgDirectoryObject -DirectoryObjectId $a.PrincipalId -ErrorAction SilentlyContinue
        [pscustomobject]@{
            Role      = $role.DisplayName
            Principal = $principal.AdditionalProperties.displayName
            UPN       = $principal.AdditionalProperties.userPrincipalName
        }
    }
}

$rows | Sort-Object Role, Principal | Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom: "Every administrator, including you, is locked out of the tenant after a Conditional Access change.",
      rootCause:
        "A policy targeting All users with a grant control nobody can satisfy — most often requiring a compliant or hybrid-joined device when no device is yet compliant.",
      diagnostic: {
        lang: "text",
        code: "Sign in as the break-glass account.\nEntra admin center > Protection > Conditional Access > Policies\nOpen the offending policy and check Assignments > Users > Exclude."
      },
      resolution:
        "Sign in with the emergency account, set the policy to **Report-only**, then fix the assignment and exclude the emergency account before re-enabling. Every Conditional Access policy you create in lab 31 excludes this account for exactly this reason."
    }
  ],

  quiz: [
    {
      question:
        "Which configuration is correct for an emergency access account intended to survive a Conditional Access misconfiguration?",
      options: [
        "Cloud-only, permanently assigned Global Administrator, and excluded from all Conditional Access policies",
        "Synchronised from on-premises Active Directory with a permanently assigned Global Administrator role",
        "Cloud-only and eligible for Global Administrator through Privileged Identity Management, activated with MFA",
        "Cloud-only with Global Administrator, included in Conditional Access but exempt from MFA"
      ],
      correctIndex: 0,
      rationale:
        "The account must not depend on anything that can break. Directory synchronisation adds an on-premises dependency, and PIM eligibility requires an activation flow that can itself be blocked by the misconfiguration you are trying to fix. Permanent assignment plus explicit Conditional Access exclusion is the supported pattern.",
      examTip:
        "Exclusion from a policy and exemption within it are not the same. Only exclusion guarantees the policy is never evaluated for that account.",
      skills: []
    }
  ]
};
