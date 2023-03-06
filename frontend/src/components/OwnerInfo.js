import React from 'react'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';


function OwnerInfo({ owner }) {
    return (
      <Box mt={2}>
        <Text fontSize="lg" color="#FBAE30" fontWeight="bold">
          Owner Information:
        </Text>
        <Box bg="#161819" borderRadius="lg" p={2} mt={2}>
          <Text fontSize="lg" color="white">
            EVM Address: {owner}
          </Text>
          <Text fontSize="lg" color="white" mt={2}>
            Balance: 100 ETH
          </Text>
          <Text fontSize="lg" color="white" mt={2}>
            Joined: 01/01/2022
          </Text>
        </Box>
      </Box>
    );
  }
export default OwnerInfo