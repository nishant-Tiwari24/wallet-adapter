import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function SolBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [solValue, setSolValue] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      if (wallet.publicKey) {
        const value = await connection.getBalance(wallet.publicKey);
        setSolValue(value / LAMPORTS_PER_SOL);
      }
    }

    fetchBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div>
      <p>Sol Balance: {solValue} SOL</p>
    </div>
  );
}

export default SolBalance;
