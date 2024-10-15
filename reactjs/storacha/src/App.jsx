import { useState } from 'react';
import { Authenticator, Provider, Uploader } from '@w3ui/react'

function App() {

  return (
    <>
      <h1>
        Storacha Example
      </h1>
      <Provider>
        <Authenticator>
          <Uploader>
          </Uploader>
        </Authenticator>
      </Provider>
    </>
  )
}

export default App;
