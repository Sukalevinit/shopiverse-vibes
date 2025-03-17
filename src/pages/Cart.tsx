
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { CartItemComponent } from "@/components/CartItem";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const subtotal = getCartTotal();
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shippingFee + tax;
  
  // Get recommended products
  const recommendedProducts = products
    .filter(product => !cartItems.some(item => item.product.id === product.id))
    .slice(0, 4);
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-background border rounded-lg p-6 text-center max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
          
          {recommendedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
              <ProductGrid products={recommendedProducts} />
            </div>
          )}
        </div>
        
        <footer className="bg-card py-6 px-4 sm:px-6 lg:px-8 border-t">
          <div className="container max-w-6xl mx-auto">
            <p className="text-center text-muted-foreground">
              &copy; 2023 ShopiverseVibes. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-lg border">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <CartItemComponent key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/products">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-lg border sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (7%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-base pt-2">
                      <span>Total</span>
                      <span className="text-shop-purple">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-shop-purple hover:bg-shop-darkpurple"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="mt-4 text-xs text-center text-muted-foreground">
                    <p>Secure Checkout</p>
                    <p className="mt-1">We accept all major credit cards and PayPal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-card py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container max-w-6xl mx-auto">
          <p className="text-center text-muted-foreground">
            &copy; 2023 ShopiverseVibes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
