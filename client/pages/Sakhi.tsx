import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { 
  Shield, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  AlertTriangle,
  Users,
  Heart,
  Bell,
  Camera,
  MessageCircle,
  Clock,
  CheckCircle,
  Navigation,
  Mic
} from "lucide-react";

const emergencyContacts = [
  { name: "National Emergency", number: "112", type: "primary", description: "All emergencies" },
  { name: "Women Helpline", number: "1091", type: "women", description: "24x7 women support" },
  { name: "Police", number: "100", type: "police", description: "Crime & emergency" },
  { name: "Medical Emergency", number: "102", type: "medical", description: "Ambulance service" },
  { name: "Fire Service", number: "101", type: "fire", description: "Fire emergency" },
  { name: "Child Helpline", number: "1098", type: "child", description: "Child protection" }
];

const safetyNetwork = [
  {
    id: 1,
    name: "Priya Sharma",
    relation: "Sister",
    phone: "+91 98765 43210",
    location: "Delhi",
    status: "online",
    lastSeen: "Active now"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    relation: "Father",
    phone: "+91 98765 43211",
    location: "Delhi",
    status: "online",
    lastSeen: "5 min ago"
  },
  {
    id: 3,
    name: "Meera Patel",
    relation: "Friend",
    phone: "+91 98765 43212",
    location: "Mumbai",
    status: "offline",
    lastSeen: "2 hours ago"
  }
];

const safetyTips = [
  "Always share your live location with trusted contacts",
  "Keep emergency numbers readily accessible",
  "Trust your instincts - if something feels wrong, seek help",
  "Use well-lit and populated routes when traveling",
  "Inform someone about your whereabouts and expected return time"
];

export default function Sakhi() {
  const [panicMode, setPanicMode] = useState(false);
  const [reportIssue, setReportIssue] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location access denied:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && panicMode) {
      handleEmergencyCall();
    }
    return () => clearTimeout(timer);
  }, [countdown, panicMode]);

  const handlePanicButton = () => {
    setPanicMode(true);
    setCountdown(5); // 5-second countdown
    
    // Send emergency alerts to safety network
    safetyNetwork.forEach(contact => {
      if (contact.status === "online") {
        // In a real app, this would send actual SMS/calls
        console.log(`Emergency alert sent to ${contact.name} at ${contact.phone}`);
      }
    });
    
    // Send location to authorities
    if (location) {
      console.log(`Emergency location: ${location.lat}, ${location.lng}`);
    }
  };

  const handleEmergencyCall = () => {
    // Call 112 (India's emergency number)
    window.open("tel:112", "_self");
    setPanicMode(false);
    setCountdown(0);
  };

  const cancelPanic = () => {
    setPanicMode(false);
    setCountdown(0);
  };

  const makeEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self");
  };

  const handleReportIssue = () => {
    // Contact women's safety department
    const message = `Women Safety Issue Report:
Location: ${location ? `${location.lat}, ${location.lng}` : 'Location access denied'}
Issue Type: Safety/Harassment/Violence
Contact: womensafety@gov.in
Phone: 1091 (Women Helpline)
National Commission for Women: ncw@nic.in`;
    
    alert(message);
    setReportIssue(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-pink-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-pink-600">Sakhi</h1>
                  <p className="text-sm text-gray-600">Women Safety Platform</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setReportIssue(true)}
                variant="outline"
              >
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Panic Button Section */}
        <div className="mb-8">
          <Card className={`border-2 ${panicMode ? 'border-red-500 bg-red-50' : 'border-pink-200'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-pink-600">Emergency Panic Button</CardTitle>
              <CardDescription>
                {panicMode 
                  ? `Calling emergency services in ${countdown} seconds...` 
                  : "Press and hold for emergency assistance"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {panicMode ? (
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-red-600 animate-pulse">
                    {countdown}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={handleEmergencyCall}
                      className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg"
                    >
                      Call Now
                    </Button>
                    <Button 
                      onClick={cancelPanic}
                      variant="outline"
                      className="px-8 py-3 text-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Emergency alerts sent to your safety network
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={handlePanicButton}
                  className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="h-8 w-8 mb-2" />
                    PANIC
                  </div>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-pink-500" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Quick access to emergency services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={contact.type === "primary" ? "default" : "secondary"}>
                        {contact.number}
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => makeEmergencyCall(contact.number)}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Network */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-pink-500" />
                Safety Network
              </CardTitle>
              <CardDescription>Your trusted emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {safetyNetwork.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.relation} • {contact.location}</p>
                        <p className="text-xs text-gray-500">{contact.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => makeEmergencyCall(contact.phone.replace(/\s/g, ""))}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Safety Network
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safety Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-pink-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-pink-600">
                <Navigation className="h-5 w-5 mr-2" />
                Live Location Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Share your real-time location with trusted contacts</p>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-purple-600">
                <Camera className="h-5 w-5 mr-2" />
                Evidence Capture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Quickly capture photos/videos as evidence</p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                <Camera className="h-4 w-4 mr-2" />
                Quick Capture
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-blue-600">
                <Mic className="h-5 w-5 mr-2" />
                Voice SOS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Voice-activated emergency assistance</p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Mic className="h-4 w-4 mr-2" />
                Activate Voice SOS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safety Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-500" />
              Safety Tips
            </CardTitle>
            <CardDescription>Stay safe with these important guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Issue Modal */}
      {reportIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Safety Issue</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Input placeholder="Harassment, violence, stalking, etc." />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input placeholder="Where did this occur?" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the incident in detail..." />
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm text-pink-800">
                  <strong>Authority Contact:</strong><br />
                  Women Safety Department: womensafety@gov.in<br />
                  Helpline: 1091<br />
                  National Commission for Women: ncw@nic.in
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setReportIssue(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportIssue} className="bg-pink-500 hover:bg-pink-600">
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
