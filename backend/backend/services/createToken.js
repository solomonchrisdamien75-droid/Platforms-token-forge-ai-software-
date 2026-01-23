import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl
} from "@solana/web3.js";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo
} from "@solana/spl-token";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export async function createToken({
  name,
  symbol,
  decimals,
  supply
}) {
  const connection = new Connection(
    process.env.DEVNET_RPC || clusterApiUrl("devnet"),
    "confirmed"
  );

  const walletPath = fs.existsSync("backend/backend-wallet.json")
    ? "backend/backend-wallet.json"
    : "backend-wallet.json";

  const secret = JSON.parse(fs.readFileSync(walletPath));
  const payer = Keypair.fromSecretKey(Uint8Array.from(secret));

  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    decimals
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  const signature = await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer.publicKey,
    supply * Math.pow(10, decimals)
  );

  return {
    mint: mint.toBase58(),
    tokenAccount: tokenAccount.address.toBase58(),
    signature
  };
}
