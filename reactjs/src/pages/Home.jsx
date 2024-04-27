import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heading,
  Text,
  Button,
  Container,
} from '@chakra-ui/react';

function Home() {
  const router = useNavigate();

  return (
    <div>
      <Container mt="16" mb="20" textAlign="center">
        <Heading as="h1" size="2xl" mb="6">
          Welcome to Scaling Web3
        </Heading>
        <Text fontSize="xl" color="gray.600" mb="8">
         A random Scaling Web3 project
        </Text>
        <Button colorScheme="blue" size="lg" onClick={() => router('/attestations')}>
          Get Started
        </Button>
      </Container>
    </div>
  )
}

export default Home;