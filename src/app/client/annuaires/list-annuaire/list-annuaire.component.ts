import { Component, OnInit } from '@angular/core';
import {Annuaire} from '../../../core/interfaces/annuaire';
import {AnnuairesService} from '../../../core/services/annuaires.service';
import villes from '../../../shared/data/villes';

@Component({
  selector: 'app-list-annuaire',
  templateUrl: './list-annuaire.component.html',
  styleUrls: ['./list-annuaire.component.css']
})
export class ListAnnuaireComponent implements OnInit {
  villes = villes;
  annuaires: Annuaire[];
  annuairesFiltred: Annuaire[];

  constructor(private annuairesService: AnnuairesService) {
  }

  ngOnInit() {
    this.getAnnuaires();
  }

  getAnnuaires() {
    this.annuairesService
      .list()
      .subscribe(
        (annuaires: Annuaire[]) => {
          this.annuaires = annuaires;
          this.annuairesFiltred = annuaires;
        }
      );
  }

  filterVille(value: any) {
    this.annuairesFiltred = this.annuaires;
    this.annuairesFiltred = this.annuaires.filter(a => a.ville === value);
  }

}
