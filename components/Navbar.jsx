import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, ShoppingBasket, CircleUserRound } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top=0 w-full flex justify-between items-center px-8 py-4 border-b bg-white/80 backdrop-blur-md z-50">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="w-8 h-8 bg-black rounded-sm"></div>
                <span>NISO</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link
                href="/"
                className="hover:text-black transition-colors">About Us</Link>
                <Link
                href="/" className="hover:text-black transition-colors">Published</Link>
                <Link
                href="/" className="hover:text-black transition-colors">BestSellers</Link>
            </div>
            <div className="flex items-center gap-3">
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">SignUp</Link>
                </Button>

                <div className="flex items-center gap-2 border-l pl-3 ml-1 border-slate-200">
                    <Link href="/cart"><ShoppingCart /></Link>
                    <Link href="/profile"><CircleUserRound /></Link>
                </div>

            </div>
        </nav>
    )
}

