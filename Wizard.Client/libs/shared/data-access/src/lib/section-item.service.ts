import { Injectable } from '@angular/core';
import { JsonActionResult, SectionItemModel } from '@wizard/shared/data-models';
import { map, Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class SectionItemService extends BaseService {
  constructor(apiService: ApiService) {
    super(apiService, 'sectionItem');
  }

  add(model: SectionItemModel): Observable<JsonActionResult<number>> {
    return this.post('', { body: model }).pipe(map(res => res as JsonActionResult<number>));;
  }

  update(model: SectionItemModel): Observable<JsonActionResult> {
    return this.put('', { body: model });
  }

  deleteItem(itemId: number): Observable<JsonActionResult> {
    return this.delete(itemId.toString());
  }

}
