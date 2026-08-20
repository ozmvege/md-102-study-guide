/**
 * What your subscription actually entitles you to.
 *
 * Every `included` claim below was checked against Microsoft's own licensing
 * documentation on the date in `verifiedOn` and carries the URL it came from.
 * Guessing here produces labs that cannot be completed, or — as happened before
 * the 2026-08-19 revision of this file — labs needlessly downgraded to reading
 * exercises because a capability was assumed to be an add-on when it is not.
 *
 * `included: true` means you can do it today with Microsoft 365 E5.
 *
 * IMPORTANT — the July 2026 packaging change:
 * Microsoft moved a large set of advanced Intune capabilities into Microsoft 365
 * E3 and E5. Rollout began in CY26 Q3 and completed on 1 August 2026, with no
 * customer action required. E3 received Remote Help, Advanced Analytics and
 * Intune Plan 2; E5 received those plus Endpoint Privilege Management, Microsoft
 * Cloud PKI and Enterprise App Management. In practice an E5 tenant now has the
 * whole Intune Suite feature set. Anything written before August 2026 — including
 * most third-party study material — will tell you otherwise.
 * https://www.microsoft.com/en-us/licensing/news/2026-M365-Packaging-Pricing-Updates-FAQ
 *
 * Security Copilot moved separately and earlier, in the April to June 2026 rollout,
 * and is included with E5 as monthly SCU capacity scaled to PAID seats rather than
 * as a per-user right. It stays `included: false` here because a 25-seat trial earns
 * no usable capacity — the distinction matters, so the note on that entry spells it
 * out rather than leaving "not included" to imply "not licensed".
 * https://mc.merill.net/message/MC1187672
 */

const LEARN_LICENSING = "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses";
const PACKAGING_FAQ = "https://www.microsoft.com/en-us/licensing/news/2026-M365-Packaging-Pricing-Updates-FAQ";
const INTUNE_PRICING = "https://www.microsoft.com/en-us/security/microsoft-intune-pricing";

export default [
  {
    id: "M365-E5",
    name: "Microsoft 365 E5",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "The lab baseline. Bundles Microsoft Intune Plan 1 and Plan 2, Microsoft Entra ID P2, Microsoft Defender for Endpoint Plan 2, Windows 11 Enterprise E5, and — since the July 2026 packaging change — Remote Help, Advanced Analytics, Endpoint Privilege Management, Microsoft Cloud PKI and Enterprise App Management.",
    grants: [
      "INTUNE-P1",
      "INTUNE-P2",
      "INTUNE-REMOTE-HELP",
      "INTUNE-ADV-ANALYTICS",
      "INTUNE-EPM",
      "INTUNE-CLOUD-PKI",
      "INTUNE-ENTERPRISE-APP-MGMT",
      "ENTRA-P2",
      "MDE-P2",
      "WIN-ENT-E5",
      "AUTOPATCH"
    ]
  },
  {
    id: "INTUNE-P1",
    name: "Microsoft Intune Plan 1",
    included: true,
    verifiedOn: "2026-08-19",
    source: LEARN_LICENSING,
    notes:
      "The base unified endpoint management service: enrollment, configuration profiles, compliance, app deployment and protection, endpoint security policy, update rings, basic Endpoint Analytics and proactive remediations."
  },
  {
    id: "INTUNE-P2",
    name: "Microsoft Intune Plan 2",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "Additive to Plan 1. Adds Microsoft Tunnel for Mobile Application Management, firmware over-the-air (FOTA) update management, and specialty and shared device management. Moved into Microsoft 365 E3 and E5 in the July 2026 packaging change, complete by 1 August 2026."
  },
  {
    id: "INTUNE-REMOTE-HELP",
    name: "Microsoft Intune Remote Help",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "Secure remote assistance with verified identity on both sides, RBAC-governed permissions and per-session audit. Sold separately at 3.50 USD per user per month before the July 2026 packaging change moved it into Microsoft 365 E3 and E5."
  },
  {
    id: "INTUNE-ADV-ANALYTICS",
    name: "Microsoft Intune Advanced Analytics",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "Anomaly detection, per-device timeline, multi-device query with KQL, enhanced device scopes and reporting. Extends the Endpoint Analytics included with Plan 1. Moved into Microsoft 365 E3 and E5 in July 2026."
  },
  {
    id: "INTUNE-EPM",
    name: "Microsoft Intune Endpoint Privilege Management",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "Application-scoped elevation for standard users, with elevation settings and rules policies and full elevation reporting. Moved into Microsoft 365 E5 in July 2026. Note this is an E5 addition — Microsoft 365 E3 did not receive it."
  },
  {
    id: "INTUNE-CLOUD-PKI",
    name: "Microsoft Cloud PKI",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "A hosted root and issuing certification authority, removing the need for Active Directory Certificate Services, an NDES server and the Intune Certificate Connector. Moved into Microsoft 365 E5 in July 2026; not part of the E3 entitlement."
  },
  {
    id: "INTUNE-ENTERPRISE-APP-MGMT",
    name: "Microsoft Intune Enterprise App Management",
    included: true,
    verifiedOn: "2026-08-19",
    source: PACKAGING_FAQ,
    notes:
      "The Enterprise App Catalog: Microsoft-curated, prepackaged Win32 applications with supplied install commands, detection rules and update supersedence. Moved into Microsoft 365 E5 in July 2026; not part of the E3 entitlement."
  },
  {
    id: "INTUNE-SUITE",
    name: "Microsoft Intune Suite",
    included: true,
    verifiedOn: "2026-08-19",
    source: INTUNE_PRICING,
    notes:
      "The Suite SKU bundles Plan 2 with Remote Help, Advanced Analytics, Endpoint Privilege Management, Cloud PKI and Enterprise App Management for 10 USD per user per month. Microsoft 365 E5 now grants every one of those capabilities directly, so an E5 tenant does not need to buy the Suite — but the SKU still exists, and the exam still calls this objective Implement Intune Suite add-on capabilities."
  },
  {
    id: "ENTRA-P2",
    name: "Microsoft Entra ID P2",
    included: true,
    verifiedOn: "2026-08-19",
    source: LEARN_LICENSING,
    notes:
      "Conditional Access, dynamic group membership, Privileged Identity Management, administrative units, risk-based policy."
  },
  {
    id: "MDE-P2",
    name: "Microsoft Defender for Endpoint Plan 2",
    included: true,
    verifiedOn: "2026-08-19",
    source: LEARN_LICENSING,
    notes: "EDR, device risk score feeding Intune compliance, incident investigation and triage, automated investigation."
  },
  {
    id: "WIN-ENT-E5",
    name: "Windows 11 Enterprise E5",
    included: true,
    verifiedOn: "2026-08-19",
    source: LEARN_LICENSING,
    notes:
      "Enables subscription activation, which steps a Windows 11 Pro device up to Enterprise on sign-in without a reinstall or a product key."
  },
  {
    id: "AUTOPATCH",
    name: "Windows Autopatch",
    included: true,
    verifiedOn: "2026-08-19",
    source:
      "https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites",
    notes:
      "Included with Windows 10/11 Enterprise E3 or E5, which Microsoft 365 E5 contains. Devices must be corporate-owned and Intune-enrolled; BYOD is blocked at registration. Hotpatch has additional Windows build requirements checked in the update labs."
  },

  // --- Genuinely not included in Microsoft 365 E5 -----------------------------
  {
    id: "WINDOWS-365",
    name: "Windows 365 Enterprise",
    included: false,
    verifiedOn: "2026-08-19",
    source: "https://www.microsoft.com/en-us/windows-365/enterprise/compare-plans-pricing",
    trial: "Promotional trial licence, roughly 30 days, one per edition per customer, arranged through Microsoft sales.",
    notes:
      "Cloud PC provisioning policies, network connections and image management are examined, but Windows 365 is a separate per-user subscription. The July 2026 Intune packaging change did not touch it."
  },
  {
    id: "SECURITY-COPILOT",
    name: "Microsoft Security Copilot",
    included: false,
    verifiedOn: "2026-08-20",
    source: "https://mc.merill.net/message/MC1187672",
    notes:
      "Included with Microsoft 365 E5 since the April to June 2026 rollout — but the entitlement is capacity, not a per-user right: 400 Security Compute Units per month for every 1,000 PAID E5 seats, capped at 10,000 SCU. A 25-seat trial does not earn a usable allocation, which is why this is marked not included for lab purposes rather than not licensed. Organisations without E5 buy capacity separately. The Security Copilot agents in Intune are examined in the automation domain; the exam expects you to know what they produce and how to act on it, which does not require running them."
  },
  {
    id: "APPLE-BUSINESS-MANAGER",
    name: "Apple Business Manager",
    included: false,
    verifiedOn: "2026-08-19",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios",
    notes:
      "Free from Apple, but enrolment requires a D-U-N-S number and a verified organisation, and automated device enrolment only applies to hardware bought through Apple or an authorised reseller. Not reproducible in this lab."
  }
];
