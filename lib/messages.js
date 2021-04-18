const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
    welcome() {
        clear();
        console.log(
            chalk.cyan(
              figlet.textSync('OPEN WEATHER CLI APP', { horizontalLayout: 'full' })
            )
        );
        console.log(
            chalk.yellowBright('\nWelcome into this CLI App to get the weather from your favorite cities.')
        );
    },
    /**
     * Return a nice answer to the user related to the city requested
     * @param {string} city The city found related to the user input
     * @param {string} country The country where the city was found
     * @param {number} temp Temperature as celsius
     * @param {boolean} tempFormat Convert to Fahrenheit ?
     * @param {number} humidity A number that shows the % of humidity
     * @param {string} description Description of the weather condition
     */
    returnTemp(city, country, temp, tempFormat, humidity, description) {
        const tempVal = tempFormat ? `${(temp * 9 / 5 + 32).toFixed(2)} °F` : `${temp} C°`;
        console.log(
            `${chalk.bgRedBright(`${city}, ${country}`)} \n ${chalk.greenBright(tempVal)} ${chalk.yellowBright('||')} Humidity ${chalk.greenBright(`${humidity}%`)} \n Description ${chalk.yellowBright('>>')} ${chalk.greenBright(description)}`
        );
    },
    fileFormat() {
        // eslint-disable-next-line
        console.log(`${chalk.redBright(`Format accepted:`)} ${chalk.greenBright(`{ "cities": ["Geneva", "Paris" ...] }`)} \n${chalk.redBright(`Max 10 cities accepted for now.`)}`);
    },
    pressKey() {
        console.log(chalk.yellowBright('Press any key to continue'));
    },
    errorHandler() {
        console.log(
            `${chalk.redBright('Error: we couldn\'t find the city requested. Please try again with another input !')}`
        );
    },
    errorMaxReached() {
        console.log(
            `${chalk.redBright('Error: we reached the maximum of 10 cities requested !')}`
        );
    }
};
