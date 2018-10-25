const assert    = require('assert');
const ganace    = require('ganache-cli');
const Web3      = require('web3');
const web3      = new Web3(ganace.provider());

const compiledFactory   = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign  = require('../ethereum/build/Campaign.json');

let accounts;
//Referrence to the factory
let factory;
let campaignAddress;
let campaign;

beforeEach( async()=> {
    accounts    = await web3.eth.getAccounts();
    factory     = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Get access the campaign that have been created from the factory

    /**
     * Alternative coding
     * [campaignAddress] = await factory.methods.getDeployedContracts().call();
     *              It uses the ES6 Destructuring method
     */
    const addressess    = await factory.methods.getDeployedContracts().call();
    campaignAddress     = addressess[0];

    // Using the already use the deployed contract
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    // Checking the donations
    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    // Check if there is a minimum amount that need to spend
    it('requires minimum contribution', async () =>{
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
        } catch (error) {
            assert(error);
        }

    });

    it('allows the manager to create payment request', async () => {
        const DESCRIPTION = 'Buy Batteries';
        await campaign.methods
            .createRequest(DESCRIPTION, '100', accounts[0])
            .send({
                from: accounts[0],
                gas: '1000000'
            })
        const request = await campaign.methods.requests(0).call();

        assert.equal(DESCRIPTION, request.description);

    });

    // Sending and Processing requests
    it('process requests', async () => {

        // Send the
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')

        });

        // Getting the current balance
        await campaign.methods
            .createRequest('A', web3.utils.toWei('5','ether'), accounts[1])
            .send({from: accounts[0], gas: '1000000'});

        // Coudln't reset the balance in the ganache

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'

        })

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        console.log(balance);

        assert(balance > 104)


    });
 
});