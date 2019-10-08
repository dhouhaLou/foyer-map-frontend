import { Component, OnInit } from '@angular/core';
import {Foyer} from '../../../core/interfaces/foyer';
import {FoyersService} from '../../../core/services/foyers.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-foyer',
  templateUrl: './show-foyer.component.html',
  styleUrls: ['./show-foyer.component.css']
})
export class ShowFoyerComponent implements OnInit {
  foyer: Foyer;

  constructor(
    private foyersService: FoyersService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.getFoyer(paramMap.get('id'));
    });
  }

  getFoyer(id) {
    this.foyersService
      .show(id)
      .subscribe(
        (foyer: Foyer) => {
          this.foyer = foyer;
        }
      );
  }
}
