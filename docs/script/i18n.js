// ───────────────────────────────────────────────────────────
// i18n — bilingual (English / Italian) support.
// Detects the visitor's preferred language from the browser,
// persists an explicit choice in localStorage, swaps static UI
// strings, and notifies listeners (render.js) so dynamic content
// can re-render. All gated to vanilla JS — no build step.
// ───────────────────────────────────────────────────────────

export const SUPPORTED = ["en", "it"];
const STORAGE_KEY = "lang";

// Static UI strings keyed by the element's data-i18n attribute.
const ui = {
  "nav.about": { en: "About", it: "Chi sono" },
  "nav.experience": { en: "Experience", it: "Esperienza" },
  "nav.awards": { en: "Awards", it: "Premi" },
  "nav.skills": { en: "Skills", it: "Competenze" },
  "nav.contact": { en: "Contact", it: "Contatti" },
  "nav.cv": { en: "CV ↓", it: "CV ↓" },

  "hero.eyebrow": { en: "Full-Stack Software Developer", it: "Sviluppatore Software Full-Stack" },
  "hero.intro": {
    en: "I build and maintain web apps end-to-end — React on the front, Python on the back — and I teach kids to code along the way.",
    it: "Costruisco e mantengo web app dall'inizio alla fine — React sul front-end, Python sul back-end — e nel frattempo insegno a programmare ai più piccoli.",
  },
  "hero.cta.work": { en: "View work history", it: "Vedi esperienza" },
  "hero.cta.cv": { en: "Download CV ↓", it: "Scarica CV ↓" },
  "hero.scroll": { en: "Scroll", it: "Scorri" },

  "about.label": { en: "About", it: "Chi sono" },
  "about.bio.1": {
    en: "I'm a young, passionate web developer with leadership and communication skills honed as a former team leader. I enjoy collaborating with others, motivating teammates, and solving complex problems.",
    it: "Sono un giovane sviluppatore web appassionato, con capacità di leadership e comunicazione affinate come ex team leader. Mi piace collaborare con gli altri, motivare i compagni di squadra e risolvere problemi complessi.",
  },
  "about.bio.2": {
    en: "As a coding teacher to young children, I create engaging, supportive learning experiences. I thrive both solo and on a team, always chasing new challenges and growth.",
    it: "Come insegnante di programmazione per bambini, creo esperienze di apprendimento coinvolgenti e di supporto. Do il meglio sia da solo che in team, sempre alla ricerca di nuove sfide e crescita.",
  },
  "facts.role.k": { en: "Role", it: "Ruolo" },
  "facts.role.v": { en: "Software Developer @ Siav Spa", it: "Sviluppatore Software @ Siav Spa" },
  "facts.focus.k": { en: "Focus", it: "Ambito" },
  "facts.focus.v": { en: "Full-stack web · React · Python", it: "Sviluppo web full-stack · React · Python" },
  "facts.also.k": { en: "Also", it: "Inoltre" },
  "facts.also.v": { en: "Coding tutor", it: "Insegnante di programmazione" },
  "facts.cv.k": { en: "CV", it: "CV" },
  "facts.cv.v": { en: "Download ↓", it: "Scarica ↓" },
  "edu.label": { en: "Education", it: "Formazione" },

  "exp.label": { en: "Experience", it: "Esperienza" },
  "exp.title": { en: "Where I've worked", it: "Dove ho lavorato" },
  "exp.badge.now": { en: "Now", it: "Ora" },

  "awards.label": { en: "Awards · Premi", it: "Premi · Awards" },
  "awards.title": { en: "Recognition", it: "Riconoscimenti" },

  "skills.label": { en: "Skills", it: "Competenze" },
  "skills.title": { en: "Tech stack", it: "Stack tecnologico" },

  "contact.label": { en: "Contact", it: "Contatti" },
  "contact.headline": { en: "Let's talk.", it: "Parliamone." },
  "contact.cv": { en: "Download CV ↓", it: "Scarica il CV ↓" },

  "footer.credit": {
    en: "Designed & built by Janmanpreet Singh.",
    it: "Progettato e sviluppato da Janmanpreet Singh.",
  },
};

// Resolve a translatable node ({en,it}) or plain string against the active lang.
export function tr(node) {
  if (node && typeof node === "object") return node[current] ?? node.en;
  return node;
}

// UI string lookup by key.
export function t(key) {
  const entry = ui[key];
  return entry ? entry[current] ?? entry.en : key;
}

function detectLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const prefs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"];
  for (const l of prefs) {
    const base = String(l).toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "en";
}

let current = detectLang();
export const getLang = () => current;

const listeners = new Set();
export function onLangChange(fn) {
  listeners.add(fn);
}

// Swap all static [data-i18n] strings to the active language.
export function applyStatic() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (ui[key]) el.textContent = t(key);
  });
}

function updateToggle() {
  const toggle = document.getElementById("langToggle");
  if (!toggle) return;
  toggle.querySelectorAll("[data-lang]").forEach((span) => {
    span.classList.toggle("is-active", span.dataset.lang === current);
  });
  const other = current === "en" ? "Italiano" : "English";
  toggle.setAttribute("aria-label", `Switch language — ${other}`);
}

export function setLang(lang) {
  if (!SUPPORTED.includes(lang) || lang === current) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  applyStatic();
  updateToggle();
  listeners.forEach((fn) => fn(lang));
}

// Wire the nav toggle + apply the detected language on load.
function init() {
  document.documentElement.lang = current;
  applyStatic();
  updateToggle();
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      setLang(current === "en" ? "it" : "en");
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
