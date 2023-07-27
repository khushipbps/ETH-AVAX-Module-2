// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    


    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function multiplyBalance(uint256 _multiple) public {
        assert(_multiple > 1);
        uint256 balanceToBeIncreased = balance*(_multiple-1);
        deposit(balanceToBeIncreased);
    }

    function divideBalance(uint256 _divider) public {
        assert(_divider > 1);
        assert(balance % _divider == 0);
        uint256 balanceToBeDecreased = balance/_divider*(_divider-1);
        withdraw(balanceToBeDecreased);
    }
    
}
