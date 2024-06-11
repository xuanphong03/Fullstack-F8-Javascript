let ex03_input = document.querySelector(".ex03_input");
let ex03_output = document.querySelector(".ex03_output");

//Input: nums = [3,4,-1,1]
let ex03_nums = [3, 4, -1, 1];
ex03_nums.sort(function (num1, num2) {
  if (num2 > num1) {
    return -1;
  }
});
let minNumInteger = 1;
while (minNumInteger) {
  if (!ex03_nums.includes(minNumInteger)) {
    break;
  }
  minNumInteger++;
}
ex03_input.innerText = "input: [3,4,-1,1]";
ex03_output.innerText = `output: ${minNumInteger}`;
