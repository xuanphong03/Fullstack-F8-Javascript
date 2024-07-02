var carouselInner = document.querySelector(".carousel .carousel-inner");
var prevBtn = document.querySelector(".carousel-nav .prev");
var nextBtn = document.querySelector(".carousel-nav .next");

// Width của carousel-inner
var itemWidth = carouselInner.clientWidth;
var totalItemWidth = carouselInner.children.length * itemWidth;
var position = 0;

nextBtn.addEventListener("click", function (e) {
  if (Math.abs(position) + itemWidth >= totalItemWidth) {
    return;
  }
  position -= itemWidth;
  carouselInner.style.translate = `${position}px`;
});

prevBtn.addEventListener("click", function () {
  if (Math.abs(position) === 0) {
    return;
  }
  position += itemWidth;
  carouselInner.style.translate = `${position}px`;
});
