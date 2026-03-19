import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WalletCard, EmptyState } from "./WalletCard";

interface SolWallet {
    publicKey: string;
    privateKey: string;
}

export const SolanaWallet = ({ mnemonic }: { mnemonic: string }) => {
    const [wallets, setWallets] = useLocalStorage<SolWallet[]>("kryptix_sol_wallets", []);
    const [currentIndex, setCurrentIndex] = useLocalStorage<number>("kryptix_sol_index", 0);
    const [loading, setLoading] = useState(false);
    const [revealedKeys, setRevealedKeys] = useState<Set<number>>(new Set());
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const createWallet = async () => {
        if (!mnemonic) return;
        setLoading(true);
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derived = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derived).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setWallets([
                ...wallets,
                { publicKey: keypair.publicKey.toBase58(), privateKey: bs58.encode(keypair.secretKey) },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const removeWallet = (idx: number) => {
        const next = wallets.filter((_, i) => i !== idx);
        setWallets(next);
    };

    const toggleReveal = (idx: number) => {
        setRevealedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
            }
            return next;
        });
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Solana Wallets</h2>
                    <p className="text-sm text-zinc-500 mt-1">
                        {wallets.length === 0
                            ? "No wallets generated yet"
                            : `${wallets.length} wallet${wallets.length > 1 ? "s" : ""}`}
                    </p>
                </div>
                <button
                    onClick={createWallet}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-sm font-medium text-zinc-200 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all disabled:opacity-40 cursor-pointer"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    )}
                    Add Wallet
                </button>
            </div>

            <div className="space-y-3">
                {wallets.map((wallet, idx) => (
                    <WalletCard
                        key={idx}
                        index={idx}
                        address={wallet.publicKey}
                        privateKey={wallet.privateKey}
                        accentColor="#9945FF"
                        isRevealed={revealedKeys.has(idx)}
                        onToggleReveal={() => toggleReveal(idx)}
                        copiedField={copiedField}
                        onCopy={copyText}
                        onRemove={() => removeWallet(idx)}
                    />
                ))}
            </div>

            {wallets.length === 0 && <EmptyState color="#9945FF" message="Add your first Solana wallet" />}
        </div>
    );
};