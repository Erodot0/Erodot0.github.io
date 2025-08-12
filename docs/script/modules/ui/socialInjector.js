'use strict';
import { socials } from '../data/database.js';

const socialWrapper = document.querySelector('.contactContainer--social');
const fragment = document.createDocumentFragment();

socials.forEach((social) => {
  const li = document.createElement('li');
  li.className = 'contactContainer--social__item';

  const a = document.createElement('a');
  a.href = social.href;
  a.target = '_blank';

  const icon = document.createElement('div');
  icon.className = 'socialIcon';
  const img = document.createElement('img');
  img.src = social.src;
  img.alt = `${social.name} icon`;
  icon.appendChild(img);

  a.append(icon, document.createTextNode(social.name));
  li.appendChild(a);
  fragment.appendChild(li);
});

socialWrapper.appendChild(fragment);

