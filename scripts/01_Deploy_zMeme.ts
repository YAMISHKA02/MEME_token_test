import { ethers } from "hardhat";
import {DeployFunction} from 'hardhat-deploy/types';
import { network } from "hardhat"




const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments, getChainId }) => {
  
  const { deploy, log } = deployments
  const [ deployer ] = await ethers.getSigners()

  const supply = 1000000000n * 10n ** 18n

  console.log('Deploying token...')

  let contract
    network.name == "hardhat" ?  
      contract = await deploy("PepeToken", {
        from: deployer.address,
        args: [supply],
        log: true,
      })
    : contract = await deploy("PepeToken", {
      from: deployer.address,
      args: [supply],
      log: true,
      waitConfirmations:10,
    })

    console.log('deployed on network: '+ network.name)
}

export default deployFunction
deployFunction.tags = [`all`, `token`]