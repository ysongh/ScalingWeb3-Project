import { useState } from 'react';
import { Authenticator, Provider, Uploader } from '@w3ui/react'

import { AuthenticationEnsurer } from './components/AuthenticationEnsurer';

function App() {

  return (
    <>
      <h1>
        Storacha Example
      </h1>
      <Provider>
        <Authenticator>
          <AuthenticationEnsurer>
            <Uploader>
            </Uploader>
          </AuthenticationEnsurer>
        </Authenticator>
      </Provider>
    </>
  )
}

export default App;
