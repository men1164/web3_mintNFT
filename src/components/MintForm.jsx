import axios from "axios";
import { useState } from "react"
import { ethers } from "ethers";
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

// Replace deployed contract's address here
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

export default function MintForm({ getCount }) {
  const [inputFile, setFile] = useState(null);
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [error, setIsError] = useState(null);
  const [fileError, setFileError] = useState(null);


  const types = ["image/jpeg", "image/png"];
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const url2 = `https://api.pinata.cloud/pinning/hashMetadata`;
  let cid;

  const fileChange = e => {
    setFile(null)
    let selected = e.target.files[0]

    if(selected && types.includes(selected.type)) {
      setFile(selected);
      setFileError(null);
    }
    else {
      console.log("fail")
      setFile(null)
      setFileError('Please selected an image file (PNG or JPG)')
    }
  }

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, cid, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getCount();
  };

  const clearForm = () => {
    setNftName('');
    setDescription('');
    setFile(null);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsMinting(false);
    setIsError(null);

    const metaData = { name: nftName, keyvalues: { description } };

    const formData = new FormData();
    formData.append("file", inputFile);
    formData.append("pinataMetadata", JSON.stringify(metaData));

    try {
      setIsMinting(true);
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': '08bf105bd0843dbc2a63',
          'pinata_secret_api_key': '75747fb2df258b14709aba05f906753db0a66a4c02cc82a90e0834e9cd9e6af1'
        }
      });
      console.log(res)
      cid = res.data.IpfsHash;
      
      // MetaData for NFTs update
      const metaData2 = { ipfsPinHash: res.data.IpfsHash, ...metaData, keyvalues: { description, image: `ipfs://${res.data.IpfsHash}` }};
      
      const res2 = await axios.put(url2, metaData2, {
        headers: {
          'pinata_api_key': '08bf105bd0843dbc2a63',
          'pinata_secret_api_key': '75747fb2df258b14709aba05f906753db0a66a4c02cc82a90e0834e9cd9e6af1'
        }
      });
      console.log(res2);
      
      mintToken();
      setIsMinting(false);
      clearForm();
    }
    catch(err) {
      setIsMinting(false);
      console.log(err.message);
      setIsError(err.message);
    }
  }

  return (
    <div className="p-5 mt-10 mx-auto h-full w-2/5 bg-gray-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border border-gray-100 border-opacity-40">
      <form className="text-white" onSubmit={handleSubmit}>
        <label className="block">
          <span className="block mb-1">Name: </span>
          <input className="shadow border border-opacity-20 border-white bg-gray-600 text-gray-400 appearance-none rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={e => setNftName(e.target.value)} value={nftName} required />
        </label>
        <label className="block mt-2">
          <span className="block mb-1">Description: </span>
          <textarea className="shadow border border-opacity-20 border-white bg-gray-600 text-gray-400 appearance-none rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={e => setDescription(e.target.value)} rows="3" value={description} required />
        </label>
        <label className="block mt-2">
          <span className="block mb-1">File: </span>
          <input className="file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100 hover:file:cursor-pointer hover:cursor-pointer" 
          type="file" onChange={fileChange} required />
        </label>
        {error &&
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
        }
      </form>
    </div>
  )
}
