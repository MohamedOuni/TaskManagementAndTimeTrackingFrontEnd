import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5107/api/Project'; 

  constructor(private http: HttpClient) {}

  createProject(project: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token 
    });

    return this.http.post<any>(`${this.apiUrl}/create`, project, { headers });
  }

 
  getProjectsForUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });

    return this.http.get<any>(`${this.apiUrl}/projectsForUser`, { headers });
  }

  deleteProject(projectId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
  
    return this.http.delete<any>(`${this.apiUrl}/${projectId}`, { headers });
  }
  
  updateProject(projectId: number, updatedProject: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(`${this.apiUrl}/${projectId}`, updatedProject, { headers }).pipe(
      catchError((error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour du projet :', error);
        throw error; 
      })
    );
  }

}
