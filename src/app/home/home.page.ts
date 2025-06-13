import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Task, Category } from './../models/data.interface';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../services/category.service';
import { CategoriesModalComponent } from '../components/categories-modal/categories-modal.component';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { Subscription } from 'rxjs';

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

  private categoriesSubscription!: Subscription;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.tasks = [
      {
        id: 1,
        title: 'Comprar leche',
        description: 'Leche entera, 1 litro',
        completed: false,
        categoryId: 1,
      },
      {
        id: 2,
        title: 'Terminar informe X',
        description: 'Revisar datos y conclusiones',
        completed: false,
        categoryId: 2,
      },
      {
        id: 3,
        title: 'Llamar a Juan',
        description: 'Preguntar sobre el proyecto',
        completed: true,
        categoryId: 1,
      },
      {
        id: 4,
        title: 'Estudiar Angular',
        description: 'Repasar componentes y servicios',
        completed: false,
        categoryId: 3,
      },
      {
        id: 5,
        title: 'Pagar servicios',
        description: 'Luz y agua',
        completed: false,
        categoryId: null,
      },
      {
        id: 6,
        title: 'Ir al gimnasio',
        description: 'Rutina de brazos',
        completed: false,
        categoryId: 5,
      },
      {
        id: 7,
        title: 'Preparar presentación',
        description: 'Diapositivas y guion',
        completed: false,
        categoryId: 2,
      },
      {
        id: 8,
        title: 'Visitar a la abuela',
        description: 'Llevarle flores',
        completed: false,
        categoryId: 1,
      },
      {
        id: 9,
        title: 'Comprar bombillas',
        description: 'LED, E27',
        completed: false,
        categoryId: 6,
      },
    ];

    this.categoriesSubscription = this.categoryService.categories$.subscribe(
      (categories) => {
        this.categories = categories;
        this.filterTasks();
      }
    );

    this.filterTasks();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  getCategoryName(categoryId: number | null): string {
    if (categoryId === null) {
      return 'Sin categoría';
    }
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.filterTasks();
  }

  addTask(newTask: Task) {
    const newId =
      this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
    newTask.id = newId;
    this.tasks = [...this.tasks, newTask];
    this.filterTasks();
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      const newTasks = [...this.tasks];
      newTasks[index] = updatedTask;
      this.tasks = newTasks;
      this.filterTasks();
    }
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

  async openCategoriesManagementModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('Modal Categories Management cerrado', data, role);

    const currentCategoriesIds = this.categories.map((c) => c.id);
    if (
      this.selectedCategoryId !== null &&
      !currentCategoriesIds.includes(this.selectedCategoryId)
    ) {
      this.selectedCategoryId = null;
    }

    this.tasks = this.tasks.map((task) => {
      if (
        task.categoryId !== null &&
        !currentCategoriesIds.includes(task.categoryId)
      ) {
        return { ...task, categoryId: null };
      }
      return task;
    });

    this.filterTasks();
  }

  async openCreateTaskModal() {
    const modal = await this.modalController.create({
      component: TaskFormModalComponent,
      componentProps: {
        title: 'Crear Nueva Tarea',
        confirmButtonText: 'Crear',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.addTask(data);
    }
  }

  async openEditTaskModal(task: Task) {
    const modal = await this.modalController.create({
      component: TaskFormModalComponent,
      componentProps: {
        task: task,
        title: 'Editar Tarea',
        confirmButtonText: 'Guardar Cambios',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.updateTask(data);
    }
  }
}
