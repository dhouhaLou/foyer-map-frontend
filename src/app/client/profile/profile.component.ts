import { Component, OnInit } from '@angular/core';
import {User} from '../../core/interfaces/user';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService
      .user()
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }
}
