import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { Flex, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Navbar/>
      <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor="#161819"
    >
      <Box maxWidth="1200px" mx={8} bg={'#161819'}>
        <Flex justifyContent="space-between" alignItems="center" bg={'#161819'}>
          <Box flexBasis={{ base: "100%", sm: "50%" }} p={10}>
            <Heading as="h1" mb={8}  fontSize="5xl" fontWeight="bold" color="white">
              Compete. Connect. Earn!
            </Heading>
            <Text fontSize="xl" mb={8} color="white">
              This is the hero section of my website. Use this space to introduce yourself and your website to your visitors.
            </Text>
            <Button bg={'#FBAE30'} size="lg" textColor={'#F6F4F5'} _hover={{ color: "gray.500" }}>
              Login
            </Button>
          </Box>
          <Box display={{ sm: "none", md: "block" }} flexBasis={{ sm: "0%", md: "50%" }}>
            <Image width={500} height={500} src="/project.png" alt="Hero Image" borderRadius={8} />
          </Box>
        </Flex>
      </Box>
    </Flex> 
    </>
  )
}
