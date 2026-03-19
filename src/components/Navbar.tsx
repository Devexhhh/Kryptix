import { useState } from "react";

interface NavbarProps {
    onClearAll: () => void;
    hasSavedData: boolean;
}

export const NavbarComponent = ({ onClearAll, hasSavedData }: NavbarProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleClear = () => {
        if (showConfirm) {
            onClearAll();
            setShowConfirm(false);
            setMobileMenuOpen(false);
        } else {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
        }
    };

    return (
        <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-base font-semibold text-white tracking-tight">Kryptix</span>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["Docs", "GitHub", "Security"].map((item) => (
                            <a key={item} href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop right */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Local only
                        </div>
                        {hasSavedData && (
                            <>
                                <div className="w-px h-4 bg-white/10" />
                                <button
                                    onClick={handleClear}
                                    className={`flex items-center gap-2 text-xs px-3 py-1.5 border transition-colors ${showConfirm
                                            ? "border-red-500/50 text-red-400 bg-red-500/10"
                                            : "border-white/10 text-zinc-500 hover:border-red-500/30 hover:text-red-400"
                                        }`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    {showConfirm ? "Confirm clear?" : "Clear session"}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile right: status dot + hamburger */}
                    <div className="flex md:hidden items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-black">
                    <div className="px-4 py-3 space-y-1">
                        {["Docs", "GitHub", "Security"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="block py-2.5 text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/[0.05] last:border-0"
                            >
                                {item}
                            </a>
                        ))}
                        {hasSavedData && (
                            <button
                                onClick={handleClear}
                                className={`w-full flex items-center gap-2 mt-2 py-2.5 text-sm transition-colors ${showConfirm ? "text-red-400" : "text-zinc-500 hover:text-red-400"
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {showConfirm ? "Confirm — clear everything?" : "Clear session"}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};