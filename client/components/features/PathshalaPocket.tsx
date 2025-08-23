import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Brain } from "lucide-react";

export default function PathshalaPocket() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Pathshala Pocket</h2>
            <p className="text-blue-100">SDG 4: Quality Education</p>
          </div>
        </div>
        <p className="text-blue-100">AI-powered volunteer teaching platform with auto-generated lesson plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Volunteer Teaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Schedule online/offline teaching sessions with students</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Start Teaching Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              AI Lesson Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Auto-generate lesson plans and quizzes for any topic</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              Generate Lesson
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress Tracking</CardTitle>
          <CardDescription>Monitor learning outcomes and quiz results</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Student progress tracking and analytics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
