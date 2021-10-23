import { HttpHeaders, HttpParams } from '@angular/common/http';
import { GetRequestDto, PostRequestDto, PutRequestDto } from '../models';
import { ApiService } from './api.service';
import { JsonActionResult } from '@wizard/shared/data-models';
import { Observable } from 'rxjs';

export class BaseService {

  constructor(private apiService: ApiService, private controllerBaseName: string) {
  }

  protected get(methodName: string, getRequest?: GetRequestDto | null): Observable<JsonActionResult> {
    const path = this.getPath(methodName);
    let httpParams: HttpParams = new HttpParams();
    if (getRequest && getRequest.params) {
      for (const prop in getRequest.params) {
        if (Object.prototype.hasOwnProperty.call(getRequest, prop)) {
          httpParams = httpParams.set(prop, getRequest.params[prop]);
        }
      }
    }
    return this.apiService.get<JsonActionResult>(path, httpParams, this.getHeaders());
  }

  protected post(methodName: string, postRequest: PostRequestDto = {body: {}}): Observable<JsonActionResult> {
    const path = this.getPath(methodName);
    const body = postRequest ? postRequest.body : null;
    return this.apiService.post<JsonActionResult>(path, body, this.getHeaders());
  }

  protected put(methodName: string, putRequest: PutRequestDto = {body: {}}): Observable<JsonActionResult> {
    const path = this.getPath(methodName);
    const body = putRequest ? putRequest.body : null;
    return this.apiService.put<JsonActionResult>(path, body, this.getHeaders());
  }

  protected delete(methodName: string): Observable<JsonActionResult> {
    const path = this.getPath(methodName);
    return this.apiService.delete<JsonActionResult>(path, this.getHeaders());
  }

  private getPath(methodName: string): string {
    const sep = '/';
    let path = `${this.controllerBaseName}${sep}${methodName}`;
    if (path.indexOf(sep) === 0) {
      path = path.substring(1);
    }
    if (path.endsWith(sep)) {
      path = path.replace(new RegExp(sep + '$'), '');
    }
    return path;
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }

}
