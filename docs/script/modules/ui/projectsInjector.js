'use strict';
import { projects } from '../data/database.js';

const container = document.querySelector('.projects--container');
const fragment = document.createDocumentFragment();

projects.forEach((project) => {
  const projectDiv = document.createElement('div');
  projectDiv.className = 'project';

  const img = document.createElement('img');
  img.className = 'project--image';
  img.src = project.img;
  img.alt = `${project.title} screenshot`;

  const title = document.createElement('h3');
  title.className = 'project--title';
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.className = 'project--description';
  desc.textContent = project.description;

  const stackDiv = document.createElement('div');
  stackDiv.className = 'project--stack';
  project.stack.forEach((tech) => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = tech;
    stackDiv.appendChild(span);
  });

  const linksDiv = document.createElement('div');
  linksDiv.className = 'project--links';
  const gitLink = document.createElement('a');
  gitLink.className = 'btn btn--ghost';
  gitLink.href = project.github;
  gitLink.target = '_blank';
  gitLink.textContent = 'GitHub';
  const liveLink = document.createElement('a');
  liveLink.className = 'btn btn--solid';
  liveLink.href = project.live;
  liveLink.target = '_blank';
  liveLink.textContent = 'Live';
  linksDiv.append(gitLink, liveLink);

  const outcome = document.createElement('p');
  outcome.className = 'project--outcome';
  outcome.textContent = project.outcome;

  projectDiv.append(img, title, desc, stackDiv, linksDiv, outcome);
  fragment.appendChild(projectDiv);
});

container.appendChild(fragment);
