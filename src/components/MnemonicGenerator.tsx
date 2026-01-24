import { generateMnemonic } from "bip39";
import { Button } from "@/components/ui/button"

interface MnemonicGeneratorProps {
    mnemonic: string;
    setMnemonic: (mnemonic: string) => void;
}

export const MnemonicGenerator = ({ mnemonic, setMnemonic }: MnemonicGeneratorProps) => {
    const createMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    };

    return (
        <div className="flex flex-col gap-4 text-center">
            <Button variant="outline"
                className={`h-15 px-4 py-2 rounded text-xl font-semibold transition-colors duration-200 ease-in-out ${mnemonic ? "bg-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-800"
                    }`}
                onClick={createMnemonic}
                disabled={!!mnemonic}
            >
                {mnemonic ? "Secret Phrase Generated" : "Generate Secret Phrase"}
            </Button>

            {mnemonic && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                    {mnemonic.split(" ").map((word, i) => (
                        <div
                            key={i}
                            className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded-md text-sm border border-zinc-700"
                        >
                            <span className="text-zinc-500 select-none mr-2">{i + 1}.</span>
                            {word}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};