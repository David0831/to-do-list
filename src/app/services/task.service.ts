import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/data.interface';

const TASKS_STORAGE_KEY = 'my_tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks) {
      this._tasks.next(JSON.parse(storedTasks));
    } else {
      this._tasks.next([]);
    }
  }

  private saveTasks() {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(this._tasks.getValue())
    );
  }

  getTasks(): Task[] {
    return this._tasks.getValue();
  }

  addTask(newTask: Task): Task {
    const currentTasks = this._tasks.getValue();
    const newId =
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1;
    newTask.id = newId;
    this._tasks.next([...currentTasks, newTask]);
    this.saveTasks();
    return newTask;
  }

  updateTask(updatedTask: Task): boolean {
    const currentTasks = this._tasks.getValue();
    const index = currentTasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      const newTasks = [...currentTasks];
      newTasks[index] = updatedTask;
      this._tasks.next(newTasks);
      this.saveTasks();
      return true;
    }
    return false;
  }

  deleteTask(id: number): boolean {
    const currentTasks = this._tasks.getValue();
    const initialLength = currentTasks.length;
    const newTasks = currentTasks.filter((task) => task.id !== id);
    this._tasks.next(newTasks);
    this.saveTasks();
    return newTasks.length < initialLength;
  }

  toggleTaskCompleted(task: Task): boolean {
    const currentTasks = this._tasks.getValue();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      const newTasks = [...currentTasks];
      newTasks[index] = { ...task, completed: !task.completed };
      this._tasks.next(newTasks);
      this.saveTasks();
      return true;
    }
    return false;
  }

  updateTasksCategoryIds(existingCategoryIds: number[]) {
    const currentTasks = this._tasks.getValue();
    let tasksChanged = false;
    const updatedTasks = currentTasks.map((task) => {
      if (
        task.categoryId !== null &&
        !existingCategoryIds.includes(task.categoryId)
      ) {
        tasksChanged = true;
        return { ...task, categoryId: null };
      }
      return task;
    });

    if (tasksChanged) {
      this._tasks.next(updatedTasks);
      this.saveTasks();
    }
  }
}
