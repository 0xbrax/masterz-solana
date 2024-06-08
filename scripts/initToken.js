import { loadFileJSON } from '../utils.js';

import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

const wallet = loadFileJSON('wallet.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.private));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        5, // decimals, remember this (!)
    );

    console.log("Token Address:", mint.toBase58());
})();

// TOKEN ADDRESS
// H75kXxbN3iZotjBmkg51cn1vJjw2f3pbUPtms946iVfe