
import { Navbar, NavbarBrand } from "@heroui/navbar"
import { Switch } from "./ui/switch"

export const NavbarComponent = () => {
    return (
        <Navbar
            position="sticky"
            className="top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md"
        >
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <NavbarBrand className="font-bold text-2xl tracking-tighter flex items-center gap-2">
                            <span className="text-3xl">⬡</span> Kosh
                        </NavbarBrand>
                        <span className="bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                            v1.0
                        </span>
                    </div>
                    {/* RIGHT */}
                    <Switch className="cursor-pointer" />
                </div>
            </div>
        </Navbar>
    )

}