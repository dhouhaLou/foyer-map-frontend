import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Annuaire} from '../interfaces/annuaire';

@Injectable({
  providedIn: 'root'
})
export class AnnuairesService {
  host: string = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {
  }

  list(): Observable<Annuaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + '/annuaires';
    return this.httpClient.get<Annuaire[]>(uri, httpOptions);
  }

  show(id): Observable<Annuaire> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + `/annuaires/${id}`;
    return this.httpClient.get<Annuaire>(uri, httpOptions);
  }

  new(annuaire): Observable<Annuaire> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/annuaires';
    return this.httpClient.post<Annuaire>(uri, annuaire, httpOptions);
  }

  update(annuaire): Observable<Annuaire> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/annuaires/${annuaire.id}`;
    return this.httpClient.put<Annuaire>(uri, annuaire, httpOptions);
  }

  delete(annuaire): Observable<Annuaire> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/annuaires/${annuaire.id}`;
    return this.httpClient.delete<Annuaire>(uri, httpOptions);
  }
}
