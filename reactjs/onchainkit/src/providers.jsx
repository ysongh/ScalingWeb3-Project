import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
 
import { getConfig } from './wagmi'; // your import path may vary
 
export function Providers(props) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
 
  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base} // add baseSepolia for testing
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}