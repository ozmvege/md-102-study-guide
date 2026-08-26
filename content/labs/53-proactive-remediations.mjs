export default {
  id: "proactive-remediations",
  moduleId: "m10",
  title: "Proactive remediations: detect and fix automatically",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 45,

  scenario:
    "Custom compliance from lab 30 can tell you a device is wrong. Proactive remediations can fix it. A remediation is a pair of scripts — one that detects a condition and one that corrects it — run on a schedule across the estate, with reporting on how many devices needed fixing. It is the closest thing Intune has to self-healing, and the exit-code contract is subtly different from the one you learned for Win32 detection.",

  objectives: [
    "Write a detection and remediation script pair with the correct exit codes",
    "Deploy a remediation and configure its schedule",
    "Read remediation reporting and interpret the outcome columns",
    "Distinguish the remediation contract from the Win32 detection contract"
  ],

  keyConcepts: ["Proactive remediation", "Detection script", "Remediation script", "Exit code 1", "Schedule", "Run as 64-bit"],

  skills: [{ id: "g5.t2.s3", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["custom-compliance"]
  },

  exercises: [
    {
      id: "e1",
      title: "The exit-code contract",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Learn the contract, and how it differs from Win32 detection",
          steps: [
            {
              text: "A remediation is two scripts and one rule about exit codes.",
              parts: [
                {
                  kind: "table",
                  headers: ["Detection script exits", "Meaning", "What happens next"],
                  rows: [
                    ["`0`", "Compliant — nothing to fix", "The remediation script does **not** run"],
                    ["`1`", "Not compliant — a problem was found", "The remediation script **runs**"],
                    ["Anything else", "Script error", "Reported as an error; the remediation does not run"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Compare this with the Win32 detection rule from lab 33, where exit `0` **plus output** means detected. Here exit `0` means *no action needed* and exit `1` means *fix it*. The two contracts are nearly opposite and people transpose them constantly. Remediation: `0` is good news, `1` triggers the fix."
                }
              ]
            },
            {
              text: "Note what output is for:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Anything written to standard output — up to 2048 characters — appears in the remediation report as pre-remediation and post-remediation detection output. That is your only visibility into what happened on the device, so write something useful rather than nothing."
                }
              ]
            }
          ],
          result: {
            text: "You can state the exit-code contract without confusing it with Win32 detection.",
            verify: [{ text: "You can say what exit code 1 means in each of the two contexts." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Build and deploy a remediation",
      estimatedMinutes: 35,
      tasks: [
        {
          id: "t1",
          title: "Test the script pair locally",
          checkpoint: true,
          steps: [
            {
              text: "Save both scripts from the [Scripts](#scripts) section as `Detect-DeliveryOptimization.ps1` and `Remediate-DeliveryOptimization.ps1`.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This example checks that Delivery Optimization is set to the peer-caching mode from lab 46 and corrects it if a user or another process has changed it. That is a realistic remediation: a setting that matters, drifts quietly, and has a clear correct value."
                }
              ]
            },
            {
              text: "Test on **MD102-VM1-Adele** in an elevated session:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: ".\\Detect-DeliveryOptimization.ps1\n\"Detection exit code: $LASTEXITCODE\""
                },
                {
                  kind: "verify",
                  text: "The script prints a status line and exits `0` or `1`. Anything else is a bug — fix it before uploading, because the portal gives no useful diagnostics for a script that errors."
                }
              ]
            },
            {
              text: "Break the setting deliberately, then confirm detection notices:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "New-Item -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization\" -Force | Out-Null\nSet-ItemProperty -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization\" -Name DODownloadMode -Value 0 -Type DWord\n\n.\\Detect-DeliveryOptimization.ps1\n\"Detection exit code: $LASTEXITCODE\"   # should now be 1\n\n.\\Remediate-DeliveryOptimization.ps1\n\"Remediation exit code: $LASTEXITCODE\" # should be 0\n\n.\\Detect-DeliveryOptimization.ps1\n\"Detection exit code: $LASTEXITCODE\"   # back to 0"
                },
                {
                  kind: "verify",
                  text: "Detection returns 1 when broken, remediation fixes it and returns 0, and detection then returns 0. Test this loop locally every time — it is far quicker than diagnosing through the portal's reporting."
                }
              ]
            }
          ],
          result: {
            text: "A tested script pair detects and corrects a real setting.",
            verify: [
              { text: "The detect, remediate, detect loop works locally." }
            ]
          }
        },
        {
          id: "t2",
          title: "Deploy and read the reporting",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Scripts and remediations**, then **Remediations**, then **Create script package**.",
              nav: ["Devices", "Scripts and remediations", "Remediations", "Create script package"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "REM-DeliveryOptimization" },
                    { label: "Description", value: "Ensures Delivery Optimization peer caching remains enabled" },
                    { label: "Detection script file", value: "Detect-DeliveryOptimization.ps1" },
                    { label: "Remediation script file", value: "Remediate-DeliveryOptimization.ps1" },
                    { label: "Run this script using the logged-on credentials", value: "No", note: "System context — the scripts write to HKLM." },
                    { label: "Enforce script signature check", value: "No" },
                    { label: "Run script in 64-bit PowerShell", value: "Yes", note: "In 32-bit, HKLM writes are redirected to WOW6432Node and the fix lands in the wrong place." }
                  ]
                }
              ]
            },
            {
              text: "On **Assignments**, assign to `GRP-DEV-WIN-CORP` and set the schedule:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Schedule", value: "Daily" },
                    { label: "Repeats every", value: "1 day" },
                    { label: "Start time", value: "09:00" }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Schedule", "Suits"],
                  rows: [
                    ["Once", "A one-off correction across the estate"],
                    ["Hourly", "Settings that must not drift for long — use sparingly, it is real load"],
                    ["Daily", "**The usual choice** for configuration drift"]
                  ]
                }
              ]
            },
            {
              text: "Create the package, then after devices have run it, open **Device status** and read the columns:",
              parts: [
                {
                  kind: "table",
                  headers: ["Column", "Meaning"],
                  rows: [
                    ["Without issues", "Detection returned 0 — nothing needed doing"],
                    ["Issue detected", "Detection returned 1"],
                    ["Issue remediated", "The remediation ran and post-detection returned 0 — **the outcome you want**"],
                    ["Issue not remediated", "The remediation ran and the problem persists — the fix is wrong"],
                    ["Detection failed", "The detection script errored or returned an unexpected code"],
                    ["Pre-remediation detection output", "What your detection script wrote to standard output"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Issue not remediated** is the row to watch. It means your detection is correct and your remediation does not work — the device is being told daily that it has a problem and the fix is failing every time. That is worse than no remediation, because it looks like coverage."
                }
              ]
            }
          ],
          result: {
            text: "A remediation runs on a schedule and reports what it fixed.",
            verify: [
              { text: "The remediation appears with device status." },
              { text: "You can explain what **Issue not remediated** indicates." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Detect-DeliveryOptimization.ps1",
      lang: "powershell",
      note: "Exit 0 means compliant. Exit 1 triggers the remediation script.",
      code: `# Detection: is Delivery Optimization set to peer caching behind the same NAT?

$key      = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization"
$name     = "DODownloadMode"
$expected = 1   # HTTP blended with peering behind the same NAT

try {
    $current = (Get-ItemProperty -Path $key -Name $name -ErrorAction Stop).$name

    if ($current -eq $expected) {
        Write-Output "Compliant: DODownloadMode is $current"
        exit 0
    }

    Write-Output "Non-compliant: DODownloadMode is $current, expected $expected"
    exit 1
}
catch {
    Write-Output "Non-compliant: DODownloadMode is not set"
    exit 1
}`
    },
    {
      title: "Remediate-DeliveryOptimization.ps1",
      lang: "powershell",
      note: "Exit 0 on success. Exit 1 if the fix could not be applied, so the report shows it honestly.",
      code: `# Remediation: set Delivery Optimization back to peer caching.

$key      = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization"
$name     = "DODownloadMode"
$expected = 1

try {
    if (-not (Test-Path $key)) {
        New-Item -Path $key -Force -ErrorAction Stop | Out-Null
    }

    Set-ItemProperty -Path $key -Name $name -Value $expected -Type DWord -ErrorAction Stop

    # Confirm the write actually took effect rather than assuming it did.
    $now = (Get-ItemProperty -Path $key -Name $name -ErrorAction Stop).$name
    if ($now -eq $expected) {
        Write-Output "Remediated: DODownloadMode set to $expected"
        exit 0
    }

    Write-Output "Remediation failed: DODownloadMode is $now"
    exit 1
}
catch {
    Write-Output "Remediation error: $_"
    exit 1
}`
    }
  ],

  troubleshooting: [
    {
      symptom: "A remediation reports Issue detected on every device every day and never remediates.",
      rootCause:
        "The remediation script is failing, running in the wrong context, or fixing something other than what detection checks. A very common cause is 32-bit PowerShell redirecting an HKLM write to WOW6432Node while detection reads the real location.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Content \"C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\AgentExecutor.log\" -Tail 200 |\n    Select-String \"Remediation|Detection|Exit\""
      },
      resolution:
        "Confirm **Run script in 64-bit PowerShell** is Yes and the context is System for any machine-wide change. Then run both scripts by hand on a failing device and compare what each one actually reads and writes."
    }
  ],

  quiz: [
    {
      question:
        "In a proactive remediation detection script, what does exit code 1 signify?",
      options: [
        "An issue was detected and the remediation script should run",
        "The device is compliant and no action is needed",
        "The detection script failed to execute",
        "The remediation has already been applied"
      ],
      correctIndex: 0,
      rationale:
        "Exit 0 means compliant and stops there; exit 1 means an issue was found and triggers the remediation script. Any other exit code is reported as a detection failure.",
      examTip:
        "Do not transpose this with Win32 detection rules, where exit 0 plus output means the app *is* detected. Remediation: 0 is good, 1 means fix it.",
      skills: ["g5.t2.s3"]
    },
    {
      question:
        "A remediation consistently reports Issue not remediated. What does this indicate?",
      options: [
        "The remediation script runs but the problem persists when detection re-evaluates",
        "The detection script is returning an invalid exit code",
        "The devices are offline and cannot run the scripts",
        "The remediation script is not assigned to the correct group"
      ],
      correctIndex: 0,
      rationale:
        "That status specifically means the remediation executed and post-remediation detection still found the issue. Detection is working; the fix is not.",
      examTip:
        "Check context and bitness first. A machine-wide registry fix running in user context or 32-bit PowerShell writes to the wrong place and produces exactly this result.",
      skills: ["g5.t2.s3"]
    }
  ]
};
