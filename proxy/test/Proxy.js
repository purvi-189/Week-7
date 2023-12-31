const {loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");

describe("Proxy", function () {

  async function deployFixture() {

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    return { proxy, logic1, logic2 };
  }

    it("Should work with logic 1", async function () {
      const { proxy, logic1 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await logic1.x() , 0);

      await proxy.changeX(18);
      assert.equal(await logic1.x() , 18 ); 


    });

    // it("Should work with upgrades", async function () {
    //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);

    // });

    
});
