import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Utensils, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  CheckCircle,
  AlertCircle,
  Phone
} from "lucide-react";

const foodDonations = [
  {
    id: 1,
    donor: "Hotel Taj Palace",
    type: "Restaurant",
    food: "Vegetarian buffet leftovers",
    quantity: "50 servings",
    location: "Connaught Place, Delhi",
    pickupTime: "9:00 PM - 10:00 PM",
    status: "available",
    postedTime: "2 hours ago",
    contact: "+91 98765 43210"
  },
  {
    id: 2,
    donor: "Wedding Hall Celebration",
    type: "Event",
    food: "Mixed Indian cuisine",
    quantity: "100 servings",
    location: "Karol Bagh, Delhi",
    pickupTime: "11:00 PM - 12:00 AM",
    status: "claimed",
    claimedBy: "Akshaya Patra Foundation",
    postedTime: "4 hours ago",
    contact: "+91 98765 43211"
  },
  {
    id: 3,
    donor: "University Hostel",
    type: "Hostel",
    food: "Rice, dal, vegetables",
    quantity: "30 servings",
    location: "DU North Campus, Delhi",
    pickupTime: "8:30 PM - 9:30 PM",
    status: "completed",
    completedBy: "Robin Hood Army",
    postedTime: "6 hours ago",
    contact: "+91 98765 43212"
  }
];

const ngos = [
  { name: "Akshaya Patra Foundation", contact: "+91 98765 43213", area: "Delhi NCR" },
  { name: "Robin Hood Army", contact: "+91 98765 43214", area: "All India" },
  { name: "Feeding India", contact: "+91 98765 43215", area: "Delhi, Mumbai" }
];

export default function AnnapurnaConnect() {
  const [activeTab, setActiveTab] = useState("browse");
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [userType, setUserType] = useState("donor"); // donor, ngo

  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorType: "restaurant",
    foodDescription: "",
    quantity: "",
    location: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
    contact: "",
    specialInstructions: ""
  });

  const handleSubmitDonation = () => {
    // In a real app, this would save to database
    alert(`Food donation posted successfully!\n\nDetails:\n${donationForm.foodDescription}\nQuantity: ${donationForm.quantity}\nPickup: ${donationForm.pickupTimeStart} - ${donationForm.pickupTimeEnd}\n\nNGOs will be notified automatically.`);
    setShowDonateForm(false);
    setDonationForm({
      donorName: "",
      donorType: "restaurant",
      foodDescription: "",
      quantity: "",
      location: "",
      pickupTimeStart: "",
      pickupTimeEnd: "",
      contact: "",
      specialInstructions: ""
    });
  };

  const handleClaimDonation = (donationId: number, donorContact: string) => {
    alert(`Donation claimed successfully!\n\nNext Steps:\n1. Contact donor: ${donorContact}\n2. Coordinate pickup time\n3. Confirm completion\n\nDonor will receive notification.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "claimed": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <AlertCircle className="h-4 w-4" />;
      case "claimed": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Utensils className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Annapurna Connect</h2>
            <p className="text-orange-100">SDG 2: Zero Hunger</p>
          </div>
        </div>
        <p className="text-orange-100 mb-4">
          Connect food donors with NGOs to eliminate food waste and feed the hungry
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">2.3K</div>
            <div className="text-sm text-orange-100">Meals Donated</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-orange-100">Active Donors</div>
          </div>
          <div>
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-orange-100">Partner NGOs</div>
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Button
              variant={userType === "donor" ? "default" : "outline"}
              onClick={() => setUserType("donor")}
              className="flex-1"
            >
              I want to donate food
            </Button>
            <Button
              variant={userType === "ngo" ? "default" : "outline"}
              onClick={() => setUserType("ngo")}
              className="flex-1"
            >
              I'm an NGO looking for food
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["browse", "my-donations", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:text-orange-600"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Browse Tab */}
      {activeTab === "browse" && (
        <div className="space-y-6">
          {userType === "donor" && (
            <Card>
              <CardContent className="p-6 text-center">
                <Utensils className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Share Your Surplus Food</h3>
                <p className="text-gray-600 mb-4">
                  Help reduce food waste by donating surplus food to those in need
                </p>
                <Button 
                  onClick={() => setShowDonateForm(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Food Donation
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Available Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Available Food Donations
                <Badge variant="secondary">{foodDonations.filter(d => d.status === "available").length} available</Badge>
              </CardTitle>
              <CardDescription>
                Real-time listings from restaurants, events, and households
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodDonations.map((donation) => (
                  <div key={donation.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{donation.donor}</h4>
                          <Badge variant="outline">{donation.type}</Badge>
                          <Badge className={getStatusColor(donation.status)}>
                            {getStatusIcon(donation.status)}
                            <span className="ml-1 capitalize">{donation.status}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-1">{donation.food}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {donation.quantity}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {donation.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {donation.pickupTime}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Posted {donation.postedTime}</p>
                        
                        {donation.status === "claimed" && (
                          <p className="text-sm text-yellow-700 mt-2">
                            Claimed by: {donation.claimedBy}
                          </p>
                        )}
                        
                        {donation.status === "completed" && (
                          <p className="text-sm text-blue-700 mt-2">
                            Completed by: {donation.completedBy}
                          </p>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        {donation.status === "available" && userType === "ngo" && (
                          <div className="space-y-2">
                            <Button 
                              size="sm"
                              onClick={() => handleClaimDonation(donation.id, donation.contact)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Claim Donation
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`tel:${donation.contact}`, '_self')}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Partner NGOs */}
          {userType === "donor" && (
            <Card>
              <CardHeader>
                <CardTitle>Partner NGOs</CardTitle>
                <CardDescription>Organizations ready to collect food donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ngos.map((ngo, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{ngo.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">Coverage: {ngo.area}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`tel:${ngo.contact}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Donation Form Modal */}
      {showDonateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Post Food Donation</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donorName">Donor Name/Organization</Label>
                  <Input
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm({...donationForm, donorName: e.target.value})}
                    placeholder="Restaurant/Event name"
                  />
                </div>
                <div>
                  <Label htmlFor="donorType">Donor Type</Label>
                  <select 
                    value={donationForm.donorType}
                    onChange={(e) => setDonationForm({...donationForm, donorType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="event">Event/Wedding</option>
                    <option value="hostel">Hostel/Canteen</option>
                    <option value="household">Household</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="foodDescription">Food Description</Label>
                <Textarea
                  value={donationForm.foodDescription}
                  onChange={(e) => setDonationForm({...donationForm, foodDescription: e.target.value})}
                  placeholder="Describe the food items (e.g., Vegetarian curry, rice, rotis)"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity (servings)</Label>
                  <Input
                    value={donationForm.quantity}
                    onChange={(e) => setDonationForm({...donationForm, quantity: e.target.value})}
                    placeholder="e.g., 50 servings"
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    value={donationForm.contact}
                    onChange={(e) => setDonationForm({...donationForm, contact: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  value={donationForm.location}
                  onChange={(e) => setDonationForm({...donationForm, location: e.target.value})}
                  placeholder="Full address with landmark"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickupTimeStart">Pickup Time (Start)</Label>
                  <Input
                    type="time"
                    value={donationForm.pickupTimeStart}
                    onChange={(e) => setDonationForm({...donationForm, pickupTimeStart: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="pickupTimeEnd">Pickup Time (End)</Label>
                  <Input
                    type="time"
                    value={donationForm.pickupTimeEnd}
                    onChange={(e) => setDonationForm({...donationForm, pickupTimeEnd: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                <Textarea
                  value={donationForm.specialInstructions}
                  onChange={(e) => setDonationForm({...donationForm, specialInstructions: e.target.value})}
                  placeholder="Any special handling instructions"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowDonateForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitDonation}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Post Donation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholders */}
      {activeTab === "my-donations" && (
        <Card>
          <CardHeader>
            <CardTitle>My Donations</CardTitle>
            <CardDescription>Track your food donation history</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Your donation history and impact tracking will appear here.</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Impact Analytics</CardTitle>
            <CardDescription>Your contribution to Zero Hunger goal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Detailed analytics about meals saved, waste reduced, and people fed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
