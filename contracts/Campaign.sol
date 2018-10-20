// Specific version of the solidity  that our source code is written
// Version Identifier of the code
pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; //it will not be count the number of vote
        mapping(address => bool) approvals;
    }
    
    uint public approversCount;
    
    
    Request[] public requests;

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable{
        require( msg.value > minimumContribution );
        // It will add new key in the hash
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index ) public {
        // Pass by referrence for one time access
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        // If they are not yet voted in the current request
        require(!requests[index].approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    
}