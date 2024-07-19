const lyrics = API_RESPONSE.data.sentences.map((lyric) => lyric.words);
console.log(lyrics);
var karaokeInner = document.querySelector(".karaoke-inner");
var audio = document.querySelector("audio");

audio.addEventListener("play", function () {
  requestId = requestAnimationFrame(handleKaraoke);
});

audio.addEventListener("pause", function () {
  cancelAnimationFrame(requestId);
});

var currentIndex = -1;

function handleKaraoke() {
  var currentTime = audio.currentTime * 1000;
  fillColorWord(currentTime);

  var index = lyrics.findIndex(function (lyric) {
    var firstWord = lyric[0];
    var lastWord = lyric[lyric.length - 1];
    return (
      currentTime >= firstWord.startTime && currentTime <= lastWord.endTime
    );
  });

  if (index !== -1 && index !== currentIndex) {
    if (index === 0) {
      karaokeInner.innerHTML = "";
      karaokeInner.innerHTML = `
            <p>${getSentence(0)}</p>
            <p>${getSentence(1)}</p>
        `;
    } else {
      if (index % 2 !== 0) {
        nextSentence(karaokeInner.children[0], getSentence(index + 1));
      } else {
        nextSentence(karaokeInner.children[1], getSentence(index + 1));
      }
    }
    currentIndex = index;
  }
  requestId = requestAnimationFrame(handleKaraoke);
}

function getSentence(index) {
  return lyrics[index]
    .map(
      (word) =>
        `<span class='word' data-index='${index}' data-start-time='${word.startTime}' data-end-time='${word.endTime}'>${word.data}<span>${word.data}</span></span>`
    )
    .join(" ");
}

function nextSentence(element, sentence) {
  // Element: Dòng muốn ẩn để hiển thị câu tiếp theo.
  // Sentence: Câu tiếp theo.
  element.style.transition = "opacity 0.6s linear";
  element.style.opacity = 0;
  setTimeout(function () {
    element.innerHTML = sentence;
    element.style.opacity = 1;
  }, 600);
}
function fillColorWord(currentTime) {
  var wordList = karaokeInner.querySelectorAll(".word");

  wordList.forEach(function (wordEl) {
    var startTime = wordEl.dataset.startTime;
    var endTime = wordEl.dataset.endTime;
    console.log({ startTime, endTime });
    if (currentTime >= startTime && currentTime <= endTime) {
      var rate = ((currentTime - startTime) / (endTime - startTime)) * 100;
      wordEl.children[0].style.width = `${rate}%`;
    }
    if (currentTime > endTime) {
      wordEl.children[0].style.width = "100%";
    }
  });
}

// web component, custom element, shadow dom
