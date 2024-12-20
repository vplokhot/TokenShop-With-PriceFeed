require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/96cfe7e649f14ba09cdd7b651294b765",
      },
    },
  },
  mocha: {
    timeout: 100000000,
  },
};
