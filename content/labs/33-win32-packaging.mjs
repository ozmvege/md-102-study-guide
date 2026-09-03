export default {
  id: "win32-packaging",
  moduleId: "m6",
  title: "Win32 app packaging, detection and dependencies",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 70,

  scenario:
    "Most real software is not a clean MSI. It is an EXE with switches, or an MSI plus a transform, or three files that must run in order. Win32 app packaging handles all of it, at the cost of you having to tell Intune two things it cannot work out on its own: how to install the software, and how to know afterwards whether it worked. That second one — the detection rule — is where the majority of Win32 failures live, and `0x87D1041C` is its signature.",

  objectives: [
    "Package an installer into an .intunewin file",
    "Configure install and uninstall commands with the right context",
    "Write file, registry and script detection rules",
    "Configure requirements, dependencies and supersedence",
    "Diagnose a detection failure using the IME logs"
  ],

  keyConcepts: [".intunewin", "IntuneWinAppUtil", "Detection rule", "Requirement rule", "Dependency", "Supersedence", "Return codes", "IME log"],

  skills: [
    { id: "g4.t1.s1", depth: "primary" },
    { id: "g4.t1.s2", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["pradeep.gupta", "adele.vance"],
    labs: ["store-and-lob-apps"]
  },

  exercises: [
    {
      id: "e1",
      title: "Build the package",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Create an .intunewin file",
          checkpoint: true,
          steps: [
            {
              text: "Download the **Microsoft Win32 Content Prep Tool** from [the GitHub repository](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) and extract `IntuneWinAppUtil.exe`."
            },
            {
              text: "On your admin workstation or host, open Windows PowerShell as an administrator and create a clean source folder containing only what the installer needs:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "New-Item -ItemType Directory -Path C:\\Packaging\\7zip\\Source -Force\n# Copy only the installer and any files it requires into Source\\"
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The tool packages the **entire** source folder recursively. Point it at a folder containing your downloads directory and you will produce a two-gigabyte package that takes an hour to upload. Keep the source folder minimal and deliberate."
                }
              ]
            },
            {
              text: "On your admin workstation, run the packaging tool from Command Prompt:",
              parts: [
                {
                  kind: "code",
                  lang: "cmd",
                  code: "IntuneWinAppUtil.exe -c C:\\Packaging\\7zip\\Source -s 7z-installer.msi -o C:\\Packaging\\7zip\\Output -q"
                },
                {
                  kind: "table",
                  headers: ["Switch", "Meaning"],
                  rows: [
                    ["`-c`", "Source folder, packaged recursively"],
                    ["`-s`", "The setup file within that folder"],
                    ["`-o`", "Output folder for the `.intunewin` file"],
                    ["`-q`", "Quiet — no prompts"]
                  ]
                },
                {
                  kind: "verify",
                  text: "An `.intunewin` file exists in the output folder. It is an encrypted archive; you cannot open it to check the contents, which is why the source folder must be right before you package."
                }
              ]
            }
          ],
          result: {
            text: "A Win32 package is ready to upload.",
            verify: [{ text: "The `.intunewin` file exists and is a sensible size." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Configure the app in Intune",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Upload and set install behaviour",
          checkpoint: true,
          steps: [
            {
              text: "Select **Apps**, **All apps**, **Add**, then **Windows app (Win32)**, and upload the `.intunewin` file.",
              nav: ["Apps", "All apps", "Add"]
            },
            {
              text: "On **Program**, configure the commands:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Install command", value: "msiexec /i \"7z-installer.msi\" /qn /norestart" },
                    { label: "Uninstall command", value: "msiexec /x \"{PRODUCT-CODE-GUID}\" /qn /norestart" },
                    { label: "Install behavior", value: "System", note: "System installs for the machine. User context cannot write to Program Files or HKLM and produces 0x80070005." },
                    { label: "Device restart behavior", value: "No specific action" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Always include a quiet switch and a no-restart switch. An installer that shows a dialog waits forever in system context because there is no interactive desktop to show it on, and an installer that restarts the machine mid-Autopilot produces a very confusing failure."
                }
              ]
            },
            {
              text: "Configure the return codes that Intune should treat as success:",
              parts: [
                {
                  kind: "table",
                  headers: ["Code", "Meaning", "Default"],
                  rows: [
                    ["0", "Success", "Success"],
                    ["1707", "Success", "Success"],
                    ["3010", "Soft reboot required — the install worked", "Soft reboot"],
                    ["1641", "Hard reboot initiated by the installer", "Hard reboot"],
                    ["1618", "Another installation is already in progress", "Retry"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "If your installer returns a non-standard success code, add it here as **Success**. Otherwise a perfectly good installation is reported as a failure and Intune retries it indefinitely."
                }
              ]
            },
            {
              text: "On **Requirements**, set the minimum bar for the app even to be attempted:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Operating system architecture", value: "64-bit" },
                    { label: "Minimum operating system", value: "Windows 11 21H2" },
                    { label: "Disk space required (MB)", value: "500" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Requirement rules and detection rules answer different questions. A **requirement** decides whether the app should be attempted at all; a device failing it reports **Not applicable**. A **detection rule** decides whether the app is already there; failing it after a successful install reports `0x87D1041C`."
                }
              ]
            }
          ],
          result: {
            text: "The app has install commands, return codes and requirements.",
            verify: [
              { text: "Install and uninstall commands include quiet and no-restart switches." },
              { text: "Install behaviour is **System**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Write the detection rule",
          checkpoint: true,
          steps: [
            {
              text: "On **Detection rules**, choose **Manually configure detection rules** and review the three types:",
              parts: [
                {
                  kind: "table",
                  headers: ["Type", "Checks", "Best for"],
                  rows: [
                    ["MSI", "The MSI product code is registered", "Anything installed by a single MSI — simplest and most reliable"],
                    ["File", "A file or folder exists, optionally with a version or date comparison", "EXE installers that drop a known binary"],
                    ["Registry", "A key or value exists, optionally compared", "Installers that write a version to the registry"],
                    ["Script", "A PowerShell script decides", "Anything the other three cannot express"]
                  ]
                }
              ]
            },
            {
              text: "In the **Detection rules** step, select **Add** to configure a **File** rule, and work through the wizard tabs:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Rule type", value: "File" },
                    { label: "Path", value: "C:\\Program Files\\7-Zip" },
                    { label: "File or folder", value: "7z.exe" },
                    { label: "Detection method", value: "File or folder exists" },
                    { label: "Associated with a 32-bit app on 64-bit clients", value: "No" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "In the detection rule pane, enter the fields above and select **OK**." },
                    { text: "Select **Next** through **Dependencies** and **Supersedence** (leave empty)." },
                    { text: "On the **Assignments** tab, under **Required**, select **Add group** and choose `GRP-USR-PILOT`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The **Associated with a 32-bit app on 64-bit clients** toggle silently redirects your path. Set to **Yes**, a path of `C:\\Program Files` is redirected to `C:\\Program Files (x86)`, and a registry path under `HKLM\\SOFTWARE` is redirected to `WOW6432Node`. Getting this backwards is a very common cause of `0x87D1041C` on an application that installed perfectly."
                }
              ]
            },
            {
              text: "Note the contract for a **script** detection rule, because it is different from every other script in Intune:",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "A detection script must do **both** things to signal detected: write something to standard output **and** exit with code 0. Exiting 0 with no output means not detected. Writing output but exiting non-zero means not detected. This two-part contract catches almost everyone the first time."
                },
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "A correct script detection rule (evaluated by Intune Management Extension on client)",
                  code: "if (Test-Path \"C:\\Program Files\\7-Zip\\7z.exe\") {\n    Write-Output \"Detected\"   # output is required\n    exit 0                     # AND exit 0 is required\n}\nexit 1"
                }
              ]
            }
          ],
          result: {
            text: "The app has a detection rule that matches what the installer actually produces.",
            verify: [
              { text: "A detection rule is configured with the correct 32-bit redirection setting." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Dependencies, supersedence and diagnosis",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Configure a dependency and understand supersedence",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select the Win32 application (**7-Zip**) from the list, select **Dependencies**, then select **Add**. Choose the line-of-business app from lab 32.",
              nav: ["Apps", "All apps", "7-Zip", "Dependencies", "Add"],
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Automatically install", value: "Yes", note: "Installs the dependency even if it is not separately assigned." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Dependencies enforce **order**, which is the correct answer to *how do I make app A install before app B*. Relying on assignment timing does not work and produces `0x8007064C` when two installers collide. Dependencies can nest to a depth of 100, but a chain that deep is a design problem rather than a feature."
                }
              ]
            },
            {
              text: "Review supersedence, which is a different relationship:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Dependency", "Supersedence"],
                  rows: [
                    ["Expresses", "This app needs that app first", "This app replaces that app"],
                    ["Options", "Automatically install, or require it to be present", "Update the existing app, or uninstall it first"],
                    ["Typical use", "A runtime or prerequisite library", "Upgrading version 1 to version 2"],
                    ["Maximum depth", "100 levels", "10 levels"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Use supersedence for version upgrades rather than deleting the old app and adding a new one. Deleting an assigned app removes it from devices, so users lose the software before the replacement arrives."
                }
              ]
            }
          ],
          result: {
            text: "Install order is expressed as a dependency rather than left to chance.",
            verify: [
              { text: "The app lists a dependency with automatic installation enabled." },
              { text: "You can state when to use supersedence instead." }
            ]
          }
        },
        {
          id: "t2",
          title: "Diagnose from the IME log",
          checkpoint: true,
          steps: [
            {
              text: "On **MD102-VM1-Adele**, sync policy and wait for the app to install."
            },
            {
              text: "On **MD102-VM1-Adele**, open PowerShell as an administrator and read the IME log (the single most valuable file for Win32 troubleshooting):",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "$log = \"C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log\"\nGet-Content $log -Tail 200 | Select-String -Pattern \"7-Zip|Detection|ApplicationPolicy|ExitCode\""
                },
                {
                  kind: "table",
                  headers: ["Log file", "Contains"],
                  rows: [
                    ["`IntuneManagementExtension.log`", "Policy retrieval, app download, install execution, exit codes"],
                    ["`AppWorkload.log`", "Per-application workload detail, including detection rule evaluation"],
                    ["`AgentExecutor.log`", "PowerShell script and remediation execution"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Install **CMTrace** or use the Support Center log viewer to read these — they are formatted for it and are close to unreadable in Notepad. Search for the application name, then read forward to the detection result."
                }
              ]
            },
            {
              text: "Deliberately break detection to see the signature failure. In the **Microsoft Intune admin center**, select **Apps**, then **All apps**, select **7-Zip** from the list, select **Properties**, then next to **Detection rules** select **Edit**. Change the path to a path that does not exist, such as `C:\\Program Files\\7-Zip-Wrong`, save, then sync again.",
              nav: ["Apps", "All apps", "7-Zip", "Properties", "Detection rules", "Edit"],
              parts: [
                {
                  kind: "verify",
                  text: "The application reports **Failed** with `0x87D1041C` even though the software is installed on the device. The installer returned 0 and the detection rule then said the app was absent."
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the most common Win32 failure in production and the most common Win32 question on the exam. `0x87D1041C` means *the install succeeded and the detection rule disagrees*. Fix the rule, not the installer."
                }
              ]
            },
            {
              text: "Correct the detection rule and confirm the app reports **Installed**."
            }
          ],
          result: {
            text: "You have seen a detection failure, recognised its code, and fixed it.",
            verify: [
              { text: "You provoked `0x87D1041C` and resolved it by correcting the detection rule." },
              { text: "You can locate the Intune Management Extension logs from memory." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A Win32 app reports `0x87D1041C` but the software is clearly installed on the device.",
      rootCause:
        "The detection rule does not match reality. Usually a wrong path, a 32-bit redirection toggle set incorrectly, or a script detection rule that exits 0 without writing output.",
      diagnostic: {
        lang: "powershell",
        code: "Get-Content \"C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\AppWorkload.log\" -Tail 300 |\n    Select-String \"Detection|detected|Rule\""
      },
      resolution:
        "Verify the path or registry value on the device by hand, check the 32-bit toggle against where the app actually installed, and for script rules confirm the script both writes output and exits 0.",
      errorCodes: ["0x87D1041C"]
    },
    {
      symptom: "A Win32 app fails with `0x80070005` access denied.",
      rootCause: "The app is deploying in user context but writes to Program Files or HKLM.",
      diagnostic: {
        lang: "text",
        code: "Apps > All apps > open the app > Properties > Program > Install behavior"
      },
      resolution:
        "Set install behaviour to **System**. If the application genuinely must install per user, target a user group and ensure it writes only to the user profile and HKCU.",
      errorCodes: ["0x80070005"]
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A Win32 application installs correctly on the device but Intune reports it as failed with 0x87D1041C. What should you correct?",
      options: [
        "The detection rule",
        "The install command line",
        "The requirement rules",
        "The return code mapping"
      ],
      correctIndex: 0,
      rationale:
        "`0x87D1041C` means the installer returned success and the detection rule then evaluated to false. The software is present; Intune's method of confirming it is wrong.",
      examTip:
        "Requirements decide whether to try, detection decides whether it is already there. A device failing requirements reports Not applicable, not failed.",
      skills: ["g4.t1.s2"]
    },
    {
      id: "q2",
      question:
        "You write a PowerShell detection rule for a Win32 app. What must the script do to indicate the application is detected?",
      options: [
        "Write output to STDOUT and exit with code 0",
        "Exit with code 0 only",
        "Write output to STDOUT only",
        "Return $true from the script"
      ],
      correctIndex: 0,
      rationale:
        "Both conditions are required. Exit code 0 with no output means not detected, and output with a non-zero exit code also means not detected.",
      examTip:
        "This two-part contract is unique to Win32 detection scripts and differs from proactive remediation scripts, where the exit code alone decides.",
      skills: ["g4.t1.s1"]
    }
  ]
};
