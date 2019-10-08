import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  isAdmin: boolean;
  menus = [
    {name: 'Accueil', link: '/home'},
    {name: 'Annonces', link: '/annonces'},
    {name: 'Foyers', link: '/foyers'},
    {name: 'Annuaire', link: '/annuaire'},
  ];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.authService.connectedEvent
      .subscribe((data: boolean) => {
        this.getUser();
      });
  }

  getUser() {
    this.authService
      .user()
      .subscribe(
        (user: User) => {
          this.user = user;
          if (user && user.roles.includes('ROLE_ADMIN')) {
            this.isAdmin = true;
          }
        }
      );
  }

  logout() {
    this.authService.logout();
  }

}
