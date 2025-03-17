
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { NavBar } from "@/components/NavBar";
import { ShoppingBag, Truck, Shield, RotateCcw, ArrowRight } from "lucide-react";

export default function Index() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shop-light to-white pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-shop-dark">
                Elevate Your Style with Modern Essentials
              </h1>
              <p className="text-lg mb-8 text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Discover our curated collection of timeless clothing designed for comfort, style, and sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="lg" className="bg-shop-purple hover:bg-shop-darkpurple">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="border-shop-purple text-shop-purple hover:bg-shop-purple hover:text-white">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Fashion model showcasing clothing" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-shop-dark">Featured Products</h2>
            <Link to="/products" className="text-shop-purple hover:text-shop-darkpurple font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-shop-light">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-shop-dark">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["T-Shirts", "Dresses", "Outerwear", "Activewear"].map((category) => (
              <Link 
                to={`/products?category=${category}`} 
                key={category}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={`https://source.unsplash.com/random/300x400/?${category.toLowerCase()},clothing`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-shop-purple/10 rounded-full p-4 mb-4">
                <Truck className="h-8 w-8 text-shop-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On all orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-shop-purple/10 rounded-full p-4 mb-4">
                <RotateCcw className="h-8 w-8 text-shop-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-shop-purple/10 rounded-full p-4 mb-4">
                <Shield className="h-8 w-8 text-shop-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">Protected by encryption</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-shop-purple/10 rounded-full p-4 mb-4">
                <ShoppingBag className="h-8 w-8 text-shop-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">Satisfaction guaranteed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-shop-purple">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Join Our Newsletter</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md"
              />
              <Button className="bg-white text-shop-purple hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-shop-dark text-white py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">StyleHaven</h3>
              <p className="text-white/70 mb-4">
                Elevating everyday fashion with quality clothes for every occasion.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="text-white/70 hover:text-white">FB</a>
                <a href="#" className="text-white/70 hover:text-white">IG</a>
                <a href="#" className="text-white/70 hover:text-white">TW</a>
                <a href="#" className="text-white/70 hover:text-white">PIN</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Shopping</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-white/70 hover:text-white">All Products</Link></li>
                <li><Link to="/new-arrivals" className="text-white/70 hover:text-white">New Arrivals</Link></li>
                <li><Link to="/sale" className="text-white/70 hover:text-white">Sale Items</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white">Categories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Care</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-white/70 hover:text-white">Contact Us</Link></li>
                <li><Link to="/faqs" className="text-white/70 hover:text-white">FAQs</Link></li>
                <li><Link to="/shipping" className="text-white/70 hover:text-white">Shipping & Returns</Link></li>
                <li><Link to="/size-guide" className="text-white/70 hover:text-white">Size Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link to="/our-story" className="text-white/70 hover:text-white">Our Story</Link></li>
                <li><Link to="/sustainability" className="text-white/70 hover:text-white">Sustainability</Link></li>
                <li><Link to="/careers" className="text-white/70 hover:text-white">Careers</Link></li>
                <li><Link to="/terms" className="text-white/70 hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2023 StyleHaven Clothing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
