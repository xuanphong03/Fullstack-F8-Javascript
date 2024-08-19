const API_ROOT = "https://5lppk6-8080.csb.app";

const quizGameContainer = document.querySelector(".quiz-game-container");
const questionEl = document.querySelector(".quiz-question");
const answerElList = document.querySelectorAll(".quiz-answer-item");
const toastEl = document.querySelector(".toast");
const quizScoreEl = document.querySelector(".quiz-score");
const quizStreakEl = document.querySelector(".quiz-streak");
const quizNo = document.querySelector(".quiz-step");
const bonusScoreEl = document.querySelector(".bonus-score");
const remainingAnswerTime = document.querySelector(".remaining-answer-time");
const startGameBtn = document.querySelector(".start-btn");
const waitingTimeBeforeStartGameEl = document.querySelector(
  ".waiting-time-before-starting"
);
// Result
const modalResultQuizGame = document.querySelector(".modal-result");
const resultCorrectRateEl = document.querySelector(".correct-rate");
const resultScoreEl = document.querySelector(".result-score");
const resultStreakEl = document.querySelector(".result-streak");
const resultCorrectEl = document.querySelector(".result-correct");
const resultIncorrectEl = document.querySelector(".result-incorrect");
const playAgainBtn = document.querySelector(".play-again-btn");

// Audio
const audioRightAnswer = document.querySelector(".audio-right-answer");
const audioWrongAnswer = document.querySelector(".audio-wrong-answer");
const audioCountdownBegin = document.querySelector(".audio-count-down-begin");
const audioCountdownTimer = document.querySelector(".audio-count-down-timer");

let score = 0;
let streak = 0;
let countStreak = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

let quizList = [];
let currentQuizIndex = 0;
let hasChooseAnswer = false;
const bonusScore = 100;
const defaultScore = 1000;
const limitTimeAnswerQuestion = 10;
const waitingTimeBeforeStartGame = 3;
const waitingTimeNextQuestion = 2000;

let requestAnimationFrameId;
let isPauseCountdown = false;

const getQuiz = async () => {
  try {
    const response = await fetch(`${API_ROOT}/quiz`);
    if (!response.ok) {
      throw new Error("Lấy dữ liệu Quiz thất bại");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Tăng chuỗi khi trả lời đúng
const increaseStreak = () => {
  // Trả lời đúng 3 câu liên tiếp trở lên thì tăng 1 streak :v
  if (streak === 1) {
    countStreak++;
  }
  streak++;
  quizStreakEl.classList.remove("w-1/3", "w-2/3", "w-full");
  if (streak >= 3) {
    quizStreakEl.classList.add("w-full");
    bonusScoreEl.innerText = "+300";
  } else {
    quizStreakEl.classList.add(`w-${streak}/3`);
    bonusScoreEl.innerText = `+${bonusScore * streak}`;
  }
};

// Xóa chuỗi khi trả lời sai
const clearStreak = () => {
  streak = 0;
  quizStreakEl.classList.remove("w-1/3", "w-2/3", "w-full");
  bonusScoreEl.innerText = "";
};

// Xử lý khi chọn câu trả lời đúng
const handleChooseCorrectAnswer = () => {
  if (audioCountdownTimer.paused) {
    audioRightAnswer.play();
  }
  toastEl.innerText = "Chính xác";
  toastEl.classList.add("bg-green-500");
  score += defaultScore + bonusScore * streak;
  quizScoreEl.innerText = score;
  correctAnswer++;
  increaseStreak();
};

// Xử lý khi chọn câu trả lời sai
const handleChooseIncorrectAnswer = () => {
  if (audioCountdownTimer.paused) {
    audioWrongAnswer.play();
  }
  toastEl.innerText = "Chưa chính xác";
  toastEl.classList.add("bg-red-500");
  incorrectAnswer++;
  clearStreak();
};

// Chuyển sang câu hỏi tiếp theo
const moveOnNextQuiz = () => {
  resetQuiz();

  quizNo.innerText = `${currentQuizIndex + 1}/${quizList.length}`;
  if (currentQuizIndex < quizList.length) {
    showQuiz(quizList[currentQuizIndex]);
  } else {
    alert("Đã trả lời hết");
  }
  toastEl.classList.replace("h-20", "h-0");
  toastEl.classList.remove("bg-red-500", "bg-green-500");
};

const resetAudio = (audioEl) => {
  audioEl.pause();
  audioEl.currentTime = 0;
};

// Hiển thị câu hỏi và câu trả lời
const showQuiz = (quiz) => {
  handleCountdownDoQuiz();
  resetAudio(audioRightAnswer);
  resetAudio(audioWrongAnswer);
  resetAudio(audioCountdownTimer);
  if (audioCountdownTimer.paused) {
    audioCountdownTimer.play();
  }
  const { question, answer, total_answer } = quiz;

  let answerStatus = false;
  const answerList = [];
  hasChooseAnswer = false;
  questionEl.innerText = question;

  const handleAnswerClick = (e) => {
    if (hasChooseAnswer) return; // Ngăn chặn việc chọn lại câu trả lời
    audioCountdownTimer.pause();

    const { answer } = e.target.dataset;
    if (!answerList.includes(answer)) {
      answerList.push(answer);
      e.target.classList.add("bg-blue-500");
      cancelAnimationFrame(requestAnimationFrameId);
    }

    if (answerList.length === total_answer) {
      hasChooseAnswer = true;
      answerStatus = checkAnswerOfUser();
      showCorrectAnswer();
      if (answerStatus) {
        handleChooseCorrectAnswer();
      } else {
        handleChooseIncorrectAnswer();
      }
      toastEl.classList.replace("h-0", "h-20");

      setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < quizList.length) {
          moveOnNextQuiz();
        } else {
          resetAudio(audioCountdownTimer);
          quizGameContainer.classList.add("hidden");
          showResultQuizGame(
            score,
            countStreak,
            correctAnswer,
            incorrectAnswer
          );
        }
      }, waitingTimeNextQuestion);
    }
  };

  answerElList.forEach((answerEl, index) => {
    const { text, correct } = answer[index];
    answerEl.innerText = text;
    answerEl.dataset.answer = text;
    answerEl.dataset.correct = correct;

    // Xóa sự kiện click trước khi gán mới để tránh sự kiện lặp
    answerEl.removeEventListener("click", handleAnswerClick);
    // Gán sự kiện click mới
    answerEl.addEventListener("click", handleAnswerClick);
  });
};

// Xử lý đếm ngược trong khi làm câu hỏi
const handleCountdownDoQuiz = () => {
  let startTime = Date.now();
  let endTime = startTime + limitTimeAnswerQuestion * 1000;
  let stopTime;

  const startCountdown = () => {
    let currentTime = Date.now();
    let remainingTime = Math.max(0, endTime - currentTime);
    const rate = ((remainingTime / limitTimeAnswerQuestion) * 100) / 1000;
    if (rate >= 0 && rate <= 100) {
      remainingAnswerTime.style.width = `${rate}%`;
    }
    if (remainingTime > 0) {
      requestAnimationFrameId = requestAnimationFrame(startCountdown);
    } else {
      currentQuizIndex++;
      if (currentQuizIndex < quizList.length) {
        incorrectAnswer++;
        moveOnNextQuiz();
      } else {
        quizGameContainer.classList.add("hidden");
      }
    }
  };

  const stopCountdown = () => {
    // Đánh dấu mốc thời gian chuyển tab và ngừng đếm ngược
    stopTime = Date.now();
    cancelAnimationFrame(requestAnimationFrameId);
  };

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      stopCountdown();
      if (!audioCountdownTimer.paused) {
        audioCountdownTimer.pause();
      }
    } else {
      // Nếu có Stop time thì mới cập nhật lại end time
      endTime += stopTime ? Date.now() - stopTime : 0;
      startCountdown();
      if (audioCountdownTimer.paused) {
        audioCountdownTimer.play();
      }
    }
  });
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
  }
  startCountdown();
};

// Kiểm tra câu trả lời của người dùng
const checkAnswerOfUser = () => {
  let answerStatus = true;
  answerElList.forEach((answerEl) => {
    const isCorrect = answerEl.dataset.correct === "true";
    if (answerEl.classList.contains("bg-blue-500")) {
      answerEl.classList.remove("bg-blue-500");
      if (isCorrect) {
        answerEl.classList.add("bg-green-500");
      } else {
        answerEl.classList.add("bg-red-500");
        answerStatus = false;
      }
    }
  });
  return answerStatus;
};

// Reset câu hỏi
const resetQuiz = () => {
  answerElList.forEach((answerEl) => {
    answerEl.classList.remove("bg-red-500", "bg-green-500");
    delete answerEl.dataset.correct;
  });
  hasChooseAnswer = false;
};

// Hiển thị câu trả lời đúng
const showCorrectAnswer = () => {
  answerElList.forEach((answerEl) => {
    const isCorrect = answerEl.dataset.correct === "true";
    if (isCorrect) {
      answerEl.classList.add("bg-green-500");
    }
  });
};

// Xử lý đếm ngược trước khi bắt đầu trò chơi
const handleCountDownWaitingTime = async (time) => {
  // Lấy dữ liệu trong thời gian chờ tránh tình trạng loading chưa xong
  quizList = await getQuiz();

  const getRemainingTime = (deadline) => {
    const currentTime = new Date().getTime();
    const remainingTime = Math.floor((deadline - currentTime) / 1000);
    return remainingTime;
  };
  startGameBtn.addEventListener("click", () => {
    audioCountdownBegin.play();
    startGameBtn.classList.add("hidden");
    waitingTimeBeforeStartGameEl.classList.remove("hidden");
    const endTime = Date.now() + time * 1000;
    const showTime = () => {
      const remainingTime = getRemainingTime(endTime);
      waitingTimeBeforeStartGameEl.innerText = remainingTime + 1;
      if (remainingTime >= 0) {
        requestAnimationFrame(showTime);
      } else {
        waitingTimeBeforeStartGameEl.innerText = "GO!";
        setTimeout(() => {
          quizGameContainer.classList.remove("hidden");
          waitingTimeBeforeStartGameEl.classList.add("hidden");
          startQuizGame();
        }, 1000);
      }
    };
    requestAnimationFrame(showTime);
  });
};

// Hiển thị kết quả trò chơi
const showResultQuizGame = (
  score,
  countStreak,
  correctAnswer,
  incorrectAnswer
) => {
  modalResultQuizGame.classList.remove("hidden");
  const rateRightAnswer = Math.floor((correctAnswer / quizList.length) * 100);
  resultCorrectRateEl.innerText = `${rateRightAnswer}%`;
  resultCorrectRateEl.classList.remove("bg-green-500", "bg-red-500");
  if (rateRightAnswer === 0) {
    resultCorrectRateEl.style.width = "100%";
    resultCorrectRateEl.classList.add("bg-red-500");
  } else {
    resultCorrectRateEl.style.width = `${rateRightAnswer}%`;
    resultCorrectRateEl.classList.add("bg-green-500");
  }

  resultScoreEl.innerText = score;
  resultStreakEl.innerText = countStreak;
  resultCorrectEl.innerText = correctAnswer;
  resultIncorrectEl.innerText = incorrectAnswer;

  playAgainBtn.addEventListener("click", () => {
    startGameBtn.classList.remove("hidden");
    modalResultQuizGame.classList.add("hidden");
    startQuizGame();
  });
};

// Bắt đầu trò chơi
const startQuizGame = async () => {
  audioCountdownBegin.pause();
  audioCountdownBegin.currentTime = 0;
  currentQuizIndex = 0;
  score = 0;
  streak = 0;
  countStreak = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  quizScoreEl.innerText = score;
  quizStreakEl.classList.remove("w-1/3", "w-2/3", "w-full");
  quizNo.innerText = `${currentQuizIndex + 1}/${quizList.length}`;
  showQuiz(quizList[currentQuizIndex]);
};

// Xử lý đếm ngược trước khi bắt đầu trò chơi
handleCountDownWaitingTime(waitingTimeBeforeStartGame);
