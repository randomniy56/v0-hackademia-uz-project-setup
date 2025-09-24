"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Calendar, Target } from "lucide-react"

interface LeaderboardEntry {
  id: string
  rank: number
  username: string
  fullName: string
  avatar?: string
  points: number
  challengesSolved: number
  rating: number
  country: string
  lastActive: Date
  trend: "up" | "down" | "same"
  rankChange: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    username: "cyber_legend",
    fullName: "Alex Chen",
    points: 15420,
    challengesSolved: 89,
    rating: 2850,
    country: "🇺🇸",
    lastActive: new Date(Date.now() - 3600000),
    trend: "same",
    rankChange: 0,
  },
  {
    id: "2",
    rank: 2,
    username: "hack_master",
    fullName: "Sarah Johnson",
    points: 14890,
    challengesSolved: 85,
    rating: 2720,
    country: "🇬🇧",
    lastActive: new Date(Date.now() - 7200000),
    trend: "up",
    rankChange: 1,
  },
  {
    id: "3",
    rank: 3,
    username: "binary_ninja",
    fullName: "Yuki Tanaka",
    points: 14350,
    challengesSolved: 82,
    rating: 2680,
    country: "🇯🇵",
    lastActive: new Date(Date.now() - 1800000),
    trend: "down",
    rankChange: -1,
  },
  {
    id: "4",
    rank: 4,
    username: "web_warrior",
    fullName: "Maria Garcia",
    points: 13920,
    challengesSolved: 78,
    rating: 2590,
    country: "🇪🇸",
    lastActive: new Date(Date.now() - 5400000),
    trend: "up",
    rankChange: 2,
  },
  {
    id: "5",
    rank: 5,
    username: "crypto_king",
    fullName: "David Miller",
    points: 13580,
    challengesSolved: 76,
    rating: 2540,
    country: "🇨🇦",
    lastActive: new Date(Date.now() - 10800000),
    trend: "same",
    rankChange: 0,
  },
]

const topAchievers: Achievement[] = [
  {
    id: "1",
    title: "First Blood Master",
    description: "First to solve 10 challenges",
    icon: "🩸",
    rarity: "legendary",
  },
  {
    id: "2",
    title: "Speed Demon",
    description: "Solved challenge in under 5 minutes",
    icon: "⚡",
    rarity: "epic",
  },
  {
    id: "3",
    title: "Night Owl",
    description: "Active for 7 consecutive days",
    icon: "🦉",
    rarity: "rare",
  },
]

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard)
  const [activeTab, setActiveTab] = useState("global")
  const [timeframe, setTimeframe] = useState("all-time")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>
    }
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return <TrendingUp className="w-4 h-4 text-green-400" />
    } else if (trend === "down") {
      return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
    }
    return null
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "rare":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "epic":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "legendary":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatLastActive = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "now"
  }

  return (
    <div className="h-full bg-background text-foreground">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="achievements">Top Achievers</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Global Leaderboard</h1>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
            >
              <option value="all-time">All Time</option>
              <option value="this-year">This Year</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
            </select>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {leaderboard.map((entry) => (
              <Card key={entry.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.rank)}
                      {getTrendIcon(entry.trend, entry.rankChange)}
                    </div>

                    <Avatar className="w-10 h-10">
                      <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {entry.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{entry.fullName}</span>
                        <span className="text-sm text-muted-foreground">@{entry.username}</span>
                        <span>{entry.country}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last active {formatLastActive(entry.lastActive)}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{entry.challengesSolved}</div>
                          <div className="text-xs text-muted-foreground">Solved</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{entry.rating}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Monthly Champions</h2>
            <Badge variant="outline">December 2024</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <Card key={entry.id} className="text-center">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">{getRankIcon(index + 1)}</div>
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {entry.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{entry.fullName}</CardTitle>
                  <CardDescription>@{entry.username}</CardDescription>
                  <div className="mt-2 text-sm">
                    <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                    <div className="text-muted-foreground">points this month</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Monthly Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-muted-foreground">Total Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-muted-foreground">Challenges Released</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Top Achievers</h2>
            <Badge variant="outline">Recent Achievements</Badge>
          </div>

          <div className="space-y-4">
            {topAchievers.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Recently unlocked by: cyber_legend, hack_master, binary_ninja
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Achievement Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Speed Challenges</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>First Blood</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Consistency</span>
                    <Badge variant="secondary">6</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Collaboration</span>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Events</span>
                    <Badge variant="secondary">9</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Mastery</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
