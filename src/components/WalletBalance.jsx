import { ethers } from "ethers";
import { useEffect, useState } from "react";


export default function WalletBalance() {
  const [balance, setBalance] = useState(null);

  // This function try to get balance from Metamask account
  const getBalance = async () => {
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts"});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="min-w-full text-center mt-3">
      {balance && 
        <h5 className="text-2xl text-white font-medium">Balance: {balance} ETH</h5>
      }
    </div>
  )
}
