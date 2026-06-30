// Sticky, scroll-aware nav + mobile hamburger overlay.
(function () {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  if (!nav || !burger || !menu) return;

  const body = document.body;
  const mq = window.matchMedia("(max-width: 860px)");

  function closeMenu() {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    body.classList.remove("body--lock");
  }

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    body.classList.toggle("body--lock", open && mq.matches);
  });

  // Close overlay when a link is tapped.
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (mq.matches) closeMenu();
    })
  );

  // Reset lock if resized back to desktop.
  mq.addEventListener("change", (e) => {
    if (!e.matches) closeMenu();
  });

  // Scroll-aware: add background once scrolled, hide on scroll-down.
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);

    if (!nav.classList.contains("is-open")) {
      if (y > lastY && y > 200) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
})();
