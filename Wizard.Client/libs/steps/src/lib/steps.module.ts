import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedUiModule } from '@wizard/shared/ui';
import { StepsComponent } from './containers/steps/steps.component';
import { stepsRoutes } from './steps.routing';
import { StepItemsComponent } from './components/step-items/step-items.component';
import { ManageStepItemComponent } from './components/manage-step-item/manage-step-item.component';

const stepsRoutesRouting: ModuleWithProviders<StepsModule> = RouterModule.forChild(stepsRoutes);

@NgModule({
  imports: [CommonModule, SharedUiModule, stepsRoutesRouting],
  declarations: [
    StepsComponent,
    StepItemsComponent,
    ManageStepItemComponent
  ],
})
export class StepsModule { }
