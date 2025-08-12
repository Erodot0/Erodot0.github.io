'use strict';
let i = 0;
const speed = 50;

//About typewriting
const titleHtml = document.querySelector('.about--text__title');
const paragraphHtml = document.querySelector('.about--text__paragraph');
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

//text to write
const title = `Hello, there!`;
const txt = `I'm a passionate web developer who enjoys working with others and teaching the art of coding.
I'm always looking for new opportunities and challenges to grow
both personally and professionally.`;
//check if the title is written
let isTitle = false;
let isVisible = false;
let scrollY = window.scrollY;

if (prefersReducedMotion) {
  titleHtml.textContent = title;
  paragraphHtml.textContent = txt;
} else {
  window.addEventListener('scroll', () => {
    if (isTitle === false) {
      typeWriter();
    }

    scrollY = window.scrollY;
    if (scrollY > 620) {
      isVisible = true;
    }
  });
}

function typeWriter() {
  if (i < title.length && isTitle === false && isVisible === true) {
    titleHtml.textContent += title.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }

  //if the title is writte,  it will reset the i variable
  if (i === title.length && isTitle === false) {
    isTitle = true;
    i = 0;
  }

  if (i < txt.length && isTitle === true) {
    paragraphHtml.textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
