"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Flag, Trophy, Clock, Users } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  solves: number
  timeLimit?: number
  flag?: string
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Basic Buffer Overflow",
    description: "Find the vulnerability in this simple C program and exploit it to get the flag.",
    category: "Binary Exploitation",
    difficulty: "Easy",
    points: 100,
    solves: 45,
    timeLimit: 3600,
  },
  {
    id: "2",
    title: "SQL Injection Master",
    description: "Bypass the login system using SQL injection techniques.",
    category: "Web Security",
    difficulty: "Medium",
    points: 250,
    solves: 23,
  },
  {
    id: "3",
    title: "Reverse Engineering Challenge",
    description: "Analyze this binary and find the hidden flag inside.",
    category: "Reverse Engineering",
    difficulty: "Hard",
    points: 500,
    solves: 8,
    timeLimit: 7200,
  },
]

export function CTFChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [flagInput, setFlagInput] = useState("")
  const [activeTab, setActiveTab] = useState("list")

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitFlag = () => {
    if (flagInput.trim()) {
      // Mock flag validation
      const isCorrect = flagInput === "flag{example_flag}"
      alert(isCorrect ? "Correct flag! Points awarded." : "Incorrect flag. Try again.")
      setFlagInput("")
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="h-full bg-background text-foreground">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Challenges</TabsTrigger>
          <TabsTrigger value="challenge">Challenge</TabsTrigger>
          <TabsTrigger value="submit">Submit Flag</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="h-full p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {filteredChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => {
                  setSelectedChallenge(challenge)
                  setActiveTab("challenge")
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                  </div>
                  <CardDescription>{challenge.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-primary" />
                        {challenge.points} pts
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                        {challenge.solves} solves
                      </span>
                      {challenge.timeLimit && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                          {Math.floor(challenge.timeLimit / 60)}m
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenge" className="h-full p-4">
          {selectedChallenge ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedChallenge.title}</h2>
                <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                  {selectedChallenge.difficulty}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-primary" />
                  {selectedChallenge.points} points
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  {selectedChallenge.solves} solves
                </div>
                {selectedChallenge.timeLimit && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    {Math.floor(selectedChallenge.timeLimit / 60)} minutes
                  </div>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedChallenge.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Challenge Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      📁 challenge.zip (2.3 MB)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      🔗 Remote Server: nc challenge.hackademia.uz 1337
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => setActiveTab("submit")} className="w-full">
                Submit Flag
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a challenge to view details</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="submit" className="h-full p-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Submit Flag</h2>

            {selectedChallenge && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedChallenge.title}</CardTitle>
                  <CardDescription>
                    {selectedChallenge.points} points • {selectedChallenge.category}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Flag</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="flag{your_flag_here}"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  className="flex-1 font-mono"
                />
                <Button onClick={handleSubmitFlag} className="flex items-center">
                  <Flag className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>• Flags are case-sensitive</p>
              <p>• Format: flag{`{content}`}</p>
              <p>• You have unlimited attempts</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
