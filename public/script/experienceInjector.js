const experienceWrapper = document.querySelector(".experiences")
import { job } from "./database.js";

job.forEach((experience) => {
  let code = `
        <div class="experience">
            <div class="experience--content">
                <div class="experience--media">
                    <img class="experience--media__img" src="${experience.src}" alt="${experience.alt}">
                </div>
                <div class="experience--txt">
                    <p class="experience--txt__year">${experience.year}</p>
                    <h2 class="experience--txt__title">${experience.title}</h2>
                    <p class="experience--txt__description">${experience.description}</p>
                </div>
            </div>
        </div>
`;

    experienceWrapper.innerHTML += code
});
