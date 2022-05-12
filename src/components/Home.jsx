import WalletBalance from "./WalletBalance";
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useEffect, useState } from "react";
import NFTImage from "./NFTImage";

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

  return (
    <div>
      <WalletBalance />
      {Array(totalMinted + 1).fill(0).map((_, i) => (
        <div key={i}>
          <NFTImage tokenId={i} getCount={getCount} />
        </div>
      ))}
    </div>
  )
}
