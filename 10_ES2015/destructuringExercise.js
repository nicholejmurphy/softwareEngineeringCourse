// OBJECT Destructuring 1
console.log(numPLanets); // 8;
console.log(yearNeptuneDiscovered); // 846;

// OBJECT Destructuring 2
console.log(discoveryYears); // { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 };

// OBJECT Destructuring 3
getUserData({ firstName: "Alejandro", favoriteColor: "purple" });
// 'Your name is Alejandro and you like purple'
getUserData({ firstName: "Melissa" });
// 'Your name is Melissa and you like green'
getUserData({});
// 'Your name is undefined and you like green'

// ARRAY Destructuring 1
console.log(first); // 'Maya'
console.log(second); // 'Marisa'
console.log(third); // 'Chi'

// ARRAY Destructuring 2
console.log(raindrops); // "Raindrops on roses"
console.log(whiskers); // "whiskers on kittens",
console.log(aFewOfMyFavoriteThings);
// [ "Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings" ]

// ARRAY Destructuring 3
console.log(numbers); // [ 10, 30, 20 ]

// *********************************

// ES2015 REFREACTORING

// ES5 Assigning variables to object properties
const { a, b } = obj.numbers;

// ES5 Array Swap
[arr[0], arr[1]] = [arr[1], arr[0]];

// raceResults()
const raceResults = ([first, second, third, ...rest]) => ({
  first,
  second,
  third,
  rest,
});
