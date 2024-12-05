import { Turnkey } from "@turnkey/sdk-browser";

import { TURNKEY_ORGANIZATION_ID } from "./keys";

function App() {
  const turnkey = new Turnkey({
    apiBaseUrl: "https://api.turnkey.com",
    defaultOrganizationId: TURNKEY_ORGANIZATION_ID,
  });
  
  const passkeyClient = turnkey.passkeyClient();
  console.log(passkeyClient);
  
  return (
    <>
      <h1>First time using Turnkey </h1>
    </>
  )
}

export default App
