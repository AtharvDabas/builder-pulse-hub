import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  User, 
  Calendar, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Phone,
  MapPin,
  Thermometer,
  Stethoscope,
  Pill,
  Hospital
} from "lucide-react";

const healthMetrics = [
  { label: "Blood Pressure", value: "120/80", status: "normal", color: "text-green-600" },
  { label: "Heart Rate", value: "72 BPM", status: "normal", color: "text-green-600" },
  { label: "Blood Sugar", value: "95 mg/dL", status: "normal", color: "text-green-600" },
  { label: "Temperature", value: "98.6°F", status: "normal", color: "text-green-600" },
  { label: "BMI", value: "23.5", status: "healthy", color: "text-green-600" },
  { label: "Cholesterol", value: "180 mg/dL", status: "borderline", color: "text-yellow-600" }
];

const recentReports = [
  {
    id: 1,
    type: "Complete Blood Count",
    date: "2024-01-15",
    doctor: "Dr. Priya Sharma",
    hospital: "AIIMS Delhi",
    status: "completed",
    findings: [
      "Hemoglobin: 12.5 g/dL (Normal)",
      "White Blood Cells: 7,200/μL (Normal)",
      "Platelets: 250,000/μL (Normal)",
      "Red Blood Cells: 4.5 million/μL (Normal)"
    ],
    recommendations: [
      "Continue iron-rich diet",
      "Regular exercise recommended",
      "Follow-up in 3 months"
    ]
  },
  {
    id: 2,
    type: "Chest X-Ray",
    date: "2024-01-10",
    doctor: "Dr. Rajesh Kumar",
    hospital: "Max Hospital Saket",
    status: "completed",
    findings: [
      "Lungs: Clear bilateral lung fields",
      "Heart: Normal cardiac silhouette",
      "Bones: No acute fractures",
      "No signs of pneumonia or tuberculosis"
    ],
    recommendations: [
      "Lungs appear healthy",
      "Continue regular check-ups",
      "Avoid smoking and pollution exposure"
    ]
  }
];

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Meera Patel",
    specialty: "Cardiologist",
    date: "2024-01-25",
    time: "10:00 AM",
    hospital: "Fortis Hospital",
    type: "Follow-up"
  },
  {
    id: 2,
    doctor: "Dr. Amit Singh",
    specialty: "General Physician",
    date: "2024-02-05",
    time: "3:30 PM",
    hospital: "Apollo Hospital",
    type: "Routine Check-up"
  }
];

export default function SehatSathi() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [reportIssue, setReportIssue] = useState(false);

  const handleEmergencyCall = () => {
    window.open("tel:102", "_self");
  };

  const handleReportIssue = () => {
    // Contact health department
    const message = `Health Service Issue Report:
Location: Current Location
Issue Type: Service Quality/Access
Contact: healthdept@gov.in
Phone: 1075 (Health Helpline)`;
    
    alert(message);
    setReportIssue(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-red-200">
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
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-red-600">Sehat Sathi</h1>
                  <p className="text-sm text-gray-600">Comprehensive Health Monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleEmergencyCall}
                className="bg-red-600 hover:bg-red-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency (102)
              </Button>
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

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
          {["dashboard", "reports", "appointments", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-red-500" />
                  Current Health Metrics
                </CardTitle>
                <CardDescription>Real-time health monitoring data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <Badge variant={metric.status === "normal" ? "default" : "secondary"}>
                          {metric.status}
                        </Badge>
                      </div>
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-red-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-red-600">
                    <Stethoscope className="h-5 w-5 mr-2" />
                    Book Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Schedule appointment with specialists</p>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-blue-600">
                    <Pill className="h-5 w-5 mr-2" />
                    Medicine Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Track medication schedule and refills</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    View Medicines
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-green-600">
                    <Hospital className="h-5 w-5 mr-2" />
                    Find Hospital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Locate nearby hospitals and clinics</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Find Nearby
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-red-500" />
                  Detailed Medical Reports
                </CardTitle>
                <CardDescription>Comprehensive health analysis and findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-6 bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{report.type}</h3>
                          <p className="text-sm text-gray-600">
                            {report.doctor} • {report.hospital}
                          </p>
                          <p className="text-sm text-gray-500">Date: {report.date}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {report.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
                          <ul className="space-y-1">
                            {report.findings.map((finding, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {report.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button variant="outline" size="sm">
                          Download Full Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Scheduled medical consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-600">{appointment.hospital}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{appointment.type}</Badge>
                          <div className="mt-2 space-x-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600">Join Call</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Medical History</CardTitle>
                <CardDescription>Comprehensive health records and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>Your complete medical history will be displayed here</p>
                    <p className="text-sm">Including past treatments, medications, and health trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Report Issue Modal */}
      {reportIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Health Service Issue</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Input placeholder="Service quality, access problem, etc." />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the issue in detail..." />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Authority Contact:</strong><br />
                  Health Department: healthdept@gov.in<br />
                  Helpline: 1075
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setReportIssue(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportIssue} className="bg-red-500 hover:bg-red-600">
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
