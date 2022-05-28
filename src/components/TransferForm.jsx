import { useState } from "react"
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export default function TransferForm() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  const handleTransfer = async e => {
    e.preventDefault();

    try {
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(amount)
      })
      await tx.wait();
      console.log(tx);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  return (
    <div className="p-5 mt-10 mx-auto h-full w-2/5 bg-gray-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border border-gray-100 border-opacity-40">
      <form className="text-white" onSubmit={handleTransfer}>
        <label className="block mt-2">
          <span className="block mb-1">To Address: </span>
          <input className="shadow border border-opacity-20 border-white bg-gray-600 text-gray-400 appearance-none rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setRecipientAddress(e.target.value)} type="text" required />
        </label>
        <label className="block mt-2">
          <span className="block mb-1">Amount (ETH): </span>
          <input className="shadow border border-opacity-20 border-white bg-gray-600 text-gray-400 appearance-none rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setAmount(e.target.value)} type="number" required />
        </label>
        <button className="block mt-5 bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-400/50 shadow-indigo-500/50 rounded-full w-1/2 mx-auto px-3 py-2" type="submit">
          Transfer
        </button>
        {/* {error &&
          <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
        }
        {fileError &&
          <p className="mt-2 text-sm text-red-500 text-center">{fileError}</p>
        }
        {!isMinting && 
          <button className="block mt-5 bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-400/50 shadow-indigo-500/50 rounded-full w-1/2 mx-auto px-3 py-2" type="submit">
            Mint
          </button>
        }
        {isMinting && 
          <button className="block mt-5 bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-400/50 shadow-indigo-500/50 rounded-full w-1/2 mx-auto px-3 py-2" type="submit" disabled>
            Processing...
          </button>
        } */}
      </form>
    </div>
  )
}
