import { useEffect } from 'react';

import { useClient, Client } from '@xmtp/react-sdk';

function Chat({ userSigner, ethAddress }) {
  const { client, error, isLoading, initialize } = useClient();

  console.log(client, initialize, userSigner);

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

  const initXmtp = async () => {
    const options = {  
      env: "dev"  
    };

    const keys = await Client.getKeys(userSigner, {  
      ...options,  
      skipContactPublishing: true,  
      persistConversations: false,  
    });  
    console.log(keys);
    storeKeys(ethAddress, keys);  
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