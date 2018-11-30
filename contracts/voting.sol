pragma solidity >=0.4.22 <0.6.0;

contract Voting {
    struct Voter {
        bool voted;
    }
    
    mapping(address => Voter) public voters;
    address[] public votersAddress;
    
    modifier canVote() {
        Voter storage voter = voters[msg.sender];
        require(!voter.voted, "This account is not allowed to vote.");
        _;
    }
    
    function addVoter(address voterAddress) public {
        voters[voterAddress] = Voter(false);
        votersAddress.push(voterAddress);
    }
    
    function voted(address voterAddress) canVote internal {
        voters[voterAddress].voted = true;
    }
}
