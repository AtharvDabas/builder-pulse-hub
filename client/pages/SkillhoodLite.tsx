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
  Briefcase, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Clock,
  DollarSign,
  Users,
  Star,
  BookOpen,
  Brain,
  TrendingUp,
  Award,
  Play,
  Download,
  ExternalLink,
  Filter,
  Building,
  Zap
} from "lucide-react";

const linkedInJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Mahindra",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹8-12 LPA",
    posted: "2 days ago",
    skills: ["React", "Node.js", "MongoDB"],
    applicants: 145,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567890",
    description: "Join our innovative team to build cutting-edge web applications using modern technologies.",
    requirements: ["Bachelor's in Computer Science", "2+ years React experience", "Strong problem-solving skills"]
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    company: "Wipro Digital",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹5-8 LPA",
    posted: "1 day ago",
    skills: ["SEO", "Google Ads", "Social Media"],
    applicants: 89,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567891",
    description: "Drive digital marketing campaigns and optimize online presence for enterprise clients.",
    requirements: ["Marketing degree preferred", "Google Ads certification", "Analytics experience"]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Infosys",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "1-2 years",
    salary: "₹6-9 LPA",
    posted: "3 hours ago",
    skills: ["Python", "SQL", "Tableau"],
    applicants: 67,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567892",
    description: "Analyze complex datasets and provide actionable insights for business decision-making.",
    requirements: ["Statistics background", "Python/R proficiency", "Data visualization skills"]
  }
];

const aiSkills = [
  {
    id: 1,
    category: "Technology",
    title: "Full Stack Web Development",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    modules: 48,
    students: 15420,
    rating: 4.9,
    instructor: "AI Mentor - Full Stack",
    description: "Master modern web development with React, Node.js, and cloud deployment",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    certification: true,
    popular: true
  },
  {
    id: 2,
    category: "Business",
    title: "Digital Marketing Mastery",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 32,
    students: 8950,
    rating: 4.8,
    instructor: "AI Mentor - Marketing",
    description: "Learn SEO, SEM, social media marketing, and analytics with AI-powered insights",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics", "Content Marketing"],
    certification: true,
    popular: false
  },
  {
    id: 3,
    category: "Data Science",
    title: "Python for Data Analysis",
    level: "Beginner",
    duration: "10 weeks",
    modules: 40,
    students: 12300,
    rating: 4.9,
    instructor: "AI Mentor - Data Science",
    description: "Master Python, pandas, numpy, and machine learning fundamentals",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    certification: true,
    popular: true
  }
];

const skillCategories = [
  { name: "Technology", count: 127, icon: "💻" },
  { name: "Business", count: 89, icon: "📊" },
  { name: "Creative", count: 76, icon: "🎨" },
  { name: "Healthcare", count: 54, icon: "🏥" },
  { name: "Finance", count: 43, icon: "💰" },
  { name: "Education", count: 38, icon: "📚" },
  { name: "Marketing", count: 67, icon: "📢" },
  { name: "Engineering", count: 82, icon: "⚙️" }
];

export default function SkillhoodLite() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [reportIssue, setReportIssue] = useState(false);

  const handleReportIssue = () => {
    const message = `Employment Service Issue Report:
Location: Current Location
Issue Type: Job Quality/Fraudulent Posting/Platform Issue
Contact: employment@gov.in
Phone: 1800-425-3514 (Employment Helpline)
Ministry of Labour & Employment: mole@nic.in`;
    
    alert(message);
    setReportIssue(false);
  };

  const applyToLinkedInJob = (jobUrl: string) => {
    window.open(jobUrl, '_blank');
  };

  const startAISkillCourse = (skillTitle: string) => {
    alert(`Starting AI-powered course: ${skillTitle}\n\nFeatures:\n- Personalized learning path\n- Interactive coding exercises\n- Real-world projects\n- AI mentor feedback\n- Industry certification`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-200">
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
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-600">Skillhood Lite</h1>
                  <p className="text-sm text-gray-600">Jobs & AI-Powered Skills</p>
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
          {["jobs", "ai-skills", "profile", "applications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search jobs, companies, skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-10 w-40"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Jobs Integration */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                      LinkedIn Jobs Integration
                    </CardTitle>
                    <CardDescription>Real jobs sourced directly from LinkedIn</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Live Feed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {linkedInJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <Badge variant="secondary">{job.type}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.posted}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>💼 {job.experience}</span>
                            <span>💰 {job.salary}</span>
                            <span>👥 {job.applicants} applicants</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => applyToLinkedInJob(job.linkedInUrl)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply on LinkedIn
                        </Button>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline" className="px-8">
                    Load More Jobs from LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Skills Tab */}
        {activeTab === "ai-skills" && (
          <div className="space-y-6">
            {/* AI Skill Builder Header */}
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Brain className="h-8 w-8 mr-3" />
                  AI Skill Builder
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Learn 500+ skills with personalized AI mentoring and industry certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Skills Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">AI Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Categories</CardTitle>
                <CardDescription>Choose from diverse skill categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skillCategories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center">
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} skills</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured AI Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Featured AI-Powered Courses
                </CardTitle>
                <CardDescription>Personalized learning with AI mentors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiSkills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{skill.title}</h3>
                            {skill.popular && (
                              <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{skill.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div>📚 {skill.modules} modules</div>
                            <div>���️ {skill.duration}</div>
                            <div>👥 {skill.students.toLocaleString()} students</div>
                            <div>⭐ {skill.rating} rating</div>
                          </div>
                          
                          <div className="mb-4">
                            <Badge variant="outline" className="mb-2">{skill.category}</Badge>
                            <span className="text-sm text-gray-600 ml-2">{skill.level}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Skills You'll Learn:</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.skills.map((skillName, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skillName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Award className="h-4 w-4" />
                          <span>Industry Certification</span>
                        </div>
                        <Button 
                          onClick={() => startAISkillCourse(skill.title)}
                          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          Start AI Course
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline" className="px-8">
                    Explore All 500+ Skills
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
              <CardDescription>Manage your career profile and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <p>Professional profile management</p>
                <p className="text-sm">Skills assessment, resume builder, and career insights</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track your job applications and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-4" />
                <p>Application tracking dashboard</p>
                <p className="text-sm">Monitor application status and interview schedules</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Report Issue Modal */}
      {reportIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Employment Service Issue</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Input placeholder="Fraudulent job posting, platform issue, etc." />
              </div>
              <div>
                <Label htmlFor="job-details">Job/Course Details</Label>
                <Input placeholder="Job title or course name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the issue in detail..." />
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Authority Contact:</strong><br />
                  Employment Department: employment@gov.in<br />
                  Helpline: 1800-425-3514<br />
                  Ministry of Labour & Employment: mole@nic.in
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setReportIssue(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportIssue} className="bg-green-500 hover:bg-green-600">
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
