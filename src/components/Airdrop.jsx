import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState();

  async function requireAirdrop() {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        placeholder="Enter amount"
        className="w-full px-4 py-2 mb-4 bg-zinc-700 text-zinc-200 border border-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-zinc-200 font-semibold rounded-md transition duration-200"
        onClick={requireAirdrop}
      >
        Request Airdrop
      </button>
    </div>
  );
}

export default Airdrop;
