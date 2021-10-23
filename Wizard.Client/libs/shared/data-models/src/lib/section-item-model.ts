import { BaseModel } from './base/base-model';

export interface SectionItemModel extends BaseModel {
  title: string;
  description: string;
  sectionId: number;
}
