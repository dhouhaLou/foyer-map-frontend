import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Foyer} from '../interfaces/foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyersService {
  host: string = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {
  }

  list(): Observable<Foyer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + '/foyers';
    return this.httpClient.get<Foyer[]>(uri, httpOptions);
  }

  show(id): Observable<Foyer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + `/foyers/${id}`;
    return this.httpClient.get<Foyer>(uri, httpOptions);
  }

  new(foyer): Observable<Foyer> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/foyers';
    return this.httpClient.post<Foyer>(uri, foyer, httpOptions);
  }

  update(foyer): Observable<Foyer> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/foyers/${foyer.id}`;
    return this.httpClient.put<Foyer>(uri, foyer, httpOptions);
  }

  delete(foyer): Observable<Foyer> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/foyers/${foyer.id}`;
    return this.httpClient.delete<Foyer>(uri, httpOptions);
  }
}
