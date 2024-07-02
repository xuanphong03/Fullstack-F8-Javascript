var menuList = document.querySelectorAll(".menu > li > a");
var calcHeightSubmenu = function (element) {
  var initialHeight = null;
  var css = {
    position: "absolute",
    top: "-5000px",
    left: "-5000px",
    display: "initial",
    height: "auto",
  };
  Object.assign(element.style, css);
  initialHeight = element.clientHeight;
  var css = {
    position: null,
    top: null,
    left: null,
    display: null,
    height: null,
  };
  Object.assign(element.style, css);
  return initialHeight;
};
var menuActive = null;
menuList.forEach(function (menuItem) {
  if (menuItem.nextElementSibling) {
    menuItem.classList.add("has-children");
  }

  menuItem.addEventListener("click", function (e) {
    e.preventDefault();
    var submenu = this.nextElementSibling;
    if (submenu) {
      var initialHeight = calcHeightSubmenu(submenu);
      submenu.classList.toggle("menu-active");
      if (submenu.classList.contains("menu-active")) {
        submenu.style.height = `${initialHeight}px`;
      } else {
        submenu.style.height = "0px";
      }
      if (menuActive && menuActive !== submenu) {
        menuActive.classList.remove("menu-active");
        menuActive.previousElementSibling.classList.remove("active");
      }
      menuActive = submenu;
      this.classList.toggle("active");
    }
  });
});
