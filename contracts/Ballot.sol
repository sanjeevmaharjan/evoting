pragma solidity >=0.4.22 <0.6.0;

import "./base/Ownable.sol";
import "./logic/Voting.sol";
import "./lib/DateTime/DateTime.sol";
import "./utils/Address.sol"; 

import "./interfaces/ERC1202.sol";

contract Ballot is Ownable, ERC1202, Voting {
    using Address for address;

    bool private isVotingOpen;

    // uint private begin;
    // uint private expiry;

    // DateTime private dateTimeService = new DateTime();

    function registerVoter(address addrVoter, bytes16 newName, bytes32 newPK) public onlyOwner {
        addVoter(addrVoter, newName, newPK);
    }

    function registerIssue(bytes16 newName, bytes32 newDescription) public onlyOwner {
        addIssue(newName, newDescription);
    }

    function registerCandidate(uint issueId, bytes16 newName, bytes32 newDescription) public onlyOwner {
        addCandidate(issueId, newName, newDescription);
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

    function issueDescription() public view returns (bytes32) {
        return getIssueDescription(1);
    }

    function availableOptions() public view returns (uint[] memory options) {
        options = getOptions();
    }

    function optionDescription(uint option) public view mustBeCandidate(option) returns (bytes32 desc) {
        desc = getOptionDescription(option);
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
