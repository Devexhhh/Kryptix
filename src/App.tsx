import { useState } from "react";
import { MnemonicGenerator } from "./components/MnemonicGenerator";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { NavbarComponent } from "./components/Navbar";

export default function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-8 selection:bg-blue-500/30">
      <NavbarComponent />
      <main className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* SECTION 1: SEED PHRASE */}
        <div className="h-max border border-zinc-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold mb-2">Your Secret Phrase</h2>
          <p className="text-zinc-400 mb-6">Save these words in a safe place. You cannot recover your wallet without them.</p>

          <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
        </div>

        {/* SECTION 2: WALLET DASHBOARD (Only shows after seed is generated) */}
        {mnemonic && (
          <section className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-3xl font-bold tracking-tight">Your Wallets</h2>
              <button
                onClick={() => {
                  if (confirm("Are you sure? This will clear all of your current wallet.")) {
                    setMnemonic("");
                    window.location.reload();
                  }
                }}
                className="text-gray-100 bg-red-800 px-6 py-2.5 rounded hover:bg-white hover:text-black text-sm font-semibold transition-colors cursor-pointer"
              >
                Clear Wallets
              </button>
            </div>

            {/* TABS FOR BLOCKCHAINS */}
            <div className="grid grid-row lg:grid-row-2 gap-20">

              {/* SOLANA COLUMN */}
              <div className="flex flex-row gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-lg">S</div>
                  <h3 className="text-xl font-bold">Solana</h3>
                </div>
                <SolanaWallet mnemonic={mnemonic} />
              </div>

              {/* ETHEREUM COLUMN */}
              <div className="flex flex-row gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-lg">E</div>
                  <h3 className="text-xl font-bold">Ethereum</h3>
                </div>
                <EthWallet mnemonic={mnemonic} />
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}