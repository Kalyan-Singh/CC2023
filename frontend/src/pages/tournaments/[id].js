import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { subgraphClient } from "@/apollo";
import { getTournamentDetail } from "@/graphql";
import { ethers } from "ethers";

import { Bracket, RoundProps } from "react-brackets";
import { LoadingOverlay } from "@/helpers";

// const teamNames = ["Team A", "Team B", "Team C", "Team D"];
// const numRounds = 2;
// const roundsPerRound = 2;

// const rounds = [];

// for (let i = 0; i < numRounds; i++) {
//   const round = {
//     title: `Round ${i + 1}`,
//     seeds: [],
//   };

//   for (let j = 0; j < roundsPerRound; j++) {
//     const seed = {
//       id: i * roundsPerRound + j + 1,
//       date: new Date().toDateString(),
//       teams: [
//         { name: teamNames[i * roundsPerRound + j] },
//         { name: teamNames[(i * roundsPerRound + j + roundsPerRound) % teamNames.length] },
//       ],
//     };

//     round.seeds.push(seed);
//   }

//   rounds.push(round);
// }


function BracketDisplay({ matches }) {
  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {});

  // Generate brackets for each round
  const brackets = Object.entries(matchesByRound).map(([round, matches]) => {
    // Generate seeds for each match
    const seeds = matches.map((match) => ({
      id: match.id,
      teams: [
        { name: match.n_team1, score: match.winner === "1" ? 1 : 0 },
        { name: match.n_team2, score: match.winner === "2" ? 1 : 0 },
      ],
    }));

    // Generate the round object
    return {
      title: `Round ${round}`,
      seeds,
    };
  });

  return (
    <div>
      {brackets.map((round) => (
        <div key={round.title}>
          <h2>{round.title}</h2>
          {round.seeds.map((seed) => (
            <div key={seed.id}>
              <p>{seed.teams[0].name}</p>
              <p>{seed.teams[1].name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


function Tournament() {
  const router = useRouter();
  const { id } = router.query;
  const [matches,setMatches]=useState();

  useEffect(()=>{
    const fetchMatches=async ()=>{
      const res=await subgraphClient.query({
        query:getTournamentDetail,
        variables:{
          input:id
        }
      });
      console.log(res.data.matches);
      setMatches(res.data.matches);
    }
    if(id){
      fetchMatches();
    }
  });

  const teamNames=
  console.log(id);
  return (
    <div>
    {
      matches ? (
        <BracketDisplay matches={matches}></BracketDisplay>
      ):(
        <LoadingOverlay></LoadingOverlay>
      )
    }
    </div>
  );
}

export default Tournament;
