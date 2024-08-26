import {
  requestLogin,
  requestRegister,
  requestLogout,
  requestProfile,
  requestGetBlogs,
  requestCreateBlog,
  requestGetUserBlog,
  requestGetBlogDetail,
} from "./requestApi.js";
import {
  escapeHTML,
  createHashtag,
  formatDateTime,
  getFirstLetterOfName,
} from "./utils.js";

const root = document.querySelector("#root");
const loadingModalEl = root.querySelector(".modal-loading");
const loginBtn = root.querySelector(".login-btn");
const blogsListEl = root.querySelector(".blogs-list");
const endBlogsListEl = root.querySelector(".end-blogs-list");

let blogs = [];
const params = {
  page: 1,
  limit: 16,
};
const mode = {
  VIEW_ALL: "view_all",
  VIEW_MORE: "view_more",
  VIEW_PROFILE: "view_profile",
};
let current_mode = mode.VIEW_ALL;

const renderLoginForm = () => {
  const loginFormEl = document.createElement("div");
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.remove();
  }
  loginFormEl.classList.add("login-form");
  loginFormEl.innerHTML = `
    <div
        class="form-container flex items-center justify-center fixed inset-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >   
        <button class='back-btn absolute top-2 left-2 text-white px-5 py-2 rounded bg-green-500 hover:opacity-70'>Quay lại trang chủ</button>
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
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.remove();
  }
  registerFormEl.classList.add("register-form");
  registerFormEl.innerHTML = `
    <div
        class="form-container flex items-center justify-center fixed inset-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >
      <button class='back-btn absolute top-2 left-2 text-white px-5 py-2 rounded bg-green-500 hover:opacity-70'>Quay lại trang chủ</button>
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
    nameEl.innerText = "loading...";
    const getProfile = async () => {
      const response = await requestProfile();
      if (response) {
        const { name } = response.data;
        nameEl.innerText = name;
      } else {
        blogs = [];
        params.page = 1;
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
  console.log("Render home page");
  handleGetBlogsList(params);
};

// Xử lý đăng xuất
const handleLogoutAccount = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user_token"));
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await requestLogout(accessToken);
      localStorage.removeItem("user_token");
      blogs = [];
      params.page = 1;
      renderHomePage();
    });
  }
};

// Xử lý render danh sách blog
const handleGetBlogsList = async (params) => {
  handleLoading(true);
  const newBlogs = await requestGetBlogs(params);
  if (newBlogs) {
    console.log("New blog: ", newBlogs);
    blogs = [...blogs, ...newBlogs];
    renderBlogs(blogs);
  }
  handleLoading(false);
};

// Xử lý render Blog list
const renderBlogs = (blogs = []) => {
  console.log("Blogs: ", blogs);

  blogsListEl.innerHTML = blogs
    .map(
      ({
        userId: { _id: _userId, name },
        _id: _blogId,
        title,
        content,
        timeUp,
      }) => {
        const hashtag = createHashtag(name);
        const { date, time } = formatDateTime(timeUp);
        const firstLetterOfName = getFirstLetterOfName(name);
        return `
      <article class='flex flex-col justify-between h-80 p-4 border border-solid border-gray rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 col-span-3'>
        <div class='flex flex-col gap-2'>
          <div class='flex gap-2 items-center'>
          <div class='size-10 rounded-full bg-[#6EEB83] text-xl flex justify-center items-center'>${escapeHTML(
            firstLetterOfName
          )}</div>
            <h3 class='text-xl text-[#6EEB83] font-medium break-words'>${escapeHTML(
              name
            )}</h3>
          </div>
          <h4 class='break-words'>Tiêu đề: ${escapeHTML(title)}</h4>
          <p class='break-words line-clamp-4'>Nội dung: ${escapeHTML(
            content
          )}</p>
        </div>
        <div>
          <button  data-blog-id='${_blogId}' data-type='view-more'  class='cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
            #view more ${escapeHTML(title)}...
          </button>
          <button data-user-id='${_userId}' data-type='view-profile' class='cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
            ${escapeHTML(hashtag)}
          </button>
          <div class='mt-2 text-sm'>
            <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
          </div>
        </div>
      </article>
    `;
      }
    )
    .join("");
};

const renderBlogDetail = (blog) => {
  const {
    title,
    content,
    timeUp,
    userId: { _id, name },
  } = blog;
  const hashtag = createHashtag(name);
  const { date, time } = formatDateTime(timeUp);
  const firstLetterOfName = getFirstLetterOfName(name);
  blogsListEl.innerHTML = `
    <article class='flex flex-col justify-between h-80 p-4 border border-solid border-gray rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 col-span-6'>
      <div class='flex flex-col gap-2'>
          <div class='flex gap-2 items-center'>
          <div class='size-10 rounded-full bg-[#6EEB83] text-xl flex justify-center items-center'>${escapeHTML(
            firstLetterOfName
          )}</div>
            <h3 class='text-xl text-[#6EEB83] font-medium break-words'>${escapeHTML(
              name
            )}</h3>
          </div>
          <h4 class='break-words'>Tiêu đề: ${escapeHTML(title)}</h4>
          <p class='break-words line-clamp-4'>Nội dung: ${escapeHTML(
            content
          )}</p>
        </div>
        <div>
          <button data-user-id='${_id}' data-type='view-profile' class='cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
            ${escapeHTML(hashtag)}
          </button>
          <div class='mt-2 text-sm'>
            <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
          </div>
        </div>
    </article>
    
  `;
  createBackHomeBtn();
};

const createBackHomeBtn = () => {
  const parentNode = blogsListEl.parentNode;
  const backHomeBtnEl = document.createElement("button");
  backHomeBtnEl.classList.add(
    "back-btn",
    "px-5",
    "py-2",
    "rounded",
    "bg-[#6EEB83]",
    "cursor-pointer",
    "hover:opacity-70",
    "transition-all",
    "mb-5"
  );
  backHomeBtnEl.innerText = "Quay lại trang chủ";
  parentNode.insertBefore(backHomeBtnEl, blogsListEl);
};

const renderProfile = (data) => {
  const profileUser = document.createElement("div");
  const parentNode = blogsListEl.parentNode;
  profileUser.classList.add("user-profile");
  profileUser.innerHTML = `
    <p class='mb-5 w-fit rounded  text-white'>Danh sách blogs của người dùng: <span class='text-4xl text-[#6EEB83] uppercase font-medium'>${escapeHTML(
      data.name
    )}</span></p>
  `;
  parentNode.insertBefore(profileUser, blogsListEl);
};

const renderUserBlog = (data) => {
  const { name, blogs } = data;
  const firstLetterOfName = getFirstLetterOfName(name);

  blogsListEl.innerHTML = blogs
    .map(({ _id, title, content, timeUp }) => {
      const { date, time } = formatDateTime(timeUp);
      return `
    <article class='flex flex-col justify-between h-80 p-4 border border-solid border-gray rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 col-span-3'>
      <div class='flex flex-col gap-2'>
          <div class='flex gap-2 items-center'>
          <div class='size-10 rounded-full bg-[#6EEB83] text-xl flex justify-center items-center'>${escapeHTML(
            firstLetterOfName
          )}</div>
            <h3 class='text-xl text-[#6EEB83] font-medium break-words'>${escapeHTML(
              name
            )}</h3>
          </div>
          <h4 class='break-words'>Tiêu đề: ${escapeHTML(title)}</h4>
          <p class='break-words line-clamp-4'>Nội dung: ${escapeHTML(
            content
          )}</p>
        </div>
      <div>
        <button data-blog-id='${_id}'  data-type='view-more'  class='cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
        #view more ${escapeHTML(title)}...
      </button>
      <div class='mt-2 text-sm'>
        <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
      </div>
      </div>
    </article>
  `;
    })
    .join("");

  createBackHomeBtn();
};

const handleGetUserBlog = () => {
  root.addEventListener("click", async (e) => {
    const { userId, type } = e.target.dataset;

    if (userId && type === "view-profile") {
      const backHomeBtnEl = root.querySelector(".back-btn");
      if (backHomeBtnEl) {
        backHomeBtnEl.remove();
      }

      current_mode = mode.VIEW_PROFILE;
      handleLoading(true);
      const response = await requestGetUserBlog(userId);
      handleLoading(false);

      if (response.status_code === "SUCCESS") {
        window.scrollTo({
          top: 0,
          left: 0,
        });
        const userProfileEl = root.querySelector(".user-profile");
        if (userProfileEl) {
          userProfileEl.remove();
        }
        renderUserBlog(response.data);
        renderProfile(response.data);
        handleBackToHomePage();
      } else {
        alert("Đã có lỗi xảy ra!");
      }
    }
  });
};

// Xử lý get blog detail
const handleGetBlogDetail = () => {
  root.addEventListener("click", async (e) => {
    const { blogId, type } = e.target.dataset;
    if (blogId && type === "view-more") {
      const backHomeBtnEl = root.querySelector(".back-btn");
      const userProfileEl = root.querySelector(".user-profile");
      if (backHomeBtnEl) {
        backHomeBtnEl.remove();
      }
      if (userProfileEl) {
        userProfileEl.remove();
      }
      current_mode = mode.VIEW_MORE;
      handleLoading(true);
      const response = await requestGetBlogDetail(blogId);
      handleLoading(false);
      if (response.status_code === "SUCCESS") {
        // Scroll lên đầu trang tránh conflict với handleInfinityScroll
        window.scrollTo({
          top: 0,
          left: 0,
        });
        renderBlogDetail(response.data);
        handleBackToHomePage();
      } else {
        alert("Đã có lỗi xảy ra!");
      }
    }
  });
};

// Xóa form tạo blog
const cancelCreateBlogHandler = () => {
  const createBlogFormContainerEl = root.querySelector(".modal-create-blog");
  const cancelBtn = createBlogFormContainerEl.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", () => {
    console.log("Click");

    if (createBlogFormContainerEl) {
      createBlogFormContainerEl.remove();
    }
  });
};

// Func: Tạo form thêm blog
const createBlogFormHandler = () => {
  const createBlogFormContainerEl = document.createElement("div");

  createBlogFormContainerEl.classList.add(
    "modal-create-blog",
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
    <form class='create-blog-form w-[600px] bg-white px-5 py-3 rounded'>
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
  cancelCreateBlogHandler();
  createBlogHandler();
};

// Func: Tạo blog mới
const createBlogHandler = () => {
  const createBlogFormInnerEl = document.querySelector(".create-blog-form");
  createBlogFormInnerEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const hasError = validateForm(e.target);
    if (!hasError) {
      const createBlog = async () => {
        console.log(">>> Create new blog!", formData);
        const createBlogFormContainerEl =
          document.querySelector(".modal-create-blog");
        try {
          handleLoading(true);
          const { data: newBlog } = await requestCreateBlog(formData);
          console.log("response create blog: ", newBlog);
          handleLoading(false);
          if (newBlog) {
            createBlogFormContainerEl.remove();
            blogs.unshift(newBlog);
            renderBlogs(blogs);
          } else {
            // access token và refresh token đều hết hạn
            blogs = [];
            params.page = 1;
            renderHomePage();
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

// Xử lý tạo blog mới
const handleCreateBlog = () => {
  const createBlogBtn = document.querySelector(".create-blog-btn");
  if (createBlogBtn) {
    createBlogBtn.removeEventListener("click", createBlogFormHandler);
    createBlogBtn.addEventListener("click", createBlogFormHandler);
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
  const backHomePageBtnEl = document.querySelector(".back-btn");
  if (backHomePageBtnEl) {
    backHomePageBtnEl.addEventListener("click", () => {
      const userProfileEl = root.querySelector(".user-profile");
      if (userProfileEl) {
        userProfileEl.remove();
      }
      if (currentForm) {
        currentForm.remove();
      }
      window.scrollTo({
        top: 0,
        left: 0,
      });
      current_mode = mode.VIEW_ALL;
      blogsListEl.innerHTML = "";
      blogs = [];
      params.page = 1;
      backHomePageBtnEl.remove();
      handleGetBlogsList(params);
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
          if (response.status_code === "FAILED") {
            notifyEl.classList.remove("hidden");
            if (loginFormEl) {
              notifyEl.innerText = "Tài khoản hoặc mật khẩu chưa chính xác";
            } else {
              notifyEl.innerText = response.error_message;
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
        if (entry.isIntersecting && current_mode === mode.VIEW_ALL) {
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
handleGetUserBlog();
handleGetBlogDetail();
handleClickLoginBtn();
handleInfinityScroll();
