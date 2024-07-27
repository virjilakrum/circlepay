"use client";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [wallets, setWallets] = useState([]);

  const fetchWallets = async () => {
    try {
      const response = await axios.get("/api/wallets");
      setWallets(response.data.data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
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
              {wallet.description}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
