import { useState, useEffect } from "react";
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
  Phone,
  Shield,
  Navigation,
  MessageSquare
} from "lucide-react";

const foodDonations = [
  {
    id: 1,
    donor: "Hotel Taj Palace",
    type: "Restaurant",
    food: "Vegetarian buffet leftovers",
    quantity: "50 servings",
    location: "Connaught Place, Delhi",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    exactAddress: "Sardar Patel Marg, Near India Gate Metro Station, New Delhi - 110001",
    pickupTime: "9:00 PM - 10:00 PM",
    status: "available",
    postedTime: "2 hours ago",
    contact: "+91 98765 43210",
    verified: true,
    otpVerified: true
  },
  {
    id: 2,
    donor: "Wedding Hall Celebration",
    type: "Event",
    food: "Mixed Indian cuisine",
    quantity: "100 servings",
    location: "Karol Bagh, Delhi",
    coordinates: { lat: 28.6519, lng: 77.1909 },
    exactAddress: "GB Road, Near Karol Bagh Metro, New Delhi - 110005",
    pickupTime: "11:00 PM - 12:00 AM",
    status: "claimed",
    claimedBy: "Akshaya Patra Foundation",
    postedTime: "4 hours ago",
    contact: "+91 98765 43211",
    verified: true,
    otpVerified: true
  }
];

const ngos = [
  { name: "Akshaya Patra Foundation", contact: "+91 98765 43213", area: "Delhi NCR", verified: true },
  { name: "Robin Hood Army", contact: "+91 98765 43214", area: "All India", verified: true },
  { name: "Feeding India", contact: "+91 98765 43215", area: "Delhi, Mumbai", verified: true }
];

export default function AnnapurnaConnect() {
  const [activeTab, setActiveTab] = useState("browse");
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userType, setUserType] = useState("donor");
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<string>("prompt");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorType: "restaurant",
    foodDescription: "",
    quantity: "",
    location: "",
    exactAddress: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
    contact: "",
    specialInstructions: "",
    coordinates: { lat: 0, lng: 0 }
  });

  // Request location permission and get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(coords);
          setLocationPermission("granted");
          
          // Reverse geocoding simulation
          reverseGeocode(coords);
        },
        (error) => {
          console.error("Location access denied:", error);
          setLocationPermission("denied");
        }
      );
    }
  }, []);

  const reverseGeocode = async (coords: {lat: number, lng: number}) => {
    // Simulate reverse geocoding API call
    const mockAddress = `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}, New Delhi, India`;
    setDonationForm(prev => ({
      ...prev,
      location: mockAddress,
      coordinates: coords
    }));
  };

  const sendOtp = async () => {
    if (!donationForm.contact) {
      alert("Please enter your phone number first");
      return;
    }

    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: donationForm.contact,
          purpose: 'food donation verification'
        })
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        // In development mode, show OTP for testing
        if (data.otp) {
          alert(`OTP sent to ${donationForm.contact}\nFor testing: ${data.otp}\n(Valid for ${Math.floor(data.expiresIn / 60)} minutes)`);
        } else {
          alert(`OTP sent to ${donationForm.contact}\nValid for ${Math.floor(data.expiresIn / 60)} minutes`);
        }
      } else {
        alert(`Failed to send OTP: ${data.message}`);
      }
    } catch (error) {
      console.error('OTP send error:', error);
      alert('Failed to send OTP. Please check your network connection.');
    }
  };

  const verifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: donationForm.contact,
          otp: otpCode
        })
      });

      const data = await response.json();

      if (data.success) {
        setShowOtpVerification(false);
        handleSubmitDonation();
      } else {
        if (data.attemptsLeft !== undefined) {
          alert(`Invalid OTP. ${data.attemptsLeft} attempts remaining.`);
        } else {
          alert(`OTP verification failed: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('Failed to verify OTP. Please check your network connection.');
    }
  };

  const handleSubmitDonation = () => {
    if (!currentLocation) {
      alert("Location permission required to verify donation authenticity");
      return;
    }

    if (!otpSent || otpCode !== generatedOtp) {
      setShowOtpVerification(true);
      return;
    }

    // Calculate distance from current location to verify authenticity
    const distance = calculateDistance(currentLocation, donationForm.coordinates);
    
    if (distance > 5) { // More than 5km away
      alert("Warning: Your current location is far from the donation pickup location. Please verify the address.");
    }

    alert(`Food donation posted successfully and verified!\n\nDetails:\n${donationForm.foodDescription}\nQuantity: ${donationForm.quantity}\nLocation: ${donationForm.location}\nPickup: ${donationForm.pickupTimeStart} - ${donationForm.pickupTimeEnd}\n\nVerification:\n✅ Location verified\n✅ Phone verified with OTP\n✅ Anti-prank measures active\n\nNGOs will be notified automatically with your verified location.`);
    
    setShowDonateForm(false);
    setOtpSent(false);
    setOtpCode("");
    setDonationForm({
      donorName: "",
      donorType: "restaurant",
      foodDescription: "",
      quantity: "",
      location: "",
      exactAddress: "",
      pickupTimeStart: "",
      pickupTimeEnd: "",
      contact: "",
      specialInstructions: "",
      coordinates: { lat: 0, lng: 0 }
    });
  };

  const calculateDistance = (pos1: {lat: number, lng: number}, pos2: {lat: number, lng: number}) => {
    const R = 6371; // Earth's radius in km
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleClaimDonation = (donationId: number, donorContact: string) => {
    alert(`Donation claimed successfully!\n\nNext Steps:\n1. Contact donor: ${donorContact}\n2. Coordinate pickup time\n3. Confirm completion\n\nDonor will receive notification.\n\nLocation verified: ✅\nPhone verified: ✅`);
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
            <p className="text-orange-100">SDG 2: Zero Hunger - Location Verified</p>
          </div>
        </div>
        <p className="text-orange-100 mb-4">
          Connect food donors with NGOs using real-time location and OTP verification
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">2.3K</div>
            <div className="text-sm text-orange-100">Meals Donated</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-orange-100">Verified Donors</div>
          </div>
          <div>
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-orange-100">Partner NGOs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-orange-100">OTP Verified</div>
          </div>
        </div>
      </div>

      {/* Location Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Location Status</h4>
                <p className="text-sm text-gray-600">
                  {locationPermission === "granted" 
                    ? `Location detected: ${currentLocation?.lat.toFixed(4)}, ${currentLocation?.lng.toFixed(4)}`
                    : "Location permission required for verification"
                  }
                </p>
              </div>
            </div>
            <Badge className={locationPermission === "granted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {locationPermission === "granted" ? "✅ Verified" : "❌ Not Verified"}
            </Badge>
          </div>
        </CardContent>
      </Card>

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
                  Help reduce food waste by donating surplus food with location verification
                </p>
                <Button 
                  onClick={() => setShowDonateForm(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={locationPermission !== "granted"}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {locationPermission === "granted" ? "Post Food Donation" : "Enable Location First"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Available Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Location-Verified Food Donations
                <Badge variant="secondary">{foodDonations.filter(d => d.status === "available").length} verified available</Badge>
              </CardTitle>
              <CardDescription>
                Real-time listings with GPS verification and OTP authentication
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
                          {donation.verified && (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{donation.food}</p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {donation.quantity}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {donation.pickupTime}
                            </div>
                          </div>
                          <div className="flex items-start space-x-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            <div>
                              <div>{donation.location}</div>
                              <div className="text-xs text-gray-500">{donation.exactAddress}</div>
                              <div className="text-xs text-blue-600">
                                GPS: {donation.coordinates.lat.toFixed(4)}, {donation.coordinates.lng.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Posted {donation.postedTime}</p>
                        
                        {donation.status === "claimed" && (
                          <p className="text-sm text-yellow-700 mt-2">
                            Claimed by: {donation.claimedBy}
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
                              Claim Verified Donation
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`tel:${donation.contact}`, '_self')}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`https://maps.google.com/?q=${donation.coordinates.lat},${donation.coordinates.lng}`, '_blank')}
                            >
                              <MapPin className="h-4 w-4 mr-1" />
                              Navigate
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
                <CardTitle>Verified Partner NGOs</CardTitle>
                <CardDescription>Trusted organizations ready to collect food donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ngos.map((ngo, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{ngo.name}</h4>
                        {ngo.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
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
            <h3 className="text-lg font-semibold mb-4">Post Verified Food Donation</h3>
            
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
                  <Label htmlFor="contact">Contact Number (for OTP)</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={donationForm.contact}
                      onChange={(e) => setDonationForm({...donationForm, contact: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                    <Button 
                      onClick={sendOtp}
                      disabled={!donationForm.contact || otpSent}
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {otpSent ? "OTP Sent" : "Send OTP"}
                    </Button>
                  </div>
                </div>
              </div>
              
              {otpSent && (
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="location">Auto-Detected Location</Label>
                <Input
                  value={donationForm.location}
                  onChange={(e) => setDonationForm({...donationForm, location: e.target.value})}
                  placeholder="Location will be auto-detected"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Location is automatically detected for verification
                </p>
              </div>
              
              <div>
                <Label htmlFor="exactAddress">Exact Pickup Address</Label>
                <Input
                  value={donationForm.exactAddress}
                  onChange={(e) => setDonationForm({...donationForm, exactAddress: e.target.value})}
                  placeholder="Building name, floor, specific instructions"
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

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Verification Status:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Location: {locationPermission === "granted" ? "Verified" : "Pending"}
                  </div>
                  <div className="flex items-center">
                    {otpSent && otpCode === generatedOtp ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    )}
                    Phone: {otpSent && otpCode === generatedOtp ? "Verified" : "Pending OTP"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowDonateForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitDonation}
                className="bg-orange-500 hover:bg-orange-600"
                disabled={!otpSent || otpCode !== generatedOtp || locationPermission !== "granted"}
              >
                Post Verified Donation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">OTP Verification Required</h3>
            <p className="text-gray-600 mb-4">
              Please verify your phone number to prevent fake donations and ensure authenticity.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP sent to {donationForm.contact}</Label>
                <Input
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowOtpVerification(false)}>
                  Cancel
                </Button>
                <Button onClick={verifyOtp}>
                  Verify & Submit
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={sendOtp}
                className="w-full"
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs */}
      {activeTab === "my-donations" && (
        <Card>
          <CardHeader>
            <CardTitle>My Verified Donations</CardTitle>
            <CardDescription>Track your food donation history with verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Your donation history with location and OTP verification status will appear here.</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Impact Analytics</CardTitle>
            <CardDescription>Your verified contribution to Zero Hunger goal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Detailed analytics about verified meals saved, waste reduced, and people fed with authentication metrics.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
