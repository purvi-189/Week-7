require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url:"https://polygon-mumbai.g.alchemy.com/v2/5wFAZT05FkKJbuRGUsiKtqnCZwVmorTQ",
      // url: process.env.ALCHEMY_GOERLI_URL,
      accounts: ["3db2399f1e5ad6cf43f37377f6595009dad0abd7e672041dac62a7a20e050fbc"]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
