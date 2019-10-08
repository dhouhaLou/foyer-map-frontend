import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Annuaire} from '../../core/interfaces/annuaire';
import {User} from '../../core/interfaces/user';
import {AnnuairesService} from '../../core/services/annuaires.service';
import {UsersService} from '../../core/services/users.service';
import villes from '../../shared/data/villes';

@Component({
  selector: 'app-directories',
  templateUrl: './annuaires.component.html',
  styleUrls: ['./annuaires.component.css']
})
export class AnnuairesComponent implements OnInit {

  message;
  form: FormGroup;
  villes = villes;
  annuaires: Annuaire[];
  users: User[];

  constructor(
    private fb: FormBuilder,
    private annuairesService: AnnuairesService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getAnnuaires();
    this.getUsers();
  }

  buildForm() {
    this.form = this.fb.group({
      id: ['', []
      ],
      titre: ['', [
        Validators.required,
      ]
      ],
      ville: ['', [
        Validators.required,
      ]
      ],
      tel: ['', [
        Validators.required,
      ]
      ],
      description: ['', [
        Validators.required,
      ]
      ],
      bailleur: ['', [
        Validators.required,
      ]
      ],
      admin_id: ['', [
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
          this.users = users.filter(u => u.roles.includes('ROLE_ADMIN'));
        }
      );
  }

  getAnnuaires() {
    this.annuairesService
      .list()
      .subscribe(
        (annuaires: Annuaire[]) => {
          this.annuaires = annuaires;
        }
      );
  }

  getAnnuaire(annonce) {
    this.annuairesService
      .show(annonce)
      .subscribe(() => {
          this.getAnnuaires();
        }
      );
  }

  new(annonce: Annuaire) {
    this.annuairesService
      .new(annonce)
      .subscribe(() => {
          this.form.reset();
          this.getAnnuaires();
          this.message = 'Annuaire ajouté avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  updateModal(annuaire: Annuaire) {
    this.form.setValue({
      id: annuaire.id,
      titre: annuaire.titre,
      tel: annuaire.tel,
      bailler: annuaire.bailleur,
      ville: annuaire.ville,
      description: annuaire.description,
      admin_id: annuaire.admin_id,
    });
  }

  update(annonce) {
    this.annuairesService
      .update(annonce)
      .subscribe(() => {
          this.form.reset();
          this.getAnnuaires();
          this.message = 'Annuaire modifié avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  delete(annonce: Annuaire) {
    this.annuairesService
      .delete(annonce)
      .subscribe(() => {
          this.getAnnuaires();
          this.message = 'Annuaire effacé avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

}
