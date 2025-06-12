import { Task, Category } from './../models/data.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];

  constructor() {}

  ngOnInit() {
    this.categories = [
      { id: 1, name: 'Personal' },
      { id: 2, name: 'Trabajo' },
      { id: 3, name: 'Estudios' },
    ];

    this.tasks = [
      { id: 1, title: 'Comprar leche', completed: false, categoryId: 1 },
      { id: 2, title: 'Terminar informe X', completed: false, categoryId: 2 },
      { id: 3, title: 'Llamar a Juan', completed: true, categoryId: 1 },
      { id: 4, title: 'Estudiar Angular', completed: false, categoryId: 3 },
      { id: 5, title: 'Pagar servicios', completed: false, categoryId: null },
    ];
  }

  getCategoryName(categoryId: number | null): string {
    if (categoryId === null) {
      return 'Sin categoría';
    }
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Desconocida';
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
