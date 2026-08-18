# MD-102 Lab Platform

A hands-on lab curriculum for **Exam MD-102: Managing and Securing Microsoft 365 Endpoints by using Intune**, built for a 25-seat Microsoft 365 E5 trial, three Hyper-V virtual machines and a free Android emulator.

<!-- BEGIN:SUMMARY -->
| | |
| --- | --- |
| Exam | **MD-102** — Managing and Securing Microsoft 365 Endpoints by using Intune |
| Skills outline | 2026-07-24 ([source](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102)) |
| Labs | 1 across 13 modules (1 hands-on, 0 walkthrough) |
| Lab time | ~1 hours |
| Objective coverage | 0 of 83 skill bullets (0%) |
<!-- END:SUMMARY -->

## What this is

Every lab maps to specific **skill bullets** of the current skills measured outline — not just to a domain. That mapping is machine-checked: a lab claiming an objective that does not exist fails the build, and the coverage view lists any bullet no lab teaches. "Aligned with the exam" is a computed fact here, not a claim in a readme.

Labs are written in the shape Microsoft uses for its own lab guides — lab scenario, objectives, estimated time, prerequisites, then numbered exercises and tasks with exact navigation paths and settings tables, each closing with a results block telling you how to know it worked.

### Honest access badges

The exam covers capabilities that Microsoft 365 E5 does not include. Rather than pretend otherwise, every lab carries a badge:

| Badge | Meaning |
| --- | --- |
| **Hands-on** | You can complete it with Microsoft 365 E5 and the lab hardware. |
| **Walkthrough (licence)** | Needs Intune Plan 2, the Intune Suite, Windows 365 or Security Copilot. Exact configuration paths, decision criteria and exam drills, plus how to start the free 90-day add-on trial if you want to run it for real. |
| **Walkthrough (device)** | Needs Apple hardware or an Apple Business Manager organisation. |

## Getting started

Open `index.html`. That is the whole setup — no server, no build, no network. It works from the filesystem and from GitHub Pages, and it works offline.

Set your tenant prefix in the header and every UPN, script and command across all labs rewrites itself to match your tenant.

Then start at lab 1. The curriculum builds one tenant from nothing and each lab depends only on labs before it, so the order is the point.

<!-- BEGIN:COVERAGE -->
| Exam group | Weight | Skill bullets | Labs | Lab time |
| --- | --- | --- | --- | --- |
| Prepare infrastructure for devices | 20–25% | 0/18 | 0 | 0 h |
| Manage and maintain devices | 25–30% | 0/27 | 0 | 0 h |
| Protect devices | 15–20% | 0/15 | 0 | 0 h |
| Manage and secure applications | 15–20% | 0/12 | 0 | 0 h |
| Optimize endpoint operations by using automation, monitoring, and reporting | 10–15% | 0/11 | 0 | 0 h |
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
| `js/content.bundle.js` | **Generated.** The single file the browser loads. |
| `js/app/inline.js` | **Generated** from `tools/lib/inline.mjs`, so the browser and the Markdown emitter can never disagree about markup. |
| `LAB_GUIDE.md` | **Generated.** Offline and print copy of the whole curriculum. |

Authored text uses a restricted markup with exactly five productions — `**UI element**`, `` `code` ``, `*emphasis*`, `[text](url)` and `<tenant>`. Raw HTML is rejected by the validator. That restriction is what lets the same content render to both HTML and Markdown, and it is why `LAB_GUIDE.md` can be generated instead of hand-maintained.

```bash
npm run validate
```

Validation fails on an unknown skill id, a lab with no primary objective mapping, a checkpoint with no way to verify it, a prerequisite pointing at a later lab, an unknown error code, raw HTML in authored text, or a seat budget over 20. CI additionally runs `npm run check`, which fails if a generated artifact is out of date with `content/`.

<!-- BEGIN:CURRICULUM -->
| # | Lab | Module | Access | Time |
| --- | --- | --- | --- | --- |
| 1 | Set up the tenant and the 20/5 licence budget | Lab environment | Hands-on | 45 min |
<!-- END:CURRICULUM -->

## Lab hardware

Three Generation 2 Hyper-V virtual machines with a virtual TPM and Secure Boot, plus one Android Studio emulator using a **Google Play** system image.

The vTPM is not optional. Without it you cannot silently enable BitLocker, cannot use Windows Hello for Business with hardware-backed keys, and cannot satisfy the default compliance rules — and each of those failures looks like a policy problem rather than a hardware one.

Take a Hyper-V checkpoint of the third VM at its first out-of-box screen and revert to it before every Autopilot run. It will save you more time than anything else in this repository.

## Licence

MIT.
