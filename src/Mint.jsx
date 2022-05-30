import WalletBalance from "./components/WalletBalance";
import { ethers } from "ethers";
import MyNFT from './artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useEffect, useState } from "react";
import MintForm from "./components/MintForm";
import NFT from "./components/NFT";
import Header from "./components/Header";


const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(config.DEPLOYED_CONTRACT_ADDRESS, MyNFT.abi, signer);

export default function Mint() {
  const [totalMinted, setTotalMinted] = useState(0);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  }

  useEffect(() => {
    getCount();
  }, []);
  
  return (
    <div className="container p-10 min-w-full">
      <Header message1={"Mint Your"} highlight={"NFT"} message2={"Today!"} />
      <WalletBalance />
      <MintForm getCount={getCount} />
      {totalMinted > 0 && 
        <p className="text-white text-2xl font-semibold text-center mt-14">
          You've already minted 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"> {totalMinted} artwork(s)!</span>
        </p>
      }
      <div className="flex flex-wrap justify-center my-5 gap-y-8 gap-x-5 mx-auto w-full">
        {Array(totalMinted).fill(0).map((_, i) => (
          <div key={i}>
            <NFT tokenId={i} />
          </div>
        ))}
      </div>
    </div>
  )
}
