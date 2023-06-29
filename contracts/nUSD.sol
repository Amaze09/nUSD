// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title nUSD - ETH backed stablecoin
/// @notice Not audited, just for learning purpose.

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract NUSD is ERC20, ERC20Burnable {

    AggregatorV3Interface internal dataFeed;
    
    //Adding data feed address for ETH/USD pair on Sepolia testnet

    constructor() ERC20("nUSD", "nUSD") {

        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    receive() external payable {

        deposit();
    }

    //mints some amount of nUSD based on business logic

    function deposit() public payable {
        
        uint256 price =  uint(getLatestPrice());
        uint256 amount = msg.value * price;
        _mint(msg.sender, amount / 2);
    }

    //burns nUSD from users wallet and returns some amount of user's deposited ETH
    
    function reedem(uint256 amount) external {

        require(balanceOf(msg.sender) >= amount, "deposit first, withdraw later");
        _burn(msg.sender, amount);
        uint256 returnAmount = (amount / 2) / uint(getLatestPrice());
        (bool success, ) = msg.sender.call{ value: returnAmount }("");
        require(success, "Transfer failed.");

    }

    // gets the latest price of ETH in USD

    function getLatestPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer / 10**8;
    }


}