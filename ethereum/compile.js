const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


// Delete build folder if it exists
const buildPath = path.resolve(__dirname, 'build');

// Delete the folder and all files inside of it
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source,1).contracts;

// Check if directory exists if not create it 
fs.ensureDirSync(buildPath);
for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(":",'') +'.json'),
        output[contract]
    );
}

