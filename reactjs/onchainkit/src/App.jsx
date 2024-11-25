import { Providers } from "./providers";
import { Rainbowproviders } from "./rainbowproviders";
import { WalletComponent } from "./Wallet";
import { RainbowWallet } from "./RainbowWallet";

function App() {

  return (
    <>
      <Providers>
        <h1 className="text-center">
          OnchainKit
        </h1>
        <WalletComponent /> 
      </Providers>

      <Rainbowproviders>
        <h1 className="text-center">
          Use RainbowKit for wallet aggregation
        </h1>
        <RainbowWallet /> 
      </Rainbowproviders>
    </> 
  )
}

export default App;
