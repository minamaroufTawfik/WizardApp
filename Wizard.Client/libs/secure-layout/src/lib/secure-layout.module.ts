import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureLayoutComponent } from './components/layout/layout.component';
import { secureRoutes } from './secure.routing';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from '@wizard/shared/ui';

const secureRoutesRouting: ModuleWithProviders<SecureLayoutModule> = RouterModule.forChild(
  secureRoutes
);

@NgModule({
  imports: [CommonModule, SharedUiModule, RouterModule, secureRoutesRouting],
  declarations: [
    SecureLayoutComponent
  ],
})
export class SecureLayoutModule {}
