import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task, Category } from './../models/data.interface';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';
import { CategoriesModalComponent } from '../components/categories-modal/categories-modal.component';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { FeatureFlagService } from '../services/feature-flag.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categoryScrollContainer')
  categoryScrollContainerRef!: ElementRef<HTMLDivElement>;

  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  selectedCategoryId: number | null = null;
  selectedDayOfWeek: string | null = 'Todos';

  private combinedSubscription!: Subscription;

  showCategories$: Observable<boolean> = new Observable<boolean>();

  daysOfWeek = [
    'Todos',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private featureFlagService: FeatureFlagService
  ) {}

  ngOnInit() {
    this.combinedSubscription = combineLatest([
      this.taskService.tasks$,
      this.categoryService.categories$,
    ]).subscribe(([tasks, categories]) => {
      this.tasks = tasks;
      this.categories = categories;
      this.filterTasks();
    });

    this.showCategories$ = this.featureFlagService.getFeatureFlag(0);

    this.filterTasks();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  getCategoryName(categoryId: number | null): string {
    if (categoryId === null) {
      return 'Sin categoría';
    }
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }

  toggleTaskCompleted(task: Task) {
    this.taskService.toggleTaskCompleted(task);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  filterTasks() {
    let filtered = this.tasks;

    // Filtro por categoría
    if (this.selectedCategoryId !== null) {
      filtered = filtered.filter(
        (task) => task.categoryId === this.selectedCategoryId
      );
    }

    // Filtro por día de la semana
    if (this.selectedDayOfWeek !== null && this.selectedDayOfWeek !== 'Todos') {
      filtered = filtered.filter(
        (task) => task.dayOfWeek === this.selectedDayOfWeek
      );
    }

    this.filteredTasks = filtered;
  }

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.filterTasks();
  }

  selectDayOfWeek(day: string | null) {
    this.selectedDayOfWeek = day;
    this.filterTasks();
  }

  isCategorySelected(categoryId: number | null): boolean {
    return this.selectedCategoryId === categoryId;
  }

  isDayOfWeekSelected(day: string | null): boolean {
    return this.selectedDayOfWeek === day;
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

    const currentCategoriesIds = this.categoryService
      .getCategories()
      .map((c) => c.id);
    this.taskService.updateTasksCategoryIds(currentCategoriesIds);

    if (
      this.selectedCategoryId !== null &&
      !currentCategoriesIds.includes(this.selectedCategoryId)
    ) {
      this.selectedCategoryId = null;
    }

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
      this.taskService.addTask(data);
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
      this.taskService.updateTask(data);
    }
  }
}
