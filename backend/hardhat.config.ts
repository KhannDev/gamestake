require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.24",
  networks: {
    intersectTestnet: {
      url: "https://subnets.avax.network/pearl/testnet/rpc", // Intersect Testnet RPC
      chainId: 1612, // Intersect Testnet Chain ID
      accounts: [process.env.PrivateKey],
    },
  },
};
