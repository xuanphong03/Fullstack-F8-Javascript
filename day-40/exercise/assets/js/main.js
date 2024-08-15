import { handleCreateTagName, handleCreateHashTag } from "./utils.js";

const apiUrl = "https://5lppk6-8080.csb.app/blogs";
const params = {
  _limit: 5,
  _page: 1,
};
let postsList = [];
let isGotAllBlogs = false;
let isFetching = false;
const loadingEl = document.querySelector(".loading");

const handleGetAllBlogs = async (params) => {
  try {
    isFetching = true;
    loadingEl.classList.add("show");

    const queryParams = new URLSearchParams({ ...params }).toString();
    const response = await fetch(`${apiUrl}?${queryParams}`);
    if (!response.ok) {
      throw new Error("Fetch to failed!");
    }

    const totalBlogs = response.headers.get("x-total-count");
    const blogs = await response.json();
    postsList = [...postsList, ...blogs];
    renderBlogs(postsList);
    if (postsList.length >= totalBlogs) {
      isGotAllBlogs = true;
    }
  } catch (error) {
    throw new Error("Có lỗi get all blogs");
  } finally {
    loadingEl.classList.remove("show");
    isFetching = false;
  }
};

const renderBlogs = (blogs) => {
  const blogsListEl = document.querySelector(".blogs-list");
  blogsListEl.innerHTML = blogs
    .map(({ id, username, title, content }) => {
      const tagName = handleCreateTagName(username);
      const hashTag = handleCreateHashTag(username);

      return `
            <article data-id='${id}' class="blog-item">
                <div class="blog-time-up">
                <p class="time-up">Một giờ trước</p>
                <div class="time-detail">
                    <div class="hours">6 giờ chiều</div>
                    <div class="minutes">50 phút</div>
                </div>
                </div>
                <div class="blog-inner">
                <p class="tag-name">@${tagName}</p>
                <div class="blog-header">
                    <div class="blog-avatar">P</div>
                    <h3 class="blog-username">${username}</h3>
                </div>
                <div class="blog-body">
                    <h4 class="blog-title">${title}</h4>
                    <p class="blog-content">
                    ${content}
                    </p>
                </div>
                <div class="blog-footer">
                    <a href="#" class="view-more-btn"># View more lorem...</a>
                    <a href="#" class="hash-tag"># ${hashTag}</a>
                </div>
                </div>
            </article>
        `;
    })
    .join("");
};

const handleOnScroll = () => {
  window.addEventListener("scroll", (e) => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight * 0.95 &&
      !isFetching &&
      !isGotAllBlogs
    ) {
      params._page = params._page + 1;
      handleGetAllBlogs(params);
    }
  });
};

handleGetAllBlogs(params);
handleOnScroll();
