export default {
  id: "certificates-and-network",
  moduleId: "m4",
  title: "Certificate profiles, Wi-Fi and VPN",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 45,

  scenario:
    "Contoso wants certificate-based Wi-Fi authentication rather than a shared key that leaks the moment one laptop is stolen. That requires a chain: a trusted root certificate so devices trust the issuer, a device or user certificate issued automatically, and a Wi-Fi profile that references it. You will build the profiles and understand the chain, including the ordering rule that quietly breaks most first attempts.",

  objectives: [
    "Deploy a trusted root certificate profile",
    "Explain the difference between SCEP and PKCS certificate profiles",
    "Create a Wi-Fi profile that authenticates with a certificate",
    "Describe how a VPN profile references a certificate for authentication",
    "State the deployment order the certificate chain requires"
  ],

  keyConcepts: ["Trusted root certificate", "SCEP", "PKCS", "NDES connector", "Certificate connector", "EAP-TLS", "Cloud PKI"],

  skills: [{ id: "g2.t2.s1", depth: "primary" }],

  requires: {
    licenses: ["M365-E5"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["adele.vance"],
    labs: ["settings-catalog"]
  },

  exercises: [
    {
      id: "e1",
      title: "The certificate chain",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Understand SCEP versus PKCS, and what each needs",
          steps: [
            {
              text: "Both deliver certificates to devices. They differ in where the private key is generated, which has real security consequences.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "SCEP", "PKCS"],
                  rows: [
                    ["Private key generated", "**On the device**, ideally in the TPM", "On the certification authority, then delivered to the device"],
                    ["Key ever leaves the device", "No", "Yes — it is transported"],
                    ["Infrastructure required", "NDES server, Intune Certificate Connector, a certification authority", "Intune Certificate Connector and a certification authority"],
                    ["Best for", "Device and user authentication certificates", "S/MIME email signing and encryption, where the same key must exist on several devices"],
                    ["Security preference", "**Preferred** where a choice exists", "Use when the key genuinely must be shared"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "SCEP is preferred because the private key is created in the device's TPM and never leaves it. PKCS exists for cases where the same key must be present on multiple devices — S/MIME being the standard example, since a user needs the same key on their laptop and their phone to read encrypted mail on both."
                }
              ]
            },
            {
              text: "Note what this lab can and cannot do:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Both SCEP and PKCS require an on-premises certification authority and the Intune Certificate Connector, which this lab does not have. **Microsoft Cloud PKI** removes that requirement entirely by hosting the certification authority in the service — but it is an Intune Suite capability and is not in Microsoft 365 E5. Lab 59 covers it. You will build the trusted root and Wi-Fi profiles here, which need no infrastructure, and read the SCEP profile without assigning it."
                }
              ]
            },
            {
              text: "Learn the ordering rule, which is the part that actually breaks deployments:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "The trusted root profile must reach the device **before** the SCEP or PKCS profile. A certificate profile whose issuing chain is not yet trusted fails, and Intune does not retry aggressively. Assign the root profile to a broader group and give it time, or accept that the first sync will fail and the second will succeed."
                }
              ]
            }
          ],
          result: {
            text: "You can choose between SCEP and PKCS and state the deployment order.",
            verify: [
              { text: "You can name the scenario that requires PKCS rather than SCEP." },
              { text: "You can state which profile must arrive first." }
            ]
          }
        },
        {
          id: "t2",
          title: "Create a trusted root certificate profile",
          checkpoint: true,
          steps: [
            {
              text: "Export a root certificate to upload. Any root will do for the mechanics — take one from your own machine's trusted root store:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  caption: "Exports the first available root certificate as .cer",
                  code: "$cert = Get-ChildItem Cert:\\LocalMachine\\Root | Select-Object -First 1\nExport-Certificate -Cert $cert -FilePath C:\\Temp\\labroot.cer -Type CERT\nWrite-Host \"Exported: $($cert.Subject)\""
                }
              ]
            },
            {
              text: "In the **Microsoft Intune admin center**, select **Devices**, **Configuration**, then **Create** > **New Policy**, platform **Windows 10 and later**, profile type **Templates** > **Trusted certificate**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Configure:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-Cert-TrustedRoot" },
                    { label: "Certificate file", value: "labroot.cer" },
                    { label: "Destination store", value: "Computer certificate store - Root" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "The destination store matters. A root certificate belongs in **Root**; an intermediate belongs in **Intermediate**. Putting an intermediate in the root store works but is wrong, and putting a root in the intermediate store breaks chain validation."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the profile."
            }
          ],
          result: {
            text: "Corporate devices trust the issuing authority.",
            verify: [
              { text: "`WIN-Cert-TrustedRoot` reports **Succeeded** on your devices." },
              { text: "The certificate appears in `Cert:\\LocalMachine\\Root` on a synced device." }
            ]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Wi-Fi and VPN profiles",
      estimatedMinutes: 25,
      tasks: [
        {
          id: "t1",
          title: "Create a certificate-authenticated Wi-Fi profile",
          checkpoint: true,
          steps: [
            {
              text: "Create a profile with platform **Windows 10 and later** and profile type **Templates** > **Wi-Fi**, named `WIN-WiFi-Corporate`."
            },
            {
              text: "Configure the network:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Wi-Fi type", value: "Enterprise" },
                    { label: "Wi-Fi name (SSID)", value: "Contoso-Corp" },
                    { label: "Connection name", value: "Contoso Corporate" },
                    { label: "Connect automatically when in range", value: "Enable" },
                    { label: "Connect to more preferred network if available", value: "Enable" },
                    { label: "Connect to this network even when it is not broadcasting its SSID", value: "Disable" }
                  ]
                }
              ]
            },
            {
              text: "Configure enterprise authentication:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Authentication method", value: "Certificates" },
                    { label: "EAP type", value: "EAP-TLS", note: "The certificate-based method. PEAP uses a password inside a TLS tunnel." },
                    { label: "Certificate server names", value: "The RADIUS server's certificate subject name" },
                    { label: "Root certificate for server validation", value: "WIN-Cert-TrustedRoot" },
                    { label: "Client certificate for client authentication", value: "Your SCEP or PKCS profile", note: "Not available in this lab — the field is where the chain is joined." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "This is where the chain comes together. The Wi-Fi profile references the trusted root profile for server validation and the SCEP or PKCS profile for the client certificate. Deleting either certificate profile silently breaks every Wi-Fi profile that references it — which is why certificate profiles should not be tidied away without checking what points at them."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "The profile deploys successfully even though the SSID does not exist in your lab. Windows stores it as a known network and connects if it ever sees it. You can confirm delivery with `netsh wlan show profiles` on a synced device."
                }
              ]
            }
          ],
          result: {
            text: "A certificate-authenticated enterprise Wi-Fi profile is deployed.",
            verify: [
              { text: "`WIN-WiFi-Corporate` reports **Succeeded**." },
              { text: "`netsh wlan show profiles` lists the Contoso network on a synced device." }
            ]
          }
        },
        {
          id: "t2",
          title: "Understand the VPN profile equivalent",
          steps: [
            {
              text: "VPN profiles follow the same pattern. Create one with profile type **Templates** > **VPN** to see the fields.",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Connection type", value: "IKEv2, L2TP, PPTP, Automatic, or a third-party client such as Cisco AnyConnect" },
                    { label: "Server address", value: "The VPN endpoint" },
                    { label: "Authentication method", value: "Certificates, or EAP" },
                    { label: "Authentication certificate", value: "A SCEP or PKCS profile" },
                    { label: "Always On", value: "Whether the tunnel establishes automatically" },
                    { label: "Split tunneling", value: "Whether only corporate traffic uses the tunnel" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Note the **per-app VPN** option on some connection types. It routes only nominated applications through the tunnel, which is how organisations give a managed app access to an internal service without putting the whole device on the corporate network. That capability, extended to unenrolled devices, is what **Microsoft Tunnel for MAM** provides — an Intune Suite feature covered in lab 59."
                }
              ]
            }
          ],
          result: {
            text: "You can describe how a VPN profile authenticates with a certificate and what per-app VPN achieves.",
            verify: [{ text: "You can name the Intune Suite feature that extends per-app VPN to unenrolled devices." }]
          }
        }
      ]
    }
  ],

  troubleshooting: [
    {
      symptom: "A SCEP certificate profile fails on every device with a chain or trust error.",
      rootCause:
        "The trusted root profile has not yet reached the device, so the issuing authority is untrusted when the certificate request completes.",
      diagnostic: {
        lang: "powershell",
        code: "Get-ChildItem Cert:\\LocalMachine\\Root | Where-Object Subject -like \"*Contoso*\"\nGet-WinEvent -LogName \"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin\" -MaxEvents 30 |\n    Where-Object Id -eq 814"
      },
      resolution:
        "Confirm the root certificate is present in the device's Root store before troubleshooting SCEP itself. Assign the trusted root profile to a broader group so it always lands first."
    }
  ],

  quiz: [
    {
      question:
        "Contoso needs S/MIME certificates so users can read encrypted email on both their laptop and their phone. Which certificate profile type is required?",
      options: [
        "PKCS, because the same private key must exist on multiple devices",
        "SCEP, because the private key is generated in the TPM",
        "A trusted certificate profile",
        "Either, since both generate the key on the certification authority"
      ],
      correctIndex: 0,
      rationale:
        "S/MIME requires the same private key on every device the user reads mail on. SCEP generates a unique key on each device that never leaves it, which makes it unsuitable — PKCS generates the key centrally and delivers it, which is exactly what this scenario needs.",
      examTip:
        "SCEP is the default and the more secure choice. PKCS is the answer only when a scenario requires the same key in more than one place, and S/MIME is the canonical example.",
      skills: ["g2.t2.s1"]
    },
    {
      question:
        "A Wi-Fi profile using EAP-TLS fails to connect on newly enrolled devices but works on devices enrolled last week. What is the most likely cause?",
      options: [
        "The trusted root certificate profile has not yet reached the new devices, so the certificate chain cannot be validated",
        "EAP-TLS is not supported on newly enrolled devices",
        "The Wi-Fi profile must be assigned to a user group rather than a device group",
        "The SSID is not broadcasting"
      ],
      correctIndex: 0,
      rationale:
        "Certificate profiles depend on the trusted root arriving first. Devices enrolled earlier already have the root, so they work; newly enrolled devices fail until the root profile syncs.",
      examTip:
        "Whenever a certificate-dependent feature works on older devices and fails on new ones, suspect profile ordering rather than the feature itself.",
      skills: ["g2.t2.s1"]
    }
  ]
};
