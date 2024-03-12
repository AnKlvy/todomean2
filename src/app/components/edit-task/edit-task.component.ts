import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    this.editForm = this.formBuilder.group({
      title: [data.task.title, Validators.required],
      description: [data.task.description, Validators.required]
    });
  }



  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const taskId = this.data.taskId; // Получаем идентификатор задачи из входных данных
      const updatedData = this.editForm.value;
      this.todoService.updateTask(taskId, updatedData).subscribe(
        () => {
          console.log('Задача обновлена');
        },
        (error: any) => {
          console.error('Ошибка при обновлении задачи:', error);
        }
      );
      this.dialogRef.close(updatedData);
    }
  }
  
}
