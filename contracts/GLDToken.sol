// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './AddrArrayLib.sol';

contract GLDToken is ERC20, Ownable {

	using AddrArrayLib for AddrArrayLib.Addresses;

	AddrArrayLib.Addresses trustedWhiteList;

    constructor() public ERC20("DAI TOKEN", "DAI") {
        _mint(msg.sender, 10000000);
    }

    function addWhiteList(address whiteList) public onlyOwner() {
        require(!trustedWhiteList.exists(whiteList), 'The sender address is already registered as a white list address');
    	trustedWhiteList.pushAddress(whiteList);
    }

	function removeWhiteList(address whiteList) public onlyOwner() {
	    require(trustedWhiteList.exists(whiteList), 'The sender address is not registered as a white list address');
		trustedWhiteList.removeAddress(whiteList);
	}

	function retrieveWhiteList() public view returns (address[] memory) {
        return trustedWhiteList.getAllAddresses();
    }

	
}