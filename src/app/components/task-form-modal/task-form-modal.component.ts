import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, Category } from 'src/app/models/data.interface';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormModalComponent implements OnInit {
  @Input() task: Task | undefined;
  @Input() title: string = 'Crear Nueva Tarea';
  @Input() confirmButtonText: string = 'Crear';

  taskForm!: FormGroup;
  categories$!: Observable<Category[]>;

  daysOfWeek = [
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
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;

    this.taskForm = new FormGroup({
      title: new FormControl(
        this.task ? this.task.title : '',
        Validators.required
      ),
      description: new FormControl(this.task ? this.task.description : ''),
      categoryId: new FormControl(this.task ? this.task.categoryId : null),
      dayOfWeek: new FormControl(this.task ? this.task.dayOfWeek : null),
    });
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  onConfirm() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const result: Task = {
        id: this.task ? this.task.id : 0,
        title: formValue.title,
        description: formValue.description,
        completed: this.task ? this.task.completed : false,
        categoryId: formValue.categoryId === '' ? null : formValue.categoryId,
        dayOfWeek: formValue.dayOfWeek === '' ? null : formValue.dayOfWeek,
      };
      this.modalController.dismiss(result, 'confirm');
    }
  }
}
