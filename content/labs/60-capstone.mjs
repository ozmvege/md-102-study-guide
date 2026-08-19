export default {
  id: "capstone",
  moduleId: "m12",
  title: "Capstone: rebuild the estate, then close your gaps",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 180,
  nonExam: true,

  scenario:
    "Contoso is opening a second office. You have one working day to bring twenty new starters and their devices into management, secured, compliant and productive — with no guide open in front of you. Three faults have been injected into the process and you are not told what they are. Then, once the estate is standing, you close the gaps the coverage view says you still have.",

  objectives: [
    "Rebuild the essential estate configuration from memory against a deadline",
    "Diagnose three injected faults using only the tools and logs from earlier labs",
    "Identify your weakest exam domains from your own quiz results",
    "Produce a written revision plan grounded in evidence rather than impression"
  ],

  keyConcepts: ["Integration", "Fault diagnosis", "Exam readiness", "Weighted revision", "Coverage review"],

  skills: [],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [
      { kind: "portal", id: "Microsoft Intune admin center" },
      { kind: "vm", id: "vm3-megan", os: "Windows 11 at OOBE" }
    ],
    personas: ["staging.user01", "megan.bowen"],
    labs: ["intune-suite-capabilities", "remote-actions", "tenant-health-and-alerts"]
  },

  exercises: [
    {
      id: "e1",
      title: "The build",
      intro:
        "Work from the requirements below, not from the earlier labs. Open a lab only when you are genuinely stuck — noticing which lab you had to open is itself a useful result.",
      estimatedMinutes: 90,
      tasks: [
        {
          id: "t1",
          title: "Deliver the requirements",
          checkpoint: true,
          steps: [
            {
              text: "Contoso Nord requires the following. Build it.",
              parts: [
                {
                  kind: "table",
                  headers: ["#", "Requirement"],
                  rows: [
                    ["1", "A new user, `nord.starter01`, licensed through group-based licensing with the reserve intact"],
                    ["2", "A dynamic device group containing only corporate-owned Windows devices in the Nord office"],
                    ["3", "A Windows device provisioned with no hardware hash available, named `NORD-` plus five random digits"],
                    ["4", "The device a standard user, not a local administrator"],
                    ["5", "BitLocker encrypted silently, with the recovery key escrowed before encryption starts"],
                    ["6", "A compliance policy requiring encryption, Secure Boot, firewall and antivirus, with a 5-day grace period"],
                    ["7", "Conditional Access requiring a compliant device for Office 365, with the emergency account excluded"],
                    ["8", "Microsoft 365 Apps deployed on Monthly Enterprise Channel"],
                    ["9", "An update ring with 3-day quality and 14-day feature deferrals"],
                    ["10", "Attack surface reduction rules in audit mode, and Defender antivirus with tamper protection"],
                    ["11", "A proactive remediation that runs daily and reports its findings"],
                    ["12", "An alert rule for enrollment failures, notifying a shared address"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Work in the order the course taught: identity, then enrollment, then provisioning, then configuration, then compliance and access, then applications, then protection, then operations. That order exists because each stage depends on the one before it, and rebuilding it from memory is the point of the exercise."
                }
              ]
            },
            {
              text: "Record how long each stage takes. Anywhere you have to reopen a lab is a topic to revise."
            }
          ],
          result: {
            text: "The estate is standing and meets all twelve requirements.",
            verify: [
              { text: "A device provisioned itself, is compliant, encrypted and named to the template." },
              { text: "A non-compliant device is refused access to Office 365." },
              { text: "You have a written list of the labs you had to reopen." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "The three faults",
      intro:
        "Introduce each fault, then diagnose it as though you did not know it was there. Work from symptom to cause using the logs and blades, not from the answer.",
      estimatedMinutes: 60,
      tasks: [
        {
          id: "t1",
          title: "Fault one: an application that installs and fails",
          checkpoint: true,
          steps: [
            {
              text: "Deploy any Win32 application, then change its detection rule to a path that does not exist. Assign it and let it run."
            },
            {
              text: "Diagnose from the symptom. Do not look at what you changed.",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Read the reported status and error code in the app's device install status." },
                    { text: "Confirm on the device whether the software is actually present." },
                    { text: "Find the evidence in the client logs and name the exact log file." },
                    { text: "State the root cause in one sentence, then fix it." }
                  ]
                },
                {
                  kind: "verify",
                  text: "You identified the error code, found the detection evaluation in the logs, and can name the log file from memory."
                }
              ]
            }
          ],
          result: {
            text: "Fault one diagnosed from symptom to root cause.",
            verify: [
              { text: "You can state the error code and what it means." },
              { text: "You named the correct log file without looking it up." }
            ]
          }
        },
        {
          id: "t2",
          title: "Fault two: a user who cannot enrol",
          checkpoint: true,
          steps: [
            {
              text: "Remove `staging.user01` from the licensing group and wait for the licence to be revoked. Then attempt to enrol a device as that user."
            },
            {
              text: "Diagnose it:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Record the error code the client reports." },
                    { text: "Use the Troubleshooting blade rather than guessing." },
                    { text: "Name the two other enrollment codes and what distinguishes them from this one." },
                    { text: "Fix it and confirm enrollment succeeds." }
                  ]
                },
                {
                  kind: "verify",
                  text: "You identified the code, found the cause in the Troubleshooting blade, and can distinguish it from the restriction and device-limit codes."
                }
              ]
            }
          ],
          result: {
            text: "Fault two diagnosed and the three enrollment codes distinguished.",
            verify: [
              { text: "You can state all three enrollment error codes and their causes." }
            ]
          }
        },
        {
          id: "t3",
          title: "Fault three: a setting that will not apply",
          checkpoint: true,
          steps: [
            {
              text: "Create a second configuration profile setting a value you have already configured elsewhere to the opposite value, and assign it to the same group."
            },
            {
              text: "Diagnose it:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "Find the status that identifies this class of problem." },
                    { text: "State what value the device ends up with, and why." },
                    { text: "Contrast this with how a compliance policy would resolve the same disagreement." },
                    { text: "Resolve it by deciding which profile owns the setting." }
                  ]
                },
                {
                  kind: "verify",
                  text: "You found the conflict in per-setting status, and can state the three different resolution models for configuration, compliance and enrollment restrictions."
                }
              ]
            }
          ],
          result: {
            text: "Fault three diagnosed and the three conflict-resolution models articulated.",
            verify: [
              { text: "You can explain what a device does with a conflicting configuration setting." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Exam readiness",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Find your weak domains from evidence",
          checkpoint: true,
          steps: [
            {
              text: "Open the **Objective coverage** view in this site.",
              parts: [
                {
                  kind: "callout",
                  variant: "important",
                  text: "The coverage view shows every skill bullet, which labs teach it, and your own quiz accuracy per bullet. That last column is the useful one — it is evidence about you rather than about the curriculum, and it is more reliable than your impression of which topics you know."
                }
              ]
            },
            {
              text: "Work through it systematically:",
              parts: [
                {
                  kind: "substeps",
                  items: [
                    { text: "List every bullet where your quiz accuracy is below 100 percent." },
                    { text: "List every bullet you have not answered a question on at all." },
                    { text: "Note which exam group each falls in, and that group's weight." },
                    { text: "Order the list by group weight, heaviest first." }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Exam group", "Weight", "Revise first if weak"],
                  rows: [
                    ["Manage and maintain devices", "25–30%", "Highest priority — the largest single block of marks"],
                    ["Prepare infrastructure for devices", "20–25%", "Second"],
                    ["Protect devices", "15–20%", "Third"],
                    ["Manage and secure applications", "15–20%", "Third"],
                    ["Optimize endpoint operations", "10–15%", "Last, but do not skip — it is entirely new and often neglected"]
                  ]
                }
              ]
            },
            {
              text: "Write a revision plan. One line per weak bullet: the bullet, the lab that teaches it, and what specifically you could not answer.",
              parts: [
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Be specific. *Revise compliance* is not a plan. *g1.t3.s4 — I could not state how compliance conflicts resolve differently from configuration conflicts, lab 29* is a plan, because you will know when you have fixed it."
                }
              ]
            },
            {
              text: "Take the official practice assessment cold, before revising, and compare its domain breakdown with your list.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Microsoft publishes a free practice assessment on the exam page. Taking it before you revise gives you an independent read on the same question, and where it disagrees with your own list, the disagreement is worth investigating — it usually means a topic you *think* you know."
                }
              ]
            }
          ],
          result: {
            text: "You have a written, evidence-based revision plan ordered by exam weight.",
            verify: [
              { text: "Every weak bullet has a named lab and a specific gap." },
              { text: "The list is ordered by exam group weight." },
              { text: "You have compared it against the official practice assessment." }
            ]
          }
        },
        {
          id: "t2",
          title: "Final recall check",
          checkpoint: true,
          steps: [
            {
              text: "Answer these from memory. Each one has caught people out somewhere in this course.",
              parts: [
                {
                  kind: "table",
                  headers: ["Question", "Covered in"],
                  rows: [
                    ["What distinguishes Entra registered, Entra joined and hybrid joined in `dsregcmd` output?", "Lab 5"],
                    ["What are the three enrollment error codes and their causes?", "Labs 11 and 15"],
                    ["When do you use Autopilot device preparation instead of a deployment profile?", "Labs 16 and 19"],
                    ["How do configuration, compliance and enrollment restriction conflicts each resolve?", "Labs 22, 29 and 11"],
                    ["What does `0x87D1041C` mean and what do you fix?", "Lab 33"],
                    ["Which grant control serves unenrolled BYOD devices?", "Labs 31 and 36"],
                    ["What two settings make BitLocker enable silently?", "Lab 43"],
                    ["What is the exit-code contract for a proactive remediation detection script?", "Lab 53"],
                    ["Which examined capabilities does Microsoft 365 E5 genuinely not license?", "Labs 1, 21 and 57"],
                    ["Retire, wipe or selective wipe — for a departing employee's own phone?", "Labs 36 and 50"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Any of these you cannot answer immediately is a gap, regardless of what your quiz scores say. Add it to the revision plan and reopen the lab — the labs are written to be re-read, and the troubleshooting section of each is the fastest refresher."
                }
              ]
            }
          ],
          result: {
            text: "You have a final, honest list of what you still need to learn.",
            verify: [
              { text: "You answered every recall question or added it to the plan." },
              { text: "Your revision plan is written down where you will actually use it." }
            ]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "During the capstone rebuild, the provisioned device receives no configuration profiles.",
      rootCause:
        "A group membership timing problem. The dynamic device group had not evaluated before the Enrollment Status Page checked, or the device preparation group is missing its service principal owner.",
      diagnostic: {
        lang: "text",
        code: "Entra admin center > Groups > the device group > Members, and Owners\nIntune > Devices > Configuration > the profile > Device status"
      },
      resolution:
        "For device preparation, confirm **Intune Provisioning Client** owns the group and that the group is Assigned. For dynamic groups, remember evaluation is asynchronous — this is exactly what enrollment time grouping from lab 24 exists to solve."
    }
  ],

  quiz: [
    {
      question:
        "You have finished this curriculum and your coverage view shows quiz accuracy below 100 percent across several bullets in three different exam groups. How should you prioritise revision?",
      options: [
        "By exam group weight, revising the heaviest weighted groups first",
        "In curriculum order, starting from lab 1",
        "By the number of labs covering each bullet",
        "By difficulty, starting with the labs marked advanced"
      ],
      correctIndex: 0,
      rationale:
        "Exam marks are distributed by group weight, so a gap in a 25–30% group costs more than an equivalent gap in a 10–15% one. Curriculum order optimises for building a tenant, not for passing an exam.",
      examTip:
        "Manage and maintain devices is the heaviest group at 25–30%. Optimize endpoint operations is the lightest, but it is entirely new to this outline and is the group candidates most often neglect.",
      skills: []
    }
  ]
};
