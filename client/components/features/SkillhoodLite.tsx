import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Brain, Users, BookOpen } from "lucide-react";

export default function SkillhoodLite() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Handshake className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Skillhood Lite</h2>
            <p className="text-purple-100">SDG 8: Decent Work and Economic Growth</p>
          </div>
        </div>
        <p className="text-purple-100">Skill barter system with AI matching and local language support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Skill Exchange
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Find people to teach you skills or offer your expertise</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              Browse Skills
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-indigo-500" />
              AI Skill Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Get AI-powered recommendations for skill exchanges</p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Find Matches
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Learning Materials</CardTitle>
          <CardDescription>AI creates handouts and notes in local languages</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Skill learning materials and progress tracking will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
