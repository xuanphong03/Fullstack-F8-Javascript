var getLinkBtnEl = document.querySelector(".getLinkBtn");
var isCompletedCountDown = false;

function countdown(countDownTime, countDownBox) {
  var startTime = Date.now();
  var endTime = startTime + countDownTime * 1000;

  function update() {
    var currentTime = Date.now();
    var remaining = Math.max(0, endTime - currentTime);
    var seconds = Math.floor(remaining / 1000);
    countDownBox.textContent = seconds;
    if (remaining > 0) {
      requestAnimationFrame(update);
    } else {
      getLinkBtnEl.style.cursor = "pointer";
      getLinkBtnEl.style.background = "#03bdf0";
      getLinkBtnEl.addEventListener("click", function () {
        window.location.href = "https://fullstack.edu.vn/";
      });
    }
  }
  update();
}

var displayElement = document.getElementById("timer");
countdown(30, displayElement);
