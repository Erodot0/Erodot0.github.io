'use strict';

const carousel = document.querySelector('.skills--carousel');
const prevBtn = document.querySelector('.skills--carousel__prev');
const nextBtn = document.querySelector('.skills--carousel__next');

if (carousel && prevBtn && nextBtn) {
  const scrollAmount = () => carousel.clientWidth;
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}

