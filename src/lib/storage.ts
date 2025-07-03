import type { Course, BlogPost, User, Category, Tag, Notification, Quiz } from "./types"

interface StorageData {
  courses: Course[]
  blogPosts: BlogPost[]
  users: User[]
  categories: Category[]
  tags: Tag[]
  notifications: Notification[]
  quizzes: Quiz[]
}

class LocalStorage {
  private storageKey = "dashboard-data"

  private getStorageData(): StorageData {
    if (typeof window === "undefined") {
      return this.getDefaultData()
    }

    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) {
        const defaultData = this.getDefaultData()
        this.setStorageData(defaultData)
        return defaultData
      }
      return JSON.parse(data)
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return this.getDefaultData()
    }
  }

  private setStorageData(data: StorageData): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }

  private getDefaultData(): StorageData {
    return {
      courses: [
        {
          id: "1",
          title: "Complete Web Development Bootcamp",
          slug: "complete-web-development-bootcamp",
          description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.",
          thumbnail: "/placeholder.svg?height=200&width=300",
          price: 99.99,
          status: "published",
          category: "Web Development",
          duration: 2400,
          instructor: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            createdAt: new Date(),
            isActive: true,
          },
          modules: [],
          quizzes: [],
          notes: [],
          tasks: [],
          students: [],
          seo: {
            metaTitle: "Complete Web Development Bootcamp",
            metaDescription: "Master web development with our comprehensive bootcamp course",
            altText: "Web development course thumbnail",
            caption: "Complete Web Development Bootcamp",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      blogPosts: [],
      users: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          createdAt: new Date(),
          isActive: true,
        },
      ],
      categories: [
        {
          id: "1",
          name: "Web Development",
          slug: "web-development",
          description: "Everything related to web development",
          color: "#3b82f6",
          postCount: 0,
          courseCount: 1,
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Mobile Development",
          slug: "mobile-development",
          description: "Mobile app development tutorials and courses",
          color: "#10b981",
          postCount: 0,
          courseCount: 0,
          createdAt: new Date(),
        },
      ],
      tags: [],
      notifications: [
        {
          id: "1",
          title: "Welcome to Tiny Steps A Day",
          message: "Your dashboard is ready! Start creating amazing content.",
          type: "info",
          read: false,  
          createdAt: new Date(),
          actionUrl: "/",
          userId: "1",
        },
        {
          id: "2",
          title: "Course Published",
          message: "Your course 'Complete Web Development Bootcamp' has been published successfully.",
          type: "success",
          read: false,
          createdAt: new Date(),
          actionUrl: "/courses/1",
          userId: "1",
        },
      ],
      quizzes: [],
    }
  }

  // Course methods
  getCourses(): Course[] {
    const data = this.getStorageData()
    return data.courses.map((course) => ({
      ...course,
      createdAt: new Date(course.createdAt),
      updatedAt: new Date(course.updatedAt),
    }))
  }

  getCourse(id: string): Course | null {
    const courses = this.getCourses()
    return courses.find((course) => course.id === id) || null
  }

  createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
    const data = this.getStorageData()
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    data.courses.push(newCourse)
    this.setStorageData(data)
    return newCourse
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const data = this.getStorageData()
    const courseIndex = data.courses.findIndex((course) => course.id === id)
    if (courseIndex === -1) return null

    data.courses[courseIndex] = {
      ...data.courses[courseIndex],
      ...updates,
      updatedAt: new Date(),
    }
    this.setStorageData(data)
    return data.courses[courseIndex]
  }

  deleteCourse(id: string): boolean {
    const data = this.getStorageData()
    const initialLength = data.courses.length
    data.courses = data.courses.filter((course) => course.id !== id)
    this.setStorageData(data)
    return data.courses.length < initialLength
  }

  // Category methods
  getCategories(): Category[] {
    const data = this.getStorageData()
    return data.categories
  }

  createCategory(categoryData: Omit<Category, "id">): Category {
    const data = this.getStorageData()
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    }
    data.categories.push(newCategory)
    this.setStorageData(data)
    return newCategory
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const data = this.getStorageData()
    const categoryIndex = data.categories.findIndex((cat) => cat.id === id)
    if (categoryIndex === -1) return null

    data.categories[categoryIndex] = {
      ...data.categories[categoryIndex],
      ...updates,
    }
    this.setStorageData(data)
    return data.categories[categoryIndex]
  }

  deleteCategory(id: string): boolean {
    const data = this.getStorageData()
    const initialLength = data.categories.length
    data.categories = data.categories.filter((cat) => cat.id !== id)
    this.setStorageData(data)
    return data.categories.length < initialLength
  }

  // Notification methods
  getNotifications(): Notification[] {
    const data = this.getStorageData()
    return data.notifications
      .map((notification) => ({
        ...notification,
        createdAt: new Date(notification.createdAt),
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getNotification(id: string): Notification | null {
    const notifications = this.getNotifications()
    return notifications.find((notification) => notification.id === id) || null
  }

  markNotificationAsRead(id: string): boolean {
    const data = this.getStorageData()
    const notificationIndex = data.notifications.findIndex((n) => n.id === id)
    if (notificationIndex === -1) return false

    data.notifications[notificationIndex].read = true
    this.setStorageData(data)
    return true
  }

  createNotification(notificationData: Omit<Notification, "id" | "createdAt">): Notification {
    const data = this.getStorageData()
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    data.notifications.unshift(newNotification)
    this.setStorageData(data)
    return newNotification
  }

  // User methods
  getUsers(): User[] {
    const data = this.getStorageData()
    return data.users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt),
    }))
  }

  getUser(id: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.id === id) || null
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const data = this.getStorageData()
    const userIndex = data.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    data.users[userIndex] = {
      ...data.users[userIndex],
      ...updates,
    }
    this.setStorageData(data)
    return data.users[userIndex]
  }
}

export const storage = new LocalStorage() 