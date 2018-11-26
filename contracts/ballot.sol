pragma solidity ^0.4.24;

import "./owned.sol";
import "./voting.sol";

contract Ballot is Owned, Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) candidates;
    uint[] candidateId;

    /// Create a new ballot
    constructor() public {
        addCandidate(1, "Prakash Aryal");
        addCandidate(2, "Prajin Shrestha");
    }
    
    function addCandidate(uint id, string name) private onlyCreator {
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
        Candidate storage cand = candidates[id];
        bytes memory name = bytes(cand.name);
        require(name.length > 0);
        _;
    }
    
    function checkVote(uint candidate) OnlyValidCandidate(candidate) public returns(uint _voteCount) {
        _voteCount = candidates[candidate].voteCount;
    }
}
