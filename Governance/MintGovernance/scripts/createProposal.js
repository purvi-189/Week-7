const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;

async function proposalCreation() {
  const [owner] = await ethers.getSigners();
  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.attach("0xaf741dc3d80bdA80029d1609eea0FBa944352771");

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.attach("0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91");

  const tx = await governor.propose(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    "Give the owner more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find(x => x.event === 'ProposalCreated');
  const { proposalId } = event.args;
  console.log("Proposal created with ID:", proposalId.toString());

}
proposalCreation().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});