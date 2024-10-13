import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// default styling
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import SolBalance from "./components/SolBalance";

const App = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex  items-center justify-center bg-zinc-900 text-zinc-200 font-poppins">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h1 className="text-4xl font-bold mb-8 text-center text-zinc-100">
                Solana Airdrop
              </h1>
              <div className="flex justify-center mb-6">
                <WalletMultiButton className="bg-zinc-700 hover:bg-zinc-600 text-sm font-semibold px-4 py-2 rounded-md" />
                <WalletDisconnectButton className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm font-semibold px-4 py-2 rounded-md" />
              </div>
              <Airdrop />
              <SolBalance />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
