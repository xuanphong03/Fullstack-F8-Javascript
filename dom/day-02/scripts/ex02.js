var input = document.querySelector("input");
var errorMessage = document.querySelector(".errorMsg");
var button = document.querySelector("button");
var ul = document.querySelector("ul");
var count = 0;

var handleMarkTaskCompleted = function (checkbox) {
  var status = checkbox.checked;
  var id = checkbox.dataset.id;
  var span = ul.querySelector(`span[data-id='${id}']`);
  if (status) {
    span.classList.add("complete");
  } else {
    span.classList.remove("complete");
  }
};

var handleRemoveTask = function (task) {
  task.style.display = "none";
};

button.addEventListener("click", function () {
  var value = input.value;
  if (!value) {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  count++;
  ul.innerHTML += `
  <li>
    <label>
      <input type="checkbox" name="todo" value='${value}' data-id='${count}' />
      <span data-id='${count}'>
        ${value}
      </span>
    </label>
    <span class='btnRemove'>
      Xóa
    </span>
  </li>`;
  input.value = "";
  var inputCheckboxList = ul.querySelectorAll("input");
  inputCheckboxList.forEach(function (checkboxItem) {
    checkboxItem.addEventListener("change", function () {
      handleMarkTaskCompleted(checkboxItem);
    });
  });

  var taskList = ul.querySelectorAll("li");
  taskList.forEach(function (taskItem) {
    var btnRemove = taskItem.querySelector(".btnRemove");
    btnRemove.addEventListener("click", function () {
      handleRemoveTask(taskItem);
    });
  });
});
