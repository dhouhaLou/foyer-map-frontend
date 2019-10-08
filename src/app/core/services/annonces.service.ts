import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Annonce} from '../interfaces/annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  host: string = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {
  }

  list(): Observable<Annonce[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + '/annonces';
    return this.httpClient.get<Annonce[]>(uri, httpOptions);
  }

  show(id): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const uri = this.host + `/annonces/${id}`;
    return this.httpClient.get<Annonce>(uri, httpOptions);
  }

  new(annonce): Observable<Annonce> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + '/annonces';
    return this.httpClient.post<Annonce>(uri, annonce, httpOptions);
  }

  update(annonce): Observable<Annonce> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/annonces/${annonce.id}`;
    return this.httpClient.put<Annonce>(uri, annonce, httpOptions);
  }

  delete(annonce): Observable<Annonce> {
    const token = this.tokenService.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const uri = this.host + `/annonces/${annonce.id}`;
    return this.httpClient.delete<Annonce>(uri, httpOptions);
  }
}
