
const hre = require("hardhat");

async function main() {
  

  const ICO = await hre.ethers.getContractFactory("ICO");
  const ico = await ICO.deploy(); 

  await ico.deployed();

  console.log(
    ` deployed ico to ${ico.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
