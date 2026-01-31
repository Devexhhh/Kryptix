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
          <div className="flex-col col-span-2 gap-6 justify-center p-30 mt-10 border border-zinc-800 rounded-xl shadow-2xl tracking-tighter">
            <div>
              <h1 style={{ fontFamily: "Funnel Sans" }} className="text-6xl">Kryptix supports multiple blockchains</h1>
              <p style={{ fontFamily: "Funnel Sans" }} className="text-3xl">Choose a blockchain to get started.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                style={{ fontFamily: "Funnel Sans" }}
                onClick={() => setSelectedChain("solana")}
                className="px-8 py-4 rounded cursor-pointer text-black bg-gray-50 hover:bg-gray-300 hover:text-black font-semibold transition-colors"
              >
                Solana
              </button>

              <button
                style={{ fontFamily: "Funnel Sans" }}
                onClick={() => setSelectedChain("ethereum")}
                className="px-8 py-4 rounded cursor-pointer text-black bg-gray-50 hover:bg-gray-300 hover:text-black font-semibold transition-colors"
              >
                Ethereum
              </button>
            </div>

          </div>
        )
        }

        {
          selectedChain && (< SeedPhraseGenerator
            chain={selectedChain}
            mnemonic={mnemonic}
            setMnemonic={setMnemonic}
          />)
        }

        {mnemonic && selectedChain === "solana" && (<SolanaWallet mnemonic={mnemonic} />)}
        {mnemonic && selectedChain === "ethereum" && (<EthWallet mnemonic={mnemonic} />)}
      </main >
    </div >
  );
}
