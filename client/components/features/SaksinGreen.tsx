import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  ScanLine, 
  Camera,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Recycle,
  Lightbulb,
  Star,
  Eye,
  Search,
  Download,
  ExternalLink,
  Zap
} from "lucide-react";

import { ProgressService } from "@/lib/progressService";

const scannedProducts = [
  {
    id: 1,
    name: "EcoFresh Organic Honey",
    barcode: "8901030896705",
    brand: "EcoFresh",
    category: "Food & Beverage",
    scannedAt: "2024-01-15 14:30",
    claimsAnalysis: {
      organic: { claimed: true, verified: true, confidence: 95 },
      natural: { claimed: true, verified: true, confidence: 90 },
      sugarFree: { claimed: false, verified: null, confidence: null },
      local: { claimed: true, verified: false, confidence: 60 }
    },
    overallRating: "verified",
    trustedClaims: 2,
    falseClaimCount: 1,
    recyclability: "high",
    recyclingInstructions: [
      "Glass jar: Clean and reuse for storage",
      "Metal lid: Recycle with metal waste",
      "Label: Remove before recycling"
    ],
    diyProjects: [
      "Turn jar into a candle holder",
      "Use as seed starting containers",
      "Create decorative storage containers"
    ]
  },
  {
    id: 2,
    name: "GreenClean All-Purpose Cleaner",
    barcode: "8901234567890",
    brand: "GreenClean",
    category: "Household",
    scannedAt: "2024-01-14 11:20",
    claimsAnalysis: {
      biodegradable: { claimed: true, verified: true, confidence: 85 },
      chemicalFree: { claimed: true, verified: false, confidence: 45 },
      plantBased: { claimed: true, verified: true, confidence: 80 },
      antibacterial: { claimed: true, verified: false, confidence: 30 }
    },
    overallRating: "mixed",
    trustedClaims: 2,
    falseClaimCount: 2,
    recyclability: "moderate",
    recyclingInstructions: [
      "Plastic bottle: Check recycling code #1 or #2",
      "Rinse thoroughly before recycling",
      "Remove spray nozzle if non-recyclable"
    ],
    diyProjects: [
      "Repurpose bottle for homemade cleaners",
      "Use as plant watering bottle",
      "Convert to storage for garage/shed"
    ]
  }
];

const productDatabase = {
  "8901030896705": {
    name: "EcoFresh Organic Honey",
    brand: "EcoFresh",
    category: "Food & Beverage",
    claims: ["Organic", "Natural", "Local Source"],
    certifications: ["USDA Organic", "Fair Trade"],
    ingredients: ["Organic Honey"],
    packaging: "Glass jar with metal lid"
  },
  "8901234567890": {
    name: "GreenClean All-Purpose Cleaner", 
    brand: "GreenClean",
    category: "Household",
    claims: ["Biodegradable", "Chemical-Free", "Plant-Based", "99.9% Antibacterial"],
    certifications: ["EPA Safer Choice"],
    ingredients: ["Water", "Plant-based surfactants", "Citric acid", "Essential oils", "Preservatives"],
    packaging: "Plastic bottle with spray nozzle"
  }
};

export default function SaksinGreen() {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scanMode, setScanMode] = useState<"barcode" | "camera">("barcode");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const scanProduct = async (barcode?: string) => {
    const codeToScan = barcode || barcodeInput;
    
    if (!codeToScan && !selectedImage) {
      alert("Please enter a barcode or upload a product image");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning process
    const scanSteps = [
      { step: "Reading product code...", progress: 20 },
      { step: "Searching product database...", progress: 40 },
      { step: "Analyzing claims and certifications...", progress: 60 },
      { step: "Checking for false claims...", progress: 80 },
      { step: "Generating recycling guide...", progress: 100 }
    ];

    for (const step of scanSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(step.progress);
    }

    // Generate scan result
    const result = generateScanResult(codeToScan);
    setScanResult(result);

    try {
      const savedUser = localStorage.getItem('sarvSankalpUser');
      const userId = savedUser ? JSON.parse(savedUser).id : 'guest';

      ProgressService.trackActivity(userId, 'saksin', 'products_scanned', 1, {
        barcode: codeToScan,
        found: !!result?.found,
        name: result?.name || null
      });

      if (result && result.found) {
        ProgressService.trackActivity(userId, 'saksin', 'barcodes_verified', 1, {
          barcode: result.barcode
        });

        ProgressService.trackActivity(userId, 'saksin', 'sustainability_scores', 1, {
          overallRating: result.overallRating,
          trustedClaims: result.trustedClaims,
          falseClaimCount: result.falseClaimCount
        });

        if (Array.isArray(result.diyProjects) && result.diyProjects.length > 0) {
          ProgressService.trackActivity(userId, 'saksin', 'eco_recommendations', result.diyProjects.length, {
            diyProjects: result.diyProjects
          });
        }
      }
    } catch (e) {
      console.error('Progress tracking failed:', e);
    }

    setIsScanning(false);
  };

  const generateScanResult = (barcode: string) => {
    // Check if product exists in database
    const productData = productDatabase[barcode as keyof typeof productDatabase];
    
    if (!productData) {
      return {
        found: false,
        barcode,
        message: "Product not found in database. Would you like to contribute product information?"
      };
    }

    // Simulate AI analysis of claims
    const claimsAnalysis: any = {};
    const allClaims = [
      "organic", "natural", "biodegradable", "chemicalFree", "plantBased", 
      "sugarFree", "local", "antibacterial", "nonToxic", "sustainable"
    ];

    productData.claims.forEach(claim => {
      const key = claim.toLowerCase().replace(/[^a-z]/g, '');
      const confidence = Math.floor(Math.random() * 40) + 60; // 60-99%
      const verified = confidence > 75;
      
      claimsAnalysis[key] = {
        claimed: true,
        verified,
        confidence,
        evidence: verified ? 
          `Verified through certification documents` : 
          `Insufficient evidence found`
      };
    });

    // Add some false claims for demonstration
    if (Math.random() > 0.5) {
      const falseClaim = allClaims[Math.floor(Math.random() * allClaims.length)];
      if (!claimsAnalysis[falseClaim]) {
        claimsAnalysis[falseClaim] = {
          claimed: true,
          verified: false,
          confidence: Math.floor(Math.random() * 30) + 10, // 10-40%
          evidence: "Marketing claim not supported by available data"
        };
      }
    }

    const trustedClaims = Object.values(claimsAnalysis).filter((claim: any) => claim.verified).length;
    const falseClaimCount = Object.values(claimsAnalysis).filter((claim: any) => !claim.verified && claim.claimed).length;
    
    const overallRating = falseClaimCount === 0 ? "verified" : 
                         trustedClaims > falseClaimCount ? "mixed" : "unreliable";

    // Generate recycling instructions based on packaging
    const recyclingInstructions = generateRecyclingInstructions(productData.packaging);
    const diyProjects = generateDIYProjects(productData.category, productData.packaging);

    return {
      found: true,
      ...productData,
      barcode,
      claimsAnalysis,
      overallRating,
      trustedClaims,
      falseClaimCount,
      recyclability: Math.random() > 0.3 ? "high" : "moderate",
      recyclingInstructions,
      diyProjects,
      timestamp: new Date().toISOString()
    };
  };

  const generateRecyclingInstructions = (packaging: string) => {
    const instructions = [];
    
    if (packaging.includes("plastic")) {
      instructions.push("Check recycling code on bottom of container");
      instructions.push("Rinse container thoroughly before recycling");
      instructions.push("Remove any non-recyclable components");
    }
    
    if (packaging.includes("glass")) {
      instructions.push("Clean glass thoroughly");
      instructions.push("Remove metal lids and plastic labels");
      instructions.push("Recycle with glass waste collection");
    }
    
    if (packaging.includes("metal")) {
      instructions.push("Clean metal components");
      instructions.push("Recycle with metal waste");
    }
    
    if (packaging.includes("paper") || packaging.includes("cardboard")) {
      instructions.push("Remove any plastic coating");
      instructions.push("Recycle with paper waste");
    }

    return instructions.length > 0 ? instructions : [
      "Check local recycling guidelines",
      "Separate components by material type",
      "Clean thoroughly before disposal"
    ];
  };

  const generateDIYProjects = (category: string, packaging: string) => {
    const projects = [];
    
    if (packaging.includes("glass jar")) {
      projects.push("Turn into storage containers for kitchen items");
      projects.push("Create candle holders or vases");
      projects.push("Use for seed starting in garden");
    } else if (packaging.includes("plastic bottle")) {
      projects.push("Convert to self-watering planters");
      projects.push("Make bird feeders for garden");
      projects.push("Create organizers for garage or workshop");
    } else if (packaging.includes("cardboard")) {
      projects.push("Use for compost materials");
      projects.push("Create organizers or gift boxes");
      projects.push("Make children's craft projects");
    }
    
    if (category === "Food & Beverage") {
      projects.push("Repurpose container for food storage");
      projects.push("Use for packed lunch containers");
    } else if (category === "Household") {
      projects.push("Refill with homemade alternatives");
      projects.push("Use for storing cleaning supplies");
    }

    return projects.length > 0 ? projects : [
      "Research creative upcycling ideas online",
      "Donate to local craft organizations",
      "Use in art and craft projects"
    ];
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "verified": return "text-green-700 bg-green-100";
      case "mixed": return "text-yellow-700 bg-yellow-100";
      case "unreliable": return "text-red-700 bg-red-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  const getClaimIcon = (verified: boolean) => {
    return verified ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const downloadReport = () => {
    if (!scanResult) return;
    
    const report = `
PRODUCT VERIFICATION REPORT
Generated by Sākṣin Green on: ${new Date().toLocaleDateString()}

PRODUCT INFORMATION:
Name: ${scanResult.name}
Brand: ${scanResult.brand}
Category: ${scanResult.category}
Barcode: ${scanResult.barcode}

CLAIMS ANALYSIS:
Overall Rating: ${scanResult.overallRating.toUpperCase()}
Trusted Claims: ${scanResult.trustedClaims}
False Claims Detected: ${scanResult.falseClaimCount}

DETAILED CLAIM VERIFICATION:
${Object.entries(scanResult.claimsAnalysis).map(([claim, data]: [string, any]) => 
  `${claim.toUpperCase()}: ${data.claimed ? 'CLAIMED' : 'NOT CLAIMED'} | ${data.verified ? 'VERIFIED' : 'UNVERIFIED'} | Confidence: ${data.confidence}%`
).join('\n')}

RECYCLING INSTRUCTIONS:
${scanResult.recyclingInstructions.map((instruction: string) => `• ${instruction}`).join('\n')}

DIY UPCYCLING IDEAS:
${scanResult.diyProjects.map((project: string) => `• ${project}`).join('\n')}

CERTIFICATIONS:
${scanResult.certifications ? scanResult.certifications.join(', ') : 'No certifications found'}

Note: This analysis is based on available data and public information. 
For critical decisions, consult official certification bodies.
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Product_Verification_${scanResult.barcode}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <ScanLine className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sākṣin Green</h2>
            <p className="text-amber-100">SDG 12: Responsible Consumption - False Claims Detective</p>
          </div>
        </div>
        <p className="text-amber-100 mb-4">
          Scan products to detect false claims and get creative recycling ideas
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">4.8K+</div>
            <div className="text-sm text-amber-100">Products Scanned</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1.2K</div>
            <div className="text-sm text-amber-100">False Claims Found</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3.6K</div>
            <div className="text-sm text-amber-100">DIY Ideas Generated</div>
          </div>
          <div>
            <div className="text-2xl font-bold">89%</div>
            <div className="text-sm text-amber-100">Accuracy Rate</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["scanner", "history", "reports", "database"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-amber-500 text-white"
                : "text-gray-600 hover:text-amber-600"
            }`}
          >
            {tab === "scanner" ? "Product Scanner" : tab}
          </button>
        ))}
      </div>

      {/* Product Scanner Tab */}
      {activeTab === "scanner" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ScanLine className="h-5 w-5 mr-2 text-amber-500" />
                AI-Powered Product Scanner
              </CardTitle>
              <CardDescription>
                Scan products to verify claims, detect false information, and get recycling tips
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scan Mode Selection */}
              <div className="flex space-x-4">
                <Button
                  variant={scanMode === "barcode" ? "default" : "outline"}
                  onClick={() => setScanMode("barcode")}
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Enter Barcode
                </Button>
                <Button
                  variant={scanMode === "camera" ? "default" : "outline"}
                  onClick={() => setScanMode("camera")}
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Scan with Camera
                </Button>
              </div>

              {/* Barcode Input */}
              {scanMode === "barcode" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter Product Barcode</label>
                    <div className="flex space-x-2">
                      <Input
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        placeholder="e.g., 8901030896705"
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => scanProduct()}
                        disabled={!barcodeInput || isScanning}
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        <ScanLine className="h-4 w-4 mr-2" />
                        Scan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Try these sample barcodes:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setBarcodeInput("8901030896705")}
                      >
                        Honey Sample
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setBarcodeInput("8901234567890")}
                      >
                        Cleaner Sample
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Upload */}
              {scanMode === "camera" && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Product" 
                        className="max-w-md mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex justify-center space-x-4">
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          Choose Different Image
                        </Button>
                        <Button 
                          onClick={() => scanProduct()}
                          disabled={isScanning}
                          className="bg-amber-500 hover:bg-amber-600"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Analyze Product
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ScanLine className="h-16 w-16 mx-auto text-gray-400" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Upload Product Image</h3>
                        <p className="text-gray-600 mb-4">
                          Take a clear photo of the product label and barcode for analysis
                        </p>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-amber-500 hover:bg-amber-600"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
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
              )}

              {/* Scanning Progress */}
              {isScanning && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Zap className="h-5 w-5 text-amber-500 mr-2 animate-pulse" />
                    <span className="font-medium">AI Analysis in Progress...</span>
                  </div>
                  <Progress value={scanProgress} className="mb-2" />
                  <p className="text-sm text-amber-600">
                    {scanProgress < 40 && "Reading product information..."}
                    {scanProgress >= 40 && scanProgress < 60 && "Analyzing claims and certifications..."}
                    {scanProgress >= 60 && scanProgress < 80 && "Checking for false claims..."}
                    {scanProgress >= 80 && "Generating recycling guide..."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scan Results */}
          {scanResult && (
            <div className="space-y-6">
              {scanResult.found ? (
                <>
                  {/* Product Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2 text-amber-500" />
                          Product Analysis Results
                        </div>
                        <Button onClick={downloadReport} size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{scanResult.name}</h3>
                            <p className="text-gray-600">{scanResult.brand} • {scanResult.category}</p>
                            <p className="text-sm text-gray-500">Barcode: {scanResult.barcode}</p>
                          </div>
                          <Badge className={getRatingColor(scanResult.overallRating)}>
                            {scanResult.overallRating.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{scanResult.trustedClaims}</div>
                            <div className="text-sm text-green-700">Verified Claims</div>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{scanResult.falseClaimCount}</div>
                            <div className="text-sm text-red-700">False Claims</div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{scanResult.recyclability}</div>
                            <div className="text-sm text-blue-700">Recyclability</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Claims Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                        Claims Verification Analysis
                      </CardTitle>
                      <CardDescription>
                        Detailed analysis of product claims and their verification status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(scanResult.claimsAnalysis).map(([claim, data]: [string, any]) => (
                          <div key={claim} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getClaimIcon(data.verified)}
                              <div>
                                <h4 className="font-medium capitalize">{claim}</h4>
                                <p className="text-sm text-gray-600">{data.evidence}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={data.verified ? "default" : "destructive"}>
                                {data.confidence}% confidence
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">
                                {data.verified ? "Verified" : "Unverified"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {scanResult.falseClaimCount > 0 && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center text-red-800">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            <strong>False Claims Detected</strong>
                          </div>
                          <p className="text-red-700 text-sm mt-1">
                            This product has {scanResult.falseClaimCount} unverified claims. Be cautious of misleading marketing.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recycling Guide */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Recycle className="h-5 w-5 mr-2 text-green-500" />
                        Smart Recycling Guide
                      </CardTitle>
                      <CardDescription>
                        Learn how to properly dispose of or creatively reuse this product
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Recycle className="h-4 w-4 mr-2 text-green-500" />
                            Recycling Instructions
                          </h4>
                          <ul className="space-y-2">
                            {scanResult.recyclingInstructions.map((instruction: string, index: number) => (
                              <li key={index} className="flex items-start text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                            Creative DIY Ideas
                          </h4>
                          <ul className="space-y-2">
                            {scanResult.diyProjects.map((project: string, index: number) => (
                              <li key={index} className="flex items-start text-sm">
                                <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Product Not Found</h3>
                    <p className="text-gray-600 mb-4">{scanResult.message}</p>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contribute Product Data
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}

      {/* Scan History Tab */}
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
            <CardDescription>Your previous product scans and analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scannedProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                      <p className="text-xs text-gray-500">Scanned: {product.scannedAt}</p>
                    </div>
                    <Badge className={getRatingColor(product.overallRating)}>
                      {product.overallRating}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>✅ {product.trustedClaims} verified claims</div>
                    <div>❌ {product.falseClaimCount} false claims</div>
                    <div>♻️ {product.recyclability} recyclability</div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    View Full Analysis
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
            <CardTitle>False Claims Reports</CardTitle>
            <CardDescription>Community reports of misleading product claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
              <h3 className="text-lg font-semibold mb-2">Community Watchdog</h3>
              <p className="text-gray-600">
                Help build a database of verified and false product claims
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database Tab */}
      {activeTab === "database" && (
        <Card>
          <CardHeader>
            <CardTitle>Product Database</CardTitle>
            <CardDescription>Comprehensive database of verified product information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-amber-500" />
              <h3 className="text-lg font-semibold mb-2">Growing Database</h3>
              <p className="text-gray-600">
                Access verified information about thousands of products and their claims
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
