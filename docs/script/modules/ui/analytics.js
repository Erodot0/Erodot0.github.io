'use strict';

const trackClick = (selector, eventName) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.addEventListener('click', () => {
    if (typeof plausible === 'function') {
      plausible(eventName);
    }
  });
};

trackClick('.btn.btn--solid[href="#projects"]', 'View Projects');
trackClick('.btn.btn--ghost[download]', 'Download CV');

const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', () => {
    if (typeof plausible === 'function') {
      plausible('Contact Form Submitted');
    }
  });
}
