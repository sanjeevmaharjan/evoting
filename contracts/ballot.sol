pragma solidity >=0.4.22 <0.6.0;

import "./owned.sol";
import "./voting.sol";

contract Ballot is Owned, Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint candidatesCount;

    /// Create a new ballot
    constructor() public {
        addCandidate(1, "Prakash Aryal");
        addCandidate(2, "Prajin Shrestha");
    }
    
    function addCandidate(uint id, string name) private onlyCreator {
        candidates[id] = Candidate(name, 0);
        candidatesCount++;
    }

    /// Create a voter
    function giveRightToVote(address toVoter) onlyCreator public {
        addVoter(toVoter);
    }

    /// Give a single vote
    function vote(uint voteTo) OnlyValidCandidate(voteTo) public {
        /// Check if canVote and then mark as voted.
        voted(msg.sender);
        candidates[voteTo].voteCount++;
    }
    
    function checkVote(uint candidate) public view OnlyValidCandidate(candidate) returns(uint _voteCount) {
        _voteCount = candidates[candidate].voteCount;
    }
    
    modifier OnlyValidCandidate(uint id) {
        require(id <= candidatesCount , "Must be a valid Candidate.");
        _;
    }
}
