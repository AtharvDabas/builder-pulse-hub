import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft, 
  Book, 
  FileText, 
  CheckCircle,
  Play,
  Download,
  Search,
  Filter,
  Trophy,
  Clock,
  Users,
  Star,
  Bookmark,
  Video,
  HeadphonesIcon
} from "lucide-react";

const subjects = [
  { name: "Mathematics", lessons: 85, color: "bg-blue-500", progress: 65 },
  { name: "Science", lessons: 92, color: "bg-green-500", progress: 45 },
  { name: "English", lessons: 78, color: "bg-purple-500", progress: 80 },
  { name: "Hindi", lessons: 67, color: "bg-orange-500", progress: 70 },
  { name: "Social Studies", lessons: 73, color: "bg-red-500", progress: 55 },
  { name: "Computer Science", lessons: 56, color: "bg-cyan-500", progress: 40 },
  { name: "Environmental Science", lessons: 45, color: "bg-emerald-500", progress: 60 },
  { name: "Art & Craft", lessons: 34, color: "bg-pink-500", progress: 30 }
];

const featuredLessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "Class 8",
    duration: "45 min",
    type: "Video + Quiz",
    instructor: "Dr. Priya Sharma",
    rating: 4.8,
    students: 1250,
    description: "Learn the fundamentals of algebra with interactive examples and practice problems.",
    hasHandout: true,
    hasQuiz: true,
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Photosynthesis Process",
    subject: "Science",
    grade: "Class 7",
    duration: "35 min",
    type: "Interactive",
    instructor: "Prof. Rajesh Kumar",
    rating: 4.9,
    students: 980,
    description: "Understand how plants make their food through detailed animations and experiments.",
    hasHandout: true,
    hasQuiz: true,
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "English Grammar Basics",
    subject: "English",
    grade: "Class 6",
    duration: "30 min",
    type: "Audio + Text",
    instructor: "Ms. Anita Verma",
    rating: 4.7,
    students: 1890,
    description: "Master the fundamentals of English grammar with practical examples.",
    hasHandout: true,
    hasQuiz: true,
    difficulty: "Beginner"
  }
];

const recentLessons = [
  { title: "Indian Independence Movement", subject: "History", progress: 85, lastAccessed: "2 hours ago" },
  { title: "Fractions and Decimals", subject: "Mathematics", progress: 60, lastAccessed: "1 day ago" },
  { title: "Plant Kingdom", subject: "Biology", progress: 40, lastAccessed: "3 days ago" },
  { title: "Hindi Poetry", subject: "Hindi", progress: 90, lastAccessed: "5 days ago" }
];

const achievements = [
  { title: "Mathematics Master", description: "Completed 50 math lessons", icon: Trophy, color: "text-yellow-500" },
  { title: "Science Explorer", description: "Perfect scores in 10 science quizzes", icon: Star, color: "text-blue-500" },
  { title: "Consistent Learner", description: "7-day learning streak", icon: CheckCircle, color: "text-green-500" }
];

export default function Pathshala() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [reportIssue, setReportIssue] = useState(false);

  const handleReportIssue = () => {
    const message = `Education Service Issue Report:
Location: Current Location
Issue Type: Content Quality/Access/Technical
Contact: education@gov.in
Phone: 1800-123-456 (Education Helpline)
Ministry of Education: moe@gov.in`;
    
    alert(message);
    setReportIssue(false);
  };

  const downloadHandout = (lessonTitle: string) => {
    // In a real app, this would download actual PDF handouts
    alert(`Downloading handout for: ${lessonTitle}`);
  };

  const startQuiz = (lessonTitle: string) => {
    // In a real app, this would open the quiz interface
    alert(`Starting quiz for: ${lessonTitle}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-purple-200">
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
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-600">Pathshala</h1>
                  <p className="text-sm text-gray-600">Digital Education Platform</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setReportIssue(true)}
                variant="outline"
              >
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
          {["dashboard", "lessons", "quizzes", "progress", "certificates"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Book className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">547</div>
                  <div className="text-sm text-gray-600">Total Lessons</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-gray-600">Certificates</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">156h</div>
                  <div className="text-sm text-gray-600">Learning Time</div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Your learning progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{subject.lessons} lessons</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="text-sm text-gray-500">{subject.progress}% completed</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLessons.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.subject} • {lesson.lastAccessed}</p>
                        <Progress value={lesson.progress} className="h-2 mt-2 w-48" />
                      </div>
                      <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search lessons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject.name} value={subject.name.toLowerCase()}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Lessons</CardTitle>
                <CardDescription>High-quality lessons with handouts and quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredLessons.map((lesson) => (
                    <div key={lesson.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary">{lesson.subject}</Badge>
                        <Bookmark className="h-4 w-4 text-gray-400 hover:text-purple-500 cursor-pointer" />
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Grade:</span>
                          <span>{lesson.grade}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span>{lesson.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Instructor:</span>
                          <span>{lesson.instructor}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{lesson.rating}</span>
                          <span className="text-sm text-gray-600">({lesson.students})</span>
                        </div>
                        <Badge variant={lesson.difficulty === "Beginner" ? "default" : 
                                      lesson.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                          {lesson.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                          <Play className="h-4 w-4 mr-2" />
                          Start Lesson
                        </Button>
                        
                        <div className="flex space-x-2">
                          {lesson.hasHandout && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => downloadHandout(lesson.title)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Handout
                            </Button>
                          )}
                          {lesson.hasQuiz && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => startQuiz(lesson.title)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Quiz
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab === "quizzes" && (
          <Card>
            <CardHeader>
              <CardTitle>Interactive Quizzes</CardTitle>
              <CardDescription>Test your knowledge with comprehensive quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>500+ Interactive quizzes available</p>
                <p className="text-sm">Subject-wise assessments with instant feedback</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "progress" && (
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your educational journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <p>Detailed progress analytics</p>
                <p className="text-sm">Performance insights and recommendations</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "certificates" && (
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certificates and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Digital certificates for completed courses</p>
                <p className="text-sm">Verified credentials for your achievements</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Report Issue Modal */}
      {reportIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Education Service Issue</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Input placeholder="Content quality, technical issue, access problem, etc." />
              </div>
              <div>
                <Label htmlFor="lesson">Lesson/Subject</Label>
                <Input placeholder="Which lesson or subject?" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the issue in detail..." />
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Authority Contact:</strong><br />
                  Education Department: education@gov.in<br />
                  Helpline: 1800-123-456<br />
                  Ministry of Education: moe@gov.in
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setReportIssue(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportIssue} className="bg-purple-500 hover:bg-purple-600">
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
