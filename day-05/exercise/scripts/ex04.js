let ex04_input = document.querySelector(".ex04_input");
let ex04_output1 = document.querySelector(".ex04_output1");
let ex04_output2 = document.querySelector(".ex04_output2");
let ex04_array_input = [5, 1, 9, 8, 10];
let elementPush = 6;
ex04_input.innerText = `Mảng cho trước [${ex04_array_input}]`;

function selectionSort(arr) {
  let newArray = [...arr];
  for (let i = 0; i < newArray.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[minIndex] > newArray[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = newArray[minIndex];
      newArray[minIndex] = newArray[i];
      newArray[i] = temp;
    }
  }
  return newArray;
}

function getInsertedNumber(num, arr) {
  let insertIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (num < arr[i]) {
      break;
    }
    insertIndex++;
  }
  return insertIndex;
}

function insertNewElement(insertedElement, sortedArray, insertIndex) {
  let newArray1 = [];
  let newArray2 = [];
  for (let index in sortedArray) {
    if (+index < insertIndex) {
      newArray1[newArray1.length] = sortedArray[index];
    } else {
      newArray2[newArray2.length] = sortedArray[index];
    }
  }
  newArray1[insertIndex] = insertedElement;
  return newArray1.concat(newArray2);
}
let sortedArray = selectionSort(ex04_array_input);
let insertIndex = getInsertedNumber(elementPush, sortedArray);
let result = insertNewElement(elementPush, sortedArray, insertIndex);

ex04_output1.innerText = `Mảng sau khi sắp xếp: [${sortedArray}]`;
ex04_output2.innerText = `Mảng sau khi chèn phần tử: [${result}]`;
