/** @format */

import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

// Detect the MetaMask Ethereum provider

const HomePage = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    getProvider();
  }, []);

  // Prompt users to connect to MetaMask

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts: any = await (window as any).ethereum.request({
      method: "eth_requestAccounts"
    });
    updateWallet(accounts);
  };

  return (
    <div className='App'>
      <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>
      {hasProvider && (
        <button
          style={{
            backgroundColor: "purple",
            textAlign: "center",
            padding: "5rch",
            color: "white",
            justifyContent: "center",
            width: "100%"
          }}
          onClick={handleConnect}>
          Connect MetaMask
        </button>
      )}
      {wallet.accounts.length > 0 && (
        <div>Wallet Accounts: {wallet.accounts[0]}</div>
      )}
    </div>
  );
};
export default HomePage;
