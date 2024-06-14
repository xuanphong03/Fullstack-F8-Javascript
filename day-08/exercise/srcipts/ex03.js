function createUser(name, password, email) {
  return {
    name,
    password,
    email,
    role: "user",
  };
}

function handleRegister(name, password, email) {
  if (!!handleValidate(name, password, email)) {
    return handleValidate(name, password, email);
  }
  if (!!checkExistedAccount(email)) {
    return checkExistedAccount(email);
  }
  const newUser = createUser(name, password, email);
  data.push(newUser);
  return data;
}

function handleValidate(name, password, email) {
  if (!name) {
    return "Vui lòng nhập tên";
  }
  if (!password) {
    return "Vui lòng nhập mật khẩu";
  }
  if (!email) {
    return "Vui lòng nhập email";
  }
  return;
}

function checkExistedAccount(email) {
  const user = data.find(function (user) {
    return user.email === email;
  });
  if (user) {
    return "Tài khoản đã tồn tại";
  }
  return;
}

function handleLogin(email, password) {
  const user = data.find(function (user) {
    return user.email === email && user.password === password;
  });
  if (user) {
    return user;
  } else {
    return "Thông tin đăng nhập không hợp lệ";
  }
}

const data = [];
const dataRegister1 = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);

let ex03_input = document.querySelector(".ex03_input");
let ex03_output = document.querySelector(".ex03_output");
ex03_input.innerHTML = `
const data = [];
const dataRegister1 = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");`;

ex03_output.innerHTML = `Output: data = ${JSON.stringify(data)}
dataLogin = ${JSON.stringify(handleLogin("nguyenvana@email.com", "123456"))}
`;
