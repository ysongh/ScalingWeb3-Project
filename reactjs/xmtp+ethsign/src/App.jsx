import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useClient } from "@xmtp/react-sdk";

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Attestations from './pages/Attestations';
import Chat from './pages/Chat';
import Chats from './pages/Chats';

function App() {
  const { address } = useWeb3ModalAccount();
  const { disconnect } = useClient();

  useEffect(() => {
    void disconnect();
  }, [address]);

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/test"
            element={
              <h1>Test</h1>} />
          <Route
            path="/chat"
            element={
              <Chat />} />
          <Route
            path="/chats"
            element={
              <Chats />} />
          <Route
            path="/attestations"
            element={
              <Attestations />} />
          <Route
            path="/"
            element={
              <Home />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
