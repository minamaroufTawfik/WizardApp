import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionItemModel } from '@wizard/shared/data-models';
import { ReactiveFormService, ValidationService } from '@wizard/shared/utility';
import { ManageStepItemModel } from './manage-step-item.models';

@Component({
  selector: 'wizard-manage-step-item',
  templateUrl: './manage-step-item.component.html',
  styleUrls: ['./manage-step-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReactiveFormService]
})
export class ManageStepItemComponent {
  @Input() disableSubmitBtn = false;
  @Input() set selectedItem(val: SectionItemModel | null) {
    this.model.stepForm.value = val ? val : this.getEmptyItem();
  }
  @Output() itemSubmitted = new EventEmitter<SectionItemModel>();

  model: ManageStepItemModel;

  constructor(stepForm: ReactiveFormService<SectionItemModel>) {
    this.model = new ManageStepItemModel(stepForm);
    this.initFormModel();
  }

  submit(): void {
    if (this.model.stepForm.isValid) {
      this.itemSubmitted.emit(this.model.stepForm.value);
    }
  }


  private initFormModel(): void {
    this.model.stepForm.createForm(this.getEmptyItem());
    this.model.stepForm.setValidators('title', ValidationService.requiredValidators);
    this.model.stepForm.setValidators('description', ValidationService.requiredValidators);
  }

  private getEmptyItem(): SectionItemModel {
    const item: SectionItemModel = {
      id: 0,
      title: '',
      description: '',
      sectionId: 0
    };
    return item;
  }

}
