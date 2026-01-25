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
                className={`h-12 px-4 py-2 rounded text-xl font-medium cursor-pointer text-zinc-900 transition-colors duration-200 ease-in-out ${mnemonic ? "bg-gray-100 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-300"
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
                            className="h-16 flex py-5 justify-center content-center bg-zinc-900 text-zinc-100 font-thin rounded-md text-sm"
                        >
                            <span className="text-zinc-500 font-thin select-none mr-2">{i + 1}.</span>
                            {word.charAt(0).toUpperCase() + word.slice(1)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};