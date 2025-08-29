/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from './apiClient';
import type { 
  Quiz, 
  QuizResult, 
  QuizAnalytics
} from '@/data/quizzes';

// API types that are not exported from quizzes data
export interface CreateQuizBasicData {
  title: string;
  subtitle?: string;
  description: string;
  coverImage?: string;
  quizType: 'DEFAULT' | 'COMPLEX' | 'ONBOARDING';
  redirectAfterAnswer: 'HOME' | 'RESULTS';
  category: string;
  estimatedTime: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  isPublic: boolean;
  tags: string[];
}

export interface CreateQuizData extends CreateQuizBasicData {
  questions: Array<{
    text: string;
    order: number;
    dimensionId?: string;
    options: Array<{
      text: string;
      value: number;
      order: number;
    }>;
  }>;
  gradingCriteria?: Array<{
    name: string;
    minScore: number;
    maxScore: number;
    label: string;
    color: string;
    recommendations: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
    proposedBlogPosts: Array<{ id: string; title: string; slug: string }>;
    description?: string;
  }>;
  dimensions?: Array<{
    name: string;
    shortName: string;
    order: number;
    minScore: number;
    maxScore: number;
    threshold?: number;
    lowLabel?: string;
    highLabel?: string;
  }>;
  complexGradingCriteria?: Array<{
    name: string;
    label: string;
    color: string;
    recommendations: string[];
    areasOfImprovement: string[];
    supportNeeded: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
    proposedBlogPosts: Array<{ id: string; title: string; slug: string }>;
    description?: string;
    scoringLogic: {
      type: 'threshold' | 'highest' | 'topN';
      dimensions?: Array<{ name: string; value?: string; threshold?: number }>;
      dimension?: string;
      minScore?: number;
      maxScore?: number;
      n?: number;
    };
  }>;
}

export type UpdateQuizData = Partial<CreateQuizData>;

export interface QuizQuery {
  search?: string
  category?: string
  status?: string
  isPublic?: boolean
  createdBy?: string
  tags?: string[]
  quizType?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'totalAttempts' | 'averageScore'
  sortOrder?: 'asc' | 'desc'
}

export interface QuizResultQuery {
  quizId?: string;
  userId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface QuizSubmission {
  quizId: string;
  answers: Array<{
    questionId: string;
    optionId: string;
  }>;
  timeSpent: number;
}

// Backend data interfaces
interface BackendQuiz {
  id: string;
  quizType?: string;
  coverImage?: string;
  redirectAfterAnswer?: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  estimatedTime: string;
  difficulty?: string;
  status?: string;
  isPublic: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  totalAttempts?: number;
  completedAttempts?: number;
  averageScore?: number;
  averageCompletionTime?: number;
  tags?: string[];
  createdByUser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  questions?: Array<{
    id: string;
    text: string;
    dimensionId?: string;
    options?: Array<{
      id: string;
      text: string;
      value: number;
    }>;
  }>;
  gradingCriteria?: Array<{
    id: string;
    name: string;
    minScore: number;
    maxScore: number;
    label: string;
    color: string;
    recommendations?: string[];
    areasOfImprovement?: string[];
    supportNeeded?: string[];
    proposedCourses?: Array<{ id: string; name: string; slug: string }>;
    proposedProducts?: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks?: Array<{ id: string; name: string; slug: string }>;
    proposedBlogPosts?: Array<{ id: string; title: string; slug: string }>;
    description?: string;
  }>;
  complexGradingCriteria?: Array<{
    id: string;
    name: string;
    label: string;
    color: string;
    recommendations: string[];
    areasOfImprovement: string[];
    supportNeeded: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
    proposedBlogPosts: Array<{ id: string; title: string; slug: string }>;
    description?: string;
    scoringLogic: {
      type: 'threshold' | 'highest' | 'topN';
      dimensions?: Array<{ name: string; value?: string; threshold?: number }>;
      dimension?: string;
      minScore?: number;
      maxScore?: number;
      n?: number;
    };
  }>;
  dimensions?: Array<{
    id: string;
    name: string;
    shortName: string;
    order: number;
    minScore: number;
    maxScore: number;
    threshold?: number;
    lowLabel?: string;
    highLabel?: string;
  }>;
}

interface BackendQuizResult {
  id: string;
  quizId: string;
  userId: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  score: number;
  maxScore: number;
  percentage: number;
  level?: string;
  feedback?: string;
  recommendations?: string[];
  completedAt: string;
  timeSpent?: number;
  answers?: Record<string, string> | Array<{ questionId: string; optionId: string }>;
  classification?: string;
  areasOfImprovement?: string[];
  supportNeeded?: string[];
  color?: string;
  proposedCourses?: Array<{ id: string; name: string; slug: string }>;
  proposedProducts?: Array<{ id: string; name: string; slug: string }>;
  proposedStreaks?: Array<{ id: string; name: string; slug: string }>;
  proposedBlogPosts?: Array<{ id: string; title: string; slug: string }>;
}

interface BackendQuizAnalytics {
  totalAttempts?: number;
  completedAttempts?: number;
  completionRate?: number;
  averageScore?: number;
  averageTimeSpent?: number;
  levelDistribution?: {
    excellent?: number;
    good?: number;
    fair?: number;
    needsImprovement?: number;
  };
  dropoffPoints?: Array<{
    questionNumber: number;
    dropoffCount: number;
    dropoffRate: number;
  }>;
  popularClassifications?: Array<{
    classification: string;
    count: number;
    percentage: number;
  }>;
  timeDistribution?: {
    fast?: number;
    normal?: number;
    slow?: number;
  };
}

// Quiz API Integration
export class QuizAPI {
  private static instance: QuizAPI;
  private baseURL = '/api/quizzes';

  private constructor() {}

  static getInstance(): QuizAPI {
    if (!QuizAPI.instance) {
      QuizAPI.instance = new QuizAPI();
    }
    return QuizAPI.instance;
  }

  // Public Quiz Endpoints
  async getPublicQuizzes(query?: Partial<QuizQuery>): Promise<{ 
    quizzes: Quiz[]; 
    total: number; 
    page: number; 
    totalPages: number;
    categories: string[];
  }> {
    try {
      const response = await apiClient.get<{ 
        data: { 
          quizzes: Quiz[]; 
          total: number; 
          page: number; 
          totalPages: number;
          categories: string[];
        } 
      }>(`${this.baseURL}/public/quizzes`, { params: query });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getPublicQuizById(id: string): Promise<Quiz> {
    try {
      const response = await apiClient.get<{ data: Quiz }>(`${this.baseURL}/public/quizzes/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getOnboardingQuiz(): Promise<Quiz> {
    try {
      const response = await apiClient.get<{ data: Quiz }>(`${this.baseURL}/public/onboarding`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getQuizCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<{ data: string[] }>(`${this.baseURL}/categories`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getQuizDifficulties(): Promise<Array<{ value: string; label: string }>> {
    try {
      const response = await apiClient.get<{ data: Array<{ value: string; label: string }> }>(`${this.baseURL}/difficulties`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  // Protected Quiz Endpoints (require authentication)
  async getQuizzes(query?: Partial<QuizQuery>): Promise<{ quizzes: Quiz[]; total: number; page: number; totalPages: number }> {
    try {
      const response = await apiClient.get<{ data: { quizzes: Quiz[]; total: number; page: number; totalPages: number } }>(`${this.baseURL}/quizzes`, { params: query });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getQuizById(id: string): Promise<Quiz> {
    try {
      const response = await apiClient.get<{ data: Quiz }>(`${this.baseURL}/quizzes/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async createQuiz(data: CreateQuizData): Promise<Quiz> {
    try {
      const response = await apiClient.post<{ data: Quiz }>(`${this.baseURL}/quizzes`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async updateQuiz(id: string, data: UpdateQuizData): Promise<Quiz> {
    try {
      const response = await apiClient.put<{ data: Quiz }>(`${this.baseURL}/quizzes/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async deleteQuiz(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseURL}/quizzes/${id}`);
    } catch (error: any) {
      throw error.response.data;
    }
  }

  // Progressive Quiz Creation Methods
  async createQuizBasic(data: CreateQuizBasicData): Promise<Quiz> {
    const response = await apiClient.post('/quizzes/basic', data);
    return (response as any).data.data;
  }

  async addQuizDimensions(quizId: string, dimensions: any[]): Promise<Quiz> {
    const response = await apiClient.put(`/quizzes/${quizId}/dimensions`, { dimensions });
    return (response as any).data.data;
  }

  async addQuizQuestions(quizId: string, questions: any[]): Promise<Quiz> {
    const response = await apiClient.put(`/quizzes/${quizId}/questions`, { questions });
    return (response as any).data.data;
  }

  async addQuizGradingCriteria(quizId: string, gradingData: any): Promise<Quiz> {
    const response = await apiClient.put(`/quizzes/${quizId}/grading`, gradingData);
    return (response as any).data.data;
  }

  // Progressive Quiz Creation - Complete Flow
  async createQuizProgressive(data: CreateQuizData): Promise<Quiz> {
    // Step 1: Create basic quiz
    const basicData: CreateQuizBasicData = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      coverImage: data.coverImage,
      quizType: data.quizType,
      redirectAfterAnswer: data.redirectAfterAnswer,
      category: data.category,
      estimatedTime: data.estimatedTime,
      difficulty: data.difficulty,
      status: 'DRAFT' as const,
      isPublic: data.isPublic,
      tags: data.tags
    };

    const quiz = await this.createQuizBasic(basicData);

    // Step 2: Add dimensions if complex quiz
    if (data.quizType === 'COMPLEX' && data.dimensions && data.dimensions.length > 0) {
      await this.addQuizDimensions(quiz.id, data.dimensions);
    }

    // Step 3: Add questions
    if (data.questions && data.questions.length > 0) {
      await this.addQuizQuestions(quiz.id, data.questions);
    }

    // Step 4: Add grading criteria
    if (data.quizType === 'COMPLEX' && data.complexGradingCriteria && data.complexGradingCriteria.length > 0) {
      await this.addQuizGradingCriteria(quiz.id, { complexGradingCriteria: data.complexGradingCriteria });
    } else if (data.gradingCriteria && data.gradingCriteria.length > 0) {
      await this.addQuizGradingCriteria(quiz.id, { gradingCriteria: data.gradingCriteria });
    }

    // Return the complete quiz
    return this.getQuizById(quiz.id);
  }

  // Quiz Results
  async submitQuiz(quizId: string, submission: QuizSubmission): Promise<QuizResult> {
    try {
      const response = await apiClient.post<{ data: QuizResult }>(`${this.baseURL}/results`, submission);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getQuizResults(query?: Partial<QuizResultQuery>): Promise<{ results: QuizResult[]; total: number; page: number; totalPages: number }> {
    try {
      const response = await apiClient.get<{ data: { results: QuizResult[]; total: number; page: number; totalPages: number } }>(`${this.baseURL}/results`, { params: query });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getQuizResultById(resultId: string): Promise<QuizResult> {
    try {
      const response = await apiClient.get<{ data: QuizResult }>(`${this.baseURL}/results/${resultId}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async getUserQuizResults(page: number = 1, limit: number = 10): Promise<{ results: QuizResult[]; total: number; page: number; totalPages: number }> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await apiClient.get<{ data: { results: QuizResult[]; total: number; page: number; totalPages: number } }>(`${this.baseURL}/results/user?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  // Quiz Analytics
  async getQuizAnalytics(quizId: string): Promise<QuizAnalytics> {
    try {
      const response = await apiClient.get<{ data: QuizAnalytics }>(`${this.baseURL}/quizzes/${quizId}/analytics`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}

// Export singleton instance
export const quizAPI = QuizAPI.getInstance();

// Helper functions for data transformation
export function transformBackendQuiz(backendQuiz: BackendQuiz): Quiz {
  return {
    id: backendQuiz.id,
    quizType: (backendQuiz.quizType?.toUpperCase() as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING') || 'DEFAULT',
    redirectAfterAnswer: (backendQuiz.redirectAfterAnswer?.toUpperCase() as 'HOME' | 'RESULTS') || 'HOME',
    title: backendQuiz.title,
    subtitle: backendQuiz.subtitle || '',
    description: backendQuiz.description,
    coverImage: backendQuiz.coverImage || undefined,
    category: backendQuiz.category,
    estimatedTime: backendQuiz.estimatedTime,
    difficulty: (backendQuiz.difficulty?.toUpperCase() as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') || 'BEGINNER',
    status: (backendQuiz.status?.toUpperCase() as 'DRAFT' | 'ACTIVE' | 'ARCHIVED') || 'DRAFT',
    isPublic: backendQuiz.isPublic,
    createdBy: backendQuiz.createdBy || 'system',
    updatedBy: backendQuiz.updatedBy || 'system',
    createdByUser: backendQuiz.createdByUser || {
      id: 'system',
      firstName: 'System',
      lastName: 'User',
      email: 'system@example.com'
    },
    createdAt: backendQuiz.createdAt,
    updatedAt: backendQuiz.updatedAt,
    totalAttempts: backendQuiz.totalAttempts || 0,
    completedAttempts: backendQuiz.completedAttempts || 0,
    averageScore: backendQuiz.averageScore || 0,
    averageCompletionTime: backendQuiz.averageCompletionTime || 0,
    tags: backendQuiz.tags || [],
    questions: backendQuiz.questions?.map((q) => ({
      id: q.id,
      text: q.text,
      dimensionId: q.dimensionId || undefined,
      options: q.options?.map((opt) => ({
        id: opt.id,
        text: opt.text,
        value: opt.value
      })) || []
    })) || [],
    gradingCriteria: backendQuiz.gradingCriteria?.map((gc) => ({
      id: gc.id,
      name: gc.name,
      minScore: gc.minScore,
      maxScore: gc.maxScore,
      label: gc.label,
      color: gc.color,
      recommendations: gc.recommendations || [],
      areasOfImprovement: gc.areasOfImprovement || [],
      supportNeeded: gc.supportNeeded || [],
      proposedCourses: gc.proposedCourses || [],
      proposedProducts: gc.proposedProducts || [],
      proposedStreaks: gc.proposedStreaks || [],
      proposedBlogPosts: gc.proposedBlogPosts || [],
      description: gc.description
    })) || [],
    complexGradingCriteria: backendQuiz.complexGradingCriteria || [],
    dimensions: backendQuiz.dimensions || []
  };
}

export function transformBackendQuizResult(backendResult: BackendQuizResult): QuizResult {
  return {
    id: backendResult.id,
    quizId: backendResult.quizId,
    userId: backendResult.userId,
    userName: backendResult.user?.firstName && backendResult.user?.lastName 
      ? `${backendResult.user.firstName} ${backendResult.user.lastName}`
      : 'Anonymous User',
    userEmail: backendResult.user?.email || 'anonymous@example.com',
    score: backendResult.score,
    maxScore: backendResult.maxScore,
    percentage: backendResult.percentage,
    level: (backendResult.level?.toLowerCase() as 'excellent' | 'good' | 'fair' | 'needs-improvement') || 'fair',
    feedback: backendResult.feedback || '',
    recommendations: backendResult.recommendations || [],
    completedAt: backendResult.completedAt,
    timeSpent: backendResult.timeSpent || 0,
    answers: backendResult.answers || {},
    classification: backendResult.classification || 'Unknown',
    areasOfImprovement: backendResult.areasOfImprovement || [],
    supportNeeded: backendResult.supportNeeded || [],
    color: backendResult.color,
    proposedCourses: backendResult.proposedCourses || [],
    proposedProducts: backendResult.proposedProducts || [],
    proposedStreaks: backendResult.proposedStreaks || [],
    proposedBlogPosts: backendResult.proposedBlogPosts || []
  };
}

export function transformBackendQuizAnalytics(backendAnalytics: BackendQuizAnalytics): QuizAnalytics {
  return {
    totalAttempts: backendAnalytics.totalAttempts || 0,
    completedAttempts: backendAnalytics.completedAttempts || 0,
    completionRate: backendAnalytics.completionRate || 0,
    averageScore: backendAnalytics.averageScore || 0,
    averageTimeSpent: backendAnalytics.averageTimeSpent || 0,
    levelDistribution: {
      excellent: backendAnalytics.levelDistribution?.excellent || 0,
      good: backendAnalytics.levelDistribution?.good || 0,
      fair: backendAnalytics.levelDistribution?.fair || 0,
      needsImprovement: backendAnalytics.levelDistribution?.needsImprovement || 0
    },
    dropoffPoints: backendAnalytics.dropoffPoints || [],
    popularClassifications: backendAnalytics.popularClassifications || [],
    timeDistribution: {
      fast: backendAnalytics.timeDistribution?.fast || 0,
      normal: backendAnalytics.timeDistribution?.normal || 0,
      slow: backendAnalytics.timeDistribution?.slow || 0
    }
  };
}

// Export types for external use
export type { 
  Quiz, 
  QuizResult, 
  QuizAnalytics
} from '@/data/quizzes';

