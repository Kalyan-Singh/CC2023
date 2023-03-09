import React,{useEffect, useState} from 'react'
import {usePrepareContractWrite,useContractWrite} from "wagmi";
import {tournamentController,abi_tournamentController} from "@/helpers/Contracts";
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


function UpdateTournamentState() {

    const [tournamentId,setTournamentId]=useState();
    const [round,setRound]=useState();
    const [clicked,setClicked]=useState(false);

    const {config,error}=usePrepareContractWrite({
        address:tournamentController,
        abi:abi_tournamentController,
        functionName:'updateTournamentState',
        args:[tournamentId,round]
    });

    const {write}=useContractWrite(config);

    const handleOnClick =()=>{
        setClicked(!clicked);
    }

    useEffect(()=>{
      console.log(tournamentId)
        if(write && tournamentId && round){
            write();
        }
    },[clicked])


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
            Update Tournament State
          </Heading>
        </Flex>

        <InputGroup mb={5}>
          <InputLeftAddon
            children='Tournament Id'
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="tournamentId"
            placeholder="tournament Id"
            onChange={(e)=>{
                setTournamentId(parseInt(e.target.value));
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>
        <InputGroup mb={5}>
          <InputLeftAddon
            children='Round Number'
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="roundNumber"
            placeholder="Next Round"
            onChange={(e)=>{
                setRound(parseInt(e.target.value));
            }}
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>


        <Button onClick={handleOnClick}>Update</Button>
      </Box>
    </Flex>  )
}

export default UpdateTournamentState;