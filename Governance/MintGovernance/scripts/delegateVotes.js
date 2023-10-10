const { ethers } = require("hardhat");

async function delegateVotes() {
  const [owner] = await ethers.getSigners();
  const MyToken = await ethers.getContractFactory("MyToken");

  const token = await MyToken.attach("0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91");
  
  await token.delegate(owner.address);

  console.log("Votes delegated to owner.");
}

delegateVotes().catch((error) => {

  console.error(error);
  process.exitCode = 1;

});


// Governor deployed to 0xaf741dc3d80bdA80029d1609eea0FBa944352771 
// Token deployed to 0xa7a3C61a5e475b756f65E267C0B2F4A74Dc42d91

