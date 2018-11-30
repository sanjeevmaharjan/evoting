pragma solidity >=0.4.22 <0.6.0;

import "./owned.sol";
import "./voting.sol";

contract Ballot is Owned, Voting {

    struct Candidate {
        bytes16 name;
        uint voteCount;
    }

    Candidate[] candidates;

    /// Create a new ballot
    constructor() public {
        addCandidate(1, "Prakash Aryal");
        addCandidate(2, "Prajin Shrestha");
    }
    
    function addCandidate(uint id, bytes16 name) private onlyCreator {
        candidates[id] = Candidate(name, 0);
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
    
    modifier OnlyValidCandidate(uint id) {
        Candidate memory cand = candidates[id];
        require(cand.name.length > 0, "Must be a valid Candidate.");
        _;
    }
    
    function checkVote(uint candidate) OnlyValidCandidate(candidate) public returns(uint _voteCount) {
        _voteCount = candidates[candidate].voteCount;
    }
}
