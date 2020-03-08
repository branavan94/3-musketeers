/**
 *Dependencies to import 
**/

const axios = require('axios');
const money = require('money');

/**
 *RATES_URL call the API that will fetch the information we need about the currency exchange rate 
 *BLOCKCHAIN_URL gets the informations about specific currency
 **/
const RATES_URL = 'https://api.exchangeratesapi.io/latest'; 
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';

/**
 *Function isAnyBTC to check if 'BTC' is included in the list [from,to]
**/
const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);

/**
 *Calls the async function opts from cli.js to display in the async start function.
 *opts is a function that pushes the data into the promise response
**/
module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;
  const promises = [];
  let base = from;

/**
 *Pushes all of the data from the blockchain api into the promise
**/
  const anyBTC = isAnyBTC(from, to);

  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from;
    promises.push(axios(BLOCKCHAIN_URL));
  }
/**
 *Pushes the base of the currency which is EUR and get the data from rates URL before the data from blockchain API 
**/
  promises.unshift(axios(`${RATES_URL}?base=${base}`));

/**
 *gets all of the data into response and gets rates and base into two different variables. 
**/
  try {
    const responses = await Promise.all(promises);
    const [rates] = responses;

    money.base = rates.data.base;
    money.rates = rates.data.rates;
/**
 *ConversionOpts gets the current currency to be convert to. 
**/
    const conversionOpts = {
      from,
      to
    };

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );
/**
 *gets all of the data into response and gets rates and base into two different variables. 
**/
      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }
/**
 *Converts the amount into BTC 
**/
    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
