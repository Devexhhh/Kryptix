import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WalletCard, EmptyState } from "./WalletCard";

interface EthWalletItem {
    address: string;
    privateKey: string;
}

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
    const [wallets, setWallets] = useLocalStorage<EthWalletItem[]>("kryptix_eth_wallets", []);
    const [currentIndex, setCurrentIndex] = useLocalStorage<number>("kryptix_eth_index", 0);
    const [loading, setLoading] = useState(false);
    const [revealedKeys, setRevealedKeys] = useState<Set<number>>(new Set());
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const createWallet = async () => {
        if (!mnemonic) return;
        setLoading(true);
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(`m/44'/60'/0'/0/${currentIndex}`);
            const wallet = new Wallet(child.privateKey);
            setCurrentIndex(currentIndex + 1);
            setWallets([...wallets, { address: wallet.address, privateKey: wallet.privateKey }]);
        } finally {
            setLoading(false);
        }
    };

    const removeWallet = (idx: number) => setWallets(wallets.filter((_, i) => i !== idx));

    const toggleReveal = (idx: number) => {
        setRevealedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
            return next;
        });
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Ethereum Wallets</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                        {wallets.length === 0
                            ? "No wallets generated yet"
                            : `${wallets.length} wallet${wallets.length > 1 ? "s" : ""}`}
                    </p>
                </div>
                <button
                    onClick={createWallet}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 border border-white/15 text-sm font-medium text-zinc-200 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all disabled:opacity-40 w-full sm:w-auto cursor-pointer"
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

            <div className="space-y-2 sm:space-y-3">
                {wallets.map((wallet, idx) => (
                    <WalletCard
                        key={idx}
                        index={idx}
                        address={wallet.address}
                        privateKey={wallet.privateKey}
                        accentColor="#627EEA"
                        isRevealed={revealedKeys.has(idx)}
                        onToggleReveal={() => toggleReveal(idx)}
                        copiedField={copiedField}
                        onCopy={copyText}
                        onRemove={() => removeWallet(idx)}
                    />
                ))}
            </div>

            {wallets.length === 0 && <EmptyState color="#627EEA" message="Add your first Ethereum wallet" />}
        </div>
    );
};