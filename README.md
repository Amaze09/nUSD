# nUSD (ETH backed stablecoin)

nUSD is an ETH backed coin, somewhat like WETH but with one basic difference.
WETH's minting and burning process is proportional to the amount of ETH you deposit/ withdraw from the contract, and in the case of nUSD minting and burning depends on both, ETH amount you deposit/withdraw and price of ETH (in USD) at the time of minting/burning.

### Note 

Instead of creating UI, I have used https://github.com/adrianmcli/eth95. 
Have been using this UI generator from some time and faced no issues.

### Assumption

User himself tries to reedem ETH, like no third-party is trying to redeem on behalf of the user (approve(), burnFrom() I believe these 2 functions explain the assumption).

## Usage 

1. Add Sepolia RPC URL and account private key in .env

2. Install dependencies using `npm i`

3. Compile the contract using `npx hardhat compile`

4. Deploy the contract using `npx hardhat run scripts/deploy.js --network <network-name>`

5. Generate UI using the command `eth95 ./artifacts/contracts/nUSD.sol`

6. Copy the deployed contract address logged in console after step 4 and paste it in the UI.

7. Connect your metamask and interact with the contract :) 

Ensure your accounts have sufficient eth to deploy and interact.

## Testing 

To run the basic test cases run `npx hardhat test test/basic-tests.js`





