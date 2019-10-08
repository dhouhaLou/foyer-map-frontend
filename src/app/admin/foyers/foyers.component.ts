import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Foyer} from '../../core/interfaces/foyer';
import {User} from '../../core/interfaces/user';
import {FoyersService} from '../../core/services/foyers.service';
import {UsersService} from '../../core/services/users.service';
import villes from '../../shared/data/villes';

@Component({
  selector: 'app-foyers',
  templateUrl: './foyers.component.html',
  styleUrls: ['./foyers.component.css']
})
export class FoyersComponent implements OnInit {
  message;
  form: FormGroup;
  villes = villes;
  foyers: Foyer[];
  users: User[];

  constructor(
    private fb: FormBuilder,
    private foyersService: FoyersService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getFoyers();
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
      adresse: ['', [
        Validators.required,
      ]
      ],
      nb_chmbr: ['', [
        Validators.required,
      ]
      ],
      prix_indiv: ['', [
        Validators.required
      ]
      ],
      prix2: ['', [
        Validators.required,
      ]
      ],
      prix3: ['', [
        Validators.required,
      ]
      ],
      membre_id: ['', [
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

  getFoyers() {
    this.foyersService
      .list()
      .subscribe(
        (foyers: Foyer[]) => {
          this.foyers = foyers;
        }
      );
  }

  getFoyer(foyer) {
    this.foyersService
      .show(foyer)
      .subscribe(() => {
          this.getFoyers();
        }
      );
  }

  new(foyer: Foyer) {
    this.foyersService
      .new(foyer)
      .subscribe(() => {
          this.form.reset();
          this.getFoyers();
          this.message = 'Foyer ajouté avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  updateModal(foyer: Foyer) {
    this.form.setValue({
      id: foyer.id,
      titre: foyer.titre,
      adresse: foyer.adresse,
      ville: foyer.ville,
      nb_chmbr: foyer.nb_chmbr,
      prix_indiv: foyer.prix_indiv,
      prix2: foyer.prix2,
      prix3: foyer.prix3,
      membre_id: foyer.membre.id
    });
  }

  update(foyer) {
    this.foyersService
      .update(foyer)
      .subscribe(() => {
          this.form.reset();
          this.getFoyers();
          this.message = 'Foyer modifié avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  delete(foyer: Foyer) {
    this.foyersService
      .delete(foyer)
      .subscribe(() => {
          this.getFoyers();
          this.message = 'Foyer effacé avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }
}
