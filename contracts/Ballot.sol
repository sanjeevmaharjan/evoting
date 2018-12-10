pragma solidity >=0.4.22 <0.6.0;

import "./base/Ownable.sol";
import "./logic/Voting.sol";
import "./lib/DateTime/DateTime.sol";
import "./utils/Address.sol";

contract Ballot is Ownable, Voting {
    using Address for address;

    bool private isVotingOpen;

    // uint private begin;
    // uint private expiry;

    // DateTime private dateTimeService = new DateTime();

    constructor() public {
        registerIssue('PM', 'The Election for the post of Prime Minister');
        registerCandidate(1, 'Test Test', 'This is a test Description');
    }

    function registerVoter(address addrVoter, bytes16 newName, bytes32 newPK) public onlyOwner {
        addVoter(addrVoter, newName, newPK);
    }

    function registerIssue(bytes16 newName, string newDescription) public onlyOwner {
        addIssue(newName, stringToBytes32(newDescription));
    }

    function registerCandidate(uint issueId, bytes16 newName, string newDescription) public onlyOwner returns (uint){
        return addCandidate(issueId, newName, stringToBytes32(newDescription));
    }

    // Override interface ERC1202 functions
    function vote(uint option) public mustBeVoter(msg.sender) mustBeCandidate(option)
                        returns (bool success) {
        if (hasVoted(msg.sender)) {
            return false;
        }

        uint issueId = getIssueOf(option);

        require(issueId > 0, "Only Valid Post can be Voted.");

        emit OnVote(msg.sender);

        return vote(msg.sender, issueId, option);
    }

    function setStatus(bool isOpen) public onlyOwner
                        returns (bool success) {
        isVotingOpen = isOpen;

        emit OnStatusChange(isVotingOpen);

        return true;
    }

    function availableIssues() public view returns (uint) {
        return getIssueCount();
    }

    function issueDescription(uint issueId) public view returns (uint id, bytes16 name, bytes32 description, uint candidatesTracker) {
        (id, name, description, candidatesTracker) = getIssue(issueId);
    }

    function optionDescription(uint optionId) public view mustBeCandidate(optionId) returns (uint id, bytes16 name, bytes32 description, uint256 voteCount) {
        (id, name, description, voteCount) = getOption(optionId);
    }

    function getStatus() public view returns (bool isOpen) {
        return isVotingOpen;
    }

    function voteCountsOf(uint option) public view returns (uint count) {
        return getVoteCountOf(option);
    }

    function winningOption() public view returns (uint option) {
        option = getWinner(1);
    }

    event OnVote(address indexed _from);
    event OnStatusChange(bool newIsOpen);
}
