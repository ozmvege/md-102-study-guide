export default {
  id: "device-identity",
  moduleId: "m1",
  title: "Device identity: registered, joined and hybrid joined",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 55,

  scenario:
    "Every question the exam asks about enrollment, Conditional Access or compliance rests on one thing: what kind of identity the device has in Microsoft Entra ID. Registered, joined and hybrid joined are not three grades of the same thing — they are three different trust relationships with different sign-in behaviour, different Conditional Access outcomes and different management stories. You will create two of them on real machines, read the evidence with `dsregcmd`, and understand the third well enough to choose it correctly.",

  objectives: [
    "Choose the correct join type for a given ownership and management requirement",
    "Register a device to Microsoft Entra ID and inspect the resulting identity",
    "Join a device to Microsoft Entra ID and compare the two states",
    "Read and interpret every meaningful field of `dsregcmd /status`",
    "Explain what a Primary Refresh Token is and why its absence breaks single sign-on"
  ],

  keyConcepts: ["Entra registered", "Entra joined", "Hybrid Entra joined", "dsregcmd", "Primary Refresh Token", "Device ownership"],

  skills: [
    { id: "g1.t1.s1", depth: "primary" },
    { id: "g1.t1.s2", depth: "primary" },
    { id: "g1.t1.s3", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "ENTRA-P2"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "vm", id: "vm1-adele", os: "Windows 11 Pro" },
      { kind: "vm", id: "vm2-alex", os: "Windows 11 Pro" },
      { kind: "portal", id: "Microsoft Entra admin center" }
    ],
    personas: ["adele.vance", "joni.sherman"],
    labs: ["personas-and-groups", "breakglass-and-admin-tiering"]
  },

  exercises: [
    {
      id: "e1",
      title: "Choose the right join type",
      intro:
        "Get this decision straight before touching a machine. The exam tests it as a scenario question far more often than it tests the click path.",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Compare the three join types",
          steps: [
            {
              text: "Study the comparison. The column that decides most exam questions is *who owns the device*.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Entra registered", "Entra joined", "Hybrid Entra joined"],
                  rows: [
                    ["Ownership", "Personal (BYOD)", "Corporate", "Corporate"],
                    ["Sign-in to Windows", "Local or Microsoft account", "Work account", "On-premises Active Directory account"],
                    ["Also joined to on-premises AD", "No", "No", "Yes"],
                    ["Requires line of sight to a domain controller", "No", "No", "Yes"],
                    ["Typical management", "App protection policies, optional MDM", "Intune MDM", "Intune, often co-managed with Configuration Manager"],
                    ["Device object in Entra ID", "Yes", "Yes", "Yes"],
                    ["Can satisfy a require-compliant-device control", "Yes, if enrolled and compliant", "Yes", "Yes"],
                    ["Set up by", "Add work or school account", "Out-of-box experience, or Settings", "Entra Connect plus Group Policy or Autopilot"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Hybrid join exists to serve devices that must remain domain-joined — usually because of on-premises resource access or legacy Group Policy. It is not a stepping stone and it is not better than Entra join. For a cloud-native deployment, Entra join is the target and hybrid join is a compromise you accept only when something forces it."
                }
              ]
            },
            {
              text: "Answer these three before continuing. The reasoning matters more than the answer.",
              parts: [
                {
                  kind: "table",
                  headers: ["Requirement", "Correct join type"],
                  rows: [
                    ["A new corporate laptop, cloud-only, managed by Intune", "Entra joined"],
                    ["An employee's own Windows PC that must reach corporate mail with data protection", "Entra registered"],
                    ["A desktop that must authenticate to an on-premises file server using Kerberos", "Hybrid Entra joined"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Hybrid Entra join cannot be practised in this lab — it needs an on-premises Active Directory domain and Microsoft Entra Connect. Know its prerequisites and its `dsregcmd` signature, which you will see in the next exercise."
                }
              ]
            }
          ],
          result: {
            text: "You can pick a join type from a requirement without guessing.",
            verify: [
              { text: "You can state the one thing that forces hybrid join rather than Entra join." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Register a device to Microsoft Entra ID",
      intro:
        "Registration is the bring-your-own-device path. The user keeps their local sign-in and the organisation gains an identity for the device without owning it.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Add a work account on VM1",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM1-Adele** and sign in with the local `labadmin` account."
            },
            {
              text: "Before doing anything, capture the unregistered baseline. Open **Windows PowerShell** and run:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "dsregcmd /status"
                },
                {
                  kind: "verify",
                  text: "Under **Device State**, all three of **AzureAdJoined**, **EnterpriseJoined** and **DomainJoined** read `NO`. This is what an unaffiliated machine looks like.",
                  expected: "+----------------------------------------------------------------------+\n| Device State                                                         |\n+----------------------------------------------------------------------+\n\n             AzureAdJoined : NO\n          EnterpriseJoined : NO\n              DomainJoined : NO"
                }
              ]
            },
            {
              text: "Open **Settings**, select **Accounts**, then select **Your accounts**.",
              nav: ["Settings", "Accounts", "Your accounts"]
            },
            {
              text: "On the **Your accounts** page, select **Add a work or school account**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "On older Windows 11 builds this page is called **Email and accounts**, and the button sits under **Accounts used by other apps**. Same action, older label."
                }
              ]
            },
            {
              text: "Sign in as `joni.sherman@<tenant>.onmicrosoft.com` and complete the prompts.",
              parts: [
                {
                  kind: "callout",
                  variant: "caution",
                  text: "Use **Add a work or school account** here, not **Access work or school** > **Connect** > **Join this device to Microsoft Entra ID**. The first registers; the second joins. Choosing the wrong one is the most common way this exercise goes sideways, and the difference only becomes visible in `dsregcmd`."
                }
              ]
            }
          ],
          result: {
            text: "The device is registered to Microsoft Entra ID while remaining under local control.",
            verify: [
              { text: "The work account appears under **Your accounts**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read the registered state",
          checkpoint: true,
          steps: [
            {
              text: "Run `dsregcmd /status` again and compare it with the baseline.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "dsregcmd /status"
                }
              ]
            },
            {
              text: "Find the fields that changed:",
              parts: [
                {
                  kind: "table",
                  headers: ["Field", "Value now", "What it means"],
                  rows: [
                    ["`AzureAdJoined`", "NO", "The device is not joined — registration is a different relationship"],
                    ["`WorkplaceJoined`", "YES", "This is the field that proves registration"],
                    ["`DomainJoined`", "NO", "No on-premises domain"],
                    ["`WorkplaceDeviceId`", "a GUID", "The device object in Entra ID"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "`WorkplaceJoined : YES` with `AzureAdJoined : NO` is the signature of a registered device. Recognise that pairing on sight — it is the fastest way to tell someone their BYOD machine will never receive device configuration profiles, because those target joined devices."
                }
              ]
            },
            {
              text: "In the **Microsoft Entra admin center**, select **Devices**, then **All devices**, and find the new object.",
              nav: ["Devices", "All devices"],
              parts: [
                {
                  kind: "verify",
                  text: "The device is listed with a **Join type** of **Microsoft Entra registered** and an **Owner** of Joni Sherman."
                }
              ]
            }
          ],
          result: {
            text: "You can identify a registered device from both the client and the directory.",
            verify: [
              { text: "`dsregcmd` reports `WorkplaceJoined : YES` and `AzureAdJoined : NO`." },
              { text: "The device shows as **Microsoft Entra registered** in the portal." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Join a device to Microsoft Entra ID",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Join VM2 to Microsoft Entra ID",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM2-Alex** and sign in with the local `labadmin` account."
            },
            {
              text: "Open **Settings**, select **Accounts**, then select **Access work or school**.",
              nav: ["Settings", "Accounts", "Access work or school"]
            },
            {
              text: "Select **Connect**, then on the dialog select **Join this device to Microsoft Entra ID** — the small link at the bottom, not the main sign-in box.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The main sign-in box on that dialog performs a *registration*. The join option is the alternate-action link underneath it, labelled **Join this device to Microsoft Entra ID**. This is deliberately easy to miss."
                }
              ]
            },
            {
              text: "Sign in as `alex.wilber@<tenant>.onmicrosoft.com`, confirm the organisation details when prompted, then restart the machine."
            },
            {
              text: "After the restart, sign in to Windows with Alex's work account rather than the local account.",
              parts: [
                {
                  kind: "verify",
                  text: "You reach the desktop signed in as Alex. The device is now identified by that work account, which is the practical difference from registration."
                }
              ]
            }
          ],
          result: {
            text: "The device is Microsoft Entra joined and the user signs in to Windows with a work account.",
            verify: [
              { text: "Windows sign-in uses `alex.wilber@<tenant>.onmicrosoft.com`." },
              { text: "**All devices** shows a **Join type** of **Microsoft Entra joined**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Dissect the joined state and the Primary Refresh Token",
          checkpoint: true,
          steps: [
            {
              text: "Run `dsregcmd /status` and read all three sections this time.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "dsregcmd /status"
                }
              ]
            },
            {
              text: "Confirm the device state:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "AzureAdJoined", value: "YES" },
                    { label: "WorkplaceJoined", value: "NO", note: "A device is joined or registered, not both." },
                    { label: "DomainJoined", value: "NO" },
                    { label: "DeviceId", value: "a GUID", note: "Matches the object id in the Entra portal." },
                    { label: "TpmProtected", value: "YES", note: "Proof that the vTPM from lab 2 is doing its job — the device key is hardware-protected." }
                  ]
                }
              ]
            },
            {
              text: "Now find the **SSO State** section and locate `AzureAdPrt`.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "AzureAdPrt", value: "YES" },
                    { label: "AzureAdPrtUpdateTime", value: "a recent timestamp" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The Primary Refresh Token is what gives the signed-in user silent single sign-on to Microsoft 365 and, crucially, what proves device identity to Conditional Access. If `AzureAdPrt : NO`, the user will be prompted to authenticate repeatedly and any Conditional Access policy requiring a compliant or joined device will fail — even though the device really is joined and really is compliant."
                }
              ]
            },
            {
              text: "Note the diagnostic you will need later:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "# Full join and SSO diagnostics, including reason codes for a failed join\ndsregcmd /status /debug",
                  caption: "When a join or a PRT fails, this is the first command to run"
                }
              ]
            },
            {
              text: "Compare the two machines side by side and write down, in one sentence each, how you would tell them apart from `dsregcmd` output alone."
            }
          ],
          result: {
            text: "You can read a device's trust relationship and single sign-on health from the client.",
            verify: [
              { text: "VM2 reports `AzureAdJoined : YES` and `AzureAdPrt : YES`." },
              { text: "VM1 reports `WorkplaceJoined : YES` and `AzureAdJoined : NO`." },
              { text: "Both devices appear in **All devices** with different join types." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Summarise device identity across the tenant",
      lang: "powershell",
      note: "Useful once devices start arriving. `trustType` is the directory's name for join type.",
      code: `Connect-MgGraph -Scopes "Device.Read.All"

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
    Format-Table -AutoSize`
    }
  ],

  troubleshooting: [
    {
      symptom:
        "A device shows `AzureAdJoined : YES` but `AzureAdPrt : NO`, and the user is prompted for credentials constantly.",
      rootCause:
        "The Primary Refresh Token has not been issued or has failed to refresh. Common causes are a large clock skew between the device and Entra ID, a broken network path to the authentication endpoints, or the user signing in with a local account rather than the work account.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status /debug\nw32tm /query /status"
      },
      resolution:
        "Confirm the user is signed in to Windows with the work account, correct the system clock, then sign out and back in. A PRT is issued at interactive sign-in, so a lock and unlock is not always sufficient."
    },
    {
      symptom: "Joining fails and the device already appears in **All devices**.",
      rootCause:
        "The per-user device quota in Microsoft Entra ID has been reached, or a stale object from a previous attempt is holding the device identity.",
      diagnostic: {
        lang: "powershell",
        code: "dsregcmd /status /debug   # look for the failure reason code"
      },
      resolution:
        "Delete the stale device object in **Devices** > **All devices**, then run `dsregcmd /leave` on the client and rejoin. If the quota is the cause, raise **Devices** > **Device settings** > **Maximum number of devices per user**.",
      errorCodes: ["0x801c03f2"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A user's personally owned Windows 11 laptop must access corporate email with data protection applied, but the organisation must not take ownership of the device or control its sign-in. Which device identity is appropriate?",
      options: [
        "Microsoft Entra registered",
        "Microsoft Entra joined",
        "Hybrid Microsoft Entra joined",
        "Domain joined only"
      ],
      correctIndex: 0,
      rationale:
        "Registration gives the organisation a device identity while the user keeps their local or Microsoft account sign-in and ownership of the machine. Joining replaces the Windows sign-in with a work account and implies corporate ownership.",
      examTip:
        "Read the ownership sentence in the scenario first. Personal ownership means registered; corporate ownership means joined, and hybrid joined only when on-premises Active Directory must remain in the picture.",
      skills: ["g1.t1.s1", "g1.t1.s3"]
    },
    {
      id: "q2",
      question:
        "`dsregcmd /status` on a Windows 11 device reports `AzureAdJoined : YES`, `DomainJoined : YES` and `AzureAdPrt : YES`. What is this device?",
      options: [
        "Hybrid Microsoft Entra joined",
        "Microsoft Entra joined only",
        "Microsoft Entra registered",
        "Co-managed but not joined to Microsoft Entra ID"
      ],
      correctIndex: 0,
      rationale:
        "`AzureAdJoined` and `DomainJoined` both reading YES is the definition of hybrid join — the device holds a trust relationship with both on-premises Active Directory and Microsoft Entra ID.",
      examTip:
        "Memorise the three signatures: joined is AzureAdJoined YES with DomainJoined NO; hybrid is both YES; registered is WorkplaceJoined YES with AzureAdJoined NO.",
      skills: ["g1.t1.s1", "g1.t1.s2"]
    }
  ]
};
