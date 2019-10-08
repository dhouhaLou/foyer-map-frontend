import {Component, OnInit} from '@angular/core';
import villes from '../../shared/data/villes';
import {Annonce} from '../../core/interfaces/annonce';
import {AnnoncesService} from '../../core/services/annonces.service';
import {Foyer} from '../../core/interfaces/foyer';
import {FoyersService} from '../../core/services/foyers.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    villes = villes;

    annonces: Annonce[];
    foyers: Foyer[];
    searchQuery: any;
    searchVille: any;
    invalidForm = false;

    constructor(
        private annoncesService: AnnoncesService,
        private foyersService: FoyersService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getAnnonces();
        this.getFoyers();
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

    getFoyers() {
        this.foyersService
            .list()
            .subscribe(
                (foyers: Foyer[]) => {
                    this.foyers = foyers;
                }
            );
    }

    search() {
        if (!this.searchQuery || !this.searchVille) {
            return this.invalidForm = true;
        }
        this.router.navigate(['/search/', this.searchQuery, this.searchVille]);
    }
}
