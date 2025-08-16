import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";

export function WalletGenerator({ mnemonic }) {
  const [wallets, setWallets] = useState([]);
  const [solanaIndex, setSolanaIndex] = useState(0);
  const [ethereumIndex, setEthereumIndex] = useState(0);
  const [visibleKeys, setVisibleKeys] = useState({}); 

  function createWallet() {
    const seedBuffer = mnemonicToSeedSync(mnemonic);

    // ---- Solana ----
    const solanaPath = `m/44'/501'/${solanaIndex}'/0'`;
    const solanaDerived = derivePath(solanaPath, seedBuffer.toString("hex")).key;
    const solanaSecret = nacl.sign.keyPair.fromSeed(solanaDerived).secretKey;
    const solanaKeypair = Keypair.fromSecretKey(solanaSecret);
    setSolanaIndex(solanaIndex + 1);

    // ---- Ethereum ----
    const ethereumPath = `m/44'/60'/${ethereumIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seedBuffer);
    const childNode = hdNode.derivePath(ethereumPath);
    const ethereumWallet = new Wallet(childNode.privateKey);
    setEthereumIndex(ethereumIndex + 1);

    setWallets([
      ...wallets,
      {
        solana: {
          publicKey: solanaKeypair.publicKey.toBase58(),
          privateKey: Buffer.from(solanaSecret).toString("hex"),
        },
        ethereum: {
          publicKey: ethereumWallet.address,
          privateKey: ethereumWallet.privateKey, 
        },
      },
    ]);
  }

  function toggleVisibility(index, chain) {
    setVisibleKeys((prev) => ({
      ...prev,
      [`${index}-${chain}`]: !prev[`${index}-${chain}`],
    }));
  }

  function maskKey(key) {
    return "•".repeat(key.length);
  }

  return (
    <>
      <div>
        {wallets.map((wallet, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <strong>Account {i+1}</strong>
            <br />

            {/* Solana */}
            Solana: {wallet.solana.publicKey}
            <br />
            Private:{" "}
            {visibleKeys[`${i}-solana`]
              ? wallet.solana.privateKey
              : maskKey(wallet.solana.privateKey)}
            <button onClick={() => toggleVisibility(i, "solana")}>
              {visibleKeys[`${i}-solana`] ? "🙈 Hide" : "👁️ Show"}
            </button>
            <br />

            {/* Ethereum */}
            Ethereum: {wallet.ethereum.publicKey}
            <br />
            Private:{" "}
            {visibleKeys[`${i}-ethereum`]
              ? wallet.ethereum.privateKey
              : maskKey(wallet.ethereum.privateKey)}
            <button onClick={() => toggleVisibility(i, "ethereum")}>
              {visibleKeys[`${i}-ethereum`] ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={createWallet}>Create New Wallet</button>
    </>
  );
}
