import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/auth";
import { subgraphClient } from "@/apollo";
import { useAccount } from "wagmi";
import { GET_MY_DATA } from "@/graphql";
import NextLink from "next/link";

const tournaments = () => {
  const [tournaments, setTournaments] = useState();
  const { address } = useAccount();
  useEffect(() => {
    if (address) {
      const getData = async () => {
        const response = await subgraphClient.query({
          query: GET_MY_DATA,
          variables: {
            input: address.toLowerCase(),
          },
        });
        const tournaments = response.data.players[0].team.reduce(
          (tournaments, teamObj) => {
            const team = teamObj.team;
            const teamTournaments = team.tournaments.map(
              (tournamentObj) => tournamentObj.tournament
            );
            return [...tournaments, ...teamTournaments];
          },
          []
        );
        const uniqueTournaments = Array.from(
          new Set(tournaments.map((t) => t.id))
        ).map((id) => tournaments.find((t) => t.id === id));

        setTournaments(uniqueTournaments);
      };
      getData();
    }
  }, []);

  return (
    <Box bg="#161819">
      <Box bg="#161819" color="white" py="4" px="8" mt="8">
        <Heading size="md" mb="4">
          My Tournaments
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="4">
          {tournaments &&
            tournaments.map((tournament, index) => (
              <Link
                as={NextLink}
                href={`tournaments/${tournament.id}`}
                key={index}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  bg="#FBAE30"
                  color="black"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Box bg="#161819" p="3">
                    <Heading size="sm" color="white">
                      Tournament {index + 1}
                    </Heading>
                  </Box>
                  <Box p="3">
                    <Text fontWeight="bold" mb="2" color="#161819">
                      Organizer:
                    </Text>
                    <Text>{tournament.organizer}</Text>
                    <Text fontWeight="bold" mb="2" mt="4" color="#161819">
                      Total Prize:
                    </Text>
                    <Text>{tournament.totalPrize}</Text>
                  </Box>
                </Box>
              </Link>
            ))}
        </SimpleGrid>
      </Box>
      <Flex justifyContent='center'>
      <Button
        bg={"#FBAE30"}
        size="lg"
        textColor={"#F6F4F5"}
        _hover={{ color: "gray.500" }}
      >
        <Link
          as={NextLink}
          _hover={{ textDecoration: "none" }}
          href="/UpdateTournamentState"
        >
          Update Tournament
        </Link>
      </Button>
      </Flex>

    </Box>
  );
};

export default tournaments;
