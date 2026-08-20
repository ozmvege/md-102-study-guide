/**
 * Curriculum modules.
 *
 * Order here is the order labs are presented. It is PEDAGOGICAL, not the exam's
 * order: the curriculum builds one tenant from nothing, so every lab depends only
 * on labs before it. Exam-objective mapping is a separate axis, computed from each
 * lab's `skills` array and shown in the coverage view.
 */

export default [
  {
    id: "m0",
    shortTitle: "Lab environment",
    title: "Module 0 — Build the lab environment",
    description:
      "Pre-flight the host, then stand up the tenant, the virtual machines and the 20 identities everything else is built on. None of this is examined; all of it is required before any other lab will work. Start with lab 0 the evening before — it stages roughly 7 GB of downloads that later labs block on."
  },
  {
    id: "m1",
    shortTitle: "Identity foundation",
    title: "Module 1 — Identity and administration foundation",
    description:
      "Device identity in Microsoft Entra ID, the groups you will target for the rest of the course, and the delegated administration model — roles, scope tags, administrative units and multi-admin approval."
  },
  {
    id: "m2",
    shortTitle: "Enrollment",
    title: "Module 2 — Device enrollment",
    description:
      "Get Windows and Android devices under management: enrollment settings, automatic enrollment, restrictions and corporate identifiers, every Windows enrollment path, Android Enterprise, and what to do when enrollment fails."
  },
  {
    id: "m3",
    shortTitle: "Windows deployment",
    title: "Module 3 — Windows client deployment",
    description:
      "Choose and implement a provisioning method: Autopilot deployment profiles versus device preparation policies, all deployment modes, the Enrollment Status Page, Windows 11 upgrades, and Windows Backup."
  },
  {
    id: "m4",
    shortTitle: "Configuration",
    title: "Module 4 — Device configuration",
    description:
      "Shape the desktop with the settings catalog, ADMX imports and Group Policy analytics; target precisely with assignment filters and enrollment time grouping; then layer on certificates, Windows Hello for Business and Windows LAPS."
  },
  {
    id: "m5",
    shortTitle: "Compliance and CA",
    title: "Module 5 — Compliance and Conditional Access",
    description:
      "Define what healthy means, extend it with PowerShell where the built-in rules stop, and turn compliance into an access decision with Conditional Access."
  },
  {
    id: "m6",
    shortTitle: "Applications",
    title: "Module 6 — Application management",
    description:
      "Deliver software: store and line-of-business apps, Win32 packaging with detection and dependencies, Microsoft 365 Apps, mobile app stores, then protect and configure those apps on managed and unmanaged devices."
  },
  {
    id: "m7",
    shortTitle: "Protect devices",
    title: "Module 7 — Protect devices",
    description:
      "Endpoint security in the order a real deployment applies it: baselines first, then antivirus, firewall, attack surface reduction, disk encryption, Defender for Endpoint and App Control for Business."
  },
  {
    id: "m8",
    shortTitle: "Updates",
    title: "Module 8 — Device updates",
    description:
      "Keep the estate current: update rings and Delivery Optimization, feature and quality updates including expedited releases, Windows Autopatch and Hotpatch, cross-platform update policies, and update reporting."
  },
  {
    id: "m9",
    shortTitle: "Operate",
    title: "Module 9 — Operate and troubleshoot",
    description:
      "The day-two job: remote and bulk actions, key and password rotation, on-demand device query with KQL, and collecting the diagnostics you need to answer a support call."
  },
  {
    id: "m10",
    shortTitle: "Automate and monitor",
    title: "Module 10 — Automation, monitoring and reporting",
    description:
      "The newest exam domain. Automate with the Microsoft Graph PowerShell SDK, self-heal with proactive remediations, measure with Endpoint Analytics and Intune reporting, and watch tenant health and alerts."
  },
  {
    id: "m11",
    shortTitle: "Advanced capabilities",
    title: "Module 11 — Advanced endpoint capabilities",
    description:
      "The capabilities the exam still calls Intune Suite add-ons, every one of which Microsoft 365 E5 has included since the July 2026 packaging change: Endpoint Privilege Management, Remote Help, the Enterprise App Catalog and Advanced Analytics. Each removes friction you hit earlier in the course. Cloud PKI belongs to this group too and is used in lab 27, where certificates are taught."
  },
  {
    id: "m12",
    shortTitle: "Capstone",
    title: "Module 12 — Capstone and exam readiness",
    description:
      "Rebuild the whole estate from a clean tenant against a deadline with faults injected, then close your remaining gaps with a domain-weighted timed practice run."
  }
];
