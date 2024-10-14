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
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useCanMessage, useClient, useConsent, useConversations, useStartConversation } from '@xmtp/react-sdk';

import { initXmtp } from '../utils/XMTP';
import ChatListItem from '../components/ChatListItem';
import MessagesArea from '../components/MessagesArea';

const Chats = () => {
  const { address } = useWeb3ModalAccount();
  const { client, error, isLoading, initialize } = useClient();
  const { loadConsentList } = useConsent();
  const { conversations } = useConversations();
  const { canMessage } = useCanMessage();
  const { startConversation } = useStartConversation();

  const [userSigner, setUserSigner] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (userSigner) initXmtp(userSigner, address, initialize);
  }, [userSigner])

  useEffect(() => {
    void loadConsentList();
  }, []);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    setUserSigner(signer);
  }

  const sendMessage = async() => {
    if (await canMessage(selectedConversation?.peerAddress)) {
      const conversation = await startConversation(selectedConversation?.peerAddress, text);
      console.log(conversation);
    }
    else {
      alert("Cannot message this address");
    }
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
              {conversations?.map(c => (
                <ChatListItem key={c.id} topic={c.topic} conversation={c} setSelectedConversation={setSelectedConversation} />
              ))}
            </VStack>
          </Box>

          {/* Chat Window */}
          <Flex flex={1} flexDirection="column">
            {/* Chat Header */}
            <Box p={4} borderBottom="1px" borderColor="gray.200">
              <Text fontWeight="bold">{selectedConversation?.peerAddress}</Text>
            </Box>

            {/* Messages Area */}
            {selectedConversation && <MessagesArea address={address} selectedConversation={selectedConversation} />}

            {/* Input Area */}
            <Box p={4} borderTop="1px" borderColor="gray.200">
              <HStack>
                <Input placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  colorScheme="blue"
                  aria-label="Send message"
                  onClick={sendMessage} />
              </HStack>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Chats;