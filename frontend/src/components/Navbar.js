import React from "react";
import { Box, Flex, Text, Button, useDisclosure, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#131415" py={0.5} px={{ base: 4, md: 20 }}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              LOGO
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
                href="/explore"
                _hover={{ textDecoration: "none" }}
              >
                Explore
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
            <ConnectButton
              accountStatus="avatar"
              showBalance={false}
            ></ConnectButton>
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
                href="/explore"
                _hover={{ textDecoration: "none" }}
              >
                Explore
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
