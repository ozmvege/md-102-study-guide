export default {
  id: "security-baselines",
  moduleId: "m7",
  title: "Security baselines",
  access: "hands-on",
  difficulty: "intermediate",
  estimatedMinutes: 40,

  scenario:
    "Before configuring individual security settings one at a time, apply Microsoft's opinion of a hardened Windows device. A security baseline is a large, versioned collection of recommended settings that you deploy as a unit and then customise. It is the fastest route to a defensible configuration, and its main hazard is that it collides with settings you configure elsewhere.",

  objectives: [
    "Deploy a Microsoft security baseline to a pilot group",
    "Customise a baseline setting and understand what that costs",
    "Read baseline compliance reporting",
    "Handle baseline version upgrades",
    "Predict conflicts between a baseline and a settings catalog profile"
  ],

  keyConcepts: ["Security baseline", "Baseline version", "Baseline drift", "Conflict with configuration profiles", "Pilot ring"],

  skills: [{ id: "g3.t1.s5", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm1-adele", os: "Windows 11" }
    ],
    personas: ["adele.vance", "pilot.user01"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "Deploy a baseline",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a baseline profile",
          checkpoint: true,
          steps: [
            {
              text: "Select **Endpoint security**, then **Security baselines**.",
              nav: ["Endpoint security", "Security baselines"],
              parts: [
                {
                  kind: "table",
                  headers: ["Baseline", "Covers"],
                  rows: [
                    ["Security Baseline for Windows 10 and later", "The general Windows hardening set — account policies, Defender, BitLocker, browser, credential protection"],
                    ["Microsoft Defender for Endpoint Baseline", "EDR and Defender-specific settings, aligned with the Defender portal's recommendations"],
                    ["Microsoft Edge Baseline", "Browser hardening"],
                    ["Windows 365 Security Baseline", "Cloud PC specific hardening"]
                  ]
                }
              ]
            },
            {
              text: "Open **Security Baseline for Windows 10 and later**, then select **Create profile**."
            },
            {
              text: "Name it `SB-Windows-Pilot`, then move through the settings categories. Leave everything at its recommended value on this first pass.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Deploy the baseline unmodified to a pilot ring first, then customise based on what actually breaks. Customising before you have any evidence produces a baseline that is neither Microsoft's recommendation nor a considered decision, and nobody can later say why a given setting differs."
                }
              ]
            },
            {
              text: "Note the version shown at the top of the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Baselines are versioned. Microsoft publishes new versions as guidance changes, and existing profiles stay on the version they were created with until you explicitly change them. That is deliberate — an unexpected setting change across the estate would be worse than being a version behind."
                }
              ]
            },
            {
              text: "Assign to `GRP-USR-PILOT` and create the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Do not assign a baseline to all devices on a first deployment. Baselines are opinionated and touch hundreds of settings, including credential delegation and legacy protocol behaviour. Something will break; you want that to happen to two pilot users rather than the whole organisation."
                }
              ]
            }
          ],
          result: {
            text: "A security baseline is deployed to a pilot ring at its published recommended values.",
            verify: [
              { text: "`SB-Windows-Pilot` exists with a version number shown." },
              { text: "It is assigned to a pilot group, not to all devices." }
            ]
          }
        },
        {
          id: "t2",
          title: "Read the reporting and customise one setting",
          checkpoint: true,
          steps: [
            {
              text: "Sync **MD102-VM1-Adele**, then open the baseline profile and review its status views.",
              nav: ["Endpoint security", "Security baselines", "SB-Windows-Pilot"],
              parts: [
                {
                  kind: "table",
                  headers: ["View", "Answers"],
                  rows: [
                    ["Device status", "Which devices have applied the baseline and which failed"],
                    ["Per setting status", "Which individual settings succeeded, errored or conflicted"],
                    ["Devices with errors", "The specific failures worth investigating"]
                  ]
                },
                {
                  kind: "verify",
                  text: "**Per setting status** lists individual settings. Look for anything reporting **Conflict** — that is a setting the baseline and another profile both try to control."
                }
              ]
            },
            {
              text: "Now customise deliberately. Open the profile, select **Properties**, then edit the settings and change one value with a documented reason.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Example setting", value: "Local Policies Security Options > Interactive logon: Message text for users attempting to log on" },
                    { label: "New value", value: "Your organisation's logon banner" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Record why every deviation exists, in the profile description if nowhere else. A baseline that has drifted from Microsoft's recommendation for reasons nobody remembers is worse than no baseline, because it carries the authority of one without the evidence."
                }
              ]
            }
          ],
          result: {
            text: "The baseline is applied and you can read per-setting results.",
            verify: [
              { text: "Devices report against the baseline in **Per setting status**." },
              { text: "Any deviation from the recommended value has a recorded reason." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Conflicts and versions",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Understand how baselines collide with other policy",
          checkpoint: true,
          steps: [
            {
              text: "A security baseline is, mechanically, a configuration profile. It follows configuration conflict rules exactly as lab 22 described.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "If a baseline sets a value and a settings catalog profile sets the same value differently, the result is a **conflict** and **neither applies**. The baseline does not win by virtue of being a baseline. This is the most common way a hardened-looking tenant turns out not to be hardened at all, because a conflict silently leaves the setting at whatever the device already had."
                }
              ]
            },
            {
              text: "Adopt a rule that prevents it:",
              parts: [
                {
                  kind: "table",
                  headers: ["Approach", "Consequence"],
                  rows: [
                    ["Let the baseline own a setting, and do not set it anywhere else", "**Recommended.** No conflicts, and one place to look."],
                    ["Set it in a settings catalog profile and remove it from the baseline", "Also fine, if the baseline permits removing it"],
                    ["Set it in both", "Conflict, setting unapplied, and the reporting says so only if you look at per-setting status"]
                  ]
                }
              ]
            },
            {
              text: "Check your own tenant for this now. Open **Per setting status** on the baseline and filter for **Conflict**.",
              parts: [
                {
                  kind: "verify",
                  text: "Any conflicts are listed with the setting name. Resolve each by deciding which profile owns it and removing it from the other."
                }
              ]
            },
            {
              text: "Finally, understand version upgrades:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Open the baseline profile and select **Versions**." },
                    { text: "Compare your version with the latest available and review the change list." },
                    { text: "Select **Change version** to move the profile to a newer baseline, choosing whether to keep your customisations." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Review the change list before upgrading. A new baseline version can introduce settings that break an application you depend on, and it applies to every device the profile targets at once. Upgrade the pilot ring first, exactly as you deployed it."
                }
              ]
            }
          ],
          result: {
            text: "You can predict and resolve baseline conflicts and upgrade a baseline safely.",
            verify: [
              { text: "No settings report **Conflict** on your baseline." },
              { text: "You can state which profile wins when a baseline and a settings catalog profile disagree." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A security baseline is deployed but several settings report Conflict and are not applied.",
      rootCause: "Another configuration profile sets the same settings to different values. Baselines have no precedence over ordinary profiles.",
      diagnostic: {
        lang: "text",
        code: "Endpoint security > Security baselines > open the profile > Per setting status\nFilter for Conflict and note the setting names, then search Devices > Configuration for profiles setting the same values."
      },
      resolution:
        "Decide which profile owns each setting and remove it from the other. A setting configured in exactly one place cannot conflict."
    }
  ],

  quiz: [
    {
      question:
        "A security baseline and a settings catalog profile both configure the same setting to different values on the same device. What happens?",
      options: [
        "The setting reports a conflict and neither value is applied",
        "The security baseline takes precedence",
        "The most restrictive value is applied",
        "The settings catalog profile takes precedence because it is more specific"
      ],
      correctIndex: 0,
      rationale:
        "A baseline is a configuration profile and follows the same conflict rules. Conflicting device configuration leaves the setting unapplied, with no winner — so a device can appear hardened while the setting remains at its default.",
      examTip:
        "Baselines carry no special precedence. Give each setting exactly one owner, and check per-setting status for conflicts after any baseline deployment.",
      skills: ["g3.t1.s5"]
    }
  ]
};
