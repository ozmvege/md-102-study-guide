export default {
  id: "disk-encryption",
  moduleId: "m7",
  title: "BitLocker: silent encryption, key escrow and recovery",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 50,

  scenario:
    "Alex's laptop fails compliance because BitLocker is not enabled. You will fix that properly: encryption that starts silently with no user prompt, a recovery key escrowed to Microsoft Entra ID before encryption begins, and self-service recovery so a user who forgets nothing can still get back into their own device. Then you will watch the compliance policy from lab 29 flip to compliant.",

  objectives: [
    "Create a BitLocker disk encryption policy with silent enablement",
    "Escrow recovery keys to Microsoft Entra ID",
    "Retrieve a recovery key as an administrator and as the user",
    "Rotate a recovery key remotely",
    "Monitor encryption status across the estate"
  ],

  keyConcepts: ["BitLocker", "Silent enablement", "Key escrow", "XTS-AES", "Self-service recovery", "Recovery key rotation"],

  skills: [{ id: "g3.t1.s2", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 with vTPM" }
    ],
    personas: ["alex.wilber"],
    labs: ["compliance-policies"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy silent encryption",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Create the disk encryption policy",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, **Disk encryption**, then **Create Policy**, platform **Windows**, profile **BitLocker**.",
              nav: ["Endpoint security", "Disk encryption", "Create Policy"]
            },
            {
              text: "Name it `BL-Windows-Corporate`, then configure **BitLocker base settings**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enable full disk encryption for OS and fixed data drives", value: "Yes" },
                    { label: "Require devices to be encrypted", value: "Yes" },
                    { label: "Allow warning for other disk encryption", value: "Blocked", note: "Blocking the warning is what makes encryption silent — see the note below." },
                    { label: "Allow standard users to enable encryption during Microsoft Entra join", value: "Allowed" },
                    { label: "Configure client-driven recovery password rotation", value: "Key rotation enabled for Microsoft Entra joined devices" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Silent enablement** requires two things together: **Allow warning for other disk encryption** set to **Blocked**, and **Allow standard users to enable encryption during Microsoft Entra join** set to **Allowed**. Without the first, the user is prompted and encryption waits for them. Without the second, a standard user cannot start it and nothing happens on any device where the user is not an administrator — which, after lab 17, is all of them."
                }
              ]
            },
            {
              text: "Configure **OS drive settings**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "BitLocker system drive policy", value: "Configure" },
                    { label: "Startup authentication required", value: "Yes" },
                    { label: "Compatible TPM startup", value: "Required", note: "The vTPM from lab 2 supplies this. Without it, silent encryption is impossible." },
                    { label: "Compatible TPM startup PIN", value: "Blocked", note: "A PIN would require user interaction at every boot, which is not silent." },
                    { label: "Compatible TPM startup key", value: "Blocked" },
                    { label: "Recovery options in the BitLocker setup wizard", value: "Configure" },
                    { label: "Save BitLocker recovery information to Microsoft Entra ID", value: "Enabled" },
                    { label: "Store recovery information in Microsoft Entra ID before enabling BitLocker", value: "Required" },
                    { label: "Encryption method for operating system drives", value: "XTS-AES 256-bit" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "**Store recovery information in Microsoft Entra ID before enabling BitLocker: Required** is the setting that matters most. It refuses to begin encryption until the recovery key has been successfully escrowed. Without it a device can encrypt itself and fail to upload the key — producing an encrypted machine whose recovery key exists nowhere. That is unrecoverable data loss caused by a security control."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the policy."
            }
          ],
          result: {
            text: "Corporate devices encrypt silently with keys escrowed before encryption starts.",
            verify: [
              { text: "Escrow before encryption is set to **Required**." },
              { text: "TPM startup is required and PIN and startup key are blocked." }
            ]
          }
        },
        {
          id: "t2",
          title: "Watch encryption happen",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy, open Windows PowerShell as an administrator, and check status:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "manage-bde -status C:"
                },
                {
                  kind: "verify",
                  text: "Conversion status moves to **Encryption in Progress** with a percentage, then **Fully Encrypted**. No prompt appeared for the user at any point.",
                  expected: "Conversion Status:    Encryption in Progress\nPercentage Encrypted: 34.2%\nEncryption Method:    XTS-AES 256\nProtection Status:    Protection Off\nKey Protectors:\n    TPM\n    Numerical Password"
                }
              ]
            },
            {
              text: "In the elevated Administrator PowerShell session on **MD102-VM2-Alex**, confirm both key protectors exist:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-BitLockerVolume -MountPoint C: |\n    Select-Object -ExpandProperty KeyProtector |\n    Select-Object KeyProtectorType, KeyProtectorId"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "You need both. **TPM** unlocks the drive automatically at boot so the user never sees a prompt. **Numerical Password** is the 48-digit recovery key escrowed to Microsoft Entra ID, used when the TPM cannot attest — after a firmware change, a hardware repair, or a boot configuration change."
                }
              ]
            },
            {
              text: "Once encryption completes and the device syncs, return to the **Microsoft Intune admin center**. Navigate to **Devices** > **All devices**, select `MD102-VM2-Alex`, and select **Device compliance** to verify that the policy is satisfied.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Device compliance"],
              parts: [
                {
                  kind: "verify",
                  text: "`CMP-Windows-Corporate` now reports **Compliant**. The BitLocker rule that has been failing since lab 29 is satisfied, and with the Conditional Access policy from lab 31 enabled, Alex's access to Office 365 is restored without any change to that policy."
                }
              ]
            }
          ],
          result: {
            text: "The device is encrypted, compliant, and the whole compliance-to-access chain works end to end.",
            verify: [
              { text: "`manage-bde -status` reports Fully Encrypted with XTS-AES 256." },
              { text: "The device is compliant and Conditional Access permits access." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Recovery and rotation",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Retrieve keys as administrator and as user",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **All devices**. Select `MD102-VM2-Alex`, then under **Monitor**, select **Recovery keys**.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Recovery keys"],
              parts: [
                {
                  kind: "verify",
                  text: "The BitLocker key identifier and the 48-digit recovery key are shown. Retrieving a key is an audited action."
                }
              ]
            },
            {
              text: "Now check the self-service path. In a private browser window, sign in as Alex at `https://myaccount.microsoft.com` and open **Devices**.",
              parts: [
                {
                  kind: "verify",
                  text: "Alex can see their own device and view its BitLocker recovery key without contacting the help desk."
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Self-service recovery is controlled by a Microsoft Entra setting: **Devices** > **Device settings** > **Restrict users from recovering the BitLocker key(s) for their owned devices**. Left at **No**, users help themselves. Set to **Yes**, every recovery prompt becomes a help desk call. Choose deliberately — the security benefit is modest and the operational cost is not."
                }
              ]
            }
          ],
          result: {
            text: "Recovery keys are retrievable by administrators and, if permitted, by the device owner.",
            verify: [
              { text: "The key is visible in the Intune device blade." },
              { text: "You know which Entra setting controls self-service recovery." }
            ]
          }
        },
        {
          id: "t2",
          title: "Rotate a key and monitor the estate",
          checkpoint: true,
          steps: [
            {
              text: "Under **Devices** > **All devices**, select `MD102-VM2-Alex`, then select **...** (overflow menu) > **BitLocker key rotation** from the device action bar.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "BitLocker key rotation"],
              parts: [
                {
                  kind: "verify",
                  text: "A new 48-digit key appears in **Recovery keys** after the device next checks in, and the previous key stops working."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Rotate a key whenever it has been disclosed — after a support call where it was read out, or after a device changes hands. The policy setting **Configure client-driven recovery password rotation** does this automatically after each use, which is the same idea as the LAPS post-authentication action from lab 28."
                }
              ]
            },
            {
              text: "Select **Endpoint security**, then **Disk encryption**, and review encryption across the estate:",
              nav: ["Endpoint security", "Disk encryption"],
              parts: [
                {
                  kind: "table",
                  headers: ["Column", "Watch for"],
                  rows: [
                    ["Encryption readiness", "**Not ready** means the hardware cannot support it — usually no TPM or Secure Boot off"],
                    ["Encryption status", "**Not encrypted** on a ready device means the policy has not applied or is prompting"],
                    ["Profile status", "An error here explains a device that never started encrypting"],
                    ["Key escrow status", "A device encrypted with no escrowed key is the dangerous case"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can rotate a key and see encryption state across every device.",
            verify: [
              { text: "The device shows a new recovery key after rotation." },
              { text: "The disk encryption report shows readiness and status for all devices." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "BitLocker does not start silently and the user is prompted to begin encryption.",
      rootCause:
        "**Allow warning for other disk encryption** is not set to Blocked, or standard users are not permitted to enable encryption during Microsoft Entra join. Silent enablement needs both.",
      diagnostic: {
        lang: "powershell",
        code: "manage-bde -status C:\nGet-WinEvent -LogName \"Microsoft-Windows-BitLocker/BitLocker Management\" -MaxEvents 20 |\n    Select-Object TimeCreated, Id, Message | Format-Table -Wrap"
      },
      resolution:
        "Set both settings as described, and confirm the device has a usable TPM. Encryption cannot be silent on a device with no TPM, because the user must supply a startup key or PIN."
    },
    {
      symptom: "A device is encrypted but no recovery key appears in the portal.",
      rootCause: "The key was never escrowed. The device encrypted before or without a successful upload to Microsoft Entra ID.",
      diagnostic: {
        lang: "powershell",
        code: "$v = Get-BitLockerVolume -MountPoint C:\n$kp = $v.KeyProtector | Where-Object KeyProtectorType -eq 'RecoveryPassword'\nBackupToAAD-BitLockerKeyProtector -MountPoint C: -KeyProtectorId $kp.KeyProtectorId"
      },
      resolution:
        "Escrow the existing key manually with the command above, then set **Store recovery information in Microsoft Entra ID before enabling BitLocker** to **Required** so it can never happen again. A device encrypted with no escrowed key is one firmware update away from permanent data loss."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Which BitLocker policy setting prevents a device from encrypting before its recovery key has been successfully escrowed?",
      options: [
        "Store recovery information in Microsoft Entra ID before enabling BitLocker",
        "Save BitLocker recovery information to Microsoft Entra ID",
        "Require devices to be encrypted",
        "Configure client-driven recovery password rotation"
      ],
      correctIndex: 0,
      rationale:
        "*Save recovery information* enables escrow; *store before enabling* makes successful escrow a precondition for encryption starting. Without the second, a device can encrypt and fail to upload its key, leaving no way to recover it.",
      examTip:
        "The two settings sound almost identical and only one prevents unrecoverable devices. Read the wording carefully in exam questions.",
      skills: ["g3.t1.s2"]
    },
    {
      id: "q2",
      question:
        "Silent BitLocker enablement fails on devices where the signed-in user is a standard user. What setting resolves this?",
      options: [
        "Allow standard users to enable encryption during Microsoft Entra join",
        "Allow warning for other disk encryption",
        "Compatible TPM startup PIN set to Required",
        "Encryption method set to XTS-AES 256-bit"
      ],
      correctIndex: 0,
      rationale:
        "Starting encryption normally requires administrative rights. This setting delegates that specific action to standard users, which is essential because Autopilot deployments correctly make users standard rather than local administrators.",
      examTip:
        "Silent enablement needs both this setting and the warning blocked. A question mentioning standard users points at this one specifically.",
      skills: ["g3.t1.s2"]
    }
  ]
};
