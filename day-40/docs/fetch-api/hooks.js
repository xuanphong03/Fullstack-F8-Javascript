// delay 1 function, khi chưa đạt đến tgian định nghĩa => Xóa cb trước đấy
export const useDebounced = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
