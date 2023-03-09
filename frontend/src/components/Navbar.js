import React,{useContext} from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  Link,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { AuthContext } from "@/context/auth";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address,isConnected } = useAccount();
  const {primaryProfile,setAccessToken,accessToken,explore} =useContext(AuthContext);
  const {disconnect}=useDisconnect();
  const logoutHandler=()=>{
    disconnect();
    setAccessToken();
  }

  return (
    <Box bg="#131415" py={0.5} px={{ base: 4, md: 20 }}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              <Avatar name="LOGO" src="./logo.png">

              </Avatar>
            </Link>
          </Text>
        </Box>
        <Box
          display={{ base: "block", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? (
            <CloseIcon color="white" w={6} h={6} />
          ) : (
            <HamburgerIcon color="white" w={6} h={6} />
          )}
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Flex alignItems="center">
            <Button
              variant="ghost"
              mx={2}
              _hover={{ color: "gray.500" }}
              color="#D67D05"
            >
              <Link
                as={NextLink}
                href="/Find"
                _hover={{ textDecoration: "none" }}
              >
                Find
              </Link>
            </Button>
            <Button
              variant="ghost"
              mx={2}
              _hover={{ color: "gray.500" }}
              color="#D67D05"
            >
              <Link
                as={NextLink}
                href="/tournaments"
                _hover={{ textDecoration: "none" }}
              >
                Tournaments
              </Link>
            </Button>
            <Button
              variant="ghost"
              mx={2}
              _hover={{ color: "gray.500" }}
              color="#D67D05"
            >
              <Link
                as={NextLink}
                href="/CreateTeam"
                _hover={{ textDecoration: "none" }}
              >
                Create Team
              </Link>
            </Button>
            <Button
              variant="ghost"
              mx={2}
              _hover={{ color: "gray.500" }}
              color="#D67D05"
            >
              <Link
                as={NextLink}
                href="/CreateTournament"
                _hover={{ textDecoration: "none" }}
              >
                Create Tournament
              </Link>
            </Button>
            <Button
              variant="ghost"
              mx={2}
              _hover={{ color: "gray.500" }}
              color="#D67D05"
            >
              {" "}
              <Link
                as={NextLink}
                href="/about"
                _hover={{ textDecoration: "none" }}
              >
                About
              </Link>
            </Button>
            {primaryProfile && accessToken? (
              <Menu matchWidth>
                <MenuButton
                  as={Avatar}
                  size="md"
                  name="John Doe"
                  src={primaryProfile.avatar}
                />
                <MenuList bgColor='#161819' border='none'> 
                <MenuItem bgColor='#161819' textColor='#FBAE30'><Link
                as={NextLink}
                href="/Register"
                _hover={{ textDecoration: "none" }}
              >
               Register
              </Link></MenuItem>
              <MenuItem bgColor='#161819' textColor='#FBAE30'><Link
                as={NextLink}
                href="/Stream"
                _hover={{ textDecoration: "none" }}
              >
                Stream
              </Link></MenuItem>
                  <MenuItem bgColor='#161819' textColor='#FBAE30'><Link
                as={NextLink}
                href="/MyTournaments"
                _hover={{ textDecoration: "none" }}
              >
               My Tournaments
              </Link></MenuItem>
              
                  <MenuItem onClick={logoutHandler} bgColor='#161819' textColor='#FBAE30'>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <ConnectButton
                accountStatus="avatar"
                showBalance={false}
              ></ConnectButton>
            )}
          </Flex>
        </Box>
      </Flex>
      <motion.div
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.1 }}
        style={{ overflow: "hidden" }}
      >
        <Box pb={2}>
          <Flex direction="column" alignItems="center">
            <Button
              variant="ghost"
              my={2}
              onClick={onClose}
              _hover={{ color: "gray.500" }}
              color="white"
            >
              <Link
                as={NextLink}
                href="/Find"
                _hover={{ textDecoration: "none" }}
              >
                Find
              </Link>
            </Button>
            <Button
              variant="ghost"
              my={2}
              onClick={onClose}
              _hover={{ color: "gray.500" }}
              color="white"
            >
              <Link
                as={NextLink}
                href="/about"
                _hover={{ textDecoration: "none" }}
              >
                About
              </Link>{" "}
            </Button>

            <ConnectButton accountStatus="avatar" />
          </Flex>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Navbar;
