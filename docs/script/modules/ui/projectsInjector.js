'use strict';
import { projects } from '../data/database.js';

const container = document.querySelector('.projects--container');

projects.forEach((project) => {
  const badges = project.stack
    .map((tech) => `<span class="badge">${tech}</span>`)
    .join('');
  const code = `
    <div class="project">
      <img class="project--image" src="${project.img}" alt="${project.title} screenshot">
      <h3 class="project--title">${project.title}</h3>
      <p class="project--description">${project.description}</p>
      <div class="project--stack">${badges}</div>
      <div class="project--links">
        <a class="btn btn--ghost" href="${project.github}" target="_blank">GitHub</a>
        <a class="btn btn--solid" href="${project.live}" target="_blank">Live</a>
      </div>
      <p class="project--outcome">${project.outcome}</p>
    </div>
  `;
  container.innerHTML += code;
});
