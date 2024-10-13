import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

function SendingSol() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Sent " + amount + " SOL to " + to);
  }
  return (
    <>
      <input
        type="text"
        placeholder="public key of reciever"
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTokens}>Send Tokens</button>
    </>
  );
}
