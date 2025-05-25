"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Trophy, Users, GamepadIcon, Coins, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [userType, setUserType] = useState<"maid" | "employer" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-purple-900">Maids of Honour</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/games" className="text-gray-600 hover:text-purple-600">
              Games
            </Link>
            <Link href="/rankings" className="text-gray-600 hover:text-purple-600">
              Rankings
            </Link>
            <Link href="/marketplace" className="text-gray-600 hover:text-purple-600">
              Marketplace
            </Link>
            <Button variant="outline">Connect Wallet</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">The Future of Domestic Services</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Play games, build skills, earn rankings, and connect with employers in the first gamified maid service
            platform built on Starknet blockchain.
          </p>

          {!userType && (
            <div className="flex justify-center space-x-4 mb-12">
              <Button size="lg" onClick={() => setUserType("maid")} className="bg-purple-600 hover:bg-purple-700">
                I'm a Maid
              </Button>
              <Button size="lg" variant="outline" onClick={() => setUserType("employer")}>
                I Need a Maid
              </Button>
            </div>
          )}

          {userType === "maid" && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <GamepadIcon className="h-6 w-6" />
                  <span>Start Your Journey as a Maid</span>
                </CardTitle>
                <CardDescription>Play games, complete challenges, and build your reputation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <GamepadIcon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">Play Games</h3>
                    <p className="text-sm text-gray-600">Cleaning & babysitting challenges</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Earn Rankings</h3>
                    <p className="text-sm text-gray-600">Climb the leaderboard</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Coins className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">Get Hired</h3>
                    <p className="text-sm text-gray-600">Top maids get priority</p>
                  </div>
                </div>
                <Link href="/games">
                  <Button className="w-full" size="lg">
                    Start Playing Games
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {userType === "employer" && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Find Your Perfect Maid</span>
                </CardTitle>
                <CardDescription>Access top-ranked, game-verified domestic service professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">Verified Skills</h3>
                    <p className="text-sm text-gray-600">Game-tested abilities</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">Top Ranked</h3>
                    <p className="text-sm text-gray-600">Best performers first</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Coins className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Secure Payment</h3>
                    <p className="text-sm text-gray-600">Blockchain-powered</p>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Browse Top Maids
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>

          <Tabs defaultValue="maids" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="maids">For Maids</TabsTrigger>
              <TabsTrigger value="employers">For Employers</TabsTrigger>
            </TabsList>

            <TabsContent value="maids" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">1. Play Games</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Complete cleaning challenges, babysitting scenarios, and skill-based mini-games
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">2. Take Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Answer interactive questions and demonstrate your knowledge through gamified assessments
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Get Ranked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Earn points and climb the leaderboard based on your performance and reviews
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="employers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">1. Pay Entry Fee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Secure platform access with cryptocurrency payment on Starknet</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">2. Get Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Receive top-ranked maid recommendations based on your specific needs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Review & Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Provide feedback that helps maintain quality and improves the ranking system
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Current Rankings Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Top Ranked Maids</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Sarah Chen", rank: 1, score: 2850, specialties: ["Deep Cleaning", "Babysitting"], reviews: 47 },
              { name: "Maria Rodriguez", rank: 2, score: 2720, specialties: ["Organization", "Pet Care"], reviews: 38 },
              { name: "Emily Johnson", rank: 3, score: 2680, specialties: ["Cooking", "Elderly Care"], reviews: 42 },
            ].map((maid) => (
              <Card key={maid.rank} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{maid.name}</CardTitle>
                    <Badge variant="secondary">#{maid.rank}</Badge>
                  </div>
                  <CardDescription>Score: {maid.score} points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {maid.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{maid.reviews} reviews</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-6 w-6" />
                <span className="text-xl font-bold">Maids of Honour</span>
              </div>
              <p className="text-gray-400">Revolutionizing domestic services through blockchain gaming</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Games</li>
                <li>Rankings</li>
                <li>Marketplace</li>
                <li>Reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Starknet Blockchain</li>
                <li>Dojo Framework</li>
                <li>Smart Contracts</li>
                <li>Decentralized</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Community</li>
                <li>Documentation</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Maids of Honour. Built on Starknet with Dojo.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
