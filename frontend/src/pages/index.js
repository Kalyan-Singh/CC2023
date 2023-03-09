import SignInButton from "@/components/SignInButton";
import { AuthContext } from "@/context/auth";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import { useContext } from "react";
import CreateProfile from "./CreateProfile";
import { NextLink } from "@apollo/client";

export default function Home() {
  const { profiles, primaryProfile,accessToken } = useContext(AuthContext);
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        backgroundColor="#161819"
      >
        <Box maxWidth="1200px" mx={8} bg={"#161819"}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            bg={"#161819"}
          >
            <Box flexBasis={{ base: "100%", sm: "50%" }} p={10}>
              <Heading
                as="h1"
                mb={8}
                fontSize="5xl"
                fontWeight="bold"
                color="white"
              >
                Compete. Connect. Earn!
              </Heading>
              <Text fontSize="xl" mb={8} color="white">
                {/* This is the hero section of my website. Use this space to
                introduce yourself and your website to your visitors. */}
                A all in one solution to all your tournament organizing needs 
              </Text>
              {accessToken ? (
                primaryProfile ? (
                  // user has a profile
                  <Button
                    bg={"#FBAE30"}
                    size="lg"
                    textColor={"#F6F4F5"}
                    _hover={{ color: "gray.500" }}
                  >
                    <Link
                      as={NextLink}
                      _hover={{ textDecoration: "none" }}
                      href="/tournaments"
                    >
                      Explore
                    </Link>
                  </Button>
                ) : (
                  // user does not have a profile
                  <Button
                    bg={"#FBAE30"}
                    size="lg"
                    textColor={"#F6F4F5"}
                    _hover={{ color: "gray.500" }}
                  >
                    <Link
                      as={NextLink}
                      _hover={{ textDecoration: "none" }}
                      href="/CreateProfile"
                    >
                      Create Profile
                    </Link>
                  </Button>
                )
              ) : (
                // there is not jwt token so either user's session expired or new user
                <SignInButton></SignInButton>
              )}
            </Box>
            <Box
              display={{ sm: "none", md: "block" }}
              flexBasis={{ sm: "0%", md: "50%" }}
            >
              <Image
                width={500}
                height={500}
                src="/project.png"
                alt="Hero Image"
                borderRadius={8}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
