'use strict';
// Select the hamburger menu and menu list from the DOM
const menu = document.querySelector('.navbar--menu__hamburger');
const menuList = document.querySelector('.navbar--menu__list');

// Select all list items in the menu list
const listItems = menuList.querySelectorAll('li');

// Select the body tag from the DOM
const body = document.getElementsByTagName('body')[0];

// Set a variable to keep track of whether the device is a tablet or not
let isTablet;

// Set a media query to check if the device is a tablet or smaller
const windowWidth = window.matchMedia('(min-width: 768px)');

// Function to check if the media query matches the device width
function checkWidth() {
  if (windowWidth.matches) {
    // If media query matches, the device is not a tablet
    isTablet = false;
  } else {
    isTablet = true;
  }
}

// Add an event listener to the hamburger menu
menu.addEventListener('click', () => {
  checkWidth();

  // If the device is a tablet, toggle the body's scroll behavior
  if (isTablet === true) {
    body.classList.toggle('bodyScrollDisabled');
  }

  // Toggle menu visibility and hamburger state
  menuList.classList.toggle('open');
  menu.classList.toggle('open');
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
});

// Add an event listener to all list items in the menu list
  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      checkWidth();
      // Hide menu and reset hamburger state
      menuList.classList.remove('open');
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');

      if (isTablet === true) {
        body.classList.remove('bodyScrollDisabled');
      }
    });
  });
