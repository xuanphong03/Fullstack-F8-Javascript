// Xử lý bất đồng bộ
// 1. callback
// 2. promise
// 3. async await

// const getUser = (cb) => {
//   setTimeout(() => {
//     const users = ["User 1", "User 2", "User 3", "User 4", "User 5"];
//     if (typeof cb === "function") {
//       cb(users);
//     }
//   }, 1000);
// };

// getUser((users) => {
//   console.log(users);
// });

// Promise ===> Xử lý các tác dụng bất đồng bộ theo cách viết chaining
// a.getA().getB().getC()

// Trạng thái promise
// - pending
// - fulfilled
// - rejected

// 2 bước:
// B1: Định nghĩa object promise
// B2: Hiển thị kết quả

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = ["User 1", "User 2", "User 3", "User 4", "User 5"];
      // Nếu xử lý thành công gọi resolve và truyền user để trả về kết quả
      resolve(users);
      // Nếu xử lý thất bại gọi hàm reject để trả về thông báo lỗi
      reject("Lỗi rồi");
    }, 1000);
  });
};

// console.log(getUser());

// getUser()
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("xong");
//   });

// Promise chaining
// getUser()
//   .then((users) => {
//     console.log(users);
//     return "Then 2";
//   })
//   .then((response) => {
//     console.log(response);
//     return "Then 3";
//   })
//   .then((response) => {
//     console.log(response);
//     return "Then 4";
//   });

const getImage = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Demo image");
    }, 1000);
  });
};

const result = getUser()
  .then((user) => {
    console.log(user);
    return getImage();
  })
  .then((response) => {
    console.log(response);
  });
