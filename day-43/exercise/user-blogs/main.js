import { requestGetUserBlog } from "../js/requestApi.js";
import {
  handleLoading,
  createHashtag,
  getFirstLetterOfName,
  formatDateTime,
  escapeHTML,
} from "../js/utils.js";

const root = document.querySelector("#root");
const backHomeBtn = root.querySelector(".back-home-btn");
const blogsListEl = root.querySelector(".blogs-list");

const params = {
  _page: 1,
  _limit: 16,
};

const renderUserBlogs = (data) => {
  const { blogs, name } = data;
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
          <h4 class='break-words line-clamp-1'>Tiêu đề: ${escapeHTML(
            title
          )}</h4>
          <p class='break-words line-clamp-4'>Nội dung: ${escapeHTML(
            content
          )}</p>
        </div>
      <div>
        <a href='../blog-detail/index.html?blog_id=${_id}' class='line-clamp-1 cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
        #view more ${escapeHTML(title)}...
      </a>
      <div class='mt-2 text-sm'>
        <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
      </div>
      </div>
    </article>
  `;
    })
    .join("");
};

const handleUserBlogs = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("user_id")) {
    const userId = searchParams.get("user_id");
    if (userId) {
      handleLoading(true);
      const response = await requestGetUserBlog(userId);
      handleLoading(false);

      if (response) {
        renderUserBlogs(response.data);
      } else {
        alert("Đã có lỗi xảy ra");
        redirectHomePage();
      }
    } else {
      redirectHomePage();
    }
  }
};
const redirectHomePage = () => {
  if (backHomeBtn) {
    backHomeBtn.click();
  }
};
handleUserBlogs();
