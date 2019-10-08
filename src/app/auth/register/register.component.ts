import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth.service';
import {AuthUser, Login, Register} from '../../core/interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required
      ]
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.required,
      ]
      ],
    });

  }

  register(register: Register) {

    this.authService
      .register(register)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/auth/login', {state: {message: 'Votre inscription à été effectué avec succeés, veuillez vous connecter'}});
        },
        error => {
          if (error.error === 'Duplicate entry') {
            this.message = 'Nom d\'utilisateur ou email est deja utilisé';
          } else {
            this.message = 'Inscription echoué veuillez ressayez plus tard';
          }

        }
      );


  }

}
