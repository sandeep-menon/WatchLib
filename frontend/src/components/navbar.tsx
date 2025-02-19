import { ModeToggle } from "./mode-toggle";

function Navbar() {
    return (
        <div className="sticky top-0 z-50 border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-[1400px] mx-auto w-full p-4 flex justify-between items-center">
                <a className="text-2xl font-serif font-bold hover:text-green-500" href="/">Watch Lib</a>
                <ModeToggle />
            </div>
        </div>

    )
}

export default Navbar;