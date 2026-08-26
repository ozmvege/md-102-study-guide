export default {
  id: "certificates-and-network",
  moduleId: "m4",
  title: "Cloud PKI, certificate profiles, Wi-Fi and VPN",
  access: "hands-on",
  difficulty: "advanced",
  estimatedMinutes: 60,

  scenario:
    "Contoso wants certificate-based Wi-Fi authentication rather than a shared key that leaks the moment one laptop is stolen. That requires a chain: a certification authority to issue from, a trusted root so devices trust the issuer, a client certificate delivered automatically, and a Wi-Fi profile that references it. Historically the authority was the hard part — an on-premises PKI, an NDES server and a connector. Microsoft Cloud PKI removes all three, and since the July 2026 packaging change it is included with Microsoft 365 E5, so you can build the whole chain here.",

  objectives: [
    "Explain the difference between SCEP and PKCS certificate profiles",
    "Stand up a root and issuing certification authority with Microsoft Cloud PKI",
    "Deploy a trusted root certificate profile and a SCEP profile that issues from it",
    "Create a Wi-Fi profile that authenticates with the issued certificate",
    "Monitor certificate health, and state the deployment order the chain requires"
  ],

  keyConcepts: ["Microsoft Cloud PKI", "Root CA", "Issuing CA", "Trusted root certificate", "SCEP", "PKCS", "EAP-TLS", "Certificate health"],

  skills: [
    { id: "g2.t2.s1", depth: "primary" },
    { id: "g2.t3.s4", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "INTUNE-CLOUD-PKI"],
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
              text: "Note where the certification authority is going to come from:",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "SCEP and PKCS both traditionally require an on-premises certification authority plus, for SCEP, an NDES server and the Intune Certificate Connector — three servers to build, patch and keep running. **Microsoft Cloud PKI** hosts the authority in the service and removes all three. It became part of Microsoft 365 E5 in the July 2026 packaging change, which is why the next exercise builds a real, working chain rather than describing one."
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
          title: "Build the certification authority with Cloud PKI",
          checkpoint: true,
          steps: [
            {
              text: "In the **Microsoft Intune admin center**, select **Tenant administration**, then **Cloud PKI**, then **Create**.",
              nav: ["Tenant administration", "Cloud PKI", "Create"]
            },
            {
              text: "Create the **root** certification authority first:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Contoso Root CA" },
                    { label: "Description", value: "Offline root of the Contoso certificate hierarchy" },
                    { label: "CA type", value: "Root CA" },
                    { label: "Validity period (years)", value: "10" },
                    { label: "Extended key usages", value: "Leave default" },
                    { label: "Key size and algorithm", value: "RSA-4096, SHA-384" },
                    { label: "Subject attributes — Common name", value: "Contoso Root CA" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "note",
                  text: "A root CA signs nothing except its own issuing CAs, which is why its validity is long and its key is large. Cloud PKI also supports **bring your own root** — an issuing CA anchored under an existing on-premises root — which is how an organisation adopts Cloud PKI without reissuing every trust relationship it already has."
                }
              ]
            },
            {
              text: "Create the **issuing** certification authority under it:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "Contoso Issuing CA" },
                    { label: "CA type", value: "Issuing CA" },
                    { label: "Root CA", value: "Contoso Root CA" },
                    { label: "Validity period (years)", value: "5" },
                    { label: "Key size and algorithm", value: "RSA-2048, SHA-256" },
                    { label: "Subject attributes — Common name", value: "Contoso Issuing CA" }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Every certificate you issue comes from the **issuing** CA, never the root. That separation is why the root's private key can stay effectively untouched while the issuing CA does the daily work — and why compromising an issuing CA is recoverable by revoking it, whereas compromising a root is not."
                }
              ]
            },
            {
              text: "Wait for both authorities to finish provisioning, then download the root certificate.",
              nav: ["Tenant administration", "Cloud PKI", "Contoso Root CA"],
              parts: [
                {
                  kind: "verify",
                  text: "Both CAs show a status of **Active**. The root CA blade offers **Download certificate**, which produces the `.cer` you need for the trusted root profile in the next task."
                }
              ]
            }
          ],
          result: {
            text: "A two-tier certification authority exists in the service, with no servers to maintain.",
            verify: [
              { text: "**Cloud PKI** lists an Active root CA and an Active issuing CA beneath it." },
              { text: "You have downloaded the root CA certificate." }
            ]
          }
        },
        {
          id: "t3",
          title: "Deploy the trusted root and issue certificates with SCEP",
          checkpoint: true,
          steps: [
            {
              text: "Create the trusted root profile: **Devices** > **Configuration** > **Create** > **New Policy**, platform **Windows 10 and later**, profile type **Templates** > **Trusted certificate**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Configure it:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-Cert-TrustedRoot" },
                    { label: "Certificate file", value: "The Contoso Root CA .cer you downloaded" },
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
            },
            {
              text: "Now create the SCEP profile that actually issues certificates. Create another profile, platform **Windows 10 and later**, profile type **Templates** > **SCEP certificate**.",
              nav: ["Devices", "Configuration", "Create", "New Policy"]
            },
            {
              text: "Configure it:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Name", value: "WIN-Cert-SCEP-Device" },
                    { label: "Certificate type", value: "Device" },
                    { label: "Subject name format", value: "CN={{DeviceName}}" },
                    { label: "Subject alternative name", value: "DNS = {{DeviceName}}" },
                    { label: "Certificate validity period", value: "1 year" },
                    { label: "Key storage provider (KSP)", value: "Enroll to Trusted Platform Module (TPM) KSP, otherwise fail", note: "The vTPM from lab 2 earns its keep again — the private key is generated in hardware and cannot be exported." },
                    { label: "Key usage", value: "Digital signature, Key encipherment" },
                    { label: "Key size (bits)", value: "2048" },
                    { label: "Hash algorithm", value: "SHA-2" },
                    { label: "Root Certificate", value: "WIN-Cert-TrustedRoot" },
                    { label: "Extended key usage", value: "Client Authentication" },
                    { label: "SCEP Server URLs", value: "Select the Contoso Issuing CA", note: "Cloud PKI populates this for you — there is no NDES URL to type because there is no NDES server." }
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "Compare this with what the same profile needed before Cloud PKI: an NDES server published to the internet, the Intune Certificate Connector installed and registered, a SCEP challenge password mechanism, and a certificate template configured on an on-premises CA. The profile fields are identical; three servers have disappeared from behind them."
                }
              ]
            },
            {
              text: "Assign to `GRP-DEV-WIN-CORP` and create the profile.",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Assign the trusted root profile **before** the SCEP profile, or accept that the first sync fails. A certificate request whose issuing chain is not yet trusted is rejected, and Intune does not retry aggressively. This ordering rule is the single most common cause of a Cloud PKI deployment that appears broken on day one and fixes itself on day two."
                }
              ]
            },
            {
              text: "On **MD102-VM1-Adele**, sync policy, wait, then confirm the certificate arrived:",
              parts: [
                {
                  kind: "code",
                  lang: "powershell",
                  code: "Get-ChildItem Cert:\\LocalMachine\\Root | Where-Object Subject -like \"*Contoso Root CA*\" |\n    Select-Object Subject, NotAfter\n\nGet-ChildItem Cert:\\LocalMachine\\My | Where-Object Issuer -like \"*Contoso Issuing CA*\" |\n    Select-Object Subject, Issuer, NotAfter,\n        @{n='HasPrivateKey';e={$_.HasPrivateKey}},\n        @{n='Provider';e={$_.PrivateKey.CspKeyContainerInfo.ProviderName}}"
                },
                {
                  kind: "verify",
                  text: "The Contoso root is in the machine Root store, and a client certificate issued by Contoso Issuing CA is in the machine Personal store with a private key. This is a real certificate, issued on demand, with no PKI infrastructure of your own."
                }
              ]
            },
            {
              text: "Check certificate health in the portal — the third part of the exam objective.",
              nav: ["Tenant administration", "Cloud PKI", "Contoso Issuing CA"],
              parts: [
                {
                  kind: "table",
                  headers: ["View", "Shows"],
                  rows: [
                    ["Issued certificates", "Every certificate this CA has issued, with subject, serial and expiry"],
                    ["Certificate status", "Active, expiring and revoked counts"],
                    ["Revoke", "Revokes an individual certificate; the service maintains the revocation list"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "With an on-premises authority this information lives in the CA console and is nobody's job to watch. Having issued, expiring and revoked counts in the same portal as the devices is what the objective means by *monitoring certificate health* — and it is why a certificate expiry no longer has to become an outage."
                }
              ]
            }
          ],
          result: {
            text: "Devices trust the Contoso root and hold a TPM-protected client certificate issued by Cloud PKI.",
            verify: [
              { text: "The root certificate is present in `Cert:\\LocalMachine\\Root`." },
              { text: "A client certificate issued by the Contoso Issuing CA is present with a private key." },
              { text: "The issuing CA reports the certificate under **Issued certificates**." }
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
                    { label: "Client certificate for client authentication", value: "WIN-Cert-SCEP-Device", note: "The SCEP profile from exercise 1. This field is where the chain is joined." }
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
                  text: "Note the **per-app VPN** option on some connection types. It routes only nominated applications through the tunnel, which is how organisations give a managed app access to an internal service without putting the whole device on the corporate network. That capability, extended to devices that are not enrolled at all, is what **Microsoft Tunnel for MAM** provides — covered in lab 59."
                }
              ]
            }
          ],
          result: {
            text: "You can describe how a VPN profile authenticates with a certificate and what per-app VPN achieves.",
            verify: [{ text: "You can name the feature that extends per-app VPN to unenrolled devices." }]
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
      id: "q1",
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
      id: "q2",
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
