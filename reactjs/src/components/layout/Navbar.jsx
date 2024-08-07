import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Link } from '@chakra-ui/react';

function Navbar() {  
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
          <w3m-button />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;
