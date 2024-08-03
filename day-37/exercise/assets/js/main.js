const voiceSearchContainer = document.querySelector(".voice-search-container");
const voiceSearchBtn = document.querySelector(".voice-search-btn");
const actionEl = voiceSearchContainer.querySelector(".action");
const resultEl = voiceSearchContainer.querySelector(".result");

const directionKeywords = ["chỉ đường", "chỉ đường tới", "tới", "đường tới"];
const openMusicKeywords = ["bài hát", "mở bài hát", "nghe bài hát"];
const openVideoKeywords = ["video", "mở video", "xem video"];
const openWebsiteKeywords = [
  "google",
  "facebook",
  "youtube",
  "google drive",
  "google maps",
];

const TYPES = {
  DIRECTION: "direction",
  MUSIC: "music",
  VIDEO: "video",
};

const MESSAGES = {
  success: "Đã thực hiện xong",
  error: "Không thực hiện được yêu cầu",
};
let message = MESSAGES.success;

// Tạo một thể hiện mới của SpeechRecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Đặt một số thuộc tính cho việc nhận diện
recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Bắt đầu nhận diện khi button được nhấp vào
voiceSearchBtn.addEventListener("click", function () {
  recognition.start();

  // Message content
  actionEl.innerText = "Hãy nói nội dung bạn muốn";
  actionEl.classList.add("active", "action");
});

// Lấy type và key (ví dụ "Mở bài hát ai chung tình được mãi" => return {type: "music", key:"ai chung tình được mãi"})
const handleGetTypeAndKey = (msg) => {
  for (let i = 0; i < directionKeywords.length; i++) {
    const keyword = directionKeywords[i];
    if (msg.includes(keyword)) {
      const position = msg.indexOf(keyword);
      const _msg = msg.slice(position + keyword.length + 1).trim();
      return {
        type: TYPES.DIRECTION,
        key: _msg,
      };
    }
  }

  for (let i = 0; i < openMusicKeywords.length; i++) {
    const keyword = openMusicKeywords[i];
    if (msg.includes(keyword)) {
      const position = msg.indexOf(keyword);
      const _msg = msg.slice(position + keyword.length + 1).trim();
      return {
        type: TYPES.MUSIC,
        key: _msg,
      };
    }
  }

  for (let i = 0; i < openVideoKeywords.length; i++) {
    const keyword = openVideoKeywords[i];
    if (msg.includes(keyword)) {
      const position = msg.indexOf(keyword);
      const _msg = msg.slice(position + keyword.length + 1).trim();
      return {
        type: TYPES.VIDEO,
        key: _msg,
      };
    }
  }
  return {
    type: null,
    key: null,
  };
};

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  // Lấy chuỗi văn bản đã nhận diện được
  const text = event.results[0][0].transcript.trim().toLowerCase();

  // Message Result
  resultEl.style.display = "block";
  resultEl.classList.add("result");
  resultEl.innerText = `Đang xử lý: ${text}`;

  // Xử lý chuỗi văn bản để biết được người dùng vừa đọc gì
  const { type, key } = handleGetTypeAndKey(text);
  let url = null;

  if (openWebsiteKeywords.includes(text)) {
    if (text === "google drive" || text === "google maps") {
      const _text = text.split(" ");
      url = `https://${_text[0]}.com/${_text[1]}`;
    } else {
      url = `https://${text}.com`;
    }
  } else if (type) {
    switch (type) {
      case TYPES.DIRECTION:
        url = `https://www.google.com/maps/search/${key}`;
        break;
      case TYPES.MUSIC:
        url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${key}`;
        break;
      case TYPES.VIDEO:
        url = `https://www.youtube.com/results?search_query=${key}`;
        break;
    }
  } else {
    message = MESSAGES.error;
  }

  // Dừng nhận diện khi giọng nói kết thúc
  recognition.onspeechend = () => {
    recognition.stop();
    actionEl.classList.remove("active");

    setTimeout(() => {
      resultEl.innerText = message;
      if (message === MESSAGES.success && url) {
        setTimeout(() => {
          window.open(url, "_blank");
        }, 500);
      }
    }, 1000);
  };
};
