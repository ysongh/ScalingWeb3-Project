import { FundButton } from '@coinbase/onchainkit/fund';

import { Providers } from "./providers";
import { Rainbowproviders } from "./rainbowproviders";
import { WalletComponent } from "./Wallet";
import { RainbowWallet } from "./RainbowWallet";
import DisplayToken from "./components/DisplayToken";
import DisplayENS from "./components/DisplayENS";
import OnchainCheckout from "./components/OnchainCheckout";

function App() {

  return (
    <>
      <Providers>
        <h1 className="text-center text-2xl">
          OnchainKit
        </h1>
        <WalletComponent />
        <OnchainCheckout />
        <h2>Create a funding flow to onboard users</h2>
        <FundButton />
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
