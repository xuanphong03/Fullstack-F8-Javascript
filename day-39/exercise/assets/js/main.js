import { useDebounce } from "./hooks.js";

// const apiUrl = "http://localhost:3001";
const apiUrl = "https://5875hv-8080.csb.app";
const uncompletedTodoListEl = document.querySelector(".todo-list--uncompleted");
const completedTodoListEl = document.querySelector(".todo-list--completed");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
const loadingModal = document.querySelector(".loading");
const searchEl = document.querySelector(".search-input");
const completedTodoCounter = document.querySelector(".completed-todo-counter");

let isLoading = false;

const addTodo = async (data) => {
  const response = await fetch(`${apiUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, complete: false }),
  });
  return response.json();
};

const updateTodo = async (id, data) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
  }
};

const toggleTodoStatus = async (id, status) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: !status }),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllTodo = async (searchTerm = "") => {
  try {
    loadingModal.style.opacity = "1";
    loadingModal.style.visibility = "visible";

    const params = new URLSearchParams({
      title_like: searchTerm,
    }).toString();

    const response = await fetch(`${apiUrl}/todos?${params}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Fetch to failed!");
    }
    const todoList = await response.json();
    const uncompletedTodoList = todoList.filter(({ complete }) => !complete);
    const completedTodoList = todoList.filter(({ complete }) => complete);
    completedTodoCounter.innerText = completedTodoList.length;

    uncompletedTodoListEl.innerHTML = handleRenderUI(
      uncompletedTodoList,
      searchTerm
    );
    completedTodoListEl.innerHTML = handleRenderUI(
      completedTodoList,
      searchTerm
    );
    // render(users);
  } catch (error) {
    console.log(error);
  } finally {
    loadingModal.style.opacity = "0";
    loadingModal.style.visibility = "hidden";
  }
};
// Xử lý 2 trường hợp là Add và Update
const handleAddTodo = () => {
  const addBtn = document.querySelector(".add-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  addBtn.addEventListener("click", (e) => {
    modal.style.display = "block";
  });
  cancelBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isLoading) return;

    isLoading = true;
    loadingModal.style.opacity = "1";
    loadingModal.style.visibility = "visible";

    const formData = Object.fromEntries(new FormData(form));
    const { id } = e.target.dataset;
    try {
      if (!id) {
        const status = await addTodo(formData);
        if (status) {
          handleGetAllTodo();
          form.reset();
        }
      } else {
        const status = await updateTodo(id, formData);
        if (status) {
          handleGetAllTodo();
          switchFormAdd();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
      loadingModal.style.opacity = "0";
      loadingModal.style.visibility = "hidden";
      modal.style.display = "none";
    }
  });
};

const handleShowCompletedTodoList = () => {
  const toggleCompletedTodoListBtn = document.querySelector(
    ".toggle-todo-list--completed"
  );
  toggleCompletedTodoListBtn.addEventListener("click", (e) => {
    toggleCompletedTodoListBtn.classList.toggle("show");
    if (toggleCompletedTodoListBtn.classList.contains("show")) {
      completedTodoListEl.style.display = "block";
    } else {
      completedTodoListEl.style.display = "none";
    }
  });
};

const switchFormUpdate = (todo, id) => {
  const { title } = todo;
  form.dataset.id = id;
  form["title"].value = title;
};

const switchFormAdd = () => {
  form.reset();
  delete form.dataset.id;
};

const handleDeleteTodo = () => {
  const todoListEl = document.querySelectorAll(".todo-list");
  todoListEl.forEach((todoList) => {
    todoList.addEventListener("click", async (e) => {
      const { id, action } = e.target.dataset;
      if (action === "delete") {
        const status = await deleteTodo(id);
        if (status) {
          handleGetAllTodo();
        }
      }
    });
  });
};

const handleGetTodo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`);
    if (!response.ok) {
      throw new Error("Fetch to failed");
    }
    return await response.json();
  } catch (error) {
    return false;
  }
};

const handleUpdateTodo = () => {
  const todoListEl = document.querySelectorAll(".todo-list");
  todoListEl.forEach((todoList) => {
    todoList.addEventListener("click", async (e) => {
      const { id, action } = e.target.dataset;
      if (action === "update") {
        modal.style.display = "block";
        const todo = await handleGetTodo(id);
        switchFormUpdate(todo, id);
      }
    });
  });
};

const handleCompleteTodo = () => {
  const todoListEl = document.querySelectorAll(".todo-list");
  todoListEl.forEach((todoList) => {
    todoList.addEventListener("click", async (e) => {
      const { id, action } = e.target.dataset;
      if (action === "toggle-status") {
        const { complete } = await handleGetTodo(id);
        const status = await toggleTodoStatus(id, complete);
        if (status) {
          handleGetAllTodo();
        }
      }
    });
  });
};

const handleRenderUI = (todoList, searchTerm) => {
  return todoList
    .map(({ id, title, complete }) => {
      const position = title.toLowerCase().indexOf(searchTerm.toLowerCase());
      const _title =
        title
          .slice(0, position)
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;") +
        `<span class='search-term'>${title.slice(
          position,
          position + searchTerm.length
        )}</span>` +
        title
          .slice(position + searchTerm.length)
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      return `
        <li class="todo-item ${complete ? "todo-item--completed" : ""}">
            <h3  class="todo-title">${_title}</h3>
            <div class="todo-actions">
                <button data-id='${id}'  data-action='delete' class="delete-btn btn">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button data-id='${id}'  data-action='update' class="update-btn btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button data-id='${id}'  data-action='toggle-status' class="complete-btn btn">
                    <i class="fa-solid fa-square-check"></i>
                </button>
            </div>
        </li>
    `;
    })
    .join("");
};

const handleSearchTodo = () => {
  const debouncedSearch = useDebounce((value) => handleGetAllTodo(value), 300);

  searchEl.addEventListener("input", (e) => {
    const { value } = e.target;
    debouncedSearch(value);
  });
};

handleGetAllTodo();
handleAddTodo();
handleUpdateTodo();
handleDeleteTodo();
handleCompleteTodo();
handleSearchTodo();
handleShowCompletedTodoList();
