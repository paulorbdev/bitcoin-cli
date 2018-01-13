const chai = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const convertBTC = require('../src/ConvertBTC');
chai.use(sinonChai);

describe('ConvertBTC', () => {

  let consoleStub;

  const responseMock = {
    "time": "2018-01-09 00:52:10",
    "success": true,
    "price": 15053.34
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use USD as default currency and 1 as the default amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 1})
      .reply(200, responseMock);

      convertBTC();
      setTimeout(() => {
        expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 15053.34');
        done();
      }, 300);
  });

  it('should use USD as currency and 10 as a amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({from: 'BTC', to: 'USD', amount: 10})
      .reply(200, responseMock);

      convertBTC('USD', 10);
      setTimeout(() => {
        expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 15053.34');
        done();
      }, 300);
  });

  it('should use BRL as currency and 1 as the default amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .reply(200, responseMock);

      convertBTC('BRL');
      setTimeout(() => {
        expect(consoleStub).to.have.been.calledWith('1 BTC to BRL = 15053.34');
        done();
      }, 300);
  });

  it('should message user when API reply with a error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({from: 'BTC', to: 'BRL', amount: 1})
      .replyWithError('Error');

      convertBTC('BRL');
      setTimeout(() => {
        expect(consoleStub).to.have.been.calledWith('Something went wrong with the API. Try in a few minutes');
        done();
      }, 300);
  });
});
