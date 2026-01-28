import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from 'bs58'

interface Wallet {
    publicKey: string;
    privateKey: string;
}

interface SolanaWalletProps {
    mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [wallets, setWallets] = useState<Wallet[]>([]);

    const createWallet = async () => {
        if (!mnemonic) return;
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;

        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        setCurrentIndex(prev => prev + 1);
        setWallets((prev) => [
            ...prev,
            {
                publicKey: keypair.publicKey.toBase58(),
                privateKey: bs58.encode(secret)
            }
        ])
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                className="bg-white hover:bg-red-800 hover:text-gray-100 text-zinc-900 font-semibold py-2 px-6 rounded transition-all"
                onClick={createWallet}
            >
                Add Wallet
            </button>

            {wallets.map((wallet, idx) => (
                <div key={idx} className="border p-4 rounded bg-gray-100 dark:bg-zinc-800">
                    <div className="font-bold">Wallet {idx + 1}</div>
                    <div>Public: {wallet.publicKey}</div>
                    {/* In the real UI, you would mask this */}
                    <div className="text-xs text-gray-500 break-all">Private: {wallet.privateKey}</div>
                </div>
            ))}
        </div>
    );
}