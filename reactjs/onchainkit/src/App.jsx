import { Providers } from "./providers";
import { Rainbowproviders } from "./rainbowproviders";
import { WalletComponent } from "./Wallet";
import { RainbowWallet } from "./RainbowWallet";
import DisplayToken from "./components/DisplayToken";
import DisplayENS from "./components/DisplayENS";

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
        <DisplayENS />
      </Rainbowproviders>

      <DisplayToken />
    </> 
  )
}

export default App;
