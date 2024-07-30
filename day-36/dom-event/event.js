// Định nghĩa các event cho các element tương ứng
// Những cái gì ko thể truyền sang nhau thì bắn sự kiện ==> custom event
// Trigger Event: sử dụng các hàm có sẵn như focus, click, submit hoặc tự custom event

var inputRangeList = document.querySelectorAll("input[type='range']");

var finishEvent = new Event("finish");
inputRangeList.forEach(function (inputEl) {
  inputEl.addEventListener("input", function () {
    var value = this.value;
    if (+value === 100) {
      this.dispatchEvent(finishEvent);
    }
  });
});
