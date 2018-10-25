/**
 * 
 * Simulatenously connect to the API
 * 
 */

require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

let rinkeby_link = ""+ process.env.ETH_RINKEBY_API_LINK;
let eth_seeds =   ""+process.env.ETH_SEEDS;

console.log("getting data" + rinkeby_link);
const provider = new HDWalletProvider(
    "novel feature stomach expand believe empty song rabbit royal cram judge wash",
    "https://rinkeby.infura.io/v3/3cf83b73bf7a4ab29a3f6676c821167c"
);

const web3 = new Web3(provider);

// So that we could use the async functions
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    // The JSON data is the ABI
    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy( {data: compiledFactory.bytecode })
        .send({gas: '1000000', from: accounts[0]});
    console.log("Contract deployed to", result.options.address);

};

deploy();
