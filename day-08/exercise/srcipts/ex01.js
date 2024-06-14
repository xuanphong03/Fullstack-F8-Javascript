var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};

function getError(field) {
  if (typeof field !== "string") {
    return;
  }
  var nestedList = field.split(".");
  var errorMessage = { ...errors };
  for (var nested of nestedList) {
    errorMessage = errorMessage[nested];
  }
  if (errorMessage) {
    return typeof errorMessage === "object"
      ? errorMessage.required
      : errorMessage;
  } else {
    return "Vui lòng kiểm tra lại input";
  }
}

// console.log(getError("name")); //Vui lòng nhập họ tên
// console.log(getError("name.min")); //Họ tên phải từ 5 ký tự

// console.log(getError("email")); //Vui lòng nhập địa chỉ email
// console.log(getError("email.unique")); //Email đã có người sử dụng
let ex01_input = document.querySelector(".ex01_input");
let ex01_output = document.querySelector(".ex01_output");
ex01_input.innerHTML = `Input: getError('name')`;
ex01_output.innerHTML = `Output: ${getError("name")}`;
