/**
 * MD-102: Endpoint Administrator Master Study Guide & Lab Dataset
 * Production-grade dataset containing all 22+ labs, checklists, scripts,
 * failure injection scenarios, diagnostic toolkits, and MD-102 practice quizzes.
 */

const EXAM_DOMAINS = [
  {
    id: "domain-1",
    name: "Domain 1: Deploy Windows Client",
    weight: "25–30%",
    description: "Prepare infrastructure, configure Autopilot, deploy Windows 11 editions, and configure device enrollment restrictions.",
    color: "cyan"
  },
  {
    id: "domain-2",
    name: "Domain 2: Manage Identity and Access",
    weight: "10–15%",
    description: "Manage Entra ID device identities, RBAC, scope tags, Administrative Units, Windows Hello for Business, and Cloud LAPS.",
    color: "purple"
  },
  {
    id: "domain-3",
    name: "Domain 3: Manage Compliance and Device Policies",
    weight: "45–50%",
    description: "Build Settings Catalog profiles, Custom Compliance (PowerShell + JSON), Conditional Access Zero Trust, PKI/SCEP, and GPO migration.",
    color: "green"
  },
  {
    id: "domain-4",
    name: "Domain 4: Manage and Protect Devices",
    weight: "15–20%",
    description: "Package Win32 apps, MAM App Protection, Defender for Endpoint (EDR/ASR), BitLocker, EPM, WUfB rings, and Graph SDK automation.",
    color: "orange"
  }
];

const VM_INFRASTRUCTURE = [
  {
    name: "Corporate VM 1 (IT / Adele)",
    persona: "adele.vance@<tenant>.onmicrosoft.com",
    gen: "Generation 2 (UEFI)",
    vtpm: "Enabled (TPM 2.0)",
    secureBoot: "Enabled (Microsoft Windows)",
    specs: "2 vCPU / 4096 MB RAM Dynamic",
    disk: "80 GB VHDX (Thin)",
    os: "Windows 11 Pro 23H2/24H2",
    network: "Default Switch (NAT)",
    purpose: "Subscription Activation (Pro -> Enterprise), Update Ring 0, EPM elevation testing."
  },
  {
    name: "Corporate VM 2 (Finance / Alex)",
    persona: "alex.wilber@<tenant>.onmicrosoft.com",
    gen: "Generation 2 (UEFI)",
    vtpm: "Enabled (TPM 2.0)",
    secureBoot: "Enabled (Microsoft Windows)",
    specs: "2 vCPU / 4096 MB RAM Dynamic",
    disk: "80 GB VHDX (Thin)",
    os: "Windows 11 Pro 23H2/24H2",
    network: "Default Switch (NAT)",
    purpose: "Autopilot Classic, BitLocker 256-bit escrow, Cloud LAPS, Custom Compliance, Zero Trust CA test."
  },
  {
    name: "Autopilot VM 3 (HR / Megan)",
    persona: "megan.bowen@<tenant>.onmicrosoft.com",
    gen: "Generation 2 (UEFI)",
    vtpm: "Enabled (TPM 2.0)",
    secureBoot: "Enabled (Microsoft Windows)",
    specs: "2 vCPU / 4096 MB RAM Dynamic",
    disk: "80 GB VHDX (Thin)",
    os: "Windows 11 Pro 23H2/24H2 (Clean/Un-hashed)",
    network: "Default Switch (NAT)",
    purpose: "Autopilot Device Preparation (v2) testing without hardware hash upload."
  },
  {
    name: "Android Studio AVD Emulator (Diego)",
    persona: "diego.s@<tenant>.onmicrosoft.com",
    gen: "Android Virtual Device (AVD)",
    vtpm: "N/A",
    secureBoot: "N/A",
    specs: "Pixel 7 Hardware Profile / 4096 MB",
    disk: "32 GB Internal Storage",
    os: "Android 14.0 (UpsideDownCake - API 34 with Google Play)",
    network: "Android Emulator Bridge (NAT)",
    purpose: "100% Free Android Enterprise Personally-Owned Work Profile & Dedicated Kiosk testing."
  }
];

const PHASES = [
  { id: "phase-1", number: 1, name: "Tenant and Identity Foundation", description: "Establish tenant security, RBAC scope tags, GBL budget, and Subscription Activation." },
  { id: "phase-2", number: 2, name: "Device Enrollment & Identity Lifecycle", description: "Dissect device identities with dsregcmd, corporate identifiers, and platform restrictions." },
  { id: "phase-3", number: 3, name: "Modern Provisioning & Autopilot", description: "Classic Autopilot with ESP diagnostics and Autopilot Device Preparation (v2)." },
  { id: "phase-4", number: 4, name: "Modern Configuration, GPO & Certificates", description: "Settings Catalog, Assignment Filters, GPO Analytics migration, SCEP certs, WHfB, and LAPS." },
  { id: "phase-5", number: 5, name: "Compliance Policies & Conditional Access", description: "Built-in compliance baselines, Custom Compliance with PowerShell/JSON, and Zero Trust CA." },
  { id: "phase-6", number: 6, name: "Application Management & MAM", description: "Win32 packaging (.intunewin), custom detection rules, MAM-WE, and App Configuration." },
  { id: "phase-7", number: 7, name: "Endpoint Security & Defender for Endpoint", description: "Defender EDR connector, Attack Surface Reduction (ASR), BitLocker escrow, and EPM." },
  { id: "phase-8", number: 8, name: "Windows Update for Business (WUfB)", description: "Deployment rings, expedited zero-day quality updates, and driver approval policies." },
  { id: "phase-9", number: 9, name: "Remote Administration & Master Diagnostics", description: "Remote actions comparison matrix, diagnostic logs, and high-yield error code reference." },
  { id: "phase-10", number: 10, name: "Automation & Proactive Remediations", description: "Microsoft Graph PowerShell SDK automation and self-healing Proactive Remediations." },
  { id: "phase-11", number: 11, name: "Cross-Platform Management (macOS & Android)", description: "macOS Platform SSO & FileVault, and Android Enterprise Work Profiles via AVD." },
  { id: "phase-12", number: 12, name: "Final 20-Seat Enterprise Capstone", description: "Comprehensive enterprise modernization deployment with 3 injected failure challenges." }
];

const LICENSE_BUDGET = [
  { category: "Tier-0 Admin", persona: "Global Emergency Access", upn: "admin-global-emergency@<tenant>.onmicrosoft.com", context: "Break-Glass only; Cloud-only; Excluded from all CA; PIM/FIDO2", seats: 1 },
  { category: "Tier-1 Admin", persona: "Intune Principal Architect", upn: "admin-intune@<tenant>.onmicrosoft.com", context: "Intune Administrator via Entra ID PIM (Eligible JIT)", seats: 1 },
  { category: "Tier-1 Admin", persona: "Security Operations Lead", upn: "admin-security@<tenant>.onmicrosoft.com", context: "Security Administrator / Defender SecOps via PIM", seats: 1 },
  { category: "Corporate Persona", persona: "Adele Vance (IT)", upn: "adele.vance@<tenant>.onmicrosoft.com", context: "Windows 11 Corp PC (VM 1); Pilot update ring; EPM user", seats: 1 },
  { category: "Corporate Persona", persona: "Alex Wilber (Finance)", upn: "alex.wilber@<tenant>.onmicrosoft.com", context: "Windows 11 Corp PC (VM 2); BitLocker escrow; LAPS; Custom Compliance", seats: 1 },
  { category: "Corporate Persona", persona: "Megan Bowen (HR)", upn: "megan.bowen@<tenant>.onmicrosoft.com", context: "Windows 11 Autopilot PC (VM 3); Autopilot v2 Device Prep; M365 Apps", seats: 1 },
  { category: "BYOD Persona", persona: "Joni Sherman (Sales)", upn: "joni.sherman@<tenant>.onmicrosoft.com", context: "BYOD Windows / Android; MAM-WE; App Protection Policies", seats: 1 },
  { category: "Mobile Persona", persona: "Diego Siciliani (Field)", upn: "diego.s@<tenant>.onmicrosoft.com", context: "Android Enterprise Work Profile / Dedicated Kiosk (AVD)", seats: 1 },
  { category: "Executive Persona", persona: "Miriam Graham (Exec)", upn: "miriam.g@<tenant>.onmicrosoft.com", context: "macOS / iOS; Platform SSO; FileVault key escrow", seats: 1 },
  { category: "Specialized Test", persona: "Intune Helpdesk Operator", upn: "intune-operator@<tenant>.onmicrosoft.com", context: "Restricted RBAC Helpdesk role; Scope Tags testing (Tag-Finance)", seats: 1 },
  { category: "Specialized Test", persona: "Security Operator", upn: "security-operator@<tenant>.onmicrosoft.com", context: "Restricted Defender MDE incident responder", seats: 1 },
  { category: "Specialized Test", persona: "Shared Kiosk Account", upn: "kiosk-user@<tenant>.onmicrosoft.com", context: "Multi-user shared device & Assigned Access testing", seats: 1 },
  { category: "Specialized Test", persona: "Pilot User 01", upn: "pilot.user01@<tenant>.onmicrosoft.com", context: "Pre-production testing for Win32 apps & Feature Updates", seats: 1 },
  { category: "Specialized Test", persona: "Pilot User 02", upn: "pilot.user02@<tenant>.onmicrosoft.com", context: "Quality update expedited zero-day testing", seats: 1 },
  { category: "Staging Buffer", persona: "Dynamic Test Users (1–6)", upn: "staging.user01-06@<tenant>.onmicrosoft.com", context: "Temporary accounts used during multi-device provisioning", seats: 6 },
  { category: "SUBTOTAL ACTIVE", persona: "Active Allocated Total", upn: "Assigned via GRP-LIC-M365-E5", context: "Automated group-based license assignment", seats: 20 },
  { category: "SAFETY RESERVE", persona: "Unassigned Reserve Pool", upn: "No Assigned Identities", context: "Strict 5-seat emergency safety buffer (Zero Lockouts)", seats: 5 },
  { category: "TOTAL TENANT POOL", persona: "Microsoft 365 E5 Complete Stack", upn: "All Workloads Active", context: "Entra ID P2 + Intune + Defender P2 + Windows Enterprise", seats: 25 }
];

const ERROR_CODES = [
  { code: "0x80180018", hex: "MENROLL_E_LICENSE", rootCause: "User attempting enrollment does not have an active Microsoft Intune license assigned.", resolution: "Assign the user account to the GRP-LIC-M365-E5 group-based licensing security group." },
  { code: "0x80180014", hex: "MENROLL_E_PLATFORM_BLOCKED", rootCause: "Enrollment restriction is configured to block personal/BYOD devices or the operating system version is below minimum build threshold.", resolution: "Add the device Serial Number/IMEI to Corporate Device Identifiers or adjust Enrollment Device Platform Restrictions." },
  { code: "0x87D1041C", hex: "ERROR_DETECTION_FAILED", rootCause: "Win32 application installer executed successfully (Exit Code 0), but the configured custom detection script or MSI product code rule evaluated to false.", resolution: "Verify the detection rule registry key path, file path, or PowerShell STDOUT output string in the detection script." },
  { code: "0x80070005", hex: "E_ACCESSDENIED", rootCause: "Access denied during script execution, CSP policy application, or application installation.", resolution: "Ensure the deployment install context is set to 'System' rather than 'User' if modifying HKLM or Program Files." },
  { code: "0x80180026", hex: "MENROLL_E_DEVICECAPREACHED", rootCause: "User has reached the maximum allowed registered device limit configured in tenant enrollment restrictions (default is 15 or custom limit).", resolution: "Retire/delete stale devices in Intune or increase the device limit in Enrollment Device Platform Restrictions." },
  { code: "0x80070002", hex: "ERROR_FILE_NOT_FOUND", rootCause: "PowerShell script or Win32 setup file could not locate a referenced dependency or target directory.", resolution: "Check relative paths inside the .intunewin package or wrap paths with quotes." }
];

const LABS_DATA = [
  {
    id: "lab-0",
    number: "0",
    phaseId: "phase-1",
    domainId: "domain-2",
    title: "Enterprise Prerequisites, Personas, Security Groups & VM Automation",
    duration: "30 mins",
    difficulty: "Beginner",
    summary: "Provision the foundational infrastructure for the entire lab: create the 20 user personas, establish Group-Based Licensing (GBL) on GRP-LIC-M365-E5, build all Entra ID static and dynamic security groups, and spin up the 3 Generation-2 UEFI Virtual Machines in Hyper-V with vTPM 2.0.",
    keyConcepts: ["Group-Based Licensing (GBL)", "Entra ID Personas", "Dynamic Device Groups", "Hyper-V Generation 2", "Virtual TPM (vTPM 2.0)", "Android Studio AVD"],
    checklist: [
      { id: "t-0-1", text: "Create Licensing Security Group 'GRP-LIC-M365-E5' and assign Microsoft 365 E5 license stack." },
      { id: "t-0-2", text: "Create Departmental Groups: GRP-USR-IT, GRP-USR-FINANCE, GRP-USR-HR, GRP-USR-SALES, GRP-USR-FIELD, GRP-USR-EXCLUDE-CA." },
      { id: "t-0-3", text: "Create Device Groups: GRP-DEV-WIN-CORPORATE, GRP-DEV-WIN-AUTOPILOT, GRP-DEV-WIN-AUTOPILOT-V2, GRP-DEV-WIN-PILOT, GRP-DEV-WIN-PRODUCTION, GRP-DEV-BYOD." },
      { id: "t-0-4", text: "Provision the 20 User Personas (Admins, Adele, Alex, Megan, Joni, Diego, Operators) and add all to GRP-LIC-M365-E5." },
      { id: "t-0-5", text: "Assign Global Administrator role to admin-global-emergency, and Intune Administrator role to admin-intune." },
      { id: "t-0-6", text: "Execute Hyper-V PowerShell script to create MD102-VM1-Adele, MD102-VM2-Alex, and MD102-VM3-Megan with vTPM 2.0." },
      { id: "t-0-7", text: "(Optional Mobile) Configure Android Studio AVD (Pixel 7 with Android 14 API 34 with Google Play)." }
    ],
    steps: [
      {
        step: 1,
        title: "Exercise 1: Create Microsoft Entra Security Groups via Admin Center",
        desc: "1. Sign in to https://entra.microsoft.com as Global Admin.<br/>2. Expand <strong>Identity</strong> > select <strong>Groups</strong> > <strong>All groups</strong>.<br/>3. Select <strong>New group</strong> at the top.<br/>4. Group type: <strong>Security</strong>.<br/>5. Group name: <strong>GRP-LIC-M365-E5</strong>.<br/>6. Group description: <em>Group-based licensing container for Microsoft 365 E5</em>.<br/>7. Membership type: <strong>Assigned</strong>.<br/>8. Select <strong>Create</strong>.<br/>9. Repeat this process to create the remaining groups: <code>GRP-USR-IT</code>, <code>GRP-USR-FINANCE</code>, <code>GRP-USR-HR</code>, <code>GRP-USR-SALES</code>, <code>GRP-USR-FIELD</code>, <code>GRP-USR-EXCLUDE-CA</code>, <code>GRP-DEV-WIN-CORPORATE</code>, <code>GRP-DEV-WIN-AUTOPILOT-V2</code>, <code>GRP-DEV-WIN-PILOT</code>, <code>GRP-DEV-WIN-PRODUCTION</code>, and <code>GRP-DEV-WIN-SHARED</code>."
      },
      {
        step: 2,
        title: "Exercise 2: Configure Group-Based Licensing (GBL) for Microsoft 365 E5",
        desc: "1. In Microsoft Entra admin center, expand <strong>Identity</strong> > <strong>Billing</strong> > select <strong>Licenses</strong>.<br/>2. Under <em>Manage</em>, select <strong>All products</strong>.<br/>3. Select <strong>Microsoft 365 E5</strong> > click <strong>+ Assign</strong>.<br/>4. Under <em>Users and groups</em>, click <strong>+ Add users and groups</strong>.<br/>5. Search for and select <strong>GRP-LIC-M365-E5</strong> > click <strong>Select</strong>.<br/>6. Select the <strong>Assignment options</strong> tab > verify <em>Microsoft Intune</em>, <em>Microsoft Entra ID P2</em>, <em>Microsoft Defender for Endpoint P2</em>, and <em>Windows Enterprise</em> are toggled to <strong>On</strong>.<br/>7. Select <strong>Review + assign</strong> > click <strong>Assign</strong>."
      },
      {
        step: 3,
        title: "Exercise 3: Create User Personas in Microsoft Entra Admin Center",
        desc: "1. Navigate to <strong>Identity</strong> > <strong>Users</strong> > <strong>All users</strong>.<br/>2. Select <strong>New user</strong> > <strong>Create new user</strong>.<br/>3. On the <em>Basics</em> tab:<br/>&nbsp;&nbsp;• User Principal Name: <code>adele.vance</code> (Domain: <code>&lt;tenant&gt;.onmicrosoft.com</code>)<br/>&nbsp;&nbsp;• Display Name: <strong>Adele Vance</strong><br/>&nbsp;&nbsp;• Uncheck <em>Auto-generate password</em> and enter standard password: <code>ContosoLabP@ssw0rd2026!</code>.<br/>4. Select <strong>Next: Properties</strong>:<br/>&nbsp;&nbsp;• First name: <strong>Adele</strong> | Last name: <strong>Vance</strong><br/>&nbsp;&nbsp;• Job title: <strong>IT Specialist</strong> | Department: <strong>IT</strong><br/>&nbsp;&nbsp;• Usage location: <strong>United States</strong> (or your local region).<br/>5. Select <strong>Next: Assignments</strong> > click <strong>+ Add group</strong> > select <strong>GRP-LIC-M365-E5</strong> and <strong>GRP-USR-IT</strong> > click <strong>Select</strong>.<br/>6. Select <strong>Review + create</strong> > click <strong>Create</strong>.<br/>7. Repeat for the other primary personas: <code>alex.wilber</code> (Finance), <code>megan.bowen</code> (HR), <code>joni.sherman</code> (Sales), and <code>diego.s</code> (Field)."
      },
      {
        step: 4,
        title: "Exercise 4: Create Admin Accounts & Assign Directory Roles",
        desc: "1. In <strong>Users</strong> > <strong>New user</strong> > <strong>Create new user</strong>.<br/>2. Create <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code> (Display Name: <em>Global Emergency BreakGlass</em>).<br/>3. On the <em>Assignments</em> tab, click <strong>+ Add role</strong> > search and select <strong>Global Administrator</strong> > click <strong>Select</strong>.<br/>4. Also add it to <strong>GRP-LIC-M365-E5</strong>.<br/>5. Create <code>admin-intune@&lt;tenant&gt;.onmicrosoft.com</code> (Display Name: <em>Intune Principal Architect</em>) > assign role <strong>Intune Administrator</strong> and group <strong>GRP-LIC-M365-E5</strong>."
      },
      {
        step: 5,
        title: "Exercise 5: Provision Virtual Machines in Hyper-V Manager GUI",
        desc: "1. Open <strong>Hyper-V Manager</strong> on your host machine.<br/>2. In the Actions pane on the right, select <strong>New</strong> > <strong>Virtual Machine</strong>.<br/>3. <em>Specify Name and Location:</em> Name: <strong>MD102-VM1-Adele</strong> > click <strong>Next</strong>.<br/>4. <em>Specify Generation:</em> Select <strong>Generation 2</strong> (UEFI) > click <strong>Next</strong>.<br/>5. <em>Assign Memory:</em> Startup memory: <strong>4096 MB</strong>, check <strong>Use Dynamic Memory for this virtual machine</strong> > click <strong>Next</strong>.<br/>6. <em>Configure Networking:</em> Connection: <strong>Default Switch</strong> > click <strong>Next</strong>.<br/>7. <em>Connect Virtual Hard Disk:</em> Size: <strong>80 GB</strong> > click <strong>Next</strong> > click <strong>Finish</strong>.<br/>8. Right-click <strong>MD102-VM1-Adele</strong> > select <strong>Settings...</strong>.<br/>9. In the left pane, select <strong>Security</strong>:<br/>&nbsp;&nbsp;• Ensure <strong>Enable Secure Boot</strong> is checked (Template: <em>Microsoft Windows</em>).<br/>&nbsp;&nbsp;• Check <strong>Enable Trusted Platform Module</strong> (vTPM 2.0).<br/>10. Click <strong>Apply</strong> and <strong>OK</strong>.<br/>11. Repeat to create <strong>MD102-VM2-Alex</strong> and <strong>MD102-VM3-Megan</strong>."
      },
      {
        step: 6,
        title: "Exercise 6: (Fast-Track Alternative) Automated PowerShell Script",
        desc: "If you prefer to automate the creation of all 20 accounts, 12 groups, and 3 Hyper-V VMs at once, navigate to the <strong>Script Sandbox</strong> tab and execute the automated Graph and Hyper-V scripts with 1-click."
      }
    ],
    scripts: [
      {
        title: "Automated Hyper-V 3-VM Creation Script (Elevated PowerShell)",
        lang: "powershell",
        code: `# Run in Elevated PowerShell on Hyper-V Host
$VMNames = @("MD102-VM1-Adele", "MD102-VM2-Alex", "MD102-VM3-Megan")

# Clean old artifacts if re-running
foreach ($VM in $VMNames) {
    if (Get-VM -Name $VM -ErrorAction SilentlyContinue) {
        Stop-VM -Name $VM -TurnOff -Force -ErrorAction SilentlyContinue
        Remove-VM -Name $VM -Force
    }
    if (Test-Path "C:\\Hyper-V\\$VM.vhdx") {
        Remove-Item "C:\\Hyper-V\\$VM.vhdx" -Force
    }
}

# Create fresh Gen-2 VMs with vTPM 2.0 & Secure Boot
foreach ($VM in $VMNames) {
    New-VM -Name $VM -Generation 2 -MemoryStartupBytes 4GB -NewVHDPath "C:\\Hyper-V\\$VM.vhdx" -NewVHDSizeBytes 80GB -SwitchName "Default Switch"
    Set-VMMemory -VMName $VM -DynamicMemoryEnabled $true -MinimumBytes 2GB -MaximumBytes 6GB
    Set-VMProcessor -VMName $VM -Count 2
    Set-VMFirmware -VMName $VM -EnableSecureBoot On -SecureBootTemplate "MicrosoftWindows"
    Set-VMKeyProtector -VMName $VM -NewLocalKeyProtector
    Enable-VMTPM -VMName $VM
    Write-Host "Created $VM with vTPM 2.0 and Secure Boot enabled!" -ForegroundColor Green
}`
      },
      {
        title: "Automated Entra ID Groups & 20 Personas Provisioning Script (Microsoft Graph)",
        lang: "powershell",
        code: `# Connect to Microsoft Graph with admin permissions
Connect-MgGraph -Scopes "Group.ReadWrite.All", "User.ReadWrite.All", "Directory.ReadWrite.All", "RoleManagement.ReadWrite.Directory"

# Define Tenant Domain Variable
$TenantDomain = "<tenant>.onmicrosoft.com"
$InitialPassword = "ContosoLabP@ssw0rd2026!" # Standard initial lab password
$PasswordProfile = @{ Password = $InitialPassword; ForceChangePasswordNextSignIn = $false }

# 1. Create Core Security Groups
$Groups = @(
    "GRP-LIC-M365-E5", "GRP-USR-IT", "GRP-USR-FINANCE", "GRP-USR-HR", "GRP-USR-SALES",
    "GRP-USR-FIELD", "GRP-USR-EXCLUDE-CA", "GRP-DEV-WIN-CORPORATE", "GRP-DEV-WIN-AUTOPILOT-V2",
    "GRP-DEV-WIN-PILOT", "GRP-DEV-WIN-PRODUCTION", "GRP-DEV-WIN-SHARED"
)

$GroupObjects = @{}
foreach ($GrpName in $Groups) {
    $Existing = Get-MgGroup -Filter "displayName eq '$GrpName'"
    if (-not $Existing) {
        $GroupObjects[$GrpName] = New-MgGroup -DisplayName $GrpName -MailEnabled:$false -MailNickname $GrpName.Replace("-","") -SecurityEnabled:$true
        Write-Host "Created Security Group: $GrpName" -ForegroundColor Green
    } else {
        $GroupObjects[$GrpName] = $Existing
        Write-Host "Group already exists: $GrpName" -ForegroundColor Yellow
    }
}

# 2. Define the 20 Lab Personas
$Personas = @(
    @{ DisplayName = "Global Emergency BreakGlass"; UPN = "admin-global-emergency@$TenantDomain"; Nick = "admin-emergency"; Department = "IT"; Role = "Global Administrator" },
    @{ DisplayName = "Intune Principal Architect"; UPN = "admin-intune@$TenantDomain"; Nick = "admin-intune"; Department = "IT"; Role = "Intune Administrator" },
    @{ DisplayName = "Security Operations Lead"; UPN = "admin-security@$TenantDomain"; Nick = "admin-security"; Department = "IT"; Role = "Security Administrator" },
    @{ DisplayName = "Adele Vance"; UPN = "adele.vance@$TenantDomain"; Nick = "adelev"; Department = "IT"; Role = "" },
    @{ DisplayName = "Alex Wilber"; UPN = "alex.wilber@$TenantDomain"; Nick = "alexw"; Department = "Finance"; Role = "" },
    @{ DisplayName = "Megan Bowen"; UPN = "megan.bowen@$TenantDomain"; Nick = "meganb"; Department = "HR"; Role = "" },
    @{ DisplayName = "Joni Sherman"; UPN = "joni.sherman@$TenantDomain"; Nick = "jonis"; Department = "Sales"; Role = "" },
    @{ DisplayName = "Diego Siciliani"; UPN = "diego.s@$TenantDomain"; Nick = "diegos"; Department = "Field"; Role = "" },
    @{ DisplayName = "Miriam Graham"; UPN = "miriam.g@$TenantDomain"; Nick = "miriamg"; Department = "Executive"; Role = "" },
    @{ DisplayName = "Intune Helpdesk Operator"; UPN = "intune-operator@$TenantDomain"; Nick = "intune-operator"; Department = "IT"; Role = "" },
    @{ DisplayName = "Security Operator"; UPN = "security-operator@$TenantDomain"; Nick = "sec-operator"; Department = "IT"; Role = "" },
    @{ DisplayName = "Shared Kiosk Account"; UPN = "kiosk-user@$TenantDomain"; Nick = "kiosk-user"; Department = "IT"; Role = "" },
    @{ DisplayName = "Pilot User 01"; UPN = "pilot.user01@$TenantDomain"; Nick = "pilot01"; Department = "IT"; Role = "" },
    @{ DisplayName = "Pilot User 02"; UPN = "pilot.user02@$TenantDomain"; Nick = "pilot02"; Department = "IT"; Role = "" },
    @{ DisplayName = "Staging User 01"; UPN = "staging.user01@$TenantDomain"; Nick = "staging01"; Department = "Staging"; Role = "" },
    @{ DisplayName = "Staging User 02"; UPN = "staging.user02@$TenantDomain"; Nick = "staging02"; Department = "Staging"; Role = "" },
    @{ DisplayName = "Staging User 03"; UPN = "staging.user03@$TenantDomain"; Nick = "staging03"; Department = "Staging"; Role = "" },
    @{ DisplayName = "Staging User 04"; UPN = "staging.user04@$TenantDomain"; Nick = "staging04"; Department = "Staging"; Role = "" },
    @{ DisplayName = "Staging User 05"; UPN = "staging.user05@$TenantDomain"; Nick = "staging05"; Department = "Staging"; Role = "" },
    @{ DisplayName = "Staging User 06"; UPN = "staging.user06@$TenantDomain"; Nick = "staging06"; Department = "Staging"; Role = "" }
)

# 3. Create All Users and Add to Licensing Group
$LicGroupId = $GroupObjects["GRP-LIC-M365-E5"].Id

foreach ($p in $Personas) {
    $User = Get-MgUser -Filter "userPrincipalName eq '$($p.UPN)'"
    if (-not $User) {
        $User = New-MgUser -DisplayName $p.DisplayName -UserPrincipalName $p.UPN -MailNickname $p.Nick -AccountEnabled:$true -PasswordProfile $PasswordProfile -Department $p.Department
        Write-Host "Created User: $($p.DisplayName) ($($p.UPN))" -ForegroundColor Green
    } else {
        Write-Host "User already exists: $($p.UPN)" -ForegroundColor Yellow
    }

    # Add to Licensing Group GRP-LIC-M365-E5
    try {
        New-MgGroupMember -GroupId $LicGroupId -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue
        Write-Host "  -> Added to GRP-LIC-M365-E5" -ForegroundColor Gray
    } catch {}

    # Add to Departmental Groups
    if ($p.Department -eq "IT" -and $GroupObjects["GRP-USR-IT"]) {
        try { New-MgGroupMember -GroupId $GroupObjects["GRP-USR-IT"].Id -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue } catch {}
    } elseif ($p.Department -eq "Finance" -and $GroupObjects["GRP-USR-FINANCE"]) {
        try { New-MgGroupMember -GroupId $GroupObjects["GRP-USR-FINANCE"].Id -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue } catch {}
    } elseif ($p.Department -eq "HR" -and $GroupObjects["GRP-USR-HR"]) {
        try { New-MgGroupMember -GroupId $GroupObjects["GRP-USR-HR"].Id -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue } catch {}
    } elseif ($p.Department -eq "Sales" -and $GroupObjects["GRP-USR-SALES"]) {
        try { New-MgGroupMember -GroupId $GroupObjects["GRP-USR-SALES"].Id -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue } catch {}
    } elseif ($p.Department -eq "Field" -and $GroupObjects["GRP-USR-FIELD"]) {
        try { New-MgGroupMember -GroupId $GroupObjects["GRP-USR-FIELD"].Id -DirectoryObjectId $User.Id -ErrorAction SilentlyContinue } catch {}
    }

    # Assign Admin Role if applicable
    if ($p.Role -ne "") {
        $RoleDef = Get-MgRoleManagementDirectoryRoleDefinition -Filter "displayName eq '$($p.Role)'"
        if ($RoleDef) {
            try {
                New-MgRoleManagementDirectoryRoleAssignment -DirectoryScopeId "/" -PrincipalId $User.Id -RoleDefinitionId $RoleDef.Id -ErrorAction SilentlyContinue
                Write-Host "  -> Assigned Directory Role: $($p.Role)" -ForegroundColor Cyan
            } catch {}
        }
    }
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host " All 20 Personas & Groups Provisioned & Added to GBL! " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "Users in GRP-LIC-M365-E5 report 'License assignment error / SKU conflict'.",
        rootCause: "A user account has a legacy direct license assignment that conflicts with the group-based licensing policy.",
        diagnosticCommand: "In Entra admin center > Users > Select user > Licenses > Check Assignment path (Direct vs Inherited).",
        resolution: "Remove the direct license assignment from the user. GBL will automatically take over within 60 seconds."
      }
    ],
    quiz: [
      {
        question: "Why is Group-Based Licensing (GBL) strictly enforced in this enterprise Intune blueprint rather than direct user license assignment?",
        options: [
          "GBL prevents configuration drift, automatically provisions all required Intune/Defender sub-SKUs to new users, and guarantees zero license leaks upon offboarding.",
          "GBL allows unassigned users to bypass Entra ID password complexity policies.",
          "GBL is required to enable TPM 2.0 on Hyper-V virtual machines.",
          "GBL automatically creates on-premises Active Directory computer objects."
        ],
        correctIndex: 0,
        rationale: "Group-Based Licensing eliminates human error and drift by ensuring that every persona added to GRP-LIC-M365-E5 consistently and automatically receives Intune, Entra ID P2, Defender for Endpoint P2, and Windows Enterprise licensing.",
        examTip: "Exam MD-102: Always use Group-Based Licensing (GBL) in Microsoft Entra ID for scalable and drift-free license management."
      }
    ]
  },
  {
    id: "lab-1",
    number: "1",
    phaseId: "phase-1",
    domainId: "domain-2",
    title: "Hardened Tenant Setup, Branding & Emergency Break-Glass",
    duration: "30 mins",
    difficulty: "Beginner",
    summary: "Establish core cloud tenant infrastructure, configure custom enterprise branding across all sign-in surfaces, and construct an immutable break-glass emergency administration procedure to guarantee zero lockouts.",
    keyConcepts: ["MDM Authority", "Entra Company Branding", "Break-Glass Protocol", "PIM Security", "Log Analytics Alerting"],
    checklist: [
      { id: "t-1-1", text: "Verify MDM Authority is configured as Microsoft Intune under Tenant Administration." },
      { id: "t-1-2", text: "Deploy Company Branding: Banner Logo (280x60), Square Logo (240x240), Background Image (1920x1080)." },
      { id: "t-1-3", text: "Set Sign-in Page Text: 'Authorized Contoso Personnel Only. All activities are monitored and audited.'" },
      { id: "t-1-4", text: "Create cloud-only Break-Glass Account: admin-global-emergency@<tenant>.onmicrosoft.com with 32+ char password." },
      { id: "t-1-5", text: "Permanently assign Global Administrator role and EXCLUDE this account from ALL Conditional Access policies." },
      { id: "t-1-6", text: "Create Entra ID Log Analytics alert rule triggering instant notification on emergency account authentication." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Validate Intune MDM Authority",
            "desc": "1. Sign in to <strong>https://intune.microsoft.com</strong> as Intune Administrator.<br/>2. In the left navigation pane, select <strong>Tenant administration</strong> > <strong>Tenant status</strong>.<br/>3. In the <em>Tenant details</em> tab, verify that <strong>MDM authority</strong> displays <strong>Microsoft Intune</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Custom Company Branding",
            "desc": "1. Sign in to <strong>https://entra.microsoft.com</strong> as Global Administrator.<br/>2. Navigate to <strong>Identity</strong> > <strong>User experiences</strong> > <strong>Company branding</strong>.<br/>3. Select <strong>Default sign-in</strong> (or click <strong>+ Customize</strong>).<br/>4. In the <em>Basics</em> tab:<br/>&nbsp;&nbsp;• Banner logo: Upload 280x60 px PNG logo.<br/>&nbsp;&nbsp;• Square logo (light/dark): Upload 240x240 px PNG logo.<br/>&nbsp;&nbsp;• Page background: Upload 1920x1080 px image.<br/>5. In the <em>Sign-in form</em> tab:<br/>&nbsp;&nbsp;• Sign-in page text: Enter <code>Authorized Contoso Personnel Only. All activities are monitored and audited.</code><br/>6. Select <strong>Review + save</strong> > click <strong>Save</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Create & Harden Break-Glass Emergency Account",
            "desc": "1. In Microsoft Entra admin center, navigate to <strong>Identity</strong> > <strong>Users</strong> > <strong>All users</strong> > <strong>New user</strong> > <strong>Create new user</strong>.<br/>2. User Principal Name: <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Display Name: <code>Global Emergency BreakGlass</code>.<br/>4. Password: Set a 32+ character high-entropy password (uncheck auto-generate).<br/>5. On the <em>Assignments</em> tab: Click <strong>+ Add role</strong> > search for and assign <strong>Global Administrator</strong>.<br/>6. Select <strong>Review + create</strong> > click <strong>Create</strong>."
      },
      {
            "step": 4,
            "title": "Exercise 4: Configure Emergency Account Alerting & CA Exclusions",
            "desc": "1. When creating any Conditional Access policy in Entra ID, navigate to <strong>Users</strong> > <strong>Exclude</strong> > <strong>Users and groups</strong> > check and select <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Navigate to <strong>Identity</strong> > <strong>Monitoring & health</strong> > <strong>Diagnostic settings</strong> to ensure Entra ID sign-in logs stream to Log Analytics for instant alerting on emergency account use."
      }
    ],
    scripts: [
      {
        title: "Verify Tenant MDM Authority and Branding via Microsoft Graph",
        lang: "powershell",
        code: `# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Organization.Read.All", "Policy.Read.All"

# Query Organization Details
$Org = Get-MgOrganization
Write-Host "Tenant ID: $($Org.Id)" -ForegroundColor Cyan
Write-Host "Display Name: $($Org.DisplayName)" -ForegroundColor Green

# Query Break-Glass Emergency Account Status
$BreakGlass = Get-MgUser -UserId "admin-global-emergency@<tenant>.onmicrosoft.com" | Select-Object DisplayName, UserPrincipalName, UserType, AccountEnabled
$BreakGlass | Format-List`
      }
    ],
    troubleshooting: [
      {
        scenario: "Admin locked out due to misconfigured Conditional Access policy requiring Compliant Device or MFA from an unmanaged location.",
        rootCause: "A blanket Conditional Access policy was enabled without excluding the break-glass emergency account.",
        diagnosticCommand: "Sign in using admin-global-emergency@<tenant>.onmicrosoft.com from an InPrivate browser window.",
        resolution: "Because the break-glass account is permanently excluded from CA policies, sign in and immediately set the offending CA policy to 'Report-Only' or add the appropriate exclusions."
      }
    ],
    quiz: [
      {
        question: "An organization is configuring a cloud break-glass emergency account. What is the Microsoft-recommended best practice regarding Conditional Access and Directory Synchronization?",
        options: [
          "The break-glass account must be synchronized from on-premises AD and included in all MFA Conditional Access policies.",
          "The break-glass account must be cloud-only (.onmicrosoft.com) and excluded from all Conditional Access policies.",
          "The break-glass account must have a password expiration of 30 days and require SMS MFA.",
          "The break-glass account should be assigned the Help Desk Operator role and scoped with administrative units."
        ],
        correctIndex: 1,
        rationale: "Emergency break-glass accounts must be cloud-only (so they do not depend on on-premises sync or federation infrastructure) and strictly excluded from all Conditional Access policies to prevent lockout during policy misconfigurations.",
        examTip: "Exam MD-102 frequently tests emergency access accounts: Always cloud-only, FIDO2/passwordless or complex password in physical safe, excluded from CA policies."
      }
    ]
  },
  {
    id: "lab-2",
    number: "2",
    phaseId: "phase-1",
    domainId: "domain-2",
    title: "Intune Role-Based Access Control (RBAC), Scope Tags & Administrative Units",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Enforce least-privilege administrative access using Intune Built-in Roles, Custom Roles, Scope Tags, and Administrative Units (AUs) to isolate departmental administration.",
    keyConcepts: ["Intune Built-in Roles", "Custom RBAC", "Scope Tags", "Administrative Units", "Least Privilege"],
    checklist: [
      { id: "t-2-1", text: "Create Scope Tags: 'Tag-IT', 'Tag-Finance', 'Tag-HR' under Tenant administration > Roles > Scope tags." },
      { id: "t-2-2", text: "Create an Administrative Unit named 'AU-Finance-Operations' and add Alex Wilber + Finance VM 2." },
      { id: "t-2-3", text: "Assign built-in Help Desk Operator role to 'intune-operator@<tenant>.onmicrosoft.com' scoped to Tag-Finance." },
      { id: "t-2-4", text: "Create Custom Role 'SecOps Policy Auditor' with Read-only permissions on configurations and audit logs." },
      { id: "t-2-5", text: "Validate scoping: Sign in as intune-operator and verify IT/HR devices and non-Finance profiles are hidden." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create Intune Scope Tags",
            "desc": "1. Sign in to <strong>https://intune.microsoft.com</strong>.<br/>2. Navigate to <strong>Tenant administration</strong> > <strong>Roles</strong> > select the <strong>Scope tags</strong> tab.<br/>3. Select <strong>+ Create</strong>.<br/>4. Name: <code>Tag-Finance</code> | Description: <em>Restricts visibility to Finance department devices and profiles</em>.<br/>5. Select <strong>Next</strong> > select <strong>Create</strong>.<br/>6. Repeat to create <code>Tag-IT</code> and <code>Tag-HR</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Create Administrative Unit (AU) in Entra ID",
            "desc": "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Roles & admins</strong> > <strong>Admin units</strong>.<br/>2. Select <strong>+ Add</strong>.<br/>3. Name: <code>AU-Finance-Operations</code> | Description: <em>Administrative boundary for Finance staff and workstations</em>.<br/>4. Select <strong>Next: Assign roles</strong> > select <strong>Next: Review + create</strong> > click <strong>Create</strong>.<br/>5. Open <code>AU-Finance-Operations</code> > under <em>Manage</em>, select <strong>Users</strong> > click <strong>+ Add member</strong> > add <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Assign Scoped Help Desk Operator Role",
            "desc": "1. In Intune admin center, go to <strong>Tenant administration</strong> > <strong>Roles</strong> > <strong>All roles</strong>.<br/>2. Select the built-in role <strong>Help Desk Operator</strong>.<br/>3. Under <em>Manage</em>, select <strong>Assignments</strong> > click <strong>+ Assign</strong>.<br/>4. Assignment name: <code>Finance-HelpDesk-Assignment</code>.<br/>5. <em>Admin Groups:</em> Add <code>intune-operator@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>6. <em>Scope Groups:</em> Select <code>GRP-DEV-WIN-CORPORATE</code>.<br/>7. <em>Scope Tags:</em> Select <code>Tag-Finance</code>.<br/>8. Select <strong>Next</strong> > <strong>Create</strong>."
      },
      {
            "step": 4,
            "title": "Exercise 4: Validate Scoped View as Operator",
            "desc": "1. Open an InPrivate browser window and sign in to <strong>https://intune.microsoft.com</strong> as <code>intune-operator@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Navigate to <strong>Devices</strong> > <strong>All devices</strong> and <strong>Devices</strong> > <strong>Configuration</strong>.<br/>3. Confirm only devices/profiles carrying <code>Tag-Finance</code> are visible; all IT/HR objects are completely hidden."
      }
    ],
    scripts: [
      {
        title: "Create Scope Tags via Microsoft Graph PowerShell",
        lang: "powershell",
        code: `# Connect to Microsoft Graph Device Management
Connect-MgGraph -Scopes "DeviceManagementRBAC.ReadWrite.All"

# Create Scope Tags
$ScopeTags = @("Tag-IT", "Tag-Finance", "Tag-HR")
foreach ($Tag in $ScopeTags) {
    $Params = @{
        displayName = $Tag
        description = "Enterprise Scope Tag for $($Tag) workloads"
    }
    New-MgDeviceManagementRoleScopeTag -BodyParameter $Params
    Write-Host "Created Scope Tag: $Tag" -ForegroundColor Green
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Intune Operator can see a device in the portal, but cannot trigger a Remote Reboot or Sync action.",
        rootCause: "The operator has Read permissions through a Scope Tag, but the assigned role does not grant 'Remote tasks > Reboot now' permission.",
        diagnosticCommand: "Review Intune > Tenant administration > Roles > Help Desk Operator > Permissions > Remote tasks.",
        resolution: "Edit the Custom Role or verify the built-in role assignment to grant specific Remote Task execute rights."
      }
    ],
    quiz: [
      {
        question: "You need to delegate permissions to a regional administrator in Paris so they can only manage Windows devices used by Paris employees, without seeing devices from New York. What should you implement?",
        options: [
          "Create a Conditional Access policy targeting the Paris office IP subnet.",
          "Create an Intune Scope Tag for Paris and assign it to regional profiles and an Administrative Unit containing Paris users/devices.",
          "Assign the Global Administrator role with an Entra PIM time limit of 8 hours.",
          "Configure an Enrollment Restriction blocking non-European device models."
        ],
        correctIndex: 1,
        rationale: "Scope Tags and Administrative Units in Intune restrict visibility and administrative actions to specific subsets of devices, users, and policies based on organizational or regional boundaries.",
        examTip: "Scope tags control visibility of policies and devices. Administrative Units (AUs) delegate Entra user/device directory administration."
      }
    ]
  },
  {
    id: "lab-2b",
    number: "2B",
    phaseId: "phase-1",
    domainId: "domain-1",
    title: "Windows Subscription Activation (Pro to Enterprise Dynamic Step-Up)",
    duration: "25 mins",
    difficulty: "Beginner",
    summary: "Validate cloud-native operating system edition upgrade from Windows 11 Pro to Windows 11 Enterprise using M365 E5 user-based licensing without re-imaging, reboots, or product keys.",
    keyConcepts: ["Subscription Activation", "ClipSVC", "Step-Up Upgrade", "Zero-Reboot Provisioning", "M365 E5 Windows License"],
    checklist: [
      { id: "t-2b-1", text: "Verify Windows 11 Pro base install on VM 1 using 'slmgr /dli' and 'Get-ComputerInfo'." },
      { id: "t-2b-2", text: "Ensure user account (alex.wilber@<tenant>.onmicrosoft.com) is licensed for Windows Enterprise via GRP-LIC-M365-E5." },
      { id: "t-2b-3", text: "Sign in to the VM with the licensed user and trigger ClipSVC background token validation." },
      { id: "t-2b-4", text: "Verify seamless instant step-up to Windows 11 Enterprise without system restart." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Inspect Base Windows 11 Pro Licensing State",
            "desc": "1. Power on <strong>MD102-VM1-Adele</strong> and sign in as local administrator.<br/>2. Open an elevated Command Prompt or PowerShell terminal.<br/>3. Execute <code>slmgr /dli</code> and observe the License Status: <em>Windows(R) Operating System, Professional edition</em>.<br/>4. Execute <code>Get-ComputerInfo | Select-Object WindowsProductName, WindowsEditionId</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Sign In with Licensed Microsoft 365 E5 User",
            "desc": "1. In Windows Settings > <strong>Accounts</strong> > <strong>Access work or school</strong>, ensure the device is joined to Microsoft Entra ID.<br/>2. Sign out of the local administrator account and sign in as <code>adele.vance@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Open Task Manager > Services > confirm <code>ClipSVC</code> (Client License Service) is running and querying Entra ID token entitlements."
      },
      {
            "step": 3,
            "title": "Exercise 3: Verify Zero-Reboot Dynamic Step-Up",
            "desc": "1. Open elevated PowerShell and re-run <code>slmgr /dli</code>.<br/>2. Observe the output: <em>Windows(R) Operating System, Enterprise edition</em>.<br/>3. Confirm that Windows 11 Pro seamlessly stepped up to <strong>Windows 11 Enterprise</strong> in real time without any reboot or product key entry!"
      }
    ],
    scripts: [
      {
        title: "PowerShell OS Edition & Subscription Activation Verification",
        lang: "powershell",
        code: `# Inspect Windows Edition and Licensing Service Status
$OSInfo = Get-ComputerInfo | Select-Object WindowsProductName, WindowsEditionId, OsVersion, OsHardwareAbstractionLayer
Write-Host "Product Name: $($OSInfo.WindowsProductName)" -ForegroundColor Cyan
Write-Host "Edition ID:   $($OSInfo.WindowsEditionId)" -ForegroundColor Green

# Query Software Licensing Service Details
slmgr /dli`
      }
    ],
    troubleshooting: [
      {
        scenario: "Device remains on Windows 11 Pro after a licensed M365 E5 user signs in.",
        rootCause: "The device is either not Microsoft Entra Joined / Hybrid Joined, or the user is missing the 'Windows 10/11 Enterprise' sub-license component in M365 E5.",
        diagnosticCommand: "dsregcmd /status & check AzureAdJoined: YES, and check Entra ID > User > Licenses.",
        resolution: "Ensure the device is joined to Entra ID and verify that 'Windows 10/11 Enterprise' is enabled under the assigned license options."
      }
    ],
    quiz: [
      {
        question: "Which of the following is a prerequisite for Windows 10/11 Subscription Activation to successfully step up Windows Pro to Enterprise?",
        options: [
          "The device must have a KMS server reachable on-premises.",
          "The device must be Microsoft Entra joined or Microsoft Entra hybrid joined, and the signed-in user must have an assigned Windows Enterprise license.",
          "The device must be booted into Safe Mode to apply the Enterprise activation license key.",
          "A custom Win32 script must execute 'changepk.exe' with a generic volume license key."
        ],
        correctIndex: 1,
        rationale: "Windows Subscription Activation requires the device to be Entra joined or Entra hybrid joined, and the user signing in must possess a valid license (e.g. M365 E3/E5 or Windows Enterprise E3/E5). The upgrade happens silently in the background without rebooting.",
        examTip: "No product keys, no reboots, no KMS needed for Subscription Activation. Entra Join + Licensed User = Automatic Pro to Enterprise step-up."
      }
    ]
  },
  {
    id: "lab-3",
    number: "3",
    phaseId: "phase-2",
    domainId: "domain-2",
    title: "Device Identity Dissection (dsregcmd /status)",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Deeply inspect and analyze the low-level cryptographic differences between Microsoft Entra Registered, Microsoft Entra Joined, and Microsoft Entra Hybrid Joined endpoints using dsregcmd telemetry.",
    keyConcepts: ["dsregcmd /status", "Primary Refresh Token (PRT)", "AzureAdJoined", "DomainJoined", "SSO State", "Cloud Kerberos Trust"],
    checklist: [
      { id: "t-3-1", text: "Run 'dsregcmd /status' in an elevated console and capture complete output." },
      { id: "t-3-2", text: "Analyze '+--- Device State ---+' section (AzureAdJoined: YES, EnterpriseJoined: NO, DomainJoined: NO)." },
      { id: "t-3-3", text: "Analyze '+--- SSO State ---+' section (AzureAdPrt: YES, AzureAdPrtAuthority: login.microsoftonline.com)." },
      { id: "t-3-4", text: "Analyze '+--- Diagnostic Data ---+' and verify PRT acquisition timestamps." },
      { id: "t-3-5", text: "Compare token scoping: App-scoped workplace PRT (Registered) vs Device-scoped Enterprise PRT (Joined)." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Execute dsregcmd Telemetry Dump",
            "desc": "1. On <strong>MD102-VM1-Adele</strong>, open PowerShell as Administrator.<br/>2. Execute <code>dsregcmd /status > C:\\dsregcmd_report.txt</code> and open <code>notepad C:\\dsregcmd_report.txt</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Dissect Device State & Cryptographic Identifiers",
            "desc": "1. Locate the <code>+--- Device State ---+</code> block.<br/>2. Verify <code>AzureAdJoined : YES</code>, <code>EnterpriseJoined : NO</code>, <code>DomainJoined : NO</code>.<br/>3. Verify <code>DeviceId : &lt;GUID&gt;</code> and copy this GUID.<br/>4. Open Microsoft Entra admin center > <strong>Devices</strong> > <strong>All devices</strong> > search for this GUID and verify matching device record."
      },
      {
            "step": 3,
            "title": "Exercise 3: Dissect SSO State & Primary Refresh Token (PRT)",
            "desc": "1. Locate the <code>+--- SSO State ---+</code> block.<br/>2. Verify <code>AzureAdPrt : YES</code>.<br/>3. Verify <code>AzureAdPrtAuthority : https://login.microsoftonline.com/&lt;TenantID&gt;</code>.<br/>4. Verify <code>AcquirePrtDiagnostics : YES</code> and <code>PrtValidity : Valid</code>."
      }
    ],
    scripts: [
      {
        title: "PowerShell Automated dsregcmd Identity Parser",
        lang: "powershell",
        code: `# Run dsregcmd and extract critical state flags
$Status = dsregcmd /status

$AzureAdJoined = ($Status | Select-String "AzureAdJoined\s*:\s*(YES|NO)").Matches.Value
$DomainJoined  = ($Status | Select-String "DomainJoined\s*:\s*(YES|NO)").Matches.Value
$AzureAdPrt    = ($Status | Select-String "AzureAdPrt\s*:\s*(YES|NO)").Matches.Value
$DeviceId      = ($Status | Select-String "DeviceId\s*:\s*(.+)").Matches.Value

Write-Host "=== Device Identity Summary ===" -ForegroundColor Cyan
Write-Host $AzureAdJoined -ForegroundColor Green
Write-Host $DomainJoined  -ForegroundColor Yellow
Write-Host $AzureAdPrt    -ForegroundColor Green
Write-Host $DeviceId      -ForegroundColor White`
      }
    ],
    troubleshooting: [
      {
        scenario: "Users on Entra Joined devices are constantly prompted for password when accessing Microsoft 365 cloud apps (Outlook, Teams).",
        rootCause: "The Primary Refresh Token (PRT) failed to acquire. 'AzureAdPrt : NO' in dsregcmd /status.",
        diagnosticCommand: "dsregcmd /status & check 'AcquirePrtDiagnostics' and 'Default Provider' in SSO State.",
        resolution: "Run 'dsregcmd /debug /leave' followed by 'dsregcmd /join' or verify TPM attestation is healthy."
      }
    ],
    quiz: [
      {
        question: "When inspecting the output of 'dsregcmd /status' on a modern corporate Windows 11 endpoint, you observe: AzureAdJoined: YES, DomainJoined: NO, AzureAdPrt: YES. What is the identity state of this endpoint?",
        options: [
          "Microsoft Entra Registered (BYOD)",
          "Microsoft Entra Hybrid Joined",
          "Microsoft Entra Joined (Cloud-Native)",
          "Workplace Joined legacy"
        ],
        correctIndex: 2,
        rationale: "AzureAdJoined: YES combined with DomainJoined: NO indicates a pure cloud-native Microsoft Entra Joined device. If DomainJoined were YES, it would be Microsoft Entra Hybrid Joined.",
        examTip: "AzureAdJoined = YES + DomainJoined = NO $\\rightarrow$ Entra Joined. AzureAdJoined = YES + DomainJoined = YES $\\rightarrow$ Hybrid Joined."
      }
    ]
  },
  {
    id: "lab-4",
    number: "4",
    phaseId: "phase-2",
    domainId: "domain-1",
    title: "Enrollment Restrictions, Corporate Identifiers & Auto-Cleanup Rules",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Configure strict tenant enrollment boundaries, prevent unauthorized BYOD enrollments, pre-stage corporate hardware identifiers via CSV, and configure automated stale device cleanup.",
    keyConcepts: ["MDM vs MAM Scope", "Platform Restrictions", "Corporate Device Identifiers", "Stale Device Clean-up"],
    checklist: [
      { id: "t-4-1", text: "Configure MDM User Scope = All and MAM User Scope = None under Entra ID Mobility (MDM and WIP)." },
      { id: "t-4-2", text: "Create Windows Platform Restriction: Block Personally owned devices, allow Corporate only, min OS 10.0.22631.0." },
      { id: "t-4-3", text: "Create Android Platform Restriction: Block Android Device Administrator, allow Android Enterprise." },
      { id: "t-4-4", text: "Upload CorporateHardwareIDs.csv containing test VM serial numbers under Corporate device identifiers." },
      { id: "t-4-5", text: "Configure Device Clean-Up Rules to automatically delete inactive devices after 90 days." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure MDM vs MAM Scope in Entra ID",
            "desc": "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Mobility (MDM and WIP)</strong>.<br/>2. Select <strong>Microsoft Intune</strong>.<br/>3. Set <strong>MDM user scope</strong> to <strong>All</strong>.<br/>4. Set <strong>MAM user scope</strong> to <strong>None</strong> (ensures Windows 10/11 devices perform full MDM enrollment rather than WIP/MAM-only registration).<br/>5. Click <strong>Save</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Windows Platform Enrollment Restrictions",
            "desc": "1. In Microsoft Intune admin center (<strong>https://intune.microsoft.com</strong>), navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Device platform restrictions</strong>.<br/>2. Select the <strong>Windows restrictions</strong> tab > click <strong>Create restriction</strong>.<br/>3. Name: <code>Block-Personal-Windows-BYOD</code>.<br/>4. On the <em>Platform settings</em> tab:<br/>&nbsp;&nbsp;• MDM: <strong>Allow</strong><br/>&nbsp;&nbsp;• Min version: <code>10.0.22631.0</code> (Windows 11 23H2)<br/>&nbsp;&nbsp;• Personally owned: <strong>Block</strong>.<br/>5. On the <em>Assignments</em> tab: Assign to <strong>All Users</strong>.<br/>6. Click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Pre-Register Corporate Device Identifiers",
            "desc": "1. In Intune admin center, go to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Corporate device identifiers</strong>.<br/>2. Select <strong>+ Add</strong> > <strong>Upload CSV file</strong>.<br/>3. Upload a CSV containing Manufacturer, Model, and Serial Number for corporate hardware.<br/>4. Click <strong>Add</strong> (pre-registered serial numbers bypass personal device blocks)."
      },
      {
            "step": 4,
            "title": "Exercise 4: Configure Stale Device Clean-Up Rules",
            "desc": "1. In Intune admin center, go to <strong>Devices</strong> > <strong>Device clean-up rules</strong>.<br/>2. Toggle <strong>Delete devices based on last check-in date</strong> to <strong>Yes</strong>.<br/>3. Set <strong>Delete devices that haven't checked in for this many days</strong> to <strong>90</strong>.<br/>4. Click <strong>Save</strong>."
      }
    ],
    scripts: [
      {
        title: "Generate Corporate Device Identifiers CSV Template",
        lang: "powershell",
        code: `# Query Local Hardware Serial Number
$Serial = (Get-CimInstance -ClassName Win32_BIOS).SerialNumber
$Manufacturer = (Get-CimInstance -ClassName Win32_ComputerSystem).Manufacturer
$Model = (Get-CimInstance -ClassName Win32_ComputerSystem).Model

# Output CSV formatted for Intune Corporate Device Identifier Import
$CSVData = @"
Identifier,Manufacturer,Model,Type
$Serial,$Manufacturer,$Model,SerialNumber
"@

$CSVData | Out-File -FilePath "C:\CorporateHardwareIDs.csv" -Encoding utf8
Write-Host "Corporate Identifiers CSV generated at C:\CorporateHardwareIDs.csv" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "User receives error '0x80180014: This device is not configured to be managed by your organization' during enrollment.",
        rootCause: "Personally-owned Windows devices are blocked by platform restrictions, and the device serial number was not pre-registered in Corporate Device Identifiers.",
        diagnosticCommand: "Check Intune > Devices > Enrollment > Enrollment device platform restrictions, and check Corporate Device Identifiers.",
        resolution: "Pre-register the device serial number in Corporate Device Identifiers or temporarily allow personal enrollment for that user group."
      }
    ],
    quiz: [
      {
        question: "In Microsoft Entra ID Mobility (MDM and WIP) settings for Microsoft Intune, what happens on Windows 10/11 devices if both MDM User Scope and MAM User Scope are set to 'All' for the same user?",
        options: [
          "The device prioritizes MDM automatic enrollment seamlessly.",
          "MAM takes precedence and MDM automatic enrollment fails or behaves unpredictably.",
          "The user is prompted to choose between MDM and MAM during OOBE.",
          "The device is automatically registered as a kiosk device."
        ],
        correctIndex: 1,
        rationale: "For Windows 10/11 devices, setting both MDM and MAM scopes to 'All' causes MAM policies (WIP/MAM) to take precedence over MDM enrollment, preventing automatic MDM enrollment into Intune.",
        examTip: "Always set MDM User Scope = All (or a group) and MAM User Scope = None for Windows enrollments."
      }
    ]
  },
  {
    id: "lab-5",
    number: "5",
    phaseId: "phase-3",
    domainId: "domain-1",
    title: "Windows Autopilot User-Driven Deployment (Classic Hash)",
    duration: "50 mins",
    difficulty: "Advanced",
    summary: "Provision a corporate Windows 11 endpoint from OOBE using cloud-native Windows Autopilot (Hardware Hash), enforce Enrollment Status Page (ESP) blockers, and collect diagnostic CAB packages.",
    keyConcepts: ["Windows Autopilot", "Hardware Hash (4K)", "Enrollment Status Page (ESP)", "mdmdiagnosticstool", "Standard User Profile"],
    checklist: [
      { id: "t-5-1", text: "Harvest hardware hash using Get-WindowsAutopilotInfo PowerShell script in OOBE (Shift + F10)." },
      { id: "t-5-2", text: "Import CSV into Intune > Devices > Enrollment > Windows Autopilot devices with GroupTag 'Finance-Laptops'." },
      { id: "t-5-3", text: "Create Dynamic Device Group: GRP-DEV-WIN-AUTOPILOT matching '[OrderID]:Finance-Laptops'." },
      { id: "t-5-4", text: "Deploy Autopilot Profile: User-Driven, Entra Joined, Standard User, Device Name Template CON-FIN-%RAND:4%." },
      { id: "t-5-5", text: "Configure ESP: Block device until required apps (M365 Apps, Company Portal, Edge) install (Timeout 45m)." },
      { id: "t-5-6", text: "Boot VM 2, complete OOBE sign-in, simulate ESP failure, and export diagnostics with mdmdiagnosticstool.exe." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Extract 4K Hardware Hash in Windows OOBE",
            "desc": "1. Start <strong>MD102-VM2-Alex</strong> from a fresh Windows 11 installation ISO.<br/>2. When the Region/Keyboard selection screen appears (Out-Of-Box Experience / OOBE), press <strong>Shift + F10</strong> to launch cmd.exe.<br/>3. Type <code>powershell</code> and press Enter.<br/>4. Execute: <code>Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force</code><br/>5. Execute: <code>Install-Script -Name Get-WindowsAutopilotInfo -Force</code><br/>6. Execute: <code>Get-WindowsAutopilotInfo -OutputFile C:\\AutopilotHash.csv -GroupTag Corp-Win11</code>"
      },
      {
            "step": 2,
            "title": "Exercise 2: Import Hardware Hash into Intune",
            "desc": "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Windows</strong> > <strong>Devices</strong> (under Windows Autopilot).<br/>2. Click <strong>+ Import</strong> > browse and select <code>AutopilotHash.csv</code> > click <strong>Import</strong>.<br/>3. Wait until the sync status completes (device displays <em>Assigned</em>)."
      },
      {
            "step": 3,
            "title": "Exercise 3: Create Dynamic Device Group & Autopilot Deployment Profile",
            "desc": "1. In Entra admin center > <strong>Groups</strong> > <strong>New group</strong> > Security > Name: <code>GRP-DEV-WIN-AUTOPILOT</code> > Membership type: <strong>Dynamic Device</strong>.<br/>2. Dynamic Rule: <code>(device.devicePhysicalIDs -any (_ -contains \"[OrderID]:Corp-Win11\"))</code> > click <strong>Save</strong> > click <strong>Create</strong>.<br/>3. In Intune admin center > <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Deployment Profiles</strong> > <strong>+ Create profile</strong> > <strong>Windows PC</strong>.<br/>4. Name: <code>Autopilot-UserDriven-AzureADJoin</code>.<br/>5. Deployment mode: <strong>User-Driven</strong> | Join to Entra ID as: <strong>Microsoft Entra joined</strong>.<br/>6. User account type: <strong>Standard</strong> (Enforces Least Privilege).<br/>7. Assignments: Assign to <code>GRP-DEV-WIN-AUTOPILOT</code> > click <strong>Create</strong>."
      },
      {
            "step": 4,
            "title": "Exercise 4: Configure Enrollment Status Page (ESP)",
            "desc": "1. In Intune admin center > <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Enrollment Status Page</strong>.<br/>2. Select <strong>Default</strong> profile > click <strong>Properties</strong> > Edit <em>Settings</em>.<br/>3. Set <em>Show app and profile configuration progress</em> to <strong>Yes</strong>.<br/>4. Set <em>Block device use until all apps and profiles are installed</em> to <strong>Yes</strong>.<br/>5. Set <em>Show error when installation takes longer than specified number of minutes</em> to <strong>60</strong>.<br/>6. Click <strong>Review + save</strong>."
      },
      {
            "step": 5,
            "title": "Exercise 5: Test Autopilot Deployment on VM 2",
            "desc": "1. Reboot <strong>MD102-VM2-Alex</strong>.<br/>2. Observe the customized Contoso company branding on the Welcome screen.<br/>3. Sign in as <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code> with password <code>ContosoLabP@ssw0rd2026!</code>.<br/>4. Watch the 3-phase ESP complete: Device preparation, Device setup, Account setup."
      }
    ],
    scripts: [
      {
        title: "Autopilot Hardware Hash Extraction Script",
        lang: "powershell",
        code: `# Extract Windows Autopilot Hardware Hash in OOBE (Shift + F10)
Set-ExecutionPolicy Bypass -Scope Process -Force
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
Install-Script -Name Get-WindowsAutopilotInfo -Force

# Extract hash with Group Tag
Get-WindowsAutopilotInfo -OutputFile C:\\AutopilotHWID.csv -GroupTag "Finance-Laptops"
Write-Host "Hardware Hash CSV exported to C:\\AutopilotHWID.csv" -ForegroundColor Green`
      },
      {
        title: "Export ESP & Autopilot Diagnostics CAB",
        lang: "cmd",
        code: `:: Run from elevated prompt during or after Autopilot OOBE
mdmdiagnosticstool.exe -area Autopilot;DeviceEnrollment;DeviceProvisioning -cab C:\\Temp\\ESP_Diagnostics.cab
echo Diagnostics exported to C:\\Temp\\ESP_Diagnostics.cab`
      }
    ],
    troubleshooting: [
      {
        scenario: "Autopilot ESP times out with error 'Installation failed: One or more required apps could not be installed.'",
        rootCause: "A required Win32 application assigned as an ESP blocking app failed its detection script or installer returned a non-zero exit code.",
        diagnosticCommand: "Press Shift + F10 > Open C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log.",
        resolution: "Search the log for '[Win32App] Failed to install' and examine the exit code or fix the detection rule in Intune."
      }
    ],
    quiz: [
      {
        question: "During Windows Autopilot User-Driven deployment, you want to enforce that all provisioned users are created as Standard Users without local administrator privileges. Where is this configured?",
        options: [
          "In the Enrollment Status Page (ESP) settings profile.",
          "In the Windows Autopilot Deployment Profile under User Account Type.",
          "In the Microsoft Entra ID Device Settings page.",
          "In the Windows Subscription Activation license configuration."
        ],
        correctIndex: 1,
        rationale: "The Windows Autopilot Deployment Profile contains the setting 'User account type' which can be toggled between 'Administrator' and 'Standard'. Standard enforces least-privilege security.",
        examTip: "Autopilot Profile controls: Join Type, EULA/Privacy screens, Account Type (Admin vs Standard), Device Naming. ESP controls: blocking behavior, required apps/profiles, timeouts."
      }
    ]
  },
  {
    id: "lab-5b",
    number: "5B",
    phaseId: "phase-3",
    domainId: "domain-1",
    title: "Windows Autopilot Device Preparation (Autopilot v2)",
    duration: "40 mins",
    difficulty: "Advanced",
    summary: "Deploy Windows 11 using Microsoft's next-generation Autopilot Device Preparation policy, provisioning devices into Entra ID without harvesting or uploading hardware hashes.",
    keyConcepts: ["Autopilot v2", "Device Preparation", "No Hardware Hash Required", "Static Group Targeting", "Confidential Client SPN"],
    checklist: [
      { id: "t-5b-1", text: "Create Static Security Group: GRP-DEV-WIN-AUTOPILOT-V2 in Microsoft Entra ID." },
      { id: "t-5b-2", text: "Grant Service Principal Ownership: Add 'Intune Autopilot Confidential Client App' as group owner." },
      { id: "t-5b-3", text: "Create Device Preparation Policy under Devices > Enrollment > Device preparation policies." },
      { id: "t-5b-4", text: "Configure settings: Target group GRP-DEV-WIN-AUTOPILOT-V2, Standard user, M365 Apps & Company Portal." },
      { id: "t-5b-5", text: "Boot clean un-hashed VM 3, sign in with megan.bowen@<tenant>.onmicrosoft.com, and validate provisioning." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create Static Security Group for Autopilot v2",
            "desc": "1. In Microsoft Entra admin center, navigate to <strong>Groups</strong> > <strong>All groups</strong> > <strong>New group</strong>.<br/>2. Group type: <strong>Security</strong> | Group name: <code>GRP-DEV-WIN-AUTOPILOT-V2</code>.<br/>3. Membership type: <strong>Assigned</strong> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Assign Intune Autopilot Service Principal as Group Owner",
            "desc": "1. Open group <code>GRP-DEV-WIN-AUTOPILOT-V2</code> > under <em>Manage</em>, select <strong>Owners</strong>.<br/>2. Click <strong>+ Add owners</strong>.<br/>3. Search for the enterprise application: <code>Intune Autopilot Confidential Client</code> (App ID: <code>f1346770-5b25-470b-88bd-d5744ab7952c</code>).<br/>4. Select it and click <strong>Select</strong> (This grants Intune service permission to automatically join devices into this group without hardware hashes!)."
      },
      {
            "step": 3,
            "title": "Exercise 3: Create Device Preparation Policy in Intune",
            "desc": "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Device preparation policies</strong> > click <strong>+ Create</strong>.<br/>2. Name: <code>Autopilot-v2-Corporate-Policy</code>.<br/>3. <em>Device group:</em> Select <code>GRP-DEV-WIN-AUTOPILOT-V2</code>.<br/>4. <em>Configuration settings:</em> Join type: <strong>Microsoft Entra joined</strong> | Account type: <strong>Standard user</strong>.<br/>5. <em>Apps & Scripts:</em> Select initial required packages (e.g. Company Portal, M365 Apps).<br/>6. <em>Assignments:</em> Assign to <code>GRP-USR-HR</code> (Megan Bowen).<br/>7. Click <strong>Review + create</strong> > <strong>Create</strong>."
      },
      {
            "step": 4,
            "title": "Exercise 4: Deploy Clean Un-Hashed Windows 11 VM 3",
            "desc": "1. Power on <strong>MD102-VM3-Megan</strong> (Clean un-hashed Windows 11 23H2/24H2 VM).<br/>2. In OOBE, sign in as <code>megan.bowen@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Observe instantaneous enrollment into <code>GRP-DEV-WIN-AUTOPILOT-V2</code> and silent policy application without any CSV hash import delay!"
      }
    ],
    scripts: [
      {
        title: "PowerShell Setup for Autopilot Device Preparation Group & SPN",
        lang: "powershell",
        code: `# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Group.ReadWrite.All", "Application.Read.All"

# Create Static Group
$Group = New-MgGroup -DisplayName "GRP-DEV-WIN-AUTOPILOT-V2" -MailEnabled:$false -MailNickname "GRP-DEV-WIN-AP-V2" -SecurityEnabled:$true

# Find Intune Autopilot Confidential Client Service Principal
$SP = Get-MgServicePrincipal -Filter "appId eq 'f1346770-5b25-470b-88bd-d5744ab7952c'"

# Add Service Principal as Group Owner
New-MgGroupOwnerByRef -GroupId $Group.Id -DirectoryObjectId $SP.Id
Write-Host "Group created and Intune Autopilot SPN assigned as owner successfully!" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "Autopilot Device Preparation fails during OOBE with error stating device cannot be added to the target group.",
        rootCause: "The service principal 'Intune Autopilot Confidential Client App' was not assigned as an Owner on the static target device group.",
        diagnosticCommand: "In Entra ID > Groups > GRP-DEV-WIN-AUTOPILOT-V2 > Check Owners list.",
        resolution: "Add 'Intune Autopilot Confidential Client App' to the Owners tab of the security group."
      }
    ],
    quiz: [
      {
        question: "Which of the following statements accurately describes a key architectural difference between Windows Autopilot Device Preparation (Autopilot v2) and Classic Windows Autopilot?",
        options: [
          "Autopilot Device Preparation requires uploading a 4K hardware hash CSV prior to deployment.",
          "Autopilot Device Preparation supports Hybrid Entra Join and Active Directory domain join.",
          "Autopilot Device Preparation does NOT require hardware hash registration and targets a static security group owned by an Intune SPN.",
          "Autopilot Device Preparation only runs in Windows Recovery Environment (WinRE)."
        ],
        correctIndex: 2,
        rationale: "Autopilot Device Preparation (v2) eliminates the need to capture and upload hardware hashes. It requires Microsoft Entra Join only and utilizes a static security group where the 'Intune Autopilot Confidential Client App' is configured as an owner.",
        examTip: "Classic Autopilot = Hardware Hash + Dynamic Group. Autopilot Device Preparation (v2) = No Hash + Static Group + SPN Owner + Entra Join Only."
      }
    ]
  },
  {
    id: "lab-6",
    number: "6",
    phaseId: "phase-4",
    domainId: "domain-3",
    title: "Settings Catalog Architecture & Assignment Filters",
    duration: "45 mins",
    difficulty: "Intermediate",
    summary: "Build granular, modular configuration baselines using the Settings Catalog and target endpoints efficiently using dynamic Intune Assignment Filters.",
    keyConcepts: ["Settings Catalog", "Assignment Filters", "OneDrive Known Folder Move (KFM)", "Edge Hardening", "Filter Evaluation Engine"],
    checklist: [
      { id: "t-6-1", text: "Create Settings Catalog Profile: WIN-CFG-SettingsCatalog-OneDriveKFM." },
      { id: "t-6-2", text: "Configure KFM: 'Silently move Windows known folders to OneDrive' = Enabled with Tenant ID." },
      { id: "t-6-3", text: "Configure KFM: 'Prevent users from redirecting known folders' & 'Silently sign in users' = Enabled." },
      { id: "t-6-4", text: "Create Assignment Filter: 'Filter-Corporate-Win11' (OS version starts with 10.0.22 and ownership = Company)." },
      { id: "t-6-5", text: "Assign profile to 'All Devices' with Filter mode 'Include filtered devices in assignment'." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create OneDrive KFM Profile in Settings Catalog",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile type: <strong>Settings catalog</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CFG-OneDrive-KFM</code>.<br/>4. Click <strong>+ Add settings</strong> > search for <code>OneDrive</code> > select category <strong>OneDrive</strong>.<br/>5. Check <em>Silently move Windows known folders to OneDrive</em> and <em>Silently sign in users to the OneDrive sync app with their Windows credentials</em>.<br/>6. Set Tenant ID: <code>&lt;Tenant GUID&gt;</code> | Show notification to users after folders have been redirected: <strong>No</strong>.<br/>7. Select <strong>Next</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Create Microsoft Edge Hardening Profile",
            "desc": "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Settings catalog).<br/>2. Name: <code>WIN-CFG-Edge-Security-Hardening</code>.<br/>3. Add settings from <strong>Microsoft Edge</strong> category:<br/>&nbsp;&nbsp;• <em>Configure SmartScreen</em>: <strong>Enabled</strong><br/>&nbsp;&nbsp;• <em>Prevent bypassing SmartScreen prompts for sites</em>: <strong>Enabled</strong><br/>&nbsp;&nbsp;• <em>Default search provider</em>: <strong>Enabled (Bing Corporate Secure)</strong>.<br/>4. Select <strong>Next</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Create Dynamic Assignment Filter for Windows 11",
            "desc": "1. In Intune admin center, go to <strong>Tenant administration</strong> > <strong>Filters</strong> > click <strong>+ Create</strong>.<br/>2. Name: <code>FLT-Corporate-Win11-Enterprise</code> | Platform: <strong>Windows 10 and later</strong>.<br/>3. Rule syntax: <code>(device.operatingSystemSKU -eq \"Enterprise\") and (device.osVersion -ge \"10.0.22631\")</code>.<br/>4. Click <strong>Next</strong> > <strong>Create</strong>."
      },
      {
            "step": 4,
            "title": "Exercise 4: Assign Profile with Filter Mode: Include",
            "desc": "1. Open profile <code>WIN-CFG-OneDrive-KFM</code> > select <strong>Properties</strong> > Edit <strong>Assignments</strong>.<br/>2. Under <em>Included groups</em>: Select <strong>All Devices</strong>.<br/>3. Click <strong>Edit filter</strong> > select <strong>Include filtered devices in assignment</strong> > choose <code>FLT-Corporate-Win11-Enterprise</code>.<br/>4. Click <strong>Review + save</strong>."
      }
    ],
    scripts: [
      {
        title: "Verify OneDrive KFM Registry Settings on Client",
        lang: "powershell",
        code: `# Check OneDrive Known Folder Move Registry Enforcement
$KFMRegPath = "HKLM:\SOFTWARE\Policies\Microsoft\OneDrive"

if (Test-Path $KFMRegPath) {
    Get-ItemProperty -Path $KFMRegPath | Select-Object KFMSilentOptIn, KFMSilentOptInWithNotification, KFMBlockOptOut
} else {
    Write-Warning "OneDrive policy registry path not found. Sync Intune device policy."
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Settings Catalog profile shows 'Not Applicable' on client workstation.",
        rootCause: "The assignment filter condition evaluated to false on this device (e.g. device ownership was set to Personal or OS version did not match).",
        diagnosticCommand: "Open Intune > Device > Device configuration > Select profile > Filter evaluation tab.",
        resolution: "Review the Filter Evaluation log in Intune to see which property caused the filter rule to evaluate to false."
      }
    ],
    quiz: [
      {
        question: "You need to assign a Settings Catalog configuration profile to all corporate Windows 11 devices, while excluding personal Windows 11 devices and all Windows 10 devices. What is the most efficient and scalable method?",
        options: [
          "Create separate static groups for every hardware model.",
          "Assign the profile to 'All Devices' and apply an Assignment Filter that matches Windows 11 OS version and Company ownership.",
          "Assign the profile to 'All Users' and use PowerShell scripts on each device to check ownership.",
          "Use Group Policy Analytics to convert the profile into a legacy ADMX file."
        ],
        correctIndex: 1,
        rationale: "Assignment Filters evaluate at device check-in time with zero group expansion latency, allowing targeted inclusion or exclusion based on device properties such as OS version and ownership.",
        examTip: "Filters > Dynamic Groups for policy assignment performance and scalability."
      }
    ]
  },
  {
    id: "lab-6b",
    number: "6B",
    phaseId: "phase-4",
    domainId: "domain-3",
    title: "Group Policy Analytics & Direct Migration",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Ingest on-premises Active Directory GPO backup XML files into Intune, analyze Configuration Service Provider (CSP) mapping support, and migrate supported settings directly into Settings Catalog.",
    keyConcepts: ["Group Policy Analytics", "CSP Mappings", "MDM Support Percentage", "Direct GPO Migration", "ADMX Ingestion"],
    checklist: [
      { id: "t-6b-1", text: "Export an Active Directory GPO backup as XML using 'Backup-GPO' PowerShell cmdlet." },
      { id: "t-6b-2", text: "Navigate to Intune > Devices > Manage devices > Group Policy analytics." },
      { id: "t-6b-3", text: "Import the GPO XML file and review MDM Support Percentage score." },
      { id: "t-6b-4", text: "Analyze mapped CSPs (e.g. ./Device/Vendor/MSFT/Policy/Config/...) and unsupported legacy settings." },
      { id: "t-6b-5", text: "Click Migrate, select supported settings, generate 'WIN-MIGRATED-GPO-Baseline', and assign to group." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Export GPO Backup from Active Directory",
            "desc": "1. On an Active Directory domain controller or management PC, open <strong>Group Policy Management Console (GPMC)</strong>.<br/>2. Right-click the targeted GPO (e.g. <em>Default Domain Security Policy</em>) > select <strong>Save Report...</strong>.<br/>3. Save as <strong>XML File (*.xml)</strong> to <code>C:\\GPO_Backup.xml</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Import GPO XML into Group Policy Analytics",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Group Policy analytics</strong>.<br/>2. Click <strong>+ Import</strong>.<br/>3. Select <code>C:\\GPO_Backup.xml</code> > click <strong>Next</strong> > click <strong>Create</strong>.<br/>4. Wait 15 seconds for Intune to parse all GPO settings against the modern Windows Configuration Service Provider (CSP) database."
      },
      {
            "step": 3,
            "title": "Exercise 3: Analyze MDM Support Score & Mapped CSPs",
            "desc": "1. In Group Policy analytics list, observe the <strong>MDM Support %</strong> (e.g. <em>92%</em>).<br/>2. Click on the GPO name to open the detailed breakdown.<br/>3. Review settings with status <strong>Yes</strong> (Direct CSP match) vs <strong>No</strong> (Deprecated/unsupported registry hacks)."
      },
      {
            "step": 4,
            "title": "Exercise 4: Execute Direct Migration into Settings Catalog",
            "desc": "1. In the GPO detail view, check all supported settings > click <strong>Migrate</strong>.<br/>2. Select target platform: <strong>Windows 10 and later</strong>.<br/>3. Profile name: <code>WIN-CFG-Migrated-DomainSecurity</code>.<br/>4. Click <strong>Next</strong> > Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Export AD GPO to XML Report",
        lang: "powershell",
        code: `# Run on Domain Controller or Management Station with ActiveDirectory module
Import-Module GroupPolicy

# Generate GPO XML Report
Get-GPOReport -Name "Corporate Baseline GPO" -ReportType Xml -Path "C:\\GPOBackup\\Corporate_Baseline_Report.xml"
Write-Host "GPO XML Report generated at C:\\GPOBackup\\Corporate_Baseline_Report.xml" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "Imported GPO in Group Policy Analytics shows an MDM Support score of 45% with key security settings flagged as 'No'.",
        rootCause: "The legacy GPO contains proprietary 3rd-party software settings or deprecated Windows settings that have no native modern CSP equivalent.",
        diagnosticCommand: "Review the 'MDM support' column in the Group Policy analytics report.",
        resolution: "Deploy unsupported settings using Custom OMA-URI policies, custom ADMX ingestion, or Proactive Remediations PowerShell scripts."
      }
    ],
    quiz: [
      {
        question: "What is the primary function of Group Policy analytics in Microsoft Intune?",
        options: [
          "To automatically apply Active Directory GPOs directly to cloud-only joined PCs over the internet.",
          "To analyze on-premises GPO XML backups, determine MDM/CSP compatibility, and migrate supported settings into Intune profiles.",
          "To replicate Intune Settings Catalog policies into on-premises Domain Controllers.",
          "To monitor client CPU usage during Group Policy background processing."
        ],
        correctIndex: 1,
        rationale: "Group Policy analytics analyzes exported GPO XML files, maps legacy GPO settings to modern Configuration Service Provider (CSP) equivalents, and allows direct migration into Intune Settings Catalog profiles.",
        examTip: "GPO Analytics workflow: Export GPO (XML) $\\rightarrow$ Import to Intune $\\rightarrow$ Review MDM % $\\rightarrow$ Migrate to Settings Catalog."
      }
    ]
  },
  {
    id: "lab-6c",
    number: "6C",
    phaseId: "phase-4",
    domainId: "domain-3",
    title: "Enterprise PKI, SCEP/PKCS Certificates & Wi-Fi Profiles",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Deploy Trusted Root CA certificates, configure Simple Certificate Enrollment Protocol (SCEP) / PKCS certificate profiles with TPM KSP key storage, and deploy an 802.1X Enterprise Wi-Fi profile.",
    keyConcepts: ["SCEP / PKCS", "NDES Connector", "TPM Key Storage Provider", "802.1X EAP-TLS", "Subject Name Templates"],
    checklist: [
      { id: "t-6c-1", text: "Create Trusted Root Certificate Profile deploying ContosoRootCA.cer to Computer certificate store." },
      { id: "t-6c-2", text: "Create SCEP Certificate Profile: Subject CN={{UserPrincipalName}}, SAN UPN={{UserPrincipalName}}." },
      { id: "t-6c-3", text: "Set Key Storage Provider: 'Enroll to TPM KSP if present, otherwise fail' (2048-bit key size)." },
      { id: "t-6c-4", text: "Create 802.1X Enterprise Wi-Fi Profile: SSID 'Contoso-Corp-Secure', EAP-TLS, linking Root & SCEP profiles." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Deploy Trusted Root CA Certificate Profile",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile type: <strong>Templates</strong> > select <strong>Trusted certificate</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CERT-RootCA</code>.<br/>4. Certificate file: Upload enterprise Root CA public certificate (<code>.cer</code>).<br/>5. Destination store: <strong>Computer certificate store - Root</strong>.<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Create SCEP User Certificate Profile",
            "desc": "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Templates > <strong>SCEP certificate</strong>).<br/>2. Name: <code>WIN-CERT-SCEP-User</code>.<br/>3. Certificate type: <strong>User</strong> | Subject name format: <code>CN={{UserPrincipalName}}</code>.<br/>4. Subject alternative name (SAN): <strong>User Principal Name (UPN)</strong> = <code>{{UserPrincipalName}}</code>.<br/>5. Key storage provider (KSP): <strong>Enroll to TPM KSP if present, otherwise software KSP</strong>.<br/>6. SCEP Server URLs: Enter NDES SCEP server URL.<br/>7. Assign to <code>GRP-LIC-M365-E5</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Configure 802.1X Enterprise Wi-Fi Profile",
            "desc": "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Templates > <strong>Wi-Fi</strong>).<br/>2. Wi-Fi type: <strong>Enterprise</strong> | Network name (SSID): <code>Contoso-SecureCorp</code>.<br/>3. EAP type: <strong>EAP - TLS</strong>.<br/>4. Root certificate for server validation: Select <code>WIN-CERT-RootCA</code>.<br/>5. Authentication certificate: Select <code>WIN-CERT-SCEP-User</code>.<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Verify SCEP Certificate in TPM KSP via PowerShell",
        lang: "powershell",
        code: `# Query User and Machine Certificate Stores for SCEP Certificates
Get-ChildItem -Path Cert:\\CurrentUser\\My | Select-Object Subject, Issuer, NotAfter, HasPrivateKey, Thumbprint

# Validate TPM Key Storage Provider
$Certs = Get-ChildItem -Path Cert:\\CurrentUser\\My
foreach ($Cert in $Certs) {
    Write-Host "Cert Subject: $($Cert.Subject)" -ForegroundColor Cyan
    Write-Host "Private Key Present: $($Cert.HasPrivateKey)" -ForegroundColor Green
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "SCEP certificate deployment fails on VM with error 'TPM KSP failure / Key storage provider could not be accessed.'",
        rootCause: "The VM is Generation 1 or does not have Virtual TPM (vTPM) enabled in Hyper-V/VMware settings.",
        diagnosticCommand: "Get-Tpm in elevated PowerShell. Check TpmPresent: True, TpmReady: True.",
        resolution: "Shut down VM, enable Virtual TPM in Hyper-V VM Settings > Security > Enable Trusted Platform Module."
      }
    ],
    quiz: [
      {
        question: "You are deploying a SCEP user certificate profile in Microsoft Intune for 802.1X Wi-Fi authentication. You must ensure the private key is securely stored in hardware and cannot be exported. Which setting should you configure?",
        options: [
          "Set Key Storage Provider (KSP) to 'Enroll to TPM KSP if present, otherwise fail' and disable private key export.",
          "Set Certificate type to 'Device' and use Software KSP.",
          "Configure an App Protection Policy requiring a 6-digit PIN.",
          "Set the Key Usage to 'Data encipherment only'."
        ],
        correctIndex: 0,
        rationale: "Selecting 'Enroll to TPM KSP if present, otherwise fail' ensures the RSA private key is generated inside and locked to the device's hardware TPM chip, preventing key export and unauthorized cloning.",
        examTip: "Always deploy Trusted Root Certificate first before deploying SCEP/PKCS profiles that reference it."
      }
    ]
  },
  {
    id: "lab-7",
    number: "7",
    phaseId: "phase-4",
    domainId: "domain-2",
    title: "Windows Hello for Business & Cloud-Native Windows LAPS",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Implement biometric and PIN passwordless authentication via Windows Hello for Business and deploy cloud-native Windows Local Administrator Password Solution (LAPS) backed by Entra ID.",
    keyConcepts: ["Windows Hello for Business (WHfB)", "Cloud LAPS", "Entra Password Escrow", "LAPS Password Rotation", "Enhanced Anti-Spoofing"],
    checklist: [
      { id: "t-7-1", text: "Configure tenant-wide Windows Hello for Business policy (TPM required, 6-digit PIN, Enhanced Anti-spoofing)." },
      { id: "t-7-2", text: "Create Windows LAPS Policy: Backup password to Microsoft Entra ID only." },
      { id: "t-7-3", text: "Configure LAPS: Account name 'ContosoLocalAdmin', 16-char complexity, 30-day age." },
      { id: "t-7-4", text: "Assign LAPS policy to GRP-DEV-WIN-CORPORATE and sync VM 1." },
      { id: "t-7-5", text: "Validate password escrow in Entra admin center and test remote manual password rotation." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure Tenant-Wide Windows Hello for Business",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Windows</strong> > <strong>Windows Hello for Business</strong>.<br/>2. Configure Windows Hello for Business: <strong>Enabled</strong>.<br/>3. Use a Trusted Platform Module (TPM): <strong>Required</strong>.<br/>4. Minimum PIN length: <strong>6</strong> | Maximum PIN length: <strong>127</strong>.<br/>5. Letters in PIN: <strong>Allowed</strong> | Special characters in PIN: <strong>Allowed</strong>.<br/>6. PIN expiration (days): <strong>0 (Never expire - Microsoft recommendation for MFA PINs)</strong>.<br/>7. Use biometric authentication: <strong>Allowed (Facial recognition / Fingerprint with Enhanced Anti-spoofing)</strong>.<br/>8. Click <strong>Save</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Create Cloud-Native Windows LAPS Policy",
            "desc": "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Account protection</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile: <strong>Local admin password solution (Windows LAPS)</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-CloudLAPS-EntraID</code>.<br/>4. <em>Backup Directory:</em> <strong>Backup the password to Microsoft Entra ID only</strong>.<br/>5. <em>Password Age Days:</em> <strong>30</strong>.<br/>6. <em>Administrator Account Name:</em> <code>ContosoCloudAdmin</code>.<br/>7. <em>Password Complexity:</em> <strong>Large letters, small letters, numbers and special characters (32 chars)</strong>.<br/>8. <em>Post Authentication Actions:</em> Reset password and logoff managed account after <strong>8 hours</strong>.<br/>9. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Verify LAPS Password Escrow in Microsoft Entra Admin Center",
            "desc": "1. Sign in to <strong>https://entra.microsoft.com</strong> > navigate to <strong>Identity</strong> > <strong>Devices</strong> > <strong>All devices</strong>.<br/>2. Select <strong>MD102-VM1-Adele</strong>.<br/>3. Under <em>Manage</em>, select <strong>Local administrator password recovery</strong>.<br/>4. Click <strong>Show local administrator password</strong> and verify that the 32-character password and rotation timestamp are securely escrowed!"
      }
    ],
    scripts: [
      {
        title: "Verify Windows LAPS Client Events via PowerShell",
        lang: "powershell",
        code: `# Query Windows LAPS Operational Event Log
$LAPSEvents = Get-WinEvent -LogName "Microsoft-Windows-LAPS/Operational" -MaxEvents 5 -ErrorAction SilentlyContinue

foreach ($Event in $LAPSEvents) {
    [PSCustomObject]@{
        TimeCreated = $Event.TimeCreated
        Id          = $Event.Id
        Message     = $Event.Message
    }
}

# Event ID 10017 = LAPS successfully backed up password to Entra ID`
      }
    ],
    troubleshooting: [
      {
        scenario: "Windows LAPS policy applied to device, but 'Show local administrator password' in Entra ID returns 'No password available'.",
        rootCause: "The target local administrator account name specified in the LAPS policy does not exist on the client workstation, or the client has not completed its first rotation cycle.",
        diagnosticCommand: "Open Event Viewer > Applications and Services Logs > Microsoft > Windows > LAPS > Operational > Look for Event ID 10013 or 10017.",
        resolution: "Ensure the local admin account exists or configure LAPS to manage the built-in Administrator account (RID 500)."
      }
    ],
    quiz: [
      {
        question: "You are configuring a Windows LAPS policy in Microsoft Intune for cloud-only Microsoft Entra joined endpoints. Where should the local administrator passwords be backed up?",
        options: [
          "Active Directory Domain Services via Azure AD Connect.",
          "An encrypted text file in an Azure Storage blob container.",
          "Backup the password to Microsoft Entra ID only.",
          "Intune Management Extension local registry."
        ],
        correctIndex: 2,
        rationale: "For cloud-native Microsoft Entra joined devices, Windows LAPS natively escrows passwords directly into Microsoft Entra ID device objects, viewable by authorized admins in the Entra portal or via Graph API.",
        examTip: "Cloud-native Entra Joined = Escrow to Microsoft Entra ID. Hybrid Joined = Escrow to Active Directory OR Entra ID."
      }
    ]
  },
  {
    id: "lab-8",
    number: "8",
    phaseId: "phase-5",
    domainId: "domain-3",
    title: "Built-in Device Compliance Policies & Non-Compliance Actions",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Define comprehensive security compliance baselines enforcing BitLocker, Secure Boot, Defender Antivirus, and Defender Machine Risk, and configure automated non-compliance escalation actions.",
    keyConcepts: ["Compliance Policies", "Device Health Attestation", "Defender Machine Risk", "Actions for Non-Compliance", "Retire BYOD"],
    checklist: [
      { id: "t-8-1", text: "Create Compliance Policy 'WIN-CMP-Corporate-Baseline' for Windows 10 and later." },
      { id: "t-8-2", text: "Configure Device Health: BitLocker = Require, Secure Boot = Require, Code Integrity = Require." },
      { id: "t-8-3", text: "Configure System Security: Defender Antivirus = Require, Real-time protection = Require, Firewall = Require." },
      { id: "t-8-4", text: "Set Machine Risk Score = Clear (no Medium or High threats allowed)." },
      { id: "t-8-5", text: "Configure Actions for Non-Compliance: Mark non-compliant immediately, email user after 1 day, retire after 7 days." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create Windows 11 Baseline Compliance Policy",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Compliance</strong> > click <strong>+ Create policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CMP-Baseline-Production</code>.<br/>4. On the <em>Compliance settings</em> tab:<br/>&nbsp;&nbsp;• <em>Device Health:</em> Require BitLocker: <strong>Require</strong> | Require Secure Boot: <strong>Require</strong> | Require Code Integrity: <strong>Require</strong>.<br/>&nbsp;&nbsp;• <em>Device Properties:</em> Min OS version: <code>10.0.22631.0</code>.<br/>&nbsp;&nbsp;• <em>System Security:</em> Require password to unlock mobile devices: <strong>Require</strong> | Minimum password length: <strong>8</strong> | Firewall: <strong>Require</strong> | Antivirus: <strong>Require</strong> | Antispyware: <strong>Require</strong>.<br/>5. Select <strong>Next</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Microsoft Defender Machine Risk Score Boundary",
            "desc": "1. In the same compliance policy, scroll down to <strong>Microsoft Defender for Endpoint</strong> category.<br/>2. Require the device to be at or under the machine risk score: <strong>Clear (Low risk)</strong>.<br/>3. Select <strong>Next</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Configure Scheduled Actions for Non-Compliance",
            "desc": "1. On the <em>Actions for noncompliance</em> tab:<br/>&nbsp;&nbsp;• Action 1: <strong>Mark device noncompliant</strong> | Schedule: <strong>Immediately (0 days)</strong>.<br/>&nbsp;&nbsp;• Action 2: <strong>Send email to end user</strong> | Schedule: <strong>1 day</strong>.<br/>&nbsp;&nbsp;• Action 3: <strong>Remotely lock the noncompliant device</strong> | Schedule: <strong>3 days</strong>.<br/>&nbsp;&nbsp;• Action 4: <strong>Retire the noncompliant device</strong> | Schedule: <strong>30 days</strong>.<br/>2. On the <em>Assignments</em> tab: Assign to <code>GRP-DEV-WIN-CORPORATE</code>.<br/>3. Click <strong>Review + create</strong> > <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "PowerShell Device Health Attestation Check",
        lang: "powershell",
        code: `# Inspect Device Compliance Prerequisite Health States
$BitLocker = (Get-BitLockerVolume -MountPoint C:).ProtectionStatus
$SecureBoot = Confirm-SecureBootUEFI
$Defender = (Get-MpComputerStatus).RealTimeProtectionEnabled

[PSCustomObject]@{
    BitLockerProtection = if ($BitLocker -eq 1) { "ON (Compliant)" } else { "OFF (Non-Compliant)" }
    SecureBootEnabled   = if ($SecureBoot) { "YES (Compliant)" } else { "NO (Non-Compliant)" }
    DefenderRealTime    = if ($Defender) { "ACTIVE (Compliant)" } else { "DISABLED (Non-Compliant)" }
} | Format-List`
      }
    ],
    troubleshooting: [
      {
        scenario: "Device is marked non-compliant in Intune with reason: 'BitLocker - Require'. However, the C: drive is fully encrypted.",
        rootCause: "BitLocker is active, but the recovery key has not yet finished escrowing to Microsoft Entra ID or TPM PCR validation failed.",
        diagnosticCommand: "manage-bde -status C: & check Protection Status: Protection On.",
        resolution: "Trigger manual policy sync in Company Portal and confirm BitLocker recovery password exists in Entra ID device object."
      }
    ],
    quiz: [
      {
        question: "You want to notify users immediately when their device falls out of compliance, and automatically remove corporate data from personal devices if they remain non-compliant after 5 days. How should you configure the compliance policy?",
        options: [
          "Create a Conditional Access policy with a 5-day session lifetime.",
          "In Actions for non-compliance, add 'Send email to end user' with 0 days, and 'Retire the noncompliant device' with 5 days.",
          "Deploy a PowerShell Proactive Remediation script that runs every 5 hours.",
          "Configure an Enrollment Restriction with a 5-day grace period."
        ],
        correctIndex: 1,
        rationale: "Actions for non-compliance in Intune allow multi-stage schedules: instantly marking non-compliant / emailing users at 0 days, and escalating to 'Retire the noncompliant device' after a specified number of days.",
        examTip: "'Retire' removes corporate apps and data while keeping personal data intact; 'Wipe' factory resets the entire PC."
      }
    ]
  },
  {
    id: "lab-8b",
    number: "8B",
    phaseId: "phase-5",
    domainId: "domain-3",
    title: "Custom Compliance Policies (PowerShell Discovery + JSON Schema)",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Enforce enterprise compliance checks beyond built-in rules by creating a PowerShell discovery script that outputs compressed JSON, paired with a strict JSON rule schema.",
    keyConcepts: ["Custom Compliance", "PowerShell Discovery Script", "JSON Rule Schema", "ConvertTo-Json -Compress", "SettingName Mapping"],
    checklist: [
      { id: "t-8b-1", text: "Author PowerShell discovery script Discover-EnterpriseSecurity.ps1 (Print Spooler, Free Space, TLS 1.0)." },
      { id: "t-8b-2", text: "Ensure script returns compressed JSON containing exact key-value pairs using ConvertTo-Json -Compress." },
      { id: "t-8b-3", text: "Author compliance JSON schema Rules-EnterpriseSecurity.json matching SettingNames and DataTypes." },
      { id: "t-8b-4", text: "Upload script under Intune > Devices > Compliance > Scripts." },
      { id: "t-8b-5", text: "Create Custom Compliance Policy linking script & JSON, assign to GRP-DEV-WIN-CORPORATE, and test compliance." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Author PowerShell Discovery Script",
            "desc": "1. Open VS Code or PowerShell ISE and create <code>Discover-EnterpriseSecurity.ps1</code>.<br/>2. Implement discovery logic checking: BitLocker 256-bit XTS encryption, Secure Boot state, and Windows Defender Real-time Protection status.<br/>3. Output JSON string via <code>$hash | ConvertTo-Json -Compress</code> and write to standard output."
      },
      {
            "step": 2,
            "title": "Exercise 2: Author JSON Compliance Schema",
            "desc": "1. Create <code>Rules-EnterpriseSecurity.json</code>.<br/>2. Define setting rules enforcing: <code>IsBitLocker256Bit -eq true</code>, <code>IsSecureBootEnabled -eq true</code>, and <code>DefenderRealTimeRunning -eq true</code>.<br/>3. Set compliance failure title: <em>'Non-compliant with Enterprise Encryption Standards'</em>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Upload Script and Deploy Custom Compliance Policy",
            "desc": "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Compliance</strong> > <strong>Scripts</strong> > click <strong>+ Add</strong> > <strong>Windows 10 and later</strong>.<br/>2. Name: <code>Discover-EnterpriseSecurity</code> | Upload <code>Discover-EnterpriseSecurity.ps1</code> > click <strong>Add</strong>.<br/>3. Go to <strong>Compliance</strong> > <strong>+ Create policy</strong> (Windows 10 and later) > Name: <code>WIN-CMP-Custom-SecurityEngine</code>.<br/>4. Under <em>Custom Compliance</em>: Select the discovery script and upload <code>Rules-EnterpriseSecurity.json</code>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Discover-EnterpriseSecurity.ps1 (Discovery Script)",
        lang: "powershell",
        code: `# Discover-EnterpriseSecurity.ps1
# Must output a single compressed JSON string containing key-value pairs
$Output = @{}

# Check 1: Verify Print Spooler service is disabled (Hardening Rule)
$Spooler = Get-Service -Name "Spooler" -ErrorAction SilentlyContinue
if ($null -ne $Spooler -and $Spooler.StartType -eq "Disabled") {
    $Output["SpoolerDisabled"] = $true
} else {
    $Output["SpoolerDisabled"] = $false
}

# Check 2: Minimum Free Space on C: drive (GB)
$FreeSpaceGB = [math]::Round((Get-PSDrive -Name C).Free / 1GB, 2)
$Output["SystemDriveFreeSpaceGB"] = $FreeSpaceGB

# Check 3: Check TLS 1.0 is disabled in Schannel Registry
$TLS10Reg = (Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.0\\Client" -Name "Enabled" -ErrorAction SilentlyContinue).Enabled
if ($TLS10Reg -eq 0 -or $null -eq $TLS10Reg) {
    $Output["TLS10Disabled"] = $true
} else {
    $Output["TLS10Disabled"] = $false
}

return $Output | ConvertTo-Json -Compress`
      },
      {
        title: "Rules-EnterpriseSecurity.json (JSON Compliance Schema)",
        lang: "json",
        code: `{
  "Rules": [
    {
      "SettingName": "SpoolerDisabled",
      "Operator": "IsEquals",
      "DataType": "Boolean",
      "Operand": "true",
      "MoreInfoUrl": "https://contoso.com/kb/spooler-policy",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Print Spooler Vulnerability",
          "Description": "The Print Spooler service must be disabled on corporate laptops to prevent privilege escalation."
        }
      ]
    },
    {
      "SettingName": "SystemDriveFreeSpaceGB",
      "Operator": "GreaterEquals",
      "DataType": "Int64",
      "Operand": 15,
      "MoreInfoUrl": "https://contoso.com/kb/storage-policy",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Insufficient Free Storage",
          "Description": "Your system drive must have at least 15 GB of free space to receive updates."
        }
      ]
    },
    {
      "SettingName": "TLS10Disabled",
      "Operator": "IsEquals",
      "DataType": "Boolean",
      "Operand": "true",
      "MoreInfoUrl": "https://contoso.com/kb/tls-policy",
      "RemediationStrings": [
        {
          "Language": "en_US",
          "Title": "Insecure Protocol Detected",
          "Description": "Legacy TLS 1.0 protocol must be disabled."
        }
      ]
    }
  ]
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Custom compliance script fails with error 'Discovery script output is invalid JSON' in Intune console.",
        rootCause: "The PowerShell script emitted additional verbose output, write-host messages, or forgot ConvertTo-Json -Compress.",
        diagnosticCommand: "Run the script locally in PowerShell and verify only a raw JSON string is returned with no other text.",
        resolution: "Ensure the final line is 'return $Output | ConvertTo-Json -Compress' and remove all Write-Host calls from the discovery script."
      }
    ],
    quiz: [
      {
        question: "When creating a Custom Compliance Policy in Microsoft Intune using a PowerShell script, what format must the script's output take?",
        options: [
          "An exit code of 0 for Compliant and exit code 1 for Non-Compliant.",
          "A single compressed JSON string output containing key-value pairs that match the JSON schema rules.",
          "A CSV file saved to C:\\Windows\\Temp\\compliance.csv.",
          "An XML document conforming to the W3C SOAP standard."
        ],
        correctIndex: 1,
        rationale: "Intune Custom Compliance discovery scripts must output a single compressed JSON string containing key-value pairs matching the SettingNames defined in the corresponding JSON rule file.",
        examTip: "Intune Win32 Detection = Exit code 0 + STDOUT. Intune Custom Compliance = Single JSON object via ConvertTo-Json -Compress."
      }
    ]
  },
  {
    id: "lab-9",
    number: "9",
    phaseId: "phase-5",
    domainId: "domain-3",
    title: "Conditional Access & Cross-Workload Zero Trust Lifecycle",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Construct an automated Zero Trust security lifecycle where Microsoft Defender for Endpoint threat detection immediately flips Intune compliance to non-compliant, triggering Conditional Access blocks.",
    keyConcepts: ["Conditional Access", "Zero Trust Lifecycle", "Defender Machine Risk", "Grant Controls", "Report-Only Mode"],
    checklist: [
      { id: "t-9-1", text: "Create CA Policy: CA002-AllUsers-Require-CompliantDevice-M365." },
      { id: "t-9-2", text: "Target Users: Include All Users, Exclude admin-global-emergency & GRP-USR-EXCLUDE-CA." },
      { id: "t-9-3", text: "Target Cloud Apps: Office 365 (Exchange, SharePoint, Teams)." },
      { id: "t-9-4", text: "Conditions: Platforms (Windows, macOS, iOS, Android), Client apps (Browser, Desktop/Mobile)." },
      { id: "t-9-5", text: "Grant Control: Require device to be marked as compliant." },
      { id: "t-9-6", text: "Simulate threat on VM 2, verify MDE risk score increases, Intune marks non-compliant, and M365 blocks access." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create Conditional Access Policy in Report-Only Mode",
            "desc": "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Protection</strong> > <strong>Conditional Access</strong> > click <strong>+ New policy</strong>.<br/>2. Name: <code>CA-WIN-RequireCompliantDevice-M365</code>.<br/>3. <em>Users:</em> Include: <strong>All users</strong> | Exclude: <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code> and <code>GRP-USR-EXCLUDE-CA</code>.<br/>4. <em>Target resources:</em> Cloud apps > Include: <strong>Office 365</strong>.<br/>5. <em>Conditions:</em> Device platforms > Include: <strong>Windows</strong>.<br/>6. <em>Grant:</em> Select <strong>Grant access</strong> > check <strong>Require device to be marked as compliant</strong> and <strong>Require multifactor authentication</strong> (Require all selected controls).<br/>7. <em>Enable policy:</em> Set to <strong>Report-only</strong> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Validate Policy Impact via What-If & Log Analytics",
            "desc": "1. In Conditional Access, select <strong>What If</strong> tool.<br/>2. Select user <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code> | Cloud App: <strong>Office 365</strong> | Device platform: <strong>Windows</strong>.<br/>3. Select <strong>What If</strong> and confirm that the policy applies.<br/>4. Review <strong>Insights and reporting</strong> workbook to ensure no unintended admin lockouts occur."
      },
      {
            "step": 3,
            "title": "Exercise 3: Switch Policy to 'On' and Test Endpoint Gatekeeper",
            "desc": "1. Edit policy <code>CA-WIN-RequireCompliantDevice-M365</code> > set <strong>Enable policy</strong> to <strong>On</strong> > click <strong>Save</strong>.<br/>2. On non-compliant VM or personal PC, attempt to sign in to <code>https://portal.office.com</code> as <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Confirm Entra ID blocks access with error: <em>'You cannot get there from here - Your device is not compliant.'</em>"
      }
    ],
    scripts: [
      {
        title: "Simulate EICAR Threat File for Zero Trust Testing",
        lang: "powershell",
        code: `# Create harmless standardized EICAR test string to trigger Defender telemetry
$EICAR = 'X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'
$EICAR | Out-File -FilePath "$env:TEMP\\eicar_test.com" -Encoding ascii
Write-Host "EICAR test string written to $env:TEMP\\eicar_test.com. Defender should quarantine immediately." -ForegroundColor Red`
      }
    ],
    troubleshooting: [
      {
        scenario: "Defender detects threat on endpoint, but device compliance in Intune remains 'Compliant' and user is not blocked.",
        rootCause: "The Microsoft Defender for Endpoint connector in Intune is not configured to share compliance data or 'Connect Windows devices' is Off.",
        diagnosticCommand: "Check Intune > Tenant administration > Connectors and tokens > Microsoft Defender for Endpoint.",
        resolution: "Toggle 'Connect Windows devices to Microsoft Defender for Endpoint' = On, and 'Share device compliance data with MDE' = On."
      }
    ],
    quiz: [
      {
        question: "In a Zero Trust architecture, what control in Microsoft Entra Conditional Access ensures that an endpoint must pass all Intune compliance baselines before accessing corporate email in Exchange Online?",
        options: [
          "Require multifactor authentication (MFA)",
          "Require device to be marked as compliant",
          "Require password change on high user risk",
          "Require approved client app only"
        ],
        correctIndex: 1,
        rationale: "The Grant control 'Require device to be marked as compliant' queries Microsoft Intune for the device's compliance state. If the device violates any compliance rule, access is blocked.",
        examTip: "Intune sets the compliance state; Conditional Access evaluates that state to Grant or Block access."
      }
    ]
  },
  {
    id: "lab-10",
    number: "10",
    phaseId: "phase-6",
    domainId: "domain-4",
    title: "Win32 App Packaging (.intunewin), Custom Detection & Dependencies",
    duration: "50 mins",
    difficulty: "Advanced",
    summary: "Package Win32 applications using the Microsoft Win32 Content Prep Tool (IntuneWinAppUtil), build PowerShell custom detection scripts, manage dependency trees, and handle installer return codes.",
    keyConcepts: ["IntuneWinAppUtil.exe", ".intunewin Package", "Custom Detection Script", "System Context vs User Context", "Return Codes"],
    checklist: [
      { id: "t-10-1", text: "Download IntuneWinAppUtil.exe and package 7-Zip executable into 7z2301-x64.intunewin." },
      { id: "t-10-2", text: "Create custom PowerShell detection script Detect-7ZipVersion.ps1 (Exit 0 with STDOUT for installed, Exit 1 for not installed)." },
      { id: "t-10-3", text: "Upload .intunewin to Intune > Apps > Windows > Add > Windows app (Win32)." },
      { id: "t-10-4", text: "Configure Install command: '7z2301-x64.exe /S' and Install behavior: 'System'." },
      { id: "t-10-5", text: "Set custom detection rule with 64-bit context enforced, assign to GRP-DEV-WIN-CORPORATE, and verify deployment." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Package Win32 Binary with IntuneWinAppUtil",
            "desc": "1. Download the Microsoft Win32 Content Prep Tool (<code>IntuneWinAppUtil.exe</code>).<br/>2. Create source folder <code>C:\\AppSource\\7Zip</code> containing <code>7z2301-x64.msi</code>.<br/>3. Create output folder <code>C:\\AppOutput</code>.<br/>4. Open cmd.exe as Admin and execute:<br/><code>IntuneWinAppUtil.exe -c C:\\AppSource\\7Zip -s 7z2301-x64.msi -o C:\\AppOutput -q</code>.<br/>5. Verify generated package: <code>C:\\AppOutput\\7z2301-x64.intunewin</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Author Custom PowerShell Detection Script",
            "desc": "1. Create detection script <code>Detect-7Zip.ps1</code>:<br/><code>if (Test-Path 'C:\\Program Files\\7-Zip\\7z.exe') { Write-Output 'Installed'; Exit 0 } else { Exit 1 }</code>.<br/>2. Save to <code>C:\\AppSource\\Detect-7Zip.ps1</code>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Configure Win32 App Program, Return Codes & Detection in Intune",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>All apps</strong> > <strong>+ Add</strong> > <strong>Windows app (Win32)</strong> > click <strong>Select</strong>.<br/>2. Select app package file: <code>C:\\AppOutput\\7z2301-x64.intunewin</code>.<br/>3. Name: <code>7-Zip 23.01 Enterprise x64</code> | Publisher: <code>Igor Pavlov</code>.<br/>4. <em>Program:</em> Install command: <code>msiexec /i \"7z2301-x64.msi\" /qn /norestart</code> | Uninstall: <code>msiexec /x {23170F69-40C1-2702-2301-000001000000} /qn</code> | Install behavior: <strong>System</strong>.<br/>5. <em>Requirements:</em> Operating system architecture: <strong>64-bit</strong> | Minimum OS: <strong>Windows 10 21H2</strong>.<br/>6. <em>Detection rules:</em> Format: <strong>Use a custom detection script</strong> > upload <code>Detect-7Zip.ps1</code>.<br/>7. <em>Assignments:</em> Assign to <code>GRP-DEV-WIN-CORPORATE</code> as <strong>Required</strong> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Intune Win32 Custom Detection Script (Detect-7ZipVersion.ps1)",
        lang: "powershell",
        code: `# Detect-7ZipVersion.ps1
# Rule: Exit 0 WITH output to STDOUT = Detected & Compliant
# Rule: Exit 1 OR Exit 0 without STDOUT = NOT Detected

$AppPath = "C:\\Program Files\\7-Zip\\7z.exe"

if (Test-Path -Path $AppPath) {
    $Version = (Get-Item -Path $AppPath).VersionInfo.ProductVersion
    if ($Version -ge "23.01") {
        Write-Output "7-Zip version $Version is detected and compliant."
        Exit 0
    }
}

# Not found or outdated
Exit 1`
      },
      {
        title: "Execute Win32 Packaging Command",
        lang: "cmd",
        code: `:: Packaging command syntax
IntuneWinAppUtil.exe -c C:\\AppSource\\7Zip -s 7z2301-x64.exe -o C:\\AppOutput
dir C:\\AppOutput\\*.intunewin`
      }
    ],
    troubleshooting: [
      {
        scenario: "Application installs successfully on client machine, but Intune console displays 'Failed' with Error 0x87D1041C.",
        rootCause: "Error 0x87D1041C (ERROR_DETECTION_FAILED) occurs when the installer completes with Exit 0, but the detection rule (file path/registry/script) evaluated to false.",
        diagnosticCommand: "Open C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\AppWorkload.log and check detection rule evaluation output.",
        resolution: "Correct the file path, registry key, or PowerShell detection logic in Intune app detection settings."
      }
    ],
    quiz: [
      {
        question: "When writing a custom PowerShell detection script for a Win32 application in Microsoft Intune, what condition signals to the Intune Management Extension (IME) that the app is successfully installed?",
        options: [
          "The script exits with Exit Code 0 and outputs text to STDOUT.",
          "The script creates a file named 'installed.txt' in C:\\Windows\\Temp.",
          "The script outputs a Boolean $true value to STDERR.",
          "The script exits with Exit Code 1."
        ],
        correctIndex: 0,
        rationale: "For Intune Win32 custom detection scripts, IME treats the application as detected/installed IF AND ONLY IF the script exits with code 0 AND writes at least one non-empty string to Standard Output (STDOUT).",
        examTip: "Win32 Custom Detection rule: Exit 0 + STDOUT text = Installed. Exit 1 or Exit 0 without text = Not Installed."
      }
    ]
  },
  {
    id: "lab-11",
    number: "11",
    phaseId: "phase-6",
    domainId: "domain-4",
    title: "App Protection Policies (MAM-WE) & Selective Wipe",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Enforce enterprise Data Loss Prevention (DLP) controls on unmanaged personal iOS, Android, and Windows endpoints without requiring MDM enrollment (MAM-WE), and execute selective wipes.",
    keyConcepts: ["App Protection Policies (MAM)", "MAM Without Enrollment (MAM-WE)", "Data Transfer Restrictions", "Selective Wipe", "Encrypted Sandbox"],
    checklist: [
      { id: "t-11-1", text: "Create App Protection Policy 'MAM-BYOD-DataProtection' targeting iOS and Android." },
      { id: "t-11-2", text: "Target Apps: Microsoft Outlook, Teams, OneDrive, Word, Excel." },
      { id: "t-11-3", text: "Configure Data Protection: Prevent backups to iCloud/Google Drive = Block, Send org data = Policy managed apps." },
      { id: "t-11-4", text: "Configure Cut/Copy/Paste: Policy managed apps with paste in." },
      { id: "t-11-5", text: "Configure Access: 6-digit numeric PIN, biometrics allowed." },
      { id: "t-11-6", text: "Test App Selective Wipe for joni.sherman@<tenant>.onmicrosoft.com and verify personal data is preserved." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create App Protection Policy for iOS and Android (MAM-WE)",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>App protection policies</strong> > click <strong>+ Create policy</strong> > select <strong>Android</strong>.<br/>2. Name: <code>MAM-M365-Android-EnforceDLP</code>.<br/>3. <em>Target apps:</em> Public apps > select <strong>Microsoft Outlook</strong>, <strong>Microsoft Teams</strong>, <strong>Microsoft OneDrive</strong>, <strong>Microsoft Word</strong>, <strong>Microsoft Excel</strong>.<br/>4. Select <strong>Next</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Data Protection & DLP Transfer Rules",
            "desc": "1. On the <em>Data Protection</em> tab:<br/>&nbsp;&nbsp;• Prevent backups: <strong>Block</strong><br/>&nbsp;&nbsp;• Send org data to other apps: <strong>Policy managed apps with Open-In/Share filtering</strong><br/>&nbsp;&nbsp;• Receive data from other apps: <strong>All apps</strong><br/>&nbsp;&nbsp;• Restrict cut, copy, and paste between other apps: <strong>Blocked (Paste in between policy managed apps allowed with paste in)</strong><br/>&nbsp;&nbsp;• Screen capture and Google Assistant: <strong>Block</strong>.<br/>2. On the <em>Conditional Launch</em> tab:<br/>&nbsp;&nbsp;• Max PIN attempts: <strong>5 (Action: Reset PIN)</strong> | Offline grace period: <strong>720 mins (Action: Block access)</strong>.<br/>3. Assign to <code>GRP-USR-SALES</code> (Joni Sherman) > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Test MAM Sandboxing and Execute Selective Wipe",
            "desc": "1. On personal device or Android AVD, sign in to Outlook as <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Copy text from a corporate email and attempt to paste into personal WhatsApp/Notes -> confirm paste is blocked by DLP.<br/>3. In Intune admin center > <strong>Apps</strong> > <strong>App selective wipe</strong> > click <strong>+ Create wipe request</strong> > select <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code> > click <strong>Create</strong>.<br/>4. Confirm all corporate emails and files are removed while personal data remains 100% untouched!"
      }
    ],
    scripts: [
      {
        title: "Graph API Query for Active MAM Protected Users",
        lang: "powershell",
        code: `# Connect to Microsoft Graph
Connect-MgGraph -Scopes "DeviceManagementApps.Read.All"

# Query Intune Managed App Registrations (MAM users)
$MAMUsers = Get-MgDeviceManagementUserRoot -All
Write-Host "Total MAM Managed Users: $($MAMUsers.Count)" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "User on BYOD Android device can copy sensitive customer data from Outlook and paste it into personal WhatsApp.",
        rootCause: "The App Protection Policy 'Restrict cut, copy, and paste between other apps' is set to 'Any app' or not assigned to the user's group.",
        diagnosticCommand: "Check Intune > Apps > App protection policies > MAM-BYOD-DataProtection > Properties > Data transfer.",
        resolution: "Set 'Restrict cut, copy, and paste between other apps' to 'Policy managed apps with paste in'."
      }
    ],
    quiz: [
      {
        question: "A company implements a Bring Your Own Device (BYOD) strategy for smartphones. When an employee leaves the company, you need to remove all corporate emails and OneDrive files from their mobile device without wiping their personal photos or messages. What action should you perform?",
        options: [
          "Perform a Factory Reset / Wipe from Intune.",
          "Execute an App Selective Wipe in Microsoft Intune.",
          "Delete the user account from on-premises Active Directory.",
          "Block the user's IP in Conditional Access."
        ],
        correctIndex: 1,
        rationale: "App Selective Wipe removes only corporate data protected by Intune App Protection Policies (MAM) within managed apps, leaving personal photos, personal apps, and device settings completely untouched.",
        examTip: "App Selective Wipe = Removes corporate data from MAM apps (ideal for BYOD). Device Wipe = Factory reset."
      }
    ]
  },
  {
    id: "lab-11b",
    number: "11B",
    phaseId: "phase-6",
    domainId: "domain-4",
    title: "App Configuration Policies (Managed Devices vs Managed Apps)",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Pre-configure corporate settings, email account UPN tokens, and browser policies for Managed Apps (MAM) and Managed Devices (MDM).",
    keyConcepts: ["App Configuration Policies", "Managed Devices (MDM)", "Managed Apps (MAM)", "UPN Token Replacement", "Edge Managed Policy"],
    checklist: [
      { id: "t-11b-1", text: "Create Managed App Configuration for Microsoft Outlook Mobile (com.microsoft.outlook.EmailProfile.EmailAddress = {{UserPrincipalName}})." },
      { id: "t-11b-2", text: "Configure Outlook settings: AccountType = ModernAuth, RequireBiometrics = true, FocusedInbox = true." },
      { id: "t-11b-3", text: "Create Managed Device Configuration for Microsoft Edge on Windows (HomepageLocation = corporate SharePoint URL)." },
      { id: "t-11b-4", text: "Assign both policies to respective user and device groups and validate zero-touch config." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure Outlook Mobile Managed App Configuration Policy",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>App configuration policies</strong> > click <strong>+ Add</strong> > <strong>Managed apps</strong>.<br/>2. Name: <code>APP-CFG-Outlook-Mobile-AutoUPN</code>.<br/>3. Public apps: Select <strong>Microsoft Outlook (iOS/Android)</strong>.<br/>4. Under <em>Configuration settings</em>:<br/>&nbsp;&nbsp;• <em>Redirect web content to Edge:</em> <strong>Require</strong><br/>&nbsp;&nbsp;• <em>Account setup:</em> Allowed accounts: <strong>Only work or school accounts</strong><br/>&nbsp;&nbsp;• <em>Default App Email:</em> <code>{{UserPrincipalName}}</code>.<br/>5. Assign to <code>GRP-LIC-M365-E5</code> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Microsoft Edge Managed Device Configuration",
            "desc": "1. In Intune > <strong>App configuration policies</strong> > <strong>+ Add</strong> > <strong>Managed devices</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Target app: <strong>Microsoft Edge</strong>.<br/>3. Name: <code>APP-CFG-Edge-Managed-Desktop</code>.<br/>4. Configure Home page URL, Bookmarks, and corporate Enterprise Mode Site List.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Verify Edge Managed Policy via Windows Registry",
        lang: "powershell",
        code: `# Inspect Intune Edge Configuration Policy Keys
$EdgePolicyPath = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge"

if (Test-Path $EdgePolicyPath) {
    Get-ItemProperty -Path $EdgePolicyPath | Format-List
} else {
    Write-Warning "Edge policy path not present yet. Trigger Intune Sync."
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Outlook mobile does not automatically configure the user's email address upon first launch.",
        rootCause: "The configuration key 'com.microsoft.outlook.EmailProfile.EmailAddress' had a typo or the token format '{{UserPrincipalName}}' was entered with single braces.",
        diagnosticCommand: "Check App configuration policy JSON/table in Intune console.",
        resolution: "Ensure exact case-sensitive key and double curly braces '{{UserPrincipalName}}'."
      }
    ],
    quiz: [
      {
        question: "You want Microsoft Outlook on iOS and Android to automatically populate each user's email address upon initial launch. What dynamic macro token should you configure in the App Configuration Policy?",
        options: [
          "%USER_EMAIL%",
          "{{UserPrincipalName}}",
          "$env:USERNAME",
          "[[UPN_STRING]]"
        ],
        correctIndex: 1,
        rationale: "Intune App Configuration Policies support token substitution using double curly braces, specifically '{{UserPrincipalName}}' for the user's primary Entra ID identity.",
        examTip: "Look for double curly braces '{{UserPrincipalName}}' for dynamic Intune token macros."
      }
    ]
  },
  {
    id: "lab-12",
    number: "12",
    phaseId: "phase-7",
    domainId: "domain-4",
    title: "Microsoft Defender for Endpoint (MDE) Connector & EDR Sensor",
    duration: "40 mins",
    difficulty: "Advanced",
    summary: "Connect Microsoft Intune to Defender for Endpoint P2, onboard Windows 11 client sensors via cloud EDR policy, and enforce Tamper Protection across all managed endpoints.",
    keyConcepts: ["Defender for Endpoint (MDE)", "Sense Service", "EDR Sensor Onboarding", "Tamper Protection", "security.microsoft.com"],
    checklist: [
      { id: "t-12-1", text: "In Intune > Tenant administration > Connectors > Microsoft Defender for Endpoint: Enable Windows & Mobile connectors." },
      { id: "t-12-2", text: "In Microsoft Defender Portal (security.microsoft.com) > Settings > Advanced features: Enable Intune connection & Tamper Protection." },
      { id: "t-12-3", text: "Create Endpoint Detection and Response (EDR) Policy in Intune Endpoint security > Endpoint detection and response." },
      { id: "t-12-4", text: "Assign EDR policy to GRP-DEV-WIN-CORPORATE and verify Sense service runs on VM 1." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Enable Defender for Endpoint Connector in Intune",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Microsoft Defender for Endpoint</strong>.<br/>2. Toggle <em>Allow Microsoft Defender for Endpoint to enforce Endpoint Security Configurations</em> to <strong>On</strong>.<br/>3. Toggle <em>Connect Windows devices to Microsoft Defender for Endpoint</em> to <strong>On</strong>.<br/>4. Toggle <em>Connect Android devices to Microsoft Defender for Endpoint</em> to <strong>On</strong>.<br/>5. Click <strong>Save</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Deploy Endpoint Detection and Response (EDR) Policy",
            "desc": "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Endpoint detection and response</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10, Windows 11, and Windows Server</strong> | Profile: <strong>Endpoint detection and response</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-MDE-EDR-Onboarding</code>.<br/>4. Under <em>Configuration settings</em>: Auto populate onboarding blob: <strong>Auto from connector</strong> | Expedite telemetry frequency: <strong>Enable (60-second polling for SOC response)</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Validate Sense Service and Sensor Telemetry on Client",
            "desc": "1. On <strong>MD102-VM1-Adele</strong>, open PowerShell as Admin.<br/>2. Execute: <code>Get-Service Sense | Select-Object Status, StartType</code> (Verify Status: <em>Running</em>).<br/>3. Open Microsoft Defender XDR portal (<strong>https://security.microsoft.com</strong>) > <strong>Device inventory</strong> > verify VM1 appears with active sensor."
      }
    ],
    scripts: [
      {
        title: "Verify MDE Sense Sensor and Antivirus Status",
        lang: "powershell",
        code: `# Check Defender EDR Sensor Service (Sense)
$SenseService = Get-Service -Name "Sense" -ErrorAction SilentlyContinue

# Check Defender Antivirus Real-time Protection State
$MpStatus = Get-MpComputerStatus | Select-Object AMServiceEnabled, RealTimeProtectionEnabled, AntispywareEnabled, AMProductVersion, DefenderSignaturesVersion

[PSCustomObject]@{
    SenseServiceName    = $SenseService.Name
    SenseServiceStatus  = $SenseService.Status
    AntivirusRealTime   = $MpStatus.RealTimeProtectionEnabled
    SignatureVersion    = $MpStatus.DefenderSignaturesVersion
} | Format-List`
      }
    ],
    troubleshooting: [
      {
        scenario: "The Sense service fails to start or remains in 'Stopped' state on client VM.",
        rootCause: "The device is unable to communicate with Defender cloud telemetry URLs due to network firewall/proxy restrictions or conflicting 3rd-party antivirus.",
        diagnosticCommand: "Run 'C:\\Program Files\\Windows Defender Advanced Threat Protection\\MpCmdRun.exe' -ValidateOnboarding",
        resolution: "Whitelist required Defender URLs (*.endpoint.security.microsoft.com) and ensure Tamper Protection is active."
      }
    ],
    quiz: [
      {
        question: "Which Windows background service is responsible for Microsoft Defender for Endpoint (MDE) EDR telemetry collection and sensor communication?",
        options: [
          "WinDefend (Microsoft Defender Antivirus Service)",
          "Sense (Windows Defender Advanced Threat Protection Service)",
          "ClipSVC (Client License Service)",
          "IntuneManagementExtension"
        ],
        correctIndex: 1,
        rationale: "The 'Sense' service (Windows Defender Advanced Threat Protection Service) is the core EDR sensor service that sends endpoint telemetry to Defender for Endpoint cloud.",
        examTip: "WinDefend = Antivirus engine. Sense = Defender for Endpoint (MDE) EDR sensor."
      }
    ]
  },
  {
    id: "lab-13",
    number: "13",
    phaseId: "phase-7",
    domainId: "domain-4",
    title: "Attack Surface Reduction (ASR) Rule Engineering",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Engineer and validate high-impact Attack Surface Reduction (ASR) rules, progressing systematically through an enterprise Audit to Block deployment methodology.",
    keyConcepts: ["Attack Surface Reduction (ASR)", "Audit vs Block Mode", "LSASS Credential Guarding", "Child Process Blocking", "Event IDs 1121/1122"],
    checklist: [
      { id: "t-13-1", text: "Create ASR Policy in Intune > Endpoint security > Attack surface reduction." },
      { id: "t-13-2", text: "Configure Rule: 'Block credential stealing from Windows LSASS' (9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2) = Block." },
      { id: "t-13-3", text: "Configure Rule: 'Block Office applications from creating child processes' = Block." },
      { id: "t-13-4", text: "Configure Rule: 'Block executable content from email client' = Block." },
      { id: "t-13-5", text: "Configure Rule: 'Block obfuscated scripts' & 'Block untrusted USB executables' = Block." },
      { id: "t-13-6", text: "Verify active ASR rules on client via Get-MpPreference and inspect Defender Event Log." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Create Attack Surface Reduction (ASR) Policy",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Attack surface reduction</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10, Windows 11, and Windows Server</strong> | Profile: <strong>Attack Surface Reduction Rules</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-ASR-HighImpactRules</code>.<br/>4. Select <strong>Next</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure High-Impact Enterprise ASR Rules",
            "desc": "1. Configure the following rules to <strong>Block</strong>:<br/>&nbsp;&nbsp;• <em>Block credential stealing from Windows local security authority subsystem (LSASS.exe)</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block abuse of exploited vulnerable signed drivers</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block Office applications from creating child processes</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block executable content from email client and webmail</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block persistence through WMI event subscription</em>: <strong>Block</strong>.<br/>2. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Validate ASR Telemetry & Event Viewer Logs",
            "desc": "1. On <strong>MD102-VM2-Alex</strong>, open Event Viewer.<br/>2. Navigate to <code>Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational</code>.<br/>3. Filter for Event ID <strong>1121</strong> (Audit mode) and Event ID <strong>1122</strong> (Block mode) to verify active enforcement."
      }
    ],
    scripts: [
      {
        title: "PowerShell ASR Rule Status and Audit Query",
        lang: "powershell",
        code: `# Query Active ASR Rules and Mode on Client
$Preferences = Get-MpPreference
$ASR_Ids = $Preferences.AttackSurfaceReductionRules_Ids
$ASR_Actions = $Preferences.AttackSurfaceReductionRules_Actions

Write-Host "=== Active ASR Rules ===" -ForegroundColor Cyan
for ($i = 0; $i -lt $ASR_Ids.Count; $i++) {
    $Mode = switch ($ASR_Actions[$i]) {
        0 { "Disabled" }
        1 { "Block (Enforced)" }
        2 { "Audit (Telemetry Only)" }
        6 { "Warn" }
        Default { "Unknown" }
    }
    Write-Host "$($ASR_Ids[$i]) : $Mode" -ForegroundColor Green
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "A legitimate internal business macro script is blocked from executing in Excel.",
        rootCause: "The ASR rule 'Block Office applications from creating child processes' is set to Block mode without an exception path configured.",
        diagnosticCommand: "Open Event Viewer > Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational > Event ID 1122.",
        resolution: "Add the script path or folder to 'Attack Surface Reduction Only Exclusions' in the Intune ASR policy."
      }
    ],
    quiz: [
      {
        question: "Which Event ID in the Windows Defender Operational event log indicates that an Attack Surface Reduction (ASR) rule blocked an action in Block mode?",
        options: [
          "Event ID 1121",
          "Event ID 1122",
          "Event ID 4624",
          "Event ID 7036"
        ],
        correctIndex: 1,
        rationale: "Event ID 1121 indicates an ASR rule matched in Audit mode. Event ID 1122 indicates an ASR rule blocked execution in Block mode.",
        examTip: "ASR Telemetry: Event ID 1121 = Audit (would have blocked). Event ID 1122 = Blocked."
      }
    ]
  },
  {
    id: "lab-14",
    number: "14",
    phaseId: "phase-7",
    domainId: "domain-4",
    title: "BitLocker Silent Encryption & Cloud Key Escrow",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Silently encrypt Windows 11 OS drives using XTS-AES 256-bit full disk encryption with TPM protection and escrow recovery keys directly to Microsoft Entra ID.",
    keyConcepts: ["BitLocker Silent Encryption", "XTS-AES 256-bit", "Entra Key Escrow", "Standard User Autopilot Enablement", "manage-bde"],
    checklist: [
      { id: "t-14-1", text: "Create BitLocker Policy in Intune > Endpoint security > Disk encryption." },
      { id: "t-14-2", text: "Configure settings: Enable full disk encryption = Require, Silent BitLocker = Enabled." },
      { id: "t-14-3", text: "Allow standard users to enable encryption during Autopilot = Yes." },
      { id: "t-14-4", text: "Set Encryption method: XTS-AES 256-bit." },
      { id: "t-14-5", text: "Set OS Drive recovery backup = Backup recovery information to Microsoft Entra ID." },
      { id: "t-14-6", text: "Set 'Do not enable BitLocker until recovery information is stored' = Yes." },
      { id: "t-14-7", text: "Verify encryption status with 'manage-bde -status C:' and confirm key in Entra portal." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure BitLocker Endpoint Security Policy",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Disk encryption</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile: <strong>BitLocker</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-BitLocker-Silent-XTS256</code>.<br/>4. <em>BitLocker - Base settings:</em><br/>&nbsp;&nbsp;• Enable full disk encryption for OS and fixed data drives: <strong>Yes</strong><br/>&nbsp;&nbsp;• Hide prompt about third-party encryption: <strong>Yes</strong><br/>&nbsp;&nbsp;• Allow standard users to enable encryption during Autopilot: <strong>Yes</strong>.<br/>5. <em>BitLocker - OS drive settings:</em><br/>&nbsp;&nbsp;• Encryption method: <strong>XTS-AES 256-bit</strong><br/>&nbsp;&nbsp;• Compatible TPM startup: <strong>Require TPM</strong><br/>&nbsp;&nbsp;• Save BitLocker recovery information to Microsoft Entra ID: <strong>Require</strong> (Store recovery passwords and key packages).<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Trigger Silent Encryption on Client VM",
            "desc": "1. Sign in to <strong>MD102-VM2-Alex</strong> as standard user <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Open elevated PowerShell > execute <code>manage-bde -status C:</code>.<br/>3. Confirm <em>Conversion Status: Fully Encrypted</em> and <em>Encryption Method: XTS-AES 256</em> without any user prompts!"
      },
      {
            "step": 3,
            "title": "Exercise 3: Verify 48-Digit Recovery Key Escrow in Entra ID",
            "desc": "1. Sign in to <strong>https://entra.microsoft.com</strong> > <strong>Identity</strong> > <strong>Devices</strong> > <strong>All devices</strong> > select <strong>MD102-VM2-Alex</strong>.<br/>2. Select <strong>BitLocker keys</strong> > click <strong>Show BitLocker recovery key</strong>.<br/>3. Verify the 48-digit recovery numerical password is escrowed and audited in Entra ID audit logs."
      }
    ],
    scripts: [
      {
        title: "Query BitLocker Volume and Key Protector Details",
        lang: "powershell",
        code: `# Inspect BitLocker Protection Status and Key Protectors
$BLVolume = Get-BitLockerVolume -MountPoint C:

[PSCustomObject]@{
    MountPoint          = $BLVolume.MountPoint
    VolumeType          = $BLVolume.VolumeType
    EncryptionMethod    = $BLVolume.EncryptionMethod
    ProtectionStatus    = $BLVolume.ProtectionStatus
    LockStatus          = $BLVolume.LockStatus
    KeyProtectorTypes   = ($BLVolume.KeyProtector | Select-Object -ExpandProperty KeyProtectorType) -join ", "
} | Format-List

# Run manage-bde check
manage-bde -status C:`
      }
    ],
    troubleshooting: [
      {
        scenario: "Silent BitLocker fails to encrypt during Autopilot deployment for standard users.",
        rootCause: "The setting 'Allow standard users to enable encryption during Autopilot' was left at 'No' (or default), requiring local admin rights.",
        diagnosticCommand: "Open Event Viewer > Applications and Services Logs > Microsoft > Windows > BitLocker-API > Management > Event ID 71.",
        resolution: "Set 'Allow standard users to enable encryption during Autopilot' = Yes in the Intune BitLocker policy."
      }
    ],
    quiz: [
      {
        question: "You want to configure BitLocker encryption so that endpoints encrypt silently without user interaction, even if the primary user is a Standard User. Which two settings must be configured?",
        options: [
          "Configure a custom startup PIN and disable TPM.",
          "Enable Silent BitLocker enablement AND set 'Allow standard users to enable encryption during Autopilot' to Yes.",
          "Set the encryption method to AES-CBC 128-bit only.",
          "Enable Windows Recovery Environment command prompt."
        ],
        correctIndex: 1,
        rationale: "Silent BitLocker enablement automates encryption without prompting the end user, and enabling standard user permissions allows standard accounts created during Autopilot to trigger silent encryption.",
        examTip: "To prevent data loss, always set 'Do not enable BitLocker until recovery information is stored in Entra ID' = Yes."
      }
    ]
  },
  {
    id: "lab-15",
    number: "15",
    phaseId: "phase-7",
    domainId: "domain-4",
    title: "Endpoint Privilege Management (EPM) & App Control (WDAC)",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Eliminate permanent local administrative privileges by implementing Endpoint Privilege Management (EPM) with elevation rules and App Control for Business (WDAC) in managed installer mode.",
    keyConcepts: ["Endpoint Privilege Management (EPM)", "Elevation Rules", "Business Justification", "App Control for Business (WDAC)", "Managed Installer"],
    checklist: [
      { id: "t-15-1", text: "Create EPM Elevation Settings Policy (enables EPM agent) in Intune > Endpoint security > Endpoint Privilege Management." },
      { id: "t-15-2", text: "Create EPM Elevation Rule 'Elevate-ContosoDiagnostics' for approved tool (Wireshark / NetworkDiag)." },
      { id: "t-15-3", text: "Configure elevation type: 'User Confirmed with Business Justification' with SHA-256 hash or vendor cert." },
      { id: "t-15-4", text: "Create App Control for Business (WDAC) policy in Audit mode with Managed Installer enabled." },
      { id: "t-15-5", text: "Test right-clicking executable as Standard User > 'Run with elevated access' > Verify Event Log." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Deploy Endpoint Privilege Management (EPM) Settings",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Endpoint Privilege Management</strong> > select the <strong>Policies</strong> tab.<br/>2. Click <strong>+ Create policy</strong> > Platform: <strong>Windows 10 and later</strong> | Profile: <strong>Elevation settings policy</strong>.<br/>3. Name: <code>WIN-EPM-ElevationSettings-Default</code>.<br/>4. Enable Endpoint Privilege Management: <strong>Yes</strong> | Default elevation response: <strong>Deny all requests</strong> | Send elevation data for reporting: <strong>Yes</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Create EPM Elevation Rule with Business Justification",
            "desc": "1. In Endpoint Privilege Management, click <strong>+ Create policy</strong> > Profile: <strong>Elevation rules policy</strong>.<br/>2. Name: <code>WIN-EPM-Rule-NetworkTroubleshooter</code>.<br/>3. Click <strong>+ Add rule</strong>:<br/>&nbsp;&nbsp;• Rule name: <code>Elevate-NetSh-Diagnostics</code><br/>&nbsp;&nbsp;• Elevation type: <strong>User confirmed</strong><br/>&nbsp;&nbsp;• Validation: <strong>Require business justification & Windows Hello PIN authentication</strong><br/>&nbsp;&nbsp;• File name: <code>netsh.exe</code> | File path: <code>C:\\Windows\\System32\\netsh.exe</code>.<br/>4. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Test Standard User 'Run with elevated access' Action",
            "desc": "1. Sign in to <strong>MD102-VM1-Adele</strong> as standard user.<br/>2. Right-click <code>netsh.exe</code> or approved admin tool > select <strong>Run with elevated access</strong>.<br/>3. Enter business justification: <em>'Diagnosing corporate Wi-Fi IP stack'</em> and complete Windows Hello PIN verification.<br/>4. Verify application runs in elevated security token without needing full local admin credentials!"
      }
    ],
    scripts: [
      {
        title: "Query EPM Operational Events via PowerShell",
        lang: "powershell",
        code: `# Inspect Endpoint Privilege Management (EPM) Logs
$EPMEvents = Get-WinEvent -LogName "Microsoft-Windows-EndpointPrivilegeManagement/Operational" -MaxEvents 5 -ErrorAction SilentlyContinue

foreach ($Event in $EPMEvents) {
    [PSCustomObject]@{
        TimeCreated = $Event.TimeCreated
        Id          = $Event.Id
        Message     = $Event.Message
    }
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Standard user right-clicks executable but the option 'Run with elevated access' does not appear in the Windows context menu.",
        rootCause: "The EPM Elevation Settings policy has not been deployed to the device, or the Intune EPM client agent has not finished installing.",
        diagnosticCommand: "Verify presence of 'C:\\Program Files\\Microsoft EPM Agent\\EpmAgent.exe'.",
        resolution: "Ensure the EPM Elevation Settings Policy is assigned to the device group and sync Intune."
      }
    ],
    quiz: [
      {
        question: "What is the primary security advantage of Microsoft Intune Endpoint Privilege Management (EPM)?",
        options: [
          "It permanently adds standard users to the local Administrators group.",
          "It allows standard users to run approved diagnostic or administrative applications with elevated rights without granting full local administrator privileges.",
          "It disables User Account Control (UAC) prompts entirely.",
          "It resets Windows BitLocker PINs automatically every 24 hours."
        ],
        correctIndex: 1,
        rationale: "EPM enables organizations to run all users as Standard Users while allowing scoped, audited elevation of specific approved executables based on defined business justification or approval workflows.",
        examTip: "EPM = Just-in-Time, file-scoped privilege elevation for standard users."
      }
    ]
  },
  {
    id: "lab-16",
    number: "16",
    phaseId: "phase-8",
    domainId: "domain-4",
    title: "Windows Update for Business (WUfB) Deployment Rings",
    duration: "45 mins",
    difficulty: "Intermediate",
    summary: "Architect a 3-tier Windows Update for Business strategy managing Quality Updates, Feature Updates, Expedited Zero-Day Patches, Driver Approvals, and Delivery Optimization.",
    keyConcepts: ["WUfB Update Rings", "Ring 0 / 1 / 2 Strategy", "Quality Update Deferrals", "Expedited Quality Updates", "Driver Approvals", "Delivery Optimization"],
    checklist: [
      { id: "t-16-1", text: "Create Ring 0 (Canary/IT) Policy: 0-day Quality & Feature deferral, active hours 08:00-17:00." },
      { id: "t-16-2", text: "Create Ring 1 (Pilot) Policy: 3-day Quality deferral, 7-day Feature deferral." },
      { id: "t-16-3", text: "Create Ring 2 (Broad Production) Policy: 7-day Quality deferral, 30-day Feature deferral." },
      { id: "t-16-4", text: "Configure Expedited Quality Update Policy for emergency Zero-Day vulnerability patch." },
      { id: "t-16-5", text: "Configure Driver Update Policy with Manual Approval workflow." },
      { id: "t-16-6", text: "Validate Delivery Optimization peer cache telemetry with Get-DeliveryOptimizationStatus." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure 3-Tier Windows Update for Business Rings",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Update rings for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Ring0-IT-Canary</code> (Quality deferral: <strong>0 days</strong>, Feature deferral: <strong>0 days</strong>, Servicing channel: <strong>General Availability</strong>) > Assign to <code>GRP-DEV-WIN-CORPORATE</code>.<br/>3. Create <code>WUfB-Ring1-Pilot</code> (Quality deferral: <strong>3 days</strong>, Feature deferral: <strong>14 days</strong>) > Assign to <code>GRP-DEV-WIN-PILOT</code>.<br/>4. Create <code>WUfB-Ring2-Production</code> (Quality deferral: <strong>7 days</strong>, Feature deferral: <strong>60 days</strong>, Active hours: <strong>8 AM to 5 PM</strong>, Deadline: <strong>3 days</strong>, Grace period: <strong>2 days</strong>) > Assign to <code>GRP-DEV-WIN-PRODUCTION</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Configure Expedited Quality Update for Zero-Day Patching",
            "desc": "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Quality updates for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Expedited-SecurityZeroDay</code>.<br/>3. Expedite installation of quality updates if device OS version is less than: Select latest security update patch release.<br/>4. Number of days until reboot is forced: <strong>1 day</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Configure Driver Update Policy with Manual Approval",
            "desc": "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Driver updates for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Drivers-ManualReview</code>.<br/>3. Approval method: <strong>Manually approve and deploy driver updates</strong>.<br/>4. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "PowerShell Delivery Optimization and WUfB Status",
        lang: "powershell",
        code: `# Inspect Delivery Optimization Peer Cache Performance
Get-DeliveryOptimizationStatus | Select-Object FileId, FileSize, PercentPeerCaching, BytesFromPeers, BytesFromHttp

# Get Delivery Optimization Performance Snapshot
Get-DeliveryOptimizationPerfSnap`
      }
    ],
    troubleshooting: [
      {
        scenario: "Client machines restart unexpectedly in the middle of working hours after receiving a quality update.",
        rootCause: "Active Hours were not configured in the WUfB update ring or the Grace Period deadline was set to 0 days.",
        diagnosticCommand: "Check Intune > Devices > Update rings > Active hours and Deadline settings.",
        resolution: "Set Active Hours (e.g. 08:00 to 17:00) and configure a Grace Period of at least 1-2 days."
      }
    ],
    quiz: [
      {
        question: "A zero-day security vulnerability is discovered and Microsoft releases an out-of-band security update. You must force all Windows 11 endpoints to install this update immediately and restart within 24 hours, bypassing normal deferrals. What should you configure?",
        options: [
          "A Windows 10/11 Feature update profile.",
          "An Expedited Quality Update profile under Quality updates for Windows 10 and later.",
          "A PowerShell script that stops the wuauserv service.",
          "A Driver Update profile with automatic approval."
        ],
        correctIndex: 1,
        rationale: "Expedited Quality Update profiles expedite the download and installation of critical security patches and override standard WUfB deferral settings to enforce rapid compliance.",
        examTip: "Quality Update Rings = Regular monthly deferrals. Expedited Quality Updates = Zero-day emergency overrides."
      }
    ]
  },
  {
    id: "lab-17",
    number: "17",
    phaseId: "phase-9",
    domainId: "domain-4",
    title: "Remote Device Actions & Data Impact Matrix",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Master the exact cryptographic, data persistence, cloud identity state, and security boundaries of every Intune remote action (Sync, Retire, Wipe, Fresh Start, Autopilot Reset, Delete).",
    keyConcepts: ["Sync vs Restart", "Retire vs Wipe", "Fresh Start (Bloatware Removal)", "Autopilot Reset", "Orphaned Records"],
    checklist: [
      { id: "t-17-1", text: "Analyze Remote Actions Data Impact Comparison Matrix." },
      { id: "t-17-2", text: "Perform a Sync action on VM 1 and measure policy arrival latency." },
      { id: "t-17-3", text: "Validate Retire action on test BYOD device (removes corporate data, keeps personal files)." },
      { id: "t-17-4", text: "Validate Wipe action parameters (Factory reset vs Keep enrollment state)." },
      { id: "t-17-5", text: "Understand Fresh Start bloatware removal and Autopilot Reset classroom re-provisioning." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Execute Remote Sync and Monitor Latency",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>All devices</strong> > select <strong>MD102-VM1-Adele</strong>.<br/>2. In the top action bar, click <strong>Sync</strong> > click <strong>Yes</strong>.<br/>3. On VM1, open Event Viewer > <code>Applications and Services Logs > Microsoft > Windows > DeviceManagement-Enterprise-Diagnostics-Provider > Operational</code>.<br/>4. Observe Event ID <strong>208</strong> (OMADM session started) and Event ID <strong>209</strong> (OMADM session ended successfully) within 30 seconds."
      },
      {
            "step": 2,
            "title": "Exercise 2: Execute Device Retire on BYOD Persona",
            "desc": "1. In Intune admin center, select BYOD device used by <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. In the top action bar, click <strong>Retire</strong> > confirm dialog.<br/>3. Confirm in the Data Impact Matrix: All corporate certificates, VPN profiles, Wi-Fi keys, and Intune-managed apps are removed; personal photos, personal apps, and user documents remain 100% untouched."
      },
      {
            "step": 3,
            "title": "Exercise 3: Compare Wipe vs Fresh Start vs Autopilot Reset",
            "desc": "1. Review administrative distinctions:<br/>&nbsp;&nbsp;• <strong>Wipe:</strong> Full factory reset (OS re-install / disk sanitize).<br/>&nbsp;&nbsp;• <strong>Fresh Start:</strong> Removes OEM bloatware and retains Windows 11 Enterprise OS build.<br/>&nbsp;&nbsp;• <strong>Autopilot Reset:</strong> Removes user profiles and apps but preserves Microsoft Entra Join and MDM enrollment for instant re-use."
      }
    ],
    scripts: [
      {
        title: "Trigger Immediate MDM Sync from Client PowerShell",
        lang: "powershell",
        code: `# Trigger immediate Intune Device Management Sync via Scheduled Task
Get-ScheduledTask -TaskPath "\\Microsoft\\Windows\\EnterpriseMgmt\\*" | Start-ScheduledTask
Write-Host "Triggered EnterpriseMgmt Intune OMADM sync scheduled task." -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "Admin clicks 'Delete' on a device record in Intune, but the physical PC is still powered on and operating.",
        rootCause: "The 'Delete' action removes the Intune management record from the console but does NOT send a wipe command to the endpoint, leaving it orphaned.",
        diagnosticCommand: "Check Entra ID and Intune console for orphaned device objects.",
        resolution: "Always execute 'Wipe' or 'Retire' before deleting a console record if you want the client to cleanly unenroll."
      }
    ],
    quiz: [
      {
        question: "An administrator needs to prepare a laptop previously used by an employee who left the company. The laptop has OEM pre-installed bloatware that must be removed, but the device must remain enrolled in Intune and retain user data. Which remote action should be used?",
        options: [
          "Wipe with 'Wipe device, and continue to wipe even if device loses power'",
          "Retire",
          "Fresh Start with 'Retain user data on this device' selected",
          "Autopilot Reset"
        ],
        correctIndex: 2,
        rationale: "Fresh Start removes pre-installed OEM apps and bloatware and resets the OS to a clean Windows state, with an option to retain user data while maintaining Intune enrollment.",
        examTip: "Fresh Start = Removes OEM bloatware. Autopilot Reset = Re-provisions device back to sign-in screen. Retire = Removes corporate data only. Wipe = Full factory reset."
      }
    ]
  },
  {
    id: "lab-18",
    number: "18",
    phaseId: "phase-9",
    domainId: "domain-4",
    title: "Troubleshooting Diagnostic Toolkit & Error Code Reference",
    duration: "45 mins",
    difficulty: "Advanced",
    summary: "Master enterprise diagnostic logs (IntuneManagementExtension.log, AppWorkload.log, MDM Event IDs 813/814) and decode high-yield Intune error codes.",
    keyConcepts: ["IntuneManagementExtension.log", "AppWorkload.log", "Event ID 813/814", "mdmdiagnosticstool", "Error 0x80180018", "Error 0x80180014"],
    checklist: [
      { id: "t-18-1", text: "Inspect IntuneManagementExtension.log in C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs." },
      { id: "t-18-2", text: "Inspect AppWorkload.log for Win32 detection and dependency tree evaluations." },
      { id: "t-18-3", text: "Inspect Enterprise MDM Event Log (Event IDs 813, 814 for CSP policy apply results)." },
      { id: "t-18-4", text: "Export complete MDM diagnostic package using mdmdiagnosticstool.exe." },
      { id: "t-18-5", text: "Master high-yield error code dictionary: 0x80180018, 0x80180014, 0x87D1041C, 0x80070005, 0x80180026." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Inspect IntuneManagementExtension.log with CMTrace",
            "desc": "1. On <strong>MD102-VM1-Adele</strong>, navigate to <code>C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs</code>.<br/>2. Open <code>IntuneManagementExtension.log</code> with CMTrace (or Notepad).<br/>3. Search for strings: <code>[Win32App]</code>, <code>EnforceAppCompliance</code>, and <code>ExitCode: 0</code> to inspect application installer telemetry."
      },
      {
            "step": 2,
            "title": "Exercise 2: Generate Full MDM Diagnostics Report via mdmdiagnosticstool",
            "desc": "1. Open elevated Command Prompt on VM.<br/>2. Execute: <code>mdmdiagnosticstool.exe -area DeviceEnrollment;DeviceProvisioning;Autopilot -zip C:\\MDMDiagReport.zip</code>.<br/>3. Extract <code>C:\\MDMDiagReport.zip</code> and open <code>MDMDiagReport.html</code> to review all applied CSP policies, OMA-URI nodes, and enrollment certificates."
      },
      {
            "step": 3,
            "title": "Exercise 3: Decode High-Yield MD-102 Intune Error Codes",
            "desc": "1. Master the 4 high-yield hex errors:<br/>&nbsp;&nbsp;• <code>0x80180018</code> (MENROLL_E_LICENSE) $\\rightarrow$ User missing Intune license.<br/>&nbsp;&nbsp;• <code>0x80180014</code> (MENROLL_E_PLATFORM_BLOCKED) $\\rightarrow$ Blocked by platform enrollment restriction.<br/>&nbsp;&nbsp;• <code>0x87D1041C</code> (ERROR_DETECTION_FAILED) $\\rightarrow$ Win32 app installed, but custom detection script returned false.<br/>&nbsp;&nbsp;• <code>0x80070005</code> (E_ACCESSDENIED) $\\rightarrow$ Win32 installer ran in User context instead of System context."
      }
    ],
    scripts: [
      {
        title: "PowerShell IME Log Error Hunter",
        lang: "powershell",
        code: `# Search IME log files for Error and Exception entries
$IMELogPath = "C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log"

if (Test-Path $IMELogPath) {
    Get-Content $IMELogPath | Select-String -Pattern "\[Win32App\].*error|exception|fail" -CaseSensitive:$false | Select-Object -Last 15
} else {
    Write-Warning "IME Log file not found on this machine."
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Device enrollment fails immediately with error code 0x80180018.",
        rootCause: "Error 0x80180018 (MENROLL_E_LICENSE) means the user signing in has no active Microsoft Intune license assigned.",
        diagnosticCommand: "Check Entra admin center > Users > Select user > Licenses.",
        resolution: "Assign the user to GRP-LIC-M365-E5 or allocate an Intune license."
      }
    ],
    quiz: [
      {
        question: "A user attempts to enroll a corporate Windows 11 device into Intune and receives the error '0x80180018'. What is the exact root cause?",
        options: [
          "The device hardware hash is corrupted.",
          "The user does not have an Intune license assigned.",
          "The device has reached the maximum allowed enrollment limit.",
          "The TPM chip is disabled in the UEFI BIOS."
        ],
        correctIndex: 1,
        rationale: "Error 0x80180018 translates to MENROLL_E_LICENSE, which specifically indicates that the user account lacks an active Microsoft Intune license.",
        examTip: "0x80180018 = Missing License. 0x80180014 = Platform/BYOD Blocked. 0x80180026 = Device Limit Reached."
      }
    ]
  },
  {
    id: "lab-19",
    number: "19",
    phaseId: "phase-10",
    domainId: "domain-4",
    title: "PowerShell & Microsoft Graph SDK Automation",
    duration: "40 mins",
    difficulty: "Advanced",
    summary: "Automate enterprise endpoint reporting, stale device detection, and compliance status auditing using the Microsoft Graph PowerShell SDK.",
    keyConcepts: ["Microsoft Graph SDK", "Get-MgDeviceManagementManagedDevice", "Least-Privilege Graph Scopes", "Stale Device Reporting"],
    checklist: [
      { id: "t-19-1", text: "Connect to Microsoft Graph with least-privilege scope: DeviceManagementManagedDevices.Read.All." },
      { id: "t-19-2", text: "Query all managed devices from Intune using Get-MgDeviceManagementManagedDevice." },
      { id: "t-19-3", text: "Calculate inactive/stale devices that have not synced in over 60 days." },
      { id: "t-19-4", text: "Export formatted CSV audit report to C:\\Contoso_Stale_Devices_Report.csv." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Connect to Microsoft Graph with Scoped Permissions",
            "desc": "1. Open PowerShell 7 on your management PC.<br/>2. Execute: <code>Connect-MgGraph -Scopes 'DeviceManagementManagedDevices.ReadWrite.All', 'DeviceManagementConfiguration.ReadWrite.All'</code>.<br/>3. Complete interactive browser authentication and consent."
      },
      {
            "step": 2,
            "title": "Exercise 2: Query All Managed Endpoints and Hardware Telemetry",
            "desc": "1. Execute: <code>$Devices = Get-MgDeviceManagementManagedDevice</code>.<br/>2. Execute: <code>$Devices | Select-Object DeviceName, OperatingSystem, OsVersion, ComplianceState, UserPrincipalName | Format-Table</code>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Export Inactive Stale Devices CSV Audit Report",
            "desc": "1. Execute query filtering for devices inactive for over 90 days:<br/><code>$Threshold = (Get-Date).AddDays(-90); $Stale = $Devices | Where-Object { $_.LastSyncDateTime -lt $Threshold }</code>.<br/>2. Export to CSV: <code>$Stale | Export-Csv -Path C:\\StaleDevicesAudit.csv -NoTypeInformation</code>."
      }
    ],
    scripts: [
      {
        title: "Microsoft Graph Stale Device Audit Script",
        lang: "powershell",
        code: `# Connect to Microsoft Graph
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

# Query all managed devices
$ManagedDevices = Get-MgDeviceManagementManagedDevice -All
$ThresholdDate = (Get-Date).AddDays(-60)

$Report = foreach ($Device in $ManagedDevices) {
    [PSCustomObject]@{
        DeviceName           = $Device.DeviceName
        OperatingSystem      = $Device.OperatingSystem
        OSVersion            = $Device.OsVersion
        ComplianceState      = $Device.ComplianceState
        LastSyncDateTime     = $Device.LastSyncDateTime
        PrimaryUser          = $Device.UserPrincipalName
        IsInactiveOver60Days = ($Device.LastSyncDateTime -lt $ThresholdDate)
        SerialNumber         = $Device.SerialNumber
        Id                   = $Device.Id
    }
}

$Report | Export-Csv -Path "C:\\Contoso_Stale_Devices_Report.csv" -NoTypeInformation
Write-Host "Exported $($Report.Count) device records to C:\\Contoso_Stale_Devices_Report.csv" -ForegroundColor Green`
      }
    ],
    troubleshooting: [
      {
        scenario: "Connect-MgGraph command fails with 'Insufficient privileges to complete the operation'.",
        rootCause: "The administrator signing in was not granted the required delegated permissions (DeviceManagementManagedDevices.Read.All).",
        diagnosticCommand: "Check Get-MgContext and review Scopes property.",
        resolution: "Run Connect-MgGraph -Scopes 'DeviceManagementManagedDevices.Read.All' and consent to the permissions prompt."
      }
    ],
    quiz: [
      {
        question: "Which Microsoft Graph permission scope provides read-only access to query managed device properties and compliance states in Microsoft Intune?",
        options: [
          "User.ReadWrite.All",
          "DeviceManagementManagedDevices.Read.All",
          "Directory.AccessAsUser.All",
          "Policy.Read.All"
        ],
        correctIndex: 1,
        rationale: "DeviceManagementManagedDevices.Read.All provides least-privilege read access to Intune managed device objects and inventory data via Microsoft Graph.",
        examTip: "Always select least-privilege scopes: .Read.All when generating reports, .ReadWrite.All when modifying."
      }
    ]
  },
  {
    id: "lab-20",
    number: "20",
    phaseId: "phase-10",
    domainId: "domain-4",
    title: "Proactive Remediations Engineering",
    duration: "40 mins",
    difficulty: "Advanced",
    summary: "Deploy automated detection and self-healing remediation script packages to resolve configuration drift (such as disabling insecure Remote Desktop connections).",
    keyConcepts: ["Proactive Remediations", "Detection Script", "Remediation Script", "Exit Code 0 vs Exit Code 1", "Configuration Drift"],
    checklist: [
      { id: "t-20-1", text: "Author Detection Script Detect-RDPDisabled.ps1 (Exit 0 = Compliant, Exit 1 = Non-Compliant/Run Remediation)." },
      { id: "t-20-2", text: "Author Remediation Script Remediate-RDPDisabled.ps1 (Sets fDenyTSConnections = 1, Exit 0)." },
      { id: "t-20-3", text: "Navigate to Intune > Devices > Remediations > Create script package." },
      { id: "t-20-4", text: "Configure settings: Run as 64-bit = Yes, Enforce script signature check = No." },
      { id: "t-20-5", text: "Schedule package to run daily on GRP-DEV-WIN-CORPORATE and verify self-healing telemetry." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Author Proactive Remediation Detection Script",
            "desc": "1. Create <code>Detect-RDPDisabled.ps1</code>:<br/><code>$RDP = (Get-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -ErrorAction SilentlyContinue).fDenyTSConnections; if ($RDP -eq 1) { Write-Output 'RDP is disabled (Compliant)'; Exit 0 } else { Write-Output 'RDP is enabled (Non-compliant)'; Exit 1 }</code>."
      },
      {
            "step": 2,
            "title": "Exercise 2: Author Proactive Remediation Fix Script",
            "desc": "1. Create <code>Remediate-RDPDisabled.ps1</code>:<br/><code>Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -Value 1; Write-Output 'RDP successfully disabled.'; Exit 0</code>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Deploy Remediation Package in Intune",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Remediations</strong> > click <strong>+ Create script package</strong>.<br/>2. Name: <code>PR-Security-DisableRDP</code>.<br/>3. Upload detection script <code>Detect-RDPDisabled.ps1</code> and remediation script <code>Remediate-RDPDisabled.ps1</code>.<br/>4. Run script in 64-bit PowerShell: <strong>Yes</strong> | Enforce script signature check: <strong>No</strong>.<br/>5. <em>Assignments:</em> Assign to <code>GRP-DEV-WIN-CORPORATE</code> with daily schedule > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "Detect-RDPDisabled.ps1 (Detection Script)",
        lang: "powershell",
        code: `# Detect-RDPDisabled.ps1
# Exit 0 = Compliant (No action needed)
# Exit 1 = Non-Compliant (Triggers remediation script)

$RDPValue = (Get-ItemProperty -Path "HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server" -Name "fDenyTSConnections" -ErrorAction SilentlyContinue).fDenyTSConnections

if ($RDPValue -eq 1) {
    Write-Output "Compliant: Remote Desktop is disabled."
    Exit 0
} else {
    Write-Output "Non-Compliant: Remote Desktop is enabled. Remediation required."
    Exit 1
}`
      },
      {
        title: "Remediate-RDPDisabled.ps1 (Remediation Script)",
        lang: "powershell",
        code: `# Remediate-RDPDisabled.ps1
try {
    Set-ItemProperty -Path "HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server" -Name "fDenyTSConnections" -Value 1 -Force
    Write-Output "Successfully disabled Remote Desktop."
    Exit 0
} catch {
    Write-Error "Failed to disable Remote Desktop: $_"
    Exit 1
}`
      }
    ],
    troubleshooting: [
      {
        scenario: "Proactive remediation package executes on client, but reports 'Remediation failed' in the Intune console.",
        rootCause: "The remediation script failed to execute with Exit Code 0 (e.g. an uncaught exception occurred or script exited with Exit 1).",
        diagnosticCommand: "Open C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\AgentExecutor.log.",
        resolution: "Wrap remediation code in a try/catch block and ensure 'Exit 0' is returned upon successful modification."
      }
    ],
    quiz: [
      {
        question: "In Microsoft Intune Proactive Remediations, what must the Detection Script return to indicate that the endpoint is non-compliant and that the Remediation Script must be executed?",
        options: [
          "Exit Code 0 with STDOUT output",
          "Exit Code 1",
          "A JSON string containing {\"Compliant\": false}",
          "Exit Code 3010"
        ],
        correctIndex: 1,
        rationale: "For Proactive Remediations: Exit Code 0 in the Detection script means Compliant (remediation skipped). Exit Code 1 indicates Non-Compliant, which immediately triggers execution of the Remediation script.",
        examTip: "Proactive Remediations: Exit 0 = Good / Do Nothing. Exit 1 = Drift Detected / Run Remediation."
      }
    ]
  },
  {
    id: "lab-22",
    number: "22",
    phaseId: "phase-11",
    domainId: "domain-3",
    title: "macOS Management, APNs & Platform SSO",
    duration: "35 mins",
    difficulty: "Intermediate",
    summary: "Configure Apple MDM Push Certificate (APNs), deploy macOS FileVault disk encryption with Entra ID key escrow, and configure modern macOS Platform SSO with the Microsoft Enterprise SSO plug-in.",
    keyConcepts: ["Apple MDM Push Certificate (APNs)", "macOS Platform SSO", "Microsoft Enterprise SSO Plug-in", "FileVault Key Escrow"],
    checklist: [
      { id: "t-22-1", text: "Configure Apple MDM Push Certificate (APNs) under Intune > Devices > Enrollment > Apple." },
      { id: "t-22-2", text: "Create FileVault Encryption Profile (Endpoint security > Disk encryption > FileVault) with Entra escrow." },
      { id: "t-22-3", text: "Create macOS Platform SSO Profile (Settings Catalog > Authentication > Platform SSO)." },
      { id: "t-22-4", text: "Assign profiles to GRP-DEV-MACOS-CORPORATE and validate seamless Safari SSO." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Configure Apple MDM Push Certificate (APNs)",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Apple MDM Push certificate</strong>.<br/>2. Grant Microsoft permission to send user and device info to Apple: <strong>I agree</strong>.<br/>3. Download Intune CSR file > sign in to Apple Push Certificates Portal (<strong>https://identity.apple.com/pushcert</strong>) with corporate Apple ID.<br/>4. Upload CSR, generate APNs certificate (<code>.pem</code>), and upload back into Intune."
      },
      {
            "step": 2,
            "title": "Exercise 2: Deploy FileVault Disk Encryption Policy",
            "desc": "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Disk encryption</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>macOS</strong> | Profile: <strong>FileVault</strong> > click <strong>Create</strong>.<br/>3. Enable FileVault: <strong>Yes</strong> | Recovery key type: <strong>Personal recovery key</strong> | Escrow recovery key to Entra ID: <strong>Yes</strong>.<br/>4. Assign to Executive group containing Miriam Graham > click <strong>Create</strong>."
      },
      {
            "step": 3,
            "title": "Exercise 3: Deploy macOS Platform SSO with Microsoft Enterprise SSO Extension",
            "desc": "1. In Intune > <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (macOS > Settings catalog).<br/>2. Name: <code>MAC-CFG-PlatformSSO-Microsoft</code>.<br/>3. Add settings from <strong>Single Sign-On Extensions</strong>:<br/>&nbsp;&nbsp;• Extension identifier: <code>com.microsoft.CompanyPortalMac.ssoextension</code><br/>&nbsp;&nbsp;• Type: <strong>Redirect</strong><br/>&nbsp;&nbsp;• URLs: <code>https://login.microsoftonline.com</code> and <code>https://device.login.microsoftonline.com</code>.<br/>4. Assign to macOS devices > click <strong>Create</strong>."
      }
    ],
    scripts: [
      {
        title: "macOS Platform SSO Verification Command (Terminal)",
        lang: "bash",
        code: `# Run in macOS Terminal to verify Platform SSO state
app-sso -v
# Output should display Microsoft Enterprise SSO Plug-in status and Entra realm`
      }
    ],
    troubleshooting: [
      {
        scenario: "Admin cannot enroll macOS or iOS devices into Intune; enrollment fails with APNs error.",
        rootCause: "The Apple MDM Push Certificate (APNs) has expired or has not been configured in the Intune tenant.",
        diagnosticCommand: "Check Intune > Devices > Enrollment > Apple > Apple MDM Push Certificate.",
        resolution: "Renew the APNs certificate annually using the same Apple ID to prevent re-enrolling all devices."
      }
    ],
    quiz: [
      {
        question: "How frequently must an Apple MDM Push Certificate (APNs) be renewed in Microsoft Intune to maintain management of iOS and macOS devices?",
        options: [
          "Every 30 days",
          "Every 90 days",
          "Annually (Every 365 days)",
          "Never, it is permanent once generated"
        ],
        correctIndex: 2,
        rationale: "Apple MDM Push Certificates (APNs) expire after exactly one year (365 days) and must be renewed annually using the same Apple ID.",
        examTip: "Crucial rule: Always renew APNs with the EXACT SAME Apple ID. Renewing with a different Apple ID un-enrolls all existing Apple devices!"
      }
    ]
  },
  {
    id: "lab-23",
    number: "23",
    phaseId: "phase-11",
    domainId: "domain-1",
    title: "Android Enterprise Deployment (via Android Studio AVD)",
    duration: "40 mins",
    difficulty: "Intermediate",
    summary: "Link Intune to Managed Google Play, configure and launch a free Android Studio AVD emulator, and enroll as an Android Enterprise Personally-Owned Work Profile.",
    keyConcepts: ["Managed Google Play", "Personally-Owned Work Profile", "Android Studio AVD Emulator", "Badged Work Apps", "Dedicated Kiosk Mode"],
    checklist: [
      { id: "t-23-1", text: "Link Intune to Managed Google Play under Intune > Devices > Enrollment > Android > Managed Google Play." },
      { id: "t-23-2", text: "Launch Android Studio AVD Emulator (Pixel 7, Android 14 UpsideDownCake with Google Play)." },
      { id: "t-23-3", text: "Sign in with test Google Account and install Intune Company Portal on emulator." },
      { id: "t-23-4", text: "Enroll emulator as Personally-Owned Work Profile with persona diego.s@<tenant>.onmicrosoft.com." },
      { id: "t-23-5", text: "Verify work profile sandbox with badged briefcase icons on managed apps." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Connect Intune to Managed Google Play",
            "desc": "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Managed Google Play</strong>.<br/>2. Grant Microsoft permission to send user and device information to Google: <strong>I agree</strong>.<br/>3. Select <strong>Launch Google to connect now</strong> > sign in with enterprise Google account and link to Intune."
      },
      {
            "step": 2,
            "title": "Exercise 2: Enroll Android Studio AVD as Personally-Owned Work Profile",
            "desc": "1. Launch Android Studio AVD (Pixel 7 Android 14 API 34).<br/>2. Open Google Play Store > search and install <strong>Intune Company Portal</strong>.<br/>3. Open Company Portal > sign in as <code>diego.s@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>4. Follow on-screen prompts to create the encrypted <strong>Work Profile</strong> sandbox container."
      },
      {
            "step": 3,
            "title": "Exercise 3: Validate Work Profile Sandbox & Deploy Managed Apps",
            "desc": "1. In Intune admin center > <strong>Apps</strong> > <strong>Android</strong> > select <strong>Microsoft Outlook</strong> > assign to <code>GRP-USR-FIELD</code>.<br/>2. In Android AVD, observe the badged briefcase icon on Outlook.<br/>3. Confirm corporate data cannot be copied across to personal apps outside the work container."
      }
    ],
    scripts: [
      {
        title: "Launch Android Studio Emulator via Command Line",
        lang: "cmd",
        code: `:: Launch configured AVD from Android SDK tools
emulator -avd Pixel_7_API_34 -netdelay none -netspeed full`
      }
    ],
    troubleshooting: [
      {
        scenario: "Company Portal on Android emulator fails to create Work Profile during enrollment.",
        rootCause: "The Android Virtual Device was created without Google Play store support or Android Device Administrator (legacy) was triggered.",
        diagnosticCommand: "Check AVD settings in Android Studio to confirm Google Play icon is present.",
        resolution: "Create a new AVD selecting a hardware profile with Google Play Store support (e.g. Pixel 7 with Google APIs + Play)."
      }
    ],
    quiz: [
      {
        question: "Which Android Enterprise enrollment management mode creates an isolated, encrypted corporate partition on a user's personal smartphone while keeping personal apps and data completely separate?",
        options: [
          "Android Device Administrator (Legacy)",
          "Android Enterprise Personally-Owned Work Profile",
          "Android Enterprise Fully Managed (Corporate Owned)",
          "Dedicated Device (Kiosk)"
        ],
        correctIndex: 1,
        rationale: "Android Enterprise Personally-Owned Work Profile isolates corporate apps and data in an encrypted container marked with a briefcase badge, ideal for BYOD scenarios.",
        examTip: "Personally-Owned Work Profile = BYOD. Fully Managed = Corporate device single user. Dedicated = Multi-user / Kiosk."
      }
    ]
  },
  {
    id: "capstone",
    number: "Capstone",
    phaseId: "phase-12",
    domainId: "domain-4",
    title: "Final Capstone Project: 20-Seat Enterprise Modernization",
    duration: "60 mins",
    difficulty: "Expert",
    summary: "Integrate the complete Microsoft 365 modern endpoint architecture across 20 active users within the 20/5 license budget and solve 3 injected enterprise failure challenges.",
    keyConcepts: ["Full Stack Integration", "20/5 Budget Validation", "Injected Failure 1: Win32 Detection Loop", "Injected Failure 2: CA Zero Trust Block", "Injected Failure 3: ESP Dependency Timeout"],
    checklist: [
      { id: "t-cap-1", text: "Verify 20 Active M365 E5 license assignments via GRP-LIC-M365-E5 (5 reserve seats unassigned)." },
      { id: "t-cap-2", text: "Verify Windows Subscription Activation (Pro to Enterprise step-up) on all corporate VMs." },
      { id: "t-cap-3", text: "Diagnose & Resolve Challenge 1: Win32 app install loop caused by detection script registry path mismatch (Error 0x87D1041C)." },
      { id: "t-cap-4", text: "Diagnose & Resolve Challenge 2: Conditional Access lockout triggered by Defender simulated test threat." },
      { id: "t-cap-5", text: "Diagnose & Resolve Challenge 3: Autopilot ESP timeout caused by missing required dependency app." },
      { id: "t-cap-6", text: "Generate final Microsoft Graph endpoint audit report and export completion diploma." }
    ],
    steps: [

      {
            "step": 1,
            "title": "Exercise 1: Audit Complete 20-Seat Enterprise Identity & License Stack",
            "desc": "1. In Microsoft Entra admin center, verify all 20 personas have active Microsoft 365 E5 licenses inherited from <code>GRP-LIC-M365-E5</code>.<br/>2. Confirm exactly 5 licenses remain in the Unassigned Reserve Buffer (20 active / 5 reserve)."
      },
      {
            "step": 2,
            "title": "Exercise 2: Solve Injected Failure Challenge 1 (Win32 Detection Loop 0x87D1041C)",
            "desc": "1. In Intune admin center, observe Win32 app reporting error <code>0x87D1041C</code> on VM1.<br/>2. Open <code>C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log</code>.<br/>3. Identify that the registry detection rule checked <code>HKCU</code> instead of <code>HKLM</code>.<br/>4. Edit the app detection rule in Intune to point to the correct HKLM registry key and force sync."
      },
      {
            "step": 3,
            "title": "Exercise 3: Solve Injected Failure Challenge 2 (Conditional Access Lockout)",
            "desc": "1. Observe that an admin account is blocked from entering Intune portal.<br/>2. Use the break-glass account <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code> in an InPrivate window to sign in.<br/>3. Navigate to Conditional Access > add the missing group exclusion for emergency maintenance."
      },
      {
            "step": 4,
            "title": "Exercise 4: Solve Injected Failure Challenge 3 (ESP Missing Dependency Timeout)",
            "desc": "1. In Autopilot ESP profile, an app dependency failed, causing VM2 to hang at 'Device Setup' for 60 minutes.<br/>2. In Intune > Apps > Win32 Apps, identify circular dependency between App A and App B.<br/>3. Remove circular dependency and redeploy VM2."
      }
    ],
    scripts: [
      {
        title: "Master Enterprise Audit and Health Score Script",
        lang: "powershell",
        code: `# Comprehensive Enterprise Estate Health Check
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All", "Organization.Read.All"

$Devices = Get-MgDeviceManagementManagedDevice -All
$CompliantCount = ($Devices | Where-Object { $_.ComplianceState -eq "compliant" }).Count
$TotalCount = $Devices.Count
$HealthScore = if ($TotalCount -gt 0) { [math]::Round(($CompliantCount / $TotalCount) * 100, 1) } else { 0 }

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  CONTOSO ENTERPRISE MD-102 ESTATE HEALTH" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Total Managed Endpoints: $TotalCount" -ForegroundColor Green
Write-Host "Compliant Endpoints:     $CompliantCount" -ForegroundColor Green
Write-Host "Overall Health Score:    $HealthScore %" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan`
      }
    ],
    troubleshooting: [
      {
        scenario: "Autopilot ESP stalls on 'Account setup: Identifying' for more than 30 minutes.",
        rootCause: "A required User-targeted Win32 application or PowerShell script is failing in User context or blocked by user MFA prompt.",
        diagnosticCommand: "Press Shift + F10 > Run mdmdiagnosticstool.exe -area Autopilot -cab C:\\Temp\\APDiag.cab.",
        resolution: "Configure required applications in Device context (System) or unblock ESP on account setup phase."
      }
    ],
    quiz: [
      {
        question: "You have completed the entire MD-102 blueprint across Autopilot, Settings Catalog, Custom Compliance, Defender EDR, BitLocker, WUfB, and MAM. What is the fundamental architecture principle that connects all these components into a Zero Trust framework?",
        options: [
          "All devices must be Hybrid Joined and connected to on-premises VPN at all times.",
          "Defender for Endpoint assesses real-time machine risk, Intune evaluates health compliance policies, and Entra Conditional Access enforces dynamic access control.",
          "All administration must be performed using a single root Global Administrator account.",
          "Every user must be assigned full local administrator permissions on their primary PC."
        ],
        correctIndex: 1,
        rationale: "Microsoft's cloud Zero Trust architecture integrates Defender for Endpoint (threat detection) $\\rightarrow$ Intune (compliance evaluation) $\\rightarrow$ Microsoft Entra Conditional Access (access gatekeeper).",
        examTip: "Mastering this Zero Trust lifecycle is the key to achieving 900+ on Exam MD-102."
      }
    ]
  }
];
