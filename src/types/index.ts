
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}
