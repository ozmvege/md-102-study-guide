export default {
  id: "autopilot-user-driven",
  moduleId: "m3",
  title: "Windows Autopilot user-driven deployment",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 75,

  scenario:
    "A new starter joins Finance on Monday. The laptop is shipped to their home still sealed. They open it, connect to their own Wi-Fi, sign in with their work account, and forty minutes later have a managed, encrypted, application-loaded corporate device that IT never touched. That is user-driven Autopilot, and you are about to build it end to end on VM3 — hardware hash, dynamic group, device name template, deployment profile and Enrollment Status Page.",

  objectives: [
    "Capture and import a Windows Autopilot hardware hash",
    "Apply a device name template so devices are named consistently",
    "Create and assign a user-driven deployment profile",
    "Configure an Enrollment Status Page and understand what blocking means",
    "Run a full Autopilot deployment and verify the result"
  ],

  keyConcepts: ["Hardware hash", "ZTDId", "Deployment profile", "Device name template", "Enrollment Status Page", "Blocking apps"],

  skills: [
    { id: "g2.t1.s3", depth: "primary" },
    { id: "g2.t1.s4", depth: "primary" },
    { id: "g2.t1.s5", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm3-megan", os: "Windows 11 Pro at OOBE" }
    ],
    personas: ["megan.bowen"],
    labs: ["deployment-method-decision", "groups-for-devices"]
  },

  exercises: [
    {
      id: "e1",
      title: "Register the device",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Capture the hardware hash from VM3",
          checkpoint: true,
          steps: [
            {
              text: "Revert **MD102-VM3-Megan** to the clean checkpoint from lab 2, then start it:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Run on the Hyper-V host",
                  code: "Restore-VMCheckpoint -Name \"OOBE-Clean\" -VMName MD102-VM3-Megan -Confirm:$false\nStart-VM -Name MD102-VM3-Megan"
                }
              ]
            },
            {
              text: "At the region selection screen, press **Shift + F10** to open a command prompt.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "On some keyboards this is **Shift + Fn + F10**. In a Hyper-V connection window the key combination goes to the guest, not the host. This shortcut is worth committing to memory — it is how every Autopilot hash is captured in the field."
                }
              ]
            },
            {
              text: "Start PowerShell and capture the hash:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "powershell.exe\nSet-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force\nInstall-Script -Name Get-WindowsAutopilotInfo -Force\nGet-WindowsAutopilotInfo -OutputFile C:\\hash.csv"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "`Install-Script` needs internet access, which the Default Switch provides. If prompted to trust the PSGallery repository, accept. The script reads the device serial number, the Windows product ID and the hardware identifier, and writes them as one CSV row."
                }
              ]
            },
            {
              text: "Get the file off the machine. The simplest route with no shared folder is to upload it directly:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Uploads straight into Intune, skipping the CSV entirely",
                  code: "Install-Script -Name Get-WindowsAutopilotInfo -Force\nGet-WindowsAutopilotInfo -Online"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "`-Online` prompts for credentials and registers the device with Intune directly. Use `admin-intune`. This is far easier than moving a CSV out of a machine sitting at the out-of-box experience, and it is what most field engineers actually do."
                }
              ]
            },
            {
              text: "Shut the virtual machine down. Do **not** let it continue through the out-of-box experience yet.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "On the host",
                  code: "Stop-VM -Name MD102-VM3-Megan -TurnOff -Force"
                }
              ]
            }
          ],
          result: {
            text: "The device is registered with the Windows Autopilot service.",
            verify: [
              { text: "**Devices** > **Enrollment** > **Devices** lists the device by serial number." },
              { text: "Its **Profile status** currently reads **Not assigned**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Confirm the dynamic Autopilot group picks it up",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, open `GRP-DEV-AUTOPILOT` from lab 3 and select **Members**.",
              nav: ["Groups", "GRP-DEV-AUTOPILOT", "Members"]
            },
            {
              text: "Recall the rule that makes this work:",
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  code: "(device.devicePhysicalIds -any (_ -startsWith \"[ZTDId]\"))",
                  copyable: true
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Registering a device with Autopilot creates a Microsoft Entra device object carrying a Zero Touch Deployment identifier, before the device has ever enrolled. That is what this rule matches, and it is why the group populates while the machine is switched off."
                }
              ]
            },
            {
              text: "Wait for the device to appear. This can take several minutes.",
              parts: [
                {
                  kind: "verify",
                  text: "The device object appears as a member of `GRP-DEV-AUTOPILOT`."
                }
              ]
            }
          ],
          result: {
            text: "The registered device is a member of the group the deployment profile will target.",
            verify: [{ text: "`GRP-DEV-AUTOPILOT` has at least one member." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Create the deployment profile and Enrollment Status Page",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a user-driven deployment profile with a name template",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Enrollment**, **Windows**, then **Deployment Profiles**, then **Create profile** > **Windows PC**.",
              nav: ["Devices", "Enrollment", "Windows", "Deployment Profiles", "Create profile"]
            },
            {
              text: "On **Basics**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "AP-UserDriven-Corporate" },
                    { label: "Description", value: "User-driven Entra join for corporate laptops" },
                    { label: "Convert all targeted devices to Autopilot", value: "No", note: "Set to Yes only if you want every device in the assigned group registered automatically. On a lab group this can register more than you intended." }
                  ]
                }
              ]
            },
            {
              text: "On **Out-of-box experience (OOBE)**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Deployment mode", value: "User-Driven" },
                    { label: "Join to Microsoft Entra ID as", value: "Microsoft Entra joined" },
                    { label: "Microsoft Software License Terms", value: "Hide" },
                    { label: "Privacy settings", value: "Hide" },
                    { label: "Hide change account options", value: "Show" },
                    { label: "User account type", value: "Standard", note: "Not Administrator. This is the setting that stops every user being a local admin, and it is examinable." },
                    { label: "Allow pre-provisioned deployment", value: "No" },
                    { label: "Language, region, keyboard", value: "User select" },
                    { label: "Apply device name template", value: "Yes" },
                    { label: "Enter a name", value: "CTS-FIN-%RAND:5%" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Device name templates are limited to **15 characters** total, may use letters, numbers and hyphens only, and cannot be all numbers. `%SERIAL%` inserts the serial number and `%RAND:x%` inserts x random digits. `CTS-FIN-%RAND:5%` is 13 characters. A template that resolves to more than 15 characters causes the deployment to fail at naming, which is a confusing place to fail."
                }
              ]
            },
            {
              text: "On **Assignments**, include `GRP-DEV-AUTOPILOT`, then create the profile."
            },
            {
              text: "Return to **Devices** > **Enrollment** > **Devices** and check the registration.",
              parts: [
                {
                  kind: "verify",
                  text: "**Profile status** now reads **Assigned**. Do not start the virtual machine until it does — a device that reaches the out-of-box experience before assignment completes will not use Autopilot at all, and you will have to reset it and start again.",
                  expected: "Serial number      Profile status\n-----------------  --------------\n0000-0000-0000...  Assigned"
                }
              ]
            }
          ],
          result: {
            text: "A user-driven profile is assigned to the registered device.",
            verify: [
              { text: "**Profile status** reads **Assigned**." },
              { text: "The device name template is 15 characters or fewer." }
            ]
          }
        },
        {
          id: "t2",
          title: "Configure the Enrollment Status Page",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Enrollment**, **Windows**, then **Enrollment Status Page**.",
              nav: ["Devices", "Enrollment", "Windows", "Enrollment Status Page"]
            },
            {
              text: "Select **Create**, then configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "ESP-Corporate" },
                    { label: "Show app and profile configuration progress", value: "Yes" },
                    { label: "Show an error when installation takes longer than", value: "3600 seconds", note: "60 minutes. The default." },
                    { label: "Allow users to collect logs about installation errors", value: "Yes", note: "Produces a diagnostics cab the user can send you." },
                    { label: "Only show page to devices provisioned by out-of-box experience (OOBE)", value: "Yes" },
                    { label: "Block device use until all apps and profiles are installed", value: "Yes" },
                    { label: "Allow users to reset device if installation error occurs", value: "Yes" },
                    { label: "Allow users to use device if installation error occurs", value: "Yes", note: "Set to No only when a device is genuinely unusable without its full configuration." },
                    { label: "Block device use until required apps are installed if they are assigned to the user/device", value: "Selected" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Nominate as few blocking apps as you can defend. Every blocking app must install successfully before the user reaches the desktop, and the timeout is consumed by the slowest one. An Enrollment Status Page that blocks on a 4 GB application over a home broadband connection is how a forty-minute deployment becomes a two-hour one and then times out with `0x800705B4`."
                }
              ]
            },
            {
              text: "On **Assignments**, assign to `GRP-USR-HR`, then create the page."
            }
          ],
          result: {
            text: "An Enrollment Status Page will show provisioning progress and block until configuration completes.",
            verify: [
              { text: "`ESP-Corporate` is listed above the built-in **Default** page." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Run the deployment",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Deploy the device as Megan",
          checkpoint: true,
          steps: [
            {
              text: "Start **MD102-VM3-Megan** and connect to it.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "On the host",
                  code: "Start-VM -Name MD102-VM3-Megan\nvmconnect.exe localhost MD102-VM3-Megan"
                }
              ]
            },
            {
              text: "Select region and keyboard, then connect to the network. Watch what happens next.",
              parts: [
                {
                  kind: "verify",
                  text: "Instead of the normal Windows setup screens, a branded sign-in page appears showing your organisation name from lab 10. This is the moment Autopilot takes over: the device recognised its own hardware hash and downloaded its profile."
                }
              ]
            },
            {
              text: "Sign in as `megan.bowen@<tenant>.onmicrosoft.com`."
            },
            {
              text: "The Enrollment Status Page appears with three phases. Let it run.",
              parts: [
                {
                  kind: "table",
                  headers: ["Phase", "What happens"],
                  rows: [
                    ["Device preparation", "Security policies applied, device joined to Microsoft Entra ID, enrolled in Intune"],
                    ["Device setup", "Device-targeted apps, certificates, connection profiles and configuration"],
                    ["Account setup", "User-targeted apps and policies, after the user has signed in"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "If it stalls, select **Show details** on the status page to see which item is blocking. This is the fastest diagnosis available and most people never notice the link."
                }
              ]
            },
            {
              text: "When the desktop appears, verify the result:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "hostname\ndsregcmd /status | Select-String \"AzureAdJoined|MdmUrl|AzureAdPrt\"\nwhoami"
                },
                {
                  kind: "verify",
                  text: "The hostname matches your `CTS-FIN-` template, `AzureAdJoined : YES`, an **MdmUrl** is present, and the signed-in user is Megan."
                }
              ]
            },
            {
              text: "Confirm the user is a standard user, not a local administrator:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "net localgroup Administrators"
                },
                {
                  kind: "verify",
                  text: "Megan's account is **not** listed. This is the **User account type: Standard** setting from the deployment profile doing its job."
                }
              ]
            },
            {
              text: "In the portal, confirm the device object.",
              nav: ["Devices", "All devices"],
              parts: [
                {
                  kind: "verify",
                  text: "The device appears with the templated name, ownership **Corporate**, and Megan as primary user. Autopilot-registered devices are corporate by definition, so `GRP-DEV-WIN-CORP` will pick this one up without the manual step you needed in lab 11."
                }
              ]
            }
          ],
          result: {
            text: "A device provisioned itself from a sealed state to a managed corporate desktop with no IT involvement.",
            verify: [
              { text: "The device name matches the template." },
              { text: "The user is a standard user." },
              { text: "The device is Corporate-owned in Intune." }
            ]
          }
        },
        {
          id: "t2",
          title: "Take a post-deployment checkpoint",
          checkpoint: true,
          steps: [
            {
              text: "This deployed state is useful for later modules. Preserve it without losing the clean one:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "On the host",
                  code: "Checkpoint-VM -Name MD102-VM3-Megan -SnapshotName \"Autopilot-Deployed\"\nGet-VMCheckpoint -VMName MD102-VM3-Megan | Select-Object Name, CreationTime"
                },
                {
                  kind: "verify",
                  text: "Both **OOBE-Clean** and **Autopilot-Deployed** exist. You can now move between a fresh device and a deployed one in seconds."
                }
              ]
            }
          ],
          result: {
            text: "You can return to either a clean or a deployed state at will.",
            verify: [{ text: "Two checkpoints exist on VM3." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "The device reaches the normal Windows out-of-box experience instead of the branded Autopilot screen.",
      rootCause:
        "The deployment profile was not assigned to the device before it started, the hardware hash was never imported, or the device had already completed the out-of-box experience once.",
      diagnostic: {
        lang: "text",
        code: "Devices > Enrollment > Devices\nCheck the device is listed and Profile status reads Assigned before powering on."
      },
      resolution:
        "Confirm **Profile status** is **Assigned**, then reset the device or revert the checkpoint and try again. Group assignment is not instantaneous and a device that boots too early will simply not use Autopilot.",
      errorCodes: ["0x82AA0008"]
    },
    {
      symptom: "The Enrollment Status Page fails after 60 minutes with a timeout.",
      rootCause:
        "A blocking application never installed. The timeout is consumed waiting for it, and the failure names the page rather than the application.",
      diagnostic: {
        lang: "cmd",
        code: "mdmdiagnosticstool.exe -area Autopilot;DeviceEnrollment -zip C:\\Temp\\esp.zip"
      },
      resolution:
        "Reduce the blocking application list to the minimum, confirm each one installs correctly outside Autopilot first, and only then raise the timeout. Raising the timeout without fixing the app just fails more slowly.",
      errorCodes: ["0x800705B4"]
    }
  ],

  quiz: [
    {
      question:
        "You configure an Autopilot device name template as `CONTOSO-FINANCE-%SERIAL%`. Deployments fail during naming. Why?",
      options: [
        "The resolved name exceeds the 15-character limit for Windows device names",
        "%SERIAL% is not a valid Autopilot variable",
        "Device name templates require self-deploying mode",
        "Hyphens are not permitted in device name templates"
      ],
      correctIndex: 0,
      rationale:
        "Windows device names are limited to 15 characters. `CONTOSO-FINANCE-` alone is 16 before the serial number is inserted, so the template can never resolve to a valid name.",
      examTip:
        "Count the characters in any name template question. 15 is the hard limit, letters, numbers and hyphens only, and it cannot be entirely numeric.",
      skills: ["g2.t1.s3"]
    },
    {
      question:
        "During an Autopilot deployment the Enrollment Status Page reports an error after the configured timeout. Which change is most likely to fix the underlying problem?",
      options: [
        "Reduce the number of blocking apps to those genuinely required before first use",
        "Increase the timeout to 7200 seconds",
        "Disable the Enrollment Status Page entirely",
        "Switch the deployment mode to self-deploying"
      ],
      correctIndex: 0,
      rationale:
        "The timeout is a symptom. A blocking application that cannot install will still fail with a longer timeout, and disabling the page hides a genuine configuration failure rather than resolving it.",
      examTip:
        "Treat blocking apps as a deliberate, minimal list. The exam favours answers that fix the cause over answers that extend the wait.",
      skills: ["g2.t1.s5"]
    }
  ]
};
