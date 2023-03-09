import { ethers } from "hardhat";
import {MyToken__factory,MyToken} from "../typechain-types";
import {account4,url} from "../secret.json";


export let mtk:MyToken;
export let mtkAddress:string;


export async function deployMtk() {
  const providerBsc= new ethers.providers.JsonRpcProvider(url);
  const wallet= new ethers.Wallet(account4,ethers.provider)
  console.log("Deploying with account",wallet.address);
  mtk= await new MyToken__factory(wallet).deploy();
  if(mtk.address){
    mtkAddress=mtk.address;
  }
  console.log("My token contract deployed at-",mtk.address);
}