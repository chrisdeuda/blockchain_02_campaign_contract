import web3 from './web3';
// Need to import the ABI and the compiled contract
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xBfB7DA5a918f8a454D9E82F55F052ba0BA068fc7"
);

export default instance;

