import { Providers } from "./providers";

import { WalletComponent } from "./Wallet";

function App() {

  return (
    <Providers>
      <h1>OnchainKit</h1>
      <WalletComponent /> 
    </Providers>
  )
}

export default App;
