import { SectionItemModel } from './section-item-model';
import { SectionModel } from './section-model';

export interface SectionWithItemsModel extends SectionModel {
  items: SectionItemModel[];
}
