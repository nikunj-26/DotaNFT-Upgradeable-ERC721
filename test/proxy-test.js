const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("ERC721 Upgradeable", function () {
    it("Should deploy an upgradeable ERC721 Contract", async function () {
        const DotaNFT = await ethers.getContractFactory("DotaNFT");
        const DotaNFT2 = await ethers.getContractFactory("DotaNFT2");

        // Deploy DotaNFT as a UUPS Proxy Contract
        let proxyContract = await hre.upgrades.deployProxy(DotaNFT, {
            kind: "uups",
        });
        const [owner] = await ethers.getSigners();
        const ownerOfToken1 = await proxyContract.ownerOf(1);

        expect(ownerOfToken1).to.equal(owner.address);

        // Deploy DotaNFT2 as an upgrade to DotaNFT
        proxyContract = await hre.upgrades.upgradeProxy(
            proxyContract,
            DotaNFT2
        );
        // Verify it has been upgraded
        expect(await proxyContract.test()).to.equal("upgraded");
    });
});
