import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { NavbarComponent } from "./components/Navbar";
import { SeedPhraseGenerator } from "./components/SeedPhrase";
import { useLocalStorage } from "./hooks/useLocalStorage";

type Chain = "solana" | "ethereum" | null;

export default function App() {
  const [selectedChain, setSelectedChain, clearChain] = useLocalStorage<Chain>("kryptix_chain", null);
  const [mnemonic, setMnemonic, clearMnemonic] = useLocalStorage<string>("kryptix_mnemonic", "");

  const handleBack = () => {
    clearChain();
    // Don't clear mnemonic/wallets — user can return and see them
  };

  const handleChainSelect = (chain: "solana" | "ethereum") => {
    setSelectedChain(chain);
  };

  const handleClearAll = () => {
    clearChain();
    clearMnemonic();
    localStorage.removeItem("kryptix_sol_wallets");
    localStorage.removeItem("kryptix_eth_wallets");
    localStorage.removeItem("kryptix_sol_index");
    localStorage.removeItem("kryptix_eth_index");
  };

  return (
    <div
      className="min-h-screen bg-black text-white font-sans selection:bg-white/10"
      style={{ fontFamily: "'Geist', 'GeistMono', monospace" }}
    >
      <NavbarComponent onClearAll={handleClearAll} hasSavedData={!!mnemonic} />

      {!selectedChain && (
        <LandingView
          setSelectedChain={handleChainSelect}
          hasMnemonic={!!mnemonic}
          mnemonic={mnemonic}
        />
      )}

      {selectedChain && (
        <div className="border-t border-white/10">
          {/* Breadcrumb */}
          <div className="border-b border-white/10">
            <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <span className="text-zinc-700">/</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedChain === "solana" ? "bg-[#9945FF]" : "bg-[#627EEA]"}`} />
                  <span className="text-sm text-zinc-300 capitalize font-medium">{selectedChain}</span>
                </div>
              </div>

              {/* Session indicator */}
              <div className="flex items-center gap-2 text-xs text-zinc-600 border border-white/[0.07] px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Session saved locally
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="max-w-6xl mx-auto">
            {/* Seed phrase section */}
            <div className="border-b border-white/10">
              <div className="grid grid-cols-12">
                <div className="col-span-3 border-r border-white/10 p-8">
                  <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">Step 01</p>
                  <h3 className="text-lg font-semibold text-white mt-2">Recovery Phrase</h3>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                    Your 12-word seed phrase is the master key to all derived wallets.
                  </p>
                </div>
                <div className="col-span-9 p-8">
                  <SeedPhraseGenerator
                    chain={selectedChain}
                    mnemonic={mnemonic}
                    setMnemonic={setMnemonic}
                  />
                </div>
              </div>
            </div>

            {/* Wallets section */}
            {mnemonic && (
              <div className="grid grid-cols-12">
                <div className="col-span-3 border-r border-white/10 p-8">
                  <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">Step 02</p>
                  <h3 className="text-lg font-semibold text-white mt-2">Derived Wallets</h3>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                    Each wallet is derived from your seed using the HD wallet standard.
                  </p>
                </div>
                <div className="col-span-9 p-8">
                  {selectedChain === "solana" && <SolanaWallet mnemonic={mnemonic} />}
                  {selectedChain === "ethereum" && <EthWallet mnemonic={mnemonic} />}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Landing ───────────────────────────────────────────────────────────────────

function LandingView({
  setSelectedChain, hasMnemonic,
}: {
  setSelectedChain: (c: "solana" | "ethereum") => void;
  hasMnemonic: boolean;
  mnemonic: string;
}) {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 min-h-[420px]">
            <div className="col-span-1 border-r border-white/10 relative">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
            </div>
            <div className="col-span-10 px-12 py-20 border-r border-white/10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-zinc-500 tracking-wide">Non-custodial · Open source · Local</span>
              </div>
              <h1 className="text-6xl font-bold tracking-tight leading-[1.1] text-white">
                Generate wallets.<br />
                <span className="text-zinc-500">Keep your keys.</span>
              </h1>
              <p className="text-xl text-zinc-400 mt-6 max-w-xl leading-relaxed">
                HD wallet generator for Solana and Ethereum. Derive unlimited wallets
                from a single seed phrase — nothing ever leaves your browser.
              </p>

              {/* Returning user banner */}
              {hasMnemonic && (
                <div className="mt-8 flex items-center gap-4 border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 max-w-xl">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-emerald-400 font-medium">Session restored</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Your previous seed phrase and wallets are still saved. Pick a chain to continue.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1" />
          </div>
        </div>
      </div>

      {/* Chain selector */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-1 border-r border-white/10" />
            <div className="col-span-10 border-r border-white/10 px-12 py-10">
              <p className="text-sm text-zinc-600 uppercase tracking-widest mb-6 font-medium">
                {hasMnemonic ? "Continue with" : "Select a blockchain"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <ChainCard
                  name="Solana" ticker="SOL"
                  desc="High-throughput L1 · ed25519 keys · BIP44 derivation"
                  color="#9945FF"
                  onClick={() => setSelectedChain("solana")}
                  logo={
                    <svg viewBox="0 0 397.7 311.7" className="w-10 h-10">
                      <path d="M64.6 237.9a8.7 8.7 0 016.1-2.5h317.4a4.35 4.35 0 013.1 7.4l-51.3 51.3a8.7 8.7 0 01-6.1 2.5H16.4a4.35 4.35 0 01-3.1-7.4l51.3-51.3z" fill="#9945ff" />
                      <path d="M64.6 3.4A8.92 8.92 0 0170.7.9h317.4a4.35 4.35 0 013.1 7.4L340 59.6a8.7 8.7 0 01-6.1 2.5H16.4a4.35 4.35 0 01-3.1-7.4L64.6 3.4z" fill="#03e1ff" />
                      <path d="M333.1 120.1a8.7 8.7 0 00-6.1-2.5H9.6a4.35 4.35 0 00-3.1 7.4l51.3 51.3a8.7 8.7 0 006.1 2.5h317.4a4.35 4.35 0 003.1-7.4l-51.3-51.3z" fill="#00ffa3" />
                    </svg>
                  }
                />
                <ChainCard
                  name="Ethereum" ticker="ETH"
                  desc="Smart contract platform · secp256k1 keys · EVM compatible"
                  color="#627EEA"
                  onClick={() => setSelectedChain("ethereum")}
                  logo={
                    <svg viewBox="0 0 32 32" className="w-10 h-10">
                      <g fill="#627EEA">
                        <path fillOpacity=".6" d="M16 4l-8 14 8-4 8 4z" />
                        <path d="M8 18l8 10 8-10-8 4z" />
                        <path fillOpacity=".6" d="M8 18l8-4 8 4-8-10z" />
                        <path fillOpacity=".2" d="M16 14l-8 4 8-14z" />
                        <path fillOpacity=".6" d="M16 14l8 4-8-14z" />
                      </g>
                    </svg>
                  }
                />
              </div>
            </div>
            <div className="col-span-1" />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-white/10">
          {[
            { label: "BIP-39 Compliant", desc: "Industry standard 12-word mnemonic generation" },
            { label: "HD Wallet Standard", desc: "BIP-44 derivation paths for both chains" },
            { label: "100% Local", desc: "Keys are generated in your browser, never transmitted" },
          ].map((item, i) => (
            <div key={i} className="px-10 py-8">
              <p className="text-base font-semibold text-white">{item.label}</p>
              <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ChainCard({ name, ticker, desc, color, onClick, logo }: {
  name: string; ticker: string; desc: string; color: string;
  onClick: () => void; logo: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left border border-white/10 p-6 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${color}0d 0%, transparent 60%)` }}
      />
      <div className="absolute top-0 left-0 w-3 h-px bg-white/20" />
      <div className="absolute top-0 left-0 w-px h-3 bg-white/20" />
      <div className="absolute bottom-0 right-0 w-3 h-px bg-white/20" />
      <div className="absolute bottom-0 right-0 w-px h-3 bg-white/20" />
      <div className="relative flex items-start gap-4">
        <div>{logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{name}</span>
            <span className="text-xs text-zinc-600 font-mono">{ticker}</span>
          </div>
          <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{desc}</p>
          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium" style={{ color }}>
            <span>Get started</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}