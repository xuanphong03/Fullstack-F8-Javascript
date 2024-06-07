let ex03_input = document.querySelector(".ex03_input");
let ex03_output = document.querySelector(".ex03_output");
let ex03_inputArray = [
  ["a", 1, true],
  ["b", 2, false],
];

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

ex03_input.innerText = `Input: [${ex03_inputArray.map(
  (item) => `[${item}]`
)}] `;

ex03_inputArray = ex03_inputArray.flat(Infinity);
ex03_output.innerText = `Output: [${separateByType(ex03_inputArray).map(
  (item) => `[${item}]`
)}]`;
