import axios from "axios";
import { useState } from "react"

export default function MintForm() {
  const [inputFile, setFile] = useState(null);
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');


  const types = ["image/jpeg", "image/png"];
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const url2 = `https://api.pinata.cloud/pinning/hashMetadata`;

  const fileChange = e => {
    setFile(null)
    let selected = e.target.files[0]

    if(selected && types.includes(selected.type)) {
      setFile(selected)
    }
    else {
      console.log("fail")
      setFile(null)
      // setThumbnailError('Please selected an image file (PNG or JPG)')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const metaData = { name: nftName, keyvalues: { description } };

    const formData = new FormData();
    formData.append("file", inputFile);
    formData.append("pinataMetadata", JSON.stringify(metaData));

    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': '08bf105bd0843dbc2a63',
          'pinata_secret_api_key': '75747fb2df258b14709aba05f906753db0a66a4c02cc82a90e0834e9cd9e6af1'
        }
      });
      console.log(res)
      
      // MetaData update
      const metaData2 = { ipfsPinHash: res.data.IpfsHash, ...metaData, keyvalues: { description, image: `ipfs://${res.data.IpfsHash}` }};
      
      const res2 = await axios.put(url2, metaData2, {
        headers: {
          'pinata_api_key': '08bf105bd0843dbc2a63',
          'pinata_secret_api_key': '75747fb2df258b14709aba05f906753db0a66a4c02cc82a90e0834e9cd9e6af1'
        }
      });
      console.log(res2);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>Name: </label>
          <input type="text" onChange={e => setNftName(e.target.value)} />
        </li>
        <li>
          <label>Description: </label>
          <input type="text" onChange={e => setDescription(e.target.value)} />
        </li>
        <input type="file" onChange={fileChange} />
      </ul>
      <button type="submit">Submit</button>
    </form>
  )
}
