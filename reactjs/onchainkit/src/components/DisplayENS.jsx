import { useState } from 'react';
import { Name } from '@coinbase/onchainkit/identity';

function DisplayENS() {
  const [val, setVal] = useState("");

  return (
    <>
      <label>Enter Address: </label>
      <input value={val} onChange={e => setVal(e.target.value)} />
      <Name address={val}/>
    </>
  )
}

export default DisplayENS;