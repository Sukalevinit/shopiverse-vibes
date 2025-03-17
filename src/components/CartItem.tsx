
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-24 h-24 rounded-md overflow-hidden mr-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            
            <span className="mx-2 w-8 text-center">{quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 h-7 w-7"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
