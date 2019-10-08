import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Annonce} from '../../core/interfaces/annonce';
import {Foyer} from '../../core/interfaces/foyer';
import {AnnoncesService} from '../../core/services/annonces.service';
import {FoyersService} from '../../core/services/foyers.service';
import {AnnuairesService} from '../../core/services/annuaires.service';
import {Annuaire} from '../../core/interfaces/annuaire';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: any;
  searchVille: any;

  annonces: Annonce[];
  foyers: Foyer[];
  annuaires: Annuaire[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private annoncesService: AnnoncesService,
    private foyersService: FoyersService,
    private annuairesService: AnnuairesService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.searchQuery = paramMap.get('query');
      this.searchVille = paramMap.get('ville');
      this.getAnnonces(this.searchQuery, this.searchVille);
      this.getFoyers(this.searchQuery, this.searchVille);
      this.getAnnuaires(this.searchQuery, this.searchVille);
    });
  }

  getAnnonces(query, ville) {
    this.annoncesService
      .list()
      .subscribe(
        (annonces: Annonce[]) => {
          this.annonces = annonces.filter(a => a.titre.includes(query) || a.ville === ville);
        }
      );
  }

  getFoyers(query, ville) {
    this.foyersService
      .list()
      .subscribe(
        (foyers: Foyer[]) => {
          this.foyers = foyers.filter(f => f.titre.includes(query) || f.ville === ville);
        }
      );
  }

  getAnnuaires(query, ville) {
    this.annuairesService
      .list()
      .subscribe(
        (annuaires: Annuaire[]) => {
          this.annuaires = annuaires.filter(a => a.titre.includes(query) || a.ville === ville);
        }
      );
  }
}
