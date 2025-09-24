"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Send, Pin, Heart, Reply } from "lucide-react"

interface ChatMessage {
  id: string
  user: string
  avatar?: string
  message: string
  timestamp: Date
  type: "message" | "system"
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  avatar?: string
  category: string
  replies: number
  likes: number
  isPinned: boolean
  timestamp: Date
}

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    user: "admin",
    message: "Welcome to Hackademia community chat!",
    timestamp: new Date(Date.now() - 3600000),
    type: "system",
  },
  {
    id: "2",
    user: "h4ck3r_01",
    message: "Anyone working on the buffer overflow challenge?",
    timestamp: new Date(Date.now() - 1800000),
    type: "message",
  },
  {
    id: "3",
    user: "cyber_ninja",
    message: "Yeah! Stuck on the return address calculation",
    timestamp: new Date(Date.now() - 1200000),
    type: "message",
  },
]

const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Getting Started with Binary Exploitation",
    content: "This is a comprehensive guide for beginners who want to learn binary exploitation...",
    author: "admin",
    category: "Tutorials",
    replies: 15,
    likes: 42,
    isPinned: true,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    title: "CTF Writeup: SQL Injection Challenge",
    content: "Here's my detailed writeup for the recent SQL injection challenge...",
    author: "sql_master",
    category: "Writeups",
    replies: 8,
    likes: 23,
    isPinned: false,
    timestamp: new Date(Date.now() - 43200000),
  },
  {
    id: "3",
    title: "Upcoming CTF Competition - Team Formation",
    content: "Looking for team members for the upcoming international CTF...",
    author: "team_leader",
    category: "General",
    replies: 12,
    likes: 18,
    isPinned: false,
    timestamp: new Date(Date.now() - 21600000),
  },
]

export function Community() {
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts)
  const [newMessage, setNewMessage] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: "you",
        message: newMessage,
        timestamp: new Date(),
        type: "message",
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const post: ForumPost = {
        id: Date.now().toString(),
        title: newPostTitle,
        content: newPostContent,
        author: "you",
        category: "General",
        replies: 0,
        likes: 0,
        isPinned: false,
        timestamp: new Date(),
      }
      setForumPosts([post, ...forumPosts])
      setNewPostTitle("")
      setNewPostContent("")
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "now"
  }

  return (
    <div className="h-full bg-background text-foreground">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="h-full p-4 flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>23 users online</span>
            </div>

            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{msg.user[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className={`text-sm ${msg.type === "system" ? "text-primary italic" : ""}`}>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="forum" className="h-full p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Forum Posts</h2>
            <Button
              onClick={() => {
                const title = prompt("Post title:")
                const content = prompt("Post content:")
                if (title && content) {
                  setNewPostTitle(title)
                  setNewPostContent(content)
                  handleCreatePost()
                }
              }}
            >
              New Post
            </Button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {post.author} • {formatTime(post.timestamp)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Reply className="w-4 h-4 mr-1" />
                      {post.replies} replies
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes} likes
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
