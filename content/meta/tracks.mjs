/**
 * Study tracks — different ways through the same 60 labs.
 *
 * `modules` lists module ids in order. The app expands them into lab counts and
 * hours from the real content, so a track can never advertise a lab that no longer
 * exists or quote a duration that has drifted.
 */

export default [
  {
    id: "sprint",
    name: "Two-week sprint",
    tagline: "Full-time. Roughly 4 hours a day for 14 days.",
    description:
      "For a booked exam date. Every lab in order, no skipping, walkthroughs read rather than executed. Assumes you already administer Windows and Microsoft 365 day to day.",
    days: [
      { day: 1, modules: ["m0"], focus: "Tenant, virtual machines and 20 identities" },
      { day: 2, modules: ["m1"], focus: "Device identity, groups and delegated administration" },
      { day: 3, modules: ["m2"], focus: "Enrollment on Windows and Android" },
      { day: 4, modules: ["m3"], focus: "Autopilot and device preparation" },
      { day: 5, modules: ["m4"], focus: "Settings catalog, filters, certificates, Hello and LAPS" },
      { day: 6, modules: ["m5"], focus: "Compliance and Conditional Access" },
      { day: 7, modules: ["m6"], focus: "Applications, packaging and app protection" },
      { day: 8, modules: ["m7"], focus: "Endpoint security" },
      { day: 9, modules: ["m8"], focus: "Updates, Autopatch and Hotpatch" },
      { day: 10, modules: ["m9"], focus: "Remote actions, device query and diagnostics" },
      { day: 11, modules: ["m10"], focus: "Automation, Endpoint Analytics and reporting" },
      { day: 12, modules: ["m11"], focus: "Privilege management, Remote Help, app catalog and advanced analytics" },
      { day: 13, modules: ["m12"], focus: "Capstone rebuild with injected faults" },
      { day: 14, modules: [], focus: "Coverage review, weighted practice, close the gaps you found" }
    ]
  },
  {
    id: "evening",
    name: "Six-week evenings",
    tagline: "Around 8 hours a week, two evenings plus part of a weekend.",
    description:
      "The realistic pace alongside a job. Each week ends on a working tenant state you can leave alone until the next session, which matters because half-configured Conditional Access is a bad thing to sleep on.",
    days: [
      { day: 1, modules: ["m0", "m1"], focus: "Week 1 — foundation: tenant, VMs, identity, delegated admin" },
      { day: 2, modules: ["m2", "m3"], focus: "Week 2 — getting devices in: enrollment and provisioning" },
      { day: 3, modules: ["m4", "m5"], focus: "Week 3 — shaping and gating: configuration, compliance, Conditional Access" },
      { day: 4, modules: ["m6"], focus: "Week 4 — applications end to end" },
      { day: 5, modules: ["m7", "m8"], focus: "Week 5 — protection and updates" },
      { day: 6, modules: ["m9", "m10", "m11", "m12"], focus: "Week 6 — operations, automation, add-ons, capstone" }
    ]
  },
  {
    id: "weighted",
    name: "Exam-weighted revision",
    tagline: "Already worked through it once. Revising against the blueprint.",
    description:
      "Ignores curriculum order and follows exam weight instead: the heaviest domains first, walkthrough labs read as reference, quizzes taken cold before re-reading a lab. Use the coverage view to pick what to revisit rather than starting at lab 1.",
    weighted: true
  }
];
