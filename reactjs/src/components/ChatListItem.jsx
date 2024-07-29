import React from 'react';
import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { useLastMessage } from "@xmtp/react-sdk";

function ChatListItem({ topic, conversation }) {
  const lastMessage = useLastMessage(topic);

  console.log(lastMessage, conversation);
  return (
    <div>
      <p>{lastMessage?.content}</p>
      <HStack spacing={3}>
        <Avatar name={conversation?.walletAddress} size="sm" />
        <Box flex={1}>
          <Text fontWeight="bold">{conversation?.walletAddress}</Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {lastMessage?.content}
          </Text>
        </Box>
      </HStack>
    </div>
  )
}

export default ChatListItem;