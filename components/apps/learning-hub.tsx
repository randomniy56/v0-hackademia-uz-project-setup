"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Play, Clock, Users, BookOpen, Video, CheckCircle } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in minutes
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  thumbnail: string
  enrolled: number
  rating: number
  progress?: number
  isCompleted?: boolean
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: number
  type: "video" | "tutorial" | "quiz"
  isCompleted?: boolean
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Ethical Hacking",
    description: "Learn the fundamentals of ethical hacking and penetration testing.",
    instructor: "Dr. Sarah Johnson",
    duration: 480, // 8 hours
    level: "Beginner",
    category: "Fundamentals",
    thumbnail: "/ethical-hacking-course.jpg",
    enrolled: 1250,
    rating: 4.8,
    progress: 65,
    lessons: [
      { id: "1", title: "What is Ethical Hacking?", duration: 15, type: "video", isCompleted: true },
      { id: "2", title: "Setting up Your Lab", duration: 30, type: "tutorial", isCompleted: true },
      { id: "3", title: "Reconnaissance Techniques", duration: 45, type: "video", isCompleted: false },
      { id: "4", title: "Knowledge Check", duration: 10, type: "quiz", isCompleted: false },
    ],
  },
  {
    id: "2",
    title: "Advanced Web Application Security",
    description: "Deep dive into web application vulnerabilities and exploitation techniques.",
    instructor: "Mike Chen",
    duration: 720, // 12 hours
    level: "Advanced",
    category: "Web Security",
    thumbnail: "/web-security-course.png",
    enrolled: 890,
    rating: 4.9,
    lessons: [
      { id: "1", title: "OWASP Top 10 Overview", duration: 60, type: "video" },
      { id: "2", title: "SQL Injection Deep Dive", duration: 90, type: "tutorial" },
      { id: "3", title: "XSS Attack Vectors", duration: 75, type: "video" },
      { id: "4", title: "Practical Lab Exercise", duration: 120, type: "tutorial" },
    ],
  },
  {
    id: "3",
    title: "Binary Exploitation Fundamentals",
    description: "Master the art of binary exploitation and reverse engineering.",
    instructor: "Alex Rodriguez",
    duration: 600, // 10 hours
    level: "Intermediate",
    category: "Binary Exploitation",
    thumbnail: "/binary-exploitation-course.jpg",
    enrolled: 567,
    rating: 4.7,
    lessons: [
      { id: "1", title: "Assembly Language Basics", duration: 90, type: "video" },
      { id: "2", title: "Stack Buffer Overflows", duration: 120, type: "tutorial" },
      { id: "3", title: "Return Oriented Programming", duration: 150, type: "video" },
      { id: "4", title: "Exploitation Challenge", duration: 60, type: "quiz" },
    ],
  },
]

export function LearningHub() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory

    return matchesSearch && matchesLevel && matchesCategory
  })

  const enrolledCourses = courses.filter((course) => course.progress !== undefined)
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]
  const categories = ["all", ...Array.from(new Set(courses.map((course) => course.category)))]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "tutorial":
        return <BookOpen className="w-4 h-4" />
      case "quiz":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full bg-background text-foreground">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="course">Course Details</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Learning Hub</h1>
            <Badge variant="outline">{filteredCourses.length} courses</Badge>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === "all" ? "All Levels" : level}
                </option>
              ))}
            </select>
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

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-muted-foreground">by {course.instructor}</div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(course.duration)}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrolled}
                      </span>
                      <span>★ {course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedCourse(course)
                          setActiveTab("course")
                        }}
                      >
                        View Details
                      </Button>
                      <Button size="sm">{course.progress !== undefined ? "Continue" : "Enroll"}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">My Courses</h2>
            <Badge variant="outline">{enrolledCourses.length} enrolled</Badge>
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                  <CardDescription>by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {course.lessons.filter((l) => l.isCompleted).length} of {course.lessons.length} lessons
                        completed
                      </div>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="course" className="h-full p-4">
          {selectedCourse ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-muted-foreground mt-1">{selectedCourse.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span>by {selectedCourse.instructor}</span>
                    <Badge className={getLevelColor(selectedCourse.level)}>{selectedCourse.level}</Badge>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(selectedCourse.duration)}
                    </span>
                  </div>
                </div>
                <Button>{selectedCourse.progress !== undefined ? "Continue" : "Enroll Now"}</Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    {selectedCourse.lessons.length} lessons • {formatDuration(selectedCourse.duration)} total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedCourse.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm">
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(lesson.type)}
                            <span className="font-medium">{lesson.title}</span>
                            {lesson.isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{formatDuration(lesson.duration)}</span>
                          <Button size="sm" variant="ghost">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a course to view details</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
