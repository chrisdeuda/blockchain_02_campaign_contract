// Specific version of the solidity  that our source code is written
// Version Identifier of the code
pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedContracts () public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        uint amount;
        address recipient ;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }
    
    mapping(address => bool) public approvers;
    
    Request[] public requests;
    
    // Number of person participate in the campaign
    uint public approversCount;
        
    address manager ;
    uint minimumContribution; 
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    // It was payable because the user will gonna requre to send some amount;
    function contribute() public payable{
        require( msg.value > minimumContribution  );
        
        // Save the information of the sender in the mapping
        
        approvers[msg.sender] = true;
        approversCount++;
        
    }
    function createRequest(string description, uint amount,address recipient) 
        public restricted {
        // Memory it means we are just using the local copy 
        Request memory newRequest = Request({
            description: description,
            amount: amount,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index)public{
        // They must be as contribute ( exist in the mapping)
        
        Request storage request = requests[index];
        require( approvers[msg.sender]);
        // They should not be approve yet the existing requests
        // The sender should not be yet in the hash
        require(! requests[index].approvals[msg.sender]);
        
        // It will create new hash with boolean value
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        // only the manager could finalizeRequest
        
        Request storage request = requests[index];
        
        // Make sure that it is not yet completed 
        require(! request.complete);
        
        //Must be 50% of the votes should be agree
        
        require(request.approvalCount > ( approversCount / 2));
        
        request.recipient.transfer( request.amount);
        request.complete = true;
    }
}