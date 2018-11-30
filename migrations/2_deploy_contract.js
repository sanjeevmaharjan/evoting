var Owned = artifacts.require('./owned.sol');
var Voting = artifacts.require('./voting.sol');
var Ballot = artifacts.require("./ballot.sol");

module.exports = function(deployer) {
  deployer.deploy(Owned);
  deployer.deploy(Voting);
  deployer.deploy(Ballot);
};
