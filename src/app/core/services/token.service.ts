import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  TOKEN_KEY = 'token';

  constructor() {
  }

  public save(accessToken: string) {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, accessToken);
  }

  public remove() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public get(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

}
