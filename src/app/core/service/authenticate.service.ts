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
  register(Name: string, Email: string, UserName: string, PasswordHash: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'Register',
      {
        Name,
        Email,
        UserName,
        PasswordHash
      },
      httpOptions
    );
  }


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


}