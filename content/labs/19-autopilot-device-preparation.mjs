export default {
  id: "autopilot-device-preparation",
  moduleId: "m3",
  title: "Windows Autopilot device preparation",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 55,

  scenario:
    "Classic Autopilot depends on a hardware hash being uploaded before the device is ever switched on, and in practice that is the part organisations cannot manage — reused hardware, devices bought retail, machines already imaged. Device preparation removes the requirement entirely: any device that reaches the out-of-box experience and signs in with a targeted user provisions itself. You will build it, including the group-owner step that has no visible failure mode when you skip it.",

  objectives: [
    "Create a device group owned by the Intune Provisioning Client service principal",
    "Create and assign a device preparation policy",
    "Deploy a device with no prior registration",
    "Compare the result with a classic Autopilot deployment"
  ],

  keyConcepts: ["Device preparation policy", "Intune Provisioning Client", "Group owner", "No hardware hash", "User-targeted assignment"],

  skills: [{ id: "g2.t1.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm3-megan", os: "Windows 11 Pro at OOBE" }
    ],
    personas: ["megan.bowen"],
    labs: ["autopilot-user-driven"]
  },

  exercises: [
    {
      id: "e1",
      title: "Prepare the device group",
      intro:
        "This exercise is entirely about one setting. Skip it and the deployment fails late, with an error that points nowhere useful.",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Create the group and assign the service principal as owner",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Entra admin center**, select **Groups**, then **New group**.",
              nav: ["Groups", "All groups", "New group"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Group type", value: "Security" },
                    { label: "Group name", value: "GRP-DEV-DEVICEPREP" },
                    { label: "Membership type", value: "Assigned", note: "Must be Assigned. The provisioning service adds devices itself, which it cannot do to a dynamic group." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "A dynamic group will not work here and the portal will not stop you choosing one. The service needs to write membership, and dynamic membership is computed rather than written."
                }
              ]
            },
            {
              text: "Create the group, then reopen it and select **Owners**, then **Add owners**.",
              nav: ["Groups", "GRP-DEV-DEVICEPREP", "Owners", "Add owners"]
            },
            {
              text: "Search for `Intune Provisioning Client` and add it as an owner.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is the step. **Intune Provisioning Client** is the service principal that adds each device to the group during provisioning. Without ownership it has no write permission, membership is never granted, the policy is never considered to apply, and the deployment fails with nothing in the message about groups or owners. If a device preparation deployment fails and you have checked everything else, check this."
                },
                {
                  kind: "verify",
                  text: "**Owners** lists **Intune Provisioning Client**."
                }
              ]
            }
          ],
          result: {
            text: "A device group exists that the provisioning service can write to.",
            verify: [
              { text: "`GRP-DEV-DEVICEPREP` has membership type **Assigned**." },
              { text: "**Intune Provisioning Client** is an owner." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Create the device preparation policy",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Build and assign the policy",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Enrollment**, **Windows**, then **Device preparation policies**, then **Create**.",
              nav: ["Devices", "Enrollment", "Windows", "Device preparation policies", "Create"]
            },
            {
              text: "On **Basics**, name it `DP-Corporate-Standard`."
            },
            {
              text: "On **Configuration settings**:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Deployment mode", value: "User-driven", note: "The only mode device preparation supports." },
                    { label: "Deployment type", value: "Single user" },
                    { label: "Join type", value: "Microsoft Entra joined", note: "Hybrid join is not supported at all." },
                    { label: "Device group", value: "GRP-DEV-DEVICEPREP", note: "The group you just created and gave the service principal ownership of." },
                    { label: "Device name template", value: "CTS-DP-%RAND:5%" },
                    { label: "Allow users to skip setup after error", value: "Yes" }
                  ]
                }
              ]
            },
            {
              text: "On **Applications**, add up to 10 applications to install during provisioning. Skip this for now — module 6 creates applications.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Device preparation caps this at 10 applications and 10 scripts by design, and reports progress per item rather than as one opaque wait. That constraint is deliberate: the classic Enrollment Status Page allowed an unbounded blocking list, which is how deployments ended up timing out."
                }
              ]
            },
            {
              text: "On **Assignments**, assign the policy to `GRP-USR-HR`.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "Note what is being targeted. A classic Autopilot deployment profile is assigned to a **device** group; a device preparation policy is assigned to a **user** group. That inversion is one of the cleanest exam discriminators between the two models."
                }
              ]
            },
            {
              text: "Create the policy."
            }
          ],
          result: {
            text: "A device preparation policy targets HR users and will place their devices in the prepared group.",
            verify: [
              { text: "The policy is assigned to a user group, not a device group." },
              { text: "The device group named in the policy is the one owned by the provisioning service." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Deploy a device with no registration",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Deploy VM3 without a hardware hash",
          checkpoint: true,
          steps: [
            {
              text: "First remove VM3's Autopilot registration so the classic profile cannot claim it.",
              nav: ["Devices", "Enrollment", "Devices"],
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Find the device by serial number and select **Delete**." },
                    { text: "Also delete the device object under **Devices** > **All devices** and in Microsoft Entra ID." },
                    { text: "Wait a few minutes for deletion to propagate." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "warning",
                  text: "If the Autopilot registration survives, the device will use the classic profile from lab 17 and you will conclude, wrongly, that device preparation does not work. Both records must be gone."
                }
              ]
            },
            {
              text: "Revert VM3 to the clean checkpoint and start it:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "On the host",
                  code: "Restore-VMCheckpoint -Name \"OOBE-Clean\" -VMName MD102-VM3-Megan -Confirm:$false\nStart-VM -Name MD102-VM3-Megan"
                }
              ]
            },
            {
              text: "Work through region, keyboard and network, then at the sign-in screen choose **Set up for work or school** and sign in as `megan.bowen@<tenant>.onmicrosoft.com`.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Unlike classic Autopilot there is no branded screen before sign-in, because the service has no idea which device this is until a user identifies themselves. Recognition happens *after* authentication — which is precisely why no hardware hash is needed."
                }
              ]
            },
            {
              text: "Device preparation takes over after sign-in and shows its own progress screen.",
              parts: [
                {
                  kind: "verify",
                  text: "A provisioning screen appears listing security setup, device preparation and application installation as separate tracked items."
                }
              ]
            },
            {
              text: "When the desktop appears, verify:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "hostname\ndsregcmd /status | Select-String \"AzureAdJoined|MdmUrl\""
                },
                {
                  kind: "verify",
                  text: "The name matches the `CTS-DP-` template and the device is Entra joined and enrolled."
                }
              ]
            },
            {
              text: "Confirm the service principal did its job:",
              nav: ["Groups", "GRP-DEV-DEVICEPREP", "Members"],
              parts: [
                {
                  kind: "verify",
                  text: "The new device is a member of the group. **Intune Provisioning Client** added it during provisioning — if this is empty, the owner assignment was missing."
                }
              ]
            }
          ],
          result: {
            text: "A device provisioned with no prior registration of any kind.",
            verify: [
              { text: "The device is Entra joined, Intune enrolled and named from the template." },
              { text: "It is a member of `GRP-DEV-DEVICEPREP`." },
              { text: "It was never registered with the Autopilot service." }
            ]
          }
        },
        {
          id: "t2",
          title: "Compare the two models",
          steps: [
            {
              text: "Having run both, record the differences you actually observed.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Classic Autopilot (lab 17)", "Device preparation (this lab)"],
                  rows: [
                    ["Preparation before power-on", "Hardware hash captured and imported", "None"],
                    ["Branding before sign-in", "Organisation shown on the sign-in screen", "Standard Windows sign-in"],
                    ["Recognition point", "Before authentication, by hardware hash", "After authentication, by user group membership"],
                    ["Policy assigned to", "Device group", "User group"],
                    ["Device group role", "Populated automatically from registration", "Populated by the provisioning service, which must own it"],
                    ["Modes available", "User-driven, pre-provisioning, self-deploying", "User-driven only"],
                    ["Hybrid join", "Supported for user-driven", "Not supported"]
                  ]
                }
              ]
            }
          ],
          result: {
            text: "You can articulate the difference between the two models from experience rather than theory.",
            verify: [{ text: "You can state at which point in the flow each model identifies the device." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "Device preparation fails partway through, and the device group has no members.",
      rootCause:
        "The **Intune Provisioning Client** service principal is not an owner of the device group, so it cannot add the device to it.",
      diagnostic: {
        lang: "text",
        code: "Entra admin center > Groups > the device group > Owners\nConfirm Intune Provisioning Client is listed."
      },
      resolution:
        "Add **Intune Provisioning Client** as a group owner and redeploy. Also confirm the group is Assigned rather than Dynamic — the service cannot write membership to a dynamic group."
    }
  ],

  quiz: [
    {
      question:
        "A Windows Autopilot device preparation deployment fails and the target device group is empty. Configuration otherwise looks correct. What should you check?",
      options: [
        "That the Intune Provisioning Client service principal is an owner of the device group",
        "That the device's hardware hash has been imported",
        "That the policy is assigned to a device group",
        "That the deployment mode is set to self-deploying"
      ],
      correctIndex: 0,
      rationale:
        "The provisioning service adds the device to the group during deployment, which requires ownership of that group. Device preparation needs no hardware hash, is assigned to a user group, and supports user-driven mode only.",
      examTip:
        "Memorise this prerequisite. It is unique to device preparation, has no equivalent in classic Autopilot, and produces a failure that names nothing useful.",
      skills: ["g2.t1.s1"]
    }
  ]
};
