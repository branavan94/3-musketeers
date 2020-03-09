# Requirements
* Node js  
You can download it with this link :  https://nodejs.org/en/download/
# Installation Guide 
- First, you fork this project into your github.
You can add node to your environment variables. 
You can then go any directory file and type in the command prompt: 
```sh
 > git clone //your github URL to the project
```
- Install all of the dependencies to the project using npm. 
```sh
 > npm install 
```
# Dependencies 
- Axios:
Promise based HTTP client for the browser and node.js  
## Usage 
```js
const axios = require('axios');
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```
For more information about the library, you can go to this link : https://github.com/axios/axios
- Money: Simple JavaScript currency conversion library with no dependencies, in just over 1 kb.  
## Usage 
```js
const money = require('money');
// From any currency, to any currency:
money.convert(12.99, {from: "GBP", to: "HKD"});

// Chaining sugar:
money(1000).from("USD").to("GBP");
money(1000).to("AED");
```
For more information about the library, you can go to this link : https://openexchangerates.github.io/money.js/
- Ora : Spinners for use in the terminal  
## Usage 
```js
const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```
For more information about the library, you can go to this link :https://github.com/sindresorhus/ora
- Jest : A comprehensive JavaScript testing solution. Works out of the box for most JavaScript projects.
## Usage 
```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

//In another file
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
``` 
For more information about the library, you can go to this link :https://github.com/facebook/jest



