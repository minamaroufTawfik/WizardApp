import { SectionItemModel, SectionWithItemsModel } from '@wizard/shared/data-models';

export class StepsModel {
  allSteps: SectionWithItemsModel[] = [];
  selectedItemToEdit: SectionItemModel | null = null;
}
