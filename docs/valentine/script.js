/* ============================================
   VALENTINE'S WEEK - APPLICATION LOGIC (Enhanced)
   ============================================ */

(function () {
  'use strict';

  // ---------- State ----------
  let config = null;
  let state = {
    hasAccepted: false,
    openedGifts: {
      day1: { gift1: false, gift2: false },
      day2: { gift1: false, gift2: false },
      day3: { gift1: false, gift2: false },
      day4: { gift1: false, gift2: false },
      day5: { gift1: false, gift2: false }
    },
    currentDay: 0
  };

  const STORAGE_KEY = 'valentineWeekState';

  // ---------- LocalStorage ----------
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore storage errors
    }
  }

  // ---------- Date Calculation ----------
  function calculateCurrentDay() {
    const now = new Date();
    const start = new Date(config.settings.startDate + 'T00:00:00');

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());

    const diffMs = today - startDay;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return -1;
    if (diffDays > 6) return 7;
    return diffDays;
  }

  // ---------- Screen Management ----------
  function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.style.display = 'none';
    });
  }

  function showScreen(id) {
    hideAllScreens();
    var el = document.getElementById(id);
    if (el) {
      el.style.display = '';
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    }
  }

  // ---------- Floating Hearts ----------
  function initFloatingHearts() {
    var container = document.getElementById('floating-hearts');
    var hearts = ['\u2764', '\u2665', '\u2661', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83E\uDE77'];
    var heartColors = ['#E57373', '#FFB6C1', '#F06292', '#FFCDD2', '#EF9A9A'];

    function spawnHeart() {
      var span = document.createElement('span');
      span.className = 'floating-heart';
      span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      span.style.left = (5 + Math.random() * 90) + '%';
      span.style.fontSize = (0.5 + Math.random() * 1.4) + 'rem';
      span.style.animationDuration = (7 + Math.random() * 10) + 's';
      span.style.animationDelay = '0s';
      span.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      container.appendChild(span);

      span.addEventListener('animationend', function () {
        span.remove();
      });
    }

    for (var i = 0; i < 8; i++) {
      setTimeout(spawnHeart, i * 600);
    }
    setInterval(spawnHeart, 2000);
  }

  // ---------- Confetti / Celebration ----------
  function launchCelebration() {
    var container = document.getElementById('confetti-container');
    container.innerHTML = '';

    var colors = ['#E57373', '#FFB6C1', '#FFCDD2', '#FFC0CB', '#FF8A80', '#F06292', '#FCE4EC', '#fff'];
    var shapes = ['circle', 'square', 'star', 'diamond'];

    // Confetti pieces with varied shapes
    for (var i = 0; i < 80; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      var color = colors[Math.floor(Math.random() * colors.length)];
      var shape = shapes[Math.floor(Math.random() * shapes.length)];
      var size = 5 + Math.random() * 10;

      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = color;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.animationDuration = (2 + Math.random() * 3.5) + 's';
      piece.style.animationDelay = Math.random() * 2 + 's';

      if (shape === 'circle') {
        piece.style.borderRadius = '50%';
      } else if (shape === 'diamond') {
        piece.style.borderRadius = '2px';
        piece.style.transform = 'rotate(45deg)';
      } else if (shape === 'star') {
        piece.style.backgroundColor = 'transparent';
        piece.style.width = '0';
        piece.style.height = '0';
        piece.style.borderLeft = (size / 2) + 'px solid transparent';
        piece.style.borderRight = (size / 2) + 'px solid transparent';
        piece.style.borderBottom = size + 'px solid ' + color;
      } else {
        piece.style.borderRadius = '2px';
      }

      container.appendChild(piece);
    }

    // Heart confetti - more and varied
    var heartChars = ['\u2764', '\uD83D\uDC95', '\uD83D\uDC96', '\u2665', '\uD83E\uDE77'];
    for (var j = 0; j < 30; j++) {
      var heart = document.createElement('span');
      heart.className = 'confetti-heart';
      heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (0.8 + Math.random() * 1.8) + 'rem';
      heart.style.animationDuration = (2 + Math.random() * 3.5) + 's';
      heart.style.animationDelay = Math.random() * 2.5 + 's';
      container.appendChild(heart);
    }

    setTimeout(function () {
      container.innerHTML = '';
    }, 7000);
  }

  // Mini sparkle burst on gift open
  function spawnSparkles(element) {
    var rect = element.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    for (var i = 0; i < 12; i++) {
      var sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.left = cx + 'px';
      sparkle.style.top = cy + 'px';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.background = ['#E57373', '#FFB6C1', '#F06292', '#FFCDD2'][i % 4];
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '200';
      sparkle.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      sparkle.style.opacity = '1';
      document.body.appendChild(sparkle);

      var angle = (i / 12) * Math.PI * 2;
      var dist = 30 + Math.random() * 40;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;

      requestAnimationFrame(function (s, x, y) {
        return function () {
          s.style.left = (cx + x) + 'px';
          s.style.top = (cy + y) + 'px';
          s.style.opacity = '0';
          s.style.transform = 'scale(0)';
        };
      }(sparkle, dx, dy));

      setTimeout(function (s) {
        return function () { s.remove(); };
      }(sparkle), 700);
    }
  }

  // ---------- Cat animations are in cat-animations.js ----------

  // ---------- Gift Box Wiggle on Touch ----------
  function initGiftBoxWiggle() {
    var giftBoxes = document.querySelectorAll('.gift-box-closed');
    giftBoxes.forEach(function (box) {
      function handleWiggle() {
        box.classList.remove('wiggling');
        box.offsetHeight;
        box.classList.add('wiggling');
        setTimeout(function () {
          box.classList.remove('wiggling');
        }, 500);
      }
      box.addEventListener('mouseenter', handleWiggle);
      box.addEventListener('touchstart', handleWiggle, { passive: true });
    });
  }

  // ---------- "No" Button Escape ----------
  function initNoButtonEscape() {
    var btnNo = document.getElementById('btn-no');
    var introSection = document.getElementById('screen-intro');
    if (!btnNo || !introSection) return;

    function escapeButton() {
      var btnRect = btnNo.getBoundingClientRect();
      var vw = window.innerWidth;
      var vh = window.innerHeight;

      // Keep button fully visible within viewport with padding
      var pad = 20;
      var bw = btnRect.width || 80;
      var bh = btnRect.height || 45;

      var maxX = vw - bw - pad;
      var maxY = vh - bh - pad;

      var newX = pad + Math.random() * Math.max(0, maxX - pad);
      var newY = pad + Math.random() * Math.max(0, maxY - pad);

      btnNo.classList.add('escaping');
      btnNo.style.position = 'fixed';
      btnNo.style.left = newX + 'px';
      btnNo.style.top = newY + 'px';
    }

    btnNo.addEventListener('mouseenter', escapeButton);
    btnNo.addEventListener('touchstart', function (e) {
      e.preventDefault();
      escapeButton();
    }, { passive: false });
  }

  // ---------- Gift Rendering ----------
  function getGiftTypeIcon(type) {
    switch (type) {
      case 'song': return '\uD83C\uDFB5';
      case 'flower': return '';
      case 'coupon': return '\uD83C\uDF9F\uFE0F';
      case 'memory': return '\uD83D\uDCAD';
      default: return '\uD83C\uDF81';
    }
  }

  function renderFlowerSVG() {
    return '<svg class="gift-flower-svg" viewBox="0 0 80 110" width="80" height="110">' +
      '<defs>' +
      '<radialGradient id="flowerCenter" cx="50%" cy="40%" r="50%">' +
      '<stop offset="0%" stop-color="#FFD54F"/>' +
      '<stop offset="100%" stop-color="#FFB300"/>' +
      '</radialGradient>' +
      '</defs>' +
      // Stem
      '<path d="M40,55 Q38,75 40,100" fill="none" stroke="#6B8E5A" stroke-width="3" stroke-linecap="round"/>' +
      // Leaf
      '<path d="M40,78 Q28,70 22,75 Q28,82 40,78Z" fill="#81C784" opacity="0.8"/>' +
      '<path d="M40,85 Q52,78 56,82 Q50,88 40,85Z" fill="#81C784" opacity="0.7"/>' +
      // Petals
      '<ellipse cx="30" cy="30" rx="12" ry="8" fill="#FFB6C1" opacity="0.9" transform="rotate(-30 30 30)"/>' +
      '<ellipse cx="50" cy="28" rx="12" ry="8" fill="#FFCDD2" opacity="0.9" transform="rotate(30 50 28)"/>' +
      '<ellipse cx="24" cy="42" rx="12" ry="8" fill="#FFCDD2" opacity="0.85" transform="rotate(-60 24 42)"/>' +
      '<ellipse cx="56" cy="42" rx="12" ry="8" fill="#FFB6C1" opacity="0.85" transform="rotate(60 56 42)"/>' +
      '<ellipse cx="32" cy="52" rx="11" ry="7" fill="#FFB6C1" opacity="0.8" transform="rotate(-15 32 52)"/>' +
      '<ellipse cx="48" cy="52" rx="11" ry="7" fill="#FFCDD2" opacity="0.8" transform="rotate(15 48 52)"/>' +
      // Center
      '<circle cx="40" cy="40" r="9" fill="url(#flowerCenter)"/>' +
      '<circle cx="38" cy="38" r="3" fill="#fff" opacity="0.25"/>' +
      '</svg>';
  }

  function renderVariableGiftContent(gift) {
    var html = '<div class="gift-type-icon">' + getGiftTypeIcon(gift.type) + '</div>';
    html += '<div class="gift-title">' + escapeHtml(gift.title) + '</div>';

    if (gift.type === 'flower') {
      html += renderFlowerSVG();
    }

    html += '<div class="gift-text">' + escapeHtml(gift.content) + '</div>';

    if (gift.link && gift.link.indexOf('PLACEHOLDER') === -1) {
      html += '<a class="gift-link" href="' + escapeHtml(gift.link) + '" target="_blank" rel="noopener">Ascolta qui \uD83C\uDFB6</a>';
    }

    return html;
  }

  function renderPoetryGiftContent(poetry) {
    var html = '<div class="gift-type-icon">\uD83D\uDCDC</div>';
    html += '<div class="gift-verses">' + escapeHtml(poetry.verses) + '</div>';
    if (poetry.author && poetry.author.indexOf('PLACEHOLDER') === -1) {
      html += '<div class="gift-author">\u2014 ' + escapeHtml(poetry.author) + '</div>';
    }
    return html;
  }

  // ---------- Gift Modal (Popup) ----------
  function openGiftModal(contentHtml) {
    var overlay = document.getElementById('gift-modal-overlay');
    var body = document.getElementById('gift-modal-body');
    body.innerHTML = contentHtml;
    overlay.classList.add('active');

    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
  }

  function closeGiftModal() {
    var overlay = document.getElementById('gift-modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initGiftModal() {
    var overlay = document.getElementById('gift-modal-overlay');
    var backdrop = document.getElementById('gift-modal-backdrop');
    var closeBtn = document.getElementById('gift-modal-close');

    if (!overlay) return;

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeGiftModal();
    });

    backdrop.addEventListener('click', function () {
      closeGiftModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeGiftModal();
      }
    });
  }

  function markGiftAsOpened(closedEl) {
    // Add a small badge to show it's been opened (if not already there)
    if (closedEl && !closedEl.querySelector('.gift-opened-badge')) {
      var badge = document.createElement('span');
      badge.className = 'gift-opened-badge';
      badge.textContent = '\u2764';
      closedEl.appendChild(badge);
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ---------- Game Day Screen ----------
  function showGameDay(dayIndex) {
    var dayData = config.days[dayIndex - 1];
    if (!dayData) return;

    showScreen('screen-game');

    // Progress
    document.getElementById('progress-label').textContent = 'Giorno ' + dayIndex + ' di 5';
    var pct = (dayIndex / 5) * 100;
    setTimeout(function () {
      document.getElementById('progress-fill').style.width = pct + '%';
    }, 100);

    // Day title
    document.getElementById('day-title').textContent = dayData.dayName;

    // Riddle
    document.getElementById('riddle-text').textContent = dayData.riddle.text;
    var hintEl = document.getElementById('riddle-hint');
    if (dayData.riddle.hint && dayData.riddle.hint.indexOf('PLACEHOLDER') === -1) {
      hintEl.textContent = dayData.riddle.hint;
    } else {
      hintEl.textContent = '';
    }
    document.getElementById('whatsapp-instruction').textContent = config.texts.whatsappInstruction;

    // Gifts
    var dayKey = 'day' + dayIndex;
    var giftsState = state.openedGifts[dayKey];

    // Always show the closed gift boxes (never hide them)
    var closed1 = document.getElementById('gift-closed-1');
    var opened1 = document.getElementById('gift-opened-1');
    closed1.style.display = '';
    opened1.style.display = 'none';

    var closed2 = document.getElementById('gift-closed-2');
    var opened2 = document.getElementById('gift-opened-2');
    closed2.style.display = '';
    opened2.style.display = 'none';

    // If already opened, show the badge
    if (giftsState && giftsState.gift1) {
      markGiftAsOpened(closed1);
    }
    if (giftsState && giftsState.gift2) {
      markGiftAsOpened(closed2);
    }

    // Gift click handlers - clone to remove old listeners
    var giftBox1 = document.getElementById('gift-box-1');
    var giftBox2 = document.getElementById('gift-box-2');

    var newBox1 = giftBox1.cloneNode(true);
    giftBox1.parentNode.replaceChild(newBox1, giftBox1);
    var newBox2 = giftBox2.cloneNode(true);
    giftBox2.parentNode.replaceChild(newBox2, giftBox2);

    var newClosed1 = document.getElementById('gift-closed-1');
    var newClosed2 = document.getElementById('gift-closed-2');

    document.getElementById('gift-box-1').addEventListener('click', function () {
      // First time: save state, show sparkles, add badge
      if (giftsState && !giftsState.gift1) {
        giftsState.gift1 = true;
        saveState();
        spawnSparkles(newClosed1);
        markGiftAsOpened(newClosed1);
      }
      // Always open the modal with the content
      openGiftModal(renderVariableGiftContent(dayData.variableGift));
    });

    document.getElementById('gift-box-2').addEventListener('click', function () {
      if (giftsState && !giftsState.gift2) {
        giftsState.gift2 = true;
        saveState();
        spawnSparkles(newClosed2);
        markGiftAsOpened(newClosed2);
      }
      openGiftModal(renderPoetryGiftContent(dayData.poetryGift));
    });

    // Enable wiggle on gift boxes
    initGiftBoxWiggle();
  }

  // ---------- Saturday / Countdown ----------
  var countdownInterval = null;

  function showSaturday() {
    showScreen('screen-saturday');

    document.getElementById('saturday-message').textContent = config.texts.saturdayMessage;
    document.getElementById('countdown-label').textContent = config.texts.countdownLabel;

    startCountdown();

    document.getElementById('btn-archive').onclick = function () {
      showArchive();
    };
  }

  function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);

    var meetingDate = new Date(config.settings.valentineDay + 'T' + config.settings.saturdayMeetingTime + ':00');

    function update() {
      var now = new Date();
      var diff = meetingDate - now;

      if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-container').style.display = 'none';
        var finishedEl = document.getElementById('countdown-finished');
        finishedEl.style.display = '';
        document.getElementById('countdown-finished-text').textContent = config.texts.countdownFinishedMessage;
        launchCelebration();
        return;
      }

      var hours = Math.floor(diff / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      updateCountdownUnit('countdown-hours', pad(hours));
      updateCountdownUnit('countdown-minutes', pad(minutes));
      updateCountdownUnit('countdown-seconds', pad(seconds));
    }

    update();
    countdownInterval = setInterval(update, 1000);
  }

  function updateCountdownUnit(id, value) {
    var el = document.getElementById(id);
    if (el.textContent !== value) {
      el.textContent = value;
      el.classList.remove('tick');
      el.offsetHeight;
      el.classList.add('tick');
    }
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  // ---------- Archive ----------
  function showArchive() {
    showScreen('screen-archive');

    var container = document.getElementById('archive-days');
    container.innerHTML = '';

    var giftIcons = ['\uD83C\uDFB5', '\uD83C\uDF38', '\uD83C\uDF9F\uFE0F', '\uD83D\uDCAD', '\uD83C\uDFB5'];

    config.days.forEach(function (dayData, index) {
      var btn = document.createElement('button');
      btn.className = 'archive-day-btn';
      var icon = giftIcons[index] || '\uD83C\uDF81';
      btn.innerHTML = '<span class="archive-day-num">' + dayData.day + '</span>' +
        '<span>' + icon + ' ' + escapeHtml(dayData.dayName) + '</span>';
      btn.addEventListener('click', function () {
        showArchiveDay(dayData.day);
      });
      container.appendChild(btn);
    });

    document.getElementById('btn-back-saturday').onclick = function () {
      showSaturday();
    };
  }

  function showArchiveDay(dayNum) {
    var dayData = config.days[dayNum - 1];
    if (!dayData) return;

    showScreen('screen-archive-day');

    document.getElementById('archive-day-title').textContent = dayData.dayName;
    document.getElementById('archive-riddle-text').textContent = dayData.riddle.text;

    // Set gift labels with type icon
    var label1 = document.getElementById('archive-gift-label-1');
    var label2 = document.getElementById('archive-gift-label-2');
    if (label1) label1.textContent = getGiftTypeIcon(dayData.variableGift.type) + ' Sorpresa';
    if (label2) label2.textContent = '\uD83D\uDCDC Poesia';

    // Gift boxes open the modal on tap
    var archiveGift1 = document.getElementById('archive-gift-1');
    var archiveGift2 = document.getElementById('archive-gift-2');

    archiveGift1.onclick = function () {
      spawnSparkles(archiveGift1);
      openGiftModal(renderVariableGiftContent(dayData.variableGift));
    };
    archiveGift2.onclick = function () {
      spawnSparkles(archiveGift2);
      openGiftModal(renderPoetryGiftContent(dayData.poetryGift));
    };

    document.getElementById('btn-back-archive').onclick = function () {
      showArchive();
    };
  }

  // ---------- Router / Main Flow ----------
  function route() {
    var currentDay = calculateCurrentDay();

    if (currentDay === -1) {
      showScreen('screen-coming-soon');
      document.getElementById('coming-soon-text').textContent = config.texts.comingSoonMessage;
      return;
    }

    if (currentDay === 0) {
      if (!state.hasAccepted) {
        showIntro();
      } else {
        showExplanation();
      }
      return;
    }

    if (currentDay >= 1 && currentDay <= 5) {
      if (!state.hasAccepted) {
        showIntro();
        return;
      }
      state.currentDay = currentDay;
      saveState();
      showGameDay(currentDay);
      return;
    }

    if (currentDay >= 6) {
      if (!state.hasAccepted) {
        showIntro();
        return;
      }
      showSaturday();
      return;
    }
  }

  function showIntro() {
    showScreen('screen-intro');

    document.getElementById('intro-question').textContent = config.texts.introQuestion;
    document.getElementById('btn-yes').textContent = config.texts.yesButton;
    document.getElementById('btn-no').textContent = config.texts.noButton;

    initNoButtonEscape();

    document.getElementById('btn-yes').addEventListener('click', function () {
      state.hasAccepted = true;
      saveState();
      showCelebration();
    });
  }

  function showCelebration() {
    showScreen('screen-celebration');
    document.getElementById('celebration-message').textContent = config.texts.celebrationMessage;

    launchCelebration();

    var btnContinue = document.getElementById('btn-continue');
    btnContinue.textContent = 'Continua';
    btnContinue.addEventListener('click', function () {
      var currentDay = calculateCurrentDay();
      if (currentDay >= 1 && currentDay <= 5) {
        state.currentDay = currentDay;
        saveState();
        showGameDay(currentDay);
      } else if (currentDay >= 6) {
        showSaturday();
      } else {
        showExplanation();
      }
    });
  }

  function showExplanation() {
    showScreen('screen-explanation');
    document.getElementById('explanation-text').textContent = config.texts.gameExplanation;

    document.getElementById('btn-start-game').addEventListener('click', function () {
      var currentDay = calculateCurrentDay();
      if (currentDay >= 1 && currentDay <= 5) {
        state.currentDay = currentDay;
        saveState();
        showGameDay(currentDay);
      } else if (currentDay >= 6) {
        showSaturday();
      }
    });
  }

  // ---------- Init ----------
  async function init() {
    loadState();
    initFloatingHearts();

    try {
      var resp = await fetch('config.json');
      config = await resp.json();
    } catch (e) {
      document.body.innerHTML = '<p style="padding:2rem;text-align:center;color:#E57373;">Errore nel caricamento della configurazione.</p>';
      return;
    }

    initGiftModal();
    route();
    if (window.initCatAnimations) window.initCatAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
