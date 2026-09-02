# MD-102 Lab Platform

A hands-on lab curriculum for **Exam MD-102: Managing and Securing Microsoft 365 Endpoints by using Intune**, built for a 25-seat Microsoft 365 E5 trial, three Hyper-V virtual machines and a free Android emulator.

<!-- BEGIN:SUMMARY -->
| | |
| --- | --- |
| Exam | **MD-102** — Managing and Securing Microsoft 365 Endpoints by using Intune |
| Skills outline | 2026-07-24 ([source](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102)) |
| Labs | 61 across 13 modules (55 hands-on, 6 walkthrough) |
| Lab time | ~49 hours |
| Objective coverage | 83 of 83 skill bullets (100%) |
<!-- END:SUMMARY -->

## What this is

Every lab maps to specific **skill bullets** of the current skills measured outline — not just to a domain. That mapping is machine-checked: a lab claiming an objective that does not exist fails the build, and the coverage view lists any bullet no lab teaches. "Aligned with the exam" is a computed fact here, not a claim in a readme.

Labs are written in the shape Microsoft uses for its own lab guides — lab scenario, objectives, estimated time, prerequisites, then numbered exercises and tasks with exact navigation paths and settings tables, each closing with a results block telling you how to know it worked.

### Honest access badges

A few examined capabilities are still out of reach on a Microsoft 365 E5 trial. Rather than pretend otherwise, every lab carries a badge:

| Badge | Meaning |
| --- | --- |
| **Hands-on** | You can complete it with Microsoft 365 E5 and the lab hardware. |
| **Walkthrough (licence)** | Needs Windows 365 (a separate subscription) or Security Copilot (billed by compute unit). Exact configuration paths, decision criteria and exam drills instead. |
| **Walkthrough (device)** | Needs Apple hardware or an Apple Business Manager organisation. |

> **Licensing note.** Microsoft moved a large set of advanced Intune capabilities into Microsoft 365 E3 and E5 in a packaging change completed on **1 August 2026**. E5 now includes Intune Plan 2, Remote Help, Advanced Analytics, Endpoint Privilege Management, Microsoft Cloud PKI and Enterprise App Management — effectively the whole Intune Suite feature set. Study material written before then will tell you these are paid add-ons. They are not, and this curriculum uses all six. See [`content/meta/licenses.mjs`](content/meta/licenses.mjs) for the per-capability sources.

## Getting started

Open `index.html`. That is the whole setup — no server, no build, no network. It works from the filesystem and from GitHub Pages, and it works offline.

Set your tenant prefix in the header and every UPN, script and command across all labs rewrites itself to match your tenant.

Then start at lab 1. The curriculum builds one tenant from nothing and each lab depends only on labs before it, so the order is the point.

<!-- BEGIN:COVERAGE -->
| Exam group | Weight | Skill bullets | Labs | Lab time |
| --- | --- | --- | --- | --- |
| Prepare infrastructure for devices | 20–25% | 18/18 | 14 | 11 h |
| Manage and maintain devices | 25–30% | 27/27 | 16 | 12 h |
| Protect devices | 15–20% | 15/15 | 11 | 8 h |
| Manage and secure applications | 15–20% | 12/12 | 7 | 6 h |
| Optimize endpoint operations by using automation, monitoring, and reporting | 10–15% | 11/11 | 7 | 5 h |
<!-- END:COVERAGE -->

## The 20/5 seat budget

A Microsoft 365 E5 trial gives 25 seats. This lab uses **20 and holds 5 in reserve**.

The reserve is not caution for its own sake. Group-based licensing assigns seats asynchronously; if the pool is empty at the moment an account lands in `GRP-LIC-M365-E5`, the assignment fails silently and the user hits enrollment error `0x80180018` with nothing in the UI to explain it. Five spare seats mean that never happens in the middle of a lab.

Administrator accounts are deliberately **unlicensed**. Tenants created after July 2021 allow unlicensed admin access by default, so an Intune Administrator can run the whole course without consuming an E5 seat. That is what buys 20 usable end-user identities out of 25.

The budget is enforced at build time — adding a 21st licensed persona fails `npm run validate`.

## Working on the content

Content lives in `content/` and is the only place any fact lives. Everything else is generated.

```bash
npm run build
```

| Path | Role |
| --- | --- |
| `content/outline.md102.mjs` | The skills measured outline. Source of truth for every coverage claim. |
| `content/labs/NN-slug.mjs` | One lab each. The `NN` prefix sets the display number, so reordering the curriculum is a file rename. |
| `content/meta/*.mjs` | Personas, virtual machines, licences, error dictionary, study tracks. |
| `tools/build.mjs` | Validates, computes coverage, writes the generated artifacts. Zero npm dependencies. |
| `tools/lib/shuffle-quiz.mjs` | Shuffles quiz options at build time, so the answer you drafted first is not the answer the reader can guess. |
| `js/content.bundle.js` | **Generated.** The single file the browser loads. |
| `js/app/inline.js` | **Generated** from `tools/lib/inline.mjs`, so the browser and the Markdown emitter can never disagree about markup. |
| `LAB_GUIDE.md` | **Generated.** Offline and print copy of the whole curriculum. |

Write quiz questions with the correct answer first — it is the readable way to draft one, and `correctIndex: 0` keeps the source honest. The build shuffles each question's options into a fixed order derived from the lab and question ids, so the site and `LAB_GUIDE.md` never present the answer in a guessable position, and the same option lands in the same place on every machine and every rebuild.

Authored text uses a restricted markup with exactly five productions — `**UI element**`, `` `code` ``, `*emphasis*`, `[text](url)` and `<tenant>`. Raw HTML is rejected by the validator. That restriction is what lets the same content render to both HTML and Markdown, and it is why `LAB_GUIDE.md` can be generated instead of hand-maintained.

```bash
npm run validate
```

Validation fails on an unknown skill id, a lab with no primary objective mapping, a checkpoint with no way to verify it, a prerequisite pointing at a later lab, an unknown error code, raw HTML in authored text, or a seat budget over 20. CI additionally runs `npm run check`, which fails if a generated artifact is out of date with `content/`.

<!-- BEGIN:CURRICULUM -->
| # | Lab | Module | Access | Time |
| --- | --- | --- | --- | --- |
| 1 | Before you begin: pre-flight the host and stage the downloads | Lab environment | Hands-on | 25 min |
| 2 | Set up the tenant and the 20/5 licence budget | Lab environment | Hands-on | 45 min |
| 3 | Build the virtual machines and the Android emulator | Lab environment | Hands-on | 75 min |
| 4 | Provision 20 personas and the group structure | Lab environment | Hands-on | 50 min |
| 5 | Break-glass access and administrator tiering | Identity foundation | Hands-on | 40 min |
| 6 | Device identity: registered, joined and hybrid joined | Identity foundation | Hands-on | 55 min |
| 7 | Device groups and dynamic membership rules | Identity foundation | Hands-on | 45 min |
| 8 | Intune role-based access control and custom roles | Identity foundation | Hands-on | 45 min |
| 9 | Scope tags, administrative units and scoped administration | Identity foundation | Hands-on | 35 min |
| 10 | Multi-admin approval and access policies | Identity foundation | Hands-on | 48 min |
| 11 | Automatic enrollment, enrollment settings and Company Portal branding | Enrollment | Hands-on | 40 min |
| 12 | Enrollment restrictions, device limits and corporate identifiers | Enrollment | Hands-on | 45 min |
| 13 | Every Windows enrollment path | Enrollment | Hands-on | 65 min |
| 14 | Android Enterprise: work profile, fully managed and dedicated | Enrollment | Hands-on | 60 min |
| 15 | Apple enrollment, Apple Business Manager and OEM zero-touch | Enrollment | Walkthrough (device) | 35 min |
| 16 | Troubleshoot enrollment failures | Enrollment | Hands-on | 45 min |
| 17 | Choose a provisioning method: Autopilot profiles or device preparation | Windows deployment | Hands-on | 30 min |
| 18 | Windows Autopilot user-driven deployment | Windows deployment | Hands-on | 75 min |
| 19 | Autopilot pre-provisioning and self-deploying mode | Windows deployment | Walkthrough (device) | 35 min |
| 20 | Windows Autopilot device preparation | Windows deployment | Hands-on | 55 min |
| 21 | Windows 11 edition upgrades and Windows Backup | Windows deployment | Hands-on | 40 min |
| 22 | Windows 365 Cloud PCs | Windows deployment | Walkthrough (licence) | 35 min |
| 23 | The settings catalog: profiles, assignment and conflicts | Configuration | Hands-on | 50 min |
| 24 | ADMX templates and Group Policy analytics | Configuration | Hands-on | 45 min |
| 25 | Assignment filters and enrollment time grouping | Configuration | Hands-on | 40 min |
| 26 | Android configuration profiles | Configuration | Hands-on | 40 min |
| 27 | Apple and specialty device configuration profiles | Configuration | Walkthrough (device) | 35 min |
| 28 | Cloud PKI, certificate profiles, Wi-Fi and VPN | Configuration | Hands-on | 60 min |
| 29 | Windows Hello for Business, Windows LAPS and local group membership | Configuration | Hands-on | 55 min |
| 30 | Compliance policies and actions for non-compliance | Compliance and CA | Hands-on | 50 min |
| 31 | Extend compliance with PowerShell and JSON | Compliance and CA | Hands-on | 45 min |
| 32 | Conditional Access: require a compliant device | Compliance and CA | Hands-on | 50 min |
| 33 | Store apps, line-of-business apps and assignment intent | Applications | Hands-on | 45 min |
| 34 | Win32 app packaging, detection and dependencies | Applications | Hands-on | 70 min |
| 35 | Deploy and manage Microsoft 365 Apps | Applications | Hands-on | 50 min |
| 36 | Mobile app stores and Quiet Time policies | Applications | Hands-on | 40 min |
| 37 | App protection policies and selective wipe | Applications | Hands-on | 50 min |
| 38 | App configuration policies for managed devices and managed apps | Applications | Hands-on | 35 min |
| 39 | Monitor and troubleshoot application deployment | Applications | Hands-on | 40 min |
| 40 | Security baselines | Protect devices | Hands-on | 40 min |
| 41 | Antivirus policies and tamper protection | Protect devices | Hands-on | 40 min |
| 42 | Firewall policies and rules | Protect devices | Hands-on | 40 min |
| 43 | Attack surface reduction rules | Protect devices | Hands-on | 45 min |
| 44 | BitLocker: silent encryption, key escrow and recovery | Protect devices | Hands-on | 50 min |
| 45 | Defender for Endpoint: onboarding, EDR and device risk | Protect devices | Hands-on | 60 min |
| 46 | App Control for Business | Protect devices | Hands-on | 40 min |
| 47 | Update rings and Delivery Optimization | Updates | Hands-on | 45 min |
| 48 | Windows Autopatch, expedited updates and Hotpatch | Updates | Hands-on | 50 min |
| 49 | Android update management and update reporting | Updates | Hands-on | 40 min |
| 50 | iOS, iPadOS and macOS update policies | Updates | Walkthrough (device) | 30 min |
| 51 | Remote actions, bulk actions and credential rotation | Operate | Hands-on | 45 min |
| 52 | Device query with KQL and diagnostics collection | Operate | Hands-on | 40 min |
| 53 | Automate Intune with the Microsoft Graph PowerShell SDK | Automate and monitor | Hands-on | 50 min |
| 54 | Proactive remediations: detect and fix automatically | Automate and monitor | Hands-on | 45 min |
| 55 | Endpoint Analytics: startup, reliability and user experience | Automate and monitor | Hands-on | 40 min |
| 56 | Intune reporting, workbooks and data export | Automate and monitor | Hands-on | 35 min |
| 57 | Tenant health, service communications and alert rules | Automate and monitor | Hands-on | 35 min |
| 58 | Security Copilot agents in Intune | Automate and monitor | Walkthrough (licence) | 30 min |
| 59 | Endpoint Privilege Management | Advanced capabilities | Hands-on | 55 min |
| 60 | Remote Help, Enterprise App Catalog, Advanced Analytics and Tunnel for MAM | Advanced capabilities | Hands-on | 55 min |
| 61 | Capstone: rebuild the estate, then close your gaps | Capstone | Hands-on | 180 min |
<!-- END:CURRICULUM -->

## Lab hardware

Three Generation 2 Hyper-V virtual machines with a virtual TPM and Secure Boot, plus one Android Studio emulator using a **Google Play** system image.

The vTPM is not optional. Without it you cannot silently enable BitLocker, cannot use Windows Hello for Business with hardware-backed keys, and cannot satisfy the default compliance rules — and each of those failures looks like a policy problem rather than a hardware one.

Take a Hyper-V checkpoint of the third VM at its first out-of-box screen and revert to it before every Autopilot run. It will save you more time than anything else in this repository.

## Licence

MIT.
