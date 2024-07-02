var carouselInner = document.querySelector(".carousel .carousel-inner");
var prevBtn = document.querySelector(".carousel-nav .prev");
var nextBtn = document.querySelector(".carousel-nav .next");
var carouselDotsList = document.querySelector(".carousel-dots-list");

// Width của carousel-inner
var itemWidth = carouselInner.clientWidth;
var totalCarousel = carouselInner.children.length;
var totalItemWidth = totalCarousel * itemWidth;
var position = 0;
var cursorClientX = null;
var distanceMovedMouse = null;

var slideTransitionMilestone = 0.3;

for (var i = 0; i < totalCarousel; i++) {
  carouselDotsList.innerHTML += `<span class="dot-item"></span>`;
}
carouselDotsList.children[0].classList.add("dot-item-active");
Array.from(carouselDotsList.children).forEach(function (dotItem, index) {
  dotItem.addEventListener("click", function () {
    var dotActive = carouselDotsList.querySelector(".dot-item-active");
    dotActive.classList.remove("dot-item-active");
    this.classList.add("dot-item-active");

    position = -(itemWidth * index);
    carouselInner.style.translate = `${position}px`;
  });
});

function handleMoveDot() {
  var slideIndex = Math.abs(position / itemWidth);
  var dotActive = carouselDotsList.querySelector(".dot-item-active");
  dotActive.classList.remove("dot-item-active");
  carouselDotsList.children[slideIndex].classList.add("dot-item-active");
}

function moveToNextSlide() {
  if (Math.abs(position) + itemWidth >= totalItemWidth) {
    return;
  }
  position -= itemWidth;
  carouselInner.style.translate = `${position}px`;
  handleMoveDot();
}

function moveToPreviousSlide() {
  if (Math.abs(position) === 0) {
    return;
  }
  position += itemWidth;
  carouselInner.style.translate = `${position}px`;
  handleMoveDot();
}

function handleDragSlide(e) {
  var currentCursorClientX = e.clientX;
  distanceMovedMouse = currentCursorClientX - cursorClientX;
  if (Math.abs(position) === 0 && distanceMovedMouse > 0) {
    return;
  }
  if (
    Math.abs(position) + itemWidth === totalItemWidth &&
    distanceMovedMouse < 0
  ) {
    return;
  }
  carouselInner.style.translate = `${position + distanceMovedMouse}px`;
}

carouselInner.addEventListener("mousedown", function (e) {
  e.preventDefault();
  cursorClientX = e.clientX;
  this.style.cursor = "grabbing";
  this.addEventListener("mousemove", handleDragSlide);
});
carouselInner.addEventListener("mouseup", function (e) {
  e.preventDefault();
  this.style.cursor = "default";
  this.removeEventListener("mousemove", handleDragSlide);

  console.log(Math.abs(distanceMovedMouse) / Math.abs(itemWidth));
  if (
    Math.abs(distanceMovedMouse) / Math.abs(itemWidth) >
    slideTransitionMilestone
  ) {
    if (distanceMovedMouse > 0) {
      moveToPreviousSlide();
    } else {
      moveToNextSlide();
    }
  } else {
    carouselInner.style.translate = `${position}px`;
  }
});

nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);
