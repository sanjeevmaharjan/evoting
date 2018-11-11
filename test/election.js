var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    var ins;

    it("initializes with two candidates", function() {
        return Election.deployed().then(function(i) {
            return i.candCount();
        }).then (function(count) {
            assert.equal(count, 2);
        });
    });

    it("initialized with correct values", function() {
        return Election.deployed().then(function(i) {
            ins = i;
            return ins.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Test1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct vote count");
            return ins.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Test2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct vote count");
        });
    });
});