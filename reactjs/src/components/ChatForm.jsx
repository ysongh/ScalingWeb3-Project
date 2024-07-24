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
import { isValidAddress, useConsent } from '@xmtp/react-sdk';

const ChatForm = ({ sendMessage }) => {
  const [toAddress, setToAddress] = useState("");
  const [text, setText] = useState("");

  const { allow } = useConsent();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(toAddress, text);
    setText("");
  };

  const checkAddress = async () => {
    if (isValidAddress(toAddress)) {
      alert("yes");
    } else {
      alert("no");
    }
  }

  const allowContact = async () => {
    try {
      await allow([toAddress]);
    } catch (error) {
      console.error(error);
    }
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
              <FormLabel>Address</FormLabel>
              <Input type="text" placeholder="Enter your address 0x..."value={toAddress} onChange={e => setToAddress(e.target.value)} />
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
        <Button colorScheme="blue" onClick={checkAddress} mt="3">
          Check Message
        </Button>
        <Button colorScheme="blue" onClick={allowContact} mt="3">
          Allow Contact
        </Button>
      </CardBody>
    </Card>
  );
};

export default ChatForm;