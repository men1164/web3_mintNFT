// Change to display each NFT only, move all minting functions to MintForm

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

export default function NFTImage({ tokenId, getCount }) {
  // replace pinata content's id here
  const contentId = "Qmajhpj5iq3PD1yRnQQJ5D94mYY4JDunx4Tge4jR4UJTja";

  const metaDataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `src/img/${tokenId}.png`;
  
  const [isMinted, setIsMinted] = useState(false);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metaDataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metaDataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };
  
  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  return (
    <div>
      <img src={isMinted ? imageURI : ''} style={{ width: '160px' }} />
        <h5>ID #{tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button onClick={getURI}>
            Taken! Show URI
          </button>
        )}
    </div>
  );
}
