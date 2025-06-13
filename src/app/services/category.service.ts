import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/data.interface';

const CATEGORIES_STORAGE_KEY = 'my_categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = new BehaviorSubject<Category[]>([]);

  readonly categories$: Observable<Category[]> =
    this._categories.asObservable();

  constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (storedCategories) {
      this._categories.next(JSON.parse(storedCategories));
    } else {
      this._categories.next([]);
    }
  }

  private saveCategories() {
    localStorage.setItem(
      CATEGORIES_STORAGE_KEY,
      JSON.stringify(this._categories.getValue())
    );
  }

  getCategories(): Category[] {
    return this._categories.getValue();
  }

  addCategory(categoryName: string): Category {
    const currentCategories = this._categories.getValue();
    const newId =
      currentCategories.length > 0
        ? Math.max(...currentCategories.map((c) => c.id)) + 1
        : 1;
    const newCategory: Category = { id: newId, name: categoryName };
    this._categories.next([...currentCategories, newCategory]);
    this.saveCategories();
    return newCategory;
  }

  updateCategory(updatedCategory: Category): boolean {
    const currentCategories = this._categories.getValue();
    const index = currentCategories.findIndex(
      (c) => c.id === updatedCategory.id
    );
    if (index > -1) {
      const newCategories = [...currentCategories];
      newCategories[index] = updatedCategory;
      this._categories.next(newCategories);
      this.saveCategories();
      return true;
    }
    return false;
  }

  deleteCategory(categoryId: number): boolean {
    const currentCategories = this._categories.getValue();
    const initialLength = currentCategories.length;
    const newCategories = currentCategories.filter((c) => c.id !== categoryId);
    this._categories.next(newCategories);
    this.saveCategories();
    return newCategories.length < initialLength;
  }
}
