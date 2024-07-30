export interface Space {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  estimatedDuration: number;
  dueDate: Date;
  startDate?: Date;
}