// Bước 1: Khởi tạo class kế thừa từ HTML Element
class TodoApp extends HTMLElement {
  static observedAttributes = ["color", "size"];
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }
  connectedCallback() {
    console.log("connected callback");
    this.render();
    this.loadStyle();
    this.addEventChangeTheme();
    this.addEventTodo();
  }
  addEventChangeTheme() {
    var darkThemeBtn = this.shadowRoot.querySelector(".dark-btn");
    var lightThemeBtn = this.shadowRoot.querySelector(".light-btn");
    var todoApp = this.querySelector(".todo-app");
    darkThemeBtn.addEventListener("click", function () {
      todoApp.classList.replace("light-theme", "dark-theme");
    });
    lightThemeBtn.addEventListener("click", function () {
      todoApp.classList.replace("dark-theme", "light-theme");
    });
  }
  addEventTodo() {
    var form = this.shadowRoot.querySelector(".todo-form");

    form.addEventListener("submit", this.handleAddTodo.bind(this));
  }
  handleAddTodo(e) {
    e.preventDefault();
    var inputEl = this.shadowRoot.querySelector(".todo-input");
    var todoList = this.shadowRoot.querySelector(".todo-list");
    var todoName = inputEl.value;
    if (!todoName) {
      alert("vui lòng nhập tên todo");
      return;
    }
    todoList.innerHTML += `<li class='todo-item'>${todoName}</li>`;
    inputEl.value = "";
    inputEl.focus();
  }
  render() {
    this.shadowRoot.innerHTML = `
        <div class='todo-app light-theme'>
            <h1>Todo App</h1>
            <form class='todo-form'>
                <ul class='todo-list'>
                    <li class='todo-item'>Item 1</li>
                    <li class='todo-item'>Item 2</li>
                    <li class='todo-item'>Item 3</li>
                </ul>
                <input type='text' class='todo-input' placeholder='Todo...' />
                <button type='submit' class='create-todo-btn'>Add todo</button>
            </form>
            <button class="light-btn">Light Theme</button>
            <button class="dark-btn">Dark Theme</button>
        </div>
    `;
  }
  loadStyle() {
    var style = document.createElement("style");
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .todo-app {
            border: 1px solid black;
            padding: 20px;
        }
        .todo-app.dark-theme {
            background-color: black;
            color: white;
        }
        .todo-app.light-theme {
            background-color: white;
            color: dark;
        }
    `;
    this.shadowRoot.append(style);
  }
}

// Bước 2: Đăng ký component
customElements.define("todo-app", TodoApp);

// Tạo shadow root
var boxEl = document.querySelector(".box");
var shadowRoot = boxEl.attachShadow({
  mode: "open",
});
shadowRoot.innerHTML = `<h1>Học lập trình không khó</h1>`;

var style = document.createElement("style");
style.textContent = `
    h1 {
    color: red
    }
`;

shadowRoot.append(style);

// Từ boxEl => Thay đổi text của h1
var h1 = boxEl.shadowRoot.querySelector("h1");

// Khi element đã được attachShadow => Không loại
// bỏ shadow, không attach lại được
// var shadowRoot = boxEl.attachShadow({
//   mode: "open",
// });
