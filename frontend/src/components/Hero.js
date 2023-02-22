import { Flex, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import Head from 'next/head';
//import img from '../../assets/hero.png';

const Hero = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor="gray.900"
    >
      <Box maxWidth="1200px" mx={8}>
        <Flex justifyContent="space-between" alignItems="center" bg={'red'}>
          <Box flexBasis={{ base: "100%", sm: "50%" }} p={10}>
            <Heading as="h1" mb={8}  fontSize="5xl" fontWeight="bold" color="white">
              Compete. Connect. Earn!
            </Heading>
            <Text fontSize="xl" mb={8} color="white">
              This is the hero section of my website. Use this space to introduce yourself and your website to your visitors.
            </Text>
            <Button colorScheme="blue" size="lg">
              Learn More
            </Button>
          </Box>
          <Box display={{ sm: "none", md: "block" }} flexBasis={{ sm: "0%", md: "50%" }}>
            <Image width={500} height={500} src="https://s3-alpha-sig.figma.com/img/02fb/1b6b/800c8cc40e59f9ce212c60eb40f6a245?Expires=1678060800&Signature=UOcjPcSI0Hrk7vSyrwkfNwPXOhK78Bvo7iGUcXk-bWx0pMzQ~Ij3pAabI-ef5ojgML3svJavFb2lqU51dqEL-y0Hni~Kcrp9kDPv52jn3UG4tjFV2xqd8WgE-ftTuLz2fv0V--OfZ2RY5ymAN46TWUC-UGPumedfPfPdNaBu5HMlwqQYeqEIELUcivI2ryZ-Jx3tiMka1p0Qg1YoPanhVQBsJasQxMN4GL9U6QYawFwCk3illhjYm~9h8jzMENiuPMWRZfHtWMNvwnQEhvprcVHsnEBNGVhs4hBcIiJ1sX42n~8zgdcmVlz9utO9ZgXxP8Z5i0fBmIAGeOp6WgJFcw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="Hero Image" borderRadius={8} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

const Home = () => {
  return (
    <>
      <Head>
        <title>My Website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style>{`
          html, body, #__next {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Head>
      <Hero />
    </>
  );
};

export default Home;
