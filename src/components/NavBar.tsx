
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function NavBar() {
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartCount = getCartCount();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                  Products
                </Link>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-shop-purple">ShopiverseVibes</span>
          </Link>
          
          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-shop-purple">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-shop-purple">
              Products
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link to="/account">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-shop-purple" 
                  variant="default"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
