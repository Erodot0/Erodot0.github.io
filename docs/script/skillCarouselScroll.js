const carouselWrapper = document.querySelector(".skills--carousel");
let oldScrollY = window.scrollY;

//auto scroll
window.onscroll = function (e) {
  const scrollY = window.scrollY;
  if (oldScrollY < scrollY && scrollY > 300) {
    carouselWrapper.scrollBy(1, 0);
  } else if (scrollY < 980){
    carouselWrapper.scrollBy(-1, 0);
  }
  oldScrollY = scrollY;
};


