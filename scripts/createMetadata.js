import { loadFileJSON } from '../utils.js';

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3, updateMetadataAccountV2, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { publicKey as publicKeySerializer, string } from '@metaplex-foundation/umi/serializers';

const wallet = loadFileJSON('wallet.json');
const JSON_URI = 'https://arweave.net/0S93_1RRQtYgQW6k8g6xpIMb_LTCYu9SwSCW6XS_KHs';
const TOKEN_ADDRESS = 'H75kXxbN3iZotjBmkg51cn1vJjw2f3pbUPtms946iVfe';

const umi = createUmi('https://api.devnet.solana.com', 'confirmed');

const keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet.private));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner));

const mint = publicKey(TOKEN_ADDRESS);

const seeds = [
    string({size: 'variable'}).serialize('metadata'),
    publicKeySerializer().serialize(MPL_TOKEN_METADATA_PROGRAM_ID),
    publicKeySerializer().serialize(mint),
];
const metadata = umi.eddsa.findPda(MPL_TOKEN_METADATA_PROGRAM_ID, seeds);

(async() => {
    const accounts = {
        metadata: metadata,
        mint: mint,
        mintAuthority: myKeypairSigner,
    };

    const data = {
        name: "Crash Bandicoot",
        symbol: "CRASH",
        uri: JSON_URI,
        sellerFeeBasisPoints: 0,
        creators: [
            {
                address: keyair.publicKey,
                verified: true,
                share: 100,
            }
        ],
        collection: null,
        uses: null,
        attributes: [],
    };

    const args = {
        data: data,
        isMutable: true,
        collectionDetails: null,
    };

    // updateMetadataAccountV2 --> replace with this method to update metadata
    const tx = createMetadataAccountV3(
        umi,
        {
            ...accounts,
            ...args,
        }
    );

    await tx.sendAndConfirm(umi);

    //const result = await tx.sendAndConfirm(umi);
    //const signature = umi.transactions.deserialize(result.signature);
    //console.log(signature);
    //console.log(`Success! https://explorer.solana.com/tx/${tx}?cluster=devnet`);

    console.log('Success!');
})();