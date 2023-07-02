// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PaymentCollection {
    mapping(address => uint256) public balances;

    event PaymentReceived(address indexed sender, uint256 amount);

    // payment function when user will query, he has to pay some fee
    function pay() public payable {
        require(msg.value > 0, "Invalid payment amount");
        balances[msg.sender] += msg.value;
        emit PaymentReceived(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
