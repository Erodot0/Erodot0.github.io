'use strict';
// Select the hamburger menu and menu list from the DOM
const menu = document.querySelector('.navbar--menu__hamburger');
const menuList = document.querySelector('.navbar--menu__list');

// Select all list items in the menu list
const listItems = menuList.childNodes;

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

  // Toggle the menu and hamburger click effects
  menuList.classList.toggle('menuClickEffect');
  menu.classList.toggle('hamburgerClickEffect');

  // Select all list items in the menu list and toggle their click effects
  const menuChildren = menuList.querySelectorAll('.liClickEffect');

  menuChildren.forEach((child) => {
    setTimeout(() => {
      child.classList.toggle('liClickEffect');
    }, 350);
  });
});

// Add an event listener to all list items in the menu list
listItems.forEach((item) => {
  item.addEventListener('click', () => {
    checkWidth();

    // If the device is a tablet, toggle the body's scroll behavior
    if (isTablet === true) {
      body.classList.toggle('bodyScrollDisabled');
    }

    // Toggle the menu and hamburger click effects
    menuList.classList.toggle('menuClickEffect');
    menu.classList.toggle('hamburgerClickEffect');

    // Select all list items in the menu list and toggle their click effects
    const menuChildren = menuList.querySelectorAll('.liClickEffect');

    menuChildren.forEach((child) => {
      setTimeout(() => {
        child.classList.toggle('liClickEffect');
      }, 350);
    });
  });
});
