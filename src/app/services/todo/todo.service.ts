import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addTask(taskData: any): Observable<any[]>  {
    return this.http.post<any>(`${this.apiUrl}/api/tasks`, taskData);
  }
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/tasks`);
  }
  getTask(taskId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/tasks/${taskId}`);
  }
  updateTask(taskId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/tasks/${taskId}`,
      updatedData
    );
  }
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/tasks/${taskId}`);
  }

}