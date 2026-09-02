export default {
  id: "remote-actions",
  moduleId: "m9",
  title: "Remote actions, bulk actions and credential rotation",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "A laptop is stolen. A user is leaving. A device is behaving oddly and needs its antivirus definitions refreshed. Each is a remote action, and the difference between Retire and Wipe is the difference between removing corporate access and destroying someone's personal photographs. This lab makes you certain about which action does what before you ever have to choose one under pressure.",

  objectives: [
    "Perform sync, restart, retire and wipe and state exactly what each removes",
    "Run a bulk device action",
    "Update Defender security intelligence remotely",
    "Rotate BitLocker recovery keys and local administrator passwords",
    "Choose the right action for a given scenario"
  ],

  keyConcepts: ["Sync", "Retire", "Wipe", "Fresh Start", "Autopilot Reset", "Bulk device actions", "Key rotation"],

  skills: [
    { id: "g2.t4.s1", depth: "primary" },
    { id: "g2.t4.s2", depth: "primary" },
    { id: "g2.t4.s3", depth: "primary" },
    { id: "g2.t4.s4", depth: "primary" },
    { id: "g2.t4.s5", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "staging.user01"],
    labs: ["disk-encryption", "whfb-laps-local-groups"]
  },

  exercises: [
    {
      id: "e1",
      title: "Know what each action destroys",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Learn the data impact matrix",
          steps: [
            {
              text: "Study this before running anything. Choosing wrongly here is one of the few genuinely unrecoverable mistakes in endpoint administration.",
              parts: [
                {
                  kind: "table",
                  headers: ["Action", "Removes", "Keeps", "Device stays enrolled"],
                  rows: [
                    ["**Sync**", "Nothing", "Everything", "Yes"],
                    ["**Restart**", "Nothing", "Everything", "Yes"],
                    ["**Retire**", "Company data, policies, company apps, work profile, VPN and Wi-Fi profiles", "**All personal data and the operating system**", "No"],
                    ["**Wipe**", "**Everything — factory reset**", "Nothing, unless you keep enrollment state", "No, unless retained"],
                    ["**Fresh Start**", "Pre-installed manufacturer apps, optionally user data", "Windows, and user data if you choose", "Yes"],
                    ["**Autopilot Reset**", "Apps, settings and personal content", "Autopilot registration, so it redeploys automatically", "Yes, redeploys"],
                    ["**Delete**", "The Intune record only", "The device itself, untouched and still configured", "No record"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "caution",
                  text: "**Retire** is for personally owned devices — it takes back what the organisation owns and leaves the rest alone. **Wipe** is for corporate hardware being reissued or lost. Using Wipe on an employee's own phone destroys their personal data and is not recoverable. When a scenario says the device belongs to the user, the answer is almost always Retire."
                }
              ]
            },
            {
              text: "Note the two Windows-specific options:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "**Fresh Start** removes manufacturer-installed software while keeping Windows and, optionally, user data — useful for a device that arrived full of vendor bloatware. **Autopilot Reset** returns a device to a business-ready state while preserving its Autopilot registration and Entra join, so it redeploys itself. That is the right action for reassigning a corporate laptop between employees."
                }
              ]
            }
          ],
          result: {
            text: "You can state what each remote action destroys without looking it up.",
            verify: [
              { text: "You can name the action for a departing employee's personal phone." },
              { text: "You can name the action for reassigning a corporate laptop." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Run remote actions",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Run individual actions",
          checkpoint: true,
          steps: [
            {
              text: "Open **Devices** > **All devices** > `MD102-VM1-Adele` and review the action bar across the top.",
              nav: ["Devices", "All devices"]
            },
            {
              text: "Run the safe ones and watch what happens:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **Sync**. The device checks in for policy within minutes." },
                    { text: "Select **Collect diagnostics**. Intune gathers a diagnostic package — used in lab 51." },
                    { text: "Select **Update Windows Defender security intelligence**. Definitions refresh without a full policy cycle." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Update Windows Defender security intelligence** is the remote action people forget exists. When a new threat is circulating and you need every device on current definitions now, this is faster than waiting for the scheduled signature interval from lab 40."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, open PowerShell as an administrator and confirm the sync from the device:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-WinEvent -LogName \"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin\" -MaxEvents 20 |\n    Select-Object TimeCreated, Id | Format-Table -AutoSize"
                }
              ]
            },
            {
              text: "Now rotate credentials, which you configured in earlier labs:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **BitLocker key rotation**, then confirm. A new recovery key appears under **Recovery keys** after the next check-in." },
                    { text: "Select **Rotate local admin password**, then confirm. A new LAPS password appears under **Local admin password**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Both rotations are the correct response to credential disclosure. If a BitLocker key or a local administrator password was read out on a support call, written on a whiteboard or emailed, rotate it — the value is only as secret as the least careful person who has seen it."
                }
              ]
            }
          ],
          result: {
            text: "You have run the non-destructive remote actions and rotated both credential types.",
            verify: [
              { text: "The device synced on demand." },
              { text: "New BitLocker and LAPS values appear after rotation." }
            ]
          }
        },
        {
          id: "t2",
          title: "Run a bulk device action",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **All devices**, then **Bulk device actions**.",
              nav: ["Devices", "All devices", "Bulk device actions"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "OS", value: "Windows" },
                    { label: "Device action", value: "Sync" },
                    { label: "Devices", value: "Select several of your devices" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Bulk actions support destructive operations including **Retire** and **Wipe**, with a limit of 100 devices per action. There is one confirmation and no undo. Read the device list twice before confirming a bulk wipe — the confirmation dialog will not save you from a wrong filter."
                }
              ]
            },
            {
              text: "Run the sync and check progress under **Tenant administration** > **Bulk device actions**.",
              parts: [
                {
                  kind: "verify",
                  text: "The action is listed with per-device status showing pending, succeeded or failed."
                }
              ]
            }
          ],
          result: {
            text: "You can act on many devices at once and monitor the result.",
            verify: [
              { text: "A bulk action shows per-device status." },
              { text: "You can state the per-action device limit." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Retire a device and confirm the result",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "Retire the Android emulator",
          checkpoint: true,
          steps: [
            {
              text: "Open the Android emulator's device record in **All devices** and select **Retire**.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The emulator is personally owned with a work profile, so **Wipe** is not offered — Intune will not let you factory reset a device the organisation does not own. That constraint is the feature working, and it is worth seeing rather than reading about."
                }
              ]
            },
            {
              text: "Confirm the action, then watch the emulator.",
              parts: [
                {
                  kind: "verify",
                  text: "The work profile is removed. Badged work applications disappear, corporate data goes with them, and Diego's personal side of the device is untouched."
                }
              ]
            },
            {
              text: "Confirm in the portal.",
              parts: [
                {
                  kind: "verify",
                  text: "The device is removed from **All devices**. Retiring both unenrolls the device and deletes its Intune record."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Re-enrol the emulator using the flow from lab 13 before continuing — later labs assume an Android device exists. Doing the round trip once is worth the ten minutes, because it proves you can recover a device as well as remove one."
                }
              ]
            }
          ],
          result: {
            text: "You have removed corporate presence from a personally owned device without touching personal data.",
            verify: [
              { text: "The work profile is gone from the emulator." },
              { text: "Personal applications and data remain." }
            ]
          }
        }
      ]
    }
  ],

  scripts: [
    {
      title: "Bulk remote actions through Microsoft Graph",
      lang: "powershell",
      note: "Useful when the selection criteria are more complex than the portal filters allow. The example syncs; change the action with care.",
      code: `Connect-MgGraph -Scopes "DeviceManagementManagedDevices.PrivilegedOperations.All",
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
#   Invoke-MgWipeDeviceManagementManagedDevice  -ManagedDeviceId $device.Id`
    }
  ],

  troubleshooting: [
    {
      symptom: "A remote action stays pending indefinitely.",
      rootCause: "The device has not checked in. Remote actions queue until the device contacts the service and are not delivered by push.",
      diagnostic: {
        lang: "powershell",
        code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\nGet-MgDeviceManagementManagedDevice -All |\n    Where-Object DeviceName -eq \"MD102-VM1-Adele\" |\n    Select-Object DeviceName, LastSyncDateTime, ManagementState"
      },
      resolution:
        "Check `LastSyncDateTime`. A device that is switched off, offline or has lost its management channel cannot receive the action — the pending status describes the device, not a fault in the action."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "An employee leaves the company. Their personally owned Android phone has a work profile with corporate mail. Which remote action should you use?",
      options: [
        "Retire, which removes the work profile and company data while leaving personal data intact",
        "Wipe, to ensure no corporate data remains on the device",
        "Delete, to remove the device record from Intune",
        "Fresh Start, to reset the device to a clean state"
      ],
      correctIndex: 0,
      rationale:
        "Retire removes corporate data, policies and the work profile while leaving the device and all personal content untouched. Wipe would factory reset a device the organisation does not own, and Delete removes only the record while leaving corporate data in place on the device.",
      examTip:
        "Match the action to ownership. Personally owned means Retire; corporate hardware being reissued means Wipe or Autopilot Reset.",
      skills: ["g2.t4.s1"]
    },
    {
      id: "q2",
      question:
        "A corporate laptop is being reassigned to a different employee. It must return to a business-ready state and redeploy automatically without IT reimaging it. Which action is appropriate?",
      options: [
        "Autopilot Reset, which preserves the Autopilot registration so the device redeploys itself",
        "Wipe, which factory resets the device",
        "Fresh Start, which removes pre-installed applications",
        "Retire, which unenrolls the device"
      ],
      correctIndex: 0,
      rationale:
        "Autopilot Reset removes applications, settings and personal content while preserving Autopilot registration and Microsoft Entra join, so the device provisions itself for its new user. A full Wipe would remove the Entra join and require the deployment to start over.",
      examTip:
        "Autopilot Reset is the reassignment action. Its distinguishing property is that the device stays registered and redeploys without being touched.",
      skills: ["g2.t4.s1"]
    }
  ]
};
