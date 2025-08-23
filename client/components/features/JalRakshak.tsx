import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Camera, MapPin, Activity } from "lucide-react";

export default function JalRakshak() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Droplets className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Jal Rakshak</h2>
            <p className="text-cyan-100">SDG 6: Clean Water and Sanitation</p>
          </div>
        </div>
        <p className="text-cyan-100">AI-powered water quality testing and monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-cyan-500" />
              Water Test Strip Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Upload photo of water test strip for AI analysis</p>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
              Scan Water Test Strip
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              Water Quality Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View real-time water quality data by location</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              View Quality Map
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Quality Reports</CardTitle>
          <CardDescription>Community-generated water quality data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Water quality reports and contamination alerts will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
