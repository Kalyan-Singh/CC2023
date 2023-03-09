import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Button
} from "@chakra-ui/react";
import { useAccount,usePrepareContractWrite,useContractWrite,useContract,useProvider,useSigner } from "wagmi";
import { abi_tournamentController, matchMakerSe, tournamentController } from "@/helpers/Contracts";
import { ethers } from "ethers";


function CreateTournament() {
  const [tournamentInput, setTournamentInput] = useState();
  const [organizer,setOrganizer]=useState();
  const [rewardToken,setRewardToken]=useState();
  const [prizes,setPrizes]=useState();
  const [teamSize,setTeamSize]=useState();
  const [matchMakerModule,setMatchMakerModule]=useState(matchMakerSe);
  const[maxParticipants,setMaxParticipants]=useState();
  const{address}=useAccount();
  const {data:signer}=useSigner();
  const provider=useProvider();
  const contract = useContract({
    address:tournamentController,
    abi:abi_tournamentController,
    signerOrProvider:provider
  });


  const {config,error}=usePrepareContractWrite({
    address:tournamentController,
    abi:abi_tournamentController,
    functionName:'createTournament',
    args:[tournamentInput],
    overrides:{
      from:address,
      value:ethers.utils.parseEther('0'),
    }
  });

  const {write}=useContractWrite(config);
  useEffect(()=>{
    console.log("in useEffect-",tournamentInput)
    console.log(write);
    console.log("error",error);
    console.log(config)
    if(write && tournamentInput){
      write();
    }

  },[tournamentInput,write]);


  const handleOnClick = () => {
    let tournament={
      round:0,
      sizeLimit:teamSize,
      maxParticipants:maxParticipants,
      bracketType:ethers.utils.formatBytes32String("SE"),
      matchMaker:matchMakerModule,
      state:0,
      org:organizer,
      token:rewardToken,
      prizes:prizes
    }
    console.log("in handleClick-",tournament);
    setTournamentInput(tournament);
  };



  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="#161819"
    >
      <Box p={6} borderWidth="2px" borderColor="#FBAE30">
        <Flex alignItems="center" justifyContent="center">
          <Heading color="white" mb={6}>
            Create Tournament
          </Heading>
        </Flex>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Organization Name"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            name="organizationName"
            onChange={(e)=>{
              let org={
                name:e.target.value,
                address:address
              }
              setOrganizer(org)
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Team size limit"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            type="number"
            name="teamSizeLimit"
            onChange={(e)=>{
              setTeamSize(parseInt(e.target.value))
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Maximum Participants"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            type="number"
            name="maximumParticipants"
            onChange={(e)=>{
              setMaxParticipants(parseInt(e.target.value))
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="MatchMaker Module"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            name="matchMakerModule"
            value={matchMakerSe}
            onChange={(e)=>{
              setMatchMakerModule(e.target.value);
            }
              }
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Prize(total)"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            type="number"
            name="totalPrize"
            onChange={(e)=>{
              let prize={
                participantPool:parseInt(e.target.value),
                viewerPool:0,
                organizerFee:0,
                totalPool:parseInt(e.target.value)
              }
              setPrizes(prize)
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="PrizeToken's Address"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            name="prizeTokensAddress"
            onChange={(e)=>{
              let token={
                tokenAddress:e.target.value,
                chain:"Chapel"
              }
              setRewardToken(token);
            }}
            
            placeholder="0x..."
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <Button onClick={handleOnClick}>Create Tournament</Button>
      </Box>
    </Flex>
  );
}

export default CreateTournament;