const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function createProposal() {
  const [owner] = await ethers.getSigners();

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.attach("0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91");

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy("0xaf741dc3d80bdA80029d1609eea0FBa944352771");


  const tx = await governor.propose(
            ["0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91"],
            [0],
            [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
            "Give the owner more tokens!"
        );

        const receipt = await tx.wait();
        const event = receipt.events.find(x => x.event === 'ProposalCreated');
        const { proposalId } = event.args;

        await hre.network.provider.send("evm_mine");        
         console.log(proposalId);

         console.log("proposal created");


}

createProposal().catch((error) => {

  console.error(error);
  process.exitCode = 1;

});


// Governor deployed to 0xaf741dc3d80bdA80029d1609eea0FBa944352771 
// Token deployed to 0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91