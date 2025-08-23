import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ScanLine, Leaf, TrendingDown } from "lucide-react";

export default function SaksinGreen() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <ShoppingCart className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sākṣin Green</h2>
            <p className="text-amber-100">SDG 12: Responsible Consumption and Production</p>
          </div>
        </div>
        <p className="text-amber-100">Verify product sustainability claims and find eco-friendly alternatives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ScanLine className="h-5 w-5 mr-2 text-amber-500" />
              Product Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Scan barcodes to verify eco-friendly claims</p>
            <Button className="w-full bg-amber-500 hover:bg-amber-600">
              Scan Product
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-green-500" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Check carbon footprint and recyclability</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              View Impact
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sustainable Alternatives</CardTitle>
          <CardDescription>Find eco-friendly products available locally</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Sustainable product recommendations will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
