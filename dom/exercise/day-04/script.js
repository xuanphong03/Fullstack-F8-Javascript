var prevBtn = document.querySelector(".prev-btn");
var nextBtn = document.querySelector(".next-btn");
var slidesList = document.querySelector(".slides-list");
var slideWidth = slidesList.children[0].clientWidth;
var dotBox = document.querySelector(".dot-box");
var totalSlidesListWidth = slidesList.children.length * slideWidth;
var totalSlide = slidesList.children.length;
var translateX = 0;

// Tạo nút tròn chuyển hướng
for (var i = 0; i < totalSlide; i++) {
  dotBox.innerHTML += "<span class='dot-item'></span>";
}
var activeItem = null;
if (dotBox.children.length) {
  activeItem = dotBox.children[0];
  activeItem.classList.add("active");

  var dotItemsList = dotBox.querySelectorAll(".dot-item");
  dotItemsList.forEach(function (dotItem, index) {
    dotItem.addEventListener("click", function () {
      activeItem.classList.remove("active");
      activeItem = this;
      this.classList.add("active");
      handleNavigateByDot(index);
    });
  });
}

function handleNextSlide() {
  if (Math.abs(translateX) >= totalSlidesListWidth - slideWidth) {
    return;
  }
  translateX -= slideWidth;

  var style = {
    transform: `translateX(${translateX}px)`,
  };
  Object.assign(slidesList.style, style);
  handleChangeActiveDot();
}

function handlePrevSlide() {
  if (Math.abs(translateX) <= 0) {
    return;
  }
  translateX += slideWidth;
  var style = {
    transform: `translateX(${translateX}px)`,
  };
  Object.assign(slidesList.style, style);
  handleChangeActiveDot();
}

// Chuyển slide khi bấm vào dot
function handleNavigateByDot(slideIndex) {
  translateX = -(slideIndex * slideWidth);
  var style = {
    transform: `translateX(${translateX}px)`,
  };
  Object.assign(slidesList.style, style);
}

// Chuyển active khi chọn nút next hoặc prev
function handleChangeActiveDot() {
  var slideIndex = Math.abs(translateX) / slideWidth;
  activeItem.classList.remove("active");
  activeItem = dotBox.children[slideIndex];
  activeItem.classList.add("active");
}

var initialPositionMouseDown = null;
var currentPositionMouse = null;
var clientX = null;
// Lướt slide bằng chuột
function handleChangeSlideByMouse(e) {
  currentPositionMouse = e.clientX;
  clientX = currentPositionMouse - initialPositionMouseDown;
  if (translateX === 0 && clientX > 0) {
    return;
  }
  if (
    Math.abs(translateX) === totalSlidesListWidth - slideWidth &&
    clientX < 0
  ) {
    return;
  }
  var style = {
    transform: `translateX(${translateX + clientX}px)`,
  };
  Object.assign(slidesList.style, style);
}

function handleBackInitialPosition() {
  var style = {
    transform: `translateX(${translateX}px)`,
  };
  Object.assign(slidesList.style, style);
}

slidesList.addEventListener("mousedown", function (e) {
  initialPositionMouseDown = e.clientX;
  slidesList.style.cursor = "all-scroll";
  slidesList.addEventListener("mousemove", handleChangeSlideByMouse);
});
slidesList.addEventListener("mouseup", function () {
  slidesList.style.cursor = "default";
  slidesList.removeEventListener("mousemove", handleChangeSlideByMouse);
  if (clientX < 0 && Math.abs(clientX / slideWidth) >= 0.2) {
    console.log("next");
    handleNextSlide();
  } else if (clientX > 0 && Math.abs(clientX / slideWidth) >= 0.2) {
    console.log("prev");
    handlePrevSlide();
  } else {
    handleBackInitialPosition();
  }
});

nextBtn.addEventListener("click", handleNextSlide);
prevBtn.addEventListener("click", handlePrevSlide);
