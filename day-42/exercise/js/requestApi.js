import { SERVER_API } from "./config.js";

export const requestLogin = async (data) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestRegister = async (data) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    // return false;
    return false;
  }
};

export const requestProfile = async (accessToken) => {
  try {
    const response = await fetch(`${SERVER_API}/users/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(">>> Unauthorize: requestProfile");
    }
    return response.json();
  } catch (error) {
    return false;
  }
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

export const requestLogout = async (accessToken) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(">>> requestLogout");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestGetBlogs = async (params) => {
  const queryParams = new URLSearchParams({ ...params }).toString();
  try {
    const response = await fetch(`${SERVER_API}/blogs?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(">>> Error: Request Get Blogs");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestGetBlogDetail = async (id) => {
  try {
    const response = await fetch(`${SERVER_API}/blogs/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(">>> Error: Request Get Blog Detail");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};

export const requestCreateBlog = async (accessToken, blogData) => {
  console.log(JSON.stringify(blogData));
  console.log(accessToken);

  try {
    const response = await fetch(`${SERVER_API}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error(">>> Unauthorize: Request profile");
    }
    return response.json();
  } catch (error) {
    return false;
  }
};
