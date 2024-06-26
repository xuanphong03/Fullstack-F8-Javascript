var btnOpenForm = document.querySelector(".btn_openForm");
var modal = document.querySelector(".modal");
var bgOverlay = document.querySelector(".bg_overlay");
var formLogin = document.formLogin;
var formRegister = document.formRegister;
var closeBtn = modal.querySelector(".icon_close");
var btnSubmitList = modal.querySelectorAll(".btn_submit");
var inputBoxList = document.querySelectorAll(".input_box");
var tabsList = document.querySelectorAll(".tab_item");
var btnToggle = document.querySelectorAll(".icon-toggle");
var tabLogin = document.querySelector(".tab_item-login");
var tabRegister = document.querySelector(".tab_item-register");

var showPassword = false;
var isFormLogin = true;
var error = false;

btnToggle.forEach(function (btnToggleEl) {
  var btnShowPassword = btnToggleEl.querySelector(".icon-show");
  var btnHidePassword = btnToggleEl.querySelector(".icon-hide");
  var formName = btnToggleEl.dataset.name;
  var inputPassword = document.querySelector(
    `form[name=${formName}] input[type='password']`
  );

  btnToggleEl.addEventListener("click", function () {
    console.log({
      btnShowPassword,
      btnHidePassword,
    });
    btnShowPassword.classList.toggle("icon-active");
    btnHidePassword.classList.toggle("icon-active");

    if (btnHidePassword.classList.contains("icon-active")) {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  });
});

function resetInputStatus() {
  inputBoxList.forEach(function (inputElement) {
    var inputEl = inputElement.querySelector("input");
    var inputElName = inputEl.name;
    if (inputElName.includes("email")) {
      inputEl.type = "email";
    } else if (inputElName.includes("password")) {
      inputEl.type = "password";
    } else {
      inputEl.type = "text";
    }
    inputEl.value = "";
  });
  btnToggle.forEach(function (btnToggleEl) {
    var btnShowPassword = btnToggleEl.querySelectorAll(".icon-show");
    var btnHidePassword = btnToggleEl.querySelectorAll(".icon-hide");
    btnShowPassword.forEach(function (buttonEl) {
      buttonEl.classList.add("icon-active");
    });
    btnHidePassword.forEach(function (buttonEl) {
      buttonEl.classList.remove("icon-active");
    });
  });
}

function showForm() {
  removeErrorMessage();
  resetInputStatus();

  if (isFormLogin) {
    formLogin.style.display = "block";
    formRegister.style.display = "none";
  } else {
    formLogin.style.display = "none";
    formRegister.style.display = "block";
  }
}

// Mở form từ ngoài
function openForm() {
  isFormLogin = true;
  modal.style.display = "block";
  showForm();
}

// Đóng form
function closeForm() {
  modal.style.display = "none";
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkError(inputElements) {
  var hasError = false;
  console.log(inputElements);
  for (var i = 0; i < inputElements.length; i++) {
    if (
      (inputElements[i].type === "email" &&
        !validateEmail(inputElements[i].value)) ||
      (inputElements[i].type === "text" && !inputElements[i].length)
    ) {
      hasError = true;
      break;
    }
  }

  return hasError;
}

function validate() {
  var inputBoxElList;
  if (formLogin.classList.contains("form-active")) {
    inputBoxElList = formLogin.querySelectorAll(".input_box");
  } else {
    inputBoxElList = formRegister.querySelectorAll(".input_box");
  }

  inputBoxElList.forEach(function (inputElement) {
    var inputEl = inputElement.querySelector("input");
    var errorMsg = inputElement.querySelector(".errorMsg");
    if (inputEl.type !== "email") {
      if (!inputEl.value) {
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
      }
    } else {
      if (validateEmail(inputEl.value)) {
        errorMsg.style.display = "none";
      } else {
        errorMsg.style.display = "block";
      }
    }
  });
}

// Xử lý sự kiện
inputBoxList.forEach(function (inputBoxElement) {
  var inputElement = inputBoxElement.querySelector("input");
  inputElement.addEventListener("input", validate);
  inputElement.addEventListener("blur", validate);
  inputElement.addEventListener("focus", function () {});
});

// Submit form
btnSubmitList.forEach(function (btnSubmit) {
  btnSubmit.addEventListener("click", function (e) {
    var inputElements;

    e.preventDefault();
    validate();
    if (formLogin.classList.contains("form-active")) {
      inputElements = formLogin.querySelectorAll("input");
    } else {
      inputElements = formRegister.querySelectorAll("input");
    }

    if (!checkError(inputElements)) {
      var loadingEl = btnSubmit.querySelector(".icon-loading");
      loadingEl.style.display = "flex";
      setTimeout(function () {
        loadingEl.style.display = "none";
        resetInputStatus();
      }, 500);
    } else {
    }
  });
});

// Mở form
btnOpenForm.addEventListener("click", openForm);

// Đóng form
bgOverlay.addEventListener("click", closeForm);
closeBtn.addEventListener("click", closeForm);
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    closeForm();
  }
});

// Reset lỗi sau khi chuyển tab hoặc thoát ra
function removeErrorMessage() {
  inputBoxList.forEach(function (inputElement) {
    var errorMsg = inputElement.querySelector(".errorMsg");
    errorMsg.style.display = "none";
  });
}

// Chuyển tab
tabLogin.addEventListener("click", function () {
  if (!tabLogin.classList.contains("tab_item-active")) {
    tabLogin.classList.add("tab_item-active");
    formLogin.classList.add("form-active");
    formRegister.classList.remove("form-active");
  }
  tabRegister.classList.remove("tab_item-active");
  isFormLogin = true;
  showForm();
});
tabRegister.addEventListener("click", function () {
  if (!tabRegister.classList.contains("tab_item-active")) {
    tabRegister.classList.add("tab_item-active");
    formRegister.classList.add("form-active");
    formLogin.classList.remove("form-active");
  }
  tabLogin.classList.remove("tab_item-active");
  isFormLogin = false;
  showForm();
});
