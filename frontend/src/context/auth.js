import {ACCOUNTS,PRIMARY_PROFILE,PRIMARY_PROFILE_ESSENCES} from "../graphql";
import { createContext,useState,useEffect } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

AuthContext.displayName = "AuthContext";


export const AuthContextProvider =({children})=>{
    const {address}=useAccount();
    const [primaryProfile,setPrimaryProfile]=useState();
    const [accessToken,setAccessToken]=useState(localStorage.getItem('accessToken'));
    const [profileCount,setProfileCount]=useState();
    const [profiles,setProfiles]=useState();

    // checking the JWT
    if(accessToken){
      const decodedToken=jwtDecode(accessToken);
      if(decodedToken.address!=address){
        localStorage.removeItem('accessToken');
        setAccessToken();
      }
      if(decodedToken.exp*1000 < Date.now()){
        localStorage.removeItem('accessToken');
        setAccessToken();
      }
    }



    // getting all the profiles of the user
    const {data:accountData,loading:accountLoading,error:accountError}=useQuery(ACCOUNTS,{
      variables:{
        address:address,
      },
      onCompleted:(data)=>{
        setProfileCount(data.address.wallet.profiles.totalCount);
        setProfiles(data.address.wallet.profiles);
      }
    });


    // getting the primary profile of the user
    const {data:profileData,loading:profileLoading,error:profileError}=useQuery(PRIMARY_PROFILE,{
      variables:{
        address:address,
      },
      onCompleted:(data)=>{
        setPrimaryProfile(data.address.wallet.primaryProfile);
      }
    });



      return (
        <AuthContext.Provider
          value={{
            accessToken,
            primaryProfile,
            profileCount,
            profiles,
            setAccessToken,
            setPrimaryProfile,
            setProfileCount,
            setProfiles,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}






  
  