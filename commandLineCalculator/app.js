const yargs = require('yargs');
const chalk = require('chalk');

const calculations = require("./calculations.js");

yargs.command({
  command: "add",
  describe: "Add two numbers",
  handler(argv) {
    const number1 = argv._[1];
    const number2 = argv._[2];
    const length = argv._.length;
    const err = calculations.errors(number1,number2,length);
    if (err) {
      throw new Error(err);
    }

    calculations.addNumbers(number1,number2);
  },
});

yargs.command({
  command: "sub",
  describe: "Subtract two numbers",
  handler(argv) {
    const number1 = argv._[1];
    const number2 = argv._[2];
    const length = argv._.length;
    const err = calculations.errors(number1,number2,length);
    if (err) {
      throw new Error(err);
    }

    calculations.subtractNumbers(number1,number2);
  },
});

yargs.command({
    command: "mul",
    describe: "Multiply two numbers",
    handler(argv) {
      const number1 = argv._[1];
      const number2 = argv._[2];
      const length = argv._.length;
      const err = calculations.errors(number1,number2,length);
      if (err) {
        throw new Error(err);
      }
  
      calculations.multiplyNumbers(number1,number2);
    },
  });

yargs.command({
command: "div",
describe: "Divide two numbers",
handler(argv) {
    const number1 = argv._[1];
    const number2 = argv._[2];
    const length = argv._.length;
    const err = calculations.errors(number1,number2,length);
    const zeroError = calculations.zeroErrors(number2)
    if (err) {
    throw new Error(err);
    } else if (zeroError){
        throw new Error(zeroError)
    }

    calculations.divideNumbers(number1,number2);
},
});

yargs.command({
    command: "mod",
    describe: "Modulus of two numbers",
    handler(argv) {
        const number1 = argv._[1];
        const number2 = argv._[2];
        const length = argv._.length
        const err = calculations.errors(number1,number2,length);
        const zeroError = calculations.zeroErrors(number2)

        if (err) {
        throw new Error(err);
        } else if (zeroError){
            throw new Error(zeroError)
        }
        
        calculations.modulusNumbers(number1,number2);
    },
    });

yargs.command({
  command: "*",
  describe: "Another operators",
  handler() {
    throw new Error("Invalid operator !!");
  },
});

try {
  yargs.parse();
} catch (err) {
  console.log(chalk.red(err));
}
