import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Calculator, 
  TrendingDown, 
  TreePine,
  Car,
  Plane,
  Home,
  Utensils,
  Zap,
  Factory,
  Target,
  Award,
  Calendar,
  DollarSign,
  Download,
  MapPin,
  Lightbulb
} from "lucide-react";

const carbonFactors = {
  // Transport (kg CO2 per km)
  car_petrol: 0.192,
  car_diesel: 0.171,
  car_electric: 0.053,
  motorcycle: 0.113,
  bus: 0.089,
  train: 0.041,
  metro: 0.028,
  auto_rickshaw: 0.155,
  
  // Aviation (kg CO2 per km)
  domestic_flight: 0.255,
  international_flight: 0.195,
  
  // Energy (kg CO2 per kWh)
  electricity_india: 0.82,
  lpg: 2.983, // per kg
  natural_gas: 2.028, // per cubic meter
  
  // Food (kg CO2 per kg)
  beef: 60.0,
  lamb: 24.0,
  pork: 7.0,
  chicken: 6.0,
  fish: 4.0,
  vegetables: 2.0,
  dairy: 3.2,
  rice: 2.7,
  wheat: 1.4
};

const lifestyleRecommendations = [
  {
    category: "Transport",
    action: "Use public transport or cycle for short trips",
    impact: "Save 2.3 kg CO2/day",
    difficulty: "Easy",
    cost: "Free"
  },
  {
    category: "Energy",
    action: "Switch to LED bulbs throughout home",
    impact: "Save 200 kg CO2/year",
    difficulty: "Easy",
    cost: "₹2,000-5,000"
  },
  {
    category: "Food", 
    action: "Reduce meat consumption to 2 days/week",
    impact: "Save 500 kg CO2/year",
    difficulty: "Medium",
    cost: "Free"
  },
  {
    category: "Energy",
    action: "Install solar panels (2kW system)",
    impact: "Save 2,400 kg CO2/year",
    difficulty: "Hard",
    cost: "₹1,20,000"
  },
  {
    category: "Transport",
    action: "Work from home 2 days/week",
    impact: "Save 800 kg CO2/year",
    difficulty: "Medium",
    cost: "Free"
  }
];

const offsetProjects = [
  {
    id: 1,
    name: "Mangrove Restoration - Sundarbans",
    location: "West Bengal, India",
    type: "Forest Conservation",
    costPerTon: 800,
    description: "Protect and restore mangrove forests in the Sundarbans",
    certification: "VCS Verified",
    cobenefits: ["Biodiversity", "Coastal Protection", "Local Jobs"]
  },
  {
    id: 2,
    name: "Solar Cookstoves - Rural Maharashtra",
    location: "Maharashtra, India", 
    type: "Clean Energy",
    costPerTon: 600,
    description: "Distribute efficient cookstoves to reduce firewood use",
    certification: "Gold Standard",
    cobenefits: ["Health Benefits", "Women Empowerment", "Forest Protection"]
  },
  {
    id: 3,
    name: "Afforestation - Rajasthan Desert",
    location: "Rajasthan, India",
    type: "Tree Planting",
    costPerTon: 1200,
    description: "Plant native trees to combat desertification",
    certification: "CDM Verified", 
    cobenefits: ["Soil Conservation", "Water Conservation", "Rural Employment"]
  }
];

export default function CarbonKart() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [calculatorData, setCalculatorData] = useState({
    // Transport
    carKm: "",
    carType: "petrol",
    flightKm: "",
    flightType: "domestic",
    publicTransportKm: "",
    
    // Energy
    electricityUnits: "",
    lpgCylinders: "",
    
    // Food
    meatDays: "",
    vegetarianDays: "",
    dietType: "mixed"
  });
  
  const [carbonResults, setCarbonResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [yearlyFootprint, setYearlyFootprint] = useState(0);
  const [offsetAmount, setOffsetAmount] = useState("");
  
  useEffect(() => {
    // Load saved footprint data
    const saved = localStorage.getItem('carbonFootprint');
    if (saved) {
      setYearlyFootprint(parseFloat(saved));
    }
  }, []);

  const calculateCarbonFootprint = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let totalEmissions = 0;
      const breakdown: any = {
        transport: 0,
        energy: 0, 
        food: 0
      };
      
      // Transport calculations
      if (calculatorData.carKm) {
        const carEmissions = parseFloat(calculatorData.carKm) * carbonFactors[`car_${calculatorData.carType}` as keyof typeof carbonFactors] * 365;
        breakdown.transport += carEmissions;
      }
      
      if (calculatorData.flightKm) {
        const flightEmissions = parseFloat(calculatorData.flightKm) * carbonFactors[`${calculatorData.flightType}_flight` as keyof typeof carbonFactors];
        breakdown.transport += flightEmissions;
      }
      
      if (calculatorData.publicTransportKm) {
        const publicEmissions = parseFloat(calculatorData.publicTransportKm) * carbonFactors.bus * 365;
        breakdown.transport += publicEmissions;
      }
      
      // Energy calculations
      if (calculatorData.electricityUnits) {
        const electricityEmissions = parseFloat(calculatorData.electricityUnits) * carbonFactors.electricity_india * 12;
        breakdown.energy += electricityEmissions;
      }
      
      if (calculatorData.lpgCylinders) {
        const lpgEmissions = parseFloat(calculatorData.lpgCylinders) * 14.2 * carbonFactors.lpg * 12; // 14.2 kg per cylinder
        breakdown.energy += lpgEmissions;
      }
      
      // Food calculations
      if (calculatorData.meatDays) {
        const meatEmissions = parseFloat(calculatorData.meatDays) * 0.5 * carbonFactors.chicken * 52; // 0.5kg average per day
        breakdown.food += meatEmissions;
      }
      
      if (calculatorData.vegetarianDays) {
        const vegEmissions = parseFloat(calculatorData.vegetarianDays) * 1.0 * carbonFactors.vegetables * 52; // 1kg average per day
        breakdown.food += vegEmissions;
      }
      
      totalEmissions = breakdown.transport + breakdown.energy + breakdown.food;
      
      // Compare with Indian average (1.9 tons per person per year)
      const indianAverage = 1900; // kg CO2
      const globalAverage = 4800; // kg CO2
      
      const results = {
        total: Math.round(totalEmissions),
        breakdown,
        comparison: {
          indianAverage,
          globalAverage,
          percentageOfIndian: Math.round((totalEmissions / indianAverage) * 100),
          percentageOfGlobal: Math.round((totalEmissions / globalAverage) * 100)
        },
        rating: getRatingFromEmissions(totalEmissions),
        recommendations: getPersonalizedRecommendations(breakdown)
      };
      
      setCarbonResults(results);
      setYearlyFootprint(totalEmissions);
      localStorage.setItem('carbonFootprint', totalEmissions.toString());
      setIsCalculating(false);
    }, 2000);
  };
  
  const getRatingFromEmissions = (emissions: number) => {
    if (emissions < 1000) return { rating: "Excellent", color: "text-green-700 bg-green-100" };
    if (emissions < 2000) return { rating: "Good", color: "text-blue-700 bg-blue-100" };
    if (emissions < 4000) return { rating: "Average", color: "text-yellow-700 bg-yellow-100" };
    return { rating: "High", color: "text-red-700 bg-red-100" };
  };
  
  const getPersonalizedRecommendations = (breakdown: any) => {
    const recommendations = [];
    
    if (breakdown.transport > breakdown.energy && breakdown.transport > breakdown.food) {
      recommendations.push(lifestyleRecommendations[0], lifestyleRecommendations[4]);
    }
    if (breakdown.energy > 1000) {
      recommendations.push(lifestyleRecommendations[1], lifestyleRecommendations[3]);
    }
    if (breakdown.food > 500) {
      recommendations.push(lifestyleRecommendations[2]);
    }
    
    return recommendations.length > 0 ? recommendations : lifestyleRecommendations.slice(0, 3);
  };

  const purchaseOffset = (project: any) => {
    const amount = parseFloat(offsetAmount);
    if (!amount) {
      alert("Please enter an amount to offset");
      return;
    }
    
    const cost = Math.round(amount * project.costPerTon);
    const trees = Math.round(amount * 40); // Approx 40 trees per ton
    
    alert(`Carbon Offset Purchase Confirmed!\n\nProject: ${project.name}\nAmount: ${amount} tons CO2\nCost: ₹${cost.toLocaleString()}\nTrees Planted: ${trees}\nCertification: ${project.certification}\n\nThank you for taking climate action!\n\nYou will receive a certificate via email and can track your trees on our project dashboard.`);
  };

  const downloadCarbonReport = () => {
    if (!carbonResults) return;
    
    const report = `
CARBON FOOTPRINT REPORT
Generated by CarbonKart on: ${new Date().toLocaleDateString()}

ANNUAL CARBON FOOTPRINT: ${carbonResults.total} kg CO2

BREAKDOWN BY CATEGORY:
Transport: ${Math.round(carbonResults.breakdown.transport)} kg CO2 (${Math.round((carbonResults.breakdown.transport/carbonResults.total)*100)}%)
Energy: ${Math.round(carbonResults.breakdown.energy)} kg CO2 (${Math.round((carbonResults.breakdown.energy/carbonResults.total)*100)}%)
Food: ${Math.round(carbonResults.breakdown.food)} kg CO2 (${Math.round((carbonResults.breakdown.food/carbonResults.total)*100)}%)

COMPARISON:
Your Footprint: ${carbonResults.total} kg CO2
Indian Average: ${carbonResults.comparison.indianAverage} kg CO2
Global Average: ${carbonResults.comparison.globalAverage} kg CO2
vs Indian Average: ${carbonResults.comparison.percentageOfIndian}%
vs Global Average: ${carbonResults.comparison.percentageOfGlobal}%

RATING: ${carbonResults.rating.rating}

PERSONALIZED RECOMMENDATIONS:
${carbonResults.recommendations.map((rec: any, i: number) => 
  `${i+1}. ${rec.action} (${rec.category})
   Impact: ${rec.impact}
   Difficulty: ${rec.difficulty}
   Cost: ${rec.cost}`
).join('\n\n')}

OFFSET RECOMMENDATION:
To become carbon neutral, offset ${carbonResults.total} kg CO2
Estimated cost: ₹${Math.round(carbonResults.total * 600/1000).toLocaleString()} - ₹${Math.round(carbonResults.total * 1200/1000).toLocaleString()}

Generated by CarbonKart - Your Climate Action Companion
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Carbon_Footprint_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Leaf className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">CarbonKart</h2>
            <p className="text-emerald-100">SDG 13: Climate Action - Real Carbon Footprint Tracking</p>
          </div>
        </div>
        <p className="text-emerald-100 mb-4">
          Calculate real carbon emissions, get personalized recommendations, and offset your footprint
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{yearlyFootprint ? Math.round(yearlyFootprint) : '0'}</div>
            <div className="text-sm text-emerald-100">Your CO2 (kg/year)</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1,900</div>
            <div className="text-sm text-emerald-100">India Avg (kg/year)</div>
          </div>
          <div>
            <div className="text-2xl font-bold">12K+</div>
            <div className="text-sm text-emerald-100">Trees Planted</div>
          </div>
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-emerald-100">Tons Offset</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["calculator", "recommendations", "offset", "tracking"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-emerald-500 text-white"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {tab === "calculator" ? "Carbon Calculator" : tab}
          </button>
        ))}
      </div>

      {/* Carbon Calculator Tab */}
      {activeTab === "calculator" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-emerald-500" />
                Personal Carbon Footprint Calculator
              </CardTitle>
              <CardDescription>
                Calculate your annual carbon emissions with real Indian emission factors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transport Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Car className="h-5 w-5 mr-2 text-blue-500" />
                  Transport (Daily Average)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="carKm">Car Travel (km/day)</Label>
                    <Input
                      value={calculatorData.carKm}
                      onChange={(e) => setCalculatorData({...calculatorData, carKm: e.target.value})}
                      placeholder="e.g., 25"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carType">Car Type</Label>
                    <select 
                      value={calculatorData.carType}
                      onChange={(e) => setCalculatorData({...calculatorData, carType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="publicTransportKm">Public Transport (km/day)</Label>
                    <Input
                      value={calculatorData.publicTransportKm}
                      onChange={(e) => setCalculatorData({...calculatorData, publicTransportKm: e.target.value})}
                      placeholder="e.g., 10"
                      type="number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="flightKm">Flight Travel (km/year)</Label>
                    <Input
                      value={calculatorData.flightKm}
                      onChange={(e) => setCalculatorData({...calculatorData, flightKm: e.target.value})}
                      placeholder="e.g., 5000"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flightType">Flight Type</Label>
                    <select 
                      value={calculatorData.flightType}
                      onChange={(e) => setCalculatorData({...calculatorData, flightType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="domestic">Domestic</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Energy Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Home Energy (Monthly Average)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="electricityUnits">Electricity (kWh/month)</Label>
                    <Input
                      value={calculatorData.electricityUnits}
                      onChange={(e) => setCalculatorData({...calculatorData, electricityUnits: e.target.value})}
                      placeholder="e.g., 300"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lpgCylinders">LPG Cylinders (per month)</Label>
                    <Input
                      value={calculatorData.lpgCylinders}
                      onChange={(e) => setCalculatorData({...calculatorData, lpgCylinders: e.target.value})}
                      placeholder="e.g., 1.5"
                      type="number"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Food Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-orange-500" />
                  Diet (Days per week)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="meatDays">Meat/Fish Days (per week)</Label>
                    <Input
                      value={calculatorData.meatDays}
                      onChange={(e) => setCalculatorData({...calculatorData, meatDays: e.target.value})}
                      placeholder="e.g., 3"
                      type="number"
                      max="7"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vegetarianDays">Vegetarian Days (per week)</Label>
                    <Input
                      value={calculatorData.vegetarianDays}
                      onChange={(e) => setCalculatorData({...calculatorData, vegetarianDays: e.target.value})}
                      placeholder="e.g., 4"
                      type="number"
                      max="7"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculateCarbonFootprint}
                disabled={isCalculating}
                className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 text-lg"
              >
                {isCalculating ? (
                  <>
                    <Calculator className="h-5 w-5 mr-2 animate-pulse" />
                    Calculating with Real Emission Factors...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate My Carbon Footprint
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {carbonResults && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-emerald-500" />
                      Your Carbon Footprint Results
                    </div>
                    <Button onClick={downloadCarbonReport} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">
                        {carbonResults.total} kg CO2
                      </div>
                      <div className="text-gray-600 mb-4">Annual Carbon Footprint</div>
                      <Badge className={carbonResults.rating.color}>
                        {carbonResults.rating.rating}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Car className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl font-bold">{Math.round(carbonResults.breakdown.transport)}</div>
                        <div className="text-sm text-gray-600">Transport kg CO2</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <div className="text-2xl font-bold">{Math.round(carbonResults.breakdown.energy)}</div>
                        <div className="text-sm text-gray-600">Energy kg CO2</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                        <div className="text-2xl font-bold">{Math.round(carbonResults.breakdown.food)}</div>
                        <div className="text-sm text-gray-600">Food kg CO2</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Comparison with Averages</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">vs Indian Average ({carbonResults.comparison.indianAverage} kg)</span>
                            <span className="text-sm font-medium">{carbonResults.comparison.percentageOfIndian}%</span>
                          </div>
                          <Progress value={Math.min(carbonResults.comparison.percentageOfIndian, 100)} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">vs Global Average ({carbonResults.comparison.globalAverage} kg)</span>
                            <span className="text-sm font-medium">{carbonResults.comparison.percentageOfGlobal}%</span>
                          </div>
                          <Progress value={Math.min(carbonResults.comparison.percentageOfGlobal, 100)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === "recommendations" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Personalized Climate Action Recommendations
              </CardTitle>
              <CardDescription>
                {carbonResults ? 
                  "AI-powered recommendations based on your carbon footprint" :
                  "Calculate your footprint first to get personalized recommendations"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(carbonResults ? carbonResults.recommendations : lifestyleRecommendations.slice(0, 5)).map((rec: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{rec.category}</Badge>
                        <h4 className="font-semibold text-gray-900">{rec.action}</h4>
                        <p className="text-green-600 font-medium">{rec.impact}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          rec.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                          rec.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {rec.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost: {rec.cost}</span>
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Carbon Offset Tab */}
      {activeTab === "offset" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TreePine className="h-5 w-5 mr-2 text-green-500" />
                Carbon Offset Projects
              </CardTitle>
              <CardDescription>
                Offset your carbon footprint by supporting verified climate projects in India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="offsetAmount">Amount to Offset (tons CO2)</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={offsetAmount}
                    onChange={(e) => setOffsetAmount(e.target.value)}
                    placeholder={yearlyFootprint ? `${(yearlyFootprint/1000).toFixed(1)}` : "1.0"}
                    type="number"
                    step="0.1"
                  />
                  {yearlyFootprint > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setOffsetAmount((yearlyFootprint/1000).toFixed(1))}
                    >
                      Offset Full Footprint
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {offsetProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <div className="flex items-center text-gray-600 mt-1 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                        <p className="text-gray-700 mt-2">{project.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{project.costPerTon}
                        </div>
                        <div className="text-sm text-gray-600">per ton CO2</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Co-benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.cobenefits.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <Award className="h-4 w-4 inline mr-1" />
                        {project.certification}
                      </div>
                      <div className="flex items-center space-x-2">
                        {offsetAmount && (
                          <span className="text-sm text-gray-600">
                            Cost: ₹{Math.round(parseFloat(offsetAmount) * project.costPerTon).toLocaleString()}
                          </span>
                        )}
                        <Button 
                          onClick={() => purchaseOffset(project)}
                          className="bg-green-500 hover:bg-green-600"
                          disabled={!offsetAmount}
                        >
                          <TreePine className="h-4 w-4 mr-2" />
                          Purchase Offset
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === "tracking" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-blue-500" />
              Carbon Footprint Tracking
            </CardTitle>
            <CardDescription>Track your emissions reduction progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <Calculator className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                  <div className="text-2xl font-bold">{yearlyFootprint ? Math.round(yearlyFootprint) : '0'}</div>
                  <div className="text-sm text-gray-600">Current Footprint (kg CO2)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">1,500</div>
                  <div className="text-sm text-gray-600">Target (kg CO2)</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TreePine className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-gray-600">Tons Offset</div>
                </div>
              </div>

              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Start Your Climate Journey</h3>
                <p className="text-gray-600 mb-4">
                  Calculate your footprint regularly to track your progress towards carbon neutrality
                </p>
                <Button 
                  onClick={() => setActiveTab("calculator")}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Calculate Your Footprint
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
