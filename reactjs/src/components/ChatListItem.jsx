import React from 'react';
import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { useLastMessage } from "@xmtp/react-sdk";

function ChatListItem({ topic, conversation, setSelectedConversation }) {
  const lastMessage = useLastMessage(topic);

  console.log(lastMessage, conversation);
  return (
    <HStack spacing={3} onClick={() => setSelectedConversation(conversation)}>
      <Avatar name={conversation?.walletAddress} size="sm" />
      <Box flex={1}>
        <Text fontWeight="bold">
          {conversation?.walletAddress && conversation?.walletAddress.slice(0, 5) + "..." + conversation?.walletAddress.slice(37, 42)}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          {lastMessage?.content}
        </Text>
      </Box>
    </HStack>
  );
};

export default ChatListItem;