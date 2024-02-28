import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
tasks:any


  constructor(
    private formBuilder: FormBuilder,
    private apiService: TodoService
  ) {
  }

  ngOnInit(){
    this.apiService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
      console.log('open', tasks)
    });
  }
}

