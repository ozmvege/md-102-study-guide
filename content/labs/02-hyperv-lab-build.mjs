export default {
  id: "hyperv-lab-build",
  moduleId: "m0",
  title: "Build the virtual machines and the Android emulator",
  access: "hands-on",
  difficulty: "foundational",
  estimatedMinutes: 75,
  nonExam: true,

  scenario:
    "You need physical devices to manage and you are not going to buy any. Three Generation 2 Hyper-V virtual machines with virtual TPMs stand in for corporate Windows 11 desktops, and a free Android Studio emulator stands in for a field worker's phone. The virtual TPM is the part people skip and then regret: without it BitLocker cannot silently enable, Windows Hello for Business cannot store keys in hardware, and the default compliance rules fail. Every one of those failures looks like a policy mistake rather than a missing chip, and you can lose an evening to it.",

  objectives: [
    "Create three Generation 2 virtual machines with a virtual TPM and Secure Boot enabled",
    "Explain why Generation 2 and a vTPM are prerequisites rather than preferences",
    "Install Windows 11 Pro and stop at the out-of-box experience without signing in",
    "Take the checkpoint that makes Autopilot practice repeatable",
    "Create an Android virtual device using a Google Play system image"
  ],

  keyConcepts: ["Generation 2 UEFI", "Virtual TPM", "Secure Boot", "Hyper-V checkpoint", "Google Play system image"],

  skills: [],

  requires: {
    licenses: [],
    roles: ["Local Administrator on the Hyper-V host"],
    platforms: [
      { kind: "host", id: "Windows 11 Pro host with Hyper-V" },
      { kind: "host", id: "Android Studio" }
    ],
    personas: [],
    labs: ["tenant-and-licensing"]
  },

  exercises: [
    {
      id: "e1",
      title: "Prepare the Hyper-V host",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Enable Hyper-V and confirm virtualisation support",
          checkpoint: true,
          steps: [
            {
              text: "On the host, open **Windows PowerShell** as an administrator.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "If you ran the pre-flight in lab 0 and it reported Hyper-V as **Enabled**, this whole exercise is already done — jump to exercise 2. Hyper-V is on by default on many developer machines, and the restart below is the slowest step in this lab."
                }
              ]
            },
            {
              text: "Confirm the processor supports virtualisation and that it is enabled in firmware:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ComputerInfo -Property \"HyperV*\" | Format-List"
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "If **HyperVRequirementVirtualizationFirmwareEnabled** reports `False`, virtualisation is switched off in your BIOS or UEFI firmware. No amount of configuration in Windows will fix that — reboot into firmware settings and enable Intel VT-x or AMD-V first."
                }
              ]
            },
            {
              text: "Enable the Hyper-V role if it is not already present:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This requires a restart. Hyper-V is available on Windows 11 **Pro**, **Enterprise** and **Education** — not on Home."
                }
              ]
            },
            {
              text: "After restarting, confirm the default virtual switch exists:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-VMSwitch | Select-Object Name, SwitchType"
                },
                {
                  kind: "verify",
                  text: "A switch named **Default Switch** of type **Internal** is listed. It provides NAT-based internet access, which is all these virtual machines need.",
                  expected: "Name            SwitchType\n----            ----------\nDefault Switch  Internal"
                }
              ]
            }
          ],
          result: {
            text: "Hyper-V is installed and networking is available.",
            verify: [
              { text: "**Hyper-V Manager** opens without error." },
              { text: "`Get-VMSwitch` lists **Default Switch**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Download the Windows 11 installation media",
          checkpoint: true,
          steps: [
            {
              text: "Download a **Windows 11 Pro** ISO from the [Windows 11 download page](https://www.microsoft.com/software-download/windows11), using the section titled *Download Windows 11 Disk Image (ISO) for x64 devices*. Choose the multi-edition ISO and select **Windows 11 Pro** during setup.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Install **Pro**, not Enterprise, and treat that as a requirement rather than a preference. Lab 20 exists to watch subscription activation step a Pro device up to Enterprise on sign-in — on a device already running Enterprise there is nothing left to demonstrate."
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The [Microsoft Evaluation Center](https://www.microsoft.com/evalcenter/evaluate-windows-11-enterprise) offers only a Windows 11 **Enterprise** evaluation, which is why it is not the link above. It works as a fallback if you cannot obtain Pro media, at the cost of lab 20 and of an image that expires after 90 days — inside the window you will still be using these machines."
                }
              ]
            },
            {
              text: "Save the ISO somewhere with a short path such as `C:\\Hyper-V\\ISO\\`, and note the full path. The script in the next exercise needs it."
            }
          ],
          result: {
            text: "Installation media is on disk.",
            verify: [{ text: "The ISO file exists and you know its full path." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Create the three virtual machines",
      intro:
        "The script below is idempotent: it removes any existing lab virtual machine of the same name and its disk before recreating it. That is deliberate, so you can re-run it after a mistake without hand-cleaning Hyper-V — but it also means it *will* destroy a machine called `MD102-VM1-Adele` if you already have one you care about.",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Run the virtual machine build script",
          checkpoint: true,
          steps: [
            {
              text: "Open **Windows PowerShell** as an administrator on the host."
            },
            {
              text: "Read the script in the **Scripts** section at the end of this lab, change `$IsoPath` to your ISO, then run it."
            },
            {
              text: "While it runs, understand what each setting buys you:",
              parts: [
                {
                  kind: "table",
                  headers: ["Setting", "Why it is not optional"],
                  rows: [
                    ["`-Generation 2`", "UEFI firmware. Generation 1 is BIOS and cannot have Secure Boot or a vTPM at all."],
                    ["`Set-VMKeyProtector`", "Creates the key protector that a virtual TPM requires. `Enable-VMTPM` fails without it."],
                    ["`Enable-VMTPM`", "Presents a TPM 2.0 to the guest. Without it: no silent BitLocker, no hardware-backed Windows Hello, and the built-in compliance rules fail."],
                    ["`-EnableSecureBoot On`", "Required by Windows 11, and checked by the Secure Boot compliance rule in lab 29."],
                    ["Dynamic memory 2–6 GB", "Three virtual machines at a fixed 4 GB will exhaust a 16 GB host. Dynamic memory lets idle machines give it back."]
                  ]
                }
              ]
            },
            {
              text: "Confirm all three machines were created with a TPM:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-VM MD102-* | ForEach-Object {\n    [pscustomobject]@{\n        Name       = $_.Name\n        Generation = $_.Generation\n        TPM        = (Get-VMSecurity -VMName $_.Name).TpmEnabled\n        SecureBoot = (Get-VMFirmware -VMName $_.Name).SecureBoot\n    }\n} | Format-Table -AutoSize"
                },
                {
                  kind: "verify",
                  text: "All three rows show **Generation 2**, **TPM True** and **SecureBoot On**."
                }
              ]
            }
          ],
          result: {
            text: "Three Generation 2 virtual machines exist with virtual TPMs and Secure Boot enabled.",
            verify: [
              { text: "`MD102-VM1-Adele`, `MD102-VM2-Alex` and `MD102-VM3-Megan` appear in **Hyper-V Manager**." },
              { text: "Every machine reports **TpmEnabled** as `True`." }
            ]
          }
        },
        {
          id: "t2",
          title: "Install Windows on the first two machines",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM1-Adele** and connect to it. Press a key when prompted to boot from the ISO."
            },
            {
              text: "Work through Windows Setup, choosing **Windows 11 Pro** if asked which edition to install."
            },
            {
              text: "At the out-of-box experience, choose **Set up for personal use**, then create a **local account** rather than signing in with a Microsoft account.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Local account name", value: "labadmin" },
                    { label: "Password", value: "Choose one and record it", note: "You will need it to sign in locally before joining the device to Microsoft Entra ID in lab 12." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Recent Windows 11 builds hide the local-account option behind **Sign-in options**, and some builds require you to disconnect the network first. Both are fine — the goal is simply to reach a desktop that is not yet joined to anything."
                }
              ]
            },
            {
              text: "Repeat for **MD102-VM2-Alex**."
            },
            {
              text: "On each machine, confirm the TPM is visible to Windows:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-Tpm | Select-Object TpmPresent, TpmReady, TpmEnabled"
                },
                {
                  kind: "verify",
                  text: "**TpmPresent** and **TpmReady** are both `True`. If either is `False`, stop — nothing later in this course involving encryption or Windows Hello will work.",
                  expected: "TpmPresent TpmReady TpmEnabled\n---------- -------- ----------\n      True     True       True"
                }
              ]
            }
          ],
          result: {
            text: "Two Windows 11 desktops are ready and unjoined.",
            verify: [
              { text: "Both machines reach the Windows desktop with a local account." },
              { text: "`Get-Tpm` reports **TpmReady** as `True` on both." }
            ]
          }
        },
        {
          id: "t3",
          title: "Prepare the third machine for Autopilot and checkpoint it",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM3-Megan** and boot from the ISO."
            },
            {
              text: "Work through Windows Setup until the very first out-of-box screen appears — the region selection.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Stop here. Do **not** click through the region screen, do not connect an account, do not sign in. Autopilot takes over at this exact point, and a machine that has been through the out-of-box experience once cannot be used for Autopilot again without a reset."
                }
              ]
            },
            {
              text: "Leave the machine sitting at that screen and, on the host, take a checkpoint:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Checkpoint-VM -Name MD102-VM3-Megan -SnapshotName \"OOBE-Clean\""
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "This checkpoint is the most valuable thing in the whole lab environment. Every Autopilot exercise — user-driven, pre-provisioning, self-deploying and device preparation — starts by reverting to it. Without it, each attempt costs a full Windows reinstall."
                }
              ]
            },
            {
              text: "Practise the revert now, so you know the command works before you need it under time pressure:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Restore-VMCheckpoint -Name \"OOBE-Clean\" -VMName MD102-VM3-Megan -Confirm:$false\nStart-VM -Name MD102-VM3-Megan"
                }
              ]
            }
          ],
          result: {
            text: "The Autopilot target is parked at a clean out-of-box experience with a checkpoint you can return to.",
            verify: [
              { text: "`Get-VMCheckpoint -VMName MD102-VM3-Megan` lists **OOBE-Clean**." },
              { text: "Reverting returns the machine to the region-selection screen." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Create the Android virtual device",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create an emulator with a Google Play image",
          checkpoint: true,
          steps: [
            {
              text: "Install **Android Studio** from [developer.android.com](https://developer.android.com/studio) and open it."
            },
            {
              text: "Open the **Device Manager**, then select **Create Virtual Device**.",
              nav: ["Tools", "Device Manager", "Create Virtual Device"]
            },
            {
              text: "Choose a **Pixel** hardware profile, then select **Next**."
            },
            {
              text: "On the system image screen, choose an image configured as follows:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "API level", value: "34 or later", note: "Android 14 or newer." },
                    { label: "Target", value: "Google Play", note: "Not Google APIs, and not a plain AOSP image." },
                    { label: "Internal storage", value: "32 GB" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The image **must** say **Google Play** in the Target column. Google APIs images have Google services but no Play Store, and Android Enterprise work profile provisioning requires the Play Store. Choosing the wrong image is the single most common reason the Android enrollment lab cannot be completed, and the failure appears much later as a Company Portal error that says nothing about system images."
                }
              ]
            },
            {
              text: "Name the device `MD102-Android`, then select **Finish** and start the emulator."
            },
            {
              text: "In the running emulator, open the **Play Store** app and confirm it loads. You do not need to sign in yet.",
              parts: [
                {
                  kind: "verify",
                  text: "The Play Store opens and prompts for a Google account. If there is no Play Store app at all, you selected the wrong system image — delete the virtual device and create it again."
                }
              ]
            }
          ],
          result: {
            text: "An Android emulator with Google Play is running.",
            verify: [
              { text: "The emulator boots to the Android home screen." },
              { text: "The **Play Store** application is present and opens." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Create the three lab virtual machines",
      lang: "powershell",
      note:
        "Idempotent by design — it deletes and recreates any lab machine of the same name, so re-running after a mistake is safe. It will destroy an existing machine called `MD102-VM1-Adele`, so do not run it on a host where that name means something else.",
      code: `#Requires -RunAsAdministrator
# Build the MD-102 lab virtual machines.

$Root    = "C:\\Hyper-V"
$IsoPath = "C:\\Hyper-V\\ISO\\Windows11.iso"   # <-- change this
$Switch  = "Default Switch"

$VMs = @("MD102-VM1-Adele", "MD102-VM2-Alex", "MD102-VM3-Megan")

if (-not (Test-Path $IsoPath)) { throw "ISO not found at $IsoPath" }
New-Item -ItemType Directory -Path $Root -Force | Out-Null

foreach ($Name in $VMs) {
    # --- Clean up any previous attempt so this script can be re-run -----------
    $existing = Get-VM -Name $Name -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Host "Removing existing $Name" -ForegroundColor Yellow
        if ($existing.State -ne 'Off') { Stop-VM -Name $Name -TurnOff -Force }
        Remove-VM -Name $Name -Force
    }
    $vhd = Join-Path $Root "$Name.vhdx"
    if (Test-Path $vhd) { Remove-Item $vhd -Force }

    # --- Create ---------------------------------------------------------------
    New-VM -Name $Name \`
           -Generation 2 \`
           -MemoryStartupBytes 4GB \`
           -NewVHDPath $vhd \`
           -NewVHDSizeBytes 80GB \`
           -SwitchName $Switch | Out-Null

    Set-VMMemory    -VMName $Name -DynamicMemoryEnabled $true -MinimumBytes 2GB -MaximumBytes 6GB
    Set-VMProcessor -VMName $Name -Count 2

    # Secure Boot must be on for Windows 11 and for the compliance rule in lab 29.
    Set-VMFirmware  -VMName $Name -EnableSecureBoot On -SecureBootTemplate "MicrosoftWindows"

    # The key protector must exist BEFORE the vTPM can be enabled.
    Set-VMKeyProtector -VMName $Name -NewLocalKeyProtector
    Enable-VMTPM       -VMName $Name

    # Attach installation media and boot from it first.
    Add-VMDvdDrive -VMName $Name -Path $IsoPath
    $dvd = Get-VMDvdDrive -VMName $Name
    Set-VMFirmware -VMName $Name -FirstBootDevice $dvd

    # Checkpoints during Windows setup cause more confusion than they solve;
    # lab 20 takes a deliberate one on VM3 instead.
    Set-VM -Name $Name -AutomaticCheckpointsEnabled $false

    Write-Host "Created $Name (Gen 2, vTPM, Secure Boot)" -ForegroundColor Green
}

Get-VM MD102-* | ForEach-Object {
    [pscustomobject]@{
        Name       = $_.Name
        Generation = $_.Generation
        MemoryMB   = [int]($_.MemoryStartup / 1MB)
        TPM        = (Get-VMSecurity  -VMName $_.Name).TpmEnabled
        SecureBoot = (Get-VMFirmware -VMName $_.Name).SecureBoot
    }
} | Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom: "`Enable-VMTPM` fails with a message about the key protector.",
      rootCause:
        "A virtual TPM stores its state in a key protector, and the machine does not have one yet. `Enable-VMTPM` does not create it for you.",
      diagnostic: {
        lang: "powershell",
        code: "Get-VMKeyProtector -VMName MD102-VM1-Adele"
      },
      resolution:
        "Run `Set-VMKeyProtector -VMName <name> -NewLocalKeyProtector` first, then `Enable-VMTPM`. The order matters and is the reason the build script does them in that sequence."
    },
    {
      symptom: "Windows Setup reports that the computer does not meet the system requirements for Windows 11.",
      rootCause:
        "The machine is Generation 1, or Secure Boot or the vTPM was not enabled. Windows 11 requires UEFI, Secure Boot and TPM 2.0.",
      diagnostic: {
        lang: "powershell",
        code: "Get-VM MD102-VM1-Adele | Select-Object Generation\nGet-VMSecurity -VMName MD102-VM1-Adele | Select-Object TpmEnabled\nGet-VMFirmware -VMName MD102-VM1-Adele | Select-Object SecureBoot"
      },
      resolution:
        "Generation cannot be changed after creation — delete the machine and recreate it with `-Generation 2`. Secure Boot and the vTPM can be enabled on an existing Generation 2 machine while it is switched off."
    }
  ],

  quiz: [
    {
      question:
        "You created a Hyper-V virtual machine for a Windows 11 lab, but BitLocker will not enable silently and the device reports non-compliant against a rule requiring a TPM. The machine runs Windows 11 correctly. What is the most likely cause?",
      options: [
        "The virtual machine is Generation 1, so it has no TPM and cannot be given one",
        "The virtual machine has too little memory assigned",
        "Secure Boot is enabled but the template is set to Microsoft Windows",
        "Dynamic memory prevents the TPM from initialising"
      ],
      correctIndex: 0,
      rationale:
        "A virtual TPM requires Generation 2 UEFI firmware. Generation 1 machines are BIOS-based and cannot have Secure Boot or a vTPM at all, and generation cannot be changed after creation — the machine has to be rebuilt.",
      examTip:
        "TPM 2.0 underpins silent BitLocker, hardware-backed Windows Hello for Business and several default compliance rules. When several unrelated things fail at once on one device, suspect the platform rather than each policy.",
      skills: []
    }
  ]
};
