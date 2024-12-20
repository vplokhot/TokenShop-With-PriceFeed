const { configDotenv } = require("dotenv");

require("@nomicfoundation/hardhat-toolbox");
configDotenv();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      forking: {
        url: process.env.INFURA_URL,
      },
    },
  },
  mocha: {
    timeout: 100000000,
  },
};
