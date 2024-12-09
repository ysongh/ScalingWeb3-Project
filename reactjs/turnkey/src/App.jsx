import { TurnkeyProvider } from "@turnkey/sdk-react";

import BrowserSDK from "./BrowserSDK";
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
  return (
    <TurnkeyProvider config={turnkeyConfig}>
      <h1>First time using Turnkey </h1>
      <BrowserSDK />
    </TurnkeyProvider>
  )
}

export default App
