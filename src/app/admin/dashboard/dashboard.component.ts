import {Component, OnInit} from '@angular/core';
import {Annonce} from '../../core/interfaces/annonce';
import {AnnoncesService} from '../../core/services/annonces.service';
import {User} from '../../core/interfaces/user';
import {Annuaire} from '../../core/interfaces/annuaire';
import {Foyer} from '../../core/interfaces/foyer';
import {FoyersService} from '../../core/services/foyers.service';
import {UsersService} from '../../core/services/users.service';
import {AnnuairesService} from '../../core/services/annuaires.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  annonces: Annonce[];
  annoncesTotal: number;
  usersTotal: number;
  annuairesTotal: number;
  foyersTotal: number;

  constructor(
    private  annoncesService: AnnoncesService,
    private foyersService: FoyersService,
    private usersService: UsersService,
  private annuairesService: AnnuairesService
  ) {
  }

  ngOnInit() {
    this.getAnnonces();
    this.getAnnuaires();
    this.getFoyers();
    this.getUsers();
  }

  getAnnonces() {
    this.annoncesService
      .list()
      .subscribe(
        (annonces: Annonce[]) => {
          this.annonces = annonces.slice(annonces.length - 5, annonces.length);
          this.annoncesTotal = annonces.length;
        }
      );
  }

  getUsers() {
    this.usersService
      .list()
      .subscribe(
        (users: User[]) => {
          this.usersTotal = users.length;
        }
      );
  }

  getFoyers() {
    this.foyersService
      .list()
      .subscribe(
        (foyers: Foyer[]) => {
          this.foyersTotal = foyers.length;
        }
      );
  }

  getAnnuaires() {
    this.annuairesService
      .list()
      .subscribe(
        (annuaires: Annuaire[]) => {
          this.annuairesTotal = annuaires.length;
        }
      );
  }
}
