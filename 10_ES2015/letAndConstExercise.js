// ES5 Global Constants
var PI = 3.14;
PI = 42; // stop me from doing this!

// ES2015 Global Constants
/* Write an ES2015 Version */
const PI = 3.14; // instead use const

// Quiz
// What is the difference between var and let?
// You cannot redeclare let, and let is block scoped, not function scoped. Let is also not hoisted.

// What is the difference between var and const?
// Const cannot be reassigned or redeclared, and it is not function scoped, it is block scoped. Const is also not hoisted.

// What is the difference between let and const?
// Let can be reassigned and initialized without a value.

// What is hoisting?
// Hoisting is when the variables are aknowledged first when the code is run, but their values are not read until they are run in order through the code. If a variable is hoisted, its value will not be read if it is called before its value is declared in the code - it will read undefined.
