var btn = document.querySelector(".btn");
var leftScreen = document.querySelector(".screen_left");
var rightScreen = document.querySelector(".screen_right");
var leftScreenWidth = leftScreen.clientWidth;
var rightScreenWidth = rightScreen.clientWidth;

var offsetX = 0;
var offsetY = 0;
var coordinateX = 0; // Tọa độ điểm x của button
var coordinateY = 0; // Tọa độ điểm y của button
var currentCoordinateX = 0; // Tọa độ hiện tại của điểm x của button

function moveBtn(e) {
  coordinateX = e.clientX - offsetX;
  coordinateY = e.clientY - offsetY;

  var css = {
    top: coordinateY + "px",
    left: coordinateX + "px",
  };
  currentX = e.clientX;
  Object.assign(btn.style, css);

  if (currentCoordinateX <= rightScreenWidth) {
    if (coordinateX >= rightScreenWidth - btn.clientWidth / 2) {
      rightScreen.style.backgroundColor = "red";
    } else {
      rightScreen.style.backgroundColor = "white";
    }
  }

  if (currentCoordinateX >= leftScreenWidth) {
    if (coordinateX <= leftScreenWidth - btn.clientWidth / 2) {
      leftScreen.style.backgroundColor = "red";
    } else {
      leftScreen.style.backgroundColor = "white";
    }
  }
}

btn.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    currentCoordinateX = e.clientX;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener("mousemove", moveBtn);
  }
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", moveBtn);
  var css = {};
  if (coordinateX >= rightScreenWidth - btn.clientWidth / 2) {
    css = {
      top: "10px",
      left: "85%",
    };
  } else {
    css = {
      top: "10px",
      left: "10px",
    };
  }
  leftScreen.style.backgroundColor = "white";
  rightScreen.style.backgroundColor = "white";
  Object.assign(btn.style, css);
});

rightScreen.addEventListener("click", function (e) {
  console.log(rightScreen.clientWidth);
});
