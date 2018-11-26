pragma solidity >=0.4.22 <0.6.0;

contract Owned {
    address owner;
    
    // constructor
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyCreator() {
        require(msg.sender == owner, "Must be the owner to access this.");
        _;
    }
    
    
}
