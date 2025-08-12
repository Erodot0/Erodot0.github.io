'use strict';
// Get the HTML element that will contain the job experiences
const experienceWrapper = document.querySelector('.experiences');

// Import the job data from an external module (not shown in this code snippet)
import { job } from '../data/database.js';

const fragment = document.createDocumentFragment();

// Loop through each job experience and create HTML elements to display it
job.forEach((experience) => {
  const experienceDiv = document.createElement('div');
  experienceDiv.className = 'experience';

  const content = document.createElement('div');
  content.className = 'experience--content';

  const media = document.createElement('div');
  media.className = 'experience--media';
  const img = document.createElement('img');
  img.className = 'experience--media__img';
  img.src = experience.src;
  img.alt = experience.alt;
  media.appendChild(img);

  const txt = document.createElement('div');
  txt.className = 'experience--txt';
  const year = document.createElement('p');
  year.className = 'experience--txt__year';
  year.textContent = experience.period;
  const title = document.createElement('h2');
  title.className = 'experience--txt__title';
  title.textContent = `${experience.role} — ${experience.company}`;
  const summary = document.createElement('p');
  summary.className = 'experience--txt__description';
  summary.textContent = experience.summary;
  const list = document.createElement('ul');
  list.className = 'experience--txt__list';
  experience.responsibilities.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  experience.results.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  txt.append(year, title, summary, list);
  content.append(media, txt);
  experienceDiv.appendChild(content);
  fragment.appendChild(experienceDiv);
});

experienceWrapper.appendChild(fragment);
