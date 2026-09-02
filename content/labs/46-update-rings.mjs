export default {
  id: "update-rings",
  moduleId: "m8",
  title: "Update rings and Delivery Optimization",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "Contoso needs Windows updates to arrive predictably, tested before they reach everybody, and without saturating the office internet connection every Patch Tuesday. Update rings answer the first two by staging deployment across groups with different deferrals. Delivery Optimization answers the third by letting devices share content with each other instead of each downloading the same gigabyte.",

  objectives: [
    "Plan a ring structure and explain what deferral actually does",
    "Create pilot and broad update rings with different deferrals",
    "Configure deadlines, grace periods and restart behaviour",
    "Configure Delivery Optimization peer caching",
    "Pause a ring in response to a bad update"
  ],

  keyConcepts: ["Update ring", "Quality update deferral", "Feature update deferral", "Deadline", "Grace period", "Delivery Optimization", "Pause"],

  skills: [
    { id: "g3.t2.s1", depth: "primary" },
    { id: "g3.t2.s2", depth: "primary" },
    { id: "g3.t2.s6", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "nestor.wilke", "pilot.user01"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Plan and build the rings",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Design the ring structure",
          steps: [
            {
              text: "A ring is a group of devices with a deferral. Staging deferrals means a bad update reaches a few people before it reaches everyone.",
              parts: [
                {
                  kind: "table",
                  headers: ["Ring", "Population", "Quality deferral", "Feature deferral", "Purpose"],
                  rows: [
                    ["Ring 0 — Preview", "IT only", "0 days", "0 days", "Sees problems first, and can fix them"],
                    ["Ring 1 — Pilot", "~5% of the estate", "3 days", "14 days", "Real users, varied hardware, still small enough to recover"],
                    ["Ring 2 — Broad", "Everyone else", "7 days", "30 days", "Only receives updates that survived the earlier rings"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "A deferral delays when a device is *offered* an update, counting from its release date. It does not pause an update that has already been offered. If a bad update is already on devices, deferral does nothing — you need **Pause**, which is a separate control covered in the last task."
                }
              ]
            }
          ],
          result: {
            text: "You can explain the difference between deferral and pause.",
            verify: [{ text: "You can state what deferral does not protect against." }]
          }
        },
        {
          id: "t2",
          title: "Create the pilot and broad rings",
          checkpoint: true,
          steps: [
            {
              text: "Select **Devices**, **Windows updates**, then **Update rings**, then **Create profile**.",
              nav: ["Devices", "Windows updates", "Update rings", "Create profile"]
            },
            {
              text: "On the **Basics** tab, enter Name `RING-1-Pilot`, then on the **Update ring settings** tab configure the update settings:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "RING-1-Pilot" },
                    { label: "Servicing channel", value: "General Availability Channel" },
                    { label: "Microsoft product updates", value: "Allow", note: "Includes updates for Office and other Microsoft products." },
                    { label: "Windows drivers", value: "Allow" },
                    { label: "Quality update deferral period (days)", value: "3" },
                    { label: "Feature update deferral period (days)", value: "14" },
                    { label: "Set feature update uninstall period (2-60 days)", value: "20" },
                    { label: "Enable pre-release builds", value: "Not configured" }
                  ]
                }
              ]
            },
            {
              text: "Configure the user experience through the wizard tabs (which decides how much the update is allowed to interrupt):",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Automatic update behavior", value: "Auto install and restart at maintenance time" },
                    { label: "Active hours start", value: "8 AM" },
                    { label: "Active hours end", value: "6 PM" },
                    { label: "Restart checks", value: "Allow", note: "Skips a restart if the user is presenting, on battery, or in a call." },
                    { label: "Option to pause Windows updates", value: "Disable" },
                    { label: "Option to check for Windows updates", value: "Enable" },
                    { label: "Deadline for quality updates (days)", value: "3" },
                    { label: "Deadline for feature updates (days)", value: "7" },
                    { label: "Grace period (days)", value: "2" },
                    { label: "Auto reboot before deadline", value: "Yes" }
                  ]
                },
                {
                  kind: "substeps",
                  items: [
                    { text: "On the **Basics** tab, enter Name `RING-1-Pilot`, then select **Next**." },
                    { text: "On the **Update ring settings** tab, configure the update settings and user experience fields above, then select **Next**." },
                    { text: "On the **Scope tags** tab, leave **Default**, then select **Next**." },
                    { text: "On the **Assignments** tab, assign to `GRP-USR-PILOT`, then select **Next**." },
                    { text: "On the **Review + create** tab, select **Create**." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Deadline** and **grace period** work together and are frequently confused. The deadline is how long a device may defer restarting after an update is ready. The grace period is a minimum guaranteed window after installation, regardless of the deadline — so a laptop that has been switched off for a fortnight is not forced to restart the instant it powers on. Both are needed for a humane policy."
                }
              ]
            },
            {
              text: "Create the broad ring the same way, named `RING-2-Broad`, with quality deferral **7**, feature deferral **30**, and assign it to `GRP-USR-BROAD`.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "A device can only be in one update ring. If two rings target the same device, Intune picks one and reports a conflict, and the outcome is not predictable. Keep ring membership mutually exclusive — this is a good reason to use assigned groups for rings rather than overlapping dynamic ones."
                }
              ]
            }
          ],
          result: {
            text: "Two update rings stage deployment across the estate.",
            verify: [
              { text: "Both rings exist with different deferrals." },
              { text: "No device is a member of both rings." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Delivery Optimization and pausing",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Configure peer caching",
          checkpoint: true,
          steps: [
            {
              text: "Create a settings catalog profile named `WIN-DeliveryOptimization`: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, type **Settings catalog**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Search for `Delivery Optimization` and configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Download Mode", value: "HTTP blended with peering behind the same NAT (1)", note: "Devices share with peers on the same network. Mode 2 uses a group ID; mode 0 disables peering entirely." },
                    { label: "Maximum Background Download Bandwidth (percentage)", value: "50" },
                    { label: "Minimum RAM (inclusive) allowed to use Peer Caching", value: "4" },
                    { label: "Minimum Disk Size Allowed to Use Peer Caching (GB)", value: "64" },
                    { label: "Maximum Cache Age (seconds)", value: "259200", note: "Three days." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Delivery Optimization is the answer to *how do we stop 200 devices each downloading the same 3 GB feature update*. One device downloads from Microsoft and the rest pull from it over the local network. On a branch office with a thin connection this is the difference between an update landing overnight and saturating the link for a day."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the profile, then on **MD102-VM1-Adele** open PowerShell and verify Delivery Optimization:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-DeliveryOptimizationStatus | Select-Object -First 5 FileId, FileSize, BytesFromPeers, BytesFromHttp\nGet-DeliveryOptimizationPerfSnap"
                }
              ]
            }
          ],
          result: {
            text: "Devices share update content with peers instead of each downloading from Microsoft.",
            verify: [
              { text: "The Delivery Optimization profile reports **Succeeded**." }
            ]
          }
        },
        {
          id: "t2",
          title: "Pause a ring",
          checkpoint: true,
          steps: [
            {
              text: "Open `RING-2-Broad` and note the **Pause** option on the overview.",
              nav: ["Devices", "Windows updates", "Update rings", "RING-2-Broad"]
            },
            {
              text: "Select **Pause**, then choose **Quality updates**.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Pause duration", value: "Up to 35 days", note: "The maximum. After that the ring resumes automatically." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is what you reach for when a quality update is causing problems in the pilot ring and you need to stop it reaching everyone else. Quality and feature updates pause independently, so you can hold back a bad cumulative update without also freezing feature deployment. Pausing is reversible with **Resume** at any time."
                }
              ]
            },
            {
              text: "Resume the ring so it does not stay paused for the rest of the course.",
              parts: [
                {
                  kind: "verify",
                  text: "The ring shows as active again with its normal deferrals."
                }
              ]
            }
          ],
          result: {
            text: "You can stop an update reaching the broad population and resume it afterwards.",
            verify: [
              { text: "You paused and resumed a ring." },
              { text: "You can state the maximum pause duration." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A device is not receiving updates and its update ring shows a conflict.",
      rootCause: "The device is targeted by two update rings. Only one can apply and the outcome is not predictable.",
      diagnostic: {
        lang: "text",
        code: "Devices > Windows updates > Update rings > open each ring > Device status\nFind the device in more than one ring."
      },
      resolution:
        "Remove the device from all but one ring. Use mutually exclusive assigned groups for ring membership rather than overlapping dynamic groups."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A quality update released three days ago is causing crashes on pilot devices. You need to prevent it reaching the broad ring, which has a 7-day quality deferral. What should you do?",
      options: [
        "Pause quality updates on the broad ring",
        "Increase the broad ring's quality update deferral to 14 days",
        "Set the broad ring's servicing channel to Semi-Annual",
        "Remove the broad ring assignment"
      ],
      correctIndex: 0,
      rationale:
        "Pause immediately stops updates being offered to that ring, for up to 35 days. Changing the deferral shifts the offer window relative to the release date but is a less direct control and can behave unexpectedly for updates already in flight.",
      examTip:
        "Deferral is planning; pause is incident response. Any scenario describing a bad update already in the wild is asking about pause.",
      skills: ["g3.t2.s2"]
    },
    {
      id: "q2",
      question:
        "What is the purpose of the grace period setting in an update ring?",
      options: [
        "It guarantees a minimum time after installation before a restart is forced, regardless of the deadline",
        "It extends the deferral period for devices that are offline",
        "It delays when the update is offered to the device",
        "It allows users to pause updates for a set number of days"
      ],
      correctIndex: 0,
      rationale:
        "The grace period is a floor. A device that comes back online long after the deadline has passed still gets the guaranteed grace window before being restarted, rather than being restarted immediately.",
      examTip:
        "Deadline is the maximum a user can defer a restart; grace period is the minimum they are guaranteed. Both together produce a policy that is enforceable and not hostile.",
      skills: ["g3.t2.s1"]
    }
  ]
};
