'use strict';
import { projects } from '../data/database.js';

const container = document.querySelector('.projects--container');

projects.forEach((project) => {
  const badges = project.stack
    .map((tech) => `<span class="badge">${tech}</span>`)
    .join('');
  const code = `
    <div class="project">
      <h3 class="project--title">${project.title}</h3>
      <p class="project--description">${project.description}</p>
      <div class="project--stack">${badges}</div>
      <div class="project--links">
        <a href="${project.github}" target="_blank">GitHub</a>
        <a href="${project.live}" target="_blank">Live</a>
      </div>
      <p class="project--outcome">${project.outcome}</p>
    </div>
  `;
  container.innerHTML += code;
});
