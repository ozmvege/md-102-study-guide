<!-- GENERATED FILE — edit content/labs/*.mjs and run: npm run build -->

# MD-102 — Managing and Securing Microsoft 365 Endpoints by using Intune

Hands-on lab curriculum for the Microsoft 365 Certified: Endpoint Administrator Associate certification.

Aligned to the skills measured outline of **2026-07-24** ([source](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102)). 1 labs across 13 modules covering 0 of 83 skill bullets.

## Exam objective coverage

| Group | Weight | Skill bullets covered | Labs | Lab time |
| --- | --- | --- | --- | --- |
| Prepare infrastructure for devices | 20–25% | 0/18 | 0 | 0 h |
| Manage and maintain devices | 25–30% | 0/27 | 0 | 0 h |
| Protect devices | 15–20% | 0/15 | 0 | 0 h |
| Manage and secure applications | 15–20% | 0/12 | 0 | 0 h |
| Optimize endpoint operations by using automation, monitoring, and reporting | 10–15% | 0/11 | 0 | 0 h |

> [!WARNING]
> 83 skill bullets are not yet covered by any lab.

## Curriculum

**Module 0 — Build the lab environment** — Stand up the tenant, the virtual machines and the 20 identities everything else is built on. None of this is examined; all of it is required before any other lab will work.

1. [Set up the tenant and the 20/5 licence budget](#lab-1-set-up-the-tenant-and-the-20-5-licence-budget)

# Module 0 — Build the lab environment

Stand up the tenant, the virtual machines and the 20 identities everything else is built on. None of this is examined; all of it is required before any other lab will work.

## Lab 1: Set up the tenant and the 20/5 licence budget

**Access:** Hands-on · **Estimated time:** 45 minutes · **Difficulty:** foundational

### Lab scenario

You are the incoming endpoint administrator at Contoso. A Microsoft 365 E5 trial has been signed up for and nothing has been done with it. Before a single device is enrolled you need to know exactly what the subscription entitles you to, how many seats you can spend, and how those seats will be assigned. Getting this wrong is the single most common way a lab tenant becomes unusable halfway through: seats run out, group-based licensing silently stops assigning, and every subsequent enrollment fails with an error that points at the device rather than the licence.

### Objectives

After completing this lab, you will be able to:

- Confirm which capabilities your Microsoft 365 E5 subscription includes and which it does not
- Read tenant status in the Microsoft Intune admin center and interpret the licence counts
- Create the group-based licensing group that every persona in this course will use
- Establish the 20 active plus 5 reserve seat budget and understand why the reserve exists
- Confirm that administrator accounts do not need to consume a licence

### Prerequisites

- Licences: M365-E5
- Roles: Global Administrator
- Devices and portals: Microsoft 365 admin center, Microsoft Intune admin center, Microsoft Entra admin center

### Exercise 1: Confirm what the subscription actually gives you

About a quarter of the MD-102 objectives cover capabilities that are *not* in Microsoft 365 E5. Knowing which is which now saves you from designing a lab around a feature you cannot switch on.

#### Task 1: Review your subscription and seat count

1. Open a browser and sign in to the **Microsoft 365 admin center** at `https://admin.microsoft.com` as your Global Administrator.

2. In the left navigation select **Billing**, then select **Your products**.
   *Path:* **Billing** > **Your products**

3. Locate your **Microsoft 365 E5** subscription and record the following:

   | Setting | Value |
   | --- | --- |
   | Licences purchased | **25** <br> A standard trial. If yours differs, use your real number as the pool and keep a 5-seat reserve. |
   | Licences assigned | **0 or 1** <br> 1 if the signup account was licensed automatically. |
   | Expires or renews on | **Record this date** |

   > [!IMPORTANT]
   > Write the expiry date somewhere you will see it. A trial that lapses mid-course takes your Conditional Access policies, compliance state and enrolled devices with it, and there is no way to get the tenant back to where it was.

4. Select the **Microsoft 365 E5** subscription to open its details, then review the list of included services.

**Results:** You know your seat pool and your expiry date.

- [ ] **Your products** lists an active **Microsoft 365 E5** subscription.
- [ ] You have recorded the total number of licences and the renewal date.

#### Task 2: Separate what is included from what is not

1. Read the table below. It is the licence boundary this entire course is built around, and several MD-102 objectives sit on the wrong side of it.

2. Included with Microsoft 365 E5 — everything here you can do hands-on:

   | Capability | Comes from | What it unlocks in this course |
   | --- | --- | --- |
   | Microsoft Intune Plan 1 | M365 E5 | Enrollment, configuration, compliance, apps, endpoint security, update rings |
   | Microsoft Entra ID P2 | M365 E5 | Conditional Access, dynamic groups, PIM, administrative units |
   | Defender for Endpoint Plan 2 | M365 E5 | EDR, device risk feeding compliance, incident triage |
   | Windows 11 Enterprise E5 | M365 E5 | Subscription activation from Pro to Enterprise |
   | Windows Autopatch | Windows Enterprise E3 or E5 | Autopatch groups and release management |

3. Not included — these are examined, so this course covers them as walkthroughs rather than pretending you can run them:

   | Capability | Needs | How this course handles it |
   | --- | --- | --- |
   | Endpoint Privilege Management | Intune Suite | Walkthrough with exact configuration paths |
   | Remote Help, Advanced Analytics | Intune Plan 2 or Suite | Walkthrough |
   | Microsoft Cloud PKI, Enterprise App Catalog | Intune Suite | Walkthrough |
   | Microsoft Tunnel for MAM | Intune Plan 2 or Suite | Walkthrough |
   | Windows 365 Cloud PC | Windows 365 subscription | Walkthrough |
   | Security Copilot agents in Intune | Security Compute Units | Walkthrough |
   | Apple Business Manager, VPP | Apple organisation and hardware | Walkthrough |

   > [!TIP]
   > The Intune advanced capabilities each have a free 90-day trial for up to 250 users, started from **Tenant administration** in the Intune admin center. You do not need it for this course and you should not start it now — the clock runs whether you use it or not, and you only get one per capability per tenant. Module 11 tells you exactly when it is worth spending.

**Results:** You can state which examined capabilities you can practise and which you will study without a tenant.

- [ ] You can name at least three examined capabilities that Microsoft 365 E5 does not include.

### Exercise 2: Read tenant status in the Intune admin center

#### Task 1: Inspect tenant status and the MDM authority

1. Sign in to the **Microsoft Intune admin center** at `https://intune.microsoft.com`.

2. Select **Tenant administration**, then select **Tenant status**.
   *Path:* **Tenant administration** > **Tenant status**

3. On the **Tenant details** tab, record these three values:

   | Setting | Value |
   | --- | --- |
   | MDM authority | **Microsoft Intune** |
   | Total licensed users | **Record the current number** |
   | Total Intune licenses | **Record the current number** |

   > [!NOTE]
   > In tenants created in recent years the MDM authority is already set to **Microsoft Intune** and there is nothing to configure. Older guidance tells you to set it manually; if yours already reads **Microsoft Intune**, that step is done. The exam still expects you to know the MDM authority determines which service manages enrolled devices, and that it used to be a one-way choice between Intune and Configuration Manager.

4. Select the **Connector status** tab and note which connectors are configured. All of them will be empty at this point — you will configure the Defender for Endpoint and Managed Google Play connectors in later modules.

5. Select the **Service health and message center** tab. This is where Intune service incidents and change notices appear, and it is an examined surface in the operations domain — you will come back to it in lab 55.

**Results:** You can read tenant status and know where service health and connector state live.

- [ ] **MDM authority** displays **Microsoft Intune**.
- [ ] You have recorded **Total Intune licenses** for comparison later.

### Exercise 3: Create the licensing group and turn on group-based licensing

Every persona in this course receives its Microsoft 365 E5 licence through one group. Assigning licences to users individually works for three accounts and becomes unmanageable at twenty — and group-based licensing is how it is done in production, so it is how you should learn it.

#### Task 1: Create the licensing security group

1. Sign in to the **Microsoft Entra admin center** at `https://entra.microsoft.com`.

2. Select **Groups**, then select **All groups**, then select **New group**.
   *Path:* **Groups** > **All groups** > **New group**

3. Configure the group as follows:

   | Setting | Value |
   | --- | --- |
   | Group type | **Security** |
   | Group name | **GRP-LIC-M365-E5** |
   | Group description | **Group-based licensing for Microsoft 365 E5. Membership grants a seat.** |
   | Microsoft Entra roles can be assigned to the group | **No** |
   | Membership type | **Assigned** |

   > [!IMPORTANT]
   > Use **Assigned** membership, not **Dynamic User**. A dynamic rule that accidentally matches every user in the tenant will try to assign 25 licences at once, exhaust the pool, and leave you diagnosing enrollment failures that have nothing to do with enrollment.

4. Leave **Owners** and **Members** empty for now. Lab 3 creates the personas and adds them.

   a. Select **Create**.
   b. Wait for the notification confirming the group was created.

**Results:** The licensing group exists and is empty.

- [ ] **All groups** lists `GRP-LIC-M365-E5` with a membership type of **Assigned**.
- [ ] The group has **0** members.

#### Task 2: Assign the Microsoft 365 E5 licence to the group

1. In the **Microsoft Entra admin center**, select **Billing**, then select **Licenses**, then select **All products**.
   *Path:* **Billing** > **Licenses** > **All products**

2. Select **Microsoft 365 E5**, then select **Assign**.

3. Under **Users and groups**, select `GRP-LIC-M365-E5`, then choose **Select**.

4. Select **Assignment options** and review the individual service plans. Leave every service enabled.

   > [!NOTE]
   > Assignment options are how you would grant, for example, Intune without Exchange Online. Turning services off here is a legitimate production technique and an exam-relevant one, but for this course you want the full stack enabled.

5. Select **Assign** to save the group licence assignment.

**Results:** Any account added to the group will now receive a Microsoft 365 E5 seat automatically.

- [ ] **Microsoft 365 E5** shows `GRP-LIC-M365-E5` under its licensed groups.
- [ ] The group's **License** blade shows Microsoft 365 E5 with no assignment errors.

### Exercise 4: Set the seat budget and confirm admins are free

#### Task 1: Confirm unlicensed administrator access

1. In the **Microsoft Intune admin center**, select **Tenant administration**, select **Roles**, then select **Administrator Licensing**.
   *Path:* **Tenant administration** > **Roles** > **Administrator Licensing**

2. Check whether **Allow access to unlicensed admins** is already enabled.

   | Tenant created | What you should see | Action |
   | --- | --- | --- |
   | After July 2021 | Unlicensed admin access already permitted | None. This is the default. |
   | Before July 2021 | The setting is off | Select **Yes** to enable it |

   > [!WARNING]
   > Enabling **Allow access to unlicensed admins** cannot be undone. On a lab tenant that is fine and it is what buys you back three E5 seats. Understand that it is one-way before you select **Yes**.

3. Note what this does and does not do. It removes the Intune licence requirement for administrators; it does not remove licence requirements for anything else. An admin who needs Conditional Access still needs Microsoft Entra ID P1 or P2 from somewhere.

**Results:** Administrator accounts in this course will not consume a Microsoft 365 E5 seat.

- [ ] Unlicensed admin access is permitted in **Administrator Licensing**.

#### Task 2: Commit to the 20 active plus 5 reserve budget

1. Read the budget you are about to spend. Lab 3 creates exactly these identities.

   | Category | Seats | Licensed |
   | --- | --- | --- |
   | Administrators (break-glass, Intune, Security) | 3 accounts | No — unlicensed admin access |
   | Corporate Windows personas | 6 | Yes |
   | Mobile and BYOD personas | 4 | Yes |
   | Executive and delegated-admin personas | 4 | Yes |
   | Test, pilot, shared and staging identities | 6 | Yes |
   | **Total licensed** | **20** | Yes |
   | **Safety reserve, never assigned** | **5** | No |

2. Understand why the reserve exists, because this is the failure it prevents.

   > [!IMPORTANT]
   > Group-based licensing assigns seats asynchronously. If the pool is exhausted at the moment an account lands in `GRP-LIC-M365-E5`, the assignment fails quietly — the user object looks normal, and the only symptom appears much later when that user tries to enroll a device and gets `0x80180018`. Five unassigned seats mean the pool can absorb a mistake without producing a failure that looks like something else entirely.

3. Return to **Billing**, then **Licenses** in the Microsoft 365 admin center and confirm at least 5 seats remain unassigned. You will re-check this after lab 3 creates the personas.
   *Path:* **Billing** > **Licenses**

**Results:** You have a written seat budget and understand the failure the reserve prevents.

- [ ] At least **5** Microsoft 365 E5 seats are unassigned.
- [ ] You can explain what `0x80180018` means without looking it up.

### Scripts

#### Report your licence pool and remaining seats

> [!NOTE]
> Run this before and after lab 3. If **Remaining** ever drops below 5, stop and remove an account rather than pressing on — a pool at zero produces enrollment failures that look like device problems.

```powershell
# Requires: Install-Module Microsoft.Graph -Scope CurrentUser
Connect-MgGraph -Scopes "Organization.Read.All","User.Read.All"

$skus = Get-MgSubscribedSku
foreach ($sku in $skus) {
    $total    = $sku.PrepaidUnits.Enabled
    $used     = $sku.ConsumedUnits
    $remaining = $total - $used

    [pscustomobject]@{
        Sku       = $sku.SkuPartNumber
        Total     = $total
        Assigned  = $used
        Remaining = $remaining
        Status    = if ($remaining -lt 5) { "BELOW RESERVE" } else { "OK" }
    }
}

Disconnect-MgGraph
```

### Troubleshooting

**Symptom:** A persona was added to `GRP-LIC-M365-E5` but the account still shows **Unlicensed** in the Microsoft 365 admin center hours later.

- **Root cause:** Either the licence pool was exhausted when the membership was evaluated, or the user has no **Usage location** set. Group-based licensing cannot assign a seat to an account with no usage location, and it fails without a prompt.
- **Diagnostic:**

  ```powershell
  Get-MgUser -UserId "alex.wilber@<tenant>.onmicrosoft.com" -Property UsageLocation,AssignedLicenses,LicenseAssignmentStates |
      Select-Object -ExpandProperty LicenseAssignmentStates
  ```

- **Resolution:** Set the **Usage location** on the user, then check the group's **Licenses** blade for assignment errors. The lab 3 provisioning script sets usage location on creation precisely to avoid this.
- **Error codes:** `0x80180018`

### Knowledge check

**Q1.** You assign Microsoft 365 E5 to a security group. A new user is added to the group but remains unlicensed. Every other member of the group is licensed correctly and 8 seats are free. What is the most likely cause?

A. The user has no usage location set
B. The group membership type is Assigned rather than Dynamic
C. The MDM authority has not been set to Microsoft Intune
D. The user needs to sign in once before the licence applies

<details><summary>Answer</summary>

**A** — Group-based licensing cannot assign a seat to an account with no usage location, because licence availability is determined per country. Seats being free rules out an exhausted pool, and membership type has no bearing on whether an individual member gets licensed.

*Exam tip:* When a licensing question tells you seats are available, the answer is almost always usage location or a service-plan conflict — not the pool.

</details>

**Q2.** Your tenant was created in 2024. You want your Intune administrators to manage the service without consuming Microsoft 365 E5 seats. What must you do?

A. Nothing — unlicensed admin access is enabled by default for tenants created after July 2021
B. Enable Allow access to unlicensed admins under Administrator Licensing
C. Assign each administrator an Intune device-only licence
D. Add the administrators to a group excluded from group-based licensing

<details><summary>Answer</summary>

**A** — Unlicensed admin access is on by default for tenants created after July 2021. Only older tenants need the setting enabled manually, and that change cannot be reversed.

*Exam tip:* Remember the July 2021 cutoff and that enabling the setting is one-way. Device-only licences are for unattended kiosk and dedicated devices, not for administrators.

</details>

---
