import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, Download, MessageCircle, Users } from "lucide-react";

const legalForms = [
  { name: "FIR Application", type: "Police Complaint", language: "Hindi/English" },
  { name: "RTI Request", type: "Information Request", language: "Hindi/English" },
  { name: "Tenancy Agreement", type: "Property", language: "Hindi/English" },
  { name: "Domestic Violence Complaint", type: "Women's Rights", language: "Hindi/English" }
];

const legalGuides = [
  { title: "How to File an FIR", steps: 5, difficulty: "Easy" },
  { title: "RTI Application Process", steps: 3, difficulty: "Easy" },
  { title: "Property Rights for Women", steps: 4, difficulty: "Medium" },
  { title: "Consumer Court Filing", steps: 6, difficulty: "Medium" }
];

export default function NyayaDost() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Scale className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Nyaya Dost</h2>
            <p className="text-indigo-100">SDG 16: Peace, Justice and Strong Institutions</p>
          </div>
        </div>
        <p className="text-indigo-100">Legal rights education and justice assistance in local languages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" />
              Legal Forms Generator
            </CardTitle>
            <CardDescription>Ready-to-use downloadable forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {legalForms.map((form, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{form.name}</div>
                    <div className="text-xs text-gray-600">{form.type}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">{form.language}</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Step-by-Step Guides
            </CardTitle>
            <CardDescription>Easy-to-follow legal processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {legalGuides.map((guide, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{guide.title}</div>
                    <div className="text-xs text-gray-600">{guide.steps} steps</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        guide.difficulty === "Easy" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {guide.difficulty}
                    </Badge>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      View Guide
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
            Anonymous Q&A Forum
          </CardTitle>
          <CardDescription>Get help from lawyers and AI support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Ask Legal Questions</h3>
            <p className="text-gray-600 mb-4">
              Get answers from qualified lawyers and AI legal assistant
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Ask Question
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Legal Rights Explainer</CardTitle>
          <CardDescription>Understand your rights in simple Hindi and regional languages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex flex-col">
              <span className="font-medium">महिला अधिकार</span>
              <span className="text-xs text-gray-600">Women's Rights</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <span className="font-medium">मजदूर अधिकार</span>
              <span className="text-xs text-gray-600">Worker's Rights</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <span className="font-medium">उपभोक्ता अधिकार</span>
              <span className="text-xs text-gray-600">Consumer Rights</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <span className="font-medium">संपत्ति अधिकार</span>
              <span className="text-xs text-gray-600">Property Rights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
