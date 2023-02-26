import React, { useContext, useState ,useEffect} from "react";
import { Box, Grid, GridItem, Heading, Text ,SimpleGrid} from "@chakra-ui/react";
import { AuthContext } from "@/context/auth";
import { subgraphClient } from "@/apollo";
import { useAccount } from "wagmi";
import { GET_MY_DATA } from "@/graphql";


const MyTournaments = () => {
  const [teams,setTeams]=useState();
  const [tournaments,setTournaments]=useState();
  const {address}=useAccount();
      useEffect(()=>{
      if(address){
        const getData=async()=>{
          const response= await  subgraphClient.query({
            query:GET_MY_DATA,
            variables:{
              input:address.toLowerCase(),
            },
            
          });
          const teams = response.data.players[0].team.map(teamObj => {
            const team = teamObj.team;
            const members = team.members.map(member => member.player);
            return {
              name: team.name,
              members: members
            };
          });
          const tournaments = response.data.players[0].team.reduce((tournaments, teamObj) => {
            const team = teamObj.team;
            const teamTournaments = team.tournaments.map(tournamentObj => tournamentObj.tournament);
            return [...tournaments, ...teamTournaments];
          }, []);
          const uniqueTournaments = Array.from(new Set(tournaments.map(t => t.id)))
  .map(id => tournaments.find(t => t.id === id));

          setTeams(teams);
          setTournaments(uniqueTournaments);
        }
        getData();
      }
    },[])

    
    return (
      <Box bg="#161819">
        <Box bg="#161819" color="white" py="4" px="8">
          <Heading size="md" mb="4">
            My Teams
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing="4">
            {teams &&
              teams.map((team, index) => (
                <Box
                  key={index}
                  bg="#FBAE30"
                  color="black"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Box bg="#161819" p="3">
                    <Heading size="sm" color="white">
                      {team.name}
                    </Heading>
                  </Box>
                  <Box p="3">
                    <Text fontWeight="bold" mb="2" color="#FBAE30">
                      Members:
                    </Text>
                    <ul>
                      {team.members.map((member, index) => (
                        <ul key={index}>
                          <Text>{member.id}</Text>
                        </ul>
                      ))}
                    </ul>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
    
        <Box bg="#161819" color="white" py="4" px="8" mt="8">
          <Heading size="md" mb="4">
            My Tournaments
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing="4">
            {tournaments &&
              tournaments.map((tournament, index) => (
                <Box
                  key={index}
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
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    );
    
    
};

export default MyTournaments;
