import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { WalletGenerator } from './WalletGenerator';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', margin:'auto', width:'90%' }} >
      <div>
        <strong>Seed Phrase: {mnemonic}</strong>
      </div>

      {mnemonic ? (
        <button onClick={() => setMnemonic("")}>
          Delete Seed Phrase
        </button>
      ) : (
        <button
          onClick={() => {
            const newMnemonic = generateMnemonic();
            setMnemonic(newMnemonic);
          }}
        >
          Create Seed Phrase
        </button>
      )}

      <br />

      {mnemonic && <WalletGenerator mnemonic={mnemonic} />}
      </div>
    </>
    
  );
}

export default App;
