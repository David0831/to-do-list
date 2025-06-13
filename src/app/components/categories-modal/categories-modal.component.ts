import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/data.interface';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
  standalone: false,
})
export class CategoriesModalComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
  }

  async closeCategoriesModal() {
    await this.modalController.dismiss(null, 'close');
  }

  async openCreateCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        title: 'Crear Nueva Categoría',
        confirmButtonText: 'Crear',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.categoryService.addCategory(data.name);
    }
  }

  async openEditCategoryModal(category: Category) {
    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        category: category,
        title: 'Editar Categoría',
        confirmButtonText: 'Guardar',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.categoryService.updateCategory({ id: category.id, name: data.name });
    }
  }

  async deleteCategory(categoryId: number) {
    const confirmed = confirm(
      '¿Estás seguro de que quieres eliminar esta categoría?'
    );
    if (confirmed) {
      this.categoryService.deleteCategory(categoryId);
    }
  }
}
