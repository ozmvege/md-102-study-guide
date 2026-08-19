export default {
  id: "device-query-and-diagnostics",
  moduleId: "m9",
  title: "Device query with KQL and diagnostics collection",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 40,

  scenario:
    "A vulnerability is announced in a piece of software and you need to know, within the hour, which devices have it installed. Waiting for an inventory report is too slow. Device query runs Kusto Query Language against a device on demand and returns live results, and diagnostics collection pulls a full log bundle from a device without asking the user to find anything.",

  objectives: [
    "Run an on-demand device query using KQL",
    "Write queries against the common device query tables",
    "Collect device diagnostics remotely and read the result",
    "Use the Troubleshooting blade for a user-centred investigation",
    "Distinguish single-device query from multi-device query licensing"
  ],

  keyConcepts: ["Device query", "Kusto Query Language", "On-demand inventory", "Diagnostics collection", "Troubleshooting blade"],

  skills: [
    { id: "g2.t4.s6", depth: "primary" },
    { id: "g2.t4.s7", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance"],
    labs: ["remote-actions"]
  },

  exercises: [
    {
      id: "e1",
      title: "Query a device on demand",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Run your first device query",
          checkpoint: true,
          steps: [
            {
              text: "Open **Devices** > **All devices** > `MD102-VM1-Adele`, then select **Query** from the device blade.",
              nav: ["Devices", "All devices", "Query"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Single-device query** is included with Intune Plan 1. **Multi-device query**, which runs the same KQL across many devices at once, belongs to Intune Advanced Analytics — which Microsoft 365 E5 has included since July 2026, so you have both. This lab teaches the single-device form because it is where the query language is easiest to learn; lab 59 runs the same queries across the estate."
                }
              ]
            },
            {
              text: "Run a simple query to confirm the mechanism works:",
              parts: [
                {
                  kind: "code",
                  lang: "kusto",
                  caption: "Basic device information",
                  code: "Device"
                },
                {
                  kind: "verify",
                  text: "Results return within seconds showing the device's live properties. This is not cached inventory — the query executes on the device now."
                }
              ]
            },
            {
              text: "Learn the tables that matter:",
              parts: [
                {
                  kind: "table",
                  headers: ["Table", "Contains"],
                  rows: [
                    ["`Device`", "Core device properties: name, manufacturer, model, serial, OS build"],
                    ["`Application`", "Installed applications with versions and publishers"],
                    ["`Process`", "Currently running processes"],
                    ["`Service`", "Windows services and their state"],
                    ["`LocalUserAccount`", "Local accounts on the device"],
                    ["`LocalUserGroup`", "Local groups and their membership"],
                    ["`NetworkAdapter`", "Network interfaces and addressing"],
                    ["`DriverInfo`", "Installed drivers and versions"],
                    ["`RegistryKey` and `RegistryValue`", "Registry data, queried live"],
                    ["`FileInfo`", "Files matching a path"],
                    ["`WindowsUpdate`", "Update history"]
                  ]
                }
              ]
            },
            {
              text: "Answer the scenario from the introduction — find a vulnerable application:",
              parts: [
                {
                  kind: "code",
                  lang: "kusto",
                  caption: "Is a specific application installed, and which version?",
                  code: "Application\n| where displayName contains \"7-Zip\"\n| project displayName, version, publisher, installDate\n| sort by version asc"
                }
              ]
            },
            {
              text: "Run two more that answer real support questions:",
              parts: [
                {
                  kind: "code",
                  lang: "kusto",
                  caption: "Who is a local administrator on this device?",
                  code: "LocalUserGroup\n| where name == \"Administrators\"\n| mv-expand members\n| project name, members"
                },
                {
                  kind: "code",
                  lang: "kusto",
                  caption: "Is the Defender sensor running?",
                  code: "Service\n| where displayName contains \"Defender\" or name == \"Sense\"\n| project name, displayName, state, startMode"
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "The KQL subset here is deliberately small: `where`, `project`, `sort by`, `summarize`, `count`, `contains`, `has`, `mv-expand`. You do not need the full Kusto language, and the exam does not test obscure operators — it tests whether you know device query exists, what it can reach, and that it runs live rather than against cached inventory."
                }
              ]
            }
          ],
          result: {
            text: "You can answer live questions about a device without touching it.",
            verify: [
              { text: "A query against `Application` returned results." },
              { text: "You can name at least five queryable tables." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Collect diagnostics",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Collect and download a diagnostics package",
          checkpoint: true,
          steps: [
            {
              text: "On the device blade, select **Collect diagnostics** and confirm.",
              nav: ["Devices", "All devices", "Collect diagnostics"],
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Collection is silent — the user is not prompted and sees nothing. The device gathers Intune Management Extension logs, MDM diagnostics, event logs, registry state and update history, then uploads the bundle."
                }
              ]
            },
            {
              text: "Once collection completes, open **Monitor** > **Device diagnostics** on the device and download the package.",
              nav: ["Devices", "All devices", "Device diagnostics"],
              parts: [
                {
                  kind: "verify",
                  text: "A zip file downloads containing numbered folders. `results.xml` maps each folder to what it collected — read that first rather than opening folders at random."
                }
              ]
            },
            {
              text: "Compare the two ways to get the same information:",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Collect diagnostics (remote)", "mdmdiagnosticstool (local)"],
                  rows: [
                    ["Requires physical access", "No", "Yes, or a remote session"],
                    ["User is aware", "No", "Yes, someone has to run it"],
                    ["Device must be online", "Yes", "No"],
                    ["Output", "Downloaded from the portal", "A local zip you must retrieve"],
                    ["Best for", "A user who cannot help you", "A device that is offline or unenrolled"]
                  ]
                }
              ]
            },
            {
              text: "Finish with the user-centred view. Open **Troubleshooting + support** > **Troubleshoot** and select Adele.",
              nav: ["Troubleshooting + support", "Troubleshoot"],
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "This blade is the exam's *user-based diagnostics* and the right first stop for any single-user complaint. It consolidates licensing, group membership, devices, compliance, configuration, applications, app protection and enrollment failures onto one page — which is exactly the set of things that turn out to be the cause."
                }
              ]
            }
          ],
          result: {
            text: "You can collect a full diagnostic bundle without involving the user.",
            verify: [
              { text: "A diagnostics package downloaded and `results.xml` explains its contents." },
              { text: "The Troubleshooting blade shows the user's full state." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Device query returns no results or the Query option is unavailable.",
      rootCause:
        "The device is offline, is running an unsupported operating system version, or Endpoint Analytics data collection does not target it — multi-device query only reaches devices that are in scope for collection.",
      diagnostic: {
        lang: "text",
        code: "Devices > All devices > open the device > check Last check-in\nConfirm the OS version meets the device query minimum."
      },
      resolution:
        "Device query needs the device online because it executes live — there is no cached answer to fall back on. For multi-device query, confirm the devices are in scope for Endpoint Analytics data collection, which lab 54 configures."
    }
  ],

  quiz: [
    {
      question:
        "A vulnerability is announced in a widely deployed application. You need to know within the hour which devices have it and at what version. Which capability gives live results?",
      options: [
        "Device query using KQL",
        "The discovered apps inventory report",
        "A custom compliance policy with a discovery script",
        "Collect diagnostics"
      ],
      correctIndex: 0,
      rationale:
        "Device query executes on the device on demand and returns current state. Discovered apps is cached inventory refreshed on a schedule, and a compliance script would take a full evaluation cycle to report.",
      examTip:
        "Live versus cached is the distinction being tested. Note also that querying many devices at once belongs to Advanced Analytics, while single-device query is in Plan 1 — Microsoft 365 E5 has included both since July 2026.",
      skills: ["g2.t4.s6"]
    },
    {
      question:
        "A user reports that an application will not install, and they cannot reliably follow instructions to gather logs. What is the most efficient way to obtain the diagnostic data?",
      options: [
        "Use Collect diagnostics from the device blade, which gathers logs silently and uploads them",
        "Ask the user to run mdmdiagnosticstool.exe and email you the output",
        "Run a device query against the Application table",
        "Retire and re-enrol the device"
      ],
      correctIndex: 0,
      rationale:
        "Collect diagnostics gathers Intune Management Extension logs, MDM diagnostics, event logs and update history without any user involvement, and makes the bundle downloadable from the portal.",
      examTip:
        "Device query answers a specific question about current state; collect diagnostics gathers everything for an investigation. Pick based on whether you know what you are looking for.",
      skills: ["g2.t4.s7"]
    }
  ]
};
