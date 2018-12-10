pragma solidity >=0.4.22 <0.6.0;

contract Voting {
    struct Voter {
        bool voted;
    }
    
    mapping(address => Voter) public voters;
    address[] public votersAddress;

    event Log(string);
    
    modifier canVote() {
        Voter memory voter = voters[msg.sender];
        require(!voter.voted, "This account is not allowed to vote.");
        emit Log("Voter verified to exist in our list.");
        _;
    }
    
    function addVoter(address voterAddress) public {
        voters[voterAddress] = Voter(false);
        votersAddress.push(voterAddress);
    }
    
    function voted(address voterAddress) internal {
        voters[voterAddress].voted = true;
    }
}
