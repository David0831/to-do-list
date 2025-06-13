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
import { Observable, Subscription } from 'rxjs';

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
    private modalController: ModalController, // Inyectar ModalController
    private categoryService: CategoryService // Inyectar CategoryService
  ) {}

  ngOnInit() {
    this.categoriesSubscription = this.categoryService.categories$.subscribe(
      (categories) => {
        this.categories = categories;
      }
    );

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
    // Si necesitas recargar algo al cerrar la modal principal, hazlo aquí
    // Por ejemplo, si se eliminan categorías que ya no deben estar asignadas a tareas.
    // Esto implicaría una lógica más compleja de reasignación o eliminación de categoryId en tareas.
  }
}
