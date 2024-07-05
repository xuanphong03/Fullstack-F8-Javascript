const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressSpan = progress.querySelector("span");

const progressBarWidth = progressBar.clientWidth;
let initialPosition = 0;
let currentPosition = 0;
let moveSpace = 0;
let isDragging = false;

// Hàm xử lý sự kiện bấm vào span rồi kéo chuột
const handleDrag = function (e) {
  isDragging = true;
  let clientX = e.clientX;
  moveSpace = clientX - initialPosition + currentPosition;

  let rate = (moveSpace / progressBarWidth) * 100;
  if (rate >= 0 && rate <= 100) {
    progress.style.width = `${rate}%`;
  }
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which !== 1) {
    return;
  }
  currentPosition = e.offsetX;
  rate = (currentPosition / progressBarWidth) * 100;
  progress.style.width = `${rate}%`;

  initialPosition = e.clientX;
  // Cách trên lớp
  //   moveSpace = currentPosition;
  // ---------------------
  document.addEventListener("mousemove", handleDrag);
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  initialPosition = e.clientX;
  // Gán sự kiện kéo chuột
  document.addEventListener("mousemove", handleDrag);
});

document.addEventListener("mouseup", function (e) {
  // Xóa sự kiện kéo chuột
  document.removeEventListener("mousemove", handleDrag);
  // Cách trên lớp
  //   currentPosition = moveSpace;
  // ----------------

  // Cách 2
  if (isDragging) {
    currentPosition = moveSpace;
  }
  isDragging = false;
});

// Xử lý audio
const audio = document.querySelector("audio");
const durationEl = progressBar.nextElementSibling;
const currentTimeEl = progressBar.previousElementSibling;
const playActionEl = document.querySelector(".play-action i");

const formatTime = function (seconds) {
  let mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

window.addEventListener("load", function () {
  console.log(audio.duration);
  durationEl.innerText = formatTime(audio.duration);
});

playActionEl.addEventListener("click", function () {
  // audio.paused => Kiểm tra xem nhạc có đang dừng hay không
  // audio.play() => Phát nhạc
  // audio.pause() => Dừng nhạc
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", function () {
  playActionEl.classList.replace("fa-play", "fa-pause");
});

audio.addEventListener("pause", function () {
  playActionEl.classList.replace("fa-pause", "fa-play");
});

audio.addEventListener("timeupdate", function (e) {
  let currentTime = audio.currentTime;
  currentTimeEl.innerText = formatTime(currentTime);
  let rate = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${rate}%`;
});
