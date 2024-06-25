var contentBox = document.querySelector(".content-box");
var content = document.querySelector(".content");
var btnFadeIn = document.querySelector(".btnFadeIn");
var btnFadeOut = document.querySelector(".btnFadeOut");

content.style.transition = "all 0.3s linear";
function fadeInContent() {
  contentBox.style.display = "block";

  var css = {
    opacity: "1",
    visibility: "visible",
  };
  setTimeout(function () {
    Object.assign(content.style, css);
  }, 200);
}

function fadeOutContent() {
  var css = {
    opacity: "0",
    visibility: "hidden",
  };
  Object.assign(content.style, css);
  setTimeout(function () {
    contentBox.style.display = "none";
  }, 400);
}

btnFadeIn.addEventListener("click", fadeInContent);
btnFadeOut.addEventListener("click", fadeOutContent);
