import { useState } from 'react';
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

const ChatForm = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(text);
    setText("");
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
              <Input type="text" placeholder="Enter your message" value={text} onChange={e => setText(e.target.value)} />
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