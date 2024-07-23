// HTMLElement.prototype.css = function (css) {
//   Object.assign(this.style, css);
// };

// var title = document.querySelector(".title");

// title.css({
//   color: "red",
//   background: "yellow",
// });

// Web Component: Thành phần trên một trang web
// Tên thẻ phải có ít nhất 2 từ. Nối với nhau bằng dấu gạch ngang
// Bước 1: Khởi tạo class kế thừa từ HTML Element
class HelloWord extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    super();
  }
  // Chạy khi phần tử được thêm vào DOM
  connectedCallback() {
    console.log("connected callback");

    this.innerHTML = `<h1>Hello world<button>Click me</button></h1>`;
    var btn = this.querySelector("button");
    var _this = this;
    btn.addEventListener("click", function () {
      _this.setAttribute("color", "red");
      _this.setAttribute("size", "M");
    });
  }
  // Chạy khi phần tử bị xóa khỏi DOM
  disconnectedCallback() {
    console.log("disconnected callback");
  }
  // Attribute
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallBack", name, oldValue, newValue);
  }
  //   attributeChangedCallback(name, oldValue, newValue) {
  //     console.log(`Attribute ${name} has changed.`);
  //   }
}
// Bước 2: Đăng ký component
customElements.define("hello-world", HelloWord);

var root = document.querySelector("#root");
var btn = document.querySelector(".btn");
var helloWorldEl = document.createElement("hello-world");
var isShow = false;

btn.addEventListener("click", function () {
  if (!isShow) {
    root.append(helloWorldEl);
    isShow = true;
  } else {
    root.remove(helloWorldEl);
    isShow = false;
  }
});
