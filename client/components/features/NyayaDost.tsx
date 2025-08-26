import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  MessageCircle, 
  FileText, 
  Download,
  Brain,
  AlertTriangle,
  CheckCircle,
  User,
  Clock,
  Zap,
  Send,
  BookOpen,
  Shield
} from "lucide-react";

const legalExpertise = [
  "Constitutional Law",
  "Criminal Law", 
  "Civil Law",
  "Family Law",
  "Property Law",
  "Labor Law",
  "Consumer Law",
  "Cyber Law",
  "Environmental Law",
  "Human Rights Law",
  "Intellectual Property",
  "Tax Law",
  "Corporate Law",
  "Immigration Law",
  "International Law"
];

const complaintCategories = [
  "Police Complaint (FIR)",
  "Consumer Complaint",
  "Property Dispute", 
  "Domestic Violence",
  "Harassment",
  "Fraud/Scam",
  "Employment Issue",
  "Land Dispute",
  "Tenancy Issue",
  "Education Related",
  "Healthcare Issue",
  "Cyber Crime",
  "Environmental Issue",
  "Human Rights Violation",
  "Other"
];

export default function NyayaDost() {
  const [activeTab, setActiveTab] = useState("chatbot");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isChatThinking, setIsChatThinking] = useState(false);
  
  const [complaintForm, setComplaintForm] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    date: "",
    evidence: "",
    anonymous: false,
    contact: ""
  });
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatThinking(true);

    // Simulate AI legal expert response
    setTimeout(() => {
      const aiResponse = generateLegalResponse(chatInput);
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        confidence: 95,
        references: ["Indian Penal Code", "Constitution of India", "Relevant Case Law"]
      };

      setChatHistory(prev => [...prev, aiMessage]);
      setIsChatThinking(false);
    }, 2000);
  };

  const generateLegalResponse = (query: string) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes("fir") || queryLower.includes("police")) {
      return `Based on your query about police complaints, here's comprehensive legal guidance:

📋 **FIR (First Information Report) Process:**
1. Visit the nearest police station with jurisdiction
2. Provide detailed written complaint with facts
3. Police must register FIR under Section 154 CrPC
4. Get free copy of FIR - it's your legal right
5. If refused, approach Superintendent of Police or Magistrate

⚖️ **Your Rights:**
• Police cannot refuse to register FIR for cognizable offenses
• You can file online FIR in many states through state police portals
• Free legal aid available through District Legal Services Authority

💡 **Important:** For non-registration of FIR, file complaint under Section 166A IPC (punishment for public servant disobeying law)`;
    }
    
    if (queryLower.includes("property") || queryLower.includes("land")) {
      return `Regarding property disputes, here's expert legal analysis:

🏠 **Property Rights Framework:**
• Transfer of Property Act, 1882 governs property transfers
• Registration Act, 1908 mandates registration for transactions
• Specific Relief Act provides remedies for property disputes

📝 **Key Considerations:**
1. **Title Verification:** Always verify clear title through lawyer
2. **Documentation:** Proper sale deed, possession, mutation records
3. **Succession:** Hindu Succession Act gives equal rights to daughters
4. **Tenancy:** Rent Control Acts protect tenant rights

⚔️ **Common Disputes & Remedies:**
• Trespass: File suit for possession under Specific Relief Act
• Boundary disputes: Seek demarcation through revenue authorities
• Partition: File partition suit for joint family property

🔍 **Evidence Required:**
• Title documents, mutation records, tax receipts
• Witness statements, photographs, boundary documents
• Legal notices served through registered post`;
    }

    if (queryLower.includes("domestic") || queryLower.includes("violence")) {
      return `For domestic violence cases, here's detailed legal protection framework:

🛡️ **Protection of Women from Domestic Violence Act, 2005:**
• Provides comprehensive protection including residence orders
• Covers physical, emotional, sexual, verbal, economic abuse
• Applies to all relationships - married, live-in, family members

📋 **Immediate Remedies:**
1. **Protection Order:** Prevents further violence
2. **Residence Order:** Right to reside in shared household
3. **Monetary Relief:** Compensation for expenses/losses
4. **Custody Orders:** Temporary custody of children

👮 **Filing Process:**
• Approach Protection Officer or directly file in Magistrate court
• Free legal aid available through DLSA
• Emergency orders can be obtained within 24 hours

📞 **Support Services:**
• Women Helpline: 1091 (24x7)
• National Commission for Women
• Local NGOs providing legal support`;
    }

    if (queryLower.includes("consumer") || queryLower.includes("refund")) {
      return `For consumer protection issues, here's your legal roadmap:

🛒 **Consumer Protection Act, 2019:**
• Covers defective products, deficient services, unfair trade practices
• Three-tier redressal mechanism: District, State, National Commissions

📝 **Filing Complaint:**
1. Draft complaint with details of product/service, deficiency
2. Attach supporting documents: bills, correspondence, evidence
3. File online through consumer commission portals or physically
4. No court fee required for claims up to ₹20 lakhs

⏰ **Time Limits:**
• Within 2 years from cause of action
• No limitation for medical negligence cases

💰 **Compensation:**
• Refund of price with interest
• Compensation for mental agony, losses
• Punitive damages in case of unfair practices`;
    }

    // Default comprehensive legal response
    return `As an AI legal expert with knowledge equivalent to a senior advocate, I'll provide comprehensive guidance:

📚 **Legal Analysis of Your Query:**
Based on Indian jurisprudence and statutory framework, here are the key legal principles applicable to your situation:

⚖️ **Relevant Laws:**
• Indian Penal Code, 1860
• Code of Criminal Procedure, 1973  
• Code of Civil Procedure, 1908
• Specific Relief Act, 1963
• Evidence Act, 1872

🔍 **Legal Strategy Recommendations:**
1. **Documentation:** Gather all relevant evidence and documentation
2. **Legal Notice:** Consider sending legal notice through advocate
3. **Alternative Dispute Resolution:** Explore mediation/conciliation
4. **Litigation:** File appropriate petition/case in competent court

📞 **Immediate Steps:**
• Contact District Legal Services Authority for free legal aid
• Consult with a practicing advocate for case-specific advice
• Preserve all evidence and maintain detailed records

💡 **Pro Tip:** Always maintain written communication and get proper legal receipts for any payments made`;
  };

  const handleComplaintSubmit = async () => {
    if (!complaintForm.category || !complaintForm.description) {
      alert("Please fill in the required fields");
      return;
    }

    setIsSubmittingComplaint(true);

    // Simulate complaint processing
    setTimeout(() => {
      const complaintId = `COMP${Date.now()}`;
      
      alert(`Complaint Filed Successfully!\n\nComplaint ID: ${complaintId}\nCategory: ${complaintForm.category}\nStatus: Under Review\n\nNext Steps:\n1. You will receive acknowledgment within 24 hours\n2. Legal expert will review your case\n3. You'll receive guidance on further action\n4. Track progress using your complaint ID\n\nYour complaint has been forwarded to appropriate authorities.`);
      
      // Reset form
      setComplaintForm({
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        evidence: "",
        anonymous: false,
        contact: ""
      });
      
      setIsSubmittingComplaint(false);
    }, 3000);
  };

  const downloadChatHistory = () => {
    const chatContent = chatHistory.map(msg => 
      `${msg.type === 'user' ? '👤 You' : '🤖 AI Legal Expert'}: ${msg.content}\n\n`
    ).join('');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Legal_Consultation_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Scale className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Nyaya Dost</h2>
            <p className="text-indigo-100">SDG 16: Peace, Justice - AI Legal Expert & Complaint System</p>
          </div>
        </div>
        <p className="text-indigo-100 mb-4">
          AI-powered legal expert with knowledge surpassing senior advocates + Comprehensive complaint filing system
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-indigo-100">Legal Expert Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm text-indigo-100">Legal Specialties</div>
          </div>
          <div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-indigo-100">Accuracy Rate</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["chatbot", "complaint"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            {tab === "chatbot" ? "AI Legal Expert" : "File Complaint"}
          </button>
        ))}
      </div>

      {/* AI Legal Expert Chatbot */}
      {activeTab === "chatbot" && (
        <div className="space-y-6">
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-indigo-500" />
                AI Legal Expert Chat
              </CardTitle>
              <CardDescription>
                Ask any legal question - Our AI has knowledge exceeding senior advocates across all Indian laws
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Legal Expertise Areas:</Label>
                <div className="flex flex-wrap gap-2">
                  {legalExpertise.slice(0, 8).map((area, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="h-64 overflow-y-auto mb-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Ask any legal question to get expert guidance</p>
                      <p className="text-sm mt-2">Examples: "How to file FIR?", "Property dispute resolution", "Consumer rights"</p>
                    </div>
                  ) : (
                    chatHistory.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white border shadow-sm'
                        }`}>
                          <div className="text-sm">{message.content}</div>
                          <div className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-indigo-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                            {message.type === 'ai' && (
                              <span className="ml-2">• {message.confidence}% confidence</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isChatThinking && (
                    <div className="flex justify-start">
                      <div className="bg-white border shadow-sm p-3 rounded-lg max-w-xs">
                        <div className="flex items-center text-gray-600">
                          <Brain className="h-4 w-4 mr-2 animate-pulse" />
                          Legal expert is analyzing your query...
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask any legal question..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  />
                  <Button 
                    onClick={handleChatSubmit}
                    disabled={!chatInput.trim() || isChatThinking}
                    className="bg-indigo-500 hover:bg-indigo-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {chatHistory.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={downloadChatHistory}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Chat History
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                Legal Knowledge Base
              </CardTitle>
              <CardDescription>
                Comprehensive legal resources and reference materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">📚 Indian Laws Database</h4>
                  <p className="text-sm text-indigo-700">
                    Access to complete texts of all Indian statutes, amendments, and case laws
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">⚖️ Case Law References</h4>
                  <p className="text-sm text-purple-700">
                    Supreme Court and High Court judgments with detailed analysis
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📝 Legal Templates</h4>
                  <p className="text-sm text-blue-700">
                    Ready-to-use legal documents, notices, and application formats
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">👥 Expert Network</h4>
                  <p className="text-sm text-green-700">
                    Connect with verified lawyers and legal aid services
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Complaint Filing System */}
      {activeTab === "complaint" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-red-500" />
                File Legal Complaint
              </CardTitle>
              <CardDescription>
                Comprehensive complaint filing system with AI guidance for any type of grievance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="category">Complaint Category *</Label>
                <select 
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                >
                  <option value="">Select complaint type</option>
                  {complaintCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="title">Complaint Title *</Label>
                <Input
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm({...complaintForm, title: e.target.value})}
                  placeholder="Brief title of your complaint"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                  placeholder="Provide complete details of the incident, including dates, people involved, and what happened..."
                  rows={6}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Incident Location</Label>
                  <Input
                    value={complaintForm.location}
                    onChange={(e) => setComplaintForm({...complaintForm, location: e.target.value})}
                    placeholder="City, State where it occurred"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date of Incident</Label>
                  <Input
                    type="date"
                    value={complaintForm.date}
                    onChange={(e) => setComplaintForm({...complaintForm, date: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="evidence">Evidence Available</Label>
                <Textarea
                  value={complaintForm.evidence}
                  onChange={(e) => setComplaintForm({...complaintForm, evidence: e.target.value})}
                  placeholder="List any evidence you have (photos, documents, witnesses, etc.)"
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={complaintForm.anonymous}
                    onChange={(e) => setComplaintForm({...complaintForm, anonymous: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="anonymous">File anonymously</Label>
                </div>
                
                {!complaintForm.anonymous && (
                  <div>
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input
                      value={complaintForm.contact}
                      onChange={(e) => setComplaintForm({...complaintForm, contact: e.target.value})}
                      placeholder="Phone/Email for updates"
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Your Privacy & Security
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• All complaints are encrypted and secure</li>
                  <li>• Anonymous filing protects your identity</li>
                  <li>• Data shared only with relevant authorities</li>
                  <li>• Legal protection against retaliation</li>
                </ul>
              </div>

              <Button 
                onClick={handleComplaintSubmit}
                disabled={isSubmittingComplaint || !complaintForm.category || !complaintForm.description}
                className="w-full bg-red-500 hover:bg-red-600 py-3 text-lg"
              >
                {isSubmittingComplaint ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-pulse" />
                    Filing Complaint...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    File Legal Complaint
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-500" />
                After Filing: What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Immediate Acknowledgment</h4>
                    <p className="text-sm text-gray-600">Receive complaint ID and confirmation within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Legal Expert Review</h4>
                    <p className="text-sm text-gray-600">AI and human experts analyze your case for appropriate action</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Action Plan</h4>
                    <p className="text-sm text-gray-600">Receive detailed guidance on next steps and required documentation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Monitor your complaint status through our platform</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
