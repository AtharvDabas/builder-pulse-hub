import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Calculator, TrendingDown, TreePine } from "lucide-react";

export default function CarbonKart() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Leaf className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">CarbonKart</h2>
            <p className="text-emerald-100">SDG 13: Climate Action</p>
          </div>
        </div>
        <p className="text-emerald-100">Track your carbon footprint and take climate action</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-emerald-500" />
              Carbon Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Calculate your personal carbon footprint</p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
              Calculate Footprint
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="h-5 w-5 mr-2 text-green-500" />
              Carbon Offsetting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Offset your emissions through tree planting</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Plant Trees
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lifestyle Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Personalized climate action recommendations will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
