import { config } from "./config.js";
import { httpClient } from "./http-client.js";
const { SERVER_API } = config;

const authClient = httpClient.create({
  baseUrl: SERVER_API,
});

// Interceptor Request
authClient.request(function (config) {
  // Viết logic sửa request tại đây
  // Lấy access token ở local storage và lưu vào headers
  try {
    if (localStorage.getItem("user_token")) {
      const { access_token: accessToken } = JSON.parse(
        localStorage.getItem("user_token")
      );
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
      const { refresh_token: refreshToken } = JSON.parse(
        localStorage.getItem("user_token")
      );
      console.log(">>> Refresh token: ", refreshToken);
      const newToken = await requestRefreshToken(refreshToken);
      console.log(">>> New token: ", newToken);
      if (newToken) {
        localStorage.setItem("user_token", newToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return response;
});

export const requestLogin = async (data) => {
  const response = await authClient.post("/auth/login", data);
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestProfile = async (token) => {
  const response = await authClient.get("/auth/profile");
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const requestRefreshToken = async (refreshToken) => {
  const response = await authClient.post("/auth/refresh-token", {
    refreshToken,
  });
  if (response.ok) {
    return response.data;
  }
  return false;
};
