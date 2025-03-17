
import { NavBar } from "@/components/NavBar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";

const Sale = () => {
  // For demo purposes, consider products with prices ending in .99 as sale items
  // In a real app, you'd have a sale flag in the product data
  const saleProducts = products.map(product => ({
    ...product,
    originalPrice: product.price.toString().endsWith(".99") ? Math.round(product.price * 1.25) : null,
  })).filter(product => product.originalPrice !== null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 py-1 px-3 bg-red-600 text-white">Limited Time</Badge>
            <h1 className="text-4xl font-bold mb-4">Season Sale</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enjoy up to 25% off on selected items. Hurry while stocks last!
            </p>
          </div>
          
          {saleProducts.length > 0 ? (
            <>
              <p className="mb-8 text-muted-foreground">
                Showing {saleProducts.length} sale {saleProducts.length === 1 ? "item" : "items"}
              </p>
              <ProductGrid products={saleProducts.map(p => ({
                ...p,
                price: p.price,
                originalPrice: p.originalPrice
              }))} />
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">No sale products found</h2>
              <p className="text-muted-foreground">
                Check back soon for our next seasonal sale.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-card py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container max-w-6xl mx-auto">
          <p className="text-center text-muted-foreground">
            &copy; 2023 StyleHaven. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Sale;
