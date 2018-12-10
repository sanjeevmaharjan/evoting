/**
 * - Single issue
 * - Single selection
 *
 * Discussion:
 *   1. Each address has a weight determined by other input decided by the actual implementation
 *      which is suggested to be set upon the initialization
 *   2. Is there certain naming convention to follow?
 */
interface ERC1202 {

    // Vote with an option. The caller needs to handle success or not
    function vote(uint option) external returns (bool success);
    
    // Either Open or not
    function setStatus(bool isOpen) external returns (bool success);

    // What the Vote is for
    function issueDescription() external view returns (bytes16 desc);
    
    // Who the Candidates are (index of them)
    function availableOptions() external view returns (uint[] options);
    
    // Details about Candidates
    function optionDescription(uint option) external view returns (bytes16 desc);
    
    // unused 
    function ballotOf(address addr) external view returns (uint option);
    function weightOf(address addr) external view returns (uint weight);
    
    // Check if Open
    function getStatus() external view returns (bool isOpen);
    
    // Get count
    function weightedVoteCountsOf(uint option) external view returns (uint count);
    
    // How does a candidate win the election?
    function winningOption() external view returns (uint option);

    // events
    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
}