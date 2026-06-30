// Renders dynamic sections from the content store in database.js.
import { experience, education, awards, stack, socials, email, cvPath } from "./database.js";
import { tr, t, onLangChange } from "./i18n.js";

const $ = (sel) => document.querySelector(sel);

// ── Education ──────────────────────────────────────────────
function renderEducation() {
  const el = $("#educationList");
  if (!el) return;
  el.innerHTML = education
    .map(
      (e) => `
      <li>
        <span class="edu__school">${e.school}</span>
        <span class="edu__period"> · ${e.period}</span>
        <div class="edu__program">${tr(e.program)}</div>
      </li>`
    )
    .join("");
}

// ── Experience timeline ────────────────────────────────────
function renderExperience() {
  const el = $("#timeline");
  if (!el) return;
  el.innerHTML = experience
    .map((job) => {
      const cls = ["tl"];
      if (job.current) cls.push("tl--current");
      if (job.muted) cls.push("tl--muted");
      const badge = job.current ? `<span class="tl__badge">${t("exp.badge.now")}</span>` : "";
      const bullets = job.bullets
        .map((b) => `<li>${tr(b)}</li>`)
        .join("");
      return `
        <li class="${cls.join(" ")}" data-reveal>
          <span class="tl__dot"></span>
          <div class="tl__head">
            <h3 class="tl__company">${job.company}</h3>
            ${badge}
          </div>
          <p class="tl__role">${tr(job.role)}</p>
          <p class="tl__meta">${tr(job.period)} · ${tr(job.location)}</p>
          <ul class="tl__bullets">${bullets}</ul>
        </li>`;
    })
    .join("");
}

// ── Awards ─────────────────────────────────────────────────
const medalSVG = `
  <svg class="award__mark" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="6"></circle>
    <path d="M9 14.5 L7 22 L12 19 L17 22 L15 14.5"></path>
    <path d="M12 6.2 L13 8.2 L15.2 8.5 L13.6 10 L14 12.2 L12 11.1 L10 12.2 L10.4 10 L8.8 8.5 L11 8.2 Z"></path>
  </svg>`;

function renderAwards() {
  const el = $("#awardsGrid");
  if (!el) return;
  el.innerHTML = awards
    .map(
      (a) => `
      <article class="award" data-reveal>
        <div class="award__top">
          ${medalSVG}
          <span class="award__year">${a.year}</span>
        </div>
        <h3 class="award__title">${tr(a.title)}</h3>
        <p class="award__issuer">${a.issuer}</p>
        <p class="award__context">${tr(a.context)}</p>
      </article>`
    )
    .join("");
}

// ── Skills: marquee + categorized grid ─────────────────────
function renderSkills() {
  const track = $("#marqueeTrack");
  if (track) {
    const all = stack.flatMap((g) => g.items.map(tr));
    // Duplicate the full set so the translateX(-50%) loop is seamless.
    track.innerHTML = all
      .concat(all)
      .map((s) => `<span class="marquee__item">${s}</span>`)
      .join("");
  }

  const grid = $("#stackGrid");
  if (grid) {
    grid.innerHTML = stack
      .map(
        (g) => `
        <div class="stack__col" data-reveal>
          <h3 class="stack__cat">${tr(g.cat)}</h3>
          <div class="stack__tags">
            ${g.items.map((i) => `<span class="tag">${tr(i)}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
  }
}

// ── Contact: email + socials ───────────────────────────────
function renderContact() {
  const mail = $("#contactEmail");
  if (mail) {
    mail.href = `mailto:${email}`;
    mail.textContent = email;
  }
  const list = $("#socialsList");
  if (list) {
    list.innerHTML = socials
      .map(
        (s) =>
          `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" data-magnetic>${s.name}</a></li>`
      )
      .join("");
  }
  // wire CV download paths from the store (kept in sync with markup)
  document
    .querySelectorAll('a[download="cv_janmanpreet"]')
    .forEach((a) => (a.href = cvPath));
}

function renderAll() {
  renderEducation();
  renderExperience();
  renderAwards();
  renderSkills();
  renderContact();
}

renderAll();

// Signal that dynamic content is in the DOM so motion.js can observe it.
document.dispatchEvent(new CustomEvent("content:ready"));

// Re-render dynamic content when the language changes. Freshly rendered
// reveals are marked in-view immediately so there's no fade-in flash on a
// mid-page switch, then we re-signal for the cursor/magnetic re-bind.
onLangChange(() => {
  renderAll();
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => el.classList.add("in-view"));
  document.dispatchEvent(new CustomEvent("content:ready"));
});
