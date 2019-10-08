import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  menus = [
    {name: 'Dashboard', icon: 'fa-tachometer', link: '/admin/dashboard'},
    {name: 'Utilisateurs', icon: 'fa-users', link: '/admin/users'},
    {name: 'Annonces', icon: 'fa-bullhorn', link: '/admin/annonces'},
    {name: 'Foyers', icon: 'fa-home', link: '/admin/foyers'},
    {name: 'Annuaire', icon: 'fa-list', link: '/admin/annuaires'},
  ];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}
