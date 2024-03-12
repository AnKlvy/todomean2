import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from '../../services/todo/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: any;
  taskForm!: FormGroup; // Добавляем восклицательный знак для указания на то, что это свойство будет определено позже

  constructor(
    private formBuilder: FormBuilder,
    private apiService: TodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });

    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
      // console.log('open', tasks);
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.apiService.addTask(taskData).subscribe(() => {
        console.log('Задача добавлена');
        this.loadTasks(); // Reload tasks after adding a new one
        this.taskForm.reset(); // Reset form after submission
      }, (error: any) => {
        console.error('Ошибка при добавлении задачи', error);
      });
    }
  }

  onDelete(taskId: string) {
    this.apiService.deleteTask(taskId).subscribe(() => {
      console.log('Задача удалена');
      this.loadTasks(); // Reload tasks after deleting one
    }, (error: any) => {
      console.error('Ошибка при удалении задачи', error);
    });
  }

  openEditDialog(task: any): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '250px',
      data: { task, taskId: task._id } // Передаем идентификатор задачи вместе с данными задачи
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Обработка данных, возвращаемых из диалогового окна (например, обновление элемента в списке)
    });

    
}
}
