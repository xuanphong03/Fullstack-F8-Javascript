const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.children[0];
const progressDot = progress.children[0];
const progressReviewTimer = progressBar.children[1];
// Tinh width cua progress-bar
const progressBarWidth = progressBar.clientWidth;

// Code player nghe nhac
const audio = document.querySelector("audio");
const playerAction = document.querySelector(".player .player-action");
const durationEl = progressBar.nextElementSibling;
const currentTimeEl = progressBar.previousElementSibling;
//
let initialClientX = 0;
let initialSpace = 0;
let dragSpace = 0;
let isSeeking = false;

progressBar.addEventListener("mousedown", function (e) {
  e.preventDefault();
  if (e.which === 1) {
    // Tinh width tai vi tri click
    dragSpace = e.offsetX;
    // dragSpace
    let rate = (dragSpace * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;

    document.addEventListener("mousemove", handleDrag);
    initialClientX = e.clientX;
    initialSpace = dragSpace;

    audio.currentTime = (rate / 100) * audio.duration;
  }
});

progressDot.addEventListener("mousedown", function (e) {
  isSeeking = true;
  e.preventDefault();
  e.stopPropagation();
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  initialSpace = dragSpace;
  if (isSeeking) {
    let rate = (initialSpace * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    audio.currentTime = (rate / 100) * audio.duration;
  }
  isSeeking = false;
});

const handleDrag = function (e) {
  isSeeking = true;

  let clientX = e.clientX;
  // Tinh khoang cach keo
  dragSpace = clientX - initialClientX + initialSpace;
  // Tinh phan tram
  let rate = (dragSpace * 100) / progressBarWidth;
  // Cap nhat CSS
  if (rate >= 0 && rate <= 100) {
    progress.style.width = `${rate}%`;
  }
};

let getTime = function (seconds) {
  let mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

window.addEventListener("load", function () {
  // Hien thi thoi luong audio
  durationEl.innerText = getTime(audio.duration);
  // Lang nghe su kien khi click vao nut Play
  playerAction.addEventListener("click", function () {
    // Kiem tra nhac dang dung hay phat
    if (audio.paused) {
      audio.play(); // Phat nhac
      this.children[0].classList.replace("fa-play", "fa-pause");
    } else {
      audio.pause(); // Dung nhac
      this.children[0].classList.replace("fa-pause", "fa-play");
    }
  });

  // Lang nghe su kien nhac dang phat
  audio.addEventListener("timeupdate", function () {
    currentTimeEl.innerText = getTime(audio.currentTime);
    let rate = (audio.currentTime * 100) / audio.duration;
    if (!isSeeking) {
      progress.style.width = `${rate}%`;
      initialSpace = (rate / 100) * progressBarWidth;
    }
  });

  // Xử lý sự kiện nghe hết nhạc
  audio.addEventListener("ended", function () {
    progress.style.width = "0%";
    initialSpace = 0;
    playerAction.children[0].classList.replace("fa-pause", "fa-play");
    audio.pause(); // Dung nhac
  });
});

var handleShowProgressReview = function (e) {
  var offsetX = e.offsetX;
  var rate = (offsetX * 100) / progressBarWidth;
  var timeReview = getTime((rate / 100) * audio.duration);
  if (offsetX >= 0 && offsetX <= progressBarWidth) {
    progressReviewTimer.style.left = `${rate}%`;
    progressReviewTimer.innerText = timeReview;
  }
};

progressBar.addEventListener("mouseover", function (e) {
  progressReviewTimer.style.display = "block";
  progressBar.addEventListener("mousemove", handleShowProgressReview);
});

progressDot.addEventListener("mouseover", function (e) {
  e.stopPropagation();
});

progressBar.addEventListener("mouseout", function (e) {
  if (!isSeeking) {
    progressReviewTimer.style.display = "none";
  }
});

// document.addEventListener("mousemove", function (e) {
//   if (isSeeking) {
//     progressReviewTimer.style.display = "block";
//     progressBar.addEventListener("mousemove", function (e) {});
//   }
// });
