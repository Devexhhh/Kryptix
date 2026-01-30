import { useState } from "react";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { NavbarComponent } from "./components/Navbar";
import { SeedPhraseGenerator } from "./components/SeedPhrase";

export default function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-8 selection:bg-blue-500/30">
      <NavbarComponent />

      <main className="max-w-7xl mx-auto flex flex-col gap-12">
        <SeedPhraseGenerator
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
        />

        {mnemonic && (
          <div className="grid grid-row lg:grid-row-2 gap-20">
            {/* SOLANA */}
            <div className="flex flex-row gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-lg">
                  S
                </div>
                <h3 className="text-xl font-bold">Solana</h3>
              </div>
              <SolanaWallet mnemonic={mnemonic} />
            </div>

            {/* ETH */}
            <div className="flex flex-row gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-lg">
                  E
                </div>
                <h3 className="text-xl font-bold">Ethereum</h3>
              </div>
              <EthWallet mnemonic={mnemonic} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
