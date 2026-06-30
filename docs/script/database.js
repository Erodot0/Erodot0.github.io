// ───────────────────────────────────────────────────────────
// Content store — single source of truth for site data.
// Translatable values are { en, it } nodes; render.js resolves
// them against the active language. Lang-neutral values (proper
// nouns, links, paths) stay plain strings.
//
// To add a Projects section later, add a `projects` array here
// and a renderer; the grid is structured to drop it in between
// Experience and Skills.
// ───────────────────────────────────────────────────────────

const jobIconPath = "./assets/images/";

// Experience — newest first, rendered as a timeline.
export const experience = [
  {
    company: "Siav Spa",
    role: { en: "Software Developer", it: "Sviluppatore Software" },
    period: { en: "May 2023 – Present", it: "Mag 2023 – Presente" },
    location: { en: "Milan, Italy", it: "Milano, Italia" },
    logo: "", // no asset on file → initials-badge fallback
    current: true,
    bullets: [
      {
        en: "Full-stack developer building and maintaining custom apps and web apps.",
        it: "Sviluppatore full-stack: realizzo e mantengo applicazioni custom e web app.",
      },
      {
        en: "Frontend: React, Vite, JavaScript (plus jQuery/Bootstrap on legacy systems).",
        it: "Frontend: React, Vite, JavaScript (oltre a jQuery/Bootstrap su sistemi legacy).",
      },
      { en: "Backend: Python, Go.", it: "Backend: Python e Go." },
      { en: "Infrastructure: Docker, nginx.", it: "Infrastruttura: Docker, nginx." },
      { en: "Auth & data: Keycloak, PostgreSQL.", it: "Autenticazione e dati: Keycloak, PostgreSQL." },
      {
        en: "Use AI tooling (Claude Code, Cursor) in daily workflow.",
        it: "Utilizzo strumenti di AI (Claude Code, Cursor) nel lavoro quotidiano.",
      },
    ],
  },
  {
    company: "Kodland",
    role: { en: "Web Development Tutor", it: "Tutor di Sviluppo Web" },
    period: { en: "Feb 2023 – Jun 2023", it: "Feb 2023 – Giu 2023" },
    location: { en: "Remote", it: "Da remoto" },
    logo: `${jobIconPath}kodland.jpg`,
    bullets: [
      {
        en: "Delivered fun, engaging classes from Kodland's scripts and materials.",
        it: "Ho tenuto lezioni divertenti e coinvolgenti basate su script e materiali di Kodland.",
      },
      {
        en: "Taught HTML, CSS and JavaScript to young students.",
        it: "Ho insegnato HTML, CSS e JavaScript a studenti giovani.",
      },
      {
        en: "Tracked and reported detailed student progress; improved class engagement.",
        it: "Ho monitorato e documentato i progressi degli studenti, migliorando il coinvolgimento in classe.",
      },
      {
        en: "Acted as a positive, outgoing ambassador for Kodland and brought creative ideas to support students.",
        it: "Ambasciatore positivo e propositivo per Kodland, ho portato idee creative a supporto degli studenti.",
      },
    ],
  },
  {
    company: "Develhope",
    role: { en: "Full-Stack Web Developer (Bootcamp)", it: "Sviluppatore Web Full-Stack (Bootcamp)" },
    period: { en: "May 2022 – Dec 2022", it: "Mag 2022 – Dic 2022" },
    location: { en: "Remote", it: "Da remoto" },
    logo: `${jobIconPath}develhope.jpg`,
    bullets: [
      {
        en: "Progressed from frontend to backend, becoming a full-stack developer in HTML/CSS/JavaScript, TypeScript, React and Node.",
        it: "Dal frontend al backend, sono diventato sviluppatore full-stack con HTML/CSS/JavaScript, TypeScript, React e Node.",
      },
      {
        en: "Built a real-world web application using agile methodologies.",
        it: "Ho realizzato un'applicazione web reale con metodologie agile.",
      },
      {
        en: "As team leader, managed and guided classmates and assigned tasks throughout development.",
        it: "Come team leader, ho coordinato e guidato i compagni assegnando i task durante tutto lo sviluppo.",
      },
    ],
  },
  {
    company: "Flex",
    role: { en: "Warehouse Operator", it: "Operatore di Magazzino" },
    period: { en: "Sep 2020 – Feb 2022", it: "Set 2020 – Feb 2022" },
    location: { en: "Somaglia, Italy", it: "Somaglia, Italia" },
    logo: "",
    muted: true, // pre-dev role — rendered visually lighter
    bullets: [
      {
        en: "Warehouse operations: receiving, storing, distributing and shipping products.",
        it: "Operazioni di magazzino: ricezione, stoccaggio, distribuzione e spedizione dei prodotti.",
      },
      {
        en: "Operated forklifts and pallet jacks; maintained accurate inventory and ran audits.",
        it: "Utilizzo di muletti e transpallet; gestione accurata dell'inventario ed esecuzione di audit.",
      },
      {
        en: "Applied quality-control standards and strong attention to detail.",
        it: "Applicazione degli standard di controllo qualità con grande attenzione ai dettagli.",
      },
    ],
  },
];

// Education
export const education = [
  {
    school: "Develhope",
    program: { en: "Full-Stack Web Developer", it: "Sviluppatore Web Full-Stack" },
    period: "2022",
  },
  {
    school: "ITC Piero Calamandrei",
    program: {
      en: "High School Diploma — Business, Finance & Marketing",
      it: "Diploma — Amministrazione, Finanza e Marketing",
    },
    period: "2015 – 2020",
  },
];

// Awards / Premi — newest first.
export const awards = [
  {
    title: { en: "Key Contributor & Young Talent Award", it: "Premio Key Contributor & Young Talent" },
    issuer: "Siav Spa",
    year: "2024",
    context: {
      en: "Recognized for impact and growth as a young talent and key contributor to the engineering team.",
      it: "Riconoscimento per l'impatto e la crescita come giovane talento e contributore chiave del team di sviluppo.",
    },
  },
  {
    title: { en: "Hackathon Winner — Hacking Week", it: "Vincitore dell'Hackathon — Hacking Week" },
    issuer: "Develhope",
    year: "2022",
    context: {
      en: "Led the team as team leader to first place, designing and building a full authentication system end-to-end (backend + frontend).",
      it: "Da team leader ho guidato il gruppo al primo posto, progettando e sviluppando un sistema di autenticazione completo end-to-end (backend + frontend).",
    },
  },
];

// Tech stack — categorized text tags. Category labels are translatable;
// tech names are lang-neutral except where a label needs translating.
export const stack = [
  {
    cat: { en: "Frontend", it: "Frontend" },
    items: ["JavaScript", "TypeScript", "React", "Vite", "HTML", "CSS", "SCSS", "jQuery", "Bootstrap"],
  },
  {
    cat: { en: "Backend & Data", it: "Backend & Dati" },
    items: ["Python", "Go", "Node.js", "PostgreSQL", "MySQL"],
  },
  {
    cat: { en: "Tools & Infra", it: "Strumenti & Infra" },
    items: ["Git", "GitHub", "Docker", "nginx", "Keycloak", "Figma"],
  },
  {
    cat: { en: "Workflow", it: "Metodo di lavoro" },
    items: ["Agile", { en: "AI tooling (Claude Code, Cursor)", it: "Strumenti AI (Claude Code, Cursor)" }],
  },
];

// Socials
export const socials = [
  { name: "GitHub", href: "https://github.com/Erodot0" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/janmanpreet/" },
  { name: "Telegram", href: "https://t.me/Janmanpreet" },
  { name: "Instagram", href: "https://www.instagram.com/j.singh27/" },
];

export const email = "janmanpreet.singh@gmail.com";
export const cvPath = "./assets/CV-Janmanpreet_Singh_en.pdf";
