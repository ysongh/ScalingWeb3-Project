import React from 'react';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from '@ethsign/sp-sdk';
import { Button } from '@chakra-ui/react';

function Attestations() {
  const loadClient = () => {
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.polygonMumbai,
    });

    console.log(client);
  }

  return (
    <div>
      <h1>Attestations</h1>
      <Button onClick={loadClient}>
        Load Client
      </Button>
    </div>
  )
}

export default Attestations;