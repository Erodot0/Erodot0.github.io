'use strict';
import { job } from '../data/database.js';

const experienceWrapper = document.querySelector('.experiences');
const template = document.getElementById('experience-template');

if (experienceWrapper && template) {
  const frag = document.createDocumentFragment();
  job.forEach((experience) => {
    const el = template.content.cloneNode(true);
    const img = el.querySelector('.experience--media__img');
    img.src = experience.src;
    img.alt = experience.alt;
    el.querySelector('.experience--txt__year').textContent = experience.period;
    el.querySelector('.experience--txt__title').textContent = `${experience.role} — ${experience.company}`;
    el.querySelector('.experience--txt__description').textContent = experience.summary;
    const list = el.querySelector('.experience--txt__list');
    [...experience.responsibilities, ...experience.results].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    frag.appendChild(el);
  });
  experienceWrapper.appendChild(frag);
}

