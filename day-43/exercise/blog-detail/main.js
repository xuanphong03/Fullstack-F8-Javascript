import { requestGetBlogDetail } from "../js/requestApi.js";
import {
  handleLoading,
  createHashtag,
  getFirstLetterOfName,
  formatDateTime,
  escapeHTML,
  convertBlogContent,
} from "../js/utils.js";
const root = document.querySelector("#root");
const backHomeBtn = root.querySelector(".back-home-btn");
const blogDetailWrapper = root.querySelector(".blog-detail-wrapper");

const renderBlogDetail = (blog) => {
  if (!blogDetailWrapper) return;
  const {
    title,
    content,
    timeUp,
    userId: { _id, name },
  } = blog;
  const hashtag = createHashtag(name);
  const { date, time } = formatDateTime(timeUp);
  const firstLetterOfName = getFirstLetterOfName(name);
  blogDetailWrapper.innerHTML = `
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
          <p class='break-words line-clamp-4'>Nội dung: ${convertBlogContent(
            escapeHTML(content)
          )}</p>
        </div>
        <div>
          <a href='../user_blogs/index.html?user_id=${_id}' class='line-clamp-1 cursor-pointer bg-[#6EEB83] hover:text-[#6EEB83] hover:bg-white border-2 border-solid border-[#6EEB83] transition-all w-fit px-2 py-1 text-sm break-words rounded underline'>
            ${escapeHTML(hashtag)}
          </a>
          <div class='mt-2 text-sm'>
            <p>Đã đăng lúc: ${escapeHTML(time)} ngày ${escapeHTML(date)}</p>
          </div>
        </div>
    </article>
    
  `;
};

const handleBlogDetail = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("blog_id")) {
    const blogId = searchParams.get("blog_id");
    if (blogId) {
      handleLoading(true);
      const response = await requestGetBlogDetail(blogId);
      handleLoading(false);
      if (response) {
        renderBlogDetail(response.data);
      } else {
        alert("Đã có lỗi xảy ra!");
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

handleBlogDetail();
