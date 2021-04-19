const fs = require('fs');
const dotenv = require('dotenv');
const inquirer = require('./lib/inquirer.js');
const messages = require('./lib/messages.js');
const fetchDataOW = require('./lib/openWeather.js');
const fetchDataIA = require('./lib/ipApi.js');
const config = require('./lib/config.js');

// Get the config from the .env file
dotenv.config();

// Let's welcome the user the proper way
messages.welcome();

const run = async () => {

  // First menu options
  const menu = await inquirer.checkOptions();

  /**
   * CONDIION RELATED TO THE MENU ANSWER
   * 'Search for a specific city' that will ask more questions (ANSWER variable >> city, Celsius vs Fahrenheit preference) and save the config in the User folder (.config/configstore)
   * 'Check my previous configuration' that will get the previous configuration (<User>/.config/configstore)
   * 'Import a file of locations ...' that will return a list of temperatures related to an array of cities (JSON file in the Assets folder)
   */
  if (menu.options !== 'Import a file of locations ...') {
    if (menu.options === 'Check my weather location') {
        const locResp = await fetchDataIA.basicLocalizedFetch();
        const localization = await inquirer.confirmCity(locResp.city);
        if (localization.city) {
            const tempFormat = await inquirer.tempFormat();
            const locAnswer = await fetchDataOW.basicFetch(`${locResp.city}, ${localization.countryCode}`);
            config.setConfig(locResp.city, tempFormat.temp);
            if (locAnswer) {
                messages.returnTemp(
                    locAnswer.name,
                    locAnswer.sys.country,
                    locAnswer.main.temp,
                    tempFormat.temp,
                    locAnswer.main.humidity,
                    locAnswer.weather[0].description
                );
            } else {
                messages.errorHandler();
            }
        }
    } else {
        const answer = menu.options === 'Search for a specific city' ? await inquirer.askCity() : null;
        const response = menu.options === 'Check my previous configuration' ? await fetchDataOW.basicFetch(config.getConfig().city) : await fetchDataOW.basicFetch(answer.location);
        // Save the user input as config if needed
        if (menu.options === 'Search for a specific city') {
          config.setConfig(response.name, answer.temp);
        }
        if (response) {
            const tempFormat = menu.options === 'Search for a specific city' ? answer.temp : config.getConfig().tempFormat;
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
    }
} else {
  messages.fileFormat();
  const obj = await inquirer.getFile();
  fs.readFile(obj.file, 'utf8', (error, data) => {
      if (error) messages.errorHandler();
      try {
          const citiesArr = JSON.parse(data).cities;
          fetchDataOW.getMultipleWeather(citiesArr)
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

if (process.env.OW_API_KEY) {
    run();
} else {
    messages.errorNoAPI();
}
