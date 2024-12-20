const { expect } = require("chai");
const { ethers, ignition } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deployModule } = require("@nomicfoundation/hardhat-ignition/helpers");

const vTokenModule = require("../ignition/modules/VToken");
const { buildModule } = require("@nomicfoundation/ignition-core");

describe("VToken Deployment", function () {
  let vToken;
  let owner;

  //   async function deployFixture() {
  //     const { vToken } = await deployModule(vTokenModule);

  //     return { address: vToken.address };
  //   }

  //   beforeEach(async function () {
  //     // Get signers
  //     [owner] = await ethers.getSigners();

  //     // Deploy the token
  //     const VTokenContract = await ethers.getContractFactory("VToken");
  //     vToken = await VTokenContract.deploy(owner.address, "VToken", "VTK");
  //   });

  it("should have the correct address", async function () {
    const deployment = await ignition.deploy(vTokenModule);
    console.log(deployment, " deployment ");
    expect(deployment.vToken.target).to.equal(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
  });
  //   it("should have the correct symbol", async function () {
  //     const symbol = await vToken.symbol();
  //     expect(symbol).to.equal("VTK");
  //   });

  //   it("should have the correct name", async function () {
  //     const name = await vToken.name();
  //     expect(name).to.equal("VToken");
  //   });
});
