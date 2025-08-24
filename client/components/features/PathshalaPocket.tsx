import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Upload, 
  Brain, 
  FileText, 
  Download,
  Play,
  BookOpen,
  CheckCircle,
  Clock,
  Zap,
  MessageSquare,
  Star
} from "lucide-react";

const processedLessons = [
  {
    id: 1,
    title: "Introduction to Photosynthesis",
    subject: "Biology",
    grade: "Class 10",
    uploadedBy: "Dr. Priya Sharma",
    uploadDate: "2024-01-15",
    processingStatus: "completed",
    summary: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
    keyPoints: [
      "Chlorophyll captures sunlight in the leaves",
      "Carbon dioxide enters through stomata",
      "Water is absorbed through roots",
      "Glucose and oxygen are produced",
      "Two stages: Light-dependent and Light-independent reactions"
    ],
    notesGenerated: true,
    quizGenerated: true,
    difficulty: "intermediate",
    estimatedTime: "30 minutes"
  },
  {
    id: 2,
    title: "Algebra Fundamentals",
    subject: "Mathematics", 
    grade: "Class 8",
    uploadedBy: "Prof. Rajesh Kumar",
    uploadDate: "2024-01-14",
    processingStatus: "completed",
    summary: "Algebra is a branch of mathematics that uses symbols to represent numbers...",
    keyPoints: [
      "Variables represent unknown quantities",
      "Equations show relationships between variables",
      "Linear equations have degree 1",
      "Solving equations using inverse operations",
      "Applications in real-world problems"
    ],
    notesGenerated: true,
    quizGenerated: true,
    difficulty: "beginner",
    estimatedTime: "25 minutes"
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary pigment responsible for photosynthesis?",
    options: ["Chlorophyll", "Carotene", "Anthocyanin", "Xanthophyll"],
    correctAnswer: 0,
    explanation: "Chlorophyll is the green pigment that captures light energy for photosynthesis."
  },
  {
    id: 2,
    question: "Which gas is released as a byproduct of photosynthesis?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Oxygen is released as a byproduct when plants split water molecules during photosynthesis."
  },
  {
    id: 3,
    question: "Where does the light-dependent reaction occur?",
    options: ["Stroma", "Thylakoids", "Nucleus", "Mitochondria"],
    correctAnswer: 1,
    explanation: "Light-dependent reactions occur in the thylakoids of chloroplasts where chlorophyll is located."
  }
];

export default function PathshalaPocket() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    grade: "",
    description: "",
    content: "",
    file: null as File | null
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
      
      // Read file content for text files
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadForm(prev => ({ 
            ...prev, 
            content: e.target?.result as string 
          }));
        };
        reader.readAsText(file);
      }
    }
  };

  const processLesson = async () => {
    if (!uploadForm.title || !uploadForm.content) {
      alert("Please provide lesson title and content");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate AI processing with realistic progress
    const progressSteps = [
      { step: "Analyzing content...", progress: 20 },
      { step: "Extracting key concepts...", progress: 40 },
      { step: "Generating summary...", progress: 60 },
      { step: "Creating study notes...", progress: 80 },
      { step: "Generating quiz questions...", progress: 100 }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingProgress(step.progress);
    }

    // Generate AI-processed content
    const processedContent = generateAIContent(uploadForm.content, uploadForm.subject);
    
    alert(`Lesson processed successfully!\n\nGenerated:\n✅ AI Summary\n✅ Study Notes\n✅ Quiz (${processedContent.quiz.length} questions)\n✅ Key Points\n\nReady for students!`);
    
    setIsProcessing(false);
    setProcessingProgress(0);
    
    // Reset form
    setUploadForm({
      title: "",
      subject: "",
      grade: "",
      description: "",
      content: "",
      file: null
    });
    
    setActiveTab("lessons");
  };

  const generateAIContent = (content: string, subject: string) => {
    // Simulate AI content generation based on input
    const wordCount = content.split(' ').length;
    const complexity = wordCount > 500 ? "advanced" : wordCount > 200 ? "intermediate" : "beginner";
    
    // Extract key concepts (simplified AI simulation)
    const sentences = content.split('.').filter(s => s.trim().length > 20);
    const keyPoints = sentences.slice(0, 5).map(s => s.trim());
    
    // Generate summary
    const summary = `This lesson covers ${subject.toLowerCase()} concepts focusing on ${uploadForm.title.toLowerCase()}. ${sentences[0]?.trim() || 'Key educational content included.'}`;
    
    // Generate quiz questions
    const quiz = Array.from({ length: Math.min(5, Math.max(3, Math.floor(wordCount / 100))) }, (_, i) => ({
      id: i + 1,
      question: `Question ${i + 1} based on ${uploadForm.title}?`,
      options: [`Correct answer for ${subject}`, "Incorrect option 1", "Incorrect option 2", "Incorrect option 3"],
      correctAnswer: 0,
      explanation: `This relates to the key concept discussed in ${uploadForm.title}.`
    }));

    return { summary, keyPoints, quiz, complexity };
  };

  const startQuiz = (lesson: any) => {
    setSelectedLesson(lesson);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = quizQuestions.reduce((acc, q, index) => {
        return acc + (newAnswers[index] === q.correctAnswer ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const downloadNotes = (lesson: any) => {
    const notesContent = `
STUDY NOTES - ${lesson.title}
Subject: ${lesson.subject} | Grade: ${lesson.grade}
Generated by AI on: ${new Date().toLocaleDateString()}

LESSON SUMMARY:
${lesson.summary}

KEY POINTS:
${lesson.keyPoints.map((point: string, index: number) => `${index + 1}. ${point}`).join('\n')}

DIFFICULTY LEVEL: ${lesson.difficulty}
ESTIMATED STUDY TIME: ${lesson.estimatedTime}

ADDITIONAL RESOURCES:
- Practice more problems related to this topic
- Review previous lessons on related concepts
- Ask questions if any concept is unclear

Generated by Pathshala Pocket AI
    `;
    
    const blob = new Blob([notesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.title}_Notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Pathshala Pocket</h2>
            <p className="text-blue-100">SDG 4: Quality Education - AI-Powered Learning</p>
          </div>
        </div>
        <p className="text-blue-100 mb-4">
          Upload lessons and let AI generate summaries, notes, and quizzes automatically
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">1.2K+</div>
            <div className="text-sm text-blue-100">Lessons Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">5.8K</div>
            <div className="text-sm text-blue-100">Notes Generated</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3.4K</div>
            <div className="text-sm text-blue-100">Quizzes Created</div>
          </div>
          <div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-blue-100">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["upload", "lessons", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Upload Lesson Tab */}
      {activeTab === "upload" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-500" />
                Upload Lesson for AI Processing
              </CardTitle>
              <CardDescription>
                Upload your lesson content and let AI generate summaries, notes, and quizzes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <select 
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm({...uploadForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="grade">Grade/Class</Label>
                  <select 
                    value={uploadForm.grade}
                    onChange={(e) => setUploadForm({...uploadForm, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select grade</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Lesson Description</Label>
                <Input
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  placeholder="Brief description of the lesson"
                />
              </div>

              <div>
                <Label htmlFor="content">Lesson Content</Label>
                <Textarea
                  value={uploadForm.content}
                  onChange={(e) => setUploadForm({...uploadForm, content: e.target.value})}
                  placeholder="Paste your lesson content here or upload a file below..."
                  rows={10}
                />
              </div>

              <div>
                <Label htmlFor="file">Upload File (Optional)</Label>
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt,.pdf,.doc,.docx"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports: Text files, PDF, Word documents
                </p>
              </div>

              {isProcessing && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Brain className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium">AI Processing in Progress...</span>
                  </div>
                  <Progress value={processingProgress} className="mb-2" />
                  <p className="text-sm text-blue-600">
                    {processingProgress < 20 && "Analyzing content..."}
                    {processingProgress >= 20 && processingProgress < 40 && "Extracting key concepts..."}
                    {processingProgress >= 40 && processingProgress < 60 && "Generating summary..."}
                    {processingProgress >= 60 && processingProgress < 80 && "Creating study notes..."}
                    {processingProgress >= 80 && "Generating quiz questions..."}
                  </p>
                </div>
              )}

              <Button 
                onClick={processLesson}
                disabled={!uploadForm.title || !uploadForm.content || isProcessing}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isProcessing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Process Lesson with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Processed Lessons Tab */}
      {activeTab === "lessons" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                AI-Processed Lessons
              </CardTitle>
              <CardDescription>
                Lessons with AI-generated summaries, notes, and quizzes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {processedLessons.map((lesson) => (
                  <div key={lesson.id} className="border rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{lesson.subject}</span>
                          <span>•</span>
                          <span>{lesson.grade}</span>
                          <span>•</span>
                          <span>By {lesson.uploadedBy}</span>
                          <span>•</span>
                          <span>{lesson.uploadDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{lesson.difficulty}</Badge>
                          <Badge className="bg-green-100 text-green-800">
                            <Clock className="h-3 w-3 mr-1" />
                            {lesson.estimatedTime}
                          </Badge>
                          {lesson.processingStatus === "completed" && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              AI Processed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">AI-Generated Summary:</h4>
                      <p className="text-gray-700 text-sm">{lesson.summary}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Learning Points:</h4>
                      <ul className="space-y-1">
                        {lesson.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="sm"
                        onClick={() => downloadNotes(lesson)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Notes
                      </Button>
                      
                      <Button 
                        size="sm"
                        onClick={() => startQuiz(lesson)}
                        className="bg-purple-500 hover:bg-purple-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Take Quiz
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Full Content
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Learning Analytics</CardTitle>
            <CardDescription>Your contribution to Quality Education goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-gray-600">Lessons Uploaded</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-gray-600">Notes Downloaded</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-gray-600">Average Quiz Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Modal */}
      {showQuiz && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!quizCompleted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Quiz: {selectedLesson.title}</h3>
                  <Badge variant="outline">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mb-4" />
                  <h4 className="text-lg mb-4">{quizQuestions[currentQuestion].question}</h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {score}/{quizQuestions.length}
                  </div>
                  <div className="text-gray-600">
                    {Math.round((score / quizQuestions.length) * 100)}% Score
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold">Review:</h4>
                  {quizQuestions.map((q, index) => (
                    <div key={index} className="text-left p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        {userAnswers[index] === q.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <span className="h-5 w-5 text-red-500 mr-2">✗</span>
                        )}
                        <span className="font-medium">Question {index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600">{q.explanation}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={() => setShowQuiz(false)}>
                    Close Quiz
                  </Button>
                  <Button onClick={() => startQuiz(selectedLesson)} variant="outline">
                    Retake Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
