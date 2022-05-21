import WalletBalance from "./WalletBalance";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useEffect, useState } from "react";
import NFTImage from "./NFTImage";
import MintForm from "./MintForm";
import axios from "axios";
import NFT from "./NFT";

// Replace deployed contract's address here
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

export default function Home() {
  const [totalMinted, setTotalMinted] = useState(0);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  }

  useEffect(() => {
    getCount();
  }, []);

  // const testAuth = async () => {
  //   const uri = "https://api.pinata.cloud/data/testAuthentication"

  //   try {
  //     const res = await axios.get(uri, {
  //       headers: {
  //         'pinata_api_key': 'dcd3cc9992142fc975b0',
  //         'pinata_secret_api_key': 'dca4f4481dcca07b93f0dd3c610ce8584419de372f5aa5b8498d523bdead94aa'
  //       }
  //     })

  //     console.log(res)
  //   } catch(err) {
  //     console.log(err.message)
  //   }
  // }

  // testAuth();
  
  return (
    <div>
      {/* <WalletBalance /> */}
      <MintForm getCount={getCount} />
      {Array(totalMinted).fill(0).map((_, i) => (
        <div key={i}>
          {/* <NFTImage tokenId={i} getCount={getCount} /> */}
          <NFT tokenId={i} getCount={getCount} />
        </div>
      ))}
    </div>
  )
}
