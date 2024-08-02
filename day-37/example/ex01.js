// Arrow function
// const getMessage = (msg) => {
//   console.log(`Hello ${msg}`);
// };

// getMessage("F8");

// const getTotal = (a, b) => a + b;
// console.log(getTotal(10, 20));

// const getUser = () => ({ email: "xphong.web@gmail.com" });
// console.log(getUser());

// const users = [
//   { id: 1, name: "User 1" },
//   { id: 2, name: "User 2" },
//   { id: 3, name: "User 3" },
// ];

// const getUser = (userId) => users.find(({ id }) => id === userId);
// console.log(getUser(3));

// Từ khóa this ===> Nhận từ khóa this của function cha.
// Không có từ khóa arguments
// Không dùng làm function constructor
// Không có object prototype
// Không có hoisting

// const contentEl = document.querySelector(".content");
// const btnEl = document.querySelector(".btn");

// btnEl.addEventListener("click", function () {
//   const h1 = document.createElement("h1");
//   h1.innerText = "Học JS làm gì";
//   contentEl.append(h1);
//   h1.addEventListener("click", () => {
//     console.log(this);
//   });
// });

// const User = function (email) {
//   this.email = email;
// };
// const user = new User("xphong@gmail.com");
// console.log(user);
