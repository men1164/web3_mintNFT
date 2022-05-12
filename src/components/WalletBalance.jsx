import { ethers } from "ethers";
import { useState } from "react";


export default function WalletBalance() {
  const [balance, setBalance] = useState();

  // This function try to get balance from Metamask account
  const getBalance = async () => {
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts"});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  }

  return (
    <div>
      <h5>Your Balance: {balance}</h5>
      <button onClick={() => getBalance()}>Show My Balance</button>
    </div>
  )
}
