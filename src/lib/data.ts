export interface Profile {
  name: string
  first: string
  last: string
  eyebrow: string
  roles: string[]
  summary: string
  location: string
  clearance: string
  cert: string
}

export interface Job {
  title: string
  org: string
  place: string
  when: string
  bullets: string[]
}

export interface Skill {
  name: string
  level: number
}

export interface Language {
  name: string
  pct: number
}

export interface Credential {
  name: string
  status: string
  kind: 'active' | 'held'
}

export interface Contact {
  email: string
  github: string
  location: string
}

export const profile: Profile = {
  name: "Dylan Crespo",
  first: "Dylan",
  last: "Crespo",
  eyebrow: "Platform & DevSecOps Engineer",
  roles: ["Kubernetes & cloud-native platforms", "Azure GCC High & commercial", "Infrastructure as Code"],
  summary:
    "I build and run secure, compliant cloud enclaves — Infrastructure as Code, AKS clusters, and observability stacks in regulated environments. Fast learner, steady under pressure, happiest solving real problems by building the tooling to fix them.",
  location: "Lynchburg, VA",
  clearance: "SECRET + TOP SECRET · ACTIVE",
  cert: "Security+ CERTIFIED",
};

export const experience: Job[] = [
  {
    title: "Service Engineer",
    org: "CloudFit Software",
    place: "Lynchburg, Virginia",
    when: "Apr 2025 — Present",
    bullets: [
      "Deploy secure cloud enclaves via Infrastructure as Code across Azure commercial and Azure GCC High, meeting or exceeding CMMC (NIST 800-171), ITAR, and FedRAMP (NIST 800-53).",
      "Deploy and administer Azure Kubernetes Service (AKS) clusters for containerized workloads.",
      "Provision and manage Azure Virtual Desktop environments for secure remote access.",
      "Monitor customer resources with OpenSearch / ELK, Prometheus, and Grafana depending on the environment.",
    ],
  },
  {
    title: "System Administrator — Team Lead",
    org: "Liberty University",
    place: "Lynchburg, Virginia",
    when: "Jul 2021 — Apr 2025",
    bullets: [
      "Ran a 24/7/365 Operational Command Center: critical-system monitoring, incident response, permissions management, and server administration.",
      "Partnered with the SRE team to build and maintain the monitoring stack — Prometheus, ELK, and Grafana.",
      "Administered servers across Red Hat Enterprise Linux, Windows Server, and a wide range of Linux distributions.",
    ],
  },
  {
    title: "Software Compliance Officer",
    org: "Liberty University",
    place: "Lynchburg, Virginia",
    when: "Apr 2019 — Jun 2021",
    bullets: [
      "Negotiated and facilitated software and hardware vendor contracts.",
      "Drove system-improvement efforts from concept to completion while managing outside vendors.",
      "Maintained thorough documentation to keep office processes consistent and complete.",
    ],
  },
];

export const skills: Skill[] = [
  { name: "Linux", level: 5 },
  { name: "Containerization", level: 4 },
  { name: "Kubernetes", level: 4 },
  { name: "ELK / OpenSearch", level: 3 },
  { name: "GitLab CI/CD + Pipelines", level: 3 },
  { name: "Site Reliability Eng.", level: 3 },
];

export const languages: Language[] = [
  { name: "Go", pct: 65 },
  { name: "Python", pct: 75 },
  { name: "Bash", pct: 60 },
  { name: "JavaScript/TypeScript", pct: 60 },
];

export const credentials: Credential[] = [
  { name: "DoD Secret Clearance", status: "Active", kind: "active" },
  { name: "DoD Top Secret Clearance", status: "Active", kind: "active" },
  { name: "CompTIA Security+", status: "Certified", kind: "held" },
];

export const contact: Contact = {
  email: "contact-dylan-crespo@proton.me",
  github: "dcrespo1",
  location: "Lynchburg, VA 24502",
};
