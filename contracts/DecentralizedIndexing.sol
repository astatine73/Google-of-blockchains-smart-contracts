// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DecentralizedIndexing {
    uint public numNodes;
    mapping(address => bool) public nodes;
    mapping(bytes32 => string) public data;
    mapping(bytes32 => uint) public votes;

    mapping(uint => address) public add;
    uint public threshold = 100;

    constructor() {
        numNodes = 0;
    }

    function addNode(address node) public {
        nodes[node] = true;
        numNodes++;
    }

    function removeNode(address node) public {
        nodes[node] = false;
        numNodes--;
    }

    function indexData(bytes32 id, string memory value) public {
        require(nodes[msg.sender] == true, "Only nodes can index data.");
        data[id] = value;
    }

    function getData(bytes32 id) public view returns (string memory) {
        uint count = 0;
        for (uint i = 0; i < numNodes; i++) {
            if (nodes[add[i]]) {
                if (keccak256(bytes(data[id])) == keccak256(bytes(data[id]))) {
                    count += votes[id];
                }
            }
        }
        require(count >= threshold, "Data retrieval failed.");
        return data[id];
    }

    function vote(bytes32 id) public {
        require(nodes[msg.sender] == true, "Only nodes can vote.");
        votes[id]++;
    }

    function resetVotes(bytes32 id) public {
        require(nodes[msg.sender] == true, "Only nodes can reset votes.");
        votes[id] = 0;
    }

    function setThreshold(uint _threshold) public {
        require(nodes[msg.sender] == true, "Only nodes can set threshold.");
        threshold = _threshold;
    }
}
