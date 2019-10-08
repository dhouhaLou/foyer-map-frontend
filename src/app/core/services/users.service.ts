import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  host: string = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {
  }

  list(): Observable<User[]> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/users';
    return this.httpClient.get<User[]>(uri, httpOptions);
  }

  show(id): Observable<User> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/users/${id}`;
    return this.httpClient.get<User>(uri, httpOptions);
  }

  new(user): Observable<User> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/users';
    return this.httpClient.post<User>(uri, user, httpOptions);
  }

  update(user): Observable<User> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/users/${user.id}`;
    return this.httpClient.put<User>(uri, user, httpOptions);
  }

  delete(user): Observable<User> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/users/${user.id}`;
    return this.httpClient.delete<User>(uri, httpOptions);
  }
}
