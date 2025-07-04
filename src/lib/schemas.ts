import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(300, "Excerpt must be less than 300 characters").optional(),
  status: z.enum(["draft", "published", "archived"]),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  seo: z
    .object({
      metaTitle: z.string().max(60, "Meta title must be less than 60 characters").optional(),
      metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
      altText: z.string().optional(),
      caption: z.string().optional(),
    })
    .optional(),
})

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().min(1, "Description is required"),
  fullDescription: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "All Levels"]),
  duration: z.string().min(1, "Duration is required"),
  thumbnail: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  sale: z.boolean().optional(),
  salePrice: z.number().min(0, "Sale price must be positive").optional(),
  status: z.enum(["draft", "published", "archived"]),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
  popular: z.boolean().optional(),
  certification: z.boolean().optional(),
  requirements: z.array(z.string()).optional(),
  instructor: z.object({
    id: z.number(),
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    avatar: z.string(),
    rating: z.number(),
    students: z.number(),
    courses: z.number(),
  }),
  seo: z
    .object({
      metaTitle: z.string().max(60, "Meta title must be less than 60 characters").optional(),
      metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
      altText: z.string().optional(),
      caption: z.string().optional(),
    })
    .optional(),
})

export const moduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  order: z.number().min(1),
  lessons: z
    .array(
      z.object({
        title: z.string().min(1, "Lesson title is required"),
        content: z.string().min(1, "Lesson content is required"),
        videoUrl: z.string().url("Must be a valid URL").optional(),
        duration: z.number().min(1, "Duration must be at least 1 minute"),
        order: z.number().min(1),
      }),
    )
    .optional(),
})

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        type: z.enum(["multiple-choice", "true-false", "short-answer"]),
        options: z.array(z.string()).optional(),
        correctAnswer: z.string().min(1, "Correct answer is required"),
        explanation: z.string().optional(),
      }),
    )
    .min(1, "At least one question is required"),
  timeLimit: z.number().min(1, "Time limit must be at least 1 minute").optional(),
  passingScore: z.number().min(0).max(100, "Passing score must be between 0 and 100"),
})

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "editor", "viewer"]),
  avatar: z.string().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  color: z.string().optional(),
})

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  color: z.string().optional(),
}) 