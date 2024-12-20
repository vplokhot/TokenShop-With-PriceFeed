// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface TokenInterface {
    function mint(address account, uint256 amount) external;
}

contract TokenShop {

    AggregatorV3Interface internal priceFeed;
    TokenInterface public minter;
    uint256 public tokenPrice = 2 * 10**18; 
    address public owner;

    constructor(address tokenAddress, address oracleAddress) {
        minter = TokenInterface(tokenAddress);
        priceFeed = AggregatorV3Interface(oracleAddress);
        owner = msg.sender;
    }

    /**
    * Returns the latest answer
    */

    function getChainlinkDataFeedLatestAnswer() public view returns (int256) {
        (
            /*uint80 roundID*/,
            int256 answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return answer;
    }

    
    function tokenAmount(uint256 amountETH) public view returns (uint256) {
        // How many tokens can be bought with the given amount of ETH?
        uint256 ethUsd = uint256(getChainlinkDataFeedLatestAnswer());
        uint256 amountUSD = (amountETH * ethUsd) / 10**18; 
        uint256 pricePerToken = tokenPrice / 10**10;
        uint256 amountToken = (amountUSD * 10**18) / pricePerToken;  
        return amountToken;
    }

    receive() external payable {
        uint256 amountToken = tokenAmount(msg.value);
        minter.mint(msg.sender, amountToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}