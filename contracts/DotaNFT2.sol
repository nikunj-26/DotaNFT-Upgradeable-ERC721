// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DotaNFT.sol";

contract DotaNFT2 is DotaNFT {
    function test() public pure returns (string memory) {
        return "upgraded";
    }
}
