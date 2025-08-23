import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowLeft, Heart, DollarSign } from "lucide-react";

export default function CarbonKart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <header className="bg-white shadow-md border-b-2 border-emerald-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-600">CarbonKart</h1>
                <p className="text-sm text-gray-600">Environmental Services & Donations</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Services</CardTitle>
              <CardDescription>Carbon tracking and environmental impact monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Environmental services platform with carbon tracking capabilities.</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Heart className="h-5 w-5 mr-2" />
                Donation Platform
              </CardTitle>
              <CardDescription>Support environmental initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Make a difference by donating to environmental causes and carbon offset programs.</p>
                <div className="grid grid-cols-3 gap-4">
                  <Button className="bg-green-500 hover:bg-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹100
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹500
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹1000
                  </Button>
                </div>
                <Button className="w-full" variant="outline">
                  Custom Amount
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
