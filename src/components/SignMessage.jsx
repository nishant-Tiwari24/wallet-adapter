import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";

function SignMessage() {
  const [message, SetMessage] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function createSignature() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    alert("success", `Message signature: ${bs58.encode(signature)}`);
  }
  return (
    <>
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => SetMessage(e.target.value)}
      />
      <button onClick={createSignature}>Sign Message</button>
    </>
  );
}
