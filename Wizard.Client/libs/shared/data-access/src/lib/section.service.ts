import { Injectable } from '@angular/core';
import { JsonActionResult, SectionModel, SectionWithItemsModel } from '@wizard/shared/data-models';
import { map, Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService extends BaseService {
  constructor(apiService: ApiService) {
    super(apiService, 'section');
  }

  getAll(): Observable<JsonActionResult<SectionWithItemsModel[]>> {
    return this.get('').pipe(map(res => res as JsonActionResult<SectionWithItemsModel[]>));
  }

  add(model: SectionModel): Observable<JsonActionResult<number>> {
    return this.post('', { body: model }).pipe(map(res => res as JsonActionResult<number>));
  }

  deleteSection(sectionId: number): Observable<JsonActionResult> {
    return this.delete(sectionId.toString());
  }

}
