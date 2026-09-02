export default {
  id: "graph-automation",
  moduleId: "m10",
  title: "Automate Intune with the Microsoft Graph PowerShell SDK",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 50,

  scenario:
    "Everything you have done through the portal is a Graph call underneath. Once you can make those calls yourself, tasks that are tedious through the interface become one command: reporting across the whole estate, bulk creating policies, cleaning up stale devices, exporting a configuration before you change it. This lab builds the habits that make Graph safe to use rather than dangerous.",

  objectives: [
    "Connect with least-privilege scopes and understand delegated versus application permissions",
    "Query devices, policies and applications across the tenant",
    "Create and assign an Intune object entirely from PowerShell",
    "Export configuration for backup and change comparison",
    "Find the Graph call behind any portal action"
  ],

  keyConcepts: ["Microsoft Graph PowerShell SDK", "Delegated permissions", "Application permissions", "Graph Explorer", "Beta versus v1.0", "Invoke-MgGraphRequest"],

  skills: [{ id: "g5.t1.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-intune"],
    labs: ["remote-actions"]
  },

  exercises: [
    {
      id: "e1",
      title: "Connect properly",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Understand scopes and permission types",
          checkpoint: true,
          steps: [
            {
              text: "Connect with only the scopes the work needs:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\",\n                         \"DeviceManagementConfiguration.ReadWrite.All\",\n                         \"DeviceManagementApps.Read.All\"\n\nGet-MgContext | Select-Object Account, TenantId, AuthType, Scopes"
                }
              ]
            },
            {
              text: "Learn the scope families you will actually use:",
              parts: [
                {
                  kind: "table",
                  headers: ["Scope", "Covers"],
                  rows: [
                    ["`DeviceManagementManagedDevices.Read.All`", "Read enrolled devices"],
                    ["`DeviceManagementManagedDevices.ReadWrite.All`", "Modify devices"],
                    ["`DeviceManagementManagedDevices.PrivilegedOperations.All`", "**Wipe, retire and reset** — separated deliberately"],
                    ["`DeviceManagementConfiguration.ReadWrite.All`", "Configuration and compliance policies"],
                    ["`DeviceManagementApps.ReadWrite.All`", "Applications and app protection"],
                    ["`DeviceManagementRBAC.ReadWrite.All`", "Roles and scope tags"],
                    ["`DeviceManagementServiceConfig.ReadWrite.All`", "Enrollment configuration"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Note that destructive device operations have their own scope, `PrivilegedOperations.All`, separate from `ReadWrite.All`. That separation exists precisely so an automation account can manage devices without being able to wipe them. Requesting it habitually defeats the design."
                }
              ]
            },
            {
              text: "Understand the two permission types, which the exam distinguishes:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Delegated", "Application"],
                  rows: [
                    ["Acts as", "The signed-in user", "The application itself"],
                    ["Effective permission", "The lesser of the scope and the user's own rights", "Exactly the granted permission"],
                    ["Interactive sign-in", "Required", "None"],
                    ["Suits", "Interactive administration, this lab", "Scheduled automation and unattended scripts"],
                    ["Configured through", "`Connect-MgGraph -Scopes`", "An app registration with a certificate or secret"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "A delegated token can never exceed what the signed-in user is allowed to do, which makes it safe for interactive work. Unattended automation needs application permissions and an app registration — and those are granted tenant-wide with no user to limit them, so they should be scoped tightly and use certificate authentication rather than a secret."
                }
              ]
            }
          ],
          result: {
            text: "You are connected with scoped consent and can explain both permission types.",
            verify: [
              { text: "`Get-MgContext` shows only the scopes you requested." },
              { text: "You can name the scope required to wipe a device." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Query, create and export",
      estimatedMinutes: 35,
      tasks: [
        {
          id: "t1",
          title: "Report across the estate",
          checkpoint: true,
          steps: [
            {
              text: "Run the reporting script from the [Scripts](#scripts) section. It answers several questions the portal makes you click through separately.",
              parts: [
                {
                  kind: "verify",
                  text: "You get device counts by platform and compliance state, a list of stale devices, and every non-compliant device with its user — in one pass."
                }
              ]
            },
            {
              text: "Learn the cmdlet naming pattern, which makes the SDK guessable:",
              parts: [
                {
                  kind: "table",
                  headers: ["Portal area", "Cmdlet noun"],
                  rows: [
                    ["Devices", "`MgDeviceManagementManagedDevice`"],
                    ["Configuration profiles", "`MgDeviceManagementDeviceConfiguration`"],
                    ["Settings catalog policies", "`MgBetaDeviceManagementConfigurationPolicy`"],
                    ["Compliance policies", "`MgDeviceManagementDeviceCompliancePolicy`"],
                    ["Applications", "`MgDeviceAppManagementMobileApp`"],
                    ["App protection", "`MgDeviceAppManagementManagedAppPolicy`"],
                    ["Scope tags", "`MgDeviceManagementRoleScopeTag`"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Several newer surfaces — settings catalog policies, endpoint security policies, Autopilot device preparation — exist only on the **beta** endpoint and use `MgBeta` cmdlets from the `Microsoft.Graph.Beta` module. Beta is not versioned and can change without notice, so pin your module version if a script matters."
                }
              ]
            }
          ],
          result: {
            text: "You can answer estate-wide questions in one command.",
            verify: [
              { text: "The reporting script returned device and compliance summaries." },
              { text: "You can predict the cmdlet noun for a given portal area." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create a policy from PowerShell",
          checkpoint: true,
          steps: [
            {
              text: "Run the compliance policy creation script from the [Scripts](#scripts) section.",
              parts: [
                {
                  kind: "verify",
                  text: "A new compliance policy appears under **Devices** > **Compliance**, created and assigned without touching the portal."
                }
              ]
            },
            {
              text: "Now learn the technique that unlocks everything the SDK does not cover — find the call the portal makes:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the Intune portal and press F12 to open browser developer tools." },
                    { text: "Select the **Network** tab and filter on `graph.microsoft.com`." },
                    { text: "Perform the action you want to automate." },
                    { text: "Read the request URL, method and JSON body." }
                  ]
                },
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Replay any captured call with Invoke-MgGraphRequest",
                  code: "$uri = \"https://graph.microsoft.com/beta/deviceManagement/configurationPolicies\"\n$body = @{\n    name        = \"Created from PowerShell\"\n    description = \"Settings catalog policy\"\n    platforms   = \"windows10\"\n    technologies = \"mdm\"\n    settings    = @()\n} | ConvertTo-Json -Depth 10\n\nInvoke-MgGraphRequest -Method POST -Uri $uri -Body $body -ContentType \"application/json\""
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "`Invoke-MgGraphRequest` reuses your existing authenticated session and can call any endpoint, including ones with no dedicated cmdlet. Combined with the developer tools technique, it means anything you can do in the portal you can automate — which is the practical answer to almost every *can Intune do X from PowerShell* question."
                }
              ]
            },
            {
              text: "On your admin workstation or host, open PowerShell as an administrator and export your Intune configuration as a backup:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "$out = \"C:\\Temp\\IntuneBackup\"\nNew-Item -ItemType Directory -Path $out -Force | Out-Null\n\nGet-MgDeviceManagementDeviceConfiguration -All |\n    ConvertTo-Json -Depth 20 |\n    Out-File \"$out\\configurations.json\" -Encoding utf8\n\nGet-MgDeviceManagementDeviceCompliancePolicy -All |\n    ConvertTo-Json -Depth 20 |\n    Out-File \"$out\\compliance.json\" -Encoding utf8\n\nWrite-Host \"Exported to $out\" -ForegroundColor Green"
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Export before every significant change. Intune has no built-in configuration history and no undo — if someone edits a policy badly, a JSON export from last week is the only record of what it used to say. This is five lines of PowerShell and it has saved a great many afternoons."
                }
              ]
            }
          ],
          result: {
            text: "You can create Intune objects from PowerShell and back up your configuration.",
            verify: [
              { text: "A policy created by script appears in the portal." },
              { text: "A configuration export exists as JSON." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Estate reporting",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

$devices = Get-MgDeviceManagementManagedDevice -All

Write-Host "Devices by platform and compliance state" -ForegroundColor Cyan
$devices |
    Group-Object OperatingSystem, ComplianceState |
    Select-Object @{n='Platform';e={$_.Values[0]}},
                  @{n='State';   e={$_.Values[1]}},
                  Count |
    Sort-Object Platform |
    Format-Table -AutoSize

Write-Host ""
Write-Host "Not checked in for 30 days" -ForegroundColor Yellow
$devices |
    Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-30) } |
    Select-Object DeviceName, UserPrincipalName, OperatingSystem, LastSyncDateTime |
    Sort-Object LastSyncDateTime |
    Format-Table -AutoSize

Write-Host ""
Write-Host "Non-compliant devices" -ForegroundColor Red
$devices |
    Where-Object ComplianceState -ne "compliant" |
    Select-Object DeviceName, UserPrincipalName, ComplianceState, OSVersion |
    Format-Table -AutoSize

Write-Host ""
Write-Host "Total: $($devices.Count) devices" -ForegroundColor Green`
    },
    {
      title: "Create and assign a compliance policy",
      lang: "powershell",
      code: `Connect-MgGraph -Scopes "DeviceManagementConfiguration.ReadWrite.All","Group.Read.All"

$policy = @{
    "@odata.type"                       = "#microsoft.graph.windows10CompliancePolicy"
    displayName                         = "CMP-Windows-FromPowerShell"
    description                         = "Created by script to demonstrate Graph automation"
    passwordRequired                    = $true
    passwordMinimumLength               = 8
    passwordRequiredType                = "alphanumeric"
    passwordMinutesOfInactivityBeforeLock = 15
    osMinimumVersion                    = "10.0.22000"
    bitLockerEnabled                    = $true
    secureBootEnabled                   = $true
    codeIntegrityEnabled                = $true
    storageRequireEncryption            = $true
    defenderEnabled                     = $true
    rtpEnabled                          = $true
    antivirusRequired                   = $true
    antiSpywareRequired                 = $true
}

$created = New-MgDeviceManagementDeviceCompliancePolicy -BodyParameter $policy
Write-Host "Created policy: $($created.Id)" -ForegroundColor Green

# Assign it to a group.
$group = Get-MgGroup -Filter "displayName eq 'GRP-USR-PILOT'"

$assignment = @{
    target = @{
        "@odata.type" = "#microsoft.graph.groupAssignmentTarget"
        groupId       = $group.Id
    }
}

New-MgDeviceManagementDeviceCompliancePolicyAssignment \`
    -DeviceCompliancePolicyId $created.Id \`
    -BodyParameter $assignment | Out-Null

Write-Host "Assigned to $($group.DisplayName)" -ForegroundColor Green`
    }
  ],

  troubleshooting: [
    {
      symptom: "A Graph cmdlet returns an authorisation error although the account is an Intune Administrator.",
      rootCause: "The token was issued without the required scope. Directory role membership and token scopes are independent.",
      diagnostic: {
        lang: "powershell",
        code: "(Get-MgContext).Scopes | Sort-Object"
      },
      resolution:
        "Reconnect with the scope the operation needs. Existing sessions are not upgraded when you discover a missing permission — `Connect-MgGraph` must be called again with the fuller list."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You are writing an unattended script that runs nightly to retire stale devices. Which permission type should it use?",
      options: [
        "Application permissions through an app registration with certificate authentication",
        "Delegated permissions with a stored administrator password",
        "Delegated permissions with the account signed in interactively each night",
        "Application permissions using the Intune Administrator directory role"
      ],
      correctIndex: 0,
      rationale:
        "Unattended automation cannot rely on an interactive sign-in, so it needs application permissions granted to an app registration. Certificate authentication is preferred over a client secret because certificates can be rotated and protected more robustly.",
      examTip:
        "Delegated permissions require a signed-in user and are capped by that user's rights. Application permissions act as the application itself and are granted tenant-wide — scope them tightly.",
      skills: ["g5.t1.s1"]
    },
    {
      id: "q2",
      question:
        "You need to automate an Intune action that has no dedicated Graph PowerShell cmdlet. What is the most practical approach?",
      options: [
        "Capture the call the portal makes using browser developer tools, then replay it with Invoke-MgGraphRequest",
        "Wait for Microsoft to publish a cmdlet for that operation",
        "Use the Intune PowerShell module instead of the Graph SDK",
        "Automate the portal with browser scripting"
      ],
      correctIndex: 0,
      rationale:
        "Every portal action is a Graph call. Capturing the request URL, method and body from the Network tab and replaying it with `Invoke-MgGraphRequest` lets you automate anything the portal can do, including beta endpoints with no cmdlet.",
      examTip:
        "Remember that newer features often exist only on the beta endpoint. That is where `Invoke-MgGraphRequest` and the `MgBeta` cmdlets earn their place.",
      skills: ["g5.t1.s1"]
    }
  ]
};
