import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  teams: any[] = [ 
    { label: 'DET', value: 0 },
    { label: 'DATA', value: 1 },
    { label: 'RPA', value: 2 },

];

roles: any[] = [  
    { label: 'Employee', value: 0 },
    { label: 'Supervisor', value: 1 },
];
constructor(
    public layoutService: LayoutService,
    private authService: AuthenticateService,
    private router: Router
  ) {}


form: any = {
Name: null,
Email: null,
UserName: null,
PasswordHash: null,
Team: null, 
Role: null  
};

onSubmit(): void {
const { Name, Email, UserName, PasswordHash, Team, Role } = this.form;
this.authService.register(Name, Email, UserName, PasswordHash, Team, Role).subscribe({
    next: (data) => {
     
        this.router.navigate(['/auth/login']);
    },
    error: (err) => {
    },
});
}
}
