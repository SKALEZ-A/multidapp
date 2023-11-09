require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATEKEY]
    },
    
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCANKEY
  },

  
};
