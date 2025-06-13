export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  categoryId: number | null;
}
