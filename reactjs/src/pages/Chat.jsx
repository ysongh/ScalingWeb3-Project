import { useEffect } from 'react';
import { useClient, Client } from '@xmtp/react-sdk';

function Chat({ userSigner, ethAddress }) {
  const { client, error, isLoading, initialize } = useClient();

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

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Awaiting signatures...";
  }

  return "Chats";
}

export default Chat;