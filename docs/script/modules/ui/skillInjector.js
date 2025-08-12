'use strict';
import { skills } from '../data/database.js';

const renderSkills = (list, id) => {
  const container = document.querySelector(`#${id}`);
  const fragment = document.createDocumentFragment();
  list.forEach((skill) => {
    const li = document.createElement('li');
    li.textContent = `${skill.name} — ${skill.level}`;
    fragment.appendChild(li);
  });
  container.appendChild(fragment);
};

renderSkills(skills.core, 'coreSkills');
renderSkills(skills.used, 'usedSkills');
renderSkills(skills.learning, 'learningSkills');
