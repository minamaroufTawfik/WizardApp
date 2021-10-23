import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '@wizard/shared/material'
import { SharedFontAwesomeModule } from '@wizard/shared/font-awesome';
import { IconComponent } from './icon/icon.component';

const exportedModules = [
  SharedMaterialModule, SharedFontAwesomeModule, FormsModule, ReactiveFormsModule
]

@NgModule({
  imports: [CommonModule, ...exportedModules],
  declarations: [
    IconComponent
  ],
  exports: [...exportedModules, IconComponent]
})
export class SharedUiModule {}
