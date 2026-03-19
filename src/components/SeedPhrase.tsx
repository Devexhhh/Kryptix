import { useState } from "react";
import { generateMnemonic } from "bip39";

interface SeedPhraseGeneratorProps {
    chain: "solana" | "ethereum";
    mnemonic: string;
    setMnemonic: (m: string) => void;
}

export const SeedPhraseGenerator = ({ mnemonic, setMnemonic }: SeedPhraseGeneratorProps) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        setMnemonic(generateMnemonic());
        setRevealed(false);
    };

    const copyPhrase = () => {
        navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const words = mnemonic ? mnemonic.split(" ") : [];

    return (
        <div className="space-y-5">
            {/* Action row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        {mnemonic ? "Your Recovery Phrase" : "Generate a Seed Phrase"}
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                        {mnemonic ? "Store this offline. Never share it with anyone." : "Creates a new BIP-39 mnemonic locally in your browser."}
                    </p>
                </div>
                <button
                    onClick={generate}
                    className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors"
                >
                    {mnemonic ? (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Regenerate
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Generate Phrase
                        </>
                    )}
                </button>
            </div>

            {mnemonic && (
                <div className="border border-white/10">
                    {/* Warning */}
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-amber-500/5">
                        <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-sm text-amber-400/90">
                            Never share your seed phrase. Anyone with access controls all your wallets.
                        </span>
                    </div>

                    {/* Word grid */}
                    <div className="relative p-5">
                        <div className={`grid grid-cols-4 gap-2 transition-all duration-300 ${!revealed ? "blur-md select-none pointer-events-none" : ""}`}>
                            {words.map((word, i) => (
                                <div key={i} className="flex items-center gap-3 border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                                    <span className="text-xs text-zinc-700 font-mono w-5 shrink-0 tabular-nums">{i + 1}</span>
                                    <span className="text-base font-medium text-zinc-200">{word}</span>
                                </div>
                            ))}
                        </div>

                        {!revealed && (
                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={() => setRevealed(true)}
                            >
                                <div className="flex items-center gap-2.5 px-5 py-3 border border-white/20 bg-black/60 backdrop-blur-sm text-base text-white hover:bg-white/10 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Click to reveal phrase
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer actions */}
                    {revealed && (
                        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-white/10">
                            <button
                                onClick={() => setRevealed(false)}
                                className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors px-4 py-2"
                            >
                                Hide
                            </button>
                            <button
                                onClick={copyPhrase}
                                className="flex items-center gap-2 text-sm border border-white/15 px-4 py-2 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-emerald-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy phrase
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};