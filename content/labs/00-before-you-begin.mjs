/**
 * Lab 0 — the pre-flight.
 *
 * This lab exists because of a specific failure: every download this course needs
 * was previously discovered from inside the lab that blocks on it. Someone sitting
 * down at 09:00 to start lab 2 would reach the "boot from the ISO" step and only
 * then learn they needed a 6 GB download. The same is true of the Android system
 * image in lab 13.
 *
 * Nothing here is examined. It is a checklist you run the evening before, so that
 * day one is spent administering a tenant rather than watching progress bars.
 */

export default {
  id: "before-you-begin",
  moduleId: "m0",
  title: "Before you begin: pre-flight the host and stage the downloads",
  access: "hands-on",
  difficulty: "foundational",
  estimatedMinutes: 25,
  nonExam: true,

  scenario:
    "Do this the evening before you start, not on the morning you start. The course needs roughly 7 GB of downloads and a host with virtualisation enabled, and every one of those requirements otherwise surfaces in the middle of a lab rather than before it. Twenty-five minutes here — most of it spent waiting on downloads you kick off and walk away from — is the difference between opening lab 1 and getting straight to work, and losing the first two hours of day one to a Windows 11 ISO and an Android system image.",

  objectives: [
    "Confirm the host meets the memory, disk and virtualisation requirements for three virtual machines and an emulator",
    "Enable Hyper-V, or confirm it is already enabled, before the day you need it",
    "Stage every large download the course depends on",
    "Install the PowerShell modules labs 3 and 52 require",
    "Confirm the Microsoft 365 E5 tenant is reachable and has seats"
  ],

  keyConcepts: [
    "Virtualisation firmware support",
    "Google Play system image",
    "Microsoft Graph PowerShell SDK",
    "Seat pool"
  ],

  skills: [],

  requires: {
    licenses: [],
    roles: ["Local Administrator on the Hyper-V host"],
    platforms: [{ kind: "host", id: "Windows 11 Pro host with Hyper-V" }],
    personas: [],
    labs: []
  },

  exercises: [
    {
      id: "e1",
      title: "Check the host",
      intro:
        "Three Windows virtual machines and an Android emulator are a real load. The numbers below are what the course actually needs, not a vendor minimum.",
      estimatedMinutes: 8,
      tasks: [
        {
          id: "t1",
          title: "Confirm memory, disk and processor",
          checkpoint: true,
          steps: [
            {
              text: "Compare your host against the table below. Run the pre-flight script in the [Scripts](#scripts) section at the end of this lab if you would rather read the answers than look them up.",
              parts: [
                {
                  kind: "table",
                  headers: ["Resource", "Minimum", "Comfortable", "Why"],
                  rows: [
                    ["Memory", "16 GB", "32 GB", "Each virtual machine starts at 4096 MB. At 16 GB you run one at a time and close the emulator first."],
                    ["Free disk", "150 GB", "250 GB", "Three 80 GB dynamic VHDX files grow to roughly 25 GB each once Windows is installed, plus a 6 GB ISO and the Android SDK."],
                    ["Processor", "4 cores with Intel VT-x or AMD-V", "8 or more cores", "Two virtual processors per machine. Virtualisation must be enabled in firmware, not merely supported."],
                    ["Host edition", "Windows 11 Pro", "Windows 11 Pro or Enterprise", "Hyper-V is not available on Windows 11 Home. There is no workaround."]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The three virtual machines and the Android emulator are *not* meant to run at the same time. No lab in this course needs more than two guests at once, and lab 17 needs exactly one. Starting all four on a 32 GB host will page heavily and make Autopilot look broken when it is only starved."
                }
              ]
            }
          ],
          result: {
            text: "You know whether the host can carry the lab, before you have spent an evening finding out it cannot.",
            verify: [
              { text: "Free space on the volume that will hold the virtual machines is at least 150 GB." },
              { text: "The host runs Windows 11 **Pro**, **Enterprise** or **Education**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Enable Hyper-V, or confirm it is already on",
          checkpoint: true,
          steps: [
            {
              text: "Open **Windows PowerShell** as an administrator and check the current state:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All | Select-Object FeatureName, State"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "If **State** already reads `Enabled`, you are done — skip the rest of this task and the restart with it. Hyper-V is already on for many developer machines, and lab 2 assumes you have to turn it on."
                }
              ]
            },
            {
              text: "If it reads `Disabled`, enable it and restart. Do that restart tonight rather than tomorrow.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All"
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "If `Get-ComputerInfo` reports `HyperVRequirementVirtualizationFirmwareEnabled` as `False`, virtualisation is switched off in BIOS or UEFI. Nothing in Windows will fix that — reboot into firmware settings and enable Intel VT-x or AMD-V first. This is the one item on this list that cannot be resolved from a command prompt."
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
                  text: "A switch named **Default Switch** of type **Internal** is listed. That NAT switch is all the lab virtual machines need."
                }
              ]
            }
          ],
          result: {
            text: "Hyper-V is enabled and the restart it requires is behind you.",
            verify: [
              { text: "`Get-VMSwitch` returns **Default Switch**." },
              { text: "`Get-VM` runs without error, even if it returns nothing yet." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Stage the downloads",
      intro:
        "Start these now and let them run while you do something else. Sizes are approximate and the two large ones dominate.",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Download the Windows 11 Pro installation media",
          checkpoint: true,
          steps: [
            {
              text: "Open the [Windows 11 download page](https://www.microsoft.com/software-download/windows11) and use the section titled *Download Windows 11 Disk Image (ISO) for x64 devices*. Choose the multi-edition ISO, pick your language, and save it to a short path such as `C:\\Hyper-V\\ISO\\`.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Download **Pro**, not the Enterprise evaluation, and it matters more than it looks. Lab 20 exists to watch subscription activation step a device from Pro to Enterprise on sign-in — on a device already running Enterprise there is nothing left to demonstrate. The Enterprise evaluation image also expires after 90 days, which falls inside the window you will still be using these machines."
                }
              ]
            },
            {
              text: "Note the full path to the ISO. The virtual machine build script in lab 2 needs it as its one required edit.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Download size", value: "Roughly 6 GB", note: "The single largest item on this list. Start it first." },
                    { label: "Suggested path", value: "C:\\Hyper-V\\ISO\\Windows11.iso", note: "Avoid spaces in the path — it keeps the lab 2 script simple." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "A Windows 11 Pro ISO is on disk and you know its path.",
            verify: [
              { text: "The ISO file exists and is roughly 6 GB." },
              { text: "You have written down its full path." }
            ]
          }
        },
        {
          id: "t2",
          title: "Install Android Studio and a Google Play system image",
          checkpoint: true,
          steps: [
            {
              text: "If Android Studio is not installed, get it from [developer.android.com](https://developer.android.com/studio) and run the standard setup. Roughly 1 GB."
            },
            {
              text: "Open **Device Manager** in Android Studio, choose **Create virtual device**, pick a **Pixel** hardware profile, and download an **Android 14** or later system image. Roughly 1.5 GB.",
              nav: ["Device Manager", "Create virtual device"]
            },
            {
              text: "Choose the system image carefully:",
              parts: [
                {
                  kind: "table",
                  headers: ["Image label", "Use it?", "What happens"],
                  rows: [
                    ["**Google Play**", "Yes — this is the one", "Ships the Play Store, so Company Portal installs and a work profile can be provisioned."],
                    ["Google APIs", "No", "Google services without the Play Store. Company Portal cannot be installed on the device."],
                    ["AOSP, or no label", "No", "No Google services at all. Android Enterprise enrollment is impossible."]
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Choosing the wrong image is the single most common reason the Android labs cannot be finished, and the failure appears much later — at enrollment, in lab 13 — looking like an Intune problem rather than an image problem. If you already have virtual devices from other projects, they are almost certainly *not* Google Play images. Check rather than assume."
                }
              ]
            },
            {
              text: "Start the emulator once to confirm it boots and that the **Play Store** application is present."
            }
          ],
          result: {
            text: "An Android 14 or later virtual device with Google Play is created and boots.",
            verify: [
              { text: "The emulator starts and shows a normal Android home screen." },
              { text: "The **Play Store** app is present in the app drawer." }
            ]
          }
        },
        {
          id: "t3",
          title: "Install the PowerShell modules",
          checkpoint: true,
          steps: [
            {
              text: "Install the Microsoft Graph PowerShell SDK. Lab 3 provisions all 20 personas with it, and lab 52 uses it for automation.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Install-Module Microsoft.Graph -Scope CurrentUser -Force"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "This is a large module set and takes several minutes. Installing it under `-Scope CurrentUser` avoids needing an elevated session, which is the scope every lab script assumes."
                }
              ]
            },
            {
              text: "Confirm it is available and report the version:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-Module -ListAvailable Microsoft.Graph.Authentication | Select-Object Name, Version"
                }
              ]
            }
          ],
          result: {
            text: "The Graph SDK is installed and importable.",
            verify: [
              { text: "`Microsoft.Graph.Authentication` is listed with a version of 2.0 or later." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Confirm the tenant is reachable",
      intro:
        "A two-minute check, not a configuration exercise. Lab 1 does the real work — this only proves you can sign in and that there are seats to spend, before you build anything that depends on both.",
      estimatedMinutes: 5,
      tasks: [
        {
          id: "t1",
          title: "Sign in and confirm the seat pool",
          checkpoint: true,
          steps: [
            {
              text: "Sign in to the **Microsoft 365 admin center** at `https://admin.microsoft.com` with the Global Administrator account for your trial tenant."
            },
            {
              text: "Select **Billing**, then **Your products**, and confirm there is an active **Microsoft 365 E5** subscription with its seat count.",
              nav: ["Billing", "Your products"]
            },
            {
              text: "Record your tenant prefix — the part before `.onmicrosoft.com` — and enter it in the field at the top of this page.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Setting the tenant prefix once rewrites every UPN, script and command across every lab to match your tenant. Do it now and you will never have to mentally substitute `<tenant>` while following a step."
                }
              ]
            },
            {
              text: "Confirm you can also reach the other two portals you will live in: `https://intune.microsoft.com` and `https://entra.microsoft.com`."
            }
          ],
          result: {
            text: "The tenant is reachable, has seats, and the guide is set to your tenant name.",
            verify: [
              { text: "**Your products** lists an active **Microsoft 365 E5** subscription." },
              { text: "The tenant field in the header of this page shows your prefix." },
              { text: "Both the Intune and Microsoft Entra admin centers load." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Pre-flight check: report what is ready and what is missing",
      lang: "powershell",
      note:
        "Run this in Windows PowerShell on the host, ideally **as an administrator** — the Hyper-V switch check is skipped otherwise, because an unelevated session cannot tell an absent switch from a permission error. It changes nothing: every line reads state. Anything reported as `MISSING` is work to do tonight rather than tomorrow.",
      code: `# MD-102 lab pre-flight. Read-only: this script changes nothing.
$results = [System.Collections.Generic.List[object]]::new()

function Add-Check {
    param($Item, $Found, $Wanted, $Ok)
    $results.Add([pscustomobject]@{
        Check  = $Item
        Found  = $Found
        Wanted = $Wanted
        Status = if ($Ok) { "PASS" } else { "MISSING" }
    })
}

# Several Hyper-V cmdlets require elevation. Without knowing whether we have it,
# an "access denied" is indistinguishable from "the thing is not there" — which is
# exactly the false alarm this script exists to prevent.
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$elevated = (New-Object Security.Principal.WindowsPrincipal($identity)).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator)

# --- Host resources ---------------------------------------------------------
$cs  = Get-CimInstance Win32_ComputerSystem
$os  = Get-CimInstance Win32_OperatingSystem
$ram = [math]::Round($cs.TotalPhysicalMemory / 1GB, 1)
Add-Check "Memory" "$ram GB" "16 GB min" ($ram -ge 16)

$sys  = Get-Volume -DriveLetter ($env:SystemDrive.TrimEnd(':'))
$free = [math]::Round($sys.SizeRemaining / 1GB, 1)
Add-Check "Free disk on $env:SystemDrive" "$free GB" "150 GB min" ($free -ge 150)

$cores = [int](Get-CimInstance Win32_Processor | Measure-Object -Property NumberOfCores -Sum).Sum
Add-Check "Processor cores" $cores "4 min" ($cores -ge 4)
Add-Check "Host edition" $os.Caption "Pro/Enterprise/Education" ($os.Caption -notmatch "Home")

# --- Virtualisation ---------------------------------------------------------
# InstallState: 1 = Enabled, 2 = Disabled, 3 = Absent
$hv = Get-CimInstance Win32_OptionalFeature -Filter "Name='Microsoft-Hyper-V-All'"
Add-Check "Hyper-V feature" $(if ($hv.InstallState -eq 1) { "Enabled" } else { "Not enabled" }) "Enabled" ($hv.InstallState -eq 1)

$hvModule = [bool](Get-Module -ListAvailable Hyper-V)
Add-Check "Hyper-V PowerShell module" $(if ($hvModule) { "Present" } else { "Absent" }) "Present" $hvModule

if (-not $elevated) {
    # Not a failure: just unknowable from an unelevated prompt. Reported as PASS so
    # it does not send you hunting for a switch that is probably there.
    Add-Check "Default Switch" "Not checked (needs elevation)" "Present" $true
} else {
    $switch = $null
    try { $switch = Get-VMSwitch -ErrorAction Stop | Where-Object Name -eq "Default Switch" } catch { }
    Add-Check "Default Switch" $(if ($switch) { "Present" } else { "Not found" }) "Present" ([bool]$switch)
}

# --- Tooling ----------------------------------------------------------------
$graph = Get-Module -ListAvailable Microsoft.Graph.Authentication |
         Sort-Object Version -Descending | Select-Object -First 1
Add-Check "Microsoft.Graph SDK" $(if ($graph) { $graph.Version.ToString() } else { "Absent" }) "2.0 or later" ([bool]$graph)

$sdk = Join-Path $env:LOCALAPPDATA "Android\\Sdk"
Add-Check "Android SDK" $(if (Test-Path $sdk) { "Present" } else { "Absent" }) "Present" (Test-Path $sdk)

$play = @()
$images = Join-Path $sdk "system-images"
if (Test-Path $images) {
    $play = @(Get-ChildItem $images -Recurse -Directory -ErrorAction SilentlyContinue |
              Where-Object { $_.FullName -match "google_apis_playstore" })
}
Add-Check "Android Google Play image" $(if ($play.Count) { "$($play.Count) found" } else { "None" }) "1 or more" ($play.Count -gt 0)

# --- Installation media -----------------------------------------------------
$iso = Get-ChildItem "$env:SystemDrive\\" -Filter *.iso -Recurse -Depth 3 -ErrorAction SilentlyContinue |
       Where-Object { $_.Length -gt 3GB } | Select-Object -First 1
Add-Check "Windows 11 ISO" $(if ($iso) { $iso.FullName } else { "Not found" }) "One ISO over 3 GB" ([bool]$iso)

# --- Report -----------------------------------------------------------------
$results | Format-Table -AutoSize

if (-not $elevated) {
    Write-Host "Running unelevated - Hyper-V switch state was not checked. Re-run as administrator for a complete result." -ForegroundColor DarkGray
}

$missing = @($results | Where-Object Status -eq "MISSING")
if ($missing.Count -eq 0) {
    Write-Host "Pre-flight clear. Start at lab 1." -ForegroundColor Green
} else {
    Write-Host "$($missing.Count) item(s) to resolve before lab 2:" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "  - $($_.Check): have '$($_.Found)', need $($_.Wanted)" }
}`
    }
  ],

  troubleshooting: [
    {
      symptom:
        "`Enable-WindowsOptionalFeature` succeeds and the restart completes, but `Get-VMSwitch` reports that the term is not recognised.",
      rootCause:
        "The hypervisor is installed but the Hyper-V PowerShell management module is not. `Microsoft-Hyper-V-All` normally pulls it in, but a feature enabled through a management tool or baked into an image can leave the sub-feature out.",
      diagnostic: {
        lang: "powershell",
        code: `Get-CimInstance Win32_OptionalFeature -Filter "Name LIKE 'Microsoft-Hyper-V%'" |
    Select-Object Name, InstallState`
      },
      resolution:
        "Enable the missing sub-feature directly with `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-Management-PowerShell -All`, then reopen PowerShell. An `InstallState` of `1` means enabled, `2` means disabled and `3` means absent."
    },
    {
      symptom:
        "The Android emulator boots, but there is no **Play Store** and Company Portal cannot be installed.",
      rootCause:
        "The virtual device was created from a Google APIs or AOSP system image rather than a Google Play image. The distinction is only visible at image-selection time and cannot be changed afterwards.",
      resolution:
        "Delete the virtual device and create a new one, selecting a system image explicitly labelled **Google Play**. Virtual devices created previously for application development are usually Google APIs images and will not work for the Android Enterprise labs."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You are choosing installation media for the lab virtual machines. Which should you use so that every lab in this course can be completed?",
      options: [
        "A Windows 11 Pro ISO, so subscription activation to Enterprise can be demonstrated",
        "The Windows 11 Enterprise evaluation ISO, because the labs require Enterprise features",
        "A Windows 11 Home ISO, upgraded in place later",
        "Any Windows 11 ISO — the edition has no bearing on Intune management"
      ],
      correctIndex: 0,
      rationale:
        "Subscription activation steps a Pro device up to Enterprise using the Windows 11 Enterprise E5 entitlement in Microsoft 365 E5. Starting from Enterprise leaves nothing to activate, and the evaluation image additionally expires after 90 days.",
      examTip:
        "Subscription activation needs three things and all three fail silently: the device Microsoft Entra joined, the user holding a Windows Enterprise entitlement, and ClipSVC running.",
      skills: []
    },
    {
      id: "q2",
      question:
        "You create an Android virtual device to practise Android Enterprise enrollment. Which system image must you choose?",
      options: [
        "An image labelled Google Play",
        "An image labelled Google APIs",
        "An AOSP image, because it is closest to a managed device",
        "Any image — Company Portal is sideloaded during enrollment"
      ],
      correctIndex: 0,
      rationale:
        "Only a Google Play system image includes the Play Store, and Managed Google Play is what delivers Company Portal and provisions the work profile. Google APIs images carry Google services but no store.",
      examTip:
        "Android Enterprise enrollment always depends on Managed Google Play. If a scenario removes Google Play services, work profile and fully managed enrollment are both off the table.",
      skills: []
    }
  ]
};
