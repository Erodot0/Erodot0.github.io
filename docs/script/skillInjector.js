import { skills, learningSkills } from "./database.js";
const carousel = document.querySelector(".carousel--wrapper");

//mobile skill injector
skills.forEach((skill) => {
  let code = `<li class="carousel--wrapper__item"><img src="${skill.src}" alt="${skill.name} icon"></li>`;
  carousel.innerHTML += code;
});

//pc skill injector
const obtainedSkills = document.querySelector("#learnedSkills");
skills.forEach((skill) => {
  let code = `<div class="skillsPc--container"><img class="skillsPc--container__item" src="${skill.src}" alt="${skill.name} icon"></div>`;
  obtainedSkills.innerHTML += code;
});

// learning skills injector
const inprogressSkills = document.querySelector("#inProgress");
learningSkills.forEach((skill) => {
  let code = `<div class="skillsPc--container"><img class="skillsPc--container__item" src="${skill.src}" alt="${skill.name} icon"></div>`;
  inprogressSkills.innerHTML += code;
});
