import { config } from "./config.js";
const { SERVER_API } = config;

export const requestLogin = async (data) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unauthenticated");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestProfile = async (token) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestRefreshToken = async (refreshToken) => {
  try {
    console.log(refreshToken);

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
