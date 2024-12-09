import { useState } from "react";
import { Turnkey } from "@turnkey/sdk-browser";
import { TurnkeyProvider } from "@turnkey/sdk-react";

import { TURNKEY_ORGANIZATION_ID } from "./keys";

const turnkeyConfig = {
  apiBaseUrl: "https://api.turnkey.com",
  // prefix with NEXT_PUBLIC for NextJS
  defaultOrganizationId: TURNKEY_ORGANIZATION_ID,
  iframeUrl: "https://auth.turnkey.com",
  // The URL that the Turnkey SDK will send requests to for signing operations.
  // This should be a backend endpoint that your application controls.
  serverSignUrl: "http://localhost:4000/api"
}

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
    <TurnkeyProvider config={turnkeyConfig}>
      <h1>First time using Turnkey </h1>
      <h2>Create Passkey Credential</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name"/>
      <button onClick={createPasskeyCredential}>
        Create
      </button>
    </TurnkeyProvider>
  )
}

export default App
