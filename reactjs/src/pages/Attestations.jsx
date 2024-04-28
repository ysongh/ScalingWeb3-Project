import { useState } from 'react';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  IndexService,
} from '@ethsign/sp-sdk';
import { Button } from '@chakra-ui/react';

function Attestations() {
  const [ethsignClient, setethsignClient] = useState(null);

  const loadClient = () => {
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
    });

    console.log(client);
    setethsignClient(client);
  }

  const createSchema = async () => {
    const createSchemaRes = await ethsignClient.createSchema({
      name: 'test',
      data: [{ name: 'name', type: 'string' }],
    });
    console.log(createSchemaRes);
    // schemaId: "0x55"
    // txHash: "0x52c4162741e463a5f0d0577b43f19c87547413dc5b998a715f99096150b40483"
  }

  const createAttestation = async () => {
    const createAttestationRes = await ethsignClient.createAttestation({
      schemaId: '0x55',
      data: { name: 'test' },
      indexingValue: 'xxx',
    });
    console.log(createAttestationRes);
  }

  async function getSchemaListFromIndexService() {
    const indexService = new IndexService('testnet');
    const res = await indexService.querySchemaList({ page: 1 });
    console.log(res);
  }

  return (
    <div>
      <h1>Attestations</h1>
      <Button onClick={loadClient}>
        Load Client
      </Button>
      <Button onClick={createSchema}>
        Create Schema
      </Button>
      <Button onClick={createAttestation}>
        Create Attestation
      </Button>
      <Button onClick={getSchemaListFromIndexService}>
        Get Schema List From Index Service
      </Button>
    </div>
  )
}

export default Attestations;