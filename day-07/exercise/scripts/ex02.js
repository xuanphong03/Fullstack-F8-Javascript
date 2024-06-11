let ex02_input = document.querySelector(".ex02_input");
let ex02_output = document.querySelector(".ex02_output");
// Input: nums1 = [1,3], nums2 = [2]
// let nums1 = [1, 3];
// let nums2 = [2];

// Input: nums1 = [1,2], nums2 = [3,4]
let ex02_nums1 = [1, 2];
let ex02_nums2 = [3, 4];

let ex02_nums = ex02_nums1.concat(ex02_nums2).sort(function (num1, num2) {
  if (num2 > num1) {
    return -1;
  }
});

function getMedian(array) {
  let lengthArray = array.length;
  if (lengthArray % 2 !== 0) {
    let position = Math.floor(lengthArray / 2);
    return array[position];
  } else {
    let pos1 = Math.floor(lengthArray / 2) - 1;
    let pos2 = Math.floor(lengthArray / 2);
    return (array[pos1] + array[pos2]) / 2;
  }
}

let median = getMedian(ex02_nums);
ex02_input.innerText = "nums1 = [1,3], nums2 = [2]";
ex02_output.innerText = `output: ${median}`;
