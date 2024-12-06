import { Turnkey } from "@turnkey/sdk-browser";

import { TURNKEY_ORGANIZATION_ID } from "./keys";

function App() {
  const turnkey = new Turnkey({
    apiBaseUrl: "https://api.turnkey.com",
    defaultOrganizationId: TURNKEY_ORGANIZATION_ID,
  });
  
  const passkeyClient = turnkey.passkeyClient();
  console.log(passkeyClient);

  const createPasskeyCredential = async () => {
    const credential = await passkeyClient.createUserPasskey({
      publicKey: {
        user: {
          name: "",
          displayName: ""
        }
      }
    });

    console.log(credential);
  }
  
  return (
    <>
      <h1>First time using Turnkey </h1>
      <button onClick={createPasskeyCredential}>
        Create Passkey Credential
      </button>
    </>
  )
}

export default App
