import {
  requestLogin,
  requestRegister,
  requestLogout,
  requestProfile,
  requestRefreshToken,
  requestGetBlogs,
  requestCreateBlog,
} from "./requestApi.js";

const root = document.querySelector("#root");
const loadingModalEl = root.querySelector(".modal-loading");
const loginBtn = root.querySelector(".login-btn");
const blogsListEl = root.querySelector(".blogs-list");
const endBlogsListEl = root.querySelector(".end-blogs-list");

let blogs = [];
const params = {
  page: 1,
  limit: 10,
};

const renderLoginForm = () => {
  const loginFormEl = document.createElement("div");
  loginFormEl.classList.add("login-form");
  loginFormEl.innerHTML = `
    <div
        class="form-container flex items-center justify-center fixed inset-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >   
        <button class='back-btn absolute top-2 left-2 text-white px-5 py-2 rounded bg-green-500 hover:opacity-70'>Quay trở lại</button>
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
                    class="login-btn bg-blue-500 text-white px-5 py-2 basis-1/2 rounded hover:opacity-70 transition-colors"
                >
                    Đăng nhập
                </button>
                <button
                    type="button"
                    class="change-form-btn register-btn bg-green-500 text-white px-5 py-2 basis-1/2 rounded hover:opacity-70 transition-colors"
                >
                    Đăng ký
                </button>
                </div>
            </form>
        </div>
      </div> 
    `;
  root.append(loginFormEl);
  handleSubmitForm();
  handleChangeForm();
  handleBackToHomePage();
};

const renderRegisterForm = () => {
  const registerFormEl = document.createElement("div");
  registerFormEl.classList.add("register-form");
  registerFormEl.innerHTML = `
    <div
        class="form-container flex items-center justify-center fixed inset-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >
      <button class='back-btn absolute top-2 left-2 text-white px-5 py-2 rounded bg-green-500 hover:opacity-70'>Quay trở lại</button>
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
              class="register-btn bg-blue-500 text-white px-5 py-2 basis-1/2 rounded hover:opacity-70 transition-colors"
            >
              Đăng ký
            </button>
            <button
              type="button"
              class="change-form-btn login-btn bg-green-500 text-white px-5 py-2 basis-1/2 rounded hover:opacity-70 transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  root.append(registerFormEl);
  handleSubmitForm();
  handleChangeForm();
  handleBackToHomePage();
};

const renderHomePage = () => {
  const welcomeBox = document.querySelector(".welcome-box");
  const nameEl = welcomeBox.querySelector(".name");

  if (localStorage.getItem("user_token")) {
    loginBtn.classList.add("hidden");
    welcomeBox.classList.remove("hidden");

    const getProfile = async () => {
      try {
        const { accessToken, refreshToken } = JSON.parse(
          localStorage.getItem("user_token")
        );
        console.log(">>> Access Token: ", accessToken);
        console.log(">>> Refresh Token: ", refreshToken);

        nameEl.innerText = "Loading...";
        const { data: profile } = await requestProfile(accessToken);
        if (!profile) {
          // throw new Error("Unauthorize");
          // Xử lý gọi refresh token
          // Nếu token hết hạn, kiểm tra xem có đang làm mới không
          const {
            data: { token: newToken },
          } = await requestRefreshToken(refreshToken);
          console.log(">>> New token (get profile): ", newToken);
          if (!newToken) {
            throw new Error("Unauthorize");
          }
          // Lưu vào localStorage
          localStorage.setItem("user_token", JSON.stringify(newToken));
          getProfile(); // Gọi lại requestProfile với token mới
        } else {
          if (nameEl) {
            nameEl.innerText = profile.name;
          }
        }
      } catch (error) {
        alert("Sorry. Phiên đăng nhập đã hết hạn");
        localStorage.removeItem("user_token");
        renderHomePage();
      }
    };
    getProfile();
    handleCreateBlog();
    handleLogoutAccount();
  } else {
    loginBtn.classList.remove("hidden");
    welcomeBox.classList.add("hidden");
  }
  handleGetBlogsList(params);
};

// Xử lý đăng xuất
const handleLogoutAccount = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user_token"));
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      localStorage.removeItem("user_token");
      // Reset blogs and rerender
      blogs = [];
      params.page = 1;
      renderHomePage();
      await requestLogout(accessToken);
    });
  }
};

// Xử lý render danh sách blog
const handleGetBlogsList = async (params) => {
  handleLoading(true);
  const { data: newBlogs } = await requestGetBlogs(params);
  blogs = [...blogs, ...newBlogs];
  renderBlogs(blogs);
  handleLoading(false);
};

// Tạo hash tag cho blog
const createHashtag = (name) => {
  const normalized = name
    .normalize("NFD") // Chuẩn hóa Unicode để tách các dấu khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/đ/g, "d") // Thay thế chữ "đ" thành "d"
    .replace(/Đ/g, "D") // Thay thế chữ "Đ" thành "D"
    .toLowerCase(); // Chuyển thành chữ thường

  // Loại bỏ khoảng trắng giữa các từ và thêm dấu #
  const hashtag = `#${normalized.replace(/\s+/g, "")}`;
  return hashtag;
};

// Chuyển ISO 8601 về ngày giờ cụ thể
const formatDateTime = (isoString) => {
  // Tạo đối tượng Date từ chuỗi ISO 8601
  const date = new Date(isoString);

  // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Ghép các thành phần lại thành chuỗi ngày giờ cụ thể
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    time: formattedTime,
    date: formattedDate,
  };
};

const getFirstLetterOfName = (name) => {
  // Tách chuỗi họ tên thành mảng các từ
  const nameParts = name.trim().split(" ");
  // Lấy phần tử cuối cùng trong mảng (tên)
  const firstName = nameParts[nameParts.length - 1];
  // Lấy chữ cái đầu tiên của tên
  return firstName.charAt(0).toUpperCase();
};

// Xử lý render Blog list
const renderBlogs = (blogs) => {
  console.log(blogs);

  blogsListEl.innerHTML = blogs
    .map((blog) => {
      const {
        userId: { name },
        title,
        content,
        timeUp,
      } = blog;
      const hashtag = createHashtag(name);
      const { date, time } = formatDateTime(timeUp);
      const firstLetterOfName = getFirstLetterOfName(name);
      return `
      <article class='relative flex flex-col gap-2 p-2 border border-solid border-gray rounded'>
        <div class='flex gap-2 items-center'>
          <div class='size-10 rounded-full bg-[#6EEB83] text-xl flex justify-center items-center'>${firstLetterOfName}</div>
          <h3 class='text-xl text-[#6EEB83] font-medium'>${name}</h3>
        </div>
        <h4>Tiêu đề: ${title}</h4>
        <p>Nội dung: ${content}</p>
        <div class='bg-[#6EEB83] w-fit px-2 py-1 text-sm rounded underline'>${hashtag}</div>
        <div class='absolute right-full top-0 px-5'>
          <p>${time}</p>
          <p>${date}</p>
        </div>
      </article>
    `;
    })
    .join("");
};

const handleCreateBlog = () => {
  const createBlogBtn = document.querySelector(".create-blog-btn");

  if (createBlogBtn) {
    createBlogBtn.addEventListener("click", () => {
      const createBlogFormContainerEl = document.createElement("div");
      createBlogFormContainerEl.classList.add(
        "create-blog-form-container",
        "fixed",
        "inset-0",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "bg-[rgba(0,0,0,0.4)]",
        "z-[99999]"
      );
      createBlogFormContainerEl.innerHTML = `
      <form class='create-blog-form-inner w-[600px] bg-white px-5 py-3 rounded'>
        <div class='flex flex-col gap-1 mb-4'>
          <label for='blog-title'>Tên tiêu đề</label>
          <input
            type='text'
            id='blog-title'
            name='title'
            class="w-full p-2 text-sm  rounded outline-none border border-solid border-black"
            placeholder='Nhập tiêu đề của blog'
          />
        </div>
        <div class='flex flex-col gap-1 mb-5'>
          <label for='blog-content'>Nội dung</label>
          <textarea
            type='text'
            id='blog-content'
            name='content'
            rows=10
            class="w-full p-2 text-sm  rounded outline-none border border-solid resize-none border-black"
            placeholder='Nhập nội dung của blog'
          ></textarea>
        </div>
        <div class='flex gap-4 justify-end'>
          <button type='button' class='cancel-btn bg-gray-500 px-5 py-1 rounded text-white hover:opacity-70'>Hủy</button>
          <button type='submit' class='bg-green-500 px-5 py-1 rounded text-white hover:opacity-70'>Tạo blog</button>
        </div>
      </form>
    `;
      root.append(createBlogFormContainerEl);
      handleCreateNewBlog();

      const cancelBtn = createBlogFormContainerEl.querySelector(".cancel-btn");
      cancelBtn.addEventListener("click", () => {
        console.log("Click");

        if (createBlogFormContainerEl) {
          createBlogFormContainerEl.remove();
        }
      });
    });

    const handleCreateNewBlog = () => {
      const createBlogFormInnerEl = document.querySelector(
        ".create-blog-form-inner"
      );
      console.log("Form Inner El: ", createBlogFormInnerEl);

      createBlogFormInnerEl.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(">>> Gán sự kiện submit");

        const formData = Object.fromEntries(new FormData(e.target));
        const hasError = validateForm(e.target);
        if (!hasError) {
          const createBlog = async () => {
            console.log(">>> Create new blog!", formData);

            const createBlogFormContainerEl = document.querySelector(
              ".create-blog-form-container"
            );
            try {
              const { accessToken, refreshToken } = JSON.parse(
                localStorage.getItem("user_token")
              );
              handleLoading(true);
              const { data: newBlog } = await requestCreateBlog(
                accessToken,
                formData
              );
              handleLoading(false);
              // Nếu ko lấy được blog data => refresh token
              if (!newBlog) {
                const {
                  data: { token: newToken },
                } = await requestRefreshToken(refreshToken);
                console.log(">>> New Token (create blog): ", newToken);

                if (!newToken) {
                  throw new Error("Unauthorize");
                }
                // Lưu vào localStorage
                localStorage.setItem("user_token", JSON.stringify(newToken));
                await createBlog(); // Gọi lại requestCreateBlog với token mới
              } else {
                if (createBlogFormContainerEl) {
                  createBlogFormContainerEl.remove();
                }
                blogs.unshift(newBlog);
                renderBlogs(blogs);
              }
            } catch (error) {
              alert("Sorry. Phiên đăng nhập đã hết hạn (handle create blog)");
              localStorage.removeItem("user_token");
              if (createBlogFormContainerEl) {
                createBlogFormContainerEl.remove();
              }
            }
          };
          createBlog();
        }
      });
    };
  }
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

// Xử lý quay lại trang Home
const handleBackToHomePage = () => {
  const currentForm =
    document.querySelector(".login-form") ||
    document.querySelector(".register-form");
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (currentForm) {
        currentForm.remove();
      }
    });
  }
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
          console.log(">>> Response call api: ", response);
          if (response.status_code === "FAILED") {
            notifyEl.classList.remove("hidden");
            notifyEl.innerText = response.message;
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
                // Reset blogs và params về mặc định
                blogs = [];
                params.page = 1;
                renderHomePage();
              }
            } else {
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

// Xử lý validate form
const validateForm = (form) => {
  let error = false;
  const inputElList = form.querySelectorAll("input");
  const textAreaEltList = form.querySelectorAll("textarea");
  inputElList.forEach((inputEl) => {
    const parentInputEl = inputEl.parentElement;
    const messageEl = parentInputEl.querySelector(".msg");
    if (messageEl) {
      messageEl.remove();
    }
    if (!inputEl.value) {
      const messageEl = document.createElement("p");
      const name = inputEl.name;
      messageEl.innerText = `Vui lòng nhập ${name}`;
      messageEl.classList.add("msg", "px-1", "text-sm", "text-red-500");
      parentInputEl.append(messageEl);
      if (!error) {
        error = true;
      }
    }
  });
  textAreaEltList.forEach((textAreaEl) => {
    const parentEl = textAreaEl.parentElement;
    const messageEl = parentEl.querySelector(".msg");
    if (messageEl) {
      messageEl.remove();
    }
    if (!textAreaEl.value) {
      const messageEl = document.createElement("p");
      const name = textAreaEl.name;
      messageEl.innerText = `Vui lòng nhập ${name}`;
      messageEl.classList.add("msg", "px-1", "text-sm", "text-red-500");
      parentEl.append(messageEl);
      if (!error) {
        error = true;
      }
    }
  });
  return error;
};

const handleClickLoginBtn = () => {
  loginBtn.addEventListener("click", () => {
    renderLoginForm();
  });
};

const handleInfinityScroll = () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          params.page++;
          handleGetBlogsList(params);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
  );
  observer.observe(endBlogsListEl);
};

renderHomePage();
handleClickLoginBtn();
handleInfinityScroll();
