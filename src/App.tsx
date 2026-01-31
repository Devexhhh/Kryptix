import { useState } from "react";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { NavbarComponent } from "./components/Navbar";
import { SeedPhraseGenerator } from "./components/SeedPhrase";

type Chain = "solana" | "ethereum" | null;

export default function App() {
  const [selectedChain, setSelectedChain] = useState<Chain>(null);
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-8 selection:bg-blue-500/30">
      <NavbarComponent />

      <main className="max-w-7xl mx-auto flex flex-col gap-12">
        {!selectedChain && (
          <div className="flex gap-6 justify-center p-30 mt-10 border border-zinc-800 rounded-xl shadow-2xl">
            <div>
            </div>
            <button
              onClick={() => setSelectedChain("solana")}
              className="px-8 py-4 rounded hover:scale-105  cursor-point text-gray-100 bg-red-800 hover:bg-white hover:text-black font-semibold transition-colors cursor-pointer"
            >
              Solana
            </button>

            <button
              onClick={() => setSelectedChain("ethereum")}
              className="px-8 py-4 rounded hover:scale-105  cursor-point text-gray-100 bg-red-800 hover:bg-white hover:text-black font-semibold transition-colors cursor-pointer"
            >
              Ethereum
            </button>
          </div>
        )}

        {selectedChain && (< SeedPhraseGenerator
          chain={selectedChain}
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
        />)}

        {mnemonic && selectedChain === "solana" && (<SolanaWallet mnemonic={mnemonic} />)}
        {mnemonic && selectedChain === "ethereum" && (<EthWallet mnemonic={mnemonic} />)}
      </main >
    </div >
  );
}
