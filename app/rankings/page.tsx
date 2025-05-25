"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Trophy, Star, Medal, Crown, Search, TrendingUp, Calendar, MapPin } from "lucide-react"

export default function RankingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const topMaids = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 1,
      score: 2850,
      specialties: ["Deep Cleaning", "Babysitting", "Organization"],
      location: "New York, NY",
      reviews: 47,
      rating: 4.9,
      gamesCompleted: 24,
      joinDate: "2024-01-15",
      trend: "up",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 2,
      score: 2720,
      specialties: ["Organization", "Pet Care", "Cooking"],
      location: "Los Angeles, CA",
      reviews: 38,
      rating: 4.8,
      gamesCompleted: 22,
      joinDate: "2024-02-03",
      trend: "up",
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 3,
      score: 2680,
      specialties: ["Cooking", "Elderly Care", "Laundry"],
      location: "Chicago, IL",
      reviews: 42,
      rating: 4.7,
      gamesCompleted: 20,
      joinDate: "2024-01-28",
      trend: "down",
    },
    {
      id: 4,
      name: "Jessica Park",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 4,
      score: 2590,
      specialties: ["Babysitting", "Tutoring", "Light Cleaning"],
      location: "Austin, TX",
      reviews: 35,
      rating: 4.8,
      gamesCompleted: 19,
      joinDate: "2024-02-10",
      trend: "up",
    },
    {
      id: 5,
      name: "Amanda Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 5,
      score: 2520,
      specialties: ["Deep Cleaning", "Organization", "Pet Care"],
      location: "Seattle, WA",
      reviews: 31,
      rating: 4.6,
      gamesCompleted: 18,
      joinDate: "2024-01-20",
      trend: "stable",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <Trophy className="h-5 w-5 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const filteredMaids = topMaids.filter(
    (maid) =>
      maid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maid.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-purple-900">Maid Rankings</h1>
          <p className="text-gray-600 mt-2">Top performers based on game scores and reviews</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Top Maids</CardTitle>
            <CardDescription>Search by name or specialty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search maids or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter by Location</Button>
              <Button variant="outline">Filter by Specialty</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Global Leaderboard</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="recent">Recent Performers</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard">
            <div className="space-y-4">
              {filteredMaids.map((maid, index) => (
                <Card
                  key={maid.id}
                  className={`transition-all hover:shadow-lg ${
                    maid.rank <= 3 ? "border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(maid.rank)}
                          <span className="text-2xl font-bold text-gray-700">#{maid.rank}</span>
                          {getTrendIcon(maid.trend)}
                        </div>

                        <Avatar className="h-12 w-12">
                          <AvatarImage src={maid.avatar || "/placeholder.svg"} alt={maid.name} />
                          <AvatarFallback>
                            {maid.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="text-lg font-semibold">{maid.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{maid.location}</span>
                            <Calendar className="h-4 w-4 ml-2" />
                            <span>Joined {new Date(maid.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{maid.score}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Specialties</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {maid.specialties.slice(0, 2).map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {maid.specialties.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{maid.specialties.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Rating</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{maid.rating}</span>
                          <span className="text-sm text-gray-600">({maid.reviews})</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Games Completed</div>
                        <div className="font-semibold mt-1">{maid.gamesCompleted}</div>
                      </div>

                      <div className="flex justify-end">
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { category: "Cleaning", leader: "Sarah Chen", score: 2850 },
                { category: "Babysitting", leader: "Jessica Park", score: 2590 },
                { category: "Cooking", leader: "Emily Johnson", score: 2680 },
                { category: "Organization", leader: "Maria Rodriguez", score: 2720 },
                { category: "Pet Care", leader: "Amanda Wilson", score: 2520 },
                { category: "Elderly Care", leader: "Emily Johnson", score: 2680 },
              ].map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <CardDescription>Category leader</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{category.leader}</div>
                        <div className="text-sm text-gray-600">{category.score} points</div>
                      </div>
                      <Crown className="h-6 w-6 text-yellow-500" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Full Rankings
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Top Performers</CardTitle>
                <CardDescription>Maids who have shown exceptional performance this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMaids.slice(0, 3).map((maid) => (
                    <div key={maid.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={maid.avatar || "/placeholder.svg"} alt={maid.name} />
                          <AvatarFallback>
                            {maid.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{maid.name}</div>
                          <div className="text-sm text-gray-600">+150 points this week</div>
                        </div>
                      </div>
                      <Badge variant="secondary">Rising Star</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
