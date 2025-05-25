"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Award } from "lucide-react"

interface GameComponentProps {
  gameType: string
  onGameComplete: (score: number) => void
}

export function CleaningMasterGame({ onGameComplete }: GameComponentProps) {
  const [gameState, setGameState] = useState({
    timeLeft: 900, // 15 minutes
    currentTask: "dust_removal",
    score: 0,
    tasksCompleted: 0,
    accuracy: 100,
  })
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameState.timeLeft === 0) {
      handleGameEnd()
    }
  }, [isPlaying, gameState.timeLeft])

  const handleGameEnd = () => {
    setIsPlaying(false)
    const finalScore = gameState.score + gameState.accuracy * 2
    onGameComplete(finalScore)
  }

  const handleTaskComplete = () => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 50,
      tasksCompleted: prev.tasksCompleted + 1,
      currentTask: getNextTask(prev.currentTask),
    }))
  }

  const getNextTask = (current: string) => {
    const tasks = ["dust_removal", "stain_cleaning", "organization", "time_management"]
    const currentIndex = tasks.indexOf(current)
    return tasks[(currentIndex + 1) % tasks.length]
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-6 w-6" />
          <span>Cleaning Master Challenge</span>
        </CardTitle>
        <CardDescription>Complete cleaning tasks efficiently and accurately</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatTime(gameState.timeLeft)}</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{gameState.score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{gameState.tasksCompleted}</div>
            <div className="text-sm text-gray-600">Tasks Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{gameState.accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>

        {/* Current Task */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Current Task</h3>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {gameState.currentTask.replace("_", " ").toUpperCase()}
          </Badge>
        </div>

        {/* Game Controls */}
        <div className="flex space-x-4">
          {!isPlaying ? (
            <Button className="flex-1" size="lg" onClick={() => setIsPlaying(true)}>
              Start Game
            </Button>
          ) : (
            <>
              <Button className="flex-1" onClick={handleTaskComplete}>
                Complete Task
              </Button>
              <Button variant="outline" onClick={handleGameEnd}>
                End Game
              </Button>
            </>
          )}
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Game Progress</span>
            <span>{Math.round(((900 - gameState.timeLeft) / 900) * 100)}%</span>
          </div>
          <Progress value={((900 - gameState.timeLeft) / 900) * 100} />
        </div>
      </CardContent>
    </Card>
  )
}

export function BabysittingSimulator({ onGameComplete }: GameComponentProps) {
  const [scenario, setScenario] = useState("feeding_time")
  const [score, setScore] = useState(0)
  const [choices, setChoices] = useState<string[]>([])

  const scenarios = {
    feeding_time: {
      description: "The baby is crying and it's feeding time. What do you do?",
      choices: [
        "Prepare the bottle with proper temperature",
        "Give the baby solid food immediately",
        "Wait for the crying to stop first",
      ],
      correct: 0,
      points: 100,
    },
    emergency_response: {
      description: "The child has a minor fall and is crying. How do you respond?",
      choices: [
        "Panic and call parents immediately",
        "Assess for injuries, comfort the child, then decide next steps",
        "Ignore it as children fall often",
      ],
      correct: 1,
      points: 150,
    },
  }

  const handleChoice = (choiceIndex: number) => {
    const currentScenario = scenarios[scenario as keyof typeof scenarios]
    if (choiceIndex === currentScenario.correct) {
      setScore((prev) => prev + currentScenario.points)
    }

    // Move to next scenario or end game
    const scenarioKeys = Object.keys(scenarios)
    const currentIndex = scenarioKeys.indexOf(scenario)
    if (currentIndex < scenarioKeys.length - 1) {
      setScenario(scenarioKeys[currentIndex + 1])
    } else {
      onGameComplete(score + (choiceIndex === currentScenario.correct ? currentScenario.points : 0))
    }
  }

  const currentScenario = scenarios[scenario as keyof typeof scenarios]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-6 w-6" />
          <span>Babysitting Simulator</span>
        </CardTitle>
        <CardDescription>Handle childcare scenarios with wisdom and care</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{score}</div>
          <div className="text-sm text-gray-600">Current Score</div>
        </div>

        <div className="p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{currentScenario.description}</h3>
          <div className="space-y-3">
            {currentScenario.choices.map((choice, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleChoice(index)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
