/**
 * MD-102 skills measured — transcription of the official Microsoft study guide.
 *
 * SOURCE OF TRUTH for every coverage claim in this repository. Nothing else
 * asserts what the exam measures.
 *
 * Rules for editing this file:
 *   1. `id` values are FROZEN. Labs reference them; renumbering silently breaks
 *      every mapping that points at them.
 *   2. When Microsoft removes a bullet, set `retired: true` — never delete it.
 *   3. When Microsoft revises the outline, bump `version` and append to `changeLog`.
 *   4. `text` is transcribed verbatim. Any deviation is recorded in `sourceNote`.
 */

export default {
  examCode: "MD-102",
  examTitle: "Managing and Securing Microsoft 365 Endpoints by using Intune",
  certification: "Microsoft 365 Certified: Endpoint Administrator Associate",
  version: "2026-07-24",
  verifiedOn: "2026-08-18",
  sourceUrl:
    "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102",
  passingScore: 700,

  changeLog: [
    {
      version: "2026-07-24",
      summary:
        "Five functional groups replace the previous four. New group: Optimize endpoint operations by using automation, monitoring, and reporting. Prepare infrastructure for devices increased in weight; Manage and maintain devices decreased. Manage applications renamed to Manage and secure applications."
    }
  ],

  groups: [
    {
      id: "g1",
      order: 1,
      title: "Prepare infrastructure for devices",
      weightMin: 20,
      weightMax: 25,
      topics: [
        {
          id: "g1.t1",
          title: "Add devices to Microsoft Entra ID",
          skills: [
            { id: "g1.t1.s1", text: "Choose an appropriate device join type, including considerations such as device registration and Microsoft Entra join" },
            { id: "g1.t1.s2", text: "Join devices to Microsoft Entra ID" },
            { id: "g1.t1.s3", text: "Register devices to Microsoft Entra ID" },
            { id: "g1.t1.s4", text: "Plan and implement groups for devices in Microsoft Entra ID, including dynamic group membership rules" }
          ]
        },
        {
          id: "g1.t2",
          title: "Enroll devices to Microsoft Intune",
          skills: [
            { id: "g1.t2.s1", text: "Configure enrollment settings in Microsoft Intune" },
            { id: "g1.t2.s2", text: "Configure automatic enrollment for Windows" },
            { id: "g1.t2.s3", text: "Configure personal enrollment for macOS, iOS, iPadOS" },
            { id: "g1.t2.s4", text: "Configure enrollment profiles for Android devices, including fully managed, dedicated, corporate owned, work profile, enrollment restrictions and troubleshooting enrollment failures" },
            { id: "g1.t2.s5", text: "Configure corporate enrollment for macOS and iOS devices by integrating Intune with Apple Business Manager" },
            { id: "g1.t2.s6", text: "Configure enrollment for Android devices by integrating Intune with Samsung Knox Mobile Enrollment or Google Zero Touch" }
          ]
        },
        {
          id: "g1.t3",
          title: "Implement identity and compliance",
          skills: [
            { id: "g1.t3.s1", text: "Manage built-in and custom roles for Intune and Windows 365, including role assignments" },
            { id: "g1.t3.s2", text: "Configure scope tags and scoped administration for multi-admin environments" },
            { id: "g1.t3.s3", text: "Implement and manage multi-admin approval" },
            { id: "g1.t3.s4", text: "Implement compliance policies for all supported device platforms by using Intune" },
            { id: "g1.t3.s5", text: "Implement Microsoft Entra Conditional Access policies that require a compliance status" },
            { id: "g1.t3.s6", text: "Configure Windows Hello for Business by using Intune" },
            { id: "g1.t3.s7", text: "Implement and manage Windows Local Administrator Password Solution (Windows LAPS) by using Microsoft Intune and Microsoft Entra ID" },
            { id: "g1.t3.s8", text: "Manage the membership of local groups on Windows devices by using Intune" }
          ]
        }
      ]
    },

    {
      id: "g2",
      order: 2,
      title: "Manage and maintain devices",
      weightMin: 25,
      weightMax: 30,
      topics: [
        {
          id: "g2.t1",
          title: "Deploy and upgrade Windows clients by using cloud-based tools",
          skills: [
            { id: "g2.t1.s1", text: "Choose between Windows Autopilot deployment profiles and device preparation policies" },
            { id: "g2.t1.s2", text: "Choose between Windows Autopilot deployment modes, including user-driven, pre-provisioning, and self-deploying" },
            { id: "g2.t1.s3", text: "Apply a device name template by using Windows Autopilot" },
            { id: "g2.t1.s4", text: "Implement Windows client deployment by using Windows Autopilot" },
            { id: "g2.t1.s5", text: "Create an Enrollment Status Page (ESP)" },
            { id: "g2.t1.s6", text: "Plan and implement device upgrades for Windows 11 by using Intune" },
            { id: "g2.t1.s7", text: "Provision and configure Windows 365 Cloud PCs by using Intune, including provisioning policies, network connections, and image management" },
            { id: "g2.t1.s8", text: "Implement Windows Backup and Restore by using Intune" }
          ]
        },
        {
          id: "g2.t2",
          title: "Plan and implement device configuration profiles",
          skills: [
            { id: "g2.t2.s1", text: "Create device configuration profiles for Windows devices, including importing ADMX files and using Group Policy analytics" },
            { id: "g2.t2.s2", text: "Create device configuration profiles for Android devices" },
            { id: "g2.t2.s3", text: "Create device configuration profiles for iOS/iPadOS devices" },
            { id: "g2.t2.s4", text: "Create device configuration profiles for macOS devices" },
            { id: "g2.t2.s5", text: "Create device configuration profiles for specialty devices, including Teams Rooms, HoloLens 2, and Zebra" },
            { id: "g2.t2.s6", text: "Target a profile by using assignment filters and enrollment time grouping" }
          ]
        },
        {
          id: "g2.t3",
          title: "Implement Intune Suite add-on capabilities",
          skills: [
            { id: "g2.t3.s1", text: "Configure Endpoint Privilege Management including configuring elevation policies, monitoring elevated actions, and adjusting EPM settings" },
            { id: "g2.t3.s2", text: "Manage applications by using the Enterprise App Catalog" },
            { id: "g2.t3.s3", text: "Configure Microsoft Intune Remote Help" },
            { id: "g2.t3.s4", text: "Plan and implement Microsoft Cloud PKI, including setting up cloud-based PKI, automating certificate issuance, and monitoring certificate health" },
            { id: "g2.t3.s5", text: "Implement Microsoft Tunnel for Mobile Application Management, including configuring Tunnel Gateway, extending support to MAM devices, and monitoring tunnel connections" },
            { id: "g2.t3.s6", text: "Implement Microsoft Intune Advanced Analytics, including anomaly detection, proactive insights, and risk-based policy recommendations" }
          ]
        },
        {
          id: "g2.t4",
          title: "Perform remote actions on devices",
          skills: [
            { id: "g2.t4.s1", text: "Sync, restart, retire, or wipe devices" },
            { id: "g2.t4.s2", text: "Perform bulk remote actions" },
            { id: "g2.t4.s3", text: "Update Microsoft Defender Antivirus security intelligence" },
            { id: "g2.t4.s4", text: "Rotate BitLocker recovery keys" },
            {
              id: "g2.t4.s5",
              text: "Rotate local administrator passwords",
              sourceNote:
                "The published outline reads Rotate locate administrator passwords. Transcribed here with the evident typo corrected."
            },
            { id: "g2.t4.s6", text: "Run a device query by using KQL" },
            { id: "g2.t4.s7", text: "Collect device diagnostics and logs by using Microsoft Intune, including using the Troubleshooting blade for user-based diagnostics" }
          ]
        }
      ]
    },

    {
      id: "g3",
      order: 3,
      title: "Protect devices",
      weightMin: 15,
      weightMax: 20,
      topics: [
        {
          id: "g3.t1",
          title: "Configure endpoint security",
          skills: [
            { id: "g3.t1.s1", text: "Create antivirus policies by using Microsoft Intune" },
            { id: "g3.t1.s2", text: "Create and manage disk encryption policies by using Microsoft Intune, including managing BitLocker recovery keys, configuring user self-service recovery, and monitoring encryption compliance status" },
            { id: "g3.t1.s3", text: "Create firewall policies by using Microsoft Intune" },
            { id: "g3.t1.s4", text: "Configure Attack surface reduction policies by using Microsoft Intune, including applying Zero Trust principles for endpoint protection" },
            { id: "g3.t1.s5", text: "Plan and implement security baselines by using Microsoft Intune" },
            { id: "g3.t1.s6", text: "Integrate Intune with Microsoft Defender for Endpoint, including configuring Endpoint Detection and Response (EDR) policies, investigating endpoint threats, and triaging incidents" },
            { id: "g3.t1.s7", text: "Onboard devices into Microsoft Defender for Endpoint" },
            { id: "g3.t1.s8", text: "Configure App Control for Business policies by using Microsoft Intune" }
          ]
        },
        {
          id: "g3.t2",
          title: "Manage device updates",
          skills: [
            { id: "g3.t2.s1", text: "Plan for device updates by using Intune" },
            { id: "g3.t2.s2", text: "Create and manage update rings, feature updates, and quality updates for Windows devices by using Intune" },
            { id: "g3.t2.s3", text: "Implement Windows Autopatch and configure Hotpatch policies" },
            { id: "g3.t2.s4", text: "Create and manage update policies for iOS/iPadOS and macOS devices by using the Settings Catalog in Microsoft Intune" },
            { id: "g3.t2.s5", text: "Manage Android updates by using configuration profiles or firmware-over-the-air (FOTA) deployments" },
            { id: "g3.t2.s6", text: "Configure Windows client Delivery Optimization by using Intune" },
            { id: "g3.t2.s7", text: "Monitor device updates by using Intune" }
          ]
        }
      ]
    },

    {
      id: "g4",
      order: 4,
      title: "Manage and secure applications",
      weightMin: 15,
      weightMax: 20,
      topics: [
        {
          id: "g4.t1",
          title: "Deploy and update apps",
          skills: [
            { id: "g4.t1.s1", text: "Prepare applications for deployment by using Intune" },
            { id: "g4.t1.s2", text: "Deploy apps by using Intune, including Win32 apps, line-of-business (LOB) apps, and Microsoft Store apps" },
            { id: "g4.t1.s3", text: "Configure Quiet Time policies for Android and iOS apps" },
            { id: "g4.t1.s4", text: "Deploy Microsoft 365 Apps by using Intune" },
            { id: "g4.t1.s5", text: "Configure policies for Office apps by using Microsoft Intune or the Microsoft 365 Apps admin center" },
            { id: "g4.t1.s6", text: "Deploy Microsoft 365 Apps as part of a Windows Autopilot deployment, including using the Office Deployment Tool (ODT) or Microsoft Intune" },
            { id: "g4.t1.s7", text: "Manage Microsoft 365 Apps by using the Microsoft 365 Apps admin center" },
            { id: "g4.t1.s8", text: "Deploy apps from platform-specific app stores by using Intune, including Apple Volume Purchase Program and Google Play" },
            { id: "g4.t1.s9", text: "Monitor app deployment status and troubleshoot installation failures by using Microsoft Intune" }
          ]
        },
        {
          id: "g4.t2",
          title: "Plan and implement app protection and app configuration policies",
          skills: [
            { id: "g4.t2.s1", text: "Plan and implement app protection policies for managed and unmanaged (BYOD) devices by using Microsoft Intune" },
            { id: "g4.t2.s2", text: "Implement Microsoft Entra Conditional Access policies for app protection policies" },
            { id: "g4.t2.s3", text: "Plan and implement app configuration policies for managed apps and managed devices" }
          ]
        }
      ]
    },

    {
      id: "g5",
      order: 5,
      title: "Optimize endpoint operations by using automation, monitoring, and reporting",
      weightMin: 10,
      weightMax: 15,
      topics: [
        {
          id: "g5.t1",
          title: "Automate management tasks",
          skills: [
            { id: "g5.t1.s1", text: "Automate Intune management tasks by using PowerShell and Microsoft Graph" },
            { id: "g5.t1.s2", text: "Investigate threats identified by Security Copilot agents in Intune" },
            { id: "g5.t1.s3", text: "Analyze device performance by using Security Copilot agents in Intune" },
            { id: "g5.t1.s4", text: "Review and respond to Security Copilot agent recommendations to make management decisions" },
            { id: "g5.t1.s5", text: "Extend device compliance by using PowerShell" }
          ]
        },
        {
          id: "g5.t2",
          title: "Monitor and optimize health",
          skills: [
            { id: "g5.t2.s1", text: "Implement reporting and data visibility in Microsoft Intune, including customizing reports and filters, using workbooks and dashboards, and exporting reporting data" },
            { id: "g5.t2.s2", text: "Monitor endpoint performance by using Endpoint Analytics, including proactive remediations, device health scores, and app startup performance" },
            { id: "g5.t2.s3", text: "Configure and manage proactive remediation scripts, including detecting and fixing common device issues, and scheduling remediation runs" },
            { id: "g5.t2.s4", text: "Analyze endpoint reliability and user experience scores, including startup performance, restart frequency, and application reliability metrics" },
            { id: "g5.t2.s5", text: "Monitor tenant health and Intune service communications, including reviewing service health dashboards, message center notifications, and establishing operational baselines" },
            { id: "g5.t2.s6", text: "Configure alerts and notifications for policy and compliance changes, including setting up alert rules for compliance drift, enrollment failures, and configuration conflicts" }
          ]
        }
      ]
    }
  ]
};
