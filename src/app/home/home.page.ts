import { Task, Category } from './../models/data.interface';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('categoryScrollContainer')
  categoryScrollContainerRef!: ElementRef<HTMLDivElement>;

  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  selectedCategoryId: number | null = null;

  constructor() {}

  ngOnInit() {
    this.categories = [
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
    ];

    this.tasks = [
      { id: 1, title: 'Comprar leche', completed: false, categoryId: 1 },
      { id: 2, title: 'Terminar informe X', completed: false, categoryId: 2 },
      { id: 3, title: 'Llamar a Juan', completed: true, categoryId: 1 },
      { id: 4, title: 'Estudiar Angular', completed: false, categoryId: 3 },
      { id: 5, title: 'Pagar servicios', completed: false, categoryId: null },
      { id: 6, title: 'Ir al gimnasio', completed: false, categoryId: 5 },
      {
        id: 7,
        title: 'Preparar presentación',
        completed: false,
        categoryId: 2,
      },
      { id: 8, title: 'Visitar a la abuela', completed: false, categoryId: 1 },
      { id: 9, title: 'Comprar bombillas', completed: false, categoryId: 6 },
    ];

    this.filterTasks();
  }

  // Asegúrate de que el DOM esté renderizado antes de intentar acceder a categoryScrollContainerRef
  ngAfterViewInit() {
    // Puedes realizar alguna inicialización o verificación aquí si es necesario
    // Por ejemplo, verificar si los botones de scroll son necesarios al cargar
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
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedCategoryId === null) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.categoryId === this.selectedCategoryId
      );
    }
  }

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.filterTasks();
  }

  isCategorySelected(categoryId: number | null): boolean {
    return this.selectedCategoryId === categoryId;
  }

  scrollCategories(direction: 'left' | 'right') {
    const scrollContainer = this.categoryScrollContainerRef.nativeElement;
    const scrollAmount = 200;

    if (direction === 'left') {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }
}
