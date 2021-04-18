const Configstore = require('configstore');
const pkg = require('../package.json');

// Get the previous config
const conf = new Configstore(pkg.name);

module.exports = {
    getConfig: () => {
        return {city: conf.get("city"), tempFormat: conf.get("tempFormat")}
    },
    setConfig: (city, tempFormat) => {
        conf.set("city", city)
        conf.set("tempFormat", tempFormat)
    }
}