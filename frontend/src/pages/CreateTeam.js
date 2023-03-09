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
import { PROFILE_BY_HANDLE } from "@/graphql";
import { apolloClient } from "@/apollo";



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


  



  const handleOnClick = async () => {
    console.log(members);
    console.log(teamName);
    console.log(leader);
    let nMembers = [];
    let nLeader;
  
    for (const member of members) {
      const res = await apolloClient.query({
        query: PROFILE_BY_HANDLE,
        variables: {
          handle: member,
        },
      });
      console.log(res);
      if (member == leader) nLeader=res.data.profileByHandle.owner.address;
      nMembers.push(res.data.profileByHandle.owner.address);
    }
  
    setMembers(nMembers);
  
    const team = {
      name: teamName,
      members: nMembers, // use the updated array of member addresses
      leader: nLeader,
    };
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