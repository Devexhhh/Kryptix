import { MnemonicGenerator } from "./MnemonicGenerator";

type Props = {
    chain: string;
    mnemonic: string;
    setMnemonic: React.Dispatch<React.SetStateAction<string>>;
};

export const SeedPhraseGenerator = ({ mnemonic, setMnemonic }: Props) => {
    return (
        <>
            <div className="h-max border border-zinc-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-4xl font-bold mb-2">Your Secret Phrase</h2>
                <p className="text-zinc-400 mb-6">
                    Save these words in a safe place. You cannot recover your wallet without them.
                </p>

                <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
            </div>

            {mnemonic && (
                <section className="animate-fade-in-up mt-10">
                    <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                        <h2 className="text-3xl font-bold tracking-tight">Your Wallets</h2>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure? This will clear all of your current wallet.")) {
                                    setMnemonic("");
                                }
                            }}
                            className="text-gray-100 bg-red-800 px-6 py-2.5 rounded hover:bg-white hover:text-black text-sm font-semibold transition-colors cursor-pointer"
                        >
                            Clear Wallets
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};
