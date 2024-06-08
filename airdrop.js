import { loadFileJSON } from './utils.js';

import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

const wallet = loadFileJSON('wallet.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.private));

const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    const SOL_REQUEST = 1;
    try {
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,
            SOL_REQUEST * LAMPORTS_PER_SOL 
        );

        console.log(`Success: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();