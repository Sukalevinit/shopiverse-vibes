
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Product } from "@/types";

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  
  useEffect(() => {
    let title;
    let filteredProducts;
    
    switch(id) {
      case "men":
        title = "Men's Collection";
        filteredProducts = products.filter(p => ["T-Shirts", "Shirts", "Outerwear"].includes(p.category));
        break;
      case "women":
        title = "Women's Collection";
        filteredProducts = products.filter(p => ["Dresses", "Sweaters", "Outerwear", "Activewear"].includes(p.category));
        break;
      case "children":
        title = "Children's Collection";
        filteredProducts = products.filter(p => p.description.toLowerCase().includes("child") || p.name.toLowerCase().includes("kid"));
        break;
      case "sale":
        title = "Sale Items";
        // For demo purposes, let's say items with price ending in .99 are on sale
        filteredProducts = products.filter(p => p.price.toString().endsWith(".99"));
        break;
      default:
        title = "Products";
        filteredProducts = products;
    }
    
    setCategoryTitle(title);
    setCategoryProducts(filteredProducts);
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>
          
          {categoryProducts.length > 0 ? (
            <>
              <p className="mb-8 text-muted-foreground">
                Showing {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
              </p>
              <ProductGrid products={categoryProducts} />
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-muted-foreground">
                Check back soon for new arrivals in this category.
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

export default Category;
