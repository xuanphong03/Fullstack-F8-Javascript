function getError(field) {
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

  var fieldParts = field.split(".");
  var currentIdx = 0;
  var errorMessage;
  while (currentIdx < fieldParts.length) {
    errors = errors[fieldParts[currentIdx]];
    if (currentIdx === fieldParts.length - 1) {
      if (typeof errors === "object") {
        errorMessage = errors.required;
      } else {
        errorMessage = errors;
      }
      break;
    }
    currentIdx++;
  }
  return errorMessage;
}

// var errorMessage1 = getError("name");
// console.log(errorMessage1);

// var errorMessage2 = getError("name.min");
// console.log(errorMessage2);

// var errorMessage3 = getError("email");
// console.log(errorMessage3);

// var errorMessage4 = getError("email.unique");
// console.log(errorMessage4);
