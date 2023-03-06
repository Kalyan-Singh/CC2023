import React, { useState } from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import OwnerInfo from './OwnerInfo';

function ProfileCard({ profile }) {
  const [showOwnerInfo, setShowOwnerInfo] = useState(false);
  const [owner,setOwner]=useState();

  const ownerAddress =
    profile.owner.slice(0, 4) + '...' + profile.owner.slice(-3);

  const handleOwnerClick = (owner) => {
    setShowOwnerInfo(true);
    setOwner(owner);
  };

  if(showOwnerInfo){
    console.log(owner)
    return(
    <OwnerInfo owner={owner}></OwnerInfo>
    )
  }

  return (
    <Box
      bg="#161819"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
      p={4}
    >
      <Flex alignItems="center">
        <Image
          borderRadius="full"
          boxSize="70px"
          src={profile.avatar}
          alt="Profile Avatar"
          mr={4}
        />
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {profile.handle}
          </Text>
          <Text fontSize="lg" color="white" mb={2}>
            Profile ID: {profile.profileID}
          </Text>
          <Link
            fontSize="lg"
            color="#FBAE30"
            cursor="pointer"
            _hover={{ color: '#FFFFFF' ,textDecoration:'none'}}
            onClick={()=>{
              handleOwnerClick(profile.owner)
            }}
          >
            Owner: {ownerAddress}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}


export default ProfileCard;
