#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkanimation from "chalk-animation";
import { start } from "repl";

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};
async function welcome() {
  let title = chalkanimation.rainbow(`Welcome to the CLI Calculator!`);
  await sleep();
  title.stop();
  console.log(` 
   _____________________
  |  _________________  |
  | | JO           0. | |
  | |_________________| |
  |  ___ ___ ___   ___  |
  | | 7 | 8 | 9 | | + | |
  | |___|___|___| |___| |
  | | 4 | 5 | 6 | | - | |
  | |___|___|___| |___| |
  | | 1 | 2 | 3 | | x | |
  | |___|___|___| |___| |
  | | . | 0 | = | | / | |
  | |___|___|___| |___| |
  |_____________________|`);
}
await welcome();
async function askQuestion() {
  let answers = await inquirer
    .prompt([
      {
        type: "number",
        name: "num1",
        message: chalk.bgCyan("Please enter your first number! "),
      },
      {
        type: "number",
        name: "num2",
        message: chalk.bgMagenta("Please enter your second number! "),
      },
      {
        type: "list",
        name: "operators",
        choices: ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"],
        message: chalk.bgBlue("Please select operation! "),
      },
    ])
    .then((answers) => {
      if (
        answers.operators === "ADDITION" &&
        !Number.isNaN(answers.num1) &&
        !Number.isNaN(answers.num2)
      ) {
        console.log(
          chalk.green(
            `The ${answers.num1} + ${answers.num2} is = ${
              answers.num1 + answers.num2
            }`
          )
        );
      } else if (
        answers.operators === "SUBTRACTION" &&
        !Number.isNaN(answers.num1) &&
        !Number.isNaN(answers.num2)
      ) {
        console.log(
          chalk.green(
            `The ${answers.num1} - ${answers.num2} is = ${
              answers.num1 - answers.num2
            }`
          )
        );
      } else if (
        answers.operators === "MULTIPLICATION" &&
        !Number.isNaN(answers.num1) &&
        !Number.isNaN(answers.num2)
      ) {
        console.log(
          chalk.green(
            `The ${answers.num1} * ${answers.num2} is = ${
              answers.num1 * answers.num2
            }`
          )
        );
      } else if (
        answers.operators === "DIVISION" &&
        !Number.isNaN(answers.num1) &&
        !Number.isNaN(answers.num2)
      ) {
        console.log(
          chalk.green(
            `The ${answers.num1} / ${answers.num2} is = ${
              answers.num1 / answers.num2
            }`
          )
        );
      } else {
        console.log(chalk.redBright(`Invalid operation!!!`));
      }
    })
    .catch(() => {
      restart();
    });
}
await askQuestion();

async function restart() {
  let startAgain = await inquirer.prompt([
    {
      type: "input",
      name: "Restart",
      message: "Do you want to perform more calculations? y/n ",
    },
  ]);
  if (startAgain.Restart == "y") {
    for (let input of startAgain.Restart) {
      await askQuestion();
      restart();
    }
  } else {
    console.log("Thank you for using");
  }
}
restart();
