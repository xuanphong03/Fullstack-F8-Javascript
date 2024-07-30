// // Event: Không có option detail
// // CustomEvent: Có option detail (Không sửa được: readOnly)
// var rangeEl = document.querySelector("input");
// var finishEvent = new Event("finish", {});
// finishEvent.detail = "Kết thúc";

// rangeEl.addEventListener("input", function (e) {
//   //   console.log("input");
//   var value = this.value;
//   if (+value === 100) {
//     this.dispatchEvent(finishEvent);
//   }
// });

// /**
//  * Các bước tạo Event
//  * - Xác định logic của Event
//  * - Xác định element lắng nghe Event đó
//  * - Xác định tên Event và tạo Object event tương ứng
//  * - Xử lý logic và Dispatch
//  */

// rangeEl.addEventListener("finish", function (e) {
//   //   console.log("Hoàn thành");
//   console.log(e);
// });
