"use client";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [wallets, setWallets] = useState([]);
  const [sourceWallet, setSourceWallet] = useState("");
  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [transferStatus, setTransferStatus] = useState("");

  const fetchWallets = async () => {
    try {
      const response = await axios.get("/api/wallets");
      setWallets(response.data.data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handleTransfer = async () => {
    try {
      const response = await axios.post("/api/transfer", {
        sourceWalletId: sourceWallet,
        destinationWalletId: destinationWallet,
        amount,
      });
      setTransferStatus("Transfer successful");
    } catch (error) {
      setTransferStatus(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Circle Integration</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Circle Wallet Management</h1>
        <button onClick={fetchWallets} className={styles.button}>
          Fetch Wallets
        </button>
        <ul className={styles.list}>
          {wallets.map((wallet) => (
            <li key={wallet.walletId} className={styles.listItem}>
              {wallet.description} - {wallet.walletId}
            </li>
          ))}
        </ul>

        <h2>Transfer Funds</h2>
        <input
          type="text"
          placeholder="Source Wallet ID"
          value={sourceWallet}
          onChange={(e) => setSourceWallet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination Wallet ID"
          value={destinationWallet}
          onChange={(e) => setDestinationWallet(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTransfer} className={styles.button}>
          Transfer
        </button>
        {transferStatus && <p>{transferStatus}</p>}
      </main>
    </div>
  );
}
