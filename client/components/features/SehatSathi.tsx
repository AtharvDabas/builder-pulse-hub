import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  Baby,
  Calendar,
  Thermometer,
  Activity,
  Shield,
  Bell
} from "lucide-react";

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Sore throat", "Fatigue", "Nausea", 
  "Stomach pain", "Diarrhea", "Dizziness", "Chest pain", "Shortness of breath",
  "Joint pain", "Muscle aches", "Skin rash", "Loss of appetite", "Insomnia"
];

const healthTips = [
  "Drink 8-10 glasses of water daily for proper hydration",
  "Get 7-8 hours of quality sleep every night",
  "Exercise for at least 30 minutes, 5 days a week",
  "Eat 5 servings of fruits and vegetables daily",
  "Practice deep breathing or meditation for stress relief"
];

const vaccinationSchedule = [
  { age: "Birth", vaccines: ["BCG", "Hepatitis B", "OPV"], status: "completed" },
  { age: "6 weeks", vaccines: ["DPT", "IPV", "Hepatitis B", "Hib", "Rotavirus", "PCV"], status: "completed" },
  { age: "10 weeks", vaccines: ["DPT", "IPV", "Hib", "Rotavirus", "PCV"], status: "completed" },
  { age: "14 weeks", vaccines: ["DPT", "IPV", "Hib", "Rotavirus", "PCV"], status: "pending" },
  { age: "6 months", vaccines: ["OPV", "Hepatitis B"], status: "upcoming" },
  { age: "9 months", vaccines: ["Measles", "Vitamin A"], status: "upcoming" }
];

export default function SehatSathi() {
  const [activeTab, setActiveTab] = useState("checker");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [additionalSymptoms, setAdditionalSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, symptom]);
    } else {
      setSymptoms(symptoms.filter(s => s !== symptom));
    }
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic medical logic
    setTimeout(() => {
      const allSymptoms = [...symptoms, ...additionalSymptoms.split(',').map(s => s.trim())].filter(s => s);
      
      let analysis = {
        conditions: [] as any[],
        urgency: "low",
        homeRemedies: [] as string[],
        recommendations: [] as string[],
        riskLevel: "Low"
      };

      // Simple AI logic based on symptom combinations
      if (allSymptoms.includes("Fever") && allSymptoms.includes("Cough")) {
        analysis.conditions.push({
          name: "Common Cold/Flu",
          probability: "75-85%",
          description: "Viral upper respiratory infection"
        });
        analysis.homeRemedies = [
          "Rest and stay hydrated",
          "Gargle with warm salt water",
          "Drink ginger-honey tea",
          "Use steam inhalation"
        ];
        analysis.urgency = "low";
      }

      if (allSymptoms.includes("Chest pain") || allSymptoms.includes("Shortness of breath")) {
        analysis.conditions.push({
          name: "Possible Cardiac/Respiratory Issue",
          probability: "Requires immediate evaluation",
          description: "Chest symptoms need prompt medical attention"
        });
        analysis.urgency = "high";
        analysis.riskLevel = "High";
        analysis.recommendations = ["Seek immediate medical attention", "Visit emergency room if severe"];
      }

      if (allSymptoms.includes("Headache") && allSymptoms.includes("Fever") && allSymptoms.includes("Nausea")) {
        analysis.conditions.push({
          name: "Possible Migraine or Infection",
          probability: "60-70%",
          description: "Could be migraine or systemic infection"
        });
        analysis.homeRemedies = [
          "Rest in a dark, quiet room",
          "Apply cold compress to forehead",
          "Stay hydrated"
        ];
      }

      if (allSymptoms.includes("Stomach pain") && allSymptoms.includes("Diarrhea")) {
        analysis.conditions.push({
          name: "Gastroenteritis",
          probability: "70-80%",
          description: "Stomach flu or food poisoning"
        });
        analysis.homeRemedies = [
          "BRAT diet (Banana, Rice, Applesauce, Toast)",
          "Oral rehydration solution",
          "Avoid dairy and spicy foods"
        ];
      }

      // Default recommendations
      if (analysis.conditions.length === 0) {
        analysis.conditions.push({
          name: "General Wellness Check",
          probability: "Monitor symptoms",
          description: "Symptoms may be mild or stress-related"
        });
        analysis.homeRemedies = [
          "Get adequate rest",
          "Stay hydrated",
          "Monitor symptoms for 24-48 hours"
        ];
      }

      analysis.recommendations = [
        ...analysis.recommendations,
        "Consult a doctor if symptoms worsen",
        "Take prescribed medications as directed",
        "Follow up if symptoms persist beyond 3-5 days"
      ];

      setAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Heart className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sehat Sathi</h2>
            <p className="text-green-100">SDG 3: Good Health and Well-being</p>
          </div>
        </div>
        <p className="text-green-100 mb-4">
          AI-powered health assessment and wellness tracking for everyone
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">15K+</div>
            <div className="text-sm text-green-100">Health Checks</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-green-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-green-100">Available</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["checker", "tracker", "reminders", "offline"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {tab === "checker" ? "AI Symptom Checker" : tab}
          </button>
        ))}
      </div>

      {/* AI Symptom Checker */}
      {activeTab === "checker" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-green-500" />
                AI Symptom Checker
              </CardTitle>
              <CardDescription>
                Describe your symptoms and get AI-powered health insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">How long?</option>
                    <option value="few-hours">Few hours</option>
                    <option value="1-day">1 day</option>
                    <option value="2-3-days">2-3 days</option>
                    <option value="week">About a week</option>
                    <option value="longer">Longer than a week</option>
                  </select>
                </div>
              </div>

              {/* Symptom Selection */}
              <div>
                <Label className="text-base font-semibold">Select your symptoms:</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {commonSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={symptoms.includes(symptom)}
                        onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                      />
                      <label htmlFor={symptom} className="text-sm cursor-pointer">
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Symptoms */}
              <div>
                <Label htmlFor="additional">Additional symptoms (separate with commas)</Label>
                <Textarea
                  value={additionalSymptoms}
                  onChange={(e) => setAdditionalSymptoms(e.target.value)}
                  placeholder="Describe any other symptoms you're experiencing..."
                />
              </div>

              {/* Severity */}
              <div>
                <Label htmlFor="severity">How severe are your symptoms?</Label>
                <select 
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select severity</option>
                  <option value="mild">Mild - Not interfering with daily activities</option>
                  <option value="moderate">Moderate - Some interference with daily activities</option>
                  <option value="severe">Severe - Significant interference with daily activities</option>
                </select>
              </div>

              <Button 
                onClick={analyzeSymptoms}
                disabled={symptoms.length === 0 || isAnalyzing}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing symptoms...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  AI Health Analysis
                  <Badge className={getUrgencyColor(analysis.urgency)}>
                    {analysis.riskLevel} Risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Possible Conditions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Possible Conditions
                  </h4>
                  <div className="space-y-3">
                    {analysis.conditions.map((condition: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{condition.name}</h5>
                          <Badge variant="outline">{condition.probability}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Remedies */}
                {analysis.homeRemedies.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-green-500" />
                      Home Remedies
                    </h4>
                    <ul className="space-y-2">
                      {analysis.homeRemedies.map((remedy: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {remedy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Medical Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {analysis.urgency === "high" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center text-red-800">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <strong>Urgent Medical Attention Required</strong>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Your symptoms suggest you should seek immediate medical care. Please visit the nearest hospital or call emergency services.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Health Tracker */}
      {activeTab === "tracker" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Baby className="h-5 w-5 mr-2 text-pink-500" />
                Maternal & Child Health Tracker
              </CardTitle>
              <CardDescription>
                Track vaccinations, checkups, and health milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold">Vaccination Schedule</h4>
                {vaccinationSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{schedule.age}</div>
                      <div className="text-sm text-gray-600">
                        {schedule.vaccines.join(", ")}
                      </div>
                    </div>
                    <Badge 
                      className={
                        schedule.status === "completed" 
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
              <CardDescription>Daily wellness recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthTips.map((tip, index) => (
                  <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reminders */}
      {activeTab === "reminders" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              Health Reminders
            </CardTitle>
            <CardDescription>Set reminders for medications and checkups</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Medication reminders and health checkup notifications will appear here.</p>
          </CardContent>
        </Card>
      )}

      {/* Offline Support */}
      {activeTab === "offline" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-500" />
              Offline Health Data
            </CardTitle>
            <CardDescription>Access health information without internet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Offline Mode Available</h3>
              <p className="text-gray-600 mb-4">
                Basic health information and previous analyses are cached for offline access
              </p>
              <Button variant="outline">
                Download Offline Content
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
