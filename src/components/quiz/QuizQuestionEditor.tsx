export interface QuizQuestion { id: string; text: string; order: number; dimensionId?: string; options: Array<{ id: string; text: string; value: number }> }
