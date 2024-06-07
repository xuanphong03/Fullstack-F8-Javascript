let ex03_input = document.querySelector(".ex03_input");
let ex03_output = document.querySelector(".ex03_output");
let ex03_arr = [
  ["a", 1, true],
  ["b", 2, false],
];
let ex03_flattedArray = [];

function flatArray(arr) {
  for (let index in arr) {
    let element = arr[+index];
    if (Array.isArray(element)) {
      flatArray(element);
    } else {
      ex03_flattedArray.push(element);
    }
  }
  return ex03_flattedArray;
}

console.log(ex03_arr);

function separateByType(arr) {
  let typesArray = [];
  let newArray = [];

  arr.forEach((item) => {
    let type = typeof item;
    if (!typesArray.includes(type)) {
      newArray.push([item]);
      typesArray.push(type);
    } else {
      let index = typesArray.indexOf(type);
      newArray[index].push(item);
    }
  });

  return newArray;
}

ex03_input.innerText = `Input: [${ex03_arr.map((item) => `[${item}]`)}] `;
ex03_arr = flatArray(ex03_arr);
ex03_output.innerText = `Output: [${separateByType(ex03_arr).map(
  (item) => `[${item}]`
)}]`;
console.log(ex03_output);
