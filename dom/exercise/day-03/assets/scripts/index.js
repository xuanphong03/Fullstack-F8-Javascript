var todoInput = document.querySelector(".todo_input");
var createBtn = document.querySelector(".btn_createTodo"); // Nút tạo mới Todo
var todoList = document.querySelector(".todo_list"); // Danh sách chứa các Todo
var message = document.querySelector(".message");

var id = 0;

// Mẫu Todo Item
function TodoItem(todoTaskName, todoId) {
  return `
        <li class="todo_item" data-id="${todoId}">
          <input
            type="text"
            value="${todoTaskName}"
            class="todo_content"
            readonly
            name="todo_content"
            placeholder="Update task"
          />
          <button data-id="${todoId}" class="btn_completedUpdate">Add Task</button>
          <div class="todo_action">
            <button data-id="${todoId}" class="btn_update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button data-id="${todoId}" class="btn_remove">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>`;
}

// Kiểm tra content ô input
todoInput.addEventListener("input", function (event) {
  var todoTaskName = event.target.value;
  if (todoTaskName.trim()) {
    message.style.display = "none";
  }
});

// Xử lý sự kiện thêm
createBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var todoTaskName = todoInput.value;
  if (!todoTaskName.trim()) {
    message.style.display = "block";
  } else {
    todoList.innerHTML += TodoItem(todoTaskName, ++id);
    todoInput.value = "";
    handleRemoveTodo();
    handleUpdateTodo();
    handleCompleteUpdate();
  }
});

// Xử lý sự kiện xóa
function handleRemoveTodo() {
  var removeBtnList = todoList.querySelectorAll(".btn_remove");
  removeBtnList.forEach(function (removeBtn) {
    var { id } = removeBtn.dataset;
    removeBtn.addEventListener("click", function () {
      var removedTodo = todoList.querySelector(`li[data-id="${id}"]`);
      removedTodo.style.display = "none";
    });
  });
}

// Xử lý sự kiện update
function handleUpdateTodo() {
  var updateBtnList = todoList.querySelectorAll(".btn_update");

  updateBtnList.forEach(function (updateBtn) {
    var { id } = updateBtn.dataset;
    updateBtn.addEventListener("click", function () {
      var updatedTodo = todoList.querySelector(`li[data-id="${id}"]`);
      var todoTaskName = updatedTodo.querySelector(".todo_content");
      updatedTodo.classList.add("updating");
      todoTaskName.removeAttribute("readonly");
    });
  });
}

// Xử lý sự kiện hoàn thành update
function handleCompleteUpdate() {
  var completedUpdateBtnList = todoList.querySelectorAll(
    ".btn_completedUpdate"
  );
  completedUpdateBtnList.forEach(function (completeUpdateBtn) {
    var { id } = completeUpdateBtn.dataset;
    var updatedTodo = todoList.querySelector(`li[data-id="${id}"]`);
    var todoTaskName = updatedTodo.querySelector(".todo_content");
    var prevTodoTaskNameValue = todoTaskName.value;

    completeUpdateBtn.addEventListener("click", function () {
      var updatedTodo = todoList.querySelector(`li[data-id="${id}"]`);
      var curTodoTaskNameValue = todoTaskName.value;
      todoTaskName.value = curTodoTaskNameValue.trim() || prevTodoTaskNameValue;
      updatedTodo.classList.remove("updating");
      todoTaskName.setAttribute("readonly", null);
    });
  });
}
