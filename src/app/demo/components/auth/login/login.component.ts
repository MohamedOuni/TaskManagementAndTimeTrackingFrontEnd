import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    form: any = {
        UserName: null,
        PasswordHash: null,
      };
    
      isLoggedIn = false;
      isLoginFailed = false;
      errorMessage = '';
    
      constructor(
        public layoutService: LayoutService,
        private authService: AuthenticateService,
        private storageService: StorageService,
        private router: Router
      ) {}
    
      ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
          this.isLoggedIn = true;
          this.router.navigate(['/ey/dashboard']);
        }
      }
    
      onSubmit(): void {
        const { UserName, PasswordHash } = this.form;
        this.authService.login(UserName, PasswordHash).subscribe({
          next: (data) => {
            this.storageService.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/ey']);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          },
        });
      }
    }