import { Authenticator, Provider, Uploader } from '@w3ui/react'

import { AuthenticationEnsurer } from './components/AuthenticationEnsurer';
import { SpaceEnsurer } from './components/SpaceEnsurer';

function App() {

  return (
    <>
      <h1>
        Storacha Example
      </h1>
      <Provider>
        <Authenticator>
          <AuthenticationEnsurer>
            <SpaceEnsurer>
              <Uploader>
              </Uploader>
            </SpaceEnsurer>
          </AuthenticationEnsurer>
        </Authenticator>
      </Provider>
    </>
  )
}

export default App;
