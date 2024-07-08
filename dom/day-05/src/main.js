window.addEventListener("load", function () {
  const progressBar = document.querySelector(".progress-bar");
  const progress = progressBar.querySelector(".progress");
  const progressSpan = progress.querySelector("span");
  const progressReviewTimer = progressBar.querySelector(".review-timer");

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
    let reviewTimer = (rate / 100) * audio.duration;
    if (rate >= 0 && rate <= 100) {
      progress.style.width = `${rate}%`;
      progressReviewTimer.innerText = formatTime(reviewTimer);
      progressReviewTimer.style.left = `${rate}%`;
      progressReviewTimer.style.display = "block";
    }
  };

  progressBar.addEventListener("mousedown", function (e) {
    if (e.which !== 1) {
      return;
    }
    currentPosition = e.offsetX;
    rate = (currentPosition / progressBarWidth) * 100;
    progress.style.width = `${rate}%`;
    // Set lại current time của bài hát
    audio.currentTime = (rate / 100) * audio.duration;

    // Cách trên lớp
    //   moveSpace = currentPosition;
    // ---------------------
    initialPosition = e.clientX;
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
      let rate = (currentPosition / progressBarWidth) * 100;
      progress.style.width = `${rate}%`;
      audio.currentTime = (rate / 100) * audio.duration;
      progressReviewTimer.style.display = "none";
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

  durationEl.innerText = formatTime(audio.duration);

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
    if (!isDragging) {
      progress.style.width = `${rate}%`;
    }
  });

  // Xử lý sự kiện nghe hết nhạc
  audio.addEventListener("ended", function () {
    progress.style.width = "0%";
    currentPosition = 0;
    playerAction.children[0].classList.replace("fa-pause", "fa-play");
    audio.pause(); // Dung nhac
  });

  const handleShowProgressReview = function (e) {
    isHoveringProgressBar = true;
    let offsetX = e.offsetX;
    let rate = (offsetX * 100) / progressBarWidth;
    let timeReview = formatTime((rate / 100) * audio.duration);
    if (offsetX >= 0 && offsetX <= progressBarWidth) {
      progressReviewTimer.style.left = `${rate}%`;
      progressReviewTimer.innerText = timeReview;
    }
  };

  progressBar.addEventListener("mouseover", function (e) {
    progressReviewTimer.style.display = "block";
    progressBar.addEventListener("mousemove", handleShowProgressReview);
  });

  progressSpan.addEventListener("mouseover", function (e) {
    e.stopPropagation();
  });

  progressBar.addEventListener("mouseout", function (e) {
    if (!isDragging) {
      progressReviewTimer.style.display = "none";
    }
  });
});
