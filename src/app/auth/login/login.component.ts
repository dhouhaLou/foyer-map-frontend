import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Router} from '@angular/router';

import {AuthService} from '../../core/services/auth.service';
import {TokenService} from '../../core/services/token.service';

import {Login, AuthUser} from '../../core/interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: any;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.message = window.history.state.message;
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required
      ]
      ],
      password: ['', [
        Validators.required,
      ]
      ],
    });

  }


  login(login: Login) {

    this.authService
      .login(login)
      .subscribe(
        (user: AuthUser) => {
          this.tokenService.save(user.token.access_token);
          this.authService.connected(true);
          if (user.user.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin/dashboard']);
          }
          if (user.user.roles.includes('ROLE_CLIENT')) {
            this.router.navigate(['/']);
          }

        },
        error => {
          this.message = 'Le nom d\'utilisateur ou le mot de passe sont incorrects';
        }
      );


  }


}
