const timerEl = document.querySelector("#timer");
const getLinkBtn = document.querySelector(".getLinkBtn");

let countDownTime = 30;
let startTime = Date.now();
let endTime = startTime + countDownTime * 1000;
let stopTime;
let requestAnimationFrameId;

function startCountDown() {
  let currentTime = Date.now();
  let remainingTime = Math.max(0, endTime - currentTime);
  timerEl.innerText = Math.floor(remainingTime / 1000);
  if (remainingTime > 0) {
    requestAnimationFrameId = requestAnimationFrame(startCountDown);
  } else {
    getLinkBtn.style.cursor = "pointer";
    getLinkBtn.style.background = "#03bdf0";
    addEventGetLink();
  }
}

function addEventGetLink() {
  getLinkBtn.addEventListener("click", function () {
    window.location.href = "https://fullstack.edu.vn/";
  });
}

function stopCountDown() {
  // Đánh dấu mốc tgian chuyển tab và ngừng đếm ngược
  stopTime = Date.now();
  cancelAnimationFrame(requestAnimationFrameId);
}

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    stopCountDown();
  } else {
    // Nếu có Stop time thì mới cập nhật lại end time
    endTime += stopTime ? Date.now() - stopTime : 0;
    startCountDown();
  }
});

startCountDown();
