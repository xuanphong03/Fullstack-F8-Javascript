var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.children[0];
var progressDot = progress.children[0];

// Tinh width cua progress-bar
var progressBarWidth = progressBar.clientWidth;

// Code player nghe nhac
var audio = document.querySelector("audio");
var playerAction = document.querySelector(".player .player-action");
var durationEl = progressBar.nextElementSibling;
var currentTimeEl = progressBar.previousElementSibling;

var initialClientX = 0;
var initialSpace = 0;
var dragSpace = 0;

progressBar.addEventListener("mousedown", function (e) {
  e.preventDefault();
  if (e.which === 1) {
    // Tinh width tai vi tri click
    dragSpace = e.offsetX;
    // dragSpace
    var rate = (dragSpace * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;

    document.addEventListener("mousemove", handleDrag);
    initialClientX = e.clientX;
    initialSpace = dragSpace;

    audio.currentTime = (rate / 100) * audio.duration;
  }
});

progressDot.addEventListener("mousedown", function (e) {
  e.preventDefault();
  e.stopPropagation();
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  initialSpace = dragSpace;
});

var handleDrag = function (e) {
  var clientX = e.clientX;
  // Tinh khoang cach keo
  dragSpace = clientX - initialClientX + initialSpace;
  // Tinh phan tram
  var rate = (dragSpace * 100) / progressBarWidth;
  // Cap nhat CSS
  if (rate >= 0 && rate <= 100) {
    progress.style.width = `${rate}%`;
  }
};

window.addEventListener("load", function () {
  var getTime = function (seconds) {
    var mins = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" + mins : mins}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
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
    var rate = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${rate}%`;
  });
});
