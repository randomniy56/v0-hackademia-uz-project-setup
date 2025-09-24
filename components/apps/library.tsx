"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Book, FileText, Shield, Download, Eye, Star } from "lucide-react"

interface LibraryItem {
  id: string
  title: string
  description: string
  type: "book" | "writeup" | "cheatsheet"
  category: string
  author: string
  rating: number
  downloads: number
  size: string
  format: string
  tags: string[]
  publishedAt: Date
}

const mockLibraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "The Web Application Hacker's Handbook",
    description: "Comprehensive guide to web application security testing and exploitation techniques.",
    type: "book",
    category: "Web Security",
    author: "Dafydd Stuttard",
    rating: 4.8,
    downloads: 1250,
    size: "15.2 MB",
    format: "PDF",
    tags: ["web", "security", "testing", "exploitation"],
    publishedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Buffer Overflow Exploitation Writeup",
    description: "Step-by-step writeup of exploiting a stack-based buffer overflow vulnerability.",
    type: "writeup",
    category: "Binary Exploitation",
    author: "h4ck3r_01",
    rating: 4.5,
    downloads: 890,
    size: "2.1 MB",
    format: "PDF",
    tags: ["buffer overflow", "exploitation", "binary", "stack"],
    publishedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    title: "Linux Privilege Escalation Cheat Sheet",
    description: "Quick reference for Linux privilege escalation techniques and commands.",
    type: "cheatsheet",
    category: "System Security",
    author: "sys_admin",
    rating: 4.9,
    downloads: 2100,
    size: "850 KB",
    format: "PDF",
    tags: ["linux", "privilege escalation", "commands", "reference"],
    publishedAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    title: "SQL Injection Attack Patterns",
    description: "Collection of SQL injection payloads and attack vectors for different databases.",
    type: "cheatsheet",
    category: "Web Security",
    author: "sql_master",
    rating: 4.7,
    downloads: 1680,
    size: "1.5 MB",
    format: "PDF",
    tags: ["sql injection", "payloads", "database", "web"],
    publishedAt: new Date("2024-03-25"),
  },
]

export function Library() {
  const [items, setItems] = useState<LibraryItem[]>(mockLibraryItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTab = activeTab === "all" || item.type === activeTab
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesTab && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-4 h-4" />
      case "writeup":
        return <FileText className="w-4 h-4" />
      case "cheatsheet":
        return <Shield className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "writeup":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cheatsheet":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="h-full bg-background text-foreground">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Knowledge Library</h1>
          <Badge variant="outline">{filteredItems.length} resources</Badge>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search books, writeups, cheat sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="book">Books</TabsTrigger>
            <TabsTrigger value="writeup">Writeups</TabsTrigger>
            <TabsTrigger value="cheatsheet">Cheat Sheets</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:bg-accent/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-muted-foreground">
                        by {item.author} • {formatDate(item.publishedAt)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{item.size}</span>
                        <span>{item.format}</span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {item.downloads}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
