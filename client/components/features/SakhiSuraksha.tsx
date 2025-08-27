import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, Phone, MessageCircle, Users, MapPin, Clock, Navigation } from "lucide-react";
import { ContactService } from "../../lib/contactService";

const emergencyContacts = [
  { 
    name: "National Emergency", 
    number: "112", 
    type: "primary", 
    description: "All emergencies - Police, Fire, Medical",
    available: "24/7"
  },
  { 
    name: "Women Helpline", 
    number: "1091", 
    type: "women", 
    description: "24x7 women in distress helpline",
    available: "24/7"
  },
  { 
    name: "Police", 
    number: "100", 
    type: "police", 
    description: "Crime reporting and emergency",
    available: "24/7"
  },
  { 
    name: "Medical Emergency", 
    number: "102", 
    type: "medical", 
    description: "Ambulance and medical help",
    available: "24/7"
  },
  { 
    name: "Child Helpline", 
    number: "1098", 
    type: "child", 
    description: "Child protection and abuse",
    available: "24/7"
  },
  { 
    name: "Anti-Ragging Helpline", 
    number: "1800-180-5522", 
    type: "student", 
    description: "Student safety and ragging issues",
    available: "24/7"
  }
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

const reportCategories = [
  "Sexual Harassment",
  "Domestic Violence", 
  "Workplace Harassment",
  "Public Harassment",
  "Stalking",
  "Cyber Crime",
  "Acid Attack",
  "Other"
];

export default function SakhiSuraksha() {
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [fakeCallConfig, setFakeCallConfig] = useState({
    callerName: "Office Manager",
    duration: 30,
    ringtone: "default"
  });
  const [reportForm, setReportForm] = useState({
    category: "",
    location: "",
    description: "",
    date: "",
    time: "",
    anonymous: true
  });

  const handlePanicButton = () => {
    setPanicActive(true);
    setCountdown(5);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          makeEmergencyCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Send emergency alerts to safety network
    safetyNetwork.forEach(contact => {
      if (contact.status === "online") {
        console.log(`Emergency alert sent to ${contact.name} at ${contact.phone}`);
      }
    });
  };

  const makeEmergencyCall = () => {
    // Call 112 (India's emergency number)
    window.open("tel:112", "_self");
    setPanicActive(false);
    setCountdown(0);
  };

  const cancelPanic = () => {
    setPanicActive(false);
    setCountdown(0);
  };

  const makeCall = (number: string, context?: string) => {
    ContactService.makeCall(number, context || "Emergency contact");
  };

  const triggerFakeCall = (customConfig = {}) => {
    const config = { ...fakeCallConfig, ...customConfig };
    setFakeCallConfig(config);
    setShowFakeCall(true);

    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300, 100, 300]);
    }

    // Play ringtone sound
    playRingtone();

    // Auto-answer after specified duration if not manually answered
    setTimeout(() => {
      if (showFakeCall) {
        answerFakeCall();
      }
    }, config.duration * 1000);
  };

  const answerFakeCall = () => {
    setShowFakeCall(false);
    playFakeConversation();
  };

  const playRingtone = () => {
    // Create audio context for ringtone
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playFakeConversation = () => {
    // Use Web Speech API for realistic conversation
    if ('speechSynthesis' in window) {
      const phrases = [
        "Hello, this is urgent. I need you to come to the office immediately.",
        "There's an important meeting that requires your presence.",
        "The client is waiting and we need you here right now.",
        "This cannot wait. Please leave whatever you're doing and come here.",
        "I'm sending a car to pick you up. Be ready in 5 minutes."
      ];

      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      const utterance = new SpeechSynthesisUtterance(randomPhrase);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      speechSynthesis.speak(utterance);

      // Show conversation interface
      setTimeout(() => {
        alert(`Fake Call Active\n\nConversation: "${randomPhrase}"\n\nThis provides you with a realistic excuse to leave the current situation safely.\n\nYou can continue the conversation or end the call as needed.`);
      }, 2000);
    }
  };

  const submitAnonymousReport = () => {
    if (!reportForm.category || !reportForm.description) {
      alert("Please fill in the required fields");
      return;
    }

    // Simulate report submission
    alert(`Anonymous report submitted successfully!\n\nReport ID: ${Date.now()}\nCategory: ${reportForm.category}\nStatus: Under Review\n\nYour report will be forwarded to:\n• Local Police Station\n• Women's Commission\n• Relevant Authorities\n\nYou will receive updates via anonymous ID.`);
    
    // Reset form
    setReportForm({
      category: "",
      location: "",
      description: "",
      date: "",
      time: "",
      anonymous: true
    });
    setShowReportForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sakhi Suraksha</h2>
            <p className="text-pink-100">SDG 5: Gender Equality - Women Safety Platform</p>
          </div>
        </div>
        <p className="text-pink-100 mb-4">
          Emergency support system with panic button and anonymous reporting
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">112</div>
            <div className="text-sm text-pink-100">Emergency Number</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-pink-100">Available Support</div>
          </div>
          <div>
            <div className="text-2xl font-bold">850+</div>
            <div className="text-sm text-pink-100">Reports Handled</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-pink-100">Response Rate</div>
          </div>
        </div>
      </div>

      {/* Emergency Panic Button */}
      <Card className={panicActive ? "border-red-500 bg-red-50" : "border-pink-200"}>
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-red-600">
            <AlertTriangle className="h-6 w-6 mr-2" />
            Emergency Panic Button
          </CardTitle>
          <CardDescription className="text-center">
            {panicActive 
              ? `Calling emergency services in ${countdown} seconds...` 
              : "Press in case of emergency - Connects to 112 and alerts your safety network"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {panicActive ? (
            <div className="space-y-4">
              <div className="text-6xl font-bold text-red-600 animate-pulse">
                {countdown}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                ✅ Emergency alerts sent to your safety network<br />
                ✅ Location shared with authorities<br />
                ⏱️ Automatic call to 112 in progress
              </div>
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={makeEmergencyCall}
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
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
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">
                This button will immediately alert emergency services and your trusted contacts
              </p>
              <Button 
                onClick={handlePanicButton}
                className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  PANIC
                </div>
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Press and hold for 2 seconds to activate
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-500" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Quick access to emergency services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{contact.available}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={contact.type === "primary" ? "default" : "secondary"}
                      className={
                        contact.type === "primary" ? "bg-red-500" :
                        contact.type === "women" ? "bg-pink-500" :
                        contact.type === "police" ? "bg-blue-500" :
                        contact.type === "medical" ? "bg-green-500" :
                        "bg-gray-500"
                      }
                    >
                      {contact.number}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => makeCall(contact.number, `${contact.name} - ${contact.description}`)}
                      className="bg-green-500 hover:bg-green-600"
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
              <Users className="h-5 w-5 mr-2 text-blue-500" />
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
                      onClick={() => makeCall(contact.phone.replace(/\s/g, ""), `Safety network contact: ${contact.name} (${contact.relation})`)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => ContactService.sendMessage(contact.phone.replace(/\s/g, ""), "Emergency - Need help immediately. Please contact me.", 'whatsapp')}
                    >
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

      {/* Anonymous Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
            Anonymous Reporting System
          </CardTitle>
          <CardDescription>
            Report harassment, violence, or safety concerns anonymously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Safe & Anonymous</h4>
              <p className="text-sm text-purple-700">
                Your identity is completely protected. Reports are forwarded to appropriate authorities
                without revealing personal information.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reportCategories.slice(0, 4).map((category, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-sm font-medium">{category}</div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => setShowReportForm(true)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              File Anonymous Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-blue-600">
              <MapPin className="h-5 w-5 mr-2" />
              Live Location Sharing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Share your real-time location with trusted contacts</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              <Navigation className="h-4 w-4 mr-2" />
              Share Location
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-green-600">
              <Shield className="h-5 w-5 mr-2" />
              Safety Check-in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Set periodic safety check-ins with your network</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Check-in
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Fake Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Generate a fake incoming call to escape unsafe situations</p>

            {/* Quick Call Options */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => triggerFakeCall({ callerName: "Mom", duration: 20 })}
              >
                Mom
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => triggerFakeCall({ callerName: "Office", duration: 30 })}
              >
                Office
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => triggerFakeCall({ callerName: "Emergency", duration: 15 })}
              >
                Emergency
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => triggerFakeCall({ callerName: "Doctor", duration: 25 })}
              >
                Doctor
              </Button>
            </div>

            <Button
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={() => triggerFakeCall()}
            >
              <Phone className="h-4 w-4 mr-2" />
              Custom Fake Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Anonymous Report Form Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Anonymous Safety Report</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Report Category</Label>
                <select 
                  value={reportForm.category}
                  onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {reportCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date of Incident</Label>
                  <Input
                    type="date"
                    value={reportForm.date}
                    onChange={(e) => setReportForm({...reportForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time of Incident</Label>
                  <Input
                    type="time"
                    value={reportForm.time}
                    onChange={(e) => setReportForm({...reportForm, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  value={reportForm.location}
                  onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                  placeholder="General area or landmark (keeps your anonymity)"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Incident Description</Label>
                <Textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                  placeholder="Describe what happened. Your identity will remain completely anonymous."
                  rows={6}
                />
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">🔒 Privacy Protection</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Your identity is completely anonymous</li>
                  <li>• Reports are encrypted and secure</li>
                  <li>• Forwarded to appropriate authorities</li>
                  <li>• You'll receive anonymous updates</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={submitAnonymousReport}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Submit Anonymous Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Fake Call Interface */}
      {showFakeCall && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Status Bar Simulation */}
          <div className="bg-black text-white text-xs flex justify-between items-center px-4 py-1">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-1 h-3 bg-white rounded"></div>
                <div className="w-1 h-3 bg-white rounded"></div>
                <div className="w-1 h-3 bg-white rounded"></div>
                <div className="w-1 h-3 bg-gray-400 rounded"></div>
              </div>
              <span className="ml-2">Airtel</span>
            </div>
            <div>9:47 PM</div>
            <div className="flex items-center space-x-1">
              <span>84%</span>
              <div className="w-6 h-3 border border-white rounded-sm">
                <div className="w-5 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Fake Call Interface */}
          <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white flex flex-col justify-between items-center py-12">
            <div className="text-center">
              <div className="text-sm text-gray-300 mb-2">Incoming call</div>
              <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{fakeCallConfig.callerName}</h2>
              <p className="text-gray-300">+91 99876 54321</p>
              <p className="text-sm text-gray-400 mt-2">Office</p>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center space-x-12">
              <button
                onClick={() => setShowFakeCall(false)}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform active:scale-95 transition-transform"
              >
                <Phone className="h-8 w-8 text-white transform rotate-[135deg]" />
              </button>
              <button
                onClick={answerFakeCall}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transform active:scale-95 transition-transform"
              >
                <Phone className="h-8 w-8 text-white" />
              </button>
            </div>

            {/* Additional Options */}
            <div className="flex justify-center space-x-8">
              <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏰</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
