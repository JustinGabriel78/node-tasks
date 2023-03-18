const addNumbers = function (number1,number2) {
  console.log(number1 + number2);
};

const subtractNumbers = function (number1,number2) {
  console.log(number1 - number2);
};

const multiplyNumbers = function (number1,number2) {
  console.log(number1 * number2);
};

const divideNumbers = function (number1,number2) {
  console.log(number1 / number2);
};

const modulusNumbers = function (number1,number2) {
  console.log(number1 % number2);
};

const errors = function (number1,number2,length) {

  if(typeof number1 === "number" && typeof number2 === "number"){
    if (length > 3) {
      return " Only two numbers are required";
    } else if (length < 3) {
      return " Two numbers are required";
    }
  } else if (typeof number1 !== "number" && typeof number2 !== "number") {
     return " Invalid type!! ";

  } else if (typeof number1 !== "number") {
    return "1st number is invalid type";

  } else if (typeof number2 !== "number") {
    return "2nd number is invalid type"
  } 

};

const zeroErrors = function (number2) {
  if (number2 === 0) {
    return "cannot be divided by zero!!";
  }
};

module.exports = {
  addNumbers,
  subtractNumbers,
  multiplyNumbers,
  divideNumbers,
  modulusNumbers,
  errors,
  zeroErrors,
};
