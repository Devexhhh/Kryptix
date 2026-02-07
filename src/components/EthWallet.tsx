import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

interface EthWallet {
    address: string;
    privateKey: string;
}

interface EthWalletProps {
    mnemonic: string;
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [wallets, setWallets] = useState<EthWallet[]>([]);

    const createWallet = async () => {
        if (!mnemonic) return;

        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = HDNodeWallet.fromSeed(seed);
        const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;

        const child = hdNode.derivePath(derivationPath);
        const wallet = new Wallet(child.privateKey);

        setCurrentIndex((prev) => prev + 1);
        setWallets((prev) => [
            ...prev,
            {
                address: wallet.address,
                privateKey: wallet.privateKey,
            },
        ]);
    };

    return (
        <div className="flex flex-col gap-4 mt-4">
            <button
                style={{ fontFamily: "Funnel Sans" }}
                className="bg-white hover:bg-red-800 hover:text-gray-100 text-zinc-900 font-semibold py-2 px-6 rounded transition-all cursor-pointer"
                onClick={createWallet}
            >
                Add Wallet
            </button>


            <div className="space-y-4">
                {wallets.map((wallet, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <span style={{ fontFamily: "Funnel Sans" }} className="text-lg font-bold text-white">Wallet {idx + 1}</span>
                        </div>

                        <div style={{ fontFamily: "Funnel Sans" }} className="space-y-2">
                            <div className="bg-zinc-950 p-3 rounded-lg flex flex-col gap-1">
                                <span className="text-xs text-zinc-500 font-semibold uppercase">Public Key</span>
                                <span className="text-zinc-300 font-mono text-sm break-all">{wallet.address}</span>
                            </div>

                            <div className="bg-zinc-950 p-3 rounded-lg flex flex-col gap-1">
                                <span className="text-xs text-zinc-500 font-semibold uppercase">Private Key</span>
                                <span className="text-zinc-300 font-mono text-sm break-all">{wallet.privateKey}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};