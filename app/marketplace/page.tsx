"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, Clock, DollarSign, Shield, MessageCircle, Calendar, Filter } from "lucide-react"

export default function MarketplacePage() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedMaid, setSelectedMaid] = useState<any>(null)

  const availableMaids = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rank: 1,
      rating: 4.9,
      reviews: 47,
      hourlyRate: 25,
      location: "New York, NY",
      specialties: ["Deep Cleaning", "Babysitting", "Organization"],
      availability: "Available Today",
      verified: true,
      description: "Professional maid with 5+ years experience. Specializes in deep cleaning and childcare.",
      responseTime: "< 1 hour",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      rank: 2,
      rating: 4.8,
      reviews: 38,
      hourlyRate: 23,
      location: "Los Angeles, CA",
      specialties: ["Organization", "Pet Care", "Cooking"],
      availability: "Available Tomorrow",
      verified: true,
      description: "Experienced in home organization and pet care. Loves creating clean, organized spaces.",
      responseTime: "< 2 hours",
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      rank: 3,
      rating: 4.7,
      reviews: 42,
      hourlyRate: 22,
      location: "Chicago, IL",
      specialties: ["Cooking", "Elderly Care", "Laundry"],
      availability: "Available This Week",
      verified: true,
      description: "Compassionate caregiver with cooking expertise. Perfect for elderly care and meal prep.",
      responseTime: "< 3 hours",
    },
  ]

  const handleBookMaid = (maid: any) => {
    setSelectedMaid(maid)
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-purple-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">Find and hire top-ranked maids</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Access Fee Notice */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Premium Access Required</h3>
                <p className="text-blue-700 mt-1">
                  Pay the platform fee to access our verified maid network and secure booking system.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Pay Access Fee (0.1 ETH)</Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Find Your Perfect Maid</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Location" />
              <Input placeholder="Service type" />
              <Input placeholder="Max hourly rate" />
              <Button>Search Maids</Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Maids */}
        <div className="space-y-6">
          {availableMaids.map((maid) => (
            <Card key={maid.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Maid Info */}
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={maid.avatar || "/placeholder.svg"} alt={maid.name} />
                        <AvatarFallback>
                          {maid.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {maid.verified && (
                        <div className="absolute -top-1 -right-1">
                          <Shield className="h-5 w-5 text-green-500 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold">{maid.name}</h3>
                        <Badge variant="secondary">Rank #{maid.rank}</Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{maid.rating}</span>
                          <span>({maid.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{maid.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Responds in {maid.responseTime}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{maid.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {maid.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="lg:text-right space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-green-600">${maid.hourlyRate}/hour</div>
                      <div className="text-sm text-gray-600">{maid.availability}</div>
                    </div>

                    <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                      <Button className="flex-1 lg:w-full" onClick={() => handleBookMaid(maid)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      <Button variant="outline" className="flex-1 lg:w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedMaid && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Book {selectedMaid.name}</CardTitle>
                <CardDescription>Complete your booking details and payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Service Date</label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Service Time</label>
                    <Input type="time" className="mt-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Duration (hours)</label>
                  <Input type="number" placeholder="4" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Service Address</label>
                  <Textarea placeholder="Enter your full address..." className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Special Instructions</label>
                  <Textarea placeholder="Any specific requirements or instructions..." className="mt-1" />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span>Service Cost (4 hours)</span>
                    <span className="font-semibold">${selectedMaid.hourlyRate * 4}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>Platform Fee</span>
                    <span className="font-semibold">$5</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${selectedMaid.hourlyRate * 4 + 5}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowBookingModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pay & Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
