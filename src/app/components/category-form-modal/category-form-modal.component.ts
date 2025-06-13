import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/data.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
  standalone: false,
})
export class CategoryFormModalComponent implements OnInit {
  @Input() category: Category | undefined;
  @Input() title: string = 'Nueva Categoría';
  @Input() confirmButtonText: string = 'Crear';

  categoryForm!: FormGroup;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(
        this.category ? this.category.name : '',
        Validators.required
      ),
    });
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  onConfirm() {
    if (this.categoryForm.valid) {
      const newName = this.categoryForm.get('name')?.value;
      this.modalController.dismiss(
        {
          id: this.category?.id,
          name: newName,
        },
        'confirm'
      );
    }
  }
}
