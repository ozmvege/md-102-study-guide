export default {
  id: "compliance-policies",
  moduleId: "m5",
  title: "Compliance policies and actions for non-compliance",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 50,

  scenario:
    "Compliance is Intune's opinion about whether a device is healthy. On its own that opinion changes nothing — a non-compliant device carries on working. It becomes an access control in lab 31, when Conditional Access starts refusing non-compliant devices. Here you build the definition of healthy for Windows and Android, decide what happens when a device fails, and deliberately break a device to watch the grace period run.",

  objectives: [
    "Create compliance policies for Windows and Android",
    "Configure actions for non-compliance with a grace period",
    "Set the tenant-wide compliance defaults and understand the not-evaluated setting",
    "Observe a device transition to non-compliant and back",
    "Explain how compliance conflicts resolve"
  ],

  keyConcepts: ["Compliance policy", "Actions for non-compliance", "Grace period", "Mark devices with no compliance policy as", "Compliance conflict resolution"],

  skills: [{ id: "g1.t3.s4", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 with vTPM" },
      { kind: "emulator", id: "avd-android" }
    ],
    personas: ["alex.wilber", "henrietta.mueller", "diego.siciliani"],
    labs: ["whfb-laps-local-groups", "android-configuration-profiles"]
  },

  exercises: [
    {
      id: "e1",
      title: "Set the tenant compliance defaults",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Decide how untested devices are treated",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Compliance**, then **Compliance settings**.",
              nav: ["Devices", "Compliance", "Compliance settings"]
            },
            {
              text: "Configure the tenant defaults:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Mark devices with no compliance policy assigned as", value: "Not compliant" },
                    { label: "Compliance status validity period (days)", value: "30", note: "A device that stops checking in becomes non-compliant after this many days." },
                    { label: "Enhanced jailbreak detection", value: "Not configured", note: "iOS only, and it costs battery — leave it off unless required." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Mark devices with no compliance policy assigned as** is the single most consequential setting on this page. Left at **Compliant**, a device that no policy targets is treated as healthy — so a Conditional Access rule requiring compliance lets it straight through. Setting it to **Not compliant** means a device must actively prove its health, which is the whole point. Change this before you build Conditional Access, not after."
                }
              ]
            },
            {
              text: "Save."
            }
          ],
          result: {
            text: "Devices must prove compliance rather than being assumed healthy.",
            verify: [
              { text: "The default reads **Not compliant**." },
              { text: "A validity period is configured." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Build the Windows compliance policy",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create the policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Compliance**, then **Create policy**, platform **Windows 10 and later**.",
              nav: ["Devices", "Compliance", "Create policy"]
            },
            {
              text: "Name it `CMP-Windows-Corporate`, then configure **Device Health**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Require BitLocker", value: "Require", note: "Will fail until lab 43 enables it. That is deliberate." },
                    { label: "Require Secure Boot to be enabled on the device", value: "Require" },
                    { label: "Require code integrity", value: "Require" }
                  ]
                }
              ]
            },
            {
              text: "Configure **Device Properties** and **System Security**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Minimum OS version", value: "10.0.22000" },
                    { label: "Require a password to unlock mobile devices", value: "Require" },
                    { label: "Simple passwords", value: "Block" },
                    { label: "Minimum password length", value: "8" },
                    { label: "Require encryption of data storage on device", value: "Require" },
                    { label: "Firewall", value: "Require" },
                    { label: "Antivirus", value: "Require" },
                    { label: "Antispyware", value: "Require" },
                    { label: "Microsoft Defender Antimalware", value: "Require" },
                    { label: "Real-time protection", value: "Require" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Require a password to unlock mobile devices** applies to Windows too despite the wording — it maps to the device lock CSP. The label is a leftover from when the setting was mobile-only, and it catches people out in the portal."
                }
              ]
            },
            {
              text: "On **Actions for noncompliance**, build an escalation rather than a single event:",
              parts: [
                {
                  kind: "table",
                  headers: ["Action", "Schedule (days after noncompliance)", "Purpose"],
                  rows: [
                    ["Send email to end user", "0", "Tell the user immediately, with instructions"],
                    ["Send email to end user", "3", "Reminder while the device still works"],
                    ["Mark device noncompliant", "7", "The grace period. Access is not blocked until now."],
                    ["Send email to end user", "14", "Final warning before any retire action"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Mark device noncompliant** scheduled at day 7 is the grace period. Until that day the device is technically failing the policy but still reported as compliant, so Conditional Access does not block it. Setting this to 0 means a user whose antivirus definitions lapse overnight is locked out before anyone can tell them why. A grace period of a few days is the difference between a security control and a help desk queue."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the policy."
            }
          ],
          result: {
            text: "Windows corporate devices have a health definition with a humane escalation path.",
            verify: [
              { text: "`CMP-Windows-Corporate` is assigned to corporate Windows devices." },
              { text: "**Mark device noncompliant** is scheduled after a grace period, not at day 0." }
            ]
          }
        },
        {
          id: "t2",
          title: "Observe the result",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy, then check compliance from the client:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-CimInstance -Namespace \"root\\cimv2\\mdm\\dmmap\" `\n    -ClassName MDM_DevDetail_Ext01 -ErrorAction SilentlyContinue |\n    Select-Object DeviceHardwareData -ExcludeProperty DeviceHardwareData\nmanage-bde -status C:"
                }
              ]
            },
            {
              text: "In the portal, open **Devices** > **All devices** > `MD102-VM2-Alex` > **Device compliance**.",
              nav: ["Devices", "All devices", "Device compliance"],
              parts: [
                {
                  kind: "verify",
                  text: "The device is listed as **Not compliant** and the BitLocker rule shows as failing. That is correct — BitLocker is not enabled until lab 43. This is a real non-compliant device to watch."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The per-setting compliance view tells you exactly which rule failed. Compare that with a user reporting *my device says it is not compliant* — this blade turns that into a single actionable line."
                }
              ]
            }
          ],
          result: {
            text: "You can read exactly which compliance rule a device fails and why.",
            verify: [
              { text: "The device reports non-compliant with a named failing rule." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Android compliance and conflict resolution",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create an Android compliance policy",
          checkpoint: true,
          steps: [
            {
              text: "Create a policy with platform **Android Enterprise** and policy type **Personally-Owned Work Profile**, named `CMP-Android-WorkProfile`."
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Minimum OS version", value: "13.0" },
                    { label: "Require the device to be at or under the Device Threat Level", value: "Medium" },
                    { label: "Rooted devices", value: "Block" },
                    { label: "Require a password to unlock mobile devices (work profile)", value: "Require" },
                    { label: "Minimum password length", value: "6" },
                    { label: "Encryption of data storage on device", value: "Require" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Device Threat Level** requires a mobile threat defence connector such as Microsoft Defender for Endpoint on Android. Without one it evaluates as not applicable rather than failing — a useful thing to know before you assume the rule is working."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-ANDROID-WP` and create the policy."
            },
            {
              text: "Learn how compliance handles conflicts, which differs from configuration profiles:",
              parts: [
                {
                  kind: "table",
                  headers: ["Policy type", "Two policies disagree", "Result"],
                  rows: [
                    ["Compliance", "Minimum password 6 and minimum password 8", "**Most restrictive wins** — 8 is enforced"],
                    ["Device configuration", "A setting set to Enabled and Disabled", "**Conflict** — neither applies"],
                    ["Enrollment restriction", "Two restrictions target the same user", "**Priority decides** — one applies, the other is ignored"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "These three resolution models are a favourite exam target because they are genuinely different and there is no intuition to fall back on. Compliance is the only one where the strictest value wins."
                }
              ]
            }
          ],
          result: {
            text: "Android work profile devices have a compliance definition and you can predict conflict outcomes.",
            verify: [
              { text: "`CMP-Android-WorkProfile` is assigned." },
              { text: "You can state how each of the three policy types resolves a conflict." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A device shows as compliant even though no compliance policy targets it.",
      rootCause:
        "The tenant setting **Mark devices with no compliance policy assigned as** is set to **Compliant**, so untargeted devices are assumed healthy.",
      diagnostic: {
        lang: "text",
        code: "Devices > Compliance > Compliance settings"
      },
      resolution:
        "Set it to **Not compliant**. Until you do, any Conditional Access policy requiring a compliant device can be satisfied by a device that has never been evaluated."
    }
  ],

  quiz: [
    {
      question:
        "Two compliance policies target the same Windows device. One requires a minimum password length of 6, the other 8. What is enforced?",
      options: [
        "8 — compliance policies resolve conflicts by applying the most restrictive value",
        "6 — the least restrictive value is applied to avoid lockouts",
        "Neither — the setting is reported as a conflict and left unapplied",
        "The policy with the lower priority number wins"
      ],
      correctIndex: 0,
      rationale:
        "Compliance policy conflicts resolve to the most restrictive value. That is different from device configuration profiles, where a conflict leaves the setting unapplied entirely.",
      examTip:
        "Compliance takes the strictest value; configuration reports a conflict and does nothing; enrollment restrictions are decided by priority. Learn the three together.",
      skills: ["g1.t3.s4"]
    },
    {
      question:
        "You want users to have several days to fix a compliance failure before losing access to corporate resources. Which configuration achieves this?",
      options: [
        "Schedule the Mark device noncompliant action several days after non-compliance",
        "Set the compliance status validity period to several days",
        "Configure Conditional Access in report-only mode",
        "Set the tenant default to mark untargeted devices as compliant"
      ],
      correctIndex: 0,
      rationale:
        "The **Mark device noncompliant** action's schedule is the grace period. Until it fires, the device continues to report as compliant and Conditional Access does not block it, which gives the user time to remediate.",
      examTip:
        "Scheduling that action at day 0 removes the grace period entirely. Any question about giving users time to remediate is asking about this schedule.",
      skills: ["g1.t3.s4"]
    }
  ]
};
