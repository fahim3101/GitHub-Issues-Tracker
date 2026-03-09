Question Ans:

1. Difference between var, let, const
- var: Old way. Works in whole function. Can be declared again and updated. Sometimes makes problems with global scope.
- let: Works only inside { } block. Value can change later, but cannot declare again in same block.
- const: Also works inside { } block. Value cannot change after first time. Fixed forever.

2. What is the spread operator (...)?
Spread operator takes all items from an array or object and “spreads” them out.
Example:
let oldArray = [1,2,3];
let newArray = [...oldArray]; // newArray = [1,2,3]

3. Difference between map(), filter(), forEach()
- map(): Makes a new array after doing work on each item.
- filter(): Checks condition. Keeps only items that pass the condition. Returns new array.
- forEach(): Just loops through items. Does not return new array. Only used to do some work.

4. What is an arrow function?
Arrow function is a short way to write functions in JavaScript.
Example:
let add = (a, b) => a + b;

5. What are template literals?
Template literals are strings written with backticks ` instead of quotes.
They allow easy variable use inside string with ${variable}.
Example:
let name = "Fahim";
console.log(`Hello, my name is ${name}`);

