/**
 * URL
 * METHOD
 * REQUEST
 * HEADER
 * BODY
 */

/**
 * HTTP REQUEST
 * - body
 * - status
 * - header
 */

/**
 * POST, PUT, PATCH
 * - body
 * - header content-type
 * + application/json
 * + application/x-www-form-urlencoded
 * + multipart/form-data (text, file)
 */
import { useDebounced } from "./hooks.js";
const apiUrl = "http://localhost:3001";
const tbodyTableEl = document.querySelector("tbody");
const paginationViewEl = document.querySelector(".pagination-view");

const actionsBox = document.querySelector(".actions");
const cancelBtn = document.createElement("button");
cancelBtn.type = "button";
cancelBtn.innerText = "Cancel";
cancelBtn.className = "btn btn-danger";

let query = { _sort: "id", _order: "asc", _page: 1, _limit: 5 };

// Xử lý thêm User
const handleGetUser = async (query) => {
  try {
    const queryParams = new URLSearchParams({ ...query }).toString();
    const response = await fetch(`${apiUrl}/users?${queryParams}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Fetch to failed!");
    }
    const users = await response.json();
    const totalPage = Math.ceil(
      response.headers.get("x-total-count") / query._limit
    );
    render(users);
    renderPagination(totalPage);
  } catch (error) {
    console.log(error);
  }
};
// Render UI
const render = (users) => {
  tbodyTableEl.innerHTML = users
    .map(
      ({ id, name, email, status }, index) =>
        `
        <tr data-id='${id}'>
            <td>${index + 1}</td>
            <td>${name.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</td>
            <td>${email.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</td>
            <td><span class="badge bg-${
              status === "active" ? "success" : "danger"
            }">
            ${status === "active" ? "Kích hoạt" : "Chưa kích hoạt"}</span></td>
            <td><button data-action='update' data-id='${id}' class="btn btn-warning btn-sm update-btn">Sửa</button></td>
            <td><button data-action='remove' data-id='${id}' class="btn btn-danger btn-sm remove-btn">Xóa</button></td>
        </tr>
        `
    )
    .join("");
};
// Call API ad user
const addUser = async (data) => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
// Call API update user
const updateUser = async (id, data) => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
// Call API xóa user
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    throw new Error(error);
  }
};
// Call API get User
const getUser = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`);
    if (!response.ok) {
      throw new Error("Fetch to failed");
    }
    return await response.json();
  } catch (error) {
    return false;
  }
};
// Xử lý thêm User
const handleAddUser = () => {
  const form = document.querySelector(".update-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const { id } = e.target.dataset;
    if (!id) {
      const status = await addUser(formData);
      if (status) {
        handleGetUser();
        form.reset();
      }
    } else {
      const status = await updateUser(id, formData);
      if (status) {
        handleGetUser();
        switchFormAdd();
      }
    }
  });
};
// Xử lý cập nhật User
const handleUpdateUser = () => {
  const tbody = document.querySelector("tbody");
  tbody.addEventListener("click", async (e) => {
    const { action, id } = e.target.dataset;
    if (action === "update") {
      const user = await getUser(id);
      if (!user) {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        return;
      }
      changeFormUpdate(user);
    }
  });
};
// Chuyển về form thêm User
const switchFormAdd = () => {
  const form = document.querySelector(".update-form");
  const h3 = form.querySelector("h3");
  h3.innerText = "Thêm người dùng";
  form.reset();
  delete form.dataset.id;
  cancelBtn.remove();
};
// Chuyển sang form Update
const changeFormUpdate = (user) => {
  const { id, name, email, status } = user;
  const form = document.querySelector(".update-form");
  form.dataset.id = id;
  const h3 = form.querySelector("h3");
  h3.innerText = "Cập nhật người dùng";
  form["name"].value = name;
  form["email"].value = email;
  form["status"].value = status;
  actionsBox.append(cancelBtn);
};
// Xử lý hủy form Update
const handleCancelUpdateForm = () => {
  cancelBtn.addEventListener("click", () => {
    switchFormAdd();
  });
};
// Xử lý xóa User
const handleDeleteUser = () => {
  const tbody = document.querySelector("tbody");
  tbody.addEventListener("click", async (e) => {
    const { action, id } = e.target.dataset;
    if (action === "remove") {
      const user = await getUser(id);
      if (!user) {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        return;
      }
      if (confirm("Bạn có chắc chắn muốn xóa?")) {
        const status = await deleteUser(id);
        if (status) {
          handleGetUser();
        }
      }
    }
  });
};

// Xử lý tìm kiếm
const handleSearchUser = () => {
  const searchEl = document.querySelector(".keyword");
  const debounced = useDebounced((value) => {
    query = { ...query, q: value };
    handleGetUser(query);
  });
  searchEl.addEventListener("input", (e) => {
    const { value } = e.target;
    debounced(value);
  });
};

// Xử lý sắp xếp
const handleSortUser = () => {
  const sortBtnList = document.querySelectorAll(".btn-sort");
  const allowed = ["asc", "desc"];
  sortBtnList.forEach((sortBtn) => {
    sortBtn.addEventListener("click", (e) => {
      const { sort } = e.target.dataset;
      if (sort && allowed.includes(sort)) {
        query = { ...query, _order: sort };
        handleGetUser(query);
        const activeBtn = document.querySelector(".active");
        if (activeBtn) {
          activeBtn.classList.remove("active");
        }
        sortBtn.classList.add("active");
      }
    });
  });
};
// Xử lý phân trang
const handleNavigatePagination = async () => {
  paginationViewEl.addEventListener("click", (e) => {
    e.preventDefault();
    const { page } = e.target.dataset;
    if (page) {
      query._page = +page;
      handleGetUser(query);

      //Thay đổi giao diện
      const activePage = document.querySelector(".page-item.active");
      if (activePage) {
        activePage.classList.remove("active");
      }
      //   const currentPage = document.querySelector(
      //     `.page-item a[data-page='${page}']`
      //   );

      //   if (currentPage) {
      //     currentPage.parentElement.classList.add("active");
      //   }
    }
  });
};

const renderPagination = (total_page) => {
  paginationViewEl.innerHTML = `
    <ul class="pagination">
        ${
          query._page > 1 ? (
            <li data-type="prev" class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                &laquo;
              </a>
            </li>
          ) : (
            ""
          )
        }
        ${[...Array(total_page)]
          .map((_, index) => {
            const page = index + 1;
            return `<li  class="page-item ${
              page === 1 ? "active" : ""
            }"><a data-page='${page}' class="page-link" href="#">${page}</a></li>`;
          })
          .join("")}
        <li data-type='next' class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                &raquo;
            </a>
        </li>
    </ul>
  `;
};

handleGetUser(query);
handleAddUser();
handleUpdateUser();
handleCancelUpdateForm();
handleDeleteUser();
handleSearchUser();
handleSortUser();
handleNavigatePagination();
