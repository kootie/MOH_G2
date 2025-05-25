"use client"

import { useState, useEffect } from "react"
import { dojoEngine, type DojoGameSession, type DojoGameResult } from "@/lib/dojo-integration"

export function useDojoGame() {
  const [isConnected, setIsConnected] = useState(false)
  const [currentSession, setCurrentSession] = useState<DojoGameSession | null>(null)
  const [playerStats, setPlayerStats] = useState(dojoEngine.getPlayerStats())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initialize Dojo on component mount
    initializeDojo()
  }, [])

  const initializeDojo = async () => {
    setIsLoading(true)
    try {
      // Initialize with demo contract addresses
      const worldAddress = "0x1234567890abcdef" // Demo address
      const gameAddress = "0xabcdef1234567890" // Demo address

      await dojoEngine.initialize(worldAddress, gameAddress)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to initialize Dojo:", error)
      setIsLoading(false)
    }
  }

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      const connected = await dojoEngine.connectWallet()
      setIsConnected(connected)

      if (connected) {
        // Refresh player stats
        setPlayerStats(dojoEngine.getPlayerStats())
      }

      setIsLoading(false)
      return connected
    } catch (error) {
      console.error("Wallet connection failed:", error)
      setIsLoading(false)
      return false
    }
  }

  const startGame = async (gameType: string, playerId: string) => {
    setIsLoading(true)
    try {
      const session = await dojoEngine.startGameSession(gameType, playerId)
      setCurrentSession(session)
      setIsLoading(false)
      return session
    } catch (error) {
      console.error("Failed to start game:", error)
      setIsLoading(false)
      return null
    }
  }

  const submitGameResult = async (result: DojoGameResult) => {
    setIsLoading(true)
    try {
      const success = await dojoEngine.submitGameResult(result)

      if (success) {
        // Refresh player stats
        setPlayerStats(dojoEngine.getPlayerStats())
        setCurrentSession(null)
      }

      setIsLoading(false)
      return success
    } catch (error) {
      console.error("Failed to submit game result:", error)
      setIsLoading(false)
      return false
    }
  }

  const getLeaderboard = async () => {
    try {
      return await dojoEngine.getLeaderboard()
    } catch (error) {
      console.error("Failed to get leaderboard:", error)
      return []
    }
  }

  return {
    isConnected,
    currentSession,
    playerStats,
    isLoading,
    connectWallet,
    startGame,
    submitGameResult,
    getLeaderboard,
  }
}
