import React, { useContext, useEffect, useState } from 'react'
import { Box,Button,Text } from '@chakra-ui/react'
import { LOGIN_GET_MESSAGE,LOGIN_VERIFY } from '@/graphql';
import { useMutation } from '@apollo/client';
import { useAccount , useSigner} from 'wagmi';
import { AuthContext } from '@/context/auth';
import { ethers } from 'ethers';


function SignInButton() {
     const {setAccessToken}=useContext(AuthContext);
     const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
	const [loginVerify] = useMutation(LOGIN_VERIFY);
     const [message,setMessage]=useState('');
     const {data:signer}=useSigner();

     const {address}=useAccount();
     const DOMAIN="test.com";

     const handleOnClick= async()=>{
          try{
               const messageResult = await loginGetMessage({
				variables: {
					input: {
						address: address,
						domain: DOMAIN,
					},
				},
			});
               const message = messageResult?.data?.loginGetMessage?.message;
               const signature=await signer.signMessage(message);
               const accessTokenResult = await loginVerify({
				variables: {
					input: {
						address: address,
						domain: DOMAIN,
						signature: signature,
					},
				},
			});
               const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;
			console.log("~~ Access token ~~");
			console.log(accessToken);

			/* Save the access token in local storage */
			localStorage.setItem("accessToken", accessToken);

			/* Set the access token in the state variable */
			setAccessToken(accessToken);
          }catch(error){
               console.log(error);
          }
     }



  return (
      <Button bg={'#FBAE30'} size="lg" textColor={'#F6F4F5'} _hover={{ color: "gray.500" }} onClick={handleOnClick}>
      Sign In
            </Button> 
  )
}

export default SignInButton