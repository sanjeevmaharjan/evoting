pragma solidity >=0.4.22 <0.6.0;

/**
 * - Single issue
 * - Single selection
 *
 * Discussion:
 *   1. Each address has a weight determined by other input decided by the actual implementation
 *      which is suggested to be set upon the initialization
 *   2. Is there certain naming convention to follow?
 *
 * Specilization for Evoting: (Modified by Sanjeev Maharjan)
 *   1. Weight of everyone is considered equal
 *   2. issue represents what position the voting is organized for
 *   3. options refer to the election candidates.
 */
interface ERC1202 {

    // Vote with an option. The return specifies success or not
    function vote(uint option) external returns (bool success);

    // Set if voting is open or closed
    function setStatus(bool isOpen) external returns (bool success);

    // Get description of what the voting is for
    function issueDescription() external view returns (bytes32 desc);

    // Get List of available options to vote
    function availableOptions() external view returns (uint[] memory options);

    // Get Description of the options to vote
    function optionDescription(uint option) external view returns (bytes32 desc);

    // Check if the voting is open or not
    function getStatus() external view returns (bool isOpen);

    // Get Vote Count of an option
    function voteCountsOf(uint option) external view returns (uint count);

    // The logic for getting the winning option
    function winningOption() external view returns (uint option);

    // unused functions
    // function ballotOf(address addr) external view returns (uint option);
    // function weightOf(address addr) external view returns (uint weight);

    // events
    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
}
