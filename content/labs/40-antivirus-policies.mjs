export default {
  id: "antivirus-policies",
  moduleId: "m7",
  title: "Antivirus policies and tamper protection",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Microsoft Defender Antivirus is already on every Windows device. Left at its defaults it is competent; configured properly it is considerably better, and tamper protection stops an attacker or a well-meaning user switching it off. You will build the antivirus policy, enable tamper protection, and understand cloud-delivered protection well enough to explain why the sample submission setting matters.",

  objectives: [
    "Create a Microsoft Defender Antivirus policy",
    "Configure cloud-delivered protection and sample submission",
    "Enable tamper protection and explain what it blocks",
    "Configure exclusions safely",
    "Verify Defender configuration from the client"
  ],

  keyConcepts: ["Defender Antivirus policy", "Cloud-delivered protection", "Sample submission", "Tamper protection", "Exclusions", "Real-time protection"],

  skills: [{ id: "g3.t1.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5", "MDE-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11" }
    ],
    personas: ["alex.wilber"],
    labs: ["security-baselines"]
  },

  exercises: [
    {
      id: "e1",
      title: "Configure Defender Antivirus",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the antivirus policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **Antivirus**, then **Create Policy**, platform **Windows**, profile **Microsoft Defender Antivirus**.",
              nav: ["Endpoint security", "Antivirus", "Create Policy"]
            },
            {
              text: "Name it `AV-Windows-Corporate`, then configure real-time protection:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Allow Realtime Monitoring", value: "Allowed" },
                    { label: "Allow Behavior Monitoring", value: "Allowed" },
                    { label: "Allow On Access Protection", value: "Allowed" },
                    { label: "Real Time Scan Direction", value: "Monitor all files" },
                    { label: "Allow Scanning Network Files", value: "Allowed" },
                    { label: "Allow Script Scanning", value: "Allowed" },
                    { label: "Allow Email Scanning", value: "Allowed" }
                  ]
                }
              ]
            },
            {
              text: "Configure cloud protection, which is where most of Defender's detection quality comes from:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Allow Cloud Protection", value: "Allowed" },
                    { label: "Cloud Block Level", value: "High" },
                    { label: "Cloud Extended Timeout", value: "50", note: "Seconds Defender waits for a cloud verdict before allowing a file. The maximum is 50 plus the 10-second default." },
                    { label: "Submit Samples Consent", value: "Send safe samples automatically" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Cloud-delivered protection** is what lets Defender block a file it has never seen, by asking the service about its reputation in real time. **Sample submission** is what feeds that service. Setting sample submission to *Never send* materially degrades protection for everyone, including you — the two settings work together and the exam treats them as a pair."
                }
              ]
            },
            {
              text: "Configure remediation and scanning:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Days To Retain Cleaned Malware", value: "30" },
                    { label: "Scan Parameter", value: "Quick scan" },
                    { label: "Schedule Scan Day", value: "Every day" },
                    { label: "Schedule Quick Scan Time", value: "120", note: "Minutes after midnight — 2am." },
                    { label: "Signature Update Interval", value: "4", note: "Hours between definition checks." },
                    { label: "Check For Signatures Before Running Scan", value: "Enabled" }
                  ]
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the policy."
            }
          ],
          result: {
            text: "Defender Antivirus is configured with cloud protection and a daily scan.",
            verify: [
              { text: "`AV-Windows-Corporate` is assigned to corporate Windows devices." },
              { text: "Cloud protection and sample submission are both enabled." }
            ]
          }
        },
        {
          id: "t2",
          title: "Verify from the client",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy, then inspect Defender's state:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MpComputerStatus |\n    Select-Object AMRunningMode, RealTimeProtectionEnabled, BehaviorMonitorEnabled,\n        IoavProtectionEnabled, AntivirusSignatureLastUpdated, AMServiceEnabled"
                },
                {
                  kind: "verify",
                  text: "**AMRunningMode** reads `Normal`, and the protection flags are all `True`. A running mode of `Passive` or `EDR Block Mode` means another antivirus product is the active engine."
                }
              ]
            },
            {
              text: "Confirm the policy values arrived:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MpPreference |\n    Select-Object MAPSReporting, SubmitSamplesConsent, CloudBlockLevel,\n        CloudExtendedTimeout, SignatureUpdateInterval, ScanScheduleQuickScanTime"
                },
                {
                  kind: "verify",
                  text: "`MAPSReporting` is `2` (Advanced), `SubmitSamplesConsent` is `1` (Send safe samples), and `CloudBlockLevel` reflects High."
                }
              ]
            }
          ],
          result: {
            text: "The client reports the configuration you deployed.",
            verify: [
              { text: "`Get-MpComputerStatus` shows real-time protection enabled." },
              { text: "`Get-MpPreference` shows the cloud settings from the policy." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Tamper protection and exclusions",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Enable tamper protection",
          checkpoint: true,
          steps: [
            {
              text: "Create a second policy: **Endpoint security** > **Antivirus** > **Create Policy**, platform **Windows**, profile **Windows Security experience**.",
              nav: ["Endpoint security", "Antivirus", "Create Policy"]
            },
            {
              text: "Name it `AV-TamperProtection` and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Tamper Protection", value: "Enable" },
                    { label: "Hide the Virus and threat protection area", value: "Not configured", note: "Hiding it stops users seeing threats found on their own device, which is rarely what you want." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Tamper protection blocks changes to Defender settings from **any** source that is not Intune or the Defender portal — including local administrators, registry edits, PowerShell and Group Policy. That is the point: an attacker who gains local administrator rights still cannot disable real-time protection. It also means that once enabled, your own `Set-MpPreference` commands stop working, which surprises administrators mid-troubleshooting."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP`, create the policy, then verify after a sync:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MpComputerStatus | Select-Object IsTamperProtected, RealTimeProtectionEnabled"
                },
                {
                  kind: "verify",
                  text: "**IsTamperProtected** is `True`. Try `Set-MpPreference -DisableRealtimeMonitoring $true` — it will be refused, which is the feature working."
                }
              ]
            }
          ],
          result: {
            text: "Defender settings cannot be changed locally, even by an administrator.",
            verify: [
              { text: "`IsTamperProtected` reports `True`." },
              { text: "A local attempt to disable real-time protection fails." }
            ]
          }
        },
        {
          id: "t2",
          title: "Add exclusions carefully",
          checkpoint: true,
          steps: [
            {
              text: "Create a third policy with profile **Microsoft Defender Antivirus exclusions**, named `AV-Exclusions-LineOfBusiness`."
            },
            {
              text: "Add only what a documented application vendor requires:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Excluded Path", value: "C:\\Program Files\\ContosoERP\\Data", note: "As narrow as the vendor's documentation permits." },
                    { label: "Excluded Extensions", value: "Leave empty unless specifically required" },
                    { label: "Excluded Processes", value: "Leave empty unless specifically required" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "An exclusion is a hole in your antivirus, and attackers look for them. Exclude the narrowest possible path, never a whole drive or a broad extension like `.exe`, and record which vendor document required it. Separating exclusions into their own policy — as here — means you can see every hole in one place rather than hunting through a large antivirus profile."
                }
              ]
            },
            {
              text: "Assign to a narrow group — only the devices running that application — and create the policy."
            }
          ],
          result: {
            text: "Exclusions are minimal, documented and separately visible.",
            verify: [
              { text: "Exclusions live in their own policy assigned to a narrow group." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Defender reports AMRunningMode as Passive and Intune antivirus policy appears not to apply.",
      rootCause:
        "A third-party antivirus product is registered as the active engine. Defender steps back to passive mode and most of its settings become inert.",
      diagnostic: {
        lang: "powershell",
        code: "Get-MpComputerStatus | Select-Object AMRunningMode, AMServiceEnabled\nGet-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct |\n    Select-Object displayName, productState"
      },
      resolution:
        "Remove the third-party product, or accept passive mode knowingly. In passive mode Defender still provides EDR signal to Defender for Endpoint but does not block, which is a security posture decision rather than a misconfiguration."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "After enabling tamper protection, an administrator finds that `Set-MpPreference` no longer changes Defender settings on managed devices. What is the explanation?",
      options: [
        "Tamper protection blocks Defender configuration changes from all sources except Intune and the Defender portal",
        "Set-MpPreference requires the device to be in passive mode",
        "The PowerShell module must be updated to a version that supports tamper protection",
        "Tamper protection only permits changes made by SYSTEM"
      ],
      correctIndex: 0,
      rationale:
        "Tamper protection deliberately blocks local changes to Defender configuration, including PowerShell, registry edits and Group Policy, regardless of the account's privileges. Only Intune and the Defender portal remain authoritative.",
      examTip:
        "This is the intended behaviour, not a bug. Any exam scenario where a local administrator cannot disable Defender is describing tamper protection.",
      skills: ["g3.t1.s1"]
    },
    {
      id: "q2",
      question:
        "Which pair of settings work together to let Defender block a file it has never seen before?",
      options: [
        "Cloud-delivered protection and sample submission",
        "Real-time protection and behaviour monitoring",
        "Tamper protection and attack surface reduction",
        "Signature update interval and scheduled scanning"
      ],
      correctIndex: 0,
      rationale:
        "Cloud-delivered protection queries the Microsoft service for a reputation verdict in real time, and sample submission is what supplies the service with the files that build that reputation. Disabling submission degrades cloud protection.",
      examTip:
        "Behaviour monitoring detects malicious activity locally; cloud protection is what handles files with no local signature. The two are complementary and the exam distinguishes them.",
      skills: ["g3.t1.s1"]
    }
  ]
};
