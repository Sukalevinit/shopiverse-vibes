
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, ShoppingCart, Menu, User, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-lg font-semibold py-2 hover:text-shop-purple">Home</Link>
                <Link to="/products" className="text-lg font-semibold py-2 hover:text-shop-purple">Shop</Link>
                <Link to="/categories" className="text-lg font-semibold py-2 hover:text-shop-purple">Categories</Link>
                <Link to="/sale" className="text-lg font-semibold py-2 hover:text-shop-purple">Sale</Link>
                <Link to="/about" className="text-lg font-semibold py-2 hover:text-shop-purple">About</Link>
                <Link to="/contact" className="text-lg font-semibold py-2 hover:text-shop-purple">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-shop-purple">
            StyleHaven
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-shop-purple">Home</Link>
            <Link to="/products" className="text-sm font-medium hover:text-shop-purple">Shop</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-shop-purple">Categories</Link>
            <Link to="/sale" className="text-sm font-medium hover:text-shop-purple">Sale</Link>
            <Link to="/about" className="text-sm font-medium hover:text-shop-purple">About</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-shop-purple">Contact</Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-[150px]">
                <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto space-y-4">
                  <h2 className="text-lg font-medium">Search our store</h2>
                  <div className="flex w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-shop-purple"
                    />
                    <Button
                      className="bg-shop-purple hover:bg-shop-darkpurple rounded-l-none"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-shop-purple">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
