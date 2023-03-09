import { BigInt,Address } from "@graphprotocol/graph-ts"
import {
  MatchMakerSE,
  BracketUpdated,
  MatchMade,
} from "../generated/MatchMakerSE/MatchMakerSE"

import {TournamentController as ControllerContract} from "../generated/TournamentController/TournamentController"

import {Match,Team} from "../generated/schema";


export function handleMatchMade(e:MatchMade): void {
  let match=Match.load(e.params.MatchId.toString());
  if(!match){
    match = new Match(e.params.MatchId.toString());
    match.team1= e.params.team1;
    match.team2=e.params.team2;
    match.tournamentId=e.params.tournamentId;
    match.round=e.params.rountId;
    let team1=Team.load(e.params.team1.toString());
    let team2= Team.load(e.params.team2.toString());
    if(team1 && team2){
      match.n_team1=team1.name;
      match.n_team2=team2.name;
    }
  }
  else{
    match.team1=e.params.team1;
    match.team2=e.params.team2;
    let team1=Team.load(e.params.team1.toString());
    let team2= Team.load(e.params.team2.toString());
    if(team1 && team2){
      match.n_team1=team1.name;
      match.n_team2=team2.name;
    }
  }
  match.save();
}

export function handleBracketUpdated(e: BracketUpdated): void{
  let match=Match.load(e.params.MatchId.toString());
  if(!match){
    match = new Match(e.params.MatchId.toString());
    match.round=e.params.roundId;
    match.tournamentId=e.params.TournamentId;
  }
  match.winner=e.params.WinnerId;
  match.save();
}