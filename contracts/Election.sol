pragma solidity ^0.4.24;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Fetch Candidate [key => value]
    mapping(uint => Candidate) public candidates;
    uint public candCount;

    function Election() public {
        addCandidate("Test1");
        addCandidate("Test2");
    }

    function addCandidate(string _name) private {
        candCount++;
        candidates[candCount] = Candidate(candCount, _name, 0);
    }
}