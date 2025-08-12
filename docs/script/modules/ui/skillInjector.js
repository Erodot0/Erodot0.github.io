'use strict';
import { skills } from '../data/database.js';

const skillTemplate = document.getElementById('skill-template');

const renderSkills = (list, id) => {
  const container = document.querySelector(`#${id}`);
  if (!container || !skillTemplate) return;
  const frag = document.createDocumentFragment();
  list.forEach((skill) => {
    const el = skillTemplate.content.cloneNode(true);
    el.querySelector('li').textContent = `${skill.name} — ${skill.level}`;
    frag.appendChild(el);
  });
  container.appendChild(frag);
};

renderSkills(skills.core, 'coreSkills');
renderSkills(skills.used, 'usedSkills');
renderSkills(skills.learning, 'learningSkills');

