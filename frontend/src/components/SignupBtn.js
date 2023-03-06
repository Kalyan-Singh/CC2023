import React,{useContext,useState} from 'react'
import { useSigner } from 'wagmi';
import {
	randUserName,
	randAvatar,
	randPhrase,
	randFullName,
} from "@ngneat/falso";

import { AuthContext } from '@/context/auth';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { pinJSONToIPFS } from '@/helpers';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE_TYPED_DATA } from '@/graphql';
import { RELAY } from '@/graphql';
import { useAccount } from 'wagmi';


function SignupBtn({handle,avatar,name,bio,operator}) {


    const {data: signer}=useSigner();
    const { indexingProfiles, setIndexingProfiles,primaryProfile } =useContext(AuthContext);
    const [createProfileTypedData]=useMutation(CREATE_PROFILE_TYPED_DATA);
    const [relay]=useMutation(RELAY);
    const {address}=useAccount();
    

    const handleOnClick=async()=>{
        try{
            const profileName = name || randFullName();
            const profileHandle = handle || randUserName();
            const profileAvatar = avatar || randAvatar({size:200});
            const profileBio = bio || randPhrase();
            const metadata = {
                name: profileName,
                bio: profileBio,
                handle: profileHandle,
                version: "1.0.0",
            };
            const ipfsHash=await pinJSONToIPFS(JSON.stringify(metadata)).then();
            console.log(ipfsHash);

            const typedData=await createProfileTypedData({
              variables:{
                input:{
                  to:address,
                  handle:profileHandle,
                  avatar:profileAvatar,
                  metadata:ipfsHash,
                  operator:'0x0000000000000000000000000000000000000000'
                }
              }
            });
            console.log(typedData);
            const typeDataId=typedData.data.createCreateProfileTypedData.typedDataID;
            const relayResult=await relay({
              variables:{
                input:{
                  typedDataID:typeDataId
                }
              }
            });

            console.log(relayResult);


        }catch{(error)=>{
            console.log(error);
        }}
    }

    

  return (
    <Button onClick={handleOnClick}>SignUp</Button>
  )
}

export default SignupBtn