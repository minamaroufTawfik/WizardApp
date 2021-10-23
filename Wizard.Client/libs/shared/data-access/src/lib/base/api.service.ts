import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs';

import { environment } from '@wizard/shared/environments';

const BASE_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  get<T>(path: string, params: HttpParams, headers: HttpHeaders): Observable<T> {
    const url = this.getUrlWithDomain(path);
    return this.httpClient.get<T>(url, { params, headers })
  }

  post<T>(path: string, body: unknown, headers: HttpHeaders): Observable<T> {
    const url = this.getUrlWithDomain(path);
    return this.httpClient.post<T>(url, body, {headers})
  }

  put<T>(path: string, body: unknown, headers: HttpHeaders): Observable<T> {
    const url = this.getUrlWithDomain(path);
    return this.httpClient.put<T>(url, JSON.stringify(body), {headers})
  }

  delete<T>(path: string, headers: HttpHeaders): Observable<T> {
    const url = this.getUrlWithDomain(path);
    return this.httpClient.delete<T>(url, { headers })
  }

  private getUrlWithDomain(path: string): string {
    return BASE_URL + path;
  }
}
