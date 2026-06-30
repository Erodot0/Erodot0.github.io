// Motion utilities — all gated behind prefers-reduced-motion.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Scroll-progress bar ──────────────────────────────────
  const bar = document.getElementById("scrollProgress");
  if (bar) {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      bar.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  // ── Reduced motion: reveal everything, skip the rest ─────
  if (reduce) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in-view"));
    return;
  }

  // ── Hero entrance ────────────────────────────────────────
  const heroEls = [...document.querySelectorAll("[data-hero]")].sort(
    (a, b) => (+a.dataset.hero || 0) - (+b.dataset.hero || 0)
  );
  heroEls.forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 900,
        delay: 120 * i,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "both",
      }
    );
  });

  // ── Scroll-reveal (one observer, staggers siblings) ──────
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const sibs = [...(el.parentElement?.children || [])].filter((c) =>
          c.hasAttribute("data-reveal")
        );
        const idx = sibs.indexOf(el);
        el.style.setProperty("--reveal-delay", `${Math.max(0, idx) * 90}ms`);
        el.classList.add("in-view");
        obs.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  function observeReveals() {
    document
      .querySelectorAll("[data-reveal]:not(.in-view)")
      .forEach((el) => io.observe(el));
  }
  observeReveals();
  // Re-scan after dynamic content is injected by render.js.
  document.addEventListener("content:ready", observeReveals);

  // ── Timeline draw-in (scrub the vertical rule) ───────────
  const timeline = document.getElementById("timeline");
  if (timeline) {
    let ticking = false;
    const draw = () => {
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const total = r.height + start - vh * 0.4;
      const progress = Math.min(1, Math.max(0, (start - r.top) / total));
      timeline.style.setProperty("--draw", progress.toFixed(3));
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(draw);
          ticking = true;
        }
      },
      { passive: true }
    );
    document.addEventListener("content:ready", draw);
    draw();
  }

  // ── Custom magnetic cursor (fine pointers only) ──────────
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cursor = document.getElementById("cursor");
  if (finePointer && cursor) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    let active = false;

    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        cursor.classList.add("is-active");
      }
    });

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    // Hover grow + magnetic pull on interactive targets.
    const bindMagnetic = () => {
      document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
        if (el.dataset.magBound) return;
        el.dataset.magBound = "1";
        el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("is-hover");
          el.style.transform = "";
        });
        if (el.hasAttribute("data-magnetic")) {
          el.addEventListener("mousemove", (e) => {
            const r = el.getBoundingClientRect();
            const mx = e.clientX - (r.left + r.width / 2);
            const my = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${mx * 0.25}px, ${my * 0.25}px)`;
          });
        }
      });
    };
    bindMagnetic();
    document.addEventListener("content:ready", bindMagnetic);
  }
})();
