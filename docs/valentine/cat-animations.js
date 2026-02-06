/* ============================================
   CAT ANIMATIONS - Interaction Logic
   All animations work on the outer .decorative-svg
   HTML wrapper (NOT on SVG <g> internals).
   ============================================ */

(function () {
  'use strict';

  var catStates = new WeakMap();
  var idleTimers = [];

  function getState(el) {
    if (!catStates.has(el)) {
      catStates.set(el, {
        tapCount: 0,
        tapTimer: null,
        tiltSide: 'left',
        longPressTimer: null,
        isPurring: false,
        purrHeartTimer: null,
        busy: false
      });
    }
    return catStates.get(el);
  }

  /* --- Utility: play a CSS animation class then remove it --- */
  function playAnim(el, cls, ms) {
    el.classList.remove(cls);
    void el.offsetWidth;          // force reflow
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); }, ms);
  }

  /* --- Heart burst (radial explosion on tap) --- */
  function burstHearts(el, n) {
    var r = el.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height * 0.35;
    var chars = ['\u2764', '\uD83D\uDC95', '\uD83D\uDC96', '\u2665', '\uD83E\uDE77'];

    for (var i = 0; i < n; i++) {
      (function (idx) {
        var h = document.createElement('span');
        h.className = 'cat-heart-burst';
        h.textContent = chars[Math.floor(Math.random() * chars.length)];
        h.style.left = cx + 'px';
        h.style.top = cy + 'px';
        h.style.fontSize = (0.65 + Math.random() * 0.7) + 'rem';
        document.body.appendChild(h);

        var angle = (idx / n) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        var dist = 30 + Math.random() * 40;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist - 20;

        requestAnimationFrame(function () {
          h.style.left = (cx + dx) + 'px';
          h.style.top = (cy + dy) + 'px';
          h.classList.add('fly');
        });
        setTimeout(function () { h.remove(); }, 750);
      })(i);
    }
  }

  /* --- Single purr heart (floats up during long press) --- */
  function purrHeart(el) {
    var r = el.getBoundingClientRect();
    var cx = r.left + r.width / 2 + (Math.random() * 24 - 12);
    var cy = r.top + r.height * 0.3;
    var h = document.createElement('span');
    h.className = 'cat-purr-heart';
    h.textContent = ['\u2764', '\uD83D\uDC95', '\u2665'][Math.floor(Math.random() * 3)];
    h.style.left = cx + 'px';
    h.style.top = cy + 'px';
    document.body.appendChild(h);
    setTimeout(function () { h.remove(); }, 1500);
  }

  /* ========== SINGLE TAP ========== */
  function onSingleTap(el) {
    var s = getState(el);
    if (s.busy) return;

    // Alternate between bounce+tiltLeft and squish+tiltRight
    if (s.tiltSide === 'left') {
      playAnim(el, 'cat-bounce', 300);
      playAnim(el, 'cat-tilt-left', 400);
    } else {
      playAnim(el, 'cat-squish', 350);
      playAnim(el, 'cat-tilt-right', 400);
    }
    s.tiltSide = s.tiltSide === 'left' ? 'right' : 'left';

    burstHearts(el, 3 + Math.floor(Math.random() * 3));
  }

  /* ========== TRIPLE TAP ========== */
  function onTripleTap(el) {
    var s = getState(el);
    s.busy = true;

    // Remove any ongoing animations
    el.classList.remove('cat-bounce', 'cat-squish', 'cat-tilt-left', 'cat-tilt-right', 'cat-idle');

    playAnim(el, 'cat-crazy', 700);
    burstHearts(el, 12 + Math.floor(Math.random() * 5));

    setTimeout(function () { s.busy = false; }, 750);
  }

  /* ========== LONG PRESS (purr) ========== */
  function startPurr(el) {
    var s = getState(el);
    s.isPurring = true;

    el.classList.remove('cat-bounce', 'cat-squish', 'cat-tilt-left', 'cat-tilt-right', 'cat-crazy', 'cat-idle', 'gentleBounce');
    el.classList.add('cat-purr');

    // Spawn hearts while pressed
    purrHeart(el);
    s.purrHeartTimer = setInterval(function () { purrHeart(el); }, 350);
  }

  function stopPurr(el) {
    var s = getState(el);
    if (!s.isPurring) return;
    s.isPurring = false;

    el.classList.remove('cat-purr');
    if (s.purrHeartTimer) {
      clearInterval(s.purrHeartTimer);
      s.purrHeartTimer = null;
    }
  }

  /* ========== ATTACH LISTENERS TO ONE CAT ========== */
  function attachCat(el) {
    var s = getState(el);

    function onDown(e) {
      if (e.target.closest && e.target.closest('.btn')) return;
      if (s.busy) return;

      // Long press detection
      if (s.longPressTimer) clearTimeout(s.longPressTimer);
      s.longPressTimer = setTimeout(function () {
        if (!s.isPurring) startPurr(el);
      }, 450);

      // Tap counting
      s.tapCount++;
      if (s.tapTimer) clearTimeout(s.tapTimer);
      s.tapTimer = setTimeout(function () {
        if (!s.isPurring) {
          if (s.tapCount >= 3) {
            onTripleTap(el);
          } else {
            onSingleTap(el);
          }
        }
        s.tapCount = 0;
      }, 220);
    }

    function onUp() {
      if (s.longPressTimer) {
        clearTimeout(s.longPressTimer);
        s.longPressTimer = null;
      }
      if (s.isPurring) stopPurr(el);
    }

    // Mouse
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);

    // Touch
    el.addEventListener('touchstart', function (e) {
      if (e.target.closest && e.target.closest('.btn')) return;
      onDown(e);
    }, { passive: true });
    el.addEventListener('touchend', onUp, { passive: true });
    el.addEventListener('touchcancel', onUp, { passive: true });
  }

  /* ========== PUBLIC: initCatAnimations ========== */
  window.initCatAnimations = function () {
    // Clean up any old idle timers
    idleTimers.forEach(function (id) { clearInterval(id); });
    idleTimers = [];

    var cats = document.querySelectorAll('.decorative-svg');
    cats.forEach(function (cat) {
      // Only attach once
      if (cat.dataset.catReady) return;
      cat.dataset.catReady = '1';
      attachCat(cat);
    });
  };

})();
