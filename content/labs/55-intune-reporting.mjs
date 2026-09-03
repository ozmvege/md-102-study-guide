export default {
  id: "intune-reporting",
  moduleId: "m10",
  title: "Intune reporting, workbooks and data export",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 35,

  scenario:
    "Someone will ask you for a report. Sometimes it is an auditor wanting evidence that every device is encrypted; sometimes it is a manager wanting a monthly trend. Intune has four different reporting surfaces with different freshness and different capabilities, and picking the wrong one wastes an afternoon producing something that cannot answer the question.",

  objectives: [
    "Distinguish the four Intune report types and their data freshness",
    "Customise a report with columns and filters",
    "Export report data from the portal and through Graph",
    "Explain what workbooks add and what they require"
  ],

  keyConcepts: ["Operational reports", "Organizational reports", "Historical reports", "Specialist reports", "Report export API", "Log Analytics workbooks"],

  skills: [{ id: "g5.t2.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["admin-intune"],
    labs: ["graph-automation"]
  },

  exercises: [
    {
      id: "e1",
      title: "The four report types",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Learn which report answers which question",
          checkpoint: true,
          steps: [
            {
              text: "Open **Reports** and note the structure, then read the comparison.",
              nav: ["Reports"],
              parts: [
                {
                  kind: "table",
                  headers: ["Type", "Freshness", "Scope", "Example"],
                  rows: [
                    ["**Operational**", "Real time", "Focused, actionable, usually failures", "Devices that failed a compliance policy"],
                    ["**Organizational**", "Refreshed periodically", "Broad estate summaries", "Device compliance across the tenant"],
                    ["**Historical**", "Aggregated over time", "Trends and patterns", "Compliance trend over the last 60 days"],
                    ["**Specialist**", "Varies", "Deep, narrow subject areas", "Device inventory, Windows update failures"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Freshness is the distinction that matters in practice. **Operational** reports query live and are what you use when troubleshooting now. **Organizational** and **historical** reports run against aggregated data that can be hours old — so a device you just fixed will still look broken, and concluding that your fix did not work is the standard mistake."
                }
              ]
            },
            {
              text: "Select **Reports**, then under **Device management**, select **Device compliance**, and customise it:",
              nav: ["Reports", "Device management", "Device compliance"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **Filters** and narrow to a single operating system and compliance state." },
                    { text: "Select **Columns** and add or remove columns so the report answers exactly one question." },
                    { text: "Select **Generate report**, then note the timestamp of the data." }
                  ]
                },
                {
                  kind: "verify",
                  text: "The report renders with your filters and shows when the data was generated. Always read that timestamp before drawing a conclusion."
                }
              ]
            },
            {
              text: "Export it:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Select **Export** and choose CSV." },
                    { text: "Note that large exports are prepared asynchronously and downloaded when ready." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can pick a report type from a question and customise it.",
            verify: [
              { text: "You produced a filtered, column-customised report and exported it." },
              { text: "You can state which report type is real time." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Automated export and workbooks",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Export report data through Graph",
          checkpoint: true,
          steps: [
            {
              text: "Portal exports are fine once. For a monthly report nobody should be clicking, use the export API.",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Request an export job, then poll for the result",
                  code: "Connect-MgGraph -Scopes \"DeviceManagementManagedDevices.Read.All\"\n\n$body = @{\n    reportName = \"DeviceCompliance\"\n    format     = \"csv\"\n} | ConvertTo-Json\n\n$job = Invoke-MgGraphRequest -Method POST `\n    -Uri \"https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs\" `\n    -Body $body -ContentType \"application/json\"\n\n# Bounded, and it stops on failed as well as completed. Polling only for\n# \"completed\" spins forever on a job that will never reach it.\n$deadline = (Get-Date).AddMinutes(5)\ndo {\n    Start-Sleep -Seconds 5\n    $status = Invoke-MgGraphRequest -Method GET `\n        -Uri \"https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs('$($job.id)')\"\n    Write-Host \"Status: $($status.status)\"\n} while ($status.status -notin @(\"completed\", \"failed\") -and (Get-Date) -lt $deadline)\n\nif ($status.status -ne \"completed\") { throw \"Export job did not complete: $($status.status)\" }\n\nInvoke-WebRequest -Uri $status.url -OutFile \"C:\\Temp\\DeviceCompliance.zip\"\nWrite-Host \"Downloaded to C:\\Temp\\DeviceCompliance.zip\" -ForegroundColor Green"
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The export API is asynchronous: you request a job, poll until it completes, then download from the URL it returns. Report names match the portal reports — `DeviceCompliance`, `Devices`, `DeviceNonCompliance`, `AppInvRawData` and others. This is the correct way to build a scheduled report."
                }
              ]
            }
          ],
          result: {
            text: "You can produce a report on a schedule without anyone opening the portal.",
            verify: [
              { text: "An export job completed and produced a downloadable file." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand workbooks",
          steps: [
            {
              text: "Workbooks are the answer when Intune's own reports cannot express the question.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Intune reports", "Log Analytics workbooks"],
                  rows: [
                    ["Requires", "Nothing beyond Intune", "**An Azure subscription and a Log Analytics workspace**"],
                    ["Retention", "Intune's own retention", "As long as you pay to keep it"],
                    ["Query language", "None — fixed reports with filters", "KQL, fully open"],
                    ["Custom visuals", "No", "Yes — charts, grids, parameters"],
                    ["Cross-source correlation", "No", "Yes — Intune, Entra sign-ins, Defender in one query"],
                    ["Cost", "Included", "Azure ingestion and retention charges"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Workbooks need diagnostic settings on the Intune tenant to stream data into a Log Analytics workspace, and that needs an Azure subscription. This lab has none, so workbooks are reference only. Know what they require and what they unlock: long retention, custom KQL, and correlating Intune data with Entra sign-in logs — which is how you answer questions no single Intune report can."
                }
              ]
            },
            {
              text: "Note the route, for completeness:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "**Tenant administration** > **Diagnostic settings** > **Add diagnostic setting**." },
                    { text: "Select the log categories to stream — audit logs, operational logs, device compliance." },
                    { text: "Send them to a Log Analytics workspace." },
                    { text: "Build or import a workbook in the Azure portal against that workspace." }
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can state what workbooks require and when they are worth it.",
            verify: [
              { text: "You can name the prerequisite for Intune workbooks." },
              { text: "You can give one question only a workbook can answer." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A report shows a device as non-compliant although it was remediated an hour ago.",
      rootCause: "Organizational and historical reports run against aggregated data that lags behind live state.",
      diagnostic: {
        lang: "text",
        code: "Read the data-generated timestamp on the report.\nCompare with Devices > All devices > the device > Device compliance, which is live."
      },
      resolution:
        "Use an operational report or the device blade for current state. Aggregated reports are for trends and summaries, not for confirming a fix you made minutes ago."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "You need to confirm right now whether a specific device is compliant after remediating it. Which Intune reporting surface should you use?",
      options: [
        "An operational report, or the device's own compliance blade",
        "An organizational report",
        "A historical report",
        "A Log Analytics workbook"
      ],
      correctIndex: 0,
      rationale:
        "Operational reports and the device blade query live data. Organizational and historical reports run against aggregated data that lags, so a device fixed minutes ago will still appear non-compliant.",
      examTip:
        "Match freshness to the question: operational for now, organizational for a summary, historical for a trend. Reading the data-generated timestamp is a habit worth having.",
      skills: ["g5.t2.s1"]
    },
    {
      id: "q2",
      question:
        "Contoso needs a dashboard correlating Intune compliance data with Microsoft Entra sign-in logs, retained for two years. What is required?",
      options: [
        "Diagnostic settings streaming to a Log Analytics workspace, then a workbook built with KQL",
        "A historical report exported monthly to CSV",
        "The Intune report export API with a scheduled script",
        "Endpoint Analytics with a custom baseline"
      ],
      correctIndex: 0,
      rationale:
        "Correlating data across services, retaining it for years and querying it freely all require Log Analytics. Intune's own reports cover neither cross-service correlation nor multi-year retention.",
      examTip:
        "Workbooks need an Azure subscription. Any scenario mentioning long retention or correlation with other Microsoft services is pointing at Log Analytics rather than Intune reporting.",
      skills: ["g5.t2.s1"]
    }
  ]
};
