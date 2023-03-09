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
import { tournamentController,abi_tournamentController } from "@/helpers/Contracts";
import { usePrepareContractWrite,useContractWrite } from "wagmi";




function CreateTeam() {
  const [teamInput, setTeamInput] = useState();
  const [members,setMembers]=useState();
  const [teamName,setTeamName]=useState();
  const [leader,setLeader]=useState();



  const {config,error}=usePrepareContractWrite({
    address:tournamentController,
    abi:abi_tournamentController,
    functionName:'createTeam',
    args:[teamInput]
  });

  const {write}=useContractWrite(config);


  useEffect(()=>{
    if(write && teamInput ){
      write();
    }
  },[teamInput]);


  



  const handleOnClick = () => {
    console.log(members);
    console.log(teamName);
    console.log(leader);
    const team={
      name:teamName,
      members:members,
      leader:leader
    }
    setTeamInput(team);
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="#161819"
    >
      <Box p={6} borderWidth="2px" borderColor="#FBAE30">
        <Flex alignItems='center' justifyContent='center'>
          <Heading color="white" mb={6}>
            Create Team
          </Heading>
        </Flex>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Team Name"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="teamName"
            onChange={(e)=>{
              setTeamName(e.target.value)
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Member addresses"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="memberAddresses"
            onChange={(e)=>{
              setMembers(e.target.value.split(','));
            }}
            placeholder="0x...,0x..."
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <InputGroup mb={5}>
          <InputLeftAddon
            children="Leader address"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="leaderAddress"
            onChange={(e)=>{
              setLeader(e.target.value);
            }}
            placeholder="0x..."
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <Text color="white" mb={4}>
          <strong>Note:</strong> For empty fields we will randomly generate
          values.
        </Text>

        <Button onClick={handleOnClick}>Create Team</Button>
      </Box>
    </Flex>
  );
}

export default CreateTeam;