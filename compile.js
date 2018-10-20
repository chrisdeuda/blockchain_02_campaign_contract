// For cross platform compatibility windows and unix base system
const path  = require('path');
const fs    = require('fs');
const solc  = require('solc');

const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');
const source    = fs.readFileSync(lotteryPath, 'utf8');

// Direct access for the bytcode for the object
module.exports  = solc.compile(source,1).contracts[':Lottery'];