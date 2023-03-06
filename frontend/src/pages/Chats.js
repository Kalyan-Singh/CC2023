import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
  Avatar,
  Input,
  IconButton,
  Divider,
  VStack,
  Spacer
} from "@chakra-ui/react";
import { FaPlus, FaBeer, FaBackward, FaLongArrowAltLeft } from "react-icons/fa";
import { useSigner, useAccount, ContractMethodNoResultError } from "wagmi";
import { Client } from "@xmtp/xmtp-js";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/auth";
import { PRIMARY_PROFILE } from "@/graphql";
import { LoadingOverlay } from "@/helpers";
import { apolloClient } from "@/apollo";

function Chats() {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const [client, setClient] = useState();
  const [xmtpClientAddress, setXmtpClientAddress] = useState();
  const [messages, setMessages] = useState();
  const [peerAddress, setPeerAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedProfile,setSelectedProfile]=useState();
  const [chatProfiles, setChatsProfiles] = useState([]);
  const [showTo, setShowTo] = useState();
  const [conversations, setConversations] = useState();
  const [currentConversation,setCurrentConversation]=useState();
  const messagesRef=useRef();

  const { primaryProfile } = useContext(AuthContext);



  // checking for primary profile of the user!

  // build coversation function
  const PREFIX = "lens.dev/dm";
  const buildConversationId = (profileIdA, profileIdB) => {
    const profileIdAParsed = parseInt(profileIdA, 16);
    const profileIdBParsed = parseInt(profileIdB, 16);

    return profileIdAParsed < profileIdBParsed
      ? `${PREFIX}/${profileIdA}-${profileIdB}`
      : `${PREFIX}/${profileIdB}-${profileIdA}`;
  };

  // starting a new conversation with another user
  const startConversation = async () => {
    try {
      const chatProfile = await apolloClient.query({
        query: PRIMARY_PROFILE,
        variables: {
          address: peerAddress,
        },
      });
  
      setChatsProfiles([...chatProfiles, chatProfile]);
  
      const conversation = await client.conversations.newConversation(peerAddress);
      setConversations(conversation);
      console.log(conversation);
      console.log(chatProfiles);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (signer) {
      try {
        const createClient = async () => {
          const xmtp = await Client.create(signer, { env: "dev" });
          const allconversations = await xmtp.conversations.list();
          const peerAddresses = allconversations.map((conversation) => {
            return conversation.peerAddress;
          });
  
          const chatProfiles = [];
  
          // getting the primary profiles!
          for (let i = 0; i < peerAddresses.length; i++) {
            const chatProfile = await apolloClient.query({
              query: PRIMARY_PROFILE,
              variables: {
                address: peerAddresses[i],
              },
            });
  
            if (chatProfile.data.address.wallet.primaryProfile) {
              chatProfiles.push(
                chatProfile.data.address.wallet.primaryProfile.handle
              );
            } else {
              chatProfiles.push(peerAddresses[i]);
            }
          }
  
          console.log("This is all conversations-", allconversations);
          setClient(xmtp);
          setLoading(false);
          setConversations(allconversations);
          console.log("This is user profiles-", chatProfiles);
          setChatsProfiles(chatProfiles);
        };
        createClient();
      } catch (error) {
        console.log(error);
      }
    }
  }, [signer, conversations]);


  // function to stream messages

  async function streamMessages(index){
    console.log(conversations[index].messages());

    const stream = await conversations[index].streamMessages()
    for await (const newMessage of stream) {
      messagesRef.current[newMessage.id] = newMessage
      setMessages({...messagesRef.current})
    }
  }
  

  if (!primaryProfile && loading) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <Flex direction="column" h="100vh">
      {/* Header */}
      <Flex bg="#2C2F33" align="center" justify="space-between" p="4">
        {showTo ? (
          <>
            <IconButton
              aria-label="back"
              icon={<FaLongArrowAltLeft></FaLongArrowAltLeft>}
              bg="#7289DA"
              color="#FFF"
              _hover={{ bg: "#5B6B88" }}
              onClick={() => setShowTo(false)}
            ></IconButton>
            <Input
              placeholder="address"
              onChange={(e) => {
                setPeerAddress(e.target.value);
              }}
            ></Input>
            <IconButton
              aria-label="Add friend"
              icon={<FaPlus />}
              bg="#7289DA"
              color="#FFF"
              _hover={{ bg: "#5B6B88" }}
              onClick={() => startConversation()}
            />
          </>
        ) : (
          <IconButton
            aria-label="Add friend"
            icon={<FaPlus />}
            bg="#7289DA"
            color="#FFF"
            _hover={{ bg: "#5B6B88" }}
            onClick={() => setShowTo(true)}
          />
        )}
      </Flex>

      {/* Main content */}
      <Flex flex="1" bg="#36393F">
        {/* Channels sidebar */}
        <Flex w="240px" bg="#2C2F33" direction="column">
  <Divider bg="#7289DA" mb="4" mx="2" />
  {/* Chat list */}
  <Box mx="2">
    {chatProfiles.length > 0 ? (
      <VStack align="stretch" spacing="1">
        {chatProfiles.map((profile, index) => (
          <Box
            key={index}
            bg={selectedProfile === index ? "#7289DA" : ""}
            color={selectedProfile === index ? "#FFF" : ""}
            _hover={{ bg: "#5B6B88", cursor: "pointer" }}
            onClick={() => {setSelectedProfile(index)
              streamMessages(index)
            }
            }
            p={2}
            borderRadius="lg"
          >
            <Flex align="center">
              <Text>{profile}</Text>
              <Spacer />
            </Flex>
          </Box>
        ))}
      </VStack>
    ) : (
      <Box></Box>
    )}
  </Box>
</Flex>



        {/* Chat content */}
        <Flex flex="1" direction="column" p="4">
          {/* Message list */}
          <Box flex="1" overflowY="auto">
            {/* Messages */}

            {/* More messages */}
          </Box>

          {/* Message input */}
          <Flex align="center">
            <Input
              bg="#2C2F33"
              placeholder="Message"
              color="#FFF"
              border="none"
              _focus={{ border: "none" }}
              flex="1"
              mr="2"
            />
            <IconButton
              aria-label="Send message"
              icon={<FaPlus />}
              bg="#7289DA"
              color="#FFF"
              _hover={{ bg: "#5B6B88" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Chats;
