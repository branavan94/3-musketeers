const nock = require('nock');
const cli = require('./cli.js');
const currency = require('./');
const axios = require('axios');
const money = require('money');
beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});

describe('currency',() => {
  test('should convert 1 USD to EUR', async () => {
    const opts = {
  'amount': 1,
  'from': ('USD').toUpperCase(),
  'to': ('EUR').toUpperCase()
};
   const result = await currency(opts)
    expect(result).toBe(0.899);
  });

  test('should convert 1 USD to USD', async () => {
    const opts = {
  'amount': 1,
  'from': ('USD').toUpperCase(),
  'to': ('USD').toUpperCase()
};
   const result = await currency(opts)
    expect(result).toBe(1);
  });

  test('should convert 1 EUR to USD', async () => {
    const opts = {
  'amount': 1,
  'from': ('EUR').toUpperCase(),
  'to': ('USD').toUpperCase()
};
   const result = await currency(opts)
    expect(result).toBe(1.1122);
  });

  test('should convert 1 BTC to USD', async () => {
    const opts = {
  'amount': 1,
  'from': ('BTC').toUpperCase(),
  'to': ('USD').toUpperCase()
};
   const result = await currency(opts)
    expect(result).toBe(8944.49);
  });

  test('should convert 1 BTC to EUR', async () => {
    const opts = {
  'amount': 1,
  'from': ('BTC').toUpperCase(),
  'to': ('EUR').toUpperCase()
};
   const result = await currency(opts)
    expect(result).toBe(8048.11);
  });
  

  test('should convert (with default values) without arguments', async () => {
    var result = await money(1).from("USD").to("EUR")
    result = Number(result.toFixed(3))
    expect(result).toBe(0.899);
  });

  test('should convert with amount only as argument', async () => {
    const opts = {
  'amount': 1,}
   const result = await currency(opts)
    expect(result).toBe(1/8944.49);
  });

  /*test('should convert with amount and (from) currency only as arguments', async () => {
    throw new Error(
      'test not yet defined... remove the throw and write your test here'
    );
  });

  test('should return errors message for unknown `from` or `to` currency value', async () => {
    throw new Error(
      'test not yet defined... remove the throw and write your test here'
    );
  });*/
});
