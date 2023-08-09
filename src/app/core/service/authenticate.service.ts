import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5107/api/Authenticate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','responseType': 'text' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {



  constructor(private http: HttpClient) { }
 


  login(UserName: string, PasswordHash: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'Login',
      {
        UserName,
        PasswordHash,
      },
      httpOptions
    );
    }

  
  register(Name: string, Email: string, UserName: string, PasswordHash: string, Team: Team, Role: Role): Observable<any> {
    return this.http.post(
        AUTH_API + 'Register',
        {
            Name,
            Email,
            UserName,
            PasswordHash,
            Team,
            Role
        },
        httpOptions
    );
}

}

export enum Team {
  DET = 0,
  DATA = 1,
  RPA = 2
}

export enum Role {
  Employee = 0,
  Supervisor = 1
}