import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

// Replace deployed contract's address here
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

export default function NFT({ tokenId, getCount }) {
  const [uri, setUri] = useState('');

  const getURI = async () => {
    const res = await contract.tokenURI(tokenId);
    setUri(res)
  }
  
  useEffect(() => {
    getURI();
  }, [])

  return (
    <div>
      {uri && <p>{uri}</p>}
      <p>{tokenId}</p>
      <img src={`https://ipfs.io/ipfs/${uri}`} alt="" />
    </div>
  )
}
