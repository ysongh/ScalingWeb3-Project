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

export const initXmtp = async (userSigner, address, initialize) => {
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