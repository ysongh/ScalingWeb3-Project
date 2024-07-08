import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react';

const ChatForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <Card maxWidth="400px" width="100%" mb="3">
      <CardHeader>
        <Heading size="md">Contact Form</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Input type="text" placeholder="Enter your message" />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Submit
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default ChatForm;