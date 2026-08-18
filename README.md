# 🚀 Microsoft 365 Endpoint Administrator (MD-102) Interactive Master Lab Guide & Study Portal

[![MD-102 Exam Ready](https://img.shields.io/badge/Exam-MD--102%20Ready-0078D4?style=for-the-badge&logo=microsoft)](https://learn.microsoft.com/en-us/credentials/certifications/exams/md-102/)
[![Platform](https://img.shields.io/badge/Platform-Microsoft%20Intune%20%7C%20Entra%20ID%20%7C%20Defender-0078D4?style=for-the-badge)](https://intune.microsoft.com)
[![License Architecture](https://img.shields.io/badge/License%20Budget-20%20Active%20%2F%205%20Reserve-107C41?style=for-the-badge)]()
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Live-238636?style=for-the-badge&logo=github)](index.html)

A production-grade, enterprise-hardened hands-on lab blueprint and **interactive web study guide** designed to guarantee mastery of **Microsoft Intune, Microsoft Entra ID, Microsoft Defender for Endpoint, Windows 11 Enterprise, macOS, and Android Enterprise**.

Whether preparing for **Exam MD-102: Managing and Securing Microsoft 365 Endpoints by using Intune** or modernizing enterprise endpoint infrastructure, this guide walks through realistic end-to-end architectures, diagnostic failure injections, and automated remediations.

---

## 🌟 Interactive Web Portal Features

The repository includes a zero-dependency **Single-Page Interactive Study Portal** (`index.html`):

- 🎯 **Domain-Mapped Explorer:** Filter all 22+ labs by official MD-102 Exam Domains (Deploy Windows Client, Manage Identity and Access, Manage Compliance and Device Policies, Manage and Protect Devices).
- 🔄 **Live Tenant Variable Injector:** Enter your tenant prefix (e.g. `contoso`) and watch all PowerShell scripts, UPNs, JSON schemas, and command snippets instantly update across the portal.
- 📋 **Persistent LocalStorage Checklists:** Track granular task completion with real-time percentage meters, phase tracking, and domain readiness scores.
- 💡 **MD-102 Exam Mini-Quizzes:** Practice real exam-style questions with instant rationales, correct answer breakdowns, and official Microsoft documentation citations.
- ⚠️ **Failure Injection Simulator:** Deep-dive into real-world break-fix scenarios (symptom $\rightarrow$ telemetry $\rightarrow$ root cause analysis $\rightarrow$ remediation).
- 📦 **1-Click Script Sandbox:** Copy production PowerShell scripts, `.intunewin` packaging commands, Graph SDK queries, and JSON compliance schemas in a single click.
- 💾 **Export / Import Progress:** Seamlessly back up and sync your learning progress across devices and browsers.
- 🌗 **Modern Enterprise UI:** Fluent-inspired Dark & Light modes, responsive desktop and mobile design.

---

## 🏛️ Lab Architecture & Licensing Strategy

### Strict 20/5 Budget Architecture (25 Microsoft 365 E5 Licenses)

Standard Microsoft 365 Developer and Trial subscriptions allocate **25 E5 licenses**. To avoid license exhaustion, identity lockouts, and enrollment blockages during multi-device provisioning, this blueprint enforces:

1. **20 Active Assigned Seats:** Allocated strictly via Group-Based Licensing (`GRP-LIC-M365-E5`).
2. **5 Safety Reserve Buffer Seats:** Unassigned emergency buffer for zero lockout risk.

```text
[ Microsoft 365 E5 Pool: 25 Licenses ]
   ├── 20 Active Assigned (GRP-LIC-M365-E5)
   │     ├── 3 Admin Personas (Break-Glass, Intune Arch, SecOps Lead)
   │     ├── 6 Business Personas (IT, Finance, HR, Sales, Mobile, Exec)
   │     ├── 5 Specialized Test Roles (Operators, Shared Kiosk, Pilots)
   │     └── 6 Dynamic Provisioning Buffers
   └── 5 Unassigned Safety Buffer (Zero Lockouts)
```

---

## 🧪 Hands-On Labs Syllabus

| Phase | Lab ID | Topic | MD-102 Exam Domain |
|---|---|---|---|
| **Phase 1** | **Lab 1** | Hardened Tenant Setup, Branding & Emergency Break-Glass | Manage Identity and Access (10–15%) |
| | **Lab 2** | Intune RBAC, Scope Tags & Administrative Units | Manage Identity and Access (10–15%) |
| | **Lab 2B** | Windows Subscription Activation (Pro $\rightarrow$ Enterprise) | Deploy Windows Client (25–30%) |
| **Phase 2** | **Lab 3** | Device Identity Dissection (`dsregcmd /status`) | Manage Identity and Access (10–15%) |
| | **Lab 4** | Enrollment Restrictions & Corporate Identifiers | Deploy Windows Client (25–30%) |
| **Phase 3** | **Lab 5** | Windows Autopilot Classic (User-Driven + ESP Diagnostics) | Deploy Windows Client (25–30%) |
| | **Lab 5B** | Windows Autopilot Device Preparation (Autopilot v2) | Deploy Windows Client (25–30%) |
| **Phase 4** | **Lab 6** | Settings Catalog & Assignment Filters | Manage Compliance and Policies (45–50%) |
| | **Lab 6B** | Group Policy Analytics & Direct CSP Migration | Manage Compliance and Policies (45–50%) |
| | **Lab 6C** | Enterprise PKI, SCEP/PKCS Certificates & 802.1X Wi-Fi | Manage Compliance and Policies (45–50%) |
| | **Lab 7** | Windows Hello for Business & Cloud-Native Windows LAPS | Manage Identity and Access (10–15%) |
| **Phase 5** | **Lab 8** | Built-in Device Compliance Policies & Non-Compliance Actions | Manage Compliance and Policies (45–50%) |
| | **Lab 8B** | Custom Compliance (PowerShell Discovery + JSON Schema) | Manage Compliance and Policies (45–50%) |
| | **Lab 9** | Conditional Access & Cross-Workload Zero Trust Lifecycle | Manage Compliance and Policies (45–50%) |
| **Phase 6** | **Lab 10** | Win32 App Packaging (`.intunewin`) & Custom Detection | Manage and Protect Devices (15–20%) |
| | **Lab 11** | App Protection Policies (MAM-WE) & Selective Wipe | Manage and Protect Devices (15–20%) |
| | **Lab 11B** | App Configuration Policies (Managed Devices vs Apps) | Manage and Protect Devices (15–20%) |
| **Phase 7** | **Lab 12** | Microsoft Defender for Endpoint (MDE) Connector & EDR | Manage and Protect Devices (15–20%) |
| | **Lab 13** | Attack Surface Reduction (ASR) Rules (Audit $\rightarrow$ Block) | Manage and Protect Devices (15–20%) |
| | **Lab 14** | BitLocker Silent Encryption & Cloud Key Escrow | Manage and Protect Devices (15–20%) |
| | **Lab 15** | Endpoint Privilege Management (EPM) & App Control (WDAC) | Manage and Protect Devices (15–20%) |
| **Phase 8** | **Lab 16** | Windows Update for Business (WUfB) 3-Ring Deployment | Manage and Protect Devices (15–20%) |
| **Phase 9** | **Lab 17** | Remote Actions & Data Impact Master Matrix | Manage and Protect Devices (15–20%) |
| | **Lab 18** | Master Diagnostics Toolkit & High-Yield Error Codes | Manage and Protect Devices (15–20%) |
| **Phase 10**| **Lab 19** | PowerShell & Microsoft Graph SDK Automation | Manage and Protect Devices (15–20%) |
| | **Lab 20** | Proactive Remediations (Detection & Remediation Scripts) | Manage and Protect Devices (15–20%) |
| **Phase 11**| **Lab 22** | macOS Management, APNs & Platform SSO | Manage Compliance and Policies (45–50%) |
| | **Lab 23** | Android Enterprise Work Profile (Android Studio AVD) | Deploy Windows Client & Mobile Endpoints |
| **Capstone**| **Final** | 20-Seat Enterprise Deployment & 3 Failure Challenges | Comprehensive Master Review |

---

## ⚡ Study Tracks

- **Track A (10-Day Accelerated Sprint):** Full-time immersion (2–3 labs / ~2.5–3.5 hours per day).
- **Track B (4-Week Modular Track):** Part-time study (~5–6 hours per week).

---

## 💻 Local Quick Start

You can run the interactive guide locally with zero build tools:

```bash
# Clone repository
git clone https://github.com/<your-username>/md-102-study-guide.git
cd md-102-study-guide

# Option 1: Open index.html directly in any modern browser
# Double-click index.html or run:
start index.html

# Option 2: Run with local HTTP server
npx serve .
# or
python -m http.server 8080
```

---

## 🚀 GitHub Actions & GitHub Pages Deployment

The repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically validates and deploys the interactive guide to GitHub Pages upon pushing to the `main` branch.

To enable GitHub Pages in your fork:
1. Navigate to **Settings > Pages** in your GitHub repository.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push changes to `main` to trigger the automated deployment.

---

## 📖 Complete Markdown Reference

For an offline, text-only standard operating procedure reference, see [LAB_GUIDE.md](LAB_GUIDE.md).

---

## 🤝 Contributing & License

Contributions, corrections, and new failure injection scenarios are welcome! Feel free to submit a pull request or open an issue.

Distributed under the **MIT License**.
