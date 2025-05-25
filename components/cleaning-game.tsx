"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Sparkles, Zap, Award, X, CheckCircle } from "lucide-react"

interface CleaningGameProps {
  onGameComplete: (score: number) => void
  onClose: () => void
}

interface GameState {
  timeLeft: number
  score: number
  level: number
  currentTask: CleaningTask
  tasksCompleted: number
  accuracy: number
  combo: number
  gameStarted: boolean
  gameEnded: boolean
}

interface CleaningTask {
  id: string
  type: "dust" | "stain" | "organize" | "vacuum"
  description: string
  difficulty: number
  timeLimit: number
  points: number
  x: number
  y: number
  completed: boolean
}

export function CleaningMasterGame({ onGameComplete, onClose }: CleaningGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    timeLeft: 60, // 1 minute for demo
    score: 0,
    level: 1,
    currentTask: generateRandomTask(),
    tasksCompleted: 0,
    accuracy: 100,
    combo: 0,
    gameStarted: false,
    gameEnded: false,
  })

  const [tasks, setTasks] = useState<CleaningTask[]>([])
  const [showInstructions, setShowInstructions] = useState(true)

  // Generate random cleaning task
  function generateRandomTask(): CleaningTask {
    const taskTypes = [
      { type: "dust" as const, description: "Remove dust", points: 10, timeLimit: 3 },
      { type: "stain" as const, description: "Clean stain", points: 15, timeLimit: 4 },
      { type: "organize" as const, description: "Organize items", points: 20, timeLimit: 5 },
      { type: "vacuum" as const, description: "Vacuum area", points: 25, timeLimit: 6 },
    ]

    const randomType = taskTypes[Math.floor(Math.random() * taskTypes.length)]

    return {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: randomType.type,
      description: randomType.description,
      difficulty: Math.floor(Math.random() * 3) + 1,
      timeLimit: randomType.timeLimit,
      points: randomType.points,
      x: Math.random() * 70 + 15, // 15-85% to avoid edges
      y: Math.random() * 50 + 25, // 25-75% to avoid edges
      completed: false,
    }
  }

  // Start game
  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      gameEnded: false,
      timeLeft: 60,
      score: 0,
      tasksCompleted: 0,
      combo: 0,
      accuracy: 100,
    }))
    setShowInstructions(false)
  }, [])

  // Game timer
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameEnded && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameState.timeLeft === 0 && !gameState.gameEnded) {
      endGame()
    }
  }, [gameState.gameStarted, gameState.gameEnded, gameState.timeLeft])

  // Complete task
  const completeTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId)
      if (!task) return

      // Remove the completed task
      setTasks((prev) => prev.filter((t) => t.id !== taskId))

      // Update game state
      const bonusPoints = gameState.combo * 5
      const totalPoints = task.points + bonusPoints

      setGameState((prev) => ({
        ...prev,
        score: prev.score + totalPoints,
        tasksCompleted: prev.tasksCompleted + 1,
        combo: prev.combo + 1,
        accuracy: Math.min(100, prev.accuracy + 2),
      }))

      // Add a new task after a short delay
      setTimeout(() => {
        setTasks((prev) => [...prev, generateRandomTask()])
      }, 200)
    },
    [tasks, gameState.combo],
  )

  // Miss task (time runs out)
  const missTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))

    setGameState((prev) => ({
      ...prev,
      combo: 0,
      accuracy: Math.max(0, prev.accuracy - 5),
    }))

    // Add new task
    setTimeout(() => {
      setTasks((prev) => [...prev, generateRandomTask()])
    }, 500)
  }, [])

  // Task timer
  useEffect(() => {
    const taskTimers = tasks.map((task) => {
      return setTimeout(() => {
        missTask(task.id)
      }, task.timeLimit * 1000)
    })

    return () => {
      taskTimers.forEach((timer) => clearTimeout(timer))
    }
  }, [tasks, missTask])

  // End game
  const endGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, gameEnded: true }))

    // Calculate final score with bonuses
    const finalScore = gameState.score + gameState.tasksCompleted * 10 + gameState.accuracy * 2 + gameState.timeLeft * 5

    setTimeout(() => {
      onGameComplete(finalScore)
    }, 2000)
  }, [gameState.score, gameState.tasksCompleted, gameState.accuracy, gameState.timeLeft, onGameComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "dust":
        return <Sparkles className="h-4 w-4" />
      case "stain":
        return <Target className="h-4 w-4" />
      case "organize":
        return <CheckCircle className="h-4 w-4" />
      case "vacuum":
        return <Zap className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case "dust":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "stain":
        return "bg-red-500 hover:bg-red-600"
      case "organize":
        return "bg-blue-500 hover:bg-blue-600"
      case "vacuum":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  // Add this useEffect to ensure tasks are generated when game starts
  useEffect(() => {
    if (gameState.gameStarted && tasks.length === 0) {
      const initialTasks = Array.from({ length: 3 }, () => generateRandomTask())
      setTasks(initialTasks)
    }
  }, [gameState.gameStarted, tasks.length])

  if (showInstructions) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span>Cleaning Master Challenge</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Master the art of efficient cleaning!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Click on cleaning tasks as they appear</li>
              <li>• Complete tasks quickly for bonus points</li>
              <li>• Build combos by completing tasks in succession</li>
              <li>• Different tasks give different points</li>
              <li>• You have 60 seconds to score as high as possible!</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Sparkles className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
              <div className="text-sm font-medium">Dust Removal</div>
              <div className="text-xs text-gray-600">10 points</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-1 text-red-600" />
              <div className="text-sm font-medium">Stain Cleaning</div>
              <div className="text-xs text-gray-600">15 points</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">Organization</div>
              <div className="text-xs text-gray-600">20 points</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">Vacuuming</div>
              <div className="text-xs text-gray-600">25 points</div>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={startGame}>
            Start Cleaning Challenge!
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (gameState.gameEnded) {
    const finalScore = gameState.score + gameState.tasksCompleted * 10 + gameState.accuracy * 2 + gameState.timeLeft * 5

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <Award className="h-6 w-6 text-yellow-500" />
            <span>Game Complete!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="text-4xl font-bold text-purple-600">{finalScore}</div>
          <div className="text-lg text-gray-600">Final Score</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{gameState.tasksCompleted}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{gameState.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-600">Score Breakdown:</div>
            <div className="text-sm">Task Points: {gameState.score}</div>
            <div className="text-sm">Completion Bonus: {gameState.tasksCompleted * 10}</div>
            <div className="text-sm">Accuracy Bonus: {gameState.accuracy * 2}</div>
            <div className="text-sm">Time Bonus: {gameState.timeLeft * 5}</div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1" onClick={() => window.location.reload()}>
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span>Cleaning Master</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatTime(gameState.timeLeft)}</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{gameState.score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{gameState.tasksCompleted}</div>
            <div className="text-sm text-gray-600">Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{gameState.combo}</div>
            <div className="text-sm text-gray-600">Combo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{gameState.accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>

        {/* Game Area - Fixed height and better responsiveness */}
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-80 md:h-96 border-2 border-dashed border-gray-300 overflow-hidden">
          <div className="absolute inset-0 p-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full ${getTaskColor(task.type)} text-white shadow-lg transform transition-all hover:scale-110 animate-pulse cursor-pointer border-2 border-white flex items-center justify-center`}
                style={{
                  left: `${task.x}%`,
                  top: `${task.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log("Task clicked:", task.id) // Debug line
                  completeTask(task.id)
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  {getTaskIcon(task.type)}
                  <span className="text-xs font-bold">{task.points}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Game instructions overlay */}
          <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
            <div className="text-sm font-medium">Click the cleaning tasks!</div>
            <div className="text-xs text-gray-600">Combo: +{gameState.combo * 5} bonus points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Game Progress</span>
            <span>{Math.round(((60 - gameState.timeLeft) / 60) * 100)}%</span>
          </div>
          <Progress value={((60 - gameState.timeLeft) / 60) * 100} className="h-2" />
        </div>

        {/* End Game Button */}
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={endGame}>
            End Game Early
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
