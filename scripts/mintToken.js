import { loadFileJSON } from '../utils.js';

import { 
    Keypair, 
    Connection,
    PublicKey,
} from "@solana/web3.js";
import { 
    getOrCreateAssociatedTokenAccount,
    mintTo,
} from "@solana/spl-token";

const wallet = loadFileJSON('wallet.json');
const TOKEN_ADDRESS = 'H75kXxbN3iZotjBmkg51cn1vJjw2f3pbUPtms946iVfe';
const AMOUNT = 100000e5; // AMOUNTeDECIMALS

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.private));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mint = new PublicKey(TOKEN_ADDRESS);

(async () => {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    await mintTo(
        connection,
        keypair,
        mint,
        tokenAccount.address,
        keypair.publicKey,
        AMOUNT
    );

    console.log("Minted", AMOUNT, "to", tokenAccount.address.toBase58());
})();

// ATA (Associated Token Account) --> 37KuKfV679ixvkpZ94tZqU2tGfQFYJ2nuphiRrrrrP9M