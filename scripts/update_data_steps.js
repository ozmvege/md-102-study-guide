const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Define updated high-fidelity step definitions for all labs
const updatedLabSteps = {
  "lab-1": [
    {
      step: 1,
      title: "Exercise 1: Validate Intune MDM Authority",
      desc: "1. Sign in to <strong>https://intune.microsoft.com</strong> as Intune Administrator.<br/>2. In the left navigation pane, select <strong>Tenant administration</strong> > <strong>Tenant status</strong>.<br/>3. In the <em>Tenant details</em> tab, verify that <strong>MDM authority</strong> displays <strong>Microsoft Intune</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Custom Company Branding",
      desc: "1. Sign in to <strong>https://entra.microsoft.com</strong> as Global Administrator.<br/>2. Navigate to <strong>Identity</strong> > <strong>User experiences</strong> > <strong>Company branding</strong>.<br/>3. Select <strong>Default sign-in</strong> (or click <strong>+ Customize</strong>).<br/>4. In the <em>Basics</em> tab:<br/>&nbsp;&nbsp;• Banner logo: Upload 280x60 px PNG logo.<br/>&nbsp;&nbsp;• Square logo (light/dark): Upload 240x240 px PNG logo.<br/>&nbsp;&nbsp;• Page background: Upload 1920x1080 px image.<br/>5. In the <em>Sign-in form</em> tab:<br/>&nbsp;&nbsp;• Sign-in page text: Enter <code>Authorized Contoso Personnel Only. All activities are monitored and audited.</code><br/>6. Select <strong>Review + save</strong> > click <strong>Save</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Create & Harden Break-Glass Emergency Account",
      desc: "1. In Microsoft Entra admin center, navigate to <strong>Identity</strong> > <strong>Users</strong> > <strong>All users</strong> > <strong>New user</strong> > <strong>Create new user</strong>.<br/>2. User Principal Name: <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Display Name: <code>Global Emergency BreakGlass</code>.<br/>4. Password: Set a 32+ character high-entropy password (uncheck auto-generate).<br/>5. On the <em>Assignments</em> tab: Click <strong>+ Add role</strong> > search for and assign <strong>Global Administrator</strong>.<br/>6. Select <strong>Review + create</strong> > click <strong>Create</strong>."
    },
    {
      step: 4,
      title: "Exercise 4: Configure Emergency Account Alerting & CA Exclusions",
      desc: "1. When creating any Conditional Access policy in Entra ID, navigate to <strong>Users</strong> > <strong>Exclude</strong> > <strong>Users and groups</strong> > check and select <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Navigate to <strong>Identity</strong> > <strong>Monitoring & health</strong> > <strong>Diagnostic settings</strong> to ensure Entra ID sign-in logs stream to Log Analytics for instant alerting on emergency account use."
    }
  ],
  "lab-2": [
    {
      step: 1,
      title: "Exercise 1: Create Intune Scope Tags",
      desc: "1. Sign in to <strong>https://intune.microsoft.com</strong>.<br/>2. Navigate to <strong>Tenant administration</strong> > <strong>Roles</strong> > select the <strong>Scope tags</strong> tab.<br/>3. Select <strong>+ Create</strong>.<br/>4. Name: <code>Tag-Finance</code> | Description: <em>Restricts visibility to Finance department devices and profiles</em>.<br/>5. Select <strong>Next</strong> > select <strong>Create</strong>.<br/>6. Repeat to create <code>Tag-IT</code> and <code>Tag-HR</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Create Administrative Unit (AU) in Entra ID",
      desc: "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Roles & admins</strong> > <strong>Admin units</strong>.<br/>2. Select <strong>+ Add</strong>.<br/>3. Name: <code>AU-Finance-Operations</code> | Description: <em>Administrative boundary for Finance staff and workstations</em>.<br/>4. Select <strong>Next: Assign roles</strong> > select <strong>Next: Review + create</strong> > click <strong>Create</strong>.<br/>5. Open <code>AU-Finance-Operations</code> > under <em>Manage</em>, select <strong>Users</strong> > click <strong>+ Add member</strong> > add <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>."
    },
    {
      step: 3,
      title: "Exercise 3: Assign Scoped Help Desk Operator Role",
      desc: "1. In Intune admin center, go to <strong>Tenant administration</strong> > <strong>Roles</strong> > <strong>All roles</strong>.<br/>2. Select the built-in role <strong>Help Desk Operator</strong>.<br/>3. Under <em>Manage</em>, select <strong>Assignments</strong> > click <strong>+ Assign</strong>.<br/>4. Assignment name: <code>Finance-HelpDesk-Assignment</code>.<br/>5. <em>Admin Groups:</em> Add <code>intune-operator@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>6. <em>Scope Groups:</em> Select <code>GRP-DEV-WIN-CORPORATE</code>.<br/>7. <em>Scope Tags:</em> Select <code>Tag-Finance</code>.<br/>8. Select <strong>Next</strong> > <strong>Create</strong>."
    },
    {
      step: 4,
      title: "Exercise 4: Validate Scoped View as Operator",
      desc: "1. Open an InPrivate browser window and sign in to <strong>https://intune.microsoft.com</strong> as <code>intune-operator@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Navigate to <strong>Devices</strong> > <strong>All devices</strong> and <strong>Devices</strong> > <strong>Configuration</strong>.<br/>3. Confirm only devices/profiles carrying <code>Tag-Finance</code> are visible; all IT/HR objects are completely hidden."
    }
  ],
  "lab-2b": [
    {
      step: 1,
      title: "Exercise 1: Inspect Base Windows 11 Pro Licensing State",
      desc: "1. Power on <strong>MD102-VM1-Adele</strong> and sign in as local administrator.<br/>2. Open an elevated Command Prompt or PowerShell terminal.<br/>3. Execute <code>slmgr /dli</code> and observe the License Status: <em>Windows(R) Operating System, Professional edition</em>.<br/>4. Execute <code>Get-ComputerInfo | Select-Object WindowsProductName, WindowsEditionId</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Sign In with Licensed Microsoft 365 E5 User",
      desc: "1. In Windows Settings > <strong>Accounts</strong> > <strong>Access work or school</strong>, ensure the device is joined to Microsoft Entra ID.<br/>2. Sign out of the local administrator account and sign in as <code>adele.vance@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Open Task Manager > Services > confirm <code>ClipSVC</code> (Client License Service) is running and querying Entra ID token entitlements."
    },
    {
      step: 3,
      title: "Exercise 3: Verify Zero-Reboot Dynamic Step-Up",
      desc: "1. Open elevated PowerShell and re-run <code>slmgr /dli</code>.<br/>2. Observe the output: <em>Windows(R) Operating System, Enterprise edition</em>.<br/>3. Confirm that Windows 11 Pro seamlessly stepped up to <strong>Windows 11 Enterprise</strong> in real time without any reboot or product key entry!"
    }
  ],
  "lab-3": [
    {
      step: 1,
      title: "Exercise 1: Execute dsregcmd Telemetry Dump",
      desc: "1. On <strong>MD102-VM1-Adele</strong>, open PowerShell as Administrator.<br/>2. Execute <code>dsregcmd /status > C:\\dsregcmd_report.txt</code> and open <code>notepad C:\\dsregcmd_report.txt</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Dissect Device State & Cryptographic Identifiers",
      desc: "1. Locate the <code>+--- Device State ---+</code> block.<br/>2. Verify <code>AzureAdJoined : YES</code>, <code>EnterpriseJoined : NO</code>, <code>DomainJoined : NO</code>.<br/>3. Verify <code>DeviceId : &lt;GUID&gt;</code> and copy this GUID.<br/>4. Open Microsoft Entra admin center > <strong>Devices</strong> > <strong>All devices</strong> > search for this GUID and verify matching device record."
    },
    {
      step: 3,
      title: "Exercise 3: Dissect SSO State & Primary Refresh Token (PRT)",
      desc: "1. Locate the <code>+--- SSO State ---+</code> block.<br/>2. Verify <code>AzureAdPrt : YES</code>.<br/>3. Verify <code>AzureAdPrtAuthority : https://login.microsoftonline.com/&lt;TenantID&gt;</code>.<br/>4. Verify <code>AcquirePrtDiagnostics : YES</code> and <code>PrtValidity : Valid</code>."
    }
  ],
  "lab-4": [
    {
      step: 1,
      title: "Exercise 1: Configure MDM vs MAM Scope in Entra ID",
      desc: "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Mobility (MDM and WIP)</strong>.<br/>2. Select <strong>Microsoft Intune</strong>.<br/>3. Set <strong>MDM user scope</strong> to <strong>All</strong>.<br/>4. Set <strong>MAM user scope</strong> to <strong>None</strong> (ensures Windows 10/11 devices perform full MDM enrollment rather than WIP/MAM-only registration).<br/>5. Click <strong>Save</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Windows Platform Enrollment Restrictions",
      desc: "1. In Microsoft Intune admin center (<strong>https://intune.microsoft.com</strong>), navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Device platform restrictions</strong>.<br/>2. Select the <strong>Windows restrictions</strong> tab > click <strong>Create restriction</strong>.<br/>3. Name: <code>Block-Personal-Windows-BYOD</code>.<br/>4. On the <em>Platform settings</em> tab:<br/>&nbsp;&nbsp;• MDM: <strong>Allow</strong><br/>&nbsp;&nbsp;• Min version: <code>10.0.22631.0</code> (Windows 11 23H2)<br/>&nbsp;&nbsp;• Personally owned: <strong>Block</strong>.<br/>5. On the <em>Assignments</em> tab: Assign to <strong>All Users</strong>.<br/>6. Click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Pre-Register Corporate Device Identifiers",
      desc: "1. In Intune admin center, go to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Corporate device identifiers</strong>.<br/>2. Select <strong>+ Add</strong> > <strong>Upload CSV file</strong>.<br/>3. Upload a CSV containing Manufacturer, Model, and Serial Number for corporate hardware.<br/>4. Click <strong>Add</strong> (pre-registered serial numbers bypass personal device blocks)."
    },
    {
      step: 4,
      title: "Exercise 4: Configure Stale Device Clean-Up Rules",
      desc: "1. In Intune admin center, go to <strong>Devices</strong> > <strong>Device clean-up rules</strong>.<br/>2. Toggle <strong>Delete devices based on last check-in date</strong> to <strong>Yes</strong>.<br/>3. Set <strong>Delete devices that haven't checked in for this many days</strong> to <strong>90</strong>.<br/>4. Click <strong>Save</strong>."
    }
  ],
  "lab-5": [
    {
      step: 1,
      title: "Exercise 1: Extract 4K Hardware Hash in Windows OOBE",
      desc: "1. Start <strong>MD102-VM2-Alex</strong> from a fresh Windows 11 installation ISO.<br/>2. When the Region/Keyboard selection screen appears (Out-Of-Box Experience / OOBE), press <strong>Shift + F10</strong> to launch cmd.exe.<br/>3. Type <code>powershell</code> and press Enter.<br/>4. Execute: <code>Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force</code><br/>5. Execute: <code>Install-Script -Name Get-WindowsAutopilotInfo -Force</code><br/>6. Execute: <code>Get-WindowsAutopilotInfo -OutputFile C:\\AutopilotHash.csv -GroupTag Corp-Win11</code>"
    },
    {
      step: 2,
      title: "Exercise 2: Import Hardware Hash into Intune",
      desc: "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Windows</strong> > <strong>Devices</strong> (under Windows Autopilot).<br/>2. Click <strong>+ Import</strong> > browse and select <code>AutopilotHash.csv</code> > click <strong>Import</strong>.<br/>3. Wait until the sync status completes (device displays <em>Assigned</em>)."
    },
    {
      step: 3,
      title: "Exercise 3: Create Dynamic Device Group & Autopilot Deployment Profile",
      desc: "1. In Entra admin center > <strong>Groups</strong> > <strong>New group</strong> > Security > Name: <code>GRP-DEV-WIN-AUTOPILOT</code> > Membership type: <strong>Dynamic Device</strong>.<br/>2. Dynamic Rule: <code>(device.devicePhysicalIDs -any (_ -contains \"[OrderID]:Corp-Win11\"))</code> > click <strong>Save</strong> > click <strong>Create</strong>.<br/>3. In Intune admin center > <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Deployment Profiles</strong> > <strong>+ Create profile</strong> > <strong>Windows PC</strong>.<br/>4. Name: <code>Autopilot-UserDriven-AzureADJoin</code>.<br/>5. Deployment mode: <strong>User-Driven</strong> | Join to Entra ID as: <strong>Microsoft Entra joined</strong>.<br/>6. User account type: <strong>Standard</strong> (Enforces Least Privilege).<br/>7. Assignments: Assign to <code>GRP-DEV-WIN-AUTOPILOT</code> > click <strong>Create</strong>."
    },
    {
      step: 4,
      title: "Exercise 4: Configure Enrollment Status Page (ESP)",
      desc: "1. In Intune admin center > <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Enrollment Status Page</strong>.<br/>2. Select <strong>Default</strong> profile > click <strong>Properties</strong> > Edit <em>Settings</em>.<br/>3. Set <em>Show app and profile configuration progress</em> to <strong>Yes</strong>.<br/>4. Set <em>Block device use until all apps and profiles are installed</em> to <strong>Yes</strong>.<br/>5. Set <em>Show error when installation takes longer than specified number of minutes</em> to <strong>60</strong>.<br/>6. Click <strong>Review + save</strong>."
    },
    {
      step: 5,
      title: "Exercise 5: Test Autopilot Deployment on VM 2",
      desc: "1. Reboot <strong>MD102-VM2-Alex</strong>.<br/>2. Observe the customized Contoso company branding on the Welcome screen.<br/>3. Sign in as <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code> with password <code>ContosoLabP@ssw0rd2026!</code>.<br/>4. Watch the 3-phase ESP complete: Device preparation, Device setup, Account setup."
    }
  ],
  "lab-5b": [
    {
      step: 1,
      title: "Exercise 1: Create Static Security Group for Autopilot v2",
      desc: "1. In Microsoft Entra admin center, navigate to <strong>Groups</strong> > <strong>All groups</strong> > <strong>New group</strong>.<br/>2. Group type: <strong>Security</strong> | Group name: <code>GRP-DEV-WIN-AUTOPILOT-V2</code>.<br/>3. Membership type: <strong>Assigned</strong> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Assign Intune Autopilot Service Principal as Group Owner",
      desc: "1. Open group <code>GRP-DEV-WIN-AUTOPILOT-V2</code> > under <em>Manage</em>, select <strong>Owners</strong>.<br/>2. Click <strong>+ Add owners</strong>.<br/>3. Search for the enterprise application: <code>Intune Autopilot Confidential Client</code> (App ID: <code>f1346770-5b25-470b-88bd-d5744ab7952c</code>).<br/>4. Select it and click <strong>Select</strong> (This grants Intune service permission to automatically join devices into this group without hardware hashes!)."
    },
    {
      step: 3,
      title: "Exercise 3: Create Device Preparation Policy in Intune",
      desc: "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Device preparation policies</strong> > click <strong>+ Create</strong>.<br/>2. Name: <code>Autopilot-v2-Corporate-Policy</code>.<br/>3. <em>Device group:</em> Select <code>GRP-DEV-WIN-AUTOPILOT-V2</code>.<br/>4. <em>Configuration settings:</em> Join type: <strong>Microsoft Entra joined</strong> | Account type: <strong>Standard user</strong>.<br/>5. <em>Apps & Scripts:</em> Select initial required packages (e.g. Company Portal, M365 Apps).<br/>6. <em>Assignments:</em> Assign to <code>GRP-USR-HR</code> (Megan Bowen).<br/>7. Click <strong>Review + create</strong> > <strong>Create</strong>."
    },
    {
      step: 4,
      title: "Exercise 4: Deploy Clean Un-Hashed Windows 11 VM 3",
      desc: "1. Power on <strong>MD102-VM3-Megan</strong> (Clean un-hashed Windows 11 23H2/24H2 VM).<br/>2. In OOBE, sign in as <code>megan.bowen@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Observe instantaneous enrollment into <code>GRP-DEV-WIN-AUTOPILOT-V2</code> and silent policy application without any CSV hash import delay!"
    }
  ],
  "lab-6": [
    {
      step: 1,
      title: "Exercise 1: Create OneDrive KFM Profile in Settings Catalog",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile type: <strong>Settings catalog</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CFG-OneDrive-KFM</code>.<br/>4. Click <strong>+ Add settings</strong> > search for <code>OneDrive</code> > select category <strong>OneDrive</strong>.<br/>5. Check <em>Silently move Windows known folders to OneDrive</em> and <em>Silently sign in users to the OneDrive sync app with their Windows credentials</em>.<br/>6. Set Tenant ID: <code>&lt;Tenant GUID&gt;</code> | Show notification to users after folders have been redirected: <strong>No</strong>.<br/>7. Select <strong>Next</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Create Microsoft Edge Hardening Profile",
      desc: "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Settings catalog).<br/>2. Name: <code>WIN-CFG-Edge-Security-Hardening</code>.<br/>3. Add settings from <strong>Microsoft Edge</strong> category:<br/>&nbsp;&nbsp;• <em>Configure SmartScreen</em>: <strong>Enabled</strong><br/>&nbsp;&nbsp;• <em>Prevent bypassing SmartScreen prompts for sites</em>: <strong>Enabled</strong><br/>&nbsp;&nbsp;• <em>Default search provider</em>: <strong>Enabled (Bing Corporate Secure)</strong>.<br/>4. Select <strong>Next</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Create Dynamic Assignment Filter for Windows 11",
      desc: "1. In Intune admin center, go to <strong>Tenant administration</strong> > <strong>Filters</strong> > click <strong>+ Create</strong>.<br/>2. Name: <code>FLT-Corporate-Win11-Enterprise</code> | Platform: <strong>Windows 10 and later</strong>.<br/>3. Rule syntax: <code>(device.operatingSystemSKU -eq \"Enterprise\") and (device.osVersion -ge \"10.0.22631\")</code>.<br/>4. Click <strong>Next</strong> > <strong>Create</strong>."
    },
    {
      step: 4,
      title: "Exercise 4: Assign Profile with Filter Mode: Include",
      desc: "1. Open profile <code>WIN-CFG-OneDrive-KFM</code> > select <strong>Properties</strong> > Edit <strong>Assignments</strong>.<br/>2. Under <em>Included groups</em>: Select <strong>All Devices</strong>.<br/>3. Click <strong>Edit filter</strong> > select <strong>Include filtered devices in assignment</strong> > choose <code>FLT-Corporate-Win11-Enterprise</code>.<br/>4. Click <strong>Review + save</strong>."
    }
  ],
  "lab-6b": [
    {
      step: 1,
      title: "Exercise 1: Export GPO Backup from Active Directory",
      desc: "1. On an Active Directory domain controller or management PC, open <strong>Group Policy Management Console (GPMC)</strong>.<br/>2. Right-click the targeted GPO (e.g. <em>Default Domain Security Policy</em>) > select <strong>Save Report...</strong>.<br/>3. Save as <strong>XML File (*.xml)</strong> to <code>C:\\GPO_Backup.xml</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Import GPO XML into Group Policy Analytics",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Group Policy analytics</strong>.<br/>2. Click <strong>+ Import</strong>.<br/>3. Select <code>C:\\GPO_Backup.xml</code> > click <strong>Next</strong> > click <strong>Create</strong>.<br/>4. Wait 15 seconds for Intune to parse all GPO settings against the modern Windows Configuration Service Provider (CSP) database."
    },
    {
      step: 3,
      title: "Exercise 3: Analyze MDM Support Score & Mapped CSPs",
      desc: "1. In Group Policy analytics list, observe the <strong>MDM Support %</strong> (e.g. <em>92%</em>).<br/>2. Click on the GPO name to open the detailed breakdown.<br/>3. Review settings with status <strong>Yes</strong> (Direct CSP match) vs <strong>No</strong> (Deprecated/unsupported registry hacks)."
    },
    {
      step: 4,
      title: "Exercise 4: Execute Direct Migration into Settings Catalog",
      desc: "1. In the GPO detail view, check all supported settings > click <strong>Migrate</strong>.<br/>2. Select target platform: <strong>Windows 10 and later</strong>.<br/>3. Profile name: <code>WIN-CFG-Migrated-DomainSecurity</code>.<br/>4. Click <strong>Next</strong> > Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    }
  ],
  "lab-6c": [
    {
      step: 1,
      title: "Exercise 1: Deploy Trusted Root CA Certificate Profile",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile type: <strong>Templates</strong> > select <strong>Trusted certificate</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CERT-RootCA</code>.<br/>4. Certificate file: Upload enterprise Root CA public certificate (<code>.cer</code>).<br/>5. Destination store: <strong>Computer certificate store - Root</strong>.<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Create SCEP User Certificate Profile",
      desc: "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Templates > <strong>SCEP certificate</strong>).<br/>2. Name: <code>WIN-CERT-SCEP-User</code>.<br/>3. Certificate type: <strong>User</strong> | Subject name format: <code>CN={{UserPrincipalName}}</code>.<br/>4. Subject alternative name (SAN): <strong>User Principal Name (UPN)</strong> = <code>{{UserPrincipalName}}</code>.<br/>5. Key storage provider (KSP): <strong>Enroll to TPM KSP if present, otherwise software KSP</strong>.<br/>6. SCEP Server URLs: Enter NDES SCEP server URL.<br/>7. Assign to <code>GRP-LIC-M365-E5</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Configure 802.1X Enterprise Wi-Fi Profile",
      desc: "1. In Intune > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (Templates > <strong>Wi-Fi</strong>).<br/>2. Wi-Fi type: <strong>Enterprise</strong> | Network name (SSID): <code>Contoso-SecureCorp</code>.<br/>3. EAP type: <strong>EAP - TLS</strong>.<br/>4. Root certificate for server validation: Select <code>WIN-CERT-RootCA</code>.<br/>5. Authentication certificate: Select <code>WIN-CERT-SCEP-User</code>.<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    }
  ],
  "lab-7": [
    {
      step: 1,
      title: "Exercise 1: Configure Tenant-Wide Windows Hello for Business",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Enrollment</strong> > <strong>Windows</strong> > <strong>Windows Hello for Business</strong>.<br/>2. Configure Windows Hello for Business: <strong>Enabled</strong>.<br/>3. Use a Trusted Platform Module (TPM): <strong>Required</strong>.<br/>4. Minimum PIN length: <strong>6</strong> | Maximum PIN length: <strong>127</strong>.<br/>5. Letters in PIN: <strong>Allowed</strong> | Special characters in PIN: <strong>Allowed</strong>.<br/>6. PIN expiration (days): <strong>0 (Never expire - Microsoft recommendation for MFA PINs)</strong>.<br/>7. Use biometric authentication: <strong>Allowed (Facial recognition / Fingerprint with Enhanced Anti-spoofing)</strong>.<br/>8. Click <strong>Save</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Create Cloud-Native Windows LAPS Policy",
      desc: "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Account protection</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile: <strong>Local admin password solution (Windows LAPS)</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-CloudLAPS-EntraID</code>.<br/>4. <em>Backup Directory:</em> <strong>Backup the password to Microsoft Entra ID only</strong>.<br/>5. <em>Password Age Days:</em> <strong>30</strong>.<br/>6. <em>Administrator Account Name:</em> <code>ContosoCloudAdmin</code>.<br/>7. <em>Password Complexity:</em> <strong>Large letters, small letters, numbers and special characters (32 chars)</strong>.<br/>8. <em>Post Authentication Actions:</em> Reset password and logoff managed account after <strong>8 hours</strong>.<br/>9. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Verify LAPS Password Escrow in Microsoft Entra Admin Center",
      desc: "1. Sign in to <strong>https://entra.microsoft.com</strong> > navigate to <strong>Identity</strong> > <strong>Devices</strong> > <strong>All devices</strong>.<br/>2. Select <strong>MD102-VM1-Adele</strong>.<br/>3. Under <em>Manage</em>, select <strong>Local administrator password recovery</strong>.<br/>4. Click <strong>Show local administrator password</strong> and verify that the 32-character password and rotation timestamp are securely escrowed!"
    }
  ],
  "lab-8": [
    {
      step: 1,
      title: "Exercise 1: Create Windows 11 Baseline Compliance Policy",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Compliance</strong> > click <strong>+ Create policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-CMP-Baseline-Production</code>.<br/>4. On the <em>Compliance settings</em> tab:<br/>&nbsp;&nbsp;• <em>Device Health:</em> Require BitLocker: <strong>Require</strong> | Require Secure Boot: <strong>Require</strong> | Require Code Integrity: <strong>Require</strong>.<br/>&nbsp;&nbsp;• <em>Device Properties:</em> Min OS version: <code>10.0.22631.0</code>.<br/>&nbsp;&nbsp;• <em>System Security:</em> Require password to unlock mobile devices: <strong>Require</strong> | Minimum password length: <strong>8</strong> | Firewall: <strong>Require</strong> | Antivirus: <strong>Require</strong> | Antispyware: <strong>Require</strong>.<br/>5. Select <strong>Next</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Microsoft Defender Machine Risk Score Boundary",
      desc: "1. In the same compliance policy, scroll down to <strong>Microsoft Defender for Endpoint</strong> category.<br/>2. Require the device to be at or under the machine risk score: <strong>Clear (Low risk)</strong>.<br/>3. Select <strong>Next</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Configure Scheduled Actions for Non-Compliance",
      desc: "1. On the <em>Actions for noncompliance</em> tab:<br/>&nbsp;&nbsp;• Action 1: <strong>Mark device noncompliant</strong> | Schedule: <strong>Immediately (0 days)</strong>.<br/>&nbsp;&nbsp;• Action 2: <strong>Send email to end user</strong> | Schedule: <strong>1 day</strong>.<br/>&nbsp;&nbsp;• Action 3: <strong>Remotely lock the noncompliant device</strong> | Schedule: <strong>3 days</strong>.<br/>&nbsp;&nbsp;• Action 4: <strong>Retire the noncompliant device</strong> | Schedule: <strong>30 days</strong>.<br/>2. On the <em>Assignments</em> tab: Assign to <code>GRP-DEV-WIN-CORPORATE</code>.<br/>3. Click <strong>Review + create</strong> > <strong>Create</strong>."
    }
  ],
  "lab-8b": [
    {
      step: 1,
      title: "Exercise 1: Author PowerShell Discovery Script",
      desc: "1. Open VS Code or PowerShell ISE and create <code>Discover-EnterpriseSecurity.ps1</code>.<br/>2. Implement discovery logic checking: BitLocker 256-bit XTS encryption, Secure Boot state, and Windows Defender Real-time Protection status.<br/>3. Output JSON string via <code>$hash | ConvertTo-Json -Compress</code> and write to standard output."
    },
    {
      step: 2,
      title: "Exercise 2: Author JSON Compliance Schema",
      desc: "1. Create <code>Rules-EnterpriseSecurity.json</code>.<br/>2. Define setting rules enforcing: <code>IsBitLocker256Bit -eq true</code>, <code>IsSecureBootEnabled -eq true</code>, and <code>DefenderRealTimeRunning -eq true</code>.<br/>3. Set compliance failure title: <em>'Non-compliant with Enterprise Encryption Standards'</em>."
    },
    {
      step: 3,
      title: "Exercise 3: Upload Script and Deploy Custom Compliance Policy",
      desc: "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Compliance</strong> > <strong>Scripts</strong> > click <strong>+ Add</strong> > <strong>Windows 10 and later</strong>.<br/>2. Name: <code>Discover-EnterpriseSecurity</code> | Upload <code>Discover-EnterpriseSecurity.ps1</code> > click <strong>Add</strong>.<br/>3. Go to <strong>Compliance</strong> > <strong>+ Create policy</strong> (Windows 10 and later) > Name: <code>WIN-CMP-Custom-SecurityEngine</code>.<br/>4. Under <em>Custom Compliance</em>: Select the discovery script and upload <code>Rules-EnterpriseSecurity.json</code>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    }
  ],
  "lab-9": [
    {
      step: 1,
      title: "Exercise 1: Create Conditional Access Policy in Report-Only Mode",
      desc: "1. In Microsoft Entra admin center (<strong>https://entra.microsoft.com</strong>), navigate to <strong>Identity</strong> > <strong>Protection</strong> > <strong>Conditional Access</strong> > click <strong>+ New policy</strong>.<br/>2. Name: <code>CA-WIN-RequireCompliantDevice-M365</code>.<br/>3. <em>Users:</em> Include: <strong>All users</strong> | Exclude: <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code> and <code>GRP-USR-EXCLUDE-CA</code>.<br/>4. <em>Target resources:</em> Cloud apps > Include: <strong>Office 365</strong>.<br/>5. <em>Conditions:</em> Device platforms > Include: <strong>Windows</strong>.<br/>6. <em>Grant:</em> Select <strong>Grant access</strong> > check <strong>Require device to be marked as compliant</strong> and <strong>Require multifactor authentication</strong> (Require all selected controls).<br/>7. <em>Enable policy:</em> Set to <strong>Report-only</strong> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Validate Policy Impact via What-If & Log Analytics",
      desc: "1. In Conditional Access, select <strong>What If</strong> tool.<br/>2. Select user <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code> | Cloud App: <strong>Office 365</strong> | Device platform: <strong>Windows</strong>.<br/>3. Select <strong>What If</strong> and confirm that the policy applies.<br/>4. Review <strong>Insights and reporting</strong> workbook to ensure no unintended admin lockouts occur."
    },
    {
      step: 3,
      title: "Exercise 3: Switch Policy to 'On' and Test Endpoint Gatekeeper",
      desc: "1. Edit policy <code>CA-WIN-RequireCompliantDevice-M365</code> > set <strong>Enable policy</strong> to <strong>On</strong> > click <strong>Save</strong>.<br/>2. On non-compliant VM or personal PC, attempt to sign in to <code>https://portal.office.com</code> as <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>3. Confirm Entra ID blocks access with error: <em>'You cannot get there from here - Your device is not compliant.'</em>"
    }
  ],
  "lab-10": [
    {
      step: 1,
      title: "Exercise 1: Package Win32 Binary with IntuneWinAppUtil",
      desc: "1. Download the Microsoft Win32 Content Prep Tool (<code>IntuneWinAppUtil.exe</code>).<br/>2. Create source folder <code>C:\\AppSource\\7Zip</code> containing <code>7z2301-x64.msi</code>.<br/>3. Create output folder <code>C:\\AppOutput</code>.<br/>4. Open cmd.exe as Admin and execute:<br/><code>IntuneWinAppUtil.exe -c C:\\AppSource\\7Zip -s 7z2301-x64.msi -o C:\\AppOutput -q</code>.<br/>5. Verify generated package: <code>C:\\AppOutput\\7z2301-x64.intunewin</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Author Custom PowerShell Detection Script",
      desc: "1. Create detection script <code>Detect-7Zip.ps1</code>:<br/><code>if (Test-Path 'C:\\Program Files\\7-Zip\\7z.exe') { Write-Output 'Installed'; Exit 0 } else { Exit 1 }</code>.<br/>2. Save to <code>C:\\AppSource\\Detect-7Zip.ps1</code>."
    },
    {
      step: 3,
      title: "Exercise 3: Configure Win32 App Program, Return Codes & Detection in Intune",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>All apps</strong> > <strong>+ Add</strong> > <strong>Windows app (Win32)</strong> > click <strong>Select</strong>.<br/>2. Select app package file: <code>C:\\AppOutput\\7z2301-x64.intunewin</code>.<br/>3. Name: <code>7-Zip 23.01 Enterprise x64</code> | Publisher: <code>Igor Pavlov</code>.<br/>4. <em>Program:</em> Install command: <code>msiexec /i \"7z2301-x64.msi\" /qn /norestart</code> | Uninstall: <code>msiexec /x {23170F69-40C1-2702-2301-000001000000} /qn</code> | Install behavior: <strong>System</strong>.<br/>5. <em>Requirements:</em> Operating system architecture: <strong>64-bit</strong> | Minimum OS: <strong>Windows 10 21H2</strong>.<br/>6. <em>Detection rules:</em> Format: <strong>Use a custom detection script</strong> > upload <code>Detect-7Zip.ps1</code>.<br/>7. <em>Assignments:</em> Assign to <code>GRP-DEV-WIN-CORPORATE</code> as <strong>Required</strong> > click <strong>Create</strong>."
    }
  ],
  "lab-11": [
    {
      step: 1,
      title: "Exercise 1: Create App Protection Policy for iOS and Android (MAM-WE)",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>App protection policies</strong> > click <strong>+ Create policy</strong> > select <strong>Android</strong>.<br/>2. Name: <code>MAM-M365-Android-EnforceDLP</code>.<br/>3. <em>Target apps:</em> Public apps > select <strong>Microsoft Outlook</strong>, <strong>Microsoft Teams</strong>, <strong>Microsoft OneDrive</strong>, <strong>Microsoft Word</strong>, <strong>Microsoft Excel</strong>.<br/>4. Select <strong>Next</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Data Protection & DLP Transfer Rules",
      desc: "1. On the <em>Data Protection</em> tab:<br/>&nbsp;&nbsp;• Prevent backups: <strong>Block</strong><br/>&nbsp;&nbsp;• Send org data to other apps: <strong>Policy managed apps with Open-In/Share filtering</strong><br/>&nbsp;&nbsp;• Receive data from other apps: <strong>All apps</strong><br/>&nbsp;&nbsp;• Restrict cut, copy, and paste between other apps: <strong>Blocked (Paste in between policy managed apps allowed with paste in)</strong><br/>&nbsp;&nbsp;• Screen capture and Google Assistant: <strong>Block</strong>.<br/>2. On the <em>Conditional Launch</em> tab:<br/>&nbsp;&nbsp;• Max PIN attempts: <strong>5 (Action: Reset PIN)</strong> | Offline grace period: <strong>720 mins (Action: Block access)</strong>.<br/>3. Assign to <code>GRP-USR-SALES</code> (Joni Sherman) > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Test MAM Sandboxing and Execute Selective Wipe",
      desc: "1. On personal device or Android AVD, sign in to Outlook as <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Copy text from a corporate email and attempt to paste into personal WhatsApp/Notes -> confirm paste is blocked by DLP.<br/>3. In Intune admin center > <strong>Apps</strong> > <strong>App selective wipe</strong> > click <strong>+ Create wipe request</strong> > select <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code> > click <strong>Create</strong>.<br/>4. Confirm all corporate emails and files are removed while personal data remains 100% untouched!"
    }
  ],
  "lab-11b": [
    {
      step: 1,
      title: "Exercise 1: Configure Outlook Mobile Managed App Configuration Policy",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Apps</strong> > <strong>App configuration policies</strong> > click <strong>+ Add</strong> > <strong>Managed apps</strong>.<br/>2. Name: <code>APP-CFG-Outlook-Mobile-AutoUPN</code>.<br/>3. Public apps: Select <strong>Microsoft Outlook (iOS/Android)</strong>.<br/>4. Under <em>Configuration settings</em>:<br/>&nbsp;&nbsp;• <em>Redirect web content to Edge:</em> <strong>Require</strong><br/>&nbsp;&nbsp;• <em>Account setup:</em> Allowed accounts: <strong>Only work or school accounts</strong><br/>&nbsp;&nbsp;• <em>Default App Email:</em> <code>{{UserPrincipalName}}</code>.<br/>5. Assign to <code>GRP-LIC-M365-E5</code> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Microsoft Edge Managed Device Configuration",
      desc: "1. In Intune > <strong>App configuration policies</strong> > <strong>+ Add</strong> > <strong>Managed devices</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Target app: <strong>Microsoft Edge</strong>.<br/>3. Name: <code>APP-CFG-Edge-Managed-Desktop</code>.<br/>4. Configure Home page URL, Bookmarks, and corporate Enterprise Mode Site List.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    }
  ],
  "lab-12": [
    {
      step: 1,
      title: "Exercise 1: Enable Defender for Endpoint Connector in Intune",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Microsoft Defender for Endpoint</strong>.<br/>2. Toggle <em>Allow Microsoft Defender for Endpoint to enforce Endpoint Security Configurations</em> to <strong>On</strong>.<br/>3. Toggle <em>Connect Windows devices to Microsoft Defender for Endpoint</em> to <strong>On</strong>.<br/>4. Toggle <em>Connect Android devices to Microsoft Defender for Endpoint</em> to <strong>On</strong>.<br/>5. Click <strong>Save</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Deploy Endpoint Detection and Response (EDR) Policy",
      desc: "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Endpoint detection and response</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10, Windows 11, and Windows Server</strong> | Profile: <strong>Endpoint detection and response</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-MDE-EDR-Onboarding</code>.<br/>4. Under <em>Configuration settings</em>: Auto populate onboarding blob: <strong>Auto from connector</strong> | Expedite telemetry frequency: <strong>Enable (60-second polling for SOC response)</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Validate Sense Service and Sensor Telemetry on Client",
      desc: "1. On <strong>MD102-VM1-Adele</strong>, open PowerShell as Admin.<br/>2. Execute: <code>Get-Service Sense | Select-Object Status, StartType</code> (Verify Status: <em>Running</em>).<br/>3. Open Microsoft Defender XDR portal (<strong>https://security.microsoft.com</strong>) > <strong>Device inventory</strong> > verify VM1 appears with active sensor."
    }
  ],
  "lab-13": [
    {
      step: 1,
      title: "Exercise 1: Create Attack Surface Reduction (ASR) Policy",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Attack surface reduction</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10, Windows 11, and Windows Server</strong> | Profile: <strong>Attack Surface Reduction Rules</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-ASR-HighImpactRules</code>.<br/>4. Select <strong>Next</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure High-Impact Enterprise ASR Rules",
      desc: "1. Configure the following rules to <strong>Block</strong>:<br/>&nbsp;&nbsp;• <em>Block credential stealing from Windows local security authority subsystem (LSASS.exe)</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block abuse of exploited vulnerable signed drivers</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block Office applications from creating child processes</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block executable content from email client and webmail</em>: <strong>Block</strong><br/>&nbsp;&nbsp;• <em>Block persistence through WMI event subscription</em>: <strong>Block</strong>.<br/>2. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Validate ASR Telemetry & Event Viewer Logs",
      desc: "1. On <strong>MD102-VM2-Alex</strong>, open Event Viewer.<br/>2. Navigate to <code>Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational</code>.<br/>3. Filter for Event ID <strong>1121</strong> (Audit mode) and Event ID <strong>1122</strong> (Block mode) to verify active enforcement."
    }
  ],
  "lab-14": [
    {
      step: 1,
      title: "Exercise 1: Configure BitLocker Endpoint Security Policy",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Disk encryption</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>Windows 10 and later</strong> | Profile: <strong>BitLocker</strong> > click <strong>Create</strong>.<br/>3. Name: <code>WIN-SEC-BitLocker-Silent-XTS256</code>.<br/>4. <em>BitLocker - Base settings:</em><br/>&nbsp;&nbsp;• Enable full disk encryption for OS and fixed data drives: <strong>Yes</strong><br/>&nbsp;&nbsp;• Hide prompt about third-party encryption: <strong>Yes</strong><br/>&nbsp;&nbsp;• Allow standard users to enable encryption during Autopilot: <strong>Yes</strong>.<br/>5. <em>BitLocker - OS drive settings:</em><br/>&nbsp;&nbsp;• Encryption method: <strong>XTS-AES 256-bit</strong><br/>&nbsp;&nbsp;• Compatible TPM startup: <strong>Require TPM</strong><br/>&nbsp;&nbsp;• Save BitLocker recovery information to Microsoft Entra ID: <strong>Require</strong> (Store recovery passwords and key packages).<br/>6. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Trigger Silent Encryption on Client VM",
      desc: "1. Sign in to <strong>MD102-VM2-Alex</strong> as standard user <code>alex.wilber@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. Open elevated PowerShell > execute <code>manage-bde -status C:</code>.<br/>3. Confirm <em>Conversion Status: Fully Encrypted</em> and <em>Encryption Method: XTS-AES 256</em> without any user prompts!"
    },
    {
      step: 3,
      title: "Exercise 3: Verify 48-Digit Recovery Key Escrow in Entra ID",
      desc: "1. Sign in to <strong>https://entra.microsoft.com</strong> > <strong>Identity</strong> > <strong>Devices</strong> > <strong>All devices</strong> > select <strong>MD102-VM2-Alex</strong>.<br/>2. Select <strong>BitLocker keys</strong> > click <strong>Show BitLocker recovery key</strong>.<br/>3. Verify the 48-digit recovery numerical password is escrowed and audited in Entra ID audit logs."
    }
  ],
  "lab-15": [
    {
      step: 1,
      title: "Exercise 1: Deploy Endpoint Privilege Management (EPM) Settings",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Endpoint Privilege Management</strong> > select the <strong>Policies</strong> tab.<br/>2. Click <strong>+ Create policy</strong> > Platform: <strong>Windows 10 and later</strong> | Profile: <strong>Elevation settings policy</strong>.<br/>3. Name: <code>WIN-EPM-ElevationSettings-Default</code>.<br/>4. Enable Endpoint Privilege Management: <strong>Yes</strong> | Default elevation response: <strong>Deny all requests</strong> | Send elevation data for reporting: <strong>Yes</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 2,
      title: "Exercise 2: Create EPM Elevation Rule with Business Justification",
      desc: "1. In Endpoint Privilege Management, click <strong>+ Create policy</strong> > Profile: <strong>Elevation rules policy</strong>.<br/>2. Name: <code>WIN-EPM-Rule-NetworkTroubleshooter</code>.<br/>3. Click <strong>+ Add rule</strong>:<br/>&nbsp;&nbsp;• Rule name: <code>Elevate-NetSh-Diagnostics</code><br/>&nbsp;&nbsp;• Elevation type: <strong>User confirmed</strong><br/>&nbsp;&nbsp;• Validation: <strong>Require business justification & Windows Hello PIN authentication</strong><br/>&nbsp;&nbsp;• File name: <code>netsh.exe</code> | File path: <code>C:\\Windows\\System32\\netsh.exe</code>.<br/>4. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Test Standard User 'Run with elevated access' Action",
      desc: "1. Sign in to <strong>MD102-VM1-Adele</strong> as standard user.<br/>2. Right-click <code>netsh.exe</code> or approved admin tool > select <strong>Run with elevated access</strong>.<br/>3. Enter business justification: <em>'Diagnosing corporate Wi-Fi IP stack'</em> and complete Windows Hello PIN verification.<br/>4. Verify application runs in elevated security token without needing full local admin credentials!"
    }
  ],
  "lab-16": [
    {
      step: 1,
      title: "Exercise 1: Configure 3-Tier Windows Update for Business Rings",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Update rings for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Ring0-IT-Canary</code> (Quality deferral: <strong>0 days</strong>, Feature deferral: <strong>0 days</strong>, Servicing channel: <strong>General Availability</strong>) > Assign to <code>GRP-DEV-WIN-CORPORATE</code>.<br/>3. Create <code>WUfB-Ring1-Pilot</code> (Quality deferral: <strong>3 days</strong>, Feature deferral: <strong>14 days</strong>) > Assign to <code>GRP-DEV-WIN-PILOT</code>.<br/>4. Create <code>WUfB-Ring2-Production</code> (Quality deferral: <strong>7 days</strong>, Feature deferral: <strong>60 days</strong>, Active hours: <strong>8 AM to 5 PM</strong>, Deadline: <strong>3 days</strong>, Grace period: <strong>2 days</strong>) > Assign to <code>GRP-DEV-WIN-PRODUCTION</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Configure Expedited Quality Update for Zero-Day Patching",
      desc: "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Quality updates for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Expedited-SecurityZeroDay</code>.<br/>3. Expedite installation of quality updates if device OS version is less than: Select latest security update patch release.<br/>4. Number of days until reboot is forced: <strong>1 day</strong>.<br/>5. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Configure Driver Update Policy with Manual Approval",
      desc: "1. In Intune admin center, navigate to <strong>Devices</strong> > <strong>Windows</strong> > <strong>Driver updates for Windows 10 and later</strong> > click <strong>+ Create profile</strong>.<br/>2. Name: <code>WUfB-Drivers-ManualReview</code>.<br/>3. Approval method: <strong>Manually approve and deploy driver updates</strong>.<br/>4. Assign to <code>GRP-DEV-WIN-CORPORATE</code> > click <strong>Create</strong>."
    }
  ],
  "lab-17": [
    {
      step: 1,
      title: "Exercise 1: Execute Remote Sync and Monitor Latency",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>All devices</strong> > select <strong>MD102-VM1-Adele</strong>.<br/>2. In the top action bar, click <strong>Sync</strong> > click <strong>Yes</strong>.<br/>3. On VM1, open Event Viewer > <code>Applications and Services Logs > Microsoft > Windows > DeviceManagement-Enterprise-Diagnostics-Provider > Operational</code>.<br/>4. Observe Event ID <strong>208</strong> (OMADM session started) and Event ID <strong>209</strong> (OMADM session ended successfully) within 30 seconds."
    },
    {
      step: 2,
      title: "Exercise 2: Execute Device Retire on BYOD Persona",
      desc: "1. In Intune admin center, select BYOD device used by <code>joni.sherman@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>2. In the top action bar, click <strong>Retire</strong> > confirm dialog.<br/>3. Confirm in the Data Impact Matrix: All corporate certificates, VPN profiles, Wi-Fi keys, and Intune-managed apps are removed; personal photos, personal apps, and user documents remain 100% untouched."
    },
    {
      step: 3,
      title: "Exercise 3: Compare Wipe vs Fresh Start vs Autopilot Reset",
      desc: "1. Review administrative distinctions:<br/>&nbsp;&nbsp;• <strong>Wipe:</strong> Full factory reset (OS re-install / disk sanitize).<br/>&nbsp;&nbsp;• <strong>Fresh Start:</strong> Removes OEM bloatware and retains Windows 11 Enterprise OS build.<br/>&nbsp;&nbsp;• <strong>Autopilot Reset:</strong> Removes user profiles and apps but preserves Microsoft Entra Join and MDM enrollment for instant re-use."
    }
  ],
  "lab-18": [
    {
      step: 1,
      title: "Exercise 1: Inspect IntuneManagementExtension.log with CMTrace",
      desc: "1. On <strong>MD102-VM1-Adele</strong>, navigate to <code>C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs</code>.<br/>2. Open <code>IntuneManagementExtension.log</code> with CMTrace (or Notepad).<br/>3. Search for strings: <code>[Win32App]</code>, <code>EnforceAppCompliance</code>, and <code>ExitCode: 0</code> to inspect application installer telemetry."
    },
    {
      step: 2,
      title: "Exercise 2: Generate Full MDM Diagnostics Report via mdmdiagnosticstool",
      desc: "1. Open elevated Command Prompt on VM.<br/>2. Execute: <code>mdmdiagnosticstool.exe -area DeviceEnrollment;DeviceProvisioning;Autopilot -zip C:\\MDMDiagReport.zip</code>.<br/>3. Extract <code>C:\\MDMDiagReport.zip</code> and open <code>MDMDiagReport.html</code> to review all applied CSP policies, OMA-URI nodes, and enrollment certificates."
    },
    {
      step: 3,
      title: "Exercise 3: Decode High-Yield MD-102 Intune Error Codes",
      desc: "1. Master the 4 high-yield hex errors:<br/>&nbsp;&nbsp;• <code>0x80180018</code> (MENROLL_E_LICENSE) $\\rightarrow$ User missing Intune license.<br/>&nbsp;&nbsp;• <code>0x80180014</code> (MENROLL_E_PLATFORM_BLOCKED) $\\rightarrow$ Blocked by platform enrollment restriction.<br/>&nbsp;&nbsp;• <code>0x87D1041C</code> (ERROR_DETECTION_FAILED) $\\rightarrow$ Win32 app installed, but custom detection script returned false.<br/>&nbsp;&nbsp;• <code>0x80070005</code> (E_ACCESSDENIED) $\\rightarrow$ Win32 installer ran in User context instead of System context."
    }
  ],
  "lab-19": [
    {
      step: 1,
      title: "Exercise 1: Connect to Microsoft Graph with Scoped Permissions",
      desc: "1. Open PowerShell 7 on your management PC.<br/>2. Execute: <code>Connect-MgGraph -Scopes 'DeviceManagementManagedDevices.ReadWrite.All', 'DeviceManagementConfiguration.ReadWrite.All'</code>.<br/>3. Complete interactive browser authentication and consent."
    },
    {
      step: 2,
      title: "Exercise 2: Query All Managed Endpoints and Hardware Telemetry",
      desc: "1. Execute: <code>$Devices = Get-MgDeviceManagementManagedDevice</code>.<br/>2. Execute: <code>$Devices | Select-Object DeviceName, OperatingSystem, OsVersion, ComplianceState, UserPrincipalName | Format-Table</code>."
    },
    {
      step: 3,
      title: "Exercise 3: Export Inactive Stale Devices CSV Audit Report",
      desc: "1. Execute query filtering for devices inactive for over 90 days:<br/><code>$Threshold = (Get-Date).AddDays(-90); $Stale = $Devices | Where-Object { $_.LastSyncDateTime -lt $Threshold }</code>.<br/>2. Export to CSV: <code>$Stale | Export-Csv -Path C:\\StaleDevicesAudit.csv -NoTypeInformation</code>."
    }
  ],
  "lab-20": [
    {
      step: 1,
      title: "Exercise 1: Author Proactive Remediation Detection Script",
      desc: "1. Create <code>Detect-RDPDisabled.ps1</code>:<br/><code>$RDP = (Get-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -ErrorAction SilentlyContinue).fDenyTSConnections; if ($RDP -eq 1) { Write-Output 'RDP is disabled (Compliant)'; Exit 0 } else { Write-Output 'RDP is enabled (Non-compliant)'; Exit 1 }</code>."
    },
    {
      step: 2,
      title: "Exercise 2: Author Proactive Remediation Fix Script",
      desc: "1. Create <code>Remediate-RDPDisabled.ps1</code>:<br/><code>Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -Value 1; Write-Output 'RDP successfully disabled.'; Exit 0</code>."
    },
    {
      step: 3,
      title: "Exercise 3: Deploy Remediation Package in Intune",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Devices</strong> > <strong>Remediations</strong> > click <strong>+ Create script package</strong>.<br/>2. Name: <code>PR-Security-DisableRDP</code>.<br/>3. Upload detection script <code>Detect-RDPDisabled.ps1</code> and remediation script <code>Remediate-RDPDisabled.ps1</code>.<br/>4. Run script in 64-bit PowerShell: <strong>Yes</strong> | Enforce script signature check: <strong>No</strong>.<br/>5. <em>Assignments:</em> Assign to <code>GRP-DEV-WIN-CORPORATE</code> with daily schedule > click <strong>Create</strong>."
    }
  ],
  "lab-22": [
    {
      step: 1,
      title: "Exercise 1: Configure Apple MDM Push Certificate (APNs)",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Apple MDM Push certificate</strong>.<br/>2. Grant Microsoft permission to send user and device info to Apple: <strong>I agree</strong>.<br/>3. Download Intune CSR file > sign in to Apple Push Certificates Portal (<strong>https://identity.apple.com/pushcert</strong>) with corporate Apple ID.<br/>4. Upload CSR, generate APNs certificate (<code>.pem</code>), and upload back into Intune."
    },
    {
      step: 2,
      title: "Exercise 2: Deploy FileVault Disk Encryption Policy",
      desc: "1. In Intune admin center, navigate to <strong>Endpoint security</strong> > <strong>Disk encryption</strong> > click <strong>+ Create Policy</strong>.<br/>2. Platform: <strong>macOS</strong> | Profile: <strong>FileVault</strong> > click <strong>Create</strong>.<br/>3. Enable FileVault: <strong>Yes</strong> | Recovery key type: <strong>Personal recovery key</strong> | Escrow recovery key to Entra ID: <strong>Yes</strong>.<br/>4. Assign to Executive group containing Miriam Graham > click <strong>Create</strong>."
    },
    {
      step: 3,
      title: "Exercise 3: Deploy macOS Platform SSO with Microsoft Enterprise SSO Extension",
      desc: "1. In Intune > <strong>Devices</strong> > <strong>Configuration</strong> > <strong>+ Create</strong> > <strong>+ New policy</strong> (macOS > Settings catalog).<br/>2. Name: <code>MAC-CFG-PlatformSSO-Microsoft</code>.<br/>3. Add settings from <strong>Single Sign-On Extensions</strong>:<br/>&nbsp;&nbsp;• Extension identifier: <code>com.microsoft.CompanyPortalMac.ssoextension</code><br/>&nbsp;&nbsp;• Type: <strong>Redirect</strong><br/>&nbsp;&nbsp;• URLs: <code>https://login.microsoftonline.com</code> and <code>https://device.login.microsoftonline.com</code>.<br/>4. Assign to macOS devices > click <strong>Create</strong>."
    }
  ],
  "lab-23": [
    {
      step: 1,
      title: "Exercise 1: Connect Intune to Managed Google Play",
      desc: "1. In Microsoft Intune admin center, navigate to <strong>Tenant administration</strong> > <strong>Connectors and tokens</strong> > <strong>Managed Google Play</strong>.<br/>2. Grant Microsoft permission to send user and device information to Google: <strong>I agree</strong>.<br/>3. Select <strong>Launch Google to connect now</strong> > sign in with enterprise Google account and link to Intune."
    },
    {
      step: 2,
      title: "Exercise 2: Enroll Android Studio AVD as Personally-Owned Work Profile",
      desc: "1. Launch Android Studio AVD (Pixel 7 Android 14 API 34).<br/>2. Open Google Play Store > search and install <strong>Intune Company Portal</strong>.<br/>3. Open Company Portal > sign in as <code>diego.s@&lt;tenant&gt;.onmicrosoft.com</code>.<br/>4. Follow on-screen prompts to create the encrypted <strong>Work Profile</strong> sandbox container."
    },
    {
      step: 3,
      title: "Exercise 3: Validate Work Profile Sandbox & Deploy Managed Apps",
      desc: "1. In Intune admin center > <strong>Apps</strong> > <strong>Android</strong> > select <strong>Microsoft Outlook</strong> > assign to <code>GRP-USR-FIELD</code>.<br/>2. In Android AVD, observe the badged briefcase icon on Outlook.<br/>3. Confirm corporate data cannot be copied across to personal apps outside the work container."
    }
  ],
  "capstone": [
    {
      step: 1,
      title: "Exercise 1: Audit Complete 20-Seat Enterprise Identity & License Stack",
      desc: "1. In Microsoft Entra admin center, verify all 20 personas have active Microsoft 365 E5 licenses inherited from <code>GRP-LIC-M365-E5</code>.<br/>2. Confirm exactly 5 licenses remain in the Unassigned Reserve Buffer (20 active / 5 reserve)."
    },
    {
      step: 2,
      title: "Exercise 2: Solve Injected Failure Challenge 1 (Win32 Detection Loop 0x87D1041C)",
      desc: "1. In Intune admin center, observe Win32 app reporting error <code>0x87D1041C</code> on VM1.<br/>2. Open <code>C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log</code>.<br/>3. Identify that the registry detection rule checked <code>HKCU</code> instead of <code>HKLM</code>.<br/>4. Edit the app detection rule in Intune to point to the correct HKLM registry key and force sync."
    },
    {
      step: 3,
      title: "Exercise 3: Solve Injected Failure Challenge 2 (Conditional Access Lockout)",
      desc: "1. Observe that an admin account is blocked from entering Intune portal.<br/>2. Use the break-glass account <code>admin-global-emergency@&lt;tenant&gt;.onmicrosoft.com</code> in an InPrivate window to sign in.<br/>3. Navigate to Conditional Access > add the missing group exclusion for emergency maintenance."
    },
    {
      step: 4,
      title: "Exercise 4: Solve Injected Failure Challenge 3 (ESP Missing Dependency Timeout)",
      desc: "1. In Autopilot ESP profile, an app dependency failed, causing VM2 to hang at 'Device Setup' for 60 minutes.<br/>2. In Intune > Apps > Win32 Apps, identify circular dependency between App A and App B.<br/>3. Remove circular dependency and redeploy VM2."
    }
  ]
};

// Now replace the `steps:` array inside each lab in LABS_DATA
for (const [labId, newSteps] of Object.entries(updatedLabSteps)) {
  const labIdRegex = new RegExp(`id:\\s*"${labId}"[\\s\\S]*?steps:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*scripts:`, 'm');
  const match = fileContent.match(labIdRegex);
  if (match) {
    const formattedSteps = JSON.stringify(newSteps, null, 6)
      .replace(/^\[/, '[\n')
      .replace(/\]$/, '    ]');
    
    // Replace steps array for this lab
    const replacement = match[0].replace(/steps:\s*\[[\s\S]*?\]\s*,/, `steps: ${formattedSteps},`);
    fileContent = fileContent.replace(match[0], replacement);
    console.log(`Updated steps for ${labId}`);
  } else {
    console.warn(`Could not match labId: ${labId}`);
  }
}

fs.writeFileSync(dataFilePath, fileContent, 'utf8');
console.log('Successfully updated all lab steps in js/data.js!');
