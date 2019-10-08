import { Component, OnInit } from '@angular/core';
import {Foyer} from '../../../core/interfaces/foyer';
import {FoyersService} from '../../../core/services/foyers.service';
import villes from '../../../shared/data/villes';

@Component({
  selector: 'app-list-foyer',
  templateUrl: './list-foyer.component.html',
  styleUrls: ['./list-foyer.component.css']
})
export class ListFoyerComponent implements OnInit {
  villes = villes;
  foyers: Foyer[];
  foyersFiltred: Foyer[];

  constructor(private foyersService: FoyersService) {
  }

  ngOnInit() {
    this.getFoyers();
  }

  getFoyers() {
    this.foyersService
      .list()
      .subscribe(
        (foyers: Foyer[]) => {
          this.foyers = foyers;
          this.foyersFiltred = foyers;
        }
      );
  }

  filterVille(value: any) {
    this.foyersFiltred = this.foyers;
    this.foyersFiltred = this.foyers.filter(a => a.ville === value);
  }

}
