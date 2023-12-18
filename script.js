const add = function () {
  return +num1 + +num2;
};
const subtract = function () {
  return +num1 - +num2;
};
const multiply = function () {
  return +num1 * +num2;
};
const divide = function () {
  return +num1 / +num2;
};

const deleteArray = function (arr) {
  arr.splice(0, arr.length);
};

const executeCurrentOperator = function () {
  OPERATORS[operatorArr[0]]();
  deleteArray(operatorArr);
};

const operate = function (currentOperator) {
  //convert array to numbers
  num1 = firstNumberArr.join("");
  num2 = secondNumberArr.join("");
  //run function with current operator
  result = currentOperator(num1, num2);
  //assign next operator
  nextOperator = operatorArr[1];
  //delete all arrays
  deleteArray(firstNumberArr);
  deleteArray(operatorArr);
  deleteArray(secondNumberArr);
  //push result to first number array
  firstNumberArr.push(result);
  //push operator to operator array
  operatorArr.push(nextOperator);
};

const OPERATORS = {
  "+": function () {
    operate(add);
  },
  "-": function () {
    operate(subtract);
  },
  "×": function () {
    operate(multiply);
  },
  "÷": function () {
    operate(divide);
  },
};

const SPECIALOPERATORS = {
  "=": function () {
    if (firstNumberArr.length === 0 || operatorArr.length === 0) {
      return firstNumberArr.join("");
    } else {
      executeCurrentOperator();
    }
  },
  "%": function () {
    if (operatorArr.length === 0) {
      num1 = +firstNumberArr.join("") / 100;
      deleteArray(firstNumberArr);
      firstNumberArr.push(num1);
    } else {
      num2 = +secondNumberArr.join("") / 100;
      deleteArray(secondNumberArr);
      secondNumberArr.push(num2);
    }
  },
  "+/-": function () {
    if (operatorArr.length === 0) {
      num1 = +firstNumberArr.join("") * -1;
      deleteArray(firstNumberArr);
      firstNumberArr.push(num1);
    } else {
      num2 = +secondNumberArr.join("") * -1;
      deleteArray(secondNumberArr);
      secondNumberArr.push(num2);
    }
  },
  clear: function () {
    deleteArray(firstNumberArr);
    deleteArray(secondNumberArr);
    deleteArray(operatorArr);
  },
};

const findDecimalInArray = function (arr) {
  return arr.includes(".");
};

const pushOperatorToArray = function (choice) {
  operatorArr.push(choice);
  if (operatorArr[1] in OPERATORS) {
    OPERATORS[operatorArr[0]]();
  }
};

const pushNumberToArray = function (choice) {
  operatorArr[0] in OPERATORS
    ? secondNumberArr.push(choice)
    : firstNumberArr.push(choice);
};

let num1 = "",
  num2 = "",
  operator,
  result,
  nextOperator;
const firstNumberArr = [],
  operatorArr = [],
  secondNumberArr = [];

const screenDisplay = function () {
  const screenResult = document.querySelector(".result");
  const decimal = document.querySelector("#decimal");
  const numberBtns = document.querySelectorAll("[data-number]");
  const operatorBtns = document.querySelectorAll("[data-operator]");
  const specialBtns = document.querySelectorAll("[data-specialOperator]");

  specialBtns.forEach((specialBtn) => {
    specialBtn.addEventListener("click", () => {
      const choice = specialBtn.dataset.specialoperator;
      SPECIALOPERATORS[choice]();
      screenResult.textContent =
        firstNumberArr.join("") +
        operatorArr.join("") +
        secondNumberArr.join("");
    });
  });

  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", () => {
      const choice = operatorBtn.dataset.operator;
      pushOperatorToArray(choice);
      decimal.removeAttribute("disabled");
      screenResult.textContent =
        firstNumberArr.join("") +
        operatorArr.join("") +
        secondNumberArr.join("");
    });
  });

  numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
      const choice = numberBtn.dataset.number;
      pushNumberToArray(choice);
      if (choice === ".") {
        decimal.setAttribute("disabled", "");
      }
      screenResult.textContent =
        firstNumberArr.join("") +
        operatorArr.join("") +
        secondNumberArr.join("");
    });
  });
};

screenDisplay();
