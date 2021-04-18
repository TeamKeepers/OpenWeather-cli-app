const inquirer = require('inquirer');
const inquirerFileTreeSelection = require("inquirer-file-tree-selection-prompt");
const path = require('path');
// const homedir = require('os').homedir();

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

module.exports = {
  checkOptions: () => {
    const menu = [
      {
        name: "options",
        type: "list",
        message: "What would you like to do:",
        choices: ["Check the weather of a city", "Check my previous configuration", "Import a file of locations ..."],
        default: "Check the weather of a city",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter choose one option';
          }
        }
      }
    ];
    return inquirer.prompt(menu)
  },
  askCity: () => {
    const opening_question = [
      {
        name: 'location',
        type: 'input',
        message: 'Get the temperature from [<city> or <zip code, country code>]:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a city or a zip code.';
          }
        }
      },
      {
        name: "temp",
        type: "confirm",
        message: "Convert into Fahrenheit (default Celsius):",
        default: false,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Yes or No.';
          }
        }
      }
    ];
    return inquirer.prompt(opening_question);
  },
  getFile: () => {
    const fileDir = [
      {
        name: "file",
        type: "file-tree-selection",
        message: 'Choose a file (only JSON file in your Assets directory)',
        // root: homedir,
        root: "./assets",
        validate: (item) => {
          if(path.extname(item) === '.json')
          {
            return true;
          } else {
            return "Please select a JSON file !"
          }
        }
      },
      {
        name: "temp",
        type: "confirm",
        message: "Convert into Fahrenheit (default Celsius):",
        default: false,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Yes or No.';
          }
        }
      }
    ];
    return inquirer.prompt(fileDir);
  },
  exit: () => {
    const quit = [
      {
        name: "options",
        type: "confirm",
        message: "Would you like to continue:",
        default: true,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Yes or No.';
          }
        }
      }
    ];
    return inquirer.prompt(quit);
  }
};
