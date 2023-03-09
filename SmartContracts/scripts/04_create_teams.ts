import { ethers } from "hardhat";
import {
  account4,
  url,
  account1,
  account2,
  account5,
  rinkeby,
} from "../secret.json";
import {
  address1,
  address2,
  rinkebyAddress,
  address4,
  address5,
} from "../secret.json";
import { abi } from "../artifacts/contracts/TournamentController.sol/TournamentController.json";
import {
  TournamentController,
  TournamentController__factory,
} from "../typechain-types";
import { BigNumber } from "ethers";

const tournamentControllerAddress =
  "0x01f7654afB282C73C71210C132D209D3D6e20f90";

const team1: TournamentController.TeamStruct = {
  name: "Phoenixes",
  members: [address1, rinkebyAddress],
  leader: address1,
};

const team2: TournamentController.TeamStruct = {
  name: "Dragons",
  members: [rinkebyAddress, address5],
  leader: address5,
};

const team3: TournamentController.TeamStruct = {
  name: "Unicorns",
  members: [address2, address4],
  leader: address2,
};

const team4: TournamentController.TeamStruct = {
  name: "Tigers",
  members: [address1, address2],
  leader: address2,
};

const team5: TournamentController.TeamStruct = {
  name: "Lions",
  members: [address4, rinkebyAddress],
  leader: address4,
};

const team6: TournamentController.TeamStruct = {
  name: "Wolves",
  members: [address5, address2],
  leader: address2,
};

const team7: TournamentController.TeamStruct = {
  name: "Eagles",
  members: [address1, address5],
  leader: address1,
};

const team8: TournamentController.TeamStruct = {
  name: "Sharks",
  members: [address4, address2],
  leader: address2,
};

const team9: TournamentController.TeamStruct = {
  name: "Panthers",
  members: [rinkebyAddress, address1],
  leader: rinkebyAddress,
};

const team10: TournamentController.TeamStruct = {
  name: "Bears",
  members: [address5, address4],
  leader: address5,
};

const team11: TournamentController.TeamStruct = {
  name: "Jaguars",
  members: [address2, rinkebyAddress],
  leader: rinkebyAddress,
};

const team12: TournamentController.TeamStruct = {
  name: "Wolverines",
  members: [address1, address4],
  leader: address4,
};

const team13: TournamentController.TeamStruct = {
  name: "Lynx",
  members: [address2, address5],
  leader: address5,
};

const teams = [
  team1,
  team2,
  team3,
  team4,
  team5,
  team6,
  team7,
  team8,
  team9,
  team10,
  team11,
  team12,
  team13,
];

async function insertTeams() {

  let tournamentController = TournamentController__factory.connect(
    tournamentControllerAddress,
    ethers.provider
  );
  let wallet1 = new ethers.Wallet(account1, ethers.provider);
  let wallet2 = new ethers.Wallet(account2, ethers.provider);
  let wallet3 = new ethers.Wallet(rinkeby, ethers.provider);
  let wallet4 = new ethers.Wallet(account4, ethers.provider);
  let wallet5 = new ethers.Wallet(account5, ethers.provider);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)); // helper function to wait for a specified amount of time

  let tx1 = await tournamentController.connect(wallet1).createTeam(team1);
  tx1.wait();
  console.log(tx1.hash);
  await wait(15000); // wait for 15 seconds

  let tx2 = await tournamentController.connect(wallet1).createTeam(team7);
  tx2.wait();
  console.log(tx2.hash);
  await wait(15000);

  // account2
  let tx3 = await tournamentController.connect(wallet2).createTeam(team3);
  tx3.wait();
  console.log(tx3.hash);
  await wait(15000);

  let tx4 = await tournamentController.connect(wallet2).createTeam(team4);
  tx4.wait();
  console.log(tx4.hash);
  await wait(15000);

  let tx5 = await tournamentController.connect(wallet2).createTeam(team6);
  tx5.wait();
  console.log(tx5.hash);
  await wait(15000);

  let tx13 = await tournamentController.connect(wallet2).createTeam(team8);
  tx13.wait();
  console.log(tx13.hash);
  await wait(15000);

  //rinkeby account
  let tx6 = await tournamentController.connect(wallet3).createTeam(team9);
  tx6.wait();
  console.log(tx6.hash);
  await wait(15000);

  let tx7 = await tournamentController.connect(wallet3).createTeam(team11);
  tx7.wait();
  console.log(tx7.hash);
  await wait(15000);

  // account4
  let tx8 = await tournamentController.connect(wallet4).createTeam(team12);
  tx8.wait();
  console.log(tx8.hash);
  await wait(15000);

  let tx9 = await tournamentController.connect(wallet4).createTeam(team5);
  tx9.wait();
  console.log(tx9.hash);
  await wait(15000);

  //account 5
  let tx10 = await tournamentController.connect(wallet5).createTeam(team2);
  tx10.wait();
  console.log(tx10.hash);
  await wait(15000);

  let tx11 = await tournamentController.connect(wallet5).createTeam(team10);
  tx11.wait();
  console.log(tx11.hash);
  await wait(15000);

  let tx12 = await tournamentController.connect(wallet5).createTeam(team13);
  tx12.wait();
  console.log(tx12.hash);
  await wait(15000);

  let tournamentId=BigNumber.from("1");
    console.log("Registering teams now...");

  let tx14 =await tournamentController.connect(wallet1).register(tournamentId,1);
  console.log(tx14.hash)
  await wait(15000);
  let tx15 =await tournamentController.connect(wallet1).register(tournamentId,2);
  console.log(tx15.hash);
  await wait(15000);

  // account 2
  let tx16 =await tournamentController.connect(wallet2).register(tournamentId,3);
  console.log(tx16.hash);
  await wait(15000);
  let tx17 =await tournamentController.connect(wallet2).register(tournamentId,4);
  console.log(tx17.hash);
  await wait(15000);
  let tx18 =await tournamentController.connect(wallet2).register(tournamentId,5);
  console.log(tx18.hash);
  await wait(15000);
  let tx19 =await tournamentController.connect(wallet2).register(tournamentId,6);
  console.log(tx19.hash);
  await wait(15000);

  //rinkeby
  let tx20 =await tournamentController.connect(wallet3).register(tournamentId,7);
  console.log(tx20.hash);
  await wait(15000);

  let tx21 =await tournamentController.connect(wallet3).register(tournamentId,8);
  console.log(tx21.hash);
  await wait(15000);

  // account 4
  let tx22 =await tournamentController.connect(wallet4).register(tournamentId,9);
  console.log(tx22.hash);
  await wait(15000);
  let tx23 =await tournamentController.connect(wallet4).register(tournamentId,10);
  console.log(tx23.hash);
  await wait(15000);

  // account 5
  let tx24 =await tournamentController.connect(wallet5).register(tournamentId,11);
  console.log(tx24.hash);
  await wait(15000);
  let tx25=await tournamentController.connect(wallet5).register(tournamentId,12);
  console.log(tx25.hash);
  await wait(15000);
  let tx26 =await tournamentController.connect(wallet5).register(tournamentId,13);
  console.log(tx26.hash);
  await wait(15000);

}




insertTeams().catch((error) => {
  console.log(error);
});
