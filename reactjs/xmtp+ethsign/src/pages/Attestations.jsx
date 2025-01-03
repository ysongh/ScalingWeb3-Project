import { useState } from 'react';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  IndexService,
} from '@ethsign/sp-sdk';
import { Container, InputGroup, Input, InputRightElement, Text, Button } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

import TableList from '../components/TableList';

function Attestations() {
  const [ethsignClient, setethsignClient] = useState(null);
  const [schemaList, setschemaList] = useState([]);
  const [search, setSearch] = useState("");

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
    setschemaList(res.rows);
  }

  async function getAttestationByID() {
    const indexService = new IndexService('testnet');
    const res = await indexService.queryAttestation("onchain_evm_11155111_0x5");
    console.log(res);
  }

  return (
    <Container maxW='1100px'>
      <h1>Attestations</h1>
      <InputGroup bg='white' mt='4' mb="2">
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
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
      <Button onClick={getAttestationByID}>
        Get Attestation By ID
      </Button>
      <TableList schemaList={schemaList} />
    </Container>
  )
}

export default Attestations;