'use strict';
import { socials } from '../data/database.js';
const socialWrapper = document.querySelector('.contactContainer--social');

socials.forEach((social) => {
  const code = `<li class="contactContainer--social__item"><a href="${social.href}" target="_blank"><div class="socialIcon"><img src="${social.src}" alt="${social.name} icon" /></div>${social.name}</a></li>`;
  socialWrapper.innerHTML += code;
});
