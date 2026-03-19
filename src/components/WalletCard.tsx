export function WalletCard({
    index, address, privateKey, accentColor,
    isRevealed, onToggleReveal, copiedField, onCopy, onRemove,
}: {
    index: number;
    address: string;
    privateKey: string;
    accentColor: string;
    isRevealed: boolean;
    onToggleReveal: () => void;
    copiedField: string | null;
    onCopy: (text: string, label: string) => void;
    onRemove: () => void;
}) {
    const addrLabel = `addr-${index}`;
    const keyLabel = `key-${index}`;

    return (
        <div className="border border-white/10 hover:border-white/20 transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-white/[0.07] bg-white/[0.015]">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs font-bold border shrink-0"
                        style={{ borderColor: `${accentColor}40`, color: accentColor, backgroundColor: `${accentColor}10` }}
                    >
                        {index + 1}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-white">Wallet {index + 1}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="hidden sm:block text-xs text-zinc-700 font-mono">index / {index}</span>
                    <button
                        onClick={onRemove}
                        className="p-1.5 text-zinc-700 hover:text-red-400 transition-colors border border-transparent hover:border-red-400/20"
                        title="Remove wallet"
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Fields */}
            <div className="divide-y divide-white/[0.06]">
                <KeyField
                    label="Address"
                    value={address}
                    revealed={true}
                    copyLabel={addrLabel}
                    copied={copiedField === addrLabel}
                    onCopy={() => onCopy(address, addrLabel)}
                    truncate
                />
                <KeyField
                    label="Private Key"
                    value={privateKey}
                    revealed={isRevealed}
                    copyLabel={keyLabel}
                    copied={copiedField === keyLabel}
                    onCopy={() => onCopy(privateKey, keyLabel)}
                    onToggle={onToggleReveal}
                    sensitive
                />
            </div>
        </div>
    );
}

function KeyField({
    label, value, revealed, copied, onCopy, onToggle, sensitive, truncate,
}: {
    label: string; value: string; revealed: boolean;
    copyLabel: string; copied: boolean;
    onCopy: () => void; onToggle?: () => void;
    sensitive?: boolean; truncate?: boolean;
}) {
    // Shorter truncation on mobile
    const display = !revealed
        ? "•".repeat(32)
        : truncate
            ? `${value.slice(0, 14)}...${value.slice(-6)}`
            : value;

    return (
        <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4">
            <span className="text-[10px] sm:text-xs text-zinc-600 font-mono uppercase tracking-wider w-14 sm:w-20 shrink-0">{label}</span>
            <span className={`flex-1 font-mono text-xs sm:text-sm truncate transition-all ${revealed ? "text-zinc-200" : "text-zinc-700 tracking-[0.12em] sm:tracking-[0.15em]"}`}>
                {display}
            </span>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {sensitive && onToggle && (
                    <button
                        onClick={onToggle}
                        className="p-1 sm:p-1.5 text-zinc-700 hover:text-zinc-300 transition-colors"
                        title={revealed ? "Hide" : "Reveal"}
                    >
                        {revealed ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
                <button
                    onClick={onCopy}
                    className="p-1 sm:p-1.5 text-zinc-700 hover:text-zinc-300 transition-colors"
                    title="Copy"
                >
                    {copied ? (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}

export function EmptyState({ color, message }: { color: string; message: string }) {
    return (
        <div className="border border-dashed border-white/[0.08] py-10 sm:py-14 flex flex-col items-center justify-center gap-3">
            <div
                className="w-10 h-10 sm:w-12 sm:h-12 border flex items-center justify-center"
                style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18 0V6" />
                </svg>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600">{message}</p>
        </div>
    );
}