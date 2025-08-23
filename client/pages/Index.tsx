import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Droplets, 
  Utensils, 
  GraduationCap, 
  Shield, 
  Briefcase, 
  ScanLine, 
  Leaf, 
  Sprout, 
  Scale,
  Phone,
  MapPin,
  Star,
  Users
} from "lucide-react";

const services = [
  {
    id: "sehat-sathi",
    title: "Sehat Sathi",
    description: "Comprehensive health monitoring and detailed medical reports for rural and urban communities",
    icon: Heart,
    color: "bg-red-500",
    link: "/sehat-sathi",
    features: ["Detailed Health Reports", "Medical History", "Preventive Care", "Emergency Services"]
  },
  {
    id: "jal-rakshak",
    title: "Jal Rakshak",
    description: "Water quality monitoring with real-time data, community maps, and authority connectivity",
    icon: Droplets,
    color: "bg-blue-500",
    link: "/jal-rakshak",
    features: ["Water Quality Testing", "Community Maps", "Real Sources", "Authority Contact"]
  },
  {
    id: "annapurna-connect",
    title: "Annapurna Connect",
    description: "Food distribution network connecting real people and locations with emergency support",
    icon: Utensils,
    color: "bg-orange-500",
    link: "/annapurna-connect",
    features: ["Food Distribution", "Real Locations", "Community Support", "Emergency Relief"]
  },
  {
    id: "pathshala",
    title: "Pathshala",
    description: "Educational platform with 500+ lessons, handouts, quizzes, and comprehensive learning materials",
    icon: GraduationCap,
    color: "bg-purple-500",
    link: "/pathshala",
    features: ["500+ Lessons", "Interactive Quizzes", "Study Materials", "Progress Tracking"]
  },
  {
    id: "sakhi",
    title: "Sakhi",
    description: "Women safety platform with emergency panic button (112) and real emergency contacts",
    icon: Shield,
    color: "bg-pink-500",
    link: "/sakhi",
    features: ["Panic Button (112)", "Emergency Contacts", "Safety Network", "Real-time Help"]
  },
  {
    id: "skillhood-lite",
    title: "Skillhood Lite",
    description: "Job platform with LinkedIn integration and AI-powered skill building for 500+ skills",
    icon: Briefcase,
    color: "bg-green-500",
    link: "/skillhood-lite",
    features: ["LinkedIn Jobs", "AI Skill Builder", "500+ Skills", "Career Growth"]
  },
  {
    id: "saksin-group",
    title: "Saksin Group",
    description: "Product verification scanner with detailed reports and real location mapping",
    icon: ScanLine,
    color: "bg-indigo-500",
    link: "/saksin-group",
    features: ["Product Scanner", "Detailed Reports", "Location Mapping", "Verification System"]
  },
  {
    id: "carbon-kart",
    title: "CarbonKart",
    description: "Environmental services platform with carbon tracking and donation capabilities",
    icon: Leaf,
    color: "bg-emerald-500",
    link: "/carbon-kart",
    features: ["Carbon Tracking", "Donation Platform", "Environmental Impact", "Green Initiatives"]
  },
  {
    id: "mitti-mitra",
    title: "Mitti Mitra",
    description: "Agricultural assistance with real-time weather data and location-based farming tips",
    icon: Sprout,
    color: "bg-yellow-500",
    link: "/mitti-mitra",
    features: ["Weather Data", "Farming Tips", "Crop Guidance", "Location-based Advice"]
  },
  {
    id: "nyaya-dost",
    title: "Nyaya Dost",
    description: "Legal assistance and justice support system for citizens with expert guidance",
    icon: Scale,
    color: "bg-amber-500",
    link: "/nyaya-dost",
    features: ["Legal Guidance", "Justice Support", "Expert Advice", "Court Assistance"]
  }
];

const stats = [
  { label: "Active Users", value: "2.5M+", icon: Users },
  { label: "Cities Covered", value: "500+", icon: MapPin },
  { label: "Services", value: "10", icon: Star },
  { label: "Support 24/7", value: "112", icon: Phone }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  Bharat Seva
                </h1>
                <p className="text-sm text-gray-600">नागरिक सेवा मंच</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700">
              Emergency: 112
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your Complete
            <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"> Civic Services </span>
            Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive digital solutions for health, education, safety, environment, and more. 
            Connecting citizens with real services and authorities across India.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Available Services</h3>
          <p className="text-lg text-gray-600">Choose from our comprehensive range of civic services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-lg ${service.color} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link to={service.link}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg transition-all duration-300">
                      Access Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Bharat Seva</h4>
              <p className="text-gray-400">Empowering citizens through digital civic services</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Police: 100</li>
                <li>Emergency: 112</li>
                <li>Women Helpline: 1091</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <p className="text-gray-400">24/7 Available</p>
              <p className="text-gray-400">help@bharatseva.gov.in</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bharat Seva. Government of India Initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
