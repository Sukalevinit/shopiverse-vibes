
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon, CreditCard, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CheckoutDetails } from "@/types";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("details");
  
  // Checkout details state
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    paymentMethod: "credit-card",
  });
  
  // Payment details state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  
  // Shipping method
  const [shippingMethod, setShippingMethod] = useState("standard");
  const shippingCost = shippingMethod === "express" ? 15 : 5;
  
  // Proceed from details to payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("payment");
  };
  
  // Handle checkout submission
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would process the payment with a payment processor
    
    // Show success message
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. Your order is on its way!",
    });
    
    // Clear cart and redirect to home
    clearCart();
    navigate("/");
  };
  
  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      // Add spaces every 4 characters
      const formatted = value
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardNumber(formatted);
    }
  };
  
  // Format card expiry as MM/YY
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      let formatted = value;
      if (value.length > 2) {
        formatted = value.slice(0, 2) + "/" + value.slice(2);
      }
      setCardExpiry(formatted);
    }
  };
  
  // Ensure CVC is only digits and max 3-4 chars
  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCardCvc(value);
    }
  };
  
  // Calculate order summary
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax + shippingCost;
  
  // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6 text-muted-foreground">Add some items to your cart before checking out.</p>
            <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="details">
                        <span className="flex items-center">
                          <span className="mr-2 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                            1
                          </span>
                          Shipping
                        </span>
                      </TabsTrigger>
                      <TabsTrigger value="payment" disabled={activeTab === "details"}>
                        <span className="flex items-center">
                          <span className="mr-2 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                            2
                          </span>
                          Payment
                        </span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details">
                      <form onSubmit={handleProceedToPayment} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={details.fullName}
                              onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={details.email}
                              onChange={(e) => setDetails({ ...details, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={details.address}
                            onChange={(e) => setDetails({ ...details, address: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={details.city}
                              onChange={(e) => setDetails({ ...details, city: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={details.country}
                              onChange={(e) => setDetails({ ...details, country: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              value={details.postalCode}
                              onChange={(e) => setDetails({ ...details, postalCode: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Label className="mb-3 block">Shipping Method</Label>
                          <RadioGroup
                            value={shippingMethod}
                            onValueChange={setShippingMethod}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-3 border rounded-lg p-4">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="cursor-pointer flex-1">
                                <div className="flex justify-between">
                                  <div className="flex items-center">
                                    <Truck className="mr-2 h-4 w-4" />
                                    <span>Standard Shipping</span>
                                  </div>
                                  <span>$5.00</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  Delivery in 5-7 business days
                                </span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 border rounded-lg p-4">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="cursor-pointer flex-1">
                                <div className="flex justify-between">
                                  <div className="flex items-center">
                                    <Truck className="mr-2 h-4 w-4" />
                                    <span>Express Shipping</span>
                                  </div>
                                  <span>$15.00</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  Delivery in 1-2 business days
                                </span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <Button type="submit" className="w-full bg-shop-purple hover:bg-shop-darkpurple">
                          Continue to Payment
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="payment">
                      <form onSubmit={handleCompleteOrder} className="space-y-4">
                        <div className="pt-4">
                          <Label className="mb-3 block">Payment Method</Label>
                          <RadioGroup
                            value={details.paymentMethod}
                            onValueChange={(value) => setDetails({ ...details, paymentMethod: value })}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-3 border rounded-lg p-4">
                              <RadioGroupItem value="credit-card" id="credit-card" />
                              <Label htmlFor="credit-card" className="cursor-pointer flex-1">
                                <div className="flex items-center">
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  <span>Credit / Debit Card</span>
                                </div>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 border rounded-lg p-4">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="cursor-pointer flex-1">
                                <div className="flex items-center">
                                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M7.6 8.2H12.1C13.5 8.2 14.5 9.2 14.4 10.5C14.3 12.4 12.5 13.7 10.7 13.7H9.2C8.9 13.7 8.7 13.9 8.6 14.2L8 17.2C8 17.3 7.9 17.4 7.8 17.4H5.6C5.4 17.4 5.3 17.2 5.3 17V17C5.3 17 6.4 11 6.4 10.9C6.6 9.4 6.9 8.2 7.6 8.2Z"
                                      fill="#009EE3"
                                    />
                                    <path
                                      d="M15.3 8.2H19.8C21.2 8.2 22.2 9.2 22.1 10.5C22 12.4 20.2 13.7 18.4 13.7H16.9C16.6 13.7 16.4 13.9 16.3 14.2L15.7 17.2C15.7 17.3 15.6 17.4 15.5 17.4H13.3C13.1 17.4 13 17.2 13 17V17C13 17 14.1 11 14.1 10.9C14.3 9.4 14.6 8.2 15.3 8.2Z"
                                      fill="#113984"
                                    />
                                    <path
                                      d="M2.1 8.2H6.6C8 8.2 9 9.2 8.9 10.5C8.8 12.4 7 13.7 5.2 13.7H3.7C3.4 13.7 3.2 13.9 3.1 14.2L2.5 17.2C2.5 17.3 2.4 17.4 2.3 17.4H0.1C-0.1 17.4 -0.2 17.2 -0.2 17V17C-0.2 17 0.9 11 0.9 10.9C1.1 9.4 1.4 8.2 2.1 8.2Z"
                                      fill="#172C70"
                                    />
                                  </svg>
                                  <span>PayPal</span>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {details.paymentMethod === "credit-card" && (
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardExpiry">Expiry Date</Label>
                                <Input
                                  id="cardExpiry"
                                  value={cardExpiry}
                                  onChange={handleCardExpiryChange}
                                  placeholder="MM/YY"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cardCvc">CVC</Label>
                                <Input
                                  id="cardCvc"
                                  value={cardCvc}
                                  onChange={handleCardCvcChange}
                                  placeholder="123"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveTab("details")}
                          >
                            Back
                          </Button>
                          
                          <Button type="submit" className="bg-shop-purple hover:bg-shop-darkpurple">
                            Complete Order
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
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

export default Checkout;
