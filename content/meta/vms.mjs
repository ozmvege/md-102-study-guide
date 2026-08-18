/**
 * The lab hardware: three Hyper-V virtual machines and one Android emulator.
 *
 * Every VM is Generation 2 with a virtual TPM and Secure Boot enabled. That is not
 * decoration — without a vTPM you cannot silently enable BitLocker, cannot use
 * Windows Hello for Business with hardware key storage, and cannot satisfy the
 * default compliance rules. A Generation 1 VM will fail those labs in ways that
 * look like policy problems and are not.
 */

export default [
  {
    id: "vm1-adele",
    name: "MD102-VM1-Adele",
    persona: "adele.vance",
    platform: "Windows",
    generation: "Generation 2 (UEFI)",
    vtpm: "Enabled",
    secureBoot: "Enabled (Microsoft Windows template)",
    cpu: "2 virtual processors",
    memory: "4096 MB startup, dynamic 2048–6144 MB",
    disk: "80 GB dynamically expanding VHDX",
    os: "Windows 11 Pro 24H2 or later",
    network: "Default Switch (NAT)",
    role:
      "The everyday corporate desktop. Entra joined by hand, upgraded from Pro to Enterprise by subscription activation, pilot update ring, elevation and local-group testing."
  },
  {
    id: "vm2-alex",
    name: "MD102-VM2-Alex",
    persona: "alex.wilber",
    platform: "Windows",
    generation: "Generation 2 (UEFI)",
    vtpm: "Enabled",
    secureBoot: "Enabled (Microsoft Windows template)",
    cpu: "2 virtual processors",
    memory: "4096 MB startup, dynamic 2048–6144 MB",
    disk: "80 GB dynamically expanding VHDX",
    os: "Windows 11 Pro 24H2 or later",
    network: "Default Switch (NAT)",
    role:
      "The security subject. BitLocker silent encryption and key escrow, Windows LAPS, custom compliance, Defender onboarding, and the Conditional Access block test."
  },
  {
    id: "vm3-megan",
    name: "MD102-VM3-Megan",
    persona: "megan.bowen",
    platform: "Windows",
    generation: "Generation 2 (UEFI)",
    vtpm: "Enabled",
    secureBoot: "Enabled (Microsoft Windows template)",
    cpu: "2 virtual processors",
    memory: "4096 MB startup, dynamic 2048–6144 MB",
    disk: "80 GB dynamically expanding VHDX",
    os: "Windows 11 Pro 24H2 or later, kept at the out-of-box experience",
    network: "Default Switch (NAT)",
    role:
      "The provisioning target. Never sign in to it manually. Take a Hyper-V checkpoint at the first out-of-box screen and revert to it before every Autopilot and device preparation run — that checkpoint is worth more than any script in this course.",
    checkpoint: "OOBE-Clean"
  },
  {
    id: "avd-android",
    name: "Android Studio AVD",
    persona: "diego.siciliani",
    platform: "Android",
    generation: "Android Virtual Device",
    vtpm: "Not applicable",
    secureBoot: "Not applicable",
    cpu: "Pixel hardware profile",
    memory: "4096 MB",
    disk: "32 GB internal storage",
    os: "Android 14 or later, an image WITH Google Play",
    network: "Emulator NAT bridge",
    role:
      "Android Enterprise work profile, fully managed and dedicated enrollment. Free. The image must include Google Play, or the Company Portal cannot provision a work profile at all.",
    warning:
      "Pick a system image labelled Google Play, not Google APIs and not AOSP. This is the single most common reason an Android enrollment lab cannot be completed."
  }
];
