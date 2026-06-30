/* ════════════════════════════════════════════════════════════
   Interactive dot field — the site's signature "wow" effect.
   A single fixed monochrome dot grid behind all content. The
   cursor pushes nearby dots aside (magnetic displacement) and
   brightens them; movement leaves a soft expanding ripple trail.

   The canvas owns the page background: it paints white, then the
   dark bands for [.section--invert] elements, then the dot grid —
   so dots stay visible (dark on white, light on black) the whole
   way down. Fully gated on prefers-reduced-motion (one static
   frame, no interaction).
   ════════════════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById("field");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ctx = canvas.getContext("2d", { alpha: false });

  document.body.classList.add("has-field"); // hand background ownership to the canvas

  // ── Tunables ─────────────────────────────────────────────
  const GAP = 34;          // grid spacing (CSS px)
  const DOT = 1.15;        // base dot radius
  const REACH = 150;       // cursor influence radius
  const PUSH = 26;         // max displacement (px) away from cursor
  const RIPPLE_SPEED = 520; // px/s expansion
  const RIPPLE_LIFE = 0.9;  // seconds
  const RIPPLE_BAND = 60;   // ring thickness of influence

  // Base opacity — moderate so the field reads clearly but never
  // fights the type ("balanced presence").
  const A_LIGHT = 0.16;    // dark dots on white areas
  const A_DARK = 0.20;     // light dots on black areas
  const A_BOOST = 0.55;    // extra alpha at the cursor

  // Containers whose dots are dimmed so text stays legible.
  const DIM_SEL = ".about__bio, .facts, .edu, .timeline, .awards__grid, .stack, .contact__row";

  let dpr = 1;
  let dots = [];
  let invertEls = [];
  let dimEls = [];

  const mouse = { x: -9999, y: -9999, on: false };
  const ripples = [];

  function collect() {
    invertEls = [...document.querySelectorAll(".section--invert")];
    dimEls = [...document.querySelectorAll(DIM_SEL)];
  }

  function build() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    const ox = (w % GAP) / 2;
    const oy = (h % GAP) / 2;
    for (let y = oy; y <= h; y += GAP) {
      for (let x = ox; x <= w; x += GAP) {
        dots.push({ x, y, ox: x, oy: y });
      }
    }
  }

  // Rects (viewport coords) of the dark bands and the dim zones.
  function rects(els) {
    const out = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      out.push(r);
    }
    return out;
  }

  function inRects(x, y, rs) {
    for (const r of rs) {
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
    }
    return false;
  }

  function draw(dt) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const darkBands = rects(invertEls);
    const dimZones = rects(dimEls);

    // 1) page background + inverted bands
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#0a0a0a";
    for (const r of darkBands) {
      ctx.fillRect(0, Math.max(0, r.top), w, Math.min(h, r.bottom) - Math.max(0, r.top));
    }

    // 2) advance ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t > RIPPLE_LIFE) ripples.splice(i, 1);
    }

    // 3) dots
    for (const d of dots) {
      let tx = d.ox;
      let ty = d.oy;
      let bright = 0;

      // cursor magnetic push + brightening
      if (mouse.on) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REACH) {
          const f = 1 - dist / REACH;       // 1 at center → 0 at edge
          const ease = f * f;
          const inv = dist || 1;
          tx += (dx / inv) * PUSH * ease;
          ty += (dy / inv) * PUSH * ease;
          bright = Math.max(bright, ease);
        }
      }

      // ripple rings
      for (const rp of ripples) {
        const radius = rp.t * RIPPLE_SPEED;
        const dx = d.ox - rp.x;
        const dy = d.oy - rp.y;
        const dist = Math.hypot(dx, dy);
        const ring = Math.abs(dist - radius);
        if (ring < RIPPLE_BAND) {
          const life = 1 - rp.t / RIPPLE_LIFE;
          const edge = (1 - ring / RIPPLE_BAND) * life;
          const inv = dist || 1;
          tx += (dx / inv) * PUSH * 0.5 * edge;
          ty += (dy / inv) * PUSH * 0.5 * edge;
          bright = Math.max(bright, edge * 0.8);
        }
      }

      // spring toward target
      d.x += (tx - d.x) * 0.18;
      d.y += (ty - d.y) * 0.18;

      const dark = inRects(d.ox, d.oy, darkBands);
      let alpha = (dark ? A_DARK : A_LIGHT) + bright * A_BOOST;
      if (bright < 0.001 && inRects(d.ox, d.oy, dimZones)) alpha *= 0.4;

      ctx.fillStyle = dark
        ? `rgba(255,255,255,${alpha})`
        : `rgba(10,10,10,${alpha})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, DOT + bright * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Static (reduced motion or no canvas animation) ───────
  function drawStatic() {
    mouse.on = false;
    draw(0);
  }

  // ── Animated loop ────────────────────────────────────────
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    draw(dt);
    requestAnimationFrame(loop);
  }

  // ── Wiring ───────────────────────────────────────────────
  function init() {
    collect();
    build();
  }

  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      build();
      if (reduce || !finePointer) drawStatic();
    }, 150);
  }, { passive: true });

  document.addEventListener("content:ready", () => {
    collect();
    if (reduce || !finePointer) drawStatic();
  });

  init();

  if (reduce || !finePointer) {
    // One static frame; redraw on scroll so the dark bands track.
    drawStatic();
    if (!reduce) {
      let ticking = false;
      window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { drawStatic(); ticking = false; });
      }, { passive: true });
    }
    return;
  }

  let lastRipple = 0;
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.on = true;
    const now = performance.now();
    if (now - lastRipple > 90 && ripples.length < 14) {
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
      lastRipple = now;
    }
  }, { passive: true });

  window.addEventListener("mouseleave", () => { mouse.on = false; });
  window.addEventListener("blur", () => { mouse.on = false; });

  requestAnimationFrame(loop);
})();
