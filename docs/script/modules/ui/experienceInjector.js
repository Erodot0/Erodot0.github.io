'use strict';
// Get the HTML element that will contain the job experiences
const experienceWrapper = document.querySelector('.experiences');

// Import the job data from an external module (not shown in this code snippet)
import { job } from '../data/database.js';

// Loop through each job experience and create HTML code to display it
job.forEach((experience) => {
  const responsibilities = experience.responsibilities
    .map((item) => `<li>${item}</li>`)
    .join('');
  const results = experience.results.map((item) => `<li>${item}</li>`).join('');

  const code = `
      <div class="experience">
          <div class="experience--content">
              <div class="experience--media">
                  <img class="experience--media__img" src="${experience.src}" alt="${experience.alt}">
              </div>
              <div class="experience--txt">
                  <p class="experience--txt__year">${experience.period}</p>
                  <h2 class="experience--txt__title">${experience.role} — ${experience.company}</h2>
                  <p class="experience--txt__description">${experience.summary}</p>
                  <ul class="experience--txt__list">${responsibilities}${results}</ul>
              </div>
          </div>
      </div>
    `;

  // Add the generated HTML code for the current job experience to the experienceWrapper element
  experienceWrapper.innerHTML += code;
});
