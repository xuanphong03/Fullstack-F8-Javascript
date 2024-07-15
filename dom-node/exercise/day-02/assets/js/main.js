window.addEventListener("load", function () {
  const progressBar = document.querySelector(".progress-bar");
  const progress = progressBar.querySelector(".progress");
  const progressSpan = progress.querySelector("span");
  const progressReviewTimer = progressBar.querySelector(".review-timer");

  const progressBarWidth = progressBar.clientWidth;
  let initialindex = 0;
  let currentindex = 0;
  let moveSpace = 0;
  let isDragging = false;
  let playedSong = false;

  // Hàm xử lý sự kiện bấm vào span rồi kéo chuột
  const handleDrag = function (e) {
    isDragging = true;
    let clientX = e.clientX;
    moveSpace = clientX - initialindex + currentindex;

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
    currentindex = e.offsetX;
    rate = (currentindex / progressBarWidth) * 100;
    progress.style.width = `${rate}%`;
    // Set lại current time của bài hát
    audio.currentTime = (rate / 100) * audio.duration;

    initialindex = e.clientX;
    document.addEventListener("mousemove", handleDrag);
  });

  progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    initialindex = e.clientX;
    // Gán sự kiện kéo chuột
    document.addEventListener("mousemove", handleDrag);
  });

  document.addEventListener("mouseup", function (e) {
    // Xóa sự kiện kéo chuột
    document.removeEventListener("mousemove", handleDrag);

    if (isDragging) {
      currentindex = moveSpace;
      let rate = (currentindex / progressBarWidth) * 100;
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
    playedSong = true;
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
    handleShowLyrics(this.currentTime * 1000);
  });

  // Xử lý sự kiện nghe hết nhạc
  audio.addEventListener("ended", function () {
    progress.style.width = "0%";
    currentindex = 0;
    currentTimeEl.innerText = formatTime(0);
    playActionEl.classList.replace("fa-pause", "fa-play");

    audio.pause(); // Dừng nhạc
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

  // Karaoke
  const karaokeScreenEl = document.querySelector(".karaoke-screen");
  const openKaraokeBtnEl = document.querySelector(".openKaraokeBtn");
  const closeKaraokeBtnEl = document.querySelector(".closeKaraokeBtn");
  const karaokeInnerEl = document.querySelector(".karaoke-inner");

  const lyrics = API_RESPONSE.data.sentences.map(function (item) {
    return item.words;
  });

  const songInfo = DomNodesHook.createElement(
    "div",
    {},
    DomNodesHook.createElement("p", {}, "Tên bài hát: Crying over you"),
    DomNodesHook.createElement("p", {}, "Ca sĩ: Binz - JustaTee")
  );

  // Xử lý đóng mở màn hình karaoke
  const handleOpenKaraokeScreen = function () {
    karaokeScreenEl.style.top = "0";
  };
  const handleCloseKaraokeScreen = function () {
    karaokeScreenEl.style.top = "100%";
  };

  openKaraokeBtnEl.addEventListener("click", handleOpenKaraokeScreen);
  closeKaraokeBtnEl.addEventListener("click", handleCloseKaraokeScreen);

  // Xử lý hiển thị lyric
  let firstLyricStartTime = lyrics[0][0].startTime;
  let lastLyricEndTime =
    lyrics[lyrics.length - 1][lyrics[lyrics.length - 1].length - 1].endTime;

  const handleShowLyrics = function (currentTime) {
    let index = lyrics.findIndex(function (lyric) {
      return (
        currentTime > lyric[0].startTime &&
        currentTime < lyric[lyric.length - 1].endTime
      );
    });

    // Hiển thị thông tin bài hát khi dạo nhạc và sau khi kết thúc bài hát
    if (
      currentTime < firstLyricStartTime - 5000 ||
      currentTime > lastLyricEndTime + 5000
    ) {
      karaokeInnerEl.innerHTML = "";
      DomNodesHook.render(karaokeInnerEl, songInfo);
    }

    if (index !== -1) {
      let currentSentence = lyrics[index];
      let nextSentence = lyrics[index + 1];

      // Nếu khoảng cách thời gian giữa 2 câu liền kề > 10 giây
      // thì sẽ hiện thông tin bài hát sau 5s
      if (
        nextSentence &&
        nextSentence[0].startTime -
          currentSentence[currentSentence.length - 1].endTime >
          10000
      ) {
        setTimeout(function () {
          karaokeInnerEl.innerHTML = "";
          DomNodesHook.render(karaokeInnerEl, songInfo);
        }, 5000);
      } else {
        // Nếu là câu chẵn thì sẽ render ra câu hiện tại và câu tiếp theo.
        if (index % 2 === 0) {
          let karaokeContentEl = DomNodesHook.createElement("div", {
            className: "karaoke-content",
          });

          let firstSentenceEl = DomNodesHook.createElement("p", {
            classList: "karaoke-sentence",
          });
          currentSentence.forEach(function (item) {
            let wordEl = DomNodesHook.createElement(
              "span",
              {},
              `${item.data} `
            );
            DomNodesHook.render(firstSentenceEl, wordEl);
          });
          DomNodesHook.render(karaokeContentEl, firstSentenceEl);

          let secondeSentenceEl = DomNodesHook.createElement("p", {
            classList: "karaoke-sentence",
          });
          nextSentence.forEach(function (item) {
            let wordEl = DomNodesHook.createElement(
              "span",
              {},
              `${item.data} `
            );
            DomNodesHook.render(secondeSentenceEl, wordEl);
          });
          DomNodesHook.render(karaokeContentEl, secondeSentenceEl);

          DomNodesHook.render(karaokeInnerEl, karaokeContentEl);
          if (karaokeContentEl.previousElementSibling) {
            karaokeContentEl.previousElementSibling.remove();
          }
        }
      }
    }
  };
});
