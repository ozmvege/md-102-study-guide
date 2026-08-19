/**
 * Diagnostic error dictionary.
 *
 * These are the codes worth recognising on sight — both on the exam, where a
 * scenario question often turns on one of them, and in the labs, where several are
 * deliberately provoked so you meet them under controlled conditions.
 *
 * Labs reference codes from `troubleshooting[].errorCodes`; the build fails on an
 * unknown code, so this list and the labs cannot drift apart.
 */

export default [
  {
    code: "0x80180018",
    symbol: "MENROLL_E_LICENSE",
    area: "Enrollment",
    rootCause:
      "The user attempting enrollment has no Intune licence. In this lab that almost always means group-based licensing has not finished assigning a seat, or the seat pool is exhausted.",
    resolution:
      "Confirm the user is a member of GRP-LIC-M365-E5 and that the group licence assignment shows no errors under Microsoft 365 admin center > Billing > Licenses. Keep five seats unassigned so the pool cannot run dry mid-enrollment."
  },
  {
    code: "0x80180014",
    symbol: "MENROLL_E_PLATFORM_BLOCKED",
    area: "Enrollment",
    rootCause:
      "An enrollment restriction blocked the attempt: the platform is blocked, the OS version is below the configured minimum or above the maximum, or personally-owned devices are blocked for this platform.",
    resolution:
      "Review Devices > Enrollment > Enrollment device platform restrictions. To let a specific device through as corporate, add its serial number or IMEI under Corporate device identifiers."
  },
  {
    code: "0x80180026",
    symbol: "MENROLL_E_DEVICECAPREACHED",
    area: "Enrollment",
    rootCause: "The user has reached the device limit set in the enrollment device limit restriction.",
    resolution:
      "Retire the user's stale devices, or raise the limit under Devices > Enrollment > Enrollment device limit restrictions. Note the Intune limit is separate from the Entra ID per-user device quota, and both can block a join."
  },
  {
    code: "0x801c03f2",
    symbol: "DSREG_E_DEVICE_MAXIMUM_REACHED",
    area: "Entra join",
    rootCause:
      "The Microsoft Entra ID per-user maximum number of devices has been reached. This is an Entra quota, not an Intune one, so raising the Intune device limit does not fix it.",
    resolution:
      "Delete stale device objects in Microsoft Entra ID, or raise Devices > Device settings > Maximum number of devices per user."
  },
  {
    code: "0x87D1041C",
    symbol: "ERROR_DETECTION_FAILED",
    area: "Applications",
    rootCause:
      "A Win32 app installer returned success but the detection rule then evaluated to false, so Intune reports the install as failed. The software is usually installed correctly; the rule is wrong.",
    resolution:
      "Check the detection rule against the machine: correct registry hive and 32/64-bit view, correct file path under Program Files versus Program Files (x86), and for script detection remember that STDOUT must contain output AND the script must exit 0."
  },
  {
    code: "0x80070005",
    symbol: "E_ACCESSDENIED",
    area: "Applications and scripts",
    rootCause:
      "Access denied while installing an app, running a script or applying a CSP. Most often the payload was deployed in user context but writes to HKEY_LOCAL_MACHINE or Program Files.",
    resolution:
      "Set the install behaviour or script context to System. If the app genuinely must run per-user, target a user group rather than a device group and write to HKEY_CURRENT_USER."
  },
  {
    code: "0x80070002",
    symbol: "ERROR_FILE_NOT_FOUND",
    area: "Applications",
    rootCause:
      "The installer or script could not find a referenced file. Commonly a relative path that was valid on your workstation but not inside the extracted .intunewin package.",
    resolution:
      "Repackage with the correct setup folder as the source, quote paths containing spaces, and verify what was actually staged in C:\\Windows\\IMECache."
  },
  {
    code: "0x80070032",
    symbol: "ERROR_NOT_SUPPORTED",
    area: "Configuration",
    rootCause: "The CSP or setting is not supported on the target edition or Windows build.",
    resolution:
      "Check the setting's minimum build and edition. Several settings that appear in the settings catalog for Windows require Enterprise, so a Pro device silently reports not applicable rather than failing loudly."
  },
  {
    code: "0x8007064C",
    symbol: "ERROR_INSTALL_ALREADY_RUNNING",
    area: "Applications",
    rootCause: "Another MSI transaction is in progress; two Win32 apps were assigned without a dependency relationship.",
    resolution:
      "Express the ordering with a dependency on the app rather than relying on assignment timing, and confirm no other installer is mid-flight on the device."
  },
  {
    code: "0x800705B4",
    symbol: "ERROR_TIMEOUT",
    area: "Enrollment Status Page",
    rootCause:
      "The Enrollment Status Page timed out waiting for a blocking app or profile. The default timeout is 60 minutes and blocking apps that never install will always consume all of it.",
    resolution:
      "Reduce the set of blocking apps to the genuine minimum, raise the timeout deliberately rather than by accident, and decide whether the user should be allowed to continue past the failure."
  },
  {
    code: "0x82AA0008",
    symbol: "Autopilot profile not assigned",
    area: "Autopilot",
    rootCause:
      "The device has a hardware hash registered but no deployment profile assigned, or the profile assignment has not yet reached the device.",
    resolution:
      "Confirm the device appears under Devices > Enrollment > Devices with a Profile status of Assigned. Group assignment is not instantaneous, and a device that reaches OOBE before assignment completes will not use Autopilot at all."
  },
  {
    code: "0x80004005",
    symbol: "E_FAIL",
    area: "General",
    rootCause: "Unspecified failure. On its own this code carries almost no information.",
    resolution:
      "Do not chase this code. Collect diagnostics and read the specific failure in the Intune Management Extension logs under C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs, or the MDM Diagnostics report."
  }
];
