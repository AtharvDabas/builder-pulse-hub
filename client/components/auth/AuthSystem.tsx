import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield,
  Briefcase,
  Heart,
  GraduationCap,
  Building
} from "lucide-react";

interface AuthSystemProps {
  onLogin: (user: any) => void;
  onClose: () => void;
}

const userTypes = [
  { id: "citizen", name: "Citizen", icon: User, description: "General user contributing to SDGs" },
  { id: "ngo", name: "NGO", icon: Heart, description: "Non-profit organization" },
  { id: "farmer", name: "Farmer", icon: Building, description: "Agricultural professional" },
  { id: "volunteer", name: "Volunteer", icon: GraduationCap, description: "Teaching and community volunteer" },
  { id: "business", name: "Business", icon: Briefcase, description: "Corporate user" }
];

export default function AuthSystem({ onLogin, onClose }: AuthSystemProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    userType: "citizen",
    organization: "",
    interests: [] as string[]
  });

  const handleSubmit = () => {
    // Simulate authentication
    const user = {
      id: Date.now(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      userType: formData.userType,
      phone: formData.phone,
      location: formData.location,
      organization: formData.organization,
      interests: formData.interests,
      points: Math.floor(Math.random() * 2000) + 500,
      level: Math.floor(Math.random() * 5) + 1,
      joinedDate: new Date().toISOString(),
      contributions: Math.floor(Math.random() * 50) + 10
    };

    localStorage.setItem('sarvSankalpUser', JSON.stringify(user));
    onLogin(user);
    onClose();
  };

  const sdgInterests = [
    "Zero Hunger", "Good Health", "Quality Education", "Gender Equality", 
    "Clean Water", "Decent Work", "Responsible Consumption", "Climate Action", 
    "Life on Land", "Peace & Justice"
  ];

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">
              {isLogin ? "Welcome Back to SarvSankalp" : "Join SarvSankalp"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to continue contributing to UN SDGs" 
                : "Create your account to start contributing to UN Sustainable Development Goals"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Additional Information for Signup */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (City, State)</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Delhi, India"
                    />
                  </div>
                </div>

                {/* User Type Selection */}
                <div>
                  <Label className="text-base font-semibold">User Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {userTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setFormData({...formData, userType: type.id})}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            formData.userType === type.id 
                              ? "border-blue-500 bg-blue-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-blue-500" />
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-gray-600">{type.description}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Organization field for NGO/Business */}
                {(formData.userType === "ngo" || formData.userType === "business") && (
                  <div>
                    <Label htmlFor="organization">
                      {formData.userType === "ngo" ? "NGO Name" : "Company Name"}
                    </Label>
                    <Input
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder={formData.userType === "ngo" ? "Enter NGO name" : "Enter company name"}
                    />
                  </div>
                )}

                {/* SDG Interests */}
                <div>
                  <Label className="text-base font-semibold">SDG Interests (Select what you care about)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                    {sdgInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-2 text-sm border rounded-lg transition-colors ${
                          formData.interests.includes(interest)
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.interests.length} SDGs
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="space-y-4">
              <Button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.email || !formData.password}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
              
              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
              
              <div className="text-center">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Continue as Guest
                </button>
              </div>
            </div>

            {/* Demo Credentials */}
            {isLogin && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Demo Credentials:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Email: demo@sarvsankalp.org</div>
                  <div>Password: demo123</div>
                  <div className="mt-2 text-blue-600">
                    Or create a new account to get started!
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
