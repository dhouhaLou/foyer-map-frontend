import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/users.service';
import {User} from '../../core/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message;
  form: FormGroup;
  roles = [
    {value: 'ROLE_ADMIN', label: 'Admin'},
    {value: 'ROLE_CLIENT', label: 'Client'}
  ];
  users: User[];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getUsers();
  }

  buildForm() {
    this.form = this.fb.group({
      id: ['', []
      ],
      username: ['', [
        Validators.required,
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
      role: ['', [
        Validators.required,
      ]
      ],
    });

  }

  getUsers() {
    this.usersService
      .list()
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }

  getUser(user) {
    this.usersService
      .show(user)
      .subscribe(() => {
          this.getUsers();
        }
      );
  }

  new(user: User) {
    this.usersService
      .new(user)
      .subscribe(() => {
          this.form.reset();
          this.getUsers();
          this.message = 'Utilisateur ajouté avec succés';
        },
        error => {
          if (error.error === 'Duplicate entry') {
            this.message = 'Nom d\'utilisateur ou email est deja utilisé';
          } else {
            this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
          }

        }
      );
  }

  updateModal(user: User) {
    this.form.setValue({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.roles[0],
      password: null
    });
  }

  update(user) {
    this.usersService
      .update(user)
      .subscribe(() => {
          this.form.reset();
          this.getUsers();
          this.message = 'Utilisiteur modifié avec succés';
        },
        error => {
          if (error.error === 'Duplicate entry') {
            this.message = 'Nom d\'utilisateur ou email est deja utilisé';
          } else {
            this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
          }

        }
      );
  }

  delete(user: User) {
    this.usersService
      .delete(user)
      .subscribe(() => {
          this.getUsers();
          this.message = 'Utilisiteur effacé avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }
}
