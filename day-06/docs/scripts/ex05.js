// Tìm giá trị lớn nhất
// var numbers = [2, 9, 5, 1, -5];
// var max = numbers.reduce(function (max, current) {
//   return max > current ? max : current;
// });
// console.log(`Giá trị lớn nhất: ${max}`);

// Xóa các phần tử trùng nhau trong users
// var users = ["An", "Tùng", "Đạt", "Quân", "Tùng", "Nam"];
// users = users.reduce(function (prev, current) {
//   if (!prev.includes(current)) {
//     prev.push(current);
//   }
//   return prev;
// }, []);
// console.log("Lọc trùng: ", users);

// // Tìm phần tử khác nhau
// var arr1 = [5, 2, 1, 6, 9];
// var arr2 = [2, 1, 6];

// var diffArr = arr1.reduce(function (prev, current) {
//   if (!arr2.includes(current)) {
//     prev.push(current);
//   }
//   return prev;
// }, []);

// console.log(`Mảng khác nhau:`, diffArr);

// var numbers = [1, [2, 3], [4], 5, [[6, 7]], [[[[8], 9]]]];

// function flatArray(currentArray, prevArray) {
//   console.log({
//     currentArray,
//     prevArray,
//   });
//   for (let index in currentArray) {
//     let element = currentArray[+index];
//     if (Array.isArray(element)) {
//       flatArray(element);
//     } else {
//       prevArray.push(element);
//     }
//   }
//   return prevArray;
// }

// numbers = numbers.reduce(function (prev, current, index) {
//   var isArray = Array.isArray(current);
//   if (!isArray) {
//     prev.push(current);
//   }
//   console.log(prev);
//   return prev;
//   //   return isArray ? flatArray(current, prev) : prev.push(current);
// }, []);
// let newArray = [];
// function flatArray(arrayNumbers) {
//   for (let index in arrayNumbers) {
//     let element = arrayNumbers[+index];
//     let isArray = Array.isArray(element);
//     if (isArray) {
//       element.reduce(function (prev, current, index) {
//         return Array.isArray(current)
//           ? flatArray(current)
//           : newArray.push(current);
//       }, newArray);
//     } else {
//       newArray.push(element);
//     }
//   }
//   return newArray;
// }

// function flatArray(arrayNumbers) {
//   return arrayNumbers.reduce(function (prev, current) {
//     return Array.isArray(current)
//       ? prev.concat(flatArray(current))
//       : prev.concat(current);
//   }, []);
// }

// console.log(flatArray(numbers));

// chunk array với size tương ứng
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var size = 2;

numbers = numbers.reduce(
  function (prev, current) {
    if (prev[prev.length - 1].length < size) {
      prev[prev.length - 1].push(current);
    } else {
      prev.push([current]);
    }
    return prev;
  },
  [[]]
);
console.log(numbers);
