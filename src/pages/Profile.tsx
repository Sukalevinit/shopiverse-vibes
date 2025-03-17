
import { useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Heart, ShoppingBag, Settings, User as UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { user, isAuthenticated, logout, likedProducts } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Will redirect due to the effect
  }

  // Get liked products data
  const likedProductsData = products.filter(product => 
    likedProducts.includes(product.id)
  );

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Profile sidebar */}
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" disabled>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Liked Items ({likedProducts.length})
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Main content */}
            <div className="md:col-span-3">
              <Tabs defaultValue="liked">
                <TabsList className="mb-6">
                  <TabsTrigger value="liked">Liked Items</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="liked">
                  <Card>
                    <CardHeader>
                      <CardTitle>Liked Items</CardTitle>
                      <CardDescription>
                        Products you've liked across our store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {likedProductsData.length > 0 ? (
                        <ProductGrid products={likedProductsData} />
                      ) : (
                        <div className="text-center py-10">
                          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No liked items yet</h3>
                          <p className="mt-2 text-muted-foreground">
                            Explore our products and click the heart icon to add items to your likes.
                          </p>
                          <Button 
                            className="mt-6 bg-shop-purple hover:bg-shop-darkpurple"
                            onClick={() => navigate("/products")}
                          >
                            Browse Products
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Orders</CardTitle>
                      <CardDescription>
                        View and track your order history.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                        <p className="mt-2 text-muted-foreground">
                          Once you make a purchase, your orders will appear here.
                        </p>
                        <Button 
                          className="mt-6 bg-shop-purple hover:bg-shop-darkpurple"
                          onClick={() => navigate("/products")}
                        >
                          Start Shopping
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-shop-purple hover:bg-shop-darkpurple">
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
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

export default Profile;
