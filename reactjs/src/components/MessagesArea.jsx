import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { useMessages } from '@xmtp/react-sdk';

function MessagesArea({ selectedConversation }) {
  const { messages } = useMessages(selectedConversation);
  console.log(messages);

  return (
    <VStack flex={1} overflowY="auto" p={4} spacing={4} alignItems="flex-start">
      {messages?.map(m => (
        <Message key={m.id} text={m.content} isUser={false} />
      ))}
     
      <Message text="I'm good, thanks! How about you?" isUser={true} />
    </VStack>
  );
};

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

export default MessagesArea;