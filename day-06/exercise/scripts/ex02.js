let arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
let ex02_input = document.querySelector(".ex02_input");
let ex02_output = document.querySelector(".ex02_output");

let newArr = [];
function flatArray(arr) {
  for (let index in arr) {
    let element = arr[+index];
    if (Array.isArray(element)) {
      flatArray(element);
    } else {
      newArr.push(element);
    }
  }

  return newArr;
}

let result = flatArray(arr);
ex02_input.innerText = `arr: [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]]`;
ex02_output.innerText = `result: [${result}]`;
