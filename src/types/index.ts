
export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  quizId: string;
  score: number;
  completedAt: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  quizId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
  completedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
