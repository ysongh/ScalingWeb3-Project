import { useState } from 'react';
import { Name } from '@coinbase/onchainkit/identity';
import { IdentityCard } from '@coinbase/onchainkit/identity'; 

function DisplayENS() {
  const [val, setVal] = useState("");

  return (
    <>
      <div className="bg-white shadow-md rounded-lg w-[500px] p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Find ENS name</h2>
        <div className="relative">
          <input
            type="text"
            value={val}
            onChange={e => setVal(e.target.value)}
            className="w-full px-4 py-3 prounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pt-4 pb-2"
            placeholder="0x0"
          />
          <label
            htmlFor="name"
            className={`absolute top-4 left-4 text-gray-500 transition-all duration-300 ${
              val ? 'text-xs -translate-y-3' : 'text-base'
            }`}
          >
            Enter Address:
          </label>
        </div>
        <Name address={val}/>
        <IdentityCard
          address={val}
        /> 
      </div>
    </>
  )
}

export default DisplayENS;