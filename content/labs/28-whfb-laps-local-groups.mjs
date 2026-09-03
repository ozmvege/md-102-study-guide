export default {
  id: "whfb-laps-local-groups",
  moduleId: "m4",
  title: "Windows Hello for Business, Windows LAPS and local group membership",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 55,

  scenario:
    "Three settings that together decide who can sign in to a Contoso device and with what. Windows Hello for Business replaces the password at the sign-in screen with a PIN or biometric bound to the device's TPM. Windows LAPS gives every device a unique, rotating local administrator password so one stolen credential does not open the estate. Local group membership decides who is a local administrator at all — and by default, on an Entra joined device, that list is longer than most organisations expect.",

  objectives: [
    "Configure Windows Hello for Business through Intune and enrol a user",
    "Explain how Hello credentials are protected by the TPM",
    "Enable Windows LAPS with escrow to Microsoft Entra ID",
    "Retrieve and rotate a local administrator password",
    "Control local group membership through the settings catalog"
  ],

  keyConcepts: ["Windows Hello for Business", "PIN and biometrics", "TPM key storage", "Windows LAPS", "Password rotation", "Local Users and Groups CSP"],

  skills: [
    { id: "g1.t3.s6", depth: "primary" },
    { id: "g1.t3.s7", depth: "primary" },
    { id: "g1.t3.s8", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 with vTPM" }
    ],
    personas: ["alex.wilber", "johanna.lorenz", "helpdesk.operator"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Windows Hello for Business",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Configure and enrol Windows Hello",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, **Windows**, then **Windows Hello for Business**.",
              nav: ["Devices", "Enrollment", "Windows", "Windows Hello for Business"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "This is the tenant-wide default, applied at enrollment. For per-group control, create an **Identity protection** configuration profile instead. The tenant-wide setting is simpler and is what most organisations use."
                }
              ]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Configure Windows Hello for Business", value: "Enabled" },
                    { label: "Use a Trusted Platform Module (TPM)", value: "Required", note: "Required rather than Preferred. Preferred falls back to software key storage on a device with no TPM, which removes the hardware protection that makes Hello worth deploying." },
                    { label: "Minimum PIN length", value: "6" },
                    { label: "Maximum PIN length", value: "127" },
                    { label: "Lowercase letters in PIN", value: "Not allowed" },
                    { label: "Uppercase letters in PIN", value: "Not allowed" },
                    { label: "Special characters in PIN", value: "Not allowed" },
                    { label: "PIN expiration (days)", value: "Not configured" },
                    { label: "Allow biometric authentication", value: "Yes" },
                    { label: "Use enhanced anti-spoofing, when available", value: "Yes" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "A Hello PIN is not a password, and this is the exam's favourite point about it. The PIN never leaves the device and is never transmitted. It unlocks a private key held in the TPM, and that key authenticates. A stolen PIN is worthless without the physical device, which is why a six-digit PIN is stronger in practice than an eight-character password."
                }
              ]
            },
            {
              text: "Save, then on **MD102-VM2-Alex** sign out and back in as Alex."
            },
            {
              text: "Complete the Hello enrollment prompt and set a PIN.",
              parts: [
                {
                  kind: "verify",
                  text: "Windows prompts to set up a PIN, accepts a six-digit numeric value, and the next sign-in offers PIN rather than password."
                }
              ]
            },
            {
              text: "On **MD102-VM2-Alex**, open PowerShell and confirm the credential is protected by hardware:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "certutil -scinfo -silent 2>$null\nGet-Tpm | Select-Object TpmPresent, TpmReady"
                },
                {
                  kind: "verify",
                  text: "The TPM is present and ready. The Hello key lives there — which is why lab 2 insisted on a virtual TPM."
                }
              ]
            }
          ],
          result: {
            text: "Alex signs in with a PIN backed by a TPM-protected key.",
            verify: [
              { text: "The sign-in screen offers PIN as the default method." },
              { text: "TPM use is set to **Required** in the tenant configuration." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Windows LAPS",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Enable LAPS in Microsoft Entra ID and Intune",
          checkpoint: true,
          steps: [
            {
              text: "First enable the directory to accept escrowed passwords. In the **Microsoft Entra admin center**, select **Identity**, then **Devices**, then **Device settings**.",
              nav: ["Identity", "Devices", "Device settings"],
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enable Microsoft Entra Local Administrator Password Solution (LAPS)", value: "Yes" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "This directory setting must be enabled first. If it is off, the Intune policy deploys successfully, the device rotates its password locally, and the escrow silently fails — leaving you with a device whose local administrator password nobody knows. Enable the directory setting before the policy, every time."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Endpoint security**, then **Account protection**, then **Create Policy**.",
              nav: ["Endpoint security", "Account protection", "Create Policy"]
            },
            {
              text: "Choose platform **Windows 10 and later** and profile **Local admin password solution (Windows LAPS)**, then configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-LAPS-Corporate" },
                    { label: "Backup Directory", value: "Backup the password to Microsoft Entra ID" },
                    { label: "Password Age Days", value: "30" },
                    { label: "Administrator Account Name", value: "Leave blank", note: "Blank means the built-in Administrator account, identified by its well-known SID rather than its name. Safer than naming it, since the account can be renamed." },
                    { label: "Password Complexity", value: "Large letters + small letters + numbers + special characters" },
                    { label: "Password Length", value: "20" },
                    { label: "Post Authentication Actions", value: "Reset the password and logoff the managed account" },
                    { label: "Post Authentication Reset Delay", value: "8", note: "Hours after use before the password is automatically rotated." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Post authentication actions** are what make LAPS more than a password vault. After the local administrator account is used, the password is automatically rotated within the delay window — so a password read for one support call is useless by the next day, even if it was written down."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the policy."
            }
          ],
          result: {
            text: "Corporate devices maintain a unique, rotating local administrator password escrowed to Microsoft Entra ID.",
            verify: [
              { text: "The directory LAPS setting is enabled." },
              { text: "`WIN-LAPS-Corporate` is assigned." }
            ]
          }
        },
        {
          id: "t2",
          title: "Retrieve and rotate a password",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM2-Alex**, sync policy and confirm LAPS is active:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-LapsAADPassword -DeviceIds $env:COMPUTERNAME -ErrorAction SilentlyContinue\nGet-WinEvent -LogName \"Microsoft-Windows-LAPS/Operational\" -MaxEvents 20 |\n    Select-Object TimeCreated, Id, LevelDisplayName, Message |\n    Format-Table -Wrap"
                },
                {
                  kind: "verify",
                  text: "The LAPS operational log shows a successful password update and escrow. Event ID 10018 indicates a successful directory backup."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex** from the list, then select **Local admin password**.",
              nav: ["Devices", "All devices", "MD102-VM2-Alex", "Local admin password"],
              parts: [
                {
                  kind: "verify",
                  text: "The current password is shown along with the account name and the next rotation time. Retrieving it is an audited action."
                }
              ]
            },
            {
              text: "Select **Rotate local admin password** and confirm.",
              parts: [
                {
                  kind: "verify",
                  text: "The password changes on the next device check-in and the previous value stops working."
                }
              ]
            },
            {
              text: "Note who is permitted to read it:",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Reading a LAPS password requires the `DeviceLocalCredential.Read.All` permission, granted through the Intune **Help Desk Operator** role or the Entra **Cloud Device Administrator** role. Being able to see a device does not confer the ability to read its local administrator password — this is deliberately a separate, audited permission."
                }
              ]
            }
          ],
          result: {
            text: "You can retrieve and rotate a device's local administrator password from the portal.",
            verify: [
              { text: "The password is visible in the device blade." },
              { text: "A manual rotation completed successfully." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Local group membership",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Control who is a local administrator",
          checkpoint: true,
          steps: [
            {
              text: "First see the problem. On **MD102-VM2-Alex**, run:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "net localgroup Administrators"
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "On a Microsoft Entra joined device, the **Global Administrator** and **Cloud Device Administrator** directory roles are added to the local Administrators group automatically, as is the user who joined the device. That last one surprises people: whoever performed the join is a local administrator on that machine, permanently, unless you change it."
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, create a settings catalog profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, type **Settings catalog**, named `WIN-LocalGroups`.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Search the settings picker for `Local Users and Groups`, add the setting from the **Local Policies Security Options** or **Accounts** category, and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Group configuration action", value: "Update", note: "Update adds or removes named members. Replace overwrites the entire membership — powerful, and easy to use to lock everyone out." },
                    { label: "Target group", value: "Administrators", note: "Identified by its well-known SID S-1-5-32-544 rather than its name, so it works on localised Windows." },
                    { label: "Members to add", value: "The SID of GRP-ADM-HELPDESK" },
                    { label: "Members to remove", value: "The Entra role or account you want to strip" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `WIN-LocalGroups`, then select **Next**." },
                    { text: "On the **Configuration settings** tab, select **Add settings**, configure the local group action and SID mappings above, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Use **Update**, not **Replace**, until you are certain. **Replace** sets the group to exactly the members you list — omit the local administrator account or the LAPS-managed account and you have a device nobody can administer locally, including you. Combine that with a Conditional Access mistake and the device is unrecoverable without a rebuild."
                }
              ]
            },
            {
              text: "After the device syncs, check the group again in PowerShell on **MD102-VM2-Alex**:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "net localgroup Administrators"
                },
                {
                  kind: "verify",
                  text: "The membership reflects your configuration. Together with Windows LAPS, this gives you a device where local administrator access is both minimal and individually credentialed."
                }
              ]
            }
          ],
          result: {
            text: "Local administrator membership is defined by policy rather than by whoever happened to join the device.",
            verify: [
              { text: "`WIN-LocalGroups` reports **Succeeded**." },
              { text: "The local Administrators group matches the policy." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Windows LAPS policy reports success but no password appears in the portal.",
      rootCause:
        "The Microsoft Entra ID directory setting **Enable Microsoft Entra Local Administrator Password Solution** is disabled, so the device rotates the password locally and the escrow is rejected.",
      diagnostic: {
        lang: "powershell",
        code: "Get-WinEvent -LogName \"Microsoft-Windows-LAPS/Operational\" -MaxEvents 30 |\n    Select-Object TimeCreated, Id, Message | Format-Table -Wrap"
      },
      resolution:
        "Enable the setting under **Identity** > **Devices** > **Device settings** in the Microsoft Entra admin center, then force a rotation from the device blade. Until then, the device has a password nobody knows."
    },
    {
      symptom: "Users are not prompted to set a Windows Hello PIN.",
      rootCause:
        "Windows Hello is disabled tenant-wide, TPM is set to Required on a device with no usable TPM, or an Identity protection profile is overriding the tenant default.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Tpm | Select-Object TpmPresent, TpmReady\ndsregcmd /status | Select-String \"AzureAdJoined\""
      },
      resolution:
        "Confirm the TPM is present and ready, confirm the device is Entra joined, and check for a conflicting Identity protection profile. Hello enrollment is offered at interactive sign-in, so sign out and back in after fixing."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "Which statement about a Windows Hello for Business PIN is correct?",
      options: [
        "The PIN never leaves the device and unlocks a private key held in the TPM",
        "The PIN is transmitted to Microsoft Entra ID and validated centrally",
        "The PIN replaces the password and is synchronised across the user's devices",
        "The PIN is stored as a reversible hash in the local SAM database"
      ],
      correctIndex: 0,
      rationale:
        "A Hello PIN is device-local. It unlocks a private key protected by the TPM, and that key performs the authentication. Nothing about the PIN is transmitted, which is why it is device-specific and why a stolen PIN is useless without the hardware.",
      examTip:
        "The distinction that earns marks: a password authenticates you anywhere, a PIN unlocks a key on one device. That is why a short PIN is acceptable.",
      skills: ["g1.t3.s6"]
    },
    {
      id: "q2",
      question:
        "You deploy a Windows LAPS policy backing up to Microsoft Entra ID. The policy reports success but no passwords appear in the portal. What is the most likely cause?",
      options: [
        "The Microsoft Entra ID device setting enabling LAPS has not been turned on",
        "The devices do not have a TPM",
        "The administrator account name field was left blank",
        "The password length exceeds the directory maximum"
      ],
      correctIndex: 0,
      rationale:
        "The directory must be configured to accept escrowed passwords. Without it the client-side policy applies and rotates the password locally, but the backup to Microsoft Entra ID is rejected — leaving a device whose local administrator password is unknown.",
      examTip:
        "LAPS is a two-part configuration: the directory setting and the Intune policy. Leaving the account name blank is correct — it targets the built-in account by SID.",
      skills: ["g1.t3.s7"]
    },
    {
      id: "q3",
      question:
        "Which action should you use in a Local Users and Groups policy when you want to add a group to the local Administrators group without disturbing existing members?",
      options: [
        "Update",
        "Replace",
        "Restrict",
        "Merge"
      ],
      correctIndex: 0,
      rationale:
        "**Update** adds and removes the members you name, leaving everything else intact. **Replace** sets the group to exactly the listed members, which can remove the accounts needed to administer the device locally.",
      examTip:
        "Replace is the dangerous option and the exam knows it. Any scenario mentioning preserving existing membership is pointing at Update.",
      skills: ["g1.t3.s8"]
    }
  ]
};
