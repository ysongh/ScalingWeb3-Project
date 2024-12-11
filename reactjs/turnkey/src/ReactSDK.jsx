import { useTurnkey } from "@turnkey/sdk-react";

function ReactSDK() {
  const { passkeyClient } = useTurnkey();

  const loginWithPasskey = async () => {
    await passkeyClient?.login();
  };

  return (
    <div>
      <h2>React SDK to interact with Turnkey</h2>
      <h3>Login With Passkey</h3>
      <button onClick={loginWithPasskey}>
        Login
      </button>
    </div>
  )
}

export default ReactSDK