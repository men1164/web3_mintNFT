import WalletBalance from "./WalletBalance";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useEffect, useState } from "react";
import MintForm from "./MintForm";
import NFT from "./NFT";
import Header from "./Header";

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
    console.log("fire getCount");
    setTotalMinted(parseInt(count));
  }

  useEffect(() => {
    getCount();
  }, []);
  
  return (
    <div className="bg-gradient-to-tr from-black to-[#411b87] min-h-screen">
      <div className="container p-10 min-w-full">
        <Header />
        <WalletBalance />
        <MintForm getCount={getCount} />
        <p className="text-white text-2xl font-semibold text-center mt-14">
          You've already minted 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"> {totalMinted} artwork(s)!</span>
        </p>
        <div className="flex flex-wrap justify-center my-5 gap-y-8 gap-x-5 mx-auto w-full">
          {Array(totalMinted).fill(0).map((_, i) => (
            <div key={i}>
              <NFT tokenId={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
