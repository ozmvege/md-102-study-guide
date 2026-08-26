export default {
  id: "personas-and-groups",
  moduleId: "m0",
  title: "Provision 20 personas and the group structure",
  access: "hands-on",
  difficulty: "foundational",
  estimatedMinutes: 50,
  nonExam: true,

  scenario:
    "An empty tenant teaches you nothing. Policy targeting, scope tags, Conditional Access and app protection only become real when there are people in different departments with different devices and different needs. You will create twenty identities and the group structure that carries them, using the Microsoft Graph PowerShell SDK — which is also the tool the exam expects you to reach for when the portal would take a hundred clicks.",

  objectives: [
    "Connect to Microsoft Graph with the least privilege the task needs",
    "Create a group naming standard and the security groups the whole course targets",
    "Provision twenty personas with usage locations set, so group-based licensing can assign seats",
    "Verify licence assignment completed and the five-seat reserve survived",
    "Recognise why a script that swallows its own errors is worse than one that fails"
  ],

  keyConcepts: ["Microsoft Graph PowerShell SDK", "Delegated scopes", "Group naming standard", "Usage location", "Group-based licensing"],

  skills: [],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Global Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Entra admin center" }],
    personas: [],
    labs: ["tenant-and-licensing"]
  },

  exercises: [
    {
      id: "e1",
      title: "Install and connect the Graph PowerShell SDK",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Install the module and sign in with scoped consent",
          checkpoint: true,
          steps: [
            {
              text: "On your host machine, open **Windows PowerShell** and install the SDK for your user only:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Install-Module Microsoft.Graph -Scope CurrentUser -Force"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This installs a large set of sub-modules and takes several minutes. If you only want what this course needs, `Microsoft.Graph.Users`, `Microsoft.Graph.Groups`, `Microsoft.Graph.Identity.DirectoryManagement` and `Microsoft.Graph.DeviceManagement` are sufficient."
                }
              ]
            },
            {
              text: "Connect, requesting only the permissions this lab actually uses:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Connect-MgGraph -Scopes \"User.ReadWrite.All\",\"Group.ReadWrite.All\",\"Organization.Read.All\",\"Directory.ReadWrite.All\""
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Asking for exactly the scopes you need is an exam-relevant habit, not just good manners. Questions about Graph automation frequently hinge on identifying the *minimum* scope for an operation — reading devices is `DeviceManagementManagedDevices.Read.All`, acting on them is `.ReadWrite.All`."
                }
              ]
            },
            {
              text: "Confirm the connection and the scopes that were actually granted:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MgContext | Select-Object Account, TenantId, Scopes"
                },
                {
                  kind: "verify",
                  text: "Your administrator account and tenant id are shown, and **Scopes** contains the four you requested."
                }
              ]
            }
          ],
          result: {
            text: "You have an authenticated Graph session with scoped consent.",
            verify: [
              { text: "`Get-MgContext` returns your account and tenant." },
              { text: "The requested scopes appear in the granted list." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Create the group structure",
      intro:
        "A naming standard is worth agreeing before you have forty groups, not after. Every group in this course follows `GRP-<purpose>-<scope>`, which makes it obvious at a glance whether a group is for licensing, users, devices or administration.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Understand the naming standard",
          steps: [
            {
              text: "Read the standard. You will create these groups in the next task and target them for the rest of the course.",
              parts: [
                {
                  kind: "table",
                  headers: ["Prefix", "Purpose", "Membership", "Examples"],
                  rows: [
                    ["`GRP-LIC-`", "Group-based licensing", "Assigned", "`GRP-LIC-M365-E5`"],
                    ["`GRP-USR-`", "People, by department or role", "Assigned or dynamic user", "`GRP-USR-FINANCE`, `GRP-USR-PILOT`"],
                    ["`GRP-DEV-`", "Devices, by platform or purpose", "Dynamic device", "`GRP-DEV-WIN-CORP`, `GRP-DEV-ANDROID-WP`"],
                    ["`GRP-ADM-`", "Delegated administration", "Assigned", "`GRP-ADM-HELPDESK`"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Keep user groups and device groups strictly separate. Several Intune policy types can only be assigned to one or the other, and a group containing both silently applies to whichever half is eligible — which produces a policy that appears assigned and does nothing for half its members."
                }
              ]
            }
          ],
          result: {
            text: "You can predict what any group in this course is for from its name alone.",
            verify: [{ text: "You can state which prefix a device-targeting group uses." }]
          }
        },
        {
          id: "t2",
          title: "Create the security groups",
          checkpoint: true,
          steps: [
            {
              text: "Run the group provisioning script from the [Scripts](#scripts) section below. It creates each group only if it does not already exist, so re-running it is safe."
            },
            {
              text: "Confirm the groups were created:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MgGroup -Filter \"startswith(displayName,'GRP-')\" -All |\n    Select-Object DisplayName, @{n='Dynamic';e={$_.GroupTypes -contains 'DynamicMembership'}} |\n    Sort-Object DisplayName | Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "All groups are listed, and `GRP-LIC-M365-E5` from lab 1 appears alongside the new ones."
                }
              ]
            },
            {
              text: "Open the **Microsoft Entra admin center** and inspect one dynamic group to see the rule the script wrote.",
              nav: ["Groups", "All groups", "GRP-DEV-WIN-CORP", "Dynamic membership rules"],
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  caption: "The rule on GRP-DEV-WIN-CORP",
                  code: "(device.deviceOSType -eq \"Windows\") and (device.deviceOwnership -eq \"Company\")",
                  copyable: false
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Dynamic device groups are empty until devices actually enrol, so these will stay at zero members until module 2. Rule evaluation is also not instant — allow several minutes after a device enrols before assuming a rule is wrong."
                }
              ]
            }
          ],
          result: {
            text: "The group structure exists, including dynamic device groups that will populate as devices enrol.",
            verify: [
              { text: "At least twelve groups beginning `GRP-` exist." },
              { text: "`GRP-DEV-WIN-CORP` shows a dynamic membership rule." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Provision the twenty personas",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Run the persona provisioning script",
          checkpoint: true,
          steps: [
            {
              text: "Read the persona script in the [Scripts](#scripts) section. Note two things it does that the previous version of this lab guide did not."
            },
            {
              text: "First, it sets a **usage location** on every account.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Group-based licensing cannot assign a seat to an account with no usage location, because licence availability is determined per country. It fails without a prompt, the user simply stays unlicensed, and the symptom surfaces much later as enrollment error `0x80180018`. Setting it at creation removes the whole failure mode."
                }
              ]
            },
            {
              text: "Second, it does **not** swallow errors.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "A provisioning script wrapped in `try {} catch {}` with `-ErrorAction SilentlyContinue` produces identical output whether it worked or not. You then spend an hour diagnosing Intune when the truth was that eleven of twenty accounts were never created. This script reports every failure and exits non-zero if any occurred."
                }
              ]
            },
            {
              text: "Set a password you will remember, then run the script:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Shared lab password", value: "Choose a strong passphrase", note: "Every persona gets the same one. Acceptable in a disposable lab tenant and nowhere else." },
                    { label: "Usage location", value: "Your two-letter country code", note: "For example DE, GB or US." }
                  ]
                }
              ]
            },
            {
              text: "Watch the output. Every account should report **created** or **exists**, and the summary line at the end should report zero failures.",
              parts: [
                {
                  kind: "verify",
                  text: "The final line reads `23 accounts processed (3 admins, 20 personas), 0 failures`. If it does not, fix the reported errors before continuing — every later lab assumes these identities exist."
                }
              ]
            }
          ],
          result: {
            text: "Twenty licensed personas and three unlicensed administrators exist in the tenant.",
            verify: [
              { text: "`Get-MgUser -All` returns your personas." },
              { text: "The script reported zero failures." }
            ]
          }
        },
        {
          id: "t2",
          title: "Confirm licensing and the reserve",
          checkpoint: true,
          steps: [
            {
              text: "Wait a few minutes, then check the licence pool:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MgSubscribedSku |\n    Where-Object { $_.SkuPartNumber -like \"*ENTERPRISEPREMIUM*\" -or $_.SkuPartNumber -like \"*E5*\" } |\n    ForEach-Object {\n        [pscustomobject]@{\n            Sku       = $_.SkuPartNumber\n            Total     = $_.PrepaidUnits.Enabled\n            Assigned  = $_.ConsumedUnits\n            Remaining = $_.PrepaidUnits.Enabled - $_.ConsumedUnits\n        }\n    } | Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "**Assigned** is 20 and **Remaining** is 5. If Remaining is below 5, you have over-provisioned — remove an account rather than pressing on."
                }
              ]
            },
            {
              text: "Check that no individual assignment failed:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MgUser -All -Property DisplayName,UserPrincipalName,UsageLocation,LicenseAssignmentStates |\n    Where-Object { $_.LicenseAssignmentStates.State -eq 'Error' } |\n    Select-Object DisplayName, UserPrincipalName,\n        @{n='Error';e={$_.LicenseAssignmentStates.Error}}"
                },
                {
                  kind: "verify",
                  text: "The command returns nothing. Any row here is an account that looks normal but has no licence."
                }
              ]
            },
            {
              text: "In the **Microsoft Entra admin center**, open `GRP-LIC-M365-E5` and confirm the member count.",
              nav: ["Groups", "All groups", "GRP-LIC-M365-E5", "Members"]
            }
          ],
          result: {
            text: "Twenty seats are assigned through the group, five remain in reserve, and no assignment errored.",
            verify: [
              { text: "`GRP-LIC-M365-E5` has **20** members." },
              { text: "The E5 subscription shows **5** remaining seats." },
              { text: "No user has a licence assignment in the **Error** state." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Create the group structure",
      lang: "powershell",
      note: "Idempotent — existing groups are left alone. Run it again after adding a group to the list.",
      code: `# Requires an active Connect-MgGraph session with Group.ReadWrite.All.

$Static = @(
    @{ Name = "GRP-USR-IT";            Desc = "Information technology staff" }
    @{ Name = "GRP-USR-FINANCE";       Desc = "Finance department" }
    @{ Name = "GRP-USR-HR";            Desc = "Human resources" }
    @{ Name = "GRP-USR-SALES";         Desc = "Sales department" }
    @{ Name = "GRP-USR-ENGINEERING";   Desc = "Engineering department" }
    @{ Name = "GRP-USR-OPERATIONS";    Desc = "Operations department" }
    @{ Name = "GRP-USR-MANUFACTURING"; Desc = "Manufacturing floor staff" }
    @{ Name = "GRP-USR-RETAIL";        Desc = "Retail and shared-device staff" }
    @{ Name = "GRP-USR-FIELD";         Desc = "Field service engineers" }
    @{ Name = "GRP-USR-EXEC";          Desc = "Executive team" }
    @{ Name = "GRP-USR-APPLE";         Desc = "Users targeted by macOS and iOS policy" }
    @{ Name = "GRP-USR-BYOD";          Desc = "Personally owned device users, app protection only" }
    @{ Name = "GRP-USR-PILOT";         Desc = "Pilot ring for apps and feature updates" }
    @{ Name = "GRP-USR-BROAD";         Desc = "Broad deployment ring" }
    @{ Name = "GRP-ADM-INTUNE";        Desc = "Intune administrators" }
    @{ Name = "GRP-ADM-SECURITY";      Desc = "Security administrators" }
    @{ Name = "GRP-ADM-HELPDESK";      Desc = "Scoped help desk operators" }
    @{ Name = "GRP-ADM-SECOPS";        Desc = "Defender incident responders" }
    @{ Name = "GRP-DEV-KIOSK";         Desc = "Dedicated and kiosk devices" }
    @{ Name = "GRP-DEV-SHARED";        Desc = "Shared multi-user Windows devices" }
)

# Dynamic device groups. These stay empty until devices enrol in module 2.
$Dynamic = @(
    @{ Name = "GRP-DEV-WIN-CORP"
       Desc = "Corporate-owned Windows devices"
       Rule = '(device.deviceOSType -eq "Windows") and (device.deviceOwnership -eq "Company")' }
    @{ Name = "GRP-DEV-WIN-PERSONAL"
       Desc = "Personally owned Windows devices"
       Rule = '(device.deviceOSType -eq "Windows") and (device.deviceOwnership -eq "Personal")' }
    @{ Name = "GRP-DEV-ANDROID-WP"
       Desc = "Android Enterprise work profile devices"
       Rule = '(device.deviceOSType -eq "AndroidForWork")' }
    @{ Name = "GRP-DEV-ANDROID-FM"
       Desc = "Android Enterprise fully managed devices"
       Rule = '(device.deviceOSType -eq "AndroidEnterprise")' }
    @{ Name = "GRP-DEV-AUTOPILOT"
       Desc = "Devices registered with Windows Autopilot"
       Rule = '(device.devicePhysicalIds -any (_ -startsWith "[ZTDId]"))' }
)

foreach ($g in $Static) {
    if (Get-MgGroup -Filter "displayName eq '$($g.Name)'" -ErrorAction SilentlyContinue) {
        Write-Host "exists  $($g.Name)" -ForegroundColor DarkGray
        continue
    }
    New-MgGroup -DisplayName $g.Name \`
                -Description $g.Desc \`
                -MailEnabled:$false \`
                -MailNickname ($g.Name -replace '[^a-zA-Z0-9]','') \`
                -SecurityEnabled:$true | Out-Null
    Write-Host "created $($g.Name)" -ForegroundColor Green
}

foreach ($g in $Dynamic) {
    if (Get-MgGroup -Filter "displayName eq '$($g.Name)'" -ErrorAction SilentlyContinue) {
        Write-Host "exists  $($g.Name)" -ForegroundColor DarkGray
        continue
    }
    New-MgGroup -DisplayName $g.Name \`
                -Description $g.Desc \`
                -MailEnabled:$false \`
                -MailNickname ($g.Name -replace '[^a-zA-Z0-9]','') \`
                -SecurityEnabled:$true \`
                -GroupTypes "DynamicMembership" \`
                -MembershipRule $g.Rule \`
                -MembershipRuleProcessingState "On" | Out-Null
    Write-Host "created $($g.Name) (dynamic)" -ForegroundColor Green
}`
    },
    {
      title: "Provision the twenty personas",
      lang: "powershell",
      note:
        "Checks that every group it will need exists before it creates anything, sets a usage location on every account, reports every failure, and exits non-zero if anything went wrong. Change `$UsageLocation` and `$Password` before running.",
      code: `# Requires an active Connect-MgGraph session with User.ReadWrite.All and Group.ReadWrite.All.

$Domain        = "<tenant>.onmicrosoft.com"
$UsageLocation = "DE"                          # <-- your two-letter country code
$Password      = "ChangeMeToAPassphrase!2026"  # <-- change this

# Administrators are NOT licensed: unlicensed admin access is enabled by default
# on tenants created after July 2021, which is what buys us 20 end-user seats.
# Every admin carries the same keys as a persona, including an empty Groups list.
# A missing key is $null rather than a helpful error, and $null is what turned
# "create three administrators" into three different failures further down.
$Admins = @(
    @{ First="Break-glass"; Last="Emergency Access"; Alias="admin-breakglass"; Dept="IT"; Groups=@() }
    @{ First="Intune";      Last="Administrator";    Alias="admin-intune";    Dept="IT"; Groups=@("GRP-ADM-INTUNE") }
    @{ First="Security";    Last="Administrator";    Alias="admin-security";  Dept="IT"; Groups=@("GRP-ADM-SECURITY") }
)

$Personas = @(
    @{ First="Adele";     Last="Vance";     Alias="adele.vance";       Dept="IT";            Groups=@("GRP-USR-IT","GRP-USR-PILOT") }
    @{ First="Alex";      Last="Wilber";    Alias="alex.wilber";       Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Megan";     Last="Bowen";     Alias="megan.bowen";       Dept="HR";            Groups=@("GRP-USR-HR") }
    @{ First="Joni";      Last="Sherman";   Alias="joni.sherman";      Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Diego";     Last="Siciliani"; Alias="diego.siciliani";   Dept="Field";         Groups=@("GRP-USR-FIELD") }
    @{ First="Lee";       Last="Gu";        Alias="lee.gu";            Dept="Manufacturing"; Groups=@("GRP-USR-MANUFACTURING") }
    @{ First="Miriam";    Last="Graham";    Alias="miriam.graham";     Dept="Executive";     Groups=@("GRP-USR-EXEC","GRP-USR-APPLE") }
    @{ First="Patti";     Last="Fernandez"; Alias="patti.fernandez";   Dept="Executive";     Groups=@("GRP-USR-EXEC") }
    @{ First="Pradeep";   Last="Gupta";     Alias="pradeep.gupta";     Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING","GRP-USR-PILOT") }
    @{ First="Johanna";   Last="Lorenz";    Alias="johanna.lorenz";    Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING") }
    @{ First="Isaiah";    Last="Langer";    Alias="isaiah.langer";     Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Nestor";    Last="Wilke";     Alias="nestor.wilke";      Dept="Operations";    Groups=@("GRP-USR-OPERATIONS","GRP-USR-BROAD") }
    @{ First="Henrietta"; Last="Mueller";   Alias="henrietta.mueller"; Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Lynne";     Last="Robbins";   Alias="lynne.robbins";     Dept="Retail";        Groups=@("GRP-USR-RETAIL","GRP-DEV-SHARED") }
    @{ First="Help Desk"; Last="Operator";  Alias="helpdesk.operator"; Dept="IT";            Groups=@("GRP-ADM-HELPDESK") }
    @{ First="Security";  Last="Operator";  Alias="security.operator"; Dept="IT";            Groups=@("GRP-ADM-SECOPS") }
    @{ First="Pilot";     Last="User 01";   Alias="pilot.user01";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Pilot";     Last="User 02";   Alias="pilot.user02";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Kiosk";     Last="Device";    Alias="kiosk.device";      Dept="Retail";        Groups=@("GRP-DEV-KIOSK") }
    @{ First="Staging";   Last="User 01";   Alias="staging.user01";    Dept="Test";          Groups=@() }
)

# Not $profile: that is an automatic variable holding the path to your PowerShell
# profile script, and assigning to it in a console session silently replaces it.
$PwdProfile = @{ Password = $Password; ForceChangePasswordNextSignIn = $false }
$failures = 0

function Resolve-LabGroup {
    param([string]$Name)
    $group = Get-MgGroup -Filter "displayName eq '$Name'" -ErrorAction Stop
    if (-not $group) {
        throw "Group '$Name' does not exist. Run the group script above; GRP-LIC-M365-E5 comes from lab 1."
    }
    return $group
}

function New-LabUser {
    param($Person, [bool]$Licensed)

    $upn = "$($Person.Alias)@$Domain"

    $user = Get-MgUser -Filter "userPrincipalName eq '$upn'" -ErrorAction SilentlyContinue

    if ($user) {
        Write-Host "exists  $upn" -ForegroundColor DarkGray
    }
    else {
        # Splatted rather than a run of -Parameter arguments, so that a property
        # the record does not have is an omitted property and not an empty one:
        # $Person.Dept on a record without that key is $null, -Department $null
        # binds to "", and the account is created with a blank department.
        $params = @{
            DisplayName       = "$($Person.First) $($Person.Last)"
            GivenName         = $Person.First
            Surname           = $Person.Last
            UserPrincipalName = $upn
            MailNickname      = $Person.Alias
            UsageLocation     = $UsageLocation
            AccountEnabled    = $true
            PasswordProfile   = $PwdProfile
            ErrorAction       = "Stop"   # no SilentlyContinue: see the note above
        }
        if ($Person.Dept) { $params.Department = $Person.Dept }

        # Keep what Graph returns. Re-reading the account by UPN races directory
        # replication, and a lost race hands the group loop an empty user id.
        $user = New-MgUser @params
        Write-Host "created $upn" -ForegroundColor Green
    }

    # @($null) is an array containing one null, not an empty array. Filtering
    # first is what stops an account with no groups looking one up by no name.
    $groups = @($Person.Groups | Where-Object { $_ })
    if ($Licensed) { $groups += "GRP-LIC-M365-E5" }

    foreach ($name in $groups) {
        $group = Resolve-LabGroup -Name $name

        $already = Get-MgGroupMember -GroupId $group.Id -All |
                   Where-Object Id -eq $user.Id
        if (-not $already) {
            New-MgGroupMember -GroupId $group.Id -DirectoryObjectId $user.Id -ErrorAction Stop
            Write-Host "        + $name" -ForegroundColor DarkCyan
        }
    }
}

# Check every group this run will need before creating a single account. Twenty
# identical "group does not exist" errors halfway through a run is a far worse
# diagnostic than one line naming what is missing before anything has changed.
$needed = @($Admins + $Personas | ForEach-Object { $_.Groups }) + "GRP-LIC-M365-E5"
$missing = @(
    $needed | Where-Object { $_ } | Sort-Object -Unique |
        Where-Object { -not (Get-MgGroup -Filter "displayName eq '$_'" -ErrorAction SilentlyContinue) }
)
if ($missing) {
    Write-Host "Missing groups: $($missing -join ', ')" -ForegroundColor Red
    throw "Create the groups first: the group script above, and lab 1 for GRP-LIC-M365-E5."
}

foreach ($p in $Admins) {
    try { New-LabUser -Person $p -Licensed $false }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

foreach ($p in $Personas) {
    try { New-LabUser -Person $p -Licensed $true }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

$total  = $Admins.Count + $Personas.Count
$colour = if ($failures) { "Red" } else { "Green" }

Write-Host ""
Write-Host "$total accounts processed ($($Admins.Count) admins, $($Personas.Count) personas), $failures failures" -ForegroundColor $colour
if ($failures) { exit 1 }`
    }
  ],

  troubleshooting: [
    {
      symptom: "Accounts are created but every one of them remains unlicensed.",
      rootCause:
        "Either the accounts have no usage location, or `GRP-LIC-M365-E5` never had the Microsoft 365 E5 licence assigned to it in lab 1. Group-based licensing needs both.",
      diagnostic: {
        lang: "powershell",
        code: "Get-MgUser -All -Property DisplayName,UsageLocation |\n    Where-Object { -not $_.UsageLocation } |\n    Select-Object DisplayName"
      },
      resolution:
        "Set the usage location on the affected accounts, then confirm the group itself carries the licence under **Billing** > **Licenses** > **Microsoft 365 E5**. Membership alone assigns nothing if the group has no product on it.",
      errorCodes: ["0x80180018"]
    },
    {
      symptom: "`New-MgGroupMember` fails with a permission error even though you are a Global Administrator.",
      rootCause:
        "The Graph session was established with narrower scopes than the operation requires. Directory role membership and consented scopes are different things — being Global Administrator does not grant a token permissions it did not ask for.",
      diagnostic: {
        lang: "powershell",
        code: "(Get-MgContext).Scopes -join \"`n\""
      },
      resolution:
        "Reconnect with the scopes you need: `Connect-MgGraph -Scopes \"Group.ReadWrite.All\",\"User.ReadWrite.All\"`. Existing sessions are not upgraded automatically."
    }
  ],

  quiz: [
    {
      question:
        "A script creates twenty users and adds them to a group that has Microsoft 365 E5 assigned. All twenty appear in the group, ten receive licences and ten do not. Sixty seats are available. What should you check first?",
      options: [
        "Whether the ten unlicensed accounts have a usage location set",
        "Whether the group membership type is dynamic",
        "Whether the tenant MDM authority is set to Intune",
        "Whether the ten accounts have signed in at least once"
      ],
      correctIndex: 0,
      rationale:
        "Licence availability is determined per country, so an account with no usage location cannot be assigned a seat. The assignment fails without an error on the user object, which is why a partial failure like this points straight at usage location once you know the pool is not exhausted.",
      examTip:
        "Group-based licensing has exactly three common failure causes: no usage location, an exhausted pool, and a service-plan conflict with another licence. Rule them out in that order.",
      skills: []
    },
    {
      question:
        "You are connected to Microsoft Graph as a Global Administrator with the scope `User.Read.All`. You attempt to create a group and receive an authorisation error. What is the cause?",
      options: [
        "The access token was not granted the scopes needed for the operation",
        "Global Administrator cannot create groups without Privileged Identity Management activation",
        "The Microsoft.Graph.Groups sub-module is not installed",
        "Group creation requires the beta Graph endpoint"
      ],
      correctIndex: 0,
      rationale:
        "Directory role membership and token scopes are separate. A token issued for `User.Read.All` carries only that permission regardless of how privileged the signed-in account is, so the call is rejected before any role check happens.",
      examTip:
        "For any Graph automation question, ask what the token was granted rather than who the user is. Reconnecting with additional scopes is the fix.",
      skills: []
    }
  ]
};
