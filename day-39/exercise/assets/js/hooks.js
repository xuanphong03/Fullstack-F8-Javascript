export const useDebounce = (func, delay = 300) => {
  let timeoutId;

  return function (...args) {
    // Xóa bộ đếm thời gian trước đó nếu có
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Đặt bộ đếm thời gian mới
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
