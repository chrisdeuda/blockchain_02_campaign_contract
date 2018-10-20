/**
 * 
 * Simulatenously connect to the API
 * 
 */

require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require("./compile");

let rinkeby_link = ""+ process.env.ETH_RINKEBY_API_LINK;
let eth_seeds =   ""+process.env.ETH_SEEDS;

const provider = new HDWalletProvider(
    eth_seeds,
    rinkeby_link
);

const web3 = new Web3(provider);

// So that we could use the async functions
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    // The JSON data is the ABI
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( {data: bytecode })
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface);
    console.log("Contract deployed to", result.options.address);

};

deploy();
