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

const apiUrl = "http://localhost:3001";
const tbodyTableEl = document.querySelector("tbody");

const handleGetUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Fetch to failed!");
    }
    const users = await response.json();
    render(users);
  } catch (error) {
    console.log(error);
  }
};

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

const switchFormAdd = () => {
  const form = document.querySelector(".update-form");
  const h3 = form.querySelector("h3");
  h3.innerText = "Thêm người dùng";
  form.reset();
  delete form.dataset.id;
};

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

const changeFormUpdate = (user) => {
  const { id, name, email, status } = user;
  const form = document.querySelector(".update-form");
  form.dataset.id = id;
  const h3 = form.querySelector("h3");
  h3.innerText = "Cập nhật người dùng";
  form["name"].value = name;
  form["email"].value = email;
  form["status"].value = status;
};

handleGetUser();
handleAddUser();
handleUpdateUser();
