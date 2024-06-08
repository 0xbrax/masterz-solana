import { loadFileJSON } from '../utils.js';

import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";

const wallet = loadFileJSON('wallet.json');
const TOKEN_ADDRESS = 'H75kXxbN3iZotjBmkg51cn1vJjw2f3pbUPtms946iVfe';
const ATA = '37KuKfV679ixvkpZ94tZqU2tGfQFYJ2nuphiRrrrrP9M';
const AMOUNT = 100e5;

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.private));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mint = new PublicKey(TOKEN_ADDRESS);
const fromATA = new PublicKey(ATA);

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    await transfer(
        connection,
        keypair,
        fromATA,
        toAta,
        keypair,
        AMOUNT
    );

    console.log("Transferred", AMOUNT, "from", fromATA.toBase58(), "to", toAta.toBase58());
})();

//transfer from --> 37KuKfV679ixvkpZ94tZqU2tGfQFYJ2nuphiRrrrrP9M
// transfer to --> yYvHfDKovdkAqoiEEuQPM7ApCKKzhVotba8oQxNfKcZ