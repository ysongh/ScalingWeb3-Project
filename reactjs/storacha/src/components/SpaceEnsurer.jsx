import { useW3 } from '@w3ui/react';
import React, { useEffect } from 'react';

export function SpaceEnsurer ({ children }) {
  const [{ client }] = useW3();

  useEffect(function () {
    async function ensureCurrentSpace () {
      if ((client != null) && (client.currentSpace() == null)) {
        const space = (client.spaces().length > 0)
          ? (
              client.spaces()[0]
            )
          : (
              await client.createSpace('example space')
            )
        if (space != null) {
          await client.setCurrentSpace(space.did())
        }
      }
    }
    void ensureCurrentSpace();
  }, [client])

  return (client != null) ? children : <p>Loading...</p>;
}