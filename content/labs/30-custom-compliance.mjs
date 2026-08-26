export default {
  id: "custom-compliance",
  moduleId: "m5",
  title: "Extend compliance with PowerShell and JSON",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 45,

  scenario:
    "The built-in compliance rules cover the obvious things. Contoso's security team wants something they do not cover: every corporate device must have a specific registry key set by their asset agent, and must be running a supported build. Custom compliance lets you answer any question PowerShell can answer, by pairing a discovery script with a JSON rules file. Getting the two to agree is where everyone loses an hour, so this lab is deliberate about the contract between them.",

  objectives: [
    "Write a discovery script that returns compressed JSON",
    "Write a matching JSON rules file with remediation text",
    "Deploy a custom compliance policy and observe the result",
    "Diagnose the mismatches that make custom compliance fail silently"
  ],

  keyConcepts: ["Custom compliance", "Discovery script", "JSON rules file", "ConvertTo-Json -Compress", "SettingName matching", "Remediation strings"],

  skills: [
    { id: "g5.t1.s5", depth: "primary" },
    { id: "g1.t3.s4", depth: "partial" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11" }
    ],
    personas: ["alex.wilber"],
    labs: ["compliance-policies"]
  },

  exercises: [
    {
      id: "e1",
      title: "Understand the contract",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Learn the four rules that make it work",
          steps: [
            {
              text: "Custom compliance is two artefacts that must agree exactly.",
              parts: [
                {
                  kind: "table",
                  headers: ["Requirement", "Detail"],
                  rows: [
                    ["Output format", "The script must write **one line** of compressed JSON to standard output and nothing else"],
                    ["Key matching", "Every key in the script output must exactly match a `SettingName` in the JSON rules file, including case"],
                    ["Data types", "The type the script emits must match the `DataType` declared in the rules file"],
                    ["Exit code", "The script must exit `0`. A non-zero exit is treated as an error, not as non-compliance"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "`ConvertTo-Json -Compress` is not optional. Without `-Compress`, PowerShell emits multi-line pretty-printed JSON, the parser fails, and the device reports an error rather than a compliance result. This single omission accounts for most custom compliance failures."
                }
              ]
            },
            {
              text: "Note the other two silent killers:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Any stray output breaks it. A `Write-Host` left in for debugging, a warning from a cmdlet, or a progress bar all end up on standard output alongside the JSON and corrupt it. Suppress everything: use `-ErrorAction SilentlyContinue`, pipe unwanted output to `Out-Null`, and never use `Write-Host` in a discovery script."
                }
              ]
            }
          ],
          result: {
            text: "You can state the four contract rules before writing a line of script.",
            verify: [
              { text: "You can explain why `-Compress` is required." },
              { text: "You can name what a non-zero exit code means." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Build and deploy the pair",
      estimatedMinutes: 35,
      tasks: [
        {
          id: "t1",
          title: "Upload the discovery script",
          checkpoint: true,
          steps: [
            {
              text: "Save the discovery script from the [Scripts](#scripts) section below as `Detect-ContosoCompliance.ps1`."
            },
            {
              text: "Test it locally on **MD102-VM2-Alex** before uploading anything:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: ".\\Detect-ContosoCompliance.ps1\n\"Exit code: $LASTEXITCODE\""
                },
                {
                  kind: "verify",
                  text: "The output is exactly one line of compressed JSON such as `{\"AssetAgentPresent\":false,\"OSBuildNumber\":22631,\"DiskFreeGB\":42}` and the exit code is `0`. If you see line breaks or any other text, fix it now — the portal will not tell you.",
                  expected: "{\"AssetAgentPresent\":false,\"OSBuildNumber\":22631,\"DiskFreeGB\":42}\nExit code: 0"
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Compliance**, then the **Scripts** tab, then **Add** > **Windows 10 and later**.",
              nav: ["Devices", "Compliance", "Scripts", "Add"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Contoso custom compliance discovery" },
                    { label: "Detection script file", value: "Detect-ContosoCompliance.ps1" },
                    { label: "Run this script using the logged on credentials", value: "No", note: "System context. The script reads HKLM, which a user context cannot." },
                    { label: "Enforce script signature check", value: "No" },
                    { label: "Run script in 64 bit PowerShell Host", value: "Yes", note: "Set to Yes. In 32-bit, HKLM reads are redirected to the WOW6432Node and your registry check silently looks in the wrong place." }
                  ]
                }
              ]
            },
            {
              text: "Add the script and note its **Script ID** once created — the policy references it."
            }
          ],
          result: {
            text: "A tested discovery script is uploaded and running in the correct context.",
            verify: [
              { text: "The script produced a single JSON line locally with exit code 0." },
              { text: "It appears under **Compliance** > **Scripts**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create the JSON rules and the policy",
          checkpoint: true,
          steps: [
            {
              text: "Save the JSON rules from the [Scripts](#scripts) section below as `Rules-ContosoCompliance.json`."
            },
            {
              text: "Check each `SettingName` against your script output character by character.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "`AssetAgentPresent` and `assetAgentPresent` are different keys. A mismatch produces no error anywhere — the rule simply never evaluates, and the device reports compliant against a rule that was never checked. Compare them side by side rather than trusting your memory of what you typed."
                }
              ]
            },
            {
              text: "Create the policy: **Devices** > **Compliance** > **Create policy**, platform **Windows 10 and later**, named `CMP-Windows-Custom`.",
              nav: ["Devices", "Compliance", "Create policy"]
            },
            {
              text: "Under **Custom Compliance**, configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Custom compliance", value: "Require" },
                    { label: "Select your discovery script", value: "Contoso custom compliance discovery" },
                    { label: "Upload JSON file", value: "Rules-ContosoCompliance.json" }
                  ]
                },
                {
                  kind: "verify",
                  text: "The portal validates the JSON on upload and lists the rules it parsed. If a rule you expect is missing, the JSON is malformed — fix it before continuing."
                }
              ]
            },
            {
              text: "Configure actions for non-compliance with a 7-day grace period as in lab 29, assign to `GRP-DEV-WIN-CORP`, and create the policy."
            },
            {
              text: "Sync **MD102-VM2-Alex**, wait, then check the result.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Device compliance"],
              parts: [
                {
                  kind: "verify",
                  text: "`CMP-Windows-Custom` appears with a per-rule breakdown. The asset agent rule should fail, and the failure message should be the **RemediationStrings** text from your JSON — which is what the user sees in Company Portal."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "`RemediationStrings` is the difference between a user reading *your device is not compliant* and reading *the Contoso asset agent is missing; install it from Company Portal*. It costs one line of JSON and removes a support call."
                }
              ]
            }
          ],
          result: {
            text: "A custom compliance rule evaluates on a real device and tells the user how to fix it.",
            verify: [
              { text: "The policy shows a per-rule result on the device." },
              { text: "The failure message is your own remediation text." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Detect-ContosoCompliance.ps1 — discovery script",
      lang: "powershell",
      note:
        "Note what this script does not do: no `Write-Host`, no progress output, no unsuppressed errors. Anything on standard output other than the single JSON line breaks the parser.",
      code: `# Contoso custom compliance discovery.
# Contract: emit ONE line of compressed JSON to stdout, exit 0.

# 1. Is the Contoso asset agent registry key present?
$agentKey = "HKLM:\\SOFTWARE\\Contoso\\AssetAgent"
$agentPresent = Test-Path $agentKey

# 2. Which Windows build is this?
$build = [int](Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" \`
    -Name CurrentBuildNumber -ErrorAction SilentlyContinue).CurrentBuildNumber

# 3. How much free space on the system drive, in whole gigabytes?
$sysDrive = Get-CimInstance -ClassName Win32_LogicalDisk \`
    -Filter "DeviceID='C:'" -ErrorAction SilentlyContinue
$freeGB = if ($sysDrive) { [int]($sysDrive.FreeSpace / 1GB) } else { 0 }

$result = @{
    AssetAgentPresent = [bool]$agentPresent
    OSBuildNumber     = $build
    DiskFreeGB        = $freeGB
}

# -Compress is mandatory. Without it PowerShell emits multi-line JSON
# and the compliance parser fails with an error rather than a result.
return $result | ConvertTo-Json -Compress`
    },
    {
      title: "Rules-ContosoCompliance.json — rules file",
      lang: "json",
      note:
        "Every `SettingName` must match a key in the script output exactly, including case. `DataType` must match the type the script emits.",
      code: `{
  "Rules": [
    {
      "SettingName": "AssetAgentPresent",
      "Operator": "IsEquals",
      "DataType": "Boolean",
      "Operand": true,
      "MoreInfoUrl": "https://intranet.contoso.com/asset-agent",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Contoso Asset Agent is not installed",
          "Description": "Install Contoso Asset Agent from Company Portal. Your device will become compliant within one hour of installation."
        }
      ]
    },
    {
      "SettingName": "OSBuildNumber",
      "Operator": "GreaterEquals",
      "DataType": "Int64",
      "Operand": 22621,
      "MoreInfoUrl": "https://intranet.contoso.com/windows-updates",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Windows build is below the supported minimum",
          "Description": "Open Settings, then Windows Update, and install all available updates. A restart is required."
        }
      ]
    },
    {
      "SettingName": "DiskFreeGB",
      "Operator": "GreaterEquals",
      "DataType": "Int64",
      "Operand": 10,
      "MoreInfoUrl": "https://intranet.contoso.com/disk-space",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Not enough free disk space",
          "Description": "At least 10 GB of free space is required for updates to install. Empty the Recycle Bin and remove unused files."
        }
      ]
    }
  ]
}`
    }
  ],

  troubleshooting: [
    {
      symptom: "A custom compliance policy reports an error rather than compliant or non-compliant.",
      rootCause:
        "The script output is not parseable JSON. Usually `-Compress` was omitted, or something wrote to standard output alongside the JSON — a `Write-Host`, a warning, or an unsuppressed error.",
      diagnostic: {
        lang: "powershell",
        code: "# Run exactly as Intune would and inspect the raw output\n$out = & \"C:\\Path\\Detect-ContosoCompliance.ps1\"\n$out | Measure-Object -Line\n$out\n\"Exit: $LASTEXITCODE\""
      },
      resolution:
        "The output must be exactly one line and the exit code must be 0. Add `-Compress`, remove every `Write-Host`, and add `-ErrorAction SilentlyContinue` to any cmdlet that might warn."
    },
    {
      symptom: "A custom rule never evaluates and the device reports compliant against it.",
      rootCause:
        "The `SettingName` in the JSON does not exactly match the key emitted by the script. Matching is case-sensitive and there is no error for a rule that matches nothing.",
      diagnostic: {
        lang: "powershell",
        code: "(& \"C:\\Path\\Detect-ContosoCompliance.ps1\" | ConvertFrom-Json).PSObject.Properties.Name"
      },
      resolution:
        "Compare the emitted key names against the JSON `SettingName` values character by character. This is the second most common failure after `-Compress`."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A custom compliance discovery script runs correctly when tested manually, but every device reports an error for the custom compliance policy. What is the most likely cause?",
      options: [
        "The script output is not compressed to a single line of JSON",
        "The script is not digitally signed",
        "The script is running in 32-bit PowerShell",
        "The JSON rules file exceeds the maximum size"
      ],
      correctIndex: 0,
      rationale:
        "The parser expects exactly one line of compressed JSON on standard output. Omitting `ConvertTo-Json -Compress`, or leaving any other output in the script, produces a parse error reported as an error state rather than a compliance result.",
      examTip:
        "`-Compress` and exit code 0 are the two things to check first for any custom compliance error. Signing and bitness cause different symptoms.",
      skills: ["g5.t1.s5"]
    },
    {
      id: "q2",
      question:
        "In a custom compliance JSON rules file, what is the purpose of RemediationStrings?",
      options: [
        "It provides the title and description the user sees explaining how to fix the failure",
        "It defines the PowerShell commands that remediate the failure automatically",
        "It maps the rule to a proactive remediation script",
        "It supplies the localised name of the compliance policy"
      ],
      correctIndex: 0,
      rationale:
        "RemediationStrings are user-facing text shown in Company Portal when a rule fails. Custom compliance detects only — it does not remediate. Automatic remediation is the job of proactive remediations.",
      examTip:
        "Custom compliance detects; proactive remediations fix. A question asking how to automatically correct a condition is pointing at proactive remediations, covered in lab 53.",
      skills: ["g5.t1.s5"]
    }
  ]
};
