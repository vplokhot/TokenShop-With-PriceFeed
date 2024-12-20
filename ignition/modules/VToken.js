// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VTokenModule", (m) => {
  const initialOwner = m.getAccount(0);
  const vToken = m.contract("VToken", [initialOwner, "VToken", "VTK"]);

  return { vToken };
});
