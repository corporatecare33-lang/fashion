import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, MessageCircle, Truck } from "lucide-react";

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-foreground text-background border-t border-gold/40 shadow-luxe overflow-visible">
      <ul className="grid grid-cols-5 items-center h-16 relative px-1">
        <li>
          <Link to="/categories" className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] hover:text-gold transition">
            <LayoutGrid className="h-5 w-5" />
            <span>ক্যাটাগরি</span>
          </Link>
        </li>
        <li>
          <a href="https://wa.me/8801337018777" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] hover:text-gold transition">
            <MessageCircle className="h-5 w-5" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>
        </li>
        <li className="flex justify-center">
          <Link to="/" aria-label="Home" className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
            <span className="-translate-y-1/2 h-11 w-11 rounded-full bg-gradient-gold text-foreground flex items-center justify-center shadow-luxe border-[3px] border-foreground">
              <Home className="h-5 w-5" />
            </span>
            <span className="-mt-4 text-[10px] text-background">হোম</span>
          </Link>
        </li>
        <li>
          <a href="https://m.me/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] hover:text-gold transition">
            <MessageCircle className="h-5 w-5" />
            <span>মেসেঞ্জার</span>
          </a>
        </li>
        <li>
          <Link to="/track-order" className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] hover:text-gold transition">
            <Truck className="h-5 w-5" />
            <span>অর্ডার</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}