import {
  requestLogin,
  requestProfile,
  requestRefreshToken,
} from "./userApi.js";

/**
 * Trong 1 trang, bất kỳ request nào cần authorize cần phải thực hiện các bước sau:
 * - Lấy API ở localStorage hoặc cookie
 * - Gọi API cần lấy dữ liệu hoặc các thao tác khác
 *  + Nếu thành công => trả về dữ liệu tương ứng từ API
 *  + Nếu thất bại => gọi API refresh token
 *  ++ Thành công: Update token mới vào localStorage => Gọi lại API đã bị failed ở bước trên
 *  ++ Thất bại: Đăng xuất
 *
 *  Request 1: Success
 *  Request 2: Fail => Refresh token => Request 2
 *  Request 3: Fail => Refresh token => Request 3
 *  Request 4: Fail => Refresh token => Request 4
 *
 * Xử lý đăng xuất:
 * - Call API đăng xuất do Backend cung cấp ==> Lưu token vào blacklist ở phía backend tránh token bị lộ
 * - Xóa token ở Storage
 */

const root = document.querySelector(".root");
const modalLoading = document.querySelector(".modal-loading");

const handleLogOut = (e) => {
  e.preventDefault();
  localStorage.removeItem("user_token");
  render();
};

// Thông báo lỗi
const render = async () => {
  if (localStorage.getItem("user_token")) {
    root.innerHTML = `
      <div class="profile">
        <h2>Chào mừng bạn đã quay trở lại với F8</h2>
        <ul class="list-unstyled d-flex gap-2">
          <li>Chào bạn: <span class='name'>Loading...</span></li>
          <li><a href="#" class='logout-btn'>Đăng xuất</a></li>
        </ul>
      </div>
    `;
    const getProfile = async () => {
      try {
        const { access_token: accessToken, refresh_token: refreshToken } =
          JSON.parse(localStorage.getItem("user_token"));
        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken);

        const profile = await requestProfile(accessToken);
        if (!profile) {
          // throw new Error("Unauthorize");
          // Xử lý gọi refresh token
          const newToken = await requestRefreshToken(refreshToken);
          console.log(newToken);
          if (!newToken) {
            throw new Error("Unauthorize");
            // Đăng xuất
          }
          // Lưu vào localStorage
          localStorage.setItem("user_token", JSON.stringify(newToken));
          getProfile();
          // Gọi lại requestProfile
        } else {
          const nameEl = document.querySelector(".name");
          nameEl.innerText = profile.name;
        }
      } catch (error) {
        localStorage.removeItem("user_token");
        render();
      }
    };
    getProfile();
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogOut);
    }
    return;
  }
  root.innerHTML = `
        <h2 class="text-center">Đăng nhập</h2>
        <form action="" class="login">
            <div class='msg'></div>
            <div class="mb-3">
            <label for="">Email</label>
            <input
                type="email"
                name="email"
                class="form-control"
                placeholder="Email"
            />
            </div>
            <div class="mb-3">
            <label for="">Mật khẩu</label>
            <input
                type="password"
                name="password"
                class="form-control"
                placeholder="Password"
            />
            </div>
            <div class="d-grid">
            <button class="btn btn-primary">Đăng nhập</button>
            </div>
        </form>
    `;
};

const handleLoading = (loading = false) => {
  if (loading) {
    modalLoading.classList.replace("invisible", "visible");
    modalLoading.classList.replace("opacity-0", "opacity-100");
  } else {
    modalLoading.classList.replace("visible", "invisible");
    modalLoading.classList.replace("opacity-100", "opacity-0");
  }
};

const handleLoginForm = () => {
  root.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("login")) {
      const messageEl = document.querySelector(".msg");
      messageEl.innerText = "";
      const dataLogin = Object.fromEntries(new FormData(e.target));
      handleLoading(true);
      const response = await requestLogin(dataLogin);
      handleLoading(false);
      console.log(response);

      if (!response) {
        messageEl.innerHTML = `
            <div class='alert alert-danger text-center'>Email hoặc mật khẩu không chính xác</div>
        `;
      } else {
        // Thành công => Lưu token vào bộ nhớ trình duyệt (Các bộ nhớ trình duyệt chỉ nhận text => Chuyển về JSON)
        localStorage.setItem("user_token", JSON.stringify(response));
        render();
        e.target.reset();
      }
    }
  });
};

render();
handleLoginForm();
