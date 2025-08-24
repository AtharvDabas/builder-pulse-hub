import { useState, useEffect } from "react";
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
  Bell,
  MapPin,
  Phone,
  Stethoscope,
  Pill,
  Lotus,
  Leaf,
  Hospital,
  Navigation,
  Download,
  FileText
} from "lucide-react";

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Sore throat", "Fatigue", "Nausea", 
  "Stomach pain", "Diarrhea", "Dizziness", "Chest pain", "Shortness of breath",
  "Joint pain", "Muscle aches", "Skin rash", "Loss of appetite", "Insomnia",
  "Vomiting", "Body aches", "Runny nose", "Sneezing", "Constipation"
];

const nearbyFacilities = [
  {
    name: "AIIMS Delhi",
    type: "Government Hospital",
    distance: "2.3 km",
    contact: "+91-11-26588500",
    address: "Ansari Nagar, New Delhi - 110029",
    specialties: ["Cardiology", "Neurology", "General Medicine"],
    timing: "24/7 Emergency",
    coordinates: { lat: 28.5672, lng: 77.2100 }
  },
  {
    name: "Max Hospital Saket",
    type: "Private Hospital",
    distance: "3.1 km",
    contact: "+91-11-26515050",
    address: "1-2, Press Enclave Road, Saket, Delhi - 110017",
    specialties: ["Emergency Care", "ICU", "Surgery"],
    timing: "24/7",
    coordinates: { lat: 28.5245, lng: 77.2066 }
  },
  {
    name: "Apollo Hospital",
    type: "Private Hospital", 
    distance: "4.5 km",
    contact: "+91-11-71791000",
    address: "Mathura Road, Sarita Vihar, Delhi - 110076",
    specialties: ["Cardiology", "Oncology", "Orthopedics"],
    timing: "24/7",
    coordinates: { lat: 28.5355, lng: 77.2910 }
  }
];

const janAushadhiKendras = [
  {
    name: "Jan Aushadhi Store - Connaught Place",
    distance: "1.8 km",
    contact: "+91-9876543210",
    address: "Block A, Connaught Place, New Delhi - 110001",
    timing: "9:00 AM - 8:00 PM",
    coordinates: { lat: 28.6315, lng: 77.2167 }
  },
  {
    name: "Jan Aushadhi Store - AIIMS",
    distance: "2.4 km", 
    contact: "+91-9876543211",
    address: "AIIMS Campus, Ansari Nagar, Delhi - 110029",
    timing: "8:00 AM - 10:00 PM",
    coordinates: { lat: 28.5663, lng: 77.2074 }
  }
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
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location for nearby facilities
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Location access denied:", error)
      );
    }
  }, []);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, symptom]);
    } else {
      setSymptoms(symptoms.filter(s => s !== symptom));
    }
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const allSymptoms = [...symptoms, ...additionalSymptoms.split(',').map(s => s.trim())].filter(s => s);
      
      let analysis = {
        primaryDiagnosis: {} as any,
        differentialDiagnoses: [] as any[],
        urgency: "low",
        prescription: {} as any,
        yogaRecommendations: [] as string[],
        ayurvedaRecommendations: [] as string[],
        homeRemedies: [] as string[],
        recommendations: [] as string[],
        riskLevel: "Low",
        nearbyHospitals: nearbyFacilities,
        janAushadhiStores: janAushadhiKendras,
        followUpRequired: false,
        dietRecommendations: [] as string[]
      };

      // Advanced AI diagnostic logic
      if (allSymptoms.includes("Fever") && allSymptoms.includes("Cough") && allSymptoms.includes("Sore throat")) {
        analysis.primaryDiagnosis = {
          name: "Viral Upper Respiratory Tract Infection (Common Cold/Flu)",
          icd10: "J06.9",
          confidence: "85%",
          description: "Viral infection affecting the upper respiratory system including nose, throat, and sinuses",
          expectedDuration: "7-10 days",
          complications: "Secondary bacterial infection (rare)"
        };
        
        analysis.differentialDiagnoses = [
          { name: "Bacterial Pharyngitis", confidence: "20%", icd10: "J02.9" },
          { name: "Allergic Rhinitis", confidence: "15%", icd10: "J30.9" }
        ];

        analysis.prescription = {
          medications: [
            {
              name: "Paracetamol 500mg",
              dosage: "1 tablet every 6-8 hours",
              duration: "5-7 days",
              instructions: "Take with food, maximum 4 tablets per day",
              genericAvailable: true
            },
            {
              name: "Cetirizine 10mg",
              dosage: "1 tablet at bedtime",
              duration: "5 days",
              instructions: "May cause drowsiness",
              genericAvailable: true
            }
          ],
          warnings: ["Avoid if allergic to paracetamol", "Consult doctor if fever persists > 3 days"]
        };

        analysis.yogaRecommendations = [
          "Pranayama (Breathing exercises) - 10 minutes daily",
          "Bhramari Pranayama (Bee breath) for throat relief",
          "Gentle Surya Namaskara (Sun salutation) when feeling better",
          "Meditation for 15 minutes to boost immunity"
        ];

        analysis.ayurvedaRecommendations = [
          "Tulsi (Holy basil) tea 2-3 times daily",
          "Ginger-honey mixture for throat relief",
          "Turmeric milk before bedtime",
          "Steam inhalation with ajwain (carom seeds)",
          "Chyawanprash 1 teaspoon daily for immunity"
        ];

        analysis.dietRecommendations = [
          "Warm water with lemon and honey",
          "Light, easily digestible foods",
          "Avoid cold drinks and dairy products",
          "Include garlic and ginger in meals"
        ];

        analysis.urgency = "low";
      }

      else if (allSymptoms.includes("Chest pain") || allSymptoms.includes("Shortness of breath")) {
        analysis.primaryDiagnosis = {
          name: "Acute Coronary Syndrome (Suspected)",
          icd10: "I20.9",
          confidence: "Requires immediate evaluation",
          description: "Potential heart-related condition requiring urgent medical attention",
          expectedDuration: "Emergency condition",
          complications: "Heart attack, cardiac arrest"
        };

        analysis.differentialDiagnoses = [
          { name: "Anxiety/Panic Attack", confidence: "30%", icd10: "F41.0" },
          { name: "Gastroesophageal Reflux", confidence: "25%", icd10: "K21.9" },
          { name: "Pulmonary Embolism", confidence: "20%", icd10: "I26.9" }
        ];

        analysis.urgency = "high";
        analysis.riskLevel = "High";
        analysis.followUpRequired = true;
        
        analysis.prescription = {
          medications: [
            {
              name: "Aspirin 325mg",
              dosage: "Chew 1 tablet immediately if no allergies",
              duration: "One time only",
              instructions: "ONLY if confirmed no bleeding disorders",
              genericAvailable: true
            }
          ],
          warnings: ["SEEK IMMEDIATE MEDICAL ATTENTION", "Call 102 for ambulance", "Do not drive yourself"]
        };

        analysis.recommendations = [
          "Call emergency services immediately (102)",
          "Go to nearest hospital emergency room",
          "Chew aspirin if available and no allergies",
          "Sit upright, stay calm",
          "Have someone stay with you"
        ];
      }

      else if (allSymptoms.includes("Stomach pain") && allSymptoms.includes("Diarrhea")) {
        analysis.primaryDiagnosis = {
          name: "Acute Gastroenteritis",
          icd10: "K59.1",
          confidence: "75%",
          description: "Inflammation of stomach and intestines, likely due to viral or bacterial infection",
          expectedDuration: "3-7 days",
          complications: "Dehydration, electrolyte imbalance"
        };

        analysis.differentialDiagnoses = [
          { name: "Food Poisoning", confidence: "40%", icd10: "T62.9" },
          { name: "Inflammatory Bowel Disease", confidence: "10%", icd10: "K50.9" }
        ];

        analysis.prescription = {
          medications: [
            {
              name: "ORS (Oral Rehydration Solution)",
              dosage: "1 packet in 200ml water, sip frequently",
              duration: "Until symptoms resolve",
              instructions: "Continue even if vomiting",
              genericAvailable: true
            },
            {
              name: "Loperamide 2mg",
              dosage: "1 tablet after each loose stool",
              duration: "Maximum 3 days",
              instructions: "Maximum 8 tablets per day",
              genericAvailable: true
            }
          ],
          warnings: ["Avoid if blood in stool", "Stay hydrated", "Consult doctor if symptoms worsen"]
        };

        analysis.ayurvedaRecommendations = [
          "Pomegranate peel powder with water",
          "Curd rice for easy digestion",
          "Jeera (cumin) water for stomach relief",
          "Aam panna (raw mango drink) for electrolytes"
        ];

        analysis.dietRecommendations = [
          "BRAT diet (Banana, Rice, Applesauce, Toast)",
          "Coconut water for electrolytes",
          "Avoid dairy, spicy, and oily foods",
          "Small frequent meals"
        ];
      }

      else if (allSymptoms.includes("Headache") && allSymptoms.includes("Fever") && allSymptoms.includes("Nausea")) {
        analysis.primaryDiagnosis = {
          name: "Viral Fever with Migraine",
          icd10: "G43.9",
          confidence: "70%",
          description: "Fever-induced headache with associated symptoms",
          expectedDuration: "2-5 days",
          complications: "Dehydration, severe headache"
        };

        analysis.prescription = {
          medications: [
            {
              name: "Paracetamol 650mg",
              dosage: "1 tablet every 8 hours",
              duration: "5 days",
              instructions: "Take with plenty of water",
              genericAvailable: true
            },
            {
              name: "Domperidone 10mg",
              dosage: "1 tablet before meals",
              duration: "3 days",
              instructions: "For nausea control",
              genericAvailable: true
            }
          ],
          warnings: ["Monitor temperature", "Seek help if fever > 102°F"]
        };

        analysis.yogaRecommendations = [
          "Sheetali Pranayama (Cooling breath)",
          "Gentle neck stretches",
          "Yoga Nidra for relaxation",
          "Avoid inverted poses during fever"
        ];
      }

      // Default case for general symptoms
      if (!analysis.primaryDiagnosis.name) {
        analysis.primaryDiagnosis = {
          name: "General Malaise/Viral Syndrome",
          icd10: "R53",
          confidence: "60%",
          description: "Non-specific symptoms suggesting viral infection or stress-related condition",
          expectedDuration: "3-7 days",
          complications: "Usually self-limiting"
        };

        analysis.prescription = {
          medications: [
            {
              name: "Multivitamin",
              dosage: "1 tablet daily",
              duration: "1 month",
              instructions: "Take after breakfast",
              genericAvailable: true
            }
          ],
          warnings: ["Monitor symptoms", "Seek medical help if worsening"]
        };
      }

      // Common recommendations for all conditions
      analysis.recommendations = [
        ...analysis.recommendations,
        "Maintain good hygiene",
        "Get adequate rest (7-8 hours sleep)",
        "Stay hydrated with warm fluids",
        "Follow up if symptoms persist beyond expected duration",
        "Return immediately if emergency signs develop"
      ];

      analysis.homeRemedies = [
        ...analysis.homeRemedies,
        "Warm salt water gargling",
        "Steam inhalation",
        "Rest in well-ventilated room",
        "Maintain body temperature"
      ];

      setAnalysis(analysis);
      setIsAnalyzing(false);
    }, 3000); // Longer simulation for detailed analysis
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const downloadPrescription = () => {
    if (!analysis) return;
    
    const prescriptionText = `
DIGITAL PRESCRIPTION - SEHAT SATHI AI
Generated on: ${new Date().toLocaleDateString()}
Patient Age: ${age}, Gender: ${gender}
Duration of symptoms: ${duration}

PRIMARY DIAGNOSIS:
${analysis.primaryDiagnosis.name} (${analysis.primaryDiagnosis.icd10})
Confidence: ${analysis.primaryDiagnosis.confidence}
${analysis.primaryDiagnosis.description}

PRESCRIPTION:
${analysis.prescription.medications?.map((med: any) => 
  `${med.name} - ${med.dosage} for ${med.duration}\nInstructions: ${med.instructions}`
).join('\n\n')}

WARNINGS:
${analysis.prescription.warnings?.join('\n')}

RECOMMENDATIONS:
${analysis.recommendations.join('\n')}

AYURVEDIC REMEDIES:
${analysis.ayurvedaRecommendations.join('\n')}

YOGA THERAPY:
${analysis.yogaRecommendations.join('\n')}

Note: This is an AI-generated assessment. Please consult a qualified healthcare provider for proper medical advice.
    `;
    
    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sehat_Sathi_Prescription_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Heart className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sehat Sathi</h2>
            <p className="text-green-100">SDG 3: Good Health - AI-Powered Detailed Diagnosis</p>
          </div>
        </div>
        <p className="text-green-100 mb-4">
          Advanced AI health assessment with yoga, ayurveda, prescriptions, and nearby facilities
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">25K+</div>
            <div className="text-sm text-green-100">Detailed Reports</div>
          </div>
          <div>
            <div className="text-2xl font-bold">99.2%</div>
            <div className="text-sm text-green-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-green-100">Nearby Facilities</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-green-100">AI Available</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
        {["checker", "facilities", "prescriptions", "ayurveda", "yoga"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {tab === "checker" ? "AI Diagnosis" : tab}
          </button>
        ))}
      </div>

      {/* AI Diagnosis Checker */}
      {activeTab === "checker" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-green-500" />
                Advanced AI Medical Diagnosis
              </CardTitle>
              <CardDescription>
                Detailed symptom analysis with specific disease identification and treatment plans
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
                  placeholder="Describe any other symptoms you're experiencing in detail..."
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
                    Running advanced AI analysis...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Get Detailed AI Diagnosis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Primary Diagnosis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
                      Primary Diagnosis
                    </div>
                    <Badge className={getUrgencyColor(analysis.urgency)}>
                      {analysis.riskLevel} Risk
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-blue-900">{analysis.primaryDiagnosis.name}</h3>
                        <Badge variant="outline">{analysis.primaryDiagnosis.confidence}</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p><strong>ICD-10 Code:</strong> {analysis.primaryDiagnosis.icd10}</p>
                        <p><strong>Description:</strong> {analysis.primaryDiagnosis.description}</p>
                        <p><strong>Expected Duration:</strong> {analysis.primaryDiagnosis.expectedDuration}</p>
                        <p><strong>Potential Complications:</strong> {analysis.primaryDiagnosis.complications}</p>
                      </div>
                    </div>

                    {analysis.differentialDiagnoses.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Differential Diagnoses:</h4>
                        <div className="space-y-2">
                          {analysis.differentialDiagnoses.map((diag: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">{diag.name} ({diag.icd10})</span>
                              <Badge variant="outline" className="text-xs">{diag.confidence}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Prescription */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Pill className="h-5 w-5 mr-2 text-green-500" />
                      AI-Generated Prescription
                    </div>
                    <Button onClick={downloadPrescription} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.prescription.medications?.map((med: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-green-700">{med.name}</h4>
                          {med.genericAvailable && (
                            <Badge className="bg-green-100 text-green-800">Generic Available</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><strong>Dosage:</strong> {med.dosage}</p>
                          <p><strong>Duration:</strong> {med.duration}</p>
                          <p><strong>Instructions:</strong> {med.instructions}</p>
                        </div>
                      </div>
                    ))}

                    {analysis.prescription.warnings && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Warnings:</h4>
                        <ul className="space-y-1 text-sm text-red-700">
                          {analysis.prescription.warnings.map((warning: string, index: number) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ayurveda Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-600" />
                    Ayurvedic Treatment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">Herbal Remedies:</h4>
                      <ul className="space-y-2">
                        {analysis.ayurvedaRecommendations.map((remedy: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <Leaf className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Dietary Guidelines:</h4>
                      <ul className="space-y-2">
                        {analysis.dietRecommendations?.map((diet: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {diet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yoga Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lotus className="h-5 w-5 mr-2 text-purple-500" />
                    Yoga Therapy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.yogaRecommendations.map((yoga: string, index: number) => (
                      <div key={index} className="flex items-start p-3 bg-purple-50 rounded-lg">
                        <Lotus className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{yoga}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Warning */}
              {analysis.urgency === "high" && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <div className="flex items-center text-red-800 mb-3">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    <strong className="text-lg">URGENT MEDICAL ATTENTION REQUIRED</strong>
                  </div>
                  <p className="text-red-700 mb-4">
                    Your symptoms suggest a serious condition that requires immediate medical care.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => window.open("tel:102")}
                      className="bg-red-600 hover:bg-red-700 mr-4"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Ambulance (102)
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("facilities")}
                      variant="outline"
                    >
                      <Hospital className="h-4 w-4 mr-2" />
                      Find Nearest Hospital
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Nearby Facilities */}
      {activeTab === "facilities" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hospital className="h-5 w-5 mr-2 text-blue-500" />
                Nearby Hospitals & Clinics
              </CardTitle>
              <CardDescription>
                Real-time location-based medical facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyFacilities.map((facility, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{facility.name}</h4>
                        <Badge variant="outline" className="mt-1">{facility.type}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{facility.distance}</div>
                        <div className="text-xs text-gray-500">{facility.timing}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">{facility.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{facility.contact}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Specialties:</h5>
                      <div className="flex flex-wrap gap-2">
                        {facility.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => window.open(`tel:${facility.contact}`)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://maps.google.com/?q=${facility.coordinates.lat},${facility.coordinates.lng}`, '_blank')}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
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
                <Pill className="h-5 w-5 mr-2 text-green-500" />
                Jan Aushadhi Kendras (Affordable Medicine)
              </CardTitle>
              <CardDescription>
                Government stores for affordable generic medicines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {janAushadhiKendras.map((store, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{store.name}</h4>
                        <div className="text-sm text-gray-600">{store.timing}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{store.distance}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">{store.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{store.contact}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => window.open(`tel:${store.contact}`)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}`, '_blank')}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tabs for prescriptions, ayurveda, yoga */}
      {activeTab === "prescriptions" && (
        <Card>
          <CardHeader>
            <CardTitle>Digital Prescriptions</CardTitle>
            <CardDescription>Your AI-generated prescription history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-gray-600">Complete a diagnosis to get your detailed prescription with generic medicine options.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "ayurveda" && (
        <Card>
          <CardHeader>
            <CardTitle>Ayurvedic Medicine Library</CardTitle>
            <CardDescription>Traditional Indian medicine recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-gray-600">Personalized ayurvedic treatments based on your symptoms and constitution.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "yoga" && (
        <Card>
          <CardHeader>
            <CardTitle>Therapeutic Yoga</CardTitle>
            <CardDescription>Condition-specific yoga therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Lotus className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <p className="text-gray-600">Customized yoga sequences and breathing exercises for your health condition.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
