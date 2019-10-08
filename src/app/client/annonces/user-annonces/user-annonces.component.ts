import {Component, OnInit} from '@angular/core';
import {Annonce} from '../../../core/interfaces/annonce';
import {AnnoncesService} from '../../../core/services/annonces.service';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';

@Component({
  selector: 'app-user-annonces',
  templateUrl: './user-annonces.component.html',
  styleUrls: ['./user-annonces.component.css']
})
export class UserAnnoncesComponent implements OnInit {
  annonces: Annonce[];
  user: User;
  message;
  constructor(
    private annoncesService: AnnoncesService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getAnnonces(userId) {
    this.annoncesService
      .list()
      .subscribe(
        (annonces: Annonce[]) => {
          this.annonces = annonces.filter(a => a.membre.id === userId);
        }
      );
  }

  getUser() {
    this.authService
      .user()
      .subscribe(
        (user: User) => {
          this.user = user;
          this.getAnnonces(user.id);
        }
      );
  }
  delete(annonce: Annonce) {
    this.annoncesService
      .delete(annonce)
      .subscribe(() => {
          this.getAnnonces(this.user.id);
          this.message = 'Annonce effacé avec succés';
        },
        error => {
          this.message = 'Un probleme est survenue, veuillez essayez ulterieurement';
        }
      );
  }
}
