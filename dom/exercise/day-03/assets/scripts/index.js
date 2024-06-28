var todoInput = document.querySelector(".todo_input");
var btnCreateTodo = document.querySelector(".btn_submit"); // Nút tạo mới Todo
var todoList = document.querySelector(".todo_list"); // Danh sách chứa các Todo
var todoItem = todoList.querySelectorAll(".todo_item");

var todoId = 0;

var todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
Array.from(todoItem).map((todo) => {
  return todo.querySelector("input").value;
});

(function handleRenderTodoList() {
  todoListData.forEach(function (todoName) {
    todoList.innerHTML += TodoItem(todoName);
  });
  todoList.querySelectorAll(".todo_item").forEach(addEventForTodo);
})();

// Mẫu Todo Item
function TodoItem(todoName) {
  todoId++;
  return `
        <li class="todo_item" data-id="${todoId}">
          <input
            type="text"
            value="${todoName}"
            class="todo_content"
            readonly
            name="todo_content"
            placeholder="Update task"
          />
          <button class="btn_submit">Add Task</button>
          <div class="todo_action">
            <button class="btn_update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn_remove">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>`;
}

// Xử lý sự kiện sửa Todo
function handleUpdateTodo(event, todoId, currentTaskContent) {
  // Nếu nội dung todo bị xóa hết rồi cập nhật
  // thì sẽ set lại cho nội dung todo giá trị ban đầu.
  // Ngược lại, sẽ set giá trị mới
  event.stopPropagation();
  var todoTask = todoList.querySelector(`li[data-id='${todoId}']`);
  var todoTaskContent = todoTask.querySelector("input");
  todoTaskContent.value = currentTaskContent;
}

// Xử lý sự kiện xóa Todo
function handleRemoveTodo(event, todoId) {
  event.stopPropagation();
  var removedTodo = todoList.querySelector(`li[data-id='${todoId}']`);
  // Xóa todo
  removedTodo.style.display = "none";
}

// Xử lý sự kiện thêm mới Todo
function handleAddNewTodo(event) {
  // Chặn sự kiện mặc định
  event.preventDefault();
  // Thêm mới Todo
  var todoName = todoInput.value;
  if (todoName) {
    todoList.innerHTML += TodoItem(todoName);
    // Lưu vào storage
    saveTodoList(todoName, "ADD");
    // Reset giá trị trong ô input
    todoInput.value = "";
  }
  // Get Todo mới nhất được thêm và gán sự cho kiện Todo
  var newTodo =
    todoList.querySelectorAll(".todo_item")[
      todoList.querySelectorAll(".todo_item").length - 1
    ];
  addEventForTodo(newTodo, todoListData.length);
}

// Thêm sự kiện cho tất cả các Todo
function addEventForTodo(todo, index) {
  todo.addEventListener("click", function () {
    var btnUpdate = todo.querySelector(".btn_update");
    var btnRemove = todo.querySelector(".btn_remove");
    var btnSubmit = todo.querySelector(".btn_submit");
    var todoContent = todo.querySelector(".todo_content");
    var todoId = todo.dataset.id;
    var prevTaskContent = todoContent.value;

    btnRemove.addEventListener("click", function (event) {
      handleRemoveTodo(event, todoId);
      saveTodoList(todoContent.value, "REMOVE", index);
    });

    btnUpdate.addEventListener("click", function (event) {
      todo.classList.add("updating");
      todoContent.removeAttribute("readonly");
    });

    if (btnSubmit) {
      btnSubmit.addEventListener("click", function (event) {
        var currentTaskContent = todoContent.value || prevTaskContent;
        todo.classList.remove("updating");
        todoContent.setAttribute("readonly", null);
        handleUpdateTodo(event, todoId, currentTaskContent);

        saveTodoList(currentTaskContent, "UPDATE", index);
      });
    }
  });
}

// Lưu trữ lên local storage
function saveTodoList(todoName, type, index) {
  if (type === "ADD") {
    todoListData.push(todoName);
  } else if (type === "UPDATE") {
    todoListData[index] = todoName;
  } else {
    todoListData = todoListData.filter(function (_todoName, _index) {
      return _todoName !== todoName && _index !== index;
    });
  }
  localStorage.setItem("todoList", JSON.stringify(todoListData));
}

// Thêm mới Todo
btnCreateTodo.addEventListener("click", handleAddNewTodo);
