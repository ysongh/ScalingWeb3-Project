import { useEffect, useState } from 'react';
import { useClient, useCanMessage, useStartConversation, useConsent, isValidAddress, Client } from '@xmtp/react-sdk';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { Center, Input, Button, Container } from '@chakra-ui/react';

import ChatForm from '../components/ChatForm';

function Chat({ userSigner }) {
  const { client, error, isLoading, initialize } = useClient();
  const { address } = useWeb3ModalAccount();
  const { startConversation, newConversation } = useStartConversation();
  const { canMessage } = useCanMessage();
  const { allow } = useConsent();

  const [toAddress, setToAddress] = useState("");

  console.log(client);

  useEffect(() => {
    if (userSigner) initXmtp();
  }, [userSigner, address])

  const ENCODING = "binary";

  const buildLocalStorageKey = (walletAddress) =>
    walletAddress ? `xmtp:dev:keys:${walletAddress}` : "";

  const storeKeys = (walletAddress, keys) => {  
    localStorage.setItem(  
      buildLocalStorageKey(walletAddress),  
      Buffer.from(keys).toString(ENCODING),  
    );  
  };

  const allowContact = async () => {
    try {
      await allow([toAddress]);
    } catch (error) {
      console.error(error);
    }
  };

  const checkAddress = async () => {
    if (isValidAddress(toAddress)) {
      alert("yes");
    } else {
      alert("no");
    }
  }

  const loadKeys = (walletAddress) => {  
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress));  
    return val ? Buffer.from(val, ENCODING) : null;  
  };  

  const initXmtp = async () => {
    const options = {  
      persistConversations: false,
      env: "dev",
    };

    let keys = loadKeys(address);  
    
    if (!keys) {
      keys = await Client.getKeys(userSigner, {  
        ...options,  
        skipContactPublishing: true,  
        persistConversations: false,  
      });  
      storeKeys(address, keys);
    }

    await initialize({ keys, options, userSigner });
  }

  const sendMessage = async() => {
    const add = "0x3F11b27F323b62B159D2642964fa27C46C841897";
    if (await canMessage(add)) {
      const newConversation = await newConversation("0x3F11b27F323b62B159D2642964fa27C46C841897");
      const conversation = await startConversation(add, "hi");
      console.log(conversation)
    }
  }

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Awaiting signatures...";
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter Address to Contact"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)} />
      <Button colorScheme="blue" onClick={checkAddress}>
        Check Message
      </Button>
      <Button colorScheme="blue" onClick={allowContact}>
        Allow Contact
      </Button>
      <Center>
        <ChatForm />
      </Center>
      <Button colorScheme="blue" size="lg" onClick={sendMessage}>
        Send Message
      </Button>
    </Container>
  );
}

export default Chat;