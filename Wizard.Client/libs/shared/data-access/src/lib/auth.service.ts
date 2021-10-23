import { Injectable } from '@angular/core';
import { JsonActionResult, LoginModel } from '@wizard/shared/data-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './base/api.service';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private readonly accessTokenKey = 'access_token';
  constructor(apiService: ApiService) {
    super(apiService, 'auth');
  }

  login(auth: LoginModel): Observable<JsonActionResult<string>> {
    return this.post('LogIn', { body: auth }).pipe(map(res => {
      if (res.isSuccess) {
        localStorage.setItem(this.accessTokenKey, res.result as string);
      }
      return res as JsonActionResult<string>;
    }));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  signOut(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

}
