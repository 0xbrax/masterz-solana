import { loadFileJSON } from '../utils.js';

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
    createGenericFile, 
    createSignerFromKeypair, 
    signerIdentity 
} from "@metaplex-foundation/umi";
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const wallet = loadFileJSON('wallet.json');

const umi = createUmi('https://api.devnet.solana.com', 'finalized');
umi.use(irysUploader());

const keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet.private));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner));



(async () => {
    const image = await readFile('./crash-bandicoot.png');
    const nft_image = createGenericFile(image, 'crash-bandicoot.png', { contentType: 'image/png' });

    const [myUri] = await umi.uploader.upload([nft_image]);

    console.log('Image URI: ', myUri);
})();

// image uri --> https://arweave.net/dbTjIxRRADh9WPX4JmFyRTc1jIoxj8-L5T0MZjGCPts