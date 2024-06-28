var aEl = document.querySelector("a");
var menu = document.querySelector(".menu");
// aEl.addEventListener("click", function (e) {
//   e.preventDefault();
//   var link = this.href;
//   console.log(link);
// });

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
document.addEventListener("mousedown", function (e) {
  if (e.which === 3) {
    var coordinateX = e.clientX;
    var coordinateY = e.clientY;
    var css = {
      top: coordinateY + "px",
      left: coordinateX + "px",
      display: "block",
    };
    Object.assign(menu.style, css);
  }
});
document.addEventListener("click", function (e) {
  menu.style.display = "none";
});
menu.addEventListener("click", function (e) {
  e.stopPropagation();
  menu.style.background = "red";
  //   if (e.target.contains(menu)) {
  //     var css = {
  //       display: "none",
  //     };
  //     Object.assign(menu.style, css);
  //   } else {
  //     menu.style.background = "red";
  //   }
});
