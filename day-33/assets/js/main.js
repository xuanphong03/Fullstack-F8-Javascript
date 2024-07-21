var itemsListEl = document.querySelector("ul");
var dragglesItemEl = itemsListEl.querySelectorAll("li[draggable='true']");
var isDraggingDown;
var offsetY;
var prevClientY;

dragglesItemEl.forEach(function (item) {
  var numericalOrder = item.querySelector("span");
  numericalOrder.addEventListener("dragover", function (e) {
    e.stopPropagation();
  });
  // Thêm class dragging cho item được drag
  item.addEventListener("dragstart", function (e) {
    item.classList.add("dragging");
    offsetY = e.offsetY;
    prevClientY = e.clientY;
  });
  // Sau khi drag xong xóa class dragging khỏi item
  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
    cancelAnimationFrame(animationFrameId);
    // Sắp xếp lại thứ tự sau khi đã đổi chỗ item
    sortMenu();
  });
  // Xử lý sự kiện drag item
  item.addEventListener("dragover", handleDragItem);
});

function handleDragItem(e) {
  e.preventDefault();
  var currentClientY = e.clientY;
  var draggingItem = document.querySelector(".dragging");

  // Xác định hướng kéo (chỉ khi khoảng cách currentClientY và prevClientY >= 2
  // để tránh khi giữ nguyên chuột mà clientY thay đổi thì sẽ xảy ra hiện tượng
  // giật lag)
  if (prevClientY && Math.abs(currentClientY - prevClientY) >= 2) {
    isDraggingDown = currentClientY > prevClientY;
  }
  prevClientY = currentClientY;

  // Get vật đằng sau vật bị thay đổi vị trí
  var behindSwappedItem = getBehindSwappedItem(
    currentClientY - offsetY,
    isDraggingDown
  );

  // Nếu có item phía sau item được swap thì sẽ chèn vào phía trước đó
  // item đang được drag. Ngược lại (Trường hợp drag xuống cuối),
  // thì sẽ chèn vào cuối danh sách item
  if (behindSwappedItem) {
    itemsListEl.insertBefore(draggingItem, behindSwappedItem);
  } else if (isDraggingDown) {
    itemsListEl.append(draggingItem);
  }
}

// Func: Lấy phần tử đằng sau phần tử được swap
// Nếu kéo lên trên => Lấy phần tử cuối cùng có offsetTop <= vị trí của draggingItem tới top
// Nếu kéo xuống dưới => Lấy phần tử đầu tiên  offsetTop >= vị trí của draggingItem tới top
function getBehindSwappedItem(clientY, isDraggingDown = true) {
  return isDraggingDown
    ? Array.from(dragglesItemEl).find(function (item) {
        return item.offsetTop >= clientY;
      })
    : Array.from(dragglesItemEl).findLast(function (item) {
        return item.offsetTop <= clientY;
      });
}

// Func: Tự động đánh số thứ tự khi sắp xếp lại
function sortMenu() {
  // Cập nhật lại danh sách các phần tử trong lessons list
  var lessonItemsList = document.querySelectorAll(
    ".lesson-item:not(.lesson-item--module)"
  );
  var lessonModulesList = document.querySelectorAll(".lesson-item--module");
  // Tự động đánh số thứ tự khi sắp xếp lại
  lessonItemsList.forEach(function (lessonItem, index) {
    lessonItem.children[0].innerText = `Bài ${index + 1}: `;
  });
  lessonModulesList.forEach(function (moduleItem, index) {
    moduleItem.children[0].innerText = `Module ${index + 1}: `;
  });
}
