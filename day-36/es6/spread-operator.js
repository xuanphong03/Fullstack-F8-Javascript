// Spread Operator
// const course = {
//   courseName: "FullStack",
//   coursePrice: 1000,
// };

// const user = {
//   name: "Xuân Phong",
//   email: "phong@gmail.com",
//   ...course,
// };

// Copy biên user và lưu vào biến mới đồng thời đổi giá trị của key name
// const newUser = {
//   ...user,
//   name: "Xuân Phong F88.com",
// };

// const state = {
//   msg: "Oke chưa?",
//   products: ["Product 1", "Product 2"],
// };

// const newState = {
//   ...state,
//   products: [...state.products, "Product 3"],
// };

// console.log(newState);

// Enhanced Object Literal
const fullName = "Xuân Phong";
const email = "xuanphong@gmail.com";
const age = undefined;

const user = {
  fullName,
  email,
  age,
  getName() {
    return this.fullName;
  },
};
console.log(user);

// Named Arguments
// const something = (a, b = 0, c = false, d = null) => {
//   console.log(`a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
// };
// something();

const something = ({ a, b = 0, c = false, d = null }) => {
  console.log(`a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
};
something({ a: "f8", c: true });

// Common JS, ES6 Module, AMD Module JS
// Arrow Function
// Class
