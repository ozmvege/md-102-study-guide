/**
 * What your subscription actually entitles you to.
 *
 * Every `included` claim below was checked against Microsoft Learn on the date in
 * `verifiedOn` and carries the URL it came from. This matters because roughly a
 * quarter of the MD-102 objectives cover capabilities that are NOT in Microsoft
 * 365 E5, and guessing produces labs that cannot be completed.
 *
 * `included: true` means you can do it today with Microsoft 365 E5.
 */

export default [
  {
    id: "M365-E5",
    name: "Microsoft 365 E5",
    included: true,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    notes:
      "The lab baseline. Bundles Microsoft Intune Plan 1, Microsoft Entra ID P2, Microsoft Defender for Endpoint Plan 2 and Windows 11 Enterprise E5.",
    grants: ["INTUNE-P1", "ENTRA-P2", "MDE-P2", "WIN-ENT-E5", "AUTOPATCH"]
  },
  {
    id: "INTUNE-P1",
    name: "Microsoft Intune Plan 1",
    included: true,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    notes:
      "The base unified endpoint management service: enrollment, configuration profiles, compliance, app deployment and protection, endpoint security policy, update rings, basic Endpoint Analytics and proactive remediations."
  },
  {
    id: "ENTRA-P2",
    name: "Microsoft Entra ID P2",
    included: true,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    notes:
      "Conditional Access, dynamic group membership, Privileged Identity Management, administrative units, risk-based policy."
  },
  {
    id: "MDE-P2",
    name: "Microsoft Defender for Endpoint Plan 2",
    included: true,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    notes: "EDR, device risk score feeding Intune compliance, incident investigation and triage, automated investigation."
  },
  {
    id: "WIN-ENT-E5",
    name: "Windows 11 Enterprise E5",
    included: true,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    notes:
      "Enables subscription activation, which steps a Windows 11 Pro device up to Enterprise on sign-in without a reinstall or a product key."
  },
  {
    id: "AUTOPATCH",
    name: "Windows Autopatch",
    included: true,
    verifiedOn: "2026-08-18",
    source:
      "https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites",
    notes:
      "Included with Windows 10/11 Enterprise E3 or E5, which Microsoft 365 E5 contains. Devices must be corporate-owned and Intune-enrolled; BYOD is blocked at registration. Hotpatch has additional Windows build requirements checked in the update labs."
  },

  // --- Not included in Microsoft 365 E5 --------------------------------------
  {
    id: "INTUNE-P2",
    name: "Microsoft Intune Plan 2",
    included: false,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses",
    trial: "90 days, up to 250 users, one trial per capability per tenant, 30-day grace period afterwards.",
    trialPath: "Microsoft Intune admin center > Tenant administration > Intune add-ons > All add-ons",
    trialSource: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-add-ons",
    notes:
      "Additive to Plan 1. Adds Remote Help, Advanced Analytics, Microsoft Tunnel for MAM and specialty device management. NOT part of Microsoft 365 E5."
  },
  {
    id: "INTUNE-SUITE",
    name: "Microsoft Intune Suite",
    included: false,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-add-ons",
    trial: "90 days, up to 250 users, one trial per capability per tenant, 30-day grace period afterwards.",
    trialPath: "Microsoft Intune admin center > Tenant administration > Intune add-ons > All add-ons",
    notes:
      "Includes Plan 2 plus Endpoint Privilege Management, Microsoft Cloud PKI, Enterprise App Catalog and the remaining advanced capabilities. Examined by MD-102 under Implement Intune Suite add-on capabilities, but not included in Microsoft 365 E5."
  },
  {
    id: "WINDOWS-365",
    name: "Windows 365 Enterprise",
    included: false,
    verifiedOn: "2026-08-18",
    source: "https://www.microsoft.com/en-us/windows-365/enterprise/compare-plans-pricing",
    trial: "Promotional trial licence, roughly 30 days, one per edition per customer, arranged through Microsoft sales.",
    notes:
      "Cloud PC provisioning policies, network connections and image management are examined, but Windows 365 is a separate subscription and is not part of Microsoft 365 E5."
  },
  {
    id: "SECURITY-COPILOT",
    name: "Microsoft Security Copilot",
    included: false,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/copilot/security/",
    notes:
      "Billed by provisioned Security Compute Units. The Security Copilot agents in Intune are examined in the new automation domain but cannot be run on a Microsoft 365 E5 subscription alone."
  },
  {
    id: "APPLE-BUSINESS-MANAGER",
    name: "Apple Business Manager",
    included: false,
    verifiedOn: "2026-08-18",
    source: "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios",
    notes:
      "Free from Apple, but enrolment requires a D-U-N-S number and a verified organisation, and automated device enrolment only applies to hardware bought through Apple or an authorised reseller. Not reproducible in this lab."
  }
];
