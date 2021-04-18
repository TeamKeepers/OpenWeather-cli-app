const fs = require('fs');
const inquirer = require('./lib/inquirer.js');
const messages = require('./lib/messages.js');
const fetchData = require('./lib/openWeather.js');
const config = require('./lib/config.js');

// Let's welcome the user the proper way
messages.welcome();

const run = async () => {

  // First menu options
  const menu = await inquirer.checkOptions();

  /**
   * CONDIION RELATED TO THE MENU ANSWER
   * 'Check the weather of a city' that will ask more questions (ANSWER variable >> city, Celsius vs Fahrenheit preference) and save the config in the User folder (.config/configstore)
   * 'Check my previous configuration' that will get the previous configuration (<User>/.config/configstore)
   * 'Import a file of locations ...' that will return a list of temperatures related to an array of cities (JSON file)
   */
  if (menu.options !== 'Import a file of locations ...') {
    const answer = menu.options === 'Check the weather of a city' ? await inquirer.askCity() : null;
    const response = menu.options === 'Check my previous configuration' ? await fetchData.getWeather(config.getConfig().city) : await fetchData.getWeather(answer.location);
    // Save the user input as config if needed
    if (menu.options === 'Check the weather of a city') {
      config.setConfig(response.name, answer.temp);
    }
    if (response) {
        const tempFormat = menu.options === 'Check the weather of a city' ? answer.temp : config.getConfig().tempFormat;
        messages.returnTemp(
            response.name,
            response.sys.country,
            response.main.temp,
            tempFormat,
            response.main.humidity,
            response.weather[0].description
        );
    } else {
      messages.errorHandler();
    }
  } else {
    messages.fileFormat();
    const obj = await inquirer.getFile();
    fs.readFile(obj.file, 'utf8', (error, data) => {
        if (error) messages.errorHandler();
        try {
            const citiesArr = JSON.parse(data).cities;
            fetchData.getMultipleWeather(citiesArr)
                .then((dataArr) => {
                    if (dataArr) {
                        dataArr.map((data) =>
                            messages.returnTemp(
                                data.name,
                                data.sys.country,
                                data.main.temp,
                                obj.temp,
                                data.main.humidity,
                                data.weather[0].description
                            )
                    );
                    } else {
                    messages.errorMaxReached();
                    }
                    messages.pressKey();
                });
        } catch (error) {
            return messages.errorHandler();
        }
    });
  }

  const closing = await inquirer.exit();
  if (closing.options) {
    run();
  }
};

run();
