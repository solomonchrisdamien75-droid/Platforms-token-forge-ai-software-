import {
  createInitializeMintInstruction,
  getMintLen,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { getConnection } from '../utils/connection.js';
import {
  revokeMintAuthority,
  revokeFreezeAuthority,
  revokeCloseAuthority,
} from './authorityManager.js';
import config from '../config/index.js';

export const createToken = async (tokenData) => {
  try {
    const connection = getConnection();
    const {
      decimals = 6,
      name,
      symbol,
      revokeAuthorities = true,
    } = tokenData;

    // Get backend payer (should be imported from .env)
    const backendPublicKeyStr = config.backendPublicKey;
    if (!backendPublicKeyStr) {
      throw new Error(
        'BACKEND_PUBLIC_KEY not set in environment. Please run: npm run generate-wallet'
      );
    }

    const payerPublicKey = new PublicKey(backendPublicKeyStr);

    // Create mint keypair
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey;

    // Get lamports required for mint account
    const lamports = await connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payerPublicKey,
        newAccountPubkey: mintPublicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintPublicKey,
        decimals,
        payerPublicKey,
        payerPublicKey
      )
    );

    // Add authority revocation instructions
    if (revokeAuthorities) {
      await revokeMintAuthority(
        mintPublicKey,
        payerPublicKey,
        transaction
      );
      await revokeFreezeAuthority(
        mintPublicKey,
        payerPublicKey,
        transaction
      );
      await revokeCloseAuthority(
        mintPublicKey,
        payerPublicKey,
        transaction
      );
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payerPublicKey;

    // Note: In production, you'd sign with backend wallet from stored keypair
    // For now, we return transaction details for frontend signing
    const serialized = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return {
      success: true,
      mintAddress: mintPublicKey.toBase58(),
      transaction: serialized.toString('base64'),
      message: `Token created: ${symbol} (${name})`,
      authoritiesRevoked: revokeAuthorities,
    };
  } catch (error) {
    console.error('Token creation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getTokenInfo = async (mintAddress) => {
  try {
    const connection = getConnection();
    const mint = new PublicKey(mintAddress);

    const info = await connection.getParsedAccountInfo(mint);

    return {
      success: true,
      data: info,
    };
  } catch (error) {
    console.error('Token info error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
