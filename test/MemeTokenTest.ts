import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Address } from "cluster";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { BigNumberish} from "ethers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { exec } from "child_process";
import { PepeToken, PepeToken__factory } from "../typechain-types";

describe("MemeTokenFlow", function () {
  let Deployer: SignerWithAddress
  let User: SignerWithAddress
  let UniswapV2Pair: SignerWithAddress
  let Meme: PepeToken__factory
  let meme: PepeToken


  before(async ()=>{
    [Deployer,User,UniswapV2Pair] = await ethers.getSigners()
    
    await deployments.fixture([`all`])

    meme = await ethers.getContract("PepeToken", Deployer)
  })
  it("Should to deploy",async () => {
    console.log('[Total Supply]',await meme.totalSupply())
    console.log('[Owner]', await meme.owner())
  })
  it("Should to transfer only from owner and to owner",async () => {
    await meme.transfer(User.address, 1000)
    expect(await meme.balanceOf(User.address)).equal(1000)
    await expect(meme.connect(User).transfer(UniswapV2Pair.address, 1000)).to.be.revertedWith('trading is not started')
    await meme.connect(User).transfer(Deployer.address, 1000)
  })
 
  

})

