import { Link as ReactLink } from 'react-router-dom';
import { ethers } from 'ethers';
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react';

function Navbar({ ethAddress, setETHAddress, setUserSigner }) {
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    setUserSigner(signer);
  }
  
  return (
    <Box p={2}>
      <Container maxW='1100px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">Scaling Web3</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/chat">Chat</Link>
          <Link as={ReactLink} to="/attestations">Attestations</Link>
          <Spacer />
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
          <w3m-button />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;
