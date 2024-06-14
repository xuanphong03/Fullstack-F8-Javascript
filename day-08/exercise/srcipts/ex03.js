const data = [];

function handleRegister(name, password, email) {
  if (!!handleValidate(name, password, email)) {
    return handleValidate(name, password, email);
  }
  if (!!checkExistedAccount(email)) {
    return checkExistedAccount(email);
  }
  data.push({
    name,
    password,
    email,
    role: "user",
  });
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
}

function checkExistedAccount(email) {
  for (let user of data) {
    if (user.email === email) {
      return "Tài khoản đã tồn tại";
    }
  }
}

function handleLogin(email, password) {
  for (let user of data) {
    if (user.email === email && user.password === password) {
      return user;
    }
  }
  return "Thông tin đăng nhập không hợp lệ";
}

handleRegister("Nguyen Van A", "123456", "nguyenvana@email.com");
handleRegister("Nguyen Van B", "1234567", "nguyenvanb@email.com");
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
console.log(dataLogin);
