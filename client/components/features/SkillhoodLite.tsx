import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Handshake, 
  Brain, 
  Search, 
  Play,
  BookOpen,
  ExternalLink,
  Star,
  Clock,
  Users,
  Award,
  Download,
  Video,
  FileText,
  Zap,
  Building,
  MapPin,
  DollarSign
} from "lucide-react";

const skillCategories = [
  { 
    name: "Technology & Programming", 
    count: 180, 
    icon: "💻",
    skills: ["Python", "JavaScript", "React", "Machine Learning", "Data Science", "Cloud Computing", "DevOps", "Cybersecurity"]
  },
  { 
    name: "Business & Finance", 
    count: 145, 
    icon: "📊",
    skills: ["Financial Analysis", "Project Management", "Digital Marketing", "Sales", "Accounting", "Business Strategy", "Excel", "PowerBI"]
  },
  { 
    name: "Creative & Design", 
    count: 120, 
    icon: "🎨",
    skills: ["Graphic Design", "UI/UX Design", "Video Editing", "Photography", "Adobe Creative Suite", "Figma", "3D Modeling", "Animation"]
  },
  { 
    name: "Healthcare & Medicine", 
    count: 89, 
    icon: "🏥",
    skills: ["Medical Coding", "Healthcare Management", "Nursing", "Pharmacy", "Medical Research", "Patient Care", "Health Informatics", "Telemedicine"]
  },
  { 
    name: "Engineering", 
    count: 156, 
    icon: "⚙️",
    skills: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "AutoCAD", "SolidWorks", "MATLAB", "Manufacturing", "Quality Control"]
  },
  { 
    name: "Language & Communication", 
    count: 78, 
    icon: "🗣️",
    skills: ["English", "Hindi", "Spanish", "French", "Technical Writing", "Public Speaking", "Translation", "Content Writing"]
  },
  { 
    name: "Agriculture & Environment", 
    count: 67, 
    icon: "🌱",
    skills: ["Sustainable Farming", "Organic Agriculture", "Environmental Science", "Climate Change", "Soil Management", "Crop Science", "Hydroponics", "Agribusiness"]
  },
  { 
    name: "Education & Training", 
    count: 94, 
    icon: "📚",
    skills: ["Teaching", "Curriculum Development", "E-learning", "Educational Technology", "Training Design", "Learning Management", "Child Development", "Adult Education"]
  }
];

const featuredSkills = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Technology",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    modules: 48,
    students: 25420,
    rating: 4.9,
    instructor: "AI Mentor - Development",
    description: "Master modern web development with hands-on projects and real-world applications",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    linkedInJobs: 1250,
    avgSalary: "₹8-15 LPA",
    hasVideo: true,
    hasHandouts: true,
    hasProjects: true
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Technology",
    level: "Intermediate",
    duration: "16 weeks",
    modules: 64,
    students: 18950,
    rating: 4.8,
    instructor: "AI Mentor - Data Science",
    description: "Learn Python, statistics, and ML algorithms with industry projects",
    skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL", "Statistics"],
    linkedInJobs: 890,
    avgSalary: "₹10-20 LPA",
    hasVideo: true,
    hasHandouts: true,
    hasProjects: true
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    category: "Business",
    level: "Beginner",
    duration: "8 weeks",
    modules: 32,
    students: 31200,
    rating: 4.7,
    instructor: "AI Mentor - Marketing",
    description: "Complete digital marketing with SEO, PPC, social media, and analytics",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics", "Content Marketing", "Email Marketing"],
    linkedInJobs: 2100,
    avgSalary: "₹5-12 LPA",
    hasVideo: true,
    hasHandouts: true,
    hasProjects: true
  }
];

const linkedInJobs = [
  {
    id: 1,
    title: "React Developer",
    company: "Tech Mahindra",
    location: "Bangalore, India",
    salary: "₹8-12 LPA",
    experience: "2-4 years",
    skills: ["React", "JavaScript", "Node.js"],
    posted: "2 days ago",
    applicants: 145,
    matchingSkills: ["React", "JavaScript"],
    matchPercentage: 85,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567890"
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "₹15-25 LPA",
    experience: "3-5 years",
    skills: ["Python", "Machine Learning", "SQL"],
    posted: "1 day ago",
    applicants: 89,
    matchingSkills: ["Python", "Machine Learning"],
    matchPercentage: 92,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567891"
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    company: "Byju's",
    location: "Mumbai, India",
    salary: "₹10-18 LPA",
    experience: "4-6 years",
    skills: ["SEO", "Google Ads", "Analytics"],
    posted: "3 hours ago",
    applicants: 67,
    matchingSkills: ["SEO", "Google Ads"],
    matchPercentage: 78,
    linkedInUrl: "https://linkedin.com/jobs/view/3234567892"
  }
];

export default function SkillhoodLite() {
  const [activeTab, setActiveTab] = useState("ai-builder");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [learningProgress, setLearningProgress] = useState<{[key: number]: number}>({});

  const startAISkillCourse = (skill: any) => {
    setSelectedSkill(skill);
    
    // Initialize progress if not exists
    if (!learningProgress[skill.id]) {
      setLearningProgress(prev => ({ ...prev, [skill.id]: 0 }));
    }
    
    alert(`Starting AI-powered course: ${skill.title}\n\n🤖 AI Features:\n• Personalized learning path based on your background\n• Interactive coding exercises with real-time feedback\n• Industry-relevant projects from real companies\n• AI mentor available 24/7 for questions\n• Adaptive difficulty based on your progress\n• Career guidance and job matching\n\n🎓 What you'll get:\n• ${skill.modules} comprehensive modules\n• Video tutorials and hands-on labs\n• Downloadable handouts and resources\n• Industry certification upon completion\n• Direct connection to ${skill.linkedInJobs} LinkedIn jobs\n\nReady to start your learning journey?`);
  };

  const applyToLinkedInJob = (job: any) => {
    window.open(job.linkedInUrl, '_blank');
  };

  const downloadHandouts = (skill: any) => {
    const handoutContent = `
AI SKILL BUILDER - ${skill.title.toUpperCase()}
Generated Learning Materials

COURSE OVERVIEW:
Duration: ${skill.duration}
Modules: ${skill.modules}
Level: ${skill.level}
AI Instructor: ${skill.instructor}

LEARNING PATH:
Module 1: Fundamentals and Setup
Module 2: Core Concepts and Theory  
Module 3: Hands-on Practice
Module 4: Real-world Projects
Module 5: Advanced Techniques
Module 6: Industry Best Practices
Module 7: Portfolio Development
Module 8: Career Preparation

SKILLS YOU'LL MASTER:
${skill.skills.map((s: string, i: number) => `${i + 1}. ${s} - Industry-standard proficiency`).join('\n')}

AI LEARNING FEATURES:
• Adaptive learning based on your pace and style
• Real-time feedback and personalized recommendations
• Interactive coding challenges and simulations
• Industry mentorship and expert guidance
• Job-relevant projects and case studies

CAREER OPPORTUNITIES:
• ${skill.linkedInJobs} related jobs on LinkedIn
• Average Salary: ${skill.avgSalary}
• High-demand skills in current job market
• Direct employer connections through platform

RESOURCES INCLUDED:
• Video lectures and demonstrations
• Interactive coding exercises
• Downloadable templates and tools
• Practice datasets and sample projects
• Community forum access
• Career counseling sessions

Generated by Skillhood AI - Your Personalized Learning Companion
    `;
    
    const blob = new Blob([handoutContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.title.replace(/\s+/g, '_')}_AI_Learning_Materials.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Skillhood</h2>
            <p className="text-purple-100">SDG 8: Decent Work - AI-Powered Skill Development</p>
          </div>
        </div>
        <p className="text-purple-100 mb-4">
          Learn 1000+ skills with AI mentors, get real handouts, and connect to LinkedIn jobs
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-purple-100">AI-Taught Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-sm text-purple-100">Students Trained</div>
          </div>
          <div>
            <div className="text-2xl font-bold">25K+</div>
            <div className="text-sm text-purple-100">LinkedIn Jobs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-purple-100">Job Placement</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["ai-builder", "linkedin-jobs", "progress", "certificates"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab
                ? "bg-purple-500 text-white"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            {tab === "ai-builder" ? "AI Skill Builder" : 
             tab === "linkedin-jobs" ? "LinkedIn Jobs" :
             tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* AI Skill Builder Tab */}
      {activeTab === "ai-builder" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search from 1000+ skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Categories</option>
                  {skillCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Skill Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                1000+ Skills Available
              </CardTitle>
              <CardDescription>Choose from comprehensive skill categories taught by AI mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillCategories.map((category, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-violet-50">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.count} skills</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {category.skills.slice(0, 4).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                        Explore Skills
                      </Button>
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
              <CardDescription>Most popular skills with high job demand and AI mentoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredSkills.map((skill) => (
                  <div key={skill.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{skill.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Modules:</span>
                            <span className="font-medium">{skill.modules}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Students:</span>
                            <span className="font-medium">{skill.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Rating:</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium ml-1">{skill.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Badge variant="outline" className="mb-2">{skill.category}</Badge>
                          <span className="text-sm text-gray-600 ml-2">{skill.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Skills You'll Master:</h4>
                      <div className="flex flex-wrap gap-1">
                        {skill.skills.map((skillName, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skillName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">LinkedIn Jobs:</span>
                        <span className="text-blue-600">{skill.linkedInJobs} available</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Avg Salary:</span>
                        <span className="text-green-600">{skill.avgSalary}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => startAISkillCourse(skill)}
                        className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Start AI Course
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => downloadHandouts(skill)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Handouts
                        </Button>
                        
                        <Button size="sm" variant="outline" className="flex-1">
                          <Video className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-gray-500">
                      <div className="flex items-center">
                        {skill.hasVideo && <Video className="h-3 w-3 mr-1" />}
                        {skill.hasHandouts && <FileText className="h-3 w-3 mr-1" />}
                        {skill.hasProjects && <Award className="h-3 w-3 mr-1" />}
                      </div>
                      <span>AI Instructor: {skill.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="px-8">
                  Browse All 1000+ Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* LinkedIn Jobs Tab */}
      {activeTab === "linkedin-jobs" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                LinkedIn Jobs Integration
              </CardTitle>
              <CardDescription>
                Real jobs from LinkedIn matched to your skills with similarity scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {linkedInJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <Badge className={getMatchColor(job.matchPercentage)}>
                            {job.matchPercentage}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
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
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                          <span>💼 {job.experience}</span>
                          <span>👥 {job.applicants} applicants</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => applyToLinkedInJob(job)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply on LinkedIn
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant={job.matchingSkills.includes(skill) ? "default" : "outline"}
                            className={job.matchingSkills.includes(skill) ? "bg-green-500" : ""}
                          >
                            {skill}
                            {job.matchingSkills.includes(skill) && " ✓"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Skills Match Analysis:</h4>
                      <p className="text-sm text-green-700">
                        You have {job.matchingSkills.length} out of {job.skills.length} required skills. 
                        Consider our AI courses to improve your match percentage!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="px-8">
                  Load More LinkedIn Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-500" />
              Learning Progress
            </CardTitle>
            <CardDescription>Track your skill development journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredSkills.map((skill) => (
                <div key={skill.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{skill.title}</h4>
                    <span className="text-sm text-gray-600">
                      {learningProgress[skill.id] || 0}% Complete
                    </span>
                  </div>
                  <Progress value={learningProgress[skill.id] || 0} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Next: Module {Math.floor((learningProgress[skill.id] || 0) / 10) + 1}</span>
                    <span>{skill.modules} total modules</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              AI-Generated Certificates
            </CardTitle>
            <CardDescription>Industry-recognized certifications from completed courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Award className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold mb-2">Earn Industry Certificates</h3>
              <p className="text-gray-600 mb-4">
                Complete AI-powered courses to earn verified certificates that boost your LinkedIn profile
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                View Certificate Gallery
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
