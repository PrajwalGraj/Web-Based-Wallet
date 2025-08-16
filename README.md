# Web-based-Wallet

A Web-based wallet generator for **Solana** and **Ethereum** using a single mnemonic seed phrase. This project creates multiple wallets, view public addresses, and optionally toggle visibility of private keys.

## Features

- Generate a **new mnemonic seed phrase**.
- Derive **Solana** and **Ethereum** wallets from the mnemonic.
- View **public and private keys** for each wallet.
- Toggle visibility of private keys for security.
- Create multiple wallets from the same mnemonic.

## Tech Stack / Dependencies

- **React** – Frontend framework
- **bip39** – Mnemonic generation and seed derivation
- **ed25519-hd-key** – Solana key derivation
- **@solana/web3.js** – Solana wallet handling
- **tweetnacl** – Solana keypair generation
- **ethers** – Ethereum wallet handling

## Usage

Click Create Seed Phrase to generate a mnemonic.

View Solana and Ethereum wallets derived from the mnemonic.

Click Create New Wallet to generate additional accounts.

Use the Show / Hide buttons to toggle private key visibility.

## Security Note

**This project is for educational purposes. Do not use generated wallets for real funds, as private keys are exposed in the browser.**
