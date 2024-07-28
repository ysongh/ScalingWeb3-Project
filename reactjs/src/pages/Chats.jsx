import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Button,
  Avatar,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useClient } from '@xmtp/react-sdk';

import { initXmtp } from '../utils/XMTP';

const Chats = () => {
  const { address } = useWeb3ModalAccount();
  const { client, error, isLoading, initialize } = useClient();

  const [userSigner, setUserSigner] = useState(null);

  useEffect(() => {
    if (userSigner) initXmtp(userSigner, address, initialize);
  }, [userSigner])

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    setUserSigner(signer);
  }

  return (
    <>
      {!userSigner ? (
        <Button onClick={connectWallet}>
          Connect Wallet
        </Button>
      ) : (
        <Flex height="88vh">
          {/* Chat List */}
          <Box width="300px" borderRight="1px" borderColor="gray.200" p={4}>
            <VStack align="stretch" spacing={4}>
              <Input placeholder="Search chats..." />
              <ChatListItem name="John Doe" lastMessage="Hey, how are you?" />
              <ChatListItem name="Jane Smith" lastMessage="See you later!" />
              <ChatListItem name="Bob Johnson" lastMessage="Thanks for your help." />
            </VStack>
          </Box>

          {/* Chat Window */}
          <Flex flex={1} flexDirection="column">
            {/* Chat Header */}
            <Box p={4} borderBottom="1px" borderColor="gray.200">
              <Text fontWeight="bold">John Doe</Text>
            </Box>

            {/* Messages Area */}
            <VStack flex={1} overflowY="auto" p={4} spacing={4} alignItems="flex-start">
              <Message text="Hey, how are you?" isUser={false} />
              <Message text="I'm good, thanks! How about you?" isUser={true} />
              <Message text="Doing well. Did you finish the project?" isUser={false} />
            </VStack>

            {/* Input Area */}
            <Box p={4} borderTop="1px" borderColor="gray.200">
              <HStack>
                <Input placeholder="Type a message..." />
                <IconButton icon={<ArrowForwardIcon />} colorScheme="blue" aria-label="Send message" />
              </HStack>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

const ChatListItem = ({ name, lastMessage }) => (
  <HStack spacing={3}>
    <Avatar name={name} size="sm" />
    <Box flex={1}>
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="sm" color="gray.500" noOfLines={1}>
        {lastMessage}
      </Text>
    </Box>
  </HStack>
);

const Message = ({ text, isUser }) => (
  <Box
    alignSelf={isUser ? 'flex-end' : 'flex-start'}
    bg={isUser ? 'blue.500' : 'gray.100'}
    color={isUser ? 'white' : 'black'}
    borderRadius="lg"
    px={3}
    py={2}
    maxWidth="70%"
  >
    <Text>{text}</Text>
  </Box>
);

export default Chats;