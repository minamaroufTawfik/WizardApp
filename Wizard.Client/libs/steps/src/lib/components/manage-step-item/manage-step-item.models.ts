import { SectionItemModel } from '@wizard/shared/data-models';
import { ReactiveFormService } from '@wizard/shared/utility';

export class ManageStepItemModel {
  constructor(public stepForm: ReactiveFormService<SectionItemModel>) {}
}
