import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`Your new wallet: ${keypair.publicKey.toBase58()} \n\n SAVE THIS (!!!): [${keypair.secretKey}]`);