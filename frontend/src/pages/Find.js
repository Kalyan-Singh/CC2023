import { AuthContext } from "@/context/auth";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { buildConversation,LoadingOverlay } from "@/helpers";
import ProfileCard from "@/components/ProfileCard";
import { Grid } from "@chakra-ui/react";


function Chats() {
  const {explore}=useContext(AuthContext);

  
  let profileObject={
    profileID:null,
    handle:null,
    avatar:null,
    owner:null
  }

  let profilesD;

  // useEffect(()=>{
  //   explore.profiles.edges.map((profileEdge)=>{
  //     const nProfile=new Object();
  //     nProfile.profileId=profileEdge.node.profileId;
  //   })
  // },[explore])

  if(!explore){
    return(
      <LoadingOverlay></LoadingOverlay>
    )
  }

  profilesD=explore.profiles.edges.map((profileEdge)=>{
    const nProfile= new Object();
    nProfile.profileID=profileEdge.node.profileID;
    nProfile.handle=profileEdge.node.handle;
    nProfile.avatar=profileEdge.node.avatar;
    nProfile.owner=profileEdge.node.owner.address;
    return nProfile;
  })
  

  // setProfiles(explore.profiles.edges.map((profileEdge)=>{
  //   const nProfile=new Object();
  // }));

   
  console.log(profilesD);
  
  console.log(explore);
  console.log(explore.profiles.edges[0].node);

  return (
    <>
      
        <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      justifyContent="center"
      mt={6}
    >
      {profilesD.map((profile) => (
        <ProfileCard key={profile.profileID} profile={profile} />
      ))}
    </Grid>
      
    </>
  );
}

export default Chats;
