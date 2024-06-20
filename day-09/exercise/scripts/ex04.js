Array.prototype.reduce2 = function (callback, initialValue) {
  var result;
  var prevValue = initialValue || this[0];
  var idxStart = initialValue ? 0 : 1;
  for (idxStart; idxStart < this.length; idxStart++) {
    result = callback(prevValue, this[idxStart]);
    prevValue = result;
  }
  return result;
};

var arr = [1, 2, 3, 4];
console.log(
  arr.reduce2(function (prevValue, currentValue) {
    return prevValue + currentValue;
  })
);

var numbers = [2, 9, 5, 1, -5];
var max = numbers.reduce2(function (prev, current) {
  return prev > current ? prev : current;
});
console.log(max);
