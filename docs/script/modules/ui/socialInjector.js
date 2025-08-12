'use strict';
import { socials } from '../data/database.js';

const socialWrapper = document.querySelector('.contactContainer--social');
const template = document.getElementById('social-template');

if (socialWrapper && template) {
  const frag = document.createDocumentFragment();
  socials.forEach((social) => {
    const el = template.content.cloneNode(true);
    const a = el.querySelector('a');
    a.href = social.href;
    a.target = '_blank';
    const img = el.querySelector('img');
    img.src = social.src;
    img.alt = `${social.name} icon`;
    el.querySelector('.socialName').textContent = social.name;
    frag.appendChild(el);
  });
  socialWrapper.appendChild(frag);
}

