import React from "react";
import { useState, ChangeEvent } from "react";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex
} from "@chakra-ui/react";
import SignupBtn from "@/components/SignupBtn";
// import SignupBtn from "../../components/Buttons/SignupBtn";

function CreateProfile() {
  const [signupInput, setSignupInput] = useState({
    handle: "",
    name: "",
    bio: "",
    avatar: "",
    operator: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  };

  return (
    <Flex
  height="100vh"
  alignItems="center"
  justifyContent="center"
  bg="#161819"
>
  <Box p={6} borderWidth="2px" borderColor="#FBAE30">
  <Flex alignContent='center' justifyContent='center'>
  <Heading color="white" mb={6} >
      Create profile
    </Heading>
  </Flex>
    
    <InputGroup mb={4}>
      <InputLeftAddon
        children="Handle (w/o @)"
        color="white"
        fontWeight="bold"
        textTransform="capitalize"
        bg='#FBAE30'
      />
      <Input
        name="handle"
        value={signupInput.handle}
        onChange={handleOnChange}
        bg="gray.700"
        borderColor="#FBAE30"
        color="white"
      />
    </InputGroup>
    <InputGroup mb={4}>
      <InputLeftAddon
        children="Avatar URL"
        color="white"
        fontWeight="bold"
        textTransform="capitalize"
        bg='#FBAE30'

      />
      <Input
        name="avatar"
        value={signupInput.avatar}
        onChange={handleOnChange}
        placeholder="https://"
        bg="gray.700"
        borderColor="#FBAE30"
        color="white"
      />
    </InputGroup>
    <InputGroup mb={4}>
      <InputLeftAddon
        children="Name"
        color="white"
        fontWeight="bold"
        textTransform="capitalize"
        bg='#FBAE30'

      />
      <Input
        name="name"
        value={signupInput.name}
        onChange={handleOnChange}
        bg="gray.700"
        borderColor="#FBAE30"
        color="white"
      />
    </InputGroup>
    <InputGroup mb={4}>
      <InputLeftAddon
        children="Bio"
        color="white"
        fontWeight="bold"
        textTransform="capitalize"
        bg='#FBAE30'

      />
      <Input
        name="bio"
        value={signupInput.bio}
        onChange={handleOnChange}
        bg="gray.700"
        borderColor="#FBAE30"
        color="white"
      />
    </InputGroup>
    <InputGroup mb={4}>
      <InputLeftAddon
        children="Operator address (optional)"
        color="white"
        fontWeight="bold"
        textTransform="capitalize"
        bg='#FBAE30'

      />
      <Input
        name="operator"
        value={signupInput.operator}
        onChange={handleOnChange}
        placeholder="0x..."
        bg="gray.700"
        borderColor="#FBAE30"
        color="white"
      />
    </InputGroup>
    <Text color="white" mb={4}>
      <strong>Note:</strong> For empty fields we will randomly generate
      values.
    </Text>
    {/* <SignupBtn {...signupInput} /> */}
    <SignupBtn {...signupInput}></SignupBtn>
    
  </Box>
</Flex>

  );
}

export default CreateProfile;
