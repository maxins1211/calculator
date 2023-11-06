const add = function (num1, num2) {
  return num1 + num2;
};
const subtract = function (num1, num2) {
  return num1 - num2;
};
const multiply = function (num1, num2) {
  return num1 * num2;
};
const divide = function (num1, num2) {
  return num1 / num2;
};

const operate = function (num1, num2, operator) {
  return operator(num1, num2);
};

console.log(operate(2, 3, add));
