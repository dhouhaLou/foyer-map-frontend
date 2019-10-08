import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnoncesService} from '../../core/services/annonces.service';
import {Annonce} from '../../core/interfaces/annonce';
import {User} from '../../core/interfaces/user';
import {UsersService} from '../../core/services/users.service';
import villes from '../../shared/data/villes';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  message;
  form: FormGroup;
  villes = villes;
  annonces: Annonce[];
  users: User[];
  typeAnnonces = [
    {value: 'collocation', label: 'Collocation'},
    {value: 'studio', label: 'Studio'}
  ];
  imageSrc = '';

  constructor(
    private fb: FormBuilder,
    private annoncesService: AnnoncesService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getAnnonces();
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
        Validators.required
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
      type_annonce: ['', [
        Validators.required,
      ]
      ],
      image: ['', [
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

  getAnnonces() {
    this.annoncesService
      .list()
      .subscribe(
        (annonces: Annonce[]) => {
          this.annonces = annonces;
        }
      );
  }

  getAnnonce(annonce) {
    this.annoncesService
      .show(annonce)
      .subscribe(() => {
          this.getAnnonces();
        }
      );
  }

  new(annonce: Annonce) {
    this.annoncesService
      .new(annonce)
      .subscribe(() => {
          this.form.reset();
          this.getAnnonces();
          this.message = 'Annonce ajouté avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  updateModal(annonce: Annonce) {
    this.imageSrc = annonce.image;
    this.form.setValue({
      id: annonce.id,
      titre: annonce.titre,
      ville: annonce.ville,
      tel: annonce.tel,
      description: annonce.description,
      type_annonce: annonce.type_annonce,
      image: annonce.image,
      membre_id: annonce.membre.id
    });
  }

  update(annonce) {
    this.annoncesService
      .update(annonce)
      .subscribe(() => {
          this.form.reset();
          this.getAnnonces();
          this.message = 'Annonce modifié avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  delete(annonce: Annonce) {
    this.annoncesService
      .delete(annonce)
      .subscribe(() => {
          this.getAnnonces();
          this.message = 'Annonce effacé avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Format invalid');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.form.patchValue({
      image: reader.result
    });
  }
}
