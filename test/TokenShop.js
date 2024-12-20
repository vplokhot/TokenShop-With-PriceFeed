const { expect } = require("chai");
const { ethers, ignition } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const tokenShopModule = require("../ignition/modules/TokenShop");
const { buildModule } = require("@nomicfoundation/ignition-core");

describe("TokenShop Deployment", function () {
  it("should get a non zero price for ETH", async function () {
    const { vToken, tokenShop } = await ignition.deploy(tokenShopModule);
    const ethPrice = await tokenShop.getChainlinkDataFeedLatestAnswer();
    // const price = ethPrice.toString();
    // console.log(ethPrice, " eth price ");
    expect(ethPrice).to.be.greaterThan(0);
  });
  it("should calculate tokenAmount", async function () {
    const [owner] = await ethers.getSigners();
    const { tokenShop } = await ignition.deploy(tokenShopModule);
    const tokenAmount = await tokenShop.tokenAmount(ethers.parseEther("1"));
    console.log(ethers.formatUnits(tokenAmount, 18), " tokenAmount ");
    expect(tokenAmount).to.be.greaterThan(0);
  });
  it("should mint vTokens for buyers", async function () {
    const [owner, buyer] = await ethers.getSigners();
    const { vToken, tokenShop } = await ignition.deploy(tokenShopModule);
    expect(await vToken.balanceOf(buyer.address)).to.be.equal(0);
    await buyer.sendTransaction({
      to: tokenShop.target,
      value: ethers.parseEther("5"),
    });
    expect(await vToken.balanceOf(buyer.address)).to.be.greaterThan(0);
    // expect(await vToken.balanceOf(buyer.address).to.equal(0));
  });
  it("should allow TokenShop owner to withdraw ETH", async function () {
    const [owner, buyer] = await ethers.getSigners();
    const { vToken, tokenShop } = await ignition.deploy(tokenShopModule);
    console.log(
      await ethers.provider.getBalance(owner.address),
      " initial owner balance"
    );
    expect(await ethers.provider.getBalance(tokenShop.target)).to.be.equal(0);
    const purchaseValue = ethers.parseEther("5");
    await buyer.sendTransaction({
      to: tokenShop.target,
      value: purchaseValue,
    });
    expect(await ethers.provider.getBalance(tokenShop.target)).to.be.equal(
      purchaseValue
    );
    await tokenShop.connect(owner).withdraw();
    console.log(
      await ethers.provider.getBalance(owner.address),
      " post withdraw owner balance"
    );
    expect(
      await ethers.provider.getBalance(owner.address)
    ).to.changeEtherBalance(owner, purchaseValue);
  });
});
