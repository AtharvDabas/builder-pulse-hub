import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanLine, ArrowLeft } from "lucide-react";

export default function SaksinGroup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow-md border-b-2 border-indigo-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                <ScanLine className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-600">Saksin Group</h1>
                <p className="text-sm text-gray-600">Product Verification Scanner</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Scanner with Real Location Integration</CardTitle>
            <CardDescription>Advanced product verification with detailed reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Working product scanner with real location mapping and detailed verification reports.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
