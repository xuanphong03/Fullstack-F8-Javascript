var arrayA = [1, 4, 3, 2, 2, 2];
var arrayB = [5, 2, 6, 7, 1];

// arrayA.sort(function (number1, number2) {
//   if (number2 > number1) {
//     return -1;
//   }
// });
// arrayB.sort(function (number1, number2) {
//   if (number2 > number1) {
//     return -1;
//   }
// });

// var newArr = [];
// var i = 0,
//   j = 0;
// while (i < arrayA.length && j < arrayB.length) {
//   while (arrayA[i] === arrayA[i + 1]) {
//     i++;
//   }
//   while (arrayA[j] === arrayA[j + 1]) {
//     j++;
//   }
//   if (arrayA[i] === arrayB[j]) {
//     newArr.push(arrayA[i]);
//     j++;
//   } else {
//     i++;
//   }
// }

// console.log(newArr);

var result = arrayA.filter(function (item) {
  return arrayB.includes(item);
});
