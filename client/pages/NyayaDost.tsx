import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, ArrowLeft, FileText, Users, Phone } from "lucide-react";

export default function NyayaDost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <header className="bg-white shadow-md border-b-2 border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-600">Nyaya Dost</h1>
                <p className="text-sm text-gray-600">Legal Assistance & Justice Support</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <FileText className="h-5 w-5 mr-2" />
                Legal Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Get expert legal advice and document assistance for various legal matters.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <Users className="h-5 w-5 mr-2" />
                Justice Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Access justice support systems and legal aid for citizens in need.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600">
                <Phone className="h-5 w-5 mr-2" />
                Expert Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Connect with legal experts for professional consultation and court assistance.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
