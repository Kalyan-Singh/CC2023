import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import {url} from "./secret.json";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
    bsctestnet:{
      url:url,
      chainId:97,
    }
}
};

export default config;
