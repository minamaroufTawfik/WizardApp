import { BaseModel } from './base/base-model';

export interface SectionModel extends BaseModel {
  title: string;
  order: number;
}
