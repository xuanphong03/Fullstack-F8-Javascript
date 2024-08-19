const ANSWER_TIME = 10;
const MAXIMUM_SCORE_EACH_QUESTIONS = 1000;
const BONUS_SCORE_FOR_STREAK = 300;
const WAITING_TIME_BEFORE_START = 4;
const API_ROOT = " http://localhost:3000";

let CURRENT_QUIZ_INDEX = 0;
let isCountdownPaused = false;
let hasAnswered = false;
let currentQuiz = null;
let QUIZ_LIST = [];
const quizQuestionEl = document.querySelector(".quiz-question");
const quizAnswerItemsListEl = document.querySelectorAll(".quiz-answer-item");

// const startBtn = document.querySelector(".start-btn");
// const waitingTimeBeforeStartEl = document.querySelector(
//   ".waiting-time-before-starting"
// );
// const quizInner = document.querySelector(".quiz-inner");

// const waitingTimeBeforeStart = 4;

// const handleStartGame = () => {
//   startBtn.addEventListener("click", (e) => {
//     startBtn.classList.add("hidden");
//     waitingTimeBeforeStartEl.classList.remove("hidden");
//   });
// };

// const handleCountDownWaitingTime = (waitingTime) => {
//   const getRemainingTime = (deadline) => {
//     const currentTime = new Date().getTime();
//     const remainingTime = Math.floor((deadline - currentTime) / 1000);
//     return remainingTime;
//   };
//   startBtn.addEventListener("click", () => {
//     const endTime = Date.now() + waitingTime * 1000;
//     const showTime = () => {
//       const remainingTime = getRemainingTime(endTime);
//       waitingTimeBeforeStartEl.innerText = remainingTime;
//       if (remainingTime > 0) {
//         requestAnimationFrame(showTime);
//       } else {
//         waitingTimeBeforeStartEl.innerText = "GO!";
//         setTimeout(() => {
//           waitingTimeBeforeStartEl.classList.add("hidden");
//           quizInner.classList.remove("hidden");
//         }, 1000);
//       }
//     };
//     requestAnimationFrame(showTime);
//   });
// };

// handleStartGame();
// handleCountDownWaitingTime(waitingTimeBeforeStart);

const resetQuizUI = () => {
  quizAnswerItemsListEl.forEach((answerEl) => {
    answerEl.classList.remove("bg-red-500", "bg-green-500");
    delete answerEl.dataset.correct;
  });
  hasAnswered = false;
  isCountdownPaused = false;
};

const showQuiz = (quizList, currentQuizIndex) => {
  currentQuiz = quizList[currentQuizIndex];
  console.log(currentQuiz);
  const { question, answer } = currentQuiz;
  // Hiển thị câu hỏi
  quizQuestionEl.innerText = question;
  // Hiển thị câu trả lời
  quizAnswerItemsListEl.forEach((answerEl, index) => {
    const { text, correct } = answer[index];
    answerEl.innerText = text;
    answerEl.dataset.correct = correct;
  });
};

const handleChooseAnswer = () => {
  let countAnswer = 0;
  quizAnswerItemsListEl.forEach((answerEl) => {
    answerEl.addEventListener("click", (e) => {
      if (currentQuiz.total_answer === countAnswer && hasAnswered) return;

      const { correct } = e.target.dataset;
      if (correct === "true") {
        answerEl.classList.add("bg-green-500");
      } else {
        answerEl.classList.add("bg-red-500");
      }
      countAnswer++;
      // Hiển thị đáp án
      showCorrectAnswer();
      isCountdownPaused = true;
      if (currentQuiz.total_answer === countAnswer) {
        hasAnswered = true;

        // Chuyển câu hỏi sau 2 giây
        setTimeout(() => {
          resetQuizUI();
          CURRENT_QUIZ_INDEX++;
          if (CURRENT_QUIZ_INDEX < QUIZ_LIST.length) {
            showQuiz(QUIZ_LIST, CURRENT_QUIZ_INDEX);
            handleChooseAnswer();
          } else {
            // Xử lý kết thúc quiz ở đây nếu cần
            alert("Quiz hoàn thành!");
          }
        }, 2000);
      }
    });
  });
};

const showCorrectAnswer = () => {
  quizAnswerItemsListEl.forEach((answerEl) => {
    const isCorrectAnswer = answerEl.dataset.correct === "true";
    if (isCorrectAnswer) {
      answerEl.classList.add("bg-green-500");
    }
  });
};

// const handleGetRemainingTime = (endTime) => {
//   const currentTime = new Date().getTime();
//   const remainingTime = (endTime - currentTime) / 1000;
//   return remainingTime;
// };

// const handleCountDownAnswerTime = (answerTime) => {
//   const remainingTimeAnswerEl = document.querySelector(
//     ".remaining-answer-time"
//   );
//   const endTime = Date.now() + answerTime * 1000;
//   const countDownAnswerTime = () => {
//     if (isCountdownPaused) return;

//     const remainingTime = handleGetRemainingTime(endTime);
//     const progress = (remainingTime / answerTime) * 100;
//     remainingTimeAnswerEl.style.width = `${progress}%`;
//     if (progress > 0) {
//       requestAnimationFrame(countDownAnswerTime);
//     } else {
//       remainingTimeAnswerEl.style.width = "0px";
//       // Đổi câu hỏi
//     }
//   };
//   requestAnimationFrame(countDownAnswerTime);
// };

const handleGetAllQuiz = async (query) => {
  try {
    const queryParams = new URLSearchParams({ ...query }).toString();
    const response = await fetch(`${API_ROOT}/quiz?${queryParams}`);
    if (!response.ok) {
      throw new Error("Get all quiz bị lỗi");
    }
    const quizList = await response.json();
    return quizList;
  } catch {}
};

const handleStartGame = async () => {
  QUIZ_LIST = await handleGetAllQuiz();
  showQuiz(QUIZ_LIST, CURRENT_QUIZ_INDEX);
};

handleStartGame();
handleChooseAnswer();
