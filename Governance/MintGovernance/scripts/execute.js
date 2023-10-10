const { ethers } = require("hardhat");
const { assert } = require("chai");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function execute() {
  const [owner] = await ethers.getSigners();

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.attach("0xaf741dc3d80bdA80029d1609eea0FBa944352771");

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.attach("0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91");


  await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );

  console.log("Proposal executed");

}
execute().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});