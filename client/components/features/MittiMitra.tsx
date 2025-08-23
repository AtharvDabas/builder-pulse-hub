import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Camera, MapPin, Sprout } from "lucide-react";

export default function MittiMitra() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Mountain className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Mitti Mitra</h2>
            <p className="text-yellow-100">SDG 15: Life on Land</p>
          </div>
        </div>
        <p className="text-yellow-100">AI-powered soil health analysis for sustainable farming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-yellow-500" />
              Soil Photo Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Upload soil photos for AI nutrient analysis</p>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
              Analyze Soil
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sprout className="h-5 w-5 mr-2 text-green-500" />
              Crop Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Get organic treatment and crop rotation advice</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              View Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Soil Health Map</CardTitle>
          <CardDescription>India-wide soil health data for policymakers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Regional soil health analytics and trends will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
