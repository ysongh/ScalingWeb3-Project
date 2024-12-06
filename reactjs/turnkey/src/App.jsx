import { useState } from "react";
import { Turnkey } from "@turnkey/sdk-browser";

import { TURNKEY_ORGANIZATION_ID } from "./keys";

function App() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

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
          name: name,
          displayName: displayName
        }
      }
    });

    console.log(credential);
  }
  
  return (
    <>
      <h1>First time using Turnkey </h1>
      <h2>Create Passkey Credential</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name"/>
      <button onClick={createPasskeyCredential}>
        Create
      </button>
    </>
  )
}

export default App
