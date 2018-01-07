#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./ConvertBTC');

program
  .version(pkg.version)
  .description('Convert BTC to any currency')
  .option('-C, --currency <>', 'Currency to be converted. (Default: USD)')
  .option('-A, --amount <>', 'Value in bitcoin to be converted. (Default: 1)')
  .parse(process.argv);

console.log(convertBTC(program.currency, program.amount));
