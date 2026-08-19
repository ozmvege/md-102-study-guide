export default {
  id: "intune-suite-capabilities",
  moduleId: "m11",
  title: "Remote Help, Enterprise App Catalog, Cloud PKI, Tunnel for MAM and Advanced Analytics",
  access: "walkthrough-license",
  accessReason:
    "All five capabilities require Microsoft Intune Plan 2 or the Intune Suite, neither of which is part of Microsoft 365 E5. Each has a free 90-day trial for up to 250 users, started from Tenant administration > Intune add-ons — lab 58 covers whether starting it is worth your one attempt. This lab gives you the configuration surfaces, the prerequisites and the decision criteria the exam asks for.",
  difficulty: "intermediate",
  estimatedMinutes: 45,

  scenario:
    "The remaining Intune Suite objectives cover five capabilities that each solve a problem you have already met in this course: helping a user you cannot see, packaging applications you would rather not package, running a certification authority you would rather not run, giving unmanaged devices access to internal services, and finding the device that is quietly degrading. Each is examined and none is included in your licence.",

  objectives: [
    "Configure Microsoft Intune Remote Help and its security model",
    "Describe the Enterprise App Catalog and what it replaces",
    "Explain Microsoft Cloud PKI and how it differs from SCEP with an on-premises CA",
    "Describe Microsoft Tunnel for Mobile Application Management",
    "State what Intune Advanced Analytics adds beyond Endpoint Analytics"
  ],

  keyConcepts: ["Remote Help", "Enterprise App Catalog", "Cloud PKI", "Tunnel for MAM", "Advanced Analytics", "Anomaly detection", "Device timeline"],

  skills: [
    { id: "g2.t3.s2", depth: "primary" },
    { id: "g2.t3.s3", depth: "primary" },
    { id: "g2.t3.s4", depth: "primary" },
    { id: "g2.t3.s5", depth: "primary" },
    { id: "g2.t3.s6", depth: "primary" }
  ],

  requires: {
    licenses: ["M365-E5", "INTUNE-SUITE"],
    roles: ["Intune Administrator"],
    platforms: [{ kind: "portal", id: "Microsoft Intune admin center" }],
    personas: ["helpdesk.operator", "adele.vance"],
    labs: ["endpoint-privilege-management", "certificates-and-network", "endpoint-analytics"]
  },

  exercises: [
    {
      id: "e1",
      title: "Remote Help and the Enterprise App Catalog",
      estimatedMinutes: 20,
      tasks: [
        {
          id: "t1",
          title: "Remote Help",
          checkpoint: true,
          steps: [
            {
              text: "Remote Help is a secure screen-sharing and remote-control tool built into Intune. Its path is **Tenant administration** > **Remote Help**.",
              nav: ["Tenant administration", "Remote Help"]
            },
            {
              text: "The configuration:",
              parts: [
                {
                  kind: "inputs",
                  rows: [
                    { label: "Enable Remote Help", value: "Yes" },
                    { label: "Allow Remote Help to unenrolled devices", value: "Your choice", note: "Useful for helping a user before enrollment succeeds — which is exactly when they most need help." },
                    { label: "Disable chat", value: "No" },
                    { label: "Application deployment", value: "Deploy the Remote Help app to devices as a Win32 app" }
                  ]
                },
                {
                  kind: "table",
                  headers: ["Property", "Detail"],
                  rows: [
                    ["Trust", "Both parties see the other's verified organisation identity before the session starts"],
                    ["Consent", "The user must accept, and must accept again to grant full control"],
                    ["Permissions", "Governed by Intune RBAC — separate permissions for view-only, full control and elevation"],
                    ["Audit", "Every session is logged with participants, device and duration"],
                    ["Conditional Access", "Sessions can be gated by Conditional Access policy"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The distinguishing feature against a generic remote-control tool is **verified identity on both sides**. The helper sees who they are connecting to and the user sees a verified organisational identity rather than a name anyone could type — which is the defence against the support-desk impersonation call. Combined with RBAC-governed permissions and per-session audit, that is what makes it enterprise-grade."
                }
              ]
            }
          ],
          result: {
            text: "You can describe Remote Help's configuration and security model.",
            verify: [{ text: "You can name what distinguishes Remote Help from a generic remote-control tool." }]
          }
        },
        {
          id: "t2",
          title: "Enterprise App Catalog",
          steps: [
            {
              text: "The Enterprise App Catalog is a Microsoft-curated library of prepackaged Win32 applications, found under **Apps** > **All apps** > **Add** > **Enterprise App Catalog app**.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "Manual Win32 packaging (lab 33)", "Enterprise App Catalog"],
                  rows: [
                    ["Obtain the installer", "You download it", "Microsoft hosts it"],
                    ["Package it", "You run IntuneWinAppUtil", "Already packaged"],
                    ["Install and uninstall commands", "You determine them", "Supplied"],
                    ["Detection rules", "**You write them**", "**Supplied and correct**"],
                    ["Updates", "You repackage each new version", "New versions appear in the catalogue, with supersedence"],
                    ["Effort per application", "An hour or more", "Minutes"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The value is the detection rules. Lab 33 showed that `0x87D1041C` — a correct installation reported as failed — is the most common Win32 problem, and it comes from writing detection rules by hand. Catalogue applications arrive with rules Microsoft has already validated, which removes that entire class of failure along with the repackaging treadmill."
                }
              ]
            }
          ],
          result: {
            text: "You can state what the Enterprise App Catalog removes from the Win32 workflow.",
            verify: [{ text: "You can name the Win32 error class the catalogue eliminates." }]
          }
        }
      ]
    },

    {
      id: "e2",
      title: "Cloud PKI and Tunnel for MAM",
      estimatedMinutes: 15,
      tasks: [
        {
          id: "t1",
          title: "Microsoft Cloud PKI",
          checkpoint: true,
          steps: [
            {
              text: "Lab 27 built certificate profiles but could not issue certificates, because SCEP and PKCS need an on-premises certification authority and the Intune Certificate Connector. Cloud PKI removes that requirement entirely.",
              parts: [
                {
                  kind: "table",
                  headers: ["", "SCEP with on-premises CA", "Microsoft Cloud PKI"],
                  rows: [
                    ["Certification authority", "Yours — Active Directory Certificate Services", "Hosted in the Intune service"],
                    ["NDES server", "Required", "**Not required**"],
                    ["Certificate Connector", "Required", "**Not required**"],
                    ["Servers to maintain and patch", "Two or more", "**None**"],
                    ["Root and issuing CA", "You build the hierarchy", "Created in the portal in minutes"],
                    ["Bring your own root", "Not applicable", "Supported — issuing CA under your existing root"],
                    ["Revocation", "Your CRL infrastructure", "Managed by the service"],
                    ["Setup time", "Days", "Under an hour"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The exam objective names *setting up cloud-based PKI, automating certificate issuance, and monitoring certificate health*. The path is **Tenant administration** > **Cloud PKI**: create a root CA, create an issuing CA under it, then reference that issuing CA from a SCEP profile exactly as lab 27 did. The certificate profile side is unchanged — only the authority behind it moves."
                }
              ]
            },
            {
              text: "Certificate health monitoring is the third part of the objective.",
              parts: [
                {
                  kind: "callout",
                  variant: "note",
                  text: "Cloud PKI reports issued, expiring and revoked certificates per CA in the portal, which is what *monitoring certificate health* refers to. With an on-premises authority that information lives in the CA console and is nobody's job to watch."
                }
              ]
            }
          ],
          result: {
            text: "You can explain what Cloud PKI removes and how it plugs into existing certificate profiles.",
            verify: [
              { text: "You can name the two servers Cloud PKI makes unnecessary." },
              { text: "You can state what changes in the certificate profile itself." }
            ]
          }
        },
        {
          id: "t2",
          title: "Microsoft Tunnel for Mobile Application Management",
          steps: [
            {
              text: "Lab 27 mentioned per-app VPN for enrolled devices. Tunnel for MAM extends that to devices that are not enrolled at all.",
              parts: [
                {
                  kind: "table",
                  headers: ["Component", "Role"],
                  rows: [
                    ["Tunnel Gateway", "A Linux container you host, on-premises or in a cloud, terminating the VPN"],
                    ["Tunnel server configuration", "IP ranges, DNS servers and split-tunnelling rules"],
                    ["Site", "A logical grouping of gateway servers"],
                    ["App configuration policy", "Points Microsoft Edge or a managed app at the tunnel"],
                    ["App protection policy", "Protects the corporate data reached through it"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "The scenario is Joni from lab 36 — a personally owned, unenrolled device that must reach an internal line-of-business web application. A device-wide VPN would require enrollment. Tunnel for MAM puts the tunnel inside the managed application instead, so only that application reaches the internal network and personal traffic never does."
                }
              ]
            },
            {
              text: "Note the operational commitment:",
              parts: [
                {
                  kind: "callout",
                  variant: "warning",
                  text: "Tunnel Gateway is infrastructure **you** run: a Linux host, a container, a TLS certificate to renew, and patching. Unlike the other four capabilities in this lab, buying the licence is not the end of the work. Monitoring tunnel connections and server health is named in the exam objective for exactly that reason."
                }
              ]
            }
          ],
          result: {
            text: "You can describe Tunnel for MAM's components and the scenario it answers.",
            verify: [
              { text: "You can name the component you must host yourself." },
              { text: "You can state why a device-wide VPN is not the answer for unenrolled devices." }
            ]
          }
        }
      ]
    },

    {
      id: "e3",
      title: "Advanced Analytics",
      estimatedMinutes: 10,
      tasks: [
        {
          id: "t1",
          title: "What it adds beyond Endpoint Analytics",
          checkpoint: true,
          steps: [
            {
              text: "Lab 54 used Endpoint Analytics on your Plan 1 licence. Advanced Analytics extends it in four ways, all named in the exam objective.",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "What it does"],
                  rows: [
                    ["**Anomaly detection**", "Identifies devices behaving unlike their peers — a sudden change in crashes, startup time or resource use"],
                    ["**Proactive insights**", "Surfaces developing problems before users report them, with the affected device population"],
                    ["**Risk-based policy recommendations**", "Suggests configuration changes ranked by measured impact on the estate"],
                    ["**Device timeline**", "A chronological event history per device — policy changes, application installs, restarts, crashes — for root-cause analysis"],
                    ["**Multi-device query**", "The KQL from lab 51, run across many devices at once instead of one"],
                    ["**Enhanced device scopes**", "Scoped analytics for delegated administrators"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "important",
                  text: "**Device timeline** is the one that changes daily work. Endpoint Analytics tells you a device is slow; the timeline tells you it became slow on the fourteenth, two hours after a configuration profile applied. That is the difference between a symptom and a cause, and it is why this appears in the objective alongside anomaly detection."
                }
              ]
            },
            {
              text: "Close the module by reviewing all six Intune Suite capabilities against the problems they solve:",
              parts: [
                {
                  kind: "table",
                  headers: ["Capability", "Solves", "First met in"],
                  rows: [
                    ["Endpoint Privilege Management", "Standard users needing occasional elevation", "Lab 28, removing admin rights"],
                    ["Remote Help", "Supporting a user you cannot see, with verified identity", "Lab 38, troubleshooting"],
                    ["Enterprise App Catalog", "Packaging and detection-rule effort", "Lab 33, `0x87D1041C`"],
                    ["Cloud PKI", "Running a certification authority", "Lab 27, SCEP with no CA"],
                    ["Tunnel for MAM", "Unenrolled devices reaching internal services", "Lab 36, BYOD app protection"],
                    ["Advanced Analytics", "Finding the cause rather than the symptom", "Lab 54, Endpoint Analytics"]
                  ]
                },
                {
                  kind: "callout",
                  variant: "tip",
                  text: "Every one of these extends something you have already built. That is not a coincidence — the Suite is positioned as the answer to the friction points a Plan 1 deployment reaches. Being able to name the friction each one removes is a better exam preparation than memorising configuration paths."
                }
              ]
            }
          ],
          result: {
            text: "You can state what Advanced Analytics adds and map every Suite capability to the problem it solves.",
            verify: [
              { text: "You can name the four Advanced Analytics capabilities in the exam objective." },
              { text: "You can pair each of the six Suite capabilities with a lab that revealed its need." }
            ]
          }
        }
      ]
    }
  ],

  quiz: [
    {
      question:
        "Contoso wants certificate-based Wi-Fi authentication but has no on-premises certification authority and does not want to build one. Which Intune Suite capability applies?",
      options: [
        "Microsoft Cloud PKI, which hosts the certification authority in the service",
        "Microsoft Tunnel for MAM",
        "The Enterprise App Catalog",
        "Advanced Analytics"
      ],
      correctIndex: 0,
      rationale:
        "Cloud PKI provides a hosted root and issuing certification authority, removing the need for Active Directory Certificate Services, an NDES server and the Intune Certificate Connector. Certificate profiles then reference the cloud issuing CA instead of an on-premises one.",
      examTip:
        "No on-premises CA and no NDES server is the Cloud PKI signature. The certificate profile configuration itself is unchanged — only the issuing authority moves.",
      skills: ["g2.t3.s4"]
    },
    {
      question:
        "A user on a personally owned, unenrolled device needs access to an internal line-of-business web application. Which capability provides this without enrolling the device?",
      options: [
        "Microsoft Tunnel for Mobile Application Management",
        "A device-wide VPN profile",
        "Microsoft Cloud PKI",
        "Remote Help"
      ],
      correctIndex: 0,
      rationale:
        "Tunnel for MAM places the VPN inside the managed application, so an unenrolled device can reach internal resources through that application only. A device-wide VPN profile requires enrollment.",
      examTip:
        "Unenrolled plus internal resource access equals Tunnel for MAM. Remember it also requires you to host and maintain the Tunnel Gateway yourself.",
      skills: ["g2.t3.s5"]
    },
    {
      question:
        "Which Intune Advanced Analytics capability helps determine the root cause of a device that recently began performing poorly?",
      options: [
        "Device timeline, showing a chronological history of events on that device",
        "Anomaly detection",
        "Multi-device query",
        "The Endpoint analytics score"
      ],
      correctIndex: 0,
      rationale:
        "Device timeline shows policy changes, application installs, restarts and crashes in order, letting you correlate the onset of a problem with what changed. Anomaly detection identifies that a device is unusual; the timeline explains when and why.",
      examTip:
        "Anomaly detection finds the device; device timeline finds the cause. Multi-device query answers a specific question across many devices.",
      skills: ["g2.t3.s6"]
    }
  ]
};
