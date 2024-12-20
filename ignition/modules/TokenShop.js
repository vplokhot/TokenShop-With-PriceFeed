// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { configDotenv } = require("dotenv");
configDotenv();
module.exports = buildModule("TokenShop", (m) => {
  const initialOwner = m.getAccount(0);
  const vToken = m.contract("VToken", [initialOwner, "VToken", "VTK"]);

  const mainnetChainlinkDataFeed = process.env.PRICE_FEED_ETHUSD_MAINNET;
  const tokenShop = m.contract("TokenShop", [vToken, mainnetChainlinkDataFeed]);

  // Transfer ownership of vToken to the TokenShop contract so that it can mint vTokens for buyers.
  m.call(vToken, "transferOwnership", [tokenShop]);

  return { vToken, tokenShop };
});
