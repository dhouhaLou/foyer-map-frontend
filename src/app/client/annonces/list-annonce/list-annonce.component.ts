import {Component, OnInit} from '@angular/core';
import villes from '../../../shared/data/villes';
import {Annonce} from '../../../core/interfaces/annonce';
import {AnnoncesService} from '../../../core/services/annonces.service';

@Component({
  selector: 'app-list-annonce',
  templateUrl: './list-annonce.component.html',
  styleUrls: ['./list-annonce.component.css']
})
export class ListAnnonceComponent implements OnInit {
  villes = villes;
  typeAnnonces = [
    {value: 'collocation', label: 'Collocation'},
    {value: 'studio', label: 'Studio'}
  ];
  annonces: Annonce[];
  annoncesFiltred: Annonce[];

  constructor(private annoncesService: AnnoncesService) {
  }

  ngOnInit() {
    this.getAnnonces();
  }

  getAnnonces() {
    this.annoncesService
      .list()
      .subscribe(
        (annonces: Annonce[]) => {
          this.annonces = annonces;
          this.annoncesFiltred = annonces;
        }
      );
  }

  filterVille(value: any) {
    this.annoncesFiltred = this.annonces;
    this.annoncesFiltred = this.annonces.filter(a => a.ville === value);
  }

  filterType($event: any) {
    this.annoncesFiltred = this.annonces;
    if ($event.target.checked) {
      this.annoncesFiltred = this.annonces.filter(a => a.type_annonce === $event.target.value);
    }
  }
}
