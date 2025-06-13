import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/data.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = new BehaviorSubject<Category[]>([
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Trabajo' },
    { id: 3, name: 'Estudios' },
    { id: 4, name: 'Compras' },
    { id: 5, name: 'Salud' },
    { id: 6, name: 'Hogar' },
    { id: 7, name: 'Finanzas' },
    { id: 8, name: 'Social' },
    { id: 9, name: 'Deportes' },
    { id: 10, name: 'Ocio' },
  ]);

  readonly categories$: Observable<Category[]> =
    this._categories.asObservable();

  constructor() {}

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
      return true;
    }
    return false;
  }

  deleteCategory(categoryId: number): boolean {
    const currentCategories = this._categories.getValue();
    const initialLength = currentCategories.length;
    const newCategories = currentCategories.filter((c) => c.id !== categoryId);
    this._categories.next(newCategories);
    return newCategories.length < initialLength;
  }
}
