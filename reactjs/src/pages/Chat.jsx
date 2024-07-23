import { useEffect, useState, useCallback } from 'react';
import { useClient, useCanMessage, useStartConversation, useConversations, useConsent, isValidAddress, Client } from '@xmtp/react-sdk';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { Center, Input, Button, Heading, Container } from '@chakra-ui/react';
import { ethers } from 'ethers';

import ChatForm from '../components/ChatForm';
import ConversationCard from '../components/ConversationCard';

function Chat() {
  const { client, error, isLoading, initialize } = useClient();
  const { address } = useWeb3ModalAccount();
  const { startConversation, newConversation } = useStartConversation();
  const { canMessage } = useCanMessage();
  const { allow, loadConsentList } = useConsent();
  const { conversations } = useConversations();

  const [toAddress, setToAddress] = useState("");
  const [userSigner, setUserSigner] = useState(null);

  console.log(conversations);

  useEffect(() => {
    if (userSigner) initXmtp();
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

  const sendMessage = async(text) => {
    if (await canMessage(toAddress)) {
      const conversation = await startConversation(toAddress, text);
      console.log(conversation);
    }
    else {
      alert("Cannot message this address");
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
       {!userSigner && <Button onClick={connectWallet}>
        Connect Wallet
      </Button>}
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
        <ChatForm sendMessage={sendMessage} />
      </Center>
      <Button colorScheme="blue" size="lg" onClick={sendMessage}>
        Send Message
      </Button>
      <Heading mt="2">
        List of existing conversations
      </Heading>
      {conversations?.map(c => (
        <div key={c.id}>
          <p>{c.peerAddress}</p>
          <ConversationCard topic={c.topic} />
        </div>
      ))}
      
    </Container>
  );
}

export default Chat;