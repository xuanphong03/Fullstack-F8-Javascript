// Scroll Event: Sự kiện liên quan đến thanh cuộn
// ScrollY: Lấy vị trí thanh cuộn theo trục Y
// ScrollX: Lấy vị trí thanh cuộn theo trục X
/**
 * scroll({
 *  top: value1;
 *  left: value2;
 * })
 * ===> Chuyển vị trí thanh cuộn tới vị trí đã chỉ định
 */
var btn = document.querySelector(".btn");
var prevScrollY = window.scrollY;
window.addEventListener("scroll", function () {
  var currentScrollY = window.scrollY;
  if (currentScrollY > prevScrollY) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
  prevScrollY = currentScrollY;
});

btn.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
