import axios from "axios";
import { CircularProgress, Flex } from "@chakra-ui/react";

export function LoadingOverlay() {
  return (
    <Flex
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      backgroundColor="rgba(0, 0, 0, 0.5)"
      alignItems="center"
      justifyContent="center"
      zIndex={10}
    >
      <CircularProgress isIndeterminate color="black" size="100px" />
    </Flex>
  );
}

export const pinJSONToIPFS = async (json) => {
    console.log("I am here",json);
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    const config={
        method:"post",
        url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers:{
            'Content-Type':'application/json',
            'pinata_api_key':process.env.NEXT_PUBLIC_PINATA_API_KEY,
            'pinata_secret_api_key':process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
        },
        data:json
    }

    const res= await axios(config);
    return res.data.IpfsHash;
};

export const buildConversation = (profileIdA, profileIdB) => {
    const PREFIX = "connectedTournaments/dm";
    const profileIdAParsed = parseInt(profileIdA, 16);
    const profileIdBParsed = parseInt(profileIdB, 16);
    return profileIdAParsed < profileIdBParsed
      ? `${PREFIX}/${profileIdA}-${profileIdB}`
      : `${PREFIX}/${profileIdB}-${profileIdA}`;
  };
  
