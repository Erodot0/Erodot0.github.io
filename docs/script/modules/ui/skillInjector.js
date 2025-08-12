'use strict';
import { skills } from '../data/database.js';

const renderSkills = (list, id) => {
  const container = document.querySelector(`#${id}`);
  list.forEach((skill) => {
    container.innerHTML += `<li>${skill.name} — ${skill.level}</li>`;
  });
};

renderSkills(skills.core, 'coreSkills');
renderSkills(skills.used, 'usedSkills');
renderSkills(skills.learning, 'learningSkills');
