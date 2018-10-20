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
    
    
}