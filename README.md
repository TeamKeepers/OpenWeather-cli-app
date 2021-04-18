# OPEN WEATHER CLI APP

Node CLI App based on [Open Weather](https://openweathermap.org/). 

Create an account to get an *API key*.

**PLEASE CREATE A `.ENV` FILE AND ADD YOUR OPEN WEATHER API KEY.**
> Name of the variable to create: OW_API_KEY

## How to start the app ?

Run `npm install` and `npm start`.

## QUESTIONS 
### What packages are used & why ?

* [Clear](https://www.npmjs.com/package/clear) to clear the terminal while the app starts;

* [Chalk](https://www.npmjs.com/package/chalk) to get some styling and make the app easier to read;

* [Figlet](https://www.npmjs.com/package/figlet) to display a nice message (ASCII Art) to start the app;

* [Inquirer](https://www.npmjs.com/package/inquirer) to easily interact with the user;

* [Inquirer-file-tree-selection-prompt](https://github.com/anc95/inquirer-file-tree-selection) as Inquirer plugin to easily retrieve a file;

* [ConfigStore](https://www.npmjs.com/package/configstore) to store the previous configuration from the user;

* [GOT](https://github.com/sindresorhus/got) to manage all the HTTP requests;

* [CLUI](https://www.npmjs.com/package/clui) to build a nice interface with loading effect;

* [Dotenv](https://www.npmjs.com/package/dotenv) to store, protect and get the API keys in a .env file;

### What could be improved ?

1. Help the user to get the right city with an autocompletion for cities ([
inquirer-autocomplete-prompt ](https://github.com/mokkabonna/inquirer-autocomplete-prompt) as Inquirer plugin could be helpful);

2. Choose the amount of information to display to the user (short versus detailed);

3. Accept more than JSON file as import;

4. Allow the user to get a file outside the Assets directory (Linux, Max, Windows);

5. Improve the user experience: how to display the information (improve the use of the Chalk package), interaction with the user & try to avoid extra question as much as possible ...


### If you want to deliver it to users, what should be done ?

    It depends of the user targeted. 

    If our target is developers or IT people, maybe a way to extract this information easily to use it for a specific purpose could be useful (then we should know which purpose).

    The only question then could be if we target developers, they should know how to use an API like Open Weather; so what is our added value in that case ?

    If our target is non-developers, then the user interface should be as simple as possible, avoid as much as possible extra questions/steps to offer an intuitive experience and do not scare them with a complicated structure.

    Then a documentation in both cases in crucial. A nice README and a NPM page is enough for developers, not for non-developers that will require a landing page at least.