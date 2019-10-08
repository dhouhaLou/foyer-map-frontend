import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Register, Login, AuthUser} from '../interfaces/auth';
import {User} from '../interfaces/user';
import {TokenService} from './token.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host: string = environment.apiUrl;
  @Output() connectedEvent = new EventEmitter<boolean>();

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  login(login: Login): Observable<AuthUser> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const uri = this.host + '/auth/login';
    return this.httpClient.post<AuthUser>(uri, login, httpOptions);
  }

  logout() {
    this.tokenService.remove();
    this.router.navigate(['/']);
  }

  user(): Observable<User> {

    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/auth/user';
    return this.httpClient.get<User>(uri, httpOptions);
  }

  register(register: Register): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    const uri = this.host + '/auth/register';
    return this.httpClient.post<User>(uri, register, httpOptions);
  }

  authenticated() {
    const token = this.tokenService.get();
    if (token) {
      return true;
    }
    return false;
  }

  connected(connected: boolean) {
    this.connectedEvent.emit(connected);
  }
}
