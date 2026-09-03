export default {
  id: "filters-and-enrollment-time-grouping",
  moduleId: "m4",
  title: "Assignment filters and enrollment time grouping",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "You have a profile that should reach corporate Windows devices but only the ones running Enterprise, and only the physical ones. Building a group for every combination produces group sprawl nobody can maintain. Assignment filters solve this by narrowing an existing assignment at evaluation time. Enrollment time grouping solves a different problem: getting a device into the right group during Autopilot, before the dynamic group has caught up.",

  objectives: [
    "Create an assignment filter using device properties",
    "Apply a filter in include and exclude mode",
    "Explain why filters are preferable to proliferating groups",
    "Describe enrollment time grouping and the problem it solves",
    "Predict the outcome when a filter and a group exclusion interact"
  ],

  keyConcepts: ["Assignment filter", "Filter include mode", "Filter exclude mode", "Enrollment time grouping", "Static group during Autopilot"],

  skills: [{ id: "g2.t2.s6", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["adele.vance"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Create and apply an assignment filter",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Build a filter for Windows Enterprise devices",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Assignment filters**, then **Create**.",
              nav: ["Tenant administration", "Assignment filters", "Create"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "FLT-Windows-Enterprise-Physical" },
                    { label: "Platform", value: "Windows 10 and later", note: "A filter is bound to one platform and cannot be reused across platforms." }
                  ]
                }
              ]
            },
            {
              text: "On **Rules**, build the expression:",
              parts: [
                {
                  kind: "code",
                  lang: "text",
                  caption: "Enterprise edition, not a virtual machine",
                  code: "(device.skuFamily -eq \"Enterprise\") and (device.model -notContains \"Virtual\")",
                  copyable: true
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Filter rules use device properties Intune knows about — `operatingSystemVersion`, `manufacturer`, `model`, `deviceOwnership`, `enrollmentProfileName`, `osVersion`, `skuFamily` and others. They are *not* the same property set as Microsoft Entra dynamic group rules, which is a genuine source of confusion. Use the rule builder rather than typing from memory."
                }
              ]
            },
            {
              text: "Select **Preview devices** to see which of your devices match before you rely on it.",
              parts: [
                {
                  kind: "verify",
                  text: "Your Hyper-V virtual machines are excluded by the model clause. Remove that clause if you want the filter to match your lab devices for the next task."
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "**Preview devices** is the equivalent of Validate Rules for dynamic groups, and it is the difference between knowing a filter works and hoping it does. Always preview before assigning."
                }
              ]
            },
            {
              text: "Save the filter."
            }
          ],
          result: {
            text: "A reusable filter exists that narrows any Windows assignment.",
            verify: [
              { text: "The filter appears under **Tenant administration** > **Assignment filters**." },
              { text: "**Preview devices** returns the devices you expect." }
            ]
          }
        },
        {
          id: "t2",
          title: "Apply the filter in both modes",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, then **Configuration**, select **WIN-OneDrive-KFM** from the list, select **Properties**, then next to **Assignments** select **Edit**.",
              nav: ["Devices", "Configuration", "WIN-OneDrive-KFM", "Properties", "Assignments", "Edit"]
            },
            {
              text: "On the included group, select **Edit filter**, then choose:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Filter mode", value: "Include" },
                    { label: "Filter", value: "FLT-Windows-Enterprise-Physical" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Read the resulting assignment as a sentence: *apply to members of `GRP-DEV-WIN-CORP` **that also match** this filter*. Include mode narrows the group; exclude mode removes matching devices from it. The filter never adds devices that are not already in the assigned group."
                }
              ]
            },
            {
              text: "Save, then check the profile's device status to see the effect."
            },
            {
              text: "Now consider the interaction the exam tests:",
              parts: [
                {
                  kind: "table",
                  headers: ["Situation", "Outcome"],
                  rows: [
                    ["Device in included group, matches include filter", "Profile applies"],
                    ["Device in included group, does not match include filter", "Profile does not apply"],
                    ["Device in included group, matches exclude filter", "Profile does not apply"],
                    ["Device in an excluded **group**, matches include filter", "Profile does not apply — group exclusion beats everything"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Group exclusion is evaluated before filters and always wins. A filter can never rescue a device that a group exclusion has removed."
                }
              ]
            },
            {
              text: "Note why filters exist at all:",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Without filters, every combination of platform, edition, ownership and model needs its own dynamic group. Filters let one group serve many assignments, each narrowed differently, so the group structure stays comprehensible. That is the answer to *why not just make another group* in an exam question."
                }
              ]
            }
          ],
          result: {
            text: "The profile targets a group narrowed by a filter, and you can predict the outcome for any device.",
            verify: [
              { text: "The assignment shows a filter in include mode." },
              { text: "You can state what happens when a group exclusion and an include filter disagree." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Enrollment time grouping",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Understand the problem and the fix",
          checkpoint: true,
          steps: [
            {
              text: "Consider what happens during an Autopilot deployment with dynamic groups.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Dynamic group membership is evaluated asynchronously and can take minutes. During Autopilot the device needs its policy *now*, at the Enrollment Status Page. A device that is not yet in `GRP-DEV-WIN-CORP` when the page evaluates receives none of the profiles assigned to it, and either times out or reaches the desktop unconfigured."
                }
              ]
            },
            {
              text: "Enrollment time grouping removes the race. In an Autopilot device preparation policy, the device group is populated by the provisioning service during enrollment rather than by rule evaluation afterwards.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Dynamic group", "Enrollment time grouping"],
                  rows: [
                    ["Membership decided by", "A rule evaluated periodically", "The provisioning service, during enrollment"],
                    ["Timing", "Minutes to hours after the device object appears", "Immediate, before the Enrollment Status Page evaluates"],
                    ["Group type required", "Dynamic Device", "Assigned, owned by Intune Provisioning Client"],
                    ["Configured in", "Microsoft Entra ID", "The Autopilot device preparation policy"],
                    ["Solves", "Ongoing classification of the estate", "Getting policy onto a device during provisioning"]
                  ]
                }
              ]
            },
            {
              text: "In the **Microsoft Entra admin center**, select **Identity**, then **Groups**, then **All groups**, select **GRP-DEV-DEVICEPREP**, then select **Owners** to confirm the group you built in lab 19 is exactly this mechanism.",
              nav: ["Identity", "Groups", "All groups", "GRP-DEV-DEVICEPREP", "Owners"],
              parts: [
                {
                  kind: "verify",
                  text: "**Intune Provisioning Client** is an owner, and the membership type is **Assigned**. This is enrollment time grouping — the device preparation policy names this group, and the service writes the device into it during provisioning."
                }
              ]
            },
            {
              text: "Assign a profile to that group so provisioning-time policy actually exists:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Under **Devices** > **Configuration**, select `WIN-OneDrive-KFM`, select **Properties**, and edit its assignments." },
                    { text: "Add `GRP-DEV-DEVICEPREP` as a second included group." },
                    { text: "Save." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "Now a device provisioned by device preparation receives OneDrive configuration during the Enrollment Status Page rather than an hour later, because its group membership is written at enrollment rather than computed afterwards."
                }
              ]
            }
          ],
          result: {
            text: "You can explain enrollment time grouping and have policy targeting the group it populates.",
            verify: [
              { text: "`GRP-DEV-DEVICEPREP` is an included group on at least one configuration profile." },
              { text: "You can state the race condition it eliminates." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A profile with an assignment filter applies to no devices at all.",
      rootCause:
        "The filter rule uses a property or value that matches nothing — often a `model` or `skuFamily` string that does not match what Intune actually reports for the hardware.",
      diagnostic: {
        lang: "text",
        code: "Tenant administration > Assignment filters > open the filter > Preview devices\nCompare with Devices > All devices > open a device > Hardware, to see the real property values."
      },
      resolution:
        "Use **Preview devices** and correct the rule against the actual reported values. Filter properties are not the same set as Microsoft Entra dynamic group properties, so a rule copied from a group rule will usually not work."
    }
  ],

  quiz: [
    {
      id: "q1",
      question:
        "A configuration profile is assigned to a group with an include filter. A device is a member of that group, matches the filter, and is also a member of a group excluded from the same profile. What does the device receive?",
      options: [
        "Nothing — group exclusion is evaluated before filters and always wins",
        "The profile, because the include filter matched",
        "The profile, with filtered settings only",
        "Nothing, and the assignment is reported as a conflict"
      ],
      correctIndex: 0,
      rationale:
        "Group exclusion takes precedence over both group inclusion and any filter. A filter narrows an assignment; it cannot restore a device that exclusion has removed.",
      examTip:
        "The evaluation order is: group exclusion first, then group inclusion, then the filter. Work through it in that order for any assignment question.",
      skills: ["g2.t2.s6"]
    },
    {
      id: "q2",
      question:
        "During Autopilot deployments, devices frequently reach the desktop without their configuration profiles, because dynamic group membership has not yet been evaluated. Which feature addresses this?",
      options: [
        "Enrollment time grouping, using a group owned by the Intune Provisioning Client",
        "An assignment filter in include mode",
        "Reducing the dynamic group rule to a single clause",
        "Increasing the Enrollment Status Page timeout"
      ],
      correctIndex: 0,
      rationale:
        "Enrollment time grouping has the provisioning service write group membership during enrollment, so policy targeting that group is available while the Enrollment Status Page is still running. Filters do not affect timing, and a longer timeout only waits longer for membership that may still not arrive.",
      examTip:
        "Filters narrow *which* devices get a policy. Enrollment time grouping fixes *when* they are eligible for it. Questions about timing during provisioning point at the latter.",
      skills: ["g2.t2.s6"]
    }
  ]
};
