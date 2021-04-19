const got = require('got');
const CLI = require('clui');

const Spinner = CLI.Spinner;

module.exports = {
    async basicLocalizedFetch() {
        const status = new Spinner('Asking the frog how she feels...');
        status.start();
        try {
            const response = await got(`http://ip-api.com/json/`);
            status.stop();
            return JSON.parse(response.body);
        } catch (error) {
            status.stop();
            return false;
        }
    }
};
