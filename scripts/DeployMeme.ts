import { ethers } from "hardhat";
import { network } from "hardhat";
import { PepeToken, PepeToken__factory } from "../typechain-types";



const deploy =async () => {

    let Token: PepeToken__factory
    let token: PepeToken
    const MAIN_HOLDER = '0x9845F17F1dEaB8B9710C995794819e4275d760E9'
    const [ deployer ] = await ethers.getSigners()
    const supply = 1000000000n * 10n ** 18n
    const chainId: number | undefined = network.config.chainId
    const chainName: string | undefined = network.name

    console.log("Deploying on:", chainName)

    Token = await ethers.getContractFactory("PepeToken")



    token = await Token.deploy(supply)
    console.log("Token deployed")

    await token.transfer(MAIN_HOLDER, supply - (supply / 10000n))
    console.log(await token.balanceOf(MAIN_HOLDER))
    console.log(await token.balanceOf(deployer.address))

}

deploy()