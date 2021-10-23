import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

const materialModules = [MatInputModule, MatButtonModule, MatTabsModule];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules]
})
export class SharedMaterialModule {}
