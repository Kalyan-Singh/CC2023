import { ethers } from "hardhat";
import {EscrowContract__factory,EscrowContract} from "../typechain-types";
import {account4,url} from "../secret.json";

export let escrow:EscrowContract;


export async function deployEscrow(){
    const providerBsc= new ethers.providers.JsonRpcProvider(url);
    const wallet= new ethers.Wallet(account4,ethers.provider)
    console.log("Deploying Escrow with account-",wallet.address);
    escrow=await new EscrowContract__factory(wallet).deploy();
    console.log("Escrow Deployed at-",escrow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.