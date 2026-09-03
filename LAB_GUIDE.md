<!-- GENERATED FILE — edit content/labs/*.mjs and run: npm run build -->

# MD-102 — Managing and Securing Microsoft 365 Endpoints by using Intune

Hands-on lab curriculum for the Microsoft 365 Certified: Endpoint Administrator Associate certification.

Aligned to the skills measured outline of **2026-07-24** ([source](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102)). 61 labs across 13 modules covering 83 of 83 skill bullets.

## Exam objective coverage

| Group | Weight | Skill bullets covered | Labs | Lab time |
| --- | --- | --- | --- | --- |
| Prepare infrastructure for devices | 20–25% | 18/18 | 14 | 11 h |
| Manage and maintain devices | 25–30% | 27/27 | 16 | 12 h |
| Protect devices | 15–20% | 15/15 | 11 | 8 h |
| Manage and secure applications | 15–20% | 12/12 | 7 | 6 h |
| Optimize endpoint operations by using automation, monitoring, and reporting | 10–15% | 11/11 | 7 | 5 h |

## Curriculum

**Module 0 — Build the lab environment** — Pre-flight the host, then stand up the tenant, the virtual machines and the 20 identities everything else is built on. None of this is examined; all of it is required before any other lab will work. Start with lab 0 the evening before — it stages roughly 7 GB of downloads that later labs block on.

1. [Lab 0 — Before you begin: pre-flight the host and stage the downloads](#lab-0-before-you-begin-pre-flight-the-host-and-stage-the-downloads)
2. [Lab 1 — Set up the tenant and the 20/5 licence budget](#lab-1-set-up-the-tenant-and-the-20-5-licence-budget)
3. [Lab 2 — Build the virtual machines and the Android emulator](#lab-2-build-the-virtual-machines-and-the-android-emulator)
4. [Lab 3 — Provision 20 personas and the group structure](#lab-3-provision-20-personas-and-the-group-structure)

**Module 1 — Identity and administration foundation** — Device identity in Microsoft Entra ID, the groups you will target for the rest of the course, and the delegated administration model — roles, scope tags, administrative units and multi-admin approval.

5. [Lab 4 — Break-glass access and administrator tiering](#lab-4-break-glass-access-and-administrator-tiering)
6. [Lab 5 — Device identity: registered, joined and hybrid joined](#lab-5-device-identity-registered-joined-and-hybrid-joined)
7. [Lab 6 — Device groups and dynamic membership rules](#lab-6-device-groups-and-dynamic-membership-rules)
8. [Lab 7 — Intune role-based access control and custom roles](#lab-7-intune-role-based-access-control-and-custom-roles)
9. [Lab 8 — Scope tags, administrative units and scoped administration](#lab-8-scope-tags-administrative-units-and-scoped-administration)
10. [Lab 9 — Multi-admin approval and access policies](#lab-9-multi-admin-approval-and-access-policies)

**Module 2 — Device enrollment** — Get Windows and Android devices under management: enrollment settings, automatic enrollment, restrictions and corporate identifiers, every Windows enrollment path, Android Enterprise, and what to do when enrollment fails.

11. [Lab 10 — Automatic enrollment, enrollment settings and Company Portal branding](#lab-10-automatic-enrollment-enrollment-settings-and-company-portal-branding)
12. [Lab 11 — Enrollment restrictions, device limits and corporate identifiers](#lab-11-enrollment-restrictions-device-limits-and-corporate-identifiers)
13. [Lab 12 — Every Windows enrollment path](#lab-12-every-windows-enrollment-path)
14. [Lab 13 — Android Enterprise: work profile, fully managed and dedicated](#lab-13-android-enterprise-work-profile-fully-managed-and-dedicated)
15. [Lab 14 — Apple enrollment, Apple Business Manager and OEM zero-touch](#lab-14-apple-enrollment-apple-business-manager-and-oem-zero-touch) *(walkthrough)*
16. [Lab 15 — Troubleshoot enrollment failures](#lab-15-troubleshoot-enrollment-failures)

**Module 3 — Windows client deployment** — Choose and implement a provisioning method: Autopilot deployment profiles versus device preparation policies, all deployment modes, the Enrollment Status Page, Windows 11 upgrades, and Windows Backup.

17. [Lab 16 — Choose a provisioning method: Autopilot profiles or device preparation](#lab-16-choose-a-provisioning-method-autopilot-profiles-or-device-preparation)
18. [Lab 17 — Windows Autopilot user-driven deployment](#lab-17-windows-autopilot-user-driven-deployment)
19. [Lab 18 — Autopilot pre-provisioning and self-deploying mode](#lab-18-autopilot-pre-provisioning-and-self-deploying-mode) *(walkthrough)*
20. [Lab 19 — Windows Autopilot device preparation](#lab-19-windows-autopilot-device-preparation)
21. [Lab 20 — Windows 11 edition upgrades and Windows Backup](#lab-20-windows-11-edition-upgrades-and-windows-backup)
22. [Lab 21 — Windows 365 Cloud PCs](#lab-21-windows-365-cloud-pcs) *(walkthrough)*

**Module 4 — Device configuration** — Shape the desktop with the settings catalog, ADMX imports and Group Policy analytics; target precisely with assignment filters and enrollment time grouping; then layer on certificates, Windows Hello for Business and Windows LAPS.

23. [Lab 22 — The settings catalog: profiles, assignment and conflicts](#lab-22-the-settings-catalog-profiles-assignment-and-conflicts)
24. [Lab 23 — ADMX templates and Group Policy analytics](#lab-23-admx-templates-and-group-policy-analytics)
25. [Lab 24 — Assignment filters and enrollment time grouping](#lab-24-assignment-filters-and-enrollment-time-grouping)
26. [Lab 25 — Android configuration profiles](#lab-25-android-configuration-profiles)
27. [Lab 26 — Apple and specialty device configuration profiles](#lab-26-apple-and-specialty-device-configuration-profiles) *(walkthrough)*
28. [Lab 27 — Cloud PKI, certificate profiles, Wi-Fi and VPN](#lab-27-cloud-pki-certificate-profiles-wi-fi-and-vpn)
29. [Lab 28 — Windows Hello for Business, Windows LAPS and local group membership](#lab-28-windows-hello-for-business-windows-laps-and-local-group-membership)

**Module 5 — Compliance and Conditional Access** — Define what healthy means, extend it with PowerShell where the built-in rules stop, and turn compliance into an access decision with Conditional Access.

30. [Lab 29 — Compliance policies and actions for non-compliance](#lab-29-compliance-policies-and-actions-for-non-compliance)
31. [Lab 30 — Extend compliance with PowerShell and JSON](#lab-30-extend-compliance-with-powershell-and-json)
32. [Lab 31 — Conditional Access: require a compliant device](#lab-31-conditional-access-require-a-compliant-device)

**Module 6 — Application management** — Deliver software: store and line-of-business apps, Win32 packaging with detection and dependencies, Microsoft 365 Apps, mobile app stores, then protect and configure those apps on managed and unmanaged devices.

33. [Lab 32 — Store apps, line-of-business apps and assignment intent](#lab-32-store-apps-line-of-business-apps-and-assignment-intent)
34. [Lab 33 — Win32 app packaging, detection and dependencies](#lab-33-win32-app-packaging-detection-and-dependencies)
35. [Lab 34 — Deploy and manage Microsoft 365 Apps](#lab-34-deploy-and-manage-microsoft-365-apps)
36. [Lab 35 — Mobile app stores and Quiet Time policies](#lab-35-mobile-app-stores-and-quiet-time-policies)
37. [Lab 36 — App protection policies and selective wipe](#lab-36-app-protection-policies-and-selective-wipe)
38. [Lab 37 — App configuration policies for managed devices and managed apps](#lab-37-app-configuration-policies-for-managed-devices-and-managed-apps)
39. [Lab 38 — Monitor and troubleshoot application deployment](#lab-38-monitor-and-troubleshoot-application-deployment)

**Module 7 — Protect devices** — Endpoint security in the order a real deployment applies it: baselines first, then antivirus, firewall, attack surface reduction, disk encryption, Defender for Endpoint and App Control for Business.

40. [Lab 39 — Security baselines](#lab-39-security-baselines)
41. [Lab 40 — Antivirus policies and tamper protection](#lab-40-antivirus-policies-and-tamper-protection)
42. [Lab 41 — Firewall policies and rules](#lab-41-firewall-policies-and-rules)
43. [Lab 42 — Attack surface reduction rules](#lab-42-attack-surface-reduction-rules)
44. [Lab 43 — BitLocker: silent encryption, key escrow and recovery](#lab-43-bitlocker-silent-encryption-key-escrow-and-recovery)
45. [Lab 44 — Defender for Endpoint: onboarding, EDR and device risk](#lab-44-defender-for-endpoint-onboarding-edr-and-device-risk)
46. [Lab 45 — App Control for Business](#lab-45-app-control-for-business)

**Module 8 — Device updates** — Keep the estate current: update rings and Delivery Optimization, feature and quality updates including expedited releases, Windows Autopatch and Hotpatch, cross-platform update policies, and update reporting.

47. [Lab 46 — Update rings and Delivery Optimization](#lab-46-update-rings-and-delivery-optimization)
48. [Lab 47 — Windows Autopatch, expedited updates and Hotpatch](#lab-47-windows-autopatch-expedited-updates-and-hotpatch)
49. [Lab 48 — Android update management and update reporting](#lab-48-android-update-management-and-update-reporting)
50. [Lab 49 — iOS, iPadOS and macOS update policies](#lab-49-ios-ipados-and-macos-update-policies) *(walkthrough)*

**Module 9 — Operate and troubleshoot** — The day-two job: remote and bulk actions, key and password rotation, on-demand device query with KQL, and collecting the diagnostics you need to answer a support call.

51. [Lab 50 — Remote actions, bulk actions and credential rotation](#lab-50-remote-actions-bulk-actions-and-credential-rotation)
52. [Lab 51 — Device query with KQL and diagnostics collection](#lab-51-device-query-with-kql-and-diagnostics-collection)

**Module 10 — Automation, monitoring and reporting** — The newest exam domain. Automate with the Microsoft Graph PowerShell SDK, self-heal with proactive remediations, measure with Endpoint Analytics and Intune reporting, and watch tenant health and alerts.

53. [Lab 52 — Automate Intune with the Microsoft Graph PowerShell SDK](#lab-52-automate-intune-with-the-microsoft-graph-powershell-sdk)
54. [Lab 53 — Proactive remediations: detect and fix automatically](#lab-53-proactive-remediations-detect-and-fix-automatically)
55. [Lab 54 — Endpoint Analytics: startup, reliability and user experience](#lab-54-endpoint-analytics-startup-reliability-and-user-experience)
56. [Lab 55 — Intune reporting, workbooks and data export](#lab-55-intune-reporting-workbooks-and-data-export)
57. [Lab 56 — Tenant health, service communications and alert rules](#lab-56-tenant-health-service-communications-and-alert-rules)
58. [Lab 57 — Security Copilot agents in Intune](#lab-57-security-copilot-agents-in-intune) *(walkthrough)*

**Module 11 — Advanced endpoint capabilities** — The capabilities the exam still calls Intune Suite add-ons, every one of which Microsoft 365 E5 has included since the July 2026 packaging change: Endpoint Privilege Management, Remote Help, the Enterprise App Catalog and Advanced Analytics. Each removes friction you hit earlier in the course. Cloud PKI belongs to this group too and is used in lab 27, where certificates are taught.

59. [Lab 58 — Endpoint Privilege Management](#lab-58-endpoint-privilege-management)
60. [Lab 59 — Remote Help, Enterprise App Catalog, Advanced Analytics and Tunnel for MAM](#lab-59-remote-help-enterprise-app-catalog-advanced-analytics-and-tunnel-for-mam)

**Module 12 — Capstone and exam readiness** — Rebuild the whole estate from a clean tenant against a deadline with faults injected, then close your remaining gaps with a domain-weighted timed practice run.

61. [Lab 60 — Capstone: rebuild the estate, then close your gaps](#lab-60-capstone-rebuild-the-estate-then-close-your-gaps)

# Module 0 — Build the lab environment

Pre-flight the host, then stand up the tenant, the virtual machines and the 20 identities everything else is built on. None of this is examined; all of it is required before any other lab will work. Start with lab 0 the evening before — it stages roughly 7 GB of downloads that later labs block on.

## Lab 0: Before you begin: pre-flight the host and stage the downloads

**Access:** Hands-on · **Estimated time:** 25 minutes · **Difficulty:** foundational

### Lab scenario

Do this the evening before you start, not on the morning you start. The course needs roughly 7 GB of downloads and a host with virtualisation enabled, and every one of those requirements otherwise surfaces in the middle of a lab rather than before it. Twenty-five minutes here — most of it spent waiting on downloads you kick off and walk away from — is the difference between opening lab 1 and getting straight to work, and losing the first two hours of day one to a Windows 11 ISO and an Android system image.

### Objectives

After completing this lab, you will be able to:

- Confirm the host meets the memory, disk and virtualisation requirements for three virtual machines and an emulator
- Enable Hyper-V, or confirm it is already enabled, before the day you need it
- Stage every large download the course depends on
- Install the PowerShell modules labs 3 and 52 require
- Confirm the Microsoft 365 E5 tenant is reachable and has seats

### Prerequisites

- Roles: Local Administrator on the Hyper-V host
- Devices and portals: Windows 11 Pro host with Hyper-V

### Exercise 1: Check the host

Three Windows virtual machines and an Android emulator are a real load. The numbers below are what the course actually needs, not a vendor minimum.

#### Task 1: Confirm memory, disk and processor

1. Compare your host against the table below. Run the pre-flight script in the [Scripts](#scripts) section at the end of this lab if you would rather read the answers than look them up.

   | Resource | Minimum | Comfortable | Why |
   | --- | --- | --- | --- |
   | Memory | 16 GB | 32 GB | Each virtual machine starts at 4096 MB. At 16 GB you run one at a time and close the emulator first. |
   | Free disk | 150 GB | 250 GB | Three 80 GB dynamic VHDX files grow to roughly 25 GB each once Windows is installed, plus a 6 GB ISO and the Android SDK. |
   | Processor | 4 cores with Intel VT-x or AMD-V | 8 or more cores | Two virtual processors per machine. Virtualisation must be enabled in firmware, not merely supported. |
   | Host edition | Windows 11 Pro | Windows 11 Pro or Enterprise | Hyper-V is not available on Windows 11 Home. There is no workaround. |

   > [!IMPORTANT]
   > The three virtual machines and the Android emulator are *not* meant to run at the same time. No lab in this course needs more than two guests at once, and lab 17 needs exactly one. Starting all four on a 32 GB host will page heavily and make Autopilot look broken when it is only starved.

**Results:** You know whether the host can carry the lab, before you have spent an evening finding out it cannot.

- [ ] Free space on the volume that will hold the virtual machines is at least 150 GB.
- [ ] The host runs Windows 11 **Pro**, **Enterprise** or **Education**.

#### Task 2: Enable Hyper-V, or confirm it is already on

1. Open **Windows PowerShell** as an administrator and check the current state:

   ```powershell
   Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All | Select-Object FeatureName, State
   ```

   > [!TIP]
   > If **State** already reads `Enabled`, you are done — skip the rest of this task and the restart with it. Hyper-V is already on for many developer machines, and lab 2 assumes you have to turn it on.

2. If it reads `Disabled`, enable it and restart. Do that restart tonight rather than tomorrow.

   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All
   ```

   > [!WARNING]
   > If `Get-ComputerInfo` reports `HyperVRequirementVirtualizationFirmwareEnabled` as `False`, virtualisation is switched off in BIOS or UEFI. Nothing in Windows will fix that — reboot into firmware settings and enable Intel VT-x or AMD-V first. This is the one item on this list that cannot be resolved from a command prompt.

3. After restarting, confirm the default virtual switch exists:

   ```powershell
   Get-VMSwitch | Select-Object Name, SwitchType
   ```

   **Verify:** A switch named **Default Switch** of type **Internal** is listed. That NAT switch is all the lab virtual machines need.

**Results:** Hyper-V is enabled and the restart it requires is behind you.

- [ ] `Get-VMSwitch` returns **Default Switch**.
- [ ] `Get-VM` runs without error, even if it returns nothing yet.

### Exercise 2: Stage the downloads

Start these now and let them run while you do something else. Sizes are approximate and the two large ones dominate.

#### Task 1: Download the Windows 11 Pro installation media

1. Open the [Windows 11 download page](https://www.microsoft.com/software-download/windows11) and use the section titled *Download Windows 11 Disk Image (ISO) for x64 devices*. Choose the multi-edition ISO, pick your language, and save it to a short path such as `C:\Hyper-V\ISO\`.

   > [!IMPORTANT]
   > Download **Pro**, not the Enterprise evaluation, and it matters more than it looks. Lab 20 exists to watch subscription activation step a device from Pro to Enterprise on sign-in — on a device already running Enterprise there is nothing left to demonstrate. The Enterprise evaluation image also expires after 90 days, which falls inside the window you will still be using these machines.

2. Note the full path to the ISO. The virtual machine build script in lab 2 needs it as its one required edit.

   | Setting | Value |
   | --- | --- |
   | Download size | **Roughly 6 GB** <br> The single largest item on this list. Start it first. |
   | Suggested path | **C:\Hyper-V\ISO\Windows11.iso** <br> Avoid spaces in the path — it keeps the lab 2 script simple. |

**Results:** A Windows 11 Pro ISO is on disk and you know its path.

- [ ] The ISO file exists and is roughly 6 GB.
- [ ] You have written down its full path.

#### Task 2: Install Android Studio and a Google Play system image

1. If Android Studio is not installed, get it from [developer.android.com](https://developer.android.com/studio) and run the standard setup. Roughly 1 GB.

2. Open **Device Manager** in Android Studio, choose **Create virtual device**, pick a **Pixel** hardware profile, and download an **Android 14** or later system image. Roughly 1.5 GB.
   *Path:* **Device Manager** > **Create virtual device**

3. Choose the system image carefully:

   | Image label | Use it? | What happens |
   | --- | --- | --- |
   | **Google Play** | Yes — this is the one | Ships the Play Store, so Company Portal installs and a work profile can be provisioned. |
   | Google APIs | No | Google services without the Play Store. Company Portal cannot be installed on the device. |
   | AOSP, or no label | No | No Google services at all. Android Enterprise enrollment is impossible. |

   > [!WARNING]
   > Choosing the wrong image is the single most common reason the Android labs cannot be finished, and the failure appears much later — at enrollment, in lab 13 — looking like an Intune problem rather than an image problem. If you already have virtual devices from other projects, they are almost certainly *not* Google Play images. Check rather than assume.

4. Start the emulator once to confirm it boots and that the **Play Store** application is present.

**Results:** An Android 14 or later virtual device with Google Play is created and boots.

- [ ] The emulator starts and shows a normal Android home screen.
- [ ] The **Play Store** app is present in the app drawer.

#### Task 3: Install the PowerShell modules

1. Install the Microsoft Graph PowerShell SDK. Lab 3 provisions all 20 personas with it, and lab 52 uses it for automation.

   ```powershell
   Install-Module Microsoft.Graph -Scope CurrentUser -Force
   ```

   > [!NOTE]
   > This is a large module set and takes several minutes. Installing it under `-Scope CurrentUser` avoids needing an elevated session, which is the scope every lab script assumes.

2. Confirm it is available and report the version:

   ```powershell
   Get-Module -ListAvailable Microsoft.Graph.Authentication | Select-Object Name, Version
   ```

**Results:** The Graph SDK is installed and importable.

- [ ] `Microsoft.Graph.Authentication` is listed with a version of 2.0 or later.

### Exercise 3: Confirm the tenant is reachable

A two-minute check, not a configuration exercise. Lab 1 does the real work — this only proves you can sign in and that there are seats to spend, before you build anything that depends on both.

#### Task 1: Sign in and confirm the seat pool

1. Sign in to the **Microsoft 365 admin center** at `https://admin.microsoft.com` with the Global Administrator account for your trial tenant.

2. Select **Billing**, then **Your products**, and confirm there is an active **Microsoft 365 E5** subscription with its seat count.
   *Path:* **Billing** > **Your products**

3. Record your tenant prefix — the part before `.onmicrosoft.com` — and enter it in the field at the top of this page.

   > [!TIP]
   > Setting the tenant prefix once rewrites every UPN, script and command across every lab to match your tenant. Do it now and you will never have to mentally substitute `<tenant>` while following a step.

4. Confirm you can also reach the other two portals you will live in: `https://intune.microsoft.com` and `https://entra.microsoft.com`.

**Results:** The tenant is reachable, has seats, and the guide is set to your tenant name.

- [ ] **Your products** lists an active **Microsoft 365 E5** subscription.
- [ ] The tenant field in the header of this page shows your prefix.
- [ ] Both the Intune and Microsoft Entra admin centers load.

### Scripts

#### Pre-flight check: report what is ready and what is missing

> [!NOTE]
> Run this in Windows PowerShell on the host, ideally **as an administrator** — the Hyper-V switch check is skipped otherwise, because an unelevated session cannot tell an absent switch from a permission error. It changes nothing: every line reads state. Anything reported as `MISSING` is work to do tonight rather than tomorrow.

```powershell
# MD-102 lab pre-flight. Read-only: this script changes nothing.
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

$sdk = Join-Path $env:LOCALAPPDATA "Android\Sdk"
Add-Check "Android SDK" $(if (Test-Path $sdk) { "Present" } else { "Absent" }) "Present" (Test-Path $sdk)

$play = @()
$images = Join-Path $sdk "system-images"
if (Test-Path $images) {
    $play = @(Get-ChildItem $images -Recurse -Directory -ErrorAction SilentlyContinue |
              Where-Object { $_.FullName -match "google_apis_playstore" })
}
Add-Check "Android Google Play image" $(if ($play.Count) { "$($play.Count) found" } else { "None" }) "1 or more" ($play.Count -gt 0)

# --- Installation media -----------------------------------------------------
$iso = Get-ChildItem "$env:SystemDrive\" -Filter *.iso -Recurse -Depth 3 -ErrorAction SilentlyContinue |
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
}
```

### Troubleshooting

**Symptom:** `Enable-WindowsOptionalFeature` succeeds and the restart completes, but `Get-VMSwitch` reports that the term is not recognised.

- **Root cause:** The hypervisor is installed but the Hyper-V PowerShell management module is not. `Microsoft-Hyper-V-All` normally pulls it in, but a feature enabled through a management tool or baked into an image can leave the sub-feature out.
- **Diagnostic:**

  ```powershell
  Get-CimInstance Win32_OptionalFeature -Filter "Name LIKE 'Microsoft-Hyper-V%'" |
      Select-Object Name, InstallState
  ```

- **Resolution:** Enable the missing sub-feature directly with `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-Management-PowerShell -All`, then reopen PowerShell. An `InstallState` of `1` means enabled, `2` means disabled and `3` means absent.

**Symptom:** The Android emulator boots, but there is no **Play Store** and Company Portal cannot be installed.

- **Root cause:** The virtual device was created from a Google APIs or AOSP system image rather than a Google Play image. The distinction is only visible at image-selection time and cannot be changed afterwards.
- **Resolution:** Delete the virtual device and create a new one, selecting a system image explicitly labelled **Google Play**. Virtual devices created previously for application development are usually Google APIs images and will not work for the Android Enterprise labs.

### Knowledge check

**Q1.** You are choosing installation media for the lab virtual machines. Which should you use so that every lab in this course can be completed?

A. Any Windows 11 ISO — the edition has no bearing on Intune management
B. A Windows 11 Pro ISO, so subscription activation to Enterprise can be demonstrated
C. The Windows 11 Enterprise evaluation ISO, because the labs require Enterprise features
D. A Windows 11 Home ISO, upgraded in place later

<details><summary>Answer</summary>

**B** — Subscription activation steps a Pro device up to Enterprise using the Windows 11 Enterprise E5 entitlement in Microsoft 365 E5. Starting from Enterprise leaves nothing to activate, and the evaluation image additionally expires after 90 days.

*Exam tip:* Subscription activation needs three things and all three fail silently: the device Microsoft Entra joined, the user holding a Windows Enterprise entitlement, and ClipSVC running.

</details>

**Q2.** You create an Android virtual device to practise Android Enterprise enrollment. Which system image must you choose?

A. An image labelled Google Play
B. Any image — Company Portal is sideloaded during enrollment
C. An image labelled Google APIs
D. An AOSP image, because it is closest to a managed device

<details><summary>Answer</summary>

**A** — Only a Google Play system image includes the Play Store, and Managed Google Play is what delivers Company Portal and provisions the work profile. Google APIs images carry Google services but no store.

*Exam tip:* Android Enterprise enrollment always depends on Managed Google Play. If a scenario removes Google Play services, work profile and fully managed enrollment are both off the table.

</details>

---

## Lab 1: Set up the tenant and the 20/5 licence budget

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** foundational

### Lab scenario

You are the incoming endpoint administrator at Contoso. A Microsoft 365 E5 trial has been signed up for and nothing has been done with it. Before a single device is enrolled you need to know exactly what the subscription entitles you to, how many seats you can spend, and how those seats will be assigned. Getting this wrong is the single most common way a lab tenant becomes unusable halfway through: seats run out, group-based licensing silently stops assigning, and every subsequent enrollment fails with an error that points at the device rather than the licence.

### Objectives

After completing this lab, you will be able to:

- Confirm which capabilities your Microsoft 365 E5 subscription includes and which it does not
- Read tenant status in the Microsoft Intune admin center and interpret the licence counts
- Create the group-based licensing group that every persona in this course will use
- Establish the 20 active plus 5 reserve seat budget and understand why the reserve exists
- Confirm that administrator accounts do not need to consume a licence

### Prerequisites

- Completed labs: `before-you-begin`
- Licences: M365-E5
- Roles: Global Administrator
- Devices and portals: Microsoft 365 admin center, Microsoft Intune admin center, Microsoft Entra admin center

### Exercise 1: Confirm what the subscription actually gives you

About a quarter of the MD-102 objectives cover capabilities that are *not* in Microsoft 365 E5. Knowing which is which now saves you from designing a lab around a feature you cannot switch on.

#### Task 1: Review your subscription and seat count

1. Open a browser and sign in to the **Microsoft 365 admin center** at `https://admin.microsoft.com` as your Global Administrator.

2. In the left navigation select **Billing**, then select **Your products**.
   *Path:* **Billing** > **Your products**

3. Locate your **Microsoft 365 E5** subscription and record the following:

   | Setting | Value |
   | --- | --- |
   | Licences purchased | **25** <br> A standard trial. If yours differs, use your real number as the pool and keep a 5-seat reserve. |
   | Licences assigned | **0 or 1** <br> 1 if the signup account was licensed automatically. |
   | Expires or renews on | **Record this date** |

   > [!IMPORTANT]
   > Write the expiry date somewhere you will see it. A trial that lapses mid-course takes your Conditional Access policies, compliance state and enrolled devices with it, and there is no way to get the tenant back to where it was.

4. Select the **Microsoft 365 E5** subscription to open its details, then review the list of included services.

**Results:** You know your seat pool and your expiry date.

- [ ] **Your products** lists an active **Microsoft 365 E5** subscription.
- [ ] You have recorded the total number of licences and the renewal date.

#### Task 2: Separate what is included from what is not

1. Read the table below. It is the licence boundary this entire course is built around, and several MD-102 objectives sit on the wrong side of it.

2. Included with Microsoft 365 E5 — everything here you can do hands-on:

   | Capability | Comes from | What it unlocks in this course |
   | --- | --- | --- |
   | Microsoft Intune Plan 1 | M365 E5 | Enrollment, configuration, compliance, apps, endpoint security, update rings |
   | Microsoft Intune Plan 2 | M365 E5 (since July 2026) | Tunnel for MAM, firmware over-the-air updates, specialty and shared device management |
   | Remote Help | M365 E5 (since July 2026) | Audited remote assistance with verified identity on both sides |
   | Advanced Analytics | M365 E5 (since July 2026) | Anomaly detection, device timeline, multi-device query |
   | Endpoint Privilege Management | M365 E5 (since July 2026) | Application-scoped elevation for standard users |
   | Microsoft Cloud PKI | M365 E5 (since July 2026) | A hosted certification authority — no on-premises PKI, NDES or connector |
   | Enterprise App Management | M365 E5 (since July 2026) | Prepackaged Win32 apps with supplied detection rules |
   | Microsoft Entra ID P2 | M365 E5 | Conditional Access, dynamic groups, PIM, administrative units |
   | Defender for Endpoint Plan 2 | M365 E5 | EDR, device risk feeding compliance, incident triage |
   | Windows 11 Enterprise E5 | M365 E5 | Subscription activation from Pro to Enterprise |
   | Windows Autopatch | Windows Enterprise E3 or E5 | Autopatch groups and release management |

   > [!IMPORTANT]
   > The six capabilities marked *since July 2026* used to be paid add-ons, together costing more than the Intune Suite. Microsoft moved them into Microsoft 365 E3 and E5 in a packaging change that completed on **1 August 2026**, with no customer action required. Almost every study guide, blog post and exam-prep video written before then will tell you these need the Intune Suite. They do not, and you will use all six in this course.

3. Not included — these are still examined, so this course covers them as walkthroughs rather than pretending you can run them:

   | Capability | Needs | Why it is out of reach | How this course handles it |
   | --- | --- | --- | --- |
   | Windows 365 Cloud PC | Windows 365 subscription | A separate per-user subscription; the July 2026 Intune packaging change did not touch it | Walkthrough — lab 21 |
   | Security Copilot agents in Intune | Paid E5 seats, or purchased capacity | Included with E5 since mid-2026, but as 400 SCU per month per 1,000 *paid* seats — a 25-seat trial earns no usable capacity | Walkthrough — lab 57 |
   | Apple Business Manager, VPP | Apple organisation and hardware | Needs a D-U-N-S number and hardware bought through Apple or a reseller | Walkthrough — labs 14, 26, 49 |
   | Microsoft Tunnel Gateway | A Linux host you run | The licence is included; the gateway is infrastructure you must host yourself | Configuration path only — lab 59 |

   > [!NOTE]
   > Only four things in this whole course are out of reach, and only two of them are licensing. Everything else — including every capability that used to require the Intune Suite — you will configure and use for real. That is a recent change and a genuinely large one. Note the shape of the Security Copilot row in particular: it is *licensed* to you and still not *usable* here, because the entitlement is monthly capacity scaled to paid seats rather than a per-user right. Exam questions about entitlement and questions about capacity are not the same question.

**Results:** You can state which examined capabilities you can practise and which you will study without a tenant.

- [ ] You can name the two examined capabilities that Microsoft 365 E5 genuinely does not license.

### Exercise 2: Read tenant status in the Intune admin center

#### Task 1: Inspect tenant status and the MDM authority

1. Sign in to the **Microsoft Intune admin center** at `https://intune.microsoft.com`.

2. Select **Tenant administration**, then select **Tenant status**.
   *Path:* **Tenant administration** > **Tenant status**

3. On the **Tenant details** tab, record these three values:

   | Setting | Value |
   | --- | --- |
   | MDM authority | **Microsoft Intune** |
   | Total licensed users | **Record the current number** |
   | Total Intune licenses | **Record the current number** |

   > [!NOTE]
   > In tenants created in recent years the MDM authority is already set to **Microsoft Intune** and there is nothing to configure. Older guidance tells you to set it manually; if yours already reads **Microsoft Intune**, that step is done. The exam still expects you to know the MDM authority determines which service manages enrolled devices, and that it used to be a one-way choice between Intune and Configuration Manager.

4. Select the **Connector status** tab and note which connectors are configured. All of them will be empty at this point — you will configure the Defender for Endpoint and Managed Google Play connectors in later modules.

5. Select the **Service health and message center** tab. This is where Intune service incidents and change notices appear, and it is an examined surface in the operations domain — you will come back to it in lab 55.

**Results:** You can read tenant status and know where service health and connector state live.

- [ ] **MDM authority** displays **Microsoft Intune**.
- [ ] You have recorded **Total Intune licenses** for comparison later.

### Exercise 3: Create the licensing group and turn on group-based licensing

Every persona in this course receives its Microsoft 365 E5 licence through one group. Assigning licences to users individually works for three accounts and becomes unmanageable at twenty — and group-based licensing is how it is done in production, so it is how you should learn it.

#### Task 1: Create the licensing security group

1. Sign in to the **Microsoft Entra admin center** at `https://entra.microsoft.com`.

2. Select **Groups**, then select **All groups**, then select **New group**.
   *Path:* **Groups** > **All groups** > **New group**

3. Configure the group as follows:

   | Setting | Value |
   | --- | --- |
   | Group type | **Security** |
   | Group name | **GRP-LIC-M365-E5** |
   | Group description | **Group-based licensing for Microsoft 365 E5. Membership grants a seat.** |
   | Microsoft Entra roles can be assigned to the group | **No** |
   | Membership type | **Assigned** |

   > [!IMPORTANT]
   > Use **Assigned** membership, not **Dynamic User**. A dynamic rule that accidentally matches every user in the tenant will try to assign 25 licences at once, exhaust the pool, and leave you diagnosing enrollment failures that have nothing to do with enrollment.

4. Leave **Owners** and **Members** empty for now. Lab 3 creates the personas and adds them.

   a. Select **Create**.
   b. Wait for the notification confirming the group was created.

**Results:** The licensing group exists and is empty.

- [ ] **All groups** lists `GRP-LIC-M365-E5` with a membership type of **Assigned**.
- [ ] The group has **0** members.

#### Task 2: Assign the Microsoft 365 E5 licence to the group

1. In the **Microsoft Entra admin center**, select **Billing**, then select **Licenses**, then select **All products**.
   *Path:* **Billing** > **Licenses** > **All products**

2. Select **Microsoft 365 E5**, then select **Assign**.

3. Under **Users and groups**, select `GRP-LIC-M365-E5`, then choose **Select**.

4. Select **Assignment options** and review the individual service plans. Leave every service enabled.

   > [!NOTE]
   > Assignment options are how you would grant, for example, Intune without Exchange Online. Turning services off here is a legitimate production technique and an exam-relevant one, but for this course you want the full stack enabled.

5. Select **Assign** to save the group licence assignment.

**Results:** Any account added to the group will now receive a Microsoft 365 E5 seat automatically.

- [ ] **Microsoft 365 E5** shows `GRP-LIC-M365-E5` under its licensed groups.
- [ ] The group's **License** blade shows Microsoft 365 E5 with no assignment errors.

### Exercise 4: Set the seat budget and confirm admins are free

#### Task 1: Confirm unlicensed administrator access

1. In the **Microsoft Intune admin center**, select **Tenant administration**, select **Roles**, then select **Administrator Licensing**.
   *Path:* **Tenant administration** > **Roles** > **Administrator Licensing**

2. Check whether **Allow access to unlicensed admins** is already enabled.

   | Tenant created | What you should see | Action |
   | --- | --- | --- |
   | After July 2021 | Unlicensed admin access already permitted | None. This is the default. |
   | Before July 2021 | The setting is off | Select **Yes** to enable it |

   > [!WARNING]
   > Enabling **Allow access to unlicensed admins** cannot be undone. On a lab tenant that is fine and it is what buys you back three E5 seats. Understand that it is one-way before you select **Yes**.

3. Note what this does and does not do. It removes the Intune licence requirement for administrators; it does not remove licence requirements for anything else. An admin who needs Conditional Access still needs Microsoft Entra ID P1 or P2 from somewhere.

**Results:** Administrator accounts in this course will not consume a Microsoft 365 E5 seat.

- [ ] Unlicensed admin access is permitted in **Administrator Licensing**.

#### Task 2: Commit to the 20 active plus 5 reserve budget

1. Read the budget you are about to spend. Lab 3 creates exactly these identities.

   | Category | Seats | Licensed |
   | --- | --- | --- |
   | Administrators (break-glass, Intune, Security) | 3 accounts | No — unlicensed admin access |
   | Corporate Windows personas | 6 | Yes |
   | Mobile and BYOD personas | 4 | Yes |
   | Executive and delegated-admin personas | 4 | Yes |
   | Test, pilot, shared and staging identities | 6 | Yes |
   | **Total licensed** | **20** | Yes |
   | **Safety reserve, never assigned** | **5** | No |

2. Understand why the reserve exists, because this is the failure it prevents.

   > [!IMPORTANT]
   > Group-based licensing assigns seats asynchronously. If the pool is exhausted at the moment an account lands in `GRP-LIC-M365-E5`, the assignment fails quietly — the user object looks normal, and the only symptom appears much later when that user tries to enroll a device and gets `0x80180018`. Five unassigned seats mean the pool can absorb a mistake without producing a failure that looks like something else entirely.

3. Return to **Billing**, then **Licenses** in the Microsoft 365 admin center and confirm at least 5 seats remain unassigned. You will re-check this after lab 3 creates the personas.
   *Path:* **Billing** > **Licenses**

**Results:** You have a written seat budget and understand the failure the reserve prevents.

- [ ] At least **5** Microsoft 365 E5 seats are unassigned.
- [ ] You can explain what `0x80180018` means without looking it up.

### Scripts

#### Report your licence pool and remaining seats

> [!NOTE]
> Run this before and after lab 3. If **Remaining** ever drops below 5, stop and remove an account rather than pressing on — a pool at zero produces enrollment failures that look like device problems.

```powershell
# Requires: Install-Module Microsoft.Graph -Scope CurrentUser
Connect-MgGraph -Scopes "Organization.Read.All","User.Read.All"

$skus = Get-MgSubscribedSku
foreach ($sku in $skus) {
    $total    = $sku.PrepaidUnits.Enabled
    $used     = $sku.ConsumedUnits
    $remaining = $total - $used

    [pscustomobject]@{
        Sku       = $sku.SkuPartNumber
        Total     = $total
        Assigned  = $used
        Remaining = $remaining
        Status    = if ($remaining -lt 5) { "BELOW RESERVE" } else { "OK" }
    }
}

Disconnect-MgGraph
```

### Troubleshooting

**Symptom:** A persona was added to `GRP-LIC-M365-E5` but the account still shows **Unlicensed** in the Microsoft 365 admin center hours later.

- **Root cause:** Either the licence pool was exhausted when the membership was evaluated, or the user has no **Usage location** set. Group-based licensing cannot assign a seat to an account with no usage location, and it fails without a prompt.
- **Diagnostic:**

  ```powershell
  Get-MgUser -UserId "alex.wilber@<tenant>.onmicrosoft.com" -Property UsageLocation,AssignedLicenses,LicenseAssignmentStates |
      Select-Object -ExpandProperty LicenseAssignmentStates
  ```

- **Resolution:** Set the **Usage location** on the user, then check the group's **Licenses** blade for assignment errors. The lab 3 provisioning script sets usage location on creation precisely to avoid this.
- **Error codes:** `0x80180018`

### Knowledge check

**Q1.** You assign Microsoft 365 E5 to a security group. A new user is added to the group but remains unlicensed. Every other member of the group is licensed correctly and 8 seats are free. What is the most likely cause?

A. The MDM authority has not been set to Microsoft Intune
B. The user has no usage location set
C. The group membership type is Assigned rather than Dynamic
D. The user needs to sign in once before the licence applies

<details><summary>Answer</summary>

**B** — Group-based licensing cannot assign a seat to an account with no usage location, because licence availability is determined per country. Seats being free rules out an exhausted pool, and membership type has no bearing on whether an individual member gets licensed.

*Exam tip:* When a licensing question tells you seats are available, the answer is almost always usage location or a service-plan conflict — not the pool.

</details>

**Q2.** Your tenant was created in 2024. You want your Intune administrators to manage the service without consuming Microsoft 365 E5 seats. What must you do?

A. Assign each administrator an Intune device-only licence
B. Nothing — unlicensed admin access is enabled by default for tenants created after July 2021
C. Enable Allow access to unlicensed admins under Administrator Licensing
D. Add the administrators to a group excluded from group-based licensing

<details><summary>Answer</summary>

**B** — Unlicensed admin access is on by default for tenants created after July 2021. Only older tenants need the setting enabled manually, and that change cannot be reversed.

*Exam tip:* Remember the July 2021 cutoff and that enabling the setting is one-way. Device-only licences are for unattended kiosk and dedicated devices, not for administrators.

</details>

---

## Lab 2: Build the virtual machines and the Android emulator

**Access:** Hands-on · **Estimated time:** 75 minutes · **Difficulty:** foundational

### Lab scenario

You need physical devices to manage and you are not going to buy any. Three Generation 2 Hyper-V virtual machines with virtual TPMs stand in for corporate Windows 11 desktops, and a free Android Studio emulator stands in for a field worker's phone. The virtual TPM is the part people skip and then regret: without it BitLocker cannot silently enable, Windows Hello for Business cannot store keys in hardware, and the default compliance rules fail. Every one of those failures looks like a policy mistake rather than a missing chip, and you can lose an evening to it.

### Objectives

After completing this lab, you will be able to:

- Create three Generation 2 virtual machines with a virtual TPM and Secure Boot enabled
- Explain why Generation 2 and a vTPM are prerequisites rather than preferences
- Install Windows 11 Pro and stop at the out-of-box experience without signing in
- Take the checkpoint that makes Autopilot practice repeatable
- Create an Android virtual device using a Google Play system image

### Prerequisites

- Completed labs: `tenant-and-licensing`
- Roles: Local Administrator on the Hyper-V host
- Devices and portals: Windows 11 Pro host with Hyper-V, Android Studio

### Exercise 1: Prepare the Hyper-V host

#### Task 1: Enable Hyper-V and confirm virtualisation support

1. On the host, open **Windows PowerShell** as an administrator.

   > [!TIP]
   > If you ran the pre-flight in lab 0 and it reported Hyper-V as **Enabled**, this whole exercise is already done — jump to exercise 2. Hyper-V is on by default on many developer machines, and the restart below is the slowest step in this lab.

2. Confirm the processor supports virtualisation and that it is enabled in firmware:

   ```powershell
   Get-ComputerInfo -Property "HyperV*" | Format-List
   ```

   > [!IMPORTANT]
   > If **HyperVRequirementVirtualizationFirmwareEnabled** reports `False`, virtualisation is switched off in your BIOS or UEFI firmware. No amount of configuration in Windows will fix that — reboot into firmware settings and enable Intel VT-x or AMD-V first.

3. Enable the Hyper-V role if it is not already present:

   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All
   ```

   > [!NOTE]
   > This requires a restart. Hyper-V is available on Windows 11 **Pro**, **Enterprise** and **Education** — not on Home.

4. After restarting, confirm the default virtual switch exists:

   ```powershell
   Get-VMSwitch | Select-Object Name, SwitchType
   ```

   **Verify:** A switch named **Default Switch** of type **Internal** is listed. It provides NAT-based internet access, which is all these virtual machines need.
   ```
   Name            SwitchType
   ----            ----------
   Default Switch  Internal
   ```

**Results:** Hyper-V is installed and networking is available.

- [ ] **Hyper-V Manager** opens without error.
- [ ] `Get-VMSwitch` lists **Default Switch**.

#### Task 2: Download the Windows 11 installation media

1. Download a **Windows 11 Pro** ISO from the [Windows 11 download page](https://www.microsoft.com/software-download/windows11), using the section titled *Download Windows 11 Disk Image (ISO) for x64 devices*. Choose the multi-edition ISO and select **Windows 11 Pro** during setup.

   > [!IMPORTANT]
   > Install **Pro**, not Enterprise, and treat that as a requirement rather than a preference. Lab 20 exists to watch subscription activation step a Pro device up to Enterprise on sign-in — on a device already running Enterprise there is nothing left to demonstrate.

   > [!NOTE]
   > The [Microsoft Evaluation Center](https://www.microsoft.com/evalcenter/evaluate-windows-11-enterprise) offers only a Windows 11 **Enterprise** evaluation, which is why it is not the link above. It works as a fallback if you cannot obtain Pro media, at the cost of lab 20 and of an image that expires after 90 days — inside the window you will still be using these machines.

2. Save the ISO somewhere with a short path such as `C:\Hyper-V\ISO\`, and note the full path. The script in the next exercise needs it.

**Results:** Installation media is on disk.

- [ ] The ISO file exists and you know its full path.

### Exercise 2: Create the three virtual machines

The script below is idempotent: it removes any existing lab virtual machine of the same name and its disk before recreating it. That is deliberate, so you can re-run it after a mistake without hand-cleaning Hyper-V — but it also means it *will* destroy a machine called `MD102-VM1-Adele` if you already have one you care about.

#### Task 1: Run the virtual machine build script

1. Open **Windows PowerShell** as an administrator on the host.

2. Read the script in the [Scripts](#scripts-2) section at the end of this lab, change `$IsoPath` to your ISO, then run it.

3. While it runs, understand what each setting buys you:

   | Setting | Why it is not optional |
   | --- | --- |
   | `-Generation 2` | UEFI firmware. Generation 1 is BIOS and cannot have Secure Boot or a vTPM at all. |
   | `Set-VMKeyProtector` | Creates the key protector that a virtual TPM requires. `Enable-VMTPM` fails without it. |
   | `Enable-VMTPM` | Presents a TPM 2.0 to the guest. Without it: no silent BitLocker, no hardware-backed Windows Hello, and the built-in compliance rules fail. |
   | `-EnableSecureBoot On` | Required by Windows 11, and checked by the Secure Boot compliance rule in lab 29. |
   | Dynamic memory 2–6 GB | Three virtual machines at a fixed 4 GB will exhaust a 16 GB host. Dynamic memory lets idle machines give it back. |

4. Confirm all three machines were created with a TPM:

   ```powershell
   Get-VM MD102-* | ForEach-Object {
       [pscustomobject]@{
           Name       = $_.Name
           Generation = $_.Generation
           TPM        = (Get-VMSecurity -VMName $_.Name).TpmEnabled
           SecureBoot = (Get-VMFirmware -VMName $_.Name).SecureBoot
       }
   } | Format-Table -AutoSize
   ```

   **Verify:** All three rows show **Generation 2**, **TPM True** and **SecureBoot On**.

**Results:** Three Generation 2 virtual machines exist with virtual TPMs and Secure Boot enabled.

- [ ] `MD102-VM1-Adele`, `MD102-VM2-Alex` and `MD102-VM3-Megan` appear in **Hyper-V Manager**.
- [ ] Every machine reports **TpmEnabled** as `True`.

#### Task 2: Install Windows on the first two machines

1. Start **MD102-VM1-Adele** and connect to it. Press a key when prompted to boot from the ISO.

2. Work through Windows Setup, choosing **Windows 11 Pro** if asked which edition to install.

3. At the out-of-box experience, complete the setup wizard to create a local administrator account without signing into a Microsoft account:

   a. Select your country and keyboard layout, then select **Yes**.
   b. When prompted, choose **Set up for personal use**, then select **Next**.
   c. On the Microsoft account sign-in prompt, select **Sign-in options** > **Offline account** (or if hidden, enter a bypassed email like `no@thankyou.com` with a dummy password).
   d. Enter the local username `labadmin` and your chosen password, complete the recovery questions, and select **Next** through privacy settings to reach the desktop.

   | Setting | Value |
   | --- | --- |
   | Local account name | **labadmin** |
   | Password | **Choose one and record it** <br> You will need it to sign in locally before joining the device to Microsoft Entra ID in lab 12. |

   > [!NOTE]
   > Recent Windows 11 builds hide the local-account option behind **Sign-in options**, and some builds require you to disconnect the network first. Both are fine — the goal is simply to reach a desktop that is not yet joined to anything.

4. Repeat for **MD102-VM2-Alex**.

5. On each machine, confirm the TPM is visible to Windows:

   ```powershell
   Get-Tpm | Select-Object TpmPresent, TpmReady, TpmEnabled
   ```

   **Verify:** **TpmPresent** and **TpmReady** are both `True`. If either is `False`, stop — nothing later in this course involving encryption or Windows Hello will work.
   ```
   TpmPresent TpmReady TpmEnabled
   ---------- -------- ----------
         True     True       True
   ```

**Results:** Two Windows 11 desktops are ready and unjoined.

- [ ] Both machines reach the Windows desktop with a local account.
- [ ] `Get-Tpm` reports **TpmReady** as `True` on both.

#### Task 3: Prepare the third machine for Autopilot and checkpoint it

1. Start **MD102-VM3-Megan** and boot from the ISO.

2. Work through Windows Setup until the very first out-of-box screen appears — the region selection.

   > [!CAUTION]
   > Stop here. Do **not** click through the region screen, do not connect an account, do not sign in. Autopilot takes over at this exact point, and a machine that has been through the out-of-box experience once cannot be used for Autopilot again without a reset.

3. Leave the machine sitting at that screen and, on the host, take a checkpoint:

   ```powershell
   Checkpoint-VM -Name MD102-VM3-Megan -SnapshotName "OOBE-Clean"
   ```

   > [!TIP]
   > This checkpoint is the most valuable thing in the whole lab environment. Every Autopilot exercise — user-driven, pre-provisioning, self-deploying and device preparation — starts by reverting to it. Without it, each attempt costs a full Windows reinstall.

4. Practise the revert now, so you know the command works before you need it under time pressure:

   ```powershell
   Restore-VMCheckpoint -Name "OOBE-Clean" -VMName MD102-VM3-Megan -Confirm:$false
   Start-VM -Name MD102-VM3-Megan
   ```

**Results:** The Autopilot target is parked at a clean out-of-box experience with a checkpoint you can return to.

- [ ] `Get-VMCheckpoint -VMName MD102-VM3-Megan` lists **OOBE-Clean**.
- [ ] Reverting returns the machine to the region-selection screen.

### Exercise 3: Create the Android virtual device

#### Task 1: Create an emulator with a Google Play image

1. Install **Android Studio** from [developer.android.com](https://developer.android.com/studio) and open it.

2. Open the **Device Manager**, then select **Create Virtual Device**.
   *Path:* **Tools** > **Device Manager** > **Create Virtual Device**

3. Choose a **Pixel** hardware profile, then select **Next**.

4. On the system image screen, choose an image configured as follows:

   | Setting | Value |
   | --- | --- |
   | API level | **34 or later** <br> Android 14 or newer. |
   | Target | **Google Play** <br> Not Google APIs, and not a plain AOSP image. |
   | Internal storage | **32 GB** |

   > [!WARNING]
   > The image **must** say **Google Play** in the Target column. Google APIs images have Google services but no Play Store, and Android Enterprise work profile provisioning requires the Play Store. Choosing the wrong image is the single most common reason the Android enrollment lab cannot be completed, and the failure appears much later as a Company Portal error that says nothing about system images.

5. Name the device `MD102-Android`, then select **Finish** and start the emulator.

6. In the running emulator, open the **Play Store** app and confirm it loads. You do not need to sign in yet.

   **Verify:** The Play Store opens and prompts for a Google account. If there is no Play Store app at all, you selected the wrong system image — delete the virtual device and create it again.

**Results:** An Android emulator with Google Play is running.

- [ ] The emulator boots to the Android home screen.
- [ ] The **Play Store** application is present and opens.

### Scripts

#### Create the three lab virtual machines

> [!NOTE]
> Idempotent by design — it deletes and recreates any lab machine of the same name, so re-running after a mistake is safe. It will destroy an existing machine called `MD102-VM1-Adele`, so do not run it on a host where that name means something else.

```powershell
#Requires -RunAsAdministrator
# Build the MD-102 lab virtual machines.

$Root    = "C:\Hyper-V"
$IsoPath = "C:\Hyper-V\ISO\Windows11.iso"   # <-- change this
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
    New-VM -Name $Name `
           -Generation 2 `
           -MemoryStartupBytes 4GB `
           -NewVHDPath $vhd `
           -NewVHDSizeBytes 80GB `
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
} | Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** `Enable-VMTPM` fails with a message about the key protector.

- **Root cause:** A virtual TPM stores its state in a key protector, and the machine does not have one yet. `Enable-VMTPM` does not create it for you.
- **Diagnostic:**

  ```powershell
  Get-VMKeyProtector -VMName MD102-VM1-Adele
  ```

- **Resolution:** Run `Set-VMKeyProtector -VMName <name> -NewLocalKeyProtector` first, then `Enable-VMTPM`. The order matters and is the reason the build script does them in that sequence.

**Symptom:** Windows Setup reports that the computer does not meet the system requirements for Windows 11.

- **Root cause:** The machine is Generation 1, or Secure Boot or the vTPM was not enabled. Windows 11 requires UEFI, Secure Boot and TPM 2.0.
- **Diagnostic:**

  ```powershell
  Get-VM MD102-VM1-Adele | Select-Object Generation
  Get-VMSecurity -VMName MD102-VM1-Adele | Select-Object TpmEnabled
  Get-VMFirmware -VMName MD102-VM1-Adele | Select-Object SecureBoot
  ```

- **Resolution:** Generation cannot be changed after creation — delete the machine and recreate it with `-Generation 2`. Secure Boot and the vTPM can be enabled on an existing Generation 2 machine while it is switched off.

### Knowledge check

**Q1.** You created a Hyper-V virtual machine for a Windows 11 lab, but BitLocker will not enable silently and the device reports non-compliant against a rule requiring a TPM. The machine runs Windows 11 correctly. What is the most likely cause?

A. The virtual machine has too little memory assigned
B. Secure Boot is enabled but the template is set to Microsoft Windows
C. The virtual machine is Generation 1, so it has no TPM and cannot be given one
D. Dynamic memory prevents the TPM from initialising

<details><summary>Answer</summary>

**C** — A virtual TPM requires Generation 2 UEFI firmware. Generation 1 machines are BIOS-based and cannot have Secure Boot or a vTPM at all, and generation cannot be changed after creation — the machine has to be rebuilt.

*Exam tip:* TPM 2.0 underpins silent BitLocker, hardware-backed Windows Hello for Business and several default compliance rules. When several unrelated things fail at once on one device, suspect the platform rather than each policy.

</details>

---

## Lab 3: Provision 20 personas and the group structure

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** foundational

### Lab scenario

An empty tenant teaches you nothing. Policy targeting, scope tags, Conditional Access and app protection only become real when there are people in different departments with different devices and different needs. You will create twenty identities and the group structure that carries them, using the Microsoft Graph PowerShell SDK — which is also the tool the exam expects you to reach for when the portal would take a hundred clicks.

### Objectives

After completing this lab, you will be able to:

- Connect to Microsoft Graph with the least privilege the task needs
- Create a group naming standard and the security groups the whole course targets
- Provision twenty personas with usage locations set, so group-based licensing can assign seats
- Verify licence assignment completed and the five-seat reserve survived
- Recognise why a script that swallows its own errors is worse than one that fails

### Prerequisites

- Completed labs: `tenant-and-licensing`
- Licences: M365-E5
- Roles: Global Administrator
- Devices and portals: Microsoft Entra admin center

### Exercise 1: Install and connect the Graph PowerShell SDK

#### Task 1: Install the module and sign in with scoped consent

1. On your host machine, open **Windows PowerShell** and install the SDK for your user only:

   ```powershell
   Install-Module Microsoft.Graph -Scope CurrentUser -Force
   ```

   > [!NOTE]
   > This installs a large set of sub-modules and takes several minutes. If you only want what this course needs, `Microsoft.Graph.Users`, `Microsoft.Graph.Groups`, `Microsoft.Graph.Identity.DirectoryManagement` and `Microsoft.Graph.DeviceManagement` are sufficient.

2. Connect, requesting only the permissions this lab actually uses:

   ```powershell
   Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Organization.Read.All","Directory.ReadWrite.All"
   ```

   > [!TIP]
   > Asking for exactly the scopes you need is an exam-relevant habit, not just good manners. Questions about Graph automation frequently hinge on identifying the *minimum* scope for an operation — reading devices is `DeviceManagementManagedDevices.Read.All`, acting on them is `.ReadWrite.All`.

3. Confirm the connection and the scopes that were actually granted:

   ```powershell
   Get-MgContext | Select-Object Account, TenantId, Scopes
   ```

   **Verify:** Your administrator account and tenant id are shown, and **Scopes** contains the four you requested.

**Results:** You have an authenticated Graph session with scoped consent.

- [ ] `Get-MgContext` returns your account and tenant.
- [ ] The requested scopes appear in the granted list.

### Exercise 2: Create the group structure

A naming standard is worth agreeing before you have forty groups, not after. Every group in this course follows `GRP-<purpose>-<scope>`, which makes it obvious at a glance whether a group is for licensing, users, devices or administration.

#### Task 1: Understand the naming standard

1. Read the standard. You will create these groups in the next task and target them for the rest of the course.

   | Prefix | Purpose | Membership | Examples |
   | --- | --- | --- | --- |
   | `GRP-LIC-` | Group-based licensing | Assigned | `GRP-LIC-M365-E5` |
   | `GRP-USR-` | People, by department or role | Assigned or dynamic user | `GRP-USR-FINANCE`, `GRP-USR-PILOT` |
   | `GRP-DEV-` | Devices, by platform or purpose | Dynamic device | `GRP-DEV-WIN-CORP`, `GRP-DEV-ANDROID-WP` |
   | `GRP-ADM-` | Delegated administration | Assigned | `GRP-ADM-HELPDESK` |

   > [!IMPORTANT]
   > Keep user groups and device groups strictly separate. Several Intune policy types can only be assigned to one or the other, and a group containing both silently applies to whichever half is eligible — which produces a policy that appears assigned and does nothing for half its members.

**Results:** You can predict what any group in this course is for from its name alone.

- [ ] You can state which prefix a device-targeting group uses.

#### Task 2: Create the security groups

1. Run the group provisioning script from the [Scripts](#scripts-3) section below. It creates each group only if it does not already exist, so re-running it is safe.

2. Confirm the groups were created:

   ```powershell
   Get-MgGroup -Filter "startswith(displayName,'GRP-')" -All |
       Select-Object DisplayName, @{n='Dynamic';e={$_.GroupTypes -contains 'DynamicMembership'}} |
       Sort-Object DisplayName | Format-Table -AutoSize
   ```

   **Verify:** All groups are listed, and `GRP-LIC-M365-E5` from lab 1 appears alongside the new ones.

3. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-DEV-WIN-CORP**, then select **Dynamic membership rules** to see the rule the script wrote.
   *Path:* **Groups** > **All groups** > **GRP-DEV-WIN-CORP** > **Dynamic membership rules**

   *The rule on GRP-DEV-WIN-CORP*
   ```text
   (device.deviceOSType -eq "Windows") and (device.deviceOwnership -eq "Company")
   ```

   > [!NOTE]
   > Dynamic device groups are empty until devices actually enrol, so these will stay at zero members until module 2. Rule evaluation is also not instant — allow several minutes after a device enrols before assuming a rule is wrong.

**Results:** The group structure exists, including dynamic device groups that will populate as devices enrol.

- [ ] At least twelve groups beginning `GRP-` exist.
- [ ] `GRP-DEV-WIN-CORP` shows a dynamic membership rule.

### Exercise 3: Provision the twenty personas

#### Task 1: Run the persona provisioning script

1. Read the persona script in the [Scripts](#scripts-3) section. Note two things it does that the previous version of this lab guide did not.

2. First, it sets a **usage location** on every account.

   > [!IMPORTANT]
   > Group-based licensing cannot assign a seat to an account with no usage location, because licence availability is determined per country. It fails without a prompt, the user simply stays unlicensed, and the symptom surfaces much later as enrollment error `0x80180018`. Setting it at creation removes the whole failure mode.

3. Second, it does **not** swallow errors.

   > [!WARNING]
   > A provisioning script wrapped in `try {} catch {}` with `-ErrorAction SilentlyContinue` produces identical output whether it worked or not. You then spend an hour diagnosing Intune when the truth was that eleven of twenty accounts were never created. This script reports every failure and exits non-zero if any occurred.

4. Set a password you will remember, then run the script:

   | Setting | Value |
   | --- | --- |
   | Shared lab password | **Choose a strong passphrase** <br> Every persona gets the same one. Acceptable in a disposable lab tenant and nowhere else. |
   | Usage location | **Your two-letter country code** <br> For example DE, GB or US. |

5. Watch the output. Every account should report **created** or **exists**, and the summary line at the end should report zero failures.

   **Verify:** The final line reads `23 accounts processed (3 admins, 20 personas), 0 failures`. If it does not, fix the reported errors before continuing — every later lab assumes these identities exist.

**Results:** Twenty licensed personas and three unlicensed administrators exist in the tenant.

- [ ] `Get-MgUser -All` returns your personas.
- [ ] The script reported zero failures.

#### Task 2: Confirm licensing and the reserve

1. Wait a few minutes, then check the licence pool:

   ```powershell
   Get-MgSubscribedSku |
       Where-Object { $_.SkuPartNumber -like "*ENTERPRISEPREMIUM*" -or $_.SkuPartNumber -like "*E5*" } |
       ForEach-Object {
           [pscustomobject]@{
               Sku       = $_.SkuPartNumber
               Total     = $_.PrepaidUnits.Enabled
               Assigned  = $_.ConsumedUnits
               Remaining = $_.PrepaidUnits.Enabled - $_.ConsumedUnits
           }
       } | Format-Table -AutoSize
   ```

   **Verify:** **Assigned** is 20 and **Remaining** is 5. If Remaining is below 5, you have over-provisioned — remove an account rather than pressing on.

2. Check that no individual assignment failed:

   ```powershell
   Get-MgUser -All -Property DisplayName,UserPrincipalName,UsageLocation,LicenseAssignmentStates |
       Where-Object { $_.LicenseAssignmentStates.State -eq 'Error' } |
       Select-Object DisplayName, UserPrincipalName,
           @{n='Error';e={$_.LicenseAssignmentStates.Error}}
   ```

   **Verify:** The command returns nothing. Any row here is an account that looks normal but has no licence.

3. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-LIC-M365-E5**, then select **Members** to confirm the member count.
   *Path:* **Groups** > **All groups** > **GRP-LIC-M365-E5** > **Members**

**Results:** Twenty seats are assigned through the group, five remain in reserve, and no assignment errored.

- [ ] `GRP-LIC-M365-E5` has **20** members.
- [ ] The E5 subscription shows **5** remaining seats.
- [ ] No user has a licence assignment in the **Error** state.

### Scripts

#### Create the group structure

> [!NOTE]
> Idempotent — existing groups are left alone. Run it again after adding a group to the list.

```powershell
# Requires an active Connect-MgGraph session with Group.ReadWrite.All.

$Static = @(
    @{ Name = "GRP-USR-IT";            Desc = "Information technology staff" }
    @{ Name = "GRP-USR-FINANCE";       Desc = "Finance department" }
    @{ Name = "GRP-USR-HR";            Desc = "Human resources" }
    @{ Name = "GRP-USR-SALES";         Desc = "Sales department" }
    @{ Name = "GRP-USR-ENGINEERING";   Desc = "Engineering department" }
    @{ Name = "GRP-USR-OPERATIONS";    Desc = "Operations department" }
    @{ Name = "GRP-USR-MANUFACTURING"; Desc = "Manufacturing floor staff" }
    @{ Name = "GRP-USR-RETAIL";        Desc = "Retail and shared-device staff" }
    @{ Name = "GRP-USR-FIELD";         Desc = "Field service engineers" }
    @{ Name = "GRP-USR-EXEC";          Desc = "Executive team" }
    @{ Name = "GRP-USR-APPLE";         Desc = "Users targeted by macOS and iOS policy" }
    @{ Name = "GRP-USR-BYOD";          Desc = "Personally owned device users, app protection only" }
    @{ Name = "GRP-USR-PILOT";         Desc = "Pilot ring for apps and feature updates" }
    @{ Name = "GRP-USR-BROAD";         Desc = "Broad deployment ring" }
    @{ Name = "GRP-ADM-INTUNE";        Desc = "Intune administrators" }
    @{ Name = "GRP-ADM-SECURITY";      Desc = "Security administrators" }
    @{ Name = "GRP-ADM-HELPDESK";      Desc = "Scoped help desk operators" }
    @{ Name = "GRP-ADM-SECOPS";        Desc = "Defender incident responders" }
    @{ Name = "GRP-DEV-KIOSK";         Desc = "Dedicated and kiosk devices" }
    @{ Name = "GRP-DEV-SHARED";        Desc = "Shared multi-user Windows devices" }
)

# Dynamic device groups. These stay empty until devices enrol in module 2.
$Dynamic = @(
    @{ Name = "GRP-DEV-WIN-CORP"
       Desc = "Corporate-owned Windows devices"
       Rule = '(device.deviceOSType -eq "Windows") and (device.deviceOwnership -eq "Company")' }
    @{ Name = "GRP-DEV-WIN-PERSONAL"
       Desc = "Personally owned Windows devices"
       Rule = '(device.deviceOSType -eq "Windows") and (device.deviceOwnership -eq "Personal")' }
    @{ Name = "GRP-DEV-ANDROID-WP"
       Desc = "Android Enterprise work profile devices"
       Rule = '(device.deviceOSType -eq "AndroidForWork")' }
    @{ Name = "GRP-DEV-ANDROID-FM"
       Desc = "Android Enterprise fully managed devices"
       Rule = '(device.deviceOSType -eq "AndroidEnterprise")' }
    @{ Name = "GRP-DEV-AUTOPILOT"
       Desc = "Devices registered with Windows Autopilot"
       Rule = '(device.devicePhysicalIds -any (_ -startsWith "[ZTDId]"))' }
)

foreach ($g in $Static) {
    if (Get-MgGroup -Filter "displayName eq '$($g.Name)'" -ErrorAction SilentlyContinue) {
        Write-Host "exists  $($g.Name)" -ForegroundColor DarkGray
        continue
    }
    New-MgGroup -DisplayName $g.Name `
                -Description $g.Desc `
                -MailEnabled:$false `
                -MailNickname ($g.Name -replace '[^a-zA-Z0-9]','') `
                -SecurityEnabled:$true | Out-Null
    Write-Host "created $($g.Name)" -ForegroundColor Green
}

foreach ($g in $Dynamic) {
    if (Get-MgGroup -Filter "displayName eq '$($g.Name)'" -ErrorAction SilentlyContinue) {
        Write-Host "exists  $($g.Name)" -ForegroundColor DarkGray
        continue
    }
    New-MgGroup -DisplayName $g.Name `
                -Description $g.Desc `
                -MailEnabled:$false `
                -MailNickname ($g.Name -replace '[^a-zA-Z0-9]','') `
                -SecurityEnabled:$true `
                -GroupTypes "DynamicMembership" `
                -MembershipRule $g.Rule `
                -MembershipRuleProcessingState "On" | Out-Null
    Write-Host "created $($g.Name) (dynamic)" -ForegroundColor Green
}
```

#### Provision the twenty personas

> [!NOTE]
> Checks that every group it will need exists before it creates anything, sets a usage location on every account, reports every failure, and exits non-zero if anything went wrong. Change `$UsageLocation` and `$Password` before running.

```powershell
# Requires an active Connect-MgGraph session with User.ReadWrite.All and Group.ReadWrite.All.

$Domain        = "<tenant>.onmicrosoft.com"
$UsageLocation = "DE"                          # <-- your two-letter country code
$Password      = "ChangeMeToAPassphrase!2026"  # <-- change this

# Administrators are NOT licensed: unlicensed admin access is enabled by default
# on tenants created after July 2021, which is what buys us 20 end-user seats.
# Every admin carries the same keys as a persona, including an empty Groups list.
# A missing key is $null rather than a helpful error, and $null is what turned
# "create three administrators" into three different failures further down.
$Admins = @(
    @{ First="Break-glass"; Last="Emergency Access"; Alias="admin-breakglass"; Dept="IT"; Groups=@() }
    @{ First="Intune";      Last="Administrator";    Alias="admin-intune";    Dept="IT"; Groups=@("GRP-ADM-INTUNE") }
    @{ First="Security";    Last="Administrator";    Alias="admin-security";  Dept="IT"; Groups=@("GRP-ADM-SECURITY") }
)

$Personas = @(
    @{ First="Adele";     Last="Vance";     Alias="adele.vance";       Dept="IT";            Groups=@("GRP-USR-IT","GRP-USR-PILOT") }
    @{ First="Alex";      Last="Wilber";    Alias="alex.wilber";       Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Megan";     Last="Bowen";     Alias="megan.bowen";       Dept="HR";            Groups=@("GRP-USR-HR") }
    @{ First="Joni";      Last="Sherman";   Alias="joni.sherman";      Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Diego";     Last="Siciliani"; Alias="diego.siciliani";   Dept="Field";         Groups=@("GRP-USR-FIELD") }
    @{ First="Lee";       Last="Gu";        Alias="lee.gu";            Dept="Manufacturing"; Groups=@("GRP-USR-MANUFACTURING") }
    @{ First="Miriam";    Last="Graham";    Alias="miriam.graham";     Dept="Executive";     Groups=@("GRP-USR-EXEC","GRP-USR-APPLE") }
    @{ First="Patti";     Last="Fernandez"; Alias="patti.fernandez";   Dept="Executive";     Groups=@("GRP-USR-EXEC") }
    @{ First="Pradeep";   Last="Gupta";     Alias="pradeep.gupta";     Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING","GRP-USR-PILOT") }
    @{ First="Johanna";   Last="Lorenz";    Alias="johanna.lorenz";    Dept="Engineering";   Groups=@("GRP-USR-ENGINEERING") }
    @{ First="Isaiah";    Last="Langer";    Alias="isaiah.langer";     Dept="Sales";         Groups=@("GRP-USR-SALES","GRP-USR-BYOD") }
    @{ First="Nestor";    Last="Wilke";     Alias="nestor.wilke";      Dept="Operations";    Groups=@("GRP-USR-OPERATIONS","GRP-USR-BROAD") }
    @{ First="Henrietta"; Last="Mueller";   Alias="henrietta.mueller"; Dept="Finance";       Groups=@("GRP-USR-FINANCE") }
    @{ First="Lynne";     Last="Robbins";   Alias="lynne.robbins";     Dept="Retail";        Groups=@("GRP-USR-RETAIL","GRP-DEV-SHARED") }
    @{ First="Help Desk"; Last="Operator";  Alias="helpdesk.operator"; Dept="IT";            Groups=@("GRP-ADM-HELPDESK") }
    @{ First="Security";  Last="Operator";  Alias="security.operator"; Dept="IT";            Groups=@("GRP-ADM-SECOPS") }
    @{ First="Pilot";     Last="User 01";   Alias="pilot.user01";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Pilot";     Last="User 02";   Alias="pilot.user02";      Dept="Test";          Groups=@("GRP-USR-PILOT") }
    @{ First="Kiosk";     Last="Device";    Alias="kiosk.device";      Dept="Retail";        Groups=@("GRP-DEV-KIOSK") }
    @{ First="Staging";   Last="User 01";   Alias="staging.user01";    Dept="Test";          Groups=@() }
)

# Not $profile: that is an automatic variable holding the path to your PowerShell
# profile script, and assigning to it in a console session silently replaces it.
$PwdProfile = @{ Password = $Password; ForceChangePasswordNextSignIn = $false }
$failures = 0

function Resolve-LabGroup {
    param([string]$Name)
    $group = Get-MgGroup -Filter "displayName eq '$Name'" -ErrorAction Stop
    if (-not $group) {
        throw "Group '$Name' does not exist. Run the group script above; GRP-LIC-M365-E5 comes from lab 1."
    }
    return $group
}

function New-LabUser {
    param($Person, [bool]$Licensed)

    $upn = "$($Person.Alias)@$Domain"

    $user = Get-MgUser -Filter "userPrincipalName eq '$upn'" -ErrorAction SilentlyContinue

    if ($user) {
        Write-Host "exists  $upn" -ForegroundColor DarkGray
    }
    else {
        # Splatted rather than a run of -Parameter arguments, so that a property
        # the record does not have is an omitted property and not an empty one:
        # $Person.Dept on a record without that key is $null, -Department $null
        # binds to "", and the account is created with a blank department.
        $params = @{
            DisplayName       = "$($Person.First) $($Person.Last)"
            GivenName         = $Person.First
            Surname           = $Person.Last
            UserPrincipalName = $upn
            MailNickname      = $Person.Alias
            UsageLocation     = $UsageLocation
            AccountEnabled    = $true
            PasswordProfile   = $PwdProfile
            ErrorAction       = "Stop"   # no SilentlyContinue: see the note above
        }
        if ($Person.Dept) { $params.Department = $Person.Dept }

        # Keep what Graph returns. Re-reading the account by UPN races directory
        # replication, and a lost race hands the group loop an empty user id.
        $user = New-MgUser @params
        Write-Host "created $upn" -ForegroundColor Green
    }

    # @($null) is an array containing one null, not an empty array. Filtering
    # first is what stops an account with no groups looking one up by no name.
    $groups = @($Person.Groups | Where-Object { $_ })
    if ($Licensed) { $groups += "GRP-LIC-M365-E5" }

    foreach ($name in $groups) {
        $group = Resolve-LabGroup -Name $name

        $already = Get-MgGroupMember -GroupId $group.Id -All |
                   Where-Object Id -eq $user.Id
        if (-not $already) {
            New-MgGroupMember -GroupId $group.Id -DirectoryObjectId $user.Id -ErrorAction Stop
            Write-Host "        + $name" -ForegroundColor DarkCyan
        }
    }
}

# Check every group this run will need before creating a single account. Twenty
# identical "group does not exist" errors halfway through a run is a far worse
# diagnostic than one line naming what is missing before anything has changed.
$needed = @($Admins + $Personas | ForEach-Object { $_.Groups }) + "GRP-LIC-M365-E5"
$missing = @(
    $needed | Where-Object { $_ } | Sort-Object -Unique |
        Where-Object { -not (Get-MgGroup -Filter "displayName eq '$_'" -ErrorAction SilentlyContinue) }
)
if ($missing) {
    Write-Host "Missing groups: $($missing -join ', ')" -ForegroundColor Red
    throw "Create the groups first: the group script above, and lab 1 for GRP-LIC-M365-E5."
}

foreach ($p in $Admins) {
    try { New-LabUser -Person $p -Licensed $false }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

foreach ($p in $Personas) {
    try { New-LabUser -Person $p -Licensed $true }
    catch { $failures++; Write-Host "FAILED  $($p.Alias): $_" -ForegroundColor Red }
}

$total  = $Admins.Count + $Personas.Count
$colour = if ($failures) { "Red" } else { "Green" }

Write-Host ""
Write-Host "$total accounts processed ($($Admins.Count) admins, $($Personas.Count) personas), $failures failures" -ForegroundColor $colour
if ($failures) { exit 1 }
```

### Troubleshooting

**Symptom:** Accounts are created but every one of them remains unlicensed.

- **Root cause:** Either the accounts have no usage location, or `GRP-LIC-M365-E5` never had the Microsoft 365 E5 licence assigned to it in lab 1. Group-based licensing needs both.
- **Diagnostic:**

  ```powershell
  Get-MgUser -All -Property DisplayName,UsageLocation |
      Where-Object { -not $_.UsageLocation } |
      Select-Object DisplayName
  ```

- **Resolution:** Set the usage location on the affected accounts, then confirm the group itself carries the licence under **Billing** > **Licenses** > **Microsoft 365 E5**. Membership alone assigns nothing if the group has no product on it.
- **Error codes:** `0x80180018`

**Symptom:** `New-MgGroupMember` fails with a permission error even though you are a Global Administrator.

- **Root cause:** The Graph session was established with narrower scopes than the operation requires. Directory role membership and consented scopes are different things — being Global Administrator does not grant a token permissions it did not ask for.
- **Diagnostic:**

  ```powershell
  (Get-MgContext).Scopes -join "`n"
  ```

- **Resolution:** Reconnect with the scopes you need: `Connect-MgGraph -Scopes "Group.ReadWrite.All","User.ReadWrite.All"`. Existing sessions are not upgraded automatically.

### Knowledge check

**Q1.** A script creates twenty users and adds them to a group that has Microsoft 365 E5 assigned. All twenty appear in the group, ten receive licences and ten do not. Sixty seats are available. What should you check first?

A. Whether the ten accounts have signed in at least once
B. Whether the group membership type is dynamic
C. Whether the ten unlicensed accounts have a usage location set
D. Whether the tenant MDM authority is set to Intune

<details><summary>Answer</summary>

**C** — Licence availability is determined per country, so an account with no usage location cannot be assigned a seat. The assignment fails without an error on the user object, which is why a partial failure like this points straight at usage location once you know the pool is not exhausted.

*Exam tip:* Group-based licensing has exactly three common failure causes: no usage location, an exhausted pool, and a service-plan conflict with another licence. Rule them out in that order.

</details>

**Q2.** You are connected to Microsoft Graph as a Global Administrator with the scope `User.Read.All`. You attempt to create a group and receive an authorisation error. What is the cause?

A. Global Administrator cannot create groups without Privileged Identity Management activation
B. The access token was not granted the scopes needed for the operation
C. The Microsoft.Graph.Groups sub-module is not installed
D. Group creation requires the beta Graph endpoint

<details><summary>Answer</summary>

**B** — Directory role membership and token scopes are separate. A token issued for `User.Read.All` carries only that permission regardless of how privileged the signed-in account is, so the call is rejected before any role check happens.

*Exam tip:* For any Graph automation question, ask what the token was granted rather than who the user is. Reconnecting with additional scopes is the fix.

</details>

---

# Module 1 — Identity and administration foundation

Device identity in Microsoft Entra ID, the groups you will target for the rest of the course, and the delegated administration model — roles, scope tags, administrative units and multi-admin approval.

## Lab 4: Break-glass access and administrator tiering

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

In lab 31 you will build a Conditional Access policy that requires a compliant device. If you get it slightly wrong — and almost everyone does the first time — you lock every administrator, including yourself, out of a tenant you cannot then fix. The break-glass account is the reason that is an inconvenience rather than the end of your lab. Build it now, before you build anything that can lock you out, and separate your day-to-day administration from the Global Administrator role while you are here.

### Objectives

After completing this lab, you will be able to:

- Create a cloud-only emergency access account that survives a Conditional Access mistake
- Explain why a break-glass account is excluded from policy rather than exempted by role
- Assign the Intune Administrator and Security Administrator roles to separate accounts
- Set up an alert so use of the emergency account is never silent

### Prerequisites

- Completed labs: `personas-and-groups`
- Licences: M365-E5, ENTRA-P2
- Roles: Global Administrator
- Devices and portals: Microsoft Entra admin center
- Personas: admin-breakglass, admin-intune, admin-security

### Exercise 1: Harden the emergency access account

The account already exists from lab 3. What matters now is the properties that make it survive an outage of your own making.

#### Task 1: Assign Global Administrator permanently

1. Sign in to the **Microsoft Entra admin center** at `https://entra.microsoft.com`.

2. Select **Roles and admins**, then select **Roles and admins** again, then select **Global Administrator**.
   *Path:* **Roles and admins** > **Roles and admins** > **Global Administrator**

3. Select **Add assignments**, choose `admin-breakglass@<tenant>.onmicrosoft.com`, then select **Next**.

4. Configure the assignment:

   | Setting | Value |
   | --- | --- |
   | Assignment type | **Active** |
   | Permanently assigned | **Selected** |
   | Justification | **Emergency access account** |

   > [!IMPORTANT]
   > This is the one account that must **not** use Privileged Identity Management eligibility. If activation requires multi-factor authentication and the thing that is broken is your Conditional Access or MFA configuration, an eligible-only account cannot be activated — which is precisely the situation it exists for.

5. Select **Assign**.

**Results:** The emergency account holds Global Administrator permanently and unconditionally.

- [ ] **Global Administrator** lists `admin-breakglass` with an assignment type of **Active**.

#### Task 2: Record the credentials properly

1. Reset the account's password to a long random passphrase — at least 32 characters.

2. Store it somewhere that does not depend on this tenant.

   > [!CAUTION]
   > Storing the break-glass password in a OneDrive document or a Teams message inside the tenant it unlocks is a circular dependency. In production this is a sealed envelope in a safe. For this lab, a password manager or an offline note is fine — just not inside the tenant.

3. Confirm the account is cloud-only and has no manager, no licence and no group memberships beyond what lab 3 created.

   ```powershell
   Get-MgUser -UserId "admin-breakglass@<tenant>.onmicrosoft.com" `
       -Property DisplayName,OnPremisesSyncEnabled,AssignedLicenses,AccountEnabled |
       Select-Object DisplayName, OnPremisesSyncEnabled, AccountEnabled,
           @{n='Licences';e={$_.AssignedLicenses.Count}}
   ```

   **Verify:** **OnPremisesSyncEnabled** is empty or `False`, **AccountEnabled** is `True`, and **Licences** is `0`. An emergency account that depends on directory synchronisation fails exactly when synchronisation does.

**Results:** The emergency account is cloud-only, unlicensed, enabled and its password is stored outside the tenant.

- [ ] You can state where the password is without opening anything in this tenant.

### Exercise 2: Separate administrative duties

#### Task 1: Assign scoped administrator roles

1. In **Roles and admins**, assign each account the narrowest role that does its job:

   | Account | Entra role | Why not Global Administrator |
   | --- | --- | --- |
   | `admin-intune` | Intune Administrator | Full Intune control without the ability to change identity, billing or other administrators |
   | `admin-security` | Security Administrator | Defender, security baselines and incident response without device configuration rights |
   | `admin-breakglass` | Global Administrator | The only account that needs everything, used only when something is broken |

2. Select **Roles and admins**, then select **Roles and admins** again, then select **Intune Administrator**. Search the list rather than scrolling it — Entra ships well over a hundred roles.
   *Path:* **Roles and admins** > **Roles and admins** > **Intune Administrator**

3. Select **Add assignments**, choose `admin-intune@<tenant>.onmicrosoft.com`, then select **Next**.

   > [!NOTE]
   > Leave **Scope type** at **Directory**. Scoping the assignment to an administrative unit restricts it to that unit's members, which lets the device blades open normally while tenant-wide work — creating a custom Intune role, for instance — is refused. That is a genuinely difficult failure to diagnose three labs later.

4. Configure the assignment:

   | Setting | Value |
   | --- | --- |
   | Assignment type | **Active** |
   | Permanently assigned | **Selected** |
   | Justification | **Day-to-day Intune administration** |

   > [!IMPORTANT]
   > **Active** is the setting to get right. Microsoft 365 E5 includes Entra ID P2, so this blade also offers **Eligible**, and it is easy to accept without reading. An eligible assignment grants nothing until it is activated through Privileged Identity Management: the account signs in, looks like an administrator, and is then refused on real work with a bare **401 — No access**. That reads as a broken tenant rather than an unactivated role.

5. Select **Assign**, then repeat the same flow for `admin-security@<tenant>.onmicrosoft.com` against the **Security Administrator** role.

6. Confirm both assignments before moving on.

   **Verify:** **Intune Administrator** > **Assignments** lists `admin-intune` with an assignment type of **Active** and a scope of **Directory**. **Security Administrator** lists `admin-security` the same way.

7. Sign out and sign back in as `admin-intune@<tenant>.onmicrosoft.com`, then open the **Microsoft Intune admin center**.

   > [!WARNING]
   > Signing out matters. A role assignment is written into the access token at sign-in, so a session that was already open when you made the assignment carries a token that does not contain the role. Closing the tab is not enough — sign out properly, or open a fresh private window.

   **Verify:** You can open **Devices**, **Apps** and **Endpoint security**. Attempting to open **Billing** in the Microsoft 365 admin center is denied — which is the separation working.

   > [!TIP]
   > Use `admin-intune` for the rest of this course. Working as Global Administrator by default hides permission problems until they appear somewhere much more expensive.

**Results:** Day-to-day work happens under a role that cannot change identity or billing.

- [ ] **Intune Administrator** > **Assignments** shows `admin-intune` as **Active**, scoped to **Directory**.
- [ ] `admin-intune` can manage Intune but cannot manage subscriptions.
- [ ] `admin-security` can open **Endpoint security** and the Defender portal.

### Exercise 3: Make emergency access visible

#### Task 1: Alert on break-glass sign-in

1. An emergency account that can be used without anyone noticing is a back door. Confirm you can see its sign-ins.

2. In the **Microsoft Entra admin center**, select **Identity**, then under **Monitoring and health** select **Sign-in logs**.
   *Path:* **Identity** > **Monitoring and health** > **Sign-in logs**

3. Add a filter on **User** for `admin-breakglass` and confirm the sign-in you performed earlier appears.

4. Note where the production answer lives, even though this lab stops short of building it:

   > [!NOTE]
   > In production you would stream sign-in logs to a Log Analytics workspace and raise an alert rule on any successful authentication by the emergency account. That needs an Azure subscription, which this lab does not assume. Lab 56 covers the alerting surfaces that *are* available in Intune itself.

**Results:** Emergency account activity is discoverable in the sign-in logs.

- [ ] Filtering **Sign-in logs** by the break-glass account returns your test sign-in.

### Scripts

#### Audit privileged role assignments

> [!NOTE]
> Run this occasionally. Privileged role membership that grows quietly is how a tiering model stops meaning anything.

```powershell
Connect-MgGraph -Scopes "RoleManagement.Read.Directory","User.Read.All"

$roles = Get-MgRoleManagementDirectoryRoleDefinition -All |
         Where-Object { $_.DisplayName -in @(
             "Global Administrator",
             "Intune Administrator",
             "Security Administrator",
             "Privileged Role Administrator"
         )}

# Collected into a variable first: foreach is a statement, and a statement
# cannot be piped. "foreach (...) { } | Sort-Object" is a parse error.
$rows = foreach ($role in $roles) {
    $assignments = Get-MgRoleManagementDirectoryRoleAssignment `
        -Filter "roleDefinitionId eq '$($role.Id)'" -All

    foreach ($a in $assignments) {
        $principal = Get-MgDirectoryObject -DirectoryObjectId $a.PrincipalId -ErrorAction SilentlyContinue
        [pscustomobject]@{
            Role      = $role.DisplayName
            Principal = $principal.AdditionalProperties.displayName
            UPN       = $principal.AdditionalProperties.userPrincipalName
        }
    }
}

$rows | Sort-Object Role, Principal | Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** Every administrator, including you, is locked out of the tenant after a Conditional Access change.

- **Root cause:** A policy targeting All users with a grant control nobody can satisfy — most often requiring a compliant or hybrid-joined device when no device is yet compliant.
- **Diagnostic:**

  ```text
  Sign in as the break-glass account.
  Entra admin center > Protection > Conditional Access > Policies
  Open the offending policy and check Assignments > Users > Exclude.
  ```

- **Resolution:** Sign in with the emergency account, set the policy to **Report-only**, then fix the assignment and exclude the emergency account before re-enabling. Every Conditional Access policy you create in lab 31 excludes this account for exactly this reason.

**Symptom:** `admin-intune` signs in and can browse the Intune admin center, but an administrative action such as creating a custom role fails with **401 — No access**.

- **Root cause:** The Intune Administrator role is not in effect on that session. Either the assignment is **Eligible** rather than **Active** and has never been activated in Privileged Identity Management, or it is scoped to an administrative unit instead of the directory, or the browser session predates the assignment and holds a token issued without the role.
- **Diagnostic:**

  ```text
  Signed in as admin-intune:
  Intune admin center > Tenant administration > Roles > My permissions
    A sparse or empty list means the directory role is not on this token.

  Entra admin center > Users > admin-intune > Assigned roles
    Check: Intune Administrator, state Active (not Eligible), scope Directory (not an administrative unit).
  ```

- **Resolution:** Re-assign as **Active** with scope **Directory**, or activate the eligible assignment through **Identity governance** > **Privileged Identity Management**. Then sign out fully and sign back in — an existing session keeps its original token and will keep failing until it is replaced.

### Knowledge check

**Q1.** Which configuration is correct for an emergency access account intended to survive a Conditional Access misconfiguration?

A. Synchronised from on-premises Active Directory with a permanently assigned Global Administrator role
B. Cloud-only and eligible for Global Administrator through Privileged Identity Management, activated with MFA
C. Cloud-only with Global Administrator, included in Conditional Access but exempt from MFA
D. Cloud-only, permanently assigned Global Administrator, and excluded from all Conditional Access policies

<details><summary>Answer</summary>

**D** — The account must not depend on anything that can break. Directory synchronisation adds an on-premises dependency, and PIM eligibility requires an activation flow that can itself be blocked by the misconfiguration you are trying to fix. Permanent assignment plus explicit Conditional Access exclusion is the supported pattern.

*Exam tip:* Exclusion from a policy and exemption within it are not the same. Only exclusion guarantees the policy is never evaluated for that account.

</details>

---

## Lab 5: Device identity: registered, joined and hybrid joined

**Access:** Hands-on · **Estimated time:** 55 minutes · **Difficulty:** intermediate

### Lab scenario

Every question the exam asks about enrollment, Conditional Access or compliance rests on one thing: what kind of identity the device has in Microsoft Entra ID. Registered, joined and hybrid joined are not three grades of the same thing — they are three different trust relationships with different sign-in behaviour, different Conditional Access outcomes and different management stories. You will create two of them on real machines, read the evidence with `dsregcmd`, and understand the third well enough to choose it correctly.

### Objectives

After completing this lab, you will be able to:

- Choose the correct join type for a given ownership and management requirement
- Register a device to Microsoft Entra ID and inspect the resulting identity
- Join a device to Microsoft Entra ID and compare the two states
- Read and interpret every meaningful field of `dsregcmd /status`
- Explain what a Primary Refresh Token is and why its absence breaks single sign-on

### Exam objectives covered

- `g1.t1.s1` — Choose an appropriate device join type, including considerations such as device registration and Microsoft Entra join
- `g1.t1.s2` — Join devices to Microsoft Entra ID
- `g1.t1.s3` — Register devices to Microsoft Entra ID

### Prerequisites

- Completed labs: `personas-and-groups`, `breakglass-and-admin-tiering`
- Licences: M365-E5, ENTRA-P2
- Roles: Intune Administrator
- Devices and portals: vm1-adele (Windows 11 Pro), vm2-alex (Windows 11 Pro), Microsoft Entra admin center
- Personas: adele.vance, joni.sherman

### Exercise 1: Choose the right join type

Get this decision straight before touching a machine. The exam tests it as a scenario question far more often than it tests the click path.

#### Task 1: Compare the three join types

1. Study the comparison. The column that decides most exam questions is *who owns the device*.

   |  | Entra registered | Entra joined | Hybrid Entra joined |
   | --- | --- | --- | --- |
   | Ownership | Personal (BYOD) | Corporate | Corporate |
   | Sign-in to Windows | Local or Microsoft account | Work account | On-premises Active Directory account |
   | Also joined to on-premises AD | No | No | Yes |
   | Requires line of sight to a domain controller | No | No | Yes |
   | Typical management | App protection policies, optional MDM | Intune MDM | Intune, often co-managed with Configuration Manager |
   | Device object in Entra ID | Yes | Yes | Yes |
   | Can satisfy a require-compliant-device control | Yes, if enrolled and compliant | Yes | Yes |
   | Set up by | Add work or school account | Out-of-box experience, or Settings | Entra Connect plus Group Policy or Autopilot |

   > [!IMPORTANT]
   > Hybrid join exists to serve devices that must remain domain-joined — usually because of on-premises resource access or legacy Group Policy. It is not a stepping stone and it is not better than Entra join. For a cloud-native deployment, Entra join is the target and hybrid join is a compromise you accept only when something forces it.

2. Answer these three before continuing. The reasoning matters more than the answer.

   | Requirement | Correct join type |
   | --- | --- |
   | A new corporate laptop, cloud-only, managed by Intune | Entra joined |
   | An employee's own Windows PC that must reach corporate mail with data protection | Entra registered |
   | A desktop that must authenticate to an on-premises file server using Kerberos | Hybrid Entra joined |

   > [!NOTE]
   > Hybrid Entra join cannot be practised in this lab — it needs an on-premises Active Directory domain and Microsoft Entra Connect. Know its prerequisites and its `dsregcmd` signature, which you will see in the next exercise.

**Results:** You can pick a join type from a requirement without guessing.

- [ ] You can state the one thing that forces hybrid join rather than Entra join.

### Exercise 2: Register a device to Microsoft Entra ID

Registration is the bring-your-own-device path. The user keeps their local sign-in and the organisation gains an identity for the device without owning it.

#### Task 1: Add a work account on VM1

1. Start **MD102-VM1-Adele** and sign in with the local `labadmin` account.

2. Before doing anything, capture the unregistered baseline. Open **Windows PowerShell** and run:

   ```powershell
   dsregcmd /status
   ```

   **Verify:** Under **Device State**, all three of **AzureAdJoined**, **EnterpriseJoined** and **DomainJoined** read `NO`. This is what an unaffiliated machine looks like.
   ```
   +----------------------------------------------------------------------+
   | Device State                                                         |
   +----------------------------------------------------------------------+

                AzureAdJoined : NO
             EnterpriseJoined : NO
                 DomainJoined : NO
   ```

3. Open **Settings**, select **Accounts**, then select **Your accounts**.
   *Path:* **Settings** > **Accounts** > **Your accounts**

4. On the **Your accounts** page, select **Add a work or school account**.

   > [!NOTE]
   > On older Windows 11 builds this page is called **Email and accounts**, and the button sits under **Accounts used by other apps**. Same action, older label.

5. Sign in as `joni.sherman@<tenant>.onmicrosoft.com` and complete the prompts.

   > [!CAUTION]
   > Use **Add a work or school account** here, not **Access work or school** > **Connect** > **Join this device to Microsoft Entra ID**. The first registers; the second joins. Choosing the wrong one is the most common way this exercise goes sideways, and the difference only becomes visible in `dsregcmd`.

**Results:** The device is registered to Microsoft Entra ID while remaining under local control.

- [ ] The work account appears under **Your accounts**.

#### Task 2: Read the registered state

1. On **MD102-VM1-Adele**, run `dsregcmd /status` in PowerShell again and compare it with the baseline.

   ```powershell
   dsregcmd /status
   ```

2. Find the fields that changed:

   | Field | Value now | What it means |
   | --- | --- | --- |
   | `AzureAdJoined` | NO | The device is not joined — registration is a different relationship |
   | `WorkplaceJoined` | YES | This is the field that proves registration |
   | `DomainJoined` | NO | No on-premises domain |
   | `WorkplaceDeviceId` | a GUID | The device object in Entra ID |

   > [!TIP]
   > `WorkplaceJoined : YES` with `AzureAdJoined : NO` is the signature of a registered device. Recognise that pairing on sight — it is the fastest way to tell someone their BYOD machine will never receive device configuration profiles, because those target joined devices.

3. In the **Microsoft Entra admin center**, select **Devices**, then **All devices**, and find the new object.
   *Path:* **Devices** > **All devices**

   **Verify:** The device is listed with a **Join type** of **Microsoft Entra registered** and an **Owner** of Joni Sherman.

**Results:** You can identify a registered device from both the client and the directory.

- [ ] `dsregcmd` reports `WorkplaceJoined : YES` and `AzureAdJoined : NO`.
- [ ] The device shows as **Microsoft Entra registered** in the portal.

### Exercise 3: Join a device to Microsoft Entra ID

#### Task 1: Join VM2 to Microsoft Entra ID

1. Start **MD102-VM2-Alex** and sign in with the local `labadmin` account.

2. Open **Settings**, select **Accounts**, then select **Access work or school**.
   *Path:* **Settings** > **Accounts** > **Access work or school**

3. Select **Connect**, then on the dialog select **Join this device to Microsoft Entra ID** — the small link at the bottom, not the main sign-in box.

   > [!WARNING]
   > The main sign-in box on that dialog performs a *registration*. The join option is the alternate-action link underneath it, labelled **Join this device to Microsoft Entra ID**. This is deliberately easy to miss.

4. Sign in as `alex.wilber@<tenant>.onmicrosoft.com`, confirm the organisation details when prompted, then restart the machine.

5. After the restart, sign in to Windows with Alex's work account rather than the local account.

   **Verify:** You reach the desktop signed in as Alex. The device is now identified by that work account, which is the practical difference from registration.

**Results:** The device is Microsoft Entra joined and the user signs in to Windows with a work account.

- [ ] Windows sign-in uses `alex.wilber@<tenant>.onmicrosoft.com`.
- [ ] **All devices** shows a **Join type** of **Microsoft Entra joined**.

#### Task 2: Dissect the joined state and the Primary Refresh Token

1. On **MD102-VM2-Alex**, run `dsregcmd /status` in PowerShell and read all three sections this time.

   ```powershell
   dsregcmd /status
   ```

2. Confirm the device state:

   | Setting | Value |
   | --- | --- |
   | AzureAdJoined | **YES** |
   | WorkplaceJoined | **NO** <br> A device is joined or registered, not both. |
   | DomainJoined | **NO** |
   | DeviceId | **a GUID** <br> Matches the object id in the Entra portal. |
   | TpmProtected | **YES** <br> Proof that the vTPM from lab 2 is doing its job — the device key is hardware-protected. |

3. Now find the **SSO State** section and locate `AzureAdPrt`.

   | Setting | Value |
   | --- | --- |
   | AzureAdPrt | **YES** |
   | AzureAdPrtUpdateTime | **a recent timestamp** |

   > [!IMPORTANT]
   > The Primary Refresh Token is what gives the signed-in user silent single sign-on to Microsoft 365 and, crucially, what proves device identity to Conditional Access. If `AzureAdPrt : NO`, the user will be prompted to authenticate repeatedly and any Conditional Access policy requiring a compliant or joined device will fail — even though the device really is joined and really is compliant.

4. Note the diagnostic command to run in PowerShell on a Windows client when troubleshooting join or SSO failures:

   *When a join or a PRT fails on a Windows client, run this command in PowerShell*
   ```powershell
   # Full join and SSO diagnostics, including reason codes for a failed join
   dsregcmd /status /debug
   ```

5. Compare the two machines side by side and write down, in one sentence each, how you would tell them apart from `dsregcmd` output alone.

**Results:** You can read a device's trust relationship and single sign-on health from the client.

- [ ] VM2 reports `AzureAdJoined : YES` and `AzureAdPrt : YES`.
- [ ] VM1 reports `WorkplaceJoined : YES` and `AzureAdJoined : NO`.
- [ ] Both devices appear in **All devices** with different join types.

### Scripts

#### Summarise device identity across the tenant

> [!NOTE]
> Useful once devices start arriving. `trustType` is the directory's name for join type.

```powershell
Connect-MgGraph -Scopes "Device.Read.All"

Get-MgDevice -All |
    Select-Object DisplayName,
        @{n='JoinType'; e={
            switch ($_.TrustType) {
                'AzureAd'   { 'Entra joined' }
                'Workplace' { 'Entra registered' }
                'ServerAd'  { 'Hybrid Entra joined' }
                default     { $_.TrustType }
            }
        }},
        OperatingSystem,
        @{n='Compliant'; e={$_.IsCompliant}},
        @{n='Managed';   e={$_.IsManaged}},
        ApproximateLastSignInDateTime |
    Sort-Object JoinType, DisplayName |
    Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** A device shows `AzureAdJoined : YES` but `AzureAdPrt : NO`, and the user is prompted for credentials constantly.

- **Root cause:** The Primary Refresh Token has not been issued or has failed to refresh. Common causes are a large clock skew between the device and Entra ID, a broken network path to the authentication endpoints, or the user signing in with a local account rather than the work account.
- **Diagnostic:**

  ```powershell
  dsregcmd /status /debug
  w32tm /query /status
  ```

- **Resolution:** Confirm the user is signed in to Windows with the work account, correct the system clock, then sign out and back in. A PRT is issued at interactive sign-in, so a lock and unlock is not always sufficient.

**Symptom:** Joining fails and the device already appears in **All devices**.

- **Root cause:** The per-user device quota in Microsoft Entra ID has been reached, or a stale object from a previous attempt is holding the device identity.
- **Diagnostic:**

  ```powershell
  dsregcmd /status /debug   # look for the failure reason code
  ```

- **Resolution:** Delete the stale device object in **Devices** > **All devices**, then run `dsregcmd /leave` on the client and rejoin. If the quota is the cause, raise **Devices** > **Device settings** > **Maximum number of devices per user**.
- **Error codes:** `0x801c03f2`

### Knowledge check

**Q1.** A user's personally owned Windows 11 laptop must access corporate email with data protection applied, but the organisation must not take ownership of the device or control its sign-in. Which device identity is appropriate?

A. Microsoft Entra joined
B. Domain joined only
C. Microsoft Entra registered
D. Hybrid Microsoft Entra joined

<details><summary>Answer</summary>

**C** — Registration gives the organisation a device identity while the user keeps their local or Microsoft account sign-in and ownership of the machine. Joining replaces the Windows sign-in with a work account and implies corporate ownership.

*Exam tip:* Read the ownership sentence in the scenario first. Personal ownership means registered; corporate ownership means joined, and hybrid joined only when on-premises Active Directory must remain in the picture.

</details>

**Q2.** `dsregcmd /status` on a Windows 11 device reports `AzureAdJoined : YES`, `DomainJoined : YES` and `AzureAdPrt : YES`. What is this device?

A. Microsoft Entra registered
B. Microsoft Entra joined only
C. Co-managed but not joined to Microsoft Entra ID
D. Hybrid Microsoft Entra joined

<details><summary>Answer</summary>

**D** — `AzureAdJoined` and `DomainJoined` both reading YES is the definition of hybrid join — the device holds a trust relationship with both on-premises Active Directory and Microsoft Entra ID.

*Exam tip:* Memorise the three signatures: joined is AzureAdJoined YES with DomainJoined NO; hybrid is both YES; registered is WorkplaceJoined YES with AzureAdJoined NO.

</details>

---

## Lab 6: Device groups and dynamic membership rules

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Everything in Intune is assigned to a group. Get your group design wrong and you spend the rest of the deployment fighting it: policies that apply to half a population, filters bolted on to compensate, and nobody able to say with confidence which devices receive what. You will build the dynamic device groups this course targets, learn the rule syntax properly, and see the two behaviours that surprise people — evaluation delay, and what happens when a device matches nothing.

### Objectives

After completing this lab, you will be able to:

- Choose between assigned and dynamic membership for a given targeting requirement
- Write dynamic membership rules using device properties and the correct operators
- Build device groups for platform, ownership and Autopilot registration
- Explain why a user group and a device group are not interchangeable in Intune
- Diagnose a rule that matches nothing

### Exam objectives covered

- `g1.t1.s4` — Plan and implement groups for devices in Microsoft Entra ID, including dynamic group membership rules

### Prerequisites

- Completed labs: `device-identity`
- Licences: M365-E5, ENTRA-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Entra admin center
- Personas: adele.vance, alex.wilber

### Exercise 1: Assigned or dynamic

#### Task 1: Understand the trade-off

1. Dynamic membership requires Microsoft Entra ID P1 or P2, which Microsoft 365 E5 includes. Choosing between the two is a design decision, not a licensing one.

   |  | Assigned | Dynamic |
   | --- | --- | --- |
   | Membership | You add and remove members by hand | Evaluated from a rule against object attributes |
   | Best for | Pilot rings, exception groups, anything with no attribute in common | Platform, ownership, department, anything attribute-driven |
   | Latency | Immediate | Minutes, and up to 24 hours after a rule change in a large tenant |
   | Failure mode | Someone forgets to add a device | A rule silently matches nothing and the policy appears to do nothing |
   | Can mix users and devices | Technically yes, and you should not | No — a rule targets one object type |

   > [!IMPORTANT]
   > A dynamic group is either a *user* group or a *device* group, chosen at creation and not changeable afterwards. Several Intune policy types accept only one kind. If a policy looks assigned but reaches nobody, the first thing to check is whether you targeted a user group with a device-only policy.

**Results:** You can justify assigned versus dynamic for a given requirement.

- [ ] You can name one case where assigned membership is the better choice.

### Exercise 2: Write dynamic device rules

Lab 3 created several of these with a script. Now build one by hand so the syntax and the rule builder are familiar.

#### Task 1: Create a dynamic group with the rule builder

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**, then **New group**.
   *Path:* **Groups** > **All groups** > **New group**

2. Configure the group:

   | Setting | Value |
   | --- | --- |
   | Group type | **Security** |
   | Group name | **GRP-DEV-WIN-11** |
   | Membership type | **Dynamic Device** <br> Not Dynamic User. The option list differs, and so does the set of properties available to the rule. |

3. Under **Dynamic device members**, select **Edit dynamic query**, then build this rule:

   | Setting | Value |
   | --- | --- |
   | Property | **deviceOSType** |
   | Operator | **Equals** |
   | Value | **Windows** |

   a. Select **And**, then add a second expression.
   b. Property `deviceOSVersion`, operator **Starts With**, value `10.0.2`.

4. Switch to the **Rule syntax** tab and read what the builder produced:

   ```text
   (device.deviceOSType -eq "Windows") and (device.deviceOSVersion -startsWith "10.0.2")
   ```

   > [!TIP]
   > The syntax view is worth learning because the exam shows rules as text, not as the builder. Note the `device.` prefix, the dash-prefixed operators (`-eq`, `-ne`, `-startsWith`, `-contains`, `-any`, `-all`), and that string values are double-quoted.

5. Select **Save**, then **Create**.

**Results:** A dynamic device group exists with a rule you wrote by hand.

- [ ] `GRP-DEV-WIN-11` exists with a membership type of **Dynamic Device**.
- [ ] The rule syntax matches the expression above.

#### Task 2: Learn the rules that matter for this course

1. Review the rules lab 3 created and what each one is for. You will assign policy to these repeatedly.

   | Group | Rule | Used by |
   | --- | --- | --- |
   | `GRP-DEV-WIN-CORP` | `device.deviceOSType -eq "Windows"` and `device.deviceOwnership -eq "Company"` | Configuration profiles, compliance, BitLocker, update rings |
   | `GRP-DEV-WIN-PERSONAL` | `device.deviceOwnership -eq "Personal"` | Excluded from corporate configuration |
   | `GRP-DEV-ANDROID-WP` | `device.deviceOSType -eq "AndroidForWork"` | Work profile configuration |
   | `GRP-DEV-AUTOPILOT` | `device.devicePhysicalIds -any (_ -startsWith "[ZTDId]")` | Autopilot deployment profile assignment |

2. Study the Autopilot rule closely — it is the one people copy incorrectly.

   *Matches any device with an Autopilot Zero Touch Deployment identifier*
   ```text
   (device.devicePhysicalIds -any (_ -startsWith "[ZTDId]"))
   ```

   > [!IMPORTANT]
   > `devicePhysicalIds` is a multi-valued property, which is why it needs the `-any` operator and the `_` placeholder for the current element. Writing `device.devicePhysicalIds -startsWith "[ZTDId]"` without `-any` is a syntax error the portal will reject. Memorise this rule — it appears on the exam and in every real Autopilot deployment.

3. Note the ownership value that catches people out:

   > [!NOTE]
   > `deviceOwnership` for corporate devices is the string `Company`, not `Corporate`. The Intune portal displays the word *Corporate* in device lists, and the directory attribute says `Company`. A rule written with `Corporate` is valid syntax that matches nothing.

**Results:** You can read and write the device rules this course depends on.

- [ ] You can explain why the Autopilot rule needs `-any`.
- [ ] You know which literal value means a corporate-owned device.

### Exercise 3: Watch a rule populate, and diagnose one that does not

#### Task 1: Confirm your joined device lands in the right group

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-DEV-WIN-11**, then select **Members**.
   *Path:* **Groups** > **All groups** > **GRP-DEV-WIN-11** > **Members**

   > [!NOTE]
   > It may be empty. Rule evaluation runs asynchronously and a newly created rule can take several minutes, occasionally much longer, before it first populates. Empty immediately after creation means nothing.

2. In **Groups** > **All groups**, select **GRP-DEV-WIN-11**, then select **Dynamic membership rules** and check the processing state, which is the field that tells you whether evaluation is even running:
   *Path:* **Groups** > **All groups** > **GRP-DEV-WIN-11** > **Dynamic membership rules**

   **Verify:** **Dynamic membership rule processing status** reads **Evaluation completed** or **Update in progress**. If it reads **Processing paused**, the rule is not being evaluated at all and no amount of waiting will help.

3. Wait, then refresh **Members** until `MD102-VM2-Alex` appears.

4. Check `GRP-DEV-WIN-CORP` as well.

   > [!WARNING]
   > Alex's device probably will **not** appear here yet, and that is correct. `deviceOwnership` is only set to `Company` once a device is enrolled as corporate — either through Autopilot, a corporate identifier, or an enrollment profile. A device joined manually through Settings defaults to **Personal**. Lab 11 fixes this deliberately, and this is exactly the surprise that makes people think dynamic groups are broken.

**Results:** You have seen a rule populate and understand why a correct-looking rule can still match nothing.

- [ ] `GRP-DEV-WIN-11` contains `MD102-VM2-Alex`.
- [ ] You can explain why the same device is not yet in `GRP-DEV-WIN-CORP`.

#### Task 2: Validate rules before you rely on them

1. In **Groups** > **All groups**, select **GRP-DEV-WIN-CORP**, select **Dynamic membership rules**, then select **Validate Rules**.
   *Path:* **Groups** > **All groups** > **GRP-DEV-WIN-CORP** > **Dynamic membership rules** > **Validate Rules**

2. Add `MD102-VM2-Alex` as a device to validate against, then select **Validate**.

   **Verify:** The result shows **Not a member**, and expanding the row shows which clause failed — the ownership test.

   > [!TIP]
   > **Validate Rules** answers the question *why is this object not in this group* directly, instead of leaving you to guess. Reach for it before rewriting a rule you think is broken.

**Results:** You can prove why a specific device does or does not match a rule.

- [ ] Validation reports the specific clause that excluded the device.

### Scripts

#### List dynamic groups and their rules

```powershell
Connect-MgGraph -Scopes "Group.Read.All"

Get-MgGroup -All |
    Where-Object { $_.GroupTypes -contains "DynamicMembership" } |
    Select-Object DisplayName,
        @{n='State'; e={$_.MembershipRuleProcessingState}},
        @{n='Rule';  e={$_.MembershipRule}} |
    Sort-Object DisplayName |
    Format-List
```

### Troubleshooting

**Symptom:** A dynamic device group stays empty although devices clearly match the rule.

- **Root cause:** Most often the rule tests `deviceOwnership -eq "Corporate"`, which never matches — the directory value is `Company`. Second most often, rule processing is paused, or the group was created as Dynamic User rather than Dynamic Device.
- **Diagnostic:**

  ```powershell
  Get-MgGroup -Filter "displayName eq 'GRP-DEV-WIN-CORP'" |
      Select-Object DisplayName, GroupTypes, MembershipRuleProcessingState, MembershipRule |
      Format-List
  ```

- **Resolution:** Correct the literal to `Company`, confirm **MembershipRuleProcessingState** is `On`, and use **Validate Rules** against a known device to see which clause fails. A group created as Dynamic User cannot be converted — recreate it.

### Knowledge check

**Q1.** You need a dynamic device group containing every device registered with Windows Autopilot. Which membership rule is correct?

A. `(device.deviceOwnership -eq "Autopilot")`
B. `(device.devicePhysicalIds -startsWith "[ZTDId]")`
C. `(device.enrollmentProfileName -eq "Autopilot")`
D. `(device.devicePhysicalIds -any (_ -startsWith "[ZTDId]"))`

<details><summary>Answer</summary>

**D** — `devicePhysicalIds` is multi-valued, so it requires the `-any` operator with the `_` placeholder representing each element. Without `-any` the expression is rejected as invalid syntax.

*Exam tip:* This exact rule appears in Microsoft's Autopilot documentation and on the exam. Learn it verbatim, including the square brackets around ZTDId.

</details>

**Q2.** A dynamic device group uses the rule `(device.deviceOwnership -eq "Corporate")`. The group has no members despite many corporate devices being enrolled. What is wrong?

A. Device ownership can only be evaluated in a Dynamic User group
B. The correct attribute value is `Company`, not `Corporate`
C. The rule must use `-contains` rather than `-eq`
D. Dynamic device groups require Microsoft Entra ID P2

<details><summary>Answer</summary>

**B** — The Intune portal displays corporate devices as *Corporate*, but the directory attribute value is the string `Company`. The rule is syntactically valid, so it saves and evaluates successfully — it simply matches nothing.

*Exam tip:* Valid syntax with zero members almost always means a wrong literal value rather than a wrong operator. Use Validate Rules against a known-good device to confirm.

</details>

---

## Lab 7: Intune role-based access control and custom roles

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Your help desk needs to wipe lost phones and reset passcodes. It does not need to edit Conditional Access, change compliance policy or delete configuration profiles. Intune has its own role-based access control system, separate from Microsoft Entra directory roles, and the exam expects you to know which one governs what. You will assign a built-in role, build a custom role from individual permissions, and prove the restriction actually holds by signing in as the restricted operator.

### Objectives

After completing this lab, you will be able to:

- Distinguish Microsoft Entra directory roles from Intune RBAC roles
- Assign a built-in Intune role to a group
- Create a custom Intune role with a specific permission set
- Verify a role restriction from the operator's own sign-in
- Describe how Windows 365 roles fit the same model

### Exam objectives covered

- `g1.t3.s1` — Manage built-in and custom roles for Intune and Windows 365, including role assignments

### Prerequisites

- Completed labs: `personas-and-groups`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: helpdesk.operator

### Exercise 1: Two role systems, one portal

#### Task 1: Separate Entra roles from Intune roles

1. This distinction produces more confusion than any other topic in this module, and the exam tests it directly.

   |  | Microsoft Entra directory role | Intune RBAC role |
   | --- | --- | --- |
   | Managed in | Microsoft Entra admin center | Intune admin center > Tenant administration > Roles |
   | Scope of power | The whole directory: identity, licences, all workloads | Intune only |
   | Examples | Global Administrator, Intune Administrator, Security Administrator | Help Desk Operator, Policy and Profile Manager, Application Manager |
   | Can be scoped by scope tag | No | Yes |
   | Can be scoped to a group of users or devices | Administrative units only | Yes, through scope groups |
   | Custom roles | Yes, with Entra ID P1 or P2 | Yes, included with Intune |

   > [!IMPORTANT]
   > The Entra **Intune Administrator** role grants full control of Intune and overrides anything you configure in Intune RBAC. If you assign someone that directory role and then carefully restrict them with an Intune role, the directory role wins. Restricted operators must **not** hold a broad directory role.

2. Review the built-in Intune roles you are most likely to be asked about:

   | Built-in role | Typical use |
   | --- | --- |
   | Help Desk Operator | Remote actions and user support; can view most things, change few |
   | Policy and Profile Manager | Create and assign configuration, compliance and Autopilot profiles |
   | Application Manager | Publish and assign applications, manage app protection policy |
   | Endpoint Security Manager | Security baselines, antivirus, firewall, disk encryption, EDR policy |
   | Read Only Operator | View everything, change nothing |
   | School Administrator | Intune for Education |

**Results:** You can say which system governs a given permission.

- [ ] You can explain why an Intune RBAC restriction fails if the user is also an Entra Intune Administrator.

### Exercise 2: Assign a built-in role

#### Task 1: Give the help desk group the Help Desk Operator role

1. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then **All roles**.
   *Path:* **Tenant administration** > **Roles** > **All roles**

2. Select **Help Desk Operator**, then select **Assignments**, then select **Create assignment**.

3. On **Basics**, name the assignment:

   | Setting | Value |
   | --- | --- |
   | Name | **Help Desk — all devices** |
   | Description | **Remote actions and user support across the estate** |

4. On **Admin Groups**, select `GRP-ADM-HELPDESK`. This is *who receives the role*.

   > [!IMPORTANT]
   > Admin Groups and Scope Groups are the two halves people mix up. **Admin Groups** is who holds the permissions. **Scope Groups** is which users and devices they may exercise those permissions over. Swap them and you have given the help desk power over the help desk and nobody else.

5. On **Scope Groups**, choose **All devices** and **All users** for now. Lab 8 narrows this with scope tags.

6. On **Scope tags**, leave **Default** selected, then select **Create**.

**Results:** Members of the help desk group hold the Help Desk Operator role.

- [ ] **Help Desk Operator** > **Assignments** lists your new assignment.
- [ ] `helpdesk.operator` is a member of `GRP-ADM-HELPDESK`.

#### Task 2: Prove the restriction from the operator's seat

1. Open a private browser window and sign in to `https://intune.microsoft.com` as `helpdesk.operator@<tenant>.onmicrosoft.com`.

   > [!TIP]
   > Use a private window rather than signing out. You will be switching between the administrator and the operator repeatedly, and a second browser profile saves a great deal of time across this course.

2. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then select **My permissions** to check your own effective permissions first:
   *Path:* **Tenant administration** > **Roles** > **My permissions**

   **Verify:** **My permissions** lists Help Desk Operator and shows the granted actions. This blade is the fastest way to answer *why can this person not do X*.

3. Now test the boundary. Open **Devices** > **All devices**. Nothing has enrolled yet — the first device arrives in lab 10 — so expect an empty list.
   *Path:* **Devices** > **All devices**

   **Verify:** The blade renders and lists no devices. That is read access with nothing to read, which is exactly what this role should give you.

   > [!IMPORTANT]
   > Learn to tell *empty* from *denied* here, because it is the first fork in every *the help desk cannot see the device* call. **Empty** means the query ran and matched nothing: no enrolled devices, or a scope group that excludes them. **Denied** means the query never ran, and the blade says so instead of showing you a clean table. **My permissions** from the previous step settles which one you are looking at.

4. Remote actions are the other half of this role and they need a device to act on, so this part waits. Lab 10 enrolls the first device and its closing step brings you back to finish the check. If you already have an enrolled device, select it now and confirm **Sync**, **Restart** and **Retire** are offered.

   > [!TIP]
   > Resist turning on automatic enrollment early just to populate this list. Lab 10 sets the MDM user scope deliberately and lab 11 corrects the ownership a first enrollment gets wrong, so a device enrolled out of order starts both labs in the wrong state.

5. Attempt something the role should not permit: open **Devices** > **Configuration** and try to create a profile.

   **Verify:** The create action is unavailable or denied. Help Desk Operator can read configuration but not author it.

**Results:** The role restricts what it should, proven from the operator's own session rather than assumed. The remote-action half of the proof resumes in lab 10, once there is a device to act on.

- [ ] The operator reaches **Devices** > **All devices** and sees an empty list, not an access error.
- [ ] The operator cannot create a configuration profile.
- [ ] You can state the difference between a blade that is empty and a blade that is denied.

### Exercise 3: Build a custom role

Built-in roles rarely match a real team exactly. Custom roles let you compose exactly the permission set you want.

#### Task 1: Create an application-only custom role

1. Sign back in as `admin-intune`. Select **Tenant administration**, **Roles**, **All roles**, then select **Create**, **Intune role**. **Create** is a dropdown: **Windows 365 role** builds a Cloud PC role instead, and **Windows Autopatch role** is greyed out until Autopatch is set up.
   *Path:* **Tenant administration** > **Roles** > **All roles** > **Create** > **Intune role**

2. On **Basics**:

   | Setting | Value |
   | --- | --- |
   | Name | **App Deployment Operator** |
   | Description | **May publish and assign applications and read device inventory. No configuration or security rights.** |

3. On **Permissions**, expand **Mobile apps**. It holds seven toggles, and all seven are listed below in the order the portal shows them — set every one deliberately rather than assuming a default. Then set the two reads beneath it. Leave every other category at **No**.

   | Setting | Value |
   | --- | --- |
   | Mobile apps — View reports | **Yes** <br> App install status is how this operator confirms a deployment succeeded. Read exposes the app objects; the reporting blades are gated separately. |
   | Mobile apps — Read | **Yes** |
   | Mobile apps — Delete | **No** <br> Deliberate. Publishing is recoverable; deleting an assigned app uninstalls it from every targeted device. |
   | Mobile apps — Create | **Yes** |
   | Mobile apps — Relate | **No** <br> Deliberate. Relate governs the dependency and supersedence relationships you build in lab 33. Superseding an app can uninstall the version it replaces, which is the same blast radius that keeps Delete at No. |
   | Mobile apps — Assign | **Yes** |
   | Mobile apps — Update | **Yes** |
   | Managed devices — Read | **Yes** <br> The device-side half of the same question: which devices were targeted and what state they are in. |
   | Organization — Read | **Yes** <br> Required for the console to render at all. |

   > [!NOTE]
   > **Organization — Read** is the permission people forget. Without it the admin center loads with almost nothing visible, and it looks as though the whole role is broken rather than missing one entry.

4. On **Scope tags**, leave **Default**, then select **Create**.

5. Assign the new role to `GRP-ADM-HELPDESK` using the same **Create assignment** flow as before, so you can test it with the operator account.

**Results:** A custom role exists granting application management without configuration or deletion rights.

- [ ] **All roles** lists **App Deployment Operator** with a type of **Custom**.
- [ ] The role has an assignment naming `GRP-ADM-HELPDESK`.

#### Task 2: Note how Windows 365 roles fit the same model

1. The exam objective covers roles for Intune *and Windows 365*. You cannot provision Cloud PCs on Microsoft 365 E5, but you should recognise the roles.

   | Windows 365 role | Grants |
   | --- | --- |
   | Windows 365 Administrator | Full Cloud PC management: provisioning policies, images, network connections |
   | Cloud PC Administrator | Read and write across the Cloud PC service |
   | Cloud PC Reader | Read-only view of Cloud PCs and provisioning policies |

   > [!NOTE]
   > These are Intune RBAC roles, administered in the same **Tenant administration** > **Roles** blade, and they are scoped by the same scope tags. Lab 21 walks through Cloud PC provisioning itself.

**Results:** You can place Windows 365 roles within the Intune RBAC model.

- [ ] You can name the role that permits provisioning-policy management.

### Scripts

#### Export Intune role assignments

```powershell
Connect-MgGraph -Scopes "DeviceManagementRBAC.Read.All"

$roles = Get-MgDeviceManagementRoleDefinition -All

# foreach is a statement, and a statement cannot be piped: collect first.
$rows = foreach ($role in $roles) {
    $assignments = Get-MgDeviceManagementRoleDefinitionRoleAssignment -RoleDefinitionId $role.Id -All
    if (-not $assignments) { continue }

    foreach ($a in $assignments) {
        [pscustomobject]@{
            Role       = $role.DisplayName
            BuiltIn    = $role.IsBuiltIn
            Assignment = $a.DisplayName
        }
    }
}

$rows | Sort-Object Role | Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** The operator signs in successfully, but **Devices** > **All devices** is empty.

- **Root cause:** Most likely nothing has enrolled yet. Lab 5 joined VM2 to Microsoft Entra ID, which is an identity, not management; automatic enrollment is configured in lab 10 and that is when the first device appears in Intune. Later in the course the same symptom means a scope group that excludes the device, or a role missing **Managed devices — Read**.
- **Diagnostic:**

  ```text
  Signed in as the operator:
  Tenant administration > Roles > My permissions        # is Managed devices - Read granted?

  Signed in as admin-intune:
  Devices > All devices                                 # does the tenant have any enrolled device at all?
  Tenant administration > Roles > Help Desk Operator > Assignments > Scope Groups
  ```

- **Resolution:** If the administrator's own view of **All devices** is also empty, nothing is broken: continue the lab and return to the remote-action check after lab 10. If the administrator sees devices and the operator does not, widen the assignment's scope groups to include them.

**Symptom:** An operator with a restricted Intune role can still do everything in the console.

- **Root cause:** The account also holds a Microsoft Entra directory role — usually Intune Administrator or Global Administrator — which supersedes Intune RBAC entirely.
- **Diagnostic:**

  ```text
  Entra admin center > Users > select the user > Assigned roles
  Intune admin center > Tenant administration > Roles > My permissions (signed in as that user)
  ```

- **Resolution:** Remove the directory role from the account. Intune RBAC can only restrict people who are not already privileged at the directory level.

**Symptom:** A custom role is assigned but the operator sees an almost empty admin center.

- **Root cause:** The role is missing **Organization — Read**, which the console needs to render tenant context.
- **Diagnostic:**

  ```text
  Signed in as the operator:
  Tenant administration > Roles > My permissions
  ```

- **Resolution:** Edit the custom role and set **Organization — Read** to **Yes**. Permission changes take a few minutes to reach an existing session.

### Knowledge check

**Q1.** You create a custom Intune role granting only application permissions and assign it to a help desk group. One member reports they can also edit compliance policies. What is the most likely explanation?

A. Custom roles always inherit the permissions of the Help Desk Operator built-in role
B. Compliance policy permissions cannot be removed from a custom role
C. That member holds the Microsoft Entra Intune Administrator role, which supersedes Intune RBAC
D. The role assignment scope group includes All devices

<details><summary>Answer</summary>

**C** — Microsoft Entra directory roles grant service-wide permissions that Intune RBAC cannot reduce. Restricting an account with Intune RBAC only works if that account holds no broad directory role.

*Exam tip:* When a restriction does not hold, check directory role membership before re-reading the Intune role. Scope groups limit which objects can be acted upon, never which actions exist.

</details>

**Q2.** In an Intune role assignment, what does the Scope Groups setting control?

A. Which administrators receive the role
B. Which scope tags the role can read
C. Which Microsoft Entra directory roles are inherited
D. Which users and devices the assigned administrators may manage

<details><summary>Answer</summary>

**D** — Admin Groups defines who holds the role; Scope Groups defines the set of users and devices they may act on. Confusing the two is the most common misconfiguration in Intune RBAC.

*Exam tip:* Read it as a sentence: members of the *Admin Group* may perform the role's actions against members of the *Scope Group*.

</details>

---

## Lab 8: Scope tags, administrative units and scoped administration

**Access:** Hands-on · **Estimated time:** 35 minutes · **Difficulty:** intermediate

### Lab scenario

Contoso's regional IT teams must each manage only their own devices and policies. A role restricts *what actions* an administrator can take; a scope tag restricts *which objects* those actions can touch. You will create the tags, scope an operator to one of them, and build the administrative unit that does the equivalent job in Microsoft Entra ID. The proof — signing in as that operator and watching every untagged object disappear — needs enrolled devices, so it runs in lab 12 once they exist. That disappearing act is the behaviour people find surprising and the exam likes to test.

### Objectives

After completing this lab, you will be able to:

- Explain the difference between a role, a scope group and a scope tag
- Create scope tags and know how any Intune object is tagged
- Scope a role assignment so an operator sees only tagged objects
- Create an administrative unit and scope a Microsoft Entra role to it
- Predict what a scoped administrator sees when an object carries no tag

### Exam objectives covered

- `g1.t3.s2` — Configure scope tags and scoped administration for multi-admin environments

### Prerequisites

- Completed labs: `intune-rbac`
- Licences: M365-E5, ENTRA-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, Microsoft Entra admin center
- Personas: helpdesk.operator, alex.wilber, henrietta.mueller

### Exercise 1: Create and apply scope tags

Everything in this lab that does not need a managed device happens here: the tags themselves, the scoped role assignment, and the administrative unit. Applying a tag to a *device* cannot happen yet — nothing is enrolled into Intune until lab 10 — so that half, and the proof that depends on it, run in lab 12 exercise 4.

#### Task 1: Create a scope tag for Finance

1. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then **Scope tags**.
   *Path:* **Tenant administration** > **Roles** > **Scope tags**

2. Select **Create** and configure:

   | Setting | Value |
   | --- | --- |
   | Name | **TAG-FINANCE** |
   | Description | **Finance department devices, policies and applications** |

3. On **Assignments**, select `GRP-USR-FINANCE`.

   > [!NOTE]
   > Assigning a group here automatically applies the tag to devices belonging to those users as they enrol. You can also tag objects individually, which is what the next task does.

4. Select **Create**, then run the identical flow a second time for the IT tag:

   | Setting | Value |
   | --- | --- |
   | Name | **TAG-IT** |
   | Description | **IT department devices, policies and applications** |
   | Assignments | **GRP-USR-IT** |

5. Note the tag that already exists:

   > [!IMPORTANT]
   > Every object you have created so far carries the **Default** scope tag, because Intune applies it automatically to anything created without an explicit tag. An operator scoped only to `TAG-FINANCE` will therefore not see any of it. That is the single most confusing behaviour in this feature, and the reason scoped administration is usually rolled out by tagging everything first.

**Results:** Two scope tags exist, each associated with a department group.

- [ ] **Scope tags** lists `TAG-FINANCE`, `TAG-IT` and **Default**.

#### Task 2: Know how an object gets tagged

1. Tagging is the same three steps wherever you do it, and it is worth reading now even though there is nothing enrolled to practise on:

   a. Open the object and select **Properties**.
   b. Next to **Scope tags** select **Edit** and add the tag.
   c. Select **Review + save**.

   > [!TIP]
   > Leave **Default** applied alongside the new tag. An object can carry several tags, and removing Default while you are still learning is how you make an object invisible to yourself.

2. Devices are the one thing you cannot practise on here. **Devices** > **All devices** in the Intune admin center lists only devices *enrolled into Intune*, and nothing is enrolled until lab 10. Lab 12 exercise 4 returns to this and applies `TAG-FINANCE` to a device once both virtual machines are enrolled.

   > [!IMPORTANT]
   > Microsoft Entra joined and Intune enrolled are not synonyms, and the exam tests the difference directly. Lab 5 joined these virtual machines to Microsoft Entra ID, so they appear in the *Entra* admin center under **Devices** — and remain entirely absent from Intune until something enrols them.

**Results:** You can tag any Intune object, and you know why the device list is still empty.

- [ ] You can state the difference between a Microsoft Entra joined device and an Intune enrolled device.

### Exercise 2: Scope an operator and predict the restriction

#### Task 1: Create a scoped role assignment

1. Select **Tenant administration**, **Roles**, **All roles**, then **Help Desk Operator**, then **Assignments**.
   *Path:* **Tenant administration** > **Roles** > **All roles** > **Help Desk Operator** > **Assignments**

2. Delete the unrestricted **Help Desk — all devices** assignment you created in lab 7, then select **Create assignment**.

3. Configure the scoped assignment:

   | Setting | Value |
   | --- | --- |
   | Name | **Help Desk — Finance only** |
   | Admin Groups | **GRP-ADM-HELPDESK** <br> Who holds the role. |
   | Scope Groups | **GRP-USR-FINANCE** <br> Which users and devices they may act on. |
   | Scope tags | **TAG-FINANCE** <br> Which tagged objects are visible. Remove Default. |

   > [!IMPORTANT]
   > Remove the **Default** tag from this assignment. Leaving it means the operator can see every object that carries Default — which is almost everything — and the restriction you just built achieves nothing.

4. Select **Create**.

**Results:** The help desk role is limited to Finance objects by both scope group and scope tag.

- [ ] The assignment lists `TAG-FINANCE` and does **not** list **Default**.

#### Task 2: Understand what a scoped operator actually sees

1. The proof itself needs two enrolled devices — one tagged, one not — so it runs in lab 12 exercise 4. What matters now is being able to predict the outcome, because the behaviour surprises people and the exam asks about it.

   > [!IMPORTANT]
   > Objects outside scope are not shown as denied — they simply do not appear. A scoped operator has no way to tell the difference between an object that does not exist and one they cannot see, which is exactly the intent.

   > [!NOTE]
   > Which is also why an empty list proves nothing on its own. A convincing demonstration needs a tagged object that stays visible *and* an untagged one that vanishes — the reason lab 12 tags `MD102-VM2-Alex` and deliberately leaves `MD102-VM1-Adele` alone.

2. Predict the operator's view for each object before you get there:

   | Object | Tags it carries | Visible to the scoped operator |
   | --- | --- | --- |
   | `MD102-VM2-Alex` | Default, TAG-FINANCE | Yes |
   | `MD102-VM1-Adele` | Default | No |
   | A configuration profile you never tagged | Default | No |
   | Anything carrying TAG-IT | Default, TAG-IT | No |

**Results:** You can predict a scoped operator's view before proving it in lab 12.

- [ ] You can explain why removing the **Default** tag from the assignment was necessary.

### Exercise 3: Administrative units

Scope tags restrict Intune. Administrative units restrict Microsoft Entra ID. They solve the same problem in two different services, and the exam expects you to know which is which.

#### Task 1: Create an administrative unit and scope a directory role to it

1. In the **Microsoft Entra admin center**, select **Roles and admins**, then **Admin units**, then **Add**.
   *Path:* **Roles and admins** > **Admin units** > **Add**

   > [!NOTE]
   > The portal labels this blade **Admin units**. Microsoft Learn, the Graph resource (`administrativeUnit`) and the exam all still call the object an *administrative unit*, so read the two names as the same thing.

2. On the *Properties* tab, configure:

   | Setting | Value |
   | --- | --- |
   | Name | **AU-FINANCE** |
   | Description | **Finance department users and devices** |
   | Restricted management administrative unit | **No** <br> **Yes** stops tenant-level administrators, Global Administrator included, from managing these members: only an administrator scoped to the unit can. That is the setting for executive and service accounts, and the wrong one for a finance help desk your tenant admins still need to support. |

   > [!NOTE]
   > This tab has no **Membership type** setting. A new unit is always created with assigned membership, and dynamic membership is configured afterwards: open the unit, select **Properties**, set **Membership type** to **Dynamic User** or **Dynamic Device**, then select **Add dynamic query**. That path needs a Microsoft Entra ID P1 licence for every member as well as for the administrator, and one unit can be dynamic for users or for devices, never both.

3. Select **Next: Assign roles**, then add `helpdesk.operator` to the **Password Administrator** role.

   > [!TIP]
   > This is the classic administrative unit scenario: a regional help desk that may reset passwords, but only for users in its own region. The same directory role assigned tenant-wide would let them reset anyone's password, including an administrator's.

4. Select **Review + create**, then **Create**. Under **Admin units**, open `AU-FINANCE`, select **Users**, then select **Add member**, and add `alex.wilber` and `henrietta.mueller`.
   *Path:* **Admin units** > **AU-FINANCE** > **Users** > **Add member**

5. Compare the two mechanisms:

   |  | Scope tag | Administrative unit |
   | --- | --- | --- |
   | Service | Microsoft Intune | Microsoft Entra ID |
   | Restricts | Intune objects: devices, policies, apps, profiles | Directory objects: users, groups, devices |
   | Applied to | The object, and to the role assignment | A container the objects are placed into |
   | Typical use | Regional IT managing their own device estate | Regional help desk resetting their own users' passwords |
   | Licence | Included with Intune | Microsoft Entra ID P1 or P2 |

**Results:** An administrative unit scopes a Microsoft Entra role to a subset of users.

- [ ] `AU-FINANCE` exists with two members and a scoped Password Administrator assignment.

### Scripts

#### Report scope tags and what carries them

```powershell
Connect-MgGraph -Scopes "DeviceManagementRBAC.Read.All","DeviceManagementManagedDevices.Read.All"

$tags = Get-MgDeviceManagementRoleScopeTag -All
$tags | Select-Object Id, DisplayName, Description | Format-Table -AutoSize

Write-Host ""
Write-Host "Devices without a non-default scope tag:" -ForegroundColor Yellow
Get-MgDeviceManagementManagedDevice -All -Property DeviceName,RoleScopeTagIds |
    Where-Object { @($_.RoleScopeTagIds | Where-Object { $_ -ne "0" }).Count -eq 0 } |
    Select-Object DeviceName |
    Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** A scoped operator can still see every device in the tenant.

- **Root cause:** The role assignment still includes the **Default** scope tag. Almost every object carries Default, so including it in an assignment effectively removes the scoping.
- **Diagnostic:**

  ```text
  Tenant administration > Roles > Help Desk Operator > Assignments
  Open the assignment and review Scope tags.
  ```

- **Resolution:** Remove **Default** from the role assignment and confirm the objects the operator should see carry the intended tag.

**Symptom:** A scoped operator sees the correct devices but cannot see any configuration profiles.

- **Root cause:** The profiles carry only the Default tag. Scope tags must be applied to policies as well as devices.
- **Diagnostic:**

  ```text
  Devices > Configuration > open a profile > Properties > Scope tags
  ```

- **Resolution:** Add the operator's scope tag to the profiles they need. Tagging devices alone is a half-finished configuration and produces exactly this symptom.

**Symptom:** The **Add administrative unit** page offers no **Membership type**, and the navigation reads **Admin units** rather than **Administrative units**.

- **Root cause:** Both are current portal behaviour rather than a licensing or permissions problem. The blade was renamed to **Admin units**, and membership type is no longer part of the creation wizard: every new unit is created with assigned membership.
- **Diagnostic:**

  ```text
  Roles and admins > Admin units > AU-FINANCE > Properties
  ```

- **Resolution:** Create the unit with **Name**, **Description** and the **Restricted management administrative unit** toggle, then add members by hand. For a dynamic unit, open the created unit, select **Properties**, set **Membership type** to **Dynamic User** or **Dynamic Device**, and select **Add dynamic query**. Courseware and screenshots that show the choice during creation predate the change.

### Knowledge check

**Q1.** You scope a Help Desk Operator assignment to the tag `TAG-FINANCE` but leave the **Default** tag also selected. What is the result?

A. The operator sees only objects carrying both tags
B. The assignment is rejected because two tags cannot be combined
C. Default is ignored whenever a specific tag is present
D. The operator can see every object carrying the Default tag, which is nearly the whole tenant

<details><summary>Answer</summary>

**D** — Scope tags on an assignment are additive, not intersecting. Because Intune applies Default automatically to objects created without an explicit tag, including it grants visibility of essentially everything.

*Exam tip:* Scope tags combine with OR, not AND. Removing Default is a required step whenever you scope an operator, not an optional tidy-up.

</details>

**Q2.** A regional help desk must reset passwords only for users in its own region. Which feature achieves this?

A. An Intune custom role with password reset permission
B. A dynamic security group with a Conditional Access policy
C. A Microsoft Entra administrative unit containing those users, with a scoped Password Administrator assignment
D. An Intune scope tag applied to those users

<details><summary>Answer</summary>

**C** — Password reset is a Microsoft Entra directory permission, so it is scoped with administrative units. Intune scope tags restrict Intune objects and have no bearing on directory role permissions.

*Exam tip:* Decide which service owns the object first. Directory objects mean administrative units; Intune objects mean scope tags.

</details>

---

## Lab 9: Multi-admin approval and access policies

**Access:** Hands-on · **Estimated time:** 48 minutes · **Difficulty:** intermediate

### Lab scenario

A single administrator can deploy a script to every device in the organisation. That is a great deal of trust to place in one person and one afternoon. Multi-admin approval requires a second administrator to approve certain changes before they take effect, which turns an accidental or malicious tenant-wide deployment into a request somebody has to agree with. The first thing it protects is itself: creating the access policy is a change somebody else has to approve, so you cannot enable it alone. You will build the approver, bootstrap the first policy through its own approval, feel the friction from both sides, and understand the configurations that can lock your whole tenant out of making changes.

### Objectives

After completing this lab, you will be able to:

- Explain which resources multi-admin approval can protect, and which one is protected automatically
- Give an approver group the role assignments and permissions approval actually requires
- Create an access policy and bootstrap it through its own approval
- Submit a change as a requester and see it held pending approval
- Approve, complete and reject requests as a second administrator
- Avoid the self-lockout that a badly scoped approver group or a Role policy creates

### Exam objectives covered

- `g1.t3.s3` — Implement and manage multi-admin approval

### Prerequisites

- Completed labs: `intune-rbac`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: admin-intune, admin-breakglass, patti.fernandez

### Exercise 1: Understand what can be protected

#### Task 1: Review the protected resources and plan the approver group

1. Multi-admin approval covers a deliberately small set of high-blast-radius operations. Each of these is a *profile type* you select when you create an access policy, and each needs its own policy — protection does not cascade.

   | Profile type | What requires approval |
   | --- | --- |
   | Apps | App deployments — create, edit, delete and assign. App protection policies are **not** covered. |
   | Compliance policies | Creating and managing compliance policies |
   | Configuration policies | Creating and managing settings catalog policies |
   | Device actions | Wipe, retire and delete on managed devices |
   | Role-based access control | Changes to roles, including role permissions, admin groups and member group assignments |
   | Scripts | Deploying PowerShell scripts to Windows devices |
   | Tenant Configuration | Creating, editing and deleting device categories |

   > [!IMPORTANT]
   > There is an eighth protected resource you will not find in that list: **access policies themselves**. Intune protects them automatically, which is exactly why **Access policy** is missing from the *Profile type* dropdown — you cannot create a policy to protect it, and you cannot turn it off. Every access policy you create, edit or delete is a request a second administrator has to approve. Exercise 2 is where you meet this, and it surprises almost everybody the first time.

   > [!NOTE]
   > The list of protected resources has grown over time. Check the *Profile type* dropdown in the portal rather than assuming — a resource that was unprotected when you last looked may now be covered.

2. An approver is not simply a person you trust. Intune imposes five separate requirements, and missing any one of them produces silence rather than an error.

   | Requirement | What happens when you miss it |
   | --- | --- |
   | The approver group is a **security group** | Microsoft 365 groups, distribution lists and mail-enabled security groups silently fail to resolve. No error — just no approvers. |
   | The group is directly assigned to an Intune role as a *member group* — the page the portal labels **Admin Groups** | If the group is not on a role assignment, Intune periodically strips its members and approvals stop working. Permissions the members hold individually or through other groups do not count. |
   | Members are direct members of that group | Nested group membership behaves unreliably. |
   | The approver holds *Read* on the resource being approved | An approver who cannot read scripts cannot approve a script request. Approving a device delete needs `ManagedDevices/Read`. |
   | The approver is not the requester | An administrator can never approve their own request. |

   > [!CAUTION]
   > The self-approval rule has no exceptions. A Global Administrator cannot approve their own request, and neither can an Intune Administrator, even when they are a member of the approver group. If the only member of your approver group is the account you make changes with, every request you submit sits at **Needs approval** until it expires after three days, and the protected resource is effectively read-only for the whole tenant. Name at least two approvers, and make sure one of them is not you.

   > [!NOTE]
   > Administrators taking part in the approval workflow need an Intune licence unless the tenant has **Allow access to unlicensed admins** turned on. Tenants created after July 2021 have unlicensed admin access on by default, which is what the unlicensed admin personas in this lab depend on. If you have to enable that setting by hand, note that it is **irreversible**.

**Results:** You know which operations approval covers, that access policies protect themselves, and what an approver actually needs.

- [ ] You can name the resource that is protected without appearing in the *Profile type* list.
- [ ] You can name the failure that a Microsoft 365 group used as an approver group causes.

### Exercise 2: Build the approver, then create the access policy

#### Task 1: Give the approver group the permissions approval requires

1. Do this **before** you create any access policy. Once the first policy is submitted you need a working approver to release it, and building one afterwards is harder than building one now.

   > [!WARNING]
   > This is the ordering mistake that strands the lab. Create the policy first and you have a pending request nobody in your tenant is permitted to approve.

2. In the **Microsoft Entra admin center**, create a **security group** named `GRP-ADM-APPROVERS` and add `patti.fernandez` as a direct member.

3. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Roles**, then **All roles**, then select the built-in **Read Only Operator** role from the list.
   *Path:* **Tenant administration** > **Roles** > **All roles** > **Read Only Operator**

   > [!NOTE]
   > This assignment does two jobs. It gives Patti the *Read* permissions she needs to see what she is approving, and it satisfies the rule that the approver group must itself be on a role assignment, or Intune periodically strips its members and approvals stop working.

4. Select **Assignments**, then **Create assignment**. The blade that opens is titled **Add Role Assignment** and has five pages — **Basics**, **Admin Groups**, **Scope Groups**, **Scope tags** and **Review + create**. Fill them in like this:

   a. *Basics* — **Name** `MAA approvers — read access`, **Description** `Read access so approvers can see what they are approving`. Select **Next**.
   b. *Admin Groups* — select **Add groups**, tick `GRP-ADM-APPROVERS`, choose **Select**, then **Next**. This page is *who receives the role*.
   c. *Scope Groups* — the *Included groups* list opens reading **No groups selected**. Select **Add all users**, then **Add all devices**, then **Next**. This page is *which users and devices they may act on*.
   d. *Scope tags* — leave **Default** selected and choose **Next**.
   e. *Review + create* — check the summary and choose **Create**.

   > [!IMPORTANT]
   > **Admin Groups** is the page the multi-admin approval documentation calls the *member group*. Two names, one thing, and the mismatch strands people — put `GRP-ADM-APPROVERS` there, not on **Scope Groups** and not on `patti.fernandez` directly. A group named only under *Scope Groups* looks assigned in the list and satisfies nothing, so Intune strips the approver list on its next pass.

   > [!NOTE]
   > Leaving *Scope Groups* empty breaks this the other way. The assignment saves, Patti holds the role, and she can read nothing — so a request she opens describes a change she has no permission to see. Approving a script request needs *Read* on scripts; approving a device delete needs `ManagedDevices/Read`.

   **Verify:** **Read Only Operator** > **Assignments** lists **MAA approvers — read access**, and opening it shows `GRP-ADM-APPROVERS` under *Admin Groups*.

5. **Read Only Operator** cannot approve an access policy, so create a custom role for that. Select **Tenant administration**, then **Roles**, then **All roles**, then **Create**, then **Intune role**. On *Basics*, fill in:
   *Path:* **Tenant administration** > **Roles** > **All roles** > **Create** > **Intune role**

   > [!NOTE]
   > **Create** is a dropdown rather than a button, and which entry you pick matters. **Intune role** is the only one that can carry multi-admin approval permissions — **Windows 365 role** builds a Cloud PC role instead, and **Windows Autopatch role** is greyed out until Autopatch is set up.

   | Setting | Value |
   | --- | --- |
   | Name | **MAA Approver** |
   | Description | **Approve or reject multi-admin approval requests** |

6. On *Permissions*, find the **Multi Admin Approval** category and enable exactly these two:

   | Permission | Why |
   | --- | --- |
   | Approval for Multi Admin Approval | Approve or reject approval requests for multi-admin approval configuration. This is the permission that releases an access policy request. |
   | Read access policy | See the access policy the request is asking to create |

   > [!NOTE]
   > The other three permissions in this category — *Create access policy*, *Update access policy* and *Delete access policy* — belong to whoever manages policies, not to whoever approves them. Leave them off.

7. Select **Next** to reach *Scope tags*, leave **Default** selected, select **Next** again, then **Create** on *Review + create*.

8. A custom role does nothing until it is assigned. Select **Tenant administration**, then **Roles**, then **All roles**, then **MAA Approver**, then **Assignments**, then **Create assignment**, and work the same five pages you used for **Read Only Operator**:
   *Path:* **Tenant administration** > **Roles** > **All roles** > **MAA Approver** > **Assignments**

   a. *Basics* — **Name** `MAA approvers — approval rights`.
   b. *Admin Groups* — **Add groups**, then `GRP-ADM-APPROVERS`.
   c. *Scope Groups* — **Add all users** and **Add all devices**.
   d. *Scope tags* — leave **Default** selected.
   e. *Review + create* — select **Create**.

   **Verify:** `GRP-ADM-APPROVERS` appears under *Admin Groups* on two role assignments: one on **Read Only Operator** and one on **MAA Approver**.

**Results:** The approver group can read what it approves and is permitted to approve access policies.

- [ ] `GRP-ADM-APPROVERS` is a security group with `patti.fernandez` as a direct member.
- [ ] The custom role grants *Approval for Multi Admin Approval*.
- [ ] Both roles are assigned to the group, not to the user.

#### Task 2: Create the access policy and bootstrap it through its own approval

1. Signed in as `admin-intune`, select **Tenant administration**, then **Multi Admin Approval**, then **Access policies**, then **Create**.
   *Path:* **Tenant administration** > **Multi Admin Approval** > **Access policies** > **Create**

2. On *Basics*, configure:

   | Setting | Value |
   | --- | --- |
   | Name | **Approval required — Scripts** |
   | Description | **A second administrator must approve any script change** |
   | Profile type | **Scripts** |

   > [!NOTE]
   > Each policy carries a single profile type. Protecting a second resource means a second policy.

3. On *Approvers*, select **Add groups** and choose `GRP-ADM-APPROVERS`.

   > [!NOTE]
   > One group, included. Configurations that exclude groups are not supported here.

4. On *Exclusions*, add nothing and continue.

   > [!WARNING]
   > This page excludes enterprise applications from enforcement, and every entry is a hole in the control. Exclusions apply only to app-auth calls made through Microsoft Graph — delegated calls are always enforced — and they are capped at 50 applications per policy. If a service principal you excluded is compromised, it can change the protected resource with no approval at all.

5. On *Review + submit for approval*, enter a justification and select **Submit for approval**. Note that the button does not say *Create*.

   | Setting | Value |
   | --- | --- |
   | Business justification | **Setup — requiring a second administrator for script changes** |

   **Verify:** **Access policies** does **not** list a new policy. Instead a request appears under **My requests** showing *Name* **Approval required — Scripts - Create**, *Resource type* **Access policy**, and a status of **Needs approval** (some views label this **Needs review**).

6. Read that result carefully, because it looks like a failure and is not one.

   > [!IMPORTANT]
   > Nothing is wrong. Creating an access policy is itself a protected change, so what you produced is a pending request rather than a live policy — and until it is approved and completed, **script changes are not yet protected**. This is the automatic protection from exercise 1 doing its job on the very first policy.

7. In a private browser window, sign in as `patti.fernandez@<tenant>.onmicrosoft.com`, select **Tenant administration**, then **Multi Admin Approval**, then **Received requests**, open the request through its *Business justification* link, enter **Approver notes** and select **Approve request**.
   *Path:* **Tenant administration** > **Multi Admin Approval** > **Received requests**

   > [!NOTE]
   > Patti can do this only because of the custom role in task 1. Without *Approval for Multi Admin Approval* she can see the request and not act on it. The same requests are also reachable from **All requests** and from **Tenant administration** > **Admin tasks**.

8. Sign back in as `admin-intune`, open the request under **My requests**, and select **Complete**.
   *Path:* **Tenant administration** > **Multi Admin Approval** > **My requests**

   > [!IMPORTANT]
   > Approval is not application. The request sits at **Approved** until the original requester returns and selects **Complete**, which is what actually applies the change. Approve a request, walk away, and nothing happens.

   **Verify:** The request status reaches **Completed**, and **Access policies** now lists **Approval required — Scripts** with `GRP-ADM-APPROVERS` shown as the approver group.

**Results:** Script changes now require a second administrator's approval — and you have already used the approval workflow once to get here.

- [ ] The access policy exists for the **Scripts** profile type.
- [ ] The bootstrap request shows **Completed** in **My requests**.
- [ ] `GRP-ADM-APPROVERS` has a member who can sign in to Intune and approve.

### Exercise 3: Request, approve and reject

#### Task 1: Submit a change as the requester

1. Signed in as `admin-intune`, select **Devices**, then **Scripts and remediations**, then **Platform scripts**, then **Add** > **Windows 10 and later**. The blade that opens is titled **Add PowerShell script**.
   *Path:* **Devices** > **Scripts and remediations** > **Platform scripts** > **Add**

   > [!IMPORTANT]
   > Read the wizard's step list before you type anything: **Basics**, **Script settings**, **Scope tags**, **Review + submit for approval**. Four steps, and no **Assignments** page. In a tenant with no access policy this same wizard has five steps, carries an *Assignments* page and finishes at *Review + add*. Under multi-admin approval the create *is* the request, so the wizard stops where a justification is needed and assignment becomes a separate protected operation you perform after the script exists.

2. On *Basics*, name the script so that the approval flow is the only thing under test:

   | Setting | Value |
   | --- | --- |
   | Name | **MAA test script** |
   | Description | **Trivial script used to exercise the approval workflow** |

   *Save this as maa-test.ps1 before you start the wizard*
   ```powershell
   Write-Output "Multi-admin approval test. This script does nothing."
   ```

3. On *Script settings*, browse to the file and set the three toggles:

   | Setting | Value |
   | --- | --- |
   | Script location | **maa-test.ps1** <br> A file picker, not a path you type. The script must be under 200 KB. |
   | Run this script using the logged on credentials | **No** <br> System context. The portal default is Yes. |
   | Enforce script signature check | **No** <br> The portal default is Yes and maa-test.ps1 is unsigned. Leave it at Yes and the request still submits and approves cleanly — the script then fails on every device it reaches, long after the approval you were testing succeeded. |
   | Run script in 64 bit PowerShell Host | **No** <br> The portal default. Nothing in this script depends on the host architecture. |

4. On *Scope tags*, leave the default and select **Next**.

   > [!NOTE]
   > Scope tags and multi-admin approval are independent controls that are easy to confuse. A scope tag decides which administrators can see the script; the access policy decides who has to agree before it exists at all.

5. *Review + submit for approval* is where the wizard stops being the one you know. The summary is read-only, the final button reads **Submit for approval** rather than **Add**, and a justification is mandatory before it will submit.

   | Setting | Value |
   | --- | --- |
   | Business justification | **Testing the multi-admin approval workflow** |

   **Verify:** You are returned to **Platform scripts** and **MAA test script** is **not** in the list. It is held as a request until somebody approves it.

6. Check the request status under **Tenant administration** > **Multi Admin Approval** > **My requests**.
   *Path:* **Tenant administration** > **Multi Admin Approval** > **My requests**

   **Verify:** The request is listed as **Needs approval** with your justification, the operation **Create**, and the time you submitted it.

   > [!NOTE]
   > Intune notifies nobody. If a request matters, tell an approver out of band — and remember it **expires after three days** and has to be resubmitted. You can withdraw it yourself with **Cancel request** while it is still pending, and while it is pending you cannot submit another request against the same object.

**Results:** A protected change is queued rather than applied.

- [ ] **My requests** shows the request as **Needs approval**.
- [ ] The script is absent from **Platform scripts**.

#### Task 2: Approve and complete, then reject one

1. In a private browser window, sign in as `patti.fernandez@<tenant>.onmicrosoft.com`.

2. Select **Tenant administration**, **Multi Admin Approval**, then **Received requests**.
   *Path:* **Tenant administration** > **Multi Admin Approval** > **Received requests**

3. Select the *Business justification* link to open the request and review what it will change.

   > [!IMPORTANT]
   > The approver sees the full payload of the change, not just its name. This is the point of the feature — approval is meaningless if the approver cannot see what they are agreeing to.

4. Enter **Approver notes** and select **Approve request**.

5. Sign back in as `admin-intune`, open the request under **My requests**, select **Complete**, and confirm the script now exists under **Platform scripts**.

   **Verify:** The request reads **Completed**, and **MAA test script** is listed — with no assignments, because the wizard never offered you any.

   > [!NOTE]
   > If the script is still missing after **Complete**, check the portal notifications. Intune reports there whether applying the approved change succeeded or failed.

6. Now give the script an audience. Select **Devices**, then **Scripts and remediations**, then the **Platform scripts** tab, then select **MAA test script** to open it.
   *Path:* **Devices** > **Scripts and remediations** > **Platform scripts** > **MAA test script**

7. The script opens on **Overview**. Under *Manage* in the left-hand menu, select **Properties**. That page lists the script's sections — *Basics*, *Script settings*, *Scope tags* and *Assignments* — each with its own **Edit** link. Select **Edit** beside *Assignments*.

   > [!NOTE]
   > **Properties** is where every change to an existing script starts, and there is no *Assignments* entry in the left-hand menu to shortcut to. The two entries under *Monitor* — **Device status** and **User status** — report on where the script has already run; they do not target it anywhere new.

8. Select **Add groups**, tick `GRP-USR-PILOT`, choose **Select**, then **Review + save**. Because the script is a protected resource, saving asks for a justification and the final button reads **Submit for approval** rather than **Save**.

   | Setting | Value |
   | --- | --- |
   | Business justification | **Assigning the test script to the pilot group** |

   **Verify:** A second request appears under **My requests** for the same script, this time with the operation **Assign** rather than **Create**. The script stays unassigned until that request is approved and completed too.

   > [!IMPORTANT]
   > Every action on a protected resource is protected — create, edit, assign and delete each raise their own request. That is the real cost of the control, and it is why the wizard dropped its *Assignments* page: putting a script in front of a group is a decision somebody has to agree with separately from writing the script.

9. Select that pending **Assign** request under **My requests** and select **Cancel request**.

   > [!NOTE]
   > Withdraw it rather than approving it, for a reason worth remembering: while a request is pending against an object, no further request can be submitted for that object. Leave the assignment pending and the deletion in the next step is refused.

10. Now exercise the rejection path: delete the script, supply a justification, and this time have Patti **Reject request** with a note explaining why.

    **Verify:** The script remains in place and **My requests** shows the request as **Rejected** with the approver's note. A rejected request makes no change at all, and there is nothing to complete.

**Results:** You have driven the approval workflow from both sides and seen both outcomes.

- [ ] An approved request applied its change only after **Complete**.
- [ ] Assigning the approved script raised a second request, with the operation **Assign**.
- [ ] A rejected request left the tenant unchanged and recorded the reason.

### Troubleshooting

**Symptom:** The **Add PowerShell script** wizard has no **Assignments** page, so there is no way to target the script at a group while creating it.

- **Root cause:** An access policy protects the **Scripts** profile type. The create becomes a request, the wizard ends at *Review + submit for approval* rather than *Review + add*, and assignment is a separate protected operation rather than a page in the wizard.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > Access policies
  Look for a policy whose profile type is Scripts.
  ```

- **Resolution:** Submit the script, have it approved, select **Complete**, then assign it — that assignment raises its own request with the operation **Assign**, which needs approving and completing in turn. Nothing is broken and nothing needs changing.

**Symptom:** You created an access policy but **Access policies** is empty, and a request with resource type **Access policy** is sitting at **Needs approval**.

- **Root cause:** Working as intended. Access policies are protected automatically, so creating one is itself a change a second administrator has to approve. Nothing is enforced until that request is approved and the requester selects **Complete**.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > My requests
  Look for Name '[policy name] - Create', Resource type 'Access policy', Status 'Needs approval'.
  ```

- **Resolution:** Have a different administrator who holds the *Approval for Multi Admin Approval* permission approve it from **Received requests**, then sign back in as the requester and select **Complete**. A Global Administrator can do this without extra setup; a **Read Only Operator** cannot, because that role does not include the permission. If nobody suitable exists yet, select **Cancel request**, grant the permission through a custom role, and resubmit — the request expires after three days regardless.

**Symptom:** Nobody can change a protected resource, and every request sits pending forever.

- **Root cause:** The approver group has no usable members. Common causes: it is a Microsoft 365 group or distribution list rather than a security group, it is not assigned to any Intune role so Intune stripped its members, its members are nested rather than direct, or its only member is the same account submitting the requests — and no administrator can approve their own request.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > Access policies
  Open the policy, note the approver group, then check in Entra ID:
    - group type is Security
    - members are direct, not nested
  Tenant administration > Roles > All roles
    - the group appears as a member group on a role assignment
  ```

- **Resolution:** Fix the group, then resubmit. Editing or deleting the access policy is itself a protected change needing approval, so repair the group rather than reaching for the policy. Always name a security group with at least two direct members, and assign it to an Intune role.

**Symptom:** After creating an access policy for **Role-based access control**, no RBAC change can be made — including the role assignments multi-admin approval itself depends on.

- **Root cause:** The Role profile type protects every role-related change: role permissions, admin groups and member group assignments. If the approver group's role assignment is not already correct, you cannot fix it, because fixing it needs an approval the broken configuration cannot produce.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > Access policies
  Look for a policy whose profile type is Role-based access control.
  ```

- **Resolution:** Delete the access policy configured for the Role profile type, wait 3-5 minutes for the change to propagate, then complete the RBAC assignments under **Tenant administration** > **Roles** and add the approver group to a role assignment. Re-create the Role policy afterwards if you want it. Avoid the deadlock entirely by configuring every other access policy and verifying RBAC assignments before you enable a Role policy.

**Symptom:** An administrator says approval is not being requested for configuration profile changes.

- **Root cause:** An access policy exists for one profile type only. Each protected resource needs its own access policy.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > Access policies
  ```

- **Resolution:** Create an additional access policy with the profile type set to the resource you want to protect. Policies do not cascade across resource types. Remember that creating that policy is itself a change requiring approval.

**Symptom:** A Graph script or third-party tool that used to work now fails against a protected resource.

- **Root cause:** Multi-admin approval is enforced on application-authenticated Graph calls as well as interactive admin actions, so automation that writes to a protected resource is intercepted the same way a portal click is.
- **Diagnostic:**

  ```text
  Tenant administration > Multi Admin Approval > My requests
  Check whether the automation's calls are appearing as pending requests.
  ```

- **Resolution:** Update the automation to submit a business justification and handle the approval workflow. Excluding the application on the policy's *Exclusions* page is possible but removes the protection for that app, and works only for app-auth calls — delegated calls are always enforced.

### Knowledge check

**Q1.** You enable multi-admin approval for Apps and name an approver group containing only your own administrator account. What happens when you submit an app change?

A. The access policy fails to save
B. The change applies immediately because you are in the approver group
C. The request is created and you can approve it yourself
D. The request sits at Needs approval until it expires, because nobody may approve their own request

<details><summary>Answer</summary>

**D** — An administrator can never approve their own request, whatever role they hold and whether or not they are in the approver group. The request is created, appears on **All requests** where you can see but not action it, and expires after three days — leaving Apps effectively read-only for the tenant. The approver group has to contain somebody else.

*Exam tip:* The control is technical, not merely procedural: Intune enforces the second person rather than just recommending one. Name at least two approvers, and never make the requesting account the only approver.

</details>

**Q2.** You are the first administrator to configure multi-admin approval in a tenant. You create an access policy for Scripts and select Submit for approval. What is the immediate result?

A. An error, because no access policy protects access policies yet
B. A pending request with resource type Access policy — the policy is not active and scripts are not yet protected
C. The policy is created but disabled until you enable it
D. The policy is created and active, because the first policy has nothing to be approved by

<details><summary>Answer</summary>

**B** — Access policies are protected automatically, which is why **Access policy** is not offered as a profile type. That protection applies to the very first policy too: creating it produces a request a different administrator holding *Approval for Multi Admin Approval* must approve, after which the requester selects **Complete** to apply it. Until then nothing is enforced.

*Exam tip:* Remember the three-step shape of every protected change: submit with a justification, somebody else approves, the requester completes. Approval alone does not apply the change.

</details>

**Q3.** Patti is a direct member of the approver group named on your Scripts access policy, and the group is assigned the Read Only Operator role. She can see a pending access policy request but cannot approve it. Why?

A. Read Only Operator cannot be used as an approver role for any request type
B. Her membership is nested rather than direct
C. Approving an access policy request needs the Approval for Multi Admin Approval permission, which Read Only Operator does not include
D. Access policy requests can only be approved by a Global Administrator

<details><summary>Answer</summary>

**C** — Approving a change to a protected resource needs *Read* on that resource, but approving a change to an access policy needs the separate *Approval for Multi Admin Approval* permission in the **Multi Admin Approval** category. Read Only Operator grants the reads and not that permission, so Patti can approve script requests but not access policy requests until a custom role supplies it.

*Exam tip:* Distinguish the three MAA roles: the access policy manager creates policies, the approver approves requests, and the requestor submits and completes changes. They need different permissions.

</details>

---

# Module 2 — Device enrollment

Get Windows and Android devices under management: enrollment settings, automatic enrollment, restrictions and corporate identifiers, every Windows enrollment path, Android Enterprise, and what to do when enrollment fails.

## Lab 10: Automatic enrollment, enrollment settings and Company Portal branding

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

A device that joins Microsoft Entra ID does not automatically become managed by Intune. Automatic enrollment is the setting that connects those two events, and without it you get exactly what lab 5 produced: a joined device with no management. You will turn it on, brand the enrollment experience so users can tell it is legitimate, and understand why the MDM user scope is the single most consequential toggle in this blade — and why it takes a Global Administrator to move it.

### Objectives

After completing this lab, you will be able to:

- Configure automatic MDM enrollment for Windows and understand the MDM user scope against the WIP (formerly MAM) user scope
- Apply organisation branding so the sign-in and Company Portal experience is recognisable
- Confirm a joined device enrolls into Intune without further action
- Read the enrollment status of a device from both the client and the portal

### Exam objectives covered

- `g1.t2.s1` — Configure enrollment settings in Microsoft Intune
- `g1.t2.s2` — Configure automatic enrollment for Windows

### Prerequisites

- Completed labs: `device-identity`, `intune-rbac`
- Licences: M365-E5, ENTRA-P2
- Roles: Global Administrator, Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11 Pro)
- Personas: alex.wilber, helpdesk.operator

### Exercise 1: Enable automatic enrollment

#### Task 1: Configure the MDM user scope

1. Sign in to the **Microsoft Intune admin center** as the **Global Administrator** for your trial tenant — the signup account you first used in lab 0. This one page needs it.

   > [!IMPORTANT]
   > Automatic enrollment is shown inside Intune but is not an Intune setting. The page writes the **Mobility (MDM and MAM)** application configuration in Microsoft Entra ID, and only **Global Administrator** may change that — **Intune Administrator** is not enough. Signed in as `admin-intune` you can open this blade and read every field, and **Save** fails or the controls are greyed out. It looks like a bug and it is a permission.

   > [!CAUTION]
   > Use the tenant's own Global Administrator, **not** `admin-breakglass`. The emergency account is not a spare Global Administrator to reach for whenever a page needs one — lab 4 gives it a passphrase stored outside the tenant precisely so that using it is inconvenient, and makes its sign-ins discoverable so that one appearing means something. Spend it on a settings page and every future sign-in is noise you have trained yourself to ignore. Break-glass is for when normal administrative access has failed, which is not the case here.

   > [!NOTE]
   > This is a deliberate exception to the rule from lab 4 that you work as `admin-intune`, and it is the only task in this lab that needs one. Sign back in as `admin-intune` as soon as the page is saved.

2. Select **Devices**, then **Enrollment**, then on the **Windows** tab select **Automatic Enrollment**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Automatic Enrollment**

3. Set the scopes. The blade holds two, one above the MDM URLs and one below them:

   | Setting | Value |
   | --- | --- |
   | MDM user scope | **All** <br> The first setting on the page. In production you would scope this to a group during a phased rollout. |
   | Windows Information Protection (WIP) user scope | **None** <br> Further down, under the MDM URLs. This is the setting older documentation and exam material call the MAM user scope — the portal renamed it and there is no field labelled MAM here any more. Leave it at None. |

   > [!IMPORTANT]
   > These two scopes do different things and overlap badly. **MDM user scope** enrolls the whole device into management when the user joins or adds a work account. The **WIP user scope** — the MAM user scope under its old name — applies application management to Windows without enrolling the device. If a user is in both scopes on a personal device, Windows applies app management and the device is *not* MDM-enrolled, which looks exactly like automatic enrollment being broken.

   > [!NOTE]
   > The blade shows an information banner reading that creating new WIP without enrollment policies is no longer supported, and Windows Information Protection is deprecated. The scope setting is still there and still capable of intercepting your enrollments, which is the only reason this lab makes you look at it. Answer **MAM user scope** if the exam asks — the concept did not change with the label.

4. Leave everything between the two scopes alone — the three MDM URLs and the **Disable MDM enrollment when adding work or school account on Windows** toggle — then select **Save**.

   | Setting | Value |
   | --- | --- |
   | Disable MDM enrollment when adding work or school account on Windows | **No** <br> The default. Set it to Yes and you block the automatic enrollment you have just turned on. |

   > [!NOTE]
   > The **MDM terms of use URL**, **MDM discovery URL** and **MDM compliance URL** are pre-populated for Intune, and **Restore default MDM URLs** puts them back if you edit one by accident. You would only change them if a third-party MDM were the authority, which is a scenario the exam occasionally uses to test whether you know these exist. The WIP URLs below them are in the same position for app management and stay untouched.

**Results:** Windows devices joining Microsoft Entra ID will now enroll into Intune automatically.

- [ ] **MDM user scope** is set to **All**.
- [ ] **Windows Information Protection (WIP) user scope** — the MAM user scope — is set to **None**.
- [ ] **Save** succeeded rather than erroring, which confirms you were signed in as a Global Administrator — and that you did not need `admin-breakglass` to do it.

#### Task 2: Review the remaining enrollment settings

1. Still under **Devices** > **Enrollment**, open **Enrollment notifications** and note that you can send a branded message when a device enrolls.
   *Path:* **Devices** > **Enrollment** > **Enrollment notifications**

2. In the left navigation menu under **Devices**, expand **Manage devices**, select **Device categories**, then select **Create**:
   *Path:* **Devices** > **Manage devices** > **Device categories** > **Create**

   | Setting | Value |
   | --- | --- |
   | Name | **Shared workstation** |
   | Description | **Multi-user devices in retail locations** |

   a. On the **Basics** tab, enter the **Name** and **Description** from above, then select **Next**.
   b. On the **Scope tags** tab, leave **Default** assigned, then select **Next**.
   c. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > Device categories do **not** prompt Windows users during enrollment. The interactive Company Portal selection prompt is exclusive to iOS/iPadOS, macOS, and Android during Company Portal enrollment. On Windows, categories must be manually assigned by an administrator in Intune under **Devices** > **All devices** > select device > **Properties**, or self-selected by the user via the Company Portal web portal at `portal.manage.microsoft.com` under **Devices** > **Category**. Do not expect `MD102-VM2-Alex` to prompt for a category when enrolled in Exercise 3.

   > [!TIP]
   > When device categories exist, mobile users are prompted to pick one during enrollment, and the choice can drive dynamic group membership through `device.deviceCategory`. It is an effective way to let users self-classify hardware you cannot pre-register.

**Results:** You know where device categories and enrollment notifications live, and how categories behave across different operating systems.

- [ ] The **Shared workstation** category appears under **Devices** > **Manage devices** > **Device categories**.

### Exercise 2: Brand the experience

#### Task 1: Configure company branding and Company Portal

1. In the **Microsoft Entra admin center**, select **Custom branding**, then **Default sign-in**, then **Customize**.
   *Path:* **Custom branding** > **Default sign-in** > **Customize**

2. Set a sign-in page background colour and a banner logo. Any image will do — the point is that it is visibly yours.

   > [!NOTE]
   > Branding is a security control, not decoration. Users are being asked to hand over corporate credentials during enrollment; a generic Microsoft page is indistinguishable from a phishing page, whereas a branded one gives them something to check.

3. In the **Microsoft Intune admin center**, select **Tenant administration**, then under **End user experiences** select **Customization**. Select the **Default** policy from the table, then select **Edit**.
   *Path:* **Tenant administration** > **End user experiences** > **Customization** > **Default** > **Edit**

4. Configure the Company Portal:

   | Setting | Value |
   | --- | --- |
   | Organization name | **Contoso** |
   | Support contact name | **Contoso Service Desk** |
   | Support email address | **helpdesk.operator@<tenant>.onmicrosoft.com** |
   | Show in Company Portal — Privacy statement | **Configured** <br> Users are told what the organisation can and cannot see on their device. |
   | Let users select device categories in the Company Portal | **Show** <br> Under Device categories. Enables the category selection prompt during enrollment so users can pick the 'Shared workstation' category created in Task 2. |

5. Select **Review + save**.

**Results:** The sign-in page and Company Portal identify the organisation and provide a support route.

- [ ] The tenant sign-in page shows your branding in a private browser window.
- [ ] **Customization** shows your support contact details.

### Exercise 3: Prove automatic enrollment works

#### Task 1: Enroll the joined device

1. Start **MD102-VM2-Alex** and sign in as `alex.wilber@<tenant>.onmicrosoft.com`.

2. The device joined Microsoft Entra ID in lab 5, before automatic enrollment existed. Trigger enrollment now:
   *Path:* **Settings** > **Accounts** > **Access work or school**

   a. Select the work account entry, then select **Info**.
   b. If a **Connect** or **Enroll only in device management** option appears, use it.
   c. Otherwise sign out and back in — automatic enrollment is evaluated at sign-in.
   d. Alternatively, trigger enrollment from an elevated prompt with `DeviceEnroller.exe /c /AutoEnrollMDM`.

3. Confirm enrollment from the client (run in PowerShell on **MD102-VM2-Alex**):

   ```powershell
   dsregcmd /status
   ```

   **Verify:** Under **Device State**, `AzureAdJoined : YES`. Under **Tenant Details**, an **MdmUrl** is present. An empty MdmUrl means the device is joined but unmanaged.

4. Check the management registry keys where enrollment records itself (run in an elevated Administrator PowerShell session on **MD102-VM2-Alex**):

   ```powershell
   Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments" |
       ForEach-Object { Get-ItemProperty $_.PSPath } |
       Where-Object { $_.UPN } |
       Select-Object UPN, ProviderID, EnrollmentState |
       Format-Table -AutoSize
   ```

   **Verify:** A row shows `ProviderID` of `MS DM Server` and `EnrollmentState` of `1`.
   ```
   UPN                              ProviderID   EnrollmentState
   ---                              ----------   ---------------
   alex.wilber@contoso.onmicros...  MS DM Server               1
   ```

5. In the **Microsoft Intune admin center**, select **Devices** > **All devices** and confirm the device appears.
   *Path:* **Devices** > **All devices**

   > [!TIP]
   > The device appears in Intune under its Windows hostname (e.g. `DESKTOP-XXXXXXX`), not the Hyper-V VM name `MD102-VM2-Alex`. You can identify it by looking for **Alex Wilber** in the **Primary user** column or checking the **Management name**.

   **Verify:** The device (listed under its Windows hostname, e.g. `DESKTOP-...`) is listed with **Managed by** of **Intune** and an **Ownership** of **Personal** — ownership is corrected in lab 11.

6. Lab 7 left one check unfinished for want of a device. Finish it now: open a private window, sign in as `helpdesk.operator@<tenant>.onmicrosoft.com`, then open **Devices** > **All devices** and select the device (e.g. `DESKTOP-XXXXXXX`).
   *Path:* **Devices** > **All devices**

   > [!IMPORTANT]
   > If the device does not appear for `helpdesk.operator`: verify that the **Help Desk — all devices** role assignment from lab 7 has the **Default** scope tag assigned (**Tenant administration > Roles > All roles > Help Desk Operator > Assignments > Properties**). If **Scope tags** shows **No**, the operator cannot see any objects carrying the Default tag. Also, if you already completed lab 8 and scoped the role to `TAG-FINANCE`, ensure the device carries `TAG-FINANCE` under its Properties > Scope tags and has Alex Wilber set as Primary user.

   **Verify:** The operator sees the device, and remote actions such as **Sync**, **Restart** and **Retire** are offered. That completes the Help Desk Operator proof from lab 7: read widely, act where the role allows, author nothing.

   > [!NOTE]
   > The same blade that was legitimately empty in lab 7 now has a row in it, and not one permission changed in between. Worth remembering the next time an operator reports they cannot see a device: the role is only one of the two things that has to be true.

**Results:** A Microsoft Entra joined device is now managed by Intune without any manual enrollment step.

- [ ] The device appears in **All devices** managed by Intune.
- [ ] `dsregcmd /status` shows an **MdmUrl**.
- [ ] `helpdesk.operator` can run remote actions on the device, closing the lab 7 check.

### Troubleshooting

**Symptom:** A Microsoft Entra joined Windows device never appears in Intune.

- **Root cause:** Automatic enrollment is off, the user is outside the MDM user scope, or the user is inside the WIP (MAM) user scope — in which case Windows applies app management instead of enrolling the device. A fourth possibility is that the change was never saved: only a Global Administrator can write this page, and an Intune Administrator's Save does not take.
- **Diagnostic:**

  ```powershell
  dsregcmd /status   # Tenant Details > MdmUrl should be populated
  Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments"
  ```

- **Resolution:** Signed in as a Global Administrator, set **MDM user scope** to **All** or to a group containing the user, and set the **Windows Information Protection (WIP) user scope** to **None** for devices you intend to fully manage. Save, then have the user sign out and back in — the scope is evaluated at sign-in.
- **Error codes:** `0x80180018`

**Symptom:** The device is enrolled and visible to the administrator, but does not appear in Devices > All devices for helpdesk.operator.

- **Root cause:** The Help Desk Operator role assignment has no scope tags assigned (showing 'No' under Scope tags), which hides all objects carrying the Default scope tag. Alternatively, if lab 8 was completed early, the role may be scoped to TAG-FINANCE while the device only carries Default, or the device lacks an assigned Primary user. Finally, the operator may be scanning for the Hyper-V name 'MD102-VM2-Alex' instead of the Windows computer name ('DESKTOP-XXXXXXX').
- **Diagnostic:**

  ```text
  1. In admin session: Tenant administration > Roles > All roles > Help Desk Operator > Assignments > Properties > Scope tags.
  2. In admin session: Devices > All devices > [Device] > Properties > Scope tags and Primary user.
  ```

- **Resolution:** Ensure the Help Desk Operator assignment includes the Default scope tag (or add TAG-FINANCE to the device). Confirm Alex Wilber is set as the Primary user on the device, and verify the operator looks for the Windows computer name (e.g. DESKTOP-...) rather than the VM name.

### Knowledge check

**Q1.** Users report that their Microsoft Entra joined Windows devices are not enrolling into Intune, although they can sign in and access corporate resources. Automatic enrollment shows MDM user scope set to All. What should you check next?

A. Whether the devices have a device category assigned
B. Whether the MDM discovery URL has been customised
C. Whether the users are also in the WIP (MAM) user scope
D. Whether the users have a Microsoft Entra ID P2 licence

<details><summary>Answer</summary>

**C** — When a user falls in both the MDM and the WIP user scopes, Windows applies application management rather than enrolling the device into MDM. The device stays joined and functional but never becomes managed, which matches the symptom exactly. The portal labels that second scope **Windows Information Protection (WIP) user scope**; documentation and exam questions still call it the MAM user scope.

*Exam tip:* MDM scope enrolls the device; MAM scope manages apps without enrolling. Overlapping them is a classic exam distractor and a real-world misconfiguration.

</details>

---

## Lab 11: Enrollment restrictions, device limits and corporate identifiers

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Automatic enrollment now lets anything in. Contoso wants Windows and Android corporate devices managed, personally owned Windows blocked from full enrollment, and a hard limit on how many devices one person can bring. You will build those restrictions, then flip a device from Personal to Corporate using a corporate identifier — which is also how you fix the ownership problem that stopped `GRP-DEV-WIN-CORP` populating in lab 6.

### Objectives

After completing this lab, you will be able to:

- Create platform restrictions that allow, block and version-gate each platform
- Set a device limit restriction and understand how it differs from the Entra device quota
- Import corporate device identifiers to mark devices as company-owned
- Change a device's ownership and watch a dynamic group repopulate
- Map enrollment error codes to the restriction that caused them

### Exam objectives covered

- `g1.t2.s1` — Configure enrollment settings in Microsoft Intune

### Prerequisites

- Completed labs: `enrollment-settings`, `groups-for-devices`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11 Pro)
- Personas: alex.wilber, joni.sherman

### Exercise 1: Platform restrictions

#### Task 1: Create a corporate platform restriction

1. In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then **Device platform restrictions**.
   *Path:* **Devices** > **Enrollment** > **Device platform restrictions**

2. Note the built-in default restriction first.

   > [!IMPORTANT]
   > **All Users** is a built-in restriction at the lowest priority that allows every platform. You cannot delete it and you cannot change its priority. Any restriction you create sits above it and wins for the users it targets — which means a restriction that appears to do nothing is usually one that was never assigned to a group.

3. Select **Create restriction** > **Windows restriction**, then configure through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **WIN-Corporate-Only** |
   | Windows (MDM) | **Allow** |
   | Allow personally owned devices | **Block** |
   | Minimum OS version | **10.0.22000** <br> Windows 11 baseline. Below this, enrollment is refused. |
   | Maximum OS version | **Leave blank** |

   a. On the **Basics** tab, enter Name `WIN-Corporate-Only`, then select **Next**.
   b. On the **Platform settings** tab, set **Windows (MDM)** to **Allow**, **Personally owned** to **Block**, and set **Min OS** to `10.0.22000`, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, select **Add groups**, choose `GRP-USR-FINANCE` and `GRP-USR-IT`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

4. Create a second restriction for the BYOD population using the **Create restriction** > **Windows restriction** wizard:

   | Setting | Value |
   | --- | --- |
   | Name | **WIN-BYOD-AppProtectionOnly** |
   | Windows (MDM) | **Block** <br> These users get app protection policies instead of device enrollment. |
   | Assignment | **GRP-USR-BYOD** |

   a. On the **Basics** tab, enter Name `WIN-BYOD-AppProtectionOnly`, then select **Next**.
   b. On the **Platform settings** tab, set **Windows (MDM)** to **Block**, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-USR-BYOD`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!NOTE]
   > Blocking MDM enrollment does not cut these users off. Lab 36 gives them app protection policies, which secure corporate data inside apps on an unmanaged device — the intended answer for personally owned hardware.

5. Check the priority order in the list. Drag `WIN-Corporate-Only` above `WIN-BYOD-AppProtectionOnly` if it is not already.

   > [!WARNING]
   > A user who is in both groups gets the restriction with the **lowest priority number**, and only that one. Restrictions do not merge. Joni is in `GRP-USR-BYOD` and `GRP-USR-SALES`; if you later assign a corporate restriction to Sales, priority decides which applies.

**Results:** Enrollment is gated by platform, ownership and OS version, with an explicit priority order.

- [ ] Two restrictions exist above **All Users**.
- [ ] You can state which restriction applies to a user in both groups.

#### Task 2: Set a device limit

1. Select **Devices**, then **Enrollment**, then **Device limit restrictions**.
   *Path:* **Devices** > **Enrollment** > **Device limit restrictions**

2. Select **Create restriction** and configure through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **LIMIT-Standard-3** |
   | Device limit | **3** |
   | Assignment | **GRP-USR-FINANCE** |

   a. On the **Basics** tab, enter Name `LIMIT-Standard-3`, then select **Next**.
   b. On the **Device limit** tab, select `3`, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, select **Add groups**, select `GRP-USR-FINANCE`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > This limit is enforced by Intune and returns `0x80180026` when exceeded. Microsoft Entra ID has a *separate* per-user device quota under **Devices** > **Device settings**, which returns `0x801c03f2`. Raising one does not raise the other, and confusing them costs a lot of time because both present as a device that will not enroll.

**Results:** Finance users may enroll at most three devices each.

- [ ] **Device limit restrictions** lists the new restriction assigned to Finance.

### Exercise 2: Corporate device identifiers

A device enrolled by hand through Settings is marked **Personal** by default. Corporate identifiers are how you tell Intune that a device is company property before it ever enrolls.

#### Task 1: Import an identifier and change ownership

1. On **MD102-VM2-Alex**, get the serial number that Intune will match against:

   ```powershell
   Get-CimInstance -ClassName Win32_BIOS | Select-Object SerialNumber
   ```

   > [!NOTE]
   > Hyper-V generates a serial number for each virtual machine, so this works in the lab exactly as it would on physical hardware. Record the value.

2. On your host workstation, create a CSV file named `corporate-identifiers.csv` with no header row, containing the identifier and an optional description:

   *corporate-identifiers.csv — save on host or management workstation with no header row*
   ```text
   1234-5678-9012-3456-7890-1234-56,Finance laptop - Alex Wilber
   ```

   > [!WARNING]
   > No header row. A header line is treated as a device identifier, fails to match anything, and the import reports success — so the file looks accepted and nothing works.

3. In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, then **Corporate device identifiers**.
   *Path:* **Devices** > **Enrollment** > **Corporate device identifiers**

4. Select **Add identifiers**, choose **Upload CSV file**, set the identifier type to **Serial number**, and upload your file.

5. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex**, and select **Properties**. The device is already enrolled, so the identifier will not retroactively change it. Change ownership directly:
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Properties**

   a. Next to **Device ownership**, select **Corporate**.
   b. Select **Save**.

   > [!TIP]
   > Corporate identifiers apply at enrollment time. For a device that is already enrolled you change ownership by hand; for everything you buy in future, importing the serial numbers before deployment means ownership is correct from the first enrollment.

**Results:** The device is marked as corporate-owned and future devices with imported serials will enroll as corporate automatically.

- [ ] **Corporate device identifiers** lists your serial number.
- [ ] `MD102-VM2-Alex` shows **Ownership: Corporate** in **All devices**.

#### Task 2: Watch the dynamic group repopulate

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-DEV-WIN-CORP**, then select **Members**.
   *Path:* **Groups** > **All groups** > **GRP-DEV-WIN-CORP** > **Members**

   > [!NOTE]
   > In lab 6 this group was empty because the rule requires `device.deviceOwnership -eq "Company"` and the device was Personal. Changing ownership changes the directory attribute, and the rule re-evaluates. Allow several minutes.

2. Refresh until `MD102-VM2-Alex` appears.

   **Verify:** The device is now a member. This is the whole chain working end to end: ownership on the Intune object drives the directory attribute, which drives dynamic group membership, which drives every policy assignment for the rest of this course.

3. Note the ownership values as they appear in each place:

   | Surface | Corporate shows as | Personal shows as |
   | --- | --- | --- |
   | Intune portal device list | Corporate | Personal |
   | Microsoft Entra device attribute | `Company` | `Personal` |
   | Dynamic membership rule literal | `"Company"` | `"Personal"` |

**Results:** Ownership drives group membership, and you have seen the full chain operate.

- [ ] `GRP-DEV-WIN-CORP` contains the device.
- [ ] You can explain why the rule literal differs from the portal label.

### Troubleshooting

**Symptom:** A user cannot enroll a device and receives `0x80180014`.

- **Root cause:** A platform restriction is blocking the attempt: the platform is blocked, personally owned devices are blocked, or the OS version is outside the configured minimum or maximum.
- **Diagnostic:**

  ```text
  Devices > Enrollment > Device platform restrictions
  Check which restriction applies to that user, and its priority relative to others.
  ```

- **Resolution:** Either relax the restriction, or make the device corporate by importing its serial number under **Corporate device identifiers** before enrollment.
- **Error codes:** `0x80180014`

**Symptom:** Enrollment fails with `0x80180026` for a user who owns only two devices.

- **Root cause:** Stale device records count toward the limit. Devices that were wiped or rebuilt without being retired in Intune still occupy a slot.
- **Diagnostic:**

  ```powershell
  Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
  Get-MgDeviceManagementManagedDevice -All |
      Where-Object UserPrincipalName -eq "alex.wilber@<tenant>.onmicrosoft.com" |
      Select-Object DeviceName, LastSyncDateTime, ManagementState
  ```

- **Resolution:** Retire the stale records, or raise the device limit restriction. Lab 15 covers automatic cleanup rules so this stops recurring.
- **Error codes:** `0x80180026`, `0x801c03f2`

### Knowledge check

**Q1.** A user belongs to two groups, each assigned a different Windows enrollment restriction. One allows personally owned devices and one blocks them. What happens?

A. The two restrictions merge and the most restrictive setting wins
B. Enrollment is blocked because the restrictions conflict
C. The restriction with the lowest priority number applies, and only that one
D. The built-in All Users restriction applies instead

<details><summary>Answer</summary>

**C** — Enrollment restrictions do not merge. Intune evaluates priority and applies a single restriction — the one with the lowest priority number. This is different from compliance and configuration policy, where the most restrictive setting generally wins.

*Exam tip:* Enrollment restrictions: priority decides, one winner. Configuration profiles: conflicts leave the setting unapplied. Compliance: most restrictive wins. Keep those three straight.

</details>

**Q2.** You import a CSV of serial numbers under Corporate device identifiers. Devices already enrolled still show as Personal. Why?

A. Serial numbers are only supported for iOS and Android
B. The devices must be added to a dynamic group before ownership updates
C. Corporate identifiers are evaluated at enrollment time and do not change existing records
D. The CSV requires a header row that was missing

<details><summary>Answer</summary>

**C** — The identifier list is consulted when a device enrolls, to decide ownership at that moment. Devices already enrolled keep whatever ownership they were given, and must be changed individually in the device's properties.

*Exam tip:* Import identifiers before deployment. And remember the CSV takes no header row — a header is parsed as a device identifier and silently matches nothing.

</details>

---

## Lab 12: Every Windows enrollment path

**Access:** Hands-on · **Estimated time:** 65 minutes · **Difficulty:** intermediate

### Lab scenario

There is more than one way to get a Windows device under management, and the exam expects you to pick the right one from a scenario rather than reciting the one you happen to use. You will join a device during the out-of-box experience, build a bulk provisioning package for devices that arrive pre-imaged, and understand where Group Policy enrollment fits for an existing domain estate.

### Objectives

After completing this lab, you will be able to:

- Join a device to Microsoft Entra ID during the out-of-box experience
- Create a bulk enrollment provisioning package with Windows Configuration Designer
- Describe Group Policy based automatic enrollment for hybrid joined devices
- Choose the correct enrollment path for a given scenario
- Complete the scoped administration proof deferred from lab 8

### Exam objectives covered

- `g1.t1.s2` — Join devices to Microsoft Entra ID
- `g1.t2.s2` — Configure automatic enrollment for Windows

### Prerequisites

- Completed labs: `enrollment-restrictions`, `scope-tags-and-aus`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: vm1-adele (Windows 11 Pro), Windows Configuration Designer
- Personas: adele.vance, alex.wilber, helpdesk.operator

### Exercise 1: Choose the path

#### Task 1: Match scenario to enrollment method

1. Read the table. The exam presents these as scenarios and expects one answer.

   | Scenario | Method | Result |
   | --- | --- | --- |
   | New device, out of the box, user present | Entra join at the out-of-box experience | Entra joined, auto-enrolled |
   | New device, out of the box, zero touch wanted | Windows Autopilot | Entra joined, auto-enrolled, configured before first sign-in |
   | Devices already imaged, no per-device user | Bulk enrollment provisioning package | Entra joined, enrolled with a device enrollment token |
   | User's own device, corporate data only | Add work or school account | Entra registered |
   | Existing domain-joined estate | Group Policy automatic enrollment | Hybrid Entra joined, auto-enrolled |
   | Device already Entra joined but unmanaged | Enroll only in device management | Enrolled without changing join state |

   > [!IMPORTANT]
   > Bulk enrollment uses a **device enrollment token** rather than a user's credentials, so the resulting device has no primary user. That makes it right for shared and kiosk hardware and wrong for anything where per-user targeting matters — user-targeted policies never reach a device with no user.

**Results:** You can pick an enrollment method from a requirement.

- [ ] You can name the method that produces a device with no primary user.

### Exercise 2: Join during the out-of-box experience

#### Task 1: Reset VM1 and join it as Adele

1. On **MD102-VM1-Adele**, remove the registration from lab 5 so you start clean.
   *Path:* **Settings** > **Accounts** > **Access work or school**

   a. Select Joni's work account entry and select **Disconnect**.
   b. Confirm, then restart the machine.

2. Reset the device so it returns to the out-of-box experience.
   *Path:* **Settings** > **System** > **Recovery** > **Reset this PC**

   | Setting | Value |
   | --- | --- |
   | Option | **Remove everything** |
   | Reinstall method | **Local reinstall** |
   | Clean data | **No** <br> Faster, and this is a lab. |

   > [!TIP]
   > This takes fifteen to twenty minutes. It is also a good moment to appreciate why lab 2 asked you to checkpoint VM3 instead of resetting it — reverting a checkpoint takes seconds.

3. At the out-of-box experience, work through region and keyboard, connect to the network, and when asked how to set up the device choose **Set up for work or school**.

4. Sign in as `adele.vance@<tenant>.onmicrosoft.com` and complete the flow.

   > [!NOTE]
   > Choosing **Set up for work or school** and signing in with a work account performs a Microsoft Entra *join*, not a registration. This is the same code path Autopilot drives — Autopilot simply pre-answers these screens for you.

5. Once at the desktop on **MD102-VM1-Adele**, open PowerShell and confirm both the join and the enrollment:

   ```powershell
   dsregcmd /status | Select-String "AzureAdJoined|MdmUrl|AzureAdPrt"
   ```

   **Verify:** `AzureAdJoined : YES`, an **MdmUrl** is present, and `AzureAdPrt : YES`. Automatic enrollment from lab 10 did the second part without you asking.

**Results:** A device joined and enrolled in one pass at first boot.

- [ ] `MD102-VM1-Adele` appears in **All devices** managed by Intune.
- [ ] The primary user is Adele Vance.

### Exercise 3: Bulk enrollment with a provisioning package

#### Task 1: Build the package

1. Install **Windows Configuration Designer** from the Microsoft Store on your host, then open it.

2. Select **Provision desktop devices**.

3. Work through the wizard:

   | Setting | Value |
   | --- | --- |
   | Name | **Contoso-Bulk-Enroll** |
   | Project folder | **Any local path** |
   | Device name | **CONTOSO-%RAND:4%** <br> %RAND:4% appends four random digits, keeping names unique. |
   | Configure network | **Off** <br> The Default Switch already provides connectivity. |
   | Account management | **Enroll in Microsoft Entra ID** |

4. When prompted, select **Get Bulk Token** and sign in as `admin-intune@<tenant>.onmicrosoft.com`.

   > [!IMPORTANT]
   > The bulk token has a maximum lifetime of **180 days** and is baked into the package. When it expires the package stops working and every device it touches fails to enroll — with an error that says nothing about tokens. Record the expiry date with the package.

5. Skip the application and certificate steps, then select **Create**.

   **Verify:** A `.ppkg` file is produced in the project folder.

**Results:** A provisioning package exists that joins and enrolls a device without user credentials.

- [ ] The `.ppkg` file exists.
- [ ] You have recorded the bulk token expiry date.

#### Task 2: Understand how it is applied, and its consequence

1. A package is applied in one of two ways:

   | When | How |
   | --- | --- |
   | At the out-of-box experience | Insert a USB drive containing the package, then press the Windows key five times to open the provisioning prompt |
   | On a running device | Settings > Accounts > Access work or school > Add or remove a provisioning package |

   > [!NOTE]
   > You do not need to apply it in this lab — VM3 is reserved for Autopilot and applying a package to it would consume the clean checkpoint. Understanding what the package produces matters more than watching it run.

2. Note the consequence that makes this method a deliberate choice rather than a shortcut:

   > [!WARNING]
   > Devices enrolled by a bulk package have **no primary user**. Every user-targeted policy, every user-assigned application and every app protection policy will pass them by. Only device-targeted assignments reach them. That is correct for a shared kiosk and wrong for a staff laptop, and it is the most common reason a bulk-enrolled device appears to receive no configuration.

**Results:** You can explain what bulk enrollment produces and what it costs.

- [ ] You can state which assignments never reach a device with no primary user.

#### Task 3: Group Policy enrollment for hybrid estates

1. This cannot be practised without an on-premises domain, but its shape is examinable.

   | Step | Detail |
   | --- | --- |
   | Prerequisite | Devices are hybrid Microsoft Entra joined through Microsoft Entra Connect |
   | Policy path | Computer Configuration > Administrative Templates > Windows Components > MDM |
   | Setting | **Enable automatic MDM enrollment using default Azure AD credentials** |
   | Credential type | User credential, or device credential for devices with no signed-in user |
   | Trigger | A scheduled task runs after the device is hybrid joined |

   > [!TIP]
   > The exam framing is usually: an organisation with an existing domain wants Intune management without touching every device. The answer is hybrid join plus this Group Policy setting — not Autopilot, which is for new or reset hardware.

**Results:** You can describe how an existing domain estate is brought into Intune.

- [ ] You can name the Group Policy setting that triggers automatic enrollment.

### Exercise 4: Finish the scoped administration proof from lab 8

Lab 8 built the scope tags and scoped the help desk role, but it could not apply a tag to a device or prove the restriction: nothing was enrolled into Intune yet. Both virtual machines now are — `MD102-VM2-Alex` since lab 10 and `MD102-VM1-Adele` as of this lab — so the deferred half can be completed here.

#### Task 1: Tag a device and a policy

1. Select **Devices**, then **All devices**, then open `MD102-VM2-Alex`.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex**

   **Verify:** Both `MD102-VM1-Adele` and `MD102-VM2-Alex` are listed. If only one appears, finish the enrollment exercises above before continuing.

2. Select **Properties**, then next to **Scope tags** select **Edit**. Add `TAG-FINANCE`, then select **Review + save**.

   > [!TIP]
   > Leave **Default** applied as well. An object can carry several tags, and removing Default while you are still learning is how you make an object invisible to yourself.

3. Deliberately leave `MD102-VM1-Adele` untagged. The next task depends on one device carrying the tag and one not.

4. Tag a policy the same way. Any configuration profile will do — if you have none yet, come back to this after lab 22.

   a. Open the profile and select **Properties**.
   b. Next to **Scope tags** select **Edit** and add `TAG-FINANCE`.
   c. Select **Review + save**.

**Results:** One enrolled device carries the Finance scope tag and one does not.

- [ ] `MD102-VM2-Alex` shows `TAG-FINANCE` under **Properties** > **Scope tags**.
- [ ] `MD102-VM1-Adele` shows only **Default**.

#### Task 2: Verify the restriction from the operator's session

1. In a private browser window, sign in to `https://intune.microsoft.com` as `helpdesk.operator@<tenant>.onmicrosoft.com`.

2. Select **Devices**, then **All devices**.
   *Path:* **Devices** > **All devices**

   **Verify:** Only `MD102-VM2-Alex` is visible. `MD102-VM1-Adele` has disappeared, because it carries no `TAG-FINANCE`.

   > [!NOTE]
   > Objects outside scope are not shown as denied — they simply do not appear. A scoped operator has no way to tell the difference between an object that does not exist and one they cannot see, which is exactly the intent. It is also why an empty list proves nothing on its own: the untagged device has to be there and hidden for this to mean anything.

**Results:** The scope tag restriction is proven from the restricted operator's own session rather than assumed.

- [ ] The operator sees the tagged device and not the untagged one.

### Troubleshooting

**Symptom:** A provisioning package that worked last quarter now fails on every device.

- **Root cause:** The bulk enrollment token embedded in the package has expired. Tokens last at most 180 days.
- **Diagnostic:**

  ```text
  Windows Configuration Designer > open the project > Account Management > review the token expiry.
  ```

- **Resolution:** Rebuild the package with a fresh bulk token and redistribute it. There is no way to refresh the token inside an existing package.

### Knowledge check

**Q1.** Contoso has 400 Windows devices already joined to an on-premises Active Directory domain. They must be managed by Intune without visiting each device or reimaging. What should you implement?

A. A bulk enrollment provisioning package on a USB drive
B. Hybrid Microsoft Entra join with Group Policy automatic MDM enrollment
C. Ask each user to add a work or school account
D. Windows Autopilot user-driven deployment

<details><summary>Answer</summary>

**B** — Hybrid join keeps the existing domain membership and gives the devices a Microsoft Entra identity, and the Group Policy setting then enrolls them into Intune automatically. Autopilot applies to new or reset devices, and both remaining options require touching each device.

*Exam tip:* Existing domain-joined estate plus no reimaging equals hybrid join plus Group Policy enrollment. Autopilot only ever answers questions about new or reset hardware.

</details>

**Q2.** Devices enrolled using a bulk enrollment provisioning package do not receive an application assigned to a user group. Device-targeted policies apply correctly. Why?

A. Bulk enrolled devices have no primary user, so user-targeted assignments never apply
B. The bulk token does not include application permissions
C. Provisioning packages block application installation
D. Applications must be assigned before the package is created

<details><summary>Answer</summary>

**A** — A bulk package enrolls with a device enrollment token rather than a user's credentials, so the resulting device object has no primary user and nothing user-targeted resolves against it.

*Exam tip:* No primary user is the defining characteristic of bulk enrollment, and the reason it suits shared and kiosk devices specifically.

</details>

---

## Lab 13: Android Enterprise: work profile, fully managed and dedicated

**Access:** Hands-on · **Estimated time:** 60 minutes · **Difficulty:** intermediate

### Lab scenario

Android is the platform where enrollment choices matter most, because the enrollment method determines what you can manage for the life of the device and cannot be changed afterwards. Contoso needs a work profile on a field engineer's personal phone, and a locked-down kiosk on shop-floor hardware. You will connect Intune to Managed Google Play, build enrollment profiles for each scenario, and enrol the emulator into a work profile.

### Objectives

After completing this lab, you will be able to:

- Connect Intune to Managed Google Play
- Distinguish the four Android Enterprise enrollment scenarios and their management scope
- Create enrollment profiles for corporate-owned devices
- Enrol the Android emulator with a personally owned work profile
- Verify the work and personal boundary from the device

### Exam objectives covered

- `g1.t2.s4` — Configure enrollment profiles for Android devices, including fully managed, dedicated, corporate owned, work profile, enrollment restrictions and troubleshooting enrollment failures

### Prerequisites

- Completed labs: `enrollment-restrictions`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android (Android 14 with Google Play)
- Personas: diego.siciliani, lee.gu

### Exercise 1: Connect Managed Google Play

#### Task 1: Bind the tenant to Managed Google Play

1. In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then the **Android** tab, then **Managed Google Play**.
   *Path:* **Devices** > **Enrollment** > **Android** > **Managed Google Play**

2. Tick **I agree** to grant Microsoft permission to send user and device information to Google, then select **Launch Google to connect now**.

3. Sign in with a Google account and complete the binding.

   > [!CAUTION]
   > Use a Google account created for this purpose, not a personal Gmail you care about, and **not** an account already tied to another Managed Google Play binding. One Google account binds to one Intune tenant, permanently — unbinding requires Google support involvement and there is no self-service undo.

4. Enter an organisation name when Google asks, confirm, and return to Intune.

   **Verify:** The **Managed Google Play** page shows the binding as connected, with the Google account and organisation name displayed. No Android enrollment of any kind works until this is done.

**Results:** The tenant is bound to Managed Google Play.

- [ ] The connection status shows the bound organisation.

### Exercise 2: Understand the four scenarios

#### Task 1: Compare enrollment scenarios

1. The choice is made once, at enrollment, and cannot be changed without a factory reset.

   | Scenario | Ownership | What is managed | Typical use |
   | --- | --- | --- | --- |
   | Personally owned work profile | Personal | Only the work profile container; personal apps and data are invisible to IT | BYOD |
   | Corporate-owned work profile | Corporate | Whole device, but personal use is permitted in a separate profile | Company phone with allowed personal use |
   | Fully managed | Corporate | Entire device, single profile, no personal container | Company phone, work only |
   | Dedicated device | Corporate | Entire device, locked to selected apps, usually no user affinity | Kiosk, shop floor, scanner |

   > [!IMPORTANT]
   > On a personally owned work profile the organisation cannot see personal apps, cannot read personal data, and cannot wipe the whole device — only the work profile. That limitation is the feature: it is what makes users willing to enrol a phone they paid for, and it is a frequent exam question phrased as *what can the administrator see*.

**Results:** You can pick an Android enrollment scenario from an ownership and management requirement.

- [ ] You can state what an administrator cannot do on a personally owned work profile.

#### Task 2: Create corporate-owned enrollment profiles

1. Select **Devices**, **Enrollment**, **Android**, then **Corporate-owned dedicated devices**.
   *Path:* **Devices** > **Enrollment** > **Android** > **Corporate-owned dedicated devices**

2. Select **Create profile** and configure through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **AND-Dedicated-Kiosk** |
   | Token type | **Corporate-owned dedicated device** |
   | Token expiration date | **A date within 90 days** |
   | Wi-Fi | **Not configured** |

   a. On the **Basics** tab, enter Name `AND-Dedicated-Kiosk` and an optional description, then select **Next**.
   b. On the **Settings** tab, configure the **Token type**, **Token expiration date**, and set Wi-Fi to **Not configured**, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Review + create** tab, select **Create**.

3. Once created, open the profile and select **Token** to view the enrollment token, QR code and enrollment URL:

   > [!NOTE]
   > A dedicated device is enrolled by factory-resetting it and tapping the welcome screen six times to open the QR reader, then scanning this code. There is no user sign-in, which is why these devices normally have no user affinity and can only receive device-targeted policy.

4. Repeat under **Corporate-owned, fully managed user devices** to create a profile named `AND-FullyManaged`.
   *Path:* **Devices** > **Enrollment** > **Android** > **Corporate-owned, fully managed user devices**

**Results:** Enrollment profiles and tokens exist for dedicated and fully managed devices.

- [ ] `AND-Dedicated-Kiosk` shows a token and a QR code.
- [ ] Fully managed enrollment is enabled.

### Exercise 3: Enrol the emulator into a work profile

#### Task 1: Enable personally owned work profile enrollment

1. Select **Devices**, **Enrollment**, **Android**, then **Personally-owned devices with work profile**.
   *Path:* **Devices** > **Enrollment** > **Android** > **Personally-owned devices with work profile**

2. Confirm the setting **Use default Play Store app version for enrollment** and that the enrollment type is enabled.

3. Check your enrollment restrictions do not block Android. From lab 11, restrictions are assigned to Finance, IT and BYOD groups — Diego is in `GRP-USR-FIELD`, so only the built-in **All Users** restriction applies to him, which allows everything.

   **Verify:** Under **Device platform restrictions**, no restriction assigned to Diego blocks Android work profile enrollment.

**Results:** Personally owned work profile enrollment is permitted for the field group.

- [ ] Android work profile enrollment is enabled in the tenant.

#### Task 2: Enrol from the Android emulator

1. Start the `MD102-Android` emulator from Android Studio's **Device Manager**.

2. Open the **Play Store**, sign in with a Google account, then search for and install **Intune Company Portal**.

   > [!WARNING]
   > If the Play Store is absent, the emulator was created from a **Google APIs** image rather than a **Google Play** image. There is no fix — delete the virtual device and recreate it as described in lab 2. Work profile provisioning cannot happen without the Play Store.

3. Open **Company Portal** and sign in as `diego.siciliani@<tenant>.onmicrosoft.com`.

4. Work through the enrollment flow:

   a. Tap **Begin**, then read the list of what the organisation can and cannot see.
   b. Tap **Continue**, then **Accept and continue** to create the work profile.
   c. Wait while Android provisions the work profile. This takes several minutes on an emulator.
   d. When prompted, tap **Continue** to finish setup.

   > [!TIP]
   > Read the privacy screen properly rather than tapping past it. It lists exactly what an administrator can and cannot see, and that list is examinable — the organisation sees work app inventory, device model and serial, but not personal apps, call history, browsing or photos.

5. Once complete, look at the app drawer.

   **Verify:** Applications appear in two sections, with work applications marked by a blue briefcase badge. A second, badged copy of Company Portal exists inside the work profile.

**Results:** The emulator is enrolled with a personally owned work profile and the boundary is visible on the device.

- [ ] The app drawer separates personal and work applications.
- [ ] The device appears in **All devices** with ownership **Personal**.

#### Task 3: Confirm the boundary from the portal

1. In the **Microsoft Intune admin center**, open the device under **Devices** > **All devices**.
   *Path:* **Devices** > **All devices**

2. Check what Intune reports:

   | Setting | Value |
   | --- | --- |
   | Ownership | **Personal** |
   | Management name | **Android work profile device** |
   | Primary user | **Diego Siciliani** |

3. Select **Discovered apps**.

   **Verify:** Only applications inside the work profile are listed. Personal applications installed on the emulator do not appear — this is the privacy boundary working, not a reporting delay.

4. Look at the available remote actions on the device.

   **Verify:** **Retire** is available; a full **Wipe** is not offered for a personally owned work profile. Retiring removes the work profile and leaves the personal side untouched.

**Results:** The privacy boundary is demonstrable from both the device and the portal.

- [ ] Discovered apps lists work applications only.
- [ ] You can explain why full wipe is unavailable for this device.

### Troubleshooting

**Symptom:** Company Portal reports that the device cannot be enrolled, or work profile provisioning stalls.

- **Root cause:** The emulator image lacks Google Play, the Managed Google Play binding is missing, or an enrollment restriction blocks Android personally owned devices.
- **Diagnostic:**

  ```text
  Intune admin center > Devices > Enrollment > Android > Managed Google Play (check binding)
  Devices > Enrollment > Device platform restrictions (check which applies to the user)
  ```

- **Resolution:** Confirm the Managed Google Play binding first — nothing Android works without it. Then confirm the platform restriction applying to that user permits Android personally owned devices. If the Play Store is missing from the emulator, recreate the virtual device from a Google Play image.
- **Error codes:** `0x80180014`

### Knowledge check

**Q1.** A field engineer enrolls their personal Android phone with a work profile. Which action can the Intune administrator perform?

A. Read the device's call history and messages
B. View the list of personal applications installed outside the work profile
C. Perform a full factory wipe of the entire device
D. Retire the device, removing the work profile and leaving personal data intact

<details><summary>Answer</summary>

**D** — On a personally owned work profile, management is confined to the work container. Retire removes the work profile only. Full wipe, personal app inventory and personal data are all outside the administrator's reach by design.

*Exam tip:* Personally owned work profile questions almost always test the limits of administrative visibility. The safe answer is that anything personal is invisible and only the work container can be removed.

</details>

**Q2.** Contoso is deploying shop-floor scanners that must run one application, have no user sign-in, and be locked down. Which Android Enterprise scenario applies?

A. Corporate-owned fully managed device
B. Personally owned work profile
C. Corporate-owned dedicated device
D. Corporate-owned work profile

<details><summary>Answer</summary>

**C** — Dedicated devices are for unattended, single-purpose hardware with no user affinity, enrolled with a token or QR code and typically locked to a small set of applications. Fully managed still assumes a signed-in user.

*Exam tip:* The phrases *no user sign-in*, *kiosk* and *single purpose* point at dedicated. A named user with a company phone points at fully managed.

</details>

---

## Lab 14: Apple enrollment, Apple Business Manager and OEM zero-touch

**Access:** Walkthrough — required device not available in this lab · **Estimated time:** 35 minutes · **Difficulty:** intermediate

> [!IMPORTANT]
> These paths need Apple hardware and an Apple Business Manager organisation with a D-U-N-S number, or Samsung Knox and Google Zero Touch enrolments tied to hardware bought through an authorised reseller. None of that can be reproduced with virtual machines and an emulator. The exam covers all of it, so this lab gives you the exact configuration paths, the decision criteria and the prerequisites rather than asking you to click through something you do not have.

### Lab scenario

Contoso is adding Macs for the design team, iPhones for executives, and Samsung handsets for the warehouse. Each platform has a personal enrollment path and a corporate zero-touch path, and the difference between them decides whether a device can be supervised, wiped, or locked to your tenant. You will not enrol any of these, but you must be able to choose the right method and name its prerequisites.

### Objectives

After completing this lab, you will be able to:

- Configure the Apple MDM push certificate that all Apple management depends on
- Distinguish Apple personal enrollment from automated device enrollment
- Describe the Apple Business Manager token workflow and its renewal trap
- Explain what supervision unlocks on iOS and iPadOS
- Describe Samsung Knox Mobile Enrollment and Google Zero Touch and when each applies

### Exam objectives covered

- `g1.t2.s3` — Configure personal enrollment for macOS, iOS, iPadOS
- `g1.t2.s5` — Configure corporate enrollment for macOS and iOS devices by integrating Intune with Apple Business Manager
- `g1.t2.s6` — Configure enrollment for Android devices by integrating Intune with Samsung Knox Mobile Enrollment or Google Zero Touch

### Prerequisites

- Completed labs: `enrollment-restrictions`
- Licences: M365-E5, APPLE-BUSINESS-MANAGER
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: miriam.graham

### Exercise 1: The Apple MDM push certificate

Nothing Apple works without this certificate. It is also the single most common cause of an entire Apple estate falling out of management at once, so it is worth understanding even if you never touch a Mac.

#### Task 1: Walk the certificate workflow

1. In the **Microsoft Intune admin center**, the path is **Devices** > **Enrollment** > **Apple** > **Apple MDM push certificate**.
   *Path:* **Devices** > **Enrollment** > **Apple** > **Apple MDM push certificate**

2. The workflow has four steps and must be done in order:

   | Step | Action | Produces |
   | --- | --- | --- |
   | 1 | Grant Microsoft permission to send device information to Apple | Consent |
   | 2 | Download the Intune certificate signing request | A `.csr` file |
   | 3 | Upload the CSR to the Apple Push Certificates Portal | A `.pem` certificate |
   | 4 | Upload the `.pem` to Intune along with the Apple ID used | An active push certificate |

3. Understand the two traps, both of which cost organisations their entire Apple estate.

   > [!CAUTION]
   > **The certificate expires every 12 months.** When it lapses, every enrolled Apple device stops communicating with Intune and must be **re-enrolled by hand** — there is no remote recovery. Renewal is only possible with the *same Apple ID* that created it, so a certificate created under a departed employee's personal Apple ID becomes unrenewable. Always use a shared organisational Apple ID and record it with the expiry date.

**Results:** You can describe the push certificate workflow and both of its failure modes.

- [ ] You can state what happens to enrolled devices when the certificate expires.
- [ ] You can state why the Apple ID used must be an organisational one.

### Exercise 2: Personal versus automated device enrollment

#### Task 1: Compare the two Apple enrollment paths

1. The choice determines what management is possible for the life of the device.

   |  | Personal (BYOD) enrollment | Automated Device Enrollment |
   | --- | --- | --- |
   | Started by | User installs Company Portal and signs in | Device is registered in Apple Business Manager before it is switched on |
   | Hardware source | Any device | Bought from Apple or an authorised reseller |
   | Supervised | No | Yes |
   | User can remove management | Yes, at any time | No, if the profile is set as non-removable |
   | Enrollment can be mandatory at setup | No | Yes, and it can be locked so setup cannot continue without it |
   | Typical use | Executive's own iPhone | Corporate-issued Mac or iPad |

   > [!IMPORTANT]
   > **Supervision** is the capability gate on iOS and iPadOS, and it is only available through Automated Device Enrollment or Apple Configurator. Supervised devices can use single-app mode, restrict which applications may be installed, block AirDrop, and prevent the user from removing management. A personally enrolled device can do none of that — so a scenario demanding kiosk mode or a non-removable profile is telling you it needs ADE.

2. For personal enrollment, note the two variants on iOS:

   | Variant | Behaviour |
   | --- | --- |
   | Device enrollment | Full device MDM, user can remove it; the older BYOD model |
   | Account driven user enrollment | A managed Apple Account creates a cryptographically separate managed partition; IT can only see and wipe managed data. The modern BYOD answer, closest in spirit to an Android work profile. |

**Results:** You can choose an Apple enrollment path from a management requirement.

- [ ] You can name the enrollment method required for supervision.
- [ ] You can name the iOS enrollment type that keeps personal data cryptographically separate.

#### Task 2: Walk the Apple Business Manager token workflow

1. The path in Intune is **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**.
   *Path:* **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**

2. The sequence:

   a. Download the Intune public key certificate.
   b. In Apple Business Manager, create an MDM server and upload that public key.
   c. Download the server token from Apple Business Manager.
   d. Upload the token to Intune along with the Apple ID.
   e. In Apple Business Manager, assign purchased device serial numbers to the Intune MDM server.
   f. In Intune, create an enrollment profile and assign it to those serial numbers.

   > [!WARNING]
   > The enrollment program token also expires annually and is also tied to the Apple ID that created it. Two independent annual expiries — the push certificate and the token — is why mature Apple estates keep a shared calendar for both.

3. Note what an ADE enrollment profile controls:

   | Setting | Value |
   | --- | --- |
   | User affinity | **Enroll with or without user affinity** <br> Without affinity means shared device; no user-targeted policy applies. |
   | Authentication method | **Setup Assistant, Company Portal, or Setup Assistant with modern authentication** |
   | Locked enrollment | **Prevents the user removing the management profile** <br> Requires supervision. |
   | Setup Assistant screens | **Which first-run screens to skip** |

**Results:** You can describe the full Apple Business Manager integration and what its profile controls.

- [ ] You can list the two artefacts that expire annually.
- [ ] You can explain what locked enrollment requires.

### Exercise 3: Android OEM zero-touch

#### Task 1: Compare Knox Mobile Enrollment and Google Zero Touch

1. Both solve the same problem as Apple's Automated Device Enrollment: a device that enrolls itself on first power-on, without anybody touching it.

   |  | Samsung Knox Mobile Enrollment | Google Zero Touch |
   | --- | --- | --- |
   | Applies to | Samsung devices only | Supported Android devices from many manufacturers |
   | Device source | An authorised Samsung reseller | An authorised Zero Touch reseller |
   | Registration | Reseller uploads IMEI or serial to the Knox portal | Reseller uploads device identifiers to the Zero Touch portal |
   | Configuration | An MDM profile in the Knox portal points at Intune | A configuration in the Zero Touch console points at Intune |
   | Result | Device enrolls at first boot, management non-removable | Device enrolls at first boot, management non-removable |
   | Prerequisite in Intune | Managed Google Play binding plus a corporate enrollment profile | The same |

   > [!IMPORTANT]
   > The prerequisite the exam tests is the same for both: the device must have been **purchased through a reseller enrolled in the programme**. Hardware bought retail cannot be added to Knox Mobile Enrollment or Zero Touch afterwards. If a scenario mentions devices already bought from a high-street shop, zero-touch is not the answer — the QR code or token method from lab 13 is.

2. Place all the corporate zero-touch methods side by side:

   | Platform | Zero-touch method | Requires purchase channel |
   | --- | --- | --- |
   | Windows | Windows Autopilot | No — a hardware hash can be captured from any device |
   | iOS, iPadOS, macOS | Apple Business Manager Automated Device Enrollment | Yes |
   | Android (Samsung) | Knox Mobile Enrollment | Yes |
   | Android (multi-vendor) | Google Zero Touch | Yes |

   > [!TIP]
   > Windows Autopilot is the odd one out and that is worth remembering: you can register any Windows device by collecting its hardware hash yourself, which is exactly what lab 17 does on a virtual machine. Apple and Android zero-touch both depend on the reseller.

**Results:** You can select the correct zero-touch method per platform and state its purchase-channel prerequisite.

- [ ] You can name the only zero-touch method that does not require a specific purchase channel.

### Troubleshooting

**Symptom:** Every iOS and macOS device stops checking in with Intune on the same day.

- **Root cause:** The Apple MDM push certificate expired. All Apple management traffic depends on it.
- **Diagnostic:**

  ```text
  Devices > Enrollment > Apple > Apple MDM push certificate
  Check the expiration date and the Apple ID shown.
  ```

- **Resolution:** Renew the certificate using the **same Apple ID** that created it. If that account is unavailable, a new certificate must be created and every Apple device must be re-enrolled by hand — there is no remote path back.

### Knowledge check

**Q1.** Contoso must deploy iPads that run a single application in kiosk mode and from which users cannot remove management. Which enrollment method is required?

A. Apple Configurator with manual pairing
B. Automated Device Enrollment through Apple Business Manager
C. Account driven user enrollment with a managed Apple Account
D. Personal device enrollment using the Company Portal

<details><summary>Answer</summary>

**B** — Single-app mode and a non-removable management profile both require supervision, and supervision comes only from Automated Device Enrollment or Apple Configurator. Neither personal enrollment path can supervise a device.

*Exam tip:* Map the requirement to supervision first. Kiosk mode, locked enrollment and application allow-lists all mean supervision, which means ADE.

</details>

**Q2.** Contoso bought 200 Samsung handsets from a high-street retailer and wants them to enrol automatically at first power-on with non-removable management. What should you tell them?

A. Use Google Zero Touch, which works with any retail Android device
B. Knox Mobile Enrollment is unavailable because the devices were not bought through an enrolled reseller; use dedicated device enrollment with a QR code instead
C. Import the serial numbers as corporate device identifiers to enable zero-touch
D. Register the IMEI numbers in the Knox portal manually to enable zero-touch

<details><summary>Answer</summary>

**B** — Both Knox Mobile Enrollment and Google Zero Touch require devices to be registered by a participating reseller at the point of sale. Retail hardware cannot be added afterwards, so the practical path is factory reset plus QR code enrollment against a corporate enrollment profile.

*Exam tip:* Corporate device identifiers mark ownership; they do not enable zero-touch. Only the reseller-registered programmes do that on Apple and Android.

</details>

---

## Lab 15: Troubleshoot enrollment failures

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** advanced

### Lab scenario

Enrollment failures are the most common support call an endpoint administrator takes, and the error codes are deliberately unhelpful — a licensing problem and a restriction problem both present as *this device cannot be enrolled*. You will deliberately break enrollment three different ways, diagnose each from the client, and build the mental index that turns a hex code into a one-minute fix. You will also configure the cleanup rules that stop stale records causing failures months later.

### Objectives

After completing this lab, you will be able to:

- Provoke and diagnose licensing, restriction and device-limit enrollment failures
- Collect MDM diagnostics from a Windows client and read the report
- Locate enrollment events in the Windows event log
- Configure device cleanup rules to remove stale records automatically
- Map the high-yield enrollment error codes to their causes

### Exam objectives covered

- `g1.t2.s4` — Configure enrollment profiles for Android devices, including fully managed, dedicated, corporate owned, work profile, enrollment restrictions and troubleshooting enrollment failures

### Prerequisites

- Completed labs: `enrollment-restrictions`, `android-enterprise`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11 Pro)
- Personas: staging.user01, adele.vance

### Exercise 1: Break enrollment on purpose

Meeting these failures under controlled conditions is far cheaper than meeting them for the first time on a support call.

#### Task 1: Provoke the licensing failure

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-LIC-M365-E5**, select **Members**, and remove `staging.user01` from the group.
   *Path:* **Groups** > **All groups** > **GRP-LIC-M365-E5** > **Members**

2. Wait a few minutes for the licence to be revoked, then confirm in PowerShell on your management workstation:

   ```powershell
   Get-MgUser -UserId "staging.user01@<tenant>.onmicrosoft.com" -Property DisplayName,AssignedLicenses |
       Select-Object DisplayName, @{n='Licences';e={$_.AssignedLicenses.Count}}
   ```

   **Verify:** **Licences** is `0`.

3. On **MD102-VM1-Adele**, attempt to add a work account for `staging.user01`.
   *Path:* **Settings** > **Accounts** > **Access work or school** > **Connect**

   **Verify:** Enrollment fails. The error is `0x80180018` — `MENROLL_E_LICENSE`. The wording on screen mentions the device or the organisation, not the licence, which is exactly why the code matters more than the message.

   > [!TIP]
   > This is the single most common enrollment failure in a trial tenant, because the seat pool is small and group-based licensing is asynchronous. If you see `0x80180018`, check licensing before you touch anything else.

4. Add `staging.user01` back to `GRP-LIC-M365-E5` and confirm the licence returns.

**Results:** You have seen the licensing failure and can recognise its code.

- [ ] You provoked `0x80180018` and recovered from it.

#### Task 2: Provoke the restriction failure

1. In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, then **Device platform restrictions**. Select **WIN-Corporate-Only**, then under **Properties** edit **Platform settings** to temporarily set the **Minimum OS version** to `10.0.99999`.
   *Path:* **Devices** > **Enrollment** > **Device platform restrictions** > **WIN-Corporate-Only** > **Properties**

2. Add `staging.user01` to `GRP-USR-FINANCE` so the restriction applies to them, then attempt enrollment again.

   **Verify:** Enrollment fails with `0x80180014` — `MENROLL_E_PLATFORM_BLOCKED`. Nothing on the client says which restriction blocked it; that answer only exists in the portal.

3. Restore the minimum version to `10.0.22000` and remove the temporary group membership.

   > [!IMPORTANT]
   > Note what you just proved: the same symptom — enrollment refused — came from two completely unrelated causes, and only the hex code distinguished them. This is why the error dictionary is worth memorising rather than looking up.

**Results:** You can distinguish a licensing failure from a restriction failure by code alone.

- [ ] You provoked `0x80180014` and restored the restriction.

### Exercise 2: Collect and read client diagnostics

#### Task 1: Generate an MDM diagnostics report

1. On **MD102-VM1-Adele**, open an elevated command prompt and generate the HTML report:

   *Produces MDMDiagReport.html and supporting files*
   ```cmd
   mkdir C:\Temp\MDMDiag
   mdmdiagnosticstool.exe -area "DeviceEnrollment;DeviceProvisioning;Autopilot" -zip C:\Temp\MDMDiag\report.zip
   ```

   > [!NOTE]
   > The `-area` switch selects which categories to collect. `DeviceEnrollment` is the one that matters here; `Autopilot` becomes relevant in module 3. Running the tool with no arguments produces a smaller default report.

2. Extract the zip and open `MDMDiagReport.html` in a browser.

3. Find these sections:

   | Section | Tells you |
   | --- | --- |
   | Device Info | Device name, OS build, and whether the device is Entra joined |
   | Enrolled Info | The MDM enrollment record, its provider and its state |
   | Managed Policies | Every configuration setting Intune has applied and its current value |
   | Managed Apps | Applications delivered through MDM and their install state |

4. On **MD102-VM1-Adele**, inspect the registry directly in an elevated Administrator PowerShell session (which is faster when you only need enrollment state):

   ```powershell
   Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments" |
       ForEach-Object { Get-ItemProperty $_.PSPath } |
       Where-Object { $_.UPN } |
       Select-Object UPN, ProviderID, EnrollmentState, EnrollmentType
   ```

   **Verify:** `EnrollmentState` of `1` means enrolled. Any other value, or no row at all, means the device is not managed regardless of what the join state says.

**Results:** You can collect and navigate a client-side diagnostics report.

- [ ] `MDMDiagReport.html` opens and shows the enrolled state.

#### Task 2: Read enrollment events in the event log

1. Open **Event Viewer** and navigate to the MDM provider log.
   *Path:* **Applications and Services Logs** > **Microsoft** > **Windows** > **DeviceManagement-Enterprise-Diagnostics-Provider** > **Admin**

2. Or query it from PowerShell on **MD102-VM1-Adele**, which is faster:

   ```powershell
   Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 40 |
       Select-Object TimeCreated, Id, LevelDisplayName,
           @{n='Message'; e={ $_.Message -replace "`r`n", ' ' }} |
       Format-Table -Wrap
   ```

3. Learn the two event IDs that matter:

   | Event ID | Meaning |
   | --- | --- |
   | 813 | A policy or setting was applied successfully |
   | 814 | A policy or setting failed to apply — the message carries the CSP path and the result code |
   | 76 | Enrollment failed; the message carries the enrollment error code |
   | 71 and 72 | Enrollment session started and completed |

   > [!TIP]
   > Event 814 is the one that earns its keep. It names the exact configuration service provider path that failed, which turns *a profile is not applying* into *this specific setting is unsupported on this edition*.

**Results:** You can find and interpret enrollment and policy events on a client.

- [ ] The provider log contains events from your enrollment attempts.
- [ ] You can state what event 814 tells you that event 76 does not.

### Exercise 3: Stop stale records causing future failures

#### Task 1: Configure device cleanup rules

1. Select **Devices**, then **Device onboarding** or **Device cleanup rules** depending on your portal version, then **Device cleanup rules**.
   *Path:* **Devices** > **Device cleanup rules**

2. Enable the rule:

   | Setting | Value |
   | --- | --- |
   | Delete devices based on last check-in date | **Yes** |
   | Delete devices that haven't checked in for this many days | **90** <br> Minimum is 30. Choose a figure longer than your longest expected absence — a laptop in a drawer over a summer break should not be deleted. |

   > [!WARNING]
   > This deletes the Intune record only. It does not wipe the device, and it does not remove the Microsoft Entra device object — those are cleaned separately under **Devices** > **Device settings** in Entra. A device deleted here that later checks in will re-enrol as a new record.

3. Select **Save**, then explain why this prevents a future support call:

   > [!NOTE]
   > Stale records count toward the device limit restriction from lab 11. A user who has rebuilt their laptop three times without retiring the old records hits `0x80180026` on a device limit of three, having only one physical machine. Cleanup rules make that self-correcting.

**Results:** Stale device records are removed automatically.

- [ ] A cleanup rule is enabled with a threshold of 90 days or fewer.
- [ ] You can explain which error code stale records eventually cause.

### Scripts

#### Find stale and unhealthy devices

```powershell
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

$cutoff = (Get-Date).AddDays(-30)

Get-MgDeviceManagementManagedDevice -All |
    Select-Object DeviceName, UserPrincipalName, OperatingSystem,
        LastSyncDateTime, ComplianceState, ManagementState |
    Where-Object { $_.LastSyncDateTime -lt $cutoff } |
    Sort-Object LastSyncDateTime |
    Format-Table -AutoSize

Write-Host ""
Write-Host "Devices per user (device limit restrictions count these):" -ForegroundColor Yellow
Get-MgDeviceManagementManagedDevice -All |
    Where-Object UserPrincipalName |
    Group-Object UserPrincipalName |
    Where-Object Count -gt 1 |
    Select-Object Name, Count |
    Sort-Object Count -Descending |
    Format-Table -AutoSize
```

### Troubleshooting

**Symptom:** A device is Microsoft Entra joined but never appears in Intune, and no error is shown to the user.

- **Root cause:** Automatic enrollment did not run. Either the MDM user scope excludes the user, the user is in the MAM scope instead, or the enrollment attempt failed silently and is only recorded in the event log.
- **Diagnostic:**

  ```powershell
  dsregcmd /status | Select-String "MdmUrl"
  Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 20 |
      Where-Object Id -in 71,72,76
  ```

- **Resolution:** An empty **MdmUrl** means the device was never told to enrol — fix the MDM user scope. An MdmUrl with event 76 means enrollment was attempted and refused; read the code in the event message and treat it as a licensing or restriction problem.
- **Error codes:** `0x80180018`, `0x80180014`

### Knowledge check

**Q1.** A user with a valid Microsoft 365 E5 licence cannot enrol a Windows 11 device. The client reports `0x80180014`. What is the cause?

A. The user has reached their device limit
B. The Microsoft Entra device quota has been exceeded
C. An enrollment restriction is blocking the platform, ownership type or OS version
D. The user has no Intune licence assigned

<details><summary>Answer</summary>

**C** — `0x80180014` is `MENROLL_E_PLATFORM_BLOCKED` and always points at an enrollment restriction. A missing licence produces `0x80180018` and a device limit produces `0x80180026`.

*Exam tip:* Learn the three enrollment codes as a set: 18 is licence, 14 is restriction, 26 is device limit. Scenario questions frequently give you the code and expect the cause immediately.

</details>

**Q2.** A user reports `0x80180026` when enrolling a new laptop. They physically own one device. What is the most likely explanation?

A. The enrollment restriction blocks personally owned devices
B. The device serial number is not in Corporate device identifiers
C. Stale Intune device records from previous rebuilds still count toward the device limit
D. The Microsoft Entra ID licence has lapsed

<details><summary>Answer</summary>

**C** — The device limit restriction counts enrolled records, not physical hardware. Rebuilding a machine without retiring the old record leaves the slot occupied, so a user with one laptop can genuinely exhaust a limit of three.

*Exam tip:* Device cleanup rules exist precisely to prevent this. If a question mentions repeated rebuilds or reimaging, stale records are almost always the answer.

</details>

---

# Module 3 — Windows client deployment

Choose and implement a provisioning method: Autopilot deployment profiles versus device preparation policies, all deployment modes, the Enrollment Status Page, Windows 11 upgrades, and Windows Backup.

## Lab 16: Choose a provisioning method: Autopilot profiles or device preparation

**Access:** Hands-on · **Estimated time:** 30 minutes · **Difficulty:** intermediate

### Lab scenario

There are now two ways to provision a Windows device with Intune: classic Windows Autopilot deployment profiles, and the newer Windows Autopilot device preparation policies. They look similar in the portal and behave very differently. Two exam objectives are dedicated to choosing between them and to choosing among the deployment modes, so this lab is deliberately a decision lab — you build nothing, and you finish able to justify a choice in one sentence.

### Objectives

After completing this lab, you will be able to:

- Choose between Autopilot deployment profiles and device preparation policies
- Choose among user-driven, pre-provisioning and self-deploying modes
- State the prerequisites each method imposes
- Predict which method a scenario is describing

### Exam objectives covered

- `g2.t1.s1` — Choose between Windows Autopilot deployment profiles and device preparation policies
- `g2.t1.s2` — Choose between Windows Autopilot deployment modes, including user-driven, pre-provisioning, and self-deploying

### Prerequisites

- Completed labs: `windows-enrollment-paths`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center

### Exercise 1: Profiles or device preparation

#### Task 1: Compare the two provisioning models

1. In the **Microsoft Intune admin center**, open **Devices** > **Enrollment** > **Windows** and note that both appear side by side: **Deployment Profiles** and **Device preparation policies**.
   *Path:* **Devices** > **Enrollment** > **Windows**

2. Read the comparison. The row that decides most real deployments is the first one.

   |  | Autopilot deployment profile | Device preparation policy |
   | --- | --- | --- |
   | Device must be registered in advance | **Yes** — a hardware hash must be uploaded before the device is switched on | **No** — any device can be used |
   | Identifies devices by | Hardware hash held in the Autopilot service | Membership of a device group at enrollment time |
   | Device group | Assigned automatically from the Autopilot registration | You create it, and its **owner** must be the Intune Provisioning Client service principal |
   | User assignment | Profile assigned to a device group | Policy assigned to a **user** group |
   | Deployment modes | User-driven, pre-provisioning, self-deploying | User-driven only |
   | Hybrid join support | Yes, for user-driven | No — Microsoft Entra join only |
   | App installation during setup | Enrollment Status Page blocks on apps you nominate | Up to 10 apps and 10 scripts, tracked with clearer reporting |
   | Best for | Hardware from an OEM that registers devices for you | Existing hardware, reused devices, or anything you cannot get a hash for |

   > [!IMPORTANT]
   > Device preparation exists because collecting hardware hashes is the part of Autopilot that fails in practice — reused hardware, devices bought retail, machines already imaged. If a scenario stresses that devices are *not registered* or *cannot be registered*, it is describing device preparation. If it stresses that the OEM registers devices on Contoso's behalf, it is describing a classic deployment profile.

3. Note the one prerequisite of device preparation people miss:

   > [!WARNING]
   > The device group you target with a device preparation policy must have **Intune Provisioning Client** added as a group **owner**. Without it, the service cannot add the device to the group during provisioning, and the deployment fails at a point that gives no useful clue. Lab 19 does this step explicitly.

**Results:** You can choose between the two provisioning models from a scenario.

- [ ] You can state the one thing device preparation does not require.
- [ ] You can name the service principal that must own the device group.

### Exercise 2: Choose a deployment mode

#### Task 1: Compare the three Autopilot modes

1. Deployment modes apply to classic Autopilot deployment profiles. Device preparation supports user-driven only.

   |  | User-driven | Pre-provisioning | Self-deploying |
   | --- | --- | --- | --- |
   | Who completes setup | The end user | IT or the OEM does the heavy part, the user finishes | Nobody — no user interaction at all |
   | User signs in during provisioning | Yes | Not for the technical phase | No |
   | Primary user assigned | Yes | Yes, when the user completes it | **No** |
   | Requires TPM 2.0 with attestation | No | Yes | Yes |
   | Join type | Entra join or hybrid join | Entra join or hybrid join | Entra join only |
   | Time the user waits | Full provisioning | Only the user phase | Not applicable |
   | Typical use | Ship the device straight to the employee | IT preloads apps, then ships a nearly ready device | Kiosks, digital signage, shared meeting-room devices |

   > [!IMPORTANT]
   > Self-deploying assigns **no primary user**. Every user-targeted policy and user-assigned application passes the device by, exactly as with bulk enrollment in lab 12. That is why it suits kiosks and why it is the wrong answer for a staff laptop, however attractive zero-touch sounds.

2. Note the hardware requirement that rules two modes out:

   > [!NOTE]
   > Pre-provisioning and self-deploying both require **TPM 2.0 with device attestation**, because the device must prove its identity with no user present. Your Generation 2 virtual machines have a vTPM, but Hyper-V vTPM attestation against the Autopilot service is unreliable — lab 18 covers both modes as a walkthrough for that reason, while user-driven in lab 17 works fully.

3. Test yourself against these scenarios before moving on:

   | Scenario | Answer |
   | --- | --- |
   | Laptops shipped from the OEM directly to home workers | Autopilot deployment profile, user-driven |
   | Meeting room displays that must never show a sign-in prompt | Autopilot deployment profile, self-deploying |
   | IT wants to preload a 4 GB application before shipping | Autopilot deployment profile, pre-provisioning |
   | 200 reused laptops with no hardware hashes available | Device preparation policy |
   | New devices that must be hybrid Entra joined | Autopilot deployment profile, user-driven |

**Results:** You can pick a deployment mode and justify it in one sentence.

- [ ] You can name the mode that assigns no primary user.
- [ ] You can name the two modes that require TPM attestation.
- [ ] You can name the only mode that supports hybrid join under device preparation.

### Knowledge check

**Q1.** Contoso has 200 laptops returned from a closed office. They were previously domain joined, no hardware hashes were ever collected, and the vendor is out of business. They must be redeployed as Microsoft Entra joined, Intune managed devices. What should you use?

A. A bulk enrollment provisioning package
B. A Windows Autopilot deployment profile in user-driven mode
C. A Windows Autopilot device preparation policy
D. A Windows Autopilot deployment profile in self-deploying mode

<details><summary>Answer</summary>

**C** — Device preparation does not require devices to be registered in advance, which is exactly the constraint here. Every classic Autopilot mode depends on a hardware hash being uploaded before the device is switched on.

*Exam tip:* No hardware hash, or hardware that cannot be registered, always points at device preparation. It is the answer to the problem that made classic Autopilot painful.

</details>

**Q2.** Which Autopilot deployment mode should be used for shared meeting-room devices that must provision with no user interaction and no assigned user?

A. Self-deploying
B. Device preparation
C. Pre-provisioning
D. User-driven

<details><summary>Answer</summary>

**A** — Self-deploying mode provisions with no user present and assigns no primary user, which is what shared and kiosk hardware needs. It requires TPM 2.0 with attestation and supports Microsoft Entra join only.

*Exam tip:* *No user interaction* plus *shared device* is the self-deploying signature. Remember it assigns no primary user, so only device-targeted assignments will ever reach it.

</details>

---

## Lab 17: Windows Autopilot user-driven deployment

**Access:** Hands-on · **Estimated time:** 75 minutes · **Difficulty:** advanced

### Lab scenario

A new starter joins Finance on Monday. The laptop is shipped to their home still sealed. They open it, connect to their own Wi-Fi, sign in with their work account, and forty minutes later have a managed, encrypted, application-loaded corporate device that IT never touched. That is user-driven Autopilot, and you are about to build it end to end on VM3 — hardware hash, dynamic group, device name template, deployment profile and Enrollment Status Page.

### Objectives

After completing this lab, you will be able to:

- Capture and import a Windows Autopilot hardware hash
- Apply a device name template so devices are named consistently
- Create and assign a user-driven deployment profile
- Configure an Enrollment Status Page and understand what blocking means
- Run a full Autopilot deployment and verify the result

### Exam objectives covered

- `g2.t1.s3` — Apply a device name template by using Windows Autopilot
- `g2.t1.s4` — Implement Windows client deployment by using Windows Autopilot
- `g2.t1.s5` — Create an Enrollment Status Page (ESP)

### Prerequisites

- Completed labs: `deployment-method-decision`, `groups-for-devices`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm3-megan (Windows 11 Pro at OOBE)
- Personas: megan.bowen

### Exercise 1: Register the device

#### Task 1: Capture the hardware hash from VM3

1. Revert **MD102-VM3-Megan** to the clean checkpoint from lab 2, then start it:

   *Run on the Hyper-V host*
   ```powershell
   Restore-VMCheckpoint -Name "OOBE-Clean" -VMName MD102-VM3-Megan -Confirm:$false
   Start-VM -Name MD102-VM3-Megan
   ```

2. At the region selection screen, press **Shift + F10** to open a command prompt.

   > [!TIP]
   > On some keyboards this is **Shift + Fn + F10**. In a Hyper-V connection window the key combination goes to the guest, not the host. This shortcut is worth committing to memory — it is how every Autopilot hash is captured in the field.

3. Start PowerShell and capture the hash:

   ```powershell
   powershell.exe
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force
   Install-Script -Name Get-WindowsAutopilotInfo -Force
   Get-WindowsAutopilotInfo -OutputFile C:\hash.csv
   ```

   > [!NOTE]
   > `Install-Script` needs internet access, which the Default Switch provides. If prompted to trust the PSGallery repository, accept. The script reads the device serial number, the Windows product ID and the hardware identifier, and writes them as one CSV row.

4. From the PowerShell prompt inside **MD102-VM3-Megan**, upload the hardware hash directly to Intune:

   *Uploads straight into Intune from MD102-VM3-Megan, skipping the CSV entirely*
   ```powershell
   Install-Script -Name Get-WindowsAutopilotInfo -Force
   Get-WindowsAutopilotInfo -Online
   ```

   > [!TIP]
   > `-Online` prompts for credentials and registers the device with Intune directly. Use `admin-intune`. This is far easier than moving a CSV out of a machine sitting at the out-of-box experience, and it is what most field engineers actually do.

5. Shut the virtual machine down. Do **not** let it continue through the out-of-box experience yet.

   *On the host*
   ```powershell
   Stop-VM -Name MD102-VM3-Megan -TurnOff -Force
   ```

**Results:** The device is registered with the Windows Autopilot service.

- [ ] **Devices** > **Enrollment** > **Devices** lists the device by serial number.
- [ ] Its **Profile status** currently reads **Not assigned**.

#### Task 2: Confirm the dynamic Autopilot group picks it up

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select **GRP-DEV-AUTOPILOT**, then select **Members**.
   *Path:* **Groups** > **All groups** > **GRP-DEV-AUTOPILOT** > **Members**

2. Recall the rule that makes this work:

   ```text
   (device.devicePhysicalIds -any (_ -startsWith "[ZTDId]"))
   ```

   > [!NOTE]
   > Registering a device with Autopilot creates a Microsoft Entra device object carrying a Zero Touch Deployment identifier, before the device has ever enrolled. That is what this rule matches, and it is why the group populates while the machine is switched off.

3. Wait for the device to appear. This can take several minutes.

   **Verify:** The device object appears as a member of `GRP-DEV-AUTOPILOT`.

**Results:** The registered device is a member of the group the deployment profile will target.

- [ ] `GRP-DEV-AUTOPILOT` has at least one member.

### Exercise 2: Create the deployment profile and Enrollment Status Page

#### Task 1: Create a user-driven deployment profile with a name template

1. Select **Devices**, **Enrollment**, **Windows**, then **Deployment Profiles**, then **Create profile** > **Windows PC**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Deployment Profiles** > **Create profile**

2. On **Basics**:

   | Setting | Value |
   | --- | --- |
   | Name | **AP-UserDriven-Corporate** |
   | Description | **User-driven Entra join for corporate laptops** |
   | Convert all targeted devices to Autopilot | **No** <br> Set to Yes only if you want every device in the assigned group registered automatically. On a lab group this can register more than you intended. |

3. On **Out-of-box experience (OOBE)**:

   | Setting | Value |
   | --- | --- |
   | Deployment mode | **User-Driven** |
   | Join to Microsoft Entra ID as | **Microsoft Entra joined** |
   | Microsoft Software License Terms | **Hide** |
   | Privacy settings | **Hide** |
   | Hide change account options | **Show** |
   | User account type | **Standard** <br> Not Administrator. This is the setting that stops every user being a local admin, and it is examinable. |
   | Allow pre-provisioned deployment | **No** |
   | Language, region, keyboard | **User select** |
   | Apply device name template | **Yes** |
   | Enter a name | **CTS-FIN-%RAND:5%** |

   > [!IMPORTANT]
   > Device name templates are limited to **15 characters** total, may use letters, numbers and hyphens only, and cannot be all numbers. `%SERIAL%` inserts the serial number and `%RAND:x%` inserts x random digits. `CTS-FIN-%RAND:5%` is 13 characters. A template that resolves to more than 15 characters causes the deployment to fail at naming, which is a confusing place to fail.

4. On **Assignments**, include `GRP-DEV-AUTOPILOT`, then create the profile.

5. In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, select the **Windows** tab, then select **Devices** (under Windows Autopilot) and check the registration.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Devices**

   **Verify:** **Profile status** now reads **Assigned**. Do not start the virtual machine until it does — a device that reaches the out-of-box experience before assignment completes will not use Autopilot at all, and you will have to reset it and start again.
   ```
   Serial number      Profile status
   -----------------  --------------
   0000-0000-0000...  Assigned
   ```

**Results:** A user-driven profile is assigned to the registered device.

- [ ] **Profile status** reads **Assigned**.
- [ ] The device name template is 15 characters or fewer.

#### Task 2: Configure the Enrollment Status Page

1. Select **Devices**, **Enrollment**, **Windows**, then **Enrollment Status Page**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Enrollment Status Page**

2. Select **Create**, then configure:

   | Setting | Value |
   | --- | --- |
   | Name | **ESP-Corporate** |
   | Show app and profile configuration progress | **Yes** |
   | Show an error when installation takes longer than | **3600 seconds** <br> 60 minutes. The default. |
   | Allow users to collect logs about installation errors | **Yes** <br> Produces a diagnostics cab the user can send you. |
   | Only show page to devices provisioned by out-of-box experience (OOBE) | **Yes** |
   | Block device use until all apps and profiles are installed | **Yes** |
   | Allow users to reset device if installation error occurs | **Yes** |
   | Allow users to use device if installation error occurs | **Yes** <br> Set to No only when a device is genuinely unusable without its full configuration. |
   | Block device use until required apps are installed if they are assigned to the user/device | **Selected** |

   > [!WARNING]
   > Nominate as few blocking apps as you can defend. Every blocking app must install successfully before the user reaches the desktop, and the timeout is consumed by the slowest one. An Enrollment Status Page that blocks on a 4 GB application over a home broadband connection is how a forty-minute deployment becomes a two-hour one and then times out with `0x800705B4`.

3. On **Assignments**, assign to `GRP-USR-HR`, then create the page.

**Results:** An Enrollment Status Page will show provisioning progress and block until configuration completes.

- [ ] `ESP-Corporate` is listed above the built-in **Default** page.

### Exercise 3: Run the deployment

#### Task 1: Deploy the device as Megan

1. Start **MD102-VM3-Megan** and connect to it.

   *On the host*
   ```powershell
   Start-VM -Name MD102-VM3-Megan
   vmconnect.exe localhost MD102-VM3-Megan
   ```

2. Select region and keyboard, then connect to the network. Watch what happens next.

   **Verify:** Instead of the normal Windows setup screens, a branded sign-in page appears showing your organisation name from lab 10. This is the moment Autopilot takes over: the device recognised its own hardware hash and downloaded its profile.

3. Sign in as `megan.bowen@<tenant>.onmicrosoft.com`.

4. The Enrollment Status Page appears with three phases. Let it run.

   | Phase | What happens |
   | --- | --- |
   | Device preparation | Security policies applied, device joined to Microsoft Entra ID, enrolled in Intune |
   | Device setup | Device-targeted apps, certificates, connection profiles and configuration |
   | Account setup | User-targeted apps and policies, after the user has signed in |

   > [!TIP]
   > If it stalls, select **Show details** on the status page to see which item is blocking. This is the fastest diagnosis available and most people never notice the link.

5. When the desktop appears on **MD102-VM3-Megan**, verify the result in PowerShell:

   ```powershell
   hostname
   dsregcmd /status | Select-String "AzureAdJoined|MdmUrl|AzureAdPrt"
   whoami
   ```

   **Verify:** The hostname matches your `CTS-FIN-` template, `AzureAdJoined : YES`, an **MdmUrl** is present, and the signed-in user is Megan.

6. On **MD102-VM3-Megan**, confirm the user is a standard user, not a local administrator:

   ```powershell
   net localgroup Administrators
   ```

   **Verify:** Megan's account is **not** listed. This is the **User account type: Standard** setting from the deployment profile doing its job.

7. In the **Microsoft Intune admin center**, select **Devices**, then select **All devices** to confirm the device object.
   *Path:* **Devices** > **All devices**

   **Verify:** The device appears with the templated name, ownership **Corporate**, and Megan as primary user. Autopilot-registered devices are corporate by definition, so `GRP-DEV-WIN-CORP` will pick this one up without the manual step you needed in lab 11.

**Results:** A device provisioned itself from a sealed state to a managed corporate desktop with no IT involvement.

- [ ] The device name matches the template.
- [ ] The user is a standard user.
- [ ] The device is Corporate-owned in Intune.

#### Task 2: Take a post-deployment checkpoint

1. This deployed state is useful for later modules. Preserve it without losing the clean one:

   *On the host*
   ```powershell
   Checkpoint-VM -Name MD102-VM3-Megan -SnapshotName "Autopilot-Deployed"
   Get-VMCheckpoint -VMName MD102-VM3-Megan | Select-Object Name, CreationTime
   ```

   **Verify:** Both **OOBE-Clean** and **Autopilot-Deployed** exist. You can now move between a fresh device and a deployed one in seconds.

**Results:** You can return to either a clean or a deployed state at will.

- [ ] Two checkpoints exist on VM3.

### Troubleshooting

**Symptom:** The device reaches the normal Windows out-of-box experience instead of the branded Autopilot screen.

- **Root cause:** The deployment profile was not assigned to the device before it started, the hardware hash was never imported, or the device had already completed the out-of-box experience once.
- **Diagnostic:**

  ```text
  Devices > Enrollment > Devices
  Check the device is listed and Profile status reads Assigned before powering on.
  ```

- **Resolution:** Confirm **Profile status** is **Assigned**, then reset the device or revert the checkpoint and try again. Group assignment is not instantaneous and a device that boots too early will simply not use Autopilot.
- **Error codes:** `0x82AA0008`

**Symptom:** The Enrollment Status Page fails after 60 minutes with a timeout.

- **Root cause:** A blocking application never installed. The timeout is consumed waiting for it, and the failure names the page rather than the application.
- **Diagnostic:**

  ```cmd
  mdmdiagnosticstool.exe -area "Autopilot;DeviceEnrollment" -zip C:\Temp\esp.zip
  ```

- **Resolution:** Reduce the blocking application list to the minimum, confirm each one installs correctly outside Autopilot first, and only then raise the timeout. Raising the timeout without fixing the app just fails more slowly.
- **Error codes:** `0x800705B4`

### Knowledge check

**Q1.** You configure an Autopilot device name template as `CONTOSO-FINANCE-%SERIAL%`. Deployments fail during naming. Why?

A. %SERIAL% is not a valid Autopilot variable
B. Device name templates require self-deploying mode
C. Hyphens are not permitted in device name templates
D. The resolved name exceeds the 15-character limit for Windows device names

<details><summary>Answer</summary>

**D** — Windows device names are limited to 15 characters. `CONTOSO-FINANCE-` alone is 16 before the serial number is inserted, so the template can never resolve to a valid name.

*Exam tip:* Count the characters in any name template question. 15 is the hard limit, letters, numbers and hyphens only, and it cannot be entirely numeric.

</details>

**Q2.** During an Autopilot deployment the Enrollment Status Page reports an error after the configured timeout. Which change is most likely to fix the underlying problem?

A. Disable the Enrollment Status Page entirely
B. Reduce the number of blocking apps to those genuinely required before first use
C. Increase the timeout to 7200 seconds
D. Switch the deployment mode to self-deploying

<details><summary>Answer</summary>

**B** — The timeout is a symptom. A blocking application that cannot install will still fail with a longer timeout, and disabling the page hides a genuine configuration failure rather than resolving it.

*Exam tip:* Treat blocking apps as a deliberate, minimal list. The exam favours answers that fix the cause over answers that extend the wait.

</details>

---

## Lab 18: Autopilot pre-provisioning and self-deploying mode

**Access:** Walkthrough — required device not available in this lab · **Estimated time:** 35 minutes · **Difficulty:** advanced

> [!IMPORTANT]
> Both modes require TPM 2.0 with device attestation, because the device must prove its own identity to the Autopilot service with no user signed in. A Hyper-V virtual TPM cannot reliably complete attestation against the service, so these deployments fail on lab hardware for reasons that have nothing to do with your configuration. The profile settings themselves are shown in full, and you can build and inspect them in your tenant — only the deployment itself cannot be run.

### Lab scenario

Two Autopilot modes exist for cases where user-driven is wrong. Pre-provisioning lets IT or an OEM absorb the slow part of a deployment before the device is shipped, so the user waits minutes rather than an hour. Self-deploying provisions a device with no user at all, which is what a meeting-room display or a shop-floor kiosk needs. You will configure both profiles and understand exactly what each produces.

### Objectives

After completing this lab, you will be able to:

- Create a deployment profile that permits pre-provisioning
- Describe the technician phase and the user phase and who completes each
- Create a self-deploying profile and state what it does not produce
- Explain why both modes require TPM attestation

### Exam objectives covered

- `g2.t1.s2` — Choose between Windows Autopilot deployment modes, including user-driven, pre-provisioning, and self-deploying
- `g2.t1.s4` — Implement Windows client deployment by using Windows Autopilot

### Prerequisites

- Completed labs: `autopilot-user-driven`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: kiosk.device

### Exercise 1: Pre-provisioning

#### Task 1: Enable pre-provisioning on a deployment profile

1. Select **Devices**, **Enrollment**, **Windows**, **Deployment Profiles**, then **Create profile** > **Windows PC**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Deployment Profiles** > **Create profile**

2. Configure the profile:

   | Setting | Value |
   | --- | --- |
   | Name | **AP-PreProvisioned-Corporate** |
   | Deployment mode | **User-Driven** |
   | Join to Microsoft Entra ID as | **Microsoft Entra joined** |
   | Allow pre-provisioned deployment | **Yes** <br> This single setting is what enables the technician phase. Pre-provisioning is not a separate deployment mode. |
   | User account type | **Standard** |
   | Apply device name template | **Yes, CTS-PRE-%RAND:5%** |

   > [!IMPORTANT]
   > Pre-provisioning is user-driven mode with one extra switch. That trips people up in exam questions: asked to *choose a deployment mode* for pre-provisioning, the answer is **user-driven**, with pre-provisioning enabled on it.

3. Assign it to a group and create it. Do not assign it to `GRP-DEV-AUTOPILOT` — that group already carries the user-driven profile from lab 17, and a device can only have one profile.

   > [!WARNING]
   > If two deployment profiles target the same device through different groups, the resulting profile is unpredictable. Keep Autopilot group membership mutually exclusive.

**Results:** A profile exists that supports the technician phase.

- [ ] **Allow pre-provisioned deployment** is **Yes** on the new profile.

#### Task 2: Understand the two phases

1. Pre-provisioning splits a deployment in two.

   |  | Technician phase | User phase |
   | --- | --- | --- |
   | Performed by | IT or the OEM, before shipping | The end user, on receipt |
   | Triggered by | Pressing the Windows key five times at the out-of-box experience, then selecting **Windows Autopilot provisioning** | Normal sign-in at the out-of-box experience |
   | What is applied | Device-targeted apps, certificates, configuration; the device joins Microsoft Entra ID and enrolls | User-targeted apps and policies |
   | Result | A green success screen; the device is resealed and shipped | The user signs in and reaches the desktop in minutes |
   | If it fails | A red screen with a log-collection option; the technician can retry | The Enrollment Status Page reports the failure |

   > [!TIP]
   > The value is entirely about *where the waiting happens*. A 4 GB engineering application installed in a warehouse on a wired connection costs the business nothing; the same install over a new starter's home broadband on their first morning costs an hour of their day and a support call.

**Results:** You can describe both phases and who performs each.

- [ ] You can state the key sequence that starts the technician phase.

### Exercise 2: Self-deploying mode

#### Task 1: Create a self-deploying profile

1. Create another profile under **Deployment Profiles** and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **AP-SelfDeploying-Kiosk** |
   | Deployment mode | **Self-Deploying (preview or GA depending on your tenant)** |
   | Join to Microsoft Entra ID as | **Microsoft Entra joined** <br> Self-deploying does not support hybrid join. The option is greyed out. |
   | Language, region, keyboard | **Set explicitly — there is no user to choose** <br> Leaving these as User select stalls a device with no user. |
   | Automatically configure keyboard | **Yes** |
   | Apply device name template | **Yes, KIOSK-%RAND:6%** |

   a. On the **Basics** tab, enter Name `AP-SelfDeploying-Kiosk`, then select **Next**.
   b. On the **Out-of-box experience (OOBE)** tab, configure the fields listed above, then select **Next**.
   c. On the **Assignments** tab, assign the profile to `GRP-DEV-AUTOPILOT-KIOSK`, then select **Next**.
   d. On the **Review + create** tab, select **Create**.

2. Note what self-deploying produces and, more importantly, what it does not:

   | Produces | Does not produce |
   | --- | --- |
   | A Microsoft Entra joined, Intune enrolled device | A primary user |
   | Device-targeted configuration and applications | Any user-targeted policy or application |
   | A device object with corporate ownership | An entry in a user's My Devices |
   | A device ready for kiosk or shared-device configuration | Anything that depends on user affinity |

   > [!IMPORTANT]
   > No primary user is the defining property and the source of most confusion. Administrators deploy a kiosk this way, assign an application to a user group, and then cannot understand why nothing installs. Everything targeting a self-deployed device must be assigned to a **device** group.

3. Understand why the lab hardware cannot run this:

   > [!NOTE]
   > With no user to authenticate, the device must prove its own identity. It does that with a TPM attestation certificate validated against the manufacturer's endorsement key. A Hyper-V virtual TPM has no manufacturer chain the Autopilot service will accept, so self-deploying and pre-provisioning both fail on virtual machines. The profile is still valid — only the hardware is not.

**Results:** A self-deploying profile exists and you can state its consequences.

- [ ] The profile shows **Microsoft Entra joined** with hybrid join unavailable.
- [ ] You can explain which assignments never reach a self-deployed device.

### Troubleshooting

**Symptom:** A pre-provisioning technician phase fails on a red screen mentioning TPM attestation.

- **Root cause:** The device's TPM cannot complete attestation. Common causes are a virtual TPM, a TPM 1.2 chip, or firmware that needs an update to supply a valid endorsement key certificate.
- **Diagnostic:**

  ```powershell
  Get-Tpm | Select-Object TpmPresent, TpmReady, ManufacturerIdTxt, ManufacturerVersion
  ```

- **Resolution:** Confirm the device has a physical TPM 2.0 and update the firmware. If attestation cannot be satisfied, use user-driven mode instead — it has no attestation requirement.

### Knowledge check

**Q1.** You want IT to install a large application before shipping laptops, so users wait only a few minutes at first sign-in. Which deployment mode should the Autopilot profile use?

A. Self-deploying
B. User-driven, with the Enrollment Status Page disabled
C. Pre-provisioning, selected as the deployment mode
D. User-driven, with Allow pre-provisioned deployment set to Yes

<details><summary>Answer</summary>

**D** — Pre-provisioning is not a deployment mode in its own right. It is user-driven mode with **Allow pre-provisioned deployment** enabled, which unlocks the technician phase at the out-of-box experience.

*Exam tip:* The three deployment modes are user-driven, pre-provisioning and self-deploying as concepts, but in the profile only user-driven and self-deploying are selectable — pre-provisioning is a toggle on user-driven.

</details>

**Q2.** A meeting-room device provisioned with self-deploying mode does not receive an application assigned to a user group. Why?

A. Self-deploying supports only Microsoft Store applications
B. Self-deploying assigns no primary user, so user-targeted assignments never resolve
C. Self-deploying blocks application installation during provisioning
D. The application must be assigned before the profile is created

<details><summary>Answer</summary>

**B** — Self-deploying provisions with no user present and therefore no primary user. Only device-targeted assignments reach the device.

*Exam tip:* Bulk enrollment and self-deploying share this property. Whenever a question mentions a shared or kiosk device receiving nothing, check whether the assignment was user-targeted.

</details>

---

## Lab 19: Windows Autopilot device preparation

**Access:** Hands-on · **Estimated time:** 55 minutes · **Difficulty:** advanced

### Lab scenario

Classic Autopilot depends on a hardware hash being uploaded before the device is ever switched on, and in practice that is the part organisations cannot manage — reused hardware, devices bought retail, machines already imaged. Device preparation removes the requirement entirely: any device that reaches the out-of-box experience and signs in with a targeted user provisions itself. You will build it, including the group-owner step that has no visible failure mode when you skip it.

### Objectives

After completing this lab, you will be able to:

- Create a device group owned by the Intune Provisioning Client service principal
- Create and assign a device preparation policy
- Deploy a device with no prior registration
- Compare the result with a classic Autopilot deployment

### Exam objectives covered

- `g2.t1.s1` — Choose between Windows Autopilot deployment profiles and device preparation policies

### Prerequisites

- Completed labs: `autopilot-user-driven`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm3-megan (Windows 11 Pro at OOBE)
- Personas: megan.bowen

### Exercise 1: Prepare the device group

This exercise is entirely about one setting. Skip it and the deployment fails late, with an error that points nowhere useful.

#### Task 1: Create the group and assign the service principal as owner

1. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**, then select **New group**.
   *Path:* **Groups** > **All groups** > **New group**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Group type | **Security** |
   | Group name | **GRP-DEV-DEVICEPREP** |
   | Membership type | **Assigned** <br> Must be Assigned. The provisioning service adds devices itself, which it cannot do to a dynamic group. |

   > [!WARNING]
   > A dynamic group will not work here and the portal will not stop you choosing one. The service needs to write membership, and dynamic membership is computed rather than written.

3. Select **Create**. Under **Groups** > **All groups**, select `GRP-DEV-DEVICEPREP`, select **Owners**, then select **Add owners**.
   *Path:* **Groups** > **All groups** > **GRP-DEV-DEVICEPREP** > **Owners** > **Add owners**

4. Search for `Intune Provisioning Client` and add it as an owner.

   > [!IMPORTANT]
   > This is the step. **Intune Provisioning Client** is the service principal that adds each device to the group during provisioning. Without ownership it has no write permission, membership is never granted, the policy is never considered to apply, and the deployment fails with nothing in the message about groups or owners. If a device preparation deployment fails and you have checked everything else, check this.

   **Verify:** **Owners** lists **Intune Provisioning Client**.

**Results:** A device group exists that the provisioning service can write to.

- [ ] `GRP-DEV-DEVICEPREP` has membership type **Assigned**.
- [ ] **Intune Provisioning Client** is an owner.

### Exercise 2: Create the device preparation policy

#### Task 1: Build and assign the policy

1. In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, **Windows**, then **Device preparation policies**, then **Create**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Device preparation policies** > **Create**

2. On **Basics**, name it `DP-Corporate-Standard`.

3. On **Configuration settings**:

   | Setting | Value |
   | --- | --- |
   | Deployment mode | **User-driven** <br> The only mode device preparation supports. |
   | Deployment type | **Single user** |
   | Join type | **Microsoft Entra joined** <br> Hybrid join is not supported at all. |
   | Device group | **GRP-DEV-DEVICEPREP** <br> The group you just created and gave the service principal ownership of. |
   | Device name template | **CTS-DP-%RAND:5%** |
   | Allow users to skip setup after error | **Yes** |

4. On **Applications**, add up to 10 applications to install during provisioning. Skip this for now — module 6 creates applications.

   > [!NOTE]
   > Device preparation caps this at 10 applications and 10 scripts by design, and reports progress per item rather than as one opaque wait. That constraint is deliberate: the classic Enrollment Status Page allowed an unbounded blocking list, which is how deployments ended up timing out.

5. On **Assignments**, assign the policy to `GRP-USR-HR`.

   > [!IMPORTANT]
   > Note what is being targeted. A classic Autopilot deployment profile is assigned to a **device** group; a device preparation policy is assigned to a **user** group. That inversion is one of the cleanest exam discriminators between the two models.

6. Create the policy.

**Results:** A device preparation policy targets HR users and will place their devices in the prepared group.

- [ ] The policy is assigned to a user group, not a device group.
- [ ] The device group named in the policy is the one owned by the provisioning service.

### Exercise 3: Deploy a device with no registration

#### Task 1: Deploy VM3 without a hardware hash

1. In the **Microsoft Intune admin center**, select **Devices**, then **Enrollment**, select the **Windows** tab, then select **Devices** (under Windows Autopilot). First remove VM3's Autopilot registration so the classic profile cannot claim it.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Devices**

   a. Find the device by serial number and select **Delete**.
   b. Also delete the device object under **Devices** > **All devices** and in Microsoft Entra ID.
   c. Wait a few minutes for deletion to propagate.

   > [!WARNING]
   > If the Autopilot registration survives, the device will use the classic profile from lab 17 and you will conclude, wrongly, that device preparation does not work. Both records must be gone.

2. Revert VM3 to the clean checkpoint and start it:

   *On the host*
   ```powershell
   Restore-VMCheckpoint -Name "OOBE-Clean" -VMName MD102-VM3-Megan -Confirm:$false
   Start-VM -Name MD102-VM3-Megan
   ```

3. Work through region, keyboard and network, then at the sign-in screen choose **Set up for work or school** and sign in as `megan.bowen@<tenant>.onmicrosoft.com`.

   > [!NOTE]
   > Unlike classic Autopilot there is no branded screen before sign-in, because the service has no idea which device this is until a user identifies themselves. Recognition happens *after* authentication — which is precisely why no hardware hash is needed.

4. Device preparation takes over after sign-in and shows its own progress screen.

   **Verify:** A provisioning screen appears listing security setup, device preparation and application installation as separate tracked items.

5. When the desktop appears on **MD102-VM3-Megan**, open PowerShell and verify:

   ```powershell
   hostname
   dsregcmd /status | Select-String "AzureAdJoined|MdmUrl"
   ```

   **Verify:** The name matches the `CTS-DP-` template and the device is Entra joined and enrolled.

6. In the **Microsoft Entra admin center**, select **Groups**, then **All groups**. Select `GRP-DEV-DEVICEPREP`, then select **Members** to confirm the service principal did its job:
   *Path:* **Groups** > **All groups** > **GRP-DEV-DEVICEPREP** > **Members**

   **Verify:** The new device is a member of the group. **Intune Provisioning Client** added it during provisioning — if this is empty, the owner assignment was missing.

**Results:** A device provisioned with no prior registration of any kind.

- [ ] The device is Entra joined, Intune enrolled and named from the template.
- [ ] It is a member of `GRP-DEV-DEVICEPREP`.
- [ ] It was never registered with the Autopilot service.

#### Task 2: Compare the two models

1. Having run both, record the differences you actually observed.

   |  | Classic Autopilot (lab 17) | Device preparation (this lab) |
   | --- | --- | --- |
   | Preparation before power-on | Hardware hash captured and imported | None |
   | Branding before sign-in | Organisation shown on the sign-in screen | Standard Windows sign-in |
   | Recognition point | Before authentication, by hardware hash | After authentication, by user group membership |
   | Policy assigned to | Device group | User group |
   | Device group role | Populated automatically from registration | Populated by the provisioning service, which must own it |
   | Modes available | User-driven, pre-provisioning, self-deploying | User-driven only |
   | Hybrid join | Supported for user-driven | Not supported |

**Results:** You can articulate the difference between the two models from experience rather than theory.

- [ ] You can state at which point in the flow each model identifies the device.

### Troubleshooting

**Symptom:** Device preparation fails partway through, and the device group has no members.

- **Root cause:** The **Intune Provisioning Client** service principal is not an owner of the device group, so it cannot add the device to it.
- **Diagnostic:**

  ```text
  Entra admin center > Groups > the device group > Owners
  Confirm Intune Provisioning Client is listed.
  ```

- **Resolution:** Add **Intune Provisioning Client** as a group owner and redeploy. Also confirm the group is Assigned rather than Dynamic — the service cannot write membership to a dynamic group.

### Knowledge check

**Q1.** A Windows Autopilot device preparation deployment fails and the target device group is empty. Configuration otherwise looks correct. What should you check?

A. That the Intune Provisioning Client service principal is an owner of the device group
B. That the device's hardware hash has been imported
C. That the deployment mode is set to self-deploying
D. That the policy is assigned to a device group

<details><summary>Answer</summary>

**A** — The provisioning service adds the device to the group during deployment, which requires ownership of that group. Device preparation needs no hardware hash, is assigned to a user group, and supports user-driven mode only.

*Exam tip:* Memorise this prerequisite. It is unique to device preparation, has no equivalent in classic Autopilot, and produces a failure that names nothing useful.

</details>

---

## Lab 20: Windows 11 edition upgrades and Windows Backup

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Adele's laptop runs Windows 11 Pro, but Contoso's Microsoft 365 E5 licences entitle every user to Enterprise — and several settings you will deploy in later modules only exist on Enterprise. Subscription activation steps the edition up on sign-in, with no key, no media and no reboot. You will watch that happen, then configure Windows Backup so a device rebuild restores a user's settings instead of starting from nothing.

### Objectives

After completing this lab, you will be able to:

- Explain how subscription activation upgrades Windows 11 Pro to Enterprise
- Verify an edition step-up from the client
- Configure a Windows Backup policy in Intune
- Describe what Windows Backup restores during Autopilot and what it does not

### Exam objectives covered

- `g2.t1.s6` — Plan and implement device upgrades for Windows 11 by using Intune
- `g2.t1.s8` — Implement Windows Backup and Restore by using Intune

### Prerequisites

- Completed labs: `windows-enrollment-paths`
- Licences: M365-E5, WIN-ENT-E5
- Roles: Intune Administrator
- Devices and portals: vm1-adele (Windows 11 Pro), Microsoft Intune admin center
- Personas: adele.vance

### Exercise 1: Subscription activation

#### Task 1: Confirm the current edition and licence entitlement

1. On **MD102-VM1-Adele**, signed in as Adele, open **Windows PowerShell** and check the edition:

   ```powershell
   Get-ComputerInfo -Property WindowsProductName, WindowsEditionId, OsName
   ```

   **Verify:** **WindowsEditionId** reads `Professional`.

2. On **MD102-VM1-Adele**, inspect the licensing state in Command Prompt:

   ```cmd
   slmgr /dli
   ```

   > [!NOTE]
   > Subscription activation is driven by the **Client License Service (ClipSVC)**. It reads the user's Windows 11 Enterprise E5 entitlement from Microsoft Entra ID at sign-in and steps the edition up in place — no product key, no installation media, and no reboot. If the service is stopped, nothing happens and there is no error.

3. Confirm the entitlement is actually present on the account:

   *Run from your host with an active Graph session*
   ```powershell
   Connect-MgGraph -Scopes "User.Read.All"
   (Get-MgUserLicenseDetail -UserId "adele.vance@<tenant>.onmicrosoft.com").ServicePlans |
       Where-Object { $_.ServicePlanName -like "*WIN10*" -or $_.ServicePlanName -like "*WINDOWS*" } |
       Select-Object ServicePlanName, ProvisioningStatus
   ```

   **Verify:** A Windows service plan is listed with a provisioning status of **Success**. Without it there is no entitlement and the step-up will never occur.

**Results:** You know the starting edition and can prove the entitlement exists.

- [ ] The device reports **Professional**.
- [ ] Adele holds a Windows service plan in a successful state.

#### Task 2: Trigger and verify the step-up

1. Sign out of Windows completely, then sign back in as Adele.

   > [!TIP]
   > Locking and unlocking is not enough. The entitlement is evaluated at interactive sign-in, which is also why a device that has been powered off for months upgrades the first time someone actually signs in.

2. Give it a few minutes, then check the edition again in PowerShell on **MD102-VM1-Adele**:

   ```powershell
   Get-ComputerInfo -Property WindowsProductName, WindowsEditionId
   ```

   **Verify:** **WindowsEditionId** now reads `Enterprise`. The device did not restart and no key was entered.

3. If nothing changed, check the service that performs the upgrade in PowerShell on **MD102-VM1-Adele**:

   ```powershell
   Get-Service ClipSVC | Select-Object Name, Status, StartType
   Get-WinEvent -LogName "Microsoft-Windows-AAD/Operational" -MaxEvents 20 |
       Select-Object TimeCreated, Id, LevelDisplayName
   ```

   > [!IMPORTANT]
   > Subscription activation needs three things: the device joined to Microsoft Entra ID, the user holding a Windows Enterprise entitlement, and ClipSVC running. All three are silent when they fail, so check all three rather than looking for an error message.

**Results:** The device stepped from Pro to Enterprise without reinstallation.

- [ ] **WindowsEditionId** is `Enterprise`.
- [ ] No restart or product key was required.

### Exercise 2: Windows Backup

#### Task 1: Create a Windows Backup policy

1. In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Choose the platform and profile:

   | Setting | Value |
   | --- | --- |
   | Platform | **Windows 10 and later** |
   | Profile type | **Settings catalog** |
   | Name | **WIN-Backup-Corporate** |

3. In the settings picker, search for `Windows Backup`, add the settings from the **Windows Backup** category, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Enable Windows Backup | **Enabled** |
   | Back up Windows settings | **Enabled** <br> Accessibility, personalisation, language and other Windows preferences. |
   | Back up installed apps list | **Enabled** <br> The list, not the applications themselves. |
   | Back up credentials | **Enabled** <br> Saved Wi-Fi networks and stored passwords. |

   a. On the **Basics** tab, enter Name `WIN-Backup-Corporate`, then select **Next**.
   b. On the **Configuration settings** tab, select **Add settings**, find the four settings above and enable each, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign the profile to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > Windows Backup restores *settings and a list of apps*, not files and not the applications themselves. User files are OneDrive's job through Known Folder Move, and applications are redeployed by Intune. Confusing these is a common exam trap: a question asking how a user's documents survive a rebuild is asking about OneDrive, not Windows Backup.

**Results:** Corporate Windows devices back up settings, credentials and their application list.

- [ ] `WIN-Backup-Corporate` appears under **Configuration** with an assignment.

#### Task 2: Understand the restore path

1. Restore happens during the out-of-box experience, after the user signs in.

   | Restored | Not restored |
   | --- | --- |
   | Windows settings and personalisation | User files — use OneDrive Known Folder Move |
   | Accessibility preferences | Application binaries — Intune redeploys them |
   | Saved Wi-Fi networks and credentials | Local accounts and their profiles |
   | A list of previously installed apps, pinned for reinstall | Anything from a device the user was not the primary user of |

   > [!NOTE]
   > Restore is offered during a user-driven Autopilot deployment when the same user signs in to a new or reset device. It does not apply to self-deploying or to devices with no primary user, because there is no user whose backup could be restored.

2. Note the full picture Contoso needs for a clean rebuild story:

   | What survives a rebuild | Mechanism | Configured in |
   | --- | --- | --- |
   | Documents, Desktop, Pictures | OneDrive Known Folder Move | Lab 22, settings catalog |
   | Windows settings and preferences | Windows Backup | This lab |
   | Applications | Intune assignment | Module 6 |
   | BitLocker recovery key | Escrow to Microsoft Entra ID | Lab 43 |

**Results:** You can describe exactly which parts of a user's environment survive a rebuild and by what mechanism.

- [ ] You can name the feature responsible for restoring user documents.

### Troubleshooting

**Symptom:** A Microsoft Entra joined device stays on Windows 11 Pro despite the user holding Microsoft 365 E5.

- **Root cause:** One of the three prerequisites is missing: the device is not Entra joined, the user's Windows Enterprise service plan is not provisioned, or ClipSVC is stopped or disabled.
- **Diagnostic:**

  ```powershell
  dsregcmd /status | Select-String "AzureAdJoined"
  Get-Service ClipSVC | Select-Object Status, StartType
  slmgr /dli
  ```

- **Resolution:** Confirm the join, confirm the entitlement in the Microsoft 365 admin center, start ClipSVC, then sign out and back in. The step-up is evaluated at interactive sign-in only.

### Knowledge check

**Q1.** A user's Windows 11 Pro device is Microsoft Entra joined and the user holds Microsoft 365 E5. Which additional step is required to upgrade the device to Enterprise?

A. Reinstall Windows using Enterprise media
B. Enter a Windows 11 Enterprise product key
C. Deploy a Windows 11 feature update policy targeting Enterprise
D. None — sign out and back in, and subscription activation steps the edition up

<details><summary>Answer</summary>

**D** — Subscription activation upgrades the edition in place using the user's entitlement, with no key, no media and no restart. It is evaluated at interactive sign-in.

*Exam tip:* Remember the three prerequisites — Entra joined, Windows Enterprise entitlement, ClipSVC running — and that all three fail silently.

</details>

**Q2.** A user's device is reset and redeployed with Autopilot. Windows Backup is enabled. Which of the following is restored?

A. The applications themselves, reinstalled from the backup
B. The user's documents and desktop files
C. Windows settings, saved credentials and a list of previously installed apps
D. Local user accounts and their profiles

<details><summary>Answer</summary>

**C** — Windows Backup covers settings, credentials and an app list that is pinned for reinstall. Files are OneDrive's responsibility and applications are redeployed by Intune.

*Exam tip:* Windows Backup restores the shape of the environment, not its contents. Files mean OneDrive Known Folder Move.

</details>

---

## Lab 21: Windows 365 Cloud PCs

**Access:** Walkthrough — licence not included in Microsoft 365 E5 · **Estimated time:** 35 minutes · **Difficulty:** intermediate

> [!IMPORTANT]
> Windows 365 is a separate subscription and is not part of Microsoft 365 E5. Provisioning a Cloud PC requires Windows 365 Enterprise licences, which are sold per user and only trialled through a sales-arranged promotional licence. The provisioning policy, network connection and image management surfaces are all examined, so this lab covers them as configuration paths and decision criteria you can read in your own tenant without being able to provision.

### Lab scenario

Contoso is opening a development office abroad and does not want to ship laptops. Windows 365 gives each user a persistent Cloud PC, managed by Intune exactly like a physical device. The provisioning policy decides who gets one and what it looks like; the network connection decides where it lives; the image decides what it starts from. Those three objects are what the exam asks about.

### Objectives

After completing this lab, you will be able to:

- Describe the difference between Windows 365 Enterprise and Business
- Explain what a provisioning policy controls and how Cloud PCs are assigned
- Compare Microsoft hosted network with Azure network connection
- Describe gallery images versus custom images
- Name the Intune roles that govern Cloud PC administration

### Exam objectives covered

- `g2.t1.s7` — Provision and configure Windows 365 Cloud PCs by using Intune, including provisioning policies, network connections, and image management

### Prerequisites

- Completed labs: `deployment-method-decision`
- Licences: M365-E5, WINDOWS-365
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: pradeep.gupta

### Exercise 1: Editions and the three objects

#### Task 1: Choose an edition

1. The edition decides whether Intune is in the picture at all.

   |  | Windows 365 Business | Windows 365 Enterprise |
   | --- | --- | --- |
   | Managed by Intune | No | **Yes** |
   | Maximum seats | 300 | Unlimited |
   | Requires Microsoft Entra ID and Intune licences | No | Yes |
   | Custom images | No | Yes |
   | Own network (Azure virtual network) | No | Yes |
   | Provisioning policies | No — provisioned per user in the admin centre | Yes |
   | Typical customer | Small business with no IT department | Any organisation already using Intune |

   > [!IMPORTANT]
   > Only **Enterprise** is examinable in an MD-102 context, because only Enterprise Cloud PCs appear in Intune and receive Intune policy. Any question mentioning provisioning policies, custom images or configuration profiles is describing Enterprise.

2. In the **Microsoft Intune admin center**, select **Devices**, then **Windows 365**. Note where Cloud PCs live in the portal:
   *Path:* **Devices** > **Windows 365**

   > [!NOTE]
   > The blade is visible even without licences, so you can inspect its structure. Provisioning policies, Azure network connections, custom images and user settings are all here.

**Results:** You can identify which Windows 365 edition a scenario describes.

- [ ] You can state which edition is managed by Intune.

#### Task 2: Understand the provisioning policy

1. The path is **Devices** > **Windows 365** > **Provisioning policies** > **Create policy**.
   *Path:* **Devices** > **Windows 365** > **Provisioning policies** > **Create policy**

2. A provisioning policy carries these settings:

   | Setting | Value |
   | --- | --- |
   | Join type | **Microsoft Entra join, or Hybrid Microsoft Entra join** <br> Hybrid requires an Azure network connection with line of sight to a domain controller. |
   | Network | **Microsoft hosted network, or Azure network connection** |
   | Image | **Gallery image, or a custom image you uploaded** |
   | Language and region | **Applied to the provisioned Cloud PC** |
   | Naming template | **For example CPC-%USERNAME:5%-%RAND:5%** |
   | Assignments | **A user group whose members hold Windows 365 licences** |

   > [!IMPORTANT]
   > Assignment is to a **user** group, and each member must hold a Windows 365 licence. A user in the group without a licence gets no Cloud PC and no obvious error — the same failure shape as group-based licensing running out of seats.

3. Note what happens when a policy changes:

   > [!WARNING]
   > Changing the image on an existing provisioning policy does **not** rebuild existing Cloud PCs. It affects new provisioning only. To move an existing Cloud PC to a new image you reprovision it, which discards everything on the local disk.

**Results:** You can describe what a provisioning policy controls and how it is targeted.

- [ ] You can name what a Cloud PC assignment targets.
- [ ] You can state what happens to existing Cloud PCs when the image changes.

### Exercise 2: Network connections and images

#### Task 1: Choose a network

1. The network decision is usually the first real design decision in a Windows 365 deployment.

   |  | Microsoft hosted network | Azure network connection |
   | --- | --- | --- |
   | Azure subscription needed | No | Yes |
   | Cloud PC can reach on-premises resources | No | Yes, over the virtual network |
   | Hybrid Microsoft Entra join | Not supported | Supported |
   | Control over IP addressing and routing | None | Full |
   | Setup effort | None | Virtual network, subnet, DNS, and a health check that must pass |
   | Typical use | Cloud-only organisations | Anything needing on-premises access or hybrid join |

   > [!NOTE]
   > An Azure network connection runs a periodic **health check** covering DNS resolution, domain join if configured, endpoint connectivity and subnet capacity. A failing health check blocks provisioning entirely, and the check results are the first place to look when Cloud PCs stop being created.

**Results:** You can select a network type from a connectivity requirement.

- [ ] You can name the network type required for hybrid join.

#### Task 2: Understand image management and Cloud PC roles

1. Images come from two places:

   |  | Gallery image | Custom image |
   | --- | --- | --- |
   | Source | Microsoft's curated list | An Azure managed image you build and upload |
   | Includes Microsoft 365 Apps | Optionally, in the with-Office variants | Whatever you put in it |
   | Maintenance | Microsoft updates them | Yours to rebuild and re-upload |
   | Requires an Azure subscription | No | Yes, to hold the managed image |
   | Best for | Standard desktops configured entirely by Intune | Line-of-business software that cannot be deployed by Intune |

   > [!TIP]
   > Prefer gallery images plus Intune configuration. A custom image is a maintenance commitment: every patch cycle it drifts further from current, and rebuilding it is manual. Reach for one only when something genuinely cannot be installed by policy.

2. Note the roles that govern Cloud PC administration, which are Intune RBAC roles from lab 7:

   | Role | Grants |
   | --- | --- |
   | Windows 365 Administrator | Full Cloud PC management including provisioning policies, images and network connections |
   | Cloud PC Administrator | Read and write across the Cloud PC service |
   | Cloud PC Reader | Read-only view of Cloud PCs and provisioning policies |

3. Note the remote actions unique to Cloud PCs, which sit alongside the standard ones from lab 50:

   | Action | Effect |
   | --- | --- |
   | Reprovision | Rebuilds the Cloud PC from the policy image. **All local data is lost.** |
   | Resize | Moves the Cloud PC to a different size, keeping the disk |
   | Restore | Rolls back to a previous restore point |
   | Place under review | Preserves a snapshot for investigation while keeping the user working |

**Results:** You can describe image options, Cloud PC roles and the remote actions specific to Windows 365.

- [ ] You can name the remote action that destroys local data.
- [ ] You can name the role that permits provisioning-policy management.

### Troubleshooting

**Symptom:** Users are in the assigned group but no Cloud PCs are provisioned.

- **Root cause:** Either the users hold no Windows 365 licence, or the Azure network connection health check is failing, which blocks provisioning entirely.
- **Diagnostic:**

  ```text
  Devices > Windows 365 > Azure network connection > select the connection > review the health check results
  Devices > Windows 365 > All Cloud PCs > check provisioning status per user
  ```

- **Resolution:** Assign Windows 365 licences to the group members, then resolve any failing health check item — most often DNS resolution or insufficient free addresses in the subnet.

### Knowledge check

**Q1.** Contoso needs Cloud PCs that can reach an on-premises file server and be hybrid Microsoft Entra joined. Which network configuration is required?

A. The Microsoft hosted network with a site-to-site VPN
B. An Azure network connection using a virtual network with line of sight to a domain controller
C. The Microsoft hosted network, which supports hybrid join by default
D. An Azure network connection is optional; hybrid join works on either network

<details><summary>Answer</summary>

**B** — The Microsoft hosted network provides no route to on-premises resources and does not support hybrid Microsoft Entra join. Both requirements force an Azure network connection.

*Exam tip:* On-premises access or hybrid join always means Azure network connection. Cloud-only with no on-premises dependency means Microsoft hosted network.

</details>

**Q2.** You update the image on an existing Windows 365 provisioning policy. What happens to Cloud PCs already provisioned by that policy?

A. They are rebuilt automatically on the new image at the next restart
B. Nothing — the new image applies only to newly provisioned Cloud PCs
C. They are placed under review until an administrator approves the change
D. They are resized to match the new image requirements

<details><summary>Answer</summary>

**B** — Provisioning policy image changes affect new provisioning only. Moving an existing Cloud PC to a new image requires a reprovision, which destroys everything on the local disk.

*Exam tip:* Reprovision is destructive. Any question offering it as a routine maintenance action is testing whether you know that.

</details>

---

# Module 4 — Device configuration

Shape the desktop with the settings catalog, ADMX imports and Group Policy analytics; target precisely with assignment filters and enrollment time grouping; then layer on certificates, Windows Hello for Business and Windows LAPS.

## Lab 22: The settings catalog: profiles, assignment and conflicts

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** intermediate

### Lab scenario

The settings catalog is where nearly all Windows configuration now happens. It exposes the underlying configuration service providers directly, which makes it powerful and makes it easy to build two profiles that contradict each other. You will configure OneDrive Known Folder Move — the setting that decides whether a user's files survive a device rebuild — then deliberately create a conflict so you know what one looks like in the reporting.

### Objectives

After completing this lab, you will be able to:

- Create a settings catalog profile and target it correctly
- Configure OneDrive Known Folder Move end to end
- Read per-setting deployment status in the profile report
- Recognise a configuration conflict and know how Intune resolves it
- Use include and exclude assignments together

### Exam objectives covered

- `g2.t2.s1` — Create device configuration profiles for Windows devices, including importing ADMX files and using Group Policy analytics

### Prerequisites

- Completed labs: `groups-for-devices`, `enrollment-settings`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: Build a settings catalog profile

#### Task 1: Configure OneDrive Known Folder Move

1. In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Set the platform and profile type:

   | Setting | Value |
   | --- | --- |
   | Platform | **Windows 10 and later** |
   | Profile type | **Settings catalog** |
   | Name | **WIN-OneDrive-KFM** |

3. Select **Add settings**, search for `Known Folder`, open the **OneDrive** category, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Silently move Windows known folders to OneDrive | **Enabled** |
   | Tenant ID | **Your tenant GUID** <br> Copy it from Entra admin center > Overview. The setting silently does nothing if this is wrong. |
   | Show notification to users after folders have been redirected | **Enabled** |
   | Silently sign in users to the OneDrive sync app with their Windows credentials | **Enabled** |
   | Prevent users from redirecting their Windows known folders back to their PC | **Enabled** |
   | Use OneDrive Files On-Demand | **Enabled** |

   a. On the **Basics** tab, enter Name `WIN-OneDrive-KFM`, then select **Next**.
   b. On the **Configuration settings** tab, select **Add settings**, add and configure the six settings above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign the profile to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > The tenant ID is a GUID, not your tenant name. This is the most common reason Known Folder Move appears to deploy successfully and never actually redirects anything — the profile reports Succeeded because the setting was written, and the setting does nothing because it points at a tenant that is not yours.

   > [!NOTE]
   > OneDrive settings can be targeted at users or devices. Targeting the device group means every user of a corporate machine gets the behaviour, which is usually what an organisation wants.

**Results:** Corporate devices silently redirect Desktop, Documents and Pictures into OneDrive.

- [ ] `WIN-OneDrive-KFM` appears under **Configuration**.
- [ ] The tenant ID setting contains a GUID.

#### Task 2: Verify from the device and the report

1. On **MD102-VM1-Adele**, force a policy sync:
   *Path:* **Settings** > **Accounts** > **Access work or school** > **Info** > **Sync**

   > [!TIP]
   > Configuration changes reach a device on its own schedule — roughly every eight hours, sooner after enrollment. **Sync** requests an immediate check-in and is the single most useful button on a managed Windows device.

2. On **MD102-VM1-Adele**, confirm the setting arrived in the registry (run in an elevated Administrator PowerShell session):

   ```powershell
   Get-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\OneDrive" -ErrorAction SilentlyContinue |
       Select-Object KFMSilentOptIn, KFMBlockOptOut, FilesOnDemandEnabled, SilentAccountConfig
   ```

   **Verify:** **KFMSilentOptIn** contains your tenant GUID and the other values are `1`.

3. Back in the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, select the **WIN-OneDrive-KFM** profile from the list, and review the **Device status** and **Per setting status** views.
   *Path:* **Devices** > **Configuration** > **WIN-OneDrive-KFM**

   **Verify:** **Per setting status** shows each individual setting as **Succeeded**, **Error**, **Conflict** or **Not applicable**. This is the view that tells you *which* setting failed rather than just that the profile did.

**Results:** The profile is applied and you can read its status per setting.

- [ ] The registry on the device carries the policy values.
- [ ] **Per setting status** reports success.

### Exercise 2: Conflicts and assignment logic

#### Task 1: Create a conflict on purpose

1. Create a second settings catalog profile named `WIN-OneDrive-Conflict`.

2. Add the same **Use OneDrive Files On-Demand** setting, but set it to **Disabled**.

3. Assign it to `GRP-DEV-WIN-CORP` as well — the same group as the first profile — and create it.

4. Sync the device, wait a few minutes, then check the per setting status on both profiles.

   **Verify:** **Use OneDrive Files On-Demand** reports **Conflict** on both profiles.

   > [!IMPORTANT]
   > Intune does not pick a winner. When two profiles set the same configuration service provider node to different values, the setting is reported as **Conflict** and **neither value is applied** — the device keeps whatever it had. This is different from compliance policy, where the most restrictive setting wins, and different from enrollment restrictions, where priority decides.

5. On **MD102-VM1-Adele**, confirm on the device that the setting did not change (run in an elevated Administrator PowerShell session):

   ```powershell
   Get-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\OneDrive" |
       Select-Object FilesOnDemandEnabled
   ```

6. Delete `WIN-OneDrive-Conflict`, sync again, and confirm the setting resolves back to **Succeeded**.

**Results:** You can recognise a conflict and know that it leaves the setting unapplied.

- [ ] You observed **Conflict** in the per setting status.
- [ ] Deleting the second profile resolved it.

#### Task 2: Use exclude assignments

1. In the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, select the **WIN-OneDrive-KFM** profile from the list, select **Properties**, then next to **Assignments** select **Edit**.
   *Path:* **Devices** > **Configuration** > **WIN-OneDrive-KFM** > **Properties** > **Assignments** > **Edit**

2. In the **Assignments** section, select **Add groups** under **Excluded groups** to add an exclusion, then select **Review + save**:

   | Setting | Value |
   | --- | --- |
   | Included groups | **GRP-DEV-WIN-CORP** |
   | Excluded groups | **GRP-DEV-SHARED** <br> Shared devices should not redirect one user's folders into their OneDrive. |

   > [!IMPORTANT]
   > Exclusion always beats inclusion. A device in both groups receives nothing. This makes exclusion an effective emergency brake — adding a device to an excluded group is the fastest way to stop a bad profile reaching it without deleting the profile for everyone.

3. Select **Review + save**, then **Save**, and note the one rule that catches people out:

   > [!WARNING]
   > You cannot mix user groups and device groups between include and exclude on the same profile. Including a user group and excluding a device group is rejected, because Intune cannot evaluate the two against each other. Keep an assignment entirely user-based or entirely device-based.

**Results:** The profile reaches corporate devices except shared ones.

- [ ] The assignment shows both an included and an excluded group.
- [ ] You can state which wins when a device is in both.

### Troubleshooting

**Symptom:** A settings catalog profile reports Succeeded but the configured behaviour never appears on the device.

- **Root cause:** The setting was written correctly but its value is wrong — most commonly a OneDrive tenant ID containing the tenant name instead of the GUID. Intune reports whether the setting was applied, not whether the value is meaningful.
- **Diagnostic:**

  ```powershell
  Get-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\OneDrive" | Format-List
  Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 30 |
      Where-Object Id -eq 814
  ```

- **Resolution:** Compare the value written on the device with what the setting expects. Succeeded means delivered, never correct — event 814 names the CSP path when delivery itself fails.

### Knowledge check

**Q1.** Two settings catalog profiles assigned to the same device group set the same setting to different values. What happens on the device?

A. The profile created most recently wins
B. The most restrictive value is applied
C. The setting reports Conflict and neither value is applied
D. The profile with the lowest priority number wins

<details><summary>Answer</summary>

**C** — Device configuration conflicts are not resolved by Intune. The setting is reported as Conflict and left unapplied, so the device keeps its previous value.

*Exam tip:* Three different resolution models to keep straight: configuration conflicts leave the setting unapplied, compliance takes the most restrictive value, and enrollment restrictions are decided by priority.

</details>

**Q2.** A device belongs to a group included on a configuration profile and also to a group excluded from it. What does the device receive?

A. Nothing — exclusion takes precedence over inclusion
B. The profile, because inclusion is evaluated first
C. The assignment is rejected as invalid
D. The profile, but with conflicting settings omitted

<details><summary>Answer</summary>

**A** — Exclusion always wins. This makes an exclusion group a reliable emergency brake for stopping a profile reaching specific devices without removing it from everyone.

*Exam tip:* You also cannot mix user and device groups across include and exclude on the same assignment — Intune rejects it.

</details>

---

## Lab 23: ADMX templates and Group Policy analytics

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Contoso has twenty years of Group Policy and nobody willing to guess which of it still matters. Group Policy analytics imports a GPO backup, tells you what percentage of its settings have a modern equivalent, and can migrate the supported ones straight into a settings catalog profile. You will run that analysis, migrate the result, and import a third-party ADMX template for software that Group Policy managed and the settings catalog does not know about.

### Objectives

After completing this lab, you will be able to:

- Import a Group Policy backup and read the analytics report
- Interpret the migration readiness percentage
- Migrate supported settings into a settings catalog profile
- Import a custom ADMX and ADML pair and configure a setting from it
- Explain what happens to settings with no modern equivalent

### Exam objectives covered

- `g2.t2.s1` — Create device configuration profiles for Windows devices, including importing ADMX files and using Group Policy analytics

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center

### Exercise 1: Analyse a Group Policy Object

#### Task 1: Produce a GPO export to import

1. Group Policy analytics needs an XML export of a GPO. You have no domain, so create a representative one on **MD102-VM1-Adele** from its local policy:

   *Produces an XML report of local policy settings*
   ```powershell
   gpresult /X C:\Temp\localpolicy.xml /f
   ```

   > [!NOTE]
   > In a real migration you would use `Backup-GPO` on a domain controller, or right-click a GPO in the Group Policy Management Console and choose **Save Report** as XML. The analytics engine accepts the XML either way.

2. If the local export is too sparse to be interesting, write a small synthetic GPO XML instead. The analytics engine only needs valid structure:

   > [!TIP]
   > A more useful option: Microsoft publishes the security baseline GPO backups in the **Microsoft Security Compliance Toolkit**. Downloading a Windows 11 baseline gives you a realistic, several-hundred-setting GPO to analyse, and it is free.

**Results:** You have a GPO XML export ready to import.

- [ ] An XML file exists that you can upload.

#### Task 2: Import and read the analytics report

1. In the **Microsoft Intune admin center**, select **Devices**, **Group Policy analytics**, then **Import**.
   *Path:* **Devices** > **Group Policy analytics** > **Import**

2. Upload the XML file and wait for processing, then open the imported policy.

3. Read what the report tells you:

   | Column | Meaning |
   | --- | --- |
   | MDM support | The percentage of settings in this GPO that have a modern configuration service provider equivalent |
   | Targeted in Microsoft Entra ID | Whether the GPO's scope maps to groups that exist in your tenant |
   | Setting name | The original Group Policy setting |
   | MDM support (per setting) | Supported, Not supported, or Deprecated |
   | CSP name and CSP mapping | The configuration service provider node the setting maps to |

   > [!IMPORTANT]
   > A percentage well below 100 is normal and is not a failure. It usually means the GPO contains settings that are deprecated, that apply to server roles, or that were only ever meaningful on a domain-joined device. The report's real value is separating *still relevant and migratable* from *nobody has needed this since 2012*.

4. Filter the setting list by **MDM support: Not supported** and consider what to do with each.

   | Situation | Modern answer |
   | --- | --- |
   | Setting is deprecated | Drop it |
   | Setting has a settings catalog equivalent under a different name | Configure it directly in the catalog |
   | Setting belongs to third-party software | Import that vendor's ADMX — exercise 2 |
   | Setting genuinely has no equivalent | A custom OMA-URI profile, or a PowerShell script from module 10 |

**Results:** You can read a migration readiness report and classify its unsupported settings.

- [ ] The imported policy shows an MDM support percentage.
- [ ] You can name three options for a setting with no CSP equivalent.

#### Task 3: Migrate the supported settings

1. In the **Microsoft Intune admin center**, select **Devices**, then **Group Policy analytics**, select the imported GPO from the list, then select **Migrate**.
   *Path:* **Devices** > **Group Policy analytics** > **Migrate**

2. Review the settings offered. Only those with a CSP mapping appear.

   > [!TIP]
   > Deselect anything you do not actively want. Migration is a chance to drop accumulated policy, not to carry all of it forward — a GPO that nobody has reviewed in a decade should not become a settings catalog profile nobody reviews for another decade.

3. Name the resulting profile `WIN-Migrated-From-GPO`, assign it to `GRP-USR-PILOT` rather than all corporate devices, and complete the migration.

   > [!WARNING]
   > Assign a migrated profile to a pilot group first, always. Group Policy and MDM apply settings through different mechanisms and a setting that behaved one way under Group Policy can behave differently as a CSP. Prove it on a handful of devices before it reaches the estate.

4. Open the resulting profile: in the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, and select **WIN-Migrated-From-GPO**.
   *Path:* **Devices** > **Configuration** > **WIN-Migrated-From-GPO**

   **Verify:** It is an ordinary settings catalog profile. Migration is a one-time conversion — there is no ongoing link to the original GPO, and changing the GPO later changes nothing here.

**Results:** Supported Group Policy settings now exist as a settings catalog profile scoped to a pilot group.

- [ ] `WIN-Migrated-From-GPO` exists under **Configuration**.
- [ ] It is assigned to a pilot group rather than all devices.

### Exercise 2: Import a custom ADMX template

#### Task 1: Ingest an ADMX and ADML pair

1. Download a third-party administrative template. Google Chrome's is a good example because it is freely available and widely deployed.

   > [!NOTE]
   > An ADMX file defines the settings; an ADML file supplies the display names and descriptions for one language. You need both, and the ADML must be the one matching the ADMX version — mismatched pairs import and then show blank setting names.

2. In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then the **Import ADMX** tab, then **Import**.
   *Path:* **Devices** > **Configuration** > **Import ADMX** > **Import**

3. Upload the files:

   | Setting | Value |
   | --- | --- |
   | ADMX file | **chrome.admx** |
   | ADML file | **chrome.adml (en-US)** |

4. Wait for the status to change from **Pending** to **Available**.

   > [!IMPORTANT]
   > If the ADMX depends on another ADMX — a `parentCategory` reference to something like `windows.admx` — the import fails until the dependency is imported first. The error names the missing file, so read it rather than assuming the template is unsupported.

**Results:** A third-party administrative template is available for policy authoring.

- [ ] The imported ADMX shows a status of **Available**.

#### Task 2: Configure a setting from the imported template

1. Create a new profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, profile type **Templates** > **Imported Administrative templates**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Name it `WIN-Chrome-Policy`, then browse the imported settings tree and configure something recognisable, such as the browser home page or disabling the built-in password manager.

3. Assign it to `GRP-USR-PILOT` and create the profile.

   > [!NOTE]
   > Imported ADMX settings appear under **Imported Administrative templates**, not in the settings catalog. That separation is worth remembering — searching the settings catalog for a Chrome setting returns nothing and looks like the import failed.

**Results:** A third-party application is configured through Intune using its own administrative template.

- [ ] `WIN-Chrome-Policy` exists and carries at least one configured setting.

### Troubleshooting

**Symptom:** An ADMX import fails or remains in a pending state.

- **Root cause:** A missing dependency — the ADMX references a parent category defined in another ADMX that has not been imported — or a mismatched ADML that does not correspond to the ADMX version.
- **Diagnostic:**

  ```text
  Devices > Configuration > Import ADMX
  Open the failed import and read the status message; it names the missing file.
  ```

- **Resolution:** Import the dependency first, then retry. Ensure the ADML comes from the same download as the ADMX — a mismatched pair imports but shows blank setting names.

### Knowledge check

**Q1.** Group Policy analytics reports that a GPO has 62 percent MDM support. What does this mean?

A. 62 percent of targeted devices support MDM management
B. 62 percent of the settings are already applied through Intune
C. The migration will succeed on 62 percent of devices
D. 62 percent of the settings in that GPO have a configuration service provider equivalent and can be migrated

<details><summary>Answer</summary>

**D** — The percentage describes setting coverage, not devices. The remainder are deprecated, apply to scenarios with no modern equivalent, or belong to software whose ADMX has not been imported.

*Exam tip:* A low percentage is normal for an old GPO and is not an error. The report's purpose is triage — deciding what to migrate, what to replace, and what to abandon.

</details>

**Q2.** You imported a third-party ADMX successfully but cannot find its settings in the settings catalog. Why?

A. The import must finish replicating for 24 hours before settings appear
B. Imported ADMX settings appear under the Imported Administrative templates profile type, not the settings catalog
C. Imported ADMX settings require a custom OMA-URI profile
D. The ADML file was not imported

<details><summary>Answer</summary>

**B** — Ingested administrative templates are exposed through their own profile type. The settings catalog contains Microsoft's own configuration service providers only.

*Exam tip:* Three distinct places configure Windows: settings catalog for built-in CSPs, Administrative templates for the Microsoft ADMX-backed set, and Imported Administrative templates for third-party ADMX.

</details>

---

## Lab 24: Assignment filters and enrollment time grouping

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

You have a profile that should reach corporate Windows devices but only the ones running Enterprise, and only the physical ones. Building a group for every combination produces group sprawl nobody can maintain. Assignment filters solve this by narrowing an existing assignment at evaluation time. Enrollment time grouping solves a different problem: getting a device into the right group during Autopilot, before the dynamic group has caught up.

### Objectives

After completing this lab, you will be able to:

- Create an assignment filter using device properties
- Apply a filter in include and exclude mode
- Explain why filters are preferable to proliferating groups
- Describe enrollment time grouping and the problem it solves
- Predict the outcome when a filter and a group exclusion interact

### Exam objectives covered

- `g2.t2.s6` — Target a profile by using assignment filters and enrollment time grouping

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: adele.vance

### Exercise 1: Create and apply an assignment filter

#### Task 1: Build a filter for Windows Enterprise devices

1. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Assignment filters**, then **Create**.
   *Path:* **Tenant administration** > **Assignment filters** > **Create**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **FLT-Windows-Enterprise-Physical** |
   | Platform | **Windows 10 and later** <br> A filter is bound to one platform and cannot be reused across platforms. |

3. On **Rules**, build the expression:

   *Enterprise edition, not a virtual machine*
   ```text
   (device.skuFamily -eq "Enterprise") and (device.model -notContains "Virtual")
   ```

   > [!NOTE]
   > Filter rules use device properties Intune knows about — `operatingSystemVersion`, `manufacturer`, `model`, `deviceOwnership`, `enrollmentProfileName`, `osVersion`, `skuFamily` and others. They are *not* the same property set as Microsoft Entra dynamic group rules, which is a genuine source of confusion. Use the rule builder rather than typing from memory.

4. Select **Preview devices** to see which of your devices match before you rely on it.

   **Verify:** Your Hyper-V virtual machines are excluded by the model clause. Remove that clause if you want the filter to match your lab devices for the next task.

   > [!TIP]
   > **Preview devices** is the equivalent of Validate Rules for dynamic groups, and it is the difference between knowing a filter works and hoping it does. Always preview before assigning.

5. Save the filter.

**Results:** A reusable filter exists that narrows any Windows assignment.

- [ ] The filter appears under **Tenant administration** > **Assignment filters**.
- [ ] **Preview devices** returns the devices you expect.

#### Task 2: Apply the filter in both modes

1. In the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, select **WIN-OneDrive-KFM** from the list, select **Properties**, then next to **Assignments** select **Edit**.
   *Path:* **Devices** > **Configuration** > **WIN-OneDrive-KFM** > **Properties** > **Assignments** > **Edit**

2. On the included group, select **Edit filter**, then choose:

   | Setting | Value |
   | --- | --- |
   | Filter mode | **Include** |
   | Filter | **FLT-Windows-Enterprise-Physical** |

   > [!IMPORTANT]
   > Read the resulting assignment as a sentence: *apply to members of `GRP-DEV-WIN-CORP` **that also match** this filter*. Include mode narrows the group; exclude mode removes matching devices from it. The filter never adds devices that are not already in the assigned group.

3. Save, then check the profile's device status to see the effect.

4. Now consider the interaction the exam tests:

   | Situation | Outcome |
   | --- | --- |
   | Device in included group, matches include filter | Profile applies |
   | Device in included group, does not match include filter | Profile does not apply |
   | Device in included group, matches exclude filter | Profile does not apply |
   | Device in an excluded **group**, matches include filter | Profile does not apply — group exclusion beats everything |

   > [!IMPORTANT]
   > Group exclusion is evaluated before filters and always wins. A filter can never rescue a device that a group exclusion has removed.

5. Note why filters exist at all:

   > [!TIP]
   > Without filters, every combination of platform, edition, ownership and model needs its own dynamic group. Filters let one group serve many assignments, each narrowed differently, so the group structure stays comprehensible. That is the answer to *why not just make another group* in an exam question.

**Results:** The profile targets a group narrowed by a filter, and you can predict the outcome for any device.

- [ ] The assignment shows a filter in include mode.
- [ ] You can state what happens when a group exclusion and an include filter disagree.

### Exercise 2: Enrollment time grouping

#### Task 1: Understand the problem and the fix

1. Consider what happens during an Autopilot deployment with dynamic groups.

   > [!WARNING]
   > Dynamic group membership is evaluated asynchronously and can take minutes. During Autopilot the device needs its policy *now*, at the Enrollment Status Page. A device that is not yet in `GRP-DEV-WIN-CORP` when the page evaluates receives none of the profiles assigned to it, and either times out or reaches the desktop unconfigured.

2. Enrollment time grouping removes the race. In an Autopilot device preparation policy, the device group is populated by the provisioning service during enrollment rather than by rule evaluation afterwards.

   |  | Dynamic group | Enrollment time grouping |
   | --- | --- | --- |
   | Membership decided by | A rule evaluated periodically | The provisioning service, during enrollment |
   | Timing | Minutes to hours after the device object appears | Immediate, before the Enrollment Status Page evaluates |
   | Group type required | Dynamic Device | Assigned, owned by Intune Provisioning Client |
   | Configured in | Microsoft Entra ID | The Autopilot device preparation policy |
   | Solves | Ongoing classification of the estate | Getting policy onto a device during provisioning |

3. In the **Microsoft Entra admin center**, select **Identity**, then **Groups**, then **All groups**, select **GRP-DEV-DEVICEPREP**, then select **Owners** to confirm the group you built in lab 19 is exactly this mechanism.
   *Path:* **Identity** > **Groups** > **All groups** > **GRP-DEV-DEVICEPREP** > **Owners**

   **Verify:** **Intune Provisioning Client** is an owner, and the membership type is **Assigned**. This is enrollment time grouping — the device preparation policy names this group, and the service writes the device into it during provisioning.

4. Assign a profile to that group so provisioning-time policy actually exists:

   a. Under **Devices** > **Configuration**, select `WIN-OneDrive-KFM`, select **Properties**, and edit its assignments.
   b. Add `GRP-DEV-DEVICEPREP` as a second included group.
   c. Save.

   > [!NOTE]
   > Now a device provisioned by device preparation receives OneDrive configuration during the Enrollment Status Page rather than an hour later, because its group membership is written at enrollment rather than computed afterwards.

**Results:** You can explain enrollment time grouping and have policy targeting the group it populates.

- [ ] `GRP-DEV-DEVICEPREP` is an included group on at least one configuration profile.
- [ ] You can state the race condition it eliminates.

### Troubleshooting

**Symptom:** A profile with an assignment filter applies to no devices at all.

- **Root cause:** The filter rule uses a property or value that matches nothing — often a `model` or `skuFamily` string that does not match what Intune actually reports for the hardware.
- **Diagnostic:**

  ```text
  Tenant administration > Assignment filters > open the filter > Preview devices
  Compare with Devices > All devices > open a device > Hardware, to see the real property values.
  ```

- **Resolution:** Use **Preview devices** and correct the rule against the actual reported values. Filter properties are not the same set as Microsoft Entra dynamic group properties, so a rule copied from a group rule will usually not work.

### Knowledge check

**Q1.** A configuration profile is assigned to a group with an include filter. A device is a member of that group, matches the filter, and is also a member of a group excluded from the same profile. What does the device receive?

A. The profile, because the include filter matched
B. Nothing, and the assignment is reported as a conflict
C. The profile, with filtered settings only
D. Nothing — group exclusion is evaluated before filters and always wins

<details><summary>Answer</summary>

**D** — Group exclusion takes precedence over both group inclusion and any filter. A filter narrows an assignment; it cannot restore a device that exclusion has removed.

*Exam tip:* The evaluation order is: group exclusion first, then group inclusion, then the filter. Work through it in that order for any assignment question.

</details>

**Q2.** During Autopilot deployments, devices frequently reach the desktop without their configuration profiles, because dynamic group membership has not yet been evaluated. Which feature addresses this?

A. Reducing the dynamic group rule to a single clause
B. Enrollment time grouping, using a group owned by the Intune Provisioning Client
C. Increasing the Enrollment Status Page timeout
D. An assignment filter in include mode

<details><summary>Answer</summary>

**B** — Enrollment time grouping has the provisioning service write group membership during enrollment, so policy targeting that group is available while the Enrollment Status Page is still running. Filters do not affect timing, and a longer timeout only waits longer for membership that may still not arrive.

*Exam tip:* Filters narrow *which* devices get a policy. Enrollment time grouping fixes *when* they are eligible for it. Questions about timing during provisioning point at the latter.

</details>

---

## Lab 25: Android configuration profiles

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Diego's work profile is enrolled but unconfigured. Android configuration profiles differ from Windows in one important way: the profile type you can create depends entirely on how the device was enrolled. A work profile device and a fully managed device expose different settings, and choosing the wrong profile type produces a policy that reports success and applies nothing.

### Objectives

After completing this lab, you will be able to:

- Create a device restrictions profile for an Android Enterprise work profile
- Configure a device password policy for the work container
- Distinguish work profile settings from fully managed settings
- Verify configuration on the emulator

### Exam objectives covered

- `g2.t2.s2` — Create device configuration profiles for Android devices

### Prerequisites

- Completed labs: `android-enterprise`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android
- Personas: diego.siciliani

### Exercise 1: Configure the work profile

#### Task 1: Create a device restrictions profile

1. In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Choose the platform and profile carefully:

   | Setting | Value |
   | --- | --- |
   | Platform | **Android Enterprise** |
   | Profile type | **Personally-Owned Work Profile > Device restrictions** |
   | Name | **AND-WP-Restrictions** |

   > [!IMPORTANT]
   > The profile type list is grouped by enrollment scenario: **Personally-Owned Work Profile**, **Fully Managed, Dedicated, and Corporate-Owned Work Profile**. A profile created under the wrong heading targets devices that do not exist in that state, reports as not applicable, and looks like nothing happened. Match the profile type to how the device was actually enrolled.

3. Under **Work profile settings**, configure:

   | Setting | Value |
   | --- | --- |
   | Copy and paste between work and personal profiles | **Block** |
   | Data sharing between work and personal profiles | **Apps in work profile can handle sharing request from personal profile** |
   | Work profile notifications while device locked | **Block** <br> Stops corporate content appearing on the lock screen. |
   | Contact sharing via Bluetooth | **Block** |
   | Screen capture | **Block** |

4. Under **Work profile password**, configure the container passcode:

   | Setting | Value |
   | --- | --- |
   | Required password type | **Numeric complex** |
   | Minimum password length | **6** |
   | Number of sign-in failures before wiping device | **10** <br> Wipes the work profile, not the device — this is a personally owned phone. |
   | Maximum minutes of inactivity until work profile locks | **5** |

   > [!NOTE]
   > Two separate passwords exist on a work profile device: the device unlock code, which belongs to the user, and the work profile challenge, which you control. Setting **Work profile password** governs only the container. There is a separate **Device password** section for the device itself, which you should leave alone on personally owned hardware.

5. Assign to `GRP-DEV-ANDROID-WP` and create the profile.

**Results:** The work container is restricted and requires its own passcode.

- [ ] `AND-WP-Restrictions` is assigned to the work profile device group.

#### Task 2: Verify on the emulator

1. On the Android emulator, open the badged **Company Portal** inside the work profile and tap **Check settings** or **Sync**.

2. Wait for the policy to arrive, then test each restriction:

   a. Open a work application and attempt to copy text, then paste into a personal application. It should be blocked.
   b. Attempt a screenshot inside a work application. It should be refused.
   c. Lock the device and confirm work notifications no longer show content.

3. Confirm you are prompted to set a work profile passcode.

   **Verify:** Android prompts for a separate work profile challenge meeting the complexity you configured. Set one — later labs assume the container is unlocked.

4. In the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, select the **AND-WP-Restrictions** profile from the list, then select **Device status**.
   *Path:* **Devices** > **Configuration** > **AND-WP-Restrictions** > **Device status**

   **Verify:** The emulator reports **Succeeded**. A status of **Not applicable** means the profile type does not match the enrollment scenario.

**Results:** Configuration is enforced inside the work container and verified on the device.

- [ ] Copy and paste across the boundary is blocked.
- [ ] A work profile passcode is required.

### Exercise 2: Compare with fully managed

#### Task 1: Create a fully managed restrictions profile

1. Create a second profile with platform **Android Enterprise** and profile type **Fully Managed, Dedicated, and Corporate-Owned Work Profile** > **Device restrictions**. Name it `AND-FM-Restrictions`.

2. Note the settings that exist here and not on a work profile:

   | Setting area | Work profile | Fully managed |
   | --- | --- | --- |
   | Work container restrictions | Yes | Not applicable — no container |
   | Whole-device password policy | No | Yes |
   | Factory reset protection | No | Yes |
   | Block adding or removing accounts | Work accounts only | All accounts |
   | Kiosk and single-app mode | No | Yes, on dedicated devices |
   | System update policy | No | Yes |
   | Block camera or screen capture device-wide | Work profile only | Whole device |

   > [!IMPORTANT]
   > The difference is ownership, not capability tiers. On a personally owned device the organisation has no right to control the whole handset, so those settings do not exist rather than being hidden. That is the answer to *why can I not set a device password on a work profile device*.

3. Configure a whole-device password policy and factory reset protection, assign to `GRP-DEV-ANDROID-FM`, and create the profile.

**Results:** You can see which settings each Android enrollment scenario exposes.

- [ ] Both profiles exist, targeting different enrollment scenarios.
- [ ] You can name one setting available on fully managed and not on a work profile.

### Troubleshooting

**Symptom:** An Android configuration profile reports Not applicable for every targeted device.

- **Root cause:** The profile type does not match the enrollment scenario. A Personally-Owned Work Profile profile cannot apply to a fully managed device, and vice versa.
- **Diagnostic:**

  ```text
  Devices > All devices > open the device > check the Management name and Ownership
  Devices > Configuration > open the profile > check the profile type
  ```

- **Resolution:** Recreate the profile under the profile-type heading matching how the devices were enrolled. Enrollment scenario cannot be changed without a factory reset, so the profile has to move rather than the devices.

### Knowledge check

**Q1.** You need to enforce a device unlock passcode on personally owned Android devices enrolled with a work profile. Which is true?

A. Device passcode settings apply once the device is marked as Corporate
B. You can enforce both by using a Fully Managed device restrictions profile
C. You can enforce a work profile passcode but not a device unlock passcode, because the device is personally owned
D. You can enforce a device passcode using a compliance policy instead

<details><summary>Answer</summary>

**C** — A personally owned work profile confines management to the work container. The work profile challenge is configurable; the user's own device unlock code is not, because the organisation does not own the handset.

*Exam tip:* Ownership determines the boundary. Any question asking what can be enforced on a personally owned work profile is asking where that boundary sits.

</details>

---

## Lab 26: Apple and specialty device configuration profiles

**Access:** Walkthrough — required device not available in this lab · **Estimated time:** 35 minutes · **Difficulty:** intermediate

> [!IMPORTANT]
> Configuring these profiles requires no special licence — you can build every one of them in your tenant right now — but verifying them requires a Mac, an iPhone or iPad, a Teams Room, a HoloLens 2 or a Zebra handheld, none of which this lab has. Build the profiles as you read; the exercises stop short of asking you to confirm behaviour on hardware you do not own.

### Lab scenario

Contoso is adding Macs for designers, iPads for the sales floor, a Teams Room in the boardroom and Zebra scanners in the warehouse. Each has its own profile types and its own quirks, and the exam has a dedicated objective for specialty devices that most candidates never look at because they have never touched the hardware.

### Objectives

After completing this lab, you will be able to:

- Create configuration profiles for macOS and iOS/iPadOS
- Explain how Apple settings are delivered and what a custom profile is for
- Describe the profile types available for Teams Rooms, HoloLens 2 and Zebra devices
- Identify which specialty device needs which enrollment and profile combination

### Exam objectives covered

- `g2.t2.s3` — Create device configuration profiles for iOS/iPadOS devices
- `g2.t2.s4` — Create device configuration profiles for macOS devices
- `g2.t2.s5` — Create device configuration profiles for specialty devices, including Teams Rooms, HoloLens 2, and Zebra

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: miriam.graham

### Exercise 1: macOS and iOS configuration

#### Task 1: Create a macOS settings catalog profile

1. Select **Devices**, **Configuration**, then **Create** > **New Policy**, with platform **macOS** and profile type **Settings catalog**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Name it `MAC-Baseline`, add settings from the categories below, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Login Window > Disable console access | **Enabled** |
   | Restrictions > Allow Screen Capture | **Disabled** |
   | Restrictions > Allow AirDrop | **Disabled** |
   | Software Update > Automatically install macOS updates | **Enabled** |

   a. On the **Basics** tab, enter Name `MAC-Baseline`, then select **Next**.
   b. On the **Configuration settings** tab, select **Add settings**, find and configure the four macOS settings above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-USR-APPLE`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!NOTE]
   > The macOS settings catalog is built from Apple's declarative device management payloads. It has grown to cover most of what used to require a hand-written property list, and it is now the preferred way to configure Apple devices.

3. Note the escape hatch for anything the catalog does not cover:

   | Profile type | Use when |
   | --- | --- |
   | Settings catalog | The setting exists in the catalog — the default choice |
   | Templates > Device restrictions | Older curated restriction sets, still present for compatibility |
   | Templates > Custom | You have a `.mobileconfig` property list produced by Apple Configurator or a vendor |
   | Templates > Preference file | You need to set a specific application's preference domain directly |

   > [!IMPORTANT]
   > A **custom** profile uploads a `.mobileconfig` file — an Apple property list containing one or more payloads. Intune delivers it without understanding it, so there is no per-setting reporting: the whole file either applies or does not. Reach for it only when the catalog genuinely lacks the setting.

**Results:** A macOS baseline profile exists and you know when to use each Apple profile type.

- [ ] `MAC-Baseline` exists under **Configuration**.
- [ ] You can state the reporting limitation of a custom profile.

#### Task 2: Create an iOS device features profile

1. Create a profile with platform **iOS/iPadOS** and profile type **Templates** > **Device restrictions**, named `IOS-Restrictions`.

2. Configure a representative set:

   | Setting | Value |
   | --- | --- |
   | Block screenshots and screen recording | **Yes** |
   | Block sending diagnostic data to Apple | **Yes** |
   | Block untrusted TLS certificates | **Yes** |
   | Block AirDrop | **Yes** <br> Requires a supervised device. |

   > [!IMPORTANT]
   > Many iOS restrictions are marked **supervised only** in the portal. On an unsupervised, personally enrolled device those settings are delivered and silently ignored — the profile reports success and nothing changes. Supervision comes only from Automated Device Enrollment or Apple Configurator, as covered in lab 14. This is the single most common Apple configuration surprise.

3. Assign to `GRP-USR-APPLE` and create the profile.

**Results:** An iOS restrictions profile exists and you know which settings need supervision.

- [ ] `IOS-Restrictions` exists.
- [ ] You can explain why a supervised-only setting appears to succeed on an unsupervised device.

### Exercise 2: Specialty devices

#### Task 1: Map each specialty device to its management path

1. This objective covers three device families that behave nothing like a laptop.

   | Device | Platform in Intune | Enrollment | Profile types |
   | --- | --- | --- | --- |
   | Microsoft Teams Rooms on Windows | Windows 10 and later | Autopilot self-deploying, or manual join | Settings catalog, plus the Teams Rooms Pro management portal for the meeting experience |
   | Microsoft Teams Rooms on Android | Android Enterprise, dedicated | Dedicated device enrollment with a QR code | Device restrictions for the dedicated scenario |
   | HoloLens 2 | Windows 10 and later (Holographic) | Autopilot self-deploying, or manual Entra join | Settings catalog, kiosk profile, Windows Defender profiles |
   | Zebra handhelds | Android Enterprise, dedicated or fully managed | Dedicated or fully managed enrollment | **OEMConfig** for Zebra-specific hardware settings |

   > [!IMPORTANT]
   > **OEMConfig** is the one genuinely new concept here. Android hardware vendors expose settings that are not part of standard Android — barcode scanner behaviour, ruggedised hardware buttons, cradle charging. The vendor publishes an app to Managed Google Play describing those settings, Intune reads its schema, and you configure them through an OEMConfig profile. It is how you manage vendor-specific hardware without a vendor-specific management tool.

2. Note the recurring pattern across all three:

   > [!TIP]
   > Specialty devices are almost always shared, unattended and have **no primary user**. That means self-deploying or dedicated enrollment, device-targeted assignments only, and a kiosk or single-app configuration. If an exam question describes a meeting room, a scanner or a headset, expect those three properties to be the point.

3. Note where Teams Rooms configuration actually lives:

   > [!NOTE]
   > Intune manages the Teams Rooms *device* — compliance, updates, security. The meeting experience itself, the room account, and the Teams application configuration are managed in the **Teams Rooms Pro management portal**, which is a separate surface. Knowing the split is more examinable than any individual setting.

**Results:** You can place each specialty device on the right enrollment and profile path.

- [ ] You can explain what OEMConfig is and why it exists.
- [ ] You can name the enrollment type shared by most specialty devices.

### Troubleshooting

**Symptom:** An iOS restrictions profile reports success but the restrictions have no effect on the device.

- **Root cause:** The settings are supervised-only and the device is not supervised. Unsupervised devices accept the profile and ignore those payloads.
- **Diagnostic:**

  ```text
  Devices > All devices > open the device > check Supervised
  Devices > Configuration > open the profile > look for the supervised-only marker on each setting
  ```

- **Resolution:** Supervision requires Automated Device Enrollment through Apple Business Manager, or Apple Configurator. A personally enrolled device cannot be supervised after the fact — it must be wiped and re-enrolled through ADE.

### Knowledge check

**Q1.** Contoso deploys Zebra handheld scanners and needs to configure the barcode scanner's trigger behaviour, which is not a standard Android setting. What should you use?

A. An OEMConfig profile, using the schema published by Zebra in Managed Google Play
B. A custom OMA-URI configuration profile
C. A device restrictions profile for fully managed devices
D. A settings catalog profile for Android Enterprise

<details><summary>Answer</summary>

**A** — OEMConfig exists precisely for vendor-specific hardware settings that standard Android management does not expose. The vendor publishes a schema app to Managed Google Play, and Intune renders its settings for configuration.

*Exam tip:* Vendor-specific Android hardware equals OEMConfig. OMA-URI is the equivalent escape hatch on Windows, and .mobileconfig on Apple.

</details>

**Q2.** Which profile type should you use on macOS when the setting you need is not present in the settings catalog and comes as an Apple property list from a vendor?

A. Settings catalog with a custom row added
B. An OMA-URI custom profile
C. Templates > Custom, uploading the .mobileconfig file
D. Templates > Preference file

<details><summary>Answer</summary>

**C** — A custom profile uploads a `.mobileconfig` property list containing vendor payloads. Preference files set a specific application's preference domain and OMA-URI is a Windows mechanism, not an Apple one.

*Exam tip:* Custom profiles have no per-setting reporting — the whole file applies or fails as one unit. That trade-off is why they are a last resort.

</details>

---

## Lab 27: Cloud PKI, certificate profiles, Wi-Fi and VPN

**Access:** Hands-on · **Estimated time:** 60 minutes · **Difficulty:** advanced

### Lab scenario

Contoso wants certificate-based Wi-Fi authentication rather than a shared key that leaks the moment one laptop is stolen. That requires a chain: a certification authority to issue from, a trusted root so devices trust the issuer, a client certificate delivered automatically, and a Wi-Fi profile that references it. Historically the authority was the hard part — an on-premises PKI, an NDES server and a connector. Microsoft Cloud PKI removes all three, and since the July 2026 packaging change it is included with Microsoft 365 E5, so you can build the whole chain here.

### Objectives

After completing this lab, you will be able to:

- Explain the difference between SCEP and PKCS certificate profiles
- Stand up a root and issuing certification authority with Microsoft Cloud PKI
- Deploy a trusted root certificate profile and a SCEP profile that issues from it
- Create a Wi-Fi profile that authenticates with the issued certificate
- Monitor certificate health, and state the deployment order the chain requires

### Exam objectives covered

- `g2.t2.s1` — Create device configuration profiles for Windows devices, including importing ADMX files and using Group Policy analytics
- `g2.t3.s4` — Plan and implement Microsoft Cloud PKI, including setting up cloud-based PKI, automating certificate issuance, and monitoring certificate health

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5, INTUNE-CLOUD-PKI
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: adele.vance

### Exercise 1: The certificate chain

#### Task 1: Understand SCEP versus PKCS, and what each needs

1. Both deliver certificates to devices. They differ in where the private key is generated, which has real security consequences.

   |  | SCEP | PKCS |
   | --- | --- | --- |
   | Private key generated | **On the device**, ideally in the TPM | On the certification authority, then delivered to the device |
   | Key ever leaves the device | No | Yes — it is transported |
   | Infrastructure required | NDES server, Intune Certificate Connector, a certification authority | Intune Certificate Connector and a certification authority |
   | Best for | Device and user authentication certificates | S/MIME email signing and encryption, where the same key must exist on several devices |
   | Security preference | **Preferred** where a choice exists | Use when the key genuinely must be shared |

   > [!IMPORTANT]
   > SCEP is preferred because the private key is created in the device's TPM and never leaves it. PKCS exists for cases where the same key must be present on multiple devices — S/MIME being the standard example, since a user needs the same key on their laptop and their phone to read encrypted mail on both.

2. Note where the certification authority is going to come from:

   > [!NOTE]
   > SCEP and PKCS both traditionally require an on-premises certification authority plus, for SCEP, an NDES server and the Intune Certificate Connector — three servers to build, patch and keep running. **Microsoft Cloud PKI** hosts the authority in the service and removes all three. It became part of Microsoft 365 E5 in the July 2026 packaging change, which is why the next exercise builds a real, working chain rather than describing one.

3. Learn the ordering rule, which is the part that actually breaks deployments:

   > [!WARNING]
   > The trusted root profile must reach the device **before** the SCEP or PKCS profile. A certificate profile whose issuing chain is not yet trusted fails, and Intune does not retry aggressively. Assign the root profile to a broader group and give it time, or accept that the first sync will fail and the second will succeed.

**Results:** You can choose between SCEP and PKCS and state the deployment order.

- [ ] You can name the scenario that requires PKCS rather than SCEP.
- [ ] You can state which profile must arrive first.

#### Task 2: Build the certification authority with Cloud PKI

1. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Cloud PKI**, then **Create**.
   *Path:* **Tenant administration** > **Cloud PKI** > **Create**

2. Create the **root** certification authority first through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **Contoso Root CA** |
   | Description | **Offline root of the Contoso certificate hierarchy** |
   | CA type | **Root CA** |
   | Validity period (years) | **10** |
   | Extended key usages | **Leave default** |
   | Key size and algorithm | **RSA-4096, SHA-384** |
   | Subject attributes — Common name | **Contoso Root CA** |

   a. On the **Basics** tab, enter Name `Contoso Root CA` and the description, then select **Next**.
   b. On the **Configuration settings** tab, select **Root CA**, set Validity to `10`, Key size `RSA-4096`, SHA-384, and CN `Contoso Root CA`, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Review + create** tab, select **Create**.

   > [!NOTE]
   > A root CA signs nothing except its own issuing CAs, which is why its validity is long and its key is large. Cloud PKI also supports **bring your own root** — an issuing CA anchored under an existing on-premises root — which is how an organisation adopts Cloud PKI without reissuing every trust relationship it already has.

3. Create the **issuing** certification authority under it through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **Contoso Issuing CA** |
   | CA type | **Issuing CA** |
   | Root CA | **Contoso Root CA** |
   | Validity period (years) | **5** |
   | Key size and algorithm | **RSA-2048, SHA-256** |
   | Subject attributes — Common name | **Contoso Issuing CA** |

   a. On the **Basics** tab, enter Name `Contoso Issuing CA`, then select **Next**.
   b. On the **Configuration settings** tab, select **Issuing CA**, select `Contoso Root CA` as root, set Validity to `5`, Key size `RSA-2048`, SHA-256, and CN `Contoso Issuing CA`, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > Every certificate you issue comes from the **issuing** CA, never the root. That separation is why the root's private key can stay effectively untouched while the issuing CA does the daily work — and why compromising an issuing CA is recoverable by revoking it, whereas compromising a root is not.

4. Wait for both authorities to finish provisioning. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Cloud PKI**, select **Contoso Root CA** from the list, then select **Download certificate**.
   *Path:* **Tenant administration** > **Cloud PKI** > **Contoso Root CA** > **Download certificate**

   **Verify:** Both CAs show a status of **Active**. The root CA blade offers **Download certificate**, which produces the `.cer` you need for the trusted root profile in the next task.

**Results:** A two-tier certification authority exists in the service, with no servers to maintain.

- [ ] **Cloud PKI** lists an Active root CA and an Active issuing CA beneath it.
- [ ] You have downloaded the root CA certificate.

#### Task 3: Deploy the trusted root and issue certificates with SCEP

1. Create the trusted root profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, profile type **Templates** > **Trusted certificate**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Configure it through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **WIN-Cert-TrustedRoot** |
   | Certificate file | **The Contoso Root CA .cer you downloaded** |
   | Destination store | **Computer certificate store - Root** |

   a. On the **Basics** tab, enter Name `WIN-Cert-TrustedRoot`, then select **Next**.
   b. On the **Configuration settings** tab, browse and upload the downloaded Contoso Root CA certificate file, and set Destination store to `Computer certificate store - Root`, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign the profile to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!NOTE]
   > The destination store matters. A root certificate belongs in **Root**; an intermediate belongs in **Intermediate**. Putting an intermediate in the root store works but is wrong, and putting a root in the intermediate store breaks chain validation.

3. Now create the SCEP profile that actually issues certificates. Create another profile, platform **Windows 10 and later**, profile type **Templates** > **SCEP certificate**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

4. Configure it through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **WIN-Cert-SCEP-Device** |
   | Certificate type | **Device** |
   | Subject name format | **CN={{DeviceName}}** |
   | Subject alternative name | **DNS = {{DeviceName}}** |
   | Certificate validity period | **1 year** |
   | Key storage provider (KSP) | **Enroll to Trusted Platform Module (TPM) KSP, otherwise fail** <br> The vTPM from lab 2 earns its keep again — the private key is generated in hardware and cannot be exported. |
   | Key usage | **Digital signature, Key encipherment** |
   | Key size (bits) | **2048** |
   | Hash algorithm | **SHA-2** |
   | Root Certificate | **WIN-Cert-TrustedRoot** |
   | Extended key usage | **Client Authentication** |
   | SCEP Server URLs | **Select the Contoso Issuing CA** <br> Cloud PKI populates this for you — there is no NDES URL to type because there is no NDES server. |

   a. On the **Basics** tab, enter Name `WIN-Cert-SCEP-Device`, then select **Next**.
   b. On the **Configuration settings** tab, configure the certificate settings and select the SCEP server URL from Contoso Issuing CA, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign the profile to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > Compare this with what the same profile needed before Cloud PKI: an NDES server published to the internet, the Intune Certificate Connector installed and registered, a SCEP challenge password mechanism, and a certificate template configured on an on-premises CA. The profile fields are identical; three servers have disappeared from behind them.

   > [!WARNING]
   > Assign the trusted root profile **before** the SCEP profile, or accept that the first sync fails. A certificate request whose issuing chain is not yet trusted is rejected, and Intune does not retry aggressively. This ordering rule is the single most common cause of a Cloud PKI deployment that appears broken on day one and fixes itself on day two.

5. On **MD102-VM1-Adele**, sync policy, wait, then confirm the certificate arrived (run in an elevated Administrator PowerShell session):

   ```powershell
   Get-ChildItem Cert:\LocalMachine\Root | Where-Object Subject -like "*Contoso Root CA*" |
       Select-Object Subject, NotAfter

   Get-ChildItem Cert:\LocalMachine\My | Where-Object Issuer -like "*Contoso Issuing CA*" |
       Select-Object Subject, Issuer, NotAfter,
           @{n='HasPrivateKey';e={$_.HasPrivateKey}},
           @{n='Provider';e={$_.PrivateKey.CspKeyContainerInfo.ProviderName}}
   ```

   **Verify:** The Contoso root is in the machine Root store, and a client certificate issued by Contoso Issuing CA is in the machine Personal store with a private key. This is a real certificate, issued on demand, with no PKI infrastructure of your own.

6. Check certificate health in the portal: in the **Microsoft Intune admin center**, select **Tenant administration**, then **Cloud PKI**, and select **Contoso Issuing CA** from the list.
   *Path:* **Tenant administration** > **Cloud PKI** > **Contoso Issuing CA**

   | View | Shows |
   | --- | --- |
   | Issued certificates | Every certificate this CA has issued, with subject, serial and expiry |
   | Certificate status | Active, expiring and revoked counts |
   | Revoke | Revokes an individual certificate; the service maintains the revocation list |

   > [!TIP]
   > With an on-premises authority this information lives in the CA console and is nobody's job to watch. Having issued, expiring and revoked counts in the same portal as the devices is what the objective means by *monitoring certificate health* — and it is why a certificate expiry no longer has to become an outage.

**Results:** Devices trust the Contoso root and hold a TPM-protected client certificate issued by Cloud PKI.

- [ ] The root certificate is present in `Cert:\LocalMachine\Root`.
- [ ] A client certificate issued by the Contoso Issuing CA is present with a private key.
- [ ] The issuing CA reports the certificate under **Issued certificates**.

### Exercise 2: Wi-Fi and VPN profiles

#### Task 1: Create a certificate-authenticated Wi-Fi profile

1. Create a profile with platform **Windows 10 and later** and profile type **Templates** > **Wi-Fi**, named `WIN-WiFi-Corporate`.

2. Configure the network:

   | Setting | Value |
   | --- | --- |
   | Wi-Fi type | **Enterprise** |
   | Wi-Fi name (SSID) | **Contoso-Corp** |
   | Connection name | **Contoso Corporate** |
   | Connect automatically when in range | **Enable** |
   | Connect to more preferred network if available | **Enable** |
   | Connect to this network even when it is not broadcasting its SSID | **Disable** |

3. Configure enterprise authentication:

   | Setting | Value |
   | --- | --- |
   | Authentication method | **Certificates** |
   | EAP type | **EAP-TLS** <br> The certificate-based method. PEAP uses a password inside a TLS tunnel. |
   | Certificate server names | **The RADIUS server's certificate subject name** |
   | Root certificate for server validation | **WIN-Cert-TrustedRoot** |
   | Client certificate for client authentication | **WIN-Cert-SCEP-Device** <br> The SCEP profile from exercise 1. This field is where the chain is joined. |

   > [!IMPORTANT]
   > This is where the chain comes together. The Wi-Fi profile references the trusted root profile for server validation and the SCEP or PKCS profile for the client certificate. Deleting either certificate profile silently breaks every Wi-Fi profile that references it — which is why certificate profiles should not be tidied away without checking what points at them.

4. Assign to `GRP-DEV-WIN-CORP` and create the profile.

   > [!NOTE]
   > The profile deploys successfully even though the SSID does not exist in your lab. Windows stores it as a known network and connects if it ever sees it. You can confirm delivery with `netsh wlan show profiles` on a synced device.

**Results:** A certificate-authenticated enterprise Wi-Fi profile is deployed.

- [ ] `WIN-WiFi-Corporate` reports **Succeeded**.
- [ ] `netsh wlan show profiles` lists the Contoso network on a synced device.

#### Task 2: Understand the VPN profile equivalent

1. VPN profiles follow the same pattern. Create one with profile type **Templates** > **VPN** to inspect the fields (review the settings on the **Configuration settings** tab, then cancel without saving):

   | Setting | Value |
   | --- | --- |
   | Connection type | **IKEv2, L2TP, PPTP, Automatic, or a third-party client such as Cisco AnyConnect** |
   | Server address | **The VPN endpoint** |
   | Authentication method | **Certificates, or EAP** |
   | Authentication certificate | **A SCEP or PKCS profile** |
   | Always On | **Whether the tunnel establishes automatically** |
   | Split tunneling | **Whether only corporate traffic uses the tunnel** |

   > [!TIP]
   > Note the **per-app VPN** option on some connection types. It routes only nominated applications through the tunnel, which is how organisations give a managed app access to an internal service without putting the whole device on the corporate network. That capability, extended to devices that are not enrolled at all, is what **Microsoft Tunnel for MAM** provides — covered in lab 59.

**Results:** You can describe how a VPN profile authenticates with a certificate and what per-app VPN achieves.

- [ ] You can name the feature that extends per-app VPN to unenrolled devices.

### Troubleshooting

**Symptom:** A SCEP certificate profile fails on every device with a chain or trust error.

- **Root cause:** The trusted root profile has not yet reached the device, so the issuing authority is untrusted when the certificate request completes.
- **Diagnostic:**

  ```powershell
  Get-ChildItem Cert:\LocalMachine\Root | Where-Object Subject -like "*Contoso*"
  Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 30 |
      Where-Object Id -eq 814
  ```

- **Resolution:** Confirm the root certificate is present in the device's Root store before troubleshooting SCEP itself. Assign the trusted root profile to a broader group so it always lands first.

### Knowledge check

**Q1.** Contoso needs S/MIME certificates so users can read encrypted email on both their laptop and their phone. Which certificate profile type is required?

A. A trusted certificate profile
B. PKCS, because the same private key must exist on multiple devices
C. Either, since both generate the key on the certification authority
D. SCEP, because the private key is generated in the TPM

<details><summary>Answer</summary>

**B** — S/MIME requires the same private key on every device the user reads mail on. SCEP generates a unique key on each device that never leaves it, which makes it unsuitable — PKCS generates the key centrally and delivers it, which is exactly what this scenario needs.

*Exam tip:* SCEP is the default and the more secure choice. PKCS is the answer only when a scenario requires the same key in more than one place, and S/MIME is the canonical example.

</details>

**Q2.** A Wi-Fi profile using EAP-TLS fails to connect on newly enrolled devices but works on devices enrolled last week. What is the most likely cause?

A. EAP-TLS is not supported on newly enrolled devices
B. The trusted root certificate profile has not yet reached the new devices, so the certificate chain cannot be validated
C. The SSID is not broadcasting
D. The Wi-Fi profile must be assigned to a user group rather than a device group

<details><summary>Answer</summary>

**B** — Certificate profiles depend on the trusted root arriving first. Devices enrolled earlier already have the root, so they work; newly enrolled devices fail until the root profile syncs.

*Exam tip:* Whenever a certificate-dependent feature works on older devices and fails on new ones, suspect profile ordering rather than the feature itself.

</details>

---

## Lab 28: Windows Hello for Business, Windows LAPS and local group membership

**Access:** Hands-on · **Estimated time:** 55 minutes · **Difficulty:** advanced

### Lab scenario

Three settings that together decide who can sign in to a Contoso device and with what. Windows Hello for Business replaces the password at the sign-in screen with a PIN or biometric bound to the device's TPM. Windows LAPS gives every device a unique, rotating local administrator password so one stolen credential does not open the estate. Local group membership decides who is a local administrator at all — and by default, on an Entra joined device, that list is longer than most organisations expect.

### Objectives

After completing this lab, you will be able to:

- Configure Windows Hello for Business through Intune and enrol a user
- Explain how Hello credentials are protected by the TPM
- Enable Windows LAPS with escrow to Microsoft Entra ID
- Retrieve and rotate a local administrator password
- Control local group membership through the settings catalog

### Exam objectives covered

- `g1.t3.s6` — Configure Windows Hello for Business by using Intune
- `g1.t3.s7` — Implement and manage Windows Local Administrator Password Solution (Windows LAPS) by using Microsoft Intune and Microsoft Entra ID
- `g1.t3.s8` — Manage the membership of local groups on Windows devices by using Intune

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5, ENTRA-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11 with vTPM)
- Personas: alex.wilber, johanna.lorenz, helpdesk.operator

### Exercise 1: Windows Hello for Business

#### Task 1: Configure and enrol Windows Hello

1. In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, **Windows**, then **Windows Hello for Business**.
   *Path:* **Devices** > **Enrollment** > **Windows** > **Windows Hello for Business**

   > [!NOTE]
   > This is the tenant-wide default, applied at enrollment. For per-group control, create an **Identity protection** configuration profile instead. The tenant-wide setting is simpler and is what most organisations use.

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Configure Windows Hello for Business | **Enabled** |
   | Use a Trusted Platform Module (TPM) | **Required** <br> Required rather than Preferred. Preferred falls back to software key storage on a device with no TPM, which removes the hardware protection that makes Hello worth deploying. |
   | Minimum PIN length | **6** |
   | Maximum PIN length | **127** |
   | Lowercase letters in PIN | **Not allowed** |
   | Uppercase letters in PIN | **Not allowed** |
   | Special characters in PIN | **Not allowed** |
   | PIN expiration (days) | **Not configured** |
   | Allow biometric authentication | **Yes** |
   | Use enhanced anti-spoofing, when available | **Yes** |

   > [!IMPORTANT]
   > A Hello PIN is not a password, and this is the exam's favourite point about it. The PIN never leaves the device and is never transmitted. It unlocks a private key held in the TPM, and that key authenticates. A stolen PIN is worthless without the physical device, which is why a six-digit PIN is stronger in practice than an eight-character password.

3. Save, then on **MD102-VM2-Alex** sign out and back in as Alex.

4. Complete the Hello enrollment prompt and set a PIN.

   **Verify:** Windows prompts to set up a PIN, accepts a six-digit numeric value, and the next sign-in offers PIN rather than password.

5. On **MD102-VM2-Alex**, open PowerShell and confirm the credential is protected by hardware:

   ```powershell
   certutil -scinfo -silent 2>$null
   Get-Tpm | Select-Object TpmPresent, TpmReady
   ```

   **Verify:** The TPM is present and ready. The Hello key lives there — which is why lab 2 insisted on a virtual TPM.

**Results:** Alex signs in with a PIN backed by a TPM-protected key.

- [ ] The sign-in screen offers PIN as the default method.
- [ ] TPM use is set to **Required** in the tenant configuration.

### Exercise 2: Windows LAPS

#### Task 1: Enable LAPS in Microsoft Entra ID and Intune

1. First enable the directory to accept escrowed passwords. In the **Microsoft Entra admin center**, select **Identity**, then **Devices**, then **Device settings**.
   *Path:* **Identity** > **Devices** > **Device settings**

   | Setting | Value |
   | --- | --- |
   | Enable Microsoft Entra Local Administrator Password Solution (LAPS) | **Yes** |

   > [!WARNING]
   > This directory setting must be enabled first. If it is off, the Intune policy deploys successfully, the device rotates its password locally, and the escrow silently fails — leaving you with a device whose local administrator password nobody knows. Enable the directory setting before the policy, every time.

2. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Account protection**, then **Create Policy**.
   *Path:* **Endpoint security** > **Account protection** > **Create Policy**

3. Choose platform **Windows 10 and later** and profile **Local admin password solution (Windows LAPS)**, then configure:

   | Setting | Value |
   | --- | --- |
   | Name | **WIN-LAPS-Corporate** |
   | Backup Directory | **Backup the password to Microsoft Entra ID** |
   | Password Age Days | **30** |
   | Administrator Account Name | **Leave blank** <br> Blank means the built-in Administrator account, identified by its well-known SID rather than its name. Safer than naming it, since the account can be renamed. |
   | Password Complexity | **Large letters + small letters + numbers + special characters** |
   | Password Length | **20** |
   | Post Authentication Actions | **Reset the password and logoff the managed account** |
   | Post Authentication Reset Delay | **8** <br> Hours after use before the password is automatically rotated. |

   > [!TIP]
   > **Post authentication actions** are what make LAPS more than a password vault. After the local administrator account is used, the password is automatically rotated within the delay window — so a password read for one support call is useless by the next day, even if it was written down.

4. Assign to `GRP-DEV-WIN-CORP` and create the policy.

**Results:** Corporate devices maintain a unique, rotating local administrator password escrowed to Microsoft Entra ID.

- [ ] The directory LAPS setting is enabled.
- [ ] `WIN-LAPS-Corporate` is assigned.

#### Task 2: Retrieve and rotate a password

1. On **MD102-VM2-Alex**, sync policy and confirm LAPS is active:

   ```powershell
   Get-LapsAADPassword -DeviceIds $env:COMPUTERNAME -ErrorAction SilentlyContinue
   Get-WinEvent -LogName "Microsoft-Windows-LAPS/Operational" -MaxEvents 20 |
       Select-Object TimeCreated, Id, LevelDisplayName, Message |
       Format-Table -Wrap
   ```

   **Verify:** The LAPS operational log shows a successful password update and escrow. Event ID 10018 indicates a successful directory backup.

2. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex** from the list, then select **Local admin password**.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Local admin password**

   **Verify:** The current password is shown along with the account name and the next rotation time. Retrieving it is an audited action.

3. Select **Rotate local admin password** and confirm.

   **Verify:** The password changes on the next device check-in and the previous value stops working.

4. Note who is permitted to read it:

   > [!IMPORTANT]
   > Reading a LAPS password requires the `DeviceLocalCredential.Read.All` permission, granted through the Intune **Help Desk Operator** role or the Entra **Cloud Device Administrator** role. Being able to see a device does not confer the ability to read its local administrator password — this is deliberately a separate, audited permission.

**Results:** You can retrieve and rotate a device's local administrator password from the portal.

- [ ] The password is visible in the device blade.
- [ ] A manual rotation completed successfully.

### Exercise 3: Local group membership

#### Task 1: Control who is a local administrator

1. First see the problem. On **MD102-VM2-Alex**, run:

   ```powershell
   net localgroup Administrators
   ```

   > [!IMPORTANT]
   > On a Microsoft Entra joined device, the **Global Administrator** and **Cloud Device Administrator** directory roles are added to the local Administrators group automatically, as is the user who joined the device. That last one surprises people: whoever performed the join is a local administrator on that machine, permanently, unless you change it.

2. In the **Microsoft Intune admin center**, create a settings catalog profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, type **Settings catalog**, named `WIN-LocalGroups`.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

3. Search the settings picker for `Local Users and Groups`, add the setting from the **Local Policies Security Options** or **Accounts** category, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Group configuration action | **Update** <br> Update adds or removes named members. Replace overwrites the entire membership — powerful, and easy to use to lock everyone out. |
   | Target group | **Administrators** <br> Identified by its well-known SID S-1-5-32-544 rather than its name, so it works on localised Windows. |
   | Members to add | **The SID of GRP-ADM-HELPDESK** |
   | Members to remove | **The Entra role or account you want to strip** |

   a. On the **Basics** tab, enter Name `WIN-LocalGroups`, then select **Next**.
   b. On the **Configuration settings** tab, select **Add settings**, configure the local group action and SID mappings above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!CAUTION]
   > Use **Update**, not **Replace**, until you are certain. **Replace** sets the group to exactly the members you list — omit the local administrator account or the LAPS-managed account and you have a device nobody can administer locally, including you. Combine that with a Conditional Access mistake and the device is unrecoverable without a rebuild.

4. After the device syncs, check the group again in PowerShell on **MD102-VM2-Alex**:

   ```powershell
   net localgroup Administrators
   ```

   **Verify:** The membership reflects your configuration. Together with Windows LAPS, this gives you a device where local administrator access is both minimal and individually credentialed.

**Results:** Local administrator membership is defined by policy rather than by whoever happened to join the device.

- [ ] `WIN-LocalGroups` reports **Succeeded**.
- [ ] The local Administrators group matches the policy.

### Troubleshooting

**Symptom:** Windows LAPS policy reports success but no password appears in the portal.

- **Root cause:** The Microsoft Entra ID directory setting **Enable Microsoft Entra Local Administrator Password Solution** is disabled, so the device rotates the password locally and the escrow is rejected.
- **Diagnostic:**

  ```powershell
  Get-WinEvent -LogName "Microsoft-Windows-LAPS/Operational" -MaxEvents 30 |
      Select-Object TimeCreated, Id, Message | Format-Table -Wrap
  ```

- **Resolution:** Enable the setting under **Identity** > **Devices** > **Device settings** in the Microsoft Entra admin center, then force a rotation from the device blade. Until then, the device has a password nobody knows.

**Symptom:** Users are not prompted to set a Windows Hello PIN.

- **Root cause:** Windows Hello is disabled tenant-wide, TPM is set to Required on a device with no usable TPM, or an Identity protection profile is overriding the tenant default.
- **Diagnostic:**

  ```powershell
  Get-Tpm | Select-Object TpmPresent, TpmReady
  dsregcmd /status | Select-String "AzureAdJoined"
  ```

- **Resolution:** Confirm the TPM is present and ready, confirm the device is Entra joined, and check for a conflicting Identity protection profile. Hello enrollment is offered at interactive sign-in, so sign out and back in after fixing.

### Knowledge check

**Q1.** Which statement about a Windows Hello for Business PIN is correct?

A. The PIN never leaves the device and unlocks a private key held in the TPM
B. The PIN replaces the password and is synchronised across the user's devices
C. The PIN is transmitted to Microsoft Entra ID and validated centrally
D. The PIN is stored as a reversible hash in the local SAM database

<details><summary>Answer</summary>

**A** — A Hello PIN is device-local. It unlocks a private key protected by the TPM, and that key performs the authentication. Nothing about the PIN is transmitted, which is why it is device-specific and why a stolen PIN is useless without the hardware.

*Exam tip:* The distinction that earns marks: a password authenticates you anywhere, a PIN unlocks a key on one device. That is why a short PIN is acceptable.

</details>

**Q2.** You deploy a Windows LAPS policy backing up to Microsoft Entra ID. The policy reports success but no passwords appear in the portal. What is the most likely cause?

A. The password length exceeds the directory maximum
B. The administrator account name field was left blank
C. The Microsoft Entra ID device setting enabling LAPS has not been turned on
D. The devices do not have a TPM

<details><summary>Answer</summary>

**C** — The directory must be configured to accept escrowed passwords. Without it the client-side policy applies and rotates the password locally, but the backup to Microsoft Entra ID is rejected — leaving a device whose local administrator password is unknown.

*Exam tip:* LAPS is a two-part configuration: the directory setting and the Intune policy. Leaving the account name blank is correct — it targets the built-in account by SID.

</details>

**Q3.** Which action should you use in a Local Users and Groups policy when you want to add a group to the local Administrators group without disturbing existing members?

A. Replace
B. Merge
C. Restrict
D. Update

<details><summary>Answer</summary>

**D** — **Update** adds and removes the members you name, leaving everything else intact. **Replace** sets the group to exactly the listed members, which can remove the accounts needed to administer the device locally.

*Exam tip:* Replace is the dangerous option and the exam knows it. Any scenario mentioning preserving existing membership is pointing at Update.

</details>

---

# Module 5 — Compliance and Conditional Access

Define what healthy means, extend it with PowerShell where the built-in rules stop, and turn compliance into an access decision with Conditional Access.

## Lab 29: Compliance policies and actions for non-compliance

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** intermediate

### Lab scenario

Compliance is Intune's opinion about whether a device is healthy. On its own that opinion changes nothing — a non-compliant device carries on working. It becomes an access control in lab 31, when Conditional Access starts refusing non-compliant devices. Here you build the definition of healthy for Windows and Android, decide what happens when a device fails, and deliberately break a device to watch the grace period run.

### Objectives

After completing this lab, you will be able to:

- Create compliance policies for Windows and Android
- Configure actions for non-compliance with a grace period
- Set the tenant-wide compliance defaults and understand the not-evaluated setting
- Observe a device transition to non-compliant and back
- Explain how compliance conflicts resolve

### Exam objectives covered

- `g1.t3.s4` — Implement compliance policies for all supported device platforms by using Intune

### Prerequisites

- Completed labs: `whfb-laps-local-groups`, `android-configuration-profiles`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11 with vTPM), avd-android
- Personas: alex.wilber, henrietta.mueller, diego.siciliani

### Exercise 1: Set the tenant compliance defaults

#### Task 1: Decide how untested devices are treated

1. Select **Devices**, **Compliance**, then **Compliance settings**.
   *Path:* **Devices** > **Compliance** > **Compliance settings**

2. Configure the tenant defaults:

   | Setting | Value |
   | --- | --- |
   | Mark devices with no compliance policy assigned as | **Not compliant** |
   | Compliance status validity period (days) | **30** <br> A device that stops checking in becomes non-compliant after this many days. |
   | Enhanced jailbreak detection | **Not configured** <br> iOS only, and it costs battery — leave it off unless required. |

   > [!IMPORTANT]
   > **Mark devices with no compliance policy assigned as** is the single most consequential setting on this page. Left at **Compliant**, a device that no policy targets is treated as healthy — so a Conditional Access rule requiring compliance lets it straight through. Setting it to **Not compliant** means a device must actively prove its health, which is the whole point. Change this before you build Conditional Access, not after.

3. Save.

**Results:** Devices must prove compliance rather than being assumed healthy.

- [ ] The default reads **Not compliant**.
- [ ] A validity period is configured.

### Exercise 2: Build the Windows compliance policy

#### Task 1: Create the policy

1. Select **Devices**, **Compliance**, then **Create policy**, platform **Windows 10 and later**.
   *Path:* **Devices** > **Compliance** > **Create policy**

2. Name it `CMP-Windows-Corporate`, then configure **Device Health**:

   | Setting | Value |
   | --- | --- |
   | Require BitLocker | **Require** <br> Will fail until lab 43 enables it. That is deliberate. |
   | Require Secure Boot to be enabled on the device | **Require** |
   | Require code integrity | **Require** |

3. Configure **Device Properties** and **System Security**:

   | Setting | Value |
   | --- | --- |
   | Minimum OS version | **10.0.22000** |
   | Require a password to unlock mobile devices | **Require** |
   | Simple passwords | **Block** |
   | Minimum password length | **8** |
   | Require encryption of data storage on device | **Require** |
   | Firewall | **Require** |
   | Antivirus | **Require** |
   | Antispyware | **Require** |
   | Microsoft Defender Antimalware | **Require** |
   | Real-time protection | **Require** |

   > [!NOTE]
   > **Require a password to unlock mobile devices** applies to Windows too despite the wording — it maps to the device lock CSP. The label is a leftover from when the setting was mobile-only, and it catches people out in the portal.

4. On **Actions for noncompliance**, build an escalation rather than a single event:

   | Action | Schedule (days after noncompliance) | Purpose |
   | --- | --- | --- |
   | Send email to end user | 0 | Tell the user immediately, with instructions |
   | Send email to end user | 3 | Reminder while the device still works |
   | Mark device noncompliant | 7 | The grace period. Access is not blocked until now. |
   | Send email to end user | 14 | Final warning before any retire action |

   > [!IMPORTANT]
   > **Mark device noncompliant** scheduled at day 7 is the grace period. Until that day the device is technically failing the policy but still reported as compliant, so Conditional Access does not block it. Setting this to 0 means a user whose antivirus definitions lapse overnight is locked out before anyone can tell them why. A grace period of a few days is the difference between a security control and a help desk queue.

5. Assign to `GRP-DEV-WIN-CORP` and create the policy.

**Results:** Windows corporate devices have a health definition with a humane escalation path.

- [ ] `CMP-Windows-Corporate` is assigned to corporate Windows devices.
- [ ] **Mark device noncompliant** is scheduled after a grace period, not at day 0.

#### Task 2: Observe the result

1. On **MD102-VM2-Alex**, sync policy, then check compliance from the client:

   ```powershell
   Get-CimInstance -Namespace "root\cimv2\mdm\dmmap" `
       -ClassName MDM_DevDetail_Ext01 -ErrorAction SilentlyContinue |
       Select-Object InstanceID, @{n='HardwareDataPresent'; e={ [bool]$_.DeviceHardwareData }}
   manage-bde -status C:
   ```

2. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex** from the list, then select **Device compliance**.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Device compliance**

   **Verify:** The device is listed as **Not compliant** and the BitLocker rule shows as failing. That is correct — BitLocker is not enabled until lab 43. This is a real non-compliant device to watch.

   > [!TIP]
   > The per-setting compliance view tells you exactly which rule failed. Compare that with a user reporting *my device says it is not compliant* — this blade turns that into a single actionable line.

**Results:** You can read exactly which compliance rule a device fails and why.

- [ ] The device reports non-compliant with a named failing rule.

### Exercise 3: Android compliance and conflict resolution

#### Task 1: Create an Android compliance policy

1. Create a policy with platform **Android Enterprise** and policy type **Personally-Owned Work Profile**, named `CMP-Android-WorkProfile`.

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Minimum OS version | **13.0** |
   | Require the device to be at or under the Device Threat Level | **Medium** |
   | Rooted devices | **Block** |
   | Require a password to unlock mobile devices (work profile) | **Require** |
   | Minimum password length | **6** |
   | Encryption of data storage on device | **Require** |

   > [!NOTE]
   > **Device Threat Level** requires a mobile threat defence connector such as Microsoft Defender for Endpoint on Android. Without one it evaluates as not applicable rather than failing — a useful thing to know before you assume the rule is working.

3. Assign to `GRP-DEV-ANDROID-WP` and create the policy.

4. Learn how compliance handles conflicts, which differs from configuration profiles:

   | Policy type | Two policies disagree | Result |
   | --- | --- | --- |
   | Compliance | Minimum password 6 and minimum password 8 | **Most restrictive wins** — 8 is enforced |
   | Device configuration | A setting set to Enabled and Disabled | **Conflict** — neither applies |
   | Enrollment restriction | Two restrictions target the same user | **Priority decides** — one applies, the other is ignored |

   > [!IMPORTANT]
   > These three resolution models are a favourite exam target because they are genuinely different and there is no intuition to fall back on. Compliance is the only one where the strictest value wins.

**Results:** Android work profile devices have a compliance definition and you can predict conflict outcomes.

- [ ] `CMP-Android-WorkProfile` is assigned.
- [ ] You can state how each of the three policy types resolves a conflict.

### Troubleshooting

**Symptom:** A device shows as compliant even though no compliance policy targets it.

- **Root cause:** The tenant setting **Mark devices with no compliance policy assigned as** is set to **Compliant**, so untargeted devices are assumed healthy.
- **Diagnostic:**

  ```text
  Devices > Compliance > Compliance settings
  ```

- **Resolution:** Set it to **Not compliant**. Until you do, any Conditional Access policy requiring a compliant device can be satisfied by a device that has never been evaluated.

### Knowledge check

**Q1.** Two compliance policies target the same Windows device. One requires a minimum password length of 6, the other 8. What is enforced?

A. 8 — compliance policies resolve conflicts by applying the most restrictive value
B. The policy with the lower priority number wins
C. Neither — the setting is reported as a conflict and left unapplied
D. 6 — the least restrictive value is applied to avoid lockouts

<details><summary>Answer</summary>

**A** — Compliance policy conflicts resolve to the most restrictive value. That is different from device configuration profiles, where a conflict leaves the setting unapplied entirely.

*Exam tip:* Compliance takes the strictest value; configuration reports a conflict and does nothing; enrollment restrictions are decided by priority. Learn the three together.

</details>

**Q2.** You want users to have several days to fix a compliance failure before losing access to corporate resources. Which configuration achieves this?

A. Configure Conditional Access in report-only mode
B. Set the tenant default to mark untargeted devices as compliant
C. Schedule the Mark device noncompliant action several days after non-compliance
D. Set the compliance status validity period to several days

<details><summary>Answer</summary>

**C** — The **Mark device noncompliant** action's schedule is the grace period. Until it fires, the device continues to report as compliant and Conditional Access does not block it, which gives the user time to remediate.

*Exam tip:* Scheduling that action at day 0 removes the grace period entirely. Any question about giving users time to remediate is asking about this schedule.

</details>

---

## Lab 30: Extend compliance with PowerShell and JSON

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** advanced

### Lab scenario

The built-in compliance rules cover the obvious things. Contoso's security team wants something they do not cover: every corporate device must have a specific registry key set by their asset agent, and must be running a supported build. Custom compliance lets you answer any question PowerShell can answer, by pairing a discovery script with a JSON rules file. Getting the two to agree is where everyone loses an hour, so this lab is deliberate about the contract between them.

### Objectives

After completing this lab, you will be able to:

- Write a discovery script that returns compressed JSON
- Write a matching JSON rules file with remediation text
- Deploy a custom compliance policy and observe the result
- Diagnose the mismatches that make custom compliance fail silently

### Exam objectives covered

- `g5.t1.s5` — Extend device compliance by using PowerShell

### Prerequisites

- Completed labs: `compliance-policies`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11)
- Personas: alex.wilber

### Exercise 1: Understand the contract

#### Task 1: Learn the four rules that make it work

1. Custom compliance is two artefacts that must agree exactly.

   | Requirement | Detail |
   | --- | --- |
   | Output format | The script must write **one line** of compressed JSON to standard output and nothing else |
   | Key matching | Every key in the script output must exactly match a `SettingName` in the JSON rules file, including case |
   | Data types | The type the script emits must match the `DataType` declared in the rules file |
   | Exit code | The script must exit `0`. A non-zero exit is treated as an error, not as non-compliance |

   > [!IMPORTANT]
   > `ConvertTo-Json -Compress` is not optional. Without `-Compress`, PowerShell emits multi-line pretty-printed JSON, the parser fails, and the device reports an error rather than a compliance result. This single omission accounts for most custom compliance failures.

2. Note the other two silent killers:

   > [!WARNING]
   > Any stray output breaks it. A `Write-Host` left in for debugging, a warning from a cmdlet, or a progress bar all end up on standard output alongside the JSON and corrupt it. Suppress everything: use `-ErrorAction SilentlyContinue`, pipe unwanted output to `Out-Null`, and never use `Write-Host` in a discovery script.

**Results:** You can state the four contract rules before writing a line of script.

- [ ] You can explain why `-Compress` is required.
- [ ] You can name what a non-zero exit code means.

### Exercise 2: Build and deploy the pair

#### Task 1: Upload the discovery script

1. Save the discovery script from the [Scripts](#scripts-10) section below as `Detect-ContosoCompliance.ps1`.

2. Test it locally on **MD102-VM2-Alex** before uploading anything:

   ```powershell
   .\Detect-ContosoCompliance.ps1
   "Exit code: $LASTEXITCODE"
   ```

   **Verify:** The output is exactly one line of compressed JSON such as `{"AssetAgentPresent":false,"OSBuildNumber":22631,"DiskFreeGB":42}` and the exit code is `0`. If you see line breaks or any other text, fix it now — the portal will not tell you.
   ```
   {"AssetAgentPresent":false,"OSBuildNumber":22631,"DiskFreeGB":42}
   Exit code: 0
   ```

3. In the **Microsoft Intune admin center**, select **Devices**, **Compliance**, then the **Scripts** tab, then **Add** > **Windows 10 and later**.
   *Path:* **Devices** > **Compliance** > **Scripts** > **Add**

4. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **Contoso custom compliance discovery** |
   | Detection script file | **Detect-ContosoCompliance.ps1** |
   | Run this script using the logged on credentials | **No** <br> System context. The script reads HKLM, which a user context cannot. |
   | Enforce script signature check | **No** |
   | Run script in 64 bit PowerShell Host | **Yes** <br> Set to Yes. In 32-bit, HKLM reads are redirected to the WOW6432Node and your registry check silently looks in the wrong place. |

5. Add the script and note its **Script ID** once created — the policy references it.

**Results:** A tested discovery script is uploaded and running in the correct context.

- [ ] The script produced a single JSON line locally with exit code 0.
- [ ] It appears under **Compliance** > **Scripts**.

#### Task 2: Create the JSON rules and the policy

1. Save the JSON rules from the [Scripts](#scripts-10) section below as `Rules-ContosoCompliance.json`.

2. Check each `SettingName` against your script output character by character.

   > [!IMPORTANT]
   > `AssetAgentPresent` and `assetAgentPresent` are different keys. A mismatch produces no error anywhere — the rule simply never evaluates, and the device reports compliant against a rule that was never checked. Compare them side by side rather than trusting your memory of what you typed.

3. Create the policy: **Devices** > **Compliance** > **Create policy**, platform **Windows 10 and later**, named `CMP-Windows-Custom`.
   *Path:* **Devices** > **Compliance** > **Create policy**

4. Under **Custom Compliance**, configure:

   | Setting | Value |
   | --- | --- |
   | Custom compliance | **Require** |
   | Select your discovery script | **Contoso custom compliance discovery** |
   | Upload JSON file | **Rules-ContosoCompliance.json** |

   **Verify:** The portal validates the JSON on upload and lists the rules it parsed. If a rule you expect is missing, the JSON is malformed — fix it before continuing.

5. Configure actions for non-compliance with a 7-day grace period as in lab 29, assign to `GRP-DEV-WIN-CORP`, and create the policy.

6. Sync **MD102-VM2-Alex**, wait, then in the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex** from the list, then select **Device compliance** to check the result.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Device compliance**

   **Verify:** `CMP-Windows-Custom` appears with a per-rule breakdown. The asset agent rule should fail, and the failure message should be the **RemediationStrings** text from your JSON — which is what the user sees in Company Portal.

   > [!TIP]
   > `RemediationStrings` is the difference between a user reading *your device is not compliant* and reading *the Contoso asset agent is missing; install it from Company Portal*. It costs one line of JSON and removes a support call.

**Results:** A custom compliance rule evaluates on a real device and tells the user how to fix it.

- [ ] The policy shows a per-rule result on the device.
- [ ] The failure message is your own remediation text.

### Scripts

#### Detect-ContosoCompliance.ps1 — discovery script

> [!NOTE]
> Note what this script does not do: no `Write-Host`, no progress output, no unsuppressed errors. Anything on standard output other than the single JSON line breaks the parser.

```powershell
# Contoso custom compliance discovery.
# Contract: emit ONE line of compressed JSON to stdout, exit 0.

# 1. Is the Contoso asset agent registry key present?
$agentKey = "HKLM:\SOFTWARE\Contoso\AssetAgent"
$agentPresent = Test-Path $agentKey

# 2. Which Windows build is this?
$build = [int](Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" `
    -Name CurrentBuildNumber -ErrorAction SilentlyContinue).CurrentBuildNumber

# 3. How much free space on the system drive, in whole gigabytes?
$sysDrive = Get-CimInstance -ClassName Win32_LogicalDisk `
    -Filter "DeviceID='C:'" -ErrorAction SilentlyContinue
$freeGB = if ($sysDrive) { [int]($sysDrive.FreeSpace / 1GB) } else { 0 }

$result = @{
    AssetAgentPresent = [bool]$agentPresent
    OSBuildNumber     = $build
    DiskFreeGB        = $freeGB
}

# -Compress is mandatory. Without it PowerShell emits multi-line JSON
# and the compliance parser fails with an error rather than a result.
return $result | ConvertTo-Json -Compress
```

#### Rules-ContosoCompliance.json — rules file

> [!NOTE]
> Every `SettingName` must match a key in the script output exactly, including case. `DataType` must match the type the script emits.

```json
{
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
}
```

### Troubleshooting

**Symptom:** A custom compliance policy reports an error rather than compliant or non-compliant.

- **Root cause:** The script output is not parseable JSON. Usually `-Compress` was omitted, or something wrote to standard output alongside the JSON — a `Write-Host`, a warning, or an unsuppressed error.
- **Diagnostic:**

  ```powershell
  # Run exactly as Intune would and inspect the raw output
  $out = & "C:\Path\Detect-ContosoCompliance.ps1"
  $out | Measure-Object -Line
  $out
  "Exit: $LASTEXITCODE"
  ```

- **Resolution:** The output must be exactly one line and the exit code must be 0. Add `-Compress`, remove every `Write-Host`, and add `-ErrorAction SilentlyContinue` to any cmdlet that might warn.

**Symptom:** A custom rule never evaluates and the device reports compliant against it.

- **Root cause:** The `SettingName` in the JSON does not exactly match the key emitted by the script. Matching is case-sensitive and there is no error for a rule that matches nothing.
- **Diagnostic:**

  ```powershell
  (& "C:\Path\Detect-ContosoCompliance.ps1" | ConvertFrom-Json).PSObject.Properties.Name
  ```

- **Resolution:** Compare the emitted key names against the JSON `SettingName` values character by character. This is the second most common failure after `-Compress`.

### Knowledge check

**Q1.** A custom compliance discovery script runs correctly when tested manually, but every device reports an error for the custom compliance policy. What is the most likely cause?

A. The script is running in 32-bit PowerShell
B. The JSON rules file exceeds the maximum size
C. The script is not digitally signed
D. The script output is not compressed to a single line of JSON

<details><summary>Answer</summary>

**D** — The parser expects exactly one line of compressed JSON on standard output. Omitting `ConvertTo-Json -Compress`, or leaving any other output in the script, produces a parse error reported as an error state rather than a compliance result.

*Exam tip:* `-Compress` and exit code 0 are the two things to check first for any custom compliance error. Signing and bitness cause different symptoms.

</details>

**Q2.** In a custom compliance JSON rules file, what is the purpose of RemediationStrings?

A. It maps the rule to a proactive remediation script
B. It provides the title and description the user sees explaining how to fix the failure
C. It defines the PowerShell commands that remediate the failure automatically
D. It supplies the localised name of the compliance policy

<details><summary>Answer</summary>

**B** — RemediationStrings are user-facing text shown in Company Portal when a rule fails. Custom compliance detects only — it does not remediate. Automatic remediation is the job of proactive remediations.

*Exam tip:* Custom compliance detects; proactive remediations fix. A question asking how to automatically correct a condition is pointing at proactive remediations, covered in lab 53.

</details>

---

## Lab 31: Conditional Access: require a compliant device

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** advanced

### Lab scenario

Everything so far has been preparation for this. Compliance is an opinion until Conditional Access acts on it. You will build the policy that turns non-compliance into a refused sign-in — carefully, in report-only mode first, with the break-glass account excluded, because this is the single easiest way to lock an entire organisation out of its own tenant. Then you will watch it block a real device and let it back in.

### Objectives

After completing this lab, you will be able to:

- Build a Conditional Access policy requiring a compliant device
- Use report-only mode to see the effect before enforcing it
- Exclude the emergency access account and explain why
- Observe a real block and a real recovery
- Read the sign-in logs to prove which policy acted

### Exam objectives covered

- `g1.t3.s5` — Implement Microsoft Entra Conditional Access policies that require a compliance status

### Prerequisites

- Completed labs: `compliance-policies`
- Licences: M365-E5, ENTRA-P2
- Roles: Global Administrator
- Devices and portals: Microsoft Entra admin center, vm2-alex (Windows 11)
- Personas: alex.wilber, admin-breakglass

### Exercise 1: Build the policy in report-only mode

#### Task 1: Create the policy without enforcing it

1. Sign in to the **Microsoft Entra admin center** as a Global Administrator, then select **Identity**, then **Protection**, **Conditional Access**, **Policies**, then **New policy**.
   *Path:* **Identity** > **Protection** > **Conditional Access** > **Policies** > **New policy**

2. Name it `CA-Require-Compliant-Device`.

3. Under **Users**, configure both halves carefully:

   | Setting | Value |
   | --- | --- |
   | Include | **Select users and groups > GRP-USR-FINANCE** <br> Start narrow. Do not select All users on a first policy. |
   | Exclude | **admin-breakglass, admin-intune** |

   > [!CAUTION]
   > The exclusion is not optional and it is not a formality. A policy requiring a compliant device, applied to all users, on a tenant where no device is yet compliant, locks out every administrator including you. The emergency access account from lab 4 exists for precisely this failure, and it only helps if it is excluded from the policy *before* the policy is enabled.

4. Under **Target resources**, select **Cloud apps** > **Include** > **Select apps**, and choose **Office 365**.

   > [!NOTE]
   > Selecting **All cloud apps** on a learning tenant includes the Microsoft Entra admin portal itself, which turns a small mistake into a large one. **Office 365** is a realistic target and leaves you a way back in.

5. Under **Grant**, select **Grant access**, then tick **Require device to be marked as compliant**. Leave **Require all the selected controls** selected.

6. Set **Enable policy** to **Report-only**, then create the policy.

   > [!IMPORTANT]
   > Report-only evaluates the policy on every sign-in and records what *would* have happened, without affecting anyone. It is the only safe way to introduce a Conditional Access policy, and skipping it is how organisations discover at 9am that their entire field sales team cannot reach email.

**Results:** A compliance-requiring policy exists and is evaluating without enforcing.

- [ ] The policy state reads **Report-only**.
- [ ] The emergency account is in the exclusion list.

#### Task 2: Predict the impact before enforcing

1. Use the **What If** tool: in the **Microsoft Entra admin center**, select **Identity**, then **Protection**, **Conditional Access**, **Policies**, then **What If**.
   *Path:* **Identity** > **Protection** > **Conditional Access** > **Policies** > **What If**

2. Run a simulation:

   | Setting | Value |
   | --- | --- |
   | User | **alex.wilber@<tenant>.onmicrosoft.com** |
   | Cloud apps | **Office 365** |
   | Device platform | **Windows** |

   **Verify:** The result lists `CA-Require-Compliant-Device` under policies that **would apply**, with the grant control that would be required.

3. Now sign in as Alex on **MD102-VM2-Alex** and open Office 365. In the **Microsoft Entra admin center**, select **Identity**, then **Monitoring and health**, then **Sign-in logs**.
   *Path:* **Identity** > **Monitoring and health** > **Sign-in logs**

   a. Open the most recent sign-in for Alex.
   b. Select the **Report-only** tab.
   c. Find `CA-Require-Compliant-Device` and read its result.

   **Verify:** The policy reports **Failure** in report-only, because the device is non-compliant from lab 29 — BitLocker is not yet enabled. Alex was not actually blocked. This is exactly the information you want before enforcing.

**Results:** You know the policy would block a real user before it does.

- [ ] The What If tool shows the policy applying to Alex.
- [ ] The sign-in log's report-only tab shows a failure result.

### Exercise 2: Enforce it and watch it work

#### Task 1: Turn the policy on

1. Before enabling, confirm your escape route. Open a private browser window and sign in as `admin-breakglass@<tenant>.onmicrosoft.com` to prove the account works.

   > [!IMPORTANT]
   > Do this every time, not just this once. Testing the emergency account *after* you need it is not testing it.

2. Open the policy, set **Enable policy** to **On**, and save.

3. On **MD102-VM2-Alex**, sign out of Office 365 entirely, clear the browser session, and sign in again as Alex.

   **Verify:** Access is refused with a message stating the device does not meet the organisation's requirements. This is a real Conditional Access block, caused by a real compliance failure, on a real device.

4. In the **Microsoft Entra admin center**, select **Identity**, then **Monitoring and health**, then **Sign-in logs** to confirm which policy acted:
   *Path:* **Identity** > **Monitoring and health** > **Sign-in logs**

   a. Open the failed sign-in.
   b. Select the **Conditional Access** tab.
   c. Read the policy name and its **Result**.

   **Verify:** `CA-Require-Compliant-Device` shows **Failure**, and the **Device info** tab shows the device as non-compliant. The sign-in log is the authoritative answer to *why was I blocked*, and it names the policy.

**Results:** A non-compliant device is refused access to corporate resources.

- [ ] Alex is blocked from Office 365 on the non-compliant device.
- [ ] The sign-in log names the policy that blocked it.

#### Task 2: Restore access and understand the loop

1. You have two ways back in. Both are worth doing once.

   | Approach | How | When you would use it |
   | --- | --- | --- |
   | Fix the device | Make the device compliant — enable BitLocker, or temporarily relax the failing rule in `CMP-Windows-Corporate` | The correct answer in production |
   | Bypass the policy | Sign in as the break-glass account and set the policy to report-only | When the policy itself is wrong and people are locked out |

2. Take the first route: in the **Microsoft Intune admin center**, select **Devices**, then **Compliance**, select the **CMP-Windows-Corporate** policy from the list, select **Properties**, select **Edit** next to **Device Health**, set **Require BitLocker** to **Not configured**, save, then sync the device.
   *Path:* **Devices** > **Compliance** > **CMP-Windows-Corporate** > **Properties** > **Device Health** > **Edit**

3. Wait for compliance to re-evaluate. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**, select **MD102-VM2-Alex** from the list, then select **Device compliance** to confirm.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Device compliance**

   **Verify:** The device reports **Compliant**.

   > [!NOTE]
   > Compliance state does not reach Conditional Access instantly. The device must check in, Intune must record the state, and the directory must receive it. Allow up to fifteen minutes and re-sign-in rather than assuming the policy is broken.

4. Sign in as Alex again.

   **Verify:** Access is granted. The sign-in log now shows `CA-Require-Compliant-Device` with a result of **Success**.

5. Restore the BitLocker requirement in the compliance policy so lab 43 has something to satisfy.

   > [!TIP]
   > Leave the Conditional Access policy enabled from here on. Every subsequent module now operates in a tenant where a device must be healthy to reach corporate resources, which is both realistic and a useful forcing function — if something stops working later, compliance is the first thing to check.

**Results:** You have driven the full loop: block, diagnose, remediate, restore.

- [ ] A compliant device is granted access by the same policy that blocked it.
- [ ] You can name the two ways to recover from a Conditional Access block.

#### Task 3: Note where app protection joins this

1. The same grant screen carries the control used for unmanaged devices.

   | Grant control | Requires | Applies to |
   | --- | --- | --- |
   | Require device to be marked as compliant | Intune enrollment and a passing compliance policy | Managed devices |
   | Require Microsoft Entra hybrid joined device | Hybrid join | Domain-joined estates |
   | Require app protection policy | An app protection policy applied to the app in use | **Unmanaged, personally owned devices** |
   | Require multifactor authentication | MFA registration | Any device |

   > [!IMPORTANT]
   > **Require app protection policy** is how BYOD users like Joni get access without enrolling their device. It checks that corporate data is protected inside the app rather than that the whole device is managed. Lab 36 builds the app protection policies; the Conditional Access side is this control, and pairing them is examined explicitly.

**Results:** You can pick the right grant control for managed and unmanaged devices.

- [ ] You can name the grant control used for unmanaged BYOD access.

### Troubleshooting

**Symptom:** A device is compliant in Intune but Conditional Access still blocks it.

- **Root cause:** The compliance state has not yet reached Microsoft Entra ID, the user's token predates the state change, or the device the user is signing in from is not the device that is compliant — a common case when a browser session runs on a different machine.
- **Diagnostic:**

  ```text
  Entra admin center > Identity > Monitoring and health > Sign-in logs > open the sign-in
  Check the Device info tab: is it the device you expect, and is it marked compliant?
  ```

- **Resolution:** Sign out fully to force a new token, and confirm from the sign-in log's **Device info** tab that the device identifier matches the compliant device. A browser on an unmanaged machine will never satisfy the control regardless of what other devices the user owns.

**Symptom:** Every administrator is locked out after enabling a Conditional Access policy.

- **Root cause:** The policy targets all users with a control nobody can currently satisfy, and no account was excluded.
- **Diagnostic:**

  ```text
  Sign in as the break-glass account.
  Identity > Protection > Conditional Access > Policies > open the policy > Assignments > Users > Exclude
  ```

- **Resolution:** Sign in with the emergency access account, set the policy to **Report-only**, add the exclusion, and re-enable. This is the entire justification for lab 4.

### Knowledge check

**Q1.** You are about to enable a Conditional Access policy requiring compliant devices for all users. What must you do first?

A. Set the tenant to mark devices with no compliance policy as compliant
B. Exclude the emergency access account and test the policy in report-only mode
C. Disable security defaults in Microsoft Entra ID
D. Assign the policy to a device group rather than a user group

<details><summary>Answer</summary>

**B** — Excluding a permanently assigned, cloud-only emergency account guarantees a way back in, and report-only mode shows the real impact before anyone is affected. Both are standard practice for every Conditional Access change.

*Exam tip:* Conditional Access policies are assigned to users, groups and workload identities — never to device groups. Device state is a condition or a grant control, not a target.

</details>

**Q2.** Joni uses a personally owned Windows device that is deliberately blocked from MDM enrollment. She must still reach corporate email with data protection. Which Conditional Access grant control applies?

A. Require app protection policy
B. Require multifactor authentication
C. Require Microsoft Entra hybrid joined device
D. Require device to be marked as compliant

<details><summary>Answer</summary>

**A** — Requiring compliance or hybrid join would demand enrollment, which is exactly what the enrollment restriction prevents. **Require app protection policy** verifies corporate data is protected inside the application on an unmanaged device.

*Exam tip:* Personally owned and unenrolled always points at app protection, both in the Intune policy and in the matching Conditional Access grant control.

</details>

---

# Module 6 — Application management

Deliver software: store and line-of-business apps, Win32 packaging with detection and dependencies, Microsoft 365 Apps, mobile app stores, then protect and configure those apps on managed and unmanaged devices.

## Lab 32: Store apps, line-of-business apps and assignment intent

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Contoso needs software on devices. Before packaging anything complicated, get the fundamentals right: the four app types Intune can deliver without packaging, and the three assignment intents that decide whether an app is forced, offered or removed. Intent is where most application problems begin, because Available and Required look similar in the portal and behave nothing alike.

### Objectives

After completing this lab, you will be able to:

- Add a Microsoft Store app and assign it as required
- Add a line-of-business app from an installer file
- Explain the difference between Required, Available and Uninstall
- Predict what a user sees in Company Portal for each intent
- Read app installation status per device and per user

### Exam objectives covered

- `g4.t1.s1` — Prepare applications for deployment by using Intune
- `g4.t1.s2` — Deploy apps by using Intune, including Win32 apps, line-of-business (LOB) apps, and Microsoft Store apps

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, pradeep.gupta

### Exercise 1: Deploy a Microsoft Store app

#### Task 1: Add and assign a store app

1. In the **Microsoft Intune admin center**, select **Apps**, **All apps**, then **Add**.
   *Path:* **Apps** > **All apps** > **Add**

2. Choose the app type and understand the list:

   | App type | Source | Packaging needed |
   | --- | --- | --- |
   | Microsoft Store app (new) | The Microsoft Store, searched from within Intune | None |
   | Line-of-business app | An `.msi`, `.appx` or `.msix` file you upload | None |
   | Windows app (Win32) | An `.intunewin` package you build | Yes — lab 33 |
   | Microsoft 365 Apps | The Microsoft 365 Apps installer, configured in the portal | None — lab 34 |
   | Web link | A URL that appears as an icon | None |

3. Select **Microsoft Store app (new)**, then **Search the Microsoft Store app (new)**, and find **Windows Terminal** or another small free app.

4. Configure the app information, leaving the pre-populated values, and set:

   | Setting | Value |
   | --- | --- |
   | Install behavior | **System** <br> System installs once for the machine. User installs per-user and requires the user to be signed in. |
   | Show this as a featured app in the Company Portal | **Yes** |

5. On **Assignments**, add the app under **Required** for `GRP-DEV-WIN-CORP`, then create it.

   > [!IMPORTANT]
   > Note which group type each intent accepts. **Required** and **Uninstall** work with device groups and user groups. **Available for enrolled devices** only works with **user** groups — an app cannot be *offered* to a device, because only a person can choose to install something.

**Results:** A store app is deployed as required to corporate Windows devices.

- [ ] The app appears in **All apps** with a Required assignment.

#### Task 2: Verify installation and read the report

1. On **MD102-VM1-Adele**, sync policy and wait. Required apps install without user action.

   ```powershell
   Get-AppxPackage -AllUsers | Where-Object Name -like "*Terminal*" |
       Select-Object Name, Version, Status
   ```

2. In the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select **Windows Terminal** from the list, then select **Device install status**, followed by **User install status**.
   *Path:* **Apps** > **All apps** > **Windows Terminal** > **Device install status**

   **Verify:** The device shows **Installed**. If it shows **Pending** the device has not checked in yet; if it shows **Failed** open the row for the error code.

   > [!TIP]
   > **Device install status** and **User install status** answer different questions. A system-context app appears under device status; a user-context app appears under user status. An app that looks like it has deployed nowhere is often reporting under the view you are not looking at.

**Results:** The app installed and you can read its status.

- [ ] The app is present on the device.
- [ ] **Device install status** reports Installed.

### Exercise 2: Line-of-business apps and assignment intent

#### Task 1: Add a line-of-business app

1. Obtain a small `.msi` installer. Any free MSI works — the 7-Zip MSI is a common choice.

   > [!NOTE]
   > The line-of-business app type accepts a single `.msi`, `.appx` or `.msix` and nothing else. If your software is an `.exe`, or needs a transform, a switch or more than one file, it must be packaged as a Win32 app instead — which is lab 33.

2. Select **Apps** > **All apps** > **Add** > **Line-of-business app**, upload the MSI, and complete the app information.

3. On **Assignments**, use **Available for enrolled devices** and select `GRP-USR-PILOT`.

   > [!IMPORTANT]
   > This is the difference to internalise. **Required** installs the app whether the user wants it or not. **Available** publishes it to Company Portal for the user to install if they choose. Assigning something as Available and then wondering why it did not install is one of the most common support tickets an endpoint administrator receives.

4. Create the app.

**Results:** A line-of-business app is published for self-service installation.

- [ ] The app has an **Available for enrolled devices** assignment to a user group.

#### Task 2: Compare the three intents from the user's side

1. Study the intents before testing them:

   | Intent | Group types | Behaviour | Visible in Company Portal |
   | --- | --- | --- | --- |
   | Required | User or device | Installs automatically, and reinstalls if removed | Yes, shown as installed |
   | Available for enrolled devices | **User only** | Offered; the user chooses | Yes, with an Install button |
   | Uninstall | User or device | Removes the app if present | No |

   > [!WARNING]
   > **Uninstall** beats **Required**. If a user is in one group that requires an app and another that uninstalls it, the app is removed. That makes an uninstall assignment an effective way to claw back software, and an effective way to accidentally strip an application from people who need it.

2. On **MD102-VM1-Adele**, open **Company Portal** and sign in as Adele.

   **Verify:** The store app appears as already installed. The line-of-business app appears with an **Install** button, because Adele is in the pilot group and the intent is Available.

3. Install it from Company Portal and confirm it appears in the portal's device install status.

4. Now test the uninstall intent: in the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select your line-of-business app from the list, select **Properties**, then next to **Assignments** select **Edit**. Remove the Available assignment, and add an **Uninstall** assignment for `GRP-USR-PILOT`.
   *Path:* **Apps** > **All apps** > **Properties** > **Assignments** > **Edit**

   **Verify:** After the next sync the application is removed from the device. Confirm with `Get-Package` or by looking in Installed apps.

   > [!TIP]
   > Removing an assignment does **not** uninstall an app — it just stops managing it. To actually remove software you must assign the Uninstall intent. That distinction appears on the exam and surprises people in production.

**Results:** You have driven all three intents and seen what each does on a real device.

- [ ] A required app installed with no user action.
- [ ] An available app appeared in Company Portal and installed on request.
- [ ] An uninstall assignment removed the app.

### Troubleshooting

**Symptom:** An application assigned to a group never installs and reports no error.

- **Root cause:** The intent is **Available** rather than **Required**, so the app is waiting for the user to install it from Company Portal. Alternatively, an Available assignment was made to a device group, which is not supported and silently reaches nobody.
- **Diagnostic:**

  ```text
  Apps > All apps > open the app > Properties > Assignments
  Check the intent and whether the group is a user group or a device group.
  ```

- **Resolution:** Change the intent to **Required** for automatic installation, or confirm that Available assignments target user groups only.

### Knowledge check

**Q1.** A user is in a group with an application assigned as Required and another group with the same application assigned as Uninstall. What happens on their device?

A. The application is installed — Required takes precedence
B. The assignment is reported as a conflict and nothing happens
C. The most recently created assignment wins
D. The application is uninstalled — Uninstall takes precedence over Required

<details><summary>Answer</summary>

**D** — Uninstall has the highest precedence of the assignment intents. This makes it a reliable way to remove software, and a common cause of applications disappearing from users who are unexpectedly members of a broader group.

*Exam tip:* Precedence order: Uninstall beats Required, and Required beats Available. Also remember that simply removing an assignment does not uninstall anything.

</details>

**Q2.** You want to publish an optional application that users can install themselves from Company Portal. Which assignment must you use, and to what kind of group?

A. Required, assigned to a user group
B. Available for enrolled devices, assigned to a device group
C. Available for enrolled devices, assigned to a user group
D. Required, assigned to a device group

<details><summary>Answer</summary>

**C** — Available publishes the app for self-service and is supported only for user groups, because a device cannot choose to install something. Required installs without user interaction.

*Exam tip:* Available is user-groups-only. Required and Uninstall accept both user and device groups.

</details>

---

## Lab 33: Win32 app packaging, detection and dependencies

**Access:** Hands-on · **Estimated time:** 70 minutes · **Difficulty:** advanced

### Lab scenario

Most real software is not a clean MSI. It is an EXE with switches, or an MSI plus a transform, or three files that must run in order. Win32 app packaging handles all of it, at the cost of you having to tell Intune two things it cannot work out on its own: how to install the software, and how to know afterwards whether it worked. That second one — the detection rule — is where the majority of Win32 failures live, and `0x87D1041C` is its signature.

### Objectives

After completing this lab, you will be able to:

- Package an installer into an .intunewin file
- Configure install and uninstall commands with the right context
- Write file, registry and script detection rules
- Configure requirements, dependencies and supersedence
- Diagnose a detection failure using the IME logs

### Exam objectives covered

- `g4.t1.s1` — Prepare applications for deployment by using Intune
- `g4.t1.s2` — Deploy apps by using Intune, including Win32 apps, line-of-business (LOB) apps, and Microsoft Store apps

### Prerequisites

- Completed labs: `store-and-lob-apps`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: pradeep.gupta, adele.vance

### Exercise 1: Build the package

#### Task 1: Create an .intunewin file

1. Download the **Microsoft Win32 Content Prep Tool** from [the GitHub repository](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) and extract `IntuneWinAppUtil.exe`.

2. On your admin workstation or host, open Windows PowerShell as an administrator and create a clean source folder containing only what the installer needs:

   ```powershell
   New-Item -ItemType Directory -Path C:\Packaging\7zip\Source -Force
   # Copy only the installer and any files it requires into Source\
   ```

   > [!IMPORTANT]
   > The tool packages the **entire** source folder recursively. Point it at a folder containing your downloads directory and you will produce a two-gigabyte package that takes an hour to upload. Keep the source folder minimal and deliberate.

3. On your admin workstation, run the packaging tool from Command Prompt:

   ```cmd
   IntuneWinAppUtil.exe -c C:\Packaging\7zip\Source -s 7z-installer.msi -o C:\Packaging\7zip\Output -q
   ```

   | Switch | Meaning |
   | --- | --- |
   | `-c` | Source folder, packaged recursively |
   | `-s` | The setup file within that folder |
   | `-o` | Output folder for the `.intunewin` file |
   | `-q` | Quiet — no prompts |

   **Verify:** An `.intunewin` file exists in the output folder. It is an encrypted archive; you cannot open it to check the contents, which is why the source folder must be right before you package.

**Results:** A Win32 package is ready to upload.

- [ ] The `.intunewin` file exists and is a sensible size.

### Exercise 2: Configure the app in Intune

#### Task 1: Upload and set install behaviour

1. Select **Apps**, **All apps**, **Add**, then **Windows app (Win32)**, and upload the `.intunewin` file.
   *Path:* **Apps** > **All apps** > **Add**

2. On **Program**, configure the commands:

   | Setting | Value |
   | --- | --- |
   | Install command | **msiexec /i "7z-installer.msi" /qn /norestart** |
   | Uninstall command | **msiexec /x "{PRODUCT-CODE-GUID}" /qn /norestart** |
   | Install behavior | **System** <br> System installs for the machine. User context cannot write to Program Files or HKLM and produces 0x80070005. |
   | Device restart behavior | **No specific action** |

   > [!NOTE]
   > Always include a quiet switch and a no-restart switch. An installer that shows a dialog waits forever in system context because there is no interactive desktop to show it on, and an installer that restarts the machine mid-Autopilot produces a very confusing failure.

3. Configure the return codes that Intune should treat as success:

   | Code | Meaning | Default |
   | --- | --- | --- |
   | 0 | Success | Success |
   | 1707 | Success | Success |
   | 3010 | Soft reboot required — the install worked | Soft reboot |
   | 1641 | Hard reboot initiated by the installer | Hard reboot |
   | 1618 | Another installation is already in progress | Retry |

   > [!TIP]
   > If your installer returns a non-standard success code, add it here as **Success**. Otherwise a perfectly good installation is reported as a failure and Intune retries it indefinitely.

4. On **Requirements**, set the minimum bar for the app even to be attempted:

   | Setting | Value |
   | --- | --- |
   | Operating system architecture | **64-bit** |
   | Minimum operating system | **Windows 11 21H2** |
   | Disk space required (MB) | **500** |

   > [!IMPORTANT]
   > Requirement rules and detection rules answer different questions. A **requirement** decides whether the app should be attempted at all; a device failing it reports **Not applicable**. A **detection rule** decides whether the app is already there; failing it after a successful install reports `0x87D1041C`.

**Results:** The app has install commands, return codes and requirements.

- [ ] Install and uninstall commands include quiet and no-restart switches.
- [ ] Install behaviour is **System**.

#### Task 2: Write the detection rule

1. On **Detection rules**, choose **Manually configure detection rules** and review the three types:

   | Type | Checks | Best for |
   | --- | --- | --- |
   | MSI | The MSI product code is registered | Anything installed by a single MSI — simplest and most reliable |
   | File | A file or folder exists, optionally with a version or date comparison | EXE installers that drop a known binary |
   | Registry | A key or value exists, optionally compared | Installers that write a version to the registry |
   | Script | A PowerShell script decides | Anything the other three cannot express |

2. In the **Detection rules** step, select **Add** to configure a **File** rule, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Rule type | **File** |
   | Path | **C:\Program Files\7-Zip** |
   | File or folder | **7z.exe** |
   | Detection method | **File or folder exists** |
   | Associated with a 32-bit app on 64-bit clients | **No** |

   a. In the detection rule pane, enter the fields above and select **OK**.
   b. Select **Next** through **Dependencies** and **Supersedence** (leave empty).
   c. On the **Assignments** tab, under **Required**, select **Add group** and choose `GRP-USR-PILOT`, then select **Next**.
   d. On the **Review + create** tab, select **Create**.

   > [!WARNING]
   > The **Associated with a 32-bit app on 64-bit clients** toggle silently redirects your path. Set to **Yes**, a path of `C:\Program Files` is redirected to `C:\Program Files (x86)`, and a registry path under `HKLM\SOFTWARE` is redirected to `WOW6432Node`. Getting this backwards is a very common cause of `0x87D1041C` on an application that installed perfectly.

3. Note the contract for a **script** detection rule, because it is different from every other script in Intune:

   > [!IMPORTANT]
   > A detection script must do **both** things to signal detected: write something to standard output **and** exit with code 0. Exiting 0 with no output means not detected. Writing output but exiting non-zero means not detected. This two-part contract catches almost everyone the first time.

   *A correct script detection rule (evaluated by Intune Management Extension on client)*
   ```powershell
   if (Test-Path "C:\Program Files\7-Zip\7z.exe") {
       Write-Output "Detected"   # output is required
       exit 0                     # AND exit 0 is required
   }
   exit 1
   ```

**Results:** The app has a detection rule that matches what the installer actually produces.

- [ ] A detection rule is configured with the correct 32-bit redirection setting.

### Exercise 3: Dependencies, supersedence and diagnosis

#### Task 1: Configure a dependency and understand supersedence

1. In the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select the Win32 application (**7-Zip**) from the list, select **Dependencies**, then select **Add**. Choose the line-of-business app from lab 32.
   *Path:* **Apps** > **All apps** > **7-Zip** > **Dependencies** > **Add**

   | Setting | Value |
   | --- | --- |
   | Automatically install | **Yes** <br> Installs the dependency even if it is not separately assigned. |

   > [!IMPORTANT]
   > Dependencies enforce **order**, which is the correct answer to *how do I make app A install before app B*. Relying on assignment timing does not work and produces `0x8007064C` when two installers collide. Dependencies can nest to a depth of 100, but a chain that deep is a design problem rather than a feature.

2. Review supersedence, which is a different relationship:

   |  | Dependency | Supersedence |
   | --- | --- | --- |
   | Expresses | This app needs that app first | This app replaces that app |
   | Options | Automatically install, or require it to be present | Update the existing app, or uninstall it first |
   | Typical use | A runtime or prerequisite library | Upgrading version 1 to version 2 |
   | Maximum depth | 100 levels | 10 levels |

   > [!TIP]
   > Use supersedence for version upgrades rather than deleting the old app and adding a new one. Deleting an assigned app removes it from devices, so users lose the software before the replacement arrives.

**Results:** Install order is expressed as a dependency rather than left to chance.

- [ ] The app lists a dependency with automatic installation enabled.
- [ ] You can state when to use supersedence instead.

#### Task 2: Diagnose from the IME log

1. On **MD102-VM1-Adele**, sync policy and wait for the app to install.

2. On **MD102-VM1-Adele**, open PowerShell as an administrator and read the IME log (the single most valuable file for Win32 troubleshooting):

   ```powershell
   $log = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log"
   Get-Content $log -Tail 200 | Select-String -Pattern "7-Zip|Detection|ApplicationPolicy|ExitCode"
   ```

   | Log file | Contains |
   | --- | --- |
   | `IntuneManagementExtension.log` | Policy retrieval, app download, install execution, exit codes |
   | `AppWorkload.log` | Per-application workload detail, including detection rule evaluation |
   | `AgentExecutor.log` | PowerShell script and remediation execution |

   > [!TIP]
   > Install **CMTrace** or use the Support Center log viewer to read these — they are formatted for it and are close to unreadable in Notepad. Search for the application name, then read forward to the detection result.

3. Deliberately break detection to see the signature failure. In the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select **7-Zip** from the list, select **Properties**, then next to **Detection rules** select **Edit**. Change the path to a path that does not exist, such as `C:\Program Files\7-Zip-Wrong`, save, then sync again.
   *Path:* **Apps** > **All apps** > **7-Zip** > **Properties** > **Detection rules** > **Edit**

   **Verify:** The application reports **Failed** with `0x87D1041C` even though the software is installed on the device. The installer returned 0 and the detection rule then said the app was absent.

   > [!IMPORTANT]
   > This is the most common Win32 failure in production and the most common Win32 question on the exam. `0x87D1041C` means *the install succeeded and the detection rule disagrees*. Fix the rule, not the installer.

4. Correct the detection rule and confirm the app reports **Installed**.

**Results:** You have seen a detection failure, recognised its code, and fixed it.

- [ ] You provoked `0x87D1041C` and resolved it by correcting the detection rule.
- [ ] You can locate the Intune Management Extension logs from memory.

### Troubleshooting

**Symptom:** A Win32 app reports `0x87D1041C` but the software is clearly installed on the device.

- **Root cause:** The detection rule does not match reality. Usually a wrong path, a 32-bit redirection toggle set incorrectly, or a script detection rule that exits 0 without writing output.
- **Diagnostic:**

  ```powershell
  Get-Content "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\AppWorkload.log" -Tail 300 |
      Select-String "Detection|detected|Rule"
  ```

- **Resolution:** Verify the path or registry value on the device by hand, check the 32-bit toggle against where the app actually installed, and for script rules confirm the script both writes output and exits 0.
- **Error codes:** `0x87D1041C`

**Symptom:** A Win32 app fails with `0x80070005` access denied.

- **Root cause:** The app is deploying in user context but writes to Program Files or HKLM.
- **Diagnostic:**

  ```text
  Apps > All apps > open the app > Properties > Program > Install behavior
  ```

- **Resolution:** Set install behaviour to **System**. If the application genuinely must install per user, target a user group and ensure it writes only to the user profile and HKCU.
- **Error codes:** `0x80070005`

### Knowledge check

**Q1.** A Win32 application installs correctly on the device but Intune reports it as failed with 0x87D1041C. What should you correct?

A. The detection rule
B. The requirement rules
C. The install command line
D. The return code mapping

<details><summary>Answer</summary>

**A** — `0x87D1041C` means the installer returned success and the detection rule then evaluated to false. The software is present; Intune's method of confirming it is wrong.

*Exam tip:* Requirements decide whether to try, detection decides whether it is already there. A device failing requirements reports Not applicable, not failed.

</details>

**Q2.** You write a PowerShell detection rule for a Win32 app. What must the script do to indicate the application is detected?

A. Write output to STDOUT only
B. Return $true from the script
C. Exit with code 0 only
D. Write output to STDOUT and exit with code 0

<details><summary>Answer</summary>

**D** — Both conditions are required. Exit code 0 with no output means not detected, and output with a non-zero exit code also means not detected.

*Exam tip:* This two-part contract is unique to Win32 detection scripts and differs from proactive remediation scripts, where the exit code alone decides.

</details>

---

## Lab 34: Deploy and manage Microsoft 365 Apps

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** intermediate

### Lab scenario

Microsoft 365 Apps is the one application every device needs and the one with its own deployment machinery. Intune builds the configuration for you, the Office Deployment Tool does the same job with an XML file, and the Microsoft 365 Apps admin center manages update channels and policies after deployment. The exam expects you to know which tool owns which decision.

### Objectives

After completing this lab, you will be able to:

- Deploy Microsoft 365 Apps through Intune with a chosen update channel
- Describe the Office Deployment Tool and its configuration XML
- Configure Office application policies through the Microsoft 365 Apps admin center
- Explain how Microsoft 365 Apps fits into an Autopilot deployment

### Exam objectives covered

- `g4.t1.s4` — Deploy Microsoft 365 Apps by using Intune
- `g4.t1.s5` — Configure policies for Office apps by using Microsoft Intune or the Microsoft 365 Apps admin center
- `g4.t1.s6` — Deploy Microsoft 365 Apps as part of a Windows Autopilot deployment, including using the Office Deployment Tool (ODT) or Microsoft Intune
- `g4.t1.s7` — Manage Microsoft 365 Apps by using the Microsoft 365 Apps admin center

### Prerequisites

- Completed labs: `store-and-lob-apps`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, Microsoft 365 Apps admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: Deploy through Intune

#### Task 1: Create the Microsoft 365 Apps deployment

1. Select **Apps**, **All apps**, **Add**, then app type **Microsoft 365 Apps** > **Windows 10 and later**.
   *Path:* **Apps** > **All apps** > **Add**

2. On **Configure app suite**, choose the applications. Deselect anything Contoso does not use — every extra application is download size and attack surface.

   | Setting | Value |
   | --- | --- |
   | Select Office apps | **Word, Excel, PowerPoint, Outlook, OneNote, Teams** |
   | Skype for Business | **Deselected** |
   | Access, Publisher | **Deselected unless required** |

3. Configure the suite properties. The update channel is the important decision here:

   | Setting | Value |
   | --- | --- |
   | Architecture | **64-bit** |
   | Update channel | **Monthly Enterprise Channel** |
   | Remove other versions | **Yes** <br> Removes older MSI-based Office installations, which otherwise coexist badly. |
   | Version to install | **Latest** |
   | Use shared computer activation | **No** <br> Yes only for multi-session or shared devices where several users sign in. |
   | Accept the Microsoft Software License Terms | **Yes** |
   | Languages | **Match operating system** |

   | Update channel | Feature updates | Suits |
   | --- | --- | --- |
   | Current Channel | As soon as released | Users who want features early; pilot rings |
   | Monthly Enterprise Channel | Once a month, predictable date | **The usual production choice** |
   | Semi-Annual Enterprise Channel | Twice a year | Regulated environments needing long validation |
   | Semi-Annual Enterprise Channel (Preview) | Twice a year, four months early | Validating the semi-annual release before it ships |

   > [!IMPORTANT]
   > Monthly Enterprise Channel is the default answer in most exam scenarios: monthly, on a predictable second-Tuesday cadence, with security updates every month regardless. Current Channel ships features continuously and is harder to validate; Semi-Annual is for environments that need a long soak.

4. Assign as **Required** to `GRP-DEV-WIN-CORP` and create the app.

5. Sync **MD102-VM1-Adele** and confirm installation in an elevated Administrator PowerShell session:

   ```powershell
   Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Office\ClickToRun\Configuration" -ErrorAction SilentlyContinue |
       Select-Object ProductReleaseIds, VersionToReport, CDNBaseUrl, AudienceData
   ```

   **Verify:** The configuration key exists and reports the channel you selected. Installation takes a while — Microsoft 365 Apps is a large download.

**Results:** Microsoft 365 Apps is deployed with a defined update channel.

- [ ] The app reports **Installed** in **Device install status**.
- [ ] The ClickToRun configuration shows the chosen channel.

#### Task 2: Understand the Office Deployment Tool alternative

1. The Office Deployment Tool does the same job with an XML file instead of a portal wizard.

   *configuration.xml — the equivalent of the portal settings above*
   ```xml
   <Configuration>
     <Add OfficeClientEdition="64" Channel="MonthlyEnterprise">
       <Product ID="O365ProPlusRetail">
         <Language ID="MatchOS" />
         <ExcludeApp ID="Groove" />
         <ExcludeApp ID="Lync" />
       </Product>
     </Add>
     <RemoveMSI />
     <Display Level="None" AcceptEULA="TRUE" />
     <Property Name="SharedComputerLicensing" Value="0" />
   </Configuration>
   ```

   |  | Intune app type | Office Deployment Tool |
   | --- | --- | --- |
   | Configuration | Portal wizard, or XML pasted into the portal | `configuration.xml` you author |
   | Delivery | Intune assignment | Run `setup.exe /configure configuration.xml`, often wrapped as a Win32 app |
   | Best for | Standard deployments | Complex requirements the wizard cannot express, or an existing scripted build |
   | During Autopilot | Assign it and let the Enrollment Status Page track it | Package as a Win32 app so the ESP can block on it |

   > [!TIP]
   > The portal wizard has an **XML data** option that accepts a `configuration.xml` directly. That gives you the tool's flexibility with Intune's delivery and reporting, and it is usually the right compromise when the wizard falls short.

2. Note the Autopilot consideration:

   > [!WARNING]
   > Microsoft 365 Apps is a multi-gigabyte download. Making it a blocking application on the Enrollment Status Page adds a long wait to every deployment and is a common cause of the `0x800705B4` timeout from lab 17. Deploy it as required but non-blocking unless the user genuinely cannot start work without it.

**Results:** You can choose between the Intune app type and the Office Deployment Tool.

- [ ] You can name the portal option that accepts a configuration.xml directly.

### Exercise 2: Policies and the Microsoft 365 Apps admin center

#### Task 1: Create a cloud policy for Office applications

1. Open the **Microsoft 365 Apps admin center** at `https://config.office.com` and sign in as `admin-intune`.

2. Select **Customization**, then **Policy Management**, then **Create**.
   *Path:* **Customization** > **Policy Management** > **Create**

3. Configure a policy configuration:

   | Setting | Value |
   | --- | --- |
   | Name | **Contoso Office baseline** |
   | Scope | **GRP-USR-IT** <br> Assigned to a user group. Policies follow the user across devices. |
   | Policy: Block macros from running in Office files from the Internet | **Enabled** |
   | Policy: VBA Macro Notification Settings | **Disable all except digitally signed macros** |
   | Policy: Use OneDrive as the default save location | **Enabled** |

   > [!IMPORTANT]
   > Cloud policy is user-based and applies wherever the user signs in to Microsoft 365 Apps, including devices Intune does not manage. That is its advantage over an ADMX profile, which applies to a managed device regardless of who uses it. Both mechanisms exist and the exam distinguishes them.

4. Create the policy, then review the other surfaces this portal owns:

   | Area | Purpose |
   | --- | --- |
   | Inventory | Which Office versions and add-ins are installed across the estate |
   | Servicing profile | Automated update management for Microsoft 365 Apps, independent of Windows Update |
   | Health | Add-in and macro reliability signals, and which builds are failing |
   | Security update status | Which devices are behind on Office security updates |

   > [!TIP]
   > **Servicing profile** is worth knowing about: it manages Microsoft 365 Apps updates centrally with its own rings and pause controls, separately from Windows Update for Business. An exam scenario about controlling Office updates specifically points here rather than at update rings.

**Results:** Office application behaviour is governed by cloud policy and you know what the admin center manages.

- [ ] A policy configuration exists and is scoped to a user group.
- [ ] You can name the feature that manages Office updates independently of Windows Update.

### Troubleshooting

**Symptom:** Microsoft 365 Apps deploys but users still have an old MSI-based Office installation alongside it.

- **Root cause:** **Remove other versions** was left at No, so the Click-to-Run installation coexisted with the older MSI build.
- **Diagnostic:**

  ```powershell
  Get-Package -Provider Programs | Where-Object Name -like "*Office*" | Select-Object Name, Version
  ```

- **Resolution:** Set **Remove other versions** to **Yes** on the app configuration and redeploy. Coexisting Office versions produce file association conflicts and unpredictable add-in behaviour.

### Knowledge check

**Q1.** Contoso wants Microsoft 365 Apps feature updates on a predictable monthly schedule with security updates every month. Which update channel should you configure?

A. Semi-Annual Enterprise Channel (Preview)
B. Semi-Annual Enterprise Channel
C. Current Channel
D. Monthly Enterprise Channel

<details><summary>Answer</summary>

**D** — Monthly Enterprise Channel delivers feature updates once a month on a predictable date, with security updates every month. Current Channel ships features continuously, and the semi-annual channels ship features only twice a year.

*Exam tip:* Monthly Enterprise Channel is the standard production answer. Reach for Semi-Annual only when a scenario stresses long validation cycles or regulatory change control.

</details>

**Q2.** You need an Office macro policy to follow users onto devices that Intune does not manage. Which tool should you use?

A. A settings catalog profile in Intune
B. An app configuration policy in Intune
C. An administrative template configuration profile in Intune
D. Cloud policy in the Microsoft 365 Apps admin center

<details><summary>Answer</summary>

**D** — Cloud policy is user-based and applies wherever the user signs in to Microsoft 365 Apps, including unmanaged devices. Intune configuration profiles apply to managed devices only.

*Exam tip:* User follows the policy means cloud policy. Device receives the policy means an Intune configuration profile.

</details>

---

## Lab 35: Mobile app stores and Quiet Time policies

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Diego's phone needs Outlook and the Contoso field app. Android apps come from Managed Google Play, which is already connected; Apple apps come from the App Store or through the Volume Purchase Program, which needs an Apple Business Manager account you do not have. While you are here, Quiet Time policies stop Outlook notifying field engineers at three in the morning — a small feature with its own exam bullet.

### Objectives

After completing this lab, you will be able to:

- Deploy an application from Managed Google Play
- Describe Apple Volume Purchase Program token management
- Configure a Quiet Time policy for Outlook
- Explain the difference between device-based and user-based VPP licensing

### Exam objectives covered

- `g4.t1.s3` — Configure Quiet Time policies for Android and iOS apps
- `g4.t1.s8` — Deploy apps from platform-specific app stores by using Intune, including Apple Volume Purchase Program and Google Play

### Prerequisites

- Completed labs: `android-enterprise`, `store-and-lob-apps`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android
- Personas: diego.siciliani, miriam.graham

### Exercise 1: Deploy from Managed Google Play

#### Task 1: Approve and assign an Android app

1. Select **Apps**, **All apps**, **Add**, then app type **Managed Google Play app**.
   *Path:* **Apps** > **All apps** > **Add**

2. The Managed Google Play storefront opens inside Intune, using the binding from lab 13. Search for **Microsoft Outlook** and select **Approve**.

   | Setting | Value |
   | --- | --- |
   | Approval settings | **Keep approved when app requests new permissions** <br> The alternative revokes approval when permissions change, which silently stops updates until someone re-approves. |

   > [!IMPORTANT]
   > Choosing **Revoke app approval when this app requests new permissions** means an application update requesting a new permission stops deploying until an administrator notices and re-approves. It is more cautious and it is how estates end up months behind on app updates. Pick deliberately.

3. Select **Sync** to bring approved apps into Intune, then find Outlook under **All apps**.

   > [!NOTE]
   > Approving in the storefront does not deploy anything. The app then has to be assigned in Intune like any other. Synchronisation between Google and Intune can take several minutes.

4. Assign it as **Required** to `GRP-USR-FIELD`, then confirm on the emulator.

   **Verify:** Outlook appears in the work profile with the briefcase badge, installed automatically without Diego doing anything.

**Results:** An application is deployed to the work profile from Managed Google Play.

- [ ] Outlook is installed inside the Android work profile.
- [ ] The app reports **Installed** in **Device install status**.

### Exercise 2: Apple VPP and Quiet Time

#### Task 1: Understand Volume Purchase Program licensing

1. Apple applications are bought in Apple Business Manager and delivered through a VPP token uploaded to Intune. You have no Apple Business Manager account, so this is reference — but the licensing model is examined.

   |  | Device licensing | User licensing |
   | --- | --- | --- |
   | Licence assigned to | The device | The user's Apple Account |
   | User needs an Apple Account | **No** | Yes |
   | User must accept an invitation | No | Yes |
   | Works on shared or kiosk devices | **Yes** | No |
   | Licence reclaimed when | The device is retired | The user is unassigned |

   > [!IMPORTANT]
   > **Device licensing** is the answer for shared, kiosk or unattended Apple hardware, because it needs no Apple Account and no user acceptance. User licensing follows a person across their devices. A scenario describing shared iPads in a store is asking for device licensing.

2. Note the token lifecycle, which repeats the pattern from lab 14:

   > [!WARNING]
   > A VPP token expires **annually** and is tied to the Apple ID that created it. That is now the third annually expiring Apple artefact alongside the MDM push certificate and the enrollment program token. Mature Apple estates track all three on one calendar, and the exam expects you to know they all expire.

**Results:** You can choose a VPP licensing mode and name the token lifecycle.

- [ ] You can name the licensing mode suited to shared devices.
- [ ] You can list the three Apple artefacts that expire annually.

#### Task 2: Configure a Quiet Time policy

1. Select **Apps**, then **Quiet time**, then **Policies**, then **Create policy** > **Set Quiet Time**.
   *Path:* **Apps** > **Quiet time** > **Policies** > **Create policy**

2. Configure a schedule that suppresses Outlook notifications outside working hours:

   | Setting | Value |
   | --- | --- |
   | Name | **QT-Field-OutOfHours** |
   | Setting type | **Daily** <br> Daily sets a nightly window. Weekend sets whole days off. |
   | Quiet time start | **19:00** |
   | Quiet time end | **07:00** |
   | Allow user to change setting | **No** |

   > [!NOTE]
   > Quiet Time suppresses **Outlook mobile notifications** on iOS and Android. It does not stop mail arriving, does not affect other applications, and is not a security control — it exists for right-to-disconnect obligations and for not waking people up. Knowing what it does not do is the examinable part.

3. Assign the policy to `GRP-USR-FIELD` and create it.

   **Verify:** The policy appears under **Quiet time** > **Policies** with its assignment. Diego's Outlook will stop notifying between 19:00 and 07:00.

**Results:** Field engineers stop receiving Outlook notifications overnight.

- [ ] `QT-Field-OutOfHours` is assigned to a user group.
- [ ] You can state which application Quiet Time affects.

### Troubleshooting

**Symptom:** An approved Managed Google Play application does not appear in Intune.

- **Root cause:** Approval happens in the Google storefront, and Intune only sees it after a synchronisation, which is not instant.
- **Diagnostic:**

  ```text
  Apps > All apps > Add > Managed Google Play app > Sync
  Devices > Enrollment > Android > Managed Google Play — confirm the binding is healthy.
  ```

- **Resolution:** Trigger a manual sync and wait several minutes. If the app still does not appear, confirm the Managed Google Play binding is still connected — an unbound tenant shows an empty storefront rather than an error.

### Knowledge check

**Q1.** Contoso deploys shared iPads in retail stores. Users do not have individual Apple Accounts. Which VPP licensing mode should be used?

A. User licensing
B. Either, since both work without an Apple Account
C. Device licensing
D. Neither — shared devices cannot use VPP applications

<details><summary>Answer</summary>

**C** — Device licensing assigns the licence to the hardware, requiring no Apple Account and no invitation acceptance. User licensing requires each user to have an Apple Account and accept an invitation, which shared-device users do not have.

*Exam tip:* Shared, kiosk or unattended Apple hardware always means device licensing. A named user across several devices means user licensing.

</details>

**Q2.** What does a Quiet Time policy control?

A. Outlook mobile notifications on iOS and Android during a configured schedule
B. All notifications from all managed applications
C. Whether applications may sync data outside working hours
D. Device screen time limits for managed devices

<details><summary>Answer</summary>

**A** — Quiet Time suppresses Outlook mobile notifications on a schedule. Mail still arrives and other applications are unaffected — it is a working-hours feature, not a data or security control.

*Exam tip:* The scope is deliberately narrow: Outlook mobile, notifications only. Any answer implying it blocks sync or affects other apps is wrong.

</details>

---

## Lab 36: App protection policies and selective wipe

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** intermediate

### Lab scenario

Joni's personal laptop is deliberately blocked from enrollment, and Diego's phone is enrolled but personally owned. Both need corporate mail, and neither should let corporate data leak into a personal account. App protection policies secure the data inside the application rather than the device around it — the only workable answer for hardware the organisation does not own.

### Objectives

After completing this lab, you will be able to:

- Create app protection policies for Android and Windows
- Configure data relocation and access requirements
- Pair app protection with a Conditional Access grant control
- Perform a selective wipe and understand what it removes
- Distinguish MAM without enrollment from MAM on managed devices

### Exam objectives covered

- `g4.t2.s1` — Plan and implement app protection policies for managed and unmanaged (BYOD) devices by using Microsoft Intune
- `g4.t2.s2` — Implement Microsoft Entra Conditional Access policies for app protection policies

### Prerequisites

- Completed labs: `mobile-apps-and-quiet-time`, `conditional-access`
- Licences: M365-E5, ENTRA-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android
- Personas: joni.sherman, diego.siciliani, isaiah.langer

### Exercise 1: Create an Android app protection policy

#### Task 1: Configure data protection and access

1. Select **Apps**, **App protection policies**, then **Create policy** > **Android**.
   *Path:* **Apps** > **App protection policies** > **Create policy**

2. Name it `APP-Android-Corporate`, then on **Apps** set:

   | Setting | Value |
   | --- | --- |
   | Target policy to | **All app types** <br> Covers apps on unenrolled devices and on enrolled ones. |
   | Public apps | **Microsoft Outlook, Microsoft Teams, Microsoft Edge, OneDrive** |

   > [!IMPORTANT]
   > App protection only works with applications built against the Intune App SDK or wrapped with the App Wrapping Tool. Microsoft's own apps are all supported; an arbitrary third-party app is not, and adding it achieves nothing. This is the first thing to check when a policy appears to have no effect.

3. On **Data protection**, configure the relocation rules that stop leakage:

   | Setting | Value |
   | --- | --- |
   | Backup org data to Android backup services | **Block** |
   | Send org data to other apps | **Policy managed apps** <br> Corporate data can only move to other protected apps. |
   | Save copies of org data | **Block** |
   | Allow user to save copies to selected services | **OneDrive for Business, SharePoint** |
   | Restrict cut, copy, and paste between other apps | **Policy managed apps** |
   | Screen capture and Google Assistant | **Block** |
   | Encrypt org data | **Require** |

4. On **Access requirements**, configure the gate the user meets:

   | Setting | Value |
   | --- | --- |
   | PIN for access | **Require** |
   | PIN type | **Numeric** |
   | Minimum PIN length | **6** |
   | Recheck the access requirements after (minutes of inactivity) | **30** |
   | Work or school account credentials for access | **Require** |

   > [!NOTE]
   > This app PIN is separate from both the device unlock code and the Android work profile challenge. On a personally owned device with a work profile, a user can end up with three. Consider whether you need the app PIN when the work profile already has one — the settings are independent and stack.

5. On **Conditional launch**, set what happens when conditions are not met:

   | Setting | Value |
   | --- | --- |
   | Max PIN attempts | **5 — Reset PIN** |
   | Offline grace period | **720 minutes — Block access** |
   | Offline grace period | **90 days — Wipe data** <br> A device that has not checked in for 90 days loses its corporate data. |
   | Jailbroken/rooted devices | **Block access** |
   | Min OS version | **13.0 — Block access** |

6. Assign to `GRP-USR-BYOD` and `GRP-USR-FIELD`, then create the policy.

**Results:** Corporate data inside managed apps is encrypted, PIN-protected and cannot move to personal apps.

- [ ] `APP-Android-Corporate` targets Outlook, Teams, Edge and OneDrive.
- [ ] Conditional launch includes a wipe action for long-offline devices.

#### Task 2: Verify on the device

1. On the Android emulator, open **Outlook** in the work profile and sign in as Diego.

   **Verify:** Outlook prompts to set an app PIN meeting your complexity rules, separate from the work profile challenge.

2. Test the data boundary:

   a. Open an email and try to copy text into a personal application. It is blocked.
   b. Try to save an attachment to local storage. Only OneDrive for Business and SharePoint are offered.
   c. Try a screenshot inside Outlook. It is refused.

3. In the **Microsoft Intune admin center**, select **Apps**, then **Monitor**, then **App protection status** to check the reporting.
   *Path:* **Apps** > **Monitor** > **App protection status**

   **Verify:** Diego appears with a policy status of **Protected** and the checked-in time. **Flagged users** on the same page lists devices failing conditional launch.

**Results:** Data protection is enforced inside the applications and visible in reporting.

- [ ] An app PIN is required to open Outlook.
- [ ] Corporate data cannot be pasted into personal apps.

### Exercise 2: Conditional Access and selective wipe

#### Task 1: Require app protection through Conditional Access

1. In the **Microsoft Entra admin center**, select **Identity**, then **Protection**, **Conditional Access**, **Policies**, then **New policy** to create a policy named `CA-Require-App-Protection`.
   *Path:* **Identity** > **Protection** > **Conditional Access** > **Policies** > **New policy**

2. Configure it:

   | Setting | Value |
   | --- | --- |
   | Users — Include | **GRP-USR-BYOD** |
   | Users — Exclude | **admin-breakglass, admin-intune** |
   | Target resources | **Office 365** |
   | Conditions — Device platforms | **Android, iOS, Windows** |
   | Conditions — Client apps | **Mobile apps and desktop clients** |
   | Grant | **Require app protection policy** |
   | For multiple controls | **Require one of the selected controls** |
   | Enable policy | **Report-only** |

   > [!IMPORTANT]
   > This is the pairing the exam asks about. `CA-Require-Compliant-Device` from lab 31 demands enrollment, which BYOD users cannot provide. **Require app protection policy** verifies instead that the app itself is protected, which lets an unmanaged device reach corporate data safely. Together they cover both populations.

3. Create the policy in report-only mode, then review the sign-in logs after Joni or Diego signs in.

   > [!TIP]
   > Set **For multiple controls** to *Require one of the selected controls* if you combine app protection with compliance in one policy — otherwise a device must satisfy both, which no device can, and everyone is blocked.

**Results:** Unmanaged devices are gated on app protection rather than enrollment.

- [ ] The policy uses the **Require app protection policy** grant control.
- [ ] It is in report-only mode with the emergency account excluded.

#### Task 2: Perform a selective wipe

1. Select **Apps**, **App selective wipe**, then **Create wipe request**.
   *Path:* **Apps** > **App selective wipe** > **Create wipe request**

2. Select `diego.siciliani@<tenant>.onmicrosoft.com`, choose the device, and create the request.

3. Understand precisely what this does before running it:

   | Action | Removes | Leaves |
   | --- | --- | --- |
   | **App selective wipe** | Corporate data inside managed apps | The device, personal data, and the apps themselves |
   | **Retire** (lab 50) | Management, policies, company apps, work profile | The device and all personal data |
   | **Wipe** (lab 50) | Everything — factory reset | Nothing |

   > [!IMPORTANT]
   > Selective wipe is the least destructive of the three and the right answer for a departing employee's personal phone. It removes corporate data from within managed applications and touches nothing else — the user keeps their photos, their apps and their device.

4. On the emulator, open Outlook after the wipe reaches the device.

   **Verify:** Corporate mail is gone and Outlook prompts to sign in again. The app itself is still installed and Diego's personal content is untouched.

5. Check the wipe status in the portal.

   **Verify:** **App selective wipe** shows the request as **Succeeded**. Requests remain pending until the app next contacts the service, so a device that is switched off shows pending indefinitely.

**Results:** Corporate data is removed from a personally owned device without touching anything personal.

- [ ] The wipe request reports success.
- [ ] You can state the difference between selective wipe, retire and wipe.

### Troubleshooting

**Symptom:** An app protection policy is assigned but no PIN prompt appears and data can be copied freely.

- **Root cause:** The application is not Intune App SDK enabled, the user is not in an assigned group, or the app was signed into with a personal account rather than the work account.
- **Diagnostic:**

  ```text
  Apps > Monitor > App protection status
  Filter by the user and check the policy status and the last check-in.
  ```

- **Resolution:** Confirm the app appears in Microsoft's list of protected apps, confirm group membership, and ensure the user signed into the app with their work account — app protection is bound to the corporate identity, not the app.

### Knowledge check

**Q1.** An employee leaves and returns their corporate laptop, but their personal phone had corporate mail through Outlook with an app protection policy. What action removes corporate data without affecting their personal content?

A. App selective wipe
B. Delete the device record from Intune
C. Retire
D. Wipe

<details><summary>Answer</summary>

**A** — Selective wipe removes corporate data from within managed applications and leaves the device, its personal data and the apps themselves intact. Retire removes management, and wipe factory-resets the device.

*Exam tip:* Three levels of removal: selective wipe touches data in apps, retire removes management, wipe destroys everything. Match the level to what the scenario says the organisation owns.

</details>

**Q2.** You create a Conditional Access policy combining Require device to be marked as compliant and Require app protection policy, and set it to require all selected controls. What is the effect on a BYOD user with an unenrolled but app-protected device?

A. They are granted access, because app protection is satisfied
B. The policy does not apply to unenrolled devices
C. They are prompted to enrol the device
D. They are blocked, because an unenrolled device cannot satisfy the compliance control

<details><summary>Answer</summary>

**D** — Requiring all selected controls means every control must be satisfied. An unenrolled device can never be marked compliant, so the user is blocked regardless of app protection.

*Exam tip:* When combining grant controls, *Require one of the selected controls* is what lets managed and unmanaged devices coexist under one policy. Requiring all of them is a common lockout.

</details>

---

## Lab 37: App configuration policies for managed devices and managed apps

**Access:** Hands-on · **Estimated time:** 35 minutes · **Difficulty:** intermediate

### Lab scenario

Deploying Outlook is not the same as configuring it. App configuration policies push settings into an application so users are not asked to type a server name or an account they should not have to know. There are two kinds, and the distinction is the whole exam bullet: managed devices, which needs enrollment, and managed apps, which does not.

### Objectives

After completing this lab, you will be able to:

- Create an app configuration policy for managed devices
- Create an app configuration policy for managed apps on unenrolled devices
- Use configuration tokens to pre-populate account details
- Choose the correct policy type for a given scenario

### Exam objectives covered

- `g4.t2.s3` — Plan and implement app configuration policies for managed apps and managed devices

### Prerequisites

- Completed labs: `app-protection-policies`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android
- Personas: diego.siciliani, joni.sherman

### Exercise 1: Choose the right policy type

#### Task 1: Compare the two types

1. Both are created under **Apps** > **App configuration policies**, and they behave very differently.

   |  | Managed devices | Managed apps |
   | --- | --- | --- |
   | Device must be enrolled | **Yes** | **No** |
   | Delivered by | The MDM channel to the device | The Intune App SDK inside the application |
   | Targets | Devices or users, and a specific app | Users only |
   | Settings available | Everything the app exposes through its managed configuration schema | The subset the app reads through the SDK |
   | Works alongside | Configuration profiles | App protection policies |
   | Typical use | A corporate phone or fully managed device | BYOD, where the device is not enrolled |

   > [!IMPORTANT]
   > The names are chosen badly and the exam exploits it. **Managed devices** means the *device* is managed — enrollment required. **Managed apps** means only the *app* is managed — no enrollment. If a scenario says the device is not enrolled, only the managed apps type can possibly apply.

**Results:** You can pick the correct app configuration policy type from a scenario.

- [ ] You can state which type works on an unenrolled device.

### Exercise 2: Build both policies

#### Task 1: Configure Outlook on managed devices

1. Select **Apps**, **App configuration policies**, then **Add** > **Managed devices**.
   *Path:* **Apps** > **App configuration policies** > **Add** > **Managed devices**

2. Configure the basics:

   | Setting | Value |
   | --- | --- |
   | Name | **CFG-Outlook-ManagedDevices** |
   | Platform | **Android Enterprise** |
   | Profile type | **All Profile Types** |
   | Targeted app | **Microsoft Outlook** |

3. On **Settings**, choose **Use configuration designer** and set:

   | Setting | Value |
   | --- | --- |
   | Account setup — Email address | **{{mail}}** |
   | Account setup — Username | **{{userprincipalname}}** |
   | Allow only work or school accounts | **Yes** |
   | Focused inbox | **Enabled** |
   | Save contacts to native contacts app | **Disabled** |

   > [!IMPORTANT]
   > The double-brace values are **configuration tokens**, resolved per user when the policy reaches the device. `{{userprincipalname}}`, `{{mail}}`, `{{partialupn}}`, `{{deviceid}}` and `{{serialnumber}}` are the common ones. They let one policy serve every user — without them you would need a policy per person.

4. Assign to `GRP-USR-FIELD` and create the policy.

5. On the Android emulator, remove and reinstall Outlook, then open it.

   **Verify:** Outlook opens with Diego's account already populated — he only supplies the password. The token resolved to his real address.

**Results:** Outlook is pre-configured on enrolled devices with per-user account details.

- [ ] The account is pre-populated on first launch.
- [ ] The policy uses configuration tokens rather than a hard-coded address.

#### Task 2: Configure Edge for unenrolled devices

1. Select **Apps**, **App configuration policies**, then **Add** > **Managed apps**.
   *Path:* **Apps** > **App configuration policies** > **Add** > **Managed apps**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **CFG-Edge-ManagedApps** |
   | Public apps | **Microsoft Edge (Android and iOS)** |

3. On **Settings**, add key and value pairs, then work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | com.microsoft.intune.mam.managedbrowser.homepage | **https://intranet.contoso.com** |
   | com.microsoft.intune.mam.managedbrowser.AllowListURLs | **contoso.com|sharepoint.com|office.com** |
   | com.microsoft.intune.mam.managedbrowser.defaultHTTPS | **true** |
   | com.microsoft.intune.mam.managedbrowser.disableShare | **true** |

   a. On the **Basics** tab, enter Name `CFG-Edge-ManagedApps` and select Microsoft Edge, then select **Next**.
   b. On the **Settings** tab, enter the four configuration keys and values above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-USR-BYOD`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!NOTE]
   > These keys are published by the application vendor. There is no picker and no validation — a mistyped key is accepted and silently ignored. Copy them from the vendor's documentation rather than typing from memory, and test the result on a device.

4. Assign to `GRP-USR-BYOD` and create the policy.

   > [!TIP]
   > This policy reaches Joni's unenrolled device because it travels inside the app through the Intune App SDK, the same channel app protection uses. That is why managed apps policies pair naturally with app protection policies and why both target user groups only.

**Results:** Edge is configured on devices Intune does not manage.

- [ ] `CFG-Edge-ManagedApps` is assigned to a user group.
- [ ] You can explain why it works without enrollment.

### Troubleshooting

**Symptom:** An app configuration policy for managed devices has no effect.

- **Root cause:** The device is not enrolled, the targeted app was installed from outside Intune, or the policy platform does not match the device's enrollment scenario.
- **Diagnostic:**

  ```text
  Apps > App configuration policies > open the policy > Device status
  Check whether the device is listed and what state it reports.
  ```

- **Resolution:** For unenrolled devices use a **Managed apps** policy instead. For enrolled devices confirm the app was deployed through Intune — a sideloaded copy does not receive managed configuration.

### Knowledge check

**Q1.** Joni's personally owned device is blocked from enrollment but has app protection policies. You need to set the home page in Microsoft Edge on that device. Which policy type do you use?

A. An app configuration policy of type Managed apps
B. A device configuration profile
C. A settings catalog profile targeting Edge
D. An app configuration policy of type Managed devices

<details><summary>Answer</summary>

**A** — Managed apps policies are delivered through the Intune App SDK inside the application and require no enrollment. Managed devices policies travel over the MDM channel and therefore need an enrolled device.

*Exam tip:* Read the names literally: managed *devices* needs a managed device; managed *apps* only needs a managed app. Unenrolled always means the latter.

</details>

**Q2.** In an app configuration policy, what does the value {{userprincipalname}} do?

A. It refers to the administrator who created the policy
B. It is a PowerShell variable evaluated on the device
C. It is a placeholder that must be replaced before saving the policy
D. It is a configuration token resolved to each user's UPN when the policy is applied

<details><summary>Answer</summary>

**D** — Configuration tokens are substituted per user at delivery, letting one policy serve an entire population. Common tokens include `{{mail}}`, `{{partialupn}}`, `{{deviceid}}` and `{{serialnumber}}`.

*Exam tip:* Any question showing double-brace values in an app configuration policy is testing whether you recognise tokens. They are resolved by Intune, not by the app or by PowerShell.

</details>

---

## Lab 38: Monitor and troubleshoot application deployment

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** advanced

### Lab scenario

An application shows as failed on nineteen devices and installed on two hundred. Your job is to find out why in minutes rather than hours. Intune's app reporting tells you where to look, the Intune Management Extension logs tell you what actually happened, and the error codes tell you which of the two you should be reading.

### Objectives

After completing this lab, you will be able to:

- Read app installation reports at tenant, app and device level
- Locate and interpret the Intune Management Extension logs
- Map common app error codes to their causes
- Use the Troubleshooting blade to diagnose a specific user

### Exam objectives covered

- `g4.t1.s9` — Monitor app deployment status and troubleshoot installation failures by using Microsoft Intune

### Prerequisites

- Completed labs: `win32-packaging`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, pradeep.gupta

### Exercise 1: Read the reporting

#### Task 1: Work down from tenant to device

1. Start at the top. Select **Apps**, then **Monitor**, then **App install status**.
   *Path:* **Apps** > **Monitor** > **App install status**

   **Verify:** Every application is listed with counts of installed, failed, pending and not applicable. This tells you which application has a problem, not why.

2. Open a failing application and select **Device install status**.

   | Status | Meaning | Where to look next |
   | --- | --- | --- |
   | Installed | Installed and detected | Nothing to do |
   | Failed | The install ran and failed, or detection failed after it | The error code, then the device logs |
   | Pending | Not yet attempted, or download in progress | Device check-in time — an offline device sits here forever |
   | Not applicable | A requirement rule excluded the device | The requirement rules, not the installer |
   | Unknown | No status reported | Whether the device has checked in at all |

   > [!IMPORTANT]
   > **Not applicable** is not a failure and is the most misread status in Intune. It means a requirement rule excluded the device deliberately — wrong architecture, OS below the minimum, insufficient disk. Chasing it as a failure wastes time; check the requirement rules instead.

3. Select a failed device row and read the **Status details** for the underlying error code.

**Results:** You can work from a tenant-wide count to a specific device and error.

- [ ] You can name what **Not applicable** actually indicates.

### Exercise 2: Read the client logs

#### Task 1: Navigate the Intune Management Extension logs

1. On **MD102-VM1-Adele**, list the log directory:

   ```powershell
   Get-ChildItem "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs" |
       Select-Object Name, Length, LastWriteTime | Sort-Object LastWriteTime -Descending
   ```

   | Log | Answers |
   | --- | --- |
   | `IntuneManagementExtension.log` | Did the device receive the app policy? Did it download? What exit code did the installer return? |
   | `AppWorkload.log` | How did each detection rule evaluate? This is where `0x87D1041C` is explained. |
   | `AgentExecutor.log` | What did a PowerShell script or remediation actually output? |
   | `ClientHealth.log` | Is the Intune Management Extension itself healthy? |

2. On **MD102-VM1-Adele**, trace one application end to end in PowerShell:

   ```powershell
   $logs = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs"
   Select-String -Path "$logs\IntuneManagementExtension.log" -Pattern "7-Zip" -Context 0,3 |
       Select-Object -Last 20
   ```

   > [!TIP]
   > Install **CMTrace**, or use **Support Center** from the Microsoft Endpoint Manager tools. These logs are written in the Configuration Manager log format and are close to unreadable in Notepad — CMTrace colour-codes errors and follows the file live.

3. On **MD102-VM1-Adele**, check the staging cache in PowerShell (which explains failures that look like a bad installer):

   ```powershell
   Get-ChildItem "C:\Windows\IMECache" -Recurse -ErrorAction SilentlyContinue |
       Select-Object FullName, Length | Select-Object -First 20
   ```

   > [!NOTE]
   > Win32 content is downloaded and extracted to `C:\Windows\IMECache` before it runs. A device with insufficient free space fails here with a download or extraction error rather than an install error — which is why the disk space requirement rule from lab 33 is worth setting.

**Results:** You can find the log that answers a given question rather than reading all of them.

- [ ] You can name the log that explains a detection failure.
- [ ] You know where Win32 content is staged before installation.

#### Task 2: Use the Troubleshooting blade

1. Select **Troubleshooting + support**, then **Troubleshoot**, and select a user.
   *Path:* **Troubleshooting + support** > **Troubleshoot**

2. Review what it consolidates for that user:

   | Section | Shows |
   | --- | --- |
   | Account status | Licences, group membership, and whether enrollment is even permitted |
   | Devices | Every device, its compliance and its last check-in |
   | App protection status | Which app protection policies apply and when they were last evaluated |
   | Compliance policies | Which policies target the user's devices and their result |
   | Configuration policies | Which profiles apply and whether they succeeded |
   | App installation status | Every app targeted at the user and its state |
   | Enrollment failures | Why an enrollment attempt was refused, with the error code |

   > [!IMPORTANT]
   > This is the blade to open first on any *it does not work for this user* call. It answers licensing, group membership, compliance, policy and app state on one page, which is exactly the set of things that usually turn out to be the cause. The Help Desk Operator role from lab 7 grants access to it.

3. Map the codes you have met so far to what they mean:

   | Code | Cause | Fix |
   | --- | --- | --- |
   | `0x87D1041C` | Install succeeded, detection rule disagreed | Correct the detection rule |
   | `0x80070005` | Access denied, usually user context writing to a machine location | Set install behaviour to System |
   | `0x80070002` | File not found inside the package | Repackage with the correct source folder |
   | `0x8007064C` | Another installation already running | Express the ordering as a dependency |
   | `0x800705B4` | Enrollment Status Page timed out on a blocking app | Reduce the blocking app list |

**Results:** You can diagnose a single user's application problem from one blade.

- [ ] The Troubleshooting blade shows app installation status for a chosen user.
- [ ] You can map each of the five common codes to a cause.

### Troubleshooting

**Symptom:** An application reports Pending on many devices for days.

- **Root cause:** Those devices have not checked in. Pending means the assignment exists and the device has not yet acted on it — it is a connectivity or check-in problem, not an application problem.
- **Diagnostic:**

  ```powershell
  Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
  Get-MgDeviceManagementManagedDevice -All |
      Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-7) } |
      Select-Object DeviceName, UserPrincipalName, LastSyncDateTime
  ```

- **Resolution:** Investigate why the devices are not checking in rather than the application. Devices offline beyond the cleanup threshold from lab 15 will eventually be removed automatically.

### Knowledge check

**Q1.** An application reports Not applicable for 40 devices. What does this indicate?

A. The detection rule could not be evaluated
B. The installation failed and was rolled back
C. The devices have not checked in recently
D. A requirement rule excluded those devices, so installation was never attempted

<details><summary>Answer</summary>

**D** — Not applicable means a requirement rule — architecture, minimum operating system, disk space — excluded the device deliberately. Nothing was attempted and nothing failed.

*Exam tip:* Not applicable points at requirement rules; Failed points at the installer or the detection rule; Pending points at device check-in. Three statuses, three completely different investigations.

</details>

**Q2.** Which log file explains why a Win32 application's detection rule evaluated as not detected?

A. ClientHealth.log
B. AppWorkload.log
C. IntuneManagementExtension.log
D. AgentExecutor.log

<details><summary>Answer</summary>

**B** — `AppWorkload.log` records per-application workload detail including detection rule evaluation. `IntuneManagementExtension.log` covers policy retrieval, download and installer exit codes, and `AgentExecutor.log` covers script execution.

*Exam tip:* All four live in `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`. Knowing which one answers which question is what turns a two-hour investigation into a ten-minute one.

</details>

---

# Module 7 — Protect devices

Endpoint security in the order a real deployment applies it: baselines first, then antivirus, firewall, attack surface reduction, disk encryption, Defender for Endpoint and App Control for Business.

## Lab 39: Security baselines

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Before configuring individual security settings one at a time, apply Microsoft's opinion of a hardened Windows device. A security baseline is a large, versioned collection of recommended settings that you deploy as a unit and then customise. It is the fastest route to a defensible configuration, and its main hazard is that it collides with settings you configure elsewhere.

### Objectives

After completing this lab, you will be able to:

- Deploy a Microsoft security baseline to a pilot group
- Customise a baseline setting and understand what that costs
- Read baseline compliance reporting
- Handle baseline version upgrades
- Predict conflicts between a baseline and a settings catalog profile

### Exam objectives covered

- `g3.t1.s5` — Plan and implement security baselines by using Microsoft Intune

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, pilot.user01

### Exercise 1: Deploy a baseline

#### Task 1: Create a baseline profile

1. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Security baselines**.
   *Path:* **Endpoint security** > **Security baselines**

   | Baseline | Covers |
   | --- | --- |
   | Security Baseline for Windows 10 and later | The general Windows hardening set — account policies, Defender, BitLocker, browser, credential protection |
   | Microsoft Defender for Endpoint Baseline | EDR and Defender-specific settings, aligned with the Defender portal's recommendations |
   | Microsoft Edge Baseline | Browser hardening |
   | Windows 365 Security Baseline | Cloud PC specific hardening |

2. Open **Security Baseline for Windows 10 and later**, then select **Create profile**.

3. Name it `SB-Windows-Pilot`, then move through the settings categories. Leave everything at its recommended value on this first pass.

   > [!IMPORTANT]
   > Deploy the baseline unmodified to a pilot ring first, then customise based on what actually breaks. Customising before you have any evidence produces a baseline that is neither Microsoft's recommendation nor a considered decision, and nobody can later say why a given setting differs.

4. Note the version shown at the top of the profile.

   > [!NOTE]
   > Baselines are versioned. Microsoft publishes new versions as guidance changes, and existing profiles stay on the version they were created with until you explicitly change them. That is deliberate — an unexpected setting change across the estate would be worse than being a version behind.

5. Assign to `GRP-USR-PILOT` and create the profile.

   > [!WARNING]
   > Do not assign a baseline to all devices on a first deployment. Baselines are opinionated and touch hundreds of settings, including credential delegation and legacy protocol behaviour. Something will break; you want that to happen to two pilot users rather than the whole organisation.

**Results:** A security baseline is deployed to a pilot ring at its published recommended values.

- [ ] `SB-Windows-Pilot` exists with a version number shown.
- [ ] It is assigned to a pilot group, not to all devices.

#### Task 2: Read the reporting and customise one setting

1. Sync **MD102-VM1-Adele**. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Security baselines**, select **Security Baseline for Windows 10 and later**, select the **SB-Windows-Pilot** profile from the list, and review its status views.
   *Path:* **Endpoint security** > **Security baselines** > **Security Baseline for Windows 10 and later** > **SB-Windows-Pilot**

   | View | Answers |
   | --- | --- |
   | Device status | Which devices have applied the baseline and which failed |
   | Per setting status | Which individual settings succeeded, errored or conflicted |
   | Devices with errors | The specific failures worth investigating |

   **Verify:** **Per setting status** lists individual settings. Look for anything reporting **Conflict** — that is a setting the baseline and another profile both try to control.

2. Now customise deliberately. With **SB-Windows-Pilot** open, select **Properties**, then next to **Configuration settings** select **Edit**, and change one value with a documented reason.
   *Path:* **Endpoint security** > **Security baselines** > **Security Baseline for Windows 10 and later** > **SB-Windows-Pilot** > **Properties** > **Configuration settings** > **Edit**

   | Setting | Value |
   | --- | --- |
   | Example setting | **Local Policies Security Options > Interactive logon: Message text for users attempting to log on** |
   | New value | **Your organisation's logon banner** |

   > [!TIP]
   > Record why every deviation exists, in the profile description if nowhere else. A baseline that has drifted from Microsoft's recommendation for reasons nobody remembers is worse than no baseline, because it carries the authority of one without the evidence.

**Results:** The baseline is applied and you can read per-setting results.

- [ ] Devices report against the baseline in **Per setting status**.
- [ ] Any deviation from the recommended value has a recorded reason.

### Exercise 2: Conflicts and versions

#### Task 1: Understand how baselines collide with other policy

1. A security baseline is, mechanically, a configuration profile. It follows configuration conflict rules exactly as lab 22 described.

   > [!IMPORTANT]
   > If a baseline sets a value and a settings catalog profile sets the same value differently, the result is a **conflict** and **neither applies**. The baseline does not win by virtue of being a baseline. This is the most common way a hardened-looking tenant turns out not to be hardened at all, because a conflict silently leaves the setting at whatever the device already had.

2. Adopt a rule that prevents it:

   | Approach | Consequence |
   | --- | --- |
   | Let the baseline own a setting, and do not set it anywhere else | **Recommended.** No conflicts, and one place to look. |
   | Set it in a settings catalog profile and remove it from the baseline | Also fine, if the baseline permits removing it |
   | Set it in both | Conflict, setting unapplied, and the reporting says so only if you look at per-setting status |

3. Check your own tenant for this now. Open **Per setting status** on the baseline and filter for **Conflict**.

   **Verify:** Any conflicts are listed with the setting name. Resolve each by deciding which profile owns it and removing it from the other.

4. Finally, understand version upgrades:

   a. Open the baseline profile and select **Versions**.
   b. Compare your version with the latest available and review the change list.
   c. Select **Change version** to move the profile to a newer baseline, choosing whether to keep your customisations.

   > [!WARNING]
   > Review the change list before upgrading. A new baseline version can introduce settings that break an application you depend on, and it applies to every device the profile targets at once. Upgrade the pilot ring first, exactly as you deployed it.

**Results:** You can predict and resolve baseline conflicts and upgrade a baseline safely.

- [ ] No settings report **Conflict** on your baseline.
- [ ] You can state which profile wins when a baseline and a settings catalog profile disagree.

### Troubleshooting

**Symptom:** A security baseline is deployed but several settings report Conflict and are not applied.

- **Root cause:** Another configuration profile sets the same settings to different values. Baselines have no precedence over ordinary profiles.
- **Diagnostic:**

  ```text
  Endpoint security > Security baselines > open the profile > Per setting status
  Filter for Conflict and note the setting names, then search Devices > Configuration for profiles setting the same values.
  ```

- **Resolution:** Decide which profile owns each setting and remove it from the other. A setting configured in exactly one place cannot conflict.

### Knowledge check

**Q1.** A security baseline and a settings catalog profile both configure the same setting to different values on the same device. What happens?

A. The setting reports a conflict and neither value is applied
B. The most restrictive value is applied
C. The security baseline takes precedence
D. The settings catalog profile takes precedence because it is more specific

<details><summary>Answer</summary>

**A** — A baseline is a configuration profile and follows the same conflict rules. Conflicting device configuration leaves the setting unapplied, with no winner — so a device can appear hardened while the setting remains at its default.

*Exam tip:* Baselines carry no special precedence. Give each setting exactly one owner, and check per-setting status for conflicts after any baseline deployment.

</details>

---

## Lab 40: Antivirus policies and tamper protection

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Microsoft Defender Antivirus is already on every Windows device. Left at its defaults it is competent; configured properly it is considerably better, and tamper protection stops an attacker or a well-meaning user switching it off. You will build the antivirus policy, enable tamper protection, and understand cloud-delivered protection well enough to explain why the sample submission setting matters.

### Objectives

After completing this lab, you will be able to:

- Create a Microsoft Defender Antivirus policy
- Configure cloud-delivered protection and sample submission
- Enable tamper protection and explain what it blocks
- Configure exclusions safely
- Verify Defender configuration from the client

### Exam objectives covered

- `g3.t1.s1` — Create antivirus policies by using Microsoft Intune

### Prerequisites

- Completed labs: `security-baselines`
- Licences: M365-E5, MDE-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11)
- Personas: alex.wilber

### Exercise 1: Configure Defender Antivirus

#### Task 1: Create the antivirus policy

1. Select **Endpoint security**, **Antivirus**, then **Create Policy**, platform **Windows**, profile **Microsoft Defender Antivirus**.
   *Path:* **Endpoint security** > **Antivirus** > **Create Policy**

2. Name it `AV-Windows-Corporate`, then configure real-time protection:

   | Setting | Value |
   | --- | --- |
   | Allow Realtime Monitoring | **Allowed** |
   | Allow Behavior Monitoring | **Allowed** |
   | Allow On Access Protection | **Allowed** |
   | Real Time Scan Direction | **Monitor all files** |
   | Allow Scanning Network Files | **Allowed** |
   | Allow Script Scanning | **Allowed** |
   | Allow Email Scanning | **Allowed** |

3. Configure cloud protection, which is where most of Defender's detection quality comes from:

   | Setting | Value |
   | --- | --- |
   | Allow Cloud Protection | **Allowed** |
   | Cloud Block Level | **High** |
   | Cloud Extended Timeout | **50** <br> Seconds Defender waits for a cloud verdict before allowing a file. The maximum is 50 plus the 10-second default. |
   | Submit Samples Consent | **Send safe samples automatically** |

   > [!IMPORTANT]
   > **Cloud-delivered protection** is what lets Defender block a file it has never seen, by asking the service about its reputation in real time. **Sample submission** is what feeds that service. Setting sample submission to *Never send* materially degrades protection for everyone, including you — the two settings work together and the exam treats them as a pair.

4. Configure remediation and scanning:

   | Setting | Value |
   | --- | --- |
   | Days To Retain Cleaned Malware | **30** |
   | Scan Parameter | **Quick scan** |
   | Schedule Scan Day | **Every day** |
   | Schedule Quick Scan Time | **120** <br> Minutes after midnight — 2am. |
   | Signature Update Interval | **4** <br> Hours between definition checks. |
   | Check For Signatures Before Running Scan | **Enabled** |

5. Assign to `GRP-DEV-WIN-CORP` and create the policy.

**Results:** Defender Antivirus is configured with cloud protection and a daily scan.

- [ ] `AV-Windows-Corporate` is assigned to corporate Windows devices.
- [ ] Cloud protection and sample submission are both enabled.

#### Task 2: Verify from the client

1. On **MD102-VM2-Alex**, sync policy, then inspect Defender's state:

   ```powershell
   Get-MpComputerStatus |
       Select-Object AMRunningMode, RealTimeProtectionEnabled, BehaviorMonitorEnabled,
           IoavProtectionEnabled, AntivirusSignatureLastUpdated, AMServiceEnabled
   ```

   **Verify:** **AMRunningMode** reads `Normal`, and the protection flags are all `True`. A running mode of `Passive` or `EDR Block Mode` means another antivirus product is the active engine.

2. On **MD102-VM2-Alex**, open PowerShell and confirm the policy values arrived:

   ```powershell
   Get-MpPreference |
       Select-Object MAPSReporting, SubmitSamplesConsent, CloudBlockLevel,
           CloudExtendedTimeout, SignatureUpdateInterval, ScanScheduleQuickScanTime
   ```

   **Verify:** `MAPSReporting` is `2` (Advanced), `SubmitSamplesConsent` is `1` (Send safe samples), and `CloudBlockLevel` reflects High.

**Results:** The client reports the configuration you deployed.

- [ ] `Get-MpComputerStatus` shows real-time protection enabled.
- [ ] `Get-MpPreference` shows the cloud settings from the policy.

### Exercise 2: Tamper protection and exclusions

#### Task 1: Enable tamper protection

1. Create a second policy: **Endpoint security** > **Antivirus** > **Create Policy**, platform **Windows**, profile **Windows Security experience**.
   *Path:* **Endpoint security** > **Antivirus** > **Create Policy**

2. Name it `AV-TamperProtection` and configure:

   | Setting | Value |
   | --- | --- |
   | Tamper Protection | **Enable** |
   | Hide the Virus and threat protection area | **Not configured** <br> Hiding it stops users seeing threats found on their own device, which is rarely what you want. |

   > [!IMPORTANT]
   > Tamper protection blocks changes to Defender settings from **any** source that is not Intune or the Defender portal — including local administrators, registry edits, PowerShell and Group Policy. That is the point: an attacker who gains local administrator rights still cannot disable real-time protection. It also means that once enabled, your own `Set-MpPreference` commands stop working, which surprises administrators mid-troubleshooting.

3. Assign to `GRP-DEV-WIN-CORP`, create the policy, then on **MD102-VM2-Alex** verify in PowerShell after a sync:

   ```powershell
   Get-MpComputerStatus | Select-Object IsTamperProtected, RealTimeProtectionEnabled
   ```

   **Verify:** **IsTamperProtected** is `True`. Try `Set-MpPreference -DisableRealtimeMonitoring $true` — it will be refused, which is the feature working.

**Results:** Defender settings cannot be changed locally, even by an administrator.

- [ ] `IsTamperProtected` reports `True`.
- [ ] A local attempt to disable real-time protection fails.

#### Task 2: Add exclusions carefully

1. Create a third policy with profile **Microsoft Defender Antivirus exclusions**, named `AV-Exclusions-LineOfBusiness`.

2. Add only what a documented application vendor requires through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Excluded Path | **C:\Program Files\ContosoERP\Data** <br> As narrow as the vendor's documentation permits. |
   | Excluded Extensions | **Leave empty unless specifically required** |
   | Excluded Processes | **Leave empty unless specifically required** |

   a. On the **Basics** tab, enter Name `AV-Exclusions-LineOfBusiness`, then select **Next**.
   b. On the **Configuration settings** tab, enter the excluded path `C:\Program Files\ContosoERP\Data` under Path Exclusions, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP` (or the specific app group), then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!CAUTION]
   > An exclusion is a hole in your antivirus, and attackers look for them. Exclude the narrowest possible path, never a whole drive or a broad extension like `.exe`, and record which vendor document required it. Separating exclusions into their own policy — as here — means you can see every hole in one place rather than hunting through a large antivirus profile.

**Results:** Exclusions are minimal, documented and separately visible.

- [ ] Exclusions live in their own policy assigned to a narrow group.

### Troubleshooting

**Symptom:** Defender reports AMRunningMode as Passive and Intune antivirus policy appears not to apply.

- **Root cause:** A third-party antivirus product is registered as the active engine. Defender steps back to passive mode and most of its settings become inert.
- **Diagnostic:**

  ```powershell
  Get-MpComputerStatus | Select-Object AMRunningMode, AMServiceEnabled
  Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct |
      Select-Object displayName, productState
  ```

- **Resolution:** Remove the third-party product, or accept passive mode knowingly. In passive mode Defender still provides EDR signal to Defender for Endpoint but does not block, which is a security posture decision rather than a misconfiguration.

### Knowledge check

**Q1.** After enabling tamper protection, an administrator finds that `Set-MpPreference` no longer changes Defender settings on managed devices. What is the explanation?

A. The PowerShell module must be updated to a version that supports tamper protection
B. Tamper protection only permits changes made by SYSTEM
C. Set-MpPreference requires the device to be in passive mode
D. Tamper protection blocks Defender configuration changes from all sources except Intune and the Defender portal

<details><summary>Answer</summary>

**D** — Tamper protection deliberately blocks local changes to Defender configuration, including PowerShell, registry edits and Group Policy, regardless of the account's privileges. Only Intune and the Defender portal remain authoritative.

*Exam tip:* This is the intended behaviour, not a bug. Any exam scenario where a local administrator cannot disable Defender is describing tamper protection.

</details>

**Q2.** Which pair of settings work together to let Defender block a file it has never seen before?

A. Real-time protection and behaviour monitoring
B. Cloud-delivered protection and sample submission
C. Signature update interval and scheduled scanning
D. Tamper protection and attack surface reduction

<details><summary>Answer</summary>

**B** — Cloud-delivered protection queries the Microsoft service for a reputation verdict in real time, and sample submission is what supplies the service with the files that build that reputation. Disabling submission degrades cloud protection.

*Exam tip:* Behaviour monitoring detects malicious activity locally; cloud protection is what handles files with no local signature. The two are complementary and the exam distinguishes them.

</details>

---

## Lab 41: Firewall policies and rules

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

The Windows firewall is on by default and configured by almost nobody. Contoso needs it enforced across all three network profiles, with inbound connections blocked unless explicitly allowed, and a small set of rules for line-of-business software. Firewall configuration in Intune is split across two policy types, and knowing which one holds which settings saves a lot of hunting.

### Objectives

After completing this lab, you will be able to:

- Create a Microsoft Defender Firewall profile covering all three network profiles
- Create firewall rules and understand rule merging
- Explain the difference between the firewall profile and the rules profile
- Verify firewall state and rules from the client

### Exam objectives covered

- `g3.t1.s3` — Create firewall policies by using Microsoft Intune

### Prerequisites

- Completed labs: `antivirus-policies`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11)
- Personas: alex.wilber

### Exercise 1: Configure the firewall

#### Task 1: Create the firewall profile

1. Select **Endpoint security**, **Firewall**, then **Create Policy**, platform **Windows**, profile **Microsoft Defender Firewall**.
   *Path:* **Endpoint security** > **Firewall** > **Create Policy**

   > [!IMPORTANT]
   > There are two separate profile types here and they are not interchangeable. **Microsoft Defender Firewall** carries the firewall's *behaviour* — whether it is on, default actions, logging, stealth mode. **Microsoft Defender Firewall Rules** carries individual allow and block rules. Looking for rules in the first profile is a common wasted five minutes.

2. Name it `FW-Windows-Corporate`, then configure each of the three network profiles identically:

   | Setting | Value |
   | --- | --- |
   | Domain network — Firewall enabled | **Allowed** |
   | Domain network — Default inbound action for traffic | **Block** |
   | Domain network — Default outbound action for traffic | **Allow** |
   | Private network — Firewall enabled | **Allowed** |
   | Private network — Default inbound action for traffic | **Block** |
   | Public network — Firewall enabled | **Allowed** |
   | Public network — Default inbound action for traffic | **Block** |
   | Public network — Stealth mode required | **True** <br> The device does not respond to unsolicited probes, so it is harder to find on a hostile network. |

   > [!NOTE]
   > Configure all three profiles even if you think only one applies. Windows chooses the network profile itself based on how it classifies the connection, and a laptop on hotel Wi-Fi is on **Public** whether you planned for it or not. Leaving a profile unconfigured leaves it at whatever the device had.

3. Configure rule merging through the wizard tabs (which decides whether locally created rules survive):

   | Setting | Value |
   | --- | --- |
   | Policy rules from group policy not merged | **True** |
   | Local policy rules not merged | **True** <br> Rules created on the device by a local administrator are ignored. |
   | Global port rules from group policy not merged | **True** |

   a. On the **Basics** tab, enter Name `FW-Windows-Corporate`, then select **Next**.
   b. On the **Configuration settings** tab, configure the network profile settings and rule merging settings above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > Disabling local rule merging means only rules you deploy apply. Without it, a local administrator or an application installer can add a rule that punches a hole in your configuration, and nothing in the portal will tell you. Turning merging off is the difference between a firewall policy and a firewall suggestion.

**Results:** The firewall is enforced on all three network profiles with inbound blocked by default.

- [ ] All three network profiles are configured, not just Domain.
- [ ] Local rule merging is disabled.

#### Task 2: Verify from the client

1. On **MD102-VM2-Alex**, sync policy, then check firewall state:

   ```powershell
   Get-NetFirewallProfile |
       Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction,
           AllowLocalFirewallRules, AllowLocalIPsecRules
   ```

   **Verify:** All three profiles report `Enabled: True`, `DefaultInboundAction: Block` and `AllowLocalFirewallRules: False`.
   ```
   Name    Enabled DefaultInboundAction DefaultOutboundAction AllowLocalFirewallRules
   ----    ------- -------------------- --------------------- -----------------------
   Domain     True                Block                 Allow                   False
   Private    True                Block                 Allow                   False
   Public     True                Block                 Allow                   False
   ```

**Results:** The client reports the firewall configuration you deployed.

- [ ] All three profiles are enabled with inbound blocked.
- [ ] Local firewall rules are not permitted.

### Exercise 2: Firewall rules

#### Task 1: Create a rules policy

1. Create a second policy: **Endpoint security** > **Firewall** > **Create Policy**, platform **Windows**, profile **Microsoft Defender Firewall Rules**.
   *Path:* **Endpoint security** > **Firewall** > **Create Policy**

2. Name it `FW-Rules-LineOfBusiness`, add a rule, and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Name | **Allow ContosoERP inbound** |
   | Direction | **In** |
   | Action | **Allowed** |
   | Network types | **Domain, Private** <br> Deliberately not Public. A line-of-business port has no business being open on hotel Wi-Fi. |
   | Protocol | **6** <br> TCP. Protocol is entered as its IANA number, not by name. |
   | Local port ranges | **8443** |
   | File path | **C:\Program Files\ContosoERP\erp.exe** <br> Scoping to the executable means only that program can use the port. |

   a. On the **Basics** tab, enter Name `FW-Rules-LineOfBusiness`, then select **Next**.
   b. On the **Configuration settings** tab, select **Add**, configure the inbound rule fields above, select **Save**, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-DEV-WIN-CORP`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!TIP]
   > Scope every rule as tightly as it will go: a specific program, a specific port, and only the network profiles where it makes sense. A rule that allows a port on all profiles for any program is a hole with a name.

   > [!NOTE]
   > Each rules policy can hold up to 150 rules. A large ruleset should be split by purpose across several policies — it is easier to review, easier to assign to different populations, and easier to remove when an application is retired.

3. After a sync, on **MD102-VM1-Adele** open PowerShell and confirm the rule:

   ```powershell
   Get-NetFirewallRule -DisplayName "*ContosoERP*" |
       Select-Object DisplayName, Enabled, Direction, Action, Profile
   ```

**Results:** A narrowly scoped firewall rule is deployed and visible on the device.

- [ ] The rule appears in `Get-NetFirewallRule` with the expected profile scope.

### Troubleshooting

**Symptom:** A deployed firewall rule does not appear on the device, or an application still cannot connect.

- **Root cause:** The rule was placed in a Microsoft Defender Firewall profile rather than a Firewall Rules profile, the network profile scope excludes the network the device is actually on, or local rule merging is disabled and the application installer's own rule was ignored.
- **Diagnostic:**

  ```powershell
  Get-NetConnectionProfile | Select-Object InterfaceAlias, NetworkCategory
  Get-NetFirewallRule -DisplayName "*Contoso*" | Select-Object DisplayName, Enabled, Profile
  ```

- **Resolution:** Confirm which network profile the device is currently on — a device classified as Public will not use a rule scoped to Domain and Private. Then confirm the rule lives in a **Firewall Rules** policy.

### Knowledge check

**Q1.** You deploy a firewall policy blocking inbound connections by default. A line-of-business application's installer creates a local firewall rule to open its port, and the application works. What setting would have prevented that?

A. Setting the default inbound action to Block on all profiles
B. Enabling stealth mode on the Public profile
C. Assigning the policy to a device group rather than a user group
D. Setting local policy rules not merged to True

<details><summary>Answer</summary>

**D** — By default, locally created firewall rules merge with policy-deployed rules. Disabling merging means only rules you deploy apply, so an installer cannot open a port behind your back.

*Exam tip:* Rule merging is the setting that turns firewall policy from advisory into authoritative. Any scenario where an unexpected rule exists on a managed device points at it.

</details>

---

## Lab 42: Attack surface reduction rules

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** advanced

### Lab scenario

Attack surface reduction rules block the behaviours attackers rely on — Office spawning processes, scripts running downloaded executables, credential theft from LSASS. They are among the highest-value controls available and among the easiest to deploy badly, because a rule set to Block on day one will stop a line-of-business application that legitimately does something suspicious. The discipline is audit first, always.

### Objectives

After completing this lab, you will be able to:

- Create an attack surface reduction policy
- Deploy rules in Audit mode and read the resulting events
- Promote rules from Audit to Block based on evidence
- Configure per-rule exclusions
- Explain how ASR relates to Zero Trust

### Exam objectives covered

- `g3.t1.s4` — Configure Attack surface reduction policies by using Microsoft Intune, including applying Zero Trust principles for endpoint protection

### Prerequisites

- Completed labs: `antivirus-policies`
- Licences: M365-E5, MDE-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11)
- Personas: alex.wilber

### Exercise 1: Deploy in audit mode

#### Task 1: Create the ASR policy

1. Select **Endpoint security**, **Attack surface reduction**, then **Create Policy**, platform **Windows**, profile **Attack Surface Reduction Rules**.
   *Path:* **Endpoint security** > **Attack surface reduction** > **Create Policy**

2. Name it `ASR-Windows-Audit`, then set these high-value rules to **Audit**:

   | Rule | Blocks | Risk of breaking something |
   | --- | --- | --- |
   | Block credential stealing from the Windows local security authority subsystem | Tools reading LSASS memory | Low — but some legacy backup and monitoring agents do this |
   | Block all Office applications from creating child processes | Macro-launched processes | Medium — some Office add-ins legitimately spawn processes |
   | Block Office applications from injecting code into other processes | Injection-based attacks | Low |
   | Block execution of potentially obfuscated scripts | Obfuscated PowerShell and JavaScript | Medium — some vendor installers ship obfuscated scripts |
   | Block JavaScript or VBScript from launching downloaded executable content | Script-driven droppers | Low |
   | Block executable content from email client and webmail | Attachments running directly | Low |
   | Block persistence through WMI event subscription | A common persistence technique | Low |
   | Use advanced protection against ransomware | Ransomware-like file behaviour | Low |

   > [!IMPORTANT]
   > Set every rule to **Audit**, not Block. Audit logs what *would* have been blocked and changes nothing. Deploying straight to Block is the single most common way an ASR rollout is reversed within a day, because the rule that breaks your finance team's macro-driven workbook is not the one you expected.

3. Assign to `GRP-USR-PILOT` and create the policy.

   > [!NOTE]
   > ASR rules require Microsoft Defender Antivirus to be the active engine with real-time protection on. On a device where Defender is passive because a third-party product is installed, ASR rules do not evaluate at all — and report nothing.

**Results:** Eight high-value ASR rules are auditing on a pilot ring.

- [ ] `ASR-Windows-Audit` is assigned with every rule in Audit mode.

#### Task 2: Read the audit events

1. On **MD102-VM2-Alex**, sync policy and confirm the rules arrived:

   ```powershell
   $p = Get-MpPreference

   # Collected first: for is a statement, and a statement cannot be piped.
   $rules = for ($i = 0; $i -lt $p.AttackSurfaceReductionRules_Ids.Count; $i++) {
       [pscustomobject]@{
           RuleId = $p.AttackSurfaceReductionRules_Ids[$i]
           Action = switch ($p.AttackSurfaceReductionRules_Actions[$i]) {
               0 { "Disabled" }
               1 { "Block" }
               2 { "Audit" }
               6 { "Warn" }
           }
       }
   }

   $rules | Format-Table -AutoSize
   ```

   **Verify:** Eight rule identifiers are listed, all reporting **Audit**.

2. Learn the two event IDs that matter and check the Defender operational log:

   | Event ID | Meaning |
   | --- | --- |
   | 1121 | A rule **blocked** an operation |
   | 1122 | A rule **audited** an operation — it would have blocked |
   | 1125 | A rule audited an operation in warn mode |
   | 1126 | A user dismissed a warn-mode prompt |

   *Run on MD102-VM2-Alex in PowerShell to read ASR events*
   ```powershell
   Get-WinEvent -LogName "Microsoft-Windows-Windows Defender/Operational" -MaxEvents 200 -ErrorAction SilentlyContinue |
       Where-Object Id -in 1121,1122,1125,1126 |
       Select-Object TimeCreated, Id,
           @{n='Detail'; e={ ($_.Message -split "`n")[0] }} |
       Format-Table -Wrap
   ```

3. Generate an audit event so you can see one. On **MD102-VM2-Alex**, open PowerShell and run:

   ```powershell
   # A deliberately obfuscated-looking command to trip the script rule
   $c = [Convert]::FromBase64String("V3JpdGUtT3V0cHV0ICdBU1IgdGVzdCc=")
   [System.Text.Encoding]::UTF8.GetString($c) | Invoke-Expression
   ```

   > [!TIP]
   > Central reporting is better than per-device event logs at scale. **Endpoint security** > **Attack surface reduction** > **Monitor**, and the Defender portal's advanced hunting, aggregate these events across the estate — which is how you find the one application that trips a rule for forty users.

**Results:** Rules are auditing and you can find the evidence they produce.

- [ ] `Get-MpPreference` reports the rules in Audit mode.
- [ ] You can locate event 1122 in the Defender operational log.

### Exercise 2: Promote to block and add exclusions

#### Task 1: Move rules to Block based on evidence

1. Review the audit events over a realistic period — a week in production, a few minutes here — and decide per rule.

   | Audit evidence | Action |
   | --- | --- |
   | No events at all | Promote to **Block**. Nothing legitimate is tripping it. |
   | Events only from known-bad activity | Promote to **Block**. |
   | Events from a legitimate business application | Add a **per-rule exclusion** for that application, then promote to Block. |
   | Many events from many applications | Leave in Audit and investigate. The rule may not suit your estate. |

2. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Attack surface reduction**. Select `ASR-Windows-Audit` from the policy list, select **Properties**, select **Edit** next to **Configuration settings**, and change the low-risk rules to **Block**:
   *Path:* **Endpoint security** > **Attack surface reduction** > **ASR-Windows-Audit** > **Properties** > **Edit**

   | Setting | Value |
   | --- | --- |
   | Block credential stealing from LSASS | **Block** |
   | Block Office applications from injecting code into other processes | **Block** |
   | Block JavaScript or VBScript from launching downloaded executable content | **Block** |
   | Block persistence through WMI event subscription | **Block** |
   | Block all Office applications from creating child processes | **Audit** <br> Keep auditing until you are sure no add-in depends on it. |

   > [!NOTE]
   > **Warn** is a fourth mode worth knowing. It blocks the operation but lets the user override it for that session, and records event 1126 when they do. It is a useful halfway house when you are fairly confident but not certain, and it gives you a list of the people who needed the override.

3. Add an exclusion for a legitimate application:

   | Setting | Value |
   | --- | --- |
   | ASR Only Exclusions | **C:\Program Files\ContosoERP\erp.exe** |

   > [!IMPORTANT]
   > **ASR Only Exclusions** apply to attack surface reduction rules and nothing else. They are separate from Defender Antivirus exclusions, which is a genuine advantage: you can permit one application to do one suspicious thing without excluding it from antivirus scanning entirely.

4. Save and confirm on the device after a sync that the promoted rules now report **Block**.

**Results:** Rules are enforced where evidence supports it, with narrow exclusions where it does not.

- [ ] At least four rules report Block on the client.
- [ ] An ASR-only exclusion is configured for a named executable.

#### Task 2: Place ASR within Zero Trust

1. The exam objective mentions Zero Trust explicitly. ASR contributes to one principle in particular.

   | Zero Trust principle | How ASR serves it |
   | --- | --- |
   | Verify explicitly | Compliance and Conditional Access, from labs 29 and 31 |
   | Use least privilege access | RBAC, scope tags, local group membership, from labs 7, 8 and 28 |
   | **Assume breach** | **ASR, EDR and App Control** — reduce what an attacker can do *after* they get in |

   > [!TIP]
   > ASR is an assume-breach control. It does not stop an attacker arriving; it removes the techniques they would use once they have. That framing is how the exam relates ASR to Zero Trust, and it is also the argument that gets ASR approved when someone asks why antivirus is not enough.

**Results:** You can explain ASR's role in a Zero Trust posture.

- [ ] You can name which Zero Trust principle ASR primarily serves.

### Troubleshooting

**Symptom:** ASR rules are deployed but no events appear and nothing is blocked.

- **Root cause:** Microsoft Defender Antivirus is not the active engine — it is in passive mode because a third-party product is installed — or real-time protection is disabled. ASR rules do not evaluate under either condition.
- **Diagnostic:**

  ```powershell
  Get-MpComputerStatus | Select-Object AMRunningMode, RealTimeProtectionEnabled
  (Get-MpPreference).AttackSurfaceReductionRules_Ids.Count
  ```

- **Resolution:** ASR requires Defender Antivirus in active mode with real-time protection on. Remove the third-party product or accept that ASR is unavailable on those devices.

### Knowledge check

**Q1.** You are deploying attack surface reduction rules to 500 devices. What should you do first?

A. Configure ASR-only exclusions for all line-of-business applications
B. Deploy the rules in Audit mode and review events 1122 before enabling Block
C. Deploy the rules in Block mode to a pilot group
D. Enable Warn mode so users can report problems

<details><summary>Answer</summary>

**B** — Audit mode records what each rule would have blocked without affecting anyone, which is the evidence you need before enforcing. Blocking first — even on a pilot — breaks work before you know which rules are safe.

*Exam tip:* Audit, review, exclude, then block. Event 1122 is audit and 1121 is block; knowing which is which is frequently the question.

</details>

**Q2.** A line-of-business application is repeatedly audited by the rule blocking Office applications from creating child processes. You need the rule enforced but this application to keep working. What should you configure?

A. An ASR-only exclusion for that application
B. Set the rule to Warn mode
C. Remove the rule from the policy
D. A Microsoft Defender Antivirus path exclusion

<details><summary>Answer</summary>

**A** — ASR-only exclusions exempt a specific file or path from attack surface reduction rules while leaving antivirus scanning fully in place. An antivirus exclusion would stop the file being scanned at all, which is a much larger concession.

*Exam tip:* The two exclusion types are deliberately separate. Choosing the antivirus one to solve an ASR problem removes far more protection than the scenario asked for.

</details>

---

## Lab 43: BitLocker: silent encryption, key escrow and recovery

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** advanced

### Lab scenario

Alex's laptop fails compliance because BitLocker is not enabled. You will fix that properly: encryption that starts silently with no user prompt, a recovery key escrowed to Microsoft Entra ID before encryption begins, and self-service recovery so a user who forgets nothing can still get back into their own device. Then you will watch the compliance policy from lab 29 flip to compliant.

### Objectives

After completing this lab, you will be able to:

- Create a BitLocker disk encryption policy with silent enablement
- Escrow recovery keys to Microsoft Entra ID
- Retrieve a recovery key as an administrator and as the user
- Rotate a recovery key remotely
- Monitor encryption status across the estate

### Exam objectives covered

- `g3.t1.s2` — Create and manage disk encryption policies by using Microsoft Intune, including managing BitLocker recovery keys, configuring user self-service recovery, and monitoring encryption compliance status

### Prerequisites

- Completed labs: `compliance-policies`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm2-alex (Windows 11 with vTPM)
- Personas: alex.wilber

### Exercise 1: Deploy silent encryption

#### Task 1: Create the disk encryption policy

1. Select **Endpoint security**, **Disk encryption**, then **Create Policy**, platform **Windows**, profile **BitLocker**.
   *Path:* **Endpoint security** > **Disk encryption** > **Create Policy**

2. Name it `BL-Windows-Corporate`, then configure **BitLocker base settings**:

   | Setting | Value |
   | --- | --- |
   | Enable full disk encryption for OS and fixed data drives | **Yes** |
   | Require devices to be encrypted | **Yes** |
   | Allow warning for other disk encryption | **Blocked** <br> Blocking the warning is what makes encryption silent — see the note below. |
   | Allow standard users to enable encryption during Microsoft Entra join | **Allowed** |
   | Configure client-driven recovery password rotation | **Key rotation enabled for Microsoft Entra joined devices** |

   > [!IMPORTANT]
   > **Silent enablement** requires two things together: **Allow warning for other disk encryption** set to **Blocked**, and **Allow standard users to enable encryption during Microsoft Entra join** set to **Allowed**. Without the first, the user is prompted and encryption waits for them. Without the second, a standard user cannot start it and nothing happens on any device where the user is not an administrator — which, after lab 17, is all of them.

3. Configure **OS drive settings**:

   | Setting | Value |
   | --- | --- |
   | BitLocker system drive policy | **Configure** |
   | Startup authentication required | **Yes** |
   | Compatible TPM startup | **Required** <br> The vTPM from lab 2 supplies this. Without it, silent encryption is impossible. |
   | Compatible TPM startup PIN | **Blocked** <br> A PIN would require user interaction at every boot, which is not silent. |
   | Compatible TPM startup key | **Blocked** |
   | Recovery options in the BitLocker setup wizard | **Configure** |
   | Save BitLocker recovery information to Microsoft Entra ID | **Enabled** |
   | Store recovery information in Microsoft Entra ID before enabling BitLocker | **Required** |
   | Encryption method for operating system drives | **XTS-AES 256-bit** |

   > [!CAUTION]
   > **Store recovery information in Microsoft Entra ID before enabling BitLocker: Required** is the setting that matters most. It refuses to begin encryption until the recovery key has been successfully escrowed. Without it a device can encrypt itself and fail to upload the key — producing an encrypted machine whose recovery key exists nowhere. That is unrecoverable data loss caused by a security control.

4. Assign to `GRP-DEV-WIN-CORP` and create the policy.

**Results:** Corporate devices encrypt silently with keys escrowed before encryption starts.

- [ ] Escrow before encryption is set to **Required**.
- [ ] TPM startup is required and PIN and startup key are blocked.

#### Task 2: Watch encryption happen

1. On **MD102-VM2-Alex**, sync policy, open Windows PowerShell as an administrator, and check status:

   ```powershell
   manage-bde -status C:
   ```

   **Verify:** Conversion status moves to **Encryption in Progress** with a percentage, then **Fully Encrypted**. No prompt appeared for the user at any point.
   ```
   Conversion Status:    Encryption in Progress
   Percentage Encrypted: 34.2%
   Encryption Method:    XTS-AES 256
   Protection Status:    Protection Off
   Key Protectors:
       TPM
       Numerical Password
   ```

2. In the elevated Administrator PowerShell session on **MD102-VM2-Alex**, confirm both key protectors exist:

   ```powershell
   Get-BitLockerVolume -MountPoint C: |
       Select-Object -ExpandProperty KeyProtector |
       Select-Object KeyProtectorType, KeyProtectorId
   ```

   > [!NOTE]
   > You need both. **TPM** unlocks the drive automatically at boot so the user never sees a prompt. **Numerical Password** is the 48-digit recovery key escrowed to Microsoft Entra ID, used when the TPM cannot attest — after a firmware change, a hardware repair, or a boot configuration change.

3. Once encryption completes and the device syncs, return to the **Microsoft Intune admin center**. Navigate to **Devices** > **All devices**, select `MD102-VM2-Alex`, and select **Device compliance** to verify that the policy is satisfied.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Device compliance**

   **Verify:** `CMP-Windows-Corporate` now reports **Compliant**. The BitLocker rule that has been failing since lab 29 is satisfied, and with the Conditional Access policy from lab 31 enabled, Alex's access to Office 365 is restored without any change to that policy.

**Results:** The device is encrypted, compliant, and the whole compliance-to-access chain works end to end.

- [ ] `manage-bde -status` reports Fully Encrypted with XTS-AES 256.
- [ ] The device is compliant and Conditional Access permits access.

### Exercise 2: Recovery and rotation

#### Task 1: Retrieve keys as administrator and as user

1. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**. Select `MD102-VM2-Alex`, then under **Monitor**, select **Recovery keys**.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Recovery keys**

   **Verify:** The BitLocker key identifier and the 48-digit recovery key are shown. Retrieving a key is an audited action.

2. Now check the self-service path. In a private browser window, sign in as Alex at `https://myaccount.microsoft.com` and open **Devices**.

   **Verify:** Alex can see their own device and view its BitLocker recovery key without contacting the help desk.

   > [!IMPORTANT]
   > Self-service recovery is controlled by a Microsoft Entra setting: **Devices** > **Device settings** > **Restrict users from recovering the BitLocker key(s) for their owned devices**. Left at **No**, users help themselves. Set to **Yes**, every recovery prompt becomes a help desk call. Choose deliberately — the security benefit is modest and the operational cost is not.

**Results:** Recovery keys are retrievable by administrators and, if permitted, by the device owner.

- [ ] The key is visible in the Intune device blade.
- [ ] You know which Entra setting controls self-service recovery.

#### Task 2: Rotate a key and monitor the estate

1. Under **Devices** > **All devices**, select `MD102-VM2-Alex`, then select **...** (overflow menu) > **BitLocker key rotation** from the device action bar.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **BitLocker key rotation**

   **Verify:** A new 48-digit key appears in **Recovery keys** after the device next checks in, and the previous key stops working.

   > [!TIP]
   > Rotate a key whenever it has been disclosed — after a support call where it was read out, or after a device changes hands. The policy setting **Configure client-driven recovery password rotation** does this automatically after each use, which is the same idea as the LAPS post-authentication action from lab 28.

2. Select **Endpoint security**, then **Disk encryption**, and review encryption across the estate:
   *Path:* **Endpoint security** > **Disk encryption**

   | Column | Watch for |
   | --- | --- |
   | Encryption readiness | **Not ready** means the hardware cannot support it — usually no TPM or Secure Boot off |
   | Encryption status | **Not encrypted** on a ready device means the policy has not applied or is prompting |
   | Profile status | An error here explains a device that never started encrypting |
   | Key escrow status | A device encrypted with no escrowed key is the dangerous case |

**Results:** You can rotate a key and see encryption state across every device.

- [ ] The device shows a new recovery key after rotation.
- [ ] The disk encryption report shows readiness and status for all devices.

### Troubleshooting

**Symptom:** BitLocker does not start silently and the user is prompted to begin encryption.

- **Root cause:** **Allow warning for other disk encryption** is not set to Blocked, or standard users are not permitted to enable encryption during Microsoft Entra join. Silent enablement needs both.
- **Diagnostic:**

  ```powershell
  manage-bde -status C:
  Get-WinEvent -LogName "Microsoft-Windows-BitLocker/BitLocker Management" -MaxEvents 20 |
      Select-Object TimeCreated, Id, Message | Format-Table -Wrap
  ```

- **Resolution:** Set both settings as described, and confirm the device has a usable TPM. Encryption cannot be silent on a device with no TPM, because the user must supply a startup key or PIN.

**Symptom:** A device is encrypted but no recovery key appears in the portal.

- **Root cause:** The key was never escrowed. The device encrypted before or without a successful upload to Microsoft Entra ID.
- **Diagnostic:**

  ```powershell
  $v = Get-BitLockerVolume -MountPoint C:
  $kp = $v.KeyProtector | Where-Object KeyProtectorType -eq 'RecoveryPassword'
  BackupToAAD-BitLockerKeyProtector -MountPoint C: -KeyProtectorId $kp.KeyProtectorId
  ```

- **Resolution:** Escrow the existing key manually with the command above, then set **Store recovery information in Microsoft Entra ID before enabling BitLocker** to **Required** so it can never happen again. A device encrypted with no escrowed key is one firmware update away from permanent data loss.

### Knowledge check

**Q1.** Which BitLocker policy setting prevents a device from encrypting before its recovery key has been successfully escrowed?

A. Configure client-driven recovery password rotation
B. Store recovery information in Microsoft Entra ID before enabling BitLocker
C. Save BitLocker recovery information to Microsoft Entra ID
D. Require devices to be encrypted

<details><summary>Answer</summary>

**B** — *Save recovery information* enables escrow; *store before enabling* makes successful escrow a precondition for encryption starting. Without the second, a device can encrypt and fail to upload its key, leaving no way to recover it.

*Exam tip:* The two settings sound almost identical and only one prevents unrecoverable devices. Read the wording carefully in exam questions.

</details>

**Q2.** Silent BitLocker enablement fails on devices where the signed-in user is a standard user. What setting resolves this?

A. Compatible TPM startup PIN set to Required
B. Allow standard users to enable encryption during Microsoft Entra join
C. Encryption method set to XTS-AES 256-bit
D. Allow warning for other disk encryption

<details><summary>Answer</summary>

**B** — Starting encryption normally requires administrative rights. This setting delegates that specific action to standard users, which is essential because Autopilot deployments correctly make users standard rather than local administrators.

*Exam tip:* Silent enablement needs both this setting and the warning blocked. A question mentioning standard users points at this one specifically.

</details>

---

## Lab 44: Defender for Endpoint: onboarding, EDR and device risk

**Access:** Hands-on · **Estimated time:** 60 minutes · **Difficulty:** advanced

### Lab scenario

Everything you have built so far is preventive. Defender for Endpoint adds detection and response — and, more importantly for this course, it feeds a device risk score back into Intune compliance. That closes the loop: a device that shows signs of compromise becomes non-compliant, and Conditional Access refuses it access. You will connect the two services, onboard a device, deploy an EDR policy, and then trigger a real detection and watch the chain fire.

### Objectives

After completing this lab, you will be able to:

- Connect Intune to Microsoft Defender for Endpoint
- Onboard Windows devices with an EDR policy
- Configure device risk as a compliance rule
- Trigger a detection and observe risk propagate to Conditional Access
- Triage the resulting incident in the Defender portal

### Exam objectives covered

- `g3.t1.s6` — Integrate Intune with Microsoft Defender for Endpoint, including configuring Endpoint Detection and Response (EDR) policies, investigating endpoint threats, and triaging incidents
- `g3.t1.s7` — Onboard devices into Microsoft Defender for Endpoint

### Prerequisites

- Completed labs: `attack-surface-reduction`, `conditional-access`
- Licences: M365-E5, MDE-P2
- Roles: Intune Administrator, Security Administrator
- Devices and portals: Microsoft Intune admin center, Microsoft Defender portal, vm2-alex (Windows 11)
- Personas: alex.wilber, security.operator

### Exercise 1: Connect the services

#### Task 1: Provision Defender and enable the connector

1. Open the **Microsoft Defender portal** at `https://security.microsoft.com` and sign in as `admin-security`.

   > [!IMPORTANT]
   > If you have never opened this portal, the Defender for Endpoint tenant is provisioned on your first visit and can take several hours to become fully available. The Intune connector will show **Unavailable** until it finishes. Open it now even if you do nothing else — the wait is unavoidable and it is better to start it early.

2. In the Defender portal, select **Settings**, **Endpoints**, then **Advanced features**, and enable:
   *Path:* **Settings** > **Endpoints** > **Advanced features**

   | Setting | Value |
   | --- | --- |
   | Microsoft Intune connection | **On** |
   | Device discovery | **On** |
   | Tamper protection | **On** |

3. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Microsoft Defender for Endpoint**.
   *Path:* **Endpoint security** > **Microsoft Defender for Endpoint**

4. Under **MDM Compliance Policy Settings**, configure:

   | Setting | Value |
   | --- | --- |
   | Connect Windows devices to Microsoft Defender for Endpoint | **On** |
   | Connect Android devices to Microsoft Defender for Endpoint | **On** |
   | Connect iOS/iPadOS devices to Microsoft Defender for Endpoint | **On** |

   **Verify:** **Connection status** reads **Enabled** with a recent **Last synchronized** timestamp. If it reads Unavailable, the Defender tenant is still provisioning.

**Results:** Intune and Defender for Endpoint exchange device state.

- [ ] The connector reports **Enabled**.
- [ ] The Intune connection is on in the Defender portal's advanced features.

#### Task 2: Onboard devices with an EDR policy

1. Select **Endpoint security**, **Endpoint detection and response**, then **Create Policy**, platform **Windows**, profile **Endpoint detection and response**.
   *Path:* **Endpoint security** > **Endpoint detection and response** > **Create Policy**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **EDR-Windows-Corporate** |
   | Microsoft Defender for Endpoint client configuration package type | **Auto from connector** <br> Uses the connector rather than a manually downloaded onboarding blob, so it stays valid. |
   | Sample sharing | **All** |
   | Telemetry reporting frequency | **Expedite** <br> Faster reporting for high-value devices. Normal is fine at scale. |

   > [!NOTE]
   > **Auto from connector** is the right choice. The manual alternative requires you to download an onboarding package from the Defender portal and paste its contents — which works, and then quietly expires or drifts when the tenant configuration changes.

3. Assign to `GRP-DEV-WIN-CORP` and create the policy.

4. On **MD102-VM2-Alex**, sync policy, open Windows PowerShell as an administrator, and verify the sensor:

   ```powershell
   Get-Service Sense | Select-Object Name, Status, StartType
   Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows Advanced Threat Protection\Status" -ErrorAction SilentlyContinue |
       Select-Object OnboardingState, OrgId
   ```

   **Verify:** The **Sense** service is Running and Automatic, and **OnboardingState** is `1`.
   ```
   Name  Status  StartType
   ----  ------  ---------
   Sense Running Automatic

   OnboardingState OrgId
   --------------- -----
                 1 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

5. Confirm the device appears in the Defender portal under **Assets** > **Devices**.

**Results:** The device is onboarded and reporting EDR telemetry.

- [ ] The Sense service is running and OnboardingState is 1.
- [ ] The device is listed in the Defender portal.

### Exercise 2: Close the loop: risk to compliance to access

#### Task 1: Add device risk to the compliance policy

1. In the **Microsoft Intune admin center**, select **Devices**, then **Compliance**. Select `CMP-Windows-Corporate` from the policy list, select **Properties**, then select **Edit** next to **Compliance settings**.
   *Path:* **Devices** > **Compliance** > **CMP-Windows-Corporate** > **Properties** > **Edit**

2. Under **Microsoft Defender for Endpoint**, set:

   | Setting | Value |
   | --- | --- |
   | Require the device to be at or under the machine risk score | **Medium** |

   | Risk level | Compliant when device risk is |
   | --- | --- |
   | Clear | No detections at all — the strictest setting |
   | Low | Clear or Low |
   | Medium | Clear, Low or Medium — a reasonable production choice |
   | High | Any risk level — effectively disables the rule |

   > [!IMPORTANT]
   > Setting this to **Clear** means a single low-severity alert makes a device non-compliant and, with the Conditional Access policy from lab 31, blocks the user. That is defensible for a domain controller and unworkable for a laptop estate. **Medium** blocks devices with genuinely serious findings and tolerates noise.

3. Save the policy.

**Results:** Device risk from Defender is now part of the compliance definition.

- [ ] The compliance policy includes a machine risk score rule.

#### Task 2: Trigger a detection and watch the chain

1. On **MD102-VM2-Alex**, generate a harmless test detection using the EICAR standard test file:

   ```powershell
   # EICAR is an industry-standard, completely harmless antivirus test string.
   # It is not malware and does nothing except trigger detection.
   $p = 'X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR'
   $s = '-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'
   Set-Content -Path "$env:TEMP\eicar-test.txt" -Value ($p + $s) -Encoding ASCII
   ```

   > [!NOTE]
   > EICAR is a published test string that every antivirus product agrees to detect. It contains no malicious code whatsoever — its only purpose is exactly this: proving detection works without using real malware. Defender will quarantine it within seconds.

2. On **MD102-VM2-Alex**, open PowerShell and confirm the local detection:

   ```powershell
   Get-MpThreatDetection | Select-Object -Last 3 |
       Select-Object ThreatID, ActionSuccess, InitialDetectionTime, Resources
   ```

   **Verify:** A detection is recorded and the file has been removed.

3. In the **Defender portal**, open **Incidents & alerts** and find the resulting alert.

   a. Open the incident and review the alert story showing what happened.
   b. Open the device page and note its **Risk level**.
   c. Review the available response actions — isolate device, run antivirus scan, collect investigation package, restrict app execution.

   > [!TIP]
   > **Isolate device** cuts the machine off from the network while leaving the Defender connection alive, so you can keep investigating a compromised device without letting it reach anything else. It is the single most useful response action and it is examinable.

4. Watch the loop close. In the **Microsoft Intune admin center**, navigate to **Devices** > **All devices**, select `MD102-VM2-Alex`, and select **Device compliance** to verify compliance state after risk propagates.
   *Path:* **Devices** > **All devices** > **MD102-VM2-Alex** > **Device compliance**

   > [!NOTE]
   > A single EICAR detection usually resolves to a low risk level and may not exceed your Medium threshold — so the device may well stay compliant. That is the correct outcome and worth understanding: risk-based compliance responds to sustained or serious findings, not to every alert. To see the block, temporarily set the risk rule to **Clear** and re-sync.

5. If you set the rule to **Clear** to observe the block, sign in as Alex to Office 365 and confirm Conditional Access refuses access — then resolve the alert in the Defender portal, set the rule back to **Medium**, and confirm access returns.

**Results:** A detection on a device changed its risk, which changed its compliance, which changed its access.

- [ ] An alert exists in the Defender portal for the test detection.
- [ ] You can describe the path from detection to blocked sign-in.
- [ ] The compliance risk rule is restored to Medium.

### Troubleshooting

**Symptom:** Devices do not appear in the Defender portal after the EDR policy is assigned.

- **Root cause:** The connector is not enabled, the Defender tenant is still provisioning, or the device has no Defender for Endpoint licence.
- **Diagnostic:**

  ```powershell
  Get-Service Sense | Select-Object Status, StartType
  Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows Advanced Threat Protection\Status" |
      Select-Object OnboardingState, OrgId
  ```

- **Resolution:** `OnboardingState` of `0` means the onboarding package never applied — check the EDR policy assignment and the connector status. The Sense service being stopped on an onboarded device usually means tamper protection is blocking a change that something else attempted.

### Knowledge check

**Q1.** You configure a compliance policy requiring devices to be at or under a machine risk score of Clear. What is the practical consequence?

A. Only devices with high-severity alerts become non-compliant
B. Any device with a single active alert of any severity becomes non-compliant and is blocked by Conditional Access
C. The rule has no effect until Defender for Endpoint is licensed separately
D. Devices are quarantined automatically by Defender

<details><summary>Answer</summary>

**B** — Clear means no detections at all. Any active alert, however minor, pushes the device above the threshold, making it non-compliant and — with a compliance-requiring Conditional Access policy — blocking the user entirely.

*Exam tip:* Medium is the usual production setting. Clear is defensible only for the highest-value systems, and the exam tests whether you understand the operational cost.

</details>

**Q2.** Which Defender for Endpoint response action isolates a compromised device from the network while preserving the ability to investigate it remotely?

A. Isolate device
B. Restrict app execution
C. Run antivirus scan
D. Collect investigation package

<details><summary>Answer</summary>

**A** — Device isolation cuts network connectivity while maintaining the connection to the Defender service, so investigation and response can continue. Restrict app execution limits what can run but leaves the network open.

*Exam tip:* Know the four response actions and what each preserves. Isolation is the containment action; the others are investigation or mitigation.

</details>

---

## Lab 45: App Control for Business

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** advanced

### Lab scenario

Antivirus decides what is bad. App Control decides what is good, and blocks everything else. It is the strongest application control Windows offers and the one most likely to break a business if deployed carelessly, so the workflow mirrors attack surface reduction: audit first, learn what actually runs, then enforce.

### Objectives

After completing this lab, you will be able to:

- Create an App Control for Business policy in audit mode
- Explain managed installer and Intelligent Security Graph trust
- Read App Control audit events
- Move a policy to enforcement safely
- Recognise the feature under both its old and new names

### Exam objectives covered

- `g3.t1.s8` — Configure App Control for Business policies by using Microsoft Intune

### Prerequisites

- Completed labs: `attack-surface-reduction`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: Understand the trust model

#### Task 1: Learn what App Control trusts and why

1. First, the naming. **App Control for Business** is the current name for what was called **Windows Defender Application Control (WDAC)**.

   > [!NOTE]
   > Documentation, the portal and older exam material all use both names for the same feature. The MD-102 objective uses App Control for Business. Do not go looking for a separate WDAC feature — there is not one.

2. App Control blocks everything that is not explicitly trusted. Intune's built-in policy offers three sources of trust:

   | Trust source | Trusts | Why it matters |
   | --- | --- | --- |
   | Windows components and Store apps | Everything signed by Microsoft and everything from the Microsoft Store | The mandatory base. Without it Windows itself cannot run. |
   | **Managed installer** | Anything installed by a nominated installer — in practice, the Intune Management Extension | **The key setting.** Every application you deploy through Intune becomes trusted automatically. |
   | **Intelligent Security Graph** | Anything Microsoft's reputation service considers to have good reputation | Lets well-known third-party software run without you cataloguing it |

   > [!IMPORTANT]
   > **Managed installer** is what makes App Control practical in an Intune estate. It means every Win32 app you deploy through Intune is automatically trusted, so your deployment pipeline becomes your allow-list. Without it you would have to build and maintain a signed catalogue of every binary in the organisation, which is why App Control had a reputation for being unmanageable.

3. Understand what App Control adds over ASR:

   |  | Attack surface reduction | App Control for Business |
   | --- | --- | --- |
   | Model | Block specific known-bad behaviours | Block everything not explicitly trusted |
   | Default outcome for unknown software | Runs | **Blocked** |
   | Effort to deploy | Moderate — audit and exclude | High — audit, then curate trust |
   | Protection against novel malware | Partial | Strong |
   | Risk of breaking the business | Moderate | **High if rushed** |

**Results:** You can explain the App Control trust model and why managed installer matters.

- [ ] You can name the setting that makes Intune-deployed apps trusted automatically.
- [ ] You can state App Control's former name.

### Exercise 2: Deploy in audit mode and read the evidence

#### Task 1: Create the policy

1. Select **Endpoint security**, **App Control for Business**, then **Create Policy**, platform **Windows**, profile **App Control for Business**.
   *Path:* **Endpoint security** > **App Control for Business** > **Create Policy**

2. Name it `AC-Windows-Audit`, then configure:

   | Setting | Value |
   | --- | --- |
   | Configure App Control for Business | **Configure** |
   | Enable App Control for Business | **Audit only** <br> Audit logs what would be blocked and blocks nothing. |
   | Trust apps with good reputation | **Enable** <br> Intelligent Security Graph. |
   | Trust apps from managed installers | **Enable** <br> Intune-deployed applications. |

   > [!CAUTION]
   > Choosing **Enforce** here on a first deployment will block software your users need, on every targeted device, immediately — and because App Control blocks by default, the failure is total rather than partial. Audit only. There is no scenario in which enforcing first is the right call.

3. Assign to `GRP-USR-PILOT` and create the policy.

4. On **MD102-VM1-Adele**, sync policy and confirm it applied:

   ```powershell
   Get-CimInstance -ClassName Win32_DeviceGuard `
       -Namespace root\Microsoft\Windows\DeviceGuard |
       Select-Object CodeIntegrityPolicyEnforcementStatus,
           UsermodeCodeIntegrityPolicyEnforcementStatus
   ```

   **Verify:** Enforcement status reports audit mode. A value of `1` is audit and `2` is enforced.
   ```
   CodeIntegrityPolicyEnforcementStatus         : 1
   UsermodeCodeIntegrityPolicyEnforcementStatus : 1
   ```

**Results:** App Control is auditing on a pilot ring with managed installer and reputation trust enabled.

- [ ] The policy is in **Audit only** mode.
- [ ] The device reports enforcement status 1.

#### Task 2: Read code integrity events and plan enforcement

1. On **MD102-VM2-Alex**, open PowerShell and check the code integrity log for audit events:

   ```powershell
   Get-WinEvent -LogName "Microsoft-Windows-CodeIntegrity/Operational" -MaxEvents 100 -ErrorAction SilentlyContinue |
       Where-Object Id -in 3076,3077 |
       Select-Object TimeCreated, Id,
           @{n='File'; e={ ($_.Message -split "`n" | Select-String "File Name") -join '' }} |
       Format-Table -Wrap
   ```

   | Event ID | Meaning |
   | --- | --- |
   | 3076 | Audit — this file **would have been blocked** |
   | 3077 | Enforcement — this file **was blocked** |
   | 3089 | Signing information for a file in a 3076 or 3077 event |

   > [!TIP]
   > Event 3076 is the whole point of audit mode. Every 3076 is a piece of software that will stop working the moment you enforce. Collect them for a realistic period — weeks, not hours — and make sure month-end and quarter-end processes have run before you decide the list is complete.

2. Run something not deployed by Intune to generate an audit event — any small utility downloaded directly, or a script compiled to an executable — then re-run the query above.

   **Verify:** An event 3076 appears naming the file. Under enforcement, that file would not have run.

3. Plan the move to enforcement:

   | Audit finding | Action before enforcing |
   | --- | --- |
   | Software you deploy through Intune appears in 3076 | Confirm **Trust apps from managed installers** is enabled — it should already be trusted |
   | Well-known third-party software appears | Confirm **Trust apps with good reputation** is enabled |
   | Genuinely required software still appears | Deploy it through Intune so managed installer covers it, or add a supplemental policy |
   | Nothing you recognise appears | Investigate — this is what App Control is for |

   > [!IMPORTANT]
   > The cleanest answer to *this application is blocked* is usually **deploy it through Intune**. Managed installer then trusts it automatically, and you gain deployment tracking at the same time. Building supplemental signing policies is a last resort, not a first response.

**Results:** You can read audit evidence and know what to fix before enforcing.

- [ ] You located at least one event 3076.
- [ ] You can state the preferred way to make a blocked application trusted.

### Troubleshooting

**Symptom:** After enabling App Control in enforce mode, applications deployed through Intune are blocked.

- **Root cause:** **Trust apps from managed installers** was not enabled, so the Intune Management Extension is not recognised as a managed installer.
- **Diagnostic:**

  ```powershell
  Get-WinEvent -LogName "Microsoft-Windows-CodeIntegrity/Operational" -MaxEvents 50 |
      Where-Object Id -eq 3077 |
      Select-Object TimeCreated, Message | Format-Table -Wrap
  ```

- **Resolution:** Return the policy to **Audit only**, enable managed installer trust, and confirm audit events stop appearing for Intune-deployed software before enforcing again. Note that managed installer trust applies from the moment it is enabled — software installed before that is not retroactively trusted and may need reinstalling.

### Knowledge check

**Q1.** Which App Control for Business setting causes applications deployed through Intune to be trusted automatically?

A. Trust Windows components and Store apps
B. Trust apps from managed installers
C. Enable App Control for Business in audit mode
D. Trust apps with good reputation

<details><summary>Answer</summary>

**B** — Managed installer trust designates the Intune Management Extension as an authorised installer, so anything it installs is trusted. This is what makes App Control manageable without maintaining a signed catalogue of every binary.

*Exam tip:* Intelligent Security Graph covers well-known third-party software by reputation; managed installer covers your own deployments. Most estates need both.

</details>

**Q2.** Which event ID indicates that App Control for Business would have blocked a file, but did not because the policy is in audit mode?

A. 1121
B. 3076
C. 1122
D. 3077

<details><summary>Answer</summary>

**B** — Event 3076 in the CodeIntegrity operational log is the audit event, and 3077 is the enforcement block. Events 1121 and 1122 belong to attack surface reduction in the Defender operational log.

*Exam tip:* Two audit-and-block pairs to keep apart: ASR uses 1122 and 1121 in the Defender log; App Control uses 3076 and 3077 in the CodeIntegrity log.

</details>

---

# Module 8 — Device updates

Keep the estate current: update rings and Delivery Optimization, feature and quality updates including expedited releases, Windows Autopatch and Hotpatch, cross-platform update policies, and update reporting.

## Lab 46: Update rings and Delivery Optimization

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

Contoso needs Windows updates to arrive predictably, tested before they reach everybody, and without saturating the office internet connection every Patch Tuesday. Update rings answer the first two by staging deployment across groups with different deferrals. Delivery Optimization answers the third by letting devices share content with each other instead of each downloading the same gigabyte.

### Objectives

After completing this lab, you will be able to:

- Plan a ring structure and explain what deferral actually does
- Create pilot and broad update rings with different deferrals
- Configure deadlines, grace periods and restart behaviour
- Configure Delivery Optimization peer caching
- Pause a ring in response to a bad update

### Exam objectives covered

- `g3.t2.s1` — Plan for device updates by using Intune
- `g3.t2.s2` — Create and manage update rings, feature updates, and quality updates for Windows devices by using Intune
- `g3.t2.s6` — Configure Windows client Delivery Optimization by using Intune

### Prerequisites

- Completed labs: `settings-catalog`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, nestor.wilke, pilot.user01

### Exercise 1: Plan and build the rings

#### Task 1: Design the ring structure

1. A ring is a group of devices with a deferral. Staging deferrals means a bad update reaches a few people before it reaches everyone.

   | Ring | Population | Quality deferral | Feature deferral | Purpose |
   | --- | --- | --- | --- | --- |
   | Ring 0 — Preview | IT only | 0 days | 0 days | Sees problems first, and can fix them |
   | Ring 1 — Pilot | ~5% of the estate | 3 days | 14 days | Real users, varied hardware, still small enough to recover |
   | Ring 2 — Broad | Everyone else | 7 days | 30 days | Only receives updates that survived the earlier rings |

   > [!IMPORTANT]
   > A deferral delays when a device is *offered* an update, counting from its release date. It does not pause an update that has already been offered. If a bad update is already on devices, deferral does nothing — you need **Pause**, which is a separate control covered in the last task.

**Results:** You can explain the difference between deferral and pause.

- [ ] You can state what deferral does not protect against.

#### Task 2: Create the pilot and broad rings

1. Select **Devices**, **Windows updates**, then **Update rings**, then **Create profile**.
   *Path:* **Devices** > **Windows updates** > **Update rings** > **Create profile**

2. On the **Basics** tab, enter Name `RING-1-Pilot`, then on the **Update ring settings** tab configure the update settings:

   | Setting | Value |
   | --- | --- |
   | Name | **RING-1-Pilot** |
   | Servicing channel | **General Availability Channel** |
   | Microsoft product updates | **Allow** <br> Includes updates for Office and other Microsoft products. |
   | Windows drivers | **Allow** |
   | Quality update deferral period (days) | **3** |
   | Feature update deferral period (days) | **14** |
   | Set feature update uninstall period (2-60 days) | **20** |
   | Enable pre-release builds | **Not configured** |

3. Configure the user experience through the wizard tabs (which decides how much the update is allowed to interrupt):

   | Setting | Value |
   | --- | --- |
   | Automatic update behavior | **Auto install and restart at maintenance time** |
   | Active hours start | **8 AM** |
   | Active hours end | **6 PM** |
   | Restart checks | **Allow** <br> Skips a restart if the user is presenting, on battery, or in a call. |
   | Option to pause Windows updates | **Disable** |
   | Option to check for Windows updates | **Enable** |
   | Deadline for quality updates (days) | **3** |
   | Deadline for feature updates (days) | **7** |
   | Grace period (days) | **2** |
   | Auto reboot before deadline | **Yes** |

   a. On the **Basics** tab, enter Name `RING-1-Pilot`, then select **Next**.
   b. On the **Update ring settings** tab, configure the update settings and user experience fields above, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-USR-PILOT`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!IMPORTANT]
   > **Deadline** and **grace period** work together and are frequently confused. The deadline is how long a device may defer restarting after an update is ready. The grace period is a minimum guaranteed window after installation, regardless of the deadline — so a laptop that has been switched off for a fortnight is not forced to restart the instant it powers on. Both are needed for a humane policy.

4. Create the broad ring the same way, named `RING-2-Broad`, with quality deferral **7**, feature deferral **30**, and assign it to `GRP-USR-BROAD`.

   > [!WARNING]
   > A device can only be in one update ring. If two rings target the same device, Intune picks one and reports a conflict, and the outcome is not predictable. Keep ring membership mutually exclusive — this is a good reason to use assigned groups for rings rather than overlapping dynamic ones.

**Results:** Two update rings stage deployment across the estate.

- [ ] Both rings exist with different deferrals.
- [ ] No device is a member of both rings.

### Exercise 2: Delivery Optimization and pausing

#### Task 1: Configure peer caching

1. Create a settings catalog profile named `WIN-DeliveryOptimization`: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, type **Settings catalog**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Search for `Delivery Optimization` and configure:

   | Setting | Value |
   | --- | --- |
   | Download Mode | **HTTP blended with peering behind the same NAT (1)** <br> Devices share with peers on the same network. Mode 2 uses a group ID; mode 0 disables peering entirely. |
   | Maximum Background Download Bandwidth (percentage) | **50** |
   | Minimum RAM (inclusive) allowed to use Peer Caching | **4** |
   | Minimum Disk Size Allowed to Use Peer Caching (GB) | **64** |
   | Maximum Cache Age (seconds) | **259200** <br> Three days. |

   > [!TIP]
   > Delivery Optimization is the answer to *how do we stop 200 devices each downloading the same 3 GB feature update*. One device downloads from Microsoft and the rest pull from it over the local network. On a branch office with a thin connection this is the difference between an update landing overnight and saturating the link for a day.

3. Assign to `GRP-DEV-WIN-CORP` and create the profile, then on **MD102-VM1-Adele** open PowerShell and verify Delivery Optimization:

   ```powershell
   Get-DeliveryOptimizationStatus | Select-Object -First 5 FileId, FileSize, BytesFromPeers, BytesFromHttp
   Get-DeliveryOptimizationPerfSnap
   ```

**Results:** Devices share update content with peers instead of each downloading from Microsoft.

- [ ] The Delivery Optimization profile reports **Succeeded**.

#### Task 2: Pause a ring

1. Navigate to **Devices** > **Windows updates**, select the **Update rings** tab, select `RING-2-Broad` from the profile list, and note the **Pause** option on the overview.
   *Path:* **Devices** > **Windows updates** > **Update rings** > **RING-2-Broad**

2. Select **Pause**, then choose **Quality updates**.

   | Setting | Value |
   | --- | --- |
   | Pause duration | **Up to 35 days** <br> The maximum. After that the ring resumes automatically. |

   > [!IMPORTANT]
   > This is what you reach for when a quality update is causing problems in the pilot ring and you need to stop it reaching everyone else. Quality and feature updates pause independently, so you can hold back a bad cumulative update without also freezing feature deployment. Pausing is reversible with **Resume** at any time.

3. Resume the ring so it does not stay paused for the rest of the course.

   **Verify:** The ring shows as active again with its normal deferrals.

**Results:** You can stop an update reaching the broad population and resume it afterwards.

- [ ] You paused and resumed a ring.
- [ ] You can state the maximum pause duration.

### Troubleshooting

**Symptom:** A device is not receiving updates and its update ring shows a conflict.

- **Root cause:** The device is targeted by two update rings. Only one can apply and the outcome is not predictable.
- **Diagnostic:**

  ```text
  Devices > Windows updates > Update rings > open each ring > Device status
  Find the device in more than one ring.
  ```

- **Resolution:** Remove the device from all but one ring. Use mutually exclusive assigned groups for ring membership rather than overlapping dynamic groups.

### Knowledge check

**Q1.** A quality update released three days ago is causing crashes on pilot devices. You need to prevent it reaching the broad ring, which has a 7-day quality deferral. What should you do?

A. Set the broad ring's servicing channel to Semi-Annual
B. Increase the broad ring's quality update deferral to 14 days
C. Remove the broad ring assignment
D. Pause quality updates on the broad ring

<details><summary>Answer</summary>

**D** — Pause immediately stops updates being offered to that ring, for up to 35 days. Changing the deferral shifts the offer window relative to the release date but is a less direct control and can behave unexpectedly for updates already in flight.

*Exam tip:* Deferral is planning; pause is incident response. Any scenario describing a bad update already in the wild is asking about pause.

</details>

**Q2.** What is the purpose of the grace period setting in an update ring?

A. It guarantees a minimum time after installation before a restart is forced, regardless of the deadline
B. It delays when the update is offered to the device
C. It allows users to pause updates for a set number of days
D. It extends the deferral period for devices that are offline

<details><summary>Answer</summary>

**A** — The grace period is a floor. A device that comes back online long after the deadline has passed still gets the guaranteed grace window before being restarted, rather than being restarted immediately.

*Exam tip:* Deadline is the maximum a user can defer a restart; grace period is the minimum they are guaranteed. Both together produce a policy that is enforceable and not hostile.

</details>

---

## Lab 47: Windows Autopatch, expedited updates and Hotpatch

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** advanced

### Lab scenario

Update rings are yours to run. Windows Autopatch hands the running of them to Microsoft: it builds the rings, staggers the deployment, watches the telemetry and halts a rollout that is going wrong. It is included in Microsoft 365 E5, which surprises people. Alongside it, expedited updates push a zero-day fix past every deferral, and Hotpatch applies security updates without a restart at all.

### Objectives

After completing this lab, you will be able to:

- Register devices with Windows Autopatch and explain its prerequisites
- Describe Autopatch groups and how they differ from update rings
- Deploy an expedited quality update
- Explain Hotpatch and its requirements
- Choose between managing rings yourself and delegating to Autopatch

### Exam objectives covered

- `g3.t2.s3` — Implement Windows Autopatch and configure Hotpatch policies

### Prerequisites

- Completed labs: `update-rings`
- Licences: M365-E5, AUTOPATCH
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, pilot.user02

### Exercise 1: Windows Autopatch

#### Task 1: Check prerequisites and register devices

1. Confirm your entitlement first. Autopatch is included with **Windows 10/11 Enterprise E3 or E5**, which Microsoft 365 E5 contains.

   | Prerequisite | Requirement |
   | --- | --- |
   | Licence | Windows Enterprise E3 or E5, or Microsoft 365 E3/E5/F3, or Business Premium |
   | Identity | Microsoft Entra ID P1 or P2 |
   | Management | Intune must be the MDM authority; devices must already be enrolled |
   | Ownership | Devices must be **corporate-owned**. BYOD is blocked at registration. |
   | Recent activity | Devices must have communicated with Intune in the last 28 days |
   | Diagnostic data | Required level as a minimum; Optional for Windows 11 to get the full deployment protections |

   > [!IMPORTANT]
   > **Corporate-owned** is the prerequisite that catches lab tenants. A device enrolled by hand through Settings defaults to Personal ownership, and Autopatch refuses it. Lab 11 changed `MD102-VM2-Alex` to Corporate; Autopilot devices are Corporate automatically. Check ownership before assuming registration is broken.

2. Select **Devices**, **Windows updates**, then under the **Windows Autopatch** section, select **Devices**.
   *Path:* **Devices** > **Windows updates** > **Windows Autopatch** > **Devices**

3. Register devices by adding a group under **Device registration**, using `GRP-DEV-WIN-CORP`.

   **Verify:** Devices move through **Registration pending** to **Registered**. Any that fail appear under **Not registered** with a reason — most commonly ownership or the 28-day activity requirement.

**Results:** Corporate devices are registered with Windows Autopatch.

- [ ] At least one device shows as **Registered**.
- [ ] You can name the ownership requirement.

#### Task 2: Understand Autopatch groups

1. Under **Devices** > **Windows updates** > **Windows Autopatch**, select **Autopatch groups** and review the default group.
   *Path:* **Devices** > **Windows updates** > **Windows Autopatch** > **Autopatch groups**

   | Deployment ring | Share of devices | Purpose |
   | --- | --- | --- |
   | Test | A handful you nominate | Validation before anything else sees it |
   | First | ~1% | Earliest real users |
   | Fast | ~9% | Broader validation |
   | Broad | ~90% | Everyone else |

   > [!IMPORTANT]
   > Autopatch distributes registered devices across these rings automatically and staggers deployment between them. The difference from lab 46 is who watches: Autopatch monitors deployment health and will **halt a rollout automatically** if failure rates exceed its thresholds. With your own update rings, that judgement is yours to make and yours to miss.

2. Compare the two approaches so you can justify a choice:

   |  | Your own update rings | Windows Autopatch |
   | --- | --- | --- |
   | Ring design | You define groups and deferrals | Managed for you, customisable |
   | Deployment cadence | Your deferrals | Progressive rollout across rings |
   | Health monitoring | You watch reports | **Automatic, with rollout halting** |
   | Effort | Ongoing | Registration, then largely hands-off |
   | Control | Complete | Delegated within Autopatch's model |
   | Best for | Specific regulatory or timing requirements | Most organisations |

**Results:** You can explain Autopatch groups and justify choosing Autopatch over self-managed rings.

- [ ] You can name the four default deployment rings.
- [ ] You can state the capability Autopatch adds that self-managed rings lack.

### Exercise 2: Expedited updates and Hotpatch

#### Task 1: Deploy an expedited quality update

1. Select **Devices**, **Windows updates**, then **Quality updates**, then **Create profile**.
   *Path:* **Devices** > **Windows updates** > **Quality updates** > **Create profile**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **EXP-ZeroDay-Response** |
   | Select a security update to expedite | **The most recent cumulative update offered** |
   | Number of days after the update is installed to restart | **1** <br> 0 forces an immediate restart, 1 gives the user a day, 2 is the maximum. |

   > [!IMPORTANT]
   > An expedited update **overrides every deferral, deadline and pause** in the device's update ring. That is the entire point — it exists for the day a zero-day is being actively exploited and the normal ring cadence is too slow. It is not a routine tool; using it routinely destroys the staged validation your rings exist to provide.

3. Assign to `GRP-USR-PILOT` and create the profile.

   **Verify:** The profile appears under **Quality updates** with a device status view showing progress per device.

   > [!NOTE]
   > Expedited updates are delivered through a separate faster channel that bypasses the normal scan cycle, so a device can install one within hours rather than waiting for its next check. This mechanism is why the override works.

**Results:** A security update can be pushed past every ring control.

- [ ] An expedited update profile exists and is assigned.
- [ ] You can state what an expedited update overrides.

#### Task 2: Understand Hotpatch

1. Hotpatch applies security updates to running processes in memory, so no restart is needed.

   | Requirement | Detail |
   | --- | --- |
   | Edition | Windows 11 Enterprise or Education |
   | Version | 24H2 or later on supported hardware |
   | Management | Windows Autopatch, with the device registered |
   | Cadence | Quarterly baseline updates that **do** require a restart, with hotpatch updates in the intervening months that do not |
   | Fallback | A device that cannot hotpatch receives the normal cumulative update instead |

   > [!IMPORTANT]
   > The cadence is the examinable part. Hotpatch does not eliminate restarts — it reduces them from twelve a year to four. Every quarter a **baseline** update establishes a new starting point and requires a restart; the two months following it are hotpatched in memory. A scenario describing eight restart-free months a year is describing Hotpatch.

2. Where it is configured: navigate to **Devices** > **Windows updates**, select the **Quality updates** tab, then select **Create profile**.
   *Path:* **Devices** > **Windows updates** > **Quality updates** > **Create profile**

   | Setting | Value |
   | --- | --- |
   | Policy type | **Windows quality update policy** |
   | When available, apply without restarting the device (hotpatch) | **Allow** |

   > [!NOTE]
   > Your lab virtual machines will very likely not qualify — hotpatch has specific edition, build and hardware requirements. Configure the policy so you have seen where the setting lives, and expect the devices to fall back to normal cumulative updates.

**Results:** You can state Hotpatch's requirements and its restart cadence.

- [ ] You can explain how many restarts a hotpatched device needs per year and why.
- [ ] You can name the management prerequisite for Hotpatch.

### Troubleshooting

**Symptom:** Devices fail Windows Autopatch registration and appear under Not registered.

- **Root cause:** Most commonly the device is marked as Personal rather than Corporate, or it has not communicated with Intune in the last 28 days. Both are hard prerequisites.
- **Diagnostic:**

  ```text
  Devices > Windows updates > Devices > Not registered
  Read the reason column, then check Devices > All devices > the device > Ownership.
  ```

- **Resolution:** Change ownership to Corporate, or import the serial number under **Corporate device identifiers** before enrollment. Confirm the device has checked in recently — a device that has been off for a month cannot register until it does.

### Knowledge check

**Q1.** A critical security update must reach all devices today, but your update rings have deferrals of 3 and 7 days and one ring is paused. What should you use?

A. Resume the paused ring and force a device sync
B. Reduce the deferral on both rings to 0 days
C. An expedited quality update, which overrides deferrals, deadlines and pauses
D. Create a new update ring with no deferral and reassign all devices

<details><summary>Answer</summary>

**C** — Expedited quality updates are delivered through a separate accelerated channel that overrides deferrals, deadlines and pauses. Every other option is slower and leaves the paused ring's devices unprotected.

*Exam tip:* Expedited is the emergency control and should stay exceptional. Reserve it for actively exploited vulnerabilities, not for impatience.

</details>

**Q2.** Which statement about Windows Hotpatch is correct?

A. It applies to feature updates as well as quality updates
B. Quarterly baseline updates require a restart; the two months following each baseline are patched without one
C. All security updates are applied without a restart, eliminating them entirely
D. It requires Windows 11 Pro and any Intune update ring

<details><summary>Answer</summary>

**B** — Hotpatch reduces restarts from monthly to quarterly. Each quarter a baseline update establishes a new starting point and needs a restart; the intervening two months are hotpatched in memory. It requires Enterprise or Education editions and Windows Autopatch.

*Exam tip:* The quarterly baseline is the detail that distinguishes a correct answer from a plausible one. Hotpatch reduces restarts, it does not remove them.

</details>

---

## Lab 48: Android update management and update reporting

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Android updates work nothing like Windows. There is no ring model — on fully managed devices you control *when* the device may install what the manufacturer offers, and on work profile devices you control almost nothing. Meanwhile you need to answer the question every manager eventually asks: are we actually patched? Intune's update reporting answers it, once you know which report to open.

### Objectives

After completing this lab, you will be able to:

- Configure Android system update behaviour on fully managed devices
- Explain firmware-over-the-air deployments and their vendor dependency
- Read Windows update compliance reports
- Use the Windows Update for Business reports workbook
- Identify devices that are behind and why

### Exam objectives covered

- `g3.t2.s5` — Manage Android updates by using configuration profiles or firmware-over-the-air (FOTA) deployments
- `g3.t2.s7` — Monitor device updates by using Intune

### Prerequisites

- Completed labs: `update-rings`, `android-configuration-profiles`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, avd-android
- Personas: lee.gu, adele.vance

### Exercise 1: Android update control

#### Task 1: Configure system updates on fully managed devices

1. In the **Microsoft Intune admin center**, select **Devices**, then **Configuration**. Select `AND-FM-Restrictions` from the profile list, select **Properties**, then select **Edit** next to **Configuration settings** (or create the profile if you skipped lab 25).
   *Path:* **Devices** > **Configuration** > **AND-FM-Restrictions** > **Properties** > **Edit**

2. Find the **System update** section and configure:

   | Setting | Value |
   | --- | --- |
   | System update | **Postpone** |
   | Freeze periods | **Optional — for example a retail freeze over a peak trading period** |

   | Option | Behaviour |
   | --- | --- |
   | Device Default | The manufacturer's normal behaviour, usually prompting the user |
   | **Postpone** | Delays updates by up to 30 days, then installs regardless |
   | **Windowed** | Installs only within a daily maintenance window you define |
   | **Automatic** | Installs as soon as available, restarting the device |

   > [!IMPORTANT]
   > There is no ring model and no deferral by release date. **Postpone** delays by up to 30 days and no further — after that the update installs whatever you do. Android update control decides *when in the day or month* an update may install, not *which* update. If a scenario asks about staging Android updates like Windows rings, the answer is that you cannot.

3. Save the profile.

   > [!NOTE]
   > These settings exist only for **fully managed** and **dedicated** devices. On a personally owned work profile the organisation does not own the device, so the operating system update is entirely the user's business. The setting is simply absent from that profile type.

**Results:** Corporate-owned Android devices install system updates on your schedule rather than the user's.

- [ ] The fully managed profile has a system update mode configured.
- [ ] You can explain why the setting is missing from work profile policies.

#### Task 2: Understand firmware-over-the-air

1. FOTA delivers manufacturer firmware, which is different from an Android system update.

   |  | System update policy | FOTA deployment |
   | --- | --- | --- |
   | Delivers | The Android OS update the device is already offered | Manufacturer firmware, including OS images the device would not otherwise get |
   | Configured in | A device restrictions profile | A dedicated FOTA policy, per vendor |
   | Vendor support required | No | **Yes** — the manufacturer must participate |
   | Example | Any fully managed Android device | Zebra LifeGuard for Zebra handhelds |
   | Licence | Intune Plan 1 | Intune Plan 2 — included with Microsoft 365 E5 since July 2026 |

   > [!IMPORTANT]
   > FOTA is part of Intune Plan 2, which Microsoft 365 E5 has included since July 2026 — so the licence is not the obstacle. The **manufacturer** is: FOTA only works where the vendor participates, Zebra LifeGuard being the common example, and you need that vendor's hardware to see it work. Know that it exists, that it depends on manufacturer participation rather than licensing, and that it is how ruggedised estates get firmware without physically handling each unit.

**Results:** You can distinguish an Android system update policy from a FOTA deployment.

- [ ] You can state what FOTA requires that a system update policy does not.

### Exercise 2: Update reporting

#### Task 1: Read the built-in update reports

1. Select **Devices**, **Windows updates**, then the **Monitor** tab.
   *Path:* **Devices** > **Windows updates** > **Monitor**

   | Report | Answers |
   | --- | --- |
   | Windows Expedited update report | Did the emergency update actually land, and where did it fail? |
   | Windows driver update report | Which driver updates are pending approval or failing |
   | Feature update failures report | Which devices could not take a feature update, with the failure reason |
   | Windows update rings report | Per-ring deployment state and device counts |

2. Open **Reports** > **Device management** > **Windows updates** for the fuller picture.
   *Path:* **Reports** > **Device management** > **Windows updates**

   > [!IMPORTANT]
   > The richer reports — **Windows Update for Business reports** — need a Log Analytics workspace, which needs an Azure subscription. Without one you get the built-in Intune reports, which are enough to answer *is this device patched* but not enough to answer *what is our compliance trend over ninety days*. Know the distinction and know why the richer reports are missing from a tenant like this one.

3. Check a single device's update state directly, which needs no extra infrastructure:

   *Run on MD102-VM1-Adele*
   ```powershell
   Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5 HotFixID, Description, InstalledOn
   (Get-CimInstance Win32_OperatingSystem).Version
   Get-ComputerInfo -Property OsBuildNumber, WindowsVersion
   ```

4. Pull the same information across the estate from Graph:

   ```powershell
   Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

   Get-MgDeviceManagementManagedDevice -All |
       Where-Object OperatingSystem -eq "Windows" |
       Select-Object DeviceName, OsVersion, LastSyncDateTime, ComplianceState |
       Sort-Object OsVersion |
       Format-Table -AutoSize
   ```

   **Verify:** You can see every Windows device's build. Devices well behind the others are the ones to investigate, and a stale `LastSyncDateTime` usually explains why.

**Results:** You can determine which devices are behind on updates and why.

- [ ] You located the update reports under **Devices** > **Windows updates** > **Monitor**.
- [ ] You can state what Windows Update for Business reports additionally require.

### Troubleshooting

**Symptom:** A Windows device has not installed updates for weeks and appears in no failure report.

- **Root cause:** The device is not checking in. Update reporting only covers devices that communicate — a device that has been offline produces no failures because it has attempted nothing.
- **Diagnostic:**

  ```powershell
  Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
  Get-MgDeviceManagementManagedDevice -All |
      Where-Object { $_.LastSyncDateTime -lt (Get-Date).AddDays(-14) } |
      Select-Object DeviceName, UserPrincipalName, LastSyncDateTime, OsVersion
  ```

- **Resolution:** Absence from a failure report is not evidence of health. Track last sync time alongside update state, and treat a stale device as unpatched until it proves otherwise.

### Knowledge check

**Q1.** How does Android update management on fully managed devices differ from Windows update rings?

A. Android updates can be staged across rings using deployment groups
B. Android uses the same deferral model with a maximum of 30 days
C. Android updates are managed entirely through Managed Google Play
D. Android has no ring model; you control when updates may install, with postponement capped at 30 days

<details><summary>Answer</summary>

**D** — Android system update policy offers Device Default, Postpone, Windowed and Automatic. Postponement is capped at 30 days, after which the update installs regardless. There is no per-release deferral and no ring staging.

*Exam tip:* The absence of a ring model is the point. And remember these settings exist only for corporate-owned devices — a personally owned work profile has none of them.

</details>

---

## Lab 49: iOS, iPadOS and macOS update policies

**Access:** Walkthrough — required device not available in this lab · **Estimated time:** 30 minutes · **Difficulty:** intermediate

> [!IMPORTANT]
> You can build these policies in your tenant — they need no special licence — but there is no Apple hardware here to receive them, so the exercises stop at configuration rather than verification. Build them as you read; the settings and the supervision constraints are what the exam asks about.

### Lab scenario

Apple updates are managed through the settings catalog using Apple's declarative device management, and the amount of control you get depends entirely on whether the device is supervised. On a supervised corporate iPad you can enforce a version by a deadline; on a personally enrolled iPhone you can suggest and little else.

### Objectives

After completing this lab, you will be able to:

- Create an update policy for iOS and iPadOS through the settings catalog
- Create a macOS software update policy
- Explain how supervision limits what can be enforced
- Describe declarative device management for Apple updates

### Exam objectives covered

- `g3.t2.s4` — Create and manage update policies for iOS/iPadOS and macOS devices by using the Settings Catalog in Microsoft Intune

### Prerequisites

- Completed labs: `apple-and-specialty-profiles`, `update-rings`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: miriam.graham

### Exercise 1: Build the policies

#### Task 1: Create an iOS and iPadOS update policy

1. Select **Devices**, **Configuration**, then **Create** > **New Policy**, platform **iOS/iPadOS**, profile type **Settings catalog**.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

   > [!NOTE]
   > Apple update management moved to the settings catalog and Apple's declarative device management framework. Older guidance points at **Devices** > **Update policies for iOS/iPadOS**, which still exists but is the legacy surface. The exam objective names the Settings Catalog explicitly.

2. Name it `IOS-Updates-Corporate`, then search the settings picker for `Software Update` and configure:

   | Setting | Value |
   | --- | --- |
   | Enforced Software Update — Target OS Version | **The version you require, for example 18.1** |
   | Enforced Software Update — Target Local Date Time | **The deadline by which it must be installed** |
   | Software Update — Automatic Actions: Download | **Allowed** |
   | Software Update — Automatic Actions: Install OS Updates | **Allowed** |
   | Software Update — Enforced Delay: Major OS Updates (days) | **30** <br> Delays major releases so you can validate them. |

   > [!IMPORTANT]
   > **Enforced software update** — specifying a target version and a deadline — requires a **supervised** device. On an unsupervised, personally enrolled device the setting is delivered and ignored, exactly as with the supervised-only restrictions in lab 26. Supervision comes only from Automated Device Enrollment or Apple Configurator.

3. Assign to `GRP-USR-APPLE` and create the profile.

**Results:** An iOS update policy exists with an enforced target version and deadline.

- [ ] `IOS-Updates-Corporate` exists with software update settings.
- [ ] You can state what enforcement requires.

#### Task 2: Create a macOS update policy

1. Create a second settings catalog profile: select **Devices** > **Configuration** > **Create** > **New Policy**, platform **macOS**, profile type **Settings catalog**, named `MAC-Updates-Corporate`.
   *Path:* **Devices** > **Configuration** > **Create** > **New Policy**

2. Search for `Software Update` and configure:

   | Setting | Value |
   | --- | --- |
   | Automatically Check For Updates | **Enabled** |
   | Automatically Download Updates | **Enabled** |
   | Automatically Install macOS Updates | **Enabled** |
   | Automatically Install App Store App Updates | **Enabled** |
   | Enforced Software Update — Target OS Version | **The macOS version you require** |
   | Enforced Software Update — Target Local Date Time | **The deadline** |
   | Enforced Software Update — Delay Major Software Update (days) | **30** |

   > [!NOTE]
   > macOS separates several update types that Windows treats as one: system updates, App Store application updates, and critical security responses, each configurable independently. Being able to enable rapid security responses without also enabling major version upgrades is a genuine advantage of the Apple model.

3. Assign to `GRP-USR-APPLE` and create the profile.

**Results:** A macOS update policy exists with an enforced version and deadline.

- [ ] `MAC-Updates-Corporate` exists with automatic install and an enforced target.

### Exercise 2: Compare the three platforms

#### Task 1: Place all three update models side by side

1. You have now configured update management on every platform this course covers. The models are genuinely different and the exam expects you to know which is which.

   |  | Windows | Android (corporate) | Apple |
   | --- | --- | --- | --- |
   | Staged rollout | **Yes** — update rings with per-release deferrals | No | No |
   | Enforce a specific version | Feature update policy | No | **Yes** — enforced software update, supervised only |
   | Deadline for installation | Yes, with a grace period | Postpone up to 30 days | Yes, a target date and time |
   | Emergency override | Expedited quality update | No | No |
   | Restart-free patching | Hotpatch, with Autopatch | No | Rapid Security Responses |
   | Pause a rollout | Yes, up to 35 days | Freeze periods | Delay major updates |
   | Managed service option | Windows Autopatch | No | No |

   > [!TIP]
   > Windows is the only platform with a genuine ring model, and the only one with an emergency override. Apple is the only one where you can name a target version and a deadline. Android gives you timing control and nothing else. Those three sentences answer most cross-platform update questions.

**Results:** You can choose the right update mechanism for any platform in a scenario.

- [ ] You can name the only platform with staged rings.
- [ ] You can name the platform where a target version can be enforced by deadline.

### Troubleshooting

**Symptom:** An enforced software update policy is deployed to iPads but they remain on an older version past the deadline.

- **Root cause:** The devices are not supervised. Enforced software update is a supervised-only capability and is silently ignored otherwise.
- **Diagnostic:**

  ```text
  Devices > All devices > open the device > check the Supervised property
  Devices > Configuration > open the profile > Device status
  ```

- **Resolution:** Supervision requires Automated Device Enrollment through Apple Business Manager, or Apple Configurator. An already personally enrolled device must be wiped and re-enrolled through ADE — it cannot be supervised in place.

### Knowledge check

**Q1.** You configure an enforced software update policy specifying iOS 18.1 by a deadline. Corporate iPads enrolled through Apple Business Manager comply, but personally enrolled iPhones do not. Why?

A. iPhones require a separate update policy platform
B. The deadline must be at least 30 days in the future
C. The policy must be assigned to a device group rather than a user group
D. Enforced software update requires a supervised device, and personally enrolled devices are not supervised

<details><summary>Answer</summary>

**D** — Enforced software update is supervised-only. Devices enrolled through Automated Device Enrollment are supervised and comply; personally enrolled devices accept the profile and ignore the payload.

*Exam tip:* Supervision keeps recurring across Apple management — restrictions, kiosk mode, non-removable profiles and enforced updates all depend on it. Establish whether a device is supervised before analysing anything else.

</details>

---

# Module 9 — Operate and troubleshoot

The day-two job: remote and bulk actions, key and password rotation, on-demand device query with KQL, and collecting the diagnostics you need to answer a support call.

## Lab 50: Remote actions, bulk actions and credential rotation

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** intermediate

### Lab scenario

A laptop is stolen. A user is leaving. A device is behaving oddly and needs its antivirus definitions refreshed. Each is a remote action, and the difference between Retire and Wipe is the difference between removing corporate access and destroying someone's personal photographs. This lab makes you certain about which action does what before you ever have to choose one under pressure.

### Objectives

After completing this lab, you will be able to:

- Perform sync, restart, retire and wipe and state exactly what each removes
- Run a bulk device action
- Update Defender security intelligence remotely
- Rotate BitLocker recovery keys and local administrator passwords
- Choose the right action for a given scenario

### Exam objectives covered

- `g2.t4.s1` — Sync, restart, retire, or wipe devices
- `g2.t4.s2` — Perform bulk remote actions
- `g2.t4.s3` — Update Microsoft Defender Antivirus security intelligence
- `g2.t4.s4` — Rotate BitLocker recovery keys
- `g2.t4.s5` — Rotate local administrator passwords

### Prerequisites

- Completed labs: `disk-encryption`, `whfb-laps-local-groups`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, staging.user01

### Exercise 1: Know what each action destroys

#### Task 1: Learn the data impact matrix

1. Study this before running anything. Choosing wrongly here is one of the few genuinely unrecoverable mistakes in endpoint administration.

   | Action | Removes | Keeps | Device stays enrolled |
   | --- | --- | --- | --- |
   | **Sync** | Nothing | Everything | Yes |
   | **Restart** | Nothing | Everything | Yes |
   | **Retire** | Company data, policies, company apps, work profile, VPN and Wi-Fi profiles | **All personal data and the operating system** | No |
   | **Wipe** | **Everything — factory reset** | Nothing, unless you keep enrollment state | No, unless retained |
   | **Fresh Start** | Pre-installed manufacturer apps, optionally user data | Windows, and user data if you choose | Yes |
   | **Autopilot Reset** | Apps, settings and personal content | Autopilot registration, so it redeploys automatically | Yes, redeploys |
   | **Delete** | The Intune record only | The device itself, untouched and still configured | No record |

   > [!CAUTION]
   > **Retire** is for personally owned devices — it takes back what the organisation owns and leaves the rest alone. **Wipe** is for corporate hardware being reissued or lost. Using Wipe on an employee's own phone destroys their personal data and is not recoverable. When a scenario says the device belongs to the user, the answer is almost always Retire.

2. Note the two Windows-specific options:

   > [!NOTE]
   > **Fresh Start** removes manufacturer-installed software while keeping Windows and, optionally, user data — useful for a device that arrived full of vendor bloatware. **Autopilot Reset** returns a device to a business-ready state while preserving its Autopilot registration and Entra join, so it redeploys itself. That is the right action for reassigning a corporate laptop between employees.

**Results:** You can state what each remote action destroys without looking it up.

- [ ] You can name the action for a departing employee's personal phone.
- [ ] You can name the action for reassigning a corporate laptop.

### Exercise 2: Run remote actions

#### Task 1: Run individual actions

1. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**. Select `MD102-VM1-Adele` from the list and review the action bar across the top of the device overview.
   *Path:* **Devices** > **All devices** > **MD102-VM1-Adele**

2. Run the safe ones and watch what happens:

   a. Select **Sync**. The device checks in for policy within minutes.
   b. Select **Collect diagnostics**. Intune gathers a diagnostic package — used in lab 51.
   c. Select **Update Windows Defender security intelligence**. Definitions refresh without a full policy cycle.

   > [!TIP]
   > **Update Windows Defender security intelligence** is the remote action people forget exists. When a new threat is circulating and you need every device on current definitions now, this is faster than waiting for the scheduled signature interval from lab 40.

3. On **MD102-VM1-Adele**, open PowerShell as an administrator and confirm the sync from the device:

   ```powershell
   Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 20 |
       Select-Object TimeCreated, Id | Format-Table -AutoSize
   ```

4. Now rotate credentials, which you configured in earlier labs:

   a. Select **BitLocker key rotation**, then confirm. A new recovery key appears under **Recovery keys** after the next check-in.
   b. Select **Rotate local admin password**, then confirm. A new LAPS password appears under **Local admin password**.

   > [!IMPORTANT]
   > Both rotations are the correct response to credential disclosure. If a BitLocker key or a local administrator password was read out on a support call, written on a whiteboard or emailed, rotate it — the value is only as secret as the least careful person who has seen it.

**Results:** You have run the non-destructive remote actions and rotated both credential types.

- [ ] The device synced on demand.
- [ ] New BitLocker and LAPS values appear after rotation.

#### Task 2: Run a bulk device action

1. Select **Devices**, **All devices**, then **Bulk device actions**.
   *Path:* **Devices** > **All devices** > **Bulk device actions**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | OS | **Windows** |
   | Device action | **Sync** |
   | Devices | **Select several of your devices** |

   > [!WARNING]
   > Bulk actions support destructive operations including **Retire** and **Wipe**, with a limit of 100 devices per action. There is one confirmation and no undo. Read the device list twice before confirming a bulk wipe — the confirmation dialog will not save you from a wrong filter.

3. Run the sync and check progress under **Tenant administration** > **Bulk device actions**.
   *Path:* **Tenant administration** > **Bulk device actions**

   **Verify:** The action is listed with per-device status showing pending, succeeded or failed.

**Results:** You can act on many devices at once and monitor the result.

- [ ] A bulk action shows per-device status.
- [ ] You can state the per-action device limit.

### Exercise 3: Retire a device and confirm the result

#### Task 1: Retire the Android emulator

1. In the **Microsoft Intune admin center**, select **Devices**, then **All devices**. Select the Android emulator's device record from the list, then select **Retire** from the action toolbar.
   *Path:* **Devices** > **All devices** > **Retire**

   > [!NOTE]
   > The emulator is personally owned with a work profile, so **Wipe** is not offered — Intune will not let you factory reset a device the organisation does not own. That constraint is the feature working, and it is worth seeing rather than reading about.

2. Confirm the action, then watch the emulator.

   **Verify:** The work profile is removed. Badged work applications disappear, corporate data goes with them, and Diego's personal side of the device is untouched.

3. Confirm in the portal.

   **Verify:** The device is removed from **All devices**. Retiring both unenrolls the device and deletes its Intune record.

   > [!TIP]
   > Re-enrol the emulator using the flow from lab 13 before continuing — later labs assume an Android device exists. Doing the round trip once is worth the ten minutes, because it proves you can recover a device as well as remove one.

**Results:** You have removed corporate presence from a personally owned device without touching personal data.

- [ ] The work profile is gone from the emulator.
- [ ] Personal applications and data remain.

### Scripts

#### Bulk remote actions through Microsoft Graph

> [!NOTE]
> Useful when the selection criteria are more complex than the portal filters allow. The example syncs; change the action with care.

```powershell
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.PrivilegedOperations.All",
                           "DeviceManagementManagedDevices.ReadWrite.All"

# Devices that have not checked in for 14 days — ask them to sync.
$stale = Get-MgDeviceManagementManagedDevice -All |
    Where-Object {
        $_.OperatingSystem -eq "Windows" -and
        $_.LastSyncDateTime -lt (Get-Date).AddDays(-14)
    }

Write-Host "$($stale.Count) devices have not synced in 14 days" -ForegroundColor Yellow

foreach ($device in $stale) {
    try {
        Sync-MgDeviceManagementManagedDevice -ManagedDeviceId $device.Id -ErrorAction Stop
        Write-Host "sync requested: $($device.DeviceName)" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED: $($device.DeviceName) - $_" -ForegroundColor Red
    }
}

# Retire and Wipe are also available and are NOT reversible:
#   Invoke-MgRetireDeviceManagementManagedDevice -ManagedDeviceId $device.Id
#   Invoke-MgWipeDeviceManagementManagedDevice  -ManagedDeviceId $device.Id
```

### Troubleshooting

**Symptom:** A remote action stays pending indefinitely.

- **Root cause:** The device has not checked in. Remote actions queue until the device contacts the service and are not delivered by push.
- **Diagnostic:**

  ```powershell
  Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
  Get-MgDeviceManagementManagedDevice -All |
      Where-Object DeviceName -eq "MD102-VM1-Adele" |
      Select-Object DeviceName, LastSyncDateTime, ManagementState
  ```

- **Resolution:** Check `LastSyncDateTime`. A device that is switched off, offline or has lost its management channel cannot receive the action — the pending status describes the device, not a fault in the action.

### Knowledge check

**Q1.** An employee leaves the company. Their personally owned Android phone has a work profile with corporate mail. Which remote action should you use?

A. Retire, which removes the work profile and company data while leaving personal data intact
B. Fresh Start, to reset the device to a clean state
C. Delete, to remove the device record from Intune
D. Wipe, to ensure no corporate data remains on the device

<details><summary>Answer</summary>

**A** — Retire removes corporate data, policies and the work profile while leaving the device and all personal content untouched. Wipe would factory reset a device the organisation does not own, and Delete removes only the record while leaving corporate data in place on the device.

*Exam tip:* Match the action to ownership. Personally owned means Retire; corporate hardware being reissued means Wipe or Autopilot Reset.

</details>

**Q2.** A corporate laptop is being reassigned to a different employee. It must return to a business-ready state and redeploy automatically without IT reimaging it. Which action is appropriate?

A. Fresh Start, which removes pre-installed applications
B. Retire, which unenrolls the device
C. Autopilot Reset, which preserves the Autopilot registration so the device redeploys itself
D. Wipe, which factory resets the device

<details><summary>Answer</summary>

**C** — Autopilot Reset removes applications, settings and personal content while preserving Autopilot registration and Microsoft Entra join, so the device provisions itself for its new user. A full Wipe would remove the Entra join and require the deployment to start over.

*Exam tip:* Autopilot Reset is the reassignment action. Its distinguishing property is that the device stays registered and redeploys without being touched.

</details>

---

## Lab 51: Device query with KQL and diagnostics collection

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** advanced

### Lab scenario

A vulnerability is announced in a piece of software and you need to know, within the hour, which devices have it installed. Waiting for an inventory report is too slow. Device query runs Kusto Query Language against a device on demand and returns live results, and diagnostics collection pulls a full log bundle from a device without asking the user to find anything.

### Objectives

After completing this lab, you will be able to:

- Run an on-demand device query using KQL
- Write queries against the common device query tables
- Collect device diagnostics remotely and read the result
- Use the Troubleshooting blade for a user-centred investigation
- Distinguish single-device query from multi-device query licensing

### Exam objectives covered

- `g2.t4.s6` — Run a device query by using KQL
- `g2.t4.s7` — Collect device diagnostics and logs by using Microsoft Intune, including using the Troubleshooting blade for user-based diagnostics

### Prerequisites

- Completed labs: `remote-actions`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: Query a device on demand

#### Task 1: Run your first device query

1. Select **Devices**, then **All devices**, select `MD102-VM1-Adele` from the list, then select **Query** from the device action bar.
   *Path:* **Devices** > **All devices** > **MD102-VM1-Adele** > **Query**

   > [!IMPORTANT]
   > **Single-device query** is included with Intune Plan 1. **Multi-device query**, which runs the same KQL across many devices at once, belongs to Intune Advanced Analytics — which Microsoft 365 E5 has included since July 2026, so you have both. This lab teaches the single-device form because it is where the query language is easiest to learn; lab 59 runs the same queries across the estate.

2. Run a simple query to confirm the mechanism works:

   *Basic device information*
   ```kusto
   Device
   ```

   **Verify:** Results return within seconds showing the device's live properties. This is not cached inventory — the query executes on the device now.

3. Learn the tables that matter:

   | Table | Contains |
   | --- | --- |
   | `Device` | Core device properties: name, manufacturer, model, serial, OS build |
   | `Application` | Installed applications with versions and publishers |
   | `Process` | Currently running processes |
   | `Service` | Windows services and their state |
   | `LocalUserAccount` | Local accounts on the device |
   | `LocalUserGroup` | Local groups and their membership |
   | `NetworkAdapter` | Network interfaces and addressing |
   | `DriverInfo` | Installed drivers and versions |
   | `RegistryKey` and `RegistryValue` | Registry data, queried live |
   | `FileInfo` | Files matching a path |
   | `WindowsUpdate` | Update history |

4. Answer the scenario from the introduction — find a vulnerable application:

   *Is a specific application installed, and which version?*
   ```kusto
   Application
   | where displayName contains "7-Zip"
   | project displayName, version, publisher, installDate
   | sort by version asc
   ```

5. Run two more that answer real support questions:

   *Who is a local administrator on this device?*
   ```kusto
   LocalUserGroup
   | where name == "Administrators"
   | mv-expand members
   | project name, members
   ```

   *Is the Defender sensor running?*
   ```kusto
   Service
   | where displayName contains "Defender" or name == "Sense"
   | project name, displayName, state, startMode
   ```

   > [!TIP]
   > The KQL subset here is deliberately small: `where`, `project`, `sort by`, `summarize`, `count`, `contains`, `has`, `mv-expand`. You do not need the full Kusto language, and the exam does not test obscure operators — it tests whether you know device query exists, what it can reach, and that it runs live rather than against cached inventory.

**Results:** You can answer live questions about a device without touching it.

- [ ] A query against `Application` returned results.
- [ ] You can name at least five queryable tables.

### Exercise 2: Collect diagnostics

#### Task 1: Collect and download a diagnostics package

1. On the `MD102-VM1-Adele` device blade under **Devices** > **All devices**, select **Collect diagnostics** and confirm.
   *Path:* **Devices** > **All devices** > **MD102-VM1-Adele** > **Collect diagnostics**

   > [!NOTE]
   > Collection is silent — the user is not prompted and sees nothing. The device gathers Intune Management Extension logs, MDM diagnostics, event logs, registry state and update history, then uploads the bundle.

2. Once collection completes, navigate to **Devices** > **All devices**, select `MD102-VM1-Adele`, then under **Monitor**, select **Device diagnostics** and download the package.
   *Path:* **Devices** > **All devices** > **MD102-VM1-Adele** > **Monitor** > **Device diagnostics**

   **Verify:** A zip file downloads containing numbered folders. `results.xml` maps each folder to what it collected — read that first rather than opening folders at random.

3. Compare the two ways to get the same information:

   |  | Collect diagnostics (remote) | mdmdiagnosticstool (local) |
   | --- | --- | --- |
   | Requires physical access | No | Yes, or a remote session |
   | User is aware | No | Yes, someone has to run it |
   | Device must be online | Yes | No |
   | Output | Downloaded from the portal | A local zip you must retrieve |
   | Best for | A user who cannot help you | A device that is offline or unenrolled |

4. Finish with the user-centred view. Open **Troubleshooting + support** > **Troubleshoot** and select Adele.
   *Path:* **Troubleshooting + support** > **Troubleshoot**

   > [!IMPORTANT]
   > This blade is the exam's *user-based diagnostics* and the right first stop for any single-user complaint. It consolidates licensing, group membership, devices, compliance, configuration, applications, app protection and enrollment failures onto one page — which is exactly the set of things that turn out to be the cause.

**Results:** You can collect a full diagnostic bundle without involving the user.

- [ ] A diagnostics package downloaded and `results.xml` explains its contents.
- [ ] The Troubleshooting blade shows the user's full state.

### Troubleshooting

**Symptom:** Device query returns no results or the Query option is unavailable.

- **Root cause:** The device is offline, is running an unsupported operating system version, or Endpoint Analytics data collection does not target it — multi-device query only reaches devices that are in scope for collection.
- **Diagnostic:**

  ```text
  Devices > All devices > open the device > check Last check-in
  Confirm the OS version meets the device query minimum.
  ```

- **Resolution:** Device query needs the device online because it executes live — there is no cached answer to fall back on. For multi-device query, confirm the devices are in scope for Endpoint Analytics data collection, which lab 54 configures.

### Knowledge check

**Q1.** A vulnerability is announced in a widely deployed application. You need to know within the hour which devices have it and at what version. Which capability gives live results?

A. A custom compliance policy with a discovery script
B. The discovered apps inventory report
C. Device query using KQL
D. Collect diagnostics

<details><summary>Answer</summary>

**C** — Device query executes on the device on demand and returns current state. Discovered apps is cached inventory refreshed on a schedule, and a compliance script would take a full evaluation cycle to report.

*Exam tip:* Live versus cached is the distinction being tested. Note also that querying many devices at once belongs to Advanced Analytics, while single-device query is in Plan 1 — Microsoft 365 E5 has included both since July 2026.

</details>

**Q2.** A user reports that an application will not install, and they cannot reliably follow instructions to gather logs. What is the most efficient way to obtain the diagnostic data?

A. Ask the user to run mdmdiagnosticstool.exe and email you the output
B. Run a device query against the Application table
C. Retire and re-enrol the device
D. Use Collect diagnostics from the device blade, which gathers logs silently and uploads them

<details><summary>Answer</summary>

**D** — Collect diagnostics gathers Intune Management Extension logs, MDM diagnostics, event logs and update history without any user involvement, and makes the bundle downloadable from the portal.

*Exam tip:* Device query answers a specific question about current state; collect diagnostics gathers everything for an investigation. Pick based on whether you know what you are looking for.

</details>

---

# Module 10 — Automation, monitoring and reporting

The newest exam domain. Automate with the Microsoft Graph PowerShell SDK, self-heal with proactive remediations, measure with Endpoint Analytics and Intune reporting, and watch tenant health and alerts.

## Lab 52: Automate Intune with the Microsoft Graph PowerShell SDK

**Access:** Hands-on · **Estimated time:** 50 minutes · **Difficulty:** advanced

### Lab scenario

Everything you have done through the portal is a Graph call underneath. Once you can make those calls yourself, tasks that are tedious through the interface become one command: reporting across the whole estate, bulk creating policies, cleaning up stale devices, exporting a configuration before you change it. This lab builds the habits that make Graph safe to use rather than dangerous.

### Objectives

After completing this lab, you will be able to:

- Connect with least-privilege scopes and understand delegated versus application permissions
- Query devices, policies and applications across the tenant
- Create and assign an Intune object entirely from PowerShell
- Export configuration for backup and change comparison
- Find the Graph call behind any portal action

### Exam objectives covered

- `g5.t1.s1` — Automate Intune management tasks by using PowerShell and Microsoft Graph

### Prerequisites

- Completed labs: `remote-actions`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: admin-intune

### Exercise 1: Connect properly

#### Task 1: Understand scopes and permission types

1. Connect with only the scopes the work needs:

   ```powershell
   Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All",
                            "DeviceManagementConfiguration.ReadWrite.All",
                            "DeviceManagementApps.Read.All"

   Get-MgContext | Select-Object Account, TenantId, AuthType, Scopes
   ```

2. Learn the scope families you will actually use:

   | Scope | Covers |
   | --- | --- |
   | `DeviceManagementManagedDevices.Read.All` | Read enrolled devices |
   | `DeviceManagementManagedDevices.ReadWrite.All` | Modify devices |
   | `DeviceManagementManagedDevices.PrivilegedOperations.All` | **Wipe, retire and reset** — separated deliberately |
   | `DeviceManagementConfiguration.ReadWrite.All` | Configuration and compliance policies |
   | `DeviceManagementApps.ReadWrite.All` | Applications and app protection |
   | `DeviceManagementRBAC.ReadWrite.All` | Roles and scope tags |
   | `DeviceManagementServiceConfig.ReadWrite.All` | Enrollment configuration |

   > [!IMPORTANT]
   > Note that destructive device operations have their own scope, `PrivilegedOperations.All`, separate from `ReadWrite.All`. That separation exists precisely so an automation account can manage devices without being able to wipe them. Requesting it habitually defeats the design.

3. Understand the two permission types, which the exam distinguishes:

   |  | Delegated | Application |
   | --- | --- | --- |
   | Acts as | The signed-in user | The application itself |
   | Effective permission | The lesser of the scope and the user's own rights | Exactly the granted permission |
   | Interactive sign-in | Required | None |
   | Suits | Interactive administration, this lab | Scheduled automation and unattended scripts |
   | Configured through | `Connect-MgGraph -Scopes` | An app registration with a certificate or secret |

   > [!TIP]
   > A delegated token can never exceed what the signed-in user is allowed to do, which makes it safe for interactive work. Unattended automation needs application permissions and an app registration — and those are granted tenant-wide with no user to limit them, so they should be scoped tightly and use certificate authentication rather than a secret.

**Results:** You are connected with scoped consent and can explain both permission types.

- [ ] `Get-MgContext` shows only the scopes you requested.
- [ ] You can name the scope required to wipe a device.

### Exercise 2: Query, create and export

#### Task 1: Report across the estate

1. Run the reporting script from the [Scripts](#scripts-12) section. It answers several questions the portal makes you click through separately.

   **Verify:** You get device counts by platform and compliance state, a list of stale devices, and every non-compliant device with its user — in one pass.

2. Learn the cmdlet naming pattern, which makes the SDK guessable:

   | Portal area | Cmdlet noun |
   | --- | --- |
   | Devices | `MgDeviceManagementManagedDevice` |
   | Configuration profiles | `MgDeviceManagementDeviceConfiguration` |
   | Settings catalog policies | `MgBetaDeviceManagementConfigurationPolicy` |
   | Compliance policies | `MgDeviceManagementDeviceCompliancePolicy` |
   | Applications | `MgDeviceAppManagementMobileApp` |
   | App protection | `MgDeviceAppManagementManagedAppPolicy` |
   | Scope tags | `MgDeviceManagementRoleScopeTag` |

   > [!IMPORTANT]
   > Several newer surfaces — settings catalog policies, endpoint security policies, Autopilot device preparation — exist only on the **beta** endpoint and use `MgBeta` cmdlets from the `Microsoft.Graph.Beta` module. Beta is not versioned and can change without notice, so pin your module version if a script matters.

**Results:** You can answer estate-wide questions in one command.

- [ ] The reporting script returned device and compliance summaries.
- [ ] You can predict the cmdlet noun for a given portal area.

#### Task 2: Create a policy from PowerShell

1. Run the compliance policy creation script from the [Scripts](#scripts-12) section.

   **Verify:** A new compliance policy appears under **Devices** > **Compliance**, created and assigned without touching the portal.

2. Now learn the technique that unlocks everything the SDK does not cover — find the call the portal makes:

   a. Open the Intune portal and press F12 to open browser developer tools.
   b. Select the **Network** tab and filter on `graph.microsoft.com`.
   c. Perform the action you want to automate.
   d. Read the request URL, method and JSON body.

   *Replay any captured call with Invoke-MgGraphRequest*
   ```powershell
   $uri = "https://graph.microsoft.com/beta/deviceManagement/configurationPolicies"
   $body = @{
       name        = "Created from PowerShell"
       description = "Settings catalog policy"
       platforms   = "windows10"
       technologies = "mdm"
       settings    = @()
   } | ConvertTo-Json -Depth 10

   Invoke-MgGraphRequest -Method POST -Uri $uri -Body $body -ContentType "application/json"
   ```

   > [!TIP]
   > `Invoke-MgGraphRequest` reuses your existing authenticated session and can call any endpoint, including ones with no dedicated cmdlet. Combined with the developer tools technique, it means anything you can do in the portal you can automate — which is the practical answer to almost every *can Intune do X from PowerShell* question.

3. On your admin workstation or host, open PowerShell as an administrator and export your Intune configuration as a backup:

   ```powershell
   $out = "C:\Temp\IntuneBackup"
   New-Item -ItemType Directory -Path $out -Force | Out-Null

   Get-MgDeviceManagementDeviceConfiguration -All |
       ConvertTo-Json -Depth 20 |
       Out-File "$out\configurations.json" -Encoding utf8

   Get-MgDeviceManagementDeviceCompliancePolicy -All |
       ConvertTo-Json -Depth 20 |
       Out-File "$out\compliance.json" -Encoding utf8

   Write-Host "Exported to $out" -ForegroundColor Green
   ```

   > [!IMPORTANT]
   > Export before every significant change. Intune has no built-in configuration history and no undo — if someone edits a policy badly, a JSON export from last week is the only record of what it used to say. This is five lines of PowerShell and it has saved a great many afternoons.

**Results:** You can create Intune objects from PowerShell and back up your configuration.

- [ ] A policy created by script appears in the portal.
- [ ] A configuration export exists as JSON.

### Scripts

#### Estate reporting

```powershell
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

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
Write-Host "Total: $($devices.Count) devices" -ForegroundColor Green
```

#### Create and assign a compliance policy

```powershell
Connect-MgGraph -Scopes "DeviceManagementConfiguration.ReadWrite.All","Group.Read.All"

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

New-MgDeviceManagementDeviceCompliancePolicyAssignment `
    -DeviceCompliancePolicyId $created.Id `
    -BodyParameter $assignment | Out-Null

Write-Host "Assigned to $($group.DisplayName)" -ForegroundColor Green
```

### Troubleshooting

**Symptom:** A Graph cmdlet returns an authorisation error although the account is an Intune Administrator.

- **Root cause:** The token was issued without the required scope. Directory role membership and token scopes are independent.
- **Diagnostic:**

  ```powershell
  (Get-MgContext).Scopes | Sort-Object
  ```

- **Resolution:** Reconnect with the scope the operation needs. Existing sessions are not upgraded when you discover a missing permission — `Connect-MgGraph` must be called again with the fuller list.

### Knowledge check

**Q1.** You are writing an unattended script that runs nightly to retire stale devices. Which permission type should it use?

A. Application permissions through an app registration with certificate authentication
B. Application permissions using the Intune Administrator directory role
C. Delegated permissions with the account signed in interactively each night
D. Delegated permissions with a stored administrator password

<details><summary>Answer</summary>

**A** — Unattended automation cannot rely on an interactive sign-in, so it needs application permissions granted to an app registration. Certificate authentication is preferred over a client secret because certificates can be rotated and protected more robustly.

*Exam tip:* Delegated permissions require a signed-in user and are capped by that user's rights. Application permissions act as the application itself and are granted tenant-wide — scope them tightly.

</details>

**Q2.** You need to automate an Intune action that has no dedicated Graph PowerShell cmdlet. What is the most practical approach?

A. Use the Intune PowerShell module instead of the Graph SDK
B. Wait for Microsoft to publish a cmdlet for that operation
C. Capture the call the portal makes using browser developer tools, then replay it with Invoke-MgGraphRequest
D. Automate the portal with browser scripting

<details><summary>Answer</summary>

**C** — Every portal action is a Graph call. Capturing the request URL, method and body from the Network tab and replaying it with `Invoke-MgGraphRequest` lets you automate anything the portal can do, including beta endpoints with no cmdlet.

*Exam tip:* Remember that newer features often exist only on the beta endpoint. That is where `Invoke-MgGraphRequest` and the `MgBeta` cmdlets earn their place.

</details>

---

## Lab 53: Proactive remediations: detect and fix automatically

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** advanced

### Lab scenario

Custom compliance from lab 30 can tell you a device is wrong. Proactive remediations can fix it. A remediation is a pair of scripts — one that detects a condition and one that corrects it — run on a schedule across the estate, with reporting on how many devices needed fixing. It is the closest thing Intune has to self-healing, and the exit-code contract is subtly different from the one you learned for Win32 detection.

### Objectives

After completing this lab, you will be able to:

- Write a detection and remediation script pair with the correct exit codes
- Deploy a remediation and configure its schedule
- Read remediation reporting and interpret the outcome columns
- Distinguish the remediation contract from the Win32 detection contract

### Exam objectives covered

- `g5.t2.s3` — Configure and manage proactive remediation scripts, including detecting and fixing common device issues, and scheduling remediation runs

### Prerequisites

- Completed labs: `custom-compliance`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: The exit-code contract

#### Task 1: Learn the contract, and how it differs from Win32 detection

1. A remediation is two scripts and one rule about exit codes.

   | Detection script exits | Meaning | What happens next |
   | --- | --- | --- |
   | `0` | Compliant — nothing to fix | The remediation script does **not** run |
   | `1` | Not compliant — a problem was found | The remediation script **runs** |
   | Anything else | Script error | Reported as an error; the remediation does not run |

   > [!IMPORTANT]
   > Compare this with the Win32 detection rule from lab 33, where exit `0` **plus output** means detected. Here exit `0` means *no action needed* and exit `1` means *fix it*. The two contracts are nearly opposite and people transpose them constantly. Remediation: `0` is good news, `1` triggers the fix.

2. Note what output is for:

   > [!NOTE]
   > Anything written to standard output — up to 2048 characters — appears in the remediation report as pre-remediation and post-remediation detection output. That is your only visibility into what happened on the device, so write something useful rather than nothing.

**Results:** You can state the exit-code contract without confusing it with Win32 detection.

- [ ] You can say what exit code 1 means in each of the two contexts.

### Exercise 2: Build and deploy a remediation

#### Task 1: Test the script pair locally

1. Save both scripts from the [Scripts](#scripts-13) section as `Detect-DeliveryOptimization.ps1` and `Remediate-DeliveryOptimization.ps1`.

   > [!TIP]
   > This example checks that Delivery Optimization is set to the peer-caching mode from lab 46 and corrects it if a user or another process has changed it. That is a realistic remediation: a setting that matters, drifts quietly, and has a clear correct value.

2. Test on **MD102-VM1-Adele** in an elevated session:

   ```powershell
   .\Detect-DeliveryOptimization.ps1
   "Detection exit code: $LASTEXITCODE"
   ```

   **Verify:** The script prints a status line and exits `0` or `1`. Anything else is a bug — fix it before uploading, because the portal gives no useful diagnostics for a script that errors.

3. In the elevated Administrator PowerShell session on **MD102-VM1-Adele**, break the setting deliberately, then confirm detection notices:

   ```powershell
   New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization" -Force | Out-Null
   Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization" -Name DODownloadMode -Value 0 -Type DWord

   .\Detect-DeliveryOptimization.ps1
   "Detection exit code: $LASTEXITCODE"   # should now be 1

   .\Remediate-DeliveryOptimization.ps1
   "Remediation exit code: $LASTEXITCODE" # should be 0

   .\Detect-DeliveryOptimization.ps1
   "Detection exit code: $LASTEXITCODE"   # back to 0
   ```

   **Verify:** Detection returns 1 when broken, remediation fixes it and returns 0, and detection then returns 0. Test this loop locally every time — it is far quicker than diagnosing through the portal's reporting.

**Results:** A tested script pair detects and corrects a real setting.

- [ ] The detect, remediate, detect loop works locally.

#### Task 2: Deploy and read the reporting

1. Select **Devices**, **Scripts and remediations**, then **Remediations**, then **Create script package**.
   *Path:* **Devices** > **Scripts and remediations** > **Remediations** > **Create script package**

2. Configure:

   | Setting | Value |
   | --- | --- |
   | Name | **REM-DeliveryOptimization** |
   | Description | **Ensures Delivery Optimization peer caching remains enabled** |
   | Detection script file | **Detect-DeliveryOptimization.ps1** |
   | Remediation script file | **Remediate-DeliveryOptimization.ps1** |
   | Run this script using the logged-on credentials | **No** <br> System context — the scripts write to HKLM. |
   | Enforce script signature check | **No** |
   | Run script in 64-bit PowerShell | **Yes** <br> In 32-bit, HKLM writes are redirected to WOW6432Node and the fix lands in the wrong place. |

3. On **Assignments**, assign to `GRP-DEV-WIN-CORP` and set the schedule:

   | Setting | Value |
   | --- | --- |
   | Schedule | **Daily** |
   | Repeats every | **1 day** |
   | Start time | **09:00** |

   | Schedule | Suits |
   | --- | --- |
   | Once | A one-off correction across the estate |
   | Hourly | Settings that must not drift for long — use sparingly, it is real load |
   | Daily | **The usual choice** for configuration drift |

4. Create the package. After devices have run it, navigate to **Devices** > **Scripts and remediations** > **Remediations**, select `REM-DeliveryOptimization` from the list, then select **Device status** under **Monitor** and read the columns:
   *Path:* **Devices** > **Scripts and remediations** > **Remediations** > **REM-DeliveryOptimization** > **Device status**

   | Column | Meaning |
   | --- | --- |
   | Without issues | Detection returned 0 — nothing needed doing |
   | Issue detected | Detection returned 1 |
   | Issue remediated | The remediation ran and post-detection returned 0 — **the outcome you want** |
   | Issue not remediated | The remediation ran and the problem persists — the fix is wrong |
   | Detection failed | The detection script errored or returned an unexpected code |
   | Pre-remediation detection output | What your detection script wrote to standard output |

   > [!IMPORTANT]
   > **Issue not remediated** is the row to watch. It means your detection is correct and your remediation does not work — the device is being told daily that it has a problem and the fix is failing every time. That is worse than no remediation, because it looks like coverage.

**Results:** A remediation runs on a schedule and reports what it fixed.

- [ ] The remediation appears with device status.
- [ ] You can explain what **Issue not remediated** indicates.

### Scripts

#### Detect-DeliveryOptimization.ps1

> [!NOTE]
> Exit 0 means compliant. Exit 1 triggers the remediation script.

```powershell
# Detection: is Delivery Optimization set to peer caching behind the same NAT?

$key      = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization"
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
}
```

#### Remediate-DeliveryOptimization.ps1

> [!NOTE]
> Exit 0 on success. Exit 1 if the fix could not be applied, so the report shows it honestly.

```powershell
# Remediation: set Delivery Optimization back to peer caching.

$key      = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization"
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
}
```

### Troubleshooting

**Symptom:** A remediation reports Issue detected on every device every day and never remediates.

- **Root cause:** The remediation script is failing, running in the wrong context, or fixing something other than what detection checks. A very common cause is 32-bit PowerShell redirecting an HKLM write to WOW6432Node while detection reads the real location.
- **Diagnostic:**

  ```powershell
  Get-Content "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\AgentExecutor.log" -Tail 200 |
      Select-String "Remediation|Detection|Exit"
  ```

- **Resolution:** Confirm **Run script in 64-bit PowerShell** is Yes and the context is System for any machine-wide change. Then run both scripts by hand on a failing device and compare what each one actually reads and writes.

### Knowledge check

**Q1.** In a proactive remediation detection script, what does exit code 1 signify?

A. The device is compliant and no action is needed
B. The remediation has already been applied
C. An issue was detected and the remediation script should run
D. The detection script failed to execute

<details><summary>Answer</summary>

**C** — Exit 0 means compliant and stops there; exit 1 means an issue was found and triggers the remediation script. Any other exit code is reported as a detection failure.

*Exam tip:* Do not transpose this with Win32 detection rules, where exit 0 plus output means the app *is* detected. Remediation: 0 is good, 1 means fix it.

</details>

**Q2.** A remediation consistently reports Issue not remediated. What does this indicate?

A. The remediation script is not assigned to the correct group
B. The detection script is returning an invalid exit code
C. The devices are offline and cannot run the scripts
D. The remediation script runs but the problem persists when detection re-evaluates

<details><summary>Answer</summary>

**D** — That status specifically means the remediation executed and post-remediation detection still found the issue. Detection is working; the fix is not.

*Exam tip:* Check context and bitness first. A machine-wide registry fix running in user context or 32-bit PowerShell writes to the wrong place and produces exactly this result.

</details>

---

## Lab 54: Endpoint Analytics: startup, reliability and user experience

**Access:** Hands-on · **Estimated time:** 40 minutes · **Difficulty:** intermediate

### Lab scenario

Compliance tells you whether a device meets policy. It says nothing about whether the device is any good to use. Endpoint Analytics measures the experience — how long a device takes to become usable after a restart, which applications crash, which hardware is failing — and turns *the laptops are slow* into a number you can act on and defend to a budget holder.

### Objectives

After completing this lab, you will be able to:

- Enable Endpoint Analytics and understand its data source
- Interpret the Endpoint analytics score and its components
- Analyse startup performance and identify what is slowing boot
- Read application reliability and resource performance
- Explain what Advanced Analytics adds and what it costs

### Exam objectives covered

- `g5.t2.s2` — Monitor endpoint performance by using Endpoint Analytics, including proactive remediations, device health scores, and app startup performance
- `g5.t2.s4` — Analyze endpoint reliability and user experience scores, including startup performance, restart frequency, and application reliability metrics

### Prerequisites

- Completed labs: `proactive-remediations`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance

### Exercise 1: Enable and interpret

#### Task 1: Turn on Endpoint Analytics

1. Select **Reports**, then **Endpoint analytics**, then **Settings**.
   *Path:* **Reports** > **Endpoint analytics** > **Settings**

2. Configure data collection:

   | Setting | Value |
   | --- | --- |
   | Intune data collection policy | **All devices, or a pilot group** |
   | Baseline | **All organizations (median)** <br> Compares you against the median of all tenants. You can also baseline against your own past scores. |

   > [!IMPORTANT]
   > Endpoint Analytics needs Windows diagnostic data at the **Required** level as a minimum, and **Optional** for the fullest signal. If your configuration profiles set diagnostic data to Off — which a hardening baseline might — Endpoint Analytics reports nothing and looks broken. Check that first if data never appears.

3. Wait for data. This is not instantaneous.

   > [!NOTE]
   > Devices need to restart and be used before there is anything to measure, and the first score typically appears after a few days. In this lab you may see partial data or none — the interpretation below matters more than the numbers your two virtual machines produce.

**Results:** Endpoint Analytics is collecting data from your devices.

- [ ] The data collection policy is enabled.
- [ ] You can name the diagnostic data level required.

#### Task 2: Interpret the score

1. Open the **Overview** and read the score's structure:

   | Component | Measures | Improved by |
   | --- | --- | --- |
   | **Startup performance** | Time from power-on to a usable desktop | Faster storage, fewer startup applications, fewer Group Policy objects |
   | **Application reliability** | How often applications crash or stop responding | Updating or replacing the offending applications |
   | **Work from anywhere** | Cloud identity, cloud management, cloud provisioning and Windows 11 readiness | Entra join rather than hybrid, Autopilot, Windows 11 |
   | **Resource performance** | CPU and memory pressure relative to the hardware | Hardware refresh, or reducing what runs at startup |
   | **Battery health** | Battery capacity and runtime on portable devices | Battery or device replacement |

   > [!TIP]
   > **Work from anywhere** is the one you can improve with configuration rather than money, and it is largely a scorecard for the work in modules 2 and 3. Entra joined beats hybrid, Autopilot beats manual provisioning, and Windows 11 beats Windows 10. If a scenario asks how to raise the score without buying hardware, this is the component to point at.

2. Note where proactive remediations appear:

   > [!NOTE]
   > The remediations you built in lab 53 live under **Reports** > **Endpoint analytics** > **Remediations**. They are considered part of Endpoint Analytics because their purpose is improving the measured experience — detect a condition that degrades it, and fix it automatically.

**Results:** You can explain each score component and what improves it.

- [ ] You can name the component improved by configuration rather than hardware.

### Exercise 2: Diagnose a slow device

#### Task 1: Read startup performance

1. Select **Reports** > **Endpoint analytics** > **Startup performance**, then the **Device performance** tab.
   *Path:* **Reports** > **Endpoint analytics** > **Startup performance** > **Device performance**

   | Metric | Meaning |
   | --- | --- |
   | Boot score | Time from power-on to the sign-in screen |
   | Sign-in score | Time from credentials entered to a responsive desktop |
   | Group policy time | How much of sign-in was spent processing policy |
   | Total startup time | Boot plus sign-in — what the user actually experiences |
   | Restart frequency | How often the device restarts, and why |

2. Open the **Startup processes** tab.

   **Verify:** Processes are ranked by their contribution to startup time across the estate. This is the actionable list — it names the software that is costing every user thirty seconds a morning.

   > [!TIP]
   > This report turns a vague complaint into a business case. *Devices are slow* is arguable; *this agent adds 40 seconds to every sign-in across 200 devices, which is 2.2 hours a day* is not. That framing is what gets the offending software removed.

3. Under **Reports** > **Endpoint analytics**, select **Application reliability** to view crash frequency, and review **Resource performance** for CPU and memory metrics.
   *Path:* **Reports** > **Endpoint analytics** > **Application reliability**

   **Verify:** Applications are ranked by crashes per device. Resource performance shows CPU and memory pressure, distinguishing an under-specified machine from one running something pathological.

4. Note what Advanced Analytics adds, and what it costs:

   | Capability | Intune Plan 1 | Advanced Analytics |
   | --- | --- | --- |
   | Endpoint analytics score and components | Yes | Yes |
   | Startup, reliability and resource performance | Yes | Yes |
   | Proactive remediations | Yes | Yes |
   | **Anomaly detection** | No | Yes — surfaces devices behaving unlike their peers |
   | **Device timeline** | No | Yes — an event history per device for root-cause analysis |
   | **Multi-device query** | No | Yes — the KQL from lab 51 across many devices at once |
   | **Enhanced device scopes and reporting** | No | Yes |

   > [!IMPORTANT]
   > The exam still draws this line between Plan 1 and Advanced Analytics, so learn the boundary — but note that **Microsoft 365 E5 has included Advanced Analytics since July 2026**, so you hold both sides of this table. Lab 59 uses anomaly detection, the device timeline and multi-device query for real. The exam objective for Advanced Analytics names anomaly detection, proactive insights and risk-based recommendations specifically.

**Results:** You can identify what is degrading experience on a device and quantify it.

- [ ] You located the startup processes ranking.
- [ ] You can name three capabilities that require Advanced Analytics.

### Troubleshooting

**Symptom:** Endpoint Analytics shows no data after several days.

- **Root cause:** Windows diagnostic data is set below the required level, the data collection policy does not target the devices, or the devices have not restarted since it was enabled.
- **Diagnostic:**

  ```powershell
  Get-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection" -ErrorAction SilentlyContinue |
      Select-Object AllowTelemetry
  ```

- **Resolution:** `AllowTelemetry` must be at least `1` (Required); `3` (Optional) gives the fullest signal. A hardening profile that sets it to `0` silently disables Endpoint Analytics — this is a genuine trade-off between telemetry minimisation and operational visibility.

### Knowledge check

**Q1.** Contoso wants to improve its Endpoint analytics score without purchasing new hardware. Which score component is most improvable through configuration?

A. Resource performance
B. Work from anywhere
C. Application reliability
D. Battery health

<details><summary>Answer</summary>

**B** — Work from anywhere measures cloud identity, cloud management, cloud provisioning and Windows 11 readiness — all of which are configuration and deployment choices. Battery health and resource performance are largely hardware, and application reliability depends on the software itself.

*Exam tip:* Work from anywhere is effectively a scorecard for how modern your deployment is. Entra join, Autopilot and Windows 11 all raise it directly.

</details>

**Q2.** Which Endpoint Analytics capability requires Intune Advanced Analytics rather than Plan 1?

A. Application reliability reporting
B. Proactive remediations
C. Anomaly detection and the device timeline
D. Startup performance scores

<details><summary>Answer</summary>

**C** — Anomaly detection, the per-device timeline and multi-device query belong to Advanced Analytics. The core score, startup performance, application reliability and proactive remediations are Plan 1 capabilities.

*Exam tip:* The exam objective for Advanced Analytics names anomaly detection, proactive insights and risk-based policy recommendations — those three phrases are the tell. The plan boundary is still examined even though Microsoft 365 E5 now grants both sides of it.

</details>

---

## Lab 55: Intune reporting, workbooks and data export

**Access:** Hands-on · **Estimated time:** 35 minutes · **Difficulty:** intermediate

### Lab scenario

Someone will ask you for a report. Sometimes it is an auditor wanting evidence that every device is encrypted; sometimes it is a manager wanting a monthly trend. Intune has four different reporting surfaces with different freshness and different capabilities, and picking the wrong one wastes an afternoon producing something that cannot answer the question.

### Objectives

After completing this lab, you will be able to:

- Distinguish the four Intune report types and their data freshness
- Customise a report with columns and filters
- Export report data from the portal and through Graph
- Explain what workbooks add and what they require

### Exam objectives covered

- `g5.t2.s1` — Implement reporting and data visibility in Microsoft Intune, including customizing reports and filters, using workbooks and dashboards, and exporting reporting data

### Prerequisites

- Completed labs: `graph-automation`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: admin-intune

### Exercise 1: The four report types

#### Task 1: Learn which report answers which question

1. Open **Reports** and note the structure, then read the comparison.
   *Path:* **Reports**

   | Type | Freshness | Scope | Example |
   | --- | --- | --- | --- |
   | **Operational** | Real time | Focused, actionable, usually failures | Devices that failed a compliance policy |
   | **Organizational** | Refreshed periodically | Broad estate summaries | Device compliance across the tenant |
   | **Historical** | Aggregated over time | Trends and patterns | Compliance trend over the last 60 days |
   | **Specialist** | Varies | Deep, narrow subject areas | Device inventory, Windows update failures |

   > [!IMPORTANT]
   > Freshness is the distinction that matters in practice. **Operational** reports query live and are what you use when troubleshooting now. **Organizational** and **historical** reports run against aggregated data that can be hours old — so a device you just fixed will still look broken, and concluding that your fix did not work is the standard mistake.

2. Select **Reports**, then under **Device management**, select **Device compliance**, and customise it:
   *Path:* **Reports** > **Device management** > **Device compliance**

   a. Select **Filters** and narrow to a single operating system and compliance state.
   b. Select **Columns** and add or remove columns so the report answers exactly one question.
   c. Select **Generate report**, then note the timestamp of the data.

   **Verify:** The report renders with your filters and shows when the data was generated. Always read that timestamp before drawing a conclusion.

3. Export it:

   a. Select **Export** and choose CSV.
   b. Note that large exports are prepared asynchronously and downloaded when ready.

**Results:** You can pick a report type from a question and customise it.

- [ ] You produced a filtered, column-customised report and exported it.
- [ ] You can state which report type is real time.

### Exercise 2: Automated export and workbooks

#### Task 1: Export report data through Graph

1. Portal exports are fine once. For a monthly report nobody should be clicking, use the export API.

   *Request an export job, then poll for the result*
   ```powershell
   Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

   $body = @{
       reportName = "DeviceCompliance"
       format     = "csv"
   } | ConvertTo-Json

   $job = Invoke-MgGraphRequest -Method POST `
       -Uri "https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs" `
       -Body $body -ContentType "application/json"

   # Bounded, and it stops on failed as well as completed. Polling only for
   # "completed" spins forever on a job that will never reach it.
   $deadline = (Get-Date).AddMinutes(5)
   do {
       Start-Sleep -Seconds 5
       $status = Invoke-MgGraphRequest -Method GET `
           -Uri "https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs('$($job.id)')"
       Write-Host "Status: $($status.status)"
   } while ($status.status -notin @("completed", "failed") -and (Get-Date) -lt $deadline)

   if ($status.status -ne "completed") { throw "Export job did not complete: $($status.status)" }

   Invoke-WebRequest -Uri $status.url -OutFile "C:\Temp\DeviceCompliance.zip"
   Write-Host "Downloaded to C:\Temp\DeviceCompliance.zip" -ForegroundColor Green
   ```

   > [!NOTE]
   > The export API is asynchronous: you request a job, poll until it completes, then download from the URL it returns. Report names match the portal reports — `DeviceCompliance`, `Devices`, `DeviceNonCompliance`, `AppInvRawData` and others. This is the correct way to build a scheduled report.

**Results:** You can produce a report on a schedule without anyone opening the portal.

- [ ] An export job completed and produced a downloadable file.

#### Task 2: Understand workbooks

1. Workbooks are the answer when Intune's own reports cannot express the question.

   |  | Intune reports | Log Analytics workbooks |
   | --- | --- | --- |
   | Requires | Nothing beyond Intune | **An Azure subscription and a Log Analytics workspace** |
   | Retention | Intune's own retention | As long as you pay to keep it |
   | Query language | None — fixed reports with filters | KQL, fully open |
   | Custom visuals | No | Yes — charts, grids, parameters |
   | Cross-source correlation | No | Yes — Intune, Entra sign-ins, Defender in one query |
   | Cost | Included | Azure ingestion and retention charges |

   > [!IMPORTANT]
   > Workbooks need diagnostic settings on the Intune tenant to stream data into a Log Analytics workspace, and that needs an Azure subscription. This lab has none, so workbooks are reference only. Know what they require and what they unlock: long retention, custom KQL, and correlating Intune data with Entra sign-in logs — which is how you answer questions no single Intune report can.

2. Note the route, for completeness:

   a. **Tenant administration** > **Diagnostic settings** > **Add diagnostic setting**.
   b. Select the log categories to stream — audit logs, operational logs, device compliance.
   c. Send them to a Log Analytics workspace.
   d. Build or import a workbook in the Azure portal against that workspace.

**Results:** You can state what workbooks require and when they are worth it.

- [ ] You can name the prerequisite for Intune workbooks.
- [ ] You can give one question only a workbook can answer.

### Troubleshooting

**Symptom:** A report shows a device as non-compliant although it was remediated an hour ago.

- **Root cause:** Organizational and historical reports run against aggregated data that lags behind live state.
- **Diagnostic:**

  ```text
  Read the data-generated timestamp on the report.
  Compare with Devices > All devices > the device > Device compliance, which is live.
  ```

- **Resolution:** Use an operational report or the device blade for current state. Aggregated reports are for trends and summaries, not for confirming a fix you made minutes ago.

### Knowledge check

**Q1.** You need to confirm right now whether a specific device is compliant after remediating it. Which Intune reporting surface should you use?

A. An operational report, or the device's own compliance blade
B. A historical report
C. An organizational report
D. A Log Analytics workbook

<details><summary>Answer</summary>

**A** — Operational reports and the device blade query live data. Organizational and historical reports run against aggregated data that lags, so a device fixed minutes ago will still appear non-compliant.

*Exam tip:* Match freshness to the question: operational for now, organizational for a summary, historical for a trend. Reading the data-generated timestamp is a habit worth having.

</details>

**Q2.** Contoso needs a dashboard correlating Intune compliance data with Microsoft Entra sign-in logs, retained for two years. What is required?

A. Diagnostic settings streaming to a Log Analytics workspace, then a workbook built with KQL
B. The Intune report export API with a scheduled script
C. Endpoint Analytics with a custom baseline
D. A historical report exported monthly to CSV

<details><summary>Answer</summary>

**A** — Correlating data across services, retaining it for years and querying it freely all require Log Analytics. Intune's own reports cover neither cross-service correlation nor multi-year retention.

*Exam tip:* Workbooks need an Azure subscription. Any scenario mentioning long retention or correlation with other Microsoft services is pointing at Log Analytics rather than Intune reporting.

</details>

---

## Lab 56: Tenant health, service communications and alert rules

**Access:** Hands-on · **Estimated time:** 35 minutes · **Difficulty:** intermediate

### Lab scenario

Two hundred enrollments failed overnight. You need to know whether that is your configuration or a Microsoft outage, and you need to have known about it before the help desk did. Tenant status carries service health and the message center; alert rules push notifications when something drifts. Both exist, both are off by default, and almost nobody configures them until after the first bad morning.

### Objectives

After completing this lab, you will be able to:

- Read tenant status, service health and the message center
- Establish an operational baseline you can compare against
- Configure alert rules for compliance drift and enrollment failures
- Route notifications to the right people
- Distinguish a service incident from a configuration problem

### Exam objectives covered

- `g5.t2.s5` — Monitor tenant health and Intune service communications, including reviewing service health dashboards, message center notifications, and establishing operational baselines
- `g5.t2.s6` — Configure alerts and notifications for policy and compliance changes, including setting up alert rules for compliance drift, enrollment failures, and configuration conflicts

### Prerequisites

- Completed labs: `intune-reporting`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: admin-intune, helpdesk.operator

### Exercise 1: Tenant health and service communications

#### Task 1: Record an operational baseline

1. Select **Tenant administration**, then **Tenant status**.
   *Path:* **Tenant administration** > **Tenant status**

2. Record today's values. These are your baseline — the numbers that make an anomaly obvious later.

   | Setting | Value |
   | --- | --- |
   | Total licensed users | **Record the number** |
   | Total Intune licenses | **Record the number** |
   | Total enrolled devices | **Record the number** |
   | MDM authority | **Microsoft Intune** |

   > [!IMPORTANT]
   > An operational baseline is the examinable idea here, and it is genuinely useful. *Fifteen enrollment failures today* means nothing on its own. *Fifteen, when the normal figure is two* is an incident. Without a recorded baseline every number is unfalsifiable, and you end up either ignoring real problems or chasing normal variation.

3. Select the **Service health and message center** tab.

   | Section | Tells you |
   | --- | --- |
   | Service health | Whether Intune itself is degraded right now, and which capability is affected |
   | Message center | Upcoming changes, deprecations and required actions, usually with a deadline |
   | Connector status | Whether Defender, Managed Google Play or Apple integrations are failing |

   > [!TIP]
   > Check service health **before** troubleshooting anything that broke suddenly and affects many devices. A service incident and a configuration mistake present identically from the help desk's side, and half an hour spent on a Microsoft outage is half an hour wasted.

4. Read the message center and find one item with a required action.

   > [!WARNING]
   > Message center posts are how Microsoft announces breaking changes — a deprecated authentication method, a retired setting, an endpoint being removed. They carry deadlines. Nobody reading the message center is a slow-motion outage, and it is why the alert rules in the next exercise are worth configuring.

**Results:** You have a recorded baseline and know where service communications live.

- [ ] You recorded device and licence counts with today's date.
- [ ] You can explain why a baseline makes an anomaly detectable.

### Exercise 2: Alert rules

#### Task 1: Create alert rules

1. Select **Tenant administration**, then **Alerts**, then **Alert rules**.
   *Path:* **Tenant administration** > **Alerts** > **Alert rules**

   > [!NOTE]
   > Several rules exist by default and are **disabled**. They will not notify anyone until you enable them and add recipients — which is why the first anyone hears about a problem is usually a user.

2. Enable and configure the rules that matter:

   | Alert rule | Fires when | Why it matters |
   | --- | --- | --- |
   | Device enrollment failure | Enrollment failures exceed a threshold | Catches a broken restriction or an expired token before the help desk does |
   | Apple MDM push certificate expiry | The certificate is approaching expiry | Prevents the whole-Apple-estate failure from lab 14 |
   | Apple VPP token expiry | The token is approaching expiry | Same category of failure |
   | Managed Google Play app sync failure | Android app synchronisation fails | Android app deployment stops silently otherwise |
   | Device compliance drift | Compliant devices become non-compliant above a threshold | A policy change that broke compliance shows up immediately |
   | Configuration policy conflict | Profiles conflict on devices | Catches the silent conflicts from lab 22 |

3. Under **Tenant administration** > **Alerts**, from the **Alert rules** list, select the **Device enrollment failure** rule, and configure it:
   *Path:* **Tenant administration** > **Alerts** > **Alert rules** > **Device enrollment failure**

   | Setting | Value |
   | --- | --- |
   | Status | **Enabled** |
   | Condition threshold | **Set above your recorded baseline** <br> Set from the baseline, not from a round number. A threshold below normal variation trains people to ignore the alert. |
   | Severity | **Critical** |
   | Email notification | **Enabled** |
   | Notification recipients | **admin-intune, helpdesk.operator** |

   > [!IMPORTANT]
   > Set the threshold from your baseline. A rule that fires on normal variation gets muted within a week, and a muted rule is worse than no rule because everyone believes it is watching. This is the practical reason the baseline exercise came first.

4. Repeat for the **Device compliance drift** rule: select it from the list and configure its threshold, then select **Notifications** under **Tenant administration** > **Alerts** to configure notification recipients.
   *Path:* **Tenant administration** > **Alerts** > **Notifications**

   > [!TIP]
   > Send certificate and token expiry alerts to a shared mailbox or distribution list, never to one person's address. Those alerts fire once a year and the failure mode is that the only recipient has left the organisation — which is exactly how an Apple estate falls out of management.

5. Confirm the rules are active under **Alerts** > **Active alerts**.

   **Verify:** Your enabled rules are listed with their thresholds and recipients.

**Results:** You will be told about drift, failures and expiries rather than discovering them.

- [ ] At least two alert rules are enabled with recipients.
- [ ] Thresholds are derived from your recorded baseline.
- [ ] Expiry alerts go to a shared address, not an individual.

### Troubleshooting

**Symptom:** A large number of devices failed enrollment overnight and nothing in the configuration has changed.

- **Root cause:** Possibly a service incident rather than a configuration problem — or an expired certificate or token, which fails all at once by nature.
- **Diagnostic:**

  ```text
  Tenant administration > Tenant status > Service health and message center
  Devices > Enrollment > Apple > check push certificate and token expiry dates.
  ```

- **Resolution:** Check service health before changing anything. If the service is healthy, check the certificate and token expiry dates — a simultaneous, estate-wide failure is far more often an expiry than a configuration error.

### Knowledge check

**Q1.** Why should an alert rule threshold be based on a recorded operational baseline rather than an arbitrary number?

A. Alert rules cannot be created without historical reporting enabled
B. A threshold set below normal variation produces constant false alerts, which trains people to ignore the rule
C. Baselines determine how long alert history is retained
D. Intune requires a baseline before an alert rule can be enabled

<details><summary>Answer</summary>

**B** — Alerting is only useful if firing means something. A threshold below normal variation fires constantly, gets muted, and leaves everyone believing they are monitored when they are not. The baseline is what makes a threshold meaningful.

*Exam tip:* *Establishing operational baselines* is named in the exam objective alongside monitoring tenant health. The two go together for exactly this reason.

</details>

**Q2.** Every iOS and macOS device stops checking in on the same morning. Where should you look first?

A. Tenant status service health, and the Apple MDM push certificate expiry date
B. The device configuration profile status for iOS
C. The compliance policy assignments for Apple devices
D. The Conditional Access sign-in logs

<details><summary>Answer</summary>

**A** — A simultaneous, platform-wide failure is characteristic of a service incident or an expired credential, not of a policy change. The Apple MDM push certificate expires annually and takes the whole Apple estate with it.

*Exam tip:* Simultaneous and platform-wide points at infrastructure — service health, certificates and tokens. Gradual and partial points at policy.

</details>

---

## Lab 57: Security Copilot agents in Intune

**Access:** Walkthrough — licence not included in Microsoft 365 E5 · **Estimated time:** 30 minutes · **Difficulty:** intermediate

> [!IMPORTANT]
> Microsoft Security Copilot *is* now included with Microsoft 365 E5 — that changed in the April to June 2026 rollout, and study material written before then says otherwise. The catch is how the capacity is granted: 400 Security Compute Units per month for every 1,000 **paid** E5 seats, capped at 10,000. A 25-seat trial is not a paid allocation of that size, so a trial tenant receives no usable SCU grant and the agents cannot actually be run here. The objectives were added in the July 2026 outline revision, so this lab covers what the agents do, what they produce and how you are expected to act on their output.

### Lab scenario

The newest exam domain includes three objectives about Security Copilot agents in Intune: investigating threats they identify, analysing device performance with them, and reviewing and responding to their recommendations. The framing throughout is that the agent proposes and the administrator decides — which is exactly what the exam tests.

### Objectives

After completing this lab, you will be able to:

- Describe what Security Copilot agents in Intune do and what they require
- Explain how an agent-identified threat is investigated
- Describe agent-driven device performance analysis
- State the correct posture towards an agent recommendation

### Exam objectives covered

- `g5.t1.s2` — Investigate threats identified by Security Copilot agents in Intune
- `g5.t1.s3` — Analyze device performance by using Security Copilot agents in Intune
- `g5.t1.s4` — Review and respond to Security Copilot agent recommendations to make management decisions

### Prerequisites

- Completed labs: `defender-for-endpoint`, `endpoint-analytics`
- Licences: M365-E5, SECURITY-COPILOT
- Roles: Intune Administrator, Security Administrator
- Devices and portals: Microsoft Intune admin center
- Personas: admin-security

### Exercise 1: What the agents are

#### Task 1: Understand the requirements and the model

1. Security Copilot is a separate product that surfaces inside Intune, not a feature of Intune.

   | Requirement | Detail |
   | --- | --- |
   | Licence | Microsoft Security Copilot, billed by provisioned **Security Compute Units** — hourly, not per user |
   | Not included in | Microsoft 365 E5, Intune Plan 2, or the Intune Suite |
   | Data sources | Intune, Defender for Endpoint, Defender XDR, Entra ID |
   | Where it appears | Embedded in the Intune admin center, and in the standalone Security Copilot portal |
   | Permissions | The agent acts within the permissions of the administrator using it |

   > [!IMPORTANT]
   > The agent operates inside **your** permissions. It cannot see or do anything the signed-in administrator could not — so an operator scoped by scope tags gets agent output scoped the same way. This matters for the exam: agents do not bypass RBAC, and delegating to an agent does not delegate authority.

2. Note the recurring design principle across all three exam objectives:

   > [!IMPORTANT]
   > Every objective is phrased around the administrator retaining the decision — *investigate* threats identified, *analyse* performance, *review and respond to* recommendations. The agent surfaces, correlates and proposes. It does not act. Any exam answer implying an agent autonomously changes configuration is wrong, and any answer implying you should apply a recommendation without evaluating it is also wrong.

**Results:** You can state what Security Copilot requires and where the decision authority sits.

- [ ] You can name the billing unit.
- [ ] You can state whether an agent can exceed the administrator's permissions.

### Exercise 2: The three objectives

#### Task 1: Investigate threats identified by an agent

1. The value is correlation. An agent joins signals that sit in separate portals and would otherwise be separate investigations.

   | Step | What happens |
   | --- | --- |
   | Surface | The agent flags a device or pattern — an unusual configuration change, a device deviating from its peers, a policy weakening protection |
   | Explain | It produces a natural-language summary of what it found and why it considers it significant |
   | Evidence | It links the underlying data — the device, the policy, the Defender alert, the sign-in |
   | **Verify** | **You** follow the evidence and confirm it independently |
   | Act | You take the action, using the ordinary Intune and Defender controls from earlier modules |

   > [!TIP]
   > Always follow the evidence links rather than accepting the summary. The summary is a hypothesis built from correlated data; the evidence is the data. An investigation that stops at the summary is an investigation you cannot defend.

**Results:** You can describe the investigation flow and where verification sits in it.

- [ ] You can name the step that remains the administrator's.

#### Task 2: Analyse device performance and respond to recommendations

1. For performance, the agent works over the Endpoint Analytics data from lab 54:

   | Question you ask | What the agent does |
   | --- | --- |
   | Why is this device slow? | Correlates startup, resource, reliability and configuration data into one explanation |
   | Which devices are degrading? | Identifies devices trending worse against their own history or their peers |
   | What would improve the score most? | Ranks contributing factors by measured impact |
   | Is this device unusual? | Compares against similar devices to separate a fault from normal variation |

   > [!NOTE]
   > This is the same data you read manually in lab 54. The agent's contribution is the correlation and the ranking — turning several reports you would read separately into one prioritised answer. Knowing that the underlying data is Endpoint Analytics is worth more than knowing the prompt.

2. For recommendations, adopt this posture:

   | Step | What you do |
   | --- | --- |
   | Read the reasoning | Understand *why* the change is proposed, not just what it is |
   | Check the evidence | Follow the links and confirm the data supports the conclusion |
   | Assess the impact | Which devices and users does this affect, and what could it break? |
   | **Pilot** | Apply to a pilot group first, exactly as with any other change |
   | Verify | Confirm the intended effect and the absence of unintended ones |
   | Record | Note why the change was made, so it is explicable in six months |

   > [!IMPORTANT]
   > An agent recommendation is a well-informed suggestion from something that cannot see your business context. It does not know that one policy exists because of a regulator, or that a machine behaves oddly because it drives a laboratory instrument. Treat it exactly as you would a recommendation from a competent colleague who has read all your telemetry and none of your history.

3. Note the related capability the exam may reference:

   > [!NOTE]
   > Microsoft also ships more specialised agents in this family, such as a vulnerability remediation agent that proposes fixes for findings from Defender Vulnerability Management. The same principle governs all of them: the agent proposes a change and an administrator approves it.

**Results:** You can describe agent-driven performance analysis and the correct response to a recommendation.

- [ ] You can name the data source behind performance analysis.
- [ ] You can list the steps before applying a recommendation.

### Knowledge check

**Q1.** A Security Copilot agent in Intune recommends tightening a configuration policy across all devices. What is the appropriate response?

A. Forward it to Microsoft support for validation
B. Apply the recommendation immediately, since it is based on tenant telemetry
C. Dismiss it, because agent recommendations are advisory only
D. Review the reasoning and evidence, assess the impact, then pilot the change before deploying it broadly

<details><summary>Answer</summary>

**D** — Agents surface and propose; administrators decide. A recommendation is evaluated on its reasoning and evidence, assessed for impact, and then piloted like any other change — the agent has no knowledge of business context, regulatory constraints or local exceptions.

*Exam tip:* Every Security Copilot objective is phrased around the administrator retaining the decision. Answers describing autonomous action, or uncritical application, are both wrong.

</details>

**Q2.** What licensing is required to use Security Copilot agents in Intune?

A. Microsoft Security Copilot, billed by provisioned Security Compute Units, purchased separately
B. Microsoft Intune Suite
C. Microsoft 365 E5, which includes Security Copilot
D. Microsoft Defender for Endpoint Plan 2

<details><summary>Answer</summary>

**A** — Security Copilot is a separate product billed by provisioned Security Compute Units on an hourly basis. It is not included in Microsoft 365 E5, the Intune Suite, or Defender for Endpoint.

*Exam tip:* SCU-based hourly billing rather than per-user licensing is the distinguishing detail, and it is why Security Copilot cannot be trialled from inside a tenant the way Intune add-ons can.

</details>

---

# Module 11 — Advanced endpoint capabilities

The capabilities the exam still calls Intune Suite add-ons, every one of which Microsoft 365 E5 has included since the July 2026 packaging change: Endpoint Privilege Management, Remote Help, the Enterprise App Catalog and Advanced Analytics. Each removes friction you hit earlier in the course. Cloud PKI belongs to this group too and is used in lab 27, where certificates are taught.

## Lab 58: Endpoint Privilege Management

**Access:** Hands-on · **Estimated time:** 55 minutes · **Difficulty:** advanced

### Lab scenario

Autopilot correctly made every user a standard user in lab 17. Then the engineering team needed to install a driver, and the answer *raise a ticket every time* is not one anyone accepts for long. Endpoint Privilege Management lets a specific application run elevated for a specific user without that user being a local administrator — which is the only way to hold the line on least privilege in practice. Since the July 2026 packaging change it is included with Microsoft 365 E5, so this is a lab you can actually run.

### Objectives

After completing this lab, you will be able to:

- Explain what EPM solves and why local administrator rights are the alternative
- Create the elevation settings policy and an elevation rules policy
- Distinguish automatic, user-confirmed and support-approved elevation
- Elevate an application as a standard user and see it recorded
- Read the managed and unmanaged elevation reports and use them to drive a rollout

### Exam objectives covered

- `g2.t3.s1` — Configure Endpoint Privilege Management including configuring elevation policies, monitoring elevated actions, and adjusting EPM settings

### Prerequisites

- Completed labs: `whfb-laps-local-groups`
- Licences: M365-E5, INTUNE-EPM
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: johanna.lorenz, adele.vance

### Exercise 1: The problem and the two policies

#### Task 1: Understand what EPM replaces

1. Without EPM there are three options, and all of them are bad.

   | Approach | Consequence |
   | --- | --- |
   | Make users local administrators | Any malware they run inherits full control of the device |
   | Add them temporarily to the local group | Nobody removes it; the estate drifts back to fully privileged |
   | Require a ticket for every elevation | Help desk load, user frustration, and shadow workarounds |
   | **Endpoint Privilege Management** | One application elevates, for one user, under a rule you wrote, with an audit trail |

   > [!IMPORTANT]
   > The key property is that elevation is scoped to the **application**, not to the user. A user granted elevation for a driver installer is not a local administrator and cannot elevate anything else. This is what makes least privilege survivable — it is the answer to the objection that standard users cannot get their work done.

2. EPM is configured with two policies, and both must exist:

   | Policy | Controls |
   | --- | --- |
   | **Elevation settings policy** | Whether EPM is on for the device, the default behaviour when no rule matches, and reporting scope |
   | **Elevation rules policy** | The individual rules: which file, validated how, elevated in what way |

   > [!WARNING]
   > Rules without a settings policy do nothing, because the client component is never enabled. This is the same two-part shape as Windows LAPS in lab 28, which needed a directory setting alongside its policy. When an EPM rules policy deploys successfully and nothing elevates, a missing settings policy is the first thing to check.

**Results:** You can explain what EPM solves and name both required policies.

- [ ] You can state what elevation is scoped to.
- [ ] You can name both policy types and what each controls.

#### Task 2: Learn the elevation types

1. The settings policy sets a default behaviour, and each rule can override it.

   | Elevation type | User experience | Use for |
   | --- | --- | --- |
   | **Automatic** | The application elevates silently, with no prompt | Trusted, signed, frequently needed applications — a known driver installer |
   | **User confirmed** | The user confirms, optionally re-authenticating or giving a business reason | **The usual choice.** Deliberate, audited, no help desk involvement |
   | **Support approved** | The request goes to an approver and the user waits | High-risk elevations that genuinely warrant a second person |
   | **Deny** | Elevation is refused outright | Explicitly blocking something users keep trying to elevate |

   > [!IMPORTANT]
   > **User confirmed** with a business-justification prompt is the default answer in most scenarios. It keeps the user working, creates a record of who elevated what and why, and adds no help desk load. **Automatic** removes the audit prompt and should be reserved for applications you have deliberately vetted. **Support approved** is the only type that involves another person, and it is examined as the answer for high-risk cases.

**Results:** You can choose an elevation type from a requirement.

- [ ] You can name the elevation type suited to most cases, and say why.

### Exercise 2: Deploy the policies

#### Task 1: Create the elevation settings policy

1. In the **Microsoft Intune admin center**, select **Endpoint security**, then **Endpoint Privilege Management**, then the **Policies** tab, then **Create Policy**.
   *Path:* **Endpoint security** > **Endpoint Privilege Management** > **Policies** > **Create Policy**

2. Choose the platform and profile:

   | Setting | Value |
   | --- | --- |
   | Platform | **Windows** |
   | Profile | **Elevation settings policy** |
   | Name | **EPM-Settings-Corporate** |

3. Configure the settings:

   | Setting | Value |
   | --- | --- |
   | Endpoint Privilege Management | **Enabled** |
   | Default elevation response | **Deny all requests** <br> Start denied. Elevation happens only where you have written a rule, which is the point. |
   | Send elevation data for reporting | **Diagnostic data and all endpoint elevations** <br> This is what populates the unmanaged elevations report that drives your rollout. |
   | Validate rules for all elevation requests | **Not configured** |

   > [!IMPORTANT]
   > **Send elevation data for reporting** set to *all endpoint elevations* is the setting that makes EPM useful before you have written a single rule. It records every elevation happening on the device, including ones no rule covers — which is exactly the list of rules you still need to write.

4. On **Assignments**, assign to `GRP-DEV-WIN-CORP`, then create the policy.

**Results:** The EPM client component is enabled and reporting, with elevation denied by default.

- [ ] `EPM-Settings-Corporate` is assigned to corporate Windows devices.
- [ ] The default elevation response is **Deny all requests**.

#### Task 2: Create an elevation rule

1. You need a file to write a rule against. On **MD102-VM1-Adele**, pick something that genuinely requires elevation — the registry editor is a convenient, obviously-privileged example:

   *Collect the details a rule needs*
   ```powershell
   $file = "C:\Windows\regedit.exe"
   Get-FileHash -Path $file -Algorithm SHA256 | Select-Object Hash
   (Get-Item $file).VersionInfo | Select-Object FileDescription, ProductVersion, CompanyName
   ```

   > [!TIP]
   > Record the SHA-256 hash. A rule can match on file name alone, but a hash or a publisher certificate is what stops someone dropping their own `regedit.exe` into a writable folder and having your rule elevate it for them.

2. Back in the **Microsoft Intune admin center**, select **Endpoint security** > **Endpoint Privilege Management** > the **Policies** tab > **Create Policy**:
   *Path:* **Endpoint security** > **Endpoint Privilege Management** > **Policies** > **Create Policy**

   | Setting | Value |
   | --- | --- |
   | Platform | **Windows** |
   | Profile | **Elevation rules policy** |

3. Add a rule and work through the wizard tabs:

   | Setting | Value |
   | --- | --- |
   | Rule name | **Registry Editor — user confirmed** |
   | Description | **Permits engineering to edit the registry without local administrator rights** |
   | Elevation type | **User confirmed** |
   | Validation | **Business justification** <br> The user must type a reason, which is recorded against the elevation. |
   | File name | **regedit.exe** |
   | File path | **C:\Windows** <br> Constrains where the file may run from. |
   | Signature source | **File hash** |
   | File hash | **The SHA-256 you collected above** |
   | Child process behavior | **Deny all** <br> See the warning below — this is the setting that matters most. |

   a. On the **Basics** tab, enter Name `EPM-Rules-Engineering`, then select **Next**.
   b. On the **Execution rules** tab, select **Add rule**, configure the elevation rule fields above, select **Save**, then select **Next**.
   c. On the **Scope tags** tab, leave **Default**, then select **Next**.
   d. On the **Assignments** tab, assign to `GRP-USR-ENGINEERING`, then select **Next**.
   e. On the **Review + create** tab, select **Create**.

   > [!CAUTION]
   > **Child process behaviour** is the setting attackers care about. An application permitted to elevate can spawn other processes, and if those inherit elevation the user has an elevated shell — full local administrator by another route. Set it to **Deny all**, or **Require rule** where the application genuinely must launch something else. Allowing all child processes converts a narrow, audited grant into a general one.

   > [!NOTE]
   > Note the asymmetry: the settings policy targets **devices**, because it enables a client component. The rules policy targets **users**, because elevation is a permission granted to a person. Getting these the wrong way round produces a policy that deploys and does nothing.

**Results:** A narrowly scoped elevation rule is deployed to the engineering group.

- [ ] `EPM-Rules-Engineering` is assigned to a user group.
- [ ] The rule validates by file hash and denies child processes.

### Exercise 3: Elevate, and read the reports

#### Task 1: Elevate as a standard user

1. On **MD102-VM1-Adele**, sign in as `johanna.lorenz@<tenant>.onmicrosoft.com` and sync policy.

   > [!NOTE]
   > Johanna must be a standard user for this to prove anything. Confirm with `net localgroup Administrators` — if she is a member, the elevation will succeed for the wrong reason and the rule is never exercised.

2. Confirm the EPM client component arrived:

   ```powershell
   Get-Service EpmService -ErrorAction SilentlyContinue | Select-Object Name, Status, StartType
   Get-ChildItem "C:\Program Files\Microsoft EPM Agent" -ErrorAction SilentlyContinue | Select-Object -First 3 Name
   ```

   **Verify:** The EPM agent is present and its service is running. If it is absent, the settings policy has not reached the device — check the device status on `EPM-Settings-Corporate` before going further.

3. Now use the rule. Right-click `regedit.exe` in `C:\Windows` and select **Run with elevated access**.

   > [!IMPORTANT]
   > **Run with elevated access** is a new context-menu entry added by the EPM agent. It is distinct from **Run as administrator**, which still demands administrator credentials Johanna does not have. If the entry is missing, the agent is not installed.

4. Enter a business justification when prompted and confirm.

   **Verify:** Registry Editor opens with full privileges, without Johanna supplying any administrator credentials and without her being a local administrator.

5. Prove the boundary holds. Try to elevate something the rule does not cover — `cmd.exe`, for example.

   **Verify:** Elevation is refused, because the settings policy default is **Deny all requests** and no rule matches. This is the difference between EPM and local administrator rights, demonstrated on a real device.

**Results:** A standard user elevated one specific application and nothing else.

- [ ] Registry Editor ran elevated with no administrator credentials.
- [ ] An application with no matching rule was refused.
- [ ] Johanna is still not a member of the local Administrators group.

#### Task 2: Read the elevation reports

1. In the portal, select **Endpoint security**, **Endpoint Privilege Management**, then the **Reports** tab.
   *Path:* **Endpoint security** > **Endpoint Privilege Management** > **Reports**

   | Report | Answers |
   | --- | --- |
   | Elevation report | Every elevation: which file, which user, which device, which rule, when |
   | **Managed elevations** | Elevations that matched one of your rules — the intended path |
   | **Unmanaged elevations** | Elevations that happened outside your rules — **the interesting one** |
   | Elevation requests | Pending and completed support-approved requests |

2. Open **Managed elevations** and find your test.

   **Verify:** The elevation is listed with Johanna's account, the device, the file, the rule that matched and the business justification she typed. That justification string is the audit trail local administrator rights never gave you.

3. Open **Unmanaged elevations**.

   > [!TIP]
   > This is the report that drives a real rollout. It shows what users are elevating that you have not written a rule for — which is your backlog. It is also occasionally your evidence that someone still holds local administrator rights they should not, because those elevations appear here having bypassed EPM entirely.

4. Note the rollout sequence, which mirrors the audit-first pattern from attack surface reduction and App Control:

   a. Deploy the settings policy with the default set to **Deny** and reporting on — as you did in exercise 2.
   b. Collect unmanaged elevation data for a few weeks to learn what people genuinely need.
   c. Write rules for the legitimate cases, mostly user-confirmed.
   d. Remove local administrator rights, using the local group membership policy from lab 28.
   e. Keep watching unmanaged elevations for what you missed.

   > [!IMPORTANT]
   > Step 4 is the point of the whole exercise. EPM has no value while users are still local administrators — they never trigger a rule, and the reports stay empty of anything useful. The sequence matters: collect evidence, write rules, *then* remove the rights.

**Results:** Every elevation is recorded, and you know which report tells you what rules you are still missing.

- [ ] Your test elevation appears under **Managed elevations** with its justification.
- [ ] You can name the report that reveals missing rules.
- [ ] You can state why removing administrator rights comes after writing rules.

### Troubleshooting

**Symptom:** An elevation rules policy is deployed but no applications elevate, and the Run with elevated access menu entry is missing.

- **Root cause:** No elevation settings policy is deployed to the device, so the EPM client component was never installed. Rules alone deploy successfully and do nothing.
- **Diagnostic:**

  ```powershell
  Get-Service EpmService -ErrorAction SilentlyContinue | Select-Object Name, Status
  Get-ChildItem "C:\Program Files\Microsoft EPM Agent" -ErrorAction SilentlyContinue
  ```

- **Resolution:** Deploy an elevation settings policy to the **device** group with Endpoint Privilege Management set to Enabled, then sync. The agent installs on the next check-in.

**Symptom:** Elevation succeeds for a user who should not have it, and the elevation does not appear in the managed elevations report.

- **Root cause:** The user is already a local administrator, so Windows elevated through the normal path and EPM was never consulted.
- **Diagnostic:**

  ```powershell
  net localgroup Administrators
  whoami /groups | Select-String "S-1-5-32-544"
  ```

- **Resolution:** Remove the user from the local Administrators group using the Local Users and Groups policy from lab 28. Until administrator rights are gone, EPM rules are never exercised.

### Knowledge check

**Q1.** Contoso removes local administrator rights from all users. Engineers must still install a specific approved driver utility. Which Endpoint Privilege Management elevation type best balances productivity and audit?

A. Deny, and handle each case through a ticket
B. Automatic elevation with no prompt
C. Support approved elevation requiring help desk authorisation
D. User confirmed, with a business justification prompt

<details><summary>Answer</summary>

**D** — User confirmed lets the engineer work immediately while recording who elevated what and why. Automatic removes the audit prompt entirely, and support approved adds help desk load that a routine, approved utility does not warrant.

*Exam tip:* User confirmed is the default answer for routine elevation. Reserve automatic for vetted applications and support approved for genuinely high-risk actions.

</details>

**Q2.** An Endpoint Privilege Management elevation rules policy is deployed but no applications elevate. What is the most likely cause?

A. The rules use file hash validation instead of certificate validation
B. The rules policy was assigned to a user group rather than a device group
C. Child process behaviour is set to Deny all
D. No elevation settings policy is deployed, so the client component is not enabled

<details><summary>Answer</summary>

**D** — EPM requires both policies. The elevation settings policy enables the client component and sets default behaviour; rules alone deploy successfully and do nothing without it. Rules policies are correctly assigned to user groups.

*Exam tip:* This two-part pattern recurs across Intune — LAPS needs a directory setting plus a policy, EPM needs settings plus rules. When a policy deploys and nothing happens, look for the missing half.

</details>

**Q3.** You create an EPM rule permitting an installer to elevate, and set child process behaviour to Allow all. What risk does this introduce?

A. The rule will be ignored because child process behaviour must be configured
B. The rule will apply to every application on the device
C. The elevation will not be recorded in the managed elevations report
D. The elevated application can spawn a command prompt that inherits elevation, giving the user full local administrator access

<details><summary>Answer</summary>

**D** — Child processes inheriting elevation turns a narrow, audited grant into a general one. Anything the elevated application can launch — including a shell — runs with the same privileges.

*Exam tip:* Deny all is the safe default, with Require rule where an application genuinely needs to launch something else. This setting is what keeps EPM scoped to the application rather than to the session.

</details>

---

## Lab 59: Remote Help, Enterprise App Catalog, Advanced Analytics and Tunnel for MAM

**Access:** Hands-on · **Estimated time:** 55 minutes · **Difficulty:** intermediate

### Lab scenario

Four capabilities that each remove friction you have already met in this course: helping a user you cannot see, packaging applications you would rather not package, finding the device that is quietly degrading, and giving unmanaged devices access to internal services. All four arrived in Microsoft 365 E5 with the July 2026 packaging change, so three of them you will configure and use here. The fourth, Tunnel for MAM, is licensed but needs a Linux gateway you would have to host — so it stays a walkthrough within an otherwise hands-on lab.

### Objectives

After completing this lab, you will be able to:

- Configure and use Microsoft Intune Remote Help
- Deploy an application from the Enterprise App Catalog and compare it with hand packaging
- Use Advanced Analytics: multi-device query, anomaly detection and the device timeline
- Describe Microsoft Tunnel for Mobile Application Management and what hosting it requires

### Exam objectives covered

- `g2.t3.s2` — Manage applications by using the Enterprise App Catalog
- `g2.t3.s3` — Configure Microsoft Intune Remote Help
- `g2.t3.s5` — Implement Microsoft Tunnel for Mobile Application Management, including configuring Tunnel Gateway, extending support to MAM devices, and monitoring tunnel connections
- `g2.t3.s6` — Implement Microsoft Intune Advanced Analytics, including anomaly detection, proactive insights, and risk-based policy recommendations

### Prerequisites

- Completed labs: `endpoint-privilege-management`, `win32-packaging`, `endpoint-analytics`
- Licences: M365-E5, INTUNE-REMOTE-HELP, INTUNE-ENTERPRISE-APP-MGMT, INTUNE-ADV-ANALYTICS, INTUNE-P2
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm1-adele (Windows 11)
- Personas: adele.vance, helpdesk.operator

### Exercise 1: Remote Help

#### Task 1: Enable Remote Help and deploy the app

1. In the **Microsoft Intune admin center**, select **Tenant administration**, then **Remote Help**.
   *Path:* **Tenant administration** > **Remote Help**

2. On the **Settings** tab, configure:

   | Setting | Value |
   | --- | --- |
   | Enable Remote Help | **Yes** |
   | Allow Remote Help to unenrolled devices | **Yes** <br> Useful precisely when a user most needs help — before enrollment has succeeded. |
   | Disable chat | **No** |

3. Deploy the Remote Help application to devices. Select **Apps** > **All apps** > **Add** > **Windows app (Win32)**, or use the Enterprise App Catalog entry you will meet in the next exercise.
   *Path:* **Apps** > **All apps** > **Add**

   > [!TIP]
   > Remote Help is itself in the Enterprise App Catalog, so the quickest route is **Add** > **Enterprise App Catalog app** and search for it. That saves packaging it by hand and is a neat demonstration of why the catalogue exists.

4. Assign the app as **Required** to `GRP-DEV-WIN-CORP`.

5. Confirm the permissions model, because this is what makes Remote Help enterprise-grade:

   | Permission | Grants |
   | --- | --- |
   | Remote Help app — Take full control | Full remote control of the session |
   | Remote Help app — View screen | View only, no input |
   | Remote Help app — Elevation | The ability to approve a UAC prompt during the session |

   > [!NOTE]
   > These are Intune RBAC permissions from lab 7, so a Help Desk Operator can be granted view-only while a senior engineer gets full control. Elevation is deliberately separate — approving a UAC prompt on someone else's device is a bigger grant than seeing their screen.

**Results:** Remote Help is enabled and the application is deploying to corporate devices.

- [ ] **Remote Help** shows as enabled under **Tenant administration**.
- [ ] The Remote Help app is assigned as Required.

#### Task 2: Run a session

1. On **MD102-VM1-Adele**, sync policy and wait for the Remote Help application to install, then open it and sign in as Adele.

2. From your admin machine, open Remote Help and sign in as `admin-intune@<tenant>.onmicrosoft.com`, then request a session with Adele's device.

   > [!IMPORTANT]
   > Watch what both sides are shown before the session starts. The helper sees the verified organisational identity of the person they are connecting to, and the user sees the helper's verified identity — not a name someone typed. That mutual verification is the defence against the support-desk impersonation call, and it is what distinguishes Remote Help from a generic remote-control tool.

3. Accept on Adele's side, then request full control and accept again.

   **Verify:** The session connects. Note that full control required a **second** explicit consent — viewing and controlling are separate grants.

4. End the session, then check the audit trail under **Tenant administration** > **Remote Help** > **Monitor**.
   *Path:* **Tenant administration** > **Remote Help** > **Monitor**

   **Verify:** The session is logged with both participants, the device and the duration.

**Results:** You have run an audited remote session with verified identity on both sides.

- [ ] A session completed and appears in the Remote Help monitor.
- [ ] Full control required a separate consent from view-only.

### Exercise 2: Enterprise App Catalog

#### Task 1: Deploy a catalogue app and compare it with lab 33

1. Select **Apps**, **All apps**, **Add**, then app type **Enterprise App Catalog app**.
   *Path:* **Apps** > **All apps** > **Add**

2. Select **Search the Enterprise App Catalog**, find a common application — 7-Zip, Notepad++ or Google Chrome are all present — and select it.

3. Work through the wizard and pay attention to what you are *not* asked for:

   | Step | Lab 33 — hand packaged | Enterprise App Catalog |
   | --- | --- | --- |
   | Obtain the installer | You download it | Microsoft hosts it |
   | Package it | You run IntuneWinAppUtil | Already packaged |
   | Install and uninstall commands | You determine them | **Supplied** |
   | Detection rules | **You write them** | **Supplied and validated** |
   | Requirement rules | You set them | Supplied, and editable |
   | Updates | You repackage each version | New versions appear in the catalogue with supersedence |

   > [!IMPORTANT]
   > The detection rules are the real value. Lab 33 showed that `0x87D1041C` — a correct installation reported as failed — is the most common Win32 problem, and it comes almost entirely from writing detection rules by hand. Catalogue applications arrive with rules Microsoft has already validated, which removes that whole class of failure along with the repackaging treadmill.

4. Assign as **Available for enrolled devices** to `GRP-USR-PILOT`, then create the app.

5. In **Apps** > **All apps**, select the created application from the list, select **Properties**, and inspect its **Detection rules**.
   *Path:* **Apps** > **All apps** > **Properties**

   **Verify:** Detection rules are pre-populated and correct for the packaged version. Compare with the rule you wrote by hand in lab 33 — and with the one you deliberately broke to produce `0x87D1041C`.

6. Note where the catalogue does not help:

   > [!NOTE]
   > The catalogue covers widely used third-party software. Your own line-of-business application will never be in it, so lab 33's packaging skills remain necessary — the catalogue removes the tedious 80 percent, not the difficult 20 percent.

**Results:** An application is deployed with supplied, validated detection rules.

- [ ] A catalogue app exists with pre-populated detection rules.
- [ ] You can state which Win32 error class the catalogue eliminates.

### Exercise 3: Advanced Analytics

#### Task 1: Use multi-device query, anomaly detection and the device timeline

1. Lab 51 ran a KQL query against a single device. Now run one across many. Select **Reports**, **Endpoint analytics**, then **Device query**.
   *Path:* **Reports** > **Endpoint analytics** > **Device query**

2. Run a query across your whole estate:

   *Which devices have a given application, and at what version?*
   ```kusto
   Application
   | where displayName contains "7-Zip"
   | project deviceName, displayName, version, publisher
   | sort by version asc
   ```

   **Verify:** Results return for every device that matches, not just one. This is the vulnerability-response scenario from lab 51 answered properly — that lab could only ask one device at a time.

3. Open **Reports** > **Endpoint analytics** > **Anomalies**.
   *Path:* **Reports** > **Endpoint analytics** > **Anomalies**

   | Column | Meaning |
   | --- | --- |
   | Anomaly | What is behaving unusually — a crash pattern, a startup regression, a driver fault |
   | Devices impacted | How many, and which |
   | Anomaly details | The correlated signals behind the detection |
   | First detected | When the behaviour diverged from the baseline |

   > [!NOTE]
   > With two virtual machines you will likely see nothing here, and that is the correct result — anomaly detection compares devices against their peers and needs a population to compare within. The mechanism is what matters: it finds the device you would not have thought to look at.

4. Under **Devices** > **All devices**, select a device from the list, then select **Device timeline** under **Monitor**.
   *Path:* **Devices** > **All devices** > **Device timeline**

   **Verify:** A chronological history appears: policy applications, application installs, restarts, crashes and driver events.

   > [!IMPORTANT]
   > The timeline is the capability that changes daily work. Endpoint Analytics in lab 54 told you a device was slow; the timeline tells you it became slow on the fourteenth, two hours after a configuration profile applied. That is the difference between a symptom and a cause, and it is why the exam objective names it alongside anomaly detection.

**Results:** You can query the estate, spot outliers and reconstruct what happened to a device.

- [ ] A multi-device query returned results from more than one device.
- [ ] The device timeline shows a chronological event history.

### Exercise 4: Microsoft Tunnel for Mobile Application Management

The licence is included, but this is the one capability in the module you cannot simply switch on — it needs infrastructure you would have to host.

#### Task 1: Understand what Tunnel for MAM requires

1. Lab 27 configured per-app VPN for enrolled devices. Tunnel for MAM extends that to devices that are not enrolled at all.

   | Component | Role | Who provides it |
   | --- | --- | --- |
   | Tunnel Gateway | A Linux container terminating the VPN | **You host it** — on-premises or in a cloud |
   | Server configuration | IP ranges, DNS servers, split-tunnelling rules | You configure it in Intune |
   | Site | A logical grouping of gateway servers | You define it in Intune |
   | App configuration policy | Points Microsoft Edge or a managed app at the tunnel | Intune, as in lab 37 |
   | App protection policy | Protects the corporate data reached through it | Intune, as in lab 36 |

   > [!IMPORTANT]
   > The scenario is Joni from lab 36 — a personally owned, unenrolled device that must reach an internal line-of-business web application. A device-wide VPN would require enrollment. Tunnel for MAM puts the tunnel inside the managed application instead, so only that application reaches the internal network and personal traffic never does.

2. Understand why this exercise stops here:

   > [!WARNING]
   > Tunnel Gateway is infrastructure **you** run: a Linux host, a container runtime, a TLS certificate to renew, and patching. Unlike the other three capabilities in this lab, the licence being included is not the end of the work — there is nothing to click until a gateway exists. That is also why *monitoring tunnel connections and server health* appears in the exam objective.

3. Note the configuration path so you recognise it: in the **Microsoft Intune admin center**, select **Tenant administration**, then **Microsoft Tunnel Gateway**.
   *Path:* **Tenant administration** > **Microsoft Tunnel Gateway**

   a. Create a **Server configuration** defining IP ranges, DNS and split tunnelling.
   b. Create a **Site** and associate the server configuration with it.
   c. Install the Tunnel Gateway software on a supported Linux server using the generated script.
   d. Create an **app configuration policy** pointing the managed app at the tunnel.
   e. Monitor server health and connection counts under the same blade.

**Results:** You can describe Tunnel for MAM's components and state what it requires beyond a licence.

- [ ] You can name the component you must host yourself.
- [ ] You can explain why a device-wide VPN is not the answer for unenrolled devices.

#### Task 2: Place the whole module in context

1. Review all six formerly-Suite capabilities against the problem each one removes.

   | Capability | Removes | Friction first met in |
   | --- | --- | --- |
   | Endpoint Privilege Management | Standard users blocked from occasional elevation | Lab 28, removing admin rights |
   | Remote Help | Supporting a user you cannot see | Lab 38, troubleshooting |
   | Enterprise App Catalog | Packaging and detection-rule effort | Lab 33, `0x87D1041C` |
   | Cloud PKI | Running a certification authority | Lab 27, where you now use it |
   | Tunnel for MAM | Unenrolled devices reaching internal services | Lab 36, BYOD app protection |
   | Advanced Analytics | Finding the cause rather than the symptom | Lab 54, Endpoint Analytics |

   > [!TIP]
   > Every one extends something you had already built and hit a wall with. That is not a coincidence — these capabilities are positioned as the answer to the friction a Plan 1 deployment reaches. Being able to name the friction each removes is better exam preparation than memorising configuration paths, because that is how the scenario questions are framed.

**Results:** You can pair each capability with the problem it solves.

- [ ] You can name the lab where each capability's need first became obvious.

### Troubleshooting

**Symptom:** Remote Help sessions cannot be started and the option is greyed out for a help desk operator.

- **Root cause:** The operator's Intune role does not include the Remote Help app permissions, or Remote Help is not enabled at tenant level.
- **Diagnostic:**

  ```text
  Tenant administration > Remote Help > Settings — confirm Enable Remote Help is Yes
  Signed in as the operator: Tenant administration > Roles > My permissions — look for Remote Help app
  ```

- **Resolution:** Grant the appropriate Remote Help app permission on the operator's role — view screen, take full control and elevation are separate grants, so a role can permit viewing without control.

**Symptom:** Multi-device query returns results for only one device, or the Device query blade under Endpoint analytics is missing.

- **Root cause:** Advanced Analytics has not finished provisioning, or the data collection policy from lab 54 does not target the devices you are querying.
- **Diagnostic:**

  ```text
  Reports > Endpoint analytics > Settings — confirm the data collection policy scope
  Tenant administration > Intune add-ons — confirm Advanced Analytics shows as Active
  ```

- **Resolution:** Confirm Advanced Analytics is active on the tenant and that the devices are in scope for Endpoint Analytics data collection. Devices excluded from data collection cannot be queried across.

### Knowledge check

**Q1.** A user on a personally owned, unenrolled device needs access to an internal line-of-business web application. Which capability provides this without enrolling the device?

A. Microsoft Cloud PKI
B. A device-wide VPN profile
C. Remote Help
D. Microsoft Tunnel for Mobile Application Management

<details><summary>Answer</summary>

**D** — Tunnel for MAM places the VPN inside the managed application, so an unenrolled device can reach internal resources through that application only. A device-wide VPN profile requires enrollment.

*Exam tip:* Unenrolled plus internal resource access equals Tunnel for MAM. Remember that the licence alone is not enough — you must also host the Tunnel Gateway yourself.

</details>

**Q2.** Which Intune Advanced Analytics capability helps determine the root cause of a device that recently began performing poorly?

A. The Endpoint analytics score
B. Anomaly detection
C. Multi-device query
D. Device timeline, showing a chronological history of events on that device

<details><summary>Answer</summary>

**D** — Device timeline shows policy changes, application installs, restarts and crashes in order, letting you correlate the onset of a problem with what changed. Anomaly detection identifies that a device is unusual; the timeline explains when and why.

*Exam tip:* Anomaly detection finds the device; device timeline finds the cause; multi-device query answers a specific question across many devices.

</details>

**Q3.** What is the principal advantage of deploying an application from the Enterprise App Catalog rather than packaging it as a Win32 app by hand?

A. Install commands and validated detection rules are supplied, removing the most common cause of 0x87D1041C
B. Catalogue applications install without requiring the Intune Management Extension
C. Catalogue applications do not require a licence to deploy
D. Catalogue applications bypass assignment intents and install on all devices

<details><summary>Answer</summary>

**A** — The catalogue supplies packaging, install and uninstall commands, requirement rules and — most valuably — detection rules Microsoft has validated. Hand-written detection rules are the dominant cause of an application installing correctly but reporting as failed.

*Exam tip:* The catalogue covers common third-party software only. Your own line-of-business applications still need the packaging skills from lab 33.

</details>

---

# Module 12 — Capstone and exam readiness

Rebuild the whole estate from a clean tenant against a deadline with faults injected, then close your remaining gaps with a domain-weighted timed practice run.

## Lab 60: Capstone: rebuild the estate, then close your gaps

**Access:** Hands-on · **Estimated time:** 180 minutes · **Difficulty:** advanced

### Lab scenario

Contoso is opening a second office. You have one working day to bring twenty new starters and their devices into management, secured, compliant and productive — with no guide open in front of you. Three faults have been injected into the process and you are not told what they are. Then, once the estate is standing, you close the gaps the coverage view says you still have.

### Objectives

After completing this lab, you will be able to:

- Rebuild the essential estate configuration from memory against a deadline
- Diagnose three injected faults using only the tools and logs from earlier labs
- Identify your weakest exam domains from your own quiz results
- Produce a written revision plan grounded in evidence rather than impression

### Prerequisites

- Completed labs: `intune-suite-capabilities`, `remote-actions`, `tenant-health-and-alerts`
- Licences: M365-E5
- Roles: Intune Administrator
- Devices and portals: Microsoft Intune admin center, vm3-megan (Windows 11 at OOBE)
- Personas: staging.user01, megan.bowen

### Exercise 1: The build

Work from the requirements below, not from the earlier labs. Open a lab only when you are genuinely stuck — noticing which lab you had to open is itself a useful result.

#### Task 1: Deliver the requirements

1. Contoso Nord requires the following. Build it.

   | # | Requirement |
   | --- | --- |
   | 1 | A new user, `nord.starter01`, licensed through group-based licensing with the reserve intact |
   | 2 | A dynamic device group containing only corporate-owned Windows devices in the Nord office |
   | 3 | A Windows device provisioned with no hardware hash available, named `NORD-` plus five random digits |
   | 4 | The device a standard user, not a local administrator |
   | 5 | BitLocker encrypted silently, with the recovery key escrowed before encryption starts |
   | 6 | A compliance policy requiring encryption, Secure Boot, firewall and antivirus, with a 5-day grace period |
   | 7 | Conditional Access requiring a compliant device for Office 365, with the emergency account excluded |
   | 8 | Microsoft 365 Apps deployed on Monthly Enterprise Channel |
   | 9 | An update ring with 3-day quality and 14-day feature deferrals |
   | 10 | Attack surface reduction rules in audit mode, and Defender antivirus with tamper protection |
   | 11 | A proactive remediation that runs daily and reports its findings |
   | 12 | An alert rule for enrollment failures, notifying a shared address |

   > [!TIP]
   > Work in the order the course taught: identity, then enrollment, then provisioning, then configuration, then compliance and access, then applications, then protection, then operations. That order exists because each stage depends on the one before it, and rebuilding it from memory is the point of the exercise.

2. Record how long each stage takes. Anywhere you have to reopen a lab is a topic to revise.

**Results:** The estate is standing and meets all twelve requirements.

- [ ] A device provisioned itself, is compliant, encrypted and named to the template.
- [ ] A non-compliant device is refused access to Office 365.
- [ ] You have a written list of the labs you had to reopen.

### Exercise 2: The three faults

Introduce each fault, then diagnose it as though you did not know it was there. Work from symptom to cause using the logs and blades, not from the answer.

#### Task 1: Fault one: an application that installs and fails

1. Deploy any Win32 application, then change its detection rule to a path that does not exist. Assign it and let it run.

2. Diagnose from the symptom. Do not look at what you changed.

   a. Read the reported status and error code in the app's device install status.
   b. Confirm on the device whether the software is actually present.
   c. Find the evidence in the client logs and name the exact log file.
   d. State the root cause in one sentence, then fix it.

   **Verify:** You identified the error code, found the detection evaluation in the logs, and can name the log file from memory.

**Results:** Fault one diagnosed from symptom to root cause.

- [ ] You can state the error code and what it means.
- [ ] You named the correct log file without looking it up.

#### Task 2: Fault two: a user who cannot enrol

1. Remove `staging.user01` from the licensing group and wait for the licence to be revoked. Then attempt to enrol a device as that user.

2. Diagnose it:

   a. Record the error code the client reports.
   b. Use the Troubleshooting blade rather than guessing.
   c. Name the two other enrollment codes and what distinguishes them from this one.
   d. Fix it and confirm enrollment succeeds.

   **Verify:** You identified the code, found the cause in the Troubleshooting blade, and can distinguish it from the restriction and device-limit codes.

**Results:** Fault two diagnosed and the three enrollment codes distinguished.

- [ ] You can state all three enrollment error codes and their causes.

#### Task 3: Fault three: a setting that will not apply

1. Create a second configuration profile setting a value you have already configured elsewhere to the opposite value, and assign it to the same group.

2. Diagnose it:

   a. Find the status that identifies this class of problem.
   b. State what value the device ends up with, and why.
   c. Contrast this with how a compliance policy would resolve the same disagreement.
   d. Resolve it by deciding which profile owns the setting.

   **Verify:** You found the conflict in per-setting status, and can state the three different resolution models for configuration, compliance and enrollment restrictions.

**Results:** Fault three diagnosed and the three conflict-resolution models articulated.

- [ ] You can explain what a device does with a conflicting configuration setting.

### Exercise 3: Exam readiness

#### Task 1: Find your weak domains from evidence

1. Open the **Objective coverage** view in this site.

   > [!IMPORTANT]
   > The coverage view shows every skill bullet, which labs teach it, and your own quiz accuracy per bullet. That last column is the useful one — it is evidence about you rather than about the curriculum, and it is more reliable than your impression of which topics you know.

2. Work through it systematically:

   a. List every bullet where your quiz accuracy is below 100 percent.
   b. List every bullet you have not answered a question on at all.
   c. Note which exam group each falls in, and that group's weight.
   d. Order the list by group weight, heaviest first.

   | Exam group | Weight | Revise first if weak |
   | --- | --- | --- |
   | Manage and maintain devices | 25–30% | Highest priority — the largest single block of marks |
   | Prepare infrastructure for devices | 20–25% | Second |
   | Protect devices | 15–20% | Third |
   | Manage and secure applications | 15–20% | Third |
   | Optimize endpoint operations | 10–15% | Last, but do not skip — it is entirely new and often neglected |

3. Write a revision plan. One line per weak bullet: the bullet, the lab that teaches it, and what specifically you could not answer.

   > [!TIP]
   > Be specific. *Revise compliance* is not a plan. *g1.t3.s4 — I could not state how compliance conflicts resolve differently from configuration conflicts, lab 29* is a plan, because you will know when you have fixed it.

4. Take the official practice assessment cold, before revising, and compare its domain breakdown with your list.

   > [!NOTE]
   > Microsoft publishes a free practice assessment on the exam page. Taking it before you revise gives you an independent read on the same question, and where it disagrees with your own list, the disagreement is worth investigating — it usually means a topic you *think* you know.

**Results:** You have a written, evidence-based revision plan ordered by exam weight.

- [ ] Every weak bullet has a named lab and a specific gap.
- [ ] The list is ordered by exam group weight.
- [ ] You have compared it against the official practice assessment.

#### Task 2: Final recall check

1. Answer these from memory. Each one has caught people out somewhere in this course.

   | Question | Covered in |
   | --- | --- |
   | What distinguishes Entra registered, Entra joined and hybrid joined in `dsregcmd` output? | Lab 5 |
   | What are the three enrollment error codes and their causes? | Labs 11 and 15 |
   | When do you use Autopilot device preparation instead of a deployment profile? | Labs 16 and 19 |
   | How do configuration, compliance and enrollment restriction conflicts each resolve? | Labs 22, 29 and 11 |
   | What does `0x87D1041C` mean and what do you fix? | Lab 33 |
   | Which grant control serves unenrolled BYOD devices? | Labs 31 and 36 |
   | What two settings make BitLocker enable silently? | Lab 43 |
   | What is the exit-code contract for a proactive remediation detection script? | Lab 53 |
   | Which examined capabilities does Microsoft 365 E5 genuinely not license? | Labs 1, 21 and 57 |
   | Retire, wipe or selective wipe — for a departing employee's own phone? | Labs 36 and 50 |

   > [!IMPORTANT]
   > Any of these you cannot answer immediately is a gap, regardless of what your quiz scores say. Add it to the revision plan and reopen the lab — the labs are written to be re-read, and the troubleshooting section of each is the fastest refresher.

**Results:** You have a final, honest list of what you still need to learn.

- [ ] You answered every recall question or added it to the plan.
- [ ] Your revision plan is written down where you will actually use it.

### Troubleshooting

**Symptom:** During the capstone rebuild, the provisioned device receives no configuration profiles.

- **Root cause:** A group membership timing problem. The dynamic device group had not evaluated before the Enrollment Status Page checked, or the device preparation group is missing its service principal owner.
- **Diagnostic:**

  ```text
  Entra admin center > Groups > the device group > Members, and Owners
  Intune > Devices > Configuration > the profile > Device status
  ```

- **Resolution:** For device preparation, confirm **Intune Provisioning Client** owns the group and that the group is Assigned. For dynamic groups, remember evaluation is asynchronous — this is exactly what enrollment time grouping from lab 24 exists to solve.

### Knowledge check

**Q1.** You have finished this curriculum and your coverage view shows quiz accuracy below 100 percent across several bullets in three different exam groups. How should you prioritise revision?

A. In curriculum order, starting from lab 1
B. By difficulty, starting with the labs marked advanced
C. By the number of labs covering each bullet
D. By exam group weight, revising the heaviest weighted groups first

<details><summary>Answer</summary>

**D** — Exam marks are distributed by group weight, so a gap in a 25–30% group costs more than an equivalent gap in a 10–15% one. Curriculum order optimises for building a tenant, not for passing an exam.

*Exam tip:* Manage and maintain devices is the heaviest group at 25–30%. Optimize endpoint operations is the lightest, but it is entirely new to this outline and is the group candidates most often neglect.

</details>

---
