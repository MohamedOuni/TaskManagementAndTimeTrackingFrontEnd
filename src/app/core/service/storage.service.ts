import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }
  public getToken(): string {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      const parsedToken = JSON.parse(token);
      return parsedToken.Item2 || '';
    }
    return '';
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
  
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
      return {
        Team: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        Role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        Id : decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]};
    }
  
    return null;
  }

  public getRole():  any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
  
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
      return {
        Role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
       }
      }
    }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(TOKEN_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}

