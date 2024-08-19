const API_ROOT = " http://localhost:3000";

const quizGameContainer = document.querySelector(".quiz-game-container");
const questionEl = document.querySelector(".quiz-question");
const answerElList = document.querySelectorAll(".quiz-answer-item");
const toastEl = document.querySelector(".toast");
const quizScoreEl = document.querySelector(".quiz-score");
const quizStreakEl = document.querySelector(".quiz-streak");
const quizNo = document.querySelector(".quiz-step");
const bonusScoreEl = document.querySelector(".bonus-score");
const remainingAnswerTime = document.querySelector(".remaining-answer-time");

let quizList = [];
let currentQuizIndex = 0;
let countCorrectAnswer = 0;
let hasChooseAnswer = false;
let streak = 0;
let totalScore = 0;
const bonusScore = 100;
const defaultScore = 1000;
const countDownTime = 10;

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

const handleChooseCorrectAnswer = () => {
  toastEl.innerText = "Chính xác";
  toastEl.classList.add("bg-green-500");
  totalScore += defaultScore + bonusScore * streak;
  quizScoreEl.innerText = totalScore;
  countCorrectAnswer++;
  increaseStreak();
};

const handleChooseIncorrectAnswer = () => {
  toastEl.innerText = "Chưa chính xác";
  toastEl.classList.add("bg-red-500");
  clearStreak();
};

const moveOnNextQuiz = () => {
  resetQuiz();
  quizNo.innerText = `${currentQuizIndex + 1}/${quizList.length}`;
  if (currentQuizIndex < quizList.length) {
    showQuiz(quizList[currentQuizIndex]);
  } else {
    alert("Đã trả lời hết");
    console.log(countCorrectAnswer);
  }
  toastEl.classList.replace("h-20", "h-0");
  toastEl.classList.remove("bg-red-500", "bg-green-500");
};

const showQuiz = (quiz) => {
  handleCountdownDoQuiz();
  const { question, answer, total_answer } = quiz;
  // Lưu kết quả câu trả lời (true/false)
  let answerStatus = null;
  // Lưu số câu hỏi đã trả lời
  let countAnswer = 0;
  // Check trạng thái đã chọn câu trả lời
  hasChooseAnswer = false;
  // Hiển thị câu hỏi
  questionEl.innerText = question;
  // Hiển thị câu trả lời
  answerElList.forEach((answerEl, index) => {
    const { text, correct } = answer[index];
    answerEl.innerText = text;
    answerEl.dataset.correct = correct;
    answerEl.addEventListener("click", () => {
      if (hasChooseAnswer) return;
      countAnswer++;
      answerEl.classList.add("bg-blue-500");
      console.log("Cancel", requestAnimationFrameId);

      cancelAnimationFrame(requestAnimationFrameId);
      if (countAnswer === total_answer) {
        hasChooseAnswer = true;
        answerStatus = checkAnswerOfUser();
        showCorrectAnswer();
        if (answerStatus) {
          handleChooseCorrectAnswer();
        } else {
          handleChooseIncorrectAnswer();
        }
        toastEl.classList.replace("h-0", "h-20");
        // Chuyển sang câu hỏi tiếp theo
        currentQuizIndex++;
        setTimeout(() => {
          if (currentQuizIndex < quizList.length) {
            moveOnNextQuiz();
          } else {
            quizGameContainer.classList.add("hidden");
          }
        }, 2000);
      }
    });
  });
};

const handleCountdownDoQuiz = () => {
  let startTime = Date.now();
  let endTime = startTime + countDownTime * 1000;
  let stopTime;

  const startCountdown = () => {
    let currentTime = Date.now();
    let remainingTime = Math.max(0, endTime - currentTime);
    const rate = ((remainingTime / countDownTime) * 100) / 1000;
    remainingAnswerTime.style.width = `${rate}%`;
    if (remainingTime > 0) {
      requestAnimationFrameId = requestAnimationFrame(startCountdown);
    } else {
      currentQuizIndex++;
      if (currentQuizIndex < quizList.length) {
        moveOnNextQuiz();
      } else {
        quizGameContainer.classList.add("hidden");
      }
    }
  };

  const stopCountdown = () => {
    // Đánh dấu mốc tgian chuyển tab và ngừng đếm ngược
    stopTime = Date.now();
    cancelAnimationFrame(requestAnimationFrameId);
  };

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      stopCountdown();
    } else {
      // Nếu có Stop time thì mới cập nhật lại end time
      endTime += stopTime ? Date.now() - stopTime : 0;
      startCountdown();
    }
  });

  cancelAnimationFrame(requestAnimationFrameId);
  startCountdown();
};

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

const resetQuiz = () => {
  answerElList.forEach((answerEl) => {
    answerEl.classList.remove("bg-red-500", "bg-green-500");
    delete answerEl.dataset.correct;
  });
  hasChooseAnswer = false;
};

const showCorrectAnswer = () => {
  answerElList.forEach((answerEl) => {
    const isCorrect = answerEl.dataset.correct === "true";
    if (isCorrect) {
      answerEl.classList.add("bg-green-500");
    }
  });
};

const startQuizGame = async () => {
  quizList = await getQuiz();
  quizNo.innerText = `${currentQuizIndex + 1}/${quizList.length}`;
  showQuiz(quizList[currentQuizIndex]);
};

startQuizGame();
