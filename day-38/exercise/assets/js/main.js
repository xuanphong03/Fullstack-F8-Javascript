const apiUrl = "https://kqzj4c-8080.csb.app/todos";
const searchInputEl = document.querySelector(".search-input");
const unfinishedTodoListEl = document.querySelector(".todo-list--unfinished");
const finishedTodoListEl = document.querySelector(".todo-list--finished");
const openAddFormBtn = document.querySelector(".open-form-add-btn");
const modal = document.querySelector(".modal");
const addTodoForm = modal.querySelector(".add-form");
const cancelBtnList = modal.querySelectorAll(".cancel-btn");
const addTodoInputEl = modal.querySelector(".add-todo-input");
const addBtn = modal.querySelector(".add-btn");
const toggleFinishedTodoList = document.querySelector(
  ".toggle-finished-todo-list"
);
const finishedTodoCount = toggleFinishedTodoList.querySelector(
  ".finished-todo-count"
);
const updateTodoForm = document.querySelector(".update-form");
const updateTodoInputEl = document.querySelector(".update-todo-input");
const updateBtn = document.querySelector(".update-btn");

let todoId = 0;
let isSubmitting = false;

// Func: Render Todo List
const renderTodoList = (todoList, searchTerm = "") => {
  const filteredTodoList = todoList.filter((todo) =>
    todo.title.includes(searchTerm)
  );

  return filteredTodoList
    .map(({ id, title, completed }) => {
      const position = title.indexOf(searchTerm);
      const _title =
        title.slice(0, position) +
        `<span class='marked-text'>${title.slice(
          position,
          position + searchTerm.length
        )}</span>` +
        title.slice(position + searchTerm.length);
      return `
        <li data-id='${id}' class="todo-item ${
        completed ? "todo-item--completed" : ""
      }">
          <h4 class="todo-title">${_title}</h4>
          <div class="actions">
            <button data-id='${id}' class="btn remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button data-id='${id}' class="btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button data-id='${id}' class="btn complete-btn"><i class="fa-solid fa-square-check"></i></button>
          </div>
        </li>
        `;
    })
    .join("");
};

// Func: Close modal
const handleCloseModal = (e) => {
  e.preventDefault();
  modal.style.display = "none";
  addTodoForm.style.display = "none";
  updateTodoForm.style.display = "none";
};
// Func: Open Modal
const handleOpenModal = () => {
  modal.style.display = "block";
};
// Func: Add todo
const handleAddTodo = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (isSubmitting) return; // Nếu đang xử lý, không làm gì thêm
  isSubmitting = true; // Đặt trạng thái là đang xử lý

  const title = addTodoInputEl.value;
  if (title.trim()) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ++todoId,
          title: title,
          completed: false,
        }),
      });
      const data = await response.json();
      renderUI();
      addTodoInputEl.value = "";
      modal.style.display = "none";
      addTodoForm.style.display = "none";
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      isSubmitting = false; // Đặt lại trạng thái sau khi xử lý xong
    }
  } else {
    isSubmitting = false; // Đặt lại trạng thái nếu không có title hợp lệ
  }
};

// Func: Toggle danh sách hoàn thành
const handleToggleFinishedTodoList = () => {
  const iconArrow = document.querySelector(".icon-arrow");

  toggleFinishedTodoList.classList.toggle("show");
  if (toggleFinishedTodoList.classList.contains("show")) {
    finishedTodoListEl.style.opacity = 1;
    finishedTodoListEl.style.visibility = "visible";
    iconArrow.style.rotate = "0deg";
  } else {
    finishedTodoListEl.style.opacity = 0;
    finishedTodoListEl.style.visibility = "hidden";
    iconArrow.style.rotate = "-90deg";
  }
};

// Func: Xử lý chuyển đổi trạng thái completed
const handleToggleCompleteTodo = async (e) => {
  e.preventDefault();
  const todoId = e.target.dataset.id;
  const todoItem = document.querySelector(`li[data-id='${todoId}']`);
  if (todoId !== null && todoItem) {
    const completedStatus = todoItem.classList.contains("todo-item--completed");
    const response = await fetch(`${apiUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completedStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        renderUI();
      });
  }
};

// Func: Xóa todo
const handleRemoveTodo = async (e) => {
  e.preventDefault();
  const todoId = e.target.dataset.id;
  if (todoId !== null) {
    const response = await fetch(`${apiUrl}/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        renderUI();
      });
  }
};

// Func: Cập nhật todo:
const handleUpdateTodo = (e) => {
  e.preventDefault();
  handleOpenModal();
  updateTodoForm.style.display = "flex";
  const todoId = e.target.dataset.id;
  const todoItem = document.querySelector(`li[data-id='${todoId}']`);
  updateTodoInputEl.focus();
  if (todoItem) {
    const title = todoItem.querySelector("h4").innerText;
    updateTodoInputEl.value = title;
    updateTodoForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      e.stopPropagation();
      const title = updateTodoInputEl.value;
      const response = await fetch(`${apiUrl}/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          renderUI();
          modal.style.display = "none";
          updateTodoForm.style.display = "none";
        });
    });
  }
};

// Thêm sự kiện close modal cho cancel btn
cancelBtnList.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", handleCloseModal);
});

// Xử lý render UI
const renderUI = (searchTerm = "") => {
  new Promise((resolve, reject) => {
    const todoList = fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data);

    resolve(todoList);
  }).then((todoList) => {
    const unfinishedTodoList = todoList.filter(
      (todoItem) => !todoItem.completed
    );
    const finishedTodoList = todoList.filter((todoItem) => todoItem.completed);
    unfinishedTodoListEl.innerHTML = renderTodoList(
      unfinishedTodoList,
      searchTerm
    );
    finishedTodoListEl.innerHTML = renderTodoList(finishedTodoList, searchTerm);

    // Update todo ID
    todoId = todoList.length;

    // Update Completed Todo Count
    finishedTodoCount.innerText = finishedTodoList.length;

    // Xử lý cập nhật trạng thái completed
    const completeBtnList = document.querySelectorAll(".complete-btn");
    completeBtnList.forEach((completeBtn) => {
      completeBtn.addEventListener("click", handleToggleCompleteTodo);
    });
    // Xử lý xóa todo
    const removeBtnList = document.querySelectorAll(".remove-btn");
    removeBtnList.forEach((removeBtn) => {
      removeBtn.addEventListener("click", handleRemoveTodo);
    });
    // Xử lý sự kiện cập nhật
    const editBtnList = document.querySelectorAll(".edit-btn");
    editBtnList.forEach((editBtn) => {
      editBtn.addEventListener("click", handleUpdateTodo);
    });
  });
};
renderUI();

// Xử lý thêm Todo
openAddFormBtn.addEventListener("click", function () {
  handleOpenModal();
  addTodoForm.style.display = "flex";
  addTodoInputEl.focus();
});
addTodoForm.addEventListener("submit", handleAddTodo);

// Xử lý search theo từ khóa
searchInputEl.addEventListener("input", function (e) {
  const { value } = e.target;
  renderUI(value);
});

toggleFinishedTodoList.addEventListener("click", handleToggleFinishedTodoList);
