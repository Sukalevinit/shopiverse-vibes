
import { useParams, Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart, Star, ChevronRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to={`/categories/${product.category}`} className="hover:text-foreground">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted/30">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={() => setIsLiked(!isLiked)}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
              >
                <Heart 
                  className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                />
                <span className="sr-only">Like</span>
              </Button>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-3xl font-bold text-shop-purple">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-muted-foreground">
                {product.description}
              </p>
              
              <Separator />
              
              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-l-md rounded-r-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    
                    <div className="h-9 w-12 flex items-center justify-center border-y">
                      {quantity}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-r-md rounded-l-none"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 bg-shop-purple hover:bg-shop-darkpurple"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="description"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:shadow-none h-10"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:shadow-none h-10"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-shop-purple data-[state=active]:shadow-none h-10"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-6">
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                    officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Brand</span>
                    <span>ShopiverseVibes</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Model</span>
                    <span>SV-{product.id}-{product.category.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight</span>
                    <span>0.5 kg</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Dimensions</span>
                    <span>30 x 20 x 10 cm</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Warranty</span>
                    <span>1 Year</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-8">
                  {[
                    {
                      name: "Emily Johnson",
                      rating: 5,
                      date: "2 weeks ago",
                      comment: "Absolutely love this product! It exceeded all my expectations and the quality is outstanding."
                    },
                    {
                      name: "Michael Chen",
                      rating: 4,
                      date: "1 month ago",
                      comment: "Great product overall. The only downside is that it took a bit longer to arrive than expected."
                    },
                    {
                      name: "Sarah Williams",
                      rating: 5,
                      date: "2 months ago",
                      comment: "Perfect! Exactly as described and the customer service was fantastic when I had questions."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">{review.name}</span>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="mt-6">
                  Load More Reviews
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      
      {/* Footer (simplified) */}
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

export default ProductDetail;
