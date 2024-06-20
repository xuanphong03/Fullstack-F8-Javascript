// function User() {
//   this.name = "Hoàng An";
//   this.email = "hoangan.web@gmail.com";
//   this.find = function () {
//     return {
//       name: this.name,
//       email: this.email,
//     };
//   };
// }

// function Authentication() {
//   // Thay đổi this của User thành đối tượng của Authentication (this)
//   User.call(this);

//   this.getProfile = function () {
//     console.log("Profile");
//   };
// }
// var auth = new Authentication();
// console.log(auth.find());

var users = [
  {
    id: 1,
    name: "User 1",
    email: "user1@gmail.com",
    status: true,
    createdAt: "2024-06-18 00:00:00",
    updatedAt: "2024-06-18 00:00:00",
  },
  {
    id: 2,
    name: "User 2",
    email: "user2@gmail.com",
    status: false,
    createdAt: "2024-06-18 00:00:00",
    updatedAt: "2024-06-18 00:00:00",
  },
  {
    id: 3,
    name: "User 3",
    email: "user3@gmail.com",
    status: true,
    createdAt: "2024-06-18 00:00:00",
    updatedAt: "2024-06-18 00:00:00",
  },
];

// Xây dựng tầng Transformer
function BaseTransformer(data) {
  // Code
  //   this.transform = function (callback) {
  //     return data.map((dataItem) => callback(dataItem));
  //   };
  return data.map((dataItem) => this.response(dataItem));
}

function UserTransformer(data) {
  this.response = function (resource) {
    return {
      uid: resource.id,
      full_name: resource.name,
      email: resource.email,
      status: resource.status,
      status_text: resource.status ? "Active" : "Inactive",
      create_at: resource.createdAt,
      update_at: resource.updateAt,
    };
  };
  //   BaseTransformer.call(this, data)
  //   this.getResponse = function () {
  //     return this.transform(this.response);
  //   };
  return BaseTransformer.call(this, data);
}
var output = new UserTransformer(users);
console.log("Output: ", output);

// Toán tử optional changing (?.)
var user = {};
console.log(user?.message);
console.log(user.getName?.());

// Tham chiếu
var objA = {
  name: "Xuân Phong",
  email: "xp@gmail.com",
};

// Clone object
// var objB = Object.assign({}, objA);
// var objB = {...objA}
var objB = JSON.parse(JSON.stringify(objA));
objB.name = "xp1";

console.log(objA);
