import { loadFileJSON } from '../utils.js';

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const wallet = loadFileJSON('wallet.json');

const umi = createUmi('https://api.devnet.solana.com', 'finalized');
umi.use(irysUploader());

const keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet.private));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner));

const IMAGE_URI = 'https://arweave.net/dbTjIxRRADh9WPX4JmFyRTc1jIoxj8-L5T0MZjGCPts';

const json = {
    "name": "Crash Bandicoot",
    "symbol": "CRASH",
    "description": "Crash Bandicoot fungible token",
    "image": IMAGE_URI,
    "seller_fee_basis_points": 0,
    "creators": [
        {
            "address": keyair.publicKey,
            "share": 100
        }
    ]
};



(async () => {
    const nft_json = createGenericFile(Buffer.from(JSON.stringify(json)), 'crash-bandicoot.json', { contentType: 'application/json' });

    const [myUri] = await umi.uploader.upload([nft_json]);

    console.log(myUri);
})();

// json url --> https://arweave.net/0S93_1RRQtYgQW6k8g6xpIMb_LTCYu9SwSCW6XS_KHs