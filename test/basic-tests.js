const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("nUSD Contract", function () {

    let nUSD;
    let contractAddress;
    let owner;

    beforeEach(async () => {
        [Owner] = await ethers.getSigners();
        owner = Owner;
        let NUSD = await ethers.getContractFactory("NUSD")
        nUSD = await NUSD.deploy()
        await nUSD.deployed()
        console.log(nUSD.address);
        contractAddress = nUSD.address;
      })


    it("Deploy conditions", async function() {
        expect(Number(await nUSD.getLatestPrice())).to.be.not.null;
        console.log("Eth price: ",Number(await nUSD.getLatestPrice()));
    })

    it("Checking if the contract can accept ether",async() => {
        
      const amountToSend = ethers.utils.parseEther('1.0');
      await owner.sendTransaction({
        to: contractAddress,
        value: amountToSend,
      });
      expect(Number(await ethers.provider.getBalance(contractAddress))).to.equal(1000000000000000000)
    })

    it("Checking the deposit function",async() => {

        const balanceInitial = Number(await nUSD.balanceOf(owner.address))
        console.log("User's initial nUSD balance: ",balanceInitial)

        const amountToSend = ethers.utils.parseEther('1.0');
        await nUSD.connect(owner).deposit({ value: amountToSend });
        const ethPrice = Number(await nUSD.getLatestPrice())
        const calculatedAmount = (amountToSend.mul(ethPrice))/2
        console.log("Calculated nUSD to be minted: ",calculatedAmount)

        const balanceFinal = Number(await nUSD.balanceOf(owner.address))
        console.log("User's final nUSD balance: ",balanceFinal)
        expect(calculatedAmount).to.equal(balanceFinal)
    })    

    it("Checking the reedem function",async() => {

      const amountToSend = ethers.utils.parseEther('1.0');
      await nUSD.connect(owner).deposit({ value: amountToSend });
      const balanceInitial = await nUSD.balanceOf(owner.address)
      console.log("User's initial nUSD balance: ",balanceInitial)

      const initialETHBalance = await ethers.provider.getBalance(nUSD.address)
      console.log("Contract's initial ETH balance: ",initialETHBalance)

      await nUSD.connect(owner).reedem(balanceInitial);

      const ethPrice = Number(await nUSD.getLatestPrice())
      const amount = (balanceInitial.div(ethPrice))/2
      console.log("Calculated ETH amount",amount)

      const balanceFinal = await nUSD.balanceOf(owner.address)
      console.log("User's final nUSD balance: ",balanceFinal)
      
      finalETHBalance = await ethers.provider.getBalance(nUSD.address)
      console.log("Contract's final ETH balance: ",finalETHBalance)
      
      expect(Number(initialETHBalance)).to.equal(Number(finalETHBalance) + Number(amount))

    })        


})    