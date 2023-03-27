const carouselWrapper = document.querySelector(".skills--carousel");
let oldScrollY = window.scrollY;

// Set up a listener for when the user scrolls the window
window.onscroll = function (e) {
  const scrollY = window.scrollY;
  
  // If the user is scrolling down and has scrolled past 300 pixels, scroll the carousel to the right
  if (oldScrollY < scrollY && scrollY > 300) {
    carouselWrapper.scrollBy(1, 0);
  } 
  // If the user is scrolling up and has scrolled past 980 pixels, scroll the carousel to the left
  else if (scrollY < 980){
    carouselWrapper.scrollBy(-1, 0);
  }
  
  // Store the current scroll position so we can compare it to the next position
  oldScrollY = scrollY;
};
