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

function CreateTournament() {
  const [tournamentInput, setTournamentInput] = useState({
    teamSizeLimit: "",
    maximumParticipants: "",
    matchMakerModule: "",
    totalPrize: "",
    prizeTokensAddress: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "teamSizeLimit" || name === "maximumParticipants" || name === "totalPrize") {
      value = parseInt(value);
    }

    setTournamentInput({
      ...tournamentInput,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    console.log(tournamentInput);
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
            children="Team size limit"
            color="white"
            fontWeight="bold"
            textTransform="capitalize"
            bg="#FBAE30"
          />
          <Input
            type="number"
            name="teamSizeLimit"
            value={tournamentInput.teamSizeLimit}
            onChange={handleOnChange}
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
            value={tournamentInput.maximumParticipants}
            onChange={handleOnChange}
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
            value={tournamentInput.matchMakerModule}
            onChange={handleOnChange}
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
            value={tournamentInput.totalPrize}
            onChange={handleOnChange}
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
            value={tournamentInput.prizeTokensAddress}
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

        <Button onClick={handleOnClick}>Create Tournament</Button>
      </Box>
    </Flex>
  );
}

export default CreateTournament;