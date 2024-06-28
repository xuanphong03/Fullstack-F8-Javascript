var btn = document.querySelector(".btn");
var tasksList = document.querySelectorAll(".tasks_list");

var offsetX = 0;
var offsetY = 0;
var coordinateX = 0; // Tọa độ điểm x của button
var coordinateY = 0; // Tọa độ điểm y của button

function getCurrentColumn() {
  if (coordinateX < tasksList[0].clientWidth - btn.clientWidth / 2) {
    return 1;
  } else if (coordinateX < tasksList[0].clientWidth * 2 - btn.clientWidth / 2) {
    return 2;
  } else if (coordinateX < tasksList[0].clientWidth * 3 - btn.clientWidth / 2) {
    return 3;
  } else if (coordinateX < tasksList[0].clientWidth * 4 - btn.clientWidth / 2) {
    return 4;
  }
}

function setBackgroundColumn(currentColumn) {
  tasksList.forEach(function (taskColumn) {
    taskColumn.style.background = "white";
  });
  tasksList[currentColumn - 1].style.background = "blue";
}

var currentTaskColumn = getCurrentColumn();
var prevTaskColum = currentTaskColumn;

function moveBtn(e) {
  coordinateX = e.clientX - offsetX;
  coordinateY = e.clientY - offsetY;

  var css = {
    top: coordinateY + "px",
    left: coordinateX + "px",
  };

  Object.assign(btn.style, css);

  currentTaskColumn = getCurrentColumn();

  setBackgroundColumn(currentTaskColumn);
}

btn.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    currentCoordinateX = e.clientX;
    prevTaskColum = currentTaskColumn;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener("mousemove", moveBtn);
  }
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", moveBtn);
  tasksList.forEach(function (taskColumn) {
    taskColumn.style.background = "white";
  });
  var css = {
    top: "10px",
    left: `${
      tasksList[0].clientWidth * 0.2 +
      tasksList[0].clientWidth * (currentTaskColumn - 1)
    }px`,
  };

  console.log(
    (tasksList[0].clientWidth * 0.5 + tasksList[0].clientWidth) *
      (currentTaskColumn - 1)
  );
  Object.assign(btn.style, css);
});
