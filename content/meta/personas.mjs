/**
 * The 25-seat identity budget: 20 licensed personas + 5 held in reserve.
 *
 * Why a reserve at all: group-based licensing assigns seats asynchronously. If the
 * pool is exhausted at the moment a new account lands in GRP-LIC-M365-E5, the
 * assignment silently fails and the user hits enrollment error 0x80180018 with no
 * obvious cause. Five unassigned seats mean that never happens mid-lab.
 *
 * Administrator accounts are deliberately UNLICENSED. Tenants created after July
 * 2021 have unlicensed admin access enabled by default, so an Intune Administrator
 * can manage the service without consuming an E5 seat. That is what buys us 20
 * usable end-user identities out of a 25-seat trial.
 * https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses
 *
 * Names are Microsoft's standard sample-data personas, so they match the names you
 * will see in Microsoft documentation and demo tenants.
 */

export default [
  // --- Administrators: no E5 seat consumed -----------------------------------
  {
    id: "admin-breakglass",
    display: "Break-glass Emergency Access",
    upn: "admin-breakglass@<tenant>.onmicrosoft.com",
    category: "Administrator",
    licensed: false,
    roles: ["Global Administrator"],
    purpose:
      "Cloud-only, permanently assigned Global Administrator. Excluded from every Conditional Access policy so a misconfigured policy can never lock you out of your own tenant. Long passphrase, no MFA registration prompts, monitored by an alert rule.",
    groups: []
  },
  {
    id: "admin-intune",
    display: "Intune Administrator",
    upn: "admin-intune@<tenant>.onmicrosoft.com",
    category: "Administrator",
    licensed: false,
    roles: ["Intune Administrator"],
    purpose: "The account you do almost all lab work with. Assigned the Intune Administrator Entra role.",
    groups: ["GRP-ADM-INTUNE"]
  },
  {
    id: "admin-security",
    display: "Security Administrator",
    upn: "admin-security@<tenant>.onmicrosoft.com",
    category: "Administrator",
    licensed: false,
    roles: ["Security Administrator"],
    purpose: "Defender for Endpoint, security baselines and incident triage. Kept separate to practise least privilege.",
    groups: ["GRP-ADM-SECURITY"]
  },

  // --- Licensed seats 1-20 ---------------------------------------------------
  {
    id: "adele.vance",
    display: "Adele Vance",
    upn: "adele.vance@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "IT",
    licensed: true,
    device: "MD102-VM1-Adele",
    purpose: "Primary corporate Windows 11 desktop. Subscription activation to Enterprise, pilot update ring, elevation testing.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-IT", "GRP-USR-PILOT"]
  },
  {
    id: "alex.wilber",
    display: "Alex Wilber",
    upn: "alex.wilber@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "Finance",
    licensed: true,
    device: "MD102-VM2-Alex",
    purpose: "BitLocker escrow, Windows LAPS, custom compliance and the Conditional Access lockout test.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-FINANCE"]
  },
  {
    id: "megan.bowen",
    display: "Megan Bowen",
    upn: "megan.bowen@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "HR",
    licensed: true,
    device: "MD102-VM3-Megan",
    purpose: "Kept clean and un-enrolled so it can be wiped repeatedly for Autopilot and device preparation runs.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-HR", "GRP-USR-AUTOPILOT"]
  },
  {
    id: "joni.sherman",
    display: "Joni Sherman",
    upn: "joni.sherman@<tenant>.onmicrosoft.com",
    category: "BYOD",
    department: "Sales",
    licensed: true,
    purpose: "Unmanaged device user. App protection policies without enrollment (MAM-WE) and selective wipe.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-BYOD", "GRP-USR-SALES"]
  },
  {
    id: "diego.siciliani",
    display: "Diego Siciliani",
    upn: "diego.siciliani@<tenant>.onmicrosoft.com",
    category: "Mobile",
    department: "Field Services",
    licensed: true,
    device: "Android AVD (Pixel, Google Play)",
    purpose: "Android Enterprise personally-owned work profile on the emulator.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-FIELD", "GRP-DEV-ANDROID-WP"]
  },
  {
    id: "lee.gu",
    display: "Lee Gu",
    upn: "lee.gu@<tenant>.onmicrosoft.com",
    category: "Mobile",
    department: "Manufacturing",
    licensed: true,
    device: "Android AVD (second profile)",
    purpose: "Android Enterprise fully managed and dedicated (kiosk) enrollment.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-MANUFACTURING", "GRP-DEV-ANDROID-FM"]
  },
  {
    id: "miriam.graham",
    display: "Miriam Graham",
    upn: "miriam.graham@<tenant>.onmicrosoft.com",
    category: "Executive",
    department: "Executive",
    licensed: true,
    purpose:
      "Apple platform target. You have no Apple hardware in this lab, so Miriam is used to build and assign macOS and iOS policy that you inspect in the portal rather than on a device.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-EXEC", "GRP-USR-APPLE"]
  },
  {
    id: "patti.fernandez",
    display: "Patti Fernandez",
    upn: "patti.fernandez@<tenant>.onmicrosoft.com",
    category: "Executive",
    department: "Executive",
    licensed: true,
    purpose: "Conditional Access target for high-privilege policy testing, and the multi-admin approval requester.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-EXEC"]
  },
  {
    id: "pradeep.gupta",
    display: "Pradeep Gupta",
    upn: "pradeep.gupta@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "Engineering",
    licensed: true,
    purpose: "Win32 application pilot: dependencies, supersedence and detection-rule failures.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-ENGINEERING", "GRP-USR-PILOT"]
  },
  {
    id: "johanna.lorenz",
    display: "Johanna Lorenz",
    upn: "johanna.lorenz@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "Engineering",
    licensed: true,
    purpose: "Standard-user elevation scenarios and local group membership management.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-ENGINEERING"]
  },
  {
    id: "isaiah.langer",
    display: "Isaiah Langer",
    upn: "isaiah.langer@<tenant>.onmicrosoft.com",
    category: "BYOD",
    department: "Sales",
    licensed: true,
    purpose: "Second app-protection subject, used to contrast managed-device and managed-app configuration policies.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-SALES", "GRP-USR-BYOD"]
  },
  {
    id: "nestor.wilke",
    display: "Nestor Wilke",
    upn: "nestor.wilke@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "Operations",
    licensed: true,
    purpose: "Broad update ring member. Used to prove ring deferral differences against Adele.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-OPERATIONS", "GRP-USR-BROAD"]
  },
  {
    id: "henrietta.mueller",
    display: "Henrietta Mueller",
    upn: "henrietta.mueller@<tenant>.onmicrosoft.com",
    category: "Corporate",
    department: "Finance",
    licensed: true,
    purpose: "Deliberately left non-compliant so the compliance actions and grace period can be observed end to end.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-FINANCE"]
  },
  {
    id: "lynne.robbins",
    display: "Lynne Robbins",
    upn: "lynne.robbins@<tenant>.onmicrosoft.com",
    category: "Shared",
    department: "Retail",
    licensed: true,
    purpose: "Shared and multi-user device scenarios, assigned access and kiosk configuration.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-RETAIL", "GRP-DEV-SHARED"]
  },
  {
    id: "helpdesk.operator",
    display: "Help Desk Operator",
    upn: "helpdesk.operator@<tenant>.onmicrosoft.com",
    category: "Delegated admin",
    licensed: true,
    purpose:
      "Restricted RBAC subject. Assigned the built-in Help Desk Operator role scoped to a single scope tag, to prove scoped administration actually restricts what is visible.",
    groups: ["GRP-LIC-M365-E5", "GRP-ADM-HELPDESK"]
  },
  {
    id: "security.operator",
    display: "Security Operator",
    upn: "security.operator@<tenant>.onmicrosoft.com",
    category: "Delegated admin",
    licensed: true,
    purpose: "Defender for Endpoint incident responder. Used to contrast Entra roles against Intune RBAC roles.",
    groups: ["GRP-LIC-M365-E5", "GRP-ADM-SECOPS"]
  },
  {
    id: "pilot.user01",
    display: "Pilot User 01",
    upn: "pilot.user01@<tenant>.onmicrosoft.com",
    category: "Test",
    licensed: true,
    purpose: "Pre-production ring for application and feature update rollout.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-PILOT"]
  },
  {
    id: "pilot.user02",
    display: "Pilot User 02",
    upn: "pilot.user02@<tenant>.onmicrosoft.com",
    category: "Test",
    licensed: true,
    purpose: "Expedited quality update and Hotpatch testing.",
    groups: ["GRP-LIC-M365-E5", "GRP-USR-PILOT"]
  },
  {
    id: "kiosk.device",
    display: "Kiosk Device Account",
    upn: "kiosk.device@<tenant>.onmicrosoft.com",
    category: "Shared",
    licensed: true,
    purpose: "Dedicated-device sign-in for Android kiosk and Windows assigned access.",
    groups: ["GRP-LIC-M365-E5", "GRP-DEV-KIOSK"]
  },
  {
    id: "staging.user01",
    display: "Staging User 01",
    upn: "staging.user01@<tenant>.onmicrosoft.com",
    category: "Test",
    licensed: true,
    purpose:
      "Spare identity for re-enrollment loops, so you never have to wipe a persona mid-module. Also the capstone's unknown new starter.",
    groups: ["GRP-LIC-M365-E5"]
  }
];
