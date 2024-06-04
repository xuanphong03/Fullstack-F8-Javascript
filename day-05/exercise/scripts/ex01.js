let ex01_array_input = document.querySelector(".ex01_array_input");
let ex01_min = document.querySelector(".ex01_min");
let ex01_min_index = document.querySelector(".ex01_min_index");
let ex01_max = document.querySelector(".ex01_max");
let ex01_max_index = document.querySelector(".ex01_max_index");

let ex01_input = [5, 4, 2, 1, 5, 6, 9, 3];
ex01_array_input.innerText = `Mảng cho trước: [${ex01_input}]`;

function findMin(arr) {
  let minNumber = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (minNumber > arr[i]) {
      minNumber = arr[i];
    }
  }
  return minNumber;
}

function findMinIndex(arr) {
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[minIndex] > arr[i]) {
      minIndex = i;
    }
  }
  return minIndex;
}

function findMax(arr) {
  let maxNumber = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (maxNumber < arr[i]) {
      maxNumber = arr[i];
    }
  }
  return maxNumber;
}

function findMaxIndex(arr) {
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[maxIndex] < arr[i]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

ex01_min.innerText = `Số nhỏ nhất trong mảng: ${findMin(ex01_input)}`;
ex01_min_index.innerText = `Vị trí của số nhỏ nhất: ${
  findMinIndex(ex01_input) + 1
}`;
ex01_max.innerText = `Số lớn nhất trong mảng: ${findMax(ex01_input)}`;
ex01_max_index.innerText = `Vị trí của số lớn nhất: ${
  findMaxIndex(ex01_input) + 1
}`;
