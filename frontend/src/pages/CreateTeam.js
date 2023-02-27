import React, { useState } from "react";
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

function CreateTeam() {
  const [teamInput, setTeamInput] = useState({
    teamName: "",
    memberAddresses: [],
    leaderAddress: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    // If the name is "memberAddresses", replace all whitespace with nothing
    if (name === "memberAddresses") {
      value = value.replace(/\s/g, "");
    }

    setTeamInput({
      ...teamInput,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    console.log(teamInput);
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
            value={teamInput.teamName}
            onChange={handleOnChange}
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
            value={teamInput.memberAddresses}
            onChange={handleOnChange}
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
            value={teamInput.leaderAddress}
            onChange={handleOnChange}
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