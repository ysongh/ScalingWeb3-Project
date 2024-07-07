import { useEffect } from 'react';
import { useClient, useCanMessage, useStartConversation, Client } from '@xmtp/react-sdk';
import { Button, Container } from '@chakra-ui/react';

function Chat({ userSigner, ethAddress }) {
  const { client, error, isLoading, initialize } = useClient();
  const { startConversation } = useStartConversation();
  const { canMessage } = useCanMessage();

  console.log(client);

  useEffect(() => {
    if (userSigner) initXmtp();
  }, [userSigner])

  const ENCODING = "binary";

  const buildLocalStorageKey = (walletAddress) =>
    walletAddress ? `xmtp:dev:keys:${walletAddress}` : "";

  const storeKeys = (walletAddress, keys) => {  
    localStorage.setItem(  
      buildLocalStorageKey(walletAddress),  
      Buffer.from(keys).toString(ENCODING),  
    );  
  };

  const loadKeys = (walletAddress) => {  
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress));  
    return val ? Buffer.from(val, ENCODING) : null;  
  };  

  const initXmtp = async () => {
    const options = {  
      persistConversations: false,
      env: "dev",
    };

    let keys = loadKeys(ethAddress);  
    
    if (!keys) {
      keys = await Client.getKeys(userSigner, {  
        ...options,  
        skipContactPublishing: true,  
        persistConversations: false,  
      });  
      storeKeys(ethAddress, keys);
    }

    await initialize({ keys, options, userSigner });
  }

  const sendMessage = async() => {
    const add = "0x3F11b27F323b62B159D2642964fa27C46C841897";
    if (await canMessage(add)) {
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
      <Button colorScheme="blue" size="lg" onClick={sendMessage}>
        Send Message
      </Button>
    </Container>
  );
}

export default Chat;