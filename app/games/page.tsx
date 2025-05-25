"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Clock, Trophy, Star, Baby, Utensils, Home, CheckCircle, PlayCircle } from "lucide-react"
import { CleaningMasterGame } from "@/components/cleaning-game"

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [playerStats, setPlayerStats] = useState({
    totalPoints: 1250,
    gamesCompleted: 8,
    currentRank: 15,
    avgRating: 4.8,
  })

  const games = [
    {
      id: "cleaning-master",
      title: "Cleaning Master",
      description: "Master the art of efficient cleaning through timed challenges",
      category: "cleaning",
      difficulty: "Beginner",
      duration: "5 min",
      points: 100,
      icon: <Sparkles className="h-6 w-6" />,
      completed: false,
      playable: true,
    },
    {
      id: "babysitting-sim",
      title: "Babysitting Simulator",
      description: "Handle various childcare scenarios and emergencies",
      category: "babysitting",
      difficulty: "Intermediate",
      duration: "25 min",
      points: 200,
      icon: <Baby className="h-6 w-6" />,
      completed: true,
      playable: false,
    },
    {
      id: "kitchen-wizard",
      title: "Kitchen Wizard",
      description: "Prepare meals while managing time and safety",
      category: "cooking",
      difficulty: "Advanced",
      duration: "30 min",
      points: 300,
      icon: <Utensils className="h-6 w-6" />,
      completed: false,
      playable: false,
    },
    {
      id: "home-organizer",
      title: "Home Organizer",
      description: "Optimize space and organize household items efficiently",
      category: "organization",
      difficulty: "Intermediate",
      duration: "20 min",
      points: 150,
      icon: <Home className="h-6 w-6" />,
      completed: false,
      playable: false,
    },
  ]

  // Update the handleGameComplete function
  const handleGameComplete = (gameId: string, score: number) => {
    setPlayerStats((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + score,
      gamesCompleted: prev.gamesCompleted + 1,
    }))
    setSelectedGame(null)

    // Show success message
    alert(`Game completed! You scored ${score} points!`)

    // Here you would submit to Dojo/Starknet
    console.log(`Game ${gameId} completed with score: ${score}`)
  }

  // Update the game selection logic
  const handleStartGame = (gameId: string) => {
    console.log("Starting game:", gameId) // Add this debug line
    if (gameId === "cleaning-master") {
      setSelectedGame(gameId)
      console.log("Selected game set to:", gameId) // Add this debug line
    } else {
      alert("This game is coming soon! Try Cleaning Master for now.")
    }
  }

  const interviews = [
    {
      id: "safety-protocols",
      title: "Safety Protocols Quiz",
      description: "Test your knowledge of household safety measures",
      questions: 15,
      duration: "10 min",
      points: 75,
      completed: true,
    },
    {
      id: "customer-service",
      title: "Customer Service Scenarios",
      description: "Handle difficult situations with professionalism",
      questions: 20,
      duration: "15 min",
      points: 100,
      completed: false,
    },
    {
      id: "emergency-response",
      title: "Emergency Response",
      description: "React appropriately to household emergencies",
      questions: 12,
      duration: "8 min",
      points: 125,
      completed: false,
    },
  ]

  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedGame])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 overflow-x-hidden">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-purple-900">Training Games & Assessments</h1>
          <p className="text-gray-600 mt-2">Build your skills and earn ranking points</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Player Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{playerStats.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{playerStats.gamesCompleted}</div>
                <div className="text-sm text-gray-600">Games Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{playerStats.currentRank}</div>
                <div className="text-sm text-gray-600">Current Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{playerStats.avgRating}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Rank 14</span>
                <span>350/500 points</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">Skill Games</TabsTrigger>
            <TabsTrigger value="interviews">Interviews & Assessments</TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="relative overflow-hidden">
                  {game.completed && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">{game.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{game.title}</CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{game.difficulty}</Badge>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{game.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{game.points} pts</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        variant={game.completed ? "outline" : "default"}
                        onClick={() => handleStartGame(game.id)}
                        disabled={!game.playable}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        {game.playable ? (game.completed ? "Play Again" : "Start Game") : "Coming Soon"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviews.map((interview) => (
                <Card key={interview.id} className="relative overflow-hidden">
                  {interview.completed && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{interview.title}</CardTitle>
                    <CardDescription>{interview.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Questions:</span>
                          <div className="font-semibold">{interview.questions}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <div className="font-semibold">{interview.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-semibold">{interview.points} points</span>
                        </div>
                      </div>
                      <Button className="w-full" variant={interview.completed ? "outline" : "default"}>
                        {interview.completed ? "Retake Assessment" : "Start Assessment"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Game Modal - Fixed positioning and z-index */}
        {selectedGame === "cleaning-master" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999] overflow-y-auto">
            <div className="w-full max-w-4xl my-8">
              <CleaningMasterGame
                onGameComplete={(score) => handleGameComplete("cleaning-master", score)}
                onClose={() => setSelectedGame(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
