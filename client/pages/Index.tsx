import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Utensils,
  Heart,
  GraduationCap,
  Shield,
  Droplets,
  Handshake,
  ShoppingCart,
  Leaf,
  Mountain,
  Scale,
  User,
  Award,
  Globe,
  Menu,
  Bell,
  Star,
  LogIn,
  LogOut,
  Gift
} from "lucide-react";

// SDG Feature Components
import AnnapurnaConnect from "../components/features/AnnapurnaConnect";
import SehatSathi from "../components/features/SehatSathi";
import PathshalaPocket from "../components/features/PathshalaPocket";
import SakhiSuraksha from "../components/features/SakhiSuraksha";
import JalRakshak from "../components/features/JalRakshak";
import SkillhoodLite from "../components/features/SkillhoodLite";
import SaksinGreen from "../components/features/SaksinGreen";
import CarbonKart from "../components/features/CarbonKart";
import MittiMitra from "../components/features/MittiMitra";
import NyayaDost from "../components/features/NyayaDost";

// Auth and Rewards Components
import AuthSystem from "../components/auth/AuthSystem";
import PointsSystem from "../components/rewards/PointsSystem";

const sdgFeatures = [
  {
    id: "annapurna",
    title: "Annapurna Connect",
    subtitle: "Zero Hunger",
    description: "Food donation and distribution network",
    icon: Utensils,
    color: "bg-orange-500",
    sdgColor: "from-orange-400 to-red-500",
    sdgNumber: "SDG 2"
  },
  {
    id: "sehat",
    title: "Sehat Sathi",
    subtitle: "Good Health",
    description: "AI health checker and wellness tracker",
    icon: Heart,
    color: "bg-green-500",
    sdgColor: "from-green-400 to-emerald-500",
    sdgNumber: "SDG 3"
  },
  {
    id: "pathshala",
    title: "Pathshala Pocket",
    subtitle: "Quality Education",
    description: "Volunteer teaching and learning platform",
    icon: GraduationCap,
    color: "bg-blue-500",
    sdgColor: "from-blue-400 to-indigo-500",
    sdgNumber: "SDG 4"
  },
  {
    id: "sakhi",
    title: "Sakhi Suraksha",
    subtitle: "Gender Equality",
    description: "Women safety and rights platform",
    icon: Shield,
    color: "bg-pink-500",
    sdgColor: "from-pink-400 to-rose-500",
    sdgNumber: "SDG 5"
  },
  {
    id: "jal",
    title: "Jal Rakshak",
    subtitle: "Clean Water",
    description: "Water quality monitoring and testing",
    icon: Droplets,
    color: "bg-cyan-500",
    sdgColor: "from-cyan-400 to-blue-500",
    sdgNumber: "SDG 6"
  },
  {
    id: "skillhood",
    title: "Skillhood Lite",
    subtitle: "Decent Work",
    description: "Skill exchange and development platform",
    icon: Handshake,
    color: "bg-purple-500",
    sdgColor: "from-purple-400 to-violet-500",
    sdgNumber: "SDG 8"
  },
  {
    id: "saksin",
    title: "Sākṣin Green",
    subtitle: "Responsible Consumption",
    description: "Sustainable product verification",
    icon: ShoppingCart,
    color: "bg-amber-500",
    sdgColor: "from-amber-400 to-orange-500",
    sdgNumber: "SDG 12"
  },
  {
    id: "carbon",
    title: "CarbonKart",
    subtitle: "Climate Action",
    description: "Carbon footprint tracking and offsetting",
    icon: Leaf,
    color: "bg-emerald-500",
    sdgColor: "from-emerald-400 to-green-500",
    sdgNumber: "SDG 13"
  },
  {
    id: "mitti",
    title: "Mitti Mitra",
    subtitle: "Life on Land",
    description: "Soil health analysis for farmers",
    icon: Mountain,
    color: "bg-yellow-500",
    sdgColor: "from-yellow-400 to-amber-500",
    sdgNumber: "SDG 15"
  },
  {
    id: "nyaya",
    title: "Nyaya Dost",
    subtitle: "Justice & Institutions",
    description: "Legal rights and justice assistance",
    icon: Scale,
    color: "bg-indigo-500",
    sdgColor: "from-indigo-400 to-purple-500",
    sdgNumber: "SDG 16"
  }
];

export default function SarvSankalp() {
  const [activeFeature, setActiveFeature] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sarvSankalpUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('sarvSankalpUser');
    setUser(null);
    setActiveFeature("dashboard");
  };

  const handlePointsUpdate = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
    }
  };

  const getFeatureComponent = (featureId: string) => {
    switch (featureId) {
      case "annapurna": return <AnnapurnaConnect />;
      case "sehat": return <SehatSathi />;
      case "pathshala": return <PathshalaPocket />;
      case "sakhi": return <SakhiSuraksha />;
      case "jal": return <JalRakshak />;
      case "skillhood": return <SkillhoodLite />;
      case "saksin": return <SaksinGreen />;
      case "carbon": return <CarbonKart />;
      case "mitti": return <MittiMitra />;
      case "nyaya": return <NyayaDost />;
      case "points": return user ? <PointsSystem user={user} onPointsUpdate={handlePointsUpdate} /> : null;
      default: return null;
    }
  };

  const translations = {
    en: {
      appTitle: "SarvSankalp",
      appSubtitle: "Contributing to UN Sustainable Development Goals",
      dashboard: "Dashboard",
      myProgress: "My Progress",
      totalPoints: "Total Points",
      currentLevel: "Current Level",
      sdgContributions: "SDG Contributions",
      recentActivity: "Recent Activity"
    },
    hi: {
      appTitle: "सर्वसंकल्प",
      appSubtitle: "य��एन सतत विकास लक्ष्यों में योगदान",
      dashboard: "डैशबोर्ड",
      myProgress: "मेरी प्रगति",
      totalPoints: "कुल अंक",
      currentLevel: "वर्तमान स्तर",
      sdgContributions: "एसडीजी योगदान",
      recentActivity: "हाल की गतिविधि"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {t.appTitle}
                  </h1>
                  <p className="text-sm text-gray-600">{t.appSubtitle}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Star className="h-3 w-3 mr-1" />
                    Level {user.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Award className="h-3 w-3 mr-1" />
                    {user.points} pts
                  </Badge>
                </div>
              )}

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowAuth(true)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:transform-none`}>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">SDG Features</h2>
            <p className="text-sm text-gray-600">Choose a feature to contribute</p>
          </div>
          
          <nav className="p-4 space-y-2 overflow-y-auto h-full">
            <button
              onClick={() => setActiveFeature("dashboard")}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeFeature === "dashboard"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">{t.dashboard}</span>
              </div>
            </button>

            {user && (
              <button
                onClick={() => setActiveFeature("points")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeFeature === "points"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Points & Rewards</span>
                </div>
              </button>
            )}
            
            {sdgFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeFeature === feature.id 
                      ? "bg-blue-100 text-blue-700 border border-blue-200" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{feature.title}</div>
                      <div className="text-xs text-gray-500">{feature.subtitle}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.sdgNumber}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          {activeFeature === "dashboard" ? (
            <div className="p-6 space-y-6">
              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{user?.points || 0}</div>
                    <div className="text-sm text-gray-600">{t.totalPoints}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">Level {user?.level || 1}</div>
                    <div className="text-sm text-gray-600">{t.currentLevel}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-sm text-gray-600">Active SDGs</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold">{user?.contributions || 0}</div>
                    <div className="text-sm text-gray-600">Impact Actions</div>
                  </CardContent>
                </Card>
              </div>

              {/* SDG Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.sdgContributions}</CardTitle>
                  <CardDescription>Your progress towards each Sustainable Development Goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sdgFeatures.slice(0, 5).map((feature, index) => (
                      <div key={feature.id} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">{feature.title}</span>
                            <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100)}%</span>
                          </div>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdgFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card 
                      key={feature.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.sdgColor}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline">{feature.sdgNumber}</Badge>
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">
                          {feature.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                        <Button className="w-full" size="sm">
                          Start Contributing
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {getFeatureComponent(activeFeature) || (
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Under Development</CardTitle>
                    <CardDescription>This feature is being built with full functionality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>The {sdgFeatures.find(f => f.id === activeFeature)?.title} feature is under development with real AI integration and workflows.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
