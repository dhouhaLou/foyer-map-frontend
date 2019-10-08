import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnoncesService} from '../../../core/services/annonces.service';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {Annonce} from '../../../core/interfaces/annonce';
import villes from '../../../shared/data/villes';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {
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
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.getAnnonce(paramMap.get('id'));
    });
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

  getAnnonce(id) {
    this.annoncesService
      .show(id)
      .subscribe(
        (annonce: Annonce) => {
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
          this.imageSrc = annonce.image;
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
