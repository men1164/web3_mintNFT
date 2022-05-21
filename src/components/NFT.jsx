import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import axios from "axios";

// Replace deployed contract's address here
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

export default function NFT({ tokenId }) {
  const [uri, setUri] = useState('');
  const [metaData, setMetaData] = useState('');

  const getURI = async () => {
    const res = await contract.tokenURI(tokenId);
    setUri(res)
    console.log("fire getURI")
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
          'pinata_api_key': '08bf105bd0843dbc2a63',
          'pinata_secret_api_key': '75747fb2df258b14709aba05f906753db0a66a4c02cc82a90e0834e9cd9e6af1'
        }
      });

      console.log(res.data.rows[0]);
      setMetaData(res.data.rows[0]);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getURI();
    if(uri){
      getMetaData();
    }
  }, [uri])

  return (
    <div>
      {uri && <p>{uri}</p>}
      <p>{tokenId}</p>
      <img src={`https://ipfs.io/ipfs/${uri}`} />
      {metaData && <p>{metaData.metadata.name} and {metaData.metadata.keyvalues.description}</p>}
    </div>
  )
}
