import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, AlertTriangle, Phone, MessageCircle, Users, Bot } from "lucide-react";

export default function SakhiSuraksha() {
  const [panicActive, setPanicActive] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Hello! I'm here to help you understand your rights. What would you like to know?" }
  ]);

  const handlePanicButton = () => {
    setPanicActive(true);
    // Simulate emergency alert
    setTimeout(() => {
      alert("Emergency alert sent to:\n• Emergency contacts\n• Nearest police station\n• Women helpline 1091\n\nHelp is on the way!");
      setPanicActive(false);
    }, 3000);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { type: "user", message: chatInput }];
    setChatMessages(newMessages);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I understand your concern. ";
      
      if (chatInput.toLowerCase().includes("harassment") || chatInput.toLowerCase().includes("workplace")) {
        response += "Under the Sexual Harassment of Women at Workplace Act 2013, you have the right to file a complaint with the Internal Complaints Committee (ICC) at your workplace. You can also approach the police or the State Women's Commission.";
      } else if (chatInput.toLowerCase().includes("domestic violence") || chatInput.toLowerCase().includes("abuse")) {
        response += "The Protection of Women from Domestic Violence Act 2005 protects you. You can file a complaint at the nearest police station, approach a Protection Officer, or contact the National Commission for Women helpline at 7827170170.";
      } else if (chatInput.toLowerCase().includes("property") || chatInput.toLowerCase().includes("inheritance")) {
        response += "Women have equal inheritance rights under the Hindu Succession Act 2005. You have the right to ancestral and parental property. You can approach a family court for legal remedies.";
      } else {
        response += "Women in India have constitutional rights to equality, liberty, and dignity. You can approach the police, women's helplines, or legal aid services for help. Would you like specific information about any legal issue?";
      }
      
      setChatMessages([...newMessages, { type: "bot", message: response }]);
    }, 1000);
    
    setChatInput("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Sakhi Suraksha</h2>
            <p className="text-pink-100">SDG 5: Gender Equality</p>
          </div>
        </div>
        <p className="text-pink-100">Women safety platform with emergency support and rights awareness</p>
      </div>

      {/* Panic Button */}
      <Card className={panicActive ? "border-red-500 bg-red-50" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-red-600">
            <AlertTriangle className="h-6 w-6 mr-2" />
            Emergency Panic Button
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {panicActive ? (
            <div className="space-y-4">
              <div className="text-red-600 font-bold text-lg animate-pulse">
                EMERGENCY ALERT ACTIVATED
              </div>
              <div className="text-sm text-gray-600">
                Sending alerts to emergency contacts and police...
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Press this button in case of emergency. It will alert your contacts and nearest police station.
              </p>
              <Button 
                onClick={handlePanicButton}
                className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold"
                disabled={panicActive}
              >
                <div className="flex flex-col items-center">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  PANIC
                </div>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Anonymous Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
              Anonymous Reporting
            </CardTitle>
            <CardDescription>Report harassment or violence anonymously</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Describe the incident (your identity will remain anonymous)..." />
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Submit Anonymous Report
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-500" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Quick access to help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => window.open("tel:100")}>
              <Phone className="h-4 w-4 mr-2" />
              Police: 100
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => window.open("tel:1091")}>
              <Phone className="h-4 w-4 mr-2" />
              Women Helpline: 1091
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => window.open("tel:112")}>
              <Phone className="h-4 w-4 mr-2" />
              Emergency: 112
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Rights Chatbot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-purple-500" />
            AI Rights Assistant
          </CardTitle>
          <CardDescription>Get information about women's rights in simple language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.type === "user" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-800"
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your rights..."
                onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
              />
              <Button onClick={sendChatMessage} className="bg-purple-500 hover:bg-purple-600">
                Send
              </Button>
            </div>
            
            <div className="text-xs text-gray-500">
              Ask about: workplace harassment, domestic violence, property rights, legal aid
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
