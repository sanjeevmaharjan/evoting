pragma solidity >=0.4.22 <0.6.0;

import "./owned.sol";
import "./voting.sol";

contract Ballot is Owned, Voting {

    struct Candidate {
        bytes16 name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    string constant private msgFrom = "Ballot: ";

    event Log(string);

    /// Create a new ballot
    constructor() public {
        addCandidate(0, "Prakash Aryal");
        addCandidate(1, "Prajin Shrestha");
    }
    
    function addCandidate(uint id, bytes16 name) private onlyCreator {
        candidates[id] = Candidate(name, 0);
        candidatesCount++;
    }

    /// Create a voter
    function giveRightToVote(address toVoter) public onlyCreator payable {
        addVoter(toVoter);
    }

    /// Give a single vote
    function vote(uint voteTo) public OnlyValidCandidate(voteTo) {
        /// Check if canVote and then mark as voted.
        voted(msg.sender);
        candidates[voteTo].voteCount++;
    }
    
    function checkVote(uint candidate) public OnlyValidCandidate(candidate) returns(uint _voteCount) {
        _voteCount = candidates[candidate].voteCount;
    }
    
    modifier OnlyValidCandidate(uint id) {
        require(id <= candidatesCount, "Must be a valid Candidate.");
        emit Log("Candidate Verified to exist.");
        _;
    }
}
