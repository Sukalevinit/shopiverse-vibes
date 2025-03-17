
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="product-card overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover product-image"
          />
          <Button
            onClick={handleLike}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            <Heart 
              className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span className="sr-only">Like</span>
          </Button>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between mb-1">
            <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-shop-purple">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-shop-purple hover:bg-shop-darkpurple"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
