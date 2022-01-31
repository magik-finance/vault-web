import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, TransactionInstruction, Connection } from "@solana/web3.js";
export async function getATA(owner: PublicKey, mint: PublicKey) {
  const [ata] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return ata;
}

export async function findOrCreateATA(
  connection: Connection,
  payer: PublicKey,
  owner: PublicKey,
  mintAddress: PublicKey | string,
  instructions: TransactionInstruction[]
): Promise<PublicKey> {
  const mint =
    typeof mintAddress === "string" ? new PublicKey(mintAddress) : mintAddress;
  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    owner
  );

  const info = await connection.getAccountInfo(ata);
  if (info !== null && info.owner.equals(TOKEN_PROGRAM_ID)) {
    return ata;
  }

  instructions.push(
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      ata,
      owner,
      payer
    )
  );

  return ata;
}
