// Xử lý nhiều request bị failed cùng lúc
let token = "My token";
let isExpire = false;
let refreshTokenPromise = null;
const refreshToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`New token: ${Math.random()}`);
    }, Math.random() * 1000);
  });
};

const callAPI = (url) => {
  setTimeout(async () => {
    if (url === "/courses") {
      isExpire = true;
    }
    if (isExpire) {
      // Hết hạn => Gọi refresh token
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken();
      }
      const newToken = await refreshTokenPromise;
      token = newToken;
      isExpire = false;
      console.log("New token", newToken);
    } else {
      console.log(`Request URL: ${url}`, `My token: ${token}`);
    }
  }, Math.random() * 1000);
};

callAPI("/profile");
callAPI("/courses");
callAPI("/products");
callAPI("/posts");

// Promise.race([
//   callAPI("/profile"),
//   callAPI("/courses"),
//   callAPI("/products"),
//   callAPI("/posts"),
// ]).then((data) => {
//   console.log(data);

//   console.log(`Request URL: ${data.url}`, `My token: ${data.token}`);
// });

/*
if(something()) {
    something()
}

*/
