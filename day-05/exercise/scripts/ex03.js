let ex03_input = document.querySelector(".ex03_input");
let ex03_output = document.querySelector(".ex03_output");
let ex03_array_input = [1, 2, 1, 3, 5, 2, 1];
ex03_input.innerText = `Mảng cho trước [${ex03_array_input}]`;

function filterArray(arr) {
  let newArray = [];
  for (let i in arr) {
    let element = arr[+i];
    let hasElement = false;
    // if (!newArray.includes(element)) {
    //   newArray[newArray.length] = element;
    // }
    for (let j in newArray) {
      if (newArray[+j] === arr[+i]) {
        hasElement = true;
      }
    }
    if (!hasElement) {
      newArray[newArray.length] = element;
    }
  }
  return newArray;
}

ex03_output.innerText = `Mảng sau khi đã lọc: [${filterArray(
  ex03_array_input
)}]`;
