
const hre = require("hardhat");

async function main() {
  

  const Streal = await hre.ethers.getContractFactory("Streal");
  const streal = await Streal.deploy();

  await streal.deployed();

  console.log(
    ` deployed to ${streal.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
