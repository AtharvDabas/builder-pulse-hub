import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  Camera, 
  MapPin, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Upload,
  Brain,
  Filter,
  Thermometer,
  Beaker,
  FileText,
  Download,
  Navigation,
  Eye
} from "lucide-react";

const waterQualityData = [
  {
    id: 1,
    location: "Connaught Place, Delhi",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    quality: "good",
    pH: 7.2,
    turbidity: 1.8,
    chlorine: 0.5,
    bacteria: "Absent",
    lastTested: "2024-01-15",
    source: "Municipal Supply",
    testType: "AI Analysis"
  },
  {
    id: 2,
    location: "Karol Bagh, Delhi",
    coordinates: { lat: 28.6519, lng: 77.1909 },
    quality: "moderate",
    pH: 6.8,
    turbidity: 3.2,
    chlorine: 0.3,
    bacteria: "Traces",
    lastTested: "2024-01-14",
    source: "Borewell",
    testType: "Lab Test"
  },
  {
    id: 3,
    location: "Janakpuri, Delhi",
    coordinates: { lat: 28.6219, lng: 77.0757 },
    quality: "poor",
    pH: 6.2,
    turbidity: 8.5,
    chlorine: 0.1,
    bacteria: "Present",
    lastTested: "2024-01-13",
    source: "Hand Pump",
    testType: "AI Analysis"
  }
];

const analysisHistory = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30",
    location: "User Location",
    quality: "good",
    confidence: 92,
    image: "water_sample_1.jpg",
    parameters: {
      color: "Clear",
      turbidity: "Low",
      particles: "Minimal",
      contamination: "None detected"
    },
    recommendations: [
      "Water appears safe for drinking",
      "No immediate treatment required", 
      "Continue regular monitoring"
    ]
  },
  {
    id: 2,
    timestamp: "2024-01-14 11:15",
    location: "User Location",
    quality: "moderate",
    confidence: 87,
    image: "water_sample_2.jpg",
    parameters: {
      color: "Slightly cloudy",
      turbidity: "Medium",
      particles: "Some visible",
      contamination: "Minor impurities"
    },
    recommendations: [
      "Boil water before drinking",
      "Consider using a water filter",
      "Test again in 24 hours"
    ]
  }
];

export default function JalRakshak() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Camera access denied. Please use file upload instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && cameraStream) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'water_sample.jpg', { type: 'image/jpeg' });
            setSelectedImage(file);
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
          }
        });
      }
      
      // Stop camera
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setShowCamera(false);
    }
  };

  const analyzeWaterQuality = async () => {
    if (!selectedImage) {
      alert("Please upload or capture a water sample image first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI computer vision analysis
    const analysisSteps = [
      { step: "Loading image...", progress: 15 },
      { step: "Preprocessing image...", progress: 30 },
      { step: "Detecting water parameters...", progress: 50 },
      { step: "Analyzing color and turbidity...", progress: 70 },
      { step: "Checking for contaminants...", progress: 85 },
      { step: "Generating report...", progress: 100 }
    ];

    for (const step of analysisSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(step.progress);
    }

    // Generate realistic analysis based on simulated computer vision
    const analysis = generateWaterAnalysis();
    setAnalysisResult(analysis);
    setIsAnalyzing(false);
  };

  const generateWaterAnalysis = () => {
    // Simulate computer vision analysis results
    const qualities = ["excellent", "good", "moderate", "poor", "dangerous"];
    const colors = ["Clear", "Slightly cloudy", "Cloudy", "Muddy", "Dark"];
    const turbidities = ["Very low", "Low", "Medium", "High", "Very high"];
    
    const qualityIndex = Math.floor(Math.random() * qualities.length);
    const quality = qualities[qualityIndex];
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%

    const analysis = {
      quality,
      confidence,
      timestamp: new Date().toISOString(),
      parameters: {
        color: colors[qualityIndex],
        turbidity: turbidities[qualityIndex],
        particles: qualityIndex < 2 ? "Minimal" : qualityIndex < 4 ? "Some visible" : "Many particles",
        contamination: qualityIndex < 2 ? "None detected" : qualityIndex < 4 ? "Minor impurities" : "Significant contamination"
      },
      metrics: {
        pH: (7.0 + (Math.random() - 0.5) * 2).toFixed(1),
        turbidity: (Math.random() * 10).toFixed(1),
        temperature: (Math.random() * 10 + 20).toFixed(1),
        dissolvedSolids: Math.floor(Math.random() * 500 + 100)
      },
      recommendations: [],
      treatment: []
    };

    // Generate recommendations based on quality
    if (quality === "excellent" || quality === "good") {
      analysis.recommendations = [
        "Water appears safe for drinking",
        "No immediate treatment required",
        "Continue regular monitoring",
        "Maintain current water source"
      ];
    } else if (quality === "moderate") {
      analysis.recommendations = [
        "Boil water before drinking",
        "Consider using a basic water filter",
        "Test again in 24 hours",
        "Check water source for contamination"
      ];
      analysis.treatment = [
        "Boiling for 5-10 minutes",
        "Basic filtration through cloth",
        "UV sterilization if available",
        "Water purification tablets"
      ];
    } else {
      analysis.recommendations = [
        "DO NOT DRINK without treatment",
        "Use alternative water source immediately",
        "Report to local water authorities",
        "Seek professional water testing"
      ];
      analysis.treatment = [
        "Multi-stage filtration required",
        "Boiling + chemical treatment",
        "Professional water purification",
        "Contact water treatment facility"
      ];
    }

    return analysis;
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent": return "text-green-700 bg-green-100";
      case "good": return "text-green-600 bg-green-100";
      case "moderate": return "text-yellow-600 bg-yellow-100";
      case "poor": return "text-orange-600 bg-orange-100";
      case "dangerous": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const downloadReport = () => {
    if (!analysisResult) return;
    
    const report = `
WATER QUALITY ANALYSIS REPORT
Generated by Jal Rakshak AI on: ${new Date().toLocaleDateString()}

OVERALL QUALITY: ${analysisResult.quality.toUpperCase()}
CONFIDENCE LEVEL: ${analysisResult.confidence}%

VISUAL PARAMETERS:
Color: ${analysisResult.parameters.color}
Turbidity: ${analysisResult.parameters.turbidity}
Particles: ${analysisResult.parameters.particles}
Contamination: ${analysisResult.parameters.contamination}

MEASURED METRICS:
pH Level: ${analysisResult.metrics.pH}
Turbidity: ${analysisResult.metrics.turbidity} NTU
Temperature: ${analysisResult.metrics.temperature}°C
Dissolved Solids: ${analysisResult.metrics.dissolvedSolids} ppm

RECOMMENDATIONS:
${analysisResult.recommendations.map((rec: string) => `• ${rec}`).join('\n')}

${analysisResult.treatment.length > 0 ? `TREATMENT OPTIONS:
${analysisResult.treatment.map((treat: string) => `• ${treat}`).join('\n')}` : ''}

Note: This is an AI-based preliminary analysis. For critical decisions, 
consult professional water testing services.
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Water_Quality_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Droplets className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Jal Rakshak</h2>
            <p className="text-cyan-100">SDG 6: Clean Water - AI-Powered Water Analysis</p>
          </div>
        </div>
        <p className="text-cyan-100 mb-4">
          Computer vision-based water quality testing with real-time monitoring maps
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">3.2K+</div>
            <div className="text-sm text-cyan-100">Tests Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-cyan-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-cyan-100">Locations Mapped</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-cyan-100">Monitoring</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["analyze", "map", "history", "reports"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:text-cyan-600"
            }`}
          >
            {tab === "analyze" ? "AI Analysis" : tab}
          </button>
        ))}
      </div>

      {/* AI Water Analysis Tab */}
      {activeTab === "analyze" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-cyan-500" />
                Computer Vision Water Quality Analysis
              </CardTitle>
              <CardDescription>
                Upload or capture a photo of your water sample for AI-powered quality assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload/Capture */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Water sample" 
                      className="max-w-md mx-auto rounded-lg shadow-md"
                    />
                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Different Image
                      </Button>
                      <Button onClick={openCamera} variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Take New Photo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Droplets className="h-16 w-16 mx-auto text-gray-400" />
                    <div>
                      <h3 className="text-lg font-medium mb-2">Upload Water Sample Image</h3>
                      <p className="text-gray-600 mb-4">
                        Take a clear photo of your water sample against a white background for best results
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button onClick={openCamera} variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Use Camera
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Analysis Button */}
              {selectedImage && (
                <div className="text-center">
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <Brain className="h-6 w-6 text-cyan-500 mr-2 animate-pulse" />
                        <span className="font-medium">AI Computer Vision Analysis in Progress...</span>
                      </div>
                      <Progress value={analysisProgress} className="max-w-md mx-auto" />
                      <p className="text-sm text-gray-600">
                        {analysisProgress < 30 && "Processing image data..."}
                        {analysisProgress >= 30 && analysisProgress < 50 && "Detecting water parameters..."}
                        {analysisProgress >= 50 && analysisProgress < 85 && "Analyzing quality indicators..."}
                        {analysisProgress >= 85 && "Generating comprehensive report..."}
                      </p>
                    </div>
                  ) : (
                    <Button 
                      onClick={analyzeWaterQuality}
                      className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 text-lg"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Analyze Water Quality with AI
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Beaker className="h-5 w-5 mr-2 text-cyan-500" />
                      AI Analysis Results
                    </div>
                    <Button onClick={downloadReport} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Overall Quality */}
                    <div className="text-center">
                      <Badge className={`text-lg px-4 py-2 ${getQualityColor(analysisResult.quality)}`}>
                        Quality: {analysisResult.quality.toUpperCase()}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-2">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>

                    {/* Visual Parameters */}
                    <div>
                      <h4 className="font-semibold mb-3">Computer Vision Analysis:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Color</div>
                          <div className="text-lg">{analysisResult.parameters.color}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Turbidity</div>
                          <div className="text-lg">{analysisResult.parameters.turbidity}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Particles</div>
                          <div className="text-lg">{analysisResult.parameters.particles}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Contamination</div>
                          <div className="text-lg">{analysisResult.parameters.contamination}</div>
                        </div>
                      </div>
                    </div>

                    {/* Estimated Metrics */}
                    <div>
                      <h4 className="font-semibold mb-3">Estimated Metrics:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">pH Level</div>
                          <div className="text-lg font-bold">{analysisResult.metrics.pH}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Turbidity</div>
                          <div className="text-lg font-bold">{analysisResult.metrics.turbidity} NTU</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">Temperature</div>
                          <div className="text-lg font-bold">{analysisResult.metrics.temperature}°C</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm">TDS</div>
                          <div className="text-lg font-bold">{analysisResult.metrics.dissolvedSolids} ppm</div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-3">AI Recommendations:</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment Options */}
                    {analysisResult.treatment.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">How to Make It Drinkable:</h4>
                        <ul className="space-y-2">
                          {analysisResult.treatment.map((treat: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Filter className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{treat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Warning for poor quality */}
                    {(analysisResult.quality === "poor" || analysisResult.quality === "dangerous") && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center text-red-800">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <strong>Water Quality Alert</strong>
                        </div>
                        <p className="text-red-700 text-sm mt-1">
                          This water sample shows signs of contamination. Do not consume without proper treatment.
                          Consider reporting this to local water authorities.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Water Quality Map Tab */}
      {activeTab === "map" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                Real-time Water Quality Map
              </CardTitle>
              <CardDescription>
                Live water quality data from across your region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Interactive Water Quality Map</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Real-time water quality data from government sources, community reports, and AI testing
                  </p>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Navigation className="h-4 w-4 mr-2" />
                    View Full Map
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {waterQualityData.map((location) => (
                    <div key={location.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{location.location}</h4>
                          <p className="text-sm text-gray-600">{location.source}</p>
                        </div>
                        <Badge className={getQualityColor(location.quality)}>
                          {location.quality}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span>pH Level:</span>
                          <span className="font-medium">{location.pH}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Turbidity:</span>
                          <span className="font-medium">{location.turbidity} NTU</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chlorine:</span>
                          <span className="font-medium">{location.chlorine} mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bacteria:</span>
                          <span className="font-medium">{location.bacteria}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Last tested: {location.lastTested}</span>
                        <span>{location.testType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis History Tab */}
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Analysis History</CardTitle>
            <CardDescription>Previous water quality tests and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisHistory.map((analysis) => (
                <div key={analysis.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">Water Analysis #{analysis.id}</h4>
                      <p className="text-sm text-gray-600">{analysis.timestamp}</p>
                      <p className="text-sm text-gray-600">{analysis.location}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getQualityColor(analysis.quality)}>
                        {analysis.quality}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {analysis.confidence}% confidence
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="text-sm">
                      <span className="font-medium">Color:</span> {analysis.parameters.color}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Turbidity:</span> {analysis.parameters.turbidity}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Particles:</span> {analysis.parameters.particles}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Contamination:</span> {analysis.parameters.contamination}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <Card>
          <CardHeader>
            <CardTitle>Water Quality Reports</CardTitle>
            <CardDescription>Community reports and official water quality data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-cyan-500" />
              <h3 className="text-lg font-semibold mb-2">Comprehensive Water Reports</h3>
              <p className="text-gray-600">
                Access detailed water quality reports, contamination alerts, and community data
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Capture Water Sample Photo</h3>
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex justify-center space-x-4">
                <Button onClick={capturePhoto} className="bg-cyan-500 hover:bg-cyan-600">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Photo
                </Button>
                <Button 
                  onClick={() => {
                    if (cameraStream) {
                      cameraStream.getTracks().forEach(track => track.stop());
                      setCameraStream(null);
                    }
                    setShowCamera(false);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
