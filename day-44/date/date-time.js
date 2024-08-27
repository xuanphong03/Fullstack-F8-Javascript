const currentDayEl = document.querySelector(".current-day");
const currentHourEl = document.querySelector(".current-hour");
const currentMinuteEl = document.querySelector(".current-minute");
const currentSecondEl = document.querySelector(".current-second");

const targetDate = new Date("2024-08-31 23:59:59");
const targetTime = targetDate.getTime();

let prevDay = 0;
let prevHour = 0;
let prevMinute = 0;
let prevSecond = 0;

const countdown = () => {
  setInterval(() => {
    const currentTime = new Date().getTime();
    const remainTime = Math.floor((targetTime - currentTime) / 1000);

    const currentDay = Math.floor(remainTime / 86400);
    const currentHour = Math.floor((remainTime % 86400) / 3600);
    const currentMinute = Math.floor(((remainTime % 86400) % 3600) / 60);
    const currentSecond = Math.floor((((remainTime % 86400) % 3600) % 60) % 60);

    if (currentDay !== prevDay) {
      currentDayEl.innerText = currentDay < 10 ? "0" + currentDay : currentDay;
    }
    if (currentHour !== prevHour) {
      currentHourEl.innerText =
        currentHour < 10 ? "0" + currentHour : currentHour;
    }
    if (currentMinute !== prevMinute) {
      currentMinuteEl.innerText =
        currentMinute < 10 ? "0" + currentMinute : currentMinute;
    }
    if (currentSecond !== prevSecond) {
      currentSecondEl.innerText =
        currentSecond < 10 ? "0" + currentSecond : currentSecond;
    }

    prevDay = currentDay;
    prevHour = currentHour;
    prevMinute = currentMinute;
    prevSecond = currentSecond;
  }, 1000);
};

countdown();
