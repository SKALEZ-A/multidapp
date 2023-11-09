
const hre = require("hardhat");

async function main() {
  

  const Vault = await hre.ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();

  await vault.deployed();

  console.log(
    ` deployed Vault to ${vault.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
