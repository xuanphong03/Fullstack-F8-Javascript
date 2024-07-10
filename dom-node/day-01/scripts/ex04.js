var root = document.querySelector("#root");
var element = F8.createElement(
  "div",
  {
    className: "container",
    id: "content",
    onClick: function () {
      console.log("Click me");
    },
  },
  "Hello Anh em"
);
F8.render(root, element);
