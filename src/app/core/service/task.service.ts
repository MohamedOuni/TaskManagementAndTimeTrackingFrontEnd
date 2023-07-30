import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5107/api';

  constructor(private http: HttpClient) { }

  getProjectsForTeam(token: string): Observable<Project[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    const url = `${this.baseUrl}/Project/getprojectforteam`;
    return this.http.get<Project[]>(url, { headers });
  }

  createTask(task: Task, projectId: number, token: string): Observable<any> {
    const url = `${this.baseUrl}/Tasks/create/${projectId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.post(url, task, { headers });
  }

  getTasksForCurrentUser(token: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    const url = `${this.baseUrl}/Tasks/TaskUser`;
    return this.http.get<Task[]>(url, { headers });
  }

  updateTask(taskId: number,task: Task, token: string): Observable<any> {
    const url = `${this.baseUrl}/Tasks/${taskId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.put(url, task, { headers });
  }

  getTasksForSupervispr(token: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    const url = `${this.baseUrl}/Tasks/TaskSupervisor`;
    return this.http.get<Task[]>(url, { headers });
  }

  deleteTask(taskId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.delete<any>(`${this.baseUrl}/Tasks/${taskId}`, { headers });
  }

  exportWeeklyReport(weekNumber: number, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
  
    const url = `${this.baseUrl}/Tasks/export/${weekNumber}`;
    return this.http.get<Blob>(url, options);
  }

  exportMonthlyReport(year: number, month: number, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });

    return this.http.get<Blob>(`${this.baseUrl}/Tasks/export/monthly/supervisor/${year}/${month}`, { headers, responseType: 'blob' as 'json' });
  }

}

export class Task {
  id!: number;
  title!: string;
  description!: string;
  workHours!: number;
  projectId!: number;
  timeSpentPerWeek?: any[]; 
}

export class Project {
  id!: number;
  title!: string;
  createdDate!:Date;
}


