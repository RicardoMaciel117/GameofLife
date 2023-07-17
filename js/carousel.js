const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function showSlide() {
  slides[currentSlide].classList.add('active');
}

function hideSlide() {
  slides[currentSlide].classList.remove('active');
}

function nextSlide() {
  hideSlide();
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  hideSlide();
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide();
}

showSlide();

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);