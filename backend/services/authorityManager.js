import {
  createInitializeMintInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  getMintLen,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
} from '@solana/web3.js';
import { getConnection } from '../utils/connection.js';

// Revoke all three authorities: mint, freeze, and update
export const revokeAllAuthorities = async (
  transaction,
  mintKeypair,
  payer
) => {
  const connection = getConnection();
  const mintPublicKey = mintKeypair.publicKey;

  // 1. Revoke mint authority
  const revokeMintInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.MintTokens,
    null // null means revoke the authority
  );
  transaction.add(revokeMintInstruction);

  // 2. Revoke freeze authority
  const revokeFreezeInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.FrozenAccount,
    null // null means revoke the authority
  );
  transaction.add(revokeFreezeInstruction);

  // 3. Revoke update authority (metadata update authority)
  // Note: Update authority is for token metadata and is managed separately
  // This is a placeholder - actual implementation depends on metadata program
  const revokeUpdateInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.CloseAccount,
    null // null means revoke the authority
  );
  transaction.add(revokeUpdateInstruction);

  return transaction;
};

// Revoke specific authorities one by one
export const revokeMintAuthority = async (mintPublicKey, payer, transaction) => {
  const revokeMintInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.MintTokens,
    null
  );
  transaction.add(revokeMintInstruction);
  return transaction;
};

export const revokeFreezeAuthority = async (
  mintPublicKey,
  payer,
  transaction
) => {
  const revokeFreezeInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.FrozenAccount,
    null
  );
  transaction.add(revokeFreezeInstruction);
  return transaction;
};

export const revokeCloseAuthority = async (
  mintPublicKey,
  payer,
  transaction
) => {
  const revokeCloseInstruction = createSetAuthorityInstruction(
    mintPublicKey,
    payer,
    AuthorityType.CloseAccount,
    null
  );
  transaction.add(revokeCloseInstruction);
  return transaction;
};
