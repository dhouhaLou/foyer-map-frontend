import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Annonce} from '../../../core/interfaces/annonce';
import {AnnoncesService} from '../../../core/services/annonces.service';
import villes from '../../../shared/data/villes';
import {User} from '../../../core/interfaces/user';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {
  message;
  form: FormGroup;
  villes = villes;
  typeAnnonces = [
    {value: 'collocation', label: 'Collocation'},
    {value: 'studio', label: 'Studio'}
  ];
  imageSrc = '';

  constructor(
    private fb: FormBuilder,
    private annoncesService: AnnoncesService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getUser();
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
  getUser() {
    this.authService
      .user()
      .subscribe(
        (user: User) => {
          this.form.patchValue({
            membre_id: user.id
          });
        }
      );
  }
  new(annonce: Annonce) {
    this.annoncesService
      .new(annonce)
      .subscribe(() => {
          this.form.reset();
          this.message = 'Annonce ajouté avec succés';
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
