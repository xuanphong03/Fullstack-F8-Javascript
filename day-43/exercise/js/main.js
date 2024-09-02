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
  showToast,
  escapeHTML,
  createHashtag,
  formatDateTime,
  convertDateFormat,
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
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      handleLoading(true);
      const { status_code } = await requestLogout();
      handleLoading(false);
      if (status_code === "SUCCESS") {
        localStorage.removeItem("user_token");
        blogs = [];
        params.page = 1;
        renderHomePage();
      }
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
  if (!blogs.length) {
    blogsListEl.innerText = "Chưa có dữ liệu !";
  } else {
    blogsListEl.innerHTML = blogs
      .map(
        ({
          userId: { _id: _userId, name },
          _id: _blogId,
          title,
          content,
          timeUp,
        }) => {
          const hashtag = createHashtag(name.trim());
          const { date, time } = formatDateTime(timeUp);
          const firstLetterOfName = getFirstLetterOfName(name.trim());
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
          <h4 class='break-words line-clamp-1'>Tiêu đề: ${escapeHTML(
            title
          )}</h4>
          <p class='break-words line-clamp-4'>Nội dung: ${escapeHTML(
            content
          )}</p>
        </div>
        <div>
          <div class='flex flex-wrap gap-2'>
            <a href='./blog-detail/index.html?blog_id=${_blogId}' class='line-clamp-1  cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
              #view more ${escapeHTML(title)}...
            </a>
            <a href='./user-blogs/index.html?user_id=${_userId}' class='line-clamp-1 cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
              ${escapeHTML(hashtag)}
            </a>
          </div>
          <div class='mt-2 text-sm'>
            <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
          </div>
        </div>
      </article>
    `;
        }
      )
      .join("");
  }
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
    <form class='create-blog-form w-[600px] bg-white px-5 py-3 rounded-lg'>
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
      <div  class='flex flex-col gap-1 mb-5'>
        <label for='blog-time-up'>Thời gian đăng bài</label>
        <input type='date' name='blogTimeUp' id='blog-time-up' class="blog-time-up w-full p-2 text-sm rounded outline-none border border-solid resize-none border-black" />
      </div>
      <div class='flex gap-4 justify-end'>
        <button type='button' class='cancel-btn bg-gray-500 px-5 py-1 rounded text-white hover:opacity-70'>Hủy</button>
        <button type='submit' class='bg-green-500 px-5 py-1 rounded text-white hover:opacity-70'>Tạo blog</button>
      </div>
    </form>
  `;
  root.append(createBlogFormContainerEl);
  cancelCreateBlogHandler();
  handleDatePicker();
  createBlogHandler();
};

const handleDatePicker = () => {
  const typeToast = {
    SUCCESS: "success",
    ERROR: "error",
  };

  const datePickerEl = root.querySelector(".blog-time-up");
  if (datePickerEl) {
    // Thiết lập giá trị mặc định
    const today = new Date().toISOString().split("T")[0];
    datePickerEl.value = today;

    datePickerEl.addEventListener("input", (e) => {
      const currentTime = new Date();
      const postedTime = new Date(e.target.value);

      currentTime.setHours(0, 0, 0, 0);
      postedTime.setHours(0, 0, 0, 0);

      if (postedTime.getTime() < currentTime.getTime()) {
        showToast("Vui lòng chọn ngày hợp lệ!", typeToast.ERROR);
      } else if (postedTime.getTime() >= currentTime.getTime()) {
        const now = new Date();
        const message = `Blog sẽ được đăng vào ${now.getHours()} giờ ${now.getMinutes()} ngày ${convertDateFormat(
          postedTime.toLocaleDateString()
        )}`;
        showToast(message, typeToast.SUCCESS);
      }
    });
  }
};

const POSTING_TIME = {
  past: "PAST",
  current: "CURRENT",
  future: "FUTURE",
};

const checkPostingTimeStatus = (postingTime) => {
  const current_time = new Date();
  const posting_time = new Date(postingTime);

  current_time.setHours(0, 0, 0, 0);
  posting_time.setHours(0, 0, 0, 0);

  if (posting_time.getTime() < current_time.getTime()) {
    return POSTING_TIME.past;
  } else if (posting_time.getTime() === current_time.getTime()) {
    return POSTING_TIME.current;
  } else {
    return POSTING_TIME.future;
  }
};

// Func: Tạo blog mới
const createBlogHandler = () => {
  const createBlogFormInnerEl = document.querySelector(".create-blog-form");
  createBlogFormInnerEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const { blogTimeUp, ...formData } = Object.fromEntries(
      new FormData(e.target)
    );
    const postingTimeStatus = blogTimeUp
      ? checkPostingTimeStatus(blogTimeUp)
      : POSTING_TIME.current;

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
            showToast("Đăng tải thành công", "success");
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
      // Nếu người dùng chọn ngày trong quá khứ thì mặc định chuyển về hiện tại
      if (
        postingTimeStatus === POSTING_TIME.past ||
        postingTimeStatus === POSTING_TIME.current
      ) {
        createBlog();
      } else if (postingTimeStatus === POSTING_TIME.future) {
        /// API chưa hỗ trợ
      }
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
          // handleGetBlogsList(params);
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
// handleGetUserBlog();
// handleGetBlogDetail();
handleClickLoginBtn();
handleInfinityScroll();
