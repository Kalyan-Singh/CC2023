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


function Rgister() {

    const [teamId,setTeamId]=useState();
    const [tournamentId,setTournamentId]=useState();
    const [clicked,setClicked]=useState();

    const {config,error}=usePrepareContractWrite({
        address:tournamentController,
        abi:abi_tournamentController,
        functionName:'register',
        args:[tournamentId,teamId]
    });

    const {write}=useContractWrite(config);

    const handleOnClick =()=>{
        setClicked(true);
    }

    useEffect(()=>{
        if(write && tournamentId && teamId){
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
            Register
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
            children="Team Id"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg='#FBAE30'
          />
          <Input
            name="teamId"
            onChange={(e)=>{
                setTeamId(parseInt(e.target.value));
            }}
            placeholder="Team Id"
            bg="gray.700"
            borderColor="#FBAE30"
            color="white"
          />
        </InputGroup>

        <Button onClick={handleOnClick}>Register</Button>
      </Box>
    </Flex>  )
}

export default Rgister