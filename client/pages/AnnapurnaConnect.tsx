import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, ArrowLeft } from "lucide-react";

export default function AnnapurnaConnect() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-md border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Annapurna Connect</h1>
                <p className="text-sm text-gray-600">Food Distribution Network</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Food Distribution with Real People & Locations</CardTitle>
            <CardDescription>Enhanced food distribution system with authority connectivity</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Real people and location integration with authority contact system for food distribution issues.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
