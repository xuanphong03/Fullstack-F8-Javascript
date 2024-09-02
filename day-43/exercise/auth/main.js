import { requestLogin, requestRegister } from "../js/requestApi.js";
import { regex } from "../constants/regex.js";
import { showToast } from "../js/utils.js";

const root = document.querySelector("#root");
const backHomeBtn = root.querySelector(".back-home-btn");
const loadingModalEl = root.querySelector(".modal-loading");

const renderLoginForm = () => {
  const loginFormEl = document.createElement("div");
  loginFormEl.classList.add("login-form");
  loginFormEl.innerHTML = `
    <div
        class="form-container flex items-center justify-center fixed inset-0"
    >   
        <div class="bg-white p-5 rounded">
            <h2 class="text-center mb-5 uppercase text-xl font-medium">
                Đăng nhập
            </h2>
            <div
                class="notify hidden bg-red-300 text-white flex justify-center text-center text-sm py-2 items-center  mb-5 rounded"
            >
            </div>
            <form class="flex flex-col justify-center items-center gap-5 w-96">
                <div class="flex flex-col gap-1 w-full">
                <label for="login-email">Nhập email của bạn</label>
                <input
                    id="login-email"
                    type="email"
                    class="w-full px-4 py-1 rounded outline-none border border-solid border-black"
                    name="email"
                    placeholder="Email..."
                />
                </div>
                <div class="flex flex-col gap-1 w-full">
                <label for="login-password">Nhập mật khẩu của bạn</label>
                <input
                    id="login-password"
                    type="password"
                    class="w-full px-4 py-1 rounded outline-none border border-solid border-black"
                    name="password"
                    placeholder="Password..."
                />
                </div>
                <div class="flex justify-between gap-2 w-full pt-2">
                    <button
                        type="submit"
                        class="login-btn w-full bg-blue-500 text-white px-5 py-2 rounded hover:opacity-70 transition-colors"
                    >
                        Đăng nhập
                    </button>
                </div>
                <p>Bạn chưa có tài khoản? <span class='change-form-btn register-btn text-blue-500 underline cursor-pointer'>Đăng ký ngay</span></p>
            </form>
        </div>
      </div> 
    `;
  root.append(loginFormEl);
  handleChangeForm();
  handleSubmitForm();
};

const renderRegisterForm = () => {
  const registerFormEl = document.createElement("div");
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.remove();
  }
  registerFormEl.classList.add("register-form");
  registerFormEl.innerHTML = `
      <div
          class="form-container flex items-center justify-center fixed inset-0"
      >
        <div class="bg-white p-5 rounded">
          <h2 class="text-center mb-5 uppercase text-xl font-medium">
            Đăng ký
          </h2>
          <div
            class="notify hidden bg-red-300 text-white flex justify-center text-center text-sm py-2 items-center  mb-5 rounded"
          >
          </div>
          <form class="flex flex-col justify-center items-center gap-5 w-96">
            <div class="flex flex-col gap-1 w-full">
              <label for="register-name">Nhập tên của bạn</label>
              <input
                id="register-name"
                type="text"
                class="w-full px-4 py-1 rounded outline-none border border-solid border-black"
                name="name"
                placeholder="Họ và tên..."
              />
            </div>
            <div class="flex flex-col gap-1 w-full">
              <label for="register-email">Nhập email của bạn</label>
              <input
                id="register-email"
                type="email"
                class="w-full px-4 py-1 rounded outline-none border border-solid border-black"
                name="email"
                placeholder="Email..."
              />
            </div>
            <div class="flex flex-col gap-1 w-full">
              <label for="register-password">Nhập mật khẩu của bạn</label>
              <input
                id="register-password"
                type="password"
                class="w-full px-4 py-1 rounded outline-none border border-solid border-black"
                name="password"
                placeholder="Password..."
              />
            </div>
            <div class="flex justify-between gap-2 w-full pt-2">
                <button
                    type="submit"
                    class="register-btn w-full bg-blue-500 text-white px-5 py-2 rounded hover:opacity-70 transition-colors"
                >
                    Đăng ký
                </button>
            </div>
            <p>Bạn đã có tài khoản? <span class='change-form-btn login-btn text-blue-500 underline cursor-pointer'>Đăng nhập ngay</span></p>
          </form>
        </div>
      </div>
    `;
  root.append(registerFormEl);
  handleChangeForm();
  handleSubmitForm();
};

// Xử lý sự kiện chuyển đổi giữa form đăng ký và form đăng nhập
const handleChangeForm = () => {
  const changeFormBtn = document.querySelector(".change-form-btn");

  changeFormBtn.addEventListener("click", (e) => {
    const loginFormEl = document.querySelector(".login-form");
    const registerFormEl = document.querySelector(".register-form");
    e.preventDefault();
    if (loginFormEl) {
      // Xóa  login form và hiện register form
      loginFormEl.remove();
      renderRegisterForm();
    } else if (registerFormEl) {
      // Xóa  register form và hiện login form
      registerFormEl.remove();
      renderLoginForm();
    }
  });
};

// Xử lý sự kiện submit form đăng ký hoặc đăng nhập
const handleSubmitForm = () => {
  const loginFormEl = document.querySelector(".login-form form");
  const registerFormEl = document.querySelector(".register-form form");
  const formEl = loginFormEl || registerFormEl;
  const notifyEl = document.querySelector(".notify");

  if (formEl) {
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(formEl));
      console.log(">>> Form Data: ", formData);

      const hasError = validateForm(formEl);
      // Nếu không error mới call api
      if (!hasError) {
        // Call api đăng nhập
        handleLoading(true);
        try {
          const response = loginFormEl
            ? await requestLogin(formData)
            : await requestRegister(formData);
          if (!response) {
            notifyEl.classList.remove("hidden");
            if (loginFormEl) {
              notifyEl.innerText = "Tài khoản hoặc mật khẩu chưa chính xác";
            } else {
              notifyEl.innerText = "Tài khoản đã tồn tại";
            }
          } else {
            // Thành công => Lưu token vào bộ nhớ trình duyệt (Các bộ nhớ trình duyệt chỉ nhận text => Chuyển về JSON)
            if (!notifyEl.classList.contains("hidden")) {
              notifyEl.classList.add("hidden");
            }
            // Nếu đăng nhập form login sẽ lưu token vào local storage. Còn nếu đăng ký tài khoản thì sẽ chuyển về form đăng nhập
            if (loginFormEl) {
              const { accessToken, refreshToken } = response.data;
              localStorage.setItem(
                "user_token",
                JSON.stringify({ accessToken, refreshToken })
              );
              const currentForm =
                document.querySelector(".login-form") ||
                document.querySelector(".register-form");
              if (currentForm) {
                currentForm.remove();
                // Chuyển về trang chủ
                backHomeBtn.click();
              }
            } else {
              showToast("Đăng ký thành công", "success");
              const registerFormEl = document.querySelector(".register-form");
              registerFormEl.remove();
              renderLoginForm();
            }
            formEl.reset();
          }
        } catch (error) {
          console.log("Lỗi phần đăng ký đăng nhập");
        } finally {
          handleLoading(false);
        }
      }
    });
  }
};

// Xử lý validate form
const validateForm = (form) => {
  let error = false;
  const registerForm = root.querySelector(".register-form");
  const inputElList = form.querySelectorAll("input");

  inputElList.forEach((inputEl) => {
    const parentInputEl = inputEl.parentElement;
    const messageEl = parentInputEl.querySelector(".msg");
    const inputName = inputEl.name;
    const inputValue = inputEl.value;

    // Xóa thông báo lỗi nếu có
    if (messageEl) {
      messageEl.remove();
    }

    if (!inputValue) {
      // Tạo thông báo lỗi cho trường trống
      const newMessageEl = document.createElement("p");
      newMessageEl.classList.add("msg", "px-1", "text-sm", "text-red-500");
      newMessageEl.innerText = `Vui lòng nhập ${inputName}`;
      parentInputEl.append(newMessageEl);
      error = true;
    } else if (
      registerForm &&
      inputName === "password" &&
      !regex.password.test(inputValue)
    ) {
      // Kiểm tra điều kiện mật khẩu
      const newMessageEl = document.createElement("p");
      newMessageEl.classList.add("msg", "px-1", "text-sm", "text-red-500");
      newMessageEl.innerText =
        "Mật khẩu phải chứa ít nhất 8 ký tự, có ít nhất 1 số và có ít nhất 1 chữ in hoa";
      parentInputEl.append(newMessageEl);
      error = true;
    }
  });

  return error;
};

// Xử lý sự kiện loading khi đang chờ call api
const handleLoading = (isLoading = false) => {
  if (isLoading) {
    loadingModalEl.classList.replace("invisible", "visible");
    loadingModalEl.classList.replace("opacity-0", "opacity-100");
  } else {
    loadingModalEl.classList.replace("visible", "invisible");
    loadingModalEl.classList.replace("opacity-100", "opacity-0");
  }
};

const redirectHomePage = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user_token"));
  console.log(accessToken);

  if (accessToken) {
    backHomeBtn.click();
  }
};
renderLoginForm();
redirectHomePage();
