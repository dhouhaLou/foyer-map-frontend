import {Component, OnInit} from '@angular/core';
import {AnnoncesService} from '../../../core/services/annonces.service';
import {Annonce} from '../../../core/interfaces/annonce';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-annonce',
  templateUrl: './show-annonce.component.html',
  styleUrls: ['./show-annonce.component.css']
})
export class ShowAnnonceComponent implements OnInit {
  annonce: Annonce;

  constructor(
    private annoncesService: AnnoncesService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.getAnnonce(paramMap.get('id'));
    });
  }

  getAnnonce(id) {
    this.annoncesService
      .show(id)
      .subscribe(
        (annonce: Annonce) => {
          this.annonce = annonce;
        }
      );
  }
}
