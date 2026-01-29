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
                className="bg-white hover:bg-red-800 hover:text-gray-100 text-zinc-900 font-semibold py-2 px-6 rounded transition-all cursor-pointer"
                onClick={createWallet}
            >
                Add Wallet
            </button>

            {wallets.map((wallet, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-white">Wallet {idx + 1}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-zinc-950 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-xs text-zinc-500 font-semibold uppercase">Public Key</span>
                            <span className="text-zinc-300 font-mono text-sm break-all">{wallet.publicKey}</span>
                        </div>

                        <div className="bg-zinc-950 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-xs text-zinc-500 font-semibold uppercase">Private Key</span>
                            {/* In a real app, use a type="password" input or a toggle state to hide this */}
                            <span className="text-zinc-300 font-mono text-sm break-all">{wallet.privateKey}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}