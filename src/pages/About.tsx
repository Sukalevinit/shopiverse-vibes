
import { NavBar } from "@/components/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">About StyleHaven</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="mb-4">
                StyleHaven was founded in 2023 with a simple mission: to provide high-quality, 
                fashionable clothing that empowers people to express themselves through their unique style.
              </p>
              <p className="mb-4">
                We believe that fashion should be accessible, sustainable, and inclusive. That's why we 
                carefully source our materials, work with ethical manufacturers, and offer a wide range of 
                sizes to ensure everyone can find clothes they love.
              </p>
              <p>
                From humble beginnings as a small boutique, we've grown into an online destination for 
                fashion enthusiasts seeking quality garments with timeless appeal and contemporary edge.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-bold mb-2">Quality</h3>
                  <p className="text-sm">We never compromise on materials or craftsmanship.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-bold mb-2">Sustainability</h3>
                  <p className="text-sm">We're committed to reducing our environmental impact.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-bold mb-2">Inclusivity</h3>
                  <p className="text-sm">Fashion for everybody and every body.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Meet the Developer</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                  <Github className="w-16 h-16" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Vinit Sukale</h3>
                  <p className="mb-3">Full-stack developer with a passion for creating seamless, user-friendly e-commerce experiences.</p>
                  <div className="flex items-center">
                    <a 
                      href="https://github.com/vinitsukale" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-shop-purple hover:underline"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default About;
