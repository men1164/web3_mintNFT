import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import axios from "axios";


const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(config.CONTRACT_ADDRESS, MyNFT.abi, signer);

export default function NFT({ tokenId }) {
  const [uri, setUri] = useState('');
  const [metaData, setMetaData] = useState('');

  const getURI = async () => {
    const res = await contract.tokenURI(tokenId);
    setUri(res)
  }

  const showURI = () => {
    alert(uri);
  }

  const getMetaData = async () => {
    const values = {
      image: {
        value: `ipfs://${uri}`,
        op: "eq"
      }
    };
    const endPoint = `https://api.pinata.cloud/data/pinList?metadata[keyvalues]=${JSON.stringify(values)}`

    try {
      const res = await axios.get(endPoint, {
        headers: {
          'pinata_api_key': config.PINATA_API_KEY,
          'pinata_secret_api_key': config.pinata_secret_api_key
        }
      });
      setMetaData(res.data.rows[0]);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  // fire getURI first when component rendered
  useEffect(() => {
    getURI();
    if(uri){
      getMetaData();
    }
  }, [uri])

  return (
    <div className="text-white p-4 w-72 h-content bg-white bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 shadow-indigo-400/50 shadow-lg rounded-lg border border-gray-100 border-opacity-40">
      {metaData && 
        <p className="block text-center font-bold tracking-widest text-lg mb-2">{metaData.metadata.name}</p>
      }
      <img className="w-64 mx-auto h-48 object-cover rounded-md" src={`https://ipfs.io/ipfs/${uri}`} />
      {metaData &&
        <p className="my-2 w-full h-12 text-sm text-gray-400 text-opacity-80 text-center break-words overflow-auto">{metaData.metadata.keyvalues.description}</p>
      }
      <button className="bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-400/50 shadow-indigo-500/50 rounded-full w-1/2 block mx-auto px-2 py-1" onClick={showURI}>Show CID</button>
    </div>
  )
}
