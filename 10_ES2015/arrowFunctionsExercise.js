// ES5 Map Callback
function double(arr) {
  return arr.map(function (val) {
    return val * 2;
  });
}

// ES2015 Arrow Functions Shorthand
const double = (arr) => arr.map((val) => val * 2);

// Refactor the following function to use arrow functions:
// Replace ALL functions with arrow functions:

const squareAndFindEvens = (numbers) =>
  numbers.map((num) => num ** 2).filter((square) => square % 2 === 0);
// const squareAndFindEvens2 = numbers => numbers.map(val => val ** 2).filter(square => square % 2 === 0);

const squareAndFindEvens3 = (numbers) =>
  numbers.map((num) => num ** 2).filter((square) => square % 2 === 0);
