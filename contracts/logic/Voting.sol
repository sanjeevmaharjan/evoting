pragma solidity >=0.4.22 <0.6.0;

import "../math/SafeMath.sol";

contract Voting {

    using SafeMath for uint256;

    /* Note: All the structs will use id to check whether a struct is initialized.
     * So, begin index from 1. 0 means that struct is not initalized.
    */

    struct Issue {
        uint id;
        bytes16 name;
        bytes32 description;
        uint candidatesTracker;
        mapping(uint => Candidate) candidates;
    }

    struct Candidate {
        uint id;
        bytes16 name;
        bytes32 description;
        uint256 voteCount;
    }

    struct Voter {
        uint id;
        bytes16 name;
        bytes32 pk;
        bool hasVoted;
    }

    uint private issuesTracker;
    uint private votersTracker;

    mapping(uint => Issue) private issues;
    mapping(address => Voter) private voters;

    constructor() public {
        issuesTracker = 0;
        votersTracker = 0;
    }

    function addIssue(bytes16 newName, bytes32 newDescription) internal {
        issuesTracker++;
        issues[issuesTracker] = Issue({
            id: issuesTracker,
            name: newName,
            description: newDescription,
            candidatesTracker: 0
        });

        emit OnIssueAdded(issuesTracker);
    }

    function addCandidate(uint optionId, bytes16 newName, bytes32 newDescription) internal mustBeIssue(optionId) returns(uint) {
        uint c = ++issues[optionId].candidatesTracker;
        issues[optionId].candidates[c] = Candidate({id: c, name: newName, description: newDescription, voteCount: 0});
        emit OnCandidateAdded(c, newName);
        return c;
    }

    // Returns if adding was successful (cannot add if voter already exists)
    function addVoter(address addrVoter, bytes16 newName, bytes32 newPK) internal
                        returns (bool) {
        if (isVoter(addrVoter)) {
            return false;
        }
        votersTracker++;
        voters[addrVoter] = Voter({id: votersTracker, name: newName, pk: newPK, hasVoted: false});
        emit OnVoterAdded(votersTracker);
        return true;
    }

    function getIssueCount() internal view returns (uint) {
        return issuesTracker;
    }

    function getIssue(uint issueId) internal view mustBeIssue(issueId) returns (uint, bytes16, bytes32, uint) {
        Issue memory iss = issues[issueId];

        return (iss.id, iss.name, iss.description, iss.candidatesTracker);
    }

    function getOption (uint candidateId) internal view returns (uint id, bytes16 name, bytes32 description, uint256 voteCount) {
        uint issueId = getIssueOf(candidateId);
        require(issueId > 0, "The Candidate doesnot belong to any Election Issue.");
        require(candidateId > 0 && issues[issueId].candidates[candidateId].id > 0, "Candidate must be valid.");
        Candidate memory cand = issues[issueId].candidates[candidateId];
        return (cand.id, cand.name, cand.description, cand.voteCount);
    }

    function getVoteCountOf(uint candidateId) public view returns (uint256) {
        uint issueId = getIssueOf(candidateId);
        require(issueId > 0, "The Candidate doesnot belong to any Election Issue.");
        require(candidateId > 0 && issues[issueId].candidates[candidateId].id > 0, "Candidate must be valid.");

        return issues[issueId].candidates[candidateId].voteCount;
    }

    function vote(address addrVoter, uint issueId, uint candidateId)
                    public mustBeIssue(issueId) mustBeCandidate(candidateId)
                    returns (bool) {
        require(!hasVoted(addrVoter), "Cannot Vote more than once.");

        issues[issueId].candidates[candidateId].voteCount ++;
        voters[addrVoter].hasVoted = true;

        return true;
    }

    function getWinner(uint issueId) internal view mustBeIssue(issueId) returns (uint) {
        uint maxVote = 0;
        uint winner = 0;

        for (uint i = 0; i < issues[issueId].candidatesTracker; i++) {
            uint256 votes = issues[issueId].candidates[i].voteCount;
            if (votes > maxVote) {
                maxVote = votes;
                winner = i;
            }
        }

        return winner;
    }

    modifier mustBeIssue(uint issueId) {
        require(issueId > 0 && issues[issueId].id > 0, "Option chosen is not Valid.");
        _;
    }

    modifier mustBeCandidate(uint candidateId) {
        uint issueId = getIssueOf(candidateId);
        require(issueId > 0 && issues[issueId].id > 0, appendUintToString("Invalid Issue: ", issueId));
        require(candidateId > 0 && issues[issueId].candidates[candidateId].id > 0, appendUintToString("Invalid Candidate: ", candidateId));
        _;
    }

    modifier mustBeVoter(address voter) {
        bool isRegistered = isVoter(voter);
        require(isRegistered, "User must be a voter for the current operation.");
        _;
    }

    function isVoter(address addrVoter) public view returns(bool) {
        return voters[addrVoter].id > 0;
    }

    function voterCount() public view returns(uint) {
        return votersTracker;
    }

    function hasVoted(address addrVoter) public view returns (bool) {
        return voters[addrVoter].hasVoted;
    }

    /// Returns candidateId or 0 if not found
    function getIssueOf(uint candidateId) public view returns (uint) {
        require(candidateId > 0, "CandidateId must be greater than 0.");

        for (uint i = 1; i <= issuesTracker; i++) {
            uint c = issues[i].candidatesTracker;
            require(c > 0, "Warning: No Candidates.");
            for (uint j = 1; j <= c; j++) {
                if (issues[i].candidates[j].id == candidateId) {
                    return issues[i].id;
                }
            }
        }

        require(false, "Issue Not found");

        return 0;
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function appendUintToString(string inStr, uint v) private pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    event OnVoterAdded(uint id);
    event OnIssueAdded(uint id);
    event OnCandidateAdded(uint id, bytes32 name);
}
