import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, ArrowLeft, CloudRain, Thermometer } from "lucide-react";

export default function MittiMitra() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <header className="bg-white shadow-md border-b-2 border-yellow-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-600">Mitti Mitra</h1>
                <p className="text-sm text-gray-600">Agricultural Assistance</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-blue-500" />
                Real-time Weather Data
              </CardTitle>
              <CardDescription>Location-based weather access for better farming tips</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Access accurate weather data based on your actual location to receive personalized farming advice and crop recommendations.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-red-500" />
                Smart Farming Tips
              </CardTitle>
              <CardDescription>AI-powered agricultural guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Get intelligent farming recommendations based on local weather conditions, soil data, and seasonal patterns.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
