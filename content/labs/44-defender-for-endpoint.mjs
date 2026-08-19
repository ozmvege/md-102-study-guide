export default {
  id: "defender-for-endpoint",
  moduleId: "m7",
  title: "Defender for Endpoint: onboarding, EDR and device risk",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 60,

  scenario:
    "Everything you have built so far is preventive. Defender for Endpoint adds detection and response — and, more importantly for this course, it feeds a device risk score back into Intune compliance. That closes the loop: a device that shows signs of compromise becomes non-compliant, and Conditional Access refuses it access. You will connect the two services, onboard a device, deploy an EDR policy, and then trigger a real detection and watch the chain fire.",

  objectives: [
    "Connect Intune to Microsoft Defender for Endpoint",
    "Onboard Windows devices with an EDR policy",
    "Configure device risk as a compliance rule",
    "Trigger a detection and observe risk propagate to Conditional Access",
    "Triage the resulting incident in the Defender portal"
  ],

  keyConcepts: ["Security connector", "EDR onboarding", "Machine risk score", "Compliance integration", "Incident triage", "EICAR"],

  skills: [
    { id: "g3.t1.s6", depth: "primary" },
    { id: "g3.t1.s7", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "MDE-P2"],
    roles: ["Intune Administrator", "Security Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "portal", id: "Microsoft Defender portal" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11" }
    ],
    personas: ["alex.wilber", "security.operator"],
    labs: ["attack-surface-reduction", "conditional-access"]
  },

  exercises: [
    {
      id: "e1",
      title: "Connect the services",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Provision Defender and enable the connector",
          checkpoint: true,
          steps: [
            {
              text: "Open the **Microsoft Defender portal** at `https://security.microsoft.com` and sign in as `admin-security`.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "If you have never opened this portal, the Defender for Endpoint tenant is provisioned on your first visit and can take several hours to become fully available. The Intune connector will show **Unavailable** until it finishes. Open it now even if you do nothing else — the wait is unavoidable and it is better to start it early."
                }
              ]
            },
            {
              text: "In the Defender portal, select **Settings**, **Endpoints**, then **Advanced features**, and enable:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Microsoft Intune connection", value: "On" },
                    { label: "Device discovery", value: "On" },
                    { label: "Tamper protection", value: "On" }
                  ]
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Endpoint security**, then **Microsoft Defender for Endpoint**.",
              nav: ["Endpoint security", "Microsoft Defender for Endpoint"]
            },
            {
              text: "Under **MDM Compliance Policy Settings**, configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Connect Windows devices to Microsoft Defender for Endpoint", value: "On" },
                    { label: "Connect Android devices to Microsoft Defender for Endpoint", value: "On" },
                    { label: "Connect iOS/iPadOS devices to Microsoft Defender for Endpoint", value: "On" }
                  ]
                },
                {
                  kind: "verify",
                  text: "**Connection status** reads **Enabled** with a recent **Last synchronized** timestamp. If it reads Unavailable, the Defender tenant is still provisioning."
                }
              ]
            }
          ],
          result: {
            text: "Intune and Defender for Endpoint exchange device state.",
            verify: [
              { text: "The connector reports **Enabled**." },
              { text: "The Intune connection is on in the Defender portal's advanced features." }
            ]
          }
        },
        {
          id: "t2",
          title: "Onboard devices with an EDR policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **Endpoint detection and response**, then **Create Policy**, platform **Windows**, profile **Endpoint detection and response**.",
              nav: ["Endpoint security", "Endpoint detection and response", "Create Policy"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "EDR-Windows-Corporate" },
                    { label: "Microsoft Defender for Endpoint client configuration package type", value: "Auto from connector", note: "Uses the connector rather than a manually downloaded onboarding blob, so it stays valid." },
                    { label: "Sample sharing", value: "All" },
                    { label: "Telemetry reporting frequency", value: "Expedite", note: "Faster reporting for high-value devices. Normal is fine at scale." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Auto from connector** is the right choice. The manual alternative requires you to download an onboarding package from the Defender portal and paste its contents — which works, and then quietly expires or drifts when the tenant configuration changes."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the policy."
            },
            {
              text: "On **MD102-VM2-Alex**, sync and verify the sensor:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-Service Sense | Select-Object Name, Status, StartType\nGet-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\Windows Advanced Threat Protection\\Status\" -ErrorAction SilentlyContinue |\n    Select-Object OnboardingState, OrgId"
                },
                {
                  kind: "verify",
                  text: "The **Sense** service is Running and Automatic, and **OnboardingState** is `1`.",
                  expected: "Name  Status  StartType\n----  ------  ---------\nSense Running Automatic\n\nOnboardingState OrgId\n--------------- -----\n              1 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                }
              ]
            },
            {
              text: "Confirm the device appears in the Defender portal under **Assets** > **Devices**."
            }
          ],
          result: {
            text: "The device is onboarded and reporting EDR telemetry.",
            verify: [
              { text: "The Sense service is running and OnboardingState is 1." },
              { text: "The device is listed in the Defender portal." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Close the loop: risk to compliance to access",
      estimatedMinutes: 40,
      tasks: [
        {
          id: "t1",
          title: "Add device risk to the compliance policy",
          checkpoint: true,
          steps: [
            {
              text: "Open `CMP-Windows-Corporate` from lab 29 and select **Properties**, then edit **Compliance settings**.",
              nav: ["Devices", "Compliance", "CMP-Windows-Corporate"]
            },
            {
              text: "Under **Microsoft Defender for Endpoint**, set:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Require the device to be at or under the machine risk score", value: "Medium" }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Risk level", "Compliant when device risk is"],
                  rows: [
                    ["Clear", "No detections at all — the strictest setting"],
                    ["Low", "Clear or Low"],
                    ["Medium", "Clear, Low or Medium — a reasonable production choice"],
                    ["High", "Any risk level — effectively disables the rule"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Setting this to **Clear** means a single low-severity alert makes a device non-compliant and, with the Conditional Access policy from lab 31, blocks the user. That is defensible for a domain controller and unworkable for a laptop estate. **Medium** blocks devices with genuinely serious findings and tolerates noise."
                }
              ]
            },
            {
              text: "Save the policy."
            }
          ],
          result: {
            text: "Device risk from Defender is now part of the compliance definition.",
            verify: [
              { text: "The compliance policy includes a machine risk score rule." }
            ]
          }
        },
        {
          id: "t2",
          title: "Trigger a detection and watch the chain",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, generate a harmless test detection using the EICAR standard test file:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "# EICAR is an industry-standard, completely harmless antivirus test string.\n# It is not malware and does nothing except trigger detection.\n$p = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR'\n$s = '-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'\nSet-Content -Path \"$env:TEMP\\eicar-test.txt\" -Value ($p + $s) -Encoding ASCII"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "EICAR is a published test string that every antivirus product agrees to detect. It contains no malicious code whatsoever — its only purpose is exactly this: proving detection works without using real malware. Defender will quarantine it within seconds."
                }
              ]
            },
            {
              text: "Confirm the local detection:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-MpThreatDetection | Select-Object -Last 3 |\n    Select-Object ThreatID, ActionSuccess, InitialDetectionTime, Resources"
                },
                {
                  kind: "verify",
                  text: "A detection is recorded and the file has been removed."
                }
              ]
            },
            {
              text: "In the **Defender portal**, open **Incidents & alerts** and find the resulting alert.",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the incident and review the alert story showing what happened." },
                    { text: "Open the device page and note its **Risk level**." },
                    { text: "Review the available response actions — isolate device, run antivirus scan, collect investigation package, restrict app execution." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Isolate device** cuts the machine off from the network while leaving the Defender connection alive, so you can keep investigating a compromised device without letting it reach anything else. It is the single most useful response action and it is examinable."
                }
              ]
            },
            {
              text: "Watch the loop close. Check the device's compliance state in Intune after risk propagates.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Device compliance"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "A single EICAR detection usually resolves to a low risk level and may not exceed your Medium threshold — so the device may well stay compliant. That is the correct outcome and worth understanding: risk-based compliance responds to sustained or serious findings, not to every alert. To see the block, temporarily set the risk rule to **Clear** and re-sync."
                }
              ]
            },
            {
              text: "If you set the rule to **Clear** to observe the block, sign in as Alex to Office 365 and confirm Conditional Access refuses access — then resolve the alert in the Defender portal, set the rule back to **Medium**, and confirm access returns."
            }
          ],
          result: {
            text: "A detection on a device changed its risk, which changed its compliance, which changed its access.",
            verify: [
              { text: "An alert exists in the Defender portal for the test detection." },
              { text: "You can describe the path from detection to blocked sign-in." },
              { text: "The compliance risk rule is restored to Medium." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Devices do not appear in the Defender portal after the EDR policy is assigned.",
      rootCause:
        "The connector is not enabled, the Defender tenant is still provisioning, or the device has no Defender for Endpoint licence.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Service Sense | Select-Object Status, StartType\nGet-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\Windows Advanced Threat Protection\\Status\" |\n    Select-Object OnboardingState, OrgId"
      },
      resolution:
        "`OnboardingState` of `0` means the onboarding package never applied — check the EDR policy assignment and the connector status. The Sense service being stopped on an onboarded device usually means tamper protection is blocking a change that something else attempted."
    }
  ],

  quiz: [
    {
      question:
        "You configure a compliance policy requiring devices to be at or under a machine risk score of Clear. What is the practical consequence?",
      options: [
        "Any device with a single active alert of any severity becomes non-compliant and is blocked by Conditional Access",
        "Only devices with high-severity alerts become non-compliant",
        "The rule has no effect until Defender for Endpoint is licensed separately",
        "Devices are quarantined automatically by Defender"
      ],
      correctIndex: 0,
      rationale:
        "Clear means no detections at all. Any active alert, however minor, pushes the device above the threshold, making it non-compliant and — with a compliance-requiring Conditional Access policy — blocking the user entirely.",
      examTip:
        "Medium is the usual production setting. Clear is defensible only for the highest-value systems, and the exam tests whether you understand the operational cost.",
      skills: ["g3.t1.s6"]
    },
    {
      question:
        "Which Defender for Endpoint response action isolates a compromised device from the network while preserving the ability to investigate it remotely?",
      options: [
        "Isolate device",
        "Restrict app execution",
        "Run antivirus scan",
        "Collect investigation package"
      ],
      correctIndex: 0,
      rationale:
        "Device isolation cuts network connectivity while maintaining the connection to the Defender service, so investigation and response can continue. Restrict app execution limits what can run but leaves the network open.",
      examTip:
        "Know the four response actions and what each preserves. Isolation is the containment action; the others are investigation or mitigation.",
      skills: ["g3.t1.s6", "g3.t1.s7"]
    }
  ]
};
