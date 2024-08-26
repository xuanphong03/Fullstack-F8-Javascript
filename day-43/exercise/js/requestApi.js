import { httpClient } from "./httpClient.js";
import { SERVER_API } from "./config.js";

const authClient = httpClient.create({
  baseUrl: SERVER_API,
});

// Interceptor Request
authClient.request(function (config) {
  // Viết logic sửa request tại đây
  // Lấy access token ở local storage và lưu vào headers
  try {
    if (localStorage.getItem("user_token")) {
      const { accessToken } = JSON.parse(localStorage.getItem("user_token"));
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.log(error);
  }
  return config;
});

// Interceptor Response
authClient.response(async function (response) {
  // Nếu status = 401 thì thực hiện refresh token ở trong đây
  try {
    if (
      localStorage.getItem("user_token") &&
      !response.ok &&
      !response.url.includes("auth/refresh-token")
    ) {
      const { refreshToken } = JSON.parse(localStorage.getItem("user_token"));
      const {
        data: { token },
      } = await requestRefreshToken(refreshToken);
      if (token) {
        localStorage.setItem("user_token", JSON.stringify(token));
        return authClient;
      } else {
        throw new Error("Unauthorize");
      }
    }
  } catch (error) {
    alert("Phiên đăng nhập đã hết hạn.");
    localStorage.removeItem("user_token");
    return false;
  }
  return response;
});

export const requestLogin = async (data) => {
  const response = await authClient.post("/auth/login", data);
  if (response.ok) {
    return response.data;
  }
  return {
    status_code: "FAILED",
    error_message: response?.data?.message,
  };
};

export const requestRegister = async (data) => {
  const response = await authClient.post("/auth/register");
  if (response.ok) {
    return response.data;
  }
  return {
    status_code: "FAILED",
    error_message: response?.data?.message,
  };
};

export const requestProfile = async () => {
  const response = await authClient.get("/users/profile");
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestRefreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestLogout = async () => {
  const response = authClient.post("/auth/logout", {});
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestGetBlogs = async (params) => {
  const queryParams = new URLSearchParams({ ...params }).toString();
  const response = await authClient.get(`/blogs?${queryParams}`);
  if (response.ok) {
    return response.data.data;
  }
  return false;
};

export const requestGetBlogDetail = async (id) => {
  const response = await authClient.get(`/blogs/${id}`);
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestCreateBlog = async (newBlog) => {
  const response = await authClient.post("/blogs", newBlog);
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestGetUserBlog = async (userId) => {
  const response = await authClient.get(`/users/${userId}`);
  if (response.ok) {
    return response.data;
  }
  return false;
};
