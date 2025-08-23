import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Droplets, ArrowLeft, MapPin, AlertTriangle, Phone } from "lucide-react";

export default function JalRakshak() {
  const [reportIssue, setReportIssue] = useState(false);

  const handleReportIssue = () => {
    const message = `Water Quality Issue Report:
Location: Current Location
Issue Type: Water Contamination/Supply/Quality
Contact: water@gov.in
Phone: 1800-425-3314 (Water Helpline)
Ministry of Jal Shakti: jalshakti@nic.in`;
    
    alert(message);
    setReportIssue(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-md border-b-2 border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">Jal Rakshak</h1>
                  <p className="text-sm text-gray-600">Water Quality Monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setReportIssue(true)} variant="outline">
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="h-6 w-6 mr-2 text-blue-500" />
              Water Quality Standards & Real Location Mapping
            </CardTitle>
            <CardDescription>Enhanced water quality monitoring with real sources and community maps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Real-time Quality Testing</h3>
                <p className="text-sm text-blue-600">Live water quality data from certified laboratories and field testing units</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Community Maps</h3>
                <p className="text-sm text-green-600">Interactive maps showing water sources, treatment plants, and distribution networks</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Authority Integration</h3>
                <p className="text-sm text-purple-600">Direct connection to water departments and pollution control boards</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Key Features (Coming Soon)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time water quality monitoring from 1000+ sources</li>
                <li>• GPS-enabled community maps with accurate water source locations</li>
                <li>• Direct reporting to local water authorities and pollution control boards</li>
                <li>• Water quality predictions using AI and environmental data</li>
                <li>• Community-driven water source verification system</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {reportIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Water Quality Issue</h3>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Authority Contact:</strong><br />
                Water Department: water@gov.in<br />
                Helpline: 1800-425-3314<br />
                Ministry of Jal Shakti: jalshakti@nic.in
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setReportIssue(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportIssue} className="bg-blue-500 hover:bg-blue-600">
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
