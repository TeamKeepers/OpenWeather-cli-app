const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const path = require('path');
// const homedir = require('os').homedir();

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

module.exports = {
  checkOptions() {
    const menu = [
      {
        name: 'options',
        type: 'list',
        message: 'What would you like to do:',
        choices: ['Check my weather location', 'Search for a specific city', 'Check my previous configuration', 'Import a file of locations ...'],
        default: 'Check the weather of a city',
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter choose one option';
        }
      }
    ];
    return inquirer.prompt(menu);
  },
  askCity() {
    const openingQuestion = [
      {
        name: 'location',
        type: 'input',
        message: 'Get the temperature from [<city> or <zip code, country code>]:',
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter a city or a zip code.';
        }
      },
      {
        name: 'temp',
        type: 'confirm',
        message: 'Convert into Fahrenheit (default Celsius):',
        default: false,
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter Yes or No.';
        }
      }
    ];
    return inquirer.prompt(openingQuestion);
  },
  confirmCity(city) {
    const goodCity = [
      {
        name: 'city',
        type: 'confirm',
        message: `Are you actually in ${city}:`,
        default: true,
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter Yes or No.';
        }
      }
    ];
    return inquirer.prompt(goodCity);
  },
  tempFormat() {
    const format = [
        {
            name: 'temp',
            type: 'confirm',
            message: 'Convert into Fahrenheit (default Celsius):',
            default: false,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter Yes or No.';
            }
        }
    ];
    return inquirer.prompt(format);
  },
  getFile() {
    const fileDir = [
      {
        name: 'file',
        type: 'file-tree-selection',
        message: 'Choose a file (only JSON file in your Assets directory)',
        // root: homedir,
        root: './assets',
        validate(item) {
            if (path.extname(item) === '.json') {
                return true;
            }
            return 'Please select a JSON file !';
        }
      },
      {
        name: 'temp',
        type: 'confirm',
        message: 'Convert into Fahrenheit (default Celsius):',
        default: false,
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter Yes or No.';
        }
      }
    ];
    return inquirer.prompt(fileDir);
  },
  exit() {
    const quit = [
      {
        name: 'options',
        type: 'confirm',
        message: 'Would you like to continue:',
        default: true,
        validate(value) {
            if (value.length) {
                return true;
            }
            return 'Please enter Yes or No.';
        }
      }
    ];
    return inquirer.prompt(quit);
  }
};
