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

    // Check if backend wallet exists
    if (!config.backendWallet) {
      throw new Error(
        config.walletError || 'Backend wallet not found. Please run: npm run generate-wallet'
      );
    }

    // Get backend wallet keypair from file
    const secretKeyBase64 = config.backendWallet.secretKey;
    const secretKeyBuffer = Buffer.from(secretKeyBase64, 'base64');
    const payerKeypair = Keypair.fromSecretKey(new Uint8Array(secretKeyBuffer));
    const payerPublicKey = payerKeypair.publicKey;

    // Verify public key matches env
    if (config.backendPublicKey && payerPublicKey.toBase58() !== config.backendPublicKey) {
      console.warn('⚠️  Backend public key mismatch. Using wallet file key.');
    }

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

    // Sign and send transaction
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payerKeypair, mintKeypair]
    );

    return {
      success: true,
      mintAddress: mintPublicKey.toBase58(),
      signature: signature,
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
