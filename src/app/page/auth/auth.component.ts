import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  errMsg?: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitLoginForm(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/clients']),
        error: (err) => {
          this.errMsg = "Erreur d'authentification";
        },
      });
    }
  }
}
