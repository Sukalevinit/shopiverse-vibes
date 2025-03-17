
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filterInStock, setFilterInStock] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter products
  const filteredProducts = products.filter(product => {
    // Search query
    if (
      searchQuery && 
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // In stock
    if (filterInStock && !product.inStock) {
      return false;
    }
    
    // Category
    if (filterCategory && product.category !== filterCategory) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Featured - use original order
    }
  });
  
  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("featured");
    setPriceRange([0, 1000]);
    setFilterInStock(true);
    setFilterCategory(null);
    setIsFilterOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Narrow down products based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={filterCategory || ""} 
                        onValueChange={(value) => setFilterCategory(value === "" ? null : value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="pt-4">
                        <Slider
                          min={0}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as number[])}
                          className="mb-2"
                        />
                        <div className="flex justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="in-stock">In Stock Only</Label>
                      <Switch
                        id="in-stock"
                        checked={filterInStock}
                        onCheckedChange={setFilterInStock}
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                        Apply Filters
                      </Button>
                      <Button variant="outline" className="w-full" onClick={resetFilters}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="mb-4 text-muted-foreground">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
          </div>
          
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer (simplified version) */}
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

export default Products;
