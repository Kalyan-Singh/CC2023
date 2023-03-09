import { BigInt } from "@graphprotocol/graph-ts"
import {
  TeamCreated,TournamentController,Registered,TournamentCreated
} from "../generated/TournamentController/TournamentController"

import {Player,Team,playerTeam,Tournament,participantTeam} from "../generated/schema";
export const subgraphID="kalyan-singh/mergedv1";
import { sendEPNSNotification } from "./EPNSNotification";


export function handleTeamCreated(e: TeamCreated): void{
  let teamId=e.params.teamId.toHexString();
  let members=e.params.members;
  let nTeam= new Team(e.params.teamId.toString());
  nTeam.teamID=e.params.teamId;
  nTeam.leader=e.params.leader.toHexString();
  for(let i=0;i<members.length;i++){
    let p1= Player.load(members[i].toHexString());
    if(!p1){
      p1= new Player(e.params.members[i].toHexString());
      p1.save();
    }
    let ptid=members[i].toHexString().concat(teamId);
    let pt = new playerTeam(ptid);
    let contract=TournamentController.bind(e.address);
    let name = contract.teams(e.params.teamId).getName();
    nTeam.name=name;
    pt.team=nTeam.id;
    pt.player=p1.id;

    pt.save();
    let recipient = members[i].toHexString(),
	  type = "3",
	  title = "Added",
	  body = `You are added to team ${e.params.teamId} by leader ${e.params.leader.toHexString()}`,
	  subject = "Addition to Team",
	  message = `You are added to team ${e.params.teamId}`,
	  image = "null",
	  secret = "null",
	  cta = "http://127.0.0.1:5173/"
    let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`
    sendEPNSNotification (recipient, notification);
  }
  nTeam.save();
}

export function handleTournamentCreated(e: TournamentCreated): void{
  let nTournament= new Tournament(e.params.tournmenId.toString());
  nTournament.organizer=e.params.organizer;
  nTournament.totalPrize=e.params.prizepool;
  let contract= TournamentController.bind(e.address);
  let prizes=contract.tournaments(e.params.tournmenId).getPrize();
  nTournament.participantPrize=prizes.participantPool;
  nTournament.viewerPool=prizes.viewerPool;
  nTournament.teamSizeLimit=contract.tournaments(e.params.tournmenId).getSizeLimit();
  nTournament.maxParticipants=contract.tournaments(e.params.tournmenId).getMaxParticipants();
  nTournament.matchMakingModule=e.params.matchMaker.toString();
  nTournament.organizerAddress=e.params.orgAddress.toString();
  nTournament.save();
}

export function handleRegistered(e: Registered): void{
  let teamId=e.params.teamId.toHexString();
  let tournamentId=e.params.tournamentId.toHexString();
  let ptid=teamId + "-" + tournamentId;
  let pt= new participantTeam(ptid);

  let team=Team.load(e.params.teamId.toString());
  let tournament=Tournament.load(e.params.tournamentId.toString());
  if(team && tournament){
    pt.team=team.id;
    pt.tournament=tournament.id;
  }
  pt.save();
}